# Mock to Production Replacement Mapping Guide
**Document ID:** SAP-MAP-003  
**Target:** Engineering & Cloud Operations  
**Version:** 1.0.0  

---

## 1. Component Transition Matrix

| Prototype / Demo Component | Current Demo Implementation | Production SAP Replacement | Transition Effort & Steps |
|---|---|---|---|
| **SAP S/4HANA Adapter** | `MockSAPAdapter` (In-memory TypeScript relational store) | `S4HanaCloudAdapter` via `@sap-cloud-sdk/http-client` | Set `DEMO_MODE=false`. Configure destination `S4HANA_2023_CLOUD` in BTP Cockpit with OAuth 2.0 / SAML Bearer. |
| **Physical Scan Intake** | `PhysicalScanAdapter` (Normalized JSON) | SAP Document Information Extraction (DOX) via SAP AI Core | Replace local parser with REST call to `POST /v2/document/jobs` using pre-trained invoice schema `sap.invoice:latest`. |
| **Email Invoice Intake** | `EmailIntakeAdapter` (Mock AP Mailbox) | SAP Integration Suite (Cloud Integration iFlow + Mail Adapter) | Configure CPI iFlow with IMAP/Graph listener; extracts attachments and posts to BTP decision webhook. |
| **E-Invoice Gateway** | `EInvoiceGovAdapter` (IRN mock parser) | SAP Document and Reporting Compliance (DRC) / GSTN IRP | Connect DRC Peppol/GST outbound communication scenario to trigger BTP intake event on IRN generation. |
| **GST GSTR-2B Import** | `MockGSTAdapter` (JSON/Excel simulated import) | Licensed GSP / ASP API (e.g. Cleartax / Cygnet GSP Gateway) | Connect GSP REST endpoints (`/gstr2b/b2b`) to feed automated monthly tax reconciliation jobs. |
| **Approval Workflow** | `BusinessValidationService` (In-app Fiori modal) | SAP Build Process Automation (SBPA) My Inbox | Integrate SBPA Workflow API (`/workflow-instances`); routes task to SAP Fiori Launchpad My Inbox. |
| **Persistence Layer** | In-Memory `InvoiceRepository` | SAP HANA Cloud via SAP CAP (`@sap/cds`) | Define CDS entities (`schema.cds`) and deploy to SAP HANA Cloud HDI container. |

---

## 2. Environment Configuration Toggle

To switch between simulation and production:

```ini
# .env Configuration

# DEMO MODE (Local Simulation):
DEMO_MODE=true

# PRODUCTION MODE (SAP BTP Connected):
# DEMO_MODE=false
# SAP_BTP_DESTINATION_SERVICE_URL=https://destination-configuration.cfapps.eu10.hana.ondemand.com
# SAP_DESTINATION_NAME=S4HANA_2023_CLOUD
# SAP_CLIENT=100
# SAP_AUTH_TYPE=OAuth2SAMLBearerAssertion
```
