# Complete Scenario-Based Testing Catalogue

This handbook provides step-by-step test execution scripts for every scenario supported by the Invoice Decision Intelligence platform. Every scenario includes exact preconditions, click-by-click navigation, expected processing, verification checklists, pass criteria, and failure diagnoses.

---

## Scenario Index

| Scenario ID | Name & Description | Channel | Target State | Key Feature Demonstrated |
|---|---|---|---|---|
| **SC-01** | Perfect Match Full Lifecycle | Physical Scan | `CLEARED` | 3-way match, MIRO post, F110 pay, BSAK clearing |
| **SC-02** | Quantity Mismatch & Over-Delivery | Physical Scan | `MANUAL_REVIEW` | Tolerance DQ breach, Goods Receipt comparison |
| **SC-03** | Non-PO Routing & Account Assignment | Email Inbound | `NON_PO_ROUTED` | G/L account and cost center assignment |
| **SC-04** | Vendor & PO Cross-Entity Mismatch | Email Inbound | `HOLD` | Zero-tolerance vendor check, fraud prevention |
| **SC-05** | Price Variance & Tolerance PP Breach | Email Inbound | `MANUAL_REVIEW` | Tolerance PP breach (+15%), What-If simulation |
| **SC-06** | Quality Inspection Lot Defect | Physical Scan | `HOLD` | SAP QM lot rejection (5 defective units) |
| **SC-07** | Duplicate Invoice Suspect | Email Inbound | `HOLD` | S/4HANA invoice index duplicate check |
| **SC-08** | E-Invoice Statutory 48h SLA Countdown | Government IRP | `BUSINESS_VALIDATED` | IRN verification, SLA timer, Owner sign-off |
| **SC-09 (H)**| Statutory GSTR-2B Tax Credit Mismatch | Email Inbound | `MANUAL_REVIEW` | Blocked Input Tax Credit (ITC) detection |
| **SC-10 (J)**| Business Owner Rejection & Dispute | Physical Scan | `REJECTED` | Requisitioner dispute with mandatory justification |
| **SC-11 (A)**| Already Posted & Paid Ledger Protection| Physical Scan | `ALREADY_PROCESSED` | Duplicate posting & double-payment prevention |
| **SC-12 (C)**| Already Posted / Payment Pending Run | Physical Scan | `PAID` | Transitioning open item through F110 payment |
| **SC-13 (W)**| What-If Policy Simulation | Any Exception | Re-evaluated | Dynamic price & quantity tolerance sensitivity |

---

## Scenario 1: Perfect Match Full Lifecycle (SC-01)

### Business Objective
Demonstrate an ideal straight-through invoice with 100% matched PO, Goods Receipt, vendor, and tax, progressing through business validation, financial posting (`MIRO`), payment execution (`F110`), and clearing (`BSAK`).

### Preconditions
- Invoice: `INV-2026-00001` (Supplier: *Schneider Electric India Pvt Ltd*, Gross: ₹59,000).
- SAP PO: `4500012456` (100 EA Circuit Breakers @ ₹500/EA).
- SAP GR: `5000018901` (100 EA delivered and accepted at Plant 1010).
- Initial Status: `BUSINESS_VALIDATED` (Clean baseline).

### Exact Navigation & Clicks
1. From the top navigation header, click **Decision Center** in the sidebar.
2. In the decision worklist, locate and click on invoice **`INV-2026-00001`**.
3. In the top action bar, click **Post to SAP**.
   - Observe the multi-stage ERP operation modal: *"Validating supplier... Preparing accounting document... Posting supplier invoice (MIRO)..."*
   - Observe success toast: *"Accounting document 51056xxxxx created in SAP S/4HANA."*
4. Notice the invoice status updates to **`POSTED`** and payment status becomes **`PAYMENT_PENDING`**.
5. In the action bar or vertical timeline, click **Process Payment**.
   - Observe the modal: *"Executing AP Payment Run (F110)..."*
   - Observe success toast: *"Payment document 20000xxxxx created."*
   - Payment status flips to **`PAID`**.
6. Click **Clear AP Settlement**.
   - Observe the modal: *"Settlement Open Item Clearing (BSAK)..."*
   - Observe success toast: *"BSAK clearing document 15000xxxxx registered."*
   - Status updates to **`CLEARED`**.

### Verification Checklist
- **Invoice Detail**: Header displays `POSTED`, `BELNR: 51056xxxxx`, `Payment Doc: 20000xxxxx`, `Clearing Doc: 15000xxxxx`.
- **Vertical Timeline**: All 6 milestones (Gate Scan → Normalization → 3-Way LIV → Requisitioner → S/4HANA MIRO → Treasury Clearing) display green checkmarks.
- **Audit Trail**: Events `SAP_INVOICE_POSTED`, `PAYMENT_RUN_EXECUTED`, and `SETTLEMENT_CLEARED` recorded.

### Pass Criteria
Status reaches `CLEARED`, 10-digit SAP BELNR, Payment, and Clearing documents generated, zero console errors.

### Failure Diagnosis
If `Post to SAP` is disabled: Verify invoice status is `BUSINESS_VALIDATED`. If not, click `Reset Demo`.

### Cleanup
Click **Reset Demo** in the top header when ready to restore baseline.

---

## Scenario 2: Quantity Mismatch & Over-Delivery (SC-02)

### Business Objective
Demonstrate how the platform detects when a supplier bills for more units than were confirmed by warehouse goods receipt, preventing unauthorized over-payment.

### Preconditions
- Invoice: `INV-2026-00002` (Supplier: *Siemens India Ltd*, Gross: ₹1,41,600).
- SAP PO: `4500012500` (100 EA PLC Input Modules @ ₹1,200/EA).
- SAP GR: `5000018915` (Only 90 EA received at Plant 1010 receiving dock).
- Invoiced Quantity: 100 EA (10 units missing from warehouse).

### Exact Navigation & Clicks
1. In the sidebar, click **PO & 3-Way Match**.
2. Select **`INV-2026-00002`** from the left list.
3. Review the comparison table:
   - Check `Quantity`: Invoice shows `100 EA`, SAP GR shows `90 EA`.
   - Result badge: Amber **`QUANTITY_VARIANCE`**.
4. In the sidebar, click **Decision Center**, then select **`INV-2026-00002`**.
5. Review the AI Decision Card:
   - Recommendation: **`MANUAL_REVIEW`** (Confidence: 70%, Risk: `MEDIUM`).
   - Notice that the **`Post to SAP`** button is **disabled**.
6. Click **Park in SAP**.
   - Multi-stage modal executes preliminary parking (`MIR7`).
   - Payment block key `R` applied.
   - Status transitions to **`PARKED`**.

### Pass Criteria
System flags `QUANTITY_VARIANCE`, recommends `MANUAL_REVIEW`, blocks direct posting, and allows parking in SAP.

---

## Scenario 3: Non-PO Routing & Account Assignment (SC-03)

### Business Objective
Demonstrate the automated handling of recurring operational expenditures (e.g., telecom internet leased lines) that arrive without a Purchase Order.

### Preconditions
- Invoice: `INV-2026-00003` (Supplier: *Bharti Airtel Enterprise Services*, Gross: ₹88,500).
- Source: Vendor AP Mailbox (`corporate.ebilling@airtel.in`).
- PO Reference: None (`undefined`).

### Exact Navigation & Clicks
1. In the sidebar, click **Invoice Inbox**.
2. Filter by **Email Inbound**.
3. Select **`INV-2026-00003`** and click **Inspect**.
   - Verify email message metadata: SPF/DKIM `PASS`, sender `corporate.ebilling@airtel.in`.
4. Click **Open in Decision Center**.
5. Inspect the Decision Card:
   - Recommendation: **`NON_PO_PROCESS`**.
   - Notice the Account Assignment box:
     - G/L Account: `65001000` (Telecom & Network Expenses)
     - Cost Center: `CC-1020-IT` (Information Technology)
     - Approver: `Rohan Joshi`

### Pass Criteria
System identifies absence of PO, routes to `NON_PO_PROCESS`, assigns IT cost center `CC-1020-IT`, and does not error on missing 3-way match.

---

## Scenario 4: Vendor & PO Cross-Entity Mismatch (SC-04)

### Business Objective
Demonstrate strict fraud prevention when an unauthorized supplier attempts to bill against another vendor's Purchase Order.

### Preconditions
- Invoice: `INV-2026-00004` (Supplier: *Apex Facility Management Services*, GSTIN: `27AAACA9999P1Z3`).
- PO Reference: `4500012600` (Belongs to *Siemens India Ltd* in SAP master).

### Exact Navigation & Clicks
1. In the sidebar, click **Exceptions & Blocks**.
2. Locate invoice **`INV-2026-00004`**.
3. Observe the severity badge: Red **`CRITICAL`**.
4. Open the invoice in Decision Center.
5. Review the AI Decision Card:
   - Recommendation: **`HOLD`** (Confidence: 25%, Risk: `CRITICAL`).
   - Explanation Fact: *"Invoiced vendor (Apex Facility Management) does not match PO vendor (Siemens India Ltd)."*
   - Posting buttons are completely disabled.

### Pass Criteria
Vendor mismatch detected with 100% accuracy, invoice placed on `HOLD`, risk set to `CRITICAL`, financial posting completely disabled.

---

## Scenario 5: Price Variance & Tolerance PP Breach (SC-05)

### Business Objective
Demonstrate commercial variance detection when a vendor bills a unit price higher than the contracted PO price, exceeding SAP Tolerance Key `PP`.

### Preconditions
- Invoice: `INV-2026-00005` (Supplier: *Tata Consultancy Services Ltd*, Gross: ₹1,35,700).
- PO Reference: `4500012750` (Contracted price: ₹1,000/hr).
- Invoiced Unit Price: ₹1,150/hr (+15.0% variance).

### Exact Navigation & Clicks
1. In the sidebar, click **Exceptions & Blocks**, then click **`INV-2026-00005`**.
2. Inspect the LIV price check:
   - Invoiced: `₹1,150 / HR` vs. PO: `₹1,000 / HR`.
   - Variance: `+15.0%` (Breaches standard 5.0% tolerance).
   - Result badge: Amber **`PRICE_VARIANCE`**.
3. In the top action bar, click **What-If Simulator**.
4. Drag the **Price Tolerance Slider** from `5%` to `15%`.
5. Notice the dynamic recalculation:
   - Simulated Recommendation flips to **`AUTO_PROCEED`** (Confidence: 96%).
   - Explanation: *"Price variance (+15.0%) falls within permitted tolerance (<= 15%)."*
6. Click **Reset Parameters** to return to enterprise baseline policy.

### Pass Criteria
Price variance of 15% detected, breaches Tolerance `PP`, What-If simulator dynamically re-evaluates outcome upon adjusting slider.

---

## Scenario 6: Quality Inspection Defect (SC-06)

### Business Objective
Demonstrate automated invoice hold when goods fail SAP Quality Management (QM) inspection in the warehouse.

### Preconditions
- Invoice: `INV-2026-00006` (Supplier: *Wipro Enterprises Ltd*, 100 HEPA Filters).
- SAP QM Inspection Lot: `100004580`.
- Inspection Result: `REJECTED` (5 units failed air seal test; damaged gaskets).

### Exact Navigation & Clicks
1. In the sidebar, click **Exceptions & Blocks**, then select **`INV-2026-00006`**.
2. Review the inspection alert:
   - Quality Lot `100004580`: `95 Accepted / 5 Rejected`.
   - Result badge: Red **`QUALITY_REJECTED`**.
3. Review the Decision Explainer:
   - Recommendation: **`HOLD`** (Risk: `CRITICAL`).
   - Reason: *"Five (5) HEPA filters failed air seal integrity test. Gaskets crushed during transit."*
4. Confirm `Post to SAP` is blocked pending vendor credit note.

### Pass Criteria
Quality lot rejection detected from `QALS`, invoice placed on `HOLD`, scrap units identified.

---

## Scenario 7: Duplicate Invoice Detection (SC-07)

### Business Objective
Demonstrate automated duplicate detection protecting the enterprise from paying the same invoice twice.

### Preconditions
- Invoice: `INV-2026-00007` (Supplier: *Amazon Web Services*, Invoice #: `AWS/2026/1090`, Gross: ₹4,01,200).
- SAP Master State: An invoice with invoice number `AWS/2026/1090` already exists in the S/4HANA invoice index.

### Exact Navigation & Clicks
1. In the sidebar, click **Decision Center**, then select **`INV-2026-00007`**.
2. Observe the AI Decision Card:
   - Recommendation: **`HOLD`** (Confidence: 25%, Risk: `CRITICAL`).
   - Alert Banner: *"DUPLICATE INVOICE ALERT: Invoice # AWS/2026/1090 with amount ₹4,01,200 already recorded in SAP invoice index."*
3. All posting actions are disabled.

### Pass Criteria
Duplicate invoice suspect flagged immediately on intake, risk level `CRITICAL`, financial posting blocked.

---

## Scenario 8: Government E-Invoice 48-Hour SLA (SC-08)

### Business Objective
Demonstrate statutory e-invoice validation with 64-character IRN verification and a 48-hour countdown timer approaching statutory breach.

### Preconditions
- Invoice: `INV-2026-00008` (Supplier: *Schneider Electric India Pvt Ltd*, Gross: ₹9,97,100).
- Source: Government E-Invoice IRP (IRN: `4f28d8b4e78a6327e4369f8c6501237a6b83f0d2c94178523091abcef5410982`).
- SLA Status: `APPROACHING_BREACH` (~325 minutes remaining).

### Exact Navigation & Clicks
1. In the sidebar, click **Business Validation**.
2. Locate **`INV-2026-00008`**.
3. Notice the amber SLA countdown pill: `APPROACHING BREACH - 325 MIN REMAINING`.
4. Click **Validate as Owner**.
5. In the validation modal:
   - Review the requisition summary (Smart Power Distribution Units - 20 EA).
   - Enter reason: *"Power distribution units delivered and installed in server hall 3."*
   - Click **Accept & Approve**.
6. Observe the multi-stage signing modal.
7. Observe the outcome:
   - Status updates to **`BUSINESS_VALIDATED`**.
   - AI recommendation updates to **`AUTO_PROCEED`** (Confidence: 99%).
   - `Post to SAP` button becomes enabled.

### Pass Criteria
Statutory IRN verified, 48h timer displayed, business owner approval flips AI recommendation to `AUTO_PROCEED` (confidence >= 95%), enabling `Post to SAP`.

---

## Scenario 9: Statutory GST GSTR-2B Mismatch (SC-09 / Scenario H)

### Business Objective
Demonstrate detection of tax credit discrepancies where vendor-billed GST exceeds the auto-drafted government portal return (`GSTR-2B`).

### Preconditions
- Invoice: `INV-2026-00009` (Supplier: *Infosys Limited*, Gross: ₹5,31,000).
- Invoiced GST: ₹81,000 (18%).
- Government GSTR-2B Statement: ₹68,400.
- Tax Difference: ₹12,600 in blocked / at-risk Input Tax Credit.

### Exact Navigation & Clicks
1. In the sidebar, click **GST Reconciliation**.
2. In the reconciliation table, locate **Infosys Limited**.
3. Notice the status badge: Amber **`MISMATCH`**.
4. Check the KPI summary at top: *"Total Blocked ITC: ₹12,600"*.
5. Click the row to inspect variance note:
   - *"GSTR-2B portal tax ₹68,400 under-reports invoiced tax ₹81,000 by ₹12,600. ITC cannot be claimed until supplier amends GSTR-1."*

### Pass Criteria
Discrepancy detected against GSTR-2B statement, ₹12,600 identified as blocked tax credit, status set to `MISMATCH`.

---

## Scenario 10: Business Owner Rejection & Formal Dispute (SC-10 / Scenario J)

### Business Objective
Demonstrate what happens when a requisitioner formally rejects an invoice due to defective service delivery.

### Preconditions
- Invoice: `INV-2026-00010` (Supplier: *Apex Facility Management Services*, HVAC Duct Cleaning).
- Initial Status: `PENDING_BUSINESS_VALIDATION`.

### Exact Navigation & Clicks
1. In the sidebar, click **Business Validation**.
2. Select invoice **`INV-2026-00010`**.
3. Click **Validate as Owner**.
4. In the validation modal:
   - Enter reason: *"HVAC duct cleaning in Pune site was incomplete. Ducts on Floor 3 were not serviced as per agreement."*
   - Click **Reject / Dispute**.
5. Observe the multi-stage dispute recording modal.
6. Observe the outcome:
   - Status transitions to **`REJECTED`**.
   - AI recommendation updates to **`REJECT`**.
   - Audit Trail records event `BUSINESS_OWNER_VALIDATION_RECORDED` with action `REJECT` and the captured dispute text.
   - Financial posting is permanently blocked.

### Pass Criteria
Rejection requires mandatory justification, status updates to `REJECTED`, posting blocked, dispute permanently recorded in audit trail.
