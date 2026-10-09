# Finance Posting Simulation (MIRO, MIR7, F110 & BSAK)

This chapter explains the financial settlement stage, the difference between parking and posting, payment runs, and how ERP operations are simulated within the platform.

---

## 1. Distinction: Business Validation vs. Financial Posting

In enterprise financial operations, **validation** and **posting** are two fundamentally different stages:

```
[ INVOICE VALIDATION ] ─────────────────────────> [ FINANCIAL POSTING ] ─────────────────────────> [ TREASURY DISBURSEMENT ]
- 3-Way LIV Matching                              - S/4HANA Accounting Doc (BELNR)                 - Payment Run (F110)
- Requisitioner Approval                          - Debit: Expense / GR/IR Clearing               - Payment Doc (20000xxxxx)
- Exception Resolution                            - Credit: Vendor Liability (21100000)            - Settlement Clearing (BSAK)
- Decision Intelligence                           - Tax GL Posting (Input GST)
```

1. **Validation**: Verifies that goods were received, prices match contracts, taxes are correct, and authorized managers agree to pay. *No accounting entries are made in the general ledger.*
2. **Posting (`MIRO`)**: Commits the transaction to the S/4HANA general ledger. Creates an accounting document (`BELNR`), updates vendor open items (`BSIK`), clears the GR/IR interim account, and books input tax.
3. **Parking (`MIR7`)**: Stores a preliminary, non-binding document in S/4HANA with payment block `R`. It appears in reporting but does not post to the general ledger and cannot be paid until released.

---

## 2. Real vs. Simulated Boundaries

> [!IMPORTANT]
> **Simulation Transparency**: Unless configured with a live SAP BTP Destination to an active S/4HANA tenant, Invoice Decision Intelligence executes financial posting, parking, payment, and clearing via `SAPPostingService.ts`.
> The simulation engine:
> - Generates realistic 10-digit SAP S/4HANA document numbers matching standard number ranges (`51056xxxxx` for BELNR, `20000xxxxx` for payment docs, `15000xxxxx` for clearing docs).
> - Models payment block keys (`R` for verification block).
> - Enforces standard SAP business rules (blocking duplicate postings or payments).
> - Records full audit ledger events.

---

## 3. Supported Financial Operations

### Operation 1: Post to SAP S/4HANA (`MIRO`)
- **When Enabled**: Available when an invoice is in `BUSINESS_VALIDATED` status or has an AI recommendation of `AUTO_PROCEED`.
- **Preconditions**:
  - Invoice must not already be in `POSTED` status.
  - Three-way match must be clean, or business owner must have approved.
- **Execution**: Click **Post to SAP** in the Decision Center action bar.
- **Visual Feedback**:
  The system displays a multi-stage ERP operation modal:
  1. *"Loading parked invoice..."*
  2. *"Validating supplier and PO reference..."*
  3. *"Checking posting prerequisites..."*
  4. *"Preparing accounting document..."*
  5. *"Posting supplier invoice (MIRO)..."*
  6. *"INVOICE POSTED"*
- **Resulting State**:
  - `postingStatus`: Flips to `POSTED`.
  - `accountingDocumentNumber`: Generated (e.g., `5105600101`).
  - `fiscalYear`: `2026`.
  - `paymentStatus`: Transitions to `PAYMENT_PENDING`.
  - Audit Trail: Records `SAP_INVOICE_POSTED`.

### Operation 2: Park in SAP S/4HANA (`MIR7`)
- **When Enabled**: Available on invoices in `EXCEPTION_RAISED` or `IN_REVIEW` status.
- **Execution**: Click **Park in SAP** on the invoice card.
- **Visual Feedback**: Multi-stage progress modal simulating preliminary document creation.
- **Resulting State**:
  - `postingStatus`: Flips to `PARKED`.
  - `paymentBlock`: Applied (`R` - Logistics Invoice Verification Block).
  - Preliminary document number generated.
  - Prevents automated payment until released.

### Operation 3: Process AP Payment Run (`F110`)
- **When Enabled**: Available only after an invoice has been successfully posted (`POSTED`) and is in `PAYMENT_PENDING` status.
- **Execution**: Click **Process Payment** in the Decision Center or settlement timeline.
- **Visual Feedback**: Multi-stage modal simulating SAP automatic payment program execution.
- **Resulting State**:
  - `paymentStatus`: Flips to `PAID`.
  - `paymentDocumentNumber`: Generated (e.g., `2000001091`).
  - Payment date stamped.
  - Enables the final clearing action.

### Operation 4: Clear Settlement Open Item (`BSAK`)
- **When Enabled**: Available only after payment disbursement has occurred (`PAID`).
- **Execution**: Click **Clear AP Settlement** on the completed settlement timeline.
- **Visual Feedback**: Multi-stage modal simulating general ledger reconciliation.
- **Resulting State**:
  - `clearingStatus`: Flips to `CLEARED`.
  - `clearingDocumentNumber`: Generated (e.g., `1500001842`).
  - Open item in `BSIK` moved to cleared item table `BSAK`.
  - Full financial settlement complete.

---

## 4. Two Distinct Real-World Enterprise Situations

The platform models two distinct enterprise payment states:

### Situation A: Invoice is Already Posted & Paid in SAP
- **Representative Fixture**: `INV-SCAN-641331`
- **Initial State**:
  - `postingStatus`: `POSTED` (BELNR: `5105600991`)
  - `paymentStatus`: `PAID` (Payment Doc: `2000001001`)
  - `clearingStatus`: `CLEARED` (Clearing Doc: `1500001001`)
- **AI Recommendation**: `ALREADY_PROCESSED`
- **Enforced Rule**: Attempting to click `Post to SAP` or `Process Payment` is strictly blocked by the API, preventing accidental double-payments.

### Situation B: Invoice Received But Posting Has Not Happened Yet
- **Representative Fixtures**: `INV-2026-00001` (Scenario 1) or `INV-2026-00003` (Scenario B)
- **Initial State**:
  - `postingStatus`: `NOT_POSTED`
  - `paymentStatus`: `NOT_DUE`
  - `clearingStatus`: `OPEN`
- **Enforced Rule**: Invoices must progress through validation or parking before financial posting can take place.
