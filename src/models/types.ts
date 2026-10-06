/**
 * SAP Invoice Decision Intelligence — Canonical Data Models & SAP Domain Types
 * Conforms to SAP S/4HANA OData V2/V4 core entity structures
 */

export type SourceChannel = 'PHYSICAL_SCAN' | 'EMAIL_INBOUND' | 'GOVERNMENT_EINVOICE';

export type InvoiceProcessingStatus =
  | 'INTAKE_RECEIVED'
  | 'DATA_EXTRACTED'
  | 'PO_IDENTIFIED'
  | 'NON_PO_ROUTED'
  | 'PENDING_BUSINESS_VALIDATION'
  | 'BUSINESS_VALIDATED'
  | 'RECONCILIATION_COMPLETE'
  | 'EXCEPTION_RAISED'
  | 'ON_HOLD'
  | 'READY_FOR_POSTING'
  | 'POSTED_TO_SAP'
  | 'PARKED_IN_SAP'
  | 'REJECTED';

export type AIDecisionRecommendation =
  | 'AUTO_PROCEED'
  | 'BUSINESS_VALIDATION_REQUIRED'
  | 'MANUAL_REVIEW'
  | 'HOLD'
  | 'REJECT'
  | 'NON_PO_PROCESS';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type SLAStatus = 'WITHIN_SLA' | 'APPROACHING_BREACH' | 'BREACHED' | 'NOT_APPLICABLE';

export type BusinessOwnerAction = 'ACCEPT' | 'REJECT' | 'SEND_BACK' | 'REQUEST_CLARIFICATION';

// --- SAP S/4HANA Master & Transactional Models ---

export interface SAPBusinessPartner {
  supplierId: string; // e.g. "10002450" (LFA1-LIFNR)
  businessPartnerId: string; // e.g. "BP-1002450" (BUT000-PARTNER)
  supplierName: string; // e.g. "Schneider Electric India Pvt Ltd"
  gstinTaxId: string; // e.g. "27AAACS1234F1Z5" (STCD3)
  country: string; // e.g. "IN"
  city: string; // e.g. "Mumbai"
  paymentTerms: string; // e.g. "NT30" (ZTERM)
  reconciliationAccount: string; // e.g. "21100000" (AKONT)
  status: 'ACTIVE' | 'BLOCKED' | 'FLAGGED_FOR_DELETION';
  companyCode: string; // e.g. "1010"
  historicalDisputeRate: number; // Percentage 0 - 100
}

export interface SAPPurchaseOrderItem {
  itemNumber: string; // e.g. "00010"
  materialNumber?: string; // e.g. "MAT-ELEC-415"
  description: string;
  orderQuantity: number;
  unitOfMeasure: string; // e.g. "EA", "HR", "MTR"
  netUnitPrice: number;
  netAmount: number;
  plant: string; // e.g. "1010"
  storageLocation?: string; // e.g. "101A"
  costCenter?: string; // e.g. "CC-1020-IT"
  glAccount?: string; // e.g. "65001000"
  requisitionerName: string; // e.g. "Amit Verma"
}

export interface SAPPurchaseOrder {
  poNumber: string; // e.g. "4500012456" (EKKO-EBELN)
  companyCode: string; // e.g. "1010" (EKKO-BUKRS)
  purchasingOrg: string; // e.g. "1010" (EKKO-EKORG)
  purchasingGroup: string; // e.g. "001" (EKKO-EKGRP)
  supplierId: string; // e.g. "10002450"
  supplierName: string;
  poDate: string; // "YYYY-MM-DD"
  currency: string; // "INR", "USD", "EUR"
  totalNetValue: number;
  totalGrossValue: number;
  businessOwnerId: string; // SAP User ID (EKKO-ERNAM)
  businessOwnerName: string;
  businessOwnerEmail: string;
  businessOwnerDepartment: string;
  status: 'RELEASED' | 'BLOCKED' | 'DELETED' | 'IN_APPROVAL';
  lineItems: SAPPurchaseOrderItem[];
}

export interface SAPQualityLot {
  lotId: string; // e.g. "100004523"
  materialDocumentNumber: string;
  status: 'PASSED' | 'INSPECTION_PENDING' | 'REJECTED';
  totalInspectedQuantity: number;
  acceptedQuantity: number;
  rejectedQuantity: number;
  inspectionDecisionDate?: string;
  inspectorName?: string;
  defectReason?: string;
  remarks?: string;
}

export interface SAPGoodsReceiptItem {
  itemNumber: string; // e.g. "0001"
  poNumber: string;
  poItemNumber: string; // e.g. "00010"
  materialNumber?: string;
  materialDescription: string;
  movementType: '101' | '102'; // 101 = GR for PO, 102 = GR Reversal
  receivedQuantity: number;
  unitOfMeasure: string;
  plant: string;
  storageLocation: string;
  qualityLotId?: string;
  acceptedQuantity: number;
  rejectedQuantity: number;
}

export interface SAPGoodsReceipt {
  materialDocumentNumber: string; // e.g. "5000018921" (MSEG-MBLNR)
  fiscalYear: string; // e.g. "2026" (MSEG-MJAHR)
  postingDate: string;
  documentDate: string;
  poNumber: string;
  deliveryNoteNumber?: string;
  items: SAPGoodsReceiptItem[];
}

// --- Canonical Invoice Envelope ---

export interface CanonicalInvoiceItem {
  itemNumber: string; // e.g. "00010"
  description: string;
  materialNumber?: string;
  quantity: number;
  unitOfMeasure: string;
  unitPrice: number;
  netAmount: number;
  taxRate: number; // e.g. 18.0 for 18% GST
  taxAmount: number;
}

export interface ChannelMetadata {
  scannerLocation?: string;
  operatorId?: string;
  scanDpi?: number;
  emailSender?: string;
  emailSubject?: string;
  emailReceivedAt?: string;
  emailMessageId?: string;
  attachmentName?: string;
  attachmentSha256?: string;
  irn?: string; // Government 64-char Invoice Reference Number
  acknowledgementNumber?: string;
  acknowledgementDate?: string;
  digitalSignatureValid?: boolean;
}

export interface CanonicalSupplierInvoice {
  invoiceId: string; // E.g. "INV-2026-00451" (Internal key)
  invoiceNumber: string; // E.g. "SEI/2026/0892" (Vendor external invoice no)
  sourceChannel: SourceChannel;
  channelMetadata: ChannelMetadata;
  supplierTaxId: string; // GSTIN / Tax Identification
  supplierName: string;
  supplierId?: string; // S/4HANA Vendor LIFNR if resolved
  buyerTaxId: string;
  buyerCompanyCode: string; // e.g. "1010"
  invoiceDate: string;
  dueDate: string;
  currency: string;
  purchaseOrderReference?: string;
  totalNetAmount: number;
  taxAmount: number;
  totalGrossAmount: number;
  lineItems: CanonicalInvoiceItem[];
  processingStatus: InvoiceProcessingStatus;
  intakeTimestamp: string;
  isDuplicateSuspect?: boolean;
  nonPOAccountAssignment?: {
    costCenter: string;
    glAccount: string;
    businessOwnerId: string;
    approverName: string;
  };
}

// --- Business Owner Validation ---

export interface BusinessOwnerDecisionRecord {
  action: BusinessOwnerAction;
  userId: string;
  userName: string;
  role: string;
  department: string;
  costCenter: string;
  reason: string;
  timestamp: string;
}

// --- Three-Way Reconciliation Analysis ---

export interface ThreeWayReconciliationSummary {
  poNumber?: string;
  poMatchScorePercentage: number;
  vendorMatched: boolean;
  poNumberMatched: boolean;
  currencyMatched: boolean;
  lineItemsMatched: boolean;
  quantityStatus: 'EXACT_MATCH' | 'UNDER_DELIVERY' | 'OVER_DELIVERY' | 'NO_GR_FOUND';
  quantityInvoiced: number;
  quantityReceived: number;
  quantityOrdered: number;
  priceStatus: 'EXACT_MATCH' | 'WITHIN_TOLERANCE' | 'EXCEEDED_TOLERANCE';
  invoicedUnitPrice: number;
  poUnitPrice: number;
  priceVariancePercentage: number;
  qualityStatus: 'ALL_PASSED' | 'INSPECTION_PENDING' | 'REJECTIONS_DETECTED' | 'NOT_APPLICABLE';
  acceptedQuantity: number;
  rejectedQuantity: number;
  amountStatus: 'WITHIN_TOLERANCE' | 'VARIANCE_EXCEEDED';
  invoicedTotalNet: number;
  poTotalNet: number;
  grTotalNet: number;
}

// --- Explainable AI (XAI) Output Contract ---

export interface AIDecisionExplanation {
  whatWasChecked: string[];
  whatWasFound: string[];
  whyRecommended: string[];
  suggestedAction: string;
}

export interface AIDecisionResult {
  invoiceId: string;
  recommendation: AIDecisionRecommendation;
  confidenceScore: number; // 0 - 100
  riskLevel: RiskLevel;
  reconciliation: ThreeWayReconciliationSummary;
  explanation: AIDecisionExplanation;
  timestamp: string;
  evaluatedSignals: {
    code: string;
    description: string;
    passed: boolean;
    impact: number;
    details: string;
  }[];
  evidence?: EvidenceItem[];
  decisionExplainer?: DecisionExplainerStep[];
  transactionStory?: TransactionStoryEvent[];
}

// --- SLA & Government Compliance Tracking ---

export interface InvoiceSLARecord {
  invoiceId: string;
  sourceChannel: SourceChannel;
  receivedAt: string;
  deadlineAt?: string;
  totalDurationHours: number;
  remainingMinutes?: number;
  status: SLAStatus;
  isEInvoiceStatutory: boolean;
  businessOwnerName: string;
}

// --- Audit Trail & State Transitions ---

export interface AuditTrailEvent {
  eventId: string;
  invoiceId: string;
  timestamp: string;
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
}

// --- Integration Message Monitoring (SAP Integration Suite) ---

export interface IntegrationMessage {
  messageId: string;
  interfaceName: string;
  senderSystem: string;
  receiverSystem: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED' | 'PENDING_RETRY';
  timestamp: string;
  direction: 'INBOUND' | 'OUTBOUND';
  invoiceId?: string;
  payloadSummary: string;
  requestPayloadPreview: any;
  responsePayloadPreview?: any;
  errorMessage?: string;
  retryCount: number;
}

// --- SAP S/4HANA Posting Document ---

export interface SAPPostingResult {
  success: boolean;
  accountingDocumentNumber?: string; // BELNR e.g. "5105600123"
  fiscalYear?: string; // GJAHR e.g. "2026"
  companyCode: string;
  documentType: 'RE' | 'KR' | 'KG'; // RE = Gross invoice, KR = Vendor credit memo
  postingStatus: 'POSTED' | 'PARKED' | 'BLOCKED_FOR_PAYMENT' | 'FAILED';
  paymentBlockKey?: string; // E.g. "R" (Invoice verification), "A" (Payment block)
  message: string;
  sapPostingTimestamp: string;
}

// --- GST / GSTR-2B Reconciliation Models ---

export type GSTMatchStatus =
  | 'MATCHED'
  | 'MISSING_IN_GST'
  | 'MISSING_INTERNALLY'
  | 'AMOUNT_MISMATCH'
  | 'GSTIN_MISMATCH'
  | 'DUPLICATE'
  | 'PENDING';

export interface GSTRecord {
  gstin: string;
  supplierName: string;
  invoiceNumber: string;
  invoiceDate: string;
  taxableValue: number;
  igstAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  totalTax: number;
  totalInvoiceValue: number;
  filingPeriod: string; // e.g. "092026"
  matchStatus: GSTMatchStatus;
  internalInvoiceId?: string;
  varianceNote?: string;
}

export interface GSTReconciliationSummary {
  taxPeriod: string;
  totalInternalInvoices: number;
  totalGstRecords: number;
  matchedCount: number;
  missingInGstCount: number;
  missingInternallyCount: number;
  amountMismatchCount: number;
  gstinMismatchCount: number;
  duplicateCount: number;
  totalEligibleItc: number;
  totalBlockedItc: number;
}

// --- Transaction Story & Evidence-First Models ---

export interface TransactionStoryEvent {
  id: string;
  timestamp: string;
  timeFormatted: string; // e.g. "06 Oct 09:20"
  title: string;
  detail: string;
  statusType: 'positive' | 'warning' | 'negative' | 'info';
}

export interface EvidenceItem {
  id: string;
  category: 'FACT' | 'SYSTEM_RECOMMENDATION';
  source: string; // e.g. "SAP S/4HANA PO 4500012500"
  statement: string; // e.g. "Goods receipt quantity = 90 EA"
  verifiedAt: string;
}

export interface DecisionExplainerStep {
  stepNumber: string; // "01", "02", "03", "04"
  title: string;
  findings: string[];
  status: 'PASS' | 'WARNING' | 'FAIL' | 'NEUTRAL';
}

