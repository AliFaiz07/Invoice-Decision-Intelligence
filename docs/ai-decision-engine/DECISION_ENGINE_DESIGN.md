# SAP Invoice Decision Intelligence — AI Decision Engine Design
**Document ID:** AI-S4H-BTP-ENG-003  
**Subsystem:** Decision Intelligence & Explainability Engine  
**SAP Framework Alignment:** SAP S/4HANA Logistics Invoice Verification (LIV), Tolerance Keys, SAP Business AI  
**Version:** 1.0.0  

---

## 1. Engine Objective & Architectural Principles

Traditional invoice processing systems suffer from two extremes:
1. **Dumb Rule Engines:** Rigid boolean filters that fail completely on minor rounding variances, creating endless false-positive exceptions that overwhelm AP staff.
2. **Black-Box AI Models:** Deep learning classifiers that output an opaque confidence score (e.g. `Approved 91.4%`) without explainability, making them un-auditable under SOX 404, IFRS, and statutory tax governance.

The **SAP Invoice Decision Intelligence Engine** solves this via a **Hybrid Deterministic-Heuristic Signal Synthesizer**:
- **Hard Validation Constraints (Gatekeepers):** Binary compliance checks derived directly from SAP S/4HANA transactional integrity rules.
- **Cognitive Intelligence Signals:** Weighted scoring across variance tolerances, historical vendor reliability, duplicate fingerprinting, and receipt timing anomalies.
- **Explainable AI (XAI) Output Contract:** Every decision produces a 4-part structured rationale:
  1. *What did the system check?*
  2. *What did it find?*
  3. *Why did it make this recommendation?*
  4. *What should the user do next?*

---

## 2. Signal Taxonomy

### Category A: Hard Validation Signals (Binary Gatekeepers)
If any of these fundamental integrity checks fail, the engine immediately blocks automatic processing.

| Signal Code | Signal Description | SAP Field / Source | Fail Behavior |
|---|---|---|---|
| `SIG_PO_EXISTS` | Purchase Order exists in SAP database | `EKKO-EBELN` | Route to Non-PO Process |
| `SIG_VENDOR_EXISTS` | Supplier is valid Business Partner in company code | `LFA1-LIFNR` / `BUT000` | HOLD (Unknown Vendor) |
| `SIG_VENDOR_MATCH_PO` | Invoice supplier matches PO header supplier | `RBKP-LIFNR == EKKO-LIFNR` | HOLD (Vendor Mismatch) |
| `SIG_CURRENCY_MATCH` | Invoice currency matches PO order currency | `RBKP-WAERS == EKKO-WAERS` | HOLD (Currency Mismatch) |
| `SIG_COMPANY_CODE` | Invoice billed to valid legal entity | `RBKP-BUKRS == EKKO-BUKRS` | HOLD (Entity Mismatch) |
| `SIG_DUPLICATE_CHECK` | Hash check of Supplier + Invoice No + Financial Year | `RBKP-XBLNR` + `LIFNR` + `GJAHR` | HOLD / REJECT (Duplicate) |

---

### Category B: Three-Way Matching & Logistics Signals
Evaluated against SAP Goods Receipt documents (`MATDOC` / `MSEG`) and SAP LIV Tolerance Keys.

| Signal Code | Signal Description | SAP Tolerance Key | Formula / Threshold | Impact on Score |
|---|---|---|---|---|
| `SIG_GR_EXISTS` | At least one Goods Receipt has been posted | `EKBE-VGABE = '1'` | Count of GR records $> 0$ | Pass: $+15$, Fail: $-40$ |
| `SIG_QTY_MATCH` | Invoiced Qty vs Received Qty | `DQ` (Exceed amount: qty variance) | $\Delta Q = Q_{INV} - Q_{GR}$ | $\Delta Q = 0 \to +25$<br>$\Delta Q > 0 \to -50$ (HOLD) |
| `SIG_PRICE_VARIANCE` | Unit Price vs PO Net Price | `PP` (Price variance) | $\frac{\|P_{INV} - P_{PO}\|}{P_{PO}} \times 100$ | $\le 1\% \to +20$<br>$1\% - 5\% \to -15$<br>$> 5\% \to -40$ |
| `SIG_TOTAL_AMOUNT` | Total Net Amount vs PO Commitment | `BD` (Form small differences) | $\frac{\|A_{INV} - A_{PO}\|}{A_{PO}} \times 100$ | Within tolerance: $+15$<br>Exceeded: $-30$ |
| `SIG_QM_ACCEPTED` | Quality Inspection Lot Decision | SAP QM (`QALS-VBEWERTUNG`) | $Q_{REJECTED} = 0$ | Pass: $+15$, Rejected $>0 \to -45$ (HOLD) |

---

### Category C: Business Context & Anomaly Signals
Signals derived from organizational ownership and behavioral patterns.

| Signal Code | Signal Description | Assessment Logic | Impact on Score |
|---|---|---|---|
| `SIG_BO_VALIDATION` | Business Owner confirmation status | `PENDING` \| `ACCEPTED` \| `REJECTED` | Accepted: $+20$<br>Pending: Blocks Auto-Proceed<br>Rejected: Forces REJECT |
| `SIG_HISTORICAL_MATCH` | Vendor historical dispute frequency | Rolling 12-month PO vs IR dispute rate | Low ($<2\%$) $\to +5$, High ($>15\%$) $\to -15$ |
| `SIG_SLA_RISK` | E-Invoice statutory acceptance deadline | Hours remaining until 48-hour deadline | $<6\text{h} \to \text{Escalate Priority}$ |

---

## 3. Mathematical Decision Scoring Model

Let the total confidence score $S \in [0, 100]$ be computed as:

$$S = \max\left(0, \min\left(100, S_{base} + \sum_{i} w_i \cdot s_i\right)\right)$$

Where:
- $S_{base} = 50$ (Neutral starting point)
- $w_i$: Weight of signal $i$
- $s_i$: Normalized score contribution $\in [-1.0, +1.0]$

### Decision Boundaries & State Machine:
```text
           ┌──────────────────────────────────────────────┐
           │ Hard Validation Checks Passed?               │
           └──────────────────────┬───────────────────────┘
                                  │
                   NO ────────────┴──────────── YES
                   │                             │
                   ▼                             ▼
       ┌────────────────────────┐    ┌────────────────────────┐
       │ HOLD / ROUTE NON-PO    │    │ Business Owner Status? │
       │ (Vendor/PO/Duplicate)  │    └───────────┬────────────┘
       └────────────────────────┘                │
                                  PENDING ───────┴─────── ACCEPTED
                                  │                         │
                                  ▼                         ▼
                      ┌──────────────────────┐  ┌───────────────────────┐
                      │ BUSINESS VALIDATION  │  │ Check Reconcile Score │
                      │ REQUIRED             │  └───────────┬───────────┘
                      └──────────────────────┘              │
                                   ┌────────────────────────┼────────────────────────┐
                                   ▼                        ▼                        ▼
                                S >= 95%               75% <= S < 95%             S < 75%
                          (Zero LIV Variances)     (Minor Variance / Pend GR)   (Quality / Qty Defect)
                                   │                        │                        │
                                   ▼                        ▼                        ▼
                            AUTO-PROCEED              MANUAL REVIEW                 HOLD
```

---

## 4. Explainable AI (XAI) Output Contract

Every evaluation produces an immutable JSON structure that populates the **Invoice Decision Center**:

```json
{
  "invoiceId": "INV-2026-00451",
  "poNumber": "4500012456",
  "recommendation": "MANUAL_REVIEW",
  "confidenceScore": 87,
  "riskLevel": "MEDIUM",
  "signalsSummary": {
    "hardChecksPassed": true,
    "poIdentified": true,
    "vendorMatched": true,
    "businessOwnerStatus": "ACCEPTED",
    "threeWayMatch": {
      "quantityStatus": "VARIANCE_DETECTED",
      "priceStatus": "WITHIN_TOLERANCE",
      "qualityStatus": "INSPECTION_PENDING"
    }
  },
  "explanation": {
    "whatWasChecked": [
      "SAP S/4HANA PO 4500012456 line item 00010 (Schneider Electric)",
      "Material Document Goods Receipts 5000018921",
      "Tolerance Key DQ (Quantity) and PP (Price Variance)",
      "Business Owner Requisition confirmation by Amit Verma (IT Infra)"
    ],
    "whatWasFound": [
      "Invoiced quantity (100 EA) exceeds recorded SAP Goods Receipt (90 EA) by 10 EA.",
      "Unit price ₹8,450.00 is within 0.6% tolerance of PO price ₹8,400.00 (Tolerance Key PP).",
      "Business Owner Amit Verma validated the commercial purchase on 2026-10-05T14:22:00Z.",
      "SAP QM inspection lot 100004523 is still in status 'In Quality Inspection'."
    ],
    "whyRecommended": "The invoice is commercially validated by the business owner and vendor details match perfectly, but automated financial posting is prohibited because 10 units have not yet received goods receipt confirmation in SAP Material Management, and inspection lot 100004523 is pending final usage decision.",
    "suggestedAction": "Contact Warehouse Plant 1010 receiving team to verify if the remaining 10 units were received at gate, or post invoice with payment block 'R' (Invoice Verification) pending Goods Receipt."
  }
}
```

---

## 5. Standard Scenario Matrix

The engine is calibrated across 8 core enterprise test scenarios:

| Scenario | PO | GR | Invoice | Condition | Expected AI Decision | Target Confidence |
|---|---|---|---|---|---|---|
| **Scenario 1: Perfect Match** | 100 EA @ ₹500 | 100 EA @ ₹500 | 100 EA @ ₹500 | All data identical, BO accepted, QM passed | `AUTO-PROCEED` | $\ge 96\%$ |
| **Scenario 2: Quantity Mismatch** | 100 EA @ ₹1,200 | 90 EA @ ₹1,200 | 100 EA @ ₹1,200 | Invoice exceeds GR by 10 EA | `MANUAL_REVIEW` / `HOLD` | $86\%$ |
| **Scenario 3: No PO Identified** | N/A | N/A | Telecom monthly bill | No PO in invoice or ERP | `NON_PO_PROCESS` | $92\%$ |
| **Scenario 4: Vendor Mismatch** | PO to Siemens | GR Siemens | Invoice from Apex Infra | LIFNR mismatch between PO and IR | `HOLD` | $98\%$ (Definite block) |
| **Scenario 5: Price Variance** | 10 EA @ ₹10,000 | 10 EA | 10 EA @ ₹11,500 | 15% price spike exceeds Tolerance PP | `MANUAL_REVIEW` | $78\%$ |
| **Scenario 6: Quality Rejection** | 100 Filters | Rec: 95, Rej: 5 | 100 Filters billed | 5 EA rejected in QM inspection lot | `HOLD` | $91\%$ |
| **Scenario 7: Duplicate Invoice** | 4500012900 | 50 EA | Inv # 98212 repeated | Same invoice number & vendor billed twice | `HOLD` / `REJECT` | $99\%$ |
| **Scenario 8: E-Invoice SLA** | 4500013000 | 200 EA | E-Invoice with IRN | Awaiting BO validation; 4h remaining | `BUSINESS_VALIDATION_REQUIRED` | $90\%$ |
