/**
 * MockSAPAdapter — High-Fidelity SAP S/4HANA & LIV Simulator
 * Simulates standard SAP S/4HANA OData services with full relational integrity.
 * Clearly labeled as DEMO / MOCK DATA.
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
import {
  MOCK_BUSINESS_PARTNERS,
  MOCK_PURCHASE_ORDERS,
  MOCK_GOODS_RECEIPTS,
  MOCK_QUALITY_LOTS,
} from '../../data/mockEnterpriseData';

export class MockSAPAdapter implements ISAPAdapter {
  private businessPartners: Map<string, SAPBusinessPartner> = new Map();
  private purchaseOrders: Map<string, SAPPurchaseOrder> = new Map();
  private goodsReceipts: SAPGoodsReceipt[] = [];
  private qualityLots: Map<string, SAPQualityLot> = new Map();
  private postedInvoices: Set<string> = new Set();
  private documentCounter: number = 5105600120;

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    MOCK_BUSINESS_PARTNERS.forEach((bp) => {
      this.businessPartners.set(bp.supplierId, bp);
    });

    MOCK_PURCHASE_ORDERS.forEach((po) => {
      this.purchaseOrders.set(po.poNumber, po);
    });

    this.goodsReceipts = [...MOCK_GOODS_RECEIPTS];

    MOCK_QUALITY_LOTS.forEach((lot) => {
      this.qualityLots.set(lot.lotId, lot);
    });

    // Seed historical posted invoice for Scenario 7 duplicate simulation:
    // Supplier: 10005500 (AWS), Invoice: AWS/2026/1090, Year: 2026
    this.postedInvoices.add('10005500:AWS/2026/1090:2026');
  }

  public async getBusinessPartner(supplierId: string): Promise<SAPBusinessPartner | null> {
    return this.businessPartners.get(supplierId) || null;
  }

  public async getBusinessPartnerByTaxId(taxId: string): Promise<SAPBusinessPartner | null> {
    const normalizedTax = taxId.trim().toUpperCase();
    for (const bp of this.businessPartners.values()) {
      if (bp.gstinTaxId.toUpperCase() === normalizedTax) {
        return bp;
      }
    }
    return null;
  }

  public async getPurchaseOrder(poNumber: string): Promise<SAPPurchaseOrder | null> {
    return this.purchaseOrders.get(poNumber) || null;
  }

  public async getGoodsReceipts(poNumber: string, itemNumber?: string): Promise<SAPGoodsReceipt[]> {
    const matched = this.goodsReceipts.filter((gr) => gr.poNumber === poNumber);
    if (!itemNumber) {
      return matched;
    }
    return matched.map((gr) => ({
      ...gr,
      items: gr.items.filter((item) => item.poItemNumber === itemNumber),
    }));
  }

  public async getQualityInspectionLot(lotId: string): Promise<SAPQualityLot | null> {
    return this.qualityLots.get(lotId) || null;
  }

  public async checkDuplicateInvoice(
    supplierId: string,
    invoiceNumber: string,
    fiscalYear: string
  ): Promise<boolean> {
    const key = `${supplierId}:${invoiceNumber}:${fiscalYear}`;
    return this.postedInvoices.has(key);
  }

  public async postSupplierInvoice(invoice: CanonicalSupplierInvoice): Promise<SAPPostingResult> {
    this.documentCounter++;
    const belnr = `${this.documentCounter}`;
    const fiscalYear = new Date().getFullYear().toString();
    const duplicateKey = `${invoice.supplierId || 'UNKNOWN'}:${invoice.invoiceNumber}:${fiscalYear}`;

    this.postedInvoices.add(duplicateKey);

    return {
      success: true,
      accountingDocumentNumber: belnr,
      fiscalYear,
      companyCode: invoice.buyerCompanyCode || '1010',
      documentType: 'RE',
      postingStatus: 'POSTED',
      message: `[MOCK S/4HANA] Supplier invoice posted successfully in Company Code ${invoice.buyerCompanyCode}. Accounting Document ${belnr}/${fiscalYear} created.`,
      sapPostingTimestamp: new Date().toISOString(),
    };
  }

  public async parkSupplierInvoice(
    invoice: CanonicalSupplierInvoice,
    reason: string
  ): Promise<SAPPostingResult> {
    this.documentCounter++;
    const belnr = `${this.documentCounter}`;
    const fiscalYear = new Date().getFullYear().toString();

    return {
      success: true,
      accountingDocumentNumber: belnr,
      fiscalYear,
      companyCode: invoice.buyerCompanyCode || '1010',
      documentType: 'KR',
      postingStatus: 'PARKED',
      paymentBlockKey: 'R',
      message: `[MOCK S/4HANA] Invoice parked (preliminary posted) as document ${belnr}/${fiscalYear}. Payment block 'R' applied. Reason: ${reason}`,
      sapPostingTimestamp: new Date().toISOString(),
    };
  }

  // Helper method for test resets or inspection
  public getAllPurchaseOrders(): SAPPurchaseOrder[] {
    return Array.from(this.purchaseOrders.values());
  }

  public getAllBusinessPartners(): SAPBusinessPartner[] {
    return Array.from(this.businessPartners.values());
  }

  public getAllGoodsReceipts(): SAPGoodsReceipt[] {
    return this.goodsReceipts;
  }
}
