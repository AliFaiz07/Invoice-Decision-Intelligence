# SAP Invoice Decision Intelligence — User Journeys & Demo Narrative
**Document ID:** PROD-JOURNEY-004  
**Version:** 1.0.0  

---

## 1. Primary User Personas & Intent

| Persona | Core Job-to-be-Done | Key Screen & Primary Action |
|---|---|---|
| **Business Owner** (Requisitioner / Cost Center Head) | Confirm whether an invoice represents a legitimate business expense raised by their department within 30 seconds. | **Business Validation:** Reviews evidence, clicks `Accept`, `Reject`, or `Send Back` with justification. |
| **Finance / AP Specialist** | Clear matched invoices for payment, resolve price/tax variances, and post to S/4HANA (MIRO). | **Decision Center & Inbox:** Evaluates AI recommendations, checks tolerance keys, clicks `Post Supplier Invoice`. |
| **Procurement Specialist** | Investigate quantity shortfalls, PO discrepancies, and vendor mismatches. | **PO & Reconciliation:** Drills into Goods Receipts (`MATDOC`) and SAP QM inspection lots. |
| **Tax / Compliance Lead** | Ensure input tax credit compliance and reconcile internal purchases with GSTN GSTR-2B. | **GST Reconciliation:** Analyzes 2B matching flags, identifies missing invoices or tax deltas. |
| **System Auditor** | Trace transactions, prove segregation of duties (SoD), and verify immutable approval logs. | **Audit Trail & Decision Explainer:** Inspects timestamped state diffs and system evidence. |

---

## 2. Canonical 10-Step Demo Story Narrative

The application is structured to demonstrate an end-to-end enterprise narrative during product evaluations:

1. **Step 1 — Command Center:** The user opens the application and immediately sees the **Attention Queue**: *11 invoices require human decision right now*.
2. **Step 2 — Decision Center:** The user clicks invoice `INV-2026-00451` from Schneider Electric India.
3. **Step 3 — Intelligence Summary:** The system presents the decision: **MANUAL REVIEW (91% Confidence)** with clear traceable bullets: Vendor matched, PO matched, but Invoiced Qty (100) > Received Qty (90).
4. **Step 4 — Transaction Story:** The user views the chronological story of the document: Intake at 09:20 → OCR extraction → PO identified → GR checked → Quantity variance flagged.
5. **Step 5 — Business Owner Experience:** The user switches to the Business Owner view, reading the contextual prompt and evidence.
6. **Step 6 — Action Submission:** The user submits acceptance with reason: *"Commercial switchgear delivery confirmed at site."*
7. **Step 7 — State Transition:** The system captures the decision and recalculates recommendation to **AUTO-PROCEED**.
8. **Step 8 — S/4HANA Posting:** The user clicks `Post Supplier Invoice (MIRO)`; the system creates official SAP Accounting Document `5105600125/2026`.
9. **Step 9 — GST Reconciliation:** The user opens the GST workspace and verifies the same invoice appears matched against statutory GSTR-2B records.
10. **Step 10 — Audit Trail:** The user opens the Audit Trail and confirms the immutable ledger has logged every actor, state delta, and timestamp.
