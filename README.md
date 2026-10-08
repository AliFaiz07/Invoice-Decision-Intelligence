# Invoice Decision Intelligence

> **Enterprise Invoice Decision Platform — Cognitive Validation, 3-Way Reconciliation & Explainable Decision Layer for SAP S/4HANA**

[![SAP BTP Clean Core](https://img.shields.io/badge/SAP%20BTP-Clean%20Core-0070F2?style=flat&logo=sap)](https://www.sap.com)
[![SAP S/4HANA Public Cloud](https://img.shields.io/badge/SAP%20S%2F4HANA-Cloud%202023-0854A0?style=flat&logo=sap)](https://api.sap.com)
[![UI: SAP Fiori Horizon](https://img.shields.io/badge/UX-SAP%20Fiori%20Horizon-107E3E?style=flat)](https://experience.sap.com/fiori-design-web/)
[![Tests: 46 Passed](https://img.shields.io/badge/Tests-46%20Passed-brightgreen.svg)]()

---

## 1. Executive Overview

**Invoice Decision Intelligence** is an enterprise-grade cognitive layer built for **SAP Business Technology Platform (SAP BTP)** that sits between multi-channel invoice intake and **SAP S/4HANA** Logistics Invoice Verification (LIV).

Rather than functioning as a generic OCR tool, the system provides **SAP Decision Intelligence**: it interprets the procurement context around each invoice, executes deterministic three-way matching against SAP Purchase Orders and Material Documents (Goods Receipts), evaluates SAP LIV tolerance keys (`DQ`, `PP`, `BD`), identifies and workflows Business Owner validations, detects anomalies (duplicate submissions, quality defects, vendor mismatches), and produces structured, audit-ready **Explainable AI (XAI)** decisions.

### Primary Channels
1. **Physical / Office Scan Inbound:** Paper invoices scanned at plant receiving docks and security gates.
2. **Email Inbound:** Inbound AP mailboxes capturing invoices, recurring services, cloud SaaS, and utilities.
3. **Government E-Invoicing / GST DRC Gateway:** Statutory electronic invoices carrying 64-character Invoice Reference Numbers (`IRN`) and subject to statutory 48-hour acceptance SLAs.

---

## 2. High-Level Architecture & Clean Core Alignment

```text
       INVOICE SOURCES
  +-------------------------+
  | 1. Physical Scan Upload |
  | 2. AP Email Listener    |
  | 3. Gov E-Invoice (IRN)  |
  +------------+------------+
               |
               v
  +-----------------------------------------------------------------------------------------------+
  |                        SAP BTP — INVOICE DECISION INTELLIGENCE LAYER                          |
  |                                                                                               |
  |  +---------------------------+  +-------------------------------+  +-----------------------+  |
  |  | Canonical Normalization   |  | Three-Way Matching (LIV)      |  | Explainable AI Engine |  |
  |  | - DOX / OCR Normalizer    |  | - Tolerance Keys: DQ, PP, BD  |  | - Hard Gatekeepers    |  |
  |  | - Channel Metadata Stamp  |  | - SAP QM Lot Reconciliation   |  | - 4-Part Rationale    |  |
  |  +---------------------------+  +-------------------------------+  +-----------------------+  |
  |                                                                                               |
  |  +---------------------------+  +-------------------------------+  +-----------------------+  |
  |  | Business Owner Validation |  | Statutory SLA Compliance      |  | Integration Monitor   |  |
  |  | - PO Requisitioner / CC   |  | - 48h GST DRC Countdown       |  | - Message Ledger      |  |
  |  | - Fiori Approval Actions  |  | - Escalation Alerts           |  | - Replay & Retries    |  |
  |  +---------------------------+  +-------------------------------+  +-----------------------+  |
  +----------------------------------------------+------------------------------------------------+
                                                 |
                                     ISAPAdapter Interface
                                                 |
                 +-------------------------------+-------------------------------+
                 |                                                               |
                 v [DEMO_MODE = true]                                            v [DEMO_MODE = false]
  +----------------------------------------------+  +--------------------------------------------+
  |              MockSAPAdapter                  |  |          S4HanaCloudSDKAdapter             |
  | - In-memory relational SAP database          |  | - SAP Cloud SDK (@sap-cloud-sdk/http-client)|
  | - Pre-seeded with 8 enterprise scenarios    |  | - Destination: S4HANA_2023_CLOUD           |
  | - Real-time state mutations & audit log      |  | - Official OData V2/V4 calls with CSRF     |
  +----------------------------------------------+  +--------------------------------------------+
                                                                                 |
                                                                                 v
                                                    +--------------------------------------------+
                                                    |            SAP S/4HANA SYSTEM              |
                                                    | - API_BUSINESS_PARTNER                     |
                                                    | - API_PURCHASEORDER_PROCESS_SRV            |
                                                    | - API_MATERIAL_DOCUMENT_SRV                |
                                                    | - API_SUPPLIERINVOICE_PROCESS_SRV          |
                                                    +--------------------------------------------+
```

---

## 3. The 8 Pre-Configured Enterprise Scenarios

The prototype is pre-seeded with 8 realistic enterprise test scenarios:

| # | Scenario | Channel | Supplier | PO / Condition | AI Recommendation | Confidence |
|---|---|---|---|---|---|---|
| **1** | **Perfect Match** | Physical Scan | Schneider Electric India (`10002450`) | PO `4500012456`: 100 EA @ ₹500 = GR 100 EA = Inv 100 EA. QM Passed. | `AUTO-PROCEED` | 100% |
| **2** | **Quantity Mismatch** | Physical Scan | Siemens India Ltd (`10003120`) | PO `4500012500`: Billed 100 EA, but GR is 90 EA (10 units unreceived). | `MANUAL_REVIEW` | 70% |
| **3** | **No PO Identified** | Email Inbound | Bharti Airtel Enterprise (`10004580`) | Monthly Leased Line Internet. Diverted to Cost Center `CC-1020-IT`. | `NON_PO_PROCESS` | 92% |
| **4** | **Vendor Mismatch** | Email Inbound | Apex Facility Management (`10009999`) | Billed against PO `4500012600` belonging to Siemens India. | `HOLD` | 98% (Critical) |
| **5** | **Price Variance** | Email Inbound | Tata Consultancy Services (`10001050`) | Invoiced unit price ₹1,150 vs PO ₹1,000 (+15% variance breaches Tolerance PP). | `MANUAL_REVIEW` | 65% |
| **6** | **Quality Defect** | Physical Scan | Wipro Enterprises Ltd (`10002100`) | 100 filters billed, 95 delivered, 5 rejected by Plant QA inspection lot. | `HOLD` | 94% |
| **7** | **Duplicate Invoice** | Email Inbound | Amazon Web Services (`10005500`) | Same invoice number `AWS/2026/1090` and ₹3,40,000 repeated. | `HOLD` | 99% (Critical) |
| **8** | **E-Invoice SLA** | Government E-Invoice | Schneider Electric India (`10002450`) | IRN webhook received; 48-hour statutory GST countdown active (4.5h remaining). | `BUSINESS_VALIDATION_REQUIRED` | 100% |

---

## 4. Decision Center (Hero Feature) & Explainable AI (XAI)

Every invoice evaluation produces an un-blackboxed, auditable 4-part explanation conforming to SOX 404 and IFRS governance:
1. **What did the system check?** (Exact SAP PO lines, Goods Receipts, QM inspection lots, duplicate indices, and tolerance keys).
2. **What did it find?** (Variance percentages, rejected units, vendor master comparison, requisitioner status).
3. **Why this recommendation?** (Explicit business rationale linking finding to financial and procurement policies).
4. **What should the user do next?** (Actionable guidance for AP Clerk, Purchasing Group, or Requisitioner).

---

## 5. UI/UX: SAP Fiori Morning Horizon

The frontend strictly implements SAP Fiori Morning Horizon design guidelines:
- **SAP Shell Bar:** Header with `SAP DEMO MODE = ON` indicator and user profile.
- **10 Core Navigation Views:**
  1. `Dashboard`: Enterprise KPI tiles, channel inflow metrics, and scenario launchpad.
  2. `Invoice Inbox`: High-density Fiori table with multi-channel and text search filters.
  3. `Decision Center`: Hero view featuring 3-column triage (Invoices, SAP 3-Way Context, Explainable AI Panel).
  4. `3-Way Reconciliation`: Detailed PO vs GR vs Invoice vs QM comparison with Tolerance Key tags (`DQ`, `PP`, `BD`).
  5. `Business Validation`: Requisitioner approval workbench with structured Accept/Reject/Clarification actions.
  6. `Exceptions & Holds`: Dedicated triage for price variances, quantity blocks, and duplicate warnings.
  7. `SLA Monitor`: Real-time countdowns tracking the 48-hour statutory GST e-invoicing window.
  8. `Audit Trail`: Chronological timeline recording all actor decisions, state deltas, and AI snapshots.
  9. `Integration Monitor`: SAP Integration Suite message monitoring with payload inspection and replay capabilities.
  10. `SAP Core Data`: Live inspector for simulated S/4HANA Business Partners, POs, and Material Documents.

---

## 6. Getting Started & Local Execution

### Prerequisites
- Node.js (v18+ or v24 LTS)
- npm

### Installation & Build
```bash
# 1. Install dependencies
npm install

# 2. Build TypeScript and copy static assets
npm run build

# 3. Run automated tests (46 test cases)
npm run test:ts

# 4. Start local enterprise server
npm start
```

### Accessing the Solution
Open your browser to:
```text
http://localhost:3000
```

---

## 7. Architecture Documentation

Detailed architectural and design specifications are located in `docs/`:
- [Architecture Design](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/architecture/SAP_INVOICE_DECISION_INTELLIGENCE_ARCHITECTURE.md)
- [Business Process Workflow](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/business-process/INVOICE_DECISION_WORKFLOW.md)
- [AI Decision Engine Design](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/ai-decision-engine/DECISION_ENGINE_DESIGN.md)
- [SAP Integration Suite Architecture](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/sap-integration/SAP_INTEGRATION_DESIGN.md)
- [API Specifications](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/api-contracts/API_SPECIFICATIONS.md)
