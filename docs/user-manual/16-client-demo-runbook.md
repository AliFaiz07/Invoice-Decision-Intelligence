# Executive Client Demonstration Runbook (15–20 Minute Script)

This runbook provides a complete, timed presentation script and click-by-click demonstration flow for showcasing Invoice Decision Intelligence to enterprise clients, finance executives, and SAP solution architects.

---

## 1. Demonstration Schedule Overview

| Segment | Timing | Topic & View | Key Value Proposition |
|---|---|---|---|
| **Part 1** | 00:00 – 02:00 | Landing Page & The Clean Core Story | Solving fragmented AP invoice intake with side-by-side BTP intelligence |
| **Part 2** | 02:00 – 04:30 | Multi-Channel Batch Ingestion | Normalizing paper scans, email attachments, and government IRP e-invoices |
| **Part 3** | 04:30 – 08:00 | Decision Center & Straight-Through Post | Transparent AI explainability, 3-way match, MIRO posting, F110 settlement |
| **Part 4** | 08:00 – 11:30 | Human Governance & E-Invoice SLA | Business owner sign-off with statutory 48h timer (Aarav Mehta workflow) |
| **Part 5** | 11:30 – 14:30 | Exception Management & What-If Simulator| Detecting price variances, QM defects, and interactive tolerance modeling |
| **Part 6** | 14:30 – 17:00 | Statutory GST & Global Joule Assistant | GSTR-2B Input Tax Credit protection and page-aware conversational AI |
| **Part 7** | 17:00 – 19:00 | Audit Ledger & Governed Reset | SOX 404 immutable audit trail and repeatable demo reset |

---

## 2. Timed Presentation Script & Click Sequence

### Part 1: Landing Page & Problem Statement (00:00 – 02:00)

**Screen**: `http://localhost:3000` (Product Landing Page)

**Clicks**:
1. Scroll down smoothly through the **Why It Exists** and **Validation Pipeline** sections.
2. Scroll back up and click **Sign In** in the top navigation bar.
3. On the login card, click **Continue as Aarav Mehta**.

**What to Say**:
> *"Welcome everyone. In most SAP S/4HANA enterprises today, Accounts Payable remains one of the most manual, error-prone operations. Vendor bills arrive through paper scans at the plant gate, PDFs sent to email inboxes, and statutory government e-invoice portals. AP clerks spend countless hours cross-referencing POs in ME23N and chasing department heads for approval.*
>
> *Invoice Decision Intelligence is an enterprise decision layer built on SAP BTP following SAP Clean Core principles. It unifies all intake channels, runs automated three-way matching against SAP master data, and applies calibrated AI decision scoring to route clean invoices straight to posting while catching high-risk exceptions. Let's step into the shoes of Aarav Mehta, our Business Owner and Approver."*

---

### Part 2: Inbound Gateways & Batch Normalization (02:00 – 04:30)

**Screen**: **Inbound Gateways** (`/mockPortals`)

**Clicks**:
1. In the sidebar, click **Inbound Gateways** (or click **Inbound Portals** in the header).
2. Point out the three channel cards:
   - *Physical / Gate Scanner*
   - *Vendor AP Mailbox*
   - *Government E-Invoice / IRP*
3. Click **Ingest Batch (6 Invoices)** on the **Physical Gate Scanner** card. Observe the multi-stage OCR extraction modal.
4. Click **Ingest Batch (6 Invoices)** on the **Vendor AP Mailbox** card.
5. In the sidebar, click **Invoice Inbox**.
6. Click the **Email Inbound** filter pill. Click **Inspect** on `INV-2026-00003` to show email headers (SPF/DKIM: PASS).

**What to Say**:
> *"Here in Inbound Gateways, we see the three enterprise intake streams. Whether it is a 300 DPI OCR scan from a warehouse gate, an email attachment with cryptographic DKIM validation, or a government IRP JSON payload with a 64-character IRN hash, our adapters immediately normalize the data into a single canonical invoice structure. In our Invoice Inbox, AP teams now have a single, unified view of all supplier liabilities."*

---

### Part 3: Decision Center & Straight-Through Settlement (04:30 – 08:00)

**Screen**: **Decision Center** (`/decisionCenter`)

**Clicks**:
1. In the sidebar, click **Decision Center**.
2. Select invoice **`INV-2026-00001`** (*Schneider Electric India Pvt Ltd*).
3. Walk the audience through the four quadrants of the screen:
   - **Top Summary**: Gross amount ₹59,000, Matched PO `4500012456`.
   - **AI Decision Card**: Recommendation `AUTO_PROCEED`, Confidence `99%`, Risk `LOW`.
   - **Evidence Ledger**: Point out the explicit separation between **FACTS** and **SYSTEM RECOMMENDATIONS**.
   - **4-Step Decision Explainer**: Walk through Input Verification → 3-Way LIV Check → Statutory Assessment → Final Recommendation.
4. In the top action bar, click **Post to SAP**.
   - Watch the multi-stage posting animation (`MIRO`).
   - Point out generated accounting document number `51056xxxxx`.
5. Click **Process Payment**.
   - Watch the automatic payment run modal (`F110`).
   - Point out payment document `20000xxxxx`.
6. Click **Clear AP Settlement**.
   - Point out clearing document `15000xxxxx` and status `CLEARED`.

**What to Say**:
> *"Notice that we do not hide the AI behind a black box. Our Evidence ledger strictly separates objective facts—such as warehouse receipts and PO terms—from system recommendations. Because all three-way checks passed with zero tolerance breach, the system recommends AUTO_PROCEED with 99% confidence. With a single click, we post the supplier invoice into S/4HANA via standard MIRO APIs, generate the BELNR accounting document, execute the payment run, and register general ledger clearing."*

---

### Part 4: Business Owner Validation & Statutory SLA (08:00 – 11:30)

**Screen**: **Business Validation** (`/businessValidation`)

**Clicks**:
1. In the sidebar, click **Business Validation**.
2. Point out invoice **`INV-2026-00008`** (*Schneider Electric - Smart PDU Delivery*).
3. Highlight the amber countdown pill: `APPROACHING BREACH - 325 MIN REMAINING`.
4. Click **Validate as Owner**.
5. Show the requisition details and system check. Enter justification:
   *"Power distribution units delivered and installed in server hall 3."*
6. Click **Accept & Approve**.
7. Watch the multi-stage authorization modal.
8. Show that the status flipped to `BUSINESS_VALIDATED`, AI recommendation upgraded to `AUTO_PROCEED` (99%), and `Post to SAP` is now enabled.

**What to Say**:
> *"Not all invoices should post automatically. Under Indian GST law, e-invoices require commercial confirmation within 48 hours to secure tax credits. Here, our SLA monitor detected that INV-2026-00008 was approaching statutory breach. Aarav Mehta reviews the requisition, validates that the power distribution units were installed, and signs off. Instantly, the AI re-evaluates the confidence score to 99% and unlocks the invoice for posting."*

---

### Part 5: Exceptions Workbench & What-If Simulator (11:30 – 14:30)

**Screen**: **Exceptions & Blocks** (`/exceptions`)

**Clicks**:
1. In the sidebar, click **Exceptions & Blocks**.
2. Review the prioritized exception cards:
   - `INV-2026-00006` (Wipro - 5 HEPA filters rejected by SAP QM).
   - `INV-2026-00004` (Apex - Billed against Siemens PO - Critical Vendor Mismatch).
   - `INV-2026-00005` (TCS - +15% Price Variance).
3. Click on **`INV-2026-00005`**. Click **What-If Simulator** in the header.
4. Drag the **Price Tolerance Slider** from `5%` to `15%`.
5. Point out the dynamic re-evaluation from `MANUAL_REVIEW` to `AUTO_PROCEED`.
6. Click **Reset Parameters**.
7. Click **Park in SAP** to demonstrate recording a preliminary document (`MIR7`) with payment block `R`.

**What to Say**:
> *"When discrepancies occur, the system safeguards company cash. Here, Wipro delivered 5 damaged filters caught by SAP QM, while Apex attempted to bill against a PO belonging to Siemens. For TCS, a 15% rate variance breached standard Tolerance Key PP. With our What-If Simulator, procurement managers can test policy sensitivity in real-time to understand how tolerance changes would affect straight-through processing rates, without altering production rules."*

---

### Part 6: Statutory GST & Global Joule Assistant (14:30 – 17:00)

**Screen**: **GST Reconciliation** (`/gstReconciliation`)

**Clicks**:
1. In the sidebar, click **GST Reconciliation**.
2. Point out **Infosys Limited** with status `MISMATCH` and ₹12,600 blocked ITC.
3. In the bottom-right corner, click the floating **Joule** diamond button.
4. The Joule drawer opens in `Context: GST Reconciliation`.
5. Click the question chip: **"Why is ₹12,600 tax credit blocked for Infosys?"**
6. Review Joule's immediate, accurate breakdown of GSTR-2B vs. invoice tax values.

**What to Say**:
> *"Tax compliance is a direct bottom-line issue. Infosys billed ₹81,000 in GST, but under-reported their return by ₹12,600. Our system immediately flags this discrepancy to prevent blocked Input Tax Credit. And throughout every screen, our global, page-aware SAP Joule assistant is always present, ready to answer contextual questions about tax rules, PO matches, or workflow next steps."*

---

### Part 7: Audit Trail & Governed Reset (17:00 – 19:00)

**Screen**: **Audit Trail** (`/audit`) & Top Header

**Clicks**:
1. In the sidebar, click **Audit Trail**.
2. Scroll through the immutable audit entries showing every action taken during the demo (`SAP_INVOICE_POSTED`, `BUSINESS_OWNER_VALIDATION_RECORDED`, etc.).
3. In the top header, click **Reset Demo**.
4. In the modal, click the red **Reset Demo** button.
5. Point out the success toast: *"All 10 enterprise demo scenarios reset to default state."*

**What to Say**:
> *"Every single action—whether automated by AI or executed by human managers—is recorded in our SOX Section 404 compliant immutable audit log. And when testing or demonstration concludes, a single click on 'Reset Demo' returns the entire platform to its clean baseline without touching underlying golden master fixtures. Thank you, and we welcome your questions."*

---

## 3. Fallback Procedures During Live Demos

| Unexpected Condition | Quick Fallback Action |
|---|---|
| **A button is unexpectedly disabled** | Check if the invoice is already in that state (e.g. already posted). Switch to another invoice (e.g. `INV-2026-00008` or `INV-2026-00003`). |
| **Drawer does not close** | Click the explicit `[X]` close button in the top right of the drawer or click anywhere on the background. |
| **Need to start over immediately** | Click **Reset Demo** in the top header; confirm reset; everything re-seeds within 1 second. |
