/**
 * SAP Invoice Decision Intelligence — Enterprise Test Suite
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
  console.log('  STARTING SAP INVOICE DECISION INTELLIGENCE TEST SUITE');
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
