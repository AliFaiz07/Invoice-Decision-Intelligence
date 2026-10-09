# Troubleshooting Guide & Operational FAQs

This chapter provides a diagnostic matrix for resolving operational, runtime, and workflow issues in Invoice Decision Intelligence.

---

## 1. Quick Diagnostic Matrix

| Problem / Symptom | Likely Cause | User Verification | Developer Fix / Command |
|---|---|---|---|
| **Server fails to start (`EADDRINUSE 3000`)** | Previous Node.js process still listening on port 3000. | Check if another terminal is running `server.js`. | `Get-NetTCPConnection -LocalPort 3000 \| Stop-Process -Id {$_.OwningProcess} -Force` |
| **Landing page clicks do not respond** | Missing or unhandled hash routes; event listeners not bound. | Confirm browser URL is `http://localhost:3000`. Check browser developer console (F12) for JS errors. | Verify `app.smoothScrollTo()` target IDs match landing sections (`src/public/index.html`). |
| **Sign In does not navigate to App Shell** | Session state error in `app.currentUser` or route guard. | Ensure you clicked **Continue as Aarav Mehta**. | Check `loginAsDemoUser()` in `app.js`. Ensure `#productLoginPage` hides and `#productAppShell` displays. |
| **Invoices missing after batch intake** | Batch intake already executed in this demo cycle. | Look for warning toast: *"Batch has already been ingested in this demo cycle"*. | Click **Reset Demo** in the top header to clear batch status flags (`physical`, `email`, `einvoice`). |
| **Source document PDF / EML preview fails** | Missing mock fixture on disk or path resolution error. | Check if file exists under `mock-data/inbound/`. | Check Express static routes in `server.ts` for `/inbound-docs`. |
| **`Post to SAP` button is disabled** | Invoice has not completed business validation or is on HOLD. | Check AI Recommendation: Must be `AUTO_PROCEED` or status `BUSINESS_VALIDATED`. | Invoices with variances require either **Validate as Owner** (Accept) or **Park in SAP**. |
| **`Validate as Owner` button is disabled** | Invoice already validated (`BUSINESS_VALIDATED`). | Check status badge. If already validated, posting is enabled instead. | Single-validation rule: an invoice cannot be validated twice. |
| **What-If slider changes do not affect outcome** | Slider adjustment does not cross the actual variance threshold. | Check variance percentage (e.g. TCS is +15%). Slider must be dragged to >= 15% to trigger `AUTO_PROCEED`. | Verify `runWhatIfSimulation()` logic in `app.js`. |
| **Global Joule button is missing** | Viewport DOM error or CSS z-index conflict. | Look at bottom right corner. Press F12 and inspect `#globalJouleFab`. | Confirm `#globalJouleFab` exists in `index.html` and `display: flex` is set. |
| **Tests fail after manual testing (`npm run test:ts`)** | `mock-data/` fixtures were modified by live transactions. | Run `git status` to see modified JSON files in `mock-data/`. | Run `git restore mock-data` to restore pristine golden master fixtures. |

---

## 2. In-Depth Problem Resolutions

### Issue A: Port 3000 Already in Use
**Symptom**: Starting the server throws:
```text
Error: listen EADDRINUSE: address already in use :::3000
```
**Resolution**:
1. Open PowerShell.
2. Find and terminate the process holding port 3000:
   ```powershell
   $conn = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
   if ($conn) { Stop-Process -Id $conn.OwningProcess -Force }
   ```
3. Restart the server:
   ```bash
   node dist/server.js
   ```

---

### Issue B: Re-Running Batch Intake is Blocked
**Symptom**: Clicking **Ingest Batch** displays:
*"Batch for channel 'physical' has already been ingested in this demo cycle."*
**Reason**: To prevent accidental data multiplication and duplicate records during demos, each channel can only be ingested once per cycle.
**Resolution**:
1. Click **Reset Demo** in the top navigation bar.
2. Click the red **Reset Demo** button in the confirmation modal.
3. Return to **Inbound Gateways** and click **Ingest Batch**.

---

### Issue C: `Post to SAP` is Disabled for an Exception Invoice
**Symptom**: On invoice `INV-2026-00005`, the **Post to SAP** button cannot be clicked.
**Reason**: This is an intentional enterprise safety control. `INV-2026-00005` has a +15% price variance breaching Tolerance Key `PP`. S/4HANA policy strictly forbids automatic posting of unapproved price variances.
**Resolution**:
- If you wish to park it: Click **Park in SAP** (MIR7).
- If you wish to approve it: Open **Business Validation** and accept the invoice.
- If you wish to demonstrate policy tolerance: Open **What-If Simulator** and increase price tolerance to 15%.

---

### Issue D: Regression Tests Report Failures After UI Demos
**Symptom**: Running `npm run test:ts` reports failed assertions.
**Reason**: Interactive browser actions or previous test runs write updated invoice states to `mock-data/`.
**Resolution**:
Run:
```bash
git restore mock-data
npm run test:ts
```
All 138 tests will pass cleanly.
