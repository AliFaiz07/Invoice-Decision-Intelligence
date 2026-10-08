# Complete End-to-End Demo Runbook & Master Architecture Guide
## Product: Invoice Decision Intelligence

---

### 1. Executive Overview

**Invoice Decision Intelligence** is an enterprise AP (Accounts Payable) automation and decision governance layer designed according to SAP Clean Core principles.

#### What Problem Does It Solve?
In enterprise SAP ERP systems, supplier invoices arrive via multiple disjointed channels:
1. Physical paper delivered to plant entry gates
2. PDF attachments in vendor AP mailboxes
3. Direct tax-portal JSON payloads from government E-Invoice / IRP networks

Traditionally, AP clerks manually re-enter data, perform manual lookups across SAP purchase orders (`EKKO`/`EKPO`), material documents (`MSEG`), and inspection lots (`QALS`), key in logistics invoice verifications via transaction `MIRO`, and manually release payment blocks. This process creates delays, price/quantity variance disputes, compliance exposure, and risk of double payments.

#### What Does This Application Do?
* **Ingests Multi-Channel Invoices**: Automatically processes batches from physical gate scanners, vendor AP emails, and government IRP pushes.
* **Normalizes into a Canonical Model**: Standardizes varied invoice sources into a unified structure without inventing synthetic data.
* **Correlates Against SAP Business Context**: Deterministically cross-references purchase orders, goods receipts, and quality inspection lots.
* **Produces an Auditable Evidence Matrix**: Rather than a superficial "match" status, it evaluates real billing values against PO/GR/QM values.
* **Runs Explainable AI Governance**: Recommends appropriate operational actions (`AUTO_PROCEED`, `MANUAL_REVIEW`, `HOLD`, `BUSINESS_VALIDATION_REQUIRED`, `ALREADY_PROCESSED`, `PAYMENT_FOLLOW_UP`).
* **Orchestrates the ERP Accounting & Payment Lifecycle**:
  $$\text{Preliminary Park (MIR7)} \longrightarrow \text{Business Owner Approval} \longrightarrow \text{Logistics Post (MIRO)} \longrightarrow \text{Payment Run (F110)} \longrightarrow \text{Clearing (BSAK)}$$
* **Maintains Immutable Audit & Compliance Logging**: Every automated inference and human intervention is logged with full data provenance.

---

### 2. Application Architecture

The system operates as an enterprise side-by-side extension (designed for SAP BTP) coupled to SAP S/4HANA:

```
[Inbound Channels]
  ├─ Physical Scanner (.pdf)
  ├─ Vendor AP Mailbox (.eml + .pdf)
  └─ Government IRP (.json + .pdf)
          │
          ▼
[Invoice Decision Intelligence Layer]
  ├─ Inbound Intake Gateway & Normalization
  ├─ MockSourceDataStore (Persistent state)
  ├─ InvoiceRepository (Central memory orchestration)
  ├─ ThreeWayReconciliationService (3-Way Matching & Evidence Matrix)
  ├─ AIDecisionEngine (Rule-grounded Explainable AI)
  ├─ BusinessValidationService (Requisitioner sign-off)
  ├─ GSTReconciliationService (Statutory GSTR-2B compliance)
  ├─ SAPPostingService (MIR7 Park, MIRO Post, F110 Payment, BSAK Clear)
  └─ AuditTrailService & IntegrationMonitorService (Ledgers)
          │
          ▼
[SAP S/4HANA Clean Core Services / Mock Adapter]
  ├─ Purchase Orders (EKKO / EKPO)
  ├─ Material Documents / Goods Receipts (MSEG)
  ├─ Quality Inspection Lots (QALS)
  ├─ Business Partners / Suppliers (LFA1 / BUT000)
  └─ Financial Accounting Documents (BKPF / BSAK / BSIK)
```

#### Codebase Directory Structure
* `src/server.ts`: Express server entry point, static asset middleware, and error fallbacks.
* `src/app/routes.ts`: RESTful routing controllers handling all frontend requests.
* `src/models/types.ts`: Data definitions (Canonical invoices, POs, GRs, QMs, and status unions).
* `src/services/InvoiceRepository.ts`: Central state management service providing invoice details and document chains.
* `src/services/MockSAPAdapter.ts`: SAP S/4HANA interface simulator (reads purchase orders and master fixtures).
* `src/services/ThreeWayReconciliationService.ts`: Deterministic line-item comparison engine.
* `src/services/AIDecisionEngine.ts`: Explainable decision engine evaluating risk and generating evidence.
* `src/services/SAPPostingService.ts`: Financial transaction processor (MIR7, MIRO, F110, BSAK).
* `src/public/js/app.js`: Vanilla JavaScript client managing the Fiori Horizon UI.
* `src/public/index.html`: Semantic HTML structure.
* `mock-data/inbound/`: Authoritative, immutable source fixtures.
* `mock-data/purchase-orders/`: Master SAP Purchase Order fixtures.

---

### 3. End-to-End Workflow

```
[1. INVOICE INTAKE] (Gate Scanner / AP Mailbox / Government DRC)
       │
       ▼
[2. DATA EXTRACTION] (Vendor, Dates, Totals, Taxes, Line Items)
       │
       ▼
[3. FIND SAP PO] (Matches PO Reference in SAP EKKO Master)
       │
       ▼
[4. FETCH SAP BUSINESS CONTEXT] (Goods Receipts from MSEG, QM Inspection from QALS)
       │
       ▼
[5. EVIDENCE COMPARISON ENGINE] (Side-by-side evaluation of Invoiced vs Received vs Ordered)
       │
       ▼
[6. AI DECISION ENGINE] (Generates Recommendations: AUTO_PROCEED, MANUAL_REVIEW, HOLD, etc.)
       │
       ▼
[7. PRELIMINARY PARK (MIR7)] (Stages document in SAP with Payment Block Key 'R')
       │
       ▼
[8. BUSINESS / FINANCE VALIDATION] (Operational requisitioner signs off on commercial delivery)
       │
       ▼
[9. LOGISTICS POST (MIRO)] (Generates BELNR accounting document, releases block 'R')
       │
       ▼
[10. PAYMENT RUN (F110)] (Automatic payment run disburses funds: 20000xxxxx)
       │
       ▼
[11. SETTLEMENT CLEARING (BSAK)] (Open-item matching settles the vendor ledger item)
```

---

### 4. Authoritative Data Sources

| Data Element | Technical Source | Business Role | Target Screen |
| :--- | :--- | :--- | :--- |
| **Inbound Invoice** | `mock-data/inbound/` (PDF / EML / JSON) | Canonical billing document submitted by vendor | Inbound Gateways, Inbox, Decision Center |
| **Supplier Master** | `MockSAPAdapter.ts` (`SAPBusinessPartner`) | S/4HANA Vendor Record (`LFA1`/`BUT000`), Tax ID, Payment Terms | Decision Center (Top card, Drawer) |
| **Purchase Order** | `mock-data/purchase-orders/*.json` | SAP PO Header (`EKKO`) & Item (`EKPO`), ordered quantities, prices | PO & 3-Way Match, Decision Center |
| **Goods Receipt** | `MockSAPAdapter.ts` (`SAPGoodsReceipt`) | SAP Material Document (`MSEG`), actual quantities received at Plant | PO & 3-Way Match, Decision Center |
| **Quality Lot** | `MockSAPAdapter.ts` (`SAPQualityInspectionLot`) | SAP QM Inspection Lot (`QALS`), units accepted vs rejected | PO & 3-Way Match, Decision Center |
| **GSTR-2B Filing** | `mock-data/tax/gstr-2b-fixtures.json` | Government Tax Portal statutory Input Tax Credit (ITC) record | GST Reconciliation |
| **Accounting Doc** | Generated by `SAPPostingService.postInvoice` | SAP FI/MM Invoice Document (`BELNR`, Document Type `RE`) | Decision Center (Doc Chain, Summary) |
| **Payment Doc** | Generated by `SAPPostingService.processPayment`| SAP FI-AP Payment Document (`20000xxxxx`, F110 Run) | Decision Center (Doc Chain, Payment card) |
| **Clearing Doc** | Generated by `SAPPostingService.clearPayment` | SAP FI-AP Settlement Document (`BSAK` Open Item Clearing) | Decision Center (Doc Chain, Payment card) |
| **Audit Log** | Generated by `AuditTrailService` | Append-only provenance tracking user and system actions | Audit Trail, Decision Center Ledger |

---

### 5. The Three Inbound Channels

The application preserves three batch ingestion channels. Each channel runs on a **One Click = One Complete Batch** model:

#### A. Physical / Gate Scanner Intake
* **Source Folder**: `mock-data/inbound/physical-gate-scanner/`
* **Source Files**: 6 documents (`INV-2026-00001.pdf`, `INV-2026-00002.pdf`, `INV-2026-00006.pdf`, `INV-2026-00010.pdf`, `INV-SCAN-514037.pdf`, `INV-SCAN-641331.pdf`)
* **Trigger**: Click **"Scan New Paper Invoice"**
* **Ingested**: 6 invoices processed in a single batch
* **UI Progress Stages**: 
  1. *Optical Sensor Initialization*
  2. *OCR Layout Segmentation*
  3. *Table & Line Item Digitization*
  4. *Tax Invoice Number Validation*
  5. *Canonical Ingestion Complete*

#### B. Vendor Invoice AP Mailbox
* **Source Folder**: `mock-data/inbound/vendor-ap-mailbox/`
* **Source Files**: 6 email/attachment pairs (`email_INV-2026-00003.eml` through `00009.eml` & `INV-MAIL-376612.eml`)
* **Trigger**: Click **"Simulate Inbound AP Email"**
* **Ingested**: 6 invoices processed in a single batch
* **UI Progress Stages**: 
  1. *IMAP/POP3 Mailbox Handshake*
  2. *MIME Multi-part Extraction*
  3. *Attachment SHA-256 Digest Validation*
  4. *Natural Language Body Parsing*
  5. *Canonical Ingestion Complete*

#### C. Government E-Invoice / IRP Source
* **Source Folder**: `mock-data/inbound/government-einvoice-irp/`
* **Source Files**: 6 statutory payloads and PDFs (`INV-2026-00008.json` through `INV-EINV-374698.json`)
* **Trigger**: Click **"Simulate E-Invoice Portal Push"**
* **Ingested**: 6 invoices processed in a single batch
* **UI Progress Stages**: 
  1. *IRP Webhook Handshake*
  2. *Statutory Schema Validation*
  3. *Cryptographic Signature Verification*
  4. *IRN 64-character Hash Resolution*
  5. *Canonical Ingestion Complete*

> **Duplicate Prevention**: Clicking an intake button a second time within the same demo cycle returns: `"Batch ingestion for channel already executed this session. Reset demo to re-run intake."`

---

### 6. Demo Setup Procedure

Follow these steps to initialize the environment:

#### Step 1: Start the Application
Run in PowerShell / Terminal:
```powershell
npm run dev
```
*Expected Output*:
```
[SERVER] SAP Invoice Decision Intelligence service running on port 3000
[SERVER] Demo mode active - Initialized 18 canonical invoices across 3 channels
```

#### Step 2: Open the Web Application
Open your browser to:
```
http://localhost:3000
```
*Expected Screen*: The **Invoice Decision Intelligence** dashboard displays the enterprise metrics strip, executive KPI cards, and navigation drawer.

#### Step 3: Reset Demo to Factory State
1. Click the **"Reset Demo"** button in the top-right header toolbar.
2. Confirm the browser dialog.
*Expected Result*: All scenarios restore to baseline factory states. Dynamic batch flags reset to un-ingested states. Source disk fixtures remain unaltered.

#### Step 4: Open Inbound Gateways
1. In the left navigation menu, click **"Inbound Gateways"**.
2. Observe three channels: *Physical Gate Scanner*, *Vendor AP Mailbox*, and *Government DRC*. All cards show 6 available fixtures.

#### Step 5: Execute Inbound Intake
1. Click **"Scan New Paper Invoice"** $\to$ Watch the 5-step animation finish $\to$ Badge shows **Batch Processed (6/6 Invoices)**.
2. Click **"Simulate Inbound AP Email"** $\to$ Batch processes (6/6).
3. Click **"Simulate E-Invoice Portal Push"** $\to$ Batch processes (6/6).
4. Total invoices in system: **18 canonical invoices**.

---

### 7. Scenario-by-Scenario Demo Playbook

---

#### SCENARIO 1: Perfect Match Full Lifecycle (Clean Invoice)
* **Invoice ID**: `INV-2026-00001` (Vendor: Schneider Electric India Pvt Ltd)
* **Purchase Order**: `4500012456` | **Amount**: ₹59,000 (Gross)
* **Starting State**: Processing Status: `DATA_EXTRACTED` | Posting: `NOT_POSTED` | Payment: `NOT_DUE`

**Demo Click Path**:
1. Click **Invoice Inbox** in left navigation. Locate `INV-2026-00001`. Notice Match Status is **MATCHED** and Recommendation is **AUTO-PROCEED**.
2. Click **Decision Center** in left navigation. Click **Inspect** on `INV-2026-00001`.
3. Review the **Top Summary Card**:
   * *What is this?* Schneider Electric `INV-2026-00001` (₹59,000).
   * *Recommendation*: `AUTO_PROCEED` (Confidence: 98%).
   * *Assigned Requisitioner*: Amit Verma (Facilities & Plant Operations).
4. Review the **Evidence-Based Comparison & Validation Ledger**:
   * Supplier: `Schneider Electric` vs `Schneider Electric` $\to$ **MATCH**
   * Purchase Order: `4500012456` vs `4500012456` $\to$ **MATCH**
   * Material: `MAT-ELEC-01` (MCB 32A) $\to$ **MATCH**
   * Quantity: Invoiced `100 EA` vs PO `100 EA` vs GR `100 EA` vs Quality `100 accepted` $\to$ **MATCH**
   * Unit Price: Invoiced `₹500` vs PO `₹500` $\to$ **MATCH**
   * Net Amount: Invoiced `₹50,000` vs PO `₹50,000` $\to$ **MATCH**
   * Quality Inspection: `Lot Passed (100 EA)` $\to$ **MATCH**
5. Step 1 Action: Click **"Park Invoice (MIR7)"**.
   * *Expected*: Status updates to **PARKED IN S/4HANA (PAYMENT BLOCK R)**.
   * *Meaning*: Document registered preliminarily under document `5105600121` without releasing funds.
6. Step 2 Action: Click **"Validate as Owner"**.
   * Enter reason: `"Delivery confirmed on site."` $\to$ Click **"Approve Invoice"**.
   * *Expected*: Processing status transitions to `BUSINESS_VALIDATED`.
7. Step 3 Action: Click **"Post to S/4HANA (MIRO)"**.
   * *Expected*: Document posts to S/4HANA Logistics Invoice Verification.
   * *Badge*: `POSTED TO S/4HANA (BELNR 5105600122)`.
   * *Payment Status*: Automatically moves from `BLOCKED` to `PAYMENT_PENDING`.
8. Step 4 Action: In the AP Payment Card, click **"Execute AP Payment Run (F110)"**.
   * *Expected*: Automated payment run triggers.
   * *Badge*: `PAID (DOC 2000000001)` | Reference: `PAY-2026-000001`.
   * *Clearing Status*: Remains `OPEN / UNSETTLED`.
9. Step 5 Action: Click **"Execute Settlement Clearing (BSAK)"**.
   * *Expected*: Vendor line item is matched against the payment document.
   * *Badge*: `CLEARED (BSAK)` | Clearing Doc: `2000000002`.
   * *Notice*: Green confirmation: `"Reconciled & Completely Settled in SAP S/4HANA"`.
10. Final Verification: Check the **Document Reference Chain** at the bottom:
    * All 8 nodes display green confirmed references from Supplier Invoice through Clearing Document.

---

#### SCENARIO 2: Price Variance (PP Tolerance Breach)
* **Invoice ID**: `INV-2026-00005` (Vendor: Siemens India Industrial Systems)
* **Purchase Order**: `4500012750` | **Amount**: ₹5,40,000 Net (Billed ₹5,400/EA vs PO ₹5,000/EA)
* **Starting State**: Recommendation: `MANUAL_REVIEW`

**Demo Click Path**:
1. Click **Decision Center** $\to$ Search or locate `INV-2026-00005` $\to$ Click **Inspect**.
2. Inspect the **Top Summary Card**:
   * Recommendation: **MANUAL REVIEW** (Confidence: 85%).
   * Explanation: `"Unit price variance exceeds Tolerance Key PP (+8.0%). Invoiced at ₹5,400 vs PO base ₹5,000."`
3. Inspect the **Comparison Table**:
   * Locate row **Unit Price**:
     * Invoice: `₹5,400`
     * PO: `₹5,000`
     * GR: `—`
     * Validation Result: **PRICE VARIANCE** (Amber badge).
4. Inspect the action buttons:
   * **Post to S/4HANA (MIRO)** is disabled or requires exception resolution.
5. *Demonstration Message*:
   > *"The decision engine protects cash flow. Because this price increase exceeds configured tolerance keys, direct posting is blocked. The invoice requires AP specialist intervention or a PO price amendment."*

---

#### SCENARIO 3: Quantity Variance (Over-Delivery Discrepancy)
* **Invoice ID**: `INV-2026-00002` (Vendor: Siemens India Industrial Systems)
* **Purchase Order**: `4500012500` | **Quantity**: Invoiced `100 EA` vs GR `90 EA`
* **Starting State**: Recommendation: `MANUAL_REVIEW`

**Demo Click Path**:
1. Click **PO & 3-Way Match** in left navigation.
2. Locate `INV-2026-00002`. The quantity cell displays: **100 / 90 EA (OVER_DELIVERY)** with an amber review badge.
3. Click **Drilldown** $\to$ Lands directly on the invoice workspace.
4. Review the **Three-Way Match Verification** card:
   * Purchase Order: `100 units`
   * Goods Receipt: `90 units` (highlighted in red: *Short delivery at Plant 1010*)
   * Invoice: `100 units`
5. Inspect the **Comparison Table**:
   * Row **Quantity**: Invoice `100 EA` vs PO `100 EA` vs GR `90 EA` $\to$ **QUANTITY VARIANCE**.
6. *Demonstration Message*:
   > *"The supplier billed for 100 units, but receiving docks registered only 90 units in material document 5000018915. Direct posting is prevented until either the remaining 10 units are delivered or a credit memo is issued."*

---

#### SCENARIO 4: Duplicate Invoice Attempt (Fraud & Double-Payment Defense)
* **Invoice ID**: `INV-2026-00007` (Vendor: ABB India Power Grids)
* **Starting State**: Recommendation: `HOLD` | Risk Level: `CRITICAL`

**Demo Click Path**:
1. Click **Exceptions & Blocks** in left navigation.
2. Observe `INV-2026-00007` flagged under **Duplicate Suspects**.
3. Click **Decision Center** $\to$ Inspect `INV-2026-00007`.
4. Inspect the **Top Summary Card**:
   * Recommendation: **HOLD** (Confidence: 99% | Risk: **CRITICAL**).
   * Finding: `"DUPLICATE INVOICE ALERT: Vendor 'ABB India Power Grids' and Invoice Number match an existing historical SAP invoice document."`
5. Review the **Comparison Table**:
   * Row **Duplicate Check**: Result shows **DUPLICATE SUSPECT** (Red badge).
6. Attempt to post:
   * Action buttons are locked to prevent duplicate financial liability.
7. *Demonstration Message*:
   > *"The duplicate invoice index checks supplier ID, external invoice number, and fiscal year. This stops duplicate disbursements before documents enter SAP FI."*

---

#### SCENARIO 5: Scenario A — Already Posted & Paid in SAP
* **Invoice ID**: `INV-SCAN-641331` (Vendor: Schneider Electric India Pvt Ltd)
* **Starting State**: Posting: `POSTED` | Payment: `PAID` | Clearing: `CLEARED`

**Demo Click Path**:
1. Click **Invoice Inbox**. Search `INV-SCAN-641331`.
2. Notice:
   * Match Status: `MATCHED`
   * Invoice Status: `POSTED`
   * Payment Status: `CLEARED`
   * Recommendation: `ALREADY PROCESSED`
3. Click **Decision Center** $\to$ Inspect `INV-SCAN-641331`.
4. Inspect the **Document Reference Chain**:
   * Supplier Invoice: `SEI/2026/8901`
   * Purchase Order: `4500012456`
   * Goods Receipt: `5000018901`
   * Accounting Doc: `5100001234`
   * Payment Doc: `2000012345`
   * Clearing Doc: `2000012346`
5. Review the **AP Payment Card**:
   * Shows: `Reconciled & Completely Settled in SAP S/4HANA`.
6. Safeguards:
   * Duplicate posting and duplicate payment actions are blocked.
7. *Demonstration Message*:
   > *"When an invoice document has completed its lifecycle in SAP, re-scanning it must not re-trigger disbursements. The system matches the transaction against open items and marks it as fully reconciled."*

---

#### SCENARIO 6: Scenario C — Already Posted + Payment Pending in SAP
* **Invoice ID**: `INV-SCAN-514037` (Vendor: Schneider Electric India Pvt Ltd)
* **Starting State**: Posting: `POSTED` | Payment: `PAYMENT_PENDING` | Clearing: `OPEN`

**Demo Click Path**:
1. Click **Invoice Inbox**. Filter or search `INV-SCAN-514037`.
2. Notice:
   * Status: `POSTED` | Payment: `PENDING`
   * Recommendation: **PAYMENT FOLLOW-UP**
3. Click **Inspect**.
4. Top Card shows:
   * `POSTED TO S/4HANA (BELNR 5100001280)`
   * System recommendation: `PAYMENT_FOLLOW_UP`
5. AP Payment Card shows:
   * Posting Status: `POSTED (MIRO)`
   * Payment Status: `PENDING` (Amber badge)
   * Clearing Status: `OPEN / UNSETTLED`
   * Action button available: **"Execute AP Payment Run (F110)"**.
6. Click **"Execute AP Payment Run (F110)"**:
   * Generates Payment Document `2000014037`.
   * Payment status transitions to `PAID`.
7. Click **"Execute Settlement Clearing (BSAK)"**:
   * Generates Settlement Clearing Document `2000014038`.
   * Item reaches final settled state.
8. *Demonstration Message*:
   > *"This represents an invoice already verified via MIRO, but sitting in AP open items (table BSIK). The decision engine identifies that posting is complete and routes the user directly to payment execution."*

---

#### SCENARIO 7: Scenario B — New Inbound Invoices
* **Invoice ID**: `INV-2026-00003` or newly ingested invoices from Inbound Gateways.
* **Starting State**: Posting: `NOT_POSTED` | Payment: `NOT_DUE` | Clearing: `OPEN`
* **Lifecycle**: Extracted $\to$ Evaluated $\to$ Progressed through preliminary park, requisitioner approval, logistics posting, automated payment run, and clearing.

---

#### SCENARIO 8: Quality Rejection Discrepancy (QM Inspection Failure)
* **Invoice ID**: `INV-2026-00006` (Vendor: Schneider Electric India Pvt Ltd)
* **Purchase Order**: `4500012800` | **QM Status**: 5 units rejected
* **Starting State**: Recommendation: `HOLD`

**Demo Click Path**:
1. Click **Decision Center** $\to$ Inspect `INV-2026-00006`.
2. Inspect the **Top Summary Card**:
   * Recommendation: **HOLD** (Confidence: 96%).
   * Finding: `"QUALITY DEFECT: SAP QM Inspection Lot flagged 5 units as defective or rejected."`
3. Inspect the **Comparison Table**:
   * Row **Quality Inspection**:
     * GR Value: `MSEG Item: 100 EA`
     * Quality Value: `Defects (5 rejected)`
     * Validation Result: **QUALITY REJECTED** (Red badge).
4. *Demonstration Message*:
   > *"Quality Management controls apply to specific goods receipt categories. When inspection lot QALS records defects, the invoice is blocked until quality engineering disposition occurs."*

---

#### SCENARIO 9: Non-PO Service Invoice
* **Invoice ID**: `INV-2026-00003` (Vendor: Infosys Enterprise Cloud Services)
* **Starting State**: Non-PO Service Requisition (CC-1020-IT)

**Demo Click Path**:
1. Click **Decision Center** $\to$ Inspect `INV-2026-00003`.
2. Review the **Process Flow Strip**:
   * PO node shows `Non-PO Route` (Amber).
3. Review the **Comparison Table**:
   * Result badges indicate `NON_PO` and direct cost center accounting assignment (`CC-1020-IT`).
4. *Demonstration Message*:
   > *"Not every invoice references a purchase order. For recurring service contracts or utilities, the engine routes line items directly to cost centers and general ledger accounts."*

---

#### SCENARIO 10: Statutory GST / GSTR-2B ITC Mismatch
* **Invoice ID**: `INV-2026-00009`
* **Starting State**: Recommendation: `MANUAL_REVIEW`

**Demo Click Path**:
1. Click **GST Reconciliation** in left navigation.
2. Review the top KPI cards:
   * Tax Period: September 2026 (`092026`)
   * Blocked / At-Risk Input Tax Credit (ITC): `₹94,500`
3. Locate `INV-2026-00009` in the GSTR-2B comparison table:
   * Identifies that invoice tax claims exceed amounts declared on the government portal.
4. *Demonstration Message*:
   > *"Under statutory GST regulations, claiming Input Tax Credit on invoices not reflected in GSTR-2B creates tax exposure. The engine identifies this discrepancy before payment release."*

---

### 8. Status Definitions

| Status | Business Meaning | SAP Equivalent | Next Action |
| :--- | :--- | :--- | :--- |
| **NOT_POSTED** | Document captured, awaiting review | Staged in BTP staging buffer | Perform 3-way match |
| **PARKED** | Preliminarily stored in SAP with payment block | Transaction **MIR7** (Payment Block `R`) | Requisitioner approval |
| **POSTED** | Financial liability recorded in general ledger | Transaction **MIRO** (BELNR document created) | Execute AP payment run |
| **PAYMENT_PENDING**| Accounting document open in AP ledger | Table **BSIK** (Open Vendor Item) | Execute F110 disbursement |
| **PAID** | Cash disbursed to supplier | Transaction **F110** (Clearing Doc generated) | Match and clear open item |
| **CLEARED** | Vendor line item fully settled | Table **BSAK** (Cleared Vendor Item) | Lifecycle completed |
| **BLOCKED** | Payment held due to variance or defect | Payment Block Key `A`, `R`, or `P` | Exception review |
| **HOLD** | Processing suspended due to fraud risk or defect | Staging Lock / Workflow Hold | Quality or vendor clarification |

#### Key Lifecycle Distinctions
* **PARKED $\neq$ POSTED**: A parked invoice (`MIR7`) is a saved draft with no general ledger impact. A posted invoice (`MIRO`) updates balance sheet accounts.
* **POSTED $\neq$ PAID**: Posting records liability. Payment requires a separate treasury run.
* **PAID $\neq$ CLEARED**: Payment creates a cash credit. Clearing matches the payment against the invoice in table `BSAK` to close the open item.

---

### 9. Transaction Terminology

* **MIR7 (Preliminary Parking)**: Records an invoice draft into SAP logistics tables without financial postings. Sets payment block `'R'` (Invoice Verification).
* **MIRO (Logistics Invoice Verification)**: Posts the final invoice, debits the GR/IR clearing account, credits the vendor account, creates accounting document (`BELNR`), and lifts block `'R'`.
* **F110 (Automatic Payment Run)**: Batch treasury run disbursing funds and creating payment document (`20000xxxxx`).
* **BSAK (Vendor Open Item Settlement Clearing)**: Clears open items in table `BSIK`, moving them to table `BSAK` to mark accounts as settled.

---

### 10. Document Reference Chain

```
[1. Supplier Invoice] (SEI/2026/0892)
         ↓
[2. Purchase Order] (4500012456 - EKKO)
         ↓
[3. Goods Receipt] (5000018901 - MSEG)
         ↓
[4. Quality Lot] (100004510 - QALS, if inspected)
         ↓
[5. Parked Invoice] (5105600121 - MIR7)
         ↓
[6. Accounting Document] (5105600122 - MIRO)
         ↓
[7. Payment Document] (2000000001 - F110)
         ↓
[8. Clearing Document] (2000000002 - BSAK)
```

Uncreated documents display **NOT CREATED** without throwing errors.

---

### 11. Evidence Comparison Matrix

The comparison engine evaluates billing values against operational and quality records:

```
                  INVOICE (Billing Side)
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
    PO (EKKO)           GR (MSEG)           QM (QALS)
  (Authorized)          (Received)          (Accepted)
        └───────────────────┬───────────────────┘
                            │
                            ▼
                [3-WAY COMPARISON ENGINE]
                            │
                            ▼
                    VALIDATION MATRIX
```

| Check Item | Invoice (Billing) | Purchase Order (EKKO) | Goods Receipt (MSEG) | Quality (QALS) | Expected Value | Result Badge |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Supplier** | Invoiced Name / GSTIN | PO Supplier / Tax ID | — | — | PO Supplier | `MATCH` |
| **PO Reference**| Invoiced PO Number | S/4HANA PO Record | Linked Material Doc | — | Valid Released PO | `MATCH` |
| **Material** | Invoiced Line Text | PO Line Description | Material Master Text | — | Exact Item Match | `MATCH` |
| **Quantity** | Invoiced Quantity | Ordered Quantity | Delivered Quantity | Accepted Quantity | GR Delivered Qty | `MATCH` / `QTY VARIANCE` |
| **Unit Price** | Invoiced Unit Price| Base PO Unit Price | — | — | PO Unit Price | `MATCH` / `PRICE VARIANCE` |
| **Net Amount** | Invoiced Net Amount| Extended Net Value | Receipt Valuation | — | Ordered Net | `MATCH` / `PRICE VARIANCE` |
| **Tax** | Invoiced Tax Amount| Computed PO Tax | — | — | Statutory Tax | `MATCH` |
| **Quality** | — | — | Total Received Qty | Accepted vs Rejected | 100% Accepted | `MATCH` / `QUALITY REJECTED` |

---

### 12. Explainable AI Decision Engine

The AI decision engine does **not** generate synthetic invoices or post to SAP unprompted. It acts as a deterministic governance layer:

```
[Invoice Attributes] + [PO Data] + [GR Receipts] + [QM Findings] + [Tax Records]
                                  │
                                  ▼
                   [EXPLAINABLE AI ENGINE (XAI)]
                                  │
                                  ▼
┌────────────────────────┬────────────────────────────────────────────────────────┐
│ RECOMMENDATION         │ BUSINESS MEANING & TRIGGER CRITERIA                    │
├────────────────────────┼────────────────────────────────────────────────────────┤
│ AUTO_PROCEED           │ 3-way match clean, prices within tolerance, QM passed. │
│ MANUAL_REVIEW          │ Price or quantity variance exceeds tolerance keys.     │
│ HOLD                   │ Quality defect, vendor mismatch, or duplicate suspect. │
│ BUSINESS_VALIDATION    │ Statutory 48h deadline or non-PO requisitioner review. │
│ ALREADY_PROCESSED      │ Historical invoice posted and paid (double-pay guard).│
│ PAYMENT_FOLLOW_UP      │ Invoice posted in SAP, awaiting F110 disbursement.     │
└────────────────────────┴────────────────────────────────────────────────────────┘
```

---

### 13. Screen Navigation Guide

* **Overview (Landing Page)**: Executive cockpit showing operational status, incoming volumes, exceptions, and pending validations.
* **Command Center**: Real-time metrics strip and throughput velocity tracker.
* **Invoice Inbox**: Primary 10-column canonical workbench with sorting, search, and channel filters.
* **Decision Center**: Core workspace showing the Top Summary Card, Process Strip, Comparison Table, Document Chain, Payment Status, and Audit Ledger.
* **PO & 3-Way Match**: Procurement ledger showing PO, GR, and Invoice line details with drilldown navigation.
* **Business Validation**: Requisitioner portal for commercial sign-offs.
* **Exceptions & Blocks**: Triage queue for price variances, over-deliveries, duplicate alerts, and QM failures.
* **GST Reconciliation**: Statutory GSTR-2B compliance dashboard monitoring Input Tax Credits.
* **Integration Monitor**: Middleware message trace recording system payloads and retry counts.
* **Audit Trail**: Enterprise event ledger maintaining timestamped change provenance.
* **Inbound Gateways**: Multi-channel intake hub for physical scanners, AP mailboxes, and government DRC pushes.

---

### 14. 15-Minute Client Demonstration Script

#### 00:00 - 02:00: Executive Introduction
* Open the **Overview** page (`http://localhost:3000`).
* *Spoken*: *"Welcome. Invoice Decision Intelligence is an SAP Clean Core extension for automated supplier invoice verification and decision governance."*
* Click **Reset Demo** in the top header. Show all counters returning to baseline states.

#### 02:00 - 05:00: Multi-Channel Batch Ingestion
* Navigate to **Inbound Gateways**.
* Click **"Scan New Paper Invoice"** $\to$ Explain OCR layout extraction as the 5-step animation completes.
* Click **"Simulate Inbound AP Email"** $\to$ Explain RFC-822 multi-part attachment ingestion.
* Click **"Simulate E-Invoice Portal Push"** $\to$ Explain statutory IRN hash verification.
* Navigate to **Invoice Inbox** $\to$ Point out that all 18 invoices are loaded with canonical metadata.

#### 05:00 - 09:00: Clean Invoice Lifecycle (Scenario 1)
* From Invoice Inbox, open **Decision Center** $\to$ Click **Inspect** on `INV-2026-00001`.
* Point out the **Comparison Table**: *"We compare real invoice values against PO, GR, and Quality records."*
* Point out the **Process Strip** and **AI Recommendation** (`AUTO_PROCEED`).
* Click **"Park Invoice (MIR7)"** $\to$ Explain preliminary registration with payment block `'R'`.
* Click **"Validate as Owner"** $\to$ Enter approval reason $\to$ Confirm.
* Click **"Post to S/4HANA (MIRO)"** $\to$ Show generated accounting document (`BELNR 5105600122`).
* In the Payment card, click **"Execute AP Payment Run (F110)"** $\to$ Show payment document (`2000000001`).
* Click **"Execute Settlement Clearing (BSAK)"** $\to$ Show clearing document (`2000000002`).
* Scroll to the **Document Reference Chain**: Point out all 8 stages confirmed.

#### 09:00 - 13:00: Variance & Discrepancy Scenarios
* **Price Variance**: Open `INV-2026-00005`. Show unit price variance (+8.0%). Point out that auto-posting is blocked.
* **Quantity Variance**: Open `PO & 3-Way Match` $\to$ Show `INV-2026-00002` (Invoiced 100 vs Received 90). Drill down into workspace.
* **Quality Rejection**: Open `INV-2026-00006`. Show 5 units rejected by QM lot `100004580`. Explain that QM controls apply only to relevant material items.
* **Duplicate Detection**: Open `INV-2026-00007`. Show `DUPLICATE SUSPECT` alert blocking double disbursement.

#### 13:00 - 15:00: Payment Scenarios & Audit Trace
* Open `INV-SCAN-641331` (Scenario A): Show invoice already posted and paid in SAP. Demonstrate that duplicate posting/payment is rejected.
* Open `INV-SCAN-514037` (Scenario C): Show invoice posted with payment pending. Execute simulated payment run.
* Open **Audit Trail**: Show immutable log of user approvals, posting events, and clearing entries.
* Open **Integration Monitor**: Show payload message traces.
* *Closing*: *"Invoice Decision Intelligence prevents financial leakage, enforces compliance, and automates supplier invoice verification while keeping the ERP core clean."*

---

### 15. Presentation Talking Points

* **On Ingestion**: *"The platform accepts documents from physical gate scanners, vendor mailboxes, and government tax portals, normalizing all sources into a unified canonical model."*
* **On PO Correlation**: *"We match the invoice against SAP purchase order headers and retrieve master data without synthetic data generation."*
* **On Comparison**: *"Rather than displaying a simple match status, the platform evaluates actual invoice figures against purchase orders, goods receipts, and quality inspection records."*
* **On Explainable AI**: *"The AI layer does not generate transactions or alter accounting records unprompted. It assesses the validated business evidence and recommends appropriate operational actions."*
* **On Quality Inspection**: *"Quality management controls apply specifically to inspected goods receipt items. Inspection dependencies are evaluated only when relevant inspection lots exist."*
* **On Parking vs Posting**: *"Parking preliminary drafts in MIR7 sets payment blocks until approvals are complete. Final MIRO posting verifies documents and registers general ledger liabilities."*
* **On Payment & Clearing**: *"Posting an invoice and disbursing funds are distinct operations. The platform tracks open items from payment release through BSAK clearing."*

---

### 16. Client Questions & Answers

**Q1: Where does invoice data come from?**
> *A: Invoices originate from physical gate scanners (PDFs), vendor email attachments (RFC-822 .eml), or government e-invoice portals (signed statutory JSON payloads).*

**Q2: How does the system find the SAP Purchase Order?**
> *A: Extracted purchase order numbers are looked up in the SAP purchasing table (`EKKO`). If a match exists, ordered items, pricing, and buyer codes are loaded.*

**Q3: What is a Goods Receipt (GR) and why is it needed?**
> *A: A Goods Receipt (`MSEG`) confirms that materials were received at the plant. 3-way matching prevents payment for billed items that were never delivered.*

**Q4: Is Quality Management (QM) checked on every invoice?**
> *A: No. QM inspection applies only when purchase orders flag quality inspection lots (`QALS`). Non-inspected items bypass this check.*

**Q5: What is the difference between PARK (MIR7) and POST (MIRO)?**
> *A: Parking stages an invoice draft in SAP with payment block key `'R'` without updating general ledger balances. Posting verifies logistics data, creates accounting documents (`BELNR`), and records liabilities.*

**Q6: What happens if an invoice price is higher than the Purchase Order?**
> *A: Tolerance key `PP` evaluates variance. Small variances within tolerance proceed with warning flags; variances exceeding tolerance halt automated posting and require manual review.*

**Q7: How does duplicate invoice detection work?**
> *A: Invoices are checked against supplier tax IDs, vendor invoice numbers, and fiscal years in tables `RBKP` and `BSIP`. Duplicates are placed on hold to prevent double payment.*

**Q8: Does AI automatically post invoices?**
> *A: No. The AI engine evaluates business evidence and recommends actions (`AUTO_PROCEED`, `MANUAL_REVIEW`, `HOLD`). Posting actions require configured rules or human sign-off.*

**Q9: What is the difference between POSTED, PAID, and CLEARED?**
> *A: `POSTED` registers accounting liability (`MIRO`). `PAID` disburses funds (`F110`). `CLEARED` settles the open vendor item in table `BSAK`.*

**Q10: Can this integrate with a live SAP S/4HANA system?**
> *A: Yes. The architecture isolates mock adapters behind standard TypeScript interfaces. Switching environment configuration connects standard S/4HANA Cloud APIs (`API_SUPPLIERINVOICE_PROCESS_SRV`).*

---

### 17. Mock vs. Real SAP Integration

| Component | Current Demo Implementation | Future Real SAP S/4HANA Integration |
| :--- | :--- | :--- |
| **Inbound Extraction** | Dynamic fixture normalization across 3 inbound folders | SAP Document Information Extraction (DOX) on BTP |
| **Purchase Order** | Mock SAP Adapter reading structured PO fixtures | OData v4: `API_PURCHASEORDER_PROCESS_SRV` |
| **Goods Receipt** | Simulated material document matching (`MSEG`) | OData: `API_MATERIAL_DOCUMENT_SRV` |
| **Quality Lot** | Simulated inspection lot status records (`QALS`) | OData: `API_INSPECTIONLOT_SRV` |
| **Park (MIR7)** | Simulated document creation (`51056xxxxx`, Block `R`) | SOAP: `SupplierInvoiceERPCreateRequestConfirmation_In` (Park) |
| **Post (MIRO)** | Simulated Logistics Invoice Verification (`BELNR`) | OData v2/v4: `API_SUPPLIERINVOICE_PROCESS_SRV` (Post) |
| **Payment Run (F110)**| Simulated disbursement reference (`20000xxxxx`) | SAP FI-AP Automatic Payment Program (`F110` / Bank Communication) |
| **Clearing (BSAK)**| Simulated open-item matching (`BSAK` clearing doc) | S/4HANA Financial Clearing API (`API_FINANCIALDOCUMENT_SRV`) |
| **E-Invoice DRC** | Statutory JSON payload parsing & IRN verification | SAP Document and Reporting Compliance (DRC) |

---

### 18. Troubleshooting Guide

* **Inspect Page Renders Blank Below Header**:
  * *Cause*: Missing template references or runtime JavaScript exception.
  * *Check*: Open DevTools Console (`F12`). Verify all arrays (`comparisonRows`, `documentChain`, `evidence`) have empty array defaults (`|| []`).
* **Batch Button Shows Already Processed**:
  * *Cause*: Channels enforce duplicate prevention within active sessions.
  * *Resolution*: Click **"Reset Demo"** in the top header.
* **Payment Button Unavailable**:
  * *Cause*: Invoices must be in `postingStatus === 'POSTED'` before payment execution.
  * *Resolution*: Complete approval and post via MIRO first.
* **Clearing Button Unavailable**:
  * *Cause*: Invoices must be in `paymentStatus === 'PAID'` before open-item clearing.
  * *Resolution*: Execute the F110 payment run first.
* **"Unexpected token '<'" in Network Calls**:
  * *Cause*: API request targeted an invalid route that returned `index.html`.
  * *Resolution*: Confirm endpoints begin with `/api/` and routes match `routes.ts`.

---

### 19. Scenario Reference Matrix

| Scenario Name | Invoice ID | Supplier | Key Variation | Recommendation | Final State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Perfect Match** | `INV-2026-00001` | Schneider Electric | Exact match across PO, GR, QM | `AUTO_PROCEED` | POSTED $\to$ PAID $\to$ CLEARED |
| **2. Quantity Variance**| `INV-2026-00002` | Siemens India | Invoiced 100 vs GR 90 | `MANUAL_REVIEW` | Exception Held / Review |
| **3. Non-PO Service** | `INV-2026-00003` | Infosys Cloud | No PO; direct Cost Center assignment | `NON_PO_PROCESS`| Cost Center Validated |
| **4. Vendor Mismatch** | `INV-2026-00004` | Larsen & Toubro | Invoiced vendor $\neq$ PO vendor | `HOLD` | Blocked on Hold |
| **5. Price Variance** | `INV-2026-00005` | Siemens India | Unit price exceeds PP tolerance (+8%) | `MANUAL_REVIEW` | Review / Tolerance Held |
| **6. Quality Rejection**| `INV-2026-00006` | Schneider Electric | QM lot flags 5 rejected units | `HOLD` | Blocked on Quality Defect |
| **7. Duplicate Invoice** | `INV-2026-00007` | ABB India | Duplicate vendor invoice number | `HOLD` | Locked / Fraud Defense |
| **8. Statutory Sign-off**| `INV-2026-00008` | Schneider Electric | Government e-invoice approaching 48h SLA| `BUSINESS_VALIDATION` | Owner Approved $\to$ Posted |
| **9. GST ITC Mismatch** | `INV-2026-00009` | L&T Electrical | Invoice tax claims exceed GSTR-2B data | `MANUAL_REVIEW` | Review / Tax Withheld |
| **10. Owner Dispute** | `INV-2026-00010` | Voltas Engineering | Service shortfall rejected by requisitioner| `REJECT` | Disputed / REJECTED |
| **11. Scenario A** | `INV-SCAN-641331`| Schneider Electric | Historical invoice posted and paid | `ALREADY_PROCESSED` | Reconciled / Locked |
| **12. Scenario C** | `INV-SCAN-514037`| Schneider Electric | Historical invoice posted, payment open | `PAYMENT_FOLLOW_UP`| Disbursed $\to$ Cleared |

---

### 20. One-Page Cheat Sheet

```
                           THE DEMO CHEAT SHEET
================================================================================
1. START:
   npm run dev  →  Open http://localhost:3000  →  Click "Reset Demo"

2. INGEST:
   Inbound Gateways → Click "Scan New Paper" (6) + "Simulate Email" (6) + "Simulate E-Invoice" (6)

3. THE CORE WORKFLOW:
   Invoice Inbox → Select Clean Invoice (INV-2026-00001) → Inspect
   → Park (MIR7) → Validate as Owner → Post (MIRO) → Pay (F110) → Clear (BSAK)

4. STATUS SUMMARY:
   PARKED   = Staged draft in SAP (MIR7), Block 'R' applied, no general ledger impact
   POSTED   = Verified liability in SAP (MIRO), Accounting Doc (BELNR) created
   PAID     = Funds disbursed via payment run (F110), Payment Doc created
   CLEARED  = Vendor line item settled against payment (BSAK), lifecycle completed

5. COMPARISON OUTCOMES:
   MATCH             → Full alignment across PO, GR, and Quality records
   PRICE VARIANCE    → Exceeds Tolerance Key PP (Billed > PO)
   QUANTITY VARIANCE → Exceeds delivery records (Billed > GR)
   QUALITY REJECTED  → Defects recorded in SAP QM Inspection Lot (QALS)
   DUPLICATE SUSPECT → Record matches historical SAP invoice index (RBKP/BSIP)

6. QUICK INVOICE SELECTOR:
   • Clean Lifecycle:     INV-2026-00001 (Schneider - ₹59,000)
   • Price Variance:      INV-2026-00005 (Siemens - ₹5,400 vs ₹5,000)
   • Quantity Variance:   INV-2026-00002 (Siemens - 100 billed vs 90 received)
   • Duplicate Attempt:   INV-2026-00007 (ABB - Duplicate invoice alert)
   • Quality Rejection:   INV-2026-00006 (Schneider - 5 units rejected by QM)
   • Already Paid:        INV-SCAN-641331 (Scenario A - Prevents double disbursement)
   • Payment Pending:     INV-SCAN-514037 (Scenario C - Posted, ready for F110)
================================================================================
```
