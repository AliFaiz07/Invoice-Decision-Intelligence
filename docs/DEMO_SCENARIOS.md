# SAP Invoice Decision Intelligence — Enterprise Scenario Catalog

**Document Purpose:** Detailed Scenario Ledger & Use-Case Mapping  
**Project:** SAP Invoice Decision Intelligence  
**Target Environment:** SAP S/4HANA & SAP BTP Reference Architecture  

---

## Complete Scenario Matrix

| # | Scenario Name | Channel | Invoice ID | Supplier | Amount | PO Number | Condition & Variance | Engine Recommendation | Risk Tier |
|---|---|---|---|---|---|---|---|---|---|
| **1** | **Standard Happy Path** | Physical Scan | `INV-2026-00001` | Schneider Electric | ₹59,000 | `4500012456` | 100% Exact 3-Way Match; Requisitioner pre-approved | `AUTO_PROCEED` (95%) | LOW |
| **2** | **Quantity Shortfall** | Physical Scan | `INV-2026-00002` | Siemens India | ₹1,41,600 | `4500012500` | Invoiced 100 EA vs 90 EA Received (Over-delivery) | `MANUAL_REVIEW` (60%) | MEDIUM |
| **3** | **Non-PO Expense Route** | Email Inbound | `INV-2026-00003` | Bharti Airtel | ₹88,500 | *Non-PO* | Recurring Telecom Bill; Cost Center `CC-1020-IT` | `NON_PO_PROCESS` (92%) | LOW |
| **4** | **Vendor Hijack / Mismatch**| Email Inbound | `INV-2026-00004` | Apex Facility | ₹1,00,300 | `4500012600` | PO issued to Siemens, but billed by Apex Facility | `HOLD` (98%) | CRITICAL |
| **5** | **Price Tolerance Breach**| Email Inbound | `INV-2026-00005` | TCS | ₹1,35,700 | `4500012750` | Invoiced ₹1,150/hr vs PO ₹1,000/hr (+15% variance) | `MANUAL_REVIEW` (65%) | MEDIUM |
| **6** | **Quality Defect Block** | Physical Scan | `INV-2026-00006` | Wipro Enterprises | ₹2,95,000 | `4500012800` | 5 HEPA Filters rejected in SAP QM Inspection Lot | `HOLD` (94%) | HIGH |
| **7** | **Duplicate Bill Detection**| Email Inbound | `INV-2026-00007` | AWS India | ₹4,01,200 | `4500012850` | Duplicate Invoice Number against posted `BELNR` | `HOLD` (99%) | CRITICAL |
| **8** | **Statutory 48h SLA** | E-Invoice (IRP) | `INV-2026-00008` | Schneider Electric | ₹9,97,100 | `4500012900` | 64-char IRN hash; 48-Hour SLA countdown active | `BUSINESS_VALIDATION_REQUIRED` | MEDIUM |
| **9** | **GST Tax Credit Mismatch** | Email Inbound | `INV-2026-00009` | Infosys Limited | ₹5,31,000 | `4500012920` | Billed ₹4.5L internally vs ₹3.8L in GSTR-2B | `MANUAL_REVIEW` (70%) | HIGH |
| **10**| **Requisitioner Dispute** | Physical Scan | `INV-2026-00010` | Apex Facility | ₹1,47,500 | `4500012950` | Business Owner formally rejected service delivery | `REJECT` (97%) | HIGH |

---

## Detailed Scenario Profiles

### Scenario 1: Standard Happy Path (Schneider Electric)
- **Invoice ID:** `INV-2026-00001`
- **Intake Gateway:** Physical Scan (Plant 1010 Security Gate 2 Scanner, Operator `OP-4491`)
- **Supplier:** Schneider Electric India Pvt Ltd (`10002450`)
- **PO Reference:** `4500012456`
- **Material:** `MAT-ELEC-01` — Industrial Miniature Circuit Breakers (MCB 32A)
- **Reconciliation:**
  - PO Ordered: 100 EA @ ₹500
  - Goods Receipt `5000018901`: 100 EA received
  - Quality Lot `100004510`: 100 EA accepted (0 rejected)
  - Invoice: 100 EA @ ₹500 + 18% GST = ₹59,000
- **Best Used For:** Baseline walkthrough demonstrating flawless automated 3-way matching and immediate `MIRO` posting.

---

### Scenario 2: Quantity Shortfall / Over-Delivery (Siemens India)
- **Invoice ID:** `INV-2026-00002`
- **Intake Gateway:** Physical Scan (Plant Receiving Office)
- **Supplier:** Siemens India Ltd (`10003120`)
- **PO Reference:** `4500012500`
- **Material:** `MAT-SIEM-CTRL` — PLC Digital Input Module 24V DC
- **Discrepancy:**
  - PO Ordered: 100 EA @ ₹1,200
  - Goods Receipt `5000018915`: Only 90 EA received at plant warehouse
  - Invoice: Billed for full 100 EA (₹1,41,600 gross)
- **LIV Rule:** SAP Tolerance Key **DQ** breached.
- **Best Used For:** Manufacturing & Supply Chain audiences worried about paying for undelivered warehouse materials.

---

### Scenario 3: Non-PO Accounting Workflow (Bharti Airtel)
- **Invoice ID:** `INV-2026-00003`
- **Intake Gateway:** Email Inbound (`corporate.ebilling@airtel.in`)
- **Supplier:** Bharti Airtel Enterprise Services (`10004580`)
- **PO Reference:** *None (Non-PO)*
- **Description:** Monthly Dedicated 1 Gbps Internet Leased Line — HQ Bangalore (₹88,500 gross)
- **Routing:** Automatically routes to Cost Center `CC-1020-IT`, G/L Account `65001000`, Approver: Rohan Joshi (`RJOSHI`).
- **Best Used For:** IT & Indirect Procurement discussions on recurring utility bills that bypass traditional PO creation.

---

### Scenario 4: Vendor Master Mismatch / Hijack (Apex vs. Siemens)
- **Invoice ID:** `INV-2026-00004`
- **Intake Gateway:** Email Inbound (`invoices@apex-facility.com`)
- **Supplier on Invoice:** Apex Facility Management Services (`10009999`)
- **PO Reference:** `4500012600` (Issued officially in SAP to **Siemens India Ltd**)
- **Risk / Discrepancy:** Supplier tax ID and vendor entity do not match the SAP PO contract.
- **Engine Action:** Halts processing immediately with **CRITICAL RISK** (`HOLD`).
- **Best Used For:** Internal Audit, CFOs, and Risk Officers concerned about fraudulent invoice routing or supplier redirection scams.

---

### Scenario 5: Price Tolerance Key PP Breach (TCS Consulting)
- **Invoice ID:** `INV-2026-00005`
- **Intake Gateway:** Email Inbound (`billing.support@tcs.com`)
- **Supplier:** Tata Consultancy Services Ltd (`10001050`)
- **PO Reference:** `4500012750` (Service Entry Sheet for 100 Hours)
- **Discrepancy:**
  - PO Net Unit Price: ₹1,000 / Hour
  - Invoiced Net Unit Price: ₹1,150 / Hour (+15.0% price increase)
  - Standard SAP LIV Tolerance Limit: 2.0%
- **LIV Rule:** SAP Tolerance Key **PP** exceeded by 13%.
- **Best Used For:** Professional Services, Sourcing Managers, and IT Procurement leaders reviewing rate-card variances.

---

### Scenario 6: Quality Inspection Rejection (Wipro Enterprises)
- **Invoice ID:** `INV-2026-00006`
- **Intake Gateway:** Physical Scan (Plant Warehouse Dock B)
- **Supplier:** Wipro Enterprises Ltd (`10002100`)
- **PO Reference:** `4500012800`
- **Material:** `MAT-FLTR-IND` — Industrial HEPA Air Intake Filters Class H13
- **Discrepancy:**
  - 95 units delivered to plant.
  - SAP QM Inspection Lot `100004580`: 90 accepted, **5 rejected** due to crushed gaskets during transit.
  - Invoiced: Billed for 100 units (₹2,95,000 gross).
- **LIV Rule:** Payment blocked until credit memo or replacement units are received.
- **Best Used For:** Quality Assurance (QA) Managers and Plant Directors.

---

### Scenario 7: Duplicate Invoice Disbursement Prevention (AWS)
- **Invoice ID:** `INV-2026-00007`
- **Intake Gateway:** Email Inbound (`aws-receivables@amazon.com`)
- **Supplier:** Amazon Web Services India Pvt Ltd (`10005500`)
- **Discrepancy:** Invoice number `AWS/2026/1090` already exists in SAP historical index (`RBKP/BSIP`) under posted document `BELNR 5105600101`.
- **Engine Action:** Flags **CRITICAL RISK** (`HOLD`), preventing a duplicate payment of ₹4,01,200.
- **Best Used For:** Treasury, Internal Controls, and Cash Flow protection demos.

---

### Scenario 8: Government E-Invoice 48-Hour SLA (Schneider Electric)
- **Invoice ID:** `INV-2026-00008`
- **Intake Gateway:** Government E-Invoice / IRP Gateway (GST DRC)
- **Supplier:** Schneider Electric India Pvt Ltd (`10002450`)
- **PO Reference:** `4500012900` — Smart Power Distribution Unit 415V (₹9,97,100 gross)
- **Features:** 64-char cryptographic IRN hash, 48-Hour SLA countdown timer.
- **Workflow:** 3-way match is 100% clean, but requires affirmative human sign-off from Business Owner Amit Verma before financial settlement.
- **Best Used For:** **PRIMARY DEMO STORY**. Demonstrates B2B e-invoicing, statutory SLA compliance, human-in-the-loop sign-off, and instant S/4HANA MIRO posting.

---

### Scenario 9: Indian GST GSTR-2B Input Tax Credit Mismatch (Infosys)
- **Invoice ID:** `INV-2026-00009`
- **Intake Gateway:** Email Inbound (`tax.billing@infosys.com`)
- **Supplier:** Infosys Limited (`10006200`)
- **Discrepancy:**
  - Internal Bill: Taxable ₹4,50,000 + Tax ₹81,000 = ₹5,31,000
  - Auto-drafted GSTR-2B: Taxable ₹3,80,000 + Tax ₹68,400
  - Blocked Input Tax Credit (ITC): ₹12,600 at risk under CGST Act Section 16(2)(aa).
- **Best Used For:** Corporate Tax Heads, Indian GST Compliance teams, and Shared Services leaders.

---

### Scenario 10: Requisitioner Dispute & Commercial Rejection (Apex)
- **Invoice ID:** `INV-2026-00010`
- **Intake Gateway:** Physical Scan (Plant Receiving Office)
- **Supplier:** Apex Facility Management Services (`10009999`)
- **PO Reference:** `4500012950` — Quarterly HVAC Duct Cleaning Pune Site (₹1,47,500)
- **Condition:** Business Owner Amit Verma formally rejected the invoice stating duct cleaning was substandard and incomplete.
- **Engine Action:** Status is set to **`REJECTED`**, permanently blocking any posting to SAP.
- **Best Used For:** Demonstrating human control and negative decision pathways where invoices must not be paid.
