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
    const result = await this.sapAdapter.postSupplierInvoice(invoice);

    if (result.success) {
      invoice.processingStatus = 'POSTED_TO_SAP';
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
}
