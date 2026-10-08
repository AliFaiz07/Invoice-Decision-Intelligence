# Invoice Decision Intelligence — Information Architecture
**Document ID:** PROD-IA-002  
**Version:** 1.0.0  

---

## 1. Primary Navigation & Screen Taxonomy

The system architecture employs a restrained enterprise shell without superfluous navigation tabs:

```text
INVOICE DECISION INTELLIGENCE (SHELL)
│
├── 01. Home / Command Center
│       ├── Attention Queue (Urgent Invoices needing Human Action)
│       ├── Today's Operational Inflow Strip (Incoming, Needs Decision, Exceptions, Ready)
│       └── Channel Activity Ledger
│
├── 02. Invoice Inbox
│       ├── Unified Inbound Invoices Table
│       ├── Multi-Channel Filter Bar (Physical, Email, E-Invoice)
│       └── Status & Severity Facets
│
├── 03. Decision Center (HERO EXPERIENCE)
│       ├── Master List: Invoices Requiring Decisions
│       └── Detail Workspace:
│               ├── 5-Question Top Summary (What is it, State, Recommendation, Why, Action)
│               ├── SAP Context Process Strip (Supplier -> PO -> GR -> QM -> Inv -> BO -> Fin)
│               ├── Three-Way Match Visualization (PO vs GR vs Invoice)
│               ├── Evidence Section (FACT vs SYSTEM RECOMMENDATION)
│               ├── Decision Explainer (Numbered Breakdown)
│               ├── Transaction Story (Visual Event Timeline)
│               └── Direct Posting / Parking Action Bar
│
├── 04. PO & Reconciliation
│       ├── 3-Way Match Verification Workbench
│       ├── Tolerance Key Engine (DQ, PP, BD)
│       └── SAP QM Inspection Lot Inspector
│
├── 05. Business Validation
│       ├── Business Owner Workbench
│       └── Contextual Validation Form (Accept, Reject, Send Back, Clarification)
│
├── 06. Exceptions Center
│       ├── Prioritized Exception Triage (Critical, High, Medium, Low)
│       └── Resolution Action Triggers
│
├── 07. GST Reconciliation
│       ├── Internal Bills vs GST / E-Invoice Records (GSTR-2B Matching)
│       ├── Variance Analysis (Matched, Missing in GST, Missing Internally, Amount Delta)
│       └── Simulated Import Adapter (Excel / JSON)
│
├── 08. Integration Monitor
│       ├── SAP Integration Suite Message Ledger
│       ├── Request / Response Payload Inspector
│       └── Replay & Retry Execution
│
└── 09. Audit Trail
        ├── Immutable Event Log
        └── State Delta & Actor Attribution
```

---

## 2. Dedicated Inbound Mock Portals (`/mock-portals`)

To reflect realistic operational intake from heterogeneous external sources, the system hosts 3 dedicated mock portals that feed into the central canonical intake layer:

1. `/mock-portals/physical`:
   - Simulates physical plant mailroom / gate scanner intake.
   - Includes document scan preview, OCR extraction status, field confidence meters, and "Send to Decision Center".
2. `/mock-portals/email`:
   - Simulates enterprise AP vendor invoice mailbox (`invoices@enterprise.com`).
   - Displays unread counts, sender domain verification, email subject/headers, PDF attachments, and "Send to Decision Center".
3. `/mock-portals/einvoice`:
   - Simulates the Government Invoice Registration Portal (IRP) / GST E-Invoice gateway.
   - Captures statutory 64-character IRN, signed QR code data, Buyer/Seller GSTINs, and 48-hour SLA timestamps.
