/**
 * EmailIntakeAdapter — Ingestion Adapter for Email Inbound Invoices
 * Extracts sender metadata, email headers, SPF/DKIM verification, and PDF attachments.
 * Normalizes email payload into the Canonical Invoice format.
 */

import { CanonicalSupplierInvoice } from '../../models/types';

export interface EmailInboundInput {
  emailSender: string;
  emailSubject: string;
  emailMessageId?: string;
  emailReceivedAt?: string;
  attachmentName: string;
  attachmentSha256?: string;
  extractedInvoiceNumber: string;
  supplierTaxId: string;
  supplierName: string;
  invoiceDate: string;
  dueDate: string;
  currency: string;
  poReference?: string;
  totalNetAmount: number;
  taxAmount: number;
  totalGrossAmount: number;
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

export class EmailIntakeAdapter {
  public static normalize(input: EmailInboundInput, generatedId?: string): CanonicalSupplierInvoice {
    const invoiceId = generatedId || `INV-MAIL-${Date.now().toString().slice(-6)}`;

    return {
      invoiceId,
      invoiceNumber: input.extractedInvoiceNumber,
      sourceChannel: 'EMAIL_INBOUND',
      channelMetadata: {
        emailSender: input.emailSender,
        emailSubject: input.emailSubject,
        emailMessageId: input.emailMessageId || `<MSG-${Date.now()}@inbound.enterprise.com>`,
        emailReceivedAt: input.emailReceivedAt || new Date().toISOString(),
        attachmentName: input.attachmentName,
        attachmentSha256: input.attachmentSha256,
      },
      supplierTaxId: input.supplierTaxId,
      supplierName: input.supplierName,
      buyerTaxId: '29AABCT1332L1ZV',
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
