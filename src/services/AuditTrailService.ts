/**
 * AuditTrailService — Immutable Enterprise Audit Logger
 * Tracks state transitions, actor actions, justifications, and AI snapshots.
 */

import { AuditTrailEvent, AIDecisionRecommendation } from '../models/types';

export class AuditTrailService {
  private events: AuditTrailEvent[] = [];
  private eventCounter: number = 1000;

  constructor() {
    this.seedInitialEvents();
  }

  private seedInitialEvents(): void {
    this.recordEvent({
      invoiceId: 'INV-2026-00001',
      actorId: 'SYSTEM_INTAKE',
      actorName: 'SAP DOX Scanner Adapter',
      actorRole: 'SYSTEM_PROCESS',
      action: 'INVOICE_INGESTED',
      previousState: 'NONE',
      newState: 'DATA_EXTRACTED',
      justification: 'Physical scan uploaded from Plant 1010 Security Gate 2 Scanner',
    });

    this.recordEvent({
      invoiceId: 'INV-2026-00001',
      actorId: 'AVERMA',
      actorName: 'Amit Verma',
      actorRole: 'BUSINESS_OWNER',
      action: 'BUSINESS_VALIDATED',
      previousState: 'PENDING_BUSINESS_VALIDATION',
      newState: 'BUSINESS_VALIDATED',
      justification: 'Confirmed MCB 32A delivery received for electrical panel maintenance.',
      aiRecommendation: 'AUTO_PROCEED',
      confidenceScore: 98,
    });
  }

  public recordEvent(params: {
    invoiceId: string;
    actorId: string;
    actorName: string;
    actorRole: string;
    action: string;
    previousState: string;
    newState: string;
    justification?: string;
    aiRecommendation?: AIDecisionRecommendation;
    confidenceScore?: number;
    contextData?: Record<string, any>;
  }): AuditTrailEvent {
    this.eventCounter++;
    const event: AuditTrailEvent = {
      eventId: `AUD-${Date.now()}-${this.eventCounter}`,
      invoiceId: params.invoiceId,
      timestamp: new Date().toISOString(),
      actorId: params.actorId,
      actorName: params.actorName,
      actorRole: params.actorRole,
      action: params.action,
      previousState: params.previousState,
      newState: params.newState,
      justification: params.justification,
      aiRecommendation: params.aiRecommendation,
      confidenceScore: params.confidenceScore,
      contextData: params.contextData,
    };

    this.events.unshift(event); // newest first
    return event;
  }

  public getEventsForInvoice(invoiceId: string): AuditTrailEvent[] {
    return this.events.filter((e) => e.invoiceId === invoiceId);
  }

  public getAllEvents(): AuditTrailEvent[] {
    return this.events;
  }
}
