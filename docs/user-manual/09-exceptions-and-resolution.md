# Exceptions, Blocks & Resolution Workflows

This chapter details the exception classification engine, root causes for invoice holds, and the step-by-step resolution pathways in the **Exceptions & Blocks** workbench.

---

## 1. Exception Classification Matrix

When an invoice fails deterministic three-way matching or regulatory checks, the platform categorizes the discrepancy into one of six distinct exception classes:

```
+───────────────────────────+─────────────────────────────────────────────────────────────+
| Exception Category        | Root Cause & Diagnostic Indicator                           |
+───────────────────────────+─────────────────────────────────────────────────────────────+
| 1. Price Variance         | Unit price exceeds PO contracted price beyond tolerance PP  |
| 2. Quantity Over-Delivery | Invoiced quantity exceeds confirmed Goods Receipt (GR)      |
| 3. Vendor / PO Mismatch   | Invoiced vendor GSTIN does not match PO vendor master       |
| 4. Duplicate Invoice      | Same invoice number and amount already in S/4HANA index     |
| 5. Quality Lot Defect     | Material failed QA inspection in SAP QM (QALS lot)          |
| 6. Statutory GST Mismatch | Invoice tax amount exceeds auto-drafted GSTR-2B statement    |
+───────────────────────────+─────────────────────────────────────────────────────────────+
```

---

## 2. Deep Dive: Implemented Exception Scenarios

### Exception 1: Price Variance & Tolerance PP Breach
- **Representative Fixture**: `INV-2026-00005` (*Tata Consultancy Services Ltd*)
- **PO Reference**: `4500012750`
- **Root Cause**: Billed unit price is ₹1,150/hr vs. PO contracted unit price of ₹1,000/hr (+15.0% variance).
- **Tolerance Evaluation**: Breaches SAP Tolerance Key `PP` (standard threshold is 5.0%).
- **AI Recommendation**: `MANUAL_REVIEW` (Confidence: 70%, Risk: `MEDIUM`).
- **Resolution Pathway**:
  1. Click **Park in SAP** to register a preliminary document (`MIR7`) with payment block `R`.
  2. Or open the **What-If Simulator**, increase price tolerance slider to `15%`, and observe the score re-evaluate to `AUTO_PROCEED`.

### Exception 2: Quantity Mismatch (Over-Delivery)
- **Representative Fixture**: `INV-2026-00002` (*Siemens India Ltd*)
- **PO Reference**: `4500012500`
- **Root Cause**: Billed for 100 EA, but Goods Receipt `5000018915` confirms only 90 EA delivered at warehouse dock (10 units missing).
- **Tolerance Evaluation**: Breaches SAP Tolerance Key `DQ` (0% over-delivery without PO over-delivery indicator).
- **AI Recommendation**: `MANUAL_REVIEW` (Confidence: 70%, Risk: `MEDIUM`).
- **Resolution Pathway**:
  1. Requisitioner investigates whether remaining 10 units were delivered under a separate gate pass.
  2. If accepted as partial bill, park preliminary document in SAP.

### Exception 3: Vendor & PO Mismatch (Critical Block)
- **Representative Fixture**: `INV-2026-00004` (*Apex Facility Management Services*)
- **PO Reference**: `4500012600`
- **Root Cause**: Apex Facility Management billed against a PO assigned to Siemens India Ltd.
- **Tolerance Evaluation**: Zero tolerance. Cross-entity billing is strictly blocked.
- **AI Recommendation**: `HOLD` (Confidence: 25%, Risk: `CRITICAL`).
- **Resolution Pathway**: Immediate rejection and return to vendor; posting is completely disabled.

### Exception 4: Duplicate Invoice Suspect
- **Representative Fixture**: `INV-2026-00007` (*Amazon Web Services India Pvt Ltd*)
- **Invoice Number**: `AWS/2026/1090`
- **Root Cause**: Invoice number and gross amount (`₹4,01,200`) match an invoice already recorded in the S/4HANA invoice index (`BSIS`/`BSAS`).
- **AI Recommendation**: `HOLD` (Confidence: 25%, Risk: `CRITICAL`).
- **Resolution Pathway**: Flagged for double-payment prevention. Verified against existing accounting document.

### Exception 5: Quality Inspection Defect (SAP QM Rejection)
- **Representative Fixture**: `INV-2026-00006` (*Wipro Enterprises Ltd*)
- **PO Reference**: `4500012800`
- **Root Cause**: Billed for 100 HEPA filters, but SAP Quality Lot `100004580` records 5 rejected units (damaged gaskets failed air seal test).
- **AI Recommendation**: `HOLD` (Confidence: 30%, Risk: `CRITICAL`).
- **Resolution Pathway**: Commercial hold pending vendor credit note for the 5 scrap units.

### Exception 6: Statutory GST GSTR-2B Discrepancy
- **Representative Fixture**: `INV-2026-00009` (*Infosys Limited*)
- **PO Reference**: `4500012920`
- **Root Cause**: Vendor billed ₹81,000 tax, but auto-drafted GSTR-2B portal record reflects only ₹68,400 (₹12,600 tax credit at risk).
- **AI Recommendation**: `MANUAL_REVIEW` (Confidence: 65%, Risk: `MEDIUM`).
- **Resolution Pathway**: Hold tax settlement until vendor files supplementary GSTR-1 return.

---

## 3. Navigating the Exceptions & Blocks Workbench

1. In the left sidebar, click **Exceptions & Blocks** under `RECONCILIATION & APPROVALS`.
2. The view displays a prioritized queue of all invoices currently in `EXCEPTION_RAISED` or `ON_HOLD` status.
3. Each exception card displays:
   - **Severity Pill**: `CRITICAL` (Red) or `MEDIUM` (Amber).
   - **Exception Reason**: Detailed description of the commercial or technical breach.
   - **Financial Impact**: Net variance and gross exposure amount.
   - **Quick Action Bar**:
     - `Park in SAP (MIR7)`: Records preliminary document in ERP.
     - `Inspect in Detail`: Opens the full Decision Center workbench.
     - `What-If Simulator`: Simulates policy adjustments.

---

## 4. The Parking Resolution Pathway (`MIR7`)

When an invoice cannot be posted immediately due to an exception, the enterprise standard is to **Park** the invoice:
1. On the invoice detail screen or exception card, click **Park in SAP**.
2. A multi-stage dialog simulates recording the preliminary document:
   - *"Validating invoice state..."*
   - *"Checking PO reference..."*
   - *"Preparing parked invoice in SAP S/4HANA (MIR7)..."*
   - *"Applying payment block key R..."*
   - *"Recording audit event..."*
3. Once parked:
   - Invoice posting status changes to `PARKED`.
   - Payment block key `R` (Invoice Verification Block) is applied in S/4HANA.
   - Prevents the invoice from being swept into an automatic payment run (`F110`) until the exception is resolved.
