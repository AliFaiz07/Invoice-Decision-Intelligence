/**
 * MockSourceDataStore — Persistent File-Based Mock Data Source Coordinator
 * 
 * Provides single source of truth reading and writing to disk:
 *   mock-data/invoices/physical/
 *   mock-data/invoices/email/
 *   mock-data/invoices/einvoice/
 *   mock-data/vendors/
 *   mock-data/purchase-orders/
 *   mock-data/goods-receipts/
 *   mock-data/quality/
 *   mock-data/business-owners/
 *   mock-data/gst/
 */

import fs from 'fs';
import path from 'path';
import {
  CanonicalSupplierInvoice,
  SourceChannel,
  SAPBusinessPartner,
  SAPPurchaseOrder,
  SAPGoodsReceipt,
  SAPQualityLot,
  GSTRecord,
} from '../models/types';
import {
  MOCK_BUSINESS_PARTNERS,
  MOCK_PURCHASE_ORDERS,
  MOCK_GOODS_RECEIPTS,
  MOCK_QUALITY_LOTS,
  MOCK_INVOICES,
  MOCK_GSTR2B_RECORDS,
} from '../data/mockEnterpriseData';

export interface BusinessOwnerMaster {
  userId: string;
  name: string;
  email: string;
  department: string;
  costCenter: string;
  role: string;
}

export class MockSourceDataStore {
  private baseDir: string;

  constructor(customBaseDir?: string) {
    this.baseDir =
      customBaseDir ||
      path.resolve(__dirname, '..', '..', 'mock-data');

    this.ensureInitialized();
  }

  private getChannelDir(channel: SourceChannel): string {
    switch (channel) {
      case 'PHYSICAL_SCAN':
        return path.join(this.baseDir, 'invoices', 'physical');
      case 'EMAIL_INBOUND':
        return path.join(this.baseDir, 'invoices', 'email');
      case 'GOVERNMENT_EINVOICE':
        return path.join(this.baseDir, 'invoices', 'einvoice');
    }
  }

  public ensureInitialized(): void {
    const requiredDirs = [
      path.join(this.baseDir, 'invoices', 'physical'),
      path.join(this.baseDir, 'invoices', 'email'),
      path.join(this.baseDir, 'invoices', 'einvoice'),
      path.join(this.baseDir, 'vendors'),
      path.join(this.baseDir, 'purchase-orders'),
      path.join(this.baseDir, 'goods-receipts'),
      path.join(this.baseDir, 'quality'),
      path.join(this.baseDir, 'business-owners'),
      path.join(this.baseDir, 'gst'),
    ];

    requiredDirs.forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    const vendorsFile = path.join(this.baseDir, 'vendors', 'vendors.json');
    if (!fs.existsSync(vendorsFile)) {
      this.seedAll();
    }
  }

  public seedAll(): void {
    // 1. Vendors
    fs.writeFileSync(
      path.join(this.baseDir, 'vendors', 'vendors.json'),
      JSON.stringify(MOCK_BUSINESS_PARTNERS, null, 2),
      'utf8'
    );

    // 2. Purchase Orders
    fs.writeFileSync(
      path.join(this.baseDir, 'purchase-orders', 'purchase-orders.json'),
      JSON.stringify(MOCK_PURCHASE_ORDERS, null, 2),
      'utf8'
    );

    // 3. Goods Receipts
    fs.writeFileSync(
      path.join(this.baseDir, 'goods-receipts', 'goods-receipts.json'),
      JSON.stringify(MOCK_GOODS_RECEIPTS, null, 2),
      'utf8'
    );

    // 4. Quality Lots
    fs.writeFileSync(
      path.join(this.baseDir, 'quality', 'quality-lots.json'),
      JSON.stringify(MOCK_QUALITY_LOTS, null, 2),
      'utf8'
    );

    // 5. Business Owners
    const owners: BusinessOwnerMaster[] = [
      {
        userId: 'AVERMA',
        name: 'Amit Verma',
        email: 'averma@enterprise.com',
        department: 'Facilities & Plant Operations',
        costCenter: 'CC-1010-ENG',
        role: 'Plant Requisitioner',
      },
      {
        userId: 'SMEHTA',
        name: 'Sanjay Mehta',
        email: 'smehta@enterprise.com',
        department: 'Automation & Controls',
        costCenter: 'CC-1010-ENG',
        role: 'Lead Systems Engineer',
      },
      {
        userId: 'RJOSHI',
        name: 'Rohan Joshi',
        email: 'rjoshi@enterprise.com',
        department: 'Enterprise Cloud Architecture',
        costCenter: 'CC-1020-IT',
        role: 'Cloud Architect',
      },
      {
        userId: 'BO_AARAV',
        name: 'Aarav Mehta',
        email: 'aarav.mehta@demo.company',
        department: 'Corporate Services',
        costCenter: 'CC-1000-EXEC',
        role: 'Business Owner',
      },
    ];
    fs.writeFileSync(
      path.join(this.baseDir, 'business-owners', 'business-owners.json'),
      JSON.stringify(owners, null, 2),
      'utf8'
    );

    // 6. GST Records
    fs.writeFileSync(
      path.join(this.baseDir, 'gst', 'gstr2b-records.json'),
      JSON.stringify(MOCK_GSTR2B_RECORDS, null, 2),
      'utf8'
    );

    // 7. Channel Invoices
    MOCK_INVOICES.forEach((inv) => {
      this.saveInvoice(inv);
    });
  }

  // --- Invoice Retrieval & Persistence ---

  public getInvoicesByChannel(channel: SourceChannel): CanonicalSupplierInvoice[] {
    const dir = this.getChannelDir(channel);
    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
    const invoices: CanonicalSupplierInvoice[] = [];

    for (const file of files) {
      try {
        const raw = fs.readFileSync(path.join(dir, file), 'utf8');
        const parsed = JSON.parse(raw) as CanonicalSupplierInvoice;
        invoices.push(parsed);
      } catch (err) {
        console.error(`Error reading invoice file ${file}:`, err);
      }
    }

    return invoices.sort((a, b) => a.invoiceId.localeCompare(b.invoiceId));
  }

  /**
   * Discovers actual inbound mock source fixture count dynamically on disk.
   */
  public getSourceFixtureCount(channel: SourceChannel): number {
    const inboundBase = path.join(this.baseDir, 'inbound');
    try {
      if (channel === 'PHYSICAL_SCAN') {
        const dir = path.join(inboundBase, 'physical-gate-scanner', 'documents');
        if (fs.existsSync(dir)) {
          return fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.pdf')).length;
        }
      } else if (channel === 'EMAIL_INBOUND') {
        const dir = path.join(inboundBase, 'vendor-ap-mailbox', 'attachments');
        if (fs.existsSync(dir)) {
          return fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.pdf')).length;
        }
      } else if (channel === 'GOVERNMENT_EINVOICE') {
        const dir = path.join(inboundBase, 'government-einvoice-irp', 'payloads');
        if (fs.existsSync(dir)) {
          return fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.json')).length;
        }
      }
    } catch (e) {
      console.error(`Error reading source fixture count for ${channel}:`, e);
    }
    return this.getInvoicesByChannel(channel).length;
  }

  public getAllInvoices(): CanonicalSupplierInvoice[] {
    const physical = this.getInvoicesByChannel('PHYSICAL_SCAN');
    const email = this.getInvoicesByChannel('EMAIL_INBOUND');
    const einvoice = this.getInvoicesByChannel('GOVERNMENT_EINVOICE');
    return [...physical, ...email, ...einvoice].sort((a, b) =>
      a.invoiceId.localeCompare(b.invoiceId)
    );
  }

  public getInvoiceById(invoiceId: string): CanonicalSupplierInvoice | null {
    const channels: SourceChannel[] = [
      'PHYSICAL_SCAN',
      'EMAIL_INBOUND',
      'GOVERNMENT_EINVOICE',
    ];
    for (const ch of channels) {
      const filePath = path.join(this.getChannelDir(ch), `${invoiceId}.json`);
      if (fs.existsSync(filePath)) {
        try {
          const raw = fs.readFileSync(filePath, 'utf8');
          return JSON.parse(raw) as CanonicalSupplierInvoice;
        } catch (e) {
          console.error(`Error reading ${filePath}:`, e);
        }
      }
    }
    return null;
  }

  public saveInvoice(invoice: CanonicalSupplierInvoice): void {
    const dir = this.getChannelDir(invoice.sourceChannel);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, `${invoice.invoiceId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(invoice, null, 2), 'utf8');
  }

  // --- Relational SAP Masters ---

  public getVendors(): SAPBusinessPartner[] {
    const p = path.join(this.baseDir, 'vendors', 'vendors.json');
    if (fs.existsSync(p)) {
      try {
        return JSON.parse(fs.readFileSync(p, 'utf8'));
      } catch (e) {
        return MOCK_BUSINESS_PARTNERS;
      }
    }
    return MOCK_BUSINESS_PARTNERS;
  }

  public getPurchaseOrders(): SAPPurchaseOrder[] {
    const p = path.join(this.baseDir, 'purchase-orders', 'purchase-orders.json');
    if (fs.existsSync(p)) {
      try {
        return JSON.parse(fs.readFileSync(p, 'utf8'));
      } catch (e) {
        return MOCK_PURCHASE_ORDERS;
      }
    }
    return MOCK_PURCHASE_ORDERS;
  }

  public getPurchaseOrderById(poNumber: string): SAPPurchaseOrder | null {
    const pos = this.getPurchaseOrders();
    return pos.find((p) => p.poNumber === poNumber) || null;
  }

  public getGoodsReceipts(poNumber?: string): SAPGoodsReceipt[] {
    const p = path.join(this.baseDir, 'goods-receipts', 'goods-receipts.json');
    let all: SAPGoodsReceipt[] = MOCK_GOODS_RECEIPTS;
    if (fs.existsSync(p)) {
      try {
        all = JSON.parse(fs.readFileSync(p, 'utf8'));
      } catch (e) {
        all = MOCK_GOODS_RECEIPTS;
      }
    }
    if (!poNumber) return all;
    return all.filter((gr) => gr.poNumber === poNumber);
  }

  public getQualityLots(): SAPQualityLot[] {
    const p = path.join(this.baseDir, 'quality', 'quality-lots.json');
    if (fs.existsSync(p)) {
      try {
        return JSON.parse(fs.readFileSync(p, 'utf8'));
      } catch (e) {
        return MOCK_QUALITY_LOTS;
      }
    }
    return MOCK_QUALITY_LOTS;
  }

  public getBusinessOwners(): BusinessOwnerMaster[] {
    const p = path.join(this.baseDir, 'business-owners', 'business-owners.json');
    if (fs.existsSync(p)) {
      try {
        return JSON.parse(fs.readFileSync(p, 'utf8'));
      } catch (e) {
        // fallback
      }
    }
    return [];
  }

  public getBusinessOwnerById(userId: string): BusinessOwnerMaster | null {
    const owners = this.getBusinessOwners();
    return owners.find((o) => o.userId === userId) || null;
  }

  public getGSTR2BRecords(): GSTRecord[] {
    const p = path.join(this.baseDir, 'gst', 'gstr2b-records.json');
    if (fs.existsSync(p)) {
      try {
        return JSON.parse(fs.readFileSync(p, 'utf8'));
      } catch (e) {
        return MOCK_GSTR2B_RECORDS;
      }
    }
    return MOCK_GSTR2B_RECORDS;
  }
}
