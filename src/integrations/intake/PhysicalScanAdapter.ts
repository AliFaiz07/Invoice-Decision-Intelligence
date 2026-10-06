/**
 * PhysicalScanAdapter — Ingestion Adapter for Physical & Office Invoices
 * Simulates document scanning at plant security gates / mailrooms.
 * Normalizes scan metadata into the Canonical Invoice format.
 */

import { CanonicalSupplierInvoice } from '../../models/types';

export interface PhysicalScanInput {
  invoiceNumber: string;
  supplierTaxId: string;
  supplierName: string;
  invoiceDate: string;
  dueDate: string;
  currency: string;
  poReference?: string;
  totalNetAmount: number;
  taxAmount: number;
  totalGrossAmount: number;
  scannerLocation: string;
  operatorId: string;
  scanDpi?: number;
  lineItems: {
    itemNumber: string;
    description: string;
    materialNumber?: string;
    quantity: number;
    unitOfMeasure: string;
    unitPrice: number;
    netAmount: number;
    taxRate: number;
    taxAmount: number;
  }[];
}

export class PhysicalScanAdapter {
  public static normalize(input: PhysicalScanInput, generatedId?: string): CanonicalSupplierInvoice {
    const invoiceId = generatedId || `INV-SCAN-${Date.now().toString().slice(-6)}`;

    return {
      invoiceId,
      invoiceNumber: input.invoiceNumber,
      sourceChannel: 'PHYSICAL_SCAN',
      channelMetadata: {
        scannerLocation: input.scannerLocation,
        operatorId: input.operatorId,
        scanDpi: input.scanDpi || 300,
      },
      supplierTaxId: input.supplierTaxId,
      supplierName: input.supplierName,
      buyerTaxId: '29AABCT1332L1ZV', // Enterprise Buyer GSTIN
      buyerCompanyCode: '1010',
      invoiceDate: input.invoiceDate,
      dueDate: input.dueDate,
      currency: input.currency || 'INR',
      purchaseOrderReference: input.poReference,
      totalNetAmount: input.totalNetAmount,
      taxAmount: input.taxAmount,
      totalGrossAmount: input.totalGrossAmount,
      lineItems: input.lineItems,
      processingStatus: 'DATA_EXTRACTED',
      intakeTimestamp: new Date().toISOString(),
    };
  }
}
