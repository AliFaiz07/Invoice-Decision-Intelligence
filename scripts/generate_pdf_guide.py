import os
import subprocess
import sys

def main():
    print("Building Enterprise Styled HTML for PDF conversion...")
    
    html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SAP Invoice Decision Intelligence — Integration & Demo Guide</title>
  <style>
    @page {
      size: A4;
      margin: 16mm 14mm 16mm 14mm;
      @bottom-right {
        content: "Page " counter(page);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        font-size: 9pt;
        color: #6b7280;
      }
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 10pt;
      line-height: 1.5;
      color: #1f2937;
      background: #ffffff;
    }
    
    .cover-page {
      padding: 40px 20px 20px 20px;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 90vh;
    }
    
    .sap-badge {
      display: inline-block;
      background: #0a6ed1;
      color: #ffffff;
      font-weight: 800;
      font-size: 14pt;
      padding: 4px 14px;
      border-radius: 4px;
      letter-spacing: 1px;
    }
    
    .doc-pill {
      display: inline-block;
      background: #e0f2fe;
      color: #0369a1;
      font-size: 8.5pt;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 12px;
      border: 1px solid #bae6fd;
      margin-left: 10px;
      vertical-align: middle;
    }
    
    .cover-title {
      font-size: 26pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.2;
      margin-top: 25px;
      margin-bottom: 12px;
    }
    
    .cover-subtitle {
      font-size: 13pt;
      color: #475569;
      font-weight: 500;
      line-height: 1.5;
      max-width: 650px;
      margin-bottom: 30px;
    }
    
    .cover-meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 18px 24px;
      margin-bottom: 30px;
    }
    
    .meta-item-label {
      font-size: 8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      margin-bottom: 2px;
    }
    
    .meta-item-value {
      font-size: 9.5pt;
      font-weight: 600;
      color: #0f172a;
    }
    
    .cover-highlights {
      background: #eff6ff;
      border-left: 4px solid #0a6ed1;
      padding: 16px 20px;
      border-radius: 0 8px 8px 0;
      margin-bottom: 30px;
    }
    
    .cover-highlights h4 {
      font-size: 10.5pt;
      color: #1e3a8a;
      margin-bottom: 8px;
    }
    
    .cover-highlights ul {
      list-style-type: square;
      padding-left: 18px;
      font-size: 9pt;
      color: #334155;
    }
    
    .cover-highlights li {
      margin-bottom: 4px;
    }
    
    .cover-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 14px;
      font-size: 8.5pt;
      color: #64748b;
      display: flex;
      justify-content: space-between;
    }
    
    h2 {
      font-size: 15pt;
      font-weight: 700;
      color: #0f172a;
      border-bottom: 2px solid #0a6ed1;
      padding-bottom: 6px;
      margin-top: 28px;
      margin-bottom: 12px;
      page-break-after: avoid;
    }
    
    h3 {
      font-size: 11.5pt;
      font-weight: 700;
      color: #1e293b;
      margin-top: 16px;
      margin-bottom: 8px;
      page-break-after: avoid;
    }
    
    p {
      margin-bottom: 10px;
      font-size: 9.5pt;
      color: #334155;
      text-align: justify;
    }
    
    ul, ol {
      margin-left: 20px;
      margin-bottom: 12px;
      font-size: 9.5pt;
      color: #334155;
    }
    
    li {
      margin-bottom: 4px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      margin-bottom: 16px;
      font-size: 8.5pt;
      page-break-inside: auto;
    }
    
    tr {
      page-break-inside: avoid;
      page-break-after: auto;
    }
    
    th {
      background: #0f172a;
      color: #ffffff;
      font-weight: 600;
      text-align: left;
      padding: 7px 10px;
      border: 1px solid #334155;
      font-size: 8.5pt;
    }
    
    td {
      padding: 6px 10px;
      border: 1px solid #e2e8f0;
      color: #334155;
      vertical-align: top;
    }
    
    tr:nth-child(even) td {
      background: #f8fafc;
    }
    
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
      font-size: 8.5pt;
      background: #f1f5f9;
      color: #0f172a;
      padding: 1px 4px;
      border-radius: 3px;
      border: 1px solid #e2e8f0;
    }
    
    pre {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 8pt;
      background: #0f172a;
      color: #f8fafc;
      padding: 10px 14px;
      border-radius: 6px;
      overflow-x: auto;
      margin-bottom: 12px;
      line-height: 1.4;
      page-break-inside: avoid;
    }
    
    .callout {
      border-left: 4px solid #0a6ed1;
      background: #f0f7ff;
      padding: 10px 14px;
      border-radius: 0 6px 6px 0;
      margin-bottom: 12px;
      font-size: 9pt;
      page-break-inside: avoid;
    }
    
    .callout.warn {
      border-left-color: #d97706;
      background: #fffbeb;
      color: #92400e;
    }
    
    .callout.alert {
      border-left-color: #dc2626;
      background: #fef2f2;
      color: #991b1b;
    }
    
    .callout.success {
      border-left-color: #059669;
      background: #f0fdf4;
      color: #065f46;
    }
    
    .tag {
      display: inline-block;
      font-size: 7.5pt;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .tag-impl { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
    .tag-sim { background: #fef3c7; color: #92400e; border: 1px solid #fde68a; }
    .tag-fut { background: #e0e7ff; color: #3730a3; border: 1px solid #c7d2fe; }
    .tag-none { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
    
    .script-step {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-left: 4px solid #0a6ed1;
      border-radius: 4px;
      padding: 10px 14px;
      margin-bottom: 12px;
      page-break-inside: avoid;
    }
    .script-step-header {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      font-size: 9.5pt;
      color: #0f172a;
      margin-bottom: 4px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 4px;
    }
    .step-time {
      color: #0a6ed1;
      font-family: monospace;
    }
    .script-sub {
      font-size: 8.5pt;
      color: #475569;
      margin-bottom: 4px;
    }
    .spoken-box {
      background: #f8fafc;
      border-left: 2px solid #64748b;
      padding: 6px 10px;
      font-style: italic;
      font-size: 8.5pt;
      color: #1e293b;
      margin-top: 6px;
    }
    
    .page-break {
      page-break-after: always;
    }
  </style>
</head>
<body>

  <!-- COVER PAGE -->
  <div class="cover-page">
    <div>
      <div>
        <span class="sap-badge">SAP</span>
        <span class="doc-pill">Enterprise Clean Core Reference Architecture</span>
      </div>
      
      <h1 class="cover-title">SAP Invoice Decision Intelligence</h1>
      <div class="cover-subtitle">
        End-to-End System Integration Architecture, Data Flow Verification, and Complete Demo Runbook Guide
      </div>
      
      <div class="cover-meta-grid">
        <div>
          <div class="meta-item-label">Document Version</div>
          <div class="meta-item-value">v2.4.0 (Enterprise Demonstration Edition)</div>
        </div>
        <div>
          <div class="meta-item-label">Target ERP Platform</div>
          <div class="meta-item-value">SAP S/4HANA Cloud Public Edition / Clean Core</div>
        </div>
        <div>
          <div class="meta-item-label">Runtime Layer</div>
          <div class="meta-item-value">Node.js Runtime & SAP BTP Cloud Foundry/Kyma</div>
        </div>
        <div>
          <div class="meta-item-label">Persistence Model</div>
          <div class="meta-item-value">Persistent File Store (JSON) via MockSourceDataStore</div>
        </div>
        <div>
          <div class="meta-item-label">Active Demo Profile</div>
          <div class="meta-item-value">Aarav Mehta (Business Owner · Corporate Services)</div>
        </div>
        <div>
          <div class="meta-item-label">Automated Test Verification</div>
          <div class="meta-item-value">59 Passed, 0 Failed (100% Operational)</div>
        </div>
      </div>
      
      <div class="cover-highlights">
        <h4>Key Operational Realities Documented Herein</h4>
        <ul>
          <li><strong>Zero Guesswork:</strong> Accurately documents what is fully implemented, what is simulated, and what represents future SAP BTP architecture.</li>
          <li><strong>Persistent Single Source-of-Truth:</strong> Explains how all 10 scenario invoices and master entities are persisted on-disk under <code>mock-data/</code>.</li>
          <li><strong>Human-in-the-Loop Governance:</strong> Documents the exact commercial approval workflow separating Business Owners from Accounts Payable.</li>
          <li><strong>SAP S/4HANA Settlement:</strong> Details simulated <code>MIRO</code> posting and <code>MIR7</code> parking with Payment Block Key R.</li>
          <li><strong>Minute-by-Minute Demo Script:</strong> Complete 7-to-10 minute verbal presentation guide with exact clicks and backup scenarios.</li>
        </ul>
      </div>
    </div>
    
    <div class="cover-footer">
      <div>Enterprise Architecture & Solution Engineering Team</div>
      <div>Confidential · For Internal Demo Preparation & Architecture Review</div>
    </div>
  </div>

  <!-- SECTION 1: EXECUTIVE OVERVIEW -->
  <h2>1. Executive Overview & Implementation Status</h2>
  <p>
    SAP Invoice Decision Intelligence is an enterprise decision orchestration layer designed to sit between multi-channel invoice intake and SAP S/4HANA. It eliminates manual cross-referencing by bringing Purchase Orders (POs), Goods Receipts (GRs), Quality Management (QM) inspection results, and statutory tax reconciliation into a single explainable decision workflow.
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Platform Component</th>
        <th style="width: 20%;">Current Status</th>
        <th style="width: 55%;">Technical Mechanism & Implementation Reality</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Web Frontend & Navigation</strong></td>
        <td><span class="tag tag-impl">IMPLEMENTED</span></td>
        <td>Pure SAP Fiori Horizon Enterprise Design System in HTML5/Vanilla JavaScript. Zero external UI dependencies, zero emojis, scalable SVG iconography.</td>
      </tr>
      <tr>
        <td><strong>Authentication Flow</strong></td>
        <td><span class="tag tag-sim">SIMULATED</span></td>
        <td>Controlled single-profile demo login (<code>Aarav Mehta</code>, Business Owner, Corporate Services). Session state preserved via browser <code>sessionStorage</code>.</td>
      </tr>
      <tr>
        <td><strong>Intake Gateways (Scan/Email/IRP)</strong></td>
        <td><span class="tag tag-sim">SIMULATED</span></td>
        <td>Simulates OCR scanning, AP mailbox MIME ingestion, and statutory 64-char IRN payload verification via dedicated intake adapters.</td>
      </tr>
      <tr>
        <td><strong>Data Persistence</strong></td>
        <td><span class="tag tag-impl">IMPLEMENTED</span></td>
        <td>Persistent on-disk JSON store (<code>MockSourceDataStore</code>) under <code>mock-data/</code>. State changes survive server restarts.</td>
      </tr>
      <tr>
        <td><strong>Conventional Database</strong></td>
        <td><span class="tag tag-none">NOT IMPLEMENTED</span></td>
        <td>No SAP HANA Cloud or relational SQL database is currently connected; storage is structured JSON file I/O.</td>
      </tr>
      <tr>
        <td><strong>Decision Intelligence Engine</strong></td>
        <td><span class="tag tag-impl">IMPLEMENTED</span></td>
        <td>Deterministic explainable rules & heuristics engine (<code>AIDecisionEngine.ts</code>) computing signal impact weights, confidence (10–100%), and risk tiers.</td>
      </tr>
      <tr>
        <td><strong>Live Neural / LLM Models</strong></td>
        <td><span class="tag tag-fut">PLANNED (FUTURE)</span></td>
        <td>No live LLM API is invoked; evaluation logic uses auditable, deterministic SAP heuristics adhering to financial compliance standards.</td>
      </tr>
      <tr>
        <td><strong>SAP S/4HANA Connectivity</strong></td>
        <td><span class="tag tag-sim">SIMULATED</span></td>
        <td><code>MockSAPAdapter</code> simulates S/4HANA master data (<code>LFA1</code>, <code>EKKO</code>, <code>MSEG</code>, <code>QALS</code>) and transaction settlement (<code>MIRO</code> / <code>MIR7</code>).</td>
      </tr>
      <tr>
        <td><strong>Statutory GST Portal</strong></td>
        <td><span class="tag tag-sim">SIMULATED</span></td>
        <td><code>GSTReconciliationService</code> simulates auto-drafted GSTR-2B statement matching against Section 16(2)(aa) rules.</td>
      </tr>
    </tbody>
  </table>

  <!-- SECTION 2: HOW TO RUN FROM ZERO -->
  <h2>2. How to Run the Project from Zero</h2>
  <p>Follow these exact commands on the Windows operating system to launch and verify the platform:</p>

  <div class="callout">
    <strong>Windows Execution Note:</strong> PowerShell execution policy may restrict <code>npm.ps1</code>. Always run npm through <code>cmd.exe /c</code> or directly in Command Prompt.
  </div>

  <p><strong>Step 1: Open Terminal & Navigate to Project Root</strong></p>
  <pre>cd /d "C:\\projects\\SAP Invoice Decision Intelligence"</pre>

  <p><strong>Step 2: Install Dependencies</strong></p>
  <pre>cmd.exe /c "npm install"</pre>

  <p><strong>Step 3: Compile TypeScript & Copy Assets</strong></p>
  <pre>cmd.exe /c "npm run build"</pre>

  <p><strong>Step 4: Execute Test Suite to Confirm Operational Health (59 Tests)</strong></p>
  <pre>cmd.exe /c "npm run test:ts"</pre>
  <p style="font-size: 8.5pt; color: #059669; font-weight: 600;">Expected Output: "TEST RESULTS: 59 PASSED, 0 FAILED"</p>

  <p><strong>Step 5: Start the Enterprise Server</strong></p>
  <pre>cmd.exe /c "npm run start"</pre>
  <p>The console will output the startup banner:</p>
  <pre>=================================================================
  SAP INVOICE DECISION INTELLIGENCE — RUNNING
  URL: http://localhost:3000
  Target Architecture: SAP BTP & SAP S/4HANA (Clean Core)
  Mode: SAP DEMO MODE (ON)
=================================================================</pre>

  <p><strong>Step 6: Open Browser</strong></p>
  <p>Navigate to <code>http://localhost:3000</code>. The SAP Invoice Decision Intelligence Product Landing Page will render.</p>

  <!-- SECTION 3: PRE-DEMO CHECKLIST -->
  <h2>3. First 5 Minutes Pre-Demo Checklist</h2>
  <ul style="list-style-type: none; margin-left: 0;">
    <li>[ ] <strong>Directory:</strong> Working inside <code>C:\\projects\\SAP Invoice Decision Intelligence</code>.</li>
    <li>[ ] <strong>Build:</strong> <code>npm run build</code> completed cleanly with zero TypeScript compiler errors.</li>
    <li>[ ] <strong>Port 3000:</strong> Confirmed available and bound to the Node server process.</li>
    <li>[ ] <strong>Browser Navigation:</strong> <code>http://localhost:3000</code> opens the product landing page.</li>
    <li>[ ] <strong>Login Verified:</strong> Clicked <em>Sign In</em> -&gt; Verified mock profile card for <em>Aarav Mehta</em>.</li>
    <li>[ ] <strong>Data Reset:</strong> Clicked <em>Reset Demo</em> in header to ensure all 10 invoices are in factory baseline state.</li>
    <li>[ ] <strong>Gateways Inspected:</strong> Verified 4 Physical, 5 Email, and 1 E-Invoice records in Inbound Portals.</li>
  </ul>

  <div class="page-break"></div>

  <!-- SECTION 4: INVOICE INTAKE & STORAGE -->
  <h2>4. The Three Invoice Intake Channels & Storage Architecture</h2>
  <p>
    The platform ingests vendor documents across three operational channels and normalizes them into a single canonical invoice structure:
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 20%;">Channel</th>
        <th style="width: 25%;">On-Disk Storage Location</th>
        <th style="width: 15%;">Record Count</th>
        <th style="width: 40%;">Simulated Gateway Characteristics</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Physical Scan</strong></td>
        <td><code>mock-data/invoices/physical/</code></td>
        <td>4 Invoices</td>
        <td>Simulates plant security gate / mailroom flatbed scanning. Captures scanner location, DPI, and OCR metadata.</td>
      </tr>
      <tr>
        <td><strong>Email Inbound</strong></td>
        <td><code>mock-data/invoices/email/</code></td>
        <td>5 Invoices</td>
        <td>Simulates AP mailbox parser (<code>invoices@enterprise.com</code>). Captures sender, subject, message-ID, and PDF attachments.</td>
      </tr>
      <tr>
        <td><strong>E-Invoice (IRP)</strong></td>
        <td><code>mock-data/invoices/einvoice/</code></td>
        <td>1 Invoice</td>
        <td>Simulates statutory B2B electronic invoice push. Validates 64-char IRN hash, ack number, and 48-hour SLA window.</td>
      </tr>
    </tbody>
  </table>

  <h3>Data Persistence Architecture</h3>
  <p>
    Unlike early prototypes that relied on transient in-memory arrays, every invoice now resides in an atomic JSON file. The data access service (<code>MockSourceDataStore.ts</code>) enforces direct read/write persistence:
  </p>
  <pre>Client Action (Approve / Reject / Post / Park)
  │
  ▼
POST /api/invoices/:id/validate  (or /post, /park)
  │
  ▼
InvoiceRepository.submitBusinessValidation() / SAPPostingService
  │
  ▼
MockSourceDataStore.saveInvoice(invoice)
  │
  ▼
Overwrites: mock-data/invoices/{channel}/INV-2026-XXXXX.json
  │
  ▼
Server Process Restart -> File re-read -> State PRESERVED across restarts</pre>

  <!-- SECTION 5: THREE-WAY MATCHING & LIV TOLERANCE KEYS -->
  <h2>5. Three-Way Matching & SAP LIV Tolerance Keys</h2>
  <p>
    Reconciliation is performed in <code>ThreeWayReconciliationService.ts</code> against standard SAP Logistics Invoice Verification (LIV) tolerance settings:
  </p>
  <ul>
    <li><strong>Tolerance Key DQ (Quantity Variance):</strong> Compares billed quantity against cumulative Goods Receipt quantity in SAP table <code>MSEG</code>. If Invoiced &gt; Received, status flags <code>OVER_DELIVERY</code> (Scenario 2).</li>
    <li><strong>Tolerance Key PP (Price Variance):</strong> Compares invoiced net unit price against agreed PO unit price (<code>EKPO</code>). The enterprise threshold is set at <strong>2.0%</strong>. If exceeded, flags <code>EXCEEDED_TOLERANCE</code> (Scenario 5).</li>
    <li><strong>SAP Quality Inspection Lots (<code>QALS</code>):</strong> Confirms whether delivered units passed plant QA. If inspection lots record transit defects or rejected units, payment block <code>R</code> is enforced (Scenario 6).</li>
    <li><strong>SAP Duplicate Invoice Index (<code>RBKP/BSIP</code>):</strong> Cross-references <code>Supplier + Invoice Number + Fiscal Year</code>. Flagged duplicates trigger an automatic critical <code>HOLD</code> (Scenario 7).</li>
  </ul>

  <!-- SECTION 6: COMPLETE SCENARIO MATRIX -->
  <h2>6. Complete 10 Enterprise Scenario Catalog</h2>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Invoice ID</th>
        <th>Source</th>
        <th>Supplier</th>
        <th>Amount</th>
        <th>PO Ref</th>
        <th>Condition / Discrepancy</th>
        <th>Recommendation</th>
        <th>Risk</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1</strong></td>
        <td><code>INV-2026-00001</code></td>
        <td>Physical</td>
        <td>Schneider Electric</td>
        <td>₹59,000</td>
        <td><code>4500012456</code></td>
        <td>100% Exact 3-Way Match; Pre-approved</td>
        <td><code>AUTO_PROCEED</code></td>
        <td>LOW</td>
      </tr>
      <tr>
        <td><strong>2</strong></td>
        <td><code>INV-2026-00002</code></td>
        <td>Physical</td>
        <td>Siemens India</td>
        <td>₹1,41,600</td>
        <td><code>4500012500</code></td>
        <td>Invoiced 100 EA vs 90 EA Received (DQ breach)</td>
        <td><code>MANUAL_REVIEW</code></td>
        <td>MEDIUM</td>
      </tr>
      <tr>
        <td><strong>3</strong></td>
        <td><code>INV-2026-00003</code></td>
        <td>Email</td>
        <td>Bharti Airtel</td>
        <td>₹88,500</td>
        <td><em>Non-PO</em></td>
        <td>Recurring Leased Line -&gt; Cost Center CC-1020</td>
        <td><code>NON_PO_PROCESS</code></td>
        <td>LOW</td>
      </tr>
      <tr>
        <td><strong>4</strong></td>
        <td><code>INV-2026-00004</code></td>
        <td>Email</td>
        <td>Apex Facility</td>
        <td>₹1,00,300</td>
        <td><code>4500012600</code></td>
        <td>PO issued to Siemens, billed by Apex Facility</td>
        <td><code>HOLD</code></td>
        <td>CRITICAL</td>
      </tr>
      <tr>
        <td><strong>5</strong></td>
        <td><code>INV-2026-00005</code></td>
        <td>Email</td>
        <td>TCS</td>
        <td>₹1,35,700</td>
        <td><code>4500012750</code></td>
        <td>Invoiced ₹1,150/hr vs PO ₹1,000/hr (+15% PP breach)</td>
        <td><code>MANUAL_REVIEW</code></td>
        <td>MEDIUM</td>
      </tr>
      <tr>
        <td><strong>6</strong></td>
        <td><code>INV-2026-00006</code></td>
        <td>Physical</td>
        <td>Wipro Enterprises</td>
        <td>₹2,95,000</td>
        <td><code>4500012800</code></td>
        <td>5 HEPA Filters rejected in SAP QM lot</td>
        <td><code>HOLD</code></td>
        <td>HIGH</td>
      </tr>
      <tr>
        <td><strong>7</strong></td>
        <td><code>INV-2026-00007</code></td>
        <td>Email</td>
        <td>AWS India</td>
        <td>₹4,01,200</td>
        <td><code>4500012850</code></td>
        <td>Duplicate submission of posted BELNR 5105600101</td>
        <td><code>HOLD</code></td>
        <td>CRITICAL</td>
      </tr>
      <tr>
        <td><strong>8</strong></td>
        <td><code>INV-2026-00008</code></td>
        <td>E-Invoice</td>
        <td>Schneider Electric</td>
        <td>₹9,97,100</td>
        <td><code>4500012900</code></td>
        <td>Statutory 64-char IRN; 48h SLA countdown</td>
        <td><code>VALIDATION_REQ</code></td>
        <td>MEDIUM</td>
      </tr>
      <tr>
        <td><strong>9</strong></td>
        <td><code>INV-2026-00009</code></td>
        <td>Email</td>
        <td>Infosys Limited</td>
        <td>₹5,31,000</td>
        <td><code>4500012920</code></td>
        <td>Billed ₹4.5L internally vs ₹3.8L in GSTR-2B</td>
        <td><code>MANUAL_REVIEW</code></td>
        <td>HIGH</td>
      </tr>
      <tr>
        <td><strong>10</strong></td>
        <td><code>INV-2026-00010</code></td>
        <td>Physical</td>
        <td>Apex Facility</td>
        <td>₹1,47,500</td>
        <td><code>4500012950</code></td>
        <td>Requisitioner disputed substandard service</td>
        <td><code>REJECT</code></td>
        <td>HIGH</td>
      </tr>
    </tbody>
  </table>

  <div class="page-break"></div>

  <!-- SECTION 7: LIVE DEMO OPERATOR SCRIPT -->
  <h2>7. Recommended 7-Minute Live Demonstration Script</h2>
  <p>Follow this exact script when presenting to leadership, clients, or evaluators:</p>

  <div class="script-step">
    <div class="script-step-header">
      <span>Phase 1: Product Landing Page & Problem Context</span>
      <span class="step-time">0:00 - 1:15</span>
    </div>
    <div class="script-sub"><strong>Action:</strong> Open <code>http://localhost:3000</code>. Scroll down past Hero, Intake Gateways, and Validation Pipeline.</div>
    <div class="spoken-box">
      "In enterprise environments running SAP, vendor invoices enter through three disconnected channels: paper bills at factory gates, PDF attachments in AP mailboxes, and statutory electronic invoices. Accounts Payable clerks spend hours manually hunting down POs, checking goods receipts, and chasing department managers over email. SAP Invoice Decision Intelligence unifies intake on SAP BTP and cross-checks documents against SAP business context before Finance touches them."
    </div>
  </div>

  <div class="script-step">
    <div class="script-step-header">
      <span>Phase 2: Single-Profile Login</span>
      <span class="step-time">1:15 - 2:00</span>
    </div>
    <div class="script-sub"><strong>Action:</strong> Click <em>Sign In</em> -&gt; Click <em>Continue as Aarav Mehta</em> (Business Owner, Corporate Services).</div>
    <div class="spoken-box">
      "We sign in under our designated enterprise persona: Aarav Mehta, Business Owner for Corporate Services. In this architecture, business owners only see invoices impacting their direct requisitions, maintaining clean segregation of duties and zero inbox clutter."
    </div>
  </div>

  <div class="script-step">
    <div class="script-step-header">
      <span>Phase 3: Multi-Channel Gateways & The Hero Invoice</span>
      <span class="step-time">2:00 - 3:45</span>
    </div>
    <div class="script-sub"><strong>Action:</strong> Click <em>Inbound Portals</em>. Click <em>Government E-Invoice / IRP</em>. Find <code>INV-2026-00008</code> (Schneider Electric Smart PDUs, ₹9,97,100). Click <em>Inspect in Decision Center</em>.</div>
    <div class="spoken-box">
      "Here in our Government E-Invoice gateway is invoice INV-2026-00008. Notice the 64-character IRN hash and active 48-Hour Statutory SLA countdown. Three-way matching is completely clean: 20 PDUs ordered, 20 received at the plant, and 20 passed QA calibration. But because this is a statutory e-invoice, the system requires positive business owner sign-off rather than blind auto-posting."
    </div>
  </div>

  <div class="script-step">
    <div class="script-step-header">
      <span>Phase 4: Business Validation & Real-Time AI Upgrading</span>
      <span class="step-time">3:45 - 5:00</span>
    </div>
    <div class="script-sub"><strong>Action:</strong> In right-hand panel, click green <em>Accept</em> button. Enter reason: <code>Commercial delivery confirmed for DC expansion</code>. Click <em>Confirm Decision</em>.</div>
    <div class="spoken-box">
      "With one click, Aarav confirms commercial delivery. Notice what just happened: The decision engine incorporates the human validation signal, re-evaluates the invoice in real-time, and upgrades the recommendation to AUTO_PROCEED with a 95% Confidence Score. It is now cleared for financial posting."
    </div>
  </div>

  <div class="script-step">
    <div class="script-step-header">
      <span>Phase 5: Financial Settlement & Audit Traceability</span>
      <span class="step-time">5:00 - 6:30</span>
    </div>
    <div class="script-sub"><strong>Action:</strong> Click <em>Post to SAP S/4HANA (MIRO)</em>. Show green toast with document <code>5105600121/2026</code>. Click <em>Integration Monitor</em> to show outbound payload. Click <em>Audit Trail</em> to show immutable event history.</div>
    <div class="spoken-box">
      "Finance executes automated settlement. The system executes SAP transaction MIRO, generating official Accounting Document Number 5105600121. The Integration Monitor confirms outbound delivery to S/4HANA, and the Audit Trail locks down the approver, timestamp, and justification for statutory inspection."
    </div>
  </div>

  <!-- SECTION 8: LIVE DEMO Q&A -->
  <h2>8. Live Demo Q&A (Answers to Difficult Questions)</h2>
  
  <p><strong>Q: Is this connected to a live SAP system right now?</strong></p>
  <div class="spoken-box">
    "In this reference environment, the SAP backend is simulated using high-fidelity SAP S/4HANA data structures (LFA1, EKKO, MSEG, QALS). The service boundaries follow SAP Clean Core guidelines, allowing immediate binding to SAP BTP Destination Service and standard S/4HANA OData APIs without changing any UI or workflow code."
  </div>

  <p><strong>Q: Are we using a database like SAP HANA Cloud or Postgres?</strong></p>
  <div class="spoken-box">
    "No. The current demo uses a file-system-backed single-source-of-truth in mock-data/ managed by MockSourceDataStore. State changes write to persistent JSON files, surviving process restarts without requiring heavyweight database infrastructure."
  </div>

  <p><strong>Q: Is there an actual AI model or LLM running?</strong></p>
  <div class="spoken-box">
    "The decision intelligence engine is an explainable heuristic system (AIDecisionEngine.ts) that computes deterministic impact scores based on ERP tolerance keys. This provides 100% auditability for Finance. On our roadmap, generative AI on SAP AI Core will assist with summarizing vendor dispute correspondence."
  </div>

  <p><strong>Q: Why does the Business Owner approve before Finance?</strong></p>
  <div class="spoken-box">
    "Finance knows GL accounts, but only the business requisitioner knows if the air conditioning duct was cleaned properly or if consulting hours were delivered. Bringing business confirmation into the loop upfront eliminates post-payment credit memo disputes."
  </div>

  <div class="cover-footer" style="margin-top: 40px;">
    <div>SAP Invoice Decision Intelligence · End-to-End Integration & Demo Runbook Guide</div>
    <div>C:\\projects\\SAP Invoice Decision Intelligence</div>
  </div>

</body>
</html>
"""

    temp_html_path = os.path.abspath("temp_demo_guide.html")
    with open(temp_html_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    
    print(f"Temporary styled HTML saved to: {temp_html_path}")
    
    output_pdf_path = os.path.abspath(r"C:\Users\ali\Downloads\SAP_Invoice_Decision_Intelligence_Integration_and_Demo_Guide.pdf")
    
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    if not os.path.exists(chrome_path):
        chrome_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    
    print(f"Using browser executable: {chrome_path}")
    print(f"Target PDF destination: {output_pdf_path}")
    
    cmd = [
        chrome_path,
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        f"--print-to-pdf={output_pdf_path}",
        temp_html_path
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0 and os.path.exists(output_pdf_path):
        size_kb = os.path.getsize(output_pdf_path) / 1024
        print(f"SUCCESS: Generated PDF at {output_pdf_path} ({size_kb:.1f} KB)")
    else:
        print(f"ERROR: Return code {result.returncode}")
        print("Stdout:", result.stdout)
        print("Stderr:", result.stderr)
        sys.exit(1)
        
    if os.path.exists(temp_html_path):
        os.remove(temp_html_path)
        print("Cleaned up temporary HTML file.")

if __name__ == "__main__":
    main()
