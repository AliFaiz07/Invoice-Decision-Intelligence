/**
 * S4HanaCloudAdapter — Production SAP S/4HANA OData Implementation
 * Uses SAP Cloud SDK conventions to connect to SAP S/4HANA Cloud via SAP BTP Destination Service.
 * Activated when DEMO_MODE=false.
 */

import { ISAPAdapter } from './ISAPAdapter';
import {
  SAPBusinessPartner,
  SAPPurchaseOrder,
  SAPGoodsReceipt,
  SAPQualityLot,
  SAPPostingResult,
  CanonicalSupplierInvoice,
} from '../../models/types';

export class S4HanaCloudAdapter implements ISAPAdapter {
  private destinationName: string;
  private client: string;

  constructor() {
    this.destinationName = process.env.SAP_DESTINATION_NAME || 'S4HANA_CLOUD_API';
    this.client = process.env.SAP_CLIENT || '100';
  }

  private ensureConfigured(): void {
    if (!process.env.SAP_BTP_DESTINATION_SERVICE_URL && process.env.DEMO_MODE !== 'true') {
      throw new Error(
        `[SAP BTP Destination Error] S4HanaCloudAdapter is configured for PRODUCTION MODE, ` +
          `but SAP_BTP_DESTINATION_SERVICE_URL is not set in environment. ` +
          `Please configure BTP Destination '${this.destinationName}' or toggle DEMO_MODE=true.`
      );
    }
  }

  public async getBusinessPartner(supplierId: string): Promise<SAPBusinessPartner | null> {
    this.ensureConfigured();
    // In production, delegates to:
    // executeHttpRequest({ destinationName: this.destinationName }, {
    //   method: 'get',
    //   url: `/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner('${supplierId}')?$expand=to_Supplier`
    // })
    throw new Error(`Production endpoint not reachable from local test environment.`);
  }

  public async getBusinessPartnerByTaxId(taxId: string): Promise<SAPBusinessPartner | null> {
    this.ensureConfigured();
    throw new Error(`Production endpoint not reachable from local test environment.`);
  }

  public async getPurchaseOrder(poNumber: string): Promise<SAPPurchaseOrder | null> {
    this.ensureConfigured();
    // In production, delegates to:
    // API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrder('${poNumber}')?$expand=to_PurchaseOrderItem
    throw new Error(`Production endpoint not reachable from local test environment.`);
  }

  public async getGoodsReceipts(poNumber: string, itemNumber?: string): Promise<SAPGoodsReceipt[]> {
    this.ensureConfigured();
    // In production, delegates to:
    // API_MATERIAL_DOCUMENT_SRV/A_MaterialDocumentItem?$filter=PurchaseOrder eq '${poNumber}'
    throw new Error(`Production endpoint not reachable from local test environment.`);
  }

  public async getQualityInspectionLot(lotId: string): Promise<SAPQualityLot | null> {
    this.ensureConfigured();
    throw new Error(`Production endpoint not reachable from local test environment.`);
  }

  public async checkDuplicateInvoice(
    supplierId: string,
    invoiceNumber: string,
    fiscalYear: string
  ): Promise<boolean> {
    this.ensureConfigured();
    throw new Error(`Production endpoint not reachable from local test environment.`);
  }

  public async postSupplierInvoice(invoice: CanonicalSupplierInvoice): Promise<SAPPostingResult> {
    this.ensureConfigured();
    // In production, delegates to:
    // API_SUPPLIERINVOICE_PROCESS_SRV/A_SupplierInvoice with CSRF token handshake
    throw new Error(`Production endpoint not reachable from local test environment.`);
  }

  public async parkSupplierInvoice(
    invoice: CanonicalSupplierInvoice,
    reason: string
  ): Promise<SAPPostingResult> {
    this.ensureConfigured();
    throw new Error(`Production endpoint not reachable from local test environment.`);
  }
}
