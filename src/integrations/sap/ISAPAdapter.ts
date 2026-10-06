/**
 * ISAPAdapter — Unified Enterprise Contract for SAP S/4HANA Connectivity
 * Mirrors standard OData V2/V4 services:
 * - API_BUSINESS_PARTNER
 * - API_PURCHASEORDER_PROCESS_SRV
 * - API_MATERIAL_DOCUMENT_SRV
 * - API_SUPPLIERINVOICE_PROCESS_SRV
 */

import {
  SAPBusinessPartner,
  SAPPurchaseOrder,
  SAPGoodsReceipt,
  SAPQualityLot,
  SAPPostingResult,
  CanonicalSupplierInvoice,
} from '../../models/types';

export interface ISAPAdapter {
  /**
   * Query Business Partner by Supplier ID (LFA1-LIFNR)
   */
  getBusinessPartner(supplierId: string): Promise<SAPBusinessPartner | null>;

  /**
   * Query Business Partner by Tax Identification (GSTIN / STCD3)
   */
  getBusinessPartnerByTaxId(taxId: string): Promise<SAPBusinessPartner | null>;

  /**
   * Retrieve Purchase Order Header and Line Items (EKKO/EKPO)
   */
  getPurchaseOrder(poNumber: string): Promise<SAPPurchaseOrder | null>;

  /**
   * Retrieve Goods Receipt Material Documents (MSEG/MATDOC)
   */
  getGoodsReceipts(poNumber: string, itemNumber?: string): Promise<SAPGoodsReceipt[]>;

  /**
   * Retrieve SAP Quality Management (QM) Inspection Lot details
   */
  getQualityInspectionLot(lotId: string): Promise<SAPQualityLot | null>;

  /**
   * Check for duplicate invoice in SAP Logistics Invoice Verification index (RBKP)
   */
  checkDuplicateInvoice(supplierId: string, invoiceNumber: string, fiscalYear: string): Promise<boolean>;

  /**
   * Post final Logistics Supplier Invoice into SAP S/4HANA (MIRO)
   */
  postSupplierInvoice(invoice: CanonicalSupplierInvoice): Promise<SAPPostingResult>;

  /**
   * Preliminary Post (Park) Supplier Invoice in SAP S/4HANA (MIR7 / F-47)
   */
  parkSupplierInvoice(invoice: CanonicalSupplierInvoice, reason: string): Promise<SAPPostingResult>;
}
