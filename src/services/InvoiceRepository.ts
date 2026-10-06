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
    this.dataStore.seedAll();
    const stored = this.dataStore.getAllInvoices();
    stored.forEach((inv) => {
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

    return {
      invoice,
      purchaseOrder,
      reconciliation,
      aiDecision,
      businessOwner,
      businessOwnerDecision: boDecision,
      slaRecord,
      auditTrail,
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
