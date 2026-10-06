/**
 * ThreeWayReconciliationService — SAP Logistics Invoice Verification (LIV)
 * Performs Three-Way Matching: Purchase Order + Goods Receipt + Invoice
 * Implements standard SAP tolerance keys:
 * - DQ: Exceed amount: quantity variance
 * - PP: Price variance
 * - BD: Form small differences
 */

import { ISAPAdapter } from '../integrations/sap/ISAPAdapter';
import {
  CanonicalSupplierInvoice,
  SAPPurchaseOrder,
  ThreeWayReconciliationSummary,
  SAPGoodsReceipt,
} from '../models/types';

export class ThreeWayReconciliationService {
  private sapAdapter: ISAPAdapter;

  // Standard SAP LIV tolerance settings (configurable in production S/4HANA via OMRX)
  private readonly PRICE_VARIANCE_TOLERANCE_PCT = 2.0; // 2% tolerance
  private readonly AMOUNT_VARIANCE_TOLERANCE_PCT = 2.0; // 2% tolerance

  constructor(sapAdapter: ISAPAdapter) {
    this.sapAdapter = sapAdapter;
  }

  public async reconcile(
    invoice: CanonicalSupplierInvoice,
    po: SAPPurchaseOrder | null
  ): Promise<ThreeWayReconciliationSummary> {
    // If no PO, return default non-PO reconciliation summary
    if (!po) {
      return {
        poNumber: undefined,
        poMatchScorePercentage: 0,
        vendorMatched: false,
        poNumberMatched: false,
        currencyMatched: true,
        lineItemsMatched: false,
        quantityStatus: 'NO_GR_FOUND',
        quantityInvoiced: invoice.lineItems.reduce((acc, i) => acc + i.quantity, 0),
        quantityReceived: 0,
        quantityOrdered: 0,
        priceStatus: 'EXACT_MATCH',
        invoicedUnitPrice: invoice.lineItems[0]?.unitPrice || 0,
        poUnitPrice: 0,
        priceVariancePercentage: 0,
        qualityStatus: 'NOT_APPLICABLE',
        acceptedQuantity: 0,
        rejectedQuantity: 0,
        amountStatus: 'WITHIN_TOLERANCE',
        invoicedTotalNet: invoice.totalNetAmount,
        poTotalNet: 0,
        grTotalNet: 0,
      };
    }

    // Retrieve Goods Receipts from SAP
    const goodsReceipts: SAPGoodsReceipt[] = await this.sapAdapter.getGoodsReceipts(po.poNumber);

    // Sum quantities across all GR items for this PO
    let totalReceivedQty = 0;
    let totalAcceptedQty = 0;
    let totalRejectedQty = 0;
    let qualityInspected = false;
    let qualityRejectionsDetected = false;

    for (const gr of goodsReceipts) {
      for (const item of gr.items) {
        totalReceivedQty += item.receivedQuantity;
        totalAcceptedQty += item.acceptedQuantity;
        totalRejectedQty += item.rejectedQuantity;

        if (item.qualityLotId) {
          qualityInspected = true;
          const lot = await this.sapAdapter.getQualityInspectionLot(item.qualityLotId);
          if (lot && (lot.status === 'REJECTED' || lot.rejectedQuantity > 0)) {
            qualityRejectionsDetected = true;
          }
        }
      }
    }

    const totalInvoicedQty = invoice.lineItems.reduce((acc, i) => acc + i.quantity, 0);
    const totalOrderedQty = po.lineItems.reduce((acc, i) => acc + i.orderQuantity, 0);

    // Quantity comparison (Tolerance Key DQ)
    let quantityStatus: 'EXACT_MATCH' | 'UNDER_DELIVERY' | 'OVER_DELIVERY' | 'NO_GR_FOUND';
    if (goodsReceipts.length === 0) {
      quantityStatus = 'NO_GR_FOUND';
    } else if (totalInvoicedQty === totalReceivedQty) {
      quantityStatus = 'EXACT_MATCH';
    } else if (totalInvoicedQty > totalReceivedQty) {
      quantityStatus = 'OVER_DELIVERY'; // Invoiced > Received (Unreceived goods billed)
    } else {
      quantityStatus = 'UNDER_DELIVERY'; // Invoiced < Received (Partial billing)
    }

    // Price comparison (Tolerance Key PP)
    const invUnitPrice = invoice.lineItems[0]?.unitPrice || 0;
    const poUnitPrice = po.lineItems[0]?.netUnitPrice || 0;
    const priceVariancePercentage =
      poUnitPrice > 0 ? ((invUnitPrice - poUnitPrice) / poUnitPrice) * 100 : 0;

    let priceStatus: 'EXACT_MATCH' | 'WITHIN_TOLERANCE' | 'EXCEEDED_TOLERANCE';
    if (Math.abs(priceVariancePercentage) < 0.01) {
      priceStatus = 'EXACT_MATCH';
    } else if (Math.abs(priceVariancePercentage) <= this.PRICE_VARIANCE_TOLERANCE_PCT) {
      priceStatus = 'WITHIN_TOLERANCE';
    } else {
      priceStatus = 'EXCEEDED_TOLERANCE';
    }

    // Quality check
    let qualityStatus: 'ALL_PASSED' | 'INSPECTION_PENDING' | 'REJECTIONS_DETECTED' | 'NOT_APPLICABLE';
    if (!qualityInspected) {
      qualityStatus = 'NOT_APPLICABLE';
    } else if (qualityRejectionsDetected || totalRejectedQty > 0) {
      qualityStatus = 'REJECTIONS_DETECTED';
    } else {
      qualityStatus = 'ALL_PASSED';
    }

    // Amount comparison (Tolerance Key BD)
    const amountVariancePercentage =
      po.totalNetValue > 0 ? ((invoice.totalNetAmount - po.totalNetValue) / po.totalNetValue) * 100 : 0;
    const amountStatus =
      amountVariancePercentage <= this.AMOUNT_VARIANCE_TOLERANCE_PCT
        ? 'WITHIN_TOLERANCE'
        : 'VARIANCE_EXCEEDED';

    // Vendor match
    const vendorMatched =
      (invoice.supplierId && invoice.supplierId === po.supplierId) ||
      invoice.supplierName.toLowerCase().includes(po.supplierName.toLowerCase().slice(0, 10));

    // PO Match Score Calculation
    let score = 0;
    if (vendorMatched) score += 25;
    if (invoice.currency.toUpperCase() === po.currency.toUpperCase()) score += 15;
    if (quantityStatus === 'EXACT_MATCH') score += 25;
    else if (quantityStatus === 'UNDER_DELIVERY') score += 15;
    if (priceStatus === 'EXACT_MATCH') score += 20;
    else if (priceStatus === 'WITHIN_TOLERANCE') score += 10;
    if (qualityStatus === 'ALL_PASSED' || qualityStatus === 'NOT_APPLICABLE') score += 15;

    return {
      poNumber: po.poNumber,
      poMatchScorePercentage: score,
      vendorMatched,
      poNumberMatched: true,
      currencyMatched: invoice.currency.toUpperCase() === po.currency.toUpperCase(),
      lineItemsMatched: true,
      quantityStatus,
      quantityInvoiced: totalInvoicedQty,
      quantityReceived: totalReceivedQty,
      quantityOrdered: totalOrderedQty,
      priceStatus,
      invoicedUnitPrice: invUnitPrice,
      poUnitPrice,
      priceVariancePercentage,
      qualityStatus,
      acceptedQuantity: totalAcceptedQty,
      rejectedQuantity: totalRejectedQty,
      amountStatus,
      invoicedTotalNet: invoice.totalNetAmount,
      poTotalNet: po.totalNetValue,
      grTotalNet: totalReceivedQty * poUnitPrice,
    };
  }
}
