/**
 * GSTReconciliationService — Statutory Tax & GSTR-2B Reconciliation Engine
 * Compares internal ERP invoice records against auto-drafted GSTR-2B / E-Invoice statements.
 * Designed with an adapter pattern for future licensed GSP / ASP integration.
 */

import { GSTRecord, GSTReconciliationSummary, GSTMatchStatus } from '../models/types';
import { MOCK_GSTR2B_RECORDS, MOCK_GSTR2B_SUMMARY } from '../data/mockEnterpriseData';

export interface IGSTImportAdapter {
  importFromJSON(jsonString: string): GSTRecord[];
  importFromSpreadsheet(buffer: any): GSTRecord[];
}

export class GSTReconciliationService {
  private records: GSTRecord[] = [];
  private summary: GSTReconciliationSummary;

  constructor() {
    this.records = JSON.parse(JSON.stringify(MOCK_GSTR2B_RECORDS));
    this.summary = { ...MOCK_GSTR2B_SUMMARY };
  }

  public getAllRecords(): GSTRecord[] {
    return this.records;
  }

  public getSummary(): GSTReconciliationSummary {
    return this.summary;
  }

  public getRecordsByStatus(status: GSTMatchStatus): GSTRecord[] {
    return this.records.filter((r) => r.matchStatus === status);
  }

  public getRecordForInternalInvoice(internalInvoiceId: string): GSTRecord | undefined {
    return this.records.find((r) => r.internalInvoiceId === internalInvoiceId);
  }

  /**
   * Simulated import of external GST data from GSP / JSON payload
   */
  public importGSTRecords(records: GSTRecord[]): { count: number; summary: GSTReconciliationSummary } {
    records.forEach((newRec) => {
      const idx = this.records.findIndex((r) => r.invoiceNumber === newRec.invoiceNumber && r.gstin === newRec.gstin);
      if (idx >= 0) {
        this.records[idx] = newRec;
      } else {
        this.records.push(newRec);
      }
    });

    this.recalculateSummary();
    return { count: records.length, summary: this.summary };
  }

  public recalculateSummary(): void {
    const total = this.records.length;
    const matched = this.records.filter((r) => r.matchStatus === 'MATCHED').length;
    const missingGst = this.records.filter((r) => r.matchStatus === 'MISSING_IN_GST').length;
    const missingInt = this.records.filter((r) => r.matchStatus === 'MISSING_INTERNALLY').length;
    const amtMismatch = this.records.filter((r) => r.matchStatus === 'AMOUNT_MISMATCH').length;
    const gstinMismatch = this.records.filter((r) => r.matchStatus === 'GSTIN_MISMATCH').length;
    const dup = this.records.filter((r) => r.matchStatus === 'DUPLICATE').length;

    let eligible = 0;
    let blocked = 0;

    this.records.forEach((r) => {
      if (r.matchStatus === 'MATCHED') {
        eligible += r.totalTax;
      } else {
        blocked += r.totalTax;
      }
    });

    this.summary = {
      taxPeriod: 'October 2026 (GSTR-2B)',
      totalInternalInvoices: 10,
      totalGstRecords: total,
      matchedCount: matched,
      missingInGstCount: missingGst,
      missingInternallyCount: missingInt,
      amountMismatchCount: amtMismatch,
      gstinMismatchCount: gstinMismatch,
      duplicateCount: dup,
      totalEligibleItc: eligible,
      totalBlockedItc: blocked,
    };
  }
}
