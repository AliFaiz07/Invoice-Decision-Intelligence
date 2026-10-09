# Login, Navigation & Application Shell

This chapter guides users through accessing the platform, signing in with the enterprise demo profile, and navigating the application shell.

---

## 1. Product Landing Page (`/`)

When you open `http://localhost:3000`, the application presents the public **Product Overview Landing Page**.

```
+----------------------------------------------------------------------------------------------------+
| (o) Invoice Decision Intelligence [S/4HANA Clean Core]   Overview  Why It Exists  Pipeline ... [Sign In ->] |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|                             (o) INVOICE DECISION INTELLIGENCE                                      |
|               Make every invoice decision with the full business context.                          |
|                                                                                                    |
|               [Sign In ->]   [Explore How It Works v]                                              |
|                                                                                                    |
|   +-----------------------+ +-----------------------+ +-----------------------+ +----------------+ |
|   | 3 Gateways Normalized | | Three-Way Matching    | | Business Owner Control| | S/4HANA Clean  | |
|   +-----------------------+ +-----------------------+ +-----------------------+ +----------------+ |
+----------------------------------------------------------------------------------------------------+
```

### Key Elements on the Landing Page:
- **Brand Identity**: Features the official circular swirling orbital invoice mark and product descriptor (*"Enterprise Invoice Decision Platform"*).
- **Navigation Links**:
  - `Overview`: Scrolls to `#productOverview` (problem statement & architecture).
  - `Why It Exists`: Scrolls to `#whyItExists` (comparison of traditional AP vs. Decision Intelligence).
  - `Validation Pipeline`: Scrolls to `#intelligentValidation` (inbound to posting convergence flow).
  - `Decision Center`: Scrolls to `#decisionPreview` (interactive preview of the decision queue).
  - `Business Owner`: Scrolls to `#ownerValidation` (explanation of human governance).
  - `Exceptions`: Scrolls to `#exceptionManagement` (exception categorization).
  - `Audit Trail`: Scrolls to `#governanceAudit` (SOX/GoBD audit pillars).
- **Primary Call to Action (`Sign In`)**: Top right navbar button and hero button; opens the demo sign-in card.
- **Secondary Call to Action (`Explore How It Works`)**: Smoothly scrolls down to the architecture overview.
- **Global Joule Floating Button**: Located at the bottom right corner; accessible anytime for answering product questions.

---

## 2. Enterprise Sign-In Screen (`/login`)

Clicking **Sign In** switches the view to the controlled **Enterprise Demo Access Screen**.

```
                    +-------------------------------------------------------+
                    |                          (o)                          |
                    |              Invoice Decision Intelligence            |
                    |            Enterprise Invoice Decision Platform       |
                    |                                                       |
                    | SIGN IN AS                                            |
                    | +---------------------------------------------------+ |
                    | | [AM]  Aarav Mehta                                 | |
                    | |       Business Owner | Corporate Services         | |
                    | |       aarav.mehta@demo.company                    | |
                    | |       Responsibility: Invoice & Request Validation| |
                    | |       * Active Demo Profile . Authorized Approver | |
                    | +---------------------------------------------------+ |
                    |                                                       |
                    | [ Continue as Aarav Mehta ->                        ] |
                    |                                                       |
                    | <- Back to Product Overview                           |
                    +-------------------------------------------------------+
```

### The Authorized Demo Profile:
- **Name**: `Aarav Mehta`
- **Role**: `Business Owner`
- **Department**: `Corporate Services` / `Facilities & Plant Operations`
- **Responsibilities**: Validating inward vendor invoices against procurement requests, reviewing commercial delivery, approving cost-center budget consumption, or raising exception disputes.

### Action:
Click **Continue as Aarav Mehta**.
- The system sets the authenticated session state (`app.currentUser`).
- Transitions smoothly into the **Application Shell** (`/app`).
- Displays a confirmation toast: *"Signed in as Aarav Mehta (Business Owner - Corporate Services)"*.

---

## 3. Authenticated Application Shell (`/app`)

Once authenticated, the user enters the primary operations workspace. The shell consists of three primary regions:
1. **Top Application Header (64px)**
2. **Left Sidebar Navigation (244px, collapsible to 68px)**
3. **Main Dynamic Work Area**

---

## 4. Top Application Header

```
+------------------------------------------------------------------------------------------------------------------------------+
| (o) Invoice Decision Intelligence   [Quick search invoice, supplier... Ctrl K]  (*) AI Engine: Active  [Inbound Portals] [Reset Demo] [AM] [Sign Out]|
+------------------------------------------------------------------------------------------------------------------------------+
```

| Control / Element | Function & Behavior |
|---|---|
| **Brand Badge** | Displays the logo mark and product name. Clicking returns to the `Overview` view. |
| **Clean Core Pill** | `DEMO ENVIRONMENT · S/4HANA Clean Core` indicator. |
| **Global Search Bar** | Press `Ctrl + K` or click inside to focus. Type any Invoice ID (`INV-2026-00001`), Supplier Name (`Schneider`), or PO Number (`4500012456`). Immediately filters the active decision queue. |
| **AI Engine Indicator** | Green pulsating badge showing `AI Engine: Active` (confirming BTP decision logic is online). |
| **Inbound Portals Button** | Direct shortcut to the `Inbound Gateways` channel manager. |
| **Reset Demo Button** | Opens the reset confirmation modal to restore baseline scenarios and batch statuses. |
| **User Profile Badge** | Displays avatar `AM` and user name `Aarav Mehta (Business Owner)`. |
| **Sign Out Button** | Clears the session and returns to the landing page (`/`). |

---

## 5. Left Sidebar Navigation

The sidebar groups all 9 platform operational views into three structured enterprise categories:

```
+------------------------------------+
| OPERATIONS                         |
|   [*] Overview                     |
|   [#] Command Center               |
|   [=] Invoice Inbox          (18)  |
|   [!] Decision Center          *   |
|                                    |
| RECONCILIATION & APPROVALS         |
|   [o] PO & 3-Way Match             |
|   [^] Business Validation     (5)  |
|   [x] Exceptions & Blocks    (10)  |
|   [%] GST Reconciliation           |
|                                    |
| GOVERNANCE & INTEGRATION           |
|   [@] Integration Monitor          |
|   [&] Audit Trail                  |
|   [>] Inbound Gateways             |
|                                    |
| [<] Collapse Sidebar   Build v2.4  |
+------------------------------------+
```

### View Directory:

| Menu Item | Internal View ID | Primary Purpose |
|---|---|---|
| **Overview** | `landing` | Architectural summary, process steps, and quick action cards. |
| **Command Center** | `commandCenter` | Executive dashboard answering what requires immediate human attention across accounts payable. |
| **Invoice Inbox** | `inbox` | Master invoice ingestion ledger showing all received invoices across all 3 channels with badge filters. |
| **Decision Center** | `decisionCenter` | Priority decision worklist and deep-dive invoice detail inspection workspace. |
| **PO & 3-Way Match** | `reconciliation` | Logistics Invoice Verification (LIV) matching invoices against SAP POs (`EKKO`/`EKPO`) and GRs (`MSEG`/`MATDOC`). |
| **Business Validation** | `businessValidation` | Departmental requisitioner sign-off workbench for approving commercial delivery and budget charges. |
| **Exceptions & Blocks** | `exceptions` | Active invoice exception workbench for price variances, over-deliveries, vendor mismatches, and QM defects. |
| **GST Reconciliation** | `gstReconciliation` | Statutory GSTR-2B matching workbench for verifying Input Tax Credit (ITC) eligibility. |
| **Integration Monitor** | `integration` | SAP Cloud Integration (CPI) message monitor with payload inspection and replay capabilities. |
| **Audit Trail** | `audit` | SOX 404 & GoBD immutable lifecycle event ledger recording all automated and human actions. |
| **Inbound Gateways** | `mockPortals` | Multi-channel ingestion simulators (Physical Gate Scanner, AP Mailbox, Government E-Invoice IRP). |

### Sidebar Collapse:
Clicking the bottom `[<]` button toggles the sidebar between **Expanded (244px)** and **Collapsed (68px)** icon-only mode, maximizing screen real estate for wide financial tables.

---

## 6. Dynamic Breadcrumbs & Header Actions

Whenever a user switches views, the top bar updates dynamically:
- **Breadcrumbs**: Hierarchical location link (e.g., `Home > Decision Center > Decision Queue > INV-2026-00001`).
- **Page Title**: View title (e.g., `Invoice Decision: INV-2026-00001`).
- **Page Subtitle**: Context-sensitive summary showing the invoice supplier, gross amount, matched PO, and current AI recommendation.
- **Header Actions**: Contextual buttons (e.g., `Back to Queue`, `What-If Simulator`, `View Invoice Inbox`, `Sync GST`).

---

## 7. Global Floating Joule Assistant

In the bottom-right corner of every screen, the official **SAP Joule diamond assistant button** remains permanently accessible.
- Clicking the button slides out the **Joule Contextual Assistant Drawer**.
- The assistant is **page-aware**: its recommended questions and answers adapt automatically to whether the user is viewing the Inbox, Decision Center, Business Validation, Exceptions, or GST Reconciliation.
