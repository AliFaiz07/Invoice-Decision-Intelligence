# SAP Integration Architecture & Connectivity Patterns
**Document ID:** SAP-INT-002  
**Target Runtime:** SAP Business Technology Platform (SAP BTP)  
**Standard SAP Alignment:** SAP Integration Suite, SAP Document and Reporting Compliance (DRC), SAP Event Mesh  
**Version:** 1.0.0  

---

## 1. Clean Core Landscape Architecture

```text
    INBOUND CHANNELS
   +------------------------+
   | 1. Physical Scanner    |
   | 2. AP Email Listener   |
   | 3. GST E-Invoice (IRN) |
   +-----------+------------+
               |
               v
   +------------------------------------------------------------------------------------------------+
   |                                    SAP INTEGRATION SUITE                                       |
   |  iFlow: Inbound_MultiChannel_Normalizer                                                        |
   |  - Authenticates Inbound Payloads (OAuth 2.0 / Mutual TLS)                                     |
   |  - Transforms to Canonical Invoice XML/JSON                                                    |
   |  - Dispatches Event to SAP Event Mesh                                                          |
   +-------------------------------------------+----------------------------------------------------+
                                               |
                                               v
   +------------------------------------------------------------------------------------------------+
   |                              SAP BTP INVOICE DECISION INTELLIGENCE                             |
   |                                                                                                |
   |   [Cognitive Validation & Decision Layer]                                                      |
   |     ├── POMatchingService                                                                      |
   |     ├── ThreeWayReconciliationService (LIV Tolerance DQ/PP/BD)                                 |
   |     ├── AIDecisionEngine (Hybrid Heuristic + XAI)                                              |
   |     ├── BusinessValidationService                                                              |
   |     └── GSTReconciliationService (GSTR-2B Matching)                                            |
   +-------------------------------------------+----------------------------------------------------+
                                               |
                                   ISAPAdapter Interface
                                               |
                       +-----------------------+-----------------------+
                       |                                               |
                       v [DEMO_MODE=true]                              v [DEMO_MODE=false]
   +-------------------------------------------+   +--------------------------------------------+
   |              MockSAPAdapter               |   |            S4HanaCloudAdapter              |
   | - In-Memory Relational Simulation         |   | - SAP Cloud SDK                            |
   | - Pre-populated with 10 Scenarios         |   | - BTP Destination: S4HANA_2023_CLOUD       |
   | - Realistic Tolerance Keys & QM Lots      |   | - CSRF Token Handshake & $batch Execution  |
   +-------------------------------------------+   +--------------------------------------------+
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

## 2. Communication Arrangements & Scenarios

| Communication Scenario | Scope Item | OData Service / API | Entity Set |
|---|---|---|---|
| `SAP_COM_0008` | Business Partner Integration | `API_BUSINESS_PARTNER` | `A_BusinessPartner`, `A_Supplier` |
| `SAP_COM_0053` | Purchase Order Integration | `API_PURCHASEORDER_PROCESS_SRV` | `A_PurchaseOrder`, `A_PurchaseOrderItem` |
| `SAP_COM_0108` | Material Document Integration | `API_MATERIAL_DOCUMENT_SRV` | `A_MaterialDocumentHeader`, `A_MaterialDocumentItem` |
| `SAP_COM_0057` | Logistics Invoice Verification | `API_SUPPLIERINVOICE_PROCESS_SRV` | `A_SupplierInvoice`, `A_SupplierInvoiceItemPurOrd` |

---

## 3. GST DRC / GSTR-2B Integration Architecture

Under Indian Goods & Services Tax (GST) governance, companies reconcile internal procurement invoices against statutory **GSTR-2B** auto-drafted statements:
- In production, data flows from the GSTN portal through SAP Document and Reporting Compliance (DRC) or an authorized GSP (GST Suvidha Provider).
- The system executes automated matching across:
  - `Supplier GSTIN`
  - `Invoice Number` (normalizing leading zeroes and special characters)
  - `Invoice Date` (within tax period window)
  - `Taxable Value` & `Total Tax (CGST + SGST + IGST)`
- Identifies anomalies: `MATCHED`, `MISSING_IN_GST`, `MISSING_INTERNALLY`, `AMOUNT_MISMATCH`, `GSTIN_MISMATCH`.
