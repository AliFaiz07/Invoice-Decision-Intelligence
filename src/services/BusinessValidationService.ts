/**
 * BusinessValidationService — Requisitioner & Cost Center Approval Management
 * Resolves Business Owners from SAP PO/Cost Center master data and processes approval actions.
 */

import {
  BusinessOwnerDecisionRecord,
  BusinessOwnerAction,
  CanonicalSupplierInvoice,
  SAPPurchaseOrder,
} from '../models/types';
import { AuditTrailService } from './AuditTrailService';

export interface BusinessOwnerDetails {
  userId: string;
  name: string;
  email: string;
  department: string;
  costCenter: string;
  role: 'PO_OWNER' | 'COST_CENTER_APPROVER';
}

export class BusinessValidationService {
  private auditTrail: AuditTrailService;
  private decisions: Map<string, BusinessOwnerDecisionRecord> = new Map();

  constructor(auditTrail: AuditTrailService) {
    this.auditTrail = auditTrail;
    this.seedInitialDecisions();
  }

  private seedInitialDecisions(): void {
    // Seed initial decision for Scenario 1
    this.decisions.set('INV-2026-00001', {
      action: 'ACCEPT',
      userId: 'AVERMA',
      userName: 'Amit Verma',
      role: 'BUSINESS_OWNER',
      department: 'Facilities & Plant Operations',
      costCenter: 'CC-1010-ENG',
      reason: 'Confirmed MCB 32A delivery received for electrical panel maintenance at Plant 1010.',
      timestamp: '2026-09-30T10:00:00.000Z',
    });
  }

  public resolveBusinessOwner(
    invoice: CanonicalSupplierInvoice,
    po: SAPPurchaseOrder | null
  ): BusinessOwnerDetails {
    if (po) {
      return {
        userId: po.businessOwnerId,
        name: po.businessOwnerName,
        email: po.businessOwnerEmail,
        department: po.businessOwnerDepartment,
        costCenter: po.lineItems[0]?.costCenter || 'CC-1010-ENG',
        role: 'PO_OWNER',
      };
    }

    if (invoice.nonPOAccountAssignment) {
      return {
        userId: invoice.nonPOAccountAssignment.businessOwnerId,
        name: invoice.nonPOAccountAssignment.approverName,
        email: `${invoice.nonPOAccountAssignment.businessOwnerId.toLowerCase()}@enterprise.com`,
        department: 'IT Operations',
        costCenter: invoice.nonPOAccountAssignment.costCenter,
        role: 'COST_CENTER_APPROVER',
      };
    }

    return {
      userId: 'DEFAULT_AP_OWNER',
      name: 'Central Accounts Payable Supervisor',
      email: 'ap.supervisor@enterprise.com',
      department: 'Finance & Accounts Payable',
      costCenter: 'CC-9000-FIN',
      role: 'COST_CENTER_APPROVER',
    };
  }

  public recordDecision(params: {
    invoiceId: string;
    action: BusinessOwnerAction;
    userId: string;
    userName: string;
    role: string;
    department: string;
    costCenter: string;
    reason: string;
    previousStatus: string;
  }): BusinessOwnerDecisionRecord {
    const record: BusinessOwnerDecisionRecord = {
      action: params.action,
      userId: params.userId,
      userName: params.userName,
      role: params.role,
      department: params.department,
      costCenter: params.costCenter,
      reason: params.reason,
      timestamp: new Date().toISOString(),
    };

    this.decisions.set(params.invoiceId, record);

    const newState =
      params.action === 'ACCEPT'
        ? 'BUSINESS_VALIDATED'
        : params.action === 'REJECT'
        ? 'REJECTED'
        : 'PENDING_BUSINESS_VALIDATION';

    this.auditTrail.recordEvent({
      invoiceId: params.invoiceId,
      actorId: params.userId,
      actorName: params.userName,
      actorRole: 'BUSINESS_OWNER',
      action: `BUSINESS_VALIDATION_${params.action}`,
      previousState: params.previousStatus,
      newState,
      justification: params.reason,
      contextData: { decision: params.action, costCenter: params.costCenter },
    });

    return record;
  }

  public getDecision(invoiceId: string): BusinessOwnerDecisionRecord | null {
    return this.decisions.get(invoiceId) || null;
  }

  public getAllDecisions(): Map<string, BusinessOwnerDecisionRecord> {
    return this.decisions;
  }
}
