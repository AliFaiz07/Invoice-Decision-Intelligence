# Invoice Decision Intelligence — Demo Runbook

**Purpose:** Live Operator Cheat-Sheet & Demo Script  
**Target Duration:** 7–10 Minutes  
**Audience:** Finance Leadership, SAP Delivery Leads, Procurement Heads, Enterprise Architects  
**Author:** Solution Architecture & Demo Preparation Team  

---

## 1. Quick Setup & Startup (Do this 15 mins before demo)

### Commands
Open Command Prompt (`cmd.exe`) and execute:

```cmd
cd /d "C:\projects\SAP Invoice Decision Intelligence"
cmd.exe /c "npm run build"
cmd.exe /c "npm run start"
```

### Verify Running Instance
Open your browser to:
```text
http://localhost:3000
```
- [ ] Landing page appears with title: **"Make every invoice decision with the full business context."**
- [ ] Top environment badge shows **"S/4HANA Clean Core"**.
- [ ] No browser console errors (`F12` -> Console).

---

## 2. Pre-Flight Reset
If you or anyone tested earlier, reset the data back to factory state:
1. Click **Sign In** -> Click **Continue as Aarav Mehta**.
2. In the top application header, click the **Reset Demo** button (circular arrows icon).
3. Confirm the dialog: *"Reset all 10 enterprise demo scenarios and GSTR-2B datasets to factory baseline state?"*
4. Click **OK**. A green toast will confirm: *"All scenarios reset to baseline state"*.
5. Sign out by clicking **Sign Out** in the top right.

---

## 3. Minute-by-Minute Live Demo Script

```
TIMELINE SUMMARY
0:00 - 1:15  Landing Page & The Enterprise Problem
1:15 - 2:00  Login as Business Owner (Aarav Mehta)
2:00 - 3:30  Multi-Channel Inbound Gateways (Physical, Email, E-Invoice)
3:30 - 5:15  The Hero Invoice: INV-2026-00008 (48h Statutory SLA + 3-Way Match)
5:15 - 6:30  Business Owner Validation & Immediate AI Re-evaluation
6:30 - 7:45  SAP S/4HANA Settlement (Posting Document BELNR)
7:45 - 8:45  Integration Monitor & Governance Audit Trail
8:45 - 10:00 Wrap-up & Q&A
```

---

### Phase 1: Landing Page & Problem Context (0:00 - 1:15)
- **What to show on screen:** `http://localhost:3000/landing`
- **What to click:** Scroll smoothly down through the Landing Page sections (**Why It Exists**, **Validation Pipeline**, **Decision Center Preview**).
- **What to say verbally:**
  > *"Welcome everyone. In any enterprise running SAP, vendor invoices enter the company through multiple fragmented channels: paper bills scanned at plant gates, PDF attachments in Accounts Payable mailboxes, and electronic invoices pushed directly from government portals.*
  >
  > *Today, Accounts Payable clerks are stuck playing detective—manually checking POs, verifying warehouse deliveries, and sending endless emails to department heads asking if services were delivered.*
  >
  > *Invoice Decision Intelligence acts as an intelligent layer on SAP BTP. It brings all three channels together, matches invoices against SAP S/4HANA business context, and puts the commercial decision directly in front of the Business Owner before Finance processes payment."*

---

### Phase 2: Login as Business Owner (1:15 - 2:00)
- **What to show on screen:** Click **Sign In** in the top right corner.
- **What to click:** Hover over the profile card for **Aarav Mehta**, then click **"Continue as Aarav Mehta"**.
- **What to say verbally:**
  > *"We will sign in under our designated enterprise profile: Aarav Mehta, Business Owner in Corporate Services. In this architecture, business owners only see invoices affecting their cost centers and requisitions, ensuring zero clutter and strict segregation of duties."*

---

### Phase 3: Multi-Channel Inbound Gateways (2:00 - 3:30)
- **What to show on screen:** Click **Inbound Portals** in the top header or **Inbound Gateways** in the left sidebar.
- **What to click:** 
  1. Click **Physical / Plant Gate Scanner** tab (show 4 scanned invoices with scanner location and DPI).
  2. Click **AP Email Inbound Mailbox** tab (show 5 invoices with sender email and PDF attachment tags).
  3. Click **Government E-Invoice / IRP** tab (show the 64-character IRN hash and statutory timestamp).
- **What to say verbally:**
  > *"Notice our three ingestion channels. Whether an invoice is scanned as paper at Plant 1010, received as a PDF from a vendor, or pushed electronically with a statutory IRN hash from the government tax portal, the system normalizes every document into a single canonical model."*

---

### Phase 4: The Hero Invoice Cockpit (3:30 - 5:15)
- **What to show on screen:** Under the **Government E-Invoice / IRP** tab, locate **`INV-2026-00008`** (Schneider Electric Smart PDUs, ₹9,97,100).
- **What to click:** Click **"Inspect in Decision Center"**.
- **What to point out on screen:**
  1. **Top Badge:** Amber `Business Validation Required` recommendation with a **48-Hour Statutory SLA Countdown**.
  2. **PO & GR Match:** PO `4500012900` for 20 units @ ₹42,250. Warehouse Goods Receipt `5000018960` shows 20 units received.
  3. **SAP QM Inspection:** Inspection lot `100004600` shows 20 units passed calibration with 0 defects.
  4. **Explainable Evidence Box:** Point out the **Facts** vs. **System Recommendations** breakdown.
- **What to say verbally:**
  > *"Here is invoice INV-2026-00008. The system has automatically performed full three-way reconciliation against SAP S/4HANA. The PO ordered 20 PDUs, warehouse receiving confirmed 20 arrived, and Plant Quality Assurance verified all 20 passed testing.*
  >
  > *However, because this is a government e-invoice subject to a statutory 48-hour acceptance window, the AI engine flags it as 'Business Validation Required' rather than blind auto-posting. The business requisitioner must confirm commercial acceptance."*

---

### Phase 5: Business Owner Validation (5:15 - 6:30)
- **What to click:**
  1. In the right-hand **Business Owner Validation** card, click the green **Accept** button.
  2. A prompt modal appears asking for confirmation.
  3. Enter reason: `Commercial service and PDU delivery verified for Pune Data Center expansion.`
  4. Click **Confirm Decision**.
- **What happens on screen:**
  - Status updates immediately to **`BUSINESS_VALIDATED`**.
  - The Decision Engine re-evaluates in real-time: Recommendation flips to green **`AUTO_PROCEED`** with a **95% Confidence Score**.
- **What to say verbally:**
  > *"With one click, Aarav Mehta verifies the purchase. Instantly, the decision engine incorporates the human approval signal, upgrades the recommendation to AUTO_PROCEED with 95% confidence, and makes the invoice immediately eligible for financial settlement."*

---

### Phase 6: SAP S/4HANA Settlement (6:30 - 7:45)
- **What to click:**
  1. Click the primary button: **"Post to SAP S/4HANA (MIRO)"**.
  2. Watch the green success toast appear: *"Posted to SAP S/4HANA as Accounting Document 5105600121/2026"*.
  3. The status pill transitions to **`POSTED_TO_SAP`**.
- **What to say verbally:**
  > *"Finance can now execute automated posting. The system executes the standard SAP S/4HANA MIRO invoice verification transaction, generating official Accounting Document Number 5105600121. The invoice is officially closed in AP and ready for treasury disbursement."*

---

### Phase 7: Integration Monitor & Governance Audit Trail (7:45 - 8:45)
- **What to click:**
  1. In the sidebar, click **Integration Monitor**.
  2. Show the top transaction: `S4HANA_SupplierInvoice_Post` with Direction `OUTBOUND`, Status `SUCCESS`.
  3. Click **Inspect** to reveal the JSON/XML payload sent to SAP S/4HANA.
  4. In the sidebar, click **Audit Trail**. Show the immutable chronological trail: Ingested -> Validation Pending -> Business Validated (Aarav Mehta) -> Posted to SAP.
- **What to say verbally:**
  > *"Every event is logged for internal control compliance and external audit. The Integration Monitor tracks message health with SAP Integration Suite, and the Audit Trail records who approved what, when, and with what justification."*

---

### Phase 8: Wrap-Up & Value Summary (8:45 - 10:00)
- **What to say verbally:**
  > *"In summary, we took a complex statutory e-invoice across government and corporate boundaries, automatically validated it against SAP procurement, goods receipts, and quality inspection, secured commercial approval from the business owner, and posted it directly into SAP S/4HANA in under 3 minutes—with zero paper, zero email chasing, and complete audit governance."*

---

## 4. Emergency Backup Demonstration Paths

If a client asks specific "what if" questions, use these pre-staged scenarios:

### What if an invoice is a duplicate?
- **Navigate to:** `Invoice Inbox` -> Select **`INV-2026-00007`** (AWS India, ₹4,01,200).
- **Show:** Risk level is **CRITICAL**, recommendation is **`HOLD`**.
- **Point out:** The SAP duplicate invoice index (`RBKP/BSIP`) caught that this exact invoice number was already processed in September, preventing a double payment.

### What if quality inspection found damaged goods?
- **Navigate to:** `Invoice Inbox` -> Select **`INV-2026-00006`** (Wipro Enterprises, ₹2,95,000).
- **Show:** Recommendation is **`HOLD`**, Risk is **HIGH**.
- **Point out:** SAP QM inspection lot `100004580` recorded 5 rejected HEPA filters. The system prohibits payment until a Credit Note is issued.

### What if there is a GST tax credit discrepancy?
- **Navigate to:** `GST Reconciliation` view.
- **Show:** **`INV-2026-00009`** (Infosys Limited).
- **Point out:** Internal invoice totals ₹4,50,000, but GSTR-2B only shows ₹3,80,000. Under Indian GST Section 16(2)(aa), ₹12,600 in tax credit is blocked until Infosys files an amendment.

---

## 5. Live Troubleshooting Quick-Cards

| Problem | Cause | 10-Second Fix |
|---|---|---|
| Port 3000 busy | Previous process didn't terminate | In PowerShell: `Stop-Process -Name node -Force`, then restart `npm start`. |
| Server won't start in PowerShell | Script policy blocked `npm` | Use `cmd.exe /c "npm start"` or launch Command Prompt. |
| Test data is dirty from earlier | Invoices already approved | Click **Reset Demo** in the top header. |
| Forgot the demo profile name | Profile query | **Aarav Mehta**, Business Owner, Corporate Services. |
| Client asks for live SAP connection | Architecture question | State: *"Built on SAP Clean Core principles with high-fidelity simulated S/4HANA structures. Ready to attach to SAP BTP Destination Service via OData."* |
