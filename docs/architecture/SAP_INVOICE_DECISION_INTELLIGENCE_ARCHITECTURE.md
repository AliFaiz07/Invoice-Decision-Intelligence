# SAP Invoice Decision Intelligence — Architecture Design Document
**Document ID:** ARCH-S4H-BTP-INV-001  
**Target Platform:** SAP Business Technology Platform (SAP BTP) & SAP S/4HANA (Cloud / On-Premise)  
**Status:** Approved for Implementation  
**Version:** 1.0.0  

---

## 1. Executive Summary & Architectural Vision

In global enterprise deployments, Accounts Payable (AP) and Procurement departments grapple with multi-channel invoice intake across:
1. **Physical/Scanned Office Invoices** (paper deliveries, gate receipts, courier invoices).
2. **Email Invoices** (PDF attachments, recurring digital services, cloud SaaS, utilities).
3. **E-Invoicing / Government Gateways** (e.g., GST E-Invoice / IRN in India, Factura Electrónica in LATAM, Peppol in EMEA).

Traditional optical character recognition (OCR) tools merely extract strings into key-value pairs without business context. Conversely, SAP S/4HANA Logistics Invoice Verification (LIV, transaction MIRO/MR8M) expects clean, pre-validated data, causing AP teams to spend thousands of hours reconciling quantities, checking goods receipts, resolving price variances, chasing business owners for non-PO cost approvals, and preventing duplicate disbursements.

**SAP Invoice Decision Intelligence** is an enterprise-grade intelligence and orchestration layer residing on **SAP Business Technology Platform (BTP)**. It acts as the intelligent cognitive buffer between multi-channel invoice ingestion and the SAP S/4HANA core. It performs:
- Multi-channel intake normalization into canonical SAP invoice models.
- Deep cross-referencing with SAP S/4HANA Business Partner, Purchase Order (PO), and Goods Receipt (GR/Material Document) data.
- Automated Three-Way Matching (PO vs. GR vs. IR) with tolerance checking.
- Business Owner identification and workflow orchestration for business expense validation.
- Explainable AI-driven decision synthesis (Auto-Proceed, Business Validation Required, Manual Review, Hold, Reject, Non-PO Route).
- Direct preparation and simulated posting via standard SAP S/4HANA APIs (`API_SUPPLIERINVOICE_PROCESS_SRV`).

```
+---------------------------------------------------------------------------------------------------------+
|                                        INVOICE INTAKE CHANNELS                                          |
|  [Channel 1: Physical / Scan]      [Channel 2: Email Invoice]      [Channel 3: E-Invoice / Gov Portal]  |
+-------------------------------------------------+-------------------------------------------------------+
                                                  |
                                                  v
+---------------------------------------------------------------------------------------------------------+
|                               SAP BTP INVOICE DECISION INTELLIGENCE                                     |
|                                                                                                         |
|  +---------------------------+  +-------------------------------+  +---------------------------------+  |
|  |   Ingestion & Extraction  |  |   Cross-Validation Engine     |  |      AI Decision Engine         |  |
|  | - DOX / OCR Normalizer    |  | - BP / Supplier Verification  |  | - 3-Way Matching Evaluator      |  |
|  | - Canonical Invoice Model |  | - PO Line Item Alignment      |  | - Quality / Inspection Gate     |  |
|  | - Source Audit Stamping   |  | - GR Quantity & Price Check   |  | - Duplicate & Fraud Detection   |  |
|  +---------------------------+  +-------------------------------+  +---------------------------------+  |
|                                                                                                         |
|  +---------------------------+  +-------------------------------+  +---------------------------------+  |
|  | Business Owner Validation |  |    SLA & Compliance Monitor   |  |     Integration Monitor         |  |
|  | - Cost Center / PO Owner  |  | - E-Invoice 48h SLA Countdown |  | - Inbound/Outbound Message Log  |  |
|  | - Fiori Approval Panel    |  | - DRC Escalation Triggers     |  | - Payload Tracing & Retries     |  |
|  +---------------------------+  +-------------------------------+  +---------------------------------+  |
+-------------------------------------------------+-------------------------------------------------------+
                                                  |
                                                  v
+---------------------------------------------------------------------------------------------------------+
|                                 SAP S/4HANA ENTERPRISE CORE SYSTEM                                      |
|  - API_BUSINESS_PARTNER                  - API_PURCHASEORDER_PROCESS_SRV                               |
|  - API_MATERIAL_DOCUMENT_SRV             - API_SUPPLIERINVOICE_PROCESS_SRV (MIRO / Park / Post)         |
+---------------------------------------------------------------------------------------------------------+
```

---

## 2. Core Architectural Decisions

### Decision 1: Architecture Placement on SAP BTP (Side-by-Side Extensibility)
- **Why this approach?**  
  Adheres to the SAP Clean Core strategy. Custom machine learning models, multi-channel intake listeners, and complex heuristics must not pollute the S/4HANA ABAP core. Placing this layer on SAP BTP enables horizontal scalability, independent release cycles, and integration across heterogeneous source channels without modifying standard SAP tables.
- **SAP Reference / Concept:**  
  SAP BTP Side-by-Side Extensibility; SAP Clean Core Architecture Guide; SAP Integration Suite.
- **Demo Implementation:**  
  Decoupled Node.js/TypeScript enterprise backend with SAP Fiori Horizon UI, maintaining clean service boundaries and stateless REST/OData-compliant endpoints.
- **Production Replacement Path:**  
  Deployable directly to SAP BTP Cloud Foundry runtime or Kyma (Kubernetes) runtime, backed by SAP HANA Cloud and integrated via SAP BTP Destination Service and Cloud Connector.

### Decision 2: Canonical SAP Data Abstraction & Standard OData APIs
- **Why this approach?**  
  Avoiding vendor lock-in or proprietary data schemas. All internal domain models mirror standard SAP S/4HANA procurement and financial structures (`LFA1`/`BUT000` Business Partner, `EKKO`/`EKPO` Purchase Orders, `MSEG`/`MATDOC` Goods Receipts, `RBKP`/`RSEG` Supplier Invoices).
- **SAP Reference / Concept:**  
  SAP S/4HANA Cloud Public APIs:
  - `API_BUSINESS_PARTNER`
  - `API_PURCHASEORDER_PROCESS_SRV`
  - `API_MATERIAL_DOCUMENT_SRV`
  - `API_SUPPLIERINVOICE_PROCESS_SRV`
- **Demo Implementation:**  
  Domain models defined in TypeScript with strict SAP field naming and typed interfaces. High-fidelity mock adapters simulate S/4HANA OData payloads with full relational integrity.
- **Production Replacement Path:**  
  Replace mock adapter implementations with SAP Cloud SDK (`@sap-cloud-sdk/http-client` and `@sap-cloud-sdk/connectivity`) pointing to SAP S/4HANA Cloud or On-Premise via SAP BTP Destination.

### Decision 3: Event-Driven Multi-Channel Ingestion & Normalization
- **Why this approach?**  
  Invoices arrive asynchronously from disparate sources: scanned PDFs via sFTP/upload, emails via Microsoft Graph/IMAP, and e-invoices via government GST/DRC webhooks. An ingestion pipeline normalizes these payloads into a uniform `CanonicalInvoice` envelope before running validation.
- **SAP Reference / Concept:**  
  SAP Document Information Extraction (DOX); SAP Integration Suite (Cloud Integration iFlows); SAP Event Mesh / Advanced Event Mesh.
- **Demo Implementation:**  
  Channel-specific mock adapters for Physical/Office upload, Email ingestion (with sender metadata & headers), and Government E-Invoice (IRN, GSTIN, digital signature token).
- **Production Replacement Path:**  
  SAP Integration Suite iFlows subscribing to SAP Event Mesh topics and calling SAP AI Core Document Information Extraction service.

### Decision 4: Deterministic Heuristic Engine + Explainable AI (XAI)
- **Why this approach?**  
  In enterprise finance, black-box AI is unacceptable to auditors and CFOs. A neural network outputting "Approved (95%)" does not satisfy Sarbanes-Oxley (SOX) or internal financial controls. Every decision must be decomposed into explicit, verifiable signals (Line-item quantity delta, Unit price variance against PO condition records, GR posting status, Vendor GSTIN verification, duplicate hash match) accompanied by human-readable explanations and actionable recommendations.
- **SAP Reference / Concept:**  
  SAP S/4HANA Logistics Invoice Verification (LIV) Tolerance Keys (`PP`, `BD`, `DQ`, `DW`); SAP Financial Compliance Management.
- **Demo Implementation:**  
  Rule-weighted decision matrix synthesizing hard signals (Boolean checks) and soft signals (variance tolerances, duplicate anomaly scores) to calculate an Explainable Confidence Score, Primary Decision, Diagnostic Reasons, and Prescribed Next Action.
- **Production Replacement Path:**  
  Augment heuristic rules with SAP AI Core / Foundation Models for unstructured dispute notes, supplier email intent analysis, and anomaly pattern recognition over historical SAP invoice clearing data.

---

## 3. High-Level Component Architecture

```
+---------------------------------------------------------------------------------------------------+
|                                     SAP Fiori Presentation Layer                                  |
|   - Shell & Navigation Bar (Horizon Theme, SAP Fiori Launchpad style)                            |
|   - Invoice Decision Center (Hero view: Side-by-Side SAP Context, Signals, Explainable AI)        |
|   - Invoice Inbox (Multi-channel filter, Status badges, Processing states)                        |
|   - PO & 3-Way Reconciliation View (PO vs GR vs Invoice drill-down)                              |
|   - Business Owner Validation Portal (Actionable Accept/Reject/Send Back dialogs with reasons)    |
|   - SLA Compliance Monitor (48-hour GST e-invoice countdown & escalation timers)                  |
|   - Integration Monitor (Message monitoring, payload inspector, replay capabilities)              |
|   - Audit Trail (Immutable log of user, system, and AI events with state diffs)                   |
+---------------------------------------------------------------------------------------------------+
                                                  ^
                                                  | REST / JSON (OData-compatible)
                                                  v
+---------------------------------------------------------------------------------------------------+
|                                Application Services Layer (Node.js/TS)                            |
|  +------------------------+  +------------------------+  +-------------------------------------+  |
|  | InvoiceIngestionSvc    |  | MatchingEngine         |  | DecisionEngine                      |  |
|  | - Physical Scan Parser |  | - Supplier Match       |  | - Hard Constraint Evaluator         |  |
|  | - Email Metadata Extr. |  | - PO Item Alignment    |  | - Variance & Tolerance Check        |  |
|  | - E-Invoice DRC Parser |  | - 3-Way GR Reconciler  |  | - Explainability Generator          |  |
|  +------------------------+  +------------------------+  +-------------------------------------+  |
|  +------------------------+  +------------------------+  +-------------------------------------+  |
|  | BusinessValidationSvc  |  | SlaComplianceSvc       |  | AuditTrailSvc                       |  |
|  | - PO Owner Resolver    |  | - Countdown Engine     |  | - Action Logging                    |  |
|  | - Cost Center Approver |  | - Breach Alerts        |  | - State Delta Recording             |  |
|  +------------------------+  +------------------------+  +-------------------------------------+  |
+---------------------------------------------------------------------------------------------------+
                                                  ^
                                                  | Adapter Interface
                                                  v
+---------------------------------------------------------------------------------------------------+
|                                  SAP Integration & Adapter Layer                                  |
|  +---------------------------------------------------------------------------------------------+  |
|  | ISAPAdapter (Common Contract)                                                               |  |
|  |  - getBusinessPartner(id), getPurchaseOrder(poNumber), getGoodsReceipts(poNumber)          |  |
|  |  - postSupplierInvoice(payload), parkSupplierInvoice(payload)                               |  |
|  +---------------------------------------------------------------------------------------------+  |
|          |                                                             |                          |
|          v [Demo Mode = ON]                                            v [Demo Mode = OFF]        |
|  +--------------------------------------+     +------------------------------------------------+  |
|  | MockSAPAdapter                       |     | S4HanaCloudAdapter                             |  |
|  | - In-memory relational SAP database  |     | - SAP Cloud SDK                                |  |
|  | - Realistic Tata, Siemens, Infosys,  |     | - Destination: S4HANA_CLOUD_API                |  |
|  |   Schneider Electric enterprise data |     | - OAuth2SAMLBearerAssertion / ClientCreds      |  |
|  +--------------------------------------+     +------------------------------------------------+  |
+---------------------------------------------------------------------------------------------------+
```

---

## 4. Security & Compliance Architecture

1. **Role-Based Access Control (RBAC):**
   - `AP_CLERK`: Invoice intake, review exceptions, manual matching adjustment.
   - `BUSINESS_OWNER`: Access restricted to invoices where user is either the PO Owner (`EKKO-ERNAM`) or Cost Center Approver (`CSKS-VERAK`). Can Accept, Reject, or Request Clarification.
   - `PROCUREMENT_MANAGER`: Overrides on PO variances exceeding standard LIV tolerance bands.
   - `FINANCE_CONTROLLER`: Final posting approval, hold releases, payment schedule verification.
   - `SYSTEM_AUDITOR`: Read-only access to Audit Trail, Integration Monitor, and AI Decision explanations.

2. **Compliance & Audit Logging:**
   - Strict tracking of all invoice transitions conforming to German GoBD, SOX Section 404, and Indian GST DRC specifications.
   - Every status alteration records: `Timestamp`, `ActorID`, `Role`, `Action`, `PreviousState`, `NewState`, `Justification`, and `AIConfidenceSnapshot`.

3. **Data Protection:**
   - Zero hardcoded credentials; environment-driven configuration via `.env` / SAP BTP VCAP_SERVICES.
   - Sensitive vendor bank details and GSTINs sanitized in client-side telemetry logs.

---

## 5. Technology Stack Selection

| Component | Selected Technology | Rationale & Enterprise Fit |
|---|---|---|
| **Backend Runtime** | Node.js (v24 LTS) with Express & TypeScript | Native fit for SAP BTP Cloud Foundry / Kyma; rapid I/O for API orchestration; aligns with SAP Cloud Application Programming (CAP) Node.js ecosystem. |
| **Frontend UI** | SAP Fiori Horizon UX (HTML5 / Modern Fiori Web Shell & UI5 CSS) | Conforms to official SAP Fiori Design Guidelines (Morning Horizon / Evening Horizon theme); provides high-density enterprise tables, object pages, and semantic status chips. |
| **API Architecture** | RESTful OData-compatible JSON APIs | Follows SAP S/4HANA OData V2/V4 service conventions for easy migration to standard CDS services. |
| **Validation Engine** | TypeScript Rule-Graph with Deterministic Heuristics | Guaranteed reproducible decisions; full explainability without non-deterministic hallucinations; sub-millisecond execution. |
| **Data Layer** | Relational In-Memory Store with Seed Data | Pre-populated with 8 end-to-end enterprise scenarios representing realistic Indian/Global vendors, POs, GRs, quality flags, and SLAs. |
| **Testing** | Node.js Test Runner / Mocha-compatible unit & scenario tests | Comprehensive automated validation of 3-way matching, tolerance keys, duplicate detection, and SLA breach logic. |

---

## 6. Production Transition Roadmap

To transition this prototype into production on SAP BTP:
1. **Connectivity:** Bind backend to SAP BTP Destination Service; configure Cloud Connector for On-Premise S/4HANA or direct mTLS for S/4HANA Cloud Public Edition.
2. **AI Document Extraction:** Replace local intake parsers with REST calls to SAP AI Core Document Information Extraction (DOX) service with OCR pre-trained on invoice templates.
3. **Integration Flows:** Offload multi-channel webhook listening and SFTP polling to SAP Integration Suite (Cloud Integration iFlows).
4. **Approval Task Orchestration:** Forward business owner validation events into SAP Build Process Automation (SBPA) My Inbox (`sap.ushell.services.CrossApplicationNavigation`).
5. **Persistence:** Migrate in-memory mock repository to SAP HANA Cloud via SAP CAP (`@sap/cds`).
