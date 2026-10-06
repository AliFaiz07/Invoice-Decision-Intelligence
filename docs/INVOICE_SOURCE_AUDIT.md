# Invoice Source Audit & Mock Source Architecture

**Project:** `C:\projects\SAP Invoice Decision Intelligence`  
**Date of Audit:** October 6, 2026  
**Environment:** SAP BTP & S/4HANA Clean Core Simulation (Local Node.js / Express / TypeScript Runtime)

---

## 1. Executive Summary

### What Currently Exists
1. **Canonical Invoice Data Model (`src/models/types.ts`)**:
   A well-structured TypeScript interface `CanonicalSupplierInvoice` with normalized financial amounts, line items, status tracking, and a polymorphic `channelMetadata` container.
2. **Central In-Memory Repository (`src/services/InvoiceRepository.ts`)**:
   A repository coordinator that clones an in-memory array (`MOCK_INVOICES`) into an active `Map<string, CanonicalSupplierInvoice>`.
3. **Three Intake Ingestion Adapters (`src/integrations/intake/`)**:
   - `PhysicalScanAdapter.ts`: Normalizes scan DPI, scanner location, operator ID, and OCR line items into canonical invoices.
   - `EmailIntakeAdapter.ts`: Normalizes sender email, subject, message ID, SPF/DKIM flags, and attachment hashes into canonical invoices.
   - `EInvoiceGovAdapter.ts`: Normalizes 64-character statutory IRN, acknowledgment number, and GST tax splits into canonical invoices.
4. **Relational Enterprise Mock Data (`src/data/mockEnterpriseData.ts`)**:
   Contains 10 predefined end-to-end enterprise scenarios (Scenarios A through J) covering perfect match, quantity mismatch, amount variance, missing PO, vendor mismatch, quality defect, duplicate invoice, GST tax discrepancy, SLA countdown, and business owner rejection.
5. **REST API Endpoints (`src/app/routes.ts`)**:
   Exposes `/api/invoices`, `/api/invoices/:id`, `/api/invoices/intake/physical`, `/api/invoices/intake/email`, and `/api/invoices/intake/einvoice`.

### What Does NOT Exist
1. **Persistent On-Disk Source Files**:
   There are no persistent JSON, SQLite, or database files storing individual invoice records. All data is compiled into JavaScript code from a static 1,320-line TypeScript file (`src/data/mockEnterpriseData.ts`).
2. **Channel-Specific Source File Segregation**:
   Invoices are not segregated into separate channel source folders (`physical/`, `email/`, `einvoice/`). Instead, all 10 invoices are bundled together in a single in-memory array.
3. **Real External Service Connections**:
   No active connections exist to external mail servers (Gmail, Outlook), government portals (IRP, NIC, GSTN), or live SAP S/4HANA instances.
4. **Dynamic Inbound Portals View**:
   The Inbound Portals view (`viewMockPortals`) in the UI was displaying hardcoded single-card snippets rather than dynamically querying and listing all source records for the selected channel.

### What is Hardcoded
- `src/public/js/app.js` (`renderMockPortals()`): The portal views for Physical, Email, and E-Invoice contained hardcoded card markup referencing fixed static invoices (`INV-2026-00001`, `INV-2026-00005`, `INV-2026-00008`).
- `src/data/mockEnterpriseData.ts`: 10 invoice records, 8 vendors, 9 purchase orders, 8 goods receipts, 3 inspection lots, and 10 GSTR-2B records are hardcoded in TypeScript arrays.

### What is Mock Data
- All SAP Business Partners (Vendors `10002450` through `10009999`)
- All SAP Purchase Orders (PO numbers `4500012456` through `4500012950`)
- All SAP Goods Receipts (Material document numbers `5000012456` through `5000012950`)
- All SAP Quality Management Inspection Lots (`100004520` through `100004522`)
- All Statutory GST GSTR-2B Records and summary credits

### What is Actually Integrated
- **Internal Express REST APIs**: Real HTTP communication between frontend SPA (`src/public/js/app.js`) and backend API router (`src/app/routes.ts`).
- **Internal Service Bus**: Synchronous interaction between `InvoiceRepository`, `ThreeWayReconciliationService`, `POMatchingService`, `AIDecisionEngine`, `GSTReconciliationService`, and `SAPPostingService`.
- **External Third Parties**: Zero live external integrations (all external endpoints are stubbed or simulated).

---

## 2. Physical Invoice Source

### Exact Location and Implementation
- **Source Definition**: `src/data/mockEnterpriseData.ts` (inside `MOCK_INVOICES` array)
- **Ingestion Adapter**: `src/integrations/intake/PhysicalScanAdapter.ts`
- **Intake API**: `POST /api/invoices/intake/physical`
- **Current Data Type**: Hardcoded TypeScript object array (`sourceChannel: 'PHYSICAL_SCAN'`)
- **Number of Invoice Records**: **4 records**
  1. `INV-2026-00001` (Vendor: Schneider Electric India Pvt Ltd, PO: `4500012456`, Gross: ₹59,000, Status: `BUSINESS_VALIDATED`)
  2. `INV-2026-00002` (Vendor: Siemens India Ltd, PO: `4500012500`, Gross: ₹1,41,600, Status: `EXCEPTION_RAISED` - Quantity Over-delivery)
  3. `INV-2026-00006` (Vendor: Wipro Enterprises Ltd, PO: `4500012800`, Gross: ₹2,95,000, Status: `ON_HOLD` - QM Inspection Defect)
  4. `INV-2026-00010` (Vendor: Apex Facility Management Services, PO: `4500012950`, Gross: ₹1,47,500, Status: `REJECTED` - Business Owner Dispute)

### How the UI Currently Gets Physical Records
1. In the **Invoice Inbox** (`viewInbox`): The UI calls `GET /api/invoices`, filters the array by `sourceChannel === 'PHYSICAL_SCAN'`, and renders the matching rows.
2. In the **Inbound Portals View** (`viewMockPortals` -> `Physical / Gate Scanner Intake`): The UI injected a hardcoded template for `invoice_SEI_0111.pdf` with a static button to open `INV-2026-00001`.

### Attributes
- **Is it persistent?**: NO (in-memory Map only; restarts reset to initial array).
- **Is it hardcoded?**: YES (compiled in TypeScript).
- **Can user select an invoice and load complete details?**: YES (via `app.selectAndOpenDecision(id)`).

---

## 3. Email Invoice Source

### Exact Location and Implementation
- **Source Definition**: `src/data/mockEnterpriseData.ts` (inside `MOCK_INVOICES` array)
- **Ingestion Adapter**: `src/integrations/intake/EmailIntakeAdapter.ts`
- **Intake API**: `POST /api/invoices/intake/email`
- **Current Data Type**: Hardcoded TypeScript object array (`sourceChannel: 'EMAIL_INBOUND'`)
- **Number of Invoice Records**: **5 records**
  1. `INV-2026-00003` (Vendor: Bharti Airtel Enterprise Services, No PO, Gross: ₹88,500, Status: `NON_PO_ROUTED`)
  2. `INV-2026-00004` (Vendor: Apex Facility Management Services, PO: `4500012600`, Gross: ₹1,00,300, Status: `ON_HOLD` - Vendor Mismatch)
  3. `INV-2026-00005` (Vendor: Tata Consultancy Services Ltd, PO: `4500012750`, Gross: ₹1,35,700, Status: `EXCEPTION_RAISED` - Price Variance +15%)
  4. `INV-2026-00007` (Vendor: Amazon Web Services India Pvt Ltd, PO: `4500012850`, Gross: ₹4,01,200, Status: `ON_HOLD` - Duplicate Invoice)
  5. `INV-2026-00009` (Vendor: Infosys Limited, PO: `4500012920`, Gross: ₹5,31,000, Status: `EXCEPTION_RAISED` - GST ITC Discrepancy)

### How the UI Currently Gets Email Records
1. In the **Invoice Inbox** (`viewInbox`): Client filters `this.invoices` by `sourceChannel === 'EMAIL_INBOUND'`.
2. In the **Inbound Portals View** (`viewMockPortals` -> `Vendor Invoice AP Mailbox`): Injected a hardcoded snippet for `billing.support@tcs.com` with a button to open `INV-2026-00005`.

### Attributes
- **Is it persistent?**: NO.
- **Is it hardcoded?**: YES.
- **Can user select an invoice and load complete details?**: YES.

---

## 4. E-Invoice Source

### Exact Location and Implementation
- **Source Definition**: `src/data/mockEnterpriseData.ts` (inside `MOCK_INVOICES` array)
- **Ingestion Adapter**: `src/integrations/intake/EInvoiceGovAdapter.ts`
- **Intake API**: `POST /api/invoices/intake/einvoice`
- **Current Data Type**: Hardcoded TypeScript object array (`sourceChannel: 'GOVERNMENT_EINVOICE'`)
- **Number of Invoice Records**: **1 record**
  1. `INV-2026-00008` (Vendor: Schneider Electric India Pvt Ltd, PO: `4500012900`, Gross: ₹9,97,100, IRN: `4f28d8b4e78a6327e4369f8c6501237a6b83f0d2c94178523091abcef5410982`, Status: `PENDING_BUSINESS_VALIDATION` - 48h Statutory SLA Active)

### How the UI Currently Gets E-Invoice Records
1. In the **Invoice Inbox** (`viewInbox`): Client filters `this.invoices` by `sourceChannel === 'GOVERNMENT_EINVOICE'`.
2. In the **Inbound Portals View** (`viewMockPortals` -> `Government E-Invoice / IRP Source`): Injected a hardcoded snippet for IRN `4f28d8b4...` with a button to open `INV-2026-00008`.

### Attributes
- **Is it persistent?**: NO.
- **Is it hardcoded?**: YES.
- **Can user select an invoice and load complete details?**: YES.

---

## 5. Current Data Flow (What the Code Actually Does)

```
[Hardcoded In-Memory TypeScript File]
  src/data/mockEnterpriseData.ts
      │
      ▼
[Server Startup Initialization]
  new InvoiceRepository()
      │
      ├── Clones MOCK_INVOICES into private Map: this.invoices
      ├── Links MockSAPAdapter (in-memory BP, PO, GR, QM data)
      │
      ▼
[Express Server REST API]
  GET /api/invoices  ──▶  repository.getAllInvoices()
                                  │
                                  ├── Reconciles PO & GR (POMatchingService & ThreeWayReconciliationService)
                                  ├── Evaluates Decision (AIDecisionEngine)
                                  ├── Checks GST Status (GSTReconciliationService)
                                  └── Appends Business Owner & Audit Trail
                                  │
                                  ▼
[Browser Frontend SPA Client]
  GET /api/invoices  ──▶  app.js (this.invoices array)
      │
      ├── viewInbox: Filters this.invoices by dropdown (ALL, PHYSICAL_SCAN, EMAIL_INBOUND, GOVERNMENT_EINVOICE)
      ├── viewDecisionCenter: Renders this.invoices.find(id)
      │
      └── viewMockPortals (Inbound Portals):
              ├── Physical Tab: HARDCODED HTML STRING in app.js
              ├── Email Tab:    HARDCODED HTML STRING in app.js
              └── E-Invoice Tab: HARDCODED HTML STRING in app.js
```

---

## 6. Missing Components

1. **Persistent Storage Layer**:
   No file-based or SQLite persistence. Changes during runtime (validation approvals, rejections, postings) are lost on server restart.
2. **Channel-Segregated Source Directories**:
   No separate `mock-data/invoices/physical/`, `mock-data/invoices/email/`, `mock-data/invoices/einvoice/` source directories.
3. **Dynamic Portal Listing**:
   The Inbound Portals view does not dynamically render the collection of invoices belonging to the selected channel.
4. **Channel-Specific Backend Queries**:
   No dedicated query parameter or endpoint (`/api/invoices?channel=...`) exists to load invoices directly from a specific source channel.
5. **Persistent Mutation Writes**:
   When an invoice is approved, rejected, or posted to SAP, the changed state is never written back to disk.

---

## 7. Integration Status Audit

| System / Service | Status | Implementation Details |
|---|---|---|
| **Gmail API** | `NOT IMPLEMENTED` | No OAuth2 or IMAP connection. |
| **Microsoft Outlook / Graph API** | `NOT IMPLEMENTED` | No Azure AD or Graph API connection. |
| **Statutory IRP / NIC Portal** | `NOT IMPLEMENTED` | Simulated via `EInvoiceGovAdapter` with static 64-char IRN hash. |
| **GST Portal / GSTR-2B Statement** | `MOCKED` | Simulated via static `MOCK_GSTR2B_RECORDS` array in `mockEnterpriseData.ts`. |
| **SAP S/4HANA (Live OData)** | `MOCKED` | `MockSAPAdapter` simulates SAP entities; `S4HanaCloudAdapter` throws unreachable error in demo mode. |
| **SAP BTP AI Foundation** | `MOCKED` | Simulated via local rule-based `AIDecisionEngine.ts`. |
| **SAP Cloud Integration (CPI)** | `MOCKED` | Simulated via in-memory message ledger `IntegrationMonitorService.ts`. |

---

## 8. Target Mock Architecture Plan

To establish a persistent, single-source-of-truth architecture without breaking existing tests, we establish:

```
mock-data/
├── invoices/
│   ├── physical/
│   │   ├── INV-2026-00001.json
│   │   ├── INV-2026-00002.json
│   │   ├── INV-2026-00006.json
│   │   └── INV-2026-00010.json
│   ├── email/
│   │   ├── INV-2026-00003.json
│   │   ├── INV-2026-00004.json
│   │   ├── INV-2026-00005.json
│   │   ├── INV-2026-00007.json
│   │   └── INV-2026-00009.json
│   └── einvoice/
│       └── INV-2026-00008.json
├── vendors/
│   └── vendors.json
├── purchase-orders/
│   └── purchase-orders.json
├── goods-receipts/
│   └── goods-receipts.json
├── quality/
│   └── quality-lots.json
├── business-owners/
│   └── business-owners.json
└── gst/
    └── gstr2b-records.json
```

### Key Principles for Implementation:
1. **Persistent On-Disk Source Files**: Invoices are stored as individual JSON files in their respective channel directories.
2. **Channel Selection Loads Real Data**: When the user selects Physical Scan, Email Inbound, or E-Invoice, the portal view dynamically displays all real invoices for that channel directly from the source dataset.
3. **Single Source of Truth**: The same underlying record is shared between Inbound Portals, Invoice Inbox, Decision Center, Business Validation Cockpit, and Exceptions Queue.
4. **State Persistence**: When an invoice is validated or posted, the updated state is persisted to its JSON file on disk, surviving server restarts.
5. **Pluggable for Future SAP Connectivity**: The UI communicates strictly through the Invoice Service / Repository API, meaning live SAP or mailbox adapters can replace the mock file reader seamlessly.
