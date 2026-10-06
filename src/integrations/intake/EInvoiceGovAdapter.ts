/**
 * EInvoiceGovAdapter — Ingestion Adapter for Government E-Invoicing Portals
 * Models statutory GST E-Invoice & SAP Document and Reporting Compliance (DRC).
 * Captures 64-char Invoice Reference Number (IRN), QR token, and Ack number.
 */

import { CanonicalSupplierInvoice } from '../../models/types';

export interface EInvoiceGovInput {
  irn: string; // 64-character statutory hash
  acknowledgementNumber: string;
  acknowledgementDate: string;
  digitalSignatureValid: boolean;
  invoiceNumber: string;
  supplierGstin: string;
  supplierLegalName: string;
  buyerGstin: string;
  invoiceDate: string;
  dueDate: string;
  currency: string;
  poReference?: string;
  totalTaxableValue: number;
  cgstAmount?: number;
  sgstAmount?: number;
  igstAmount?: number;
  totalInvoiceValue: number;
  lineItems: {
    itemNumber: string;
    description: string;
    hsnCode?: string;
    quantity: number;
    unitOfMeasure: string;
    unitPrice: number;
    taxableAmount: number;
    gstRate: number;
    gstAmount: number;
  }[];
}

export class EInvoiceGovAdapter {
  public static normalize(input: EInvoiceGovInput, generatedId?: string): CanonicalSupplierInvoice {
    const invoiceId = generatedId || `INV-EINV-${Date.now().toString().slice(-6)}`;
    const taxAmount = (input.cgstAmount || 0) + (input.sgstAmount || 0) + (input.igstAmount || 0);

    return {
      invoiceId,
      invoiceNumber: input.invoiceNumber,
      sourceChannel: 'GOVERNMENT_EINVOICE',
      channelMetadata: {
        irn: input.irn,
        acknowledgementNumber: input.acknowledgementNumber,
        acknowledgementDate: input.acknowledgementDate,
        digitalSignatureValid: input.digitalSignatureValid,
      },
      supplierTaxId: input.supplierGstin,
      supplierName: input.supplierLegalName,
      buyerTaxId: input.buyerGstin || '29AABCT1332L1ZV',
      buyerCompanyCode: '1010',
      invoiceDate: input.invoiceDate,
      dueDate: input.dueDate,
      currency: input.currency || 'INR',
      purchaseOrderReference: input.poReference,
      totalNetAmount: input.totalTaxableValue,
      taxAmount: taxAmount > 0 ? taxAmount : input.totalInvoiceValue - input.totalTaxableValue,
      totalGrossAmount: input.totalInvoiceValue,
      lineItems: input.lineItems.map((item) => ({
        itemNumber: item.itemNumber,
        description: item.description,
        materialNumber: undefined,
        quantity: item.quantity,
        unitOfMeasure: item.unitOfMeasure,
        unitPrice: item.unitPrice,
        netAmount: item.taxableAmount,
        taxRate: item.gstRate,
        taxAmount: item.gstAmount,
      })),
      processingStatus: 'PENDING_BUSINESS_VALIDATION',
      intakeTimestamp: new Date().toISOString(),
    };
  }
}
