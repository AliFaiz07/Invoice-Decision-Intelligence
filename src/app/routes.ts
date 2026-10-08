/**
 * Invoice Decision Intelligence — API Routes Definition
 */

import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { InvoiceRepository } from '../services/InvoiceRepository';
import { PhysicalScanAdapter } from '../integrations/intake/PhysicalScanAdapter';
import { EmailIntakeAdapter } from '../integrations/intake/EmailIntakeAdapter';
import { EInvoiceGovAdapter } from '../integrations/intake/EInvoiceGovAdapter';
import { MockSAPAdapter } from '../integrations/sap/MockSAPAdapter';

export function createApiRouter(repository: InvoiceRepository): Router {
  const router = Router();

  const getId = (req: Request): string => {
    const val = req.params.id;
    return Array.isArray(val) ? val[0] : val;
  };

  // 1. Health & Environment Status
  router.get('/health', (req: Request, res: Response) => {
    res.json({
      status: 'UP',
      system: 'Invoice Decision Intelligence Layer',
      mode: process.env.DEMO_MODE !== 'false' ? 'DEMO_MODE' : 'PRODUCTION_MODE',
      platform: 'SAP Business Technology Platform (Cloud Foundry / Kyma)',
      targetERP: 'SAP S/4HANA Cloud Public Edition 2023',
      timestamp: new Date().toISOString(),
    });
  });

  // 2. Invoices List with Full Summary & AI Evaluations (Supports ?channel= filter)
  router.get('/invoices', async (req: Request, res: Response) => {
    try {
      const channelParam = req.query.channel as string | undefined;
      let invoices = repository.getAllInvoices();
      if (channelParam && channelParam !== 'ALL') {
        const normalized = channelParam.toUpperCase();
        invoices = invoices.filter(
          (inv) =>
            inv.sourceChannel === normalized ||
            (normalized === 'PHYSICAL' && inv.sourceChannel === 'PHYSICAL_SCAN') ||
            (normalized === 'EMAIL' && inv.sourceChannel === 'EMAIL_INBOUND') ||
            (normalized === 'EINVOICE' && inv.sourceChannel === 'GOVERNMENT_EINVOICE')
        );
      }
      const summaries = await Promise.all(
        invoices.map((inv) => repository.getInvoiceDetail(inv.invoiceId))
      );
      res.json(summaries.filter(Boolean));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // 2b. Invoices by Channel (/api/channels/:channel/invoices)
  router.get('/channels/:channel/invoices', async (req: Request, res: Response) => {
    try {
      const channelParam = req.params.channel;
      const rawChannel = (Array.isArray(channelParam) ? channelParam[0] : channelParam || '').toUpperCase();
      let channel: string = rawChannel;
      if (rawChannel === 'PHYSICAL') channel = 'PHYSICAL_SCAN';
      if (rawChannel === 'EMAIL') channel = 'EMAIL_INBOUND';
      if (rawChannel === 'EINVOICE') channel = 'GOVERNMENT_EINVOICE';

      const invoices = repository.getInvoicesByChannel(channel);
      const summaries = await Promise.all(
        invoices.map((inv) => repository.getInvoiceDetail(inv.invoiceId))
      );
      res.json(summaries.filter(Boolean));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // 2c. Channels Gateway Overview (/api/channels)
  router.get('/channels', (req: Request, res: Response) => {
    const all = repository.getAllInvoices();
    res.json({
      channels: [
        {
          id: 'physical',
          channel: 'PHYSICAL_SCAN',
          title: 'Physical / Plant Gate Scanner Intake',
          count: all.filter((i) => i.sourceChannel === 'PHYSICAL_SCAN').length,
          status: 'ACTIVE_ONLINE',
          gatewayType: 'SAP Document Information Extraction (OCR)',
          sourcePath: 'mock-data/invoices/physical',
        },
        {
          id: 'email',
          channel: 'EMAIL_INBOUND',
          title: 'Vendor Invoice AP Mailbox',
          count: all.filter((i) => i.sourceChannel === 'EMAIL_INBOUND').length,
          status: 'ACTIVE_ONLINE',
          gatewayType: 'IMAP/Exchange AP Mailbox Parser (invoices@enterprise.com)',
          sourcePath: 'mock-data/invoices/email',
        },
        {
          id: 'einvoice',
          channel: 'GOVERNMENT_EINVOICE',
          title: 'Government E-Invoice / IRP Source',
          count: all.filter((i) => i.sourceChannel === 'GOVERNMENT_EINVOICE').length,
          status: 'ACTIVE_ONLINE',
          gatewayType: 'Statutory GST IRP DRC Integration (64-char IRN)',
          sourcePath: 'mock-data/invoices/einvoice',
        },
      ],
    });
  });

  // 2d. Business Owners Master
  router.get('/business-owners', (req: Request, res: Response) => {
    res.json(repository.dataStore.getBusinessOwners());
  });

  // 3. Invoice Detail by ID
  router.get('/invoices/:id', async (req: Request, res: Response) => {
    try {
      const invoiceId = getId(req);
      const detail = await repository.getInvoiceDetail(invoiceId);
      if (!detail) {
        return res.status(404).json({ error: `Invoice ${invoiceId} not found.` });
      }
      res.json(detail);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // 3b. Source Document Details & Preview Metadata
  router.get('/invoices/:id/source-document', (req: Request, res: Response) => {
    try {
      const invoiceId = getId(req);
      const invoice = repository.getInvoiceById(invoiceId);
      if (!invoice) {
        return res.status(404).json({ error: `Invoice ${invoiceId} not found.` });
      }

      const inboundBase = path.resolve(__dirname, '..', '..', 'mock-data', 'inbound');
      let docInfo: any = {
        invoiceId,
        sourceChannel: invoice.sourceChannel,
        channelMetadata: invoice.channelMetadata,
      };

      if (invoice.sourceChannel === 'PHYSICAL_SCAN') {
        const docFile = `${invoiceId}.pdf`;
        const metaPath = path.join(inboundBase, 'physical-gate-scanner', 'metadata', `${invoiceId}.json`);
        let meta = null;
        if (fs.existsSync(metaPath)) {
          meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        }
        docInfo = {
          ...docInfo,
          documentType: 'PDF_SCAN',
          documentUrl: `/inbound-docs/physical-gate-scanner/documents/${docFile}`,
          metadata: meta || {
            invoiceId,
            sourceChannel: 'PHYSICAL_GATE_SCANNER',
            sourceFile: docFile,
            plant: '1010',
            scannerLocation: invoice.channelMetadata.scannerLocation || 'Gate 2 Scanner',
            operatorId: invoice.channelMetadata.operatorId || 'OP-4491',
            ocrResolution: `${invoice.channelMetadata.scanDpi || 300} DPI`,
            ocrConfidence: 98.4,
          },
        };
      } else if (invoice.sourceChannel === 'EMAIL_INBOUND') {
        const attFile = `${invoiceId}.pdf`;
        const emlFile = `email_${invoiceId}.eml`;
        const metaPath = path.join(inboundBase, 'vendor-ap-mailbox', 'metadata', `${invoiceId}.json`);
        let meta = null;
        if (fs.existsSync(metaPath)) {
          meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        }
        docInfo = {
          ...docInfo,
          documentType: 'EMAIL_ATTACHMENT',
          documentUrl: `/inbound-docs/vendor-ap-mailbox/attachments/${attFile}`,
          emailUrl: `/inbound-docs/vendor-ap-mailbox/emails/${emlFile}`,
          metadata: meta || {
            invoiceId,
            sourceChannel: 'VENDOR_AP_MAILBOX',
            mailbox: 'ap-invoices@enterprise.com',
            senderEmail: invoice.channelMetadata.emailSender,
            spfStatus: 'PASS',
            dkimStatus: 'PASS',
            attachmentName: invoice.channelMetadata.attachmentName || attFile,
          },
        };
      } else if (invoice.sourceChannel === 'GOVERNMENT_EINVOICE') {
        const docFile = `${invoiceId}.pdf`;
        const payloadPath = path.join(inboundBase, 'government-einvoice-irp', 'payloads', `${invoiceId}.json`);
        const metaPath = path.join(inboundBase, 'government-einvoice-irp', 'metadata', `${invoiceId}.json`);
        let payload = null;
        let meta = null;
        if (fs.existsSync(payloadPath)) {
          payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
        }
        if (fs.existsSync(metaPath)) {
          meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        }
        docInfo = {
          ...docInfo,
          documentType: 'GOVERNMENT_EINVOICE_IRP',
          documentUrl: `/inbound-docs/government-einvoice-irp/documents/${docFile}`,
          payloadUrl: `/inbound-docs/government-einvoice-irp/payloads/${invoiceId}.json`,
          rawPayload: payload,
          metadata: meta || {
            invoiceId,
            sourceChannel: 'GOVERNMENT_EINVOICE_IRP',
            irn: invoice.channelMetadata.irn,
            acknowledgementNumber: invoice.channelMetadata.acknowledgementNumber,
            acknowledgementDate: invoice.channelMetadata.acknowledgementDate,
          },
        };
      }

      res.json(docInfo);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });


  // 4. Batch Invoice Intake Status
  router.get('/invoices/intake/batch/status', (req: Request, res: Response) => {
    try {
      res.json(repository.getBatchStatus());
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // 4b. Batch Channel Intake
  router.post('/invoices/intake/batch/:channel', async (req: Request, res: Response) => {
    try {
      const channelParam = (req.params.channel as string || '').toLowerCase();
      if (!['physical', 'email', 'einvoice'].includes(channelParam)) {
        return res.status(400).json({ error: `Invalid intake channel '${channelParam}'. Allowed: physical, email, einvoice.` });
      }
      const result = await repository.ingestChannelBatch(channelParam as any);
      res.json({
        success: true,
        message: `${result.count} invoices processed and ingested successfully via ${result.channel} batch pipeline.`,
        ...result,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // 4c. Physical Invoice Intake (Single)
  router.post('/invoices/intake/physical', async (req: Request, res: Response) => {
    try {
      const canonical = PhysicalScanAdapter.normalize(req.body);
      const detail = await repository.addInvoice(canonical);
      res.status(201).json(detail);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // 5. Email Invoice Intake (Single)
  router.post('/invoices/intake/email', async (req: Request, res: Response) => {
    try {
      const canonical = EmailIntakeAdapter.normalize(req.body);
      const detail = await repository.addInvoice(canonical);
      res.status(201).json(detail);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // 6. Government E-Invoice Intake (Single)
  router.post('/invoices/intake/einvoice', async (req: Request, res: Response) => {
    try {
      const canonical = EInvoiceGovAdapter.normalize(req.body);
      const detail = await repository.addInvoice(canonical);
      res.status(201).json(detail);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // 7. Business Owner Action (Accept, Reject, Send Back, Clarification)
  router.post('/invoices/:id/validate', async (req: Request, res: Response) => {
    try {
      const invoiceId = getId(req);
      const { action, userId, userName, department, costCenter, reason } = req.body;
      if (!action || !reason) {
        return res.status(400).json({ error: 'Action and Reason are mandatory for business validation.' });
      }

      const updated = await repository.submitBusinessValidation({
        invoiceId,
        action,
        userId: userId || 'AVERMA',
        userName: userName || 'Amit Verma',
        department: department || 'Facilities & Plant Operations',
        costCenter: costCenter || 'CC-1010-ENG',
        reason,
      });

      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // 8. Post to SAP S/4HANA (MIRO)
  router.post('/invoices/:id/post', async (req: Request, res: Response) => {
    try {
      const invoiceId = getId(req);
      const invoice = repository.getInvoiceById(invoiceId);
      if (!invoice) {
        return res.status(404).json({ error: `Invoice ${invoiceId} not found.` });
      }

      const postResult = await repository.sapPostingService.postInvoice(
        invoice,
        req.body.actorId || 'AP_SUPERVISOR',
        req.body.actorName || 'Accounts Payable Supervisor'
      );

      const updatedDetail = await repository.getInvoiceDetail(invoiceId);
      res.json({ postResult, invoiceDetail: updatedDetail });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // 9. Park in SAP S/4HANA (F-47 / MIR7)
  router.post('/invoices/:id/park', async (req: Request, res: Response) => {
    try {
      const invoiceId = getId(req);
      const invoice = repository.getInvoiceById(invoiceId);
      if (!invoice) {
        return res.status(404).json({ error: `Invoice ${invoiceId} not found.` });
      }

      const parkResult = await repository.sapPostingService.parkInvoice(
        invoice,
        req.body.reason || 'Held for manual review / exception resolution',
        req.body.actorId || 'AP_CLERK',
        req.body.actorName || 'Accounts Payable Specialist'
      );

      const updatedDetail = await repository.getInvoiceDetail(invoiceId);
      res.json({ parkResult, invoiceDetail: updatedDetail });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // 10. SLA Records
  router.get('/sla', (req: Request, res: Response) => {
    res.json(repository.slaMonitorService.getAllSLARecords());
  });

  // 11. Integration Messages (SAP Integration Suite)
  router.get('/integration-messages', (req: Request, res: Response) => {
    res.json(repository.integrationMonitorService.getAllMessages());
  });

  // 12. Retry Integration Message
  router.post('/integration-messages/:id/retry', (req: Request, res: Response) => {
    const msgId = getId(req);
    const result = repository.integrationMonitorService.retryMessage(msgId);
    if (!result.success) {
      return res.status(404).json(result);
    }
    res.json(result);
  });

  // 13. Audit Trail
  router.get('/audit-trail', (req: Request, res: Response) => {
    res.json(repository.auditTrailService.getAllEvents());
  });

  // 14. SAP Master & Transactional Data Explorer
  router.get('/sap/master-data', (req: Request, res: Response) => {
    if (repository.sapAdapter instanceof MockSAPAdapter) {
      const mock = repository.sapAdapter as MockSAPAdapter;
      res.json({
        businessPartners: mock.getAllBusinessPartners(),
        purchaseOrders: mock.getAllPurchaseOrders(),
        goodsReceipts: mock.getAllGoodsReceipts(),
      });
    } else {
      res.json({ message: 'Master data explorer only available in DEMO MODE' });
    }
  });

  // 15. GST GSTR-2B Reconciliation
  router.get('/gst-reconciliation', (req: Request, res: Response) => {
    res.json({
      records: repository.gstReconciliationService.getAllRecords(),
      summary: repository.gstReconciliationService.getSummary(),
    });
  });

  // 16. Import GST GSTR-2B Statement (Simulated GSP / JSON / Excel Import)
  router.post('/gst-reconciliation/import', (req: Request, res: Response) => {
    try {
      const records = req.body.records || [];
      const result = repository.gstReconciliationService.importGSTRecords(records);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // 17. Reset Demo Scenarios
  router.post('/reset', (req: Request, res: Response) => {
    repository.resetToDefaultScenarios();
    res.json({ success: true, message: 'All 10 enterprise demo scenarios reset to default state.' });
  });

  return router;
}
