# Global SAP Joule Contextual Assistant

This chapter documents the platform's global, page-aware **SAP Joule Contextual Assistant**, explaining how it works, its visual branding, contextual question resolvers, and how to use it during a live demonstration.

---

## 1. Overview & Visual Identity

**SAP Joule** is SAP's next-generation conversational AI assistant. In Invoice Decision Intelligence, Joule is implemented as a **permanent, global, page-aware floating assistant** accessible across every view.

```
                                                                             +---------------+
                                                                             | [<>*]  Joule  |  <── Floating Entry Point
                                                                             +---------------+
```

### Visual Specifications:
- **Location**: Fixed floating action button in the lower-right corner of the viewport (`#globalJouleFab`).
- **Brand Asset**: Incorporates the official SAP Joule diamond mark (`/assets/joule-mark.png`) featuring a blue geometric shape, white interior, and four-point blue star symbol.
- **Availability**: Always visible on both the public Landing page and throughout the authenticated application shell.

---

## 2. Opening & Navigating the Assistant Drawer

1. Click the floating **Joule** button in the bottom-right corner.
2. The **Global Joule Drawer** smoothly slides in from the right:

```
+---------------------------------------------------------------------------------+
| [<>*] SAP Joule  ·  Business AI Assistant                             [X Close] |
| Context: Decision Center / INV-2026-00001 (Schneider Electric)                  |
+---------------------------------------------------------------------------------+
| CHAT HISTORY                                                                    |
| [Joule] Hello Aarav Mehta! I am Joule, your contextual assistant. I am currently|
|         analyzing Invoice INV-2026-00001 for Schneider Electric India Pvt Ltd.  |
|                                                                                 |
| SUGGESTED CONTEXT QUESTIONS                                                     |
| [ Why was this invoice recommended for AUTO_PROCEED? ]                          |
| [ What is the matched Purchase Order? ]                                         |
| [ Were all 100 units received in the warehouse? ]                               |
| [ What are the next financial posting steps? ]                                  |
+---------------------------------------------------------------------------------+
| [ Type your question here or select a chip above...                  ] [ Send ] |
+---------------------------------------------------------------------------------+
```

3. To close the drawer, click the `[X]` button in the top-right corner of the drawer, or click outside the drawer backdrop.

---

## 3. Page-Aware Context Adaptability

The assistant dynamically updates its context and suggested questions whenever the user switches pages:

| Active View | Detected Context Label | Suggested Question Chips Available |
|---|---|---|
| **Overview** | `Context: Overview` | - What does this application do?<br>- How does the invoice workflow work?<br>- What are the three invoice intake channels?<br>- What SAP business context is used? |
| **Command Center** | `Context: Command Center` | - What requires immediate attention?<br>- Which invoices have the highest commercial value?<br>- Summarize active exceptions. |
| **Invoice Inbox** | `Context: Invoice Inbox` | - How many invoices were ingested from each channel?<br>- How does OCR normalization work?<br>- Show invoices pending review. |
| **Decision Center** | `Context: Decision Center` | - How does the AI calculate confidence scores?<br>- What is the difference between FACT and RECOMMENDATION?<br>- How do I post an invoice to S/4HANA? |
| **Selected Invoice** (e.g. `INV-2026-00001`) | `Context: INV-2026-00001 (Schneider)` | - Why was this recommended for AUTO_PROCEED?<br>- What is the matched PO?<br>- Were all units received in the warehouse?<br>- Are there any quality defects? |
| **PO & 3-Way Match** | `Context: PO & 3-Way Match` | - How does three-way matching work?<br>- What is Tolerance Key PP?<br>- What is Tolerance Key DQ? |
| **Business Validation** | `Context: Business Validation` | - Who is authorized to validate invoices?<br>- What happens when an invoice is accepted?<br>- Why is justification required for rejection? |
| **Exceptions & Blocks** | `Context: Exceptions & Blocks` | - What causes an invoice to be placed on HOLD?<br>- How do I resolve a price variance?<br>- What happens when I park an invoice (MIR7)? |
| **GST Reconciliation** | `Context: GST Reconciliation` | - What is GSTR-2B?<br>- What is Input Tax Credit (ITC)?<br>- Why is ₹12,600 tax credit blocked for Infosys? |
| **Integration Monitor** | `Context: Integration Monitor` | - How does SAP Cloud Integration (CPI) connect?<br>- What happens during message replay?<br>- Are OData APIs standard S/4HANA? |
| **Audit Trail** | `Context: Audit Trail` | - Is this audit trail SOX Section 404 compliant?<br>- Are audit records immutable?<br>- What events are captured? |

---

## 4. Local Simulation Architecture & Boundaries

> [!NOTE]
> **Implementation Transparency**: Joule operates via `JOULE_CONTEXTS` in `app.js`. It parses user queries locally and generates precise, context-rich responses drawn directly from the active invoice record and ERP master data.
> - Zero latency: Answers generate instantaneously.
> - 100% reliable during client presentations: No risk of network dropouts or hallucinated answers.
> - Completely grounded in the actual project domain rules and data.
