/**
 * Invoice Decision Intelligence — Enterprise Test Suite
 * Validates all 8 scenarios, 3-way matching, tolerance keys, duplicate detection,
 * SLA calculations, Business Owner validation, and SAP posting adapters.
 */

import { InvoiceRepository } from '../services/InvoiceRepository';
import { PhysicalScanAdapter } from '../integrations/intake/PhysicalScanAdapter';
import { EmailIntakeAdapter } from '../integrations/intake/EmailIntakeAdapter';
import { EInvoiceGovAdapter } from '../integrations/intake/EInvoiceGovAdapter';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, details?: string) {
  if (condition) {
    console.log(`  [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${testName}${details ? ` -> ${details}` : ''}`);
    failed++;
  }
}

async function runTestSuite() {
  console.log('=================================================================');
  console.log('  STARTING INVOICE DECISION INTELLIGENCE TEST SUITE');
  console.log('=================================================================\n');

  const repo = new InvoiceRepository();

  // --------------------------------------------------------------------------
  // TEST GROUP 1: Canonical Ingestion Adapters
  // --------------------------------------------------------------------------
  console.log('--- TEST GROUP 1: Multi-Channel Intake Normalization ---');

  const scanNorm = PhysicalScanAdapter.normalize({
    invoiceNumber: 'TEST-SCAN-01',
    supplierTaxId: '27AAACS1234F1Z5',
    supplierName: 'Schneider Electric India Pvt Ltd',
    invoiceDate: '2026-10-01',
    dueDate: '2026-10-31',
    currency: 'INR',
    poReference: '4500012456',
    totalNetAmount: 50000,
    taxAmount: 9000,
    totalGrossAmount: 59000,
    scannerLocation: 'Gate 2 Scanner',
    operatorId: 'OP-01',
    lineItems: [
      {
        itemNumber: '00010',
        description: 'Breakers',
        quantity: 100,
        unitOfMeasure: 'EA',
        unitPrice: 500,
        netAmount: 50000,
        taxRate: 18,
        taxAmount: 9000,
      },
    ],
  });
  assert(scanNorm.sourceChannel === 'PHYSICAL_SCAN', 'Physical scan adapter normalizes channel correctly');
  assert(scanNorm.channelMetadata.scannerLocation === 'Gate 2 Scanner', 'Scan metadata preserved');

  const emailNorm = EmailIntakeAdapter.normalize({
    emailSender: 'billing@tcs.com',
    emailSubject: 'Tax Invoice Sept 2026',
    attachmentName: 'Invoice_TCS.pdf',
    extractedInvoiceNumber: 'TEST-MAIL-01',
    supplierTaxId: '27AAACT1999A1Z1',
    supplierName: 'Tata Consultancy Services Ltd',
    invoiceDate: '2026-10-02',
    dueDate: '2026-11-01',
    currency: 'INR',
    totalNetAmount: 100000,
    taxAmount: 18000,
    totalGrossAmount: 118000,
    lineItems: [
      {
        itemNumber: '00010',
        description: 'Consulting',
        quantity: 100,
        unitOfMeasure: 'HR',
        unitPrice: 1000,
        netAmount: 100000,
        taxRate: 18,
        taxAmount: 18000,
      },
    ],
  });
  assert(emailNorm.sourceChannel === 'EMAIL_INBOUND', 'Email intake adapter normalizes channel');
  assert(emailNorm.channelMetadata.emailSender === 'billing@tcs.com', 'Email sender metadata preserved');

  const einvNorm = EInvoiceGovAdapter.normalize({
    irn: '4f28d8b4e78a6327e4369f8c6501237a6b83f0d2c94178523091abcef5410982',
    acknowledgementNumber: '112026009841',
    acknowledgementDate: '2026-10-04T05:00:00Z',
    digitalSignatureValid: true,
    invoiceNumber: 'TEST-EINV-01',
    supplierGstin: '27AAACS1234F1Z5',
    supplierLegalName: 'Schneider Electric India Pvt Ltd',
    buyerGstin: '29AABCT1332L1ZV',
    invoiceDate: '2026-10-04',
    dueDate: '2026-11-03',
    currency: 'INR',
    totalTaxableValue: 845000,
    cgstAmount: 76050,
    sgstAmount: 76050,
    totalInvoiceValue: 997100,
    lineItems: [
      {
        itemNumber: '00010',
        description: 'Smart PDU',
        quantity: 20,
        unitOfMeasure: 'EA',
        unitPrice: 42250,
        taxableAmount: 845000,
        gstRate: 18,
        gstAmount: 152100,
      },
    ],
  });
  assert(einvNorm.sourceChannel === 'GOVERNMENT_EINVOICE', 'E-Invoice adapter normalizes channel');
  assert(einvNorm.channelMetadata.irn?.length === 64, 'IRN 64-char hash captured');

  // --------------------------------------------------------------------------
  // TEST GROUP 2: Canonical Scenarios & AI Decisions
  // --------------------------------------------------------------------------
  console.log('\n--- TEST GROUP 2: Enterprise Scenario Decision Validations ---');

  // Scenario 1: Perfect Match -> AUTO-PROCEED
  const s1 = await repo.getInvoiceDetail('INV-2026-00001');
  assert(s1 !== null, 'Scenario 1 invoice exists');
  assert(s1?.aiDecision.recommendation === 'AUTO_PROCEED', 'Scenario 1 produces AUTO_PROCEED');
  assert((s1?.aiDecision.confidenceScore || 0) >= 95, 'Scenario 1 confidence score >= 95%');
  assert(s1?.reconciliation.quantityStatus === 'EXACT_MATCH', 'Scenario 1 quantity is EXACT_MATCH');

  // Scenario 2: Quantity Mismatch -> MANUAL_REVIEW
  const s2 = await repo.getInvoiceDetail('INV-2026-00002');
  assert(s2?.reconciliation.quantityStatus === 'OVER_DELIVERY', 'Scenario 2 detects quantity over-delivery');
  assert(s2?.aiDecision.recommendation === 'MANUAL_REVIEW', 'Scenario 2 produces MANUAL_REVIEW');
  assert(
    s2?.aiDecision.explanation.whatWasFound.some((f) => f.includes('QUANTITY MISMATCH')) === true,
    'Scenario 2 explanation explicitly details quantity mismatch'
  );

  // Scenario 3: No PO -> NON_PO_PROCESS
  const s3 = await repo.getInvoiceDetail('INV-2026-00003');
  assert(s3?.aiDecision.recommendation === 'NON_PO_PROCESS', 'Scenario 3 routes to NON_PO_PROCESS');
  assert(s3?.invoice.nonPOAccountAssignment?.costCenter === 'CC-1020-IT', 'Scenario 3 assigns IT Cost Center');
  assert(
    s3?.aiDecision.explanation.whyRecommended.some((r) => r.includes('Non-PO')) === true,
    'Scenario 3 explanation identifies Non-PO accounting route'
  );

  // Scenario 4: Vendor Mismatch -> HOLD
  const s4 = await repo.getInvoiceDetail('INV-2026-00004');
  assert(s4?.reconciliation.vendorMatched === false, 'Scenario 4 flags vendor mismatch');
  assert(s4?.aiDecision.recommendation === 'HOLD', 'Scenario 4 produces HOLD');
  assert(s4?.aiDecision.riskLevel === 'CRITICAL', 'Scenario 4 flags CRITICAL risk level');

  // Scenario 5: Price Variance -> MANUAL_REVIEW
  const s5 = await repo.getInvoiceDetail('INV-2026-00005');
  assert(s5?.reconciliation.priceStatus === 'EXCEEDED_TOLERANCE', 'Scenario 5 detects Tolerance Key PP breach');
  assert(s5?.aiDecision.recommendation === 'MANUAL_REVIEW', 'Scenario 5 produces MANUAL_REVIEW for price variance');
  assert((s5?.reconciliation.priceVariancePercentage || 0) > 10, 'Scenario 5 confirms >10% price variance');

  // Scenario 6: Quality Rejection -> HOLD
  const s6 = await repo.getInvoiceDetail('INV-2026-00006');
  assert(s6?.reconciliation.qualityStatus === 'REJECTIONS_DETECTED', 'Scenario 6 detects SAP QM rejections');
  assert(s6?.reconciliation.rejectedQuantity === 5, 'Scenario 6 confirms 5 rejected units');
  assert(s6?.aiDecision.recommendation === 'HOLD', 'Scenario 6 places invoice on HOLD due to quality defect');

  // Scenario 7: Duplicate Invoice -> HOLD
  const s7 = await repo.getInvoiceDetail('INV-2026-00007');
  assert(s7?.aiDecision.recommendation === 'HOLD', 'Scenario 7 flags duplicate invoice on HOLD');
  assert(s7?.aiDecision.riskLevel === 'CRITICAL', 'Scenario 7 risk level is CRITICAL');
  assert(
    s7?.aiDecision.explanation.whatWasFound.some((f) => f.includes('DUPLICATE INVOICE ALERT')) === true,
    'Scenario 7 explanation clearly states duplicate alert'
  );

  // Scenario 8: E-Invoice SLA (Scenario I)
  const s8 = await repo.getInvoiceDetail('INV-2026-00008');
  assert(
    s8?.aiDecision.recommendation === 'BUSINESS_VALIDATION_REQUIRED',
    'Scenario 8 (Scenario I) produces BUSINESS_VALIDATION_REQUIRED'
  );
  assert(s8?.slaRecord.isEInvoiceStatutory === true, 'Scenario 8 flags statutory e-invoice');
  assert(s8?.slaRecord.status === 'APPROACHING_BREACH', 'Scenario 8 tracks countdown approaching breach');

  // Scenario H: GST Reconciliation Mismatch
  const s9 = await repo.getInvoiceDetail('INV-2026-00009');
  assert(s9?.aiDecision.recommendation === 'MANUAL_REVIEW', 'Scenario H produces MANUAL_REVIEW for GST ITC mismatch');
  assert(
    s9?.aiDecision.explanation.whatWasFound.some((f) => f.includes('GST RECONCILIATION DISCREPANCY')) === true,
    'Scenario H explanation explicitly identifies GST GSTR-2B discrepancy'
  );

  // Scenario J: Business Owner Explicit Rejection
  const s10 = await repo.getInvoiceDetail('INV-2026-00010');
  assert(s10?.aiDecision.recommendation === 'REJECT', 'Scenario J produces REJECT following Business Owner dispute');
  assert(s10?.invoice.processingStatus === 'REJECTED', 'Scenario J invoice status is REJECTED');

  // --------------------------------------------------------------------------
  // TEST GROUP 3: Evidence-First, Decision Explainer & Transaction Story
  // --------------------------------------------------------------------------
  console.log('\n--- TEST GROUP 3: Evidence-First & Explainability Verification ---');

  assert(s1?.aiDecision.evidence !== undefined && s1.aiDecision.evidence.length >= 4, 'Scenario 1 contains evidence list');
  const facts = s1?.aiDecision.evidence?.filter((e) => e.category === 'FACT') || [];
  const recs = s1?.aiDecision.evidence?.filter((e) => e.category === 'SYSTEM_RECOMMENDATION') || [];
  assert(facts.length >= 3, 'Evidence explicitly distinguishes FACTS');
  assert(recs.length >= 1, 'Evidence explicitly distinguishes SYSTEM RECOMMENDATIONS');

  assert(s2?.aiDecision.decisionExplainer !== undefined && s2.aiDecision.decisionExplainer.length === 4, 'Decision Explainer contains 4 structured numbered steps');
  assert(s2?.aiDecision.transactionStory !== undefined && s2.aiDecision.transactionStory.length >= 4, 'Transaction Story contains chronological visual milestones');

  // --------------------------------------------------------------------------
  // TEST GROUP 4: Statutory GST GSTR-2B Reconciliation Service
  // --------------------------------------------------------------------------
  console.log('\n--- TEST GROUP 4: Statutory GST GSTR-2B Reconciliation ---');

  const gstRecords = repo.gstReconciliationService.getAllRecords();
  assert(gstRecords.length >= 8, 'GST service contains GSTR-2B auto-drafted records');
  const gstSummary = repo.gstReconciliationService.getSummary();
  assert(gstSummary.matchedCount >= 3, 'GST summary identifies matched tax credits');
  assert(gstSummary.amountMismatchCount >= 1, 'GST summary identifies amount mismatches');
  assert(gstSummary.totalBlockedItc > 0, 'GST summary quantifies at-risk / blocked Input Tax Credit (ITC)');

  // --------------------------------------------------------------------------
  // TEST GROUP 3: Business Owner Validation & Re-evaluation
  // --------------------------------------------------------------------------
  console.log('\n--- TEST GROUP 3: Business Owner Workflow & State Transitions ---');

  const boSubmit = await repo.submitBusinessValidation({
    invoiceId: 'INV-2026-00008',
    action: 'ACCEPT',
    userId: 'AVERMA',
    userName: 'Amit Verma',
    department: 'Facilities & Plant Operations',
    costCenter: 'CC-1010-ENG',
    reason: 'Power distribution units delivered and installed in server hall 3.',
  });
  assert(boSubmit.invoice.processingStatus === 'BUSINESS_VALIDATED', 'Invoice status updated to BUSINESS_VALIDATED');
  assert(boSubmit.aiDecision.recommendation === 'AUTO_PROCEED', 'After acceptance, AI re-evaluates to AUTO_PROCEED');
  assert(boSubmit.aiDecision.confidenceScore >= 95, 'Confidence score updated to >= 95%');

  // --------------------------------------------------------------------------
  // TEST GROUP 4: SAP Posting & Parking Orchestration
  // --------------------------------------------------------------------------
  console.log('\n--- TEST GROUP 4: SAP S/4HANA Posting & Parking ---');

  const postResult = await repo.sapPostingService.postInvoice(boSubmit.invoice);
  assert(postResult.success === true, 'SAP posting simulation returns success');
  assert(postResult.postingStatus === 'POSTED', 'Posting status is POSTED');
  assert(Boolean(postResult.accountingDocumentNumber?.startsWith('51056')), 'Accounting document number generated (BELNR)');

  const s2Inv = repo.getInvoiceById('INV-2026-00002')!;
  const parkResult = await repo.sapPostingService.parkInvoice(s2Inv, 'Waiting for 10 missing units from Siemens');
  assert(parkResult.success === true, 'SAP parking simulation returns success');
  assert(parkResult.postingStatus === 'PARKED', 'Posting status is PARKED');
  assert(parkResult.paymentBlockKey === 'R', 'Payment block key R applied');

  // --------------------------------------------------------------------------
  // TEST GROUP 5: Integration Monitor & Replay
  // --------------------------------------------------------------------------
  console.log('\n--- TEST GROUP 5: SAP Integration Suite Message Monitor ---');

  const messages = repo.integrationMonitorService.getAllMessages();
  assert(messages.length >= 4, 'Integration monitor has message ledger records');
  const firstMsg = messages[0];
  const retryResult = repo.integrationMonitorService.retryMessage(firstMsg.messageId);
  assert(retryResult.success === true, 'Message replay succeeds');
  assert(retryResult.updatedMessage?.retryCount === 1, 'Retry count incremented');

  // --------------------------------------------------------------------------
  // TEST GROUP 6: Audit Trail Immutability
  // --------------------------------------------------------------------------
  console.log('\n--- TEST GROUP 6: Enterprise Audit Trail ---');

  const auditEvents = repo.auditTrailService.getAllEvents();
  assert(auditEvents.length >= 4, 'Audit trail contains recorded lifecycle events');
  assert(
    auditEvents.some((e) => e.action.includes('BUSINESS_VALIDATION')),
    'Audit trail captures Business Owner actions'
  );
  assert(
    auditEvents.some((e) => e.action.includes('POSTED')),
    'Audit trail captures SAP posting events'
  );
  // --------------------------------------------------------------------------
  // TEST GROUP 7: Source Documents & Inbound Artifact Integrity
  // --------------------------------------------------------------------------
  console.log('\n--- TEST GROUP 7: Inbound Source Documents & Fixtures ---');
  const fs = require('fs');
  const path = require('path');
  const inboundBase = path.resolve(__dirname, '..', '..', 'mock-data', 'inbound');

  const physPdf = path.join(inboundBase, 'physical-gate-scanner', 'documents', 'INV-2026-00001.pdf');
  assert(fs.existsSync(physPdf) && fs.statSync(physPdf).size > 1000, 'Physical scanned PDF document exists on disk');

  const emailEml = path.join(inboundBase, 'vendor-ap-mailbox', 'emails', 'email_INV-2026-00003.eml');
  const emailAtt = path.join(inboundBase, 'vendor-ap-mailbox', 'attachments', 'INV-2026-00003.pdf');
  assert(fs.existsSync(emailEml) && fs.statSync(emailEml).size > 1000, 'Vendor AP mailbox RFC 822 email fixture exists');
  assert(fs.existsSync(emailAtt) && fs.statSync(emailAtt).size > 1000, 'Vendor invoice PDF attachment exists');

  const einvPayload = path.join(inboundBase, 'government-einvoice-irp', 'payloads', 'INV-2026-00008.json');
  const einvDoc = path.join(inboundBase, 'government-einvoice-irp', 'documents', 'INV-2026-00008.pdf');
  assert(fs.existsSync(einvPayload) && fs.statSync(einvPayload).size > 100, 'Government IRP statutory JSON payload exists');
  assert(fs.existsSync(einvDoc) && fs.statSync(einvDoc).size > 1000, 'Government invoice PDF document exists');

  const parsedPayload = JSON.parse(fs.readFileSync(einvPayload, 'utf8'));
  assert(parsedPayload.Irn && parsedPayload.Irn.length >= 64, 'IRP payload contains valid 64-char IRN hash');
  assert(parsedPayload.SellerDtls && parsedPayload.SellerDtls.Gstin === '27AAACS1234F1Z5', 'IRP payload contains verified seller GSTIN');

  // --------------------------------------------------------------------------
  // TEST GROUP 8: Batch Demo Ingestion Pipeline & Channel State
  // --------------------------------------------------------------------------
  console.log('\n--- TEST GROUP 8: Batch Demo Ingestion Pipeline ---');
  const batchRepo = new InvoiceRepository();

  const initialBatchStatus = batchRepo.getBatchStatus();
  assert(initialBatchStatus.channels.physical.processed === false, 'Batch physical initially unprocessed');
  assert(initialBatchStatus.channels.email.processed === false, 'Batch email initially unprocessed');
  assert(initialBatchStatus.channels.einvoice.processed === false, 'Batch einvoice initially unprocessed');
  assert(initialBatchStatus.channels.physical.count === 6, 'Dynamic discovery detects exactly 6 physical source files');
  assert(initialBatchStatus.channels.email.count === 6, 'Dynamic discovery detects exactly 6 email source files');
  assert(initialBatchStatus.channels.einvoice.count === 6, 'Dynamic discovery detects exactly 6 einvoice source files');

  // Process Physical Batch Ingestion
  const physBatchResult = await batchRepo.ingestChannelBatch('physical');
  assert(physBatchResult.count === 6, 'Physical batch ingests all 6 physical source fixtures');
  assert(physBatchResult.invoices.length === 6, 'Physical batch returns all 6 canonical invoices');
  assert(batchRepo.getBatchStatus().channels.physical.processed === true, 'Physical batch state marked as processed');

  // Duplicate Processing Prevention
  let duplicatePrevented = false;
  try {
    await batchRepo.ingestChannelBatch('physical');
  } catch (err: any) {
    duplicatePrevented = err.message.includes('already been processed');
  }
  assert(duplicatePrevented, 'Duplicate physical batch processing is rejected in same demo cycle');

  // Process Email Batch Ingestion
  const emailBatchResult = await batchRepo.ingestChannelBatch('email');
  assert(emailBatchResult.count === 6, 'Email batch ingests all 6 email source fixtures');
  assert(batchRepo.getBatchStatus().channels.email.processed === true, 'Email batch state marked as processed');

  // Process Government E-Invoice Batch Ingestion
  const einvBatchResult = await batchRepo.ingestChannelBatch('einvoice');
  assert(einvBatchResult.count === 6, 'E-Invoice batch ingests all 6 einvoice source fixtures');
  assert(batchRepo.getBatchStatus().channels.einvoice.processed === true, 'E-Invoice batch state marked as processed');

  // Verify Audit Trail & Integration Monitor logged batch entries
  const batchAuditEvents = batchRepo.auditTrailService.getAllEvents();
  const hasBatchAuditEvent = batchAuditEvents.some((e) => e.action === 'INVOICE_BATCH_INGESTED');
  assert(hasBatchAuditEvent, 'Audit trail records INVOICE_BATCH_INGESTED events');

  const batchIntegrationMsgs = batchRepo.integrationMonitorService.getAllMessages();
  const hasBatchIntegrationMsg = batchIntegrationMsgs.some((m) => m.interfaceName.startsWith('Batch_Inbound_'));
  assert(hasBatchIntegrationMsg, 'Integration monitor ledger records batch inbound flow messages');

  // Verify Demo Reset restarts cycle without modifying or deleting files on disk
  batchRepo.resetToDefaultScenarios();
  const resetBatchStatus = batchRepo.getBatchStatus();
  assert(resetBatchStatus.channels.physical.processed === false, 'Reset Demo clears physical batch processed state');
  assert(resetBatchStatus.channels.email.processed === false, 'Reset Demo clears email batch processed state');
  assert(resetBatchStatus.channels.einvoice.processed === false, 'Reset Demo clears einvoice batch processed state');
  assert(fs.existsSync(physPdf) && fs.existsSync(emailEml) && fs.existsSync(einvPayload), 'Source mock fixtures intact and preserved on disk after reset');

  // --------------------------------------------------------------------------
  // TEST GROUP 9: End-to-End Invoice Decision & Payment Lifecycle Matrix (Tests 1-8)
  // --------------------------------------------------------------------------
  console.log('\n--- TEST GROUP 9: Lifecycle Matrix & Business Scenarios (Tests 1 to 8) ---');
  const matrixRepo = new InvoiceRepository();

  // Test 1: Perfect Match Full Lifecycle
  console.log('Testing Test 1: Perfect Match Full Lifecycle...');
  const t1Detail = await matrixRepo.getInvoiceDetail('INV-2026-00001');
  assert(t1Detail !== null, 'Test 1: Invoice INV-2026-00001 extracted and loaded');
  assert(t1Detail?.purchaseOrder?.poNumber === '4500012456', 'Test 1: Matched SAP Purchase Order 4500012456');
  assert(Boolean(t1Detail?.reconciliation.vendorMatched && t1Detail?.reconciliation.poNumberMatched), 'Test 1: Three-way reconciliation matched PO and vendor');
  assert(Boolean(t1Detail?.comparisonRows && t1Detail.comparisonRows.length >= 6), 'Test 1: Comparison table generated with full checks');
  assert(t1Detail?.comparisonRows.every(r => r.result === 'MATCH') === true, 'Test 1: All comparison table rows indicate MATCH');

  // Park MIR7
  const t1Park = await matrixRepo.sapPostingService.parkInvoice(t1Detail!.invoice, 'Pre-verification park for standard workflow');
  assert(t1Park.success && t1Detail!.invoice.postingStatus === 'PARKED', 'Test 1: Successfully parked in SAP (MIR7)');

  // Business / Finance validation
  const t1Validated = await matrixRepo.submitBusinessValidation({
    invoiceId: 'INV-2026-00001',
    action: 'ACCEPT',
    userId: 'FIN_AP_MGR',
    userName: 'Kavita Rao',
    department: 'Accounts Payable',
    costCenter: 'CC-1010-ENG',
    reason: 'Approved for posting and payment run.',
  });
  assert(t1Validated.invoice.processingStatus === 'BUSINESS_VALIDATED', 'Test 1: Business validation accepted');

  // Post MIRO
  const t1Post = await matrixRepo.sapPostingService.postInvoice(t1Validated.invoice);
  assert(t1Post.success && t1Validated.invoice.postingStatus === 'POSTED', 'Test 1: Posted to SAP (MIRO)');
  assert(Boolean(t1Validated.invoice.accountingDocumentNumber?.startsWith('51056')), 'Test 1: Accounting document created (BELNR)');
  assert(t1Validated.invoice.paymentStatus === 'PAYMENT_PENDING', 'Test 1: Payment status transitioned to PAYMENT_PENDING');

  // Payment Execution (F110)
  const t1Pay = await matrixRepo.sapPostingService.processPayment(t1Validated.invoice);
  assert(t1Pay.success && t1Validated.invoice.paymentStatus === 'PAID', 'Test 1: Payment processed successfully (F110)');
  assert(Boolean(t1Validated.invoice.paymentDocumentNumber?.startsWith('20000')), 'Test 1: Payment document created');

  // Settlement Clearing (BSAK)
  const t1Clear = await matrixRepo.sapPostingService.clearPayment(t1Validated.invoice);
  assert(t1Clear.success && t1Validated.invoice.clearingStatus === 'CLEARED', 'Test 1: Clearing document created and status CLEARED');
  assert(Boolean(t1Validated.invoice.clearingDocumentNumber), 'Test 1: BSAK clearing document registered');

  // Test 2: Price Variance
  console.log('Testing Test 2: Price Variance...');
  const t2Detail = await matrixRepo.getInvoiceDetail('INV-2026-00005');
  assert(t2Detail !== null, 'Test 2: Invoice INV-2026-00005 loaded');
  assert(t2Detail?.reconciliation.priceStatus === 'EXCEEDED_TOLERANCE', 'Test 2: Price variance detected');
  const t2PriceRow = t2Detail?.comparisonRows.find(r => r.check === 'Unit Price');
  assert(t2PriceRow?.result === 'PRICE_VARIANCE', 'Test 2: Comparison table shows PRICE_VARIANCE result badge');
  assert(t2Detail?.aiDecision.recommendation === 'MANUAL_REVIEW', 'Test 2: AI recommendation is MANUAL_REVIEW');
  let t2PostBlocked = false;
  if (t2Detail?.aiDecision.recommendation !== 'AUTO_PROCEED') {
    t2PostBlocked = true;
  }
  assert(t2PostBlocked, 'Test 2: Price variance prevents auto-post without exception handling');

  // Test 3: Quantity Variance
  console.log('Testing Test 3: Quantity Variance...');
  const t3Detail = await matrixRepo.getInvoiceDetail('INV-2026-00002');
  assert(t3Detail !== null, 'Test 3: Invoice INV-2026-00002 loaded');
  assert(t3Detail?.reconciliation.quantityStatus === 'OVER_DELIVERY', 'Test 3: Quantity variance detected');
  const t3QtyRow = t3Detail?.comparisonRows.find(r => r.check === 'Quantity');
  assert(t3QtyRow?.result === 'QUANTITY_VARIANCE', 'Test 3: Comparison table shows QUANTITY_VARIANCE result badge');
  assert(t3Detail?.aiDecision.recommendation === 'MANUAL_REVIEW', 'Test 3: AI recommendation is MANUAL_REVIEW');

  // Test 4: Duplicate Invoice
  console.log('Testing Test 4: Duplicate Invoice...');
  const t4Detail = await matrixRepo.getInvoiceDetail('INV-2026-00007');
  assert(t4Detail !== null, 'Test 4: Invoice INV-2026-00007 loaded');
  assert(t4Detail?.invoice.isDuplicateSuspect === true, 'Test 4: Invoice flagged as duplicate suspect');
  const t4DupRow = t4Detail?.comparisonRows.find(r => r.check === 'Duplicate Check');
  assert(t4DupRow?.result === 'DUPLICATE_SUSPECT', 'Test 4: Comparison table flags DUPLICATE_SUSPECT');
  assert(t4Detail?.aiDecision.recommendation === 'HOLD', 'Test 4: AI recommends HOLD for duplicate invoice');

  // Test 5: Scenario A (Already Posted + Paid in SAP)
  console.log('Testing Test 5: Scenario A (Already Posted + Paid)...');
  const t5Detail = await matrixRepo.getInvoiceDetail('INV-SCAN-641331');
  assert(t5Detail !== null, 'Test 5: Scenario A invoice INV-SCAN-641331 loaded');
  assert(t5Detail?.invoice.postingStatus === 'POSTED', 'Test 5: Invoice posting status is POSTED');
  assert(t5Detail?.invoice.paymentStatus === 'PAID', 'Test 5: Invoice payment status is PAID');
  assert(t5Detail?.aiDecision.recommendation === 'ALREADY_PROCESSED', 'Test 5: AI identifies invoice as ALREADY_PROCESSED');
  const t5PostAttempt = await matrixRepo.sapPostingService.postInvoice(t5Detail!.invoice);
  assert(t5PostAttempt.success === false, 'Test 5: Duplicate posting attempt is blocked');
  const t5PayAttempt = await matrixRepo.sapPostingService.processPayment(t5Detail!.invoice);
  assert(t5PayAttempt.success === false, 'Test 5: Duplicate payment attempt is blocked');

  // Test 6: Scenario C (Already Posted + Payment Pending in SAP)
  console.log('Testing Test 6: Scenario C (Already Posted + Payment Pending)...');
  const t6Detail = await matrixRepo.getInvoiceDetail('INV-SCAN-514037');
  assert(t6Detail !== null, 'Test 6: Scenario C invoice INV-SCAN-514037 loaded');
  assert(t6Detail?.invoice.postingStatus === 'POSTED', 'Test 6: Invoice posting status is POSTED');
  assert(t6Detail?.invoice.paymentStatus === 'PAYMENT_PENDING', 'Test 6: Invoice payment status is PAYMENT_PENDING');
  assert(t6Detail?.aiDecision.recommendation === 'PAYMENT_FOLLOW_UP', 'Test 6: AI identifies invoice as PAYMENT_FOLLOW_UP');
  const t6PostAttempt = await matrixRepo.sapPostingService.postInvoice(t6Detail!.invoice);
  assert(t6PostAttempt.success === false, 'Test 6: Duplicate posting attempt is blocked');
  const t6PayResult = await matrixRepo.sapPostingService.processPayment(t6Detail!.invoice);
  assert(t6PayResult.success === true, 'Test 6: S/4HANA payment execution succeeds');
  assert(t6Detail!.invoice.paymentStatus === 'PAID', 'Test 6: Payment status transitions to PAID');

  // Test 7: Scenario B (New Invoice Full Lifecycle)
  console.log('Testing Test 7: Scenario B (New Invoice Lifecycle)...');
  const t7Detail = await matrixRepo.getInvoiceDetail('INV-2026-00003');
  assert(t7Detail !== null, 'Test 7: Scenario B invoice INV-2026-00003 loaded');
  assert(t7Detail?.invoice.postingStatus === 'NOT_POSTED', 'Test 7: Invoice starts NOT_POSTED');
  assert(t7Detail?.invoice.paymentStatus === 'NOT_DUE', 'Test 7: Payment status starts NOT_DUE');
  const t7DocChain = t7Detail!.documentChain;
  assert(Boolean(t7DocChain && t7DocChain.length >= 7), 'Test 7: Document reference chain generated with comprehensive nodes');
  assert(t7DocChain.some(n => n.type === 'SUPPLIER_INVOICE'), 'Test 7: Document chain includes SUPPLIER_INVOICE');
  assert(t7DocChain.some(n => n.type === 'PURCHASE_ORDER'), 'Test 7: Document chain includes PURCHASE_ORDER');
  assert(t7DocChain.some(n => n.type === 'GOODS_RECEIPT'), 'Test 7: Document chain includes GOODS_RECEIPT');

  // Test 8: Quality Defect Invoice
  console.log('Testing Test 8: Quality Defect Invoice...');
  const t8Detail = await matrixRepo.getInvoiceDetail('INV-2026-00006');
  assert(t8Detail !== null, 'Test 8: Invoice INV-2026-00006 loaded');
  assert(t8Detail?.reconciliation.qualityStatus === 'REJECTIONS_DETECTED', 'Test 8: QM inspection failure detected');
  const t8QmRow = t8Detail?.comparisonRows.find(r => r.check === 'Quality Inspection');
  assert(t8QmRow?.result === 'QUALITY_REJECTED', 'Test 8: Comparison table shows QUALITY_REJECTED result badge');
  assert(t8Detail?.aiDecision.recommendation === 'HOLD', 'Test 8: AI recommends HOLD for invoice with QM defects');
  assert(t8Detail?.aiDecision.explanation.whatWasFound.some(f => f.includes('QUALITY DEFECT')) === true, 'Test 8: Explanation cites quality rejection');



  console.log('\n=================================================================');
  console.log(`  TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('=================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
