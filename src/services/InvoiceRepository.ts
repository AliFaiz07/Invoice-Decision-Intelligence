/**
 * InvoiceRepository — Central System State Coordinator
 * Holds canonical invoices, coordinates services, and performs evaluations.
 */

import { ISAPAdapter } from '../integrations/sap/ISAPAdapter';
import { MockSAPAdapter } from '../integrations/sap/MockSAPAdapter';
import { S4HanaCloudAdapter } from '../integrations/sap/S4HanaCloudAdapter';
import {
  CanonicalSupplierInvoice,
  AIDecisionResult,
  BusinessOwnerDecisionRecord,
  BusinessOwnerAction,
  ThreeWayReconciliationSummary,
  SAPPurchaseOrder,
  DocumentReferenceNode,
  ComparisonCheckRow,
} from '../models/types';
import { MOCK_INVOICES } from '../data/mockEnterpriseData';
import { POMatchingService } from './POMatchingService';
import { ThreeWayReconciliationService } from './ThreeWayReconciliationService';
import { AIDecisionEngine } from './AIDecisionEngine';
import { BusinessValidationService } from './BusinessValidationService';
import { SLAMonitorService } from './SLAMonitorService';
import { AuditTrailService } from './AuditTrailService';
import { IntegrationMonitorService } from './IntegrationMonitorService';
import { SAPPostingService } from './SAPPostingService';
import { GSTReconciliationService } from './GSTReconciliationService';

import { MockSourceDataStore } from './MockSourceDataStore';

export interface InvoiceDetailView {
  invoice: CanonicalSupplierInvoice;
  purchaseOrder: SAPPurchaseOrder | null;
  reconciliation: ThreeWayReconciliationSummary;
  aiDecision: AIDecisionResult;
  businessOwner: {
    userId: string;
    name: string;
    email: string;
    department: string;
    costCenter: string;
    role: string;
  };
  businessOwnerDecision: BusinessOwnerDecisionRecord | null;
  slaRecord: any;
  auditTrail: any[];
  documentChain: DocumentReferenceNode[];
  comparisonRows: ComparisonCheckRow[];
}

export class InvoiceRepository {
  public sapAdapter: ISAPAdapter;
  public poMatchingService: POMatchingService;
  public reconciliationService: ThreeWayReconciliationService;
  public aiDecisionEngine: AIDecisionEngine;
  public businessValidationService: BusinessValidationService;
  public slaMonitorService: SLAMonitorService;
  public auditTrailService: AuditTrailService;
  public integrationMonitorService: IntegrationMonitorService;
  public sapPostingService: SAPPostingService;
  public gstReconciliationService: GSTReconciliationService;
  public dataStore: MockSourceDataStore;

  private invoices: Map<string, CanonicalSupplierInvoice> = new Map();
  private channelBatchStatus: { physical: boolean; email: boolean; einvoice: boolean } = {
    physical: false,
    email: false,
    einvoice: false,
  };

  constructor() {
    const isDemoMode = process.env.DEMO_MODE !== 'false';
    this.sapAdapter = isDemoMode ? new MockSAPAdapter() : new S4HanaCloudAdapter();

    this.dataStore = new MockSourceDataStore();
    this.auditTrailService = new AuditTrailService();
    this.integrationMonitorService = new IntegrationMonitorService();
    this.poMatchingService = new POMatchingService(this.sapAdapter);
    this.reconciliationService = new ThreeWayReconciliationService(this.sapAdapter);
    this.aiDecisionEngine = new AIDecisionEngine(this.sapAdapter);
    this.businessValidationService = new BusinessValidationService(this.auditTrailService);
    this.slaMonitorService = new SLAMonitorService();
    this.gstReconciliationService = new GSTReconciliationService();
    this.sapPostingService = new SAPPostingService(
      this.sapAdapter,
      this.auditTrailService,
      this.integrationMonitorService,
      (inv) => this.dataStore.saveInvoice(inv)
    );

    this.resetToDefaultScenarios();
  }

  public resetToDefaultScenarios(): void {
    this.invoices.clear();
    this.channelBatchStatus = { physical: false, email: false, einvoice: false };
    this.dataStore.seedAll();
    const stored = this.dataStore.getAllInvoices();
    stored.forEach((inv) => {
      // Scenario A: Already Posted + Paid (e.g. INV-SCAN-641331)
      if (inv.invoiceId === 'INV-SCAN-641331') {
        inv.postingStatus = 'POSTED';
        inv.processingStatus = 'POSTED_TO_SAP';
        inv.accountingDocumentNumber = '5100001234';
        inv.fiscalYear = '2026';
        inv.postingDate = '2026-10-01';
        inv.paymentStatus = 'PAID';
        inv.paymentDocumentNumber = '2000012345';
        inv.paymentReference = 'PAY-2026-000874';
        inv.paymentDate = '2026-10-02';
        inv.clearingStatus = 'CLEARED';
        inv.clearingDocumentNumber = '2000012346';
        inv.clearingDate = '2026-10-03';
      }
      // Scenario C: Already Posted + Payment Pending (e.g. INV-SCAN-514037)
      else if (inv.invoiceId === 'INV-SCAN-514037') {
        inv.postingStatus = 'POSTED';
        inv.processingStatus = 'POSTED_TO_SAP';
        inv.accountingDocumentNumber = '5100001280';
        inv.fiscalYear = '2026';
        inv.postingDate = '2026-10-03';
        inv.paymentStatus = 'PAYMENT_PENDING';
        inv.clearingStatus = 'OPEN';
      }
      // Standard baseline configurations
      else {
        if (!inv.postingStatus) {
          inv.postingStatus = inv.processingStatus === 'POSTED_TO_SAP' ? 'POSTED' : inv.processingStatus === 'PARKED_IN_SAP' ? 'PARKED' : 'NOT_POSTED';
        }
        if (!inv.paymentStatus) {
          inv.paymentStatus = inv.processingStatus === 'POSTED_TO_SAP' ? 'PAYMENT_PENDING' : 'NOT_DUE';
        }
        if (!inv.clearingStatus) {
          inv.clearingStatus = 'OPEN';
        }
      }
      this.invoices.set(inv.invoiceId, inv);
    });

    // Seed Scenario J (Business Owner Rejection)
    this.businessValidationService.recordDecision({
      invoiceId: 'INV-2026-00010',
      action: 'REJECT',
      userId: 'AVERMA',
      userName: 'Amit Verma',
      role: 'BUSINESS_OWNER',
      department: 'Facilities & Plant Operations',
      costCenter: 'CC-1010-ENG',
      reason: 'Quarterly HVAC cleaning not performed up to contract standards. Re-work requested.',
      previousStatus: 'PENDING_BUSINESS_VALIDATION',
    });
  }

  public getBatchStatus() {
    const physicalCount = this.dataStore.getSourceFixtureCount('PHYSICAL_SCAN');
    const emailCount = this.dataStore.getSourceFixtureCount('EMAIL_INBOUND');
    const einvoiceCount = this.dataStore.getSourceFixtureCount('GOVERNMENT_EINVOICE');
    return {
      channels: {
        physical: {
          processed: this.channelBatchStatus.physical,
          count: physicalCount,
          activeCount: this.getInvoicesByChannel('PHYSICAL_SCAN').length,
        },
        email: {
          processed: this.channelBatchStatus.email,
          count: emailCount,
          activeCount: this.getInvoicesByChannel('EMAIL_INBOUND').length,
        },
        einvoice: {
          processed: this.channelBatchStatus.einvoice,
          count: einvoiceCount,
          activeCount: this.getInvoicesByChannel('GOVERNMENT_EINVOICE').length,
        },
      },
    };
  }

  public async ingestChannelBatch(channelKey: 'physical' | 'email' | 'einvoice'): Promise<{
    channel: string;
    count: number;
    invoices: CanonicalSupplierInvoice[];
  }> {
    const channelMap: Record<string, any> = {
      physical: 'PHYSICAL_SCAN',
      email: 'EMAIL_INBOUND',
      einvoice: 'GOVERNMENT_EINVOICE',
    };
    const channelNameMap: Record<string, string> = {
      physical: 'Physical Gate Scanner',
      email: 'Vendor AP Mailbox',
      einvoice: 'Government E-Invoice / IRP',
    };

    const sourceChannel = channelMap[channelKey];
    if (!sourceChannel) {
      throw new Error(`Invalid channel '${channelKey}' specified.`);
    }

    if (this.channelBatchStatus[channelKey]) {
      throw new Error(`${channelNameMap[channelKey]} invoice batch has already been processed in this demo cycle.`);
    }

    // Load all canonical invoices for this channel directly from disk fixtures
    const channelFixtures = this.dataStore.getInvoicesByChannel(sourceChannel);

    for (const inv of channelFixtures) {
      // Ingest/update into runtime state without overwriting or destroying source files
      this.invoices.set(inv.invoiceId, inv);

      // Record audit event
      this.auditTrailService.recordEvent({
        invoiceId: inv.invoiceId,
        actorId: 'BATCH_INTAKE_GATEWAY',
        actorName: `${channelNameMap[channelKey]} Batch Pipeline`,
        actorRole: 'SYSTEM_INTAKE',
        action: 'INVOICE_BATCH_INGESTED',
        previousState: 'DISCOVERED',
        newState: inv.processingStatus,
        justification: `Batch ingestion completed for ${inv.invoiceNumber} via ${channelNameMap[channelKey]}`,
      });

      // Record integration message
      this.integrationMonitorService.logMessage({
        interfaceName: `Batch_Inbound_${sourceChannel}_Ingest`,
        senderSystem: sourceChannel,
        receiverSystem: 'SAP_BTP_DECISION_ENGINE',
        status: 'SUCCESS',
        direction: 'INBOUND',
        invoiceId: inv.invoiceId,
        payloadSummary: `Batch ingested invoice ${inv.invoiceNumber} (₹${inv.totalGrossAmount.toLocaleString('en-IN')})`,
        requestPayloadPreview: inv,
        responsePayloadPreview: { status: 'BATCH_INGESTED', invoiceId: inv.invoiceId },
      });

      // Resolve business owner & register SLA
      let po: SAPPurchaseOrder | null = null;
      if (inv.purchaseOrderReference) {
        po = await this.sapAdapter.getPurchaseOrder(inv.purchaseOrderReference);
      }
      const bo = this.businessValidationService.resolveBusinessOwner(inv, po);
      this.slaMonitorService.registerInvoiceSLA(inv, bo.name);
    }

    // Mark channel batch as processed in this demo cycle
    this.channelBatchStatus[channelKey] = true;

    return {
      channel: channelKey,
      count: channelFixtures.length,
      invoices: channelFixtures,
    };
  }

  public getAllInvoices(): CanonicalSupplierInvoice[] {
    return Array.from(this.invoices.values());
  }

  public getInvoicesByChannel(channel: string): CanonicalSupplierInvoice[] {
    return this.getAllInvoices().filter((inv) => inv.sourceChannel === channel);
  }

  public saveInvoice(invoice: CanonicalSupplierInvoice): void {
    this.invoices.set(invoice.invoiceId, invoice);
    this.dataStore.saveInvoice(invoice);
  }

  public getInvoiceById(invoiceId: string): CanonicalSupplierInvoice | null {
    return this.invoices.get(invoiceId) || null;
  }

  public buildDocumentChain(
    invoice: CanonicalSupplierInvoice,
    po: SAPPurchaseOrder | null,
    reconciliation?: ThreeWayReconciliationSummary
  ): DocumentReferenceNode[] {
    const chain: DocumentReferenceNode[] = [];

    // 1. Supplier Invoice
    chain.push({
      type: 'SUPPLIER_INVOICE',
      label: 'Supplier Invoice',
      referenceNumber: invoice.invoiceNumber,
      source: `Inbound (${invoice.sourceChannel.replace(/_/g, ' ')})`,
      status: 'CAPTURED',
      timestamp: invoice.intakeTimestamp,
    });

    // 2. Purchase Order
    chain.push({
      type: 'PURCHASE_ORDER',
      label: 'Purchase Order',
      referenceNumber: po ? po.poNumber : (invoice.purchaseOrderReference || 'NOT CREATED'),
      source: po ? 'SAP S/4HANA (EKKO)' : 'Non-PO / Direct Accounting',
      status: po ? po.status : 'NOT APPLICABLE',
      timestamp: po ? po.poDate : undefined,
    });

    // 3. Goods Receipt
    const hasGR = Boolean(reconciliation && reconciliation.quantityReceived > 0);
    const grDocNum = po?.poNumber === '4500012456' ? '5000018901'
      : po?.poNumber === '4500012500' ? '5000018915'
      : po?.poNumber === '4500012750' ? '5000018930'
      : po?.poNumber === '4500012800' ? '5000018945'
      : po?.poNumber === '4500012850' ? '5000018950'
      : po?.poNumber === '4500012900' ? '5000018960'
      : po?.poNumber === '4500012920' ? '5000018970'
      : po?.poNumber === '4500012950' ? '5000018980'
      : (hasGR ? '5000018901' : 'NOT CREATED');

    chain.push({
      type: 'GOODS_RECEIPT',
      label: 'Goods Receipt (MSEG)',
      referenceNumber: hasGR ? grDocNum : 'NOT CREATED',
      source: hasGR ? 'SAP S/4HANA Material Document' : 'Pending Receipt',
      status: hasGR ? (reconciliation?.quantityStatus === 'EXACT_MATCH' ? 'POSTED (EXACT)' : 'POSTED (PARTIAL)') : 'NOT CREATED',
      timestamp: hasGR ? '2026-09-30' : undefined,
      fiscalYear: '2026',
    });

    // 4. Quality Inspection (if QM lot exists / applicable)
    if (reconciliation && reconciliation.qualityStatus !== 'NOT_APPLICABLE') {
      const qmPassed = reconciliation.qualityStatus === 'ALL_PASSED';
      const lotId = po?.poNumber === '4500012800' ? '100004580'
        : po?.poNumber === '4500012456' ? '100004510'
        : po?.poNumber === '4500012500' ? '100004520'
        : '100004600';

      chain.push({
        type: 'QUALITY_LOT',
        label: 'Quality Inspection Lot (QALS)',
        referenceNumber: lotId,
        source: 'SAP QM Inspection Lot',
        status: qmPassed ? 'PASSED / ACCEPTED' : 'REJECTIONS DETECTED',
        timestamp: '2026-09-28',
      });
    }

    // 5. Parked Invoice Reference (MIR7)
    const isParked = invoice.postingStatus === 'PARKED' || invoice.processingStatus === 'PARKED_IN_SAP' || Boolean(invoice.parkedDocumentNumber);
    chain.push({
      type: 'PARKED_INVOICE',
      label: 'Parked Supplier Invoice (MIR7)',
      referenceNumber: isParked ? (invoice.parkedDocumentNumber || '5105600121') : 'NOT CREATED',
      source: 'SAP S/4HANA Preliminary Posting',
      status: isParked ? 'PARKED (PAYMENT BLOCK R)' : 'NOT CREATED',
      timestamp: invoice.parkedDate || (isParked ? '2026-10-04' : undefined),
      fiscalYear: '2026',
    });

    // 6. Posted Invoice / Accounting Document (MIRO / BELNR)
    const isPosted = invoice.postingStatus === 'POSTED' || invoice.processingStatus === 'POSTED_TO_SAP' || Boolean(invoice.accountingDocumentNumber);
    chain.push({
      type: 'ACCOUNTING_DOCUMENT',
      label: 'Accounting Document (BELNR / MIRO)',
      referenceNumber: isPosted ? (invoice.accountingDocumentNumber || '5105600122') : 'NOT CREATED',
      source: 'SAP S/4HANA Logistics Invoice Verification',
      status: isPosted ? 'POSTED' : 'NOT CREATED',
      timestamp: invoice.postingDate || (isPosted ? '2026-10-05' : undefined),
      fiscalYear: invoice.fiscalYear || (isPosted ? '2026' : undefined),
    });

    // 7. Payment Document (F110 / AP)
    const isPaid = invoice.paymentStatus === 'PAID' || invoice.clearingStatus === 'CLEARED' || Boolean(invoice.paymentDocumentNumber);
    chain.push({
      type: 'PAYMENT_DOCUMENT',
      label: 'Payment Document (F110 / AP)',
      referenceNumber: isPaid ? (invoice.paymentDocumentNumber || '2000012345') : 'NOT CREATED',
      source: 'SAP FI-AP Automatic Payment Run',
      status: isPaid ? 'PAID / DISBURSED' : (invoice.paymentStatus === 'PAYMENT_PENDING' ? 'PAYMENT PENDING' : 'NOT CREATED'),
      timestamp: invoice.paymentDate || (isPaid ? '2026-10-05' : undefined),
    });

    // 8. Clearing Document
    const isCleared = invoice.clearingStatus === 'CLEARED' || Boolean(invoice.clearingDocumentNumber);
    chain.push({
      type: 'CLEARING_DOCUMENT',
      label: 'Clearing Document (BSAK / Settlement)',
      referenceNumber: isCleared ? (invoice.clearingDocumentNumber || '2000012346') : 'NOT CREATED',
      source: 'SAP FI-AP Settlement Clearing',
      status: isCleared ? 'CLEARED' : 'NOT CREATED',
      timestamp: invoice.clearingDate || (isCleared ? '2026-10-06' : undefined),
    });

    return chain;
  }

  public async getInvoiceDetail(invoiceId: string): Promise<InvoiceDetailView | null> {
    const invoice = this.invoices.get(invoiceId);
    if (!invoice) return null;

    let purchaseOrder: SAPPurchaseOrder | null = null;
    if (invoice.purchaseOrderReference) {
      purchaseOrder = await this.sapAdapter.getPurchaseOrder(invoice.purchaseOrderReference);
    }

    const reconciliation = await this.reconciliationService.reconcile(invoice, purchaseOrder);
    const boDecision = this.businessValidationService.getDecision(invoiceId);
    const businessOwner = this.businessValidationService.resolveBusinessOwner(invoice, purchaseOrder);

    const aiDecision = await this.aiDecisionEngine.evaluate({
      invoice,
      purchaseOrder,
      reconciliation,
      businessOwnerRecord: boDecision,
    });

    const slaRecord = this.slaMonitorService.getSLAStatus(invoiceId);
    const auditTrail = this.auditTrailService.getEventsForInvoice(invoiceId);

    const documentChain = this.buildDocumentChain(invoice, purchaseOrder, reconciliation);
    invoice.documentChain = documentChain;
    invoice.comparisonRows = reconciliation.comparisonRows || [];

    return {
      invoice,
      purchaseOrder,
      reconciliation,
      aiDecision,
      businessOwner,
      businessOwnerDecision: boDecision,
      slaRecord,
      auditTrail,
      documentChain,
      comparisonRows: reconciliation.comparisonRows || [],
    };
  }

  public async addInvoice(invoice: CanonicalSupplierInvoice): Promise<InvoiceDetailView> {
    this.invoices.set(invoice.invoiceId, invoice);
    this.dataStore.saveInvoice(invoice);

    this.auditTrailService.recordEvent({
      invoiceId: invoice.invoiceId,
      actorId: 'INTAKE_GATEWAY',
      actorName: 'Multi-Channel Intake Gateway',
      actorRole: 'SYSTEM_INTAKE',
      action: 'INVOICE_INGESTED',
      previousState: 'NONE',
      newState: invoice.processingStatus,
      justification: `Received via ${invoice.sourceChannel} from ${invoice.supplierName}`,
    });

    this.integrationMonitorService.logMessage({
      interfaceName: `Inbound_${invoice.sourceChannel}_Ingest`,
      senderSystem: invoice.sourceChannel,
      receiverSystem: 'SAP_BTP_DECISION_ENGINE',
      status: 'SUCCESS',
      direction: 'INBOUND',
      invoiceId: invoice.invoiceId,
      payloadSummary: `New invoice ingested: ${invoice.invoiceNumber} for ₹${invoice.totalGrossAmount.toLocaleString('en-IN')}`,
      requestPayloadPreview: invoice,
      responsePayloadPreview: { status: 'NORMALIZED', invoiceId: invoice.invoiceId },
    });

    let po: SAPPurchaseOrder | null = null;
    if (invoice.purchaseOrderReference) {
      po = await this.sapAdapter.getPurchaseOrder(invoice.purchaseOrderReference);
    }
    const bo = this.businessValidationService.resolveBusinessOwner(invoice, po);
    this.slaMonitorService.registerInvoiceSLA(invoice, bo.name);

    const detail = await this.getInvoiceDetail(invoice.invoiceId);
    return detail!;
  }

  public async submitBusinessValidation(params: {
    invoiceId: string;
    action: BusinessOwnerAction;
    userId: string;
    userName: string;
    department: string;
    costCenter: string;
    reason: string;
  }): Promise<InvoiceDetailView> {
    const invoice = this.invoices.get(params.invoiceId);
    if (!invoice) throw new Error(`Invoice ${params.invoiceId} not found`);

    const prevStatus = invoice.processingStatus;
    this.businessValidationService.recordDecision({
      ...params,
      role: 'BUSINESS_OWNER',
      previousStatus: prevStatus,
    });

    if (params.action === 'ACCEPT') {
      invoice.processingStatus = 'BUSINESS_VALIDATED';
    } else if (params.action === 'REJECT') {
      invoice.processingStatus = 'REJECTED';
    }

    this.dataStore.saveInvoice(invoice);

    const detail = await this.getInvoiceDetail(params.invoiceId);
    return detail!;
  }
}
