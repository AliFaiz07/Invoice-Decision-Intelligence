# Setup, Installation & Running the Application

This chapter provides step-by-step instructions for running Invoice Decision Intelligence locally, executing the test suite, and verifying environment health.

---

## 1. System Requirements & Prerequisites

Ensure the following runtimes and tools are installed on your host machine:

| Component | Minimum Version | Recommended | Notes |
|---|---|---|---|
| **Node.js** | `v18.0.0+` | `v20.x` or `v22.x LTS` | Verifiable via `node -v` |
| **npm** | `v9.0.0+` | `v10.x+` | Included with Node.js |
| **TypeScript** | `v5.0.0+` | `v5.7.2` | Included in project `devDependencies` |
| **Web Browser** | Any modern standard | Google Chrome, Edge, Safari, Firefox | Resolution: 1440×900 or higher recommended |
| **Git** | `v2.30+` | Latest | For version control and fixture management |

---

## 2. Directory Layout & Key Files

```text
SAP Invoice Decision Intelligence/
├── dist/                      # Compiled JavaScript server and assets
├── docs/                      # Architectural guides, scenario specifications, and user manual
│   └── user-manual/           # Complete user manual modules
├── mock-data/                 # Master data fixtures & inbound source files
│   ├── business-owners/       # Departmental approver master data
│   ├── goods-receipts/        # Material documents (MSEG / MATDOC)
│   ├── gst/                   # Auto-drafted GSTR-2B tax statements
│   ├── inbound/               # Physical PDFs, Email EMLs, and Government IRP JSONs
│   ├── invoices/              # Canonical invoice baseline fixtures
│   ├── purchase-orders/       # S/4HANA PO master data (EKKO / EKPO)
│   ├── quality/               # SAP QM inspection lot records (QALS)
│   └── vendors/               # SAP Business Partners (LFA1 / BUT000)
├── src/                       # TypeScript source codebase
│   ├── app/                   # Express routes and REST controllers
│   ├── data/                  # In-memory mock data repositories
│   ├── integrations/          # Intake adapters & SAP ERP integration layer
│   ├── models/                # TypeScript domain models and interfaces
│   ├── public/                # Web frontend (HTML, CSS, JS, branding assets)
│   ├── services/              # AI Decision Engine, LIV matching, and posting services
│   ├── tests/                 # End-to-end regression test suite
│   └── server.ts              # Application bootstrap entry point
├── package.json               # NPM scripts and dependency manifests
└── tsconfig.json              # TypeScript compilation configuration
```

---

## 3. Installation Steps

Open a terminal (PowerShell, Command Prompt, or Bash) in the project root directory:

```bash
cd "C:\projects\SAP Invoice Decision Intelligence"
```

Install all required production and development dependencies:

```bash
npm install
```

---

## 4. Environment Variables Configuration

The application operates in **SAP Demo Mode** by default. You can configure options via environment variables or an optional `.env` file:

| Variable | Default Value | Allowed Values | Description |
|---|---|---|---|
| `PORT` | `3000` | Any valid port number | HTTP listening port for Express web server |
| `DEMO_MODE` | `true` | `true`, `false` | Enables offline simulation with golden master fixtures |
| `SAP_DESTINATION` | *(empty)* | URL string | SAP BTP destination endpoint (for live S/4HANA mode) |
| `LOG_LEVEL` | `info` | `debug`, `info`, `warn`, `error` | Console logger verbosity |

---

## 5. Building the Application

The build script compiles TypeScript files to `dist/` and copies all static public assets (HTML, CSS, JavaScript, logos, and favicons) to `dist/public`:

```bash
npm run build
```

Expected output:
```text
> tsc && xcopy /E /I /Y src\public dist\public
src\public\index.html
src\public\assets\favicon-32x32.png
src\public\assets\favicon.png
src\public\assets\idi-logo-full.png
src\public\assets\idi-logo-mark.png
src\public\assets\idi-logo-original.png
src\public\assets\joule-mark.png
src\public\css\fiori-horizon.css
src\public\js\app.js
9 File(s) copied
```

---

## 6. Running the Application

### Option A: Running the Production Build (Recommended)

```bash
node dist/server.js
```
*(or `npm start`)*

Expected console output:
```text
=================================================================
  INVOICE DECISION INTELLIGENCE — RUNNING
  URL: http://localhost:3000
  Target Architecture: SAP BTP & SAP S/4HANA (Clean Core)
  Mode: SAP DEMO MODE (ON)
=================================================================
```

### Option B: Running in Development Mode

```bash
npm run dev
```
Runs the server directly from TypeScript using `ts-node`.

---

## 7. Running the Automated Test Suite

Invoice Decision Intelligence includes an automated regression test suite covering all 9 operational test groups and 138 test assertions:

```bash
npm run test:ts
```

Expected test result:
```text
=================================================================
  TEST RESULTS: 138 PASSED, 0 FAILED
=================================================================
```

> [!IMPORTANT]
> Because `npm run test:ts` simulates realistic invoice posting and validation workflows, it modifies the working copy of `mock-data/`.
> **Always restore the golden master fixtures after running tests:**
> ```bash
> git restore mock-data
> ```

---

## 8. Verifying Environment Health

1. Open your browser and navigate to:
   [http://localhost:3000/api/health](http://localhost:3000/api/health)
2. You should see a JSON health response:
   ```json
   {
     "status": "UP",
     "system": "Invoice Decision Intelligence Layer",
     "mode": "DEMO_MODE",
     "platform": "SAP Business Technology Platform (Cloud Foundry / Kyma)",
     "targetERP": "SAP S/4HANA Cloud Public Edition 2023",
     "timestamp": "2026-10-09T07:30:00.000Z"
   }
   ```
3. Navigate to the frontend root:
   [http://localhost:3000](http://localhost:3000)
4. The **Invoice Decision Intelligence** product landing page should load immediately with the official product logo mark and top navigation bar.
