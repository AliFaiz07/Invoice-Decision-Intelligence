# Invoice Decision Intelligence — User Manual Directory

Welcome to the comprehensive user manual, workflow guide, and scenario testing handbook for **Invoice Decision Intelligence**.

---

## Document Index & Chapter Directory

| Chapter | Document Title | Description & Target Audience |
|---|---|---|
| **[01-project-overview.md](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/user-manual/01-project-overview.md)** | **Project Overview & Business Purpose** | Executive summary, SAP Clean Core principles, high-level architecture diagram, and end-to-end lifecycle flow. |
| **[02-setup-and-run.md](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/user-manual/02-setup-and-run.md)** | **Setup, Installation & Running the App** | System prerequisites, installation commands, building with TypeScript, running the server, executing 138 tests, and health checks. |
| **[03-login-and-navigation.md](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/user-manual/03-login-and-navigation.md)** | **Login, Navigation & Application Shell** | Tour of the landing page, signing in with the Aarav Mehta demo profile, top header controls, global search (`Ctrl+K`), and sidebar navigation. |
| **[04-invoice-ingestion.md](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/user-manual/04-invoice-ingestion.md)** | **Multi-Channel Inbound Invoice Ingestion** | The three intake channels: Physical Gate Scanner (OCR), Vendor AP Mailbox (RFC 822 EML), and Government E-Invoice (IRP 64-char IRN). |
| **[05-invoice-lifecycle.md](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/user-manual/05-invoice-lifecycle.md)** | **Invoice Lifecycle & State Machine** | Complete state machine diagram, all 14 statuses cataloged, transition rules, and cross-module consistency behavior. |
| **[06-ai-and-validation-logic.md](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/user-manual/06-ai-and-validation-logic.md)** | **AI Decision Engine & Explainability Logic** | Deterministic local scoring algorithms, FACTS vs RECOMMENDATIONS separation, confidence scores (0-100%), risk levels, and 4-step Explainer. |
| **[07-po-and-three-way-match.md](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/user-manual/07-po-and-three-way-match.md)** | **PO Matching & Three-Way LIV Verification** | Logistics Invoice Verification (LIV), PO reference matching (`EKKO`/`EKPO`), Goods Receipts (`MSEG`), SAP Tolerance Keys (`PP`, `DQ`, `BD`), and result badges. |
| **[08-business-owner-validation.md](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/user-manual/08-business-owner-validation.md)** | **Business-Owner Validation & Governance** | Requisitioner approval workflow, Business Owner Cockpit, validation modal dialog, action states (`ACCEPT`, `REJECT`, `SEND_BACK`), and audit tracking. |
| **[09-exceptions-and-resolution.md](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/user-manual/09-exceptions-and-resolution.md)** | **Exceptions, Blocks & Resolution Workflows** | Exception classification matrix, price variances, over-deliveries, vendor mismatches, QM defects, and parking in SAP (`MIR7`). |
| **[10-finance-posting-miro-mir7.md](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/user-manual/10-finance-posting-miro-mir7.md)** | **Finance Posting (MIRO, MIR7, F110 & BSAK)** | Financial settlement simulation: parking (`MIR7`), posting (`MIRO`/`BELNR`), payment run (`F110`), and general ledger clearing (`BSAK`). |
| **[11-gst-reconciliation.md](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/user-manual/11-gst-reconciliation.md)** | **Statutory GST GSTR-2B Reconciliation** | Statutory Indian GST compliance, auto-drafted GSTR-2B statement matching, Input Tax Credit (ITC) verification, and GSP portal sync simulation. |
| **[12-joule-assistant.md](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/user-manual/12-joule-assistant.md)** | **Global SAP Joule Contextual Assistant** | Official SAP Joule diamond floating entry point, drawer Q&A resolver, page-aware context adaptation, and invoice-specific queries. |
| **[13-reset-demo-and-data-management.md](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/user-manual/13-reset-demo-and-data-management.md)** | **Reset Demo & Data Management** | Non-destructive in-memory reset workflow, preservation of authoritative disk fixtures, and re-establishing clean baseline test states. |
| **[14-scenario-based-testing.md](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/user-manual/14-scenario-based-testing.md)** | **Complete Scenario-Based Testing Catalogue**| Step-by-step test scripts for all 13 supported scenarios with exact click-by-click instructions, preconditions, and pass criteria. |
| **[15-troubleshooting.md](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/user-manual/15-troubleshooting.md)** | **Troubleshooting Guide & Operational FAQs** | Rapid diagnostic table covering port conflicts, disabled buttons, blocked batch intake, and test regression fixture recovery. |
| **[16-client-demo-runbook.md](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/user-manual/16-client-demo-runbook.md)** | **Executive Client Demonstration Runbook** | Timed 15-20 minute executive presentation script with exact clicks, talk tracks ("What to say"), screens shown, and fallbacks. |
| **[17-glossary-and-faq.md](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/user-manual/17-glossary-and-faq.md)** | **Glossary of Enterprise Terms & FAQs** | 20+ SAP S/4HANA and AP terms defined, plus answers to common architectural and operational questions. |

---

## Consolidated Manual

For a single standalone manual containing all chapters combined, please refer to:
**[`docs/Invoice_Decision_Intelligence_User_Manual.md`](file:///C:/projects/SAP%20Invoice%20Decision%20Intelligence/docs/Invoice_Decision_Intelligence_User_Manual.md)**
