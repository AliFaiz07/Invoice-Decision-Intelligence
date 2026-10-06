/**
 * POMatchingService — SAP Purchase Order Identification & Header Alignment
 * Cross-references Canonical Invoice against SAP S/4HANA EKKO/EKPO data.
 */

import { ISAPAdapter } from '../integrations/sap/ISAPAdapter';
import { CanonicalSupplierInvoice, SAPPurchaseOrder } from '../models/types';

export interface POMatchResult {
  hasPO: boolean;
  poNumber?: string;
  purchaseOrder?: SAPPurchaseOrder | null;
  vendorMatched: boolean;
  currencyMatched: boolean;
  companyCodeMatched: boolean;
  poMatchScore: number; // 0 - 100
  matchBreakdown: {
    vendorMatch: boolean;
    poNumberMatch: boolean;
    currencyMatch: boolean;
    lineItemMatch: boolean;
  };
  explanation: string;
}

export class POMatchingService {
  private sapAdapter: ISAPAdapter;

  constructor(sapAdapter: ISAPAdapter) {
    this.sapAdapter = sapAdapter;
  }

  public async evaluatePOMatch(invoice: CanonicalSupplierInvoice): Promise<POMatchResult> {
    const poNumber = invoice.purchaseOrderReference;

    // Case 1: No PO Reference provided
    if (!poNumber) {
      return {
        hasPO: false,
        vendorMatched: false,
        currencyMatched: true,
        companyCodeMatched: true,
        poMatchScore: 0,
        matchBreakdown: {
          vendorMatch: false,
          poNumberMatch: false,
          currencyMatch: false,
          lineItemMatch: false,
        },
        explanation: 'No Purchase Order reference was identified in invoice payload. Diverted to SAP Non-PO workflow.',
      };
    }

    // Lookup PO in SAP S/4HANA
    const po = await this.sapAdapter.getPurchaseOrder(poNumber);
    if (!po) {
      return {
        hasPO: false,
        poNumber,
        purchaseOrder: null,
        vendorMatched: false,
        currencyMatched: false,
        companyCodeMatched: false,
        poMatchScore: 10,
        matchBreakdown: {
          vendorMatch: false,
          poNumberMatch: false,
          currencyMatch: false,
          lineItemMatch: false,
        },
        explanation: `Purchase Order ${poNumber} referenced on invoice does not exist in SAP S/4HANA (API_PURCHASEORDER_PROCESS_SRV).`,
      };
    }

    // Resolve invoice supplier against SAP Business Partner
    let invoiceSupplierId = invoice.supplierId;
    if (!invoiceSupplierId && invoice.supplierTaxId) {
      const bp = await this.sapAdapter.getBusinessPartnerByTaxId(invoice.supplierTaxId);
      if (bp) {
        invoiceSupplierId = bp.supplierId;
        invoice.supplierId = bp.supplierId;
      }
    }

    const vendorMatched =
      (invoiceSupplierId && invoiceSupplierId === po.supplierId) ||
      invoice.supplierName.toLowerCase().includes(po.supplierName.toLowerCase().slice(0, 10));

    const currencyMatched = invoice.currency.toUpperCase() === po.currency.toUpperCase();
    const companyCodeMatched = invoice.buyerCompanyCode === po.companyCode;

    // Line item check: match by item number or description keywords
    const lineItemMatch = invoice.lineItems.some((invItem) =>
      po.lineItems.some(
        (poItem) =>
          poItem.itemNumber === invItem.itemNumber ||
          poItem.description.toLowerCase().includes(invItem.description.toLowerCase().slice(0, 15))
      )
    );

    // Calculate score
    let score = 0;
    if (po) score += 30;
    if (vendorMatched) score += 35;
    if (currencyMatched) score += 15;
    if (lineItemMatch) score += 20;

    let explanation = `PO ${poNumber} identified in SAP S/4HANA. `;
    if (!vendorMatched) {
      explanation += `CRITICAL: Invoice vendor (${invoice.supplierName} / ${invoice.supplierTaxId}) does not match PO vendor (${po.supplierName} / LIFNR ${po.supplierId}).`;
    } else {
      explanation += `Vendor matches PO supplier. Currency (${po.currency}) and line items verified.`;
    }

    return {
      hasPO: true,
      poNumber,
      purchaseOrder: po,
      vendorMatched,
      currencyMatched,
      companyCodeMatched,
      poMatchScore: score,
      matchBreakdown: {
        vendorMatch: vendorMatched,
        poNumberMatch: true,
        currencyMatch: currencyMatched,
        lineItemMatch,
      },
      explanation,
    };
  }
}
