# SAP Invoice Decision Intelligence — SAP Integration Architecture Design
**Document ID:** INT-S4H-BTP-DES-004  
**Integration Domain:** SAP BTP Integration Suite & SAP S/4HANA Core  
**Standard SAP Alignment:** SAP S/4HANA Cloud Public APIs, SAP Event Mesh, SAP Document and Reporting Compliance (DRC)  
**Version:** 1.0.0  

---

## 1. Integration Landscape & Architecture

The integration design follows the **SAP Clean Core** paradigm, utilizing standard SAP BTP services and official S/4HANA OData/REST public APIs without custom Z-table overhead or core modifications.

```text
       INBOUND CHANNELS
  +-------------------------+
  | 1. Physical Scan Upload |
  | 2. AP Email Listener    |
  | 3. Gov E-Invoice (IRN)  |
  +------------+------------+
               |
               v
  +-----------------------------------------------------------------------------------------------+
  |                                   SAP INTEGRATION SUITE                                       |
  |                                                                                               |
  |   iFlow 1: Inbound_MultiChannel_Normalizer                                                    |
  |   - Authenticates payload (JWT / Mutual TLS)                                                  |
  |   - Validates JSON / XML Schema against Canonical Invoice XSD                                 |
  |   - Dispatches CloudEvent to SAP Event Mesh                                                   |
  +----------------------------------------------+------------------------------------------------+
                                                 |
                                                 v
  +-----------------------------------------------------------------------------------------------+
  |                       SAP BTP — INVOICE DECISION INTELLIGENCE SERVICE                         |
  |                                                                                               |
  |   [Core Domain Orchestration & Heuristic Decision Layer]                                      |
  |                                                                                               |
  |   ISAPAdapter Interface                                                                       |
  |     ├── getBusinessPartner(supplierId: string): Promise<SAPBusinessPartner>                   |
  |     ├── getPurchaseOrder(poNumber: string): Promise<SAPPurchaseOrder>                         |
  |     ├── getGoodsReceipts(poNumber: string): Promise<SAPGoodsReceipt[]>                        |
  |     ├── parkSupplierInvoice(payload: SAPParkInvoicePayload): Promise<SAPPostingResult>        |
  |     └── postSupplierInvoice(payload: SAPPostInvoicePayload): Promise<SAPPostingResult>        |
  +----------------------------------------------+------------------------------------------------+
                                                 |
                 +-------------------------------+-------------------------------+
                 |                                                               |
                 v [DEMO_MODE = true]                                            v [DEMO_MODE = false]
  +----------------------------------------------+  +--------------------------------------------+
  |              MockSAPAdapter                  |  |          S4HanaCloudSDKAdapter             |
  | - In-memory relational SAP database          |  | - SAP Cloud SDK (@sap-cloud-sdk/http-client)|
  | - Seeded with enterprise entities:           |  | - S/4HANA Destination via BTP Destination  |
  |   Tata, Infosys, Schneider Electric, Siemens|  | - Communication Arrangements & OAuth2      |
  | - Realistic simulation of LIV errors,        |  | - Actual OData HTTP calls with CSRF tokens |
  |   tolerance breaches, and parked documents   |  |                                            |
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

## 2. Real SAP S/4HANA APIs & Communication Scenarios

The architecture relies strictly on published, standard SAP S/4HANA APIs documented on the [SAP Business Accelerator Hub](https://api.sap.com).

### 2.1 Communication Scenario `SAP_COM_0008` — Business Partner Integration
- **OData Service:** `API_BUSINESS_PARTNER`
- **Entity Sets Utilized:**
  - `A_BusinessPartner`: Primary vendor identification, BP Category, Search Terms.
  - `A_Supplier`: Tax Number 3 (`STCD3` / GSTIN), Payment Terms (`ZTERM`), Reconciliation Account (`AKONT`).
  - `A_SupplierPurchasingOrg`: Purchasing data, Currency, Order Block flags.
- **Purpose:** Validates that incoming invoice vendor is an active, authorized Business Partner in the relevant Company Code.

### 2.2 Communication Scenario `SAP_COM_0053` — Purchase Order Integration
- **OData Service:** `API_PURCHASEORDER_PROCESS_SRV`
- **Entity Sets Utilized:**
  - `A_PurchaseOrder`: PO Number (`PurchaseOrder`), Company Code, Purchasing Org, Supplier (`InvoicingParty`), Document Date, Net Amount.
  - `A_PurchaseOrderItem`: Item (`PurchaseOrderItem`), Material, Description, Order Quantity, Order Price, Plant, Storage Location, Account Assignment Category.
  - `A_PurOrderItemPricingElement`: PO condition records (`PB00`, `P101`, freight, tax conditions).
- **Purpose:** Extracts official procurement commitment details for line-by-line 3-way matching.

### 2.3 Communication Scenario `SAP_COM_0108` — Material Document (Goods Receipt) Integration
- **OData Service:** `API_MATERIAL_DOCUMENT_SRV`
- **Entity Sets Utilized:**
  - `A_MaterialDocumentHeader`: Material Document Number, Posting Date, Document Date.
  - `A_MaterialDocumentItem`: Goods Movement Type (`101` Goods Receipt, `102` GR Reversal), Purchase Order, PO Item, Quantity in Entry Unit, Plant, Quality Stock indicator.
- **Purpose:** Ascertains physical quantity received at plant/warehouse before permitting invoice clearing.

### 2.4 Communication Scenario `SAP_COM_0057` — Logistics Invoice Verification (LIV)
- **OData Service:** `API_SUPPLIERINVOICE_PROCESS_SRV`
- **Entity Sets Utilized:**
  - `A_SupplierInvoice`: Supplier Invoice Number, Fiscal Year, Document Date, Posting Date, Total Gross Amount, Currency, Invoice Reference, Invoicing Party.
  - `A_SupplierInvoiceItemGLAcct`: G/L account items for Non-PO cost center postings.
  - `A_SupplierInvoiceItemPurOrd`: PO item reference, Quantity, Net Amount, Tax Code.
- **Function Imports:**
  - `Release`: Unblocks parked invoice for payment run.
  - `Park`: Enters preliminary posted invoice awaiting approval.
- **Purpose:** Final financial posting of verified invoices into the General Ledger.

---

## 3. Standard Interface Contract: `ISAPAdapter`

The TypeScript interface defines a single unified contract implemented by both `MockSAPAdapter` and `S4HanaCloudSDKAdapter`:

```typescript
export interface ISAPAdapter {
  getBusinessPartner(supplierId: string): Promise<SAPBusinessPartner | null>;
  getBusinessPartnerByTaxId(taxId: string): Promise<SAPBusinessPartner | null>;
  getPurchaseOrder(poNumber: string): Promise<SAPPurchaseOrder | null>;
  getGoodsReceipts(poNumber: string, itemNumber?: string): Promise<SAPGoodsReceipt[]>;
  getQualityInspectionLot(materialDoc: string): Promise<SAPQualityLot | null>;
  postSupplierInvoice(payload: SAPSupplierInvoicePostPayload): Promise<SAPPostingResult>;
  parkSupplierInvoice(payload: SAPParkInvoicePayload): Promise<SAPPostingResult>;
  getPostingStatus(invoiceDocNumber: string, fiscalYear: string): Promise<SAPPostingStatus>;
}
```

---

## 4. Integration Monitor Specifications

To demonstrate enterprise observability and SAP Integration Suite operational rigor, the system includes a dedicated **Integration Monitor**:
- **Message Ledger:** Logs every inbound intake message and outbound S/4HANA call.
- **Attributes Tracked:**
  - `MessageId`: Unique GUID / SAP Message Monitoring ID (`e.g. MSG-20261005-09124-7F8A`).
  - `InterfaceName`: E.g., `Inbound_Email_Invoice`, `S4HANA_PO_Lookup`, `S4HANA_SupplierInvoice_Post`.
  - `SenderSystem`: E.g., `OFFICE_SCANNER_GATE1`, `EXCHANGE_ONLINE_AP`, `GSTN_INVOICE_PORTAL`.
  - `ReceiverSystem`: `SAP_BTP_DECISION_ENGINE` or `SAP_S4HANA_PROD_100`.
  - `ProcessingStatus`: `SUCCESS` | `WARNING` | `FAILED` | `PENDING_RETRY`.
  - `Timestamp`: ISO 8601 millisecond resolution.
  - `PayloadTrace`: Full request and response payload headers for audit inspections.
  - `RetryAction`: Interactive replay button allowing AP supervisors to re-trigger failed message flows.

---

## 5. Dual-Mode Deployment Model: Demo vs Production

The system supports seamless switching via the `DEMO_MODE` environment toggle:

```ini
# Environment Configuration (.env)
DEMO_MODE=true
SAP_DESTINATION_NAME=S4HANA_2023_CLOUD
SAP_CLIENT=100
SAP_AUTH_TYPE=OAuth2SAMLBearerAssertion
LOG_LEVEL=info
```

### Behavior in Demo Mode (`DEMO_MODE=true`):
- All S/4HANA OData and DRC API calls are routed to `MockSAPAdapter`.
- Internal state is pre-populated with 8 rich enterprise scenarios.
- The UI displays a persistent, prominent SAP Fiori status banner:  
  **`SAP DEMO MODE — Simulating S/4HANA Public Cloud 2023 & SAP Integration Suite`**.
- State mutations (Business Owner approvals, manual overrides, posting actions) update the in-memory SAP store and create real audit trail events.

### Behavior in Production Mode (`DEMO_MODE=false`):
- `S4HanaCloudSDKAdapter` initializes SAP Cloud SDK HTTP client.
- Fetches destination `S4HANA_2023_CLOUD` from SAP BTP Destination Service.
- Executes authenticated HTTP calls with automatic CSRF token fetching and OData batch handling (`$batch`).
