/**
 * SAPPostingService — Logistics Invoice Verification Posting Orchestrator
 * Coordinates final posting / parking with ISAPAdapter, AuditTrail, and IntegrationMonitor.
 */

import { ISAPAdapter } from '../integrations/sap/ISAPAdapter';
import { CanonicalSupplierInvoice, SAPPostingResult } from '../models/types';
import { AuditTrailService } from './AuditTrailService';
import { IntegrationMonitorService } from './IntegrationMonitorService';

export class SAPPostingService {
  private sapAdapter: ISAPAdapter;
  private auditTrail: AuditTrailService;
  private integrationMonitor: IntegrationMonitorService;
  private onInvoiceUpdated?: (invoice: CanonicalSupplierInvoice) => void;

  constructor(
    sapAdapter: ISAPAdapter,
    auditTrail: AuditTrailService,
    integrationMonitor: IntegrationMonitorService,
    onInvoiceUpdated?: (invoice: CanonicalSupplierInvoice) => void
  ) {
    this.sapAdapter = sapAdapter;
    this.auditTrail = auditTrail;
    this.integrationMonitor = integrationMonitor;
    this.onInvoiceUpdated = onInvoiceUpdated;
  }

  public async postInvoice(
    invoice: CanonicalSupplierInvoice,
    actorId: string = 'AP_CLERK_AUTO',
    actorName: string = 'Automated Posting Orchestrator'
  ): Promise<SAPPostingResult> {
    if (invoice.postingStatus === 'POSTED' && invoice.accountingDocumentNumber) {
      return {
        success: false,
        accountingDocumentNumber: invoice.accountingDocumentNumber,
        fiscalYear: invoice.fiscalYear || '2026',
        companyCode: invoice.buyerCompanyCode || '1010',
        documentType: 'RE',
        postingStatus: 'POSTED',
        message: `Invoice ${invoice.invoiceId} is already posted in SAP S/4HANA as Accounting Document ${invoice.accountingDocumentNumber}/${invoice.fiscalYear || '2026'}. Duplicate posting prevented.`,
        sapPostingTimestamp: invoice.postingDate || new Date().toISOString(),
      };
    }

    const result = await this.sapAdapter.postSupplierInvoice(invoice);

    if (result.success) {
      invoice.processingStatus = 'POSTED_TO_SAP';
      invoice.postingStatus = 'POSTED';
      invoice.accountingDocumentNumber = result.accountingDocumentNumber;
      invoice.fiscalYear = result.fiscalYear;
      invoice.postingDate = result.sapPostingTimestamp;
      if (!invoice.paymentStatus || invoice.paymentStatus === 'NOT_PROCESSED' || invoice.paymentStatus === 'NOT_DUE' || invoice.paymentStatus === 'BLOCKED') {
        invoice.paymentStatus = 'PAYMENT_PENDING';
      }
      if (!invoice.clearingStatus) {
        invoice.clearingStatus = 'OPEN';
      }

      if (this.onInvoiceUpdated) {
        this.onInvoiceUpdated(invoice);
      }

      this.auditTrail.recordEvent({
        invoiceId: invoice.invoiceId,
        actorId,
        actorName,
        actorRole: 'AP_FINANCE',
        action: 'SAP_SUPPLIER_INVOICE_POSTED',
        previousState: 'READY_FOR_POSTING',
        newState: 'POSTED_TO_SAP',
        justification: `Posted to SAP S/4HANA as Accounting Document ${result.accountingDocumentNumber}/${result.fiscalYear}`,
        contextData: { ...result },
      });

      this.integrationMonitor.logMessage({
        interfaceName: 'S4HANA_SupplierInvoice_Post',
        senderSystem: 'SAP_BTP_DECISION_ENGINE',
        receiverSystem: 'SAP_S4HANA_PROD_100',
        status: 'SUCCESS',
        direction: 'OUTBOUND',
        invoiceId: invoice.invoiceId,
        payloadSummary: `Posted Supplier Invoice ${result.accountingDocumentNumber} in CoCode ${invoice.buyerCompanyCode}`,
        requestPayloadPreview: { invoiceId: invoice.invoiceId, totalGross: invoice.totalGrossAmount },
        responsePayloadPreview: result,
      });
    }

    return result;
  }

  public async parkInvoice(
    invoice: CanonicalSupplierInvoice,
    reason: string,
    actorId: string = 'AP_CLERK',
    actorName: string = 'Accounts Payable Specialist'
  ): Promise<SAPPostingResult> {
    const result = await this.sapAdapter.parkSupplierInvoice(invoice, reason);

    if (result.success) {
      invoice.processingStatus = 'PARKED_IN_SAP';
      invoice.postingStatus = 'PARKED';
      invoice.parkedDocumentNumber = result.accountingDocumentNumber;
      invoice.parkedDate = result.sapPostingTimestamp;
      invoice.paymentStatus = 'BLOCKED';

      if (this.onInvoiceUpdated) {
        this.onInvoiceUpdated(invoice);
      }

      this.auditTrail.recordEvent({
        invoiceId: invoice.invoiceId,
        actorId,
        actorName,
        actorRole: 'AP_FINANCE',
        action: 'SAP_SUPPLIER_INVOICE_PARKED',
        previousState: invoice.processingStatus,
        newState: 'PARKED_IN_SAP',
        justification: `Invoice parked in SAP S/4HANA (F-47 / MIR7) as document ${result.accountingDocumentNumber}. Reason: ${reason}`,
        contextData: { ...result, reason },
      });

      this.integrationMonitor.logMessage({
        interfaceName: 'S4HANA_SupplierInvoice_Park',
        senderSystem: 'SAP_BTP_DECISION_ENGINE',
        receiverSystem: 'SAP_S4HANA_PROD_100',
        status: 'SUCCESS',
        direction: 'OUTBOUND',
        invoiceId: invoice.invoiceId,
        payloadSummary: `Parked Supplier Invoice ${result.accountingDocumentNumber} in CoCode ${invoice.buyerCompanyCode}`,
        requestPayloadPreview: { invoiceId: invoice.invoiceId, reason },
        responsePayloadPreview: result,
      });
    }

    return result;
  }

  public async processPayment(
    invoice: CanonicalSupplierInvoice,
    actorId: string = 'AP_TREASURY',
    actorName: string = 'Treasury & Disbursement Specialist'
  ): Promise<{ success: boolean; message: string; paymentDocument?: string; paymentReference?: string }> {
    if (invoice.postingStatus !== 'POSTED') {
      throw new Error(`Invoice ${invoice.invoiceId} cannot be paid before being posted to SAP S/4HANA (MIRO).`);
    }

    if (invoice.paymentStatus === 'PAID' || invoice.clearingStatus === 'CLEARED') {
      return {
        success: false,
        message: `Payment already exists for invoice ${invoice.invoiceId} as Payment Document ${invoice.paymentDocumentNumber || '2000012345'}. Duplicate disbursement prevented.`,
        paymentDocument: invoice.paymentDocumentNumber,
        paymentReference: invoice.paymentReference,
      };
    }

    const numSuffix = invoice.invoiceId.replace(/\D/g, '').slice(-5) || '12345';
    const paymentDoc = `20000${numSuffix.padStart(5, '0')}`;
    const paymentRef = `PAY-2026-${numSuffix.padStart(6, '0')}`;
    const timestamp = new Date().toISOString();

    invoice.paymentStatus = 'PAID';
    invoice.paymentDocumentNumber = paymentDoc;
    invoice.paymentReference = paymentRef;
    invoice.paymentDate = timestamp;

    if (this.onInvoiceUpdated) {
      this.onInvoiceUpdated(invoice);
    }

    this.auditTrail.recordEvent({
      invoiceId: invoice.invoiceId,
      actorId,
      actorName,
      actorRole: 'TREASURY',
      action: 'AP_PAYMENT_PROCESSED',
      previousState: 'PAYMENT_PENDING',
      newState: 'PAID',
      justification: `Payment disbursement executed via SAP FI-AP Automatic Payment Run (F110). Payment Doc ${paymentDoc}`,
      contextData: { paymentDoc, paymentRef, grossAmount: invoice.totalGrossAmount },
    });

    this.integrationMonitor.logMessage({
      interfaceName: 'SAP_FI_AP_PaymentRun',
      senderSystem: 'SAP_BTP_DECISION_ENGINE',
      receiverSystem: 'SAP_S4HANA_FI_AP',
      status: 'SUCCESS',
      direction: 'OUTBOUND',
      invoiceId: invoice.invoiceId,
      payloadSummary: `Disbursed payment for ${invoice.invoiceNumber}: Ref ${paymentRef}, Doc ${paymentDoc} (₹${(invoice.totalGrossAmount || 0).toLocaleString('en-IN')})`,
      requestPayloadPreview: { invoiceId: invoice.invoiceId, amount: invoice.totalGrossAmount },
      responsePayloadPreview: { status: 'PAID', paymentDoc, paymentRef },
    });

    return {
      success: true,
      message: `[MOCK S/4HANA FI-AP] Payment processed successfully. Payment Document ${paymentDoc} created (Ref: ${paymentRef}).`,
      paymentDocument: paymentDoc,
      paymentReference: paymentRef,
    };
  }

  public async clearPayment(
    invoice: CanonicalSupplierInvoice,
    actorId: string = 'AP_TREASURY',
    actorName: string = 'General Ledger Clearing Robot'
  ): Promise<{ success: boolean; message: string; clearingDocument?: string }> {
    if (invoice.paymentStatus !== 'PAID') {
      throw new Error(`Invoice ${invoice.invoiceId} must be paid before clearing settlement.`);
    }

    if (invoice.clearingStatus === 'CLEARED') {
      return {
        success: false,
        message: `Invoice ${invoice.invoiceId} is already cleared under document ${invoice.clearingDocumentNumber || '2000012346'}. Duplicate clearing prevented.`,
        clearingDocument: invoice.clearingDocumentNumber,
      };
    }

    const baseNum = parseInt(invoice.paymentDocumentNumber || '2000012345', 10);
    const clearingDoc = `${baseNum + 1}`;
    const timestamp = new Date().toISOString();

    invoice.clearingStatus = 'CLEARED';
    invoice.clearingDocumentNumber = clearingDoc;
    invoice.clearingDate = timestamp;

    if (this.onInvoiceUpdated) {
      this.onInvoiceUpdated(invoice);
    }

    this.auditTrail.recordEvent({
      invoiceId: invoice.invoiceId,
      actorId,
      actorName,
      actorRole: 'GENERAL_LEDGER',
      action: 'AP_ACCOUNTING_CLEARED',
      previousState: 'PAID',
      newState: 'CLEARED',
      justification: `Vendor line item open item cleared in SAP FI-AP (BSAK). Clearing Document ${clearingDoc}`,
      contextData: { clearingDoc, paymentDoc: invoice.paymentDocumentNumber },
    });

    this.integrationMonitor.logMessage({
      interfaceName: 'SAP_FI_AP_Clearing',
      senderSystem: 'SAP_BTP_DECISION_ENGINE',
      receiverSystem: 'SAP_S4HANA_FI_AP',
      status: 'SUCCESS',
      direction: 'OUTBOUND',
      invoiceId: invoice.invoiceId,
      payloadSummary: `Cleared vendor line item for ${invoice.invoiceNumber}: Clearing Doc ${clearingDoc}`,
      requestPayloadPreview: { invoiceId: invoice.invoiceId, paymentDoc: invoice.paymentDocumentNumber },
      responsePayloadPreview: { status: 'CLEARED', clearingDoc },
    });

    return {
      success: true,
      message: `[MOCK S/4HANA FI-AP] Clearing completed. Settlement Clearing Document ${clearingDoc} recorded.`,
      clearingDocument: clearingDoc,
    };
  }
}
