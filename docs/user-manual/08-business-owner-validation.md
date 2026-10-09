# Business-Owner Validation & Governance Workflow

This chapter covers the human-in-the-loop governance workflow where departmental requisitioners and cost center owners review, approve, or dispute vendor invoices.

---

## 1. Business Rationale: Why Requisitioner Governance is Essential

In enterprise procurement, AP automation cannot operate solely on automated rules:
- **Services & Non-Physical Deliverables**: For consulting, maintenance, software, or utilities, there is often no physical warehouse barcode scan. Only the requisitioner knows if the work was completed satisfactorily.
- **Commercial Variances**: When a vendor delivers 10 extra units or bills a 5% price increase, only the business manager can decide whether to accept the cost or demand a credit note.
- **Statutory E-Invoice Deadlines**: Indian GST statutory e-invoices require commercial confirmation within 48 hours to prevent penalty and secure Input Tax Credit (ITC).

---

## 2. The Business Owner Validation Cockpit (`/businessValidation`)

In the left sidebar, click **Business Validation** under `RECONCILIATION & APPROVALS`.

```
+----------------------------------------------------------------------------------------------------+
| BUSINESS OWNER VALIDATION COCKPIT                                                                   |
| Commercial sign-off workbench for departmental requisitioners and cost center owners.              |
+----------------------------------------------------------------------------------------------------+
| PENDING OWNER VALIDATION (5)                                                                       |
|                                                                                                    |
| +------------------------------------------------------------------------------------------------+ |
| | INV-2026-00008 | Schneider Electric India Pvt Ltd | Smart PDU (20 EA) | Gross: Rs 9,97,100     | |
| | PO: 4500012900 | Department: Facilities & Plant Operations | Cost Center: CC-1010-ENG          | |
| | SLA: [APPROACHING BREACH - 325 MIN REMAINING]                                                  | |
| | System Flag: Statutory E-Invoice 48-Hour SLA requires requisitioner confirmation               | |
| |                                                                                                | |
| | [ Validate as Owner ]   [ Accept (Quick) ]   [ Reject / Dispute ]                              | |
| +------------------------------------------------------------------------------------------------+ |
|                                                                                                    |
| +------------------------------------------------------------------------------------------------+ |
| | INV-2026-00002 | Siemens India Ltd | PLC Input Modules (100 EA) | Gross: Rs 1,41,600           | |
| | PO: 4500012500 | Department: Automation & Controls | Cost Center: CC-1010-ENG                  | |
| | System Flag: Invoiced quantity (100) exceeds received quantity (90) - 10 missing units         | |
| |                                                                                                | |
| | [ Validate as Owner ]   [ Accept (Quick) ]   [ Reject / Dispute ]                              | |
| +------------------------------------------------------------------------------------------------+ |
+----------------------------------------------------------------------------------------------------+
```

---

## 3. The Validation Dialog & Supported Actions

Clicking **Validate as Owner** on any pending invoice opens the **Business Owner Validation Modal**:

```
+---------------------------------------------------------------------------------+
| BUSINESS OWNER WORKFLOW VALIDATION                                              |
| Invoice: INV-2026-00008 (Schneider Electric India Pvt Ltd)                      |
+---------------------------------------------------------------------------------+
| PO: 4500012900     SUPPLIER: Schneider Electric     INVOICE: SEI/2026/0892     |
| VALUE: Rs 9,97,100 DEPARTMENT: Facilities & Plant   REQUEST: Smart PDU Dual Feed|
+---------------------------------------------------------------------------------+
| [!] SYSTEM CHECK: Statutory E-Invoice 48-Hour SLA requires requisitioner        |
|     confirmation before automatic MIRO posting.                                 |
+---------------------------------------------------------------------------------+
| Does this invoice represent a valid business expense associated with your       |
| requisition?                                                                    |
|                                                                                 |
| Reason / Justification Note (Required for Reject & Send Back):                  |
| [ Power distribution units delivered and installed in server hall 3.          ] |
+---------------------------------------------------------------------------------+
| [ Accept & Approve ]       [ Request Clarification ]       [ Reject / Dispute ] |
+---------------------------------------------------------------------------------+
```

### Action Directory:

| Action Button | Internal Code | Business Outcome | Mandatory Justification? |
|---|---|---|---|
| **Accept & Approve** | `ACCEPT` | Confirms delivery and approves budget consumption. Re-evaluates invoice to `AUTO_PROCEED` (confidence >= 95%). | Optional (defaults to standard approval text). |
| **Request Clarification** | `SEND_BACK` | Returns the invoice to the vendor or buyer for invoice correction or missing GR documentation. | **Mandatory**. Action blocked if blank. |
| **Reject / Dispute** | `REJECT` | Formally rejects the invoice. Sets status to `REJECTED`, blocks ERP posting, and logs dispute. | **Mandatory**. Action blocked if blank. |

---

## 4. Multi-Stage Visual ERP Feedback

When the user submits a business validation decision, the application runs a realistic multi-stage ERP processing animation:
1. *"Validating business line items & cost center budget..."*
2. *"Signing authorization with business owner ID (AVERMA)..."*
3. *"Updating enterprise audit ledger & decision queue..."*
4. *"Business Owner Decision Recorded: ACCEPT"*

---

## 5. What Changes After Validation?

Submitting `ACCEPT` triggers an immediate chain reaction across the platform:
1. **Invoice Status**: Flips from `PENDING_BUSINESS_VALIDATION` to `BUSINESS_VALIDATED`.
2. **AI Decision Re-Evaluation**:
   - The AI Decision Engine automatically recalculates the score.
   - Recommendation updates from `BUSINESS_VALIDATION_REQUIRED` to `AUTO_PROCEED`.
   - Confidence score increases to **>= 95%** (e.g., 99%).
3. **Action Button Availability**:
   - The `Post to SAP` (MIRO) button becomes **enabled** in the Decision Center.
   - The `Validate as Owner` button becomes **disabled** (preventing duplicate approvals).
4. **Audit Trail Recording**:
   - An immutable event `BUSINESS_OWNER_VALIDATION_RECORDED` is committed to the Audit Trail with actor `Aarav Mehta`, cost center `CC-1010-ENG`, action `ACCEPT`, and the captured reason string.
