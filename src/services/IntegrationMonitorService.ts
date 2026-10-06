/**
 * IntegrationMonitorService — SAP Integration Suite Message Monitoring
 * Tracks inbound and outbound message flows, payload traces, statuses, and retry logic.
 */

import { IntegrationMessage } from '../models/types';

export class IntegrationMonitorService {
  private messages: IntegrationMessage[] = [];
  private counter: number = 8800;

  constructor() {
    this.seedInitialMessages();
  }

  private seedInitialMessages(): void {
    this.logMessage({
      interfaceName: 'Inbound_PhysicalScan_Normalize',
      senderSystem: 'PLANT1010_SCANNER_GATE2',
      receiverSystem: 'SAP_BTP_DECISION_ENGINE',
      status: 'SUCCESS',
      direction: 'INBOUND',
      invoiceId: 'INV-2026-00001',
      payloadSummary: 'Physical invoice scan normalized (SEI/2026/0111) for ₹59,000',
      requestPayloadPreview: { invoiceNumber: 'SEI/2026/0111', totalGross: 59000, dpi: 300 },
      responsePayloadPreview: { status: 'NORMALIZED', canonicalId: 'INV-2026-00001' },
    });

    this.logMessage({
      interfaceName: 'S4HANA_PO_Lookup',
      senderSystem: 'SAP_BTP_DECISION_ENGINE',
      receiverSystem: 'SAP_S4HANA_PROD_100',
      status: 'SUCCESS',
      direction: 'OUTBOUND',
      invoiceId: 'INV-2026-00001',
      payloadSummary: 'API_PURCHASEORDER_PROCESS_SRV lookup for PO 4500012456',
      requestPayloadPreview: { poNumber: '4500012456' },
      responsePayloadPreview: { status: 'RELEASED', supplierId: '10002450', totalValue: 50000 },
    });

    this.logMessage({
      interfaceName: 'Inbound_Email_Ingest',
      senderSystem: 'EXCHANGE_ONLINE_AP_BOX',
      receiverSystem: 'SAP_BTP_DECISION_ENGINE',
      status: 'SUCCESS',
      direction: 'INBOUND',
      invoiceId: 'INV-2026-00003',
      payloadSummary: 'Email invoice ingested from billing@airtel.in (Leased Line)',
      requestPayloadPreview: { sender: 'corporate.ebilling@airtel.in', subject: 'Tax Invoice: Dedicated Leased Line' },
      responsePayloadPreview: { status: 'NORMALIZED_NON_PO', canonicalId: 'INV-2026-00003' },
    });

    this.logMessage({
      interfaceName: 'Inbound_GST_EInvoice_DRC',
      senderSystem: 'GSTN_INVOICE_PORTAL',
      receiverSystem: 'SAP_BTP_DECISION_ENGINE',
      status: 'SUCCESS',
      direction: 'INBOUND',
      invoiceId: 'INV-2026-00008',
      payloadSummary: 'Statutory GST E-Invoice IRN ingested (SEI/2026/0892) for ₹9,97,100',
      requestPayloadPreview: { irn: '4f28d8b4e78a6327e4369f8c6501237a6b83f0d2c94178523091abcef5410982' },
      responsePayloadPreview: { status: 'QUEUED_FOR_BUSINESS_VALIDATION', slaDeadline: '48h' },
    });
  }

  public logMessage(params: {
    interfaceName: string;
    senderSystem: string;
    receiverSystem: string;
    status: 'SUCCESS' | 'WARNING' | 'FAILED' | 'PENDING_RETRY';
    direction: 'INBOUND' | 'OUTBOUND';
    invoiceId?: string;
    payloadSummary: string;
    requestPayloadPreview: any;
    responsePayloadPreview?: any;
    errorMessage?: string;
  }): IntegrationMessage {
    this.counter++;
    const message: IntegrationMessage = {
      messageId: `MSG-${Date.now().toString().slice(-6)}-${this.counter}`,
      interfaceName: params.interfaceName,
      senderSystem: params.senderSystem,
      receiverSystem: params.receiverSystem,
      status: params.status,
      timestamp: new Date().toISOString(),
      direction: params.direction,
      invoiceId: params.invoiceId,
      payloadSummary: params.payloadSummary,
      requestPayloadPreview: params.requestPayloadPreview,
      responsePayloadPreview: params.responsePayloadPreview,
      errorMessage: params.errorMessage,
      retryCount: 0,
    };

    this.messages.unshift(message);
    return message;
  }

  public retryMessage(messageId: string): { success: boolean; message: string; updatedMessage?: IntegrationMessage } {
    const msg = this.messages.find((m) => m.messageId === messageId);
    if (!msg) {
      return { success: false, message: `Message ${messageId} not found in Integration Monitor.` };
    }

    msg.retryCount++;
    msg.status = 'SUCCESS';
    msg.errorMessage = undefined;
    msg.timestamp = new Date().toISOString();

    return {
      success: true,
      message: `Message ${messageId} replayed successfully through SAP Integration Suite pipeline.`,
      updatedMessage: msg,
    };
  }

  public getAllMessages(): IntegrationMessage[] {
    return this.messages;
  }
}
