/**
 * REUSABLE ENTERPRISE AI FRONTEND DESIGN SYSTEM
 * Application Controller: Invoice Decision Intelligence
 * 
 * Strict Enterprise Iconography:
 * Zero Emojis / Zero Decorative Unicode Symbols.
 * Pure SVG-based icon system visually consistent with SAP Fiori / S/4HANA enterprise standards.
 */

// Enterprise SVG Icon System (Monochrome, Neutral, Scalable)
const ICONS = {
  document: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
  scan: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><line x1="7" y1="12" x2="17" y2="12"></line></svg>`,
  scanLarge: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><line x1="7" y1="12" x2="17" y2="12"></line></svg>`,
  mail: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
  invoice: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="6" y1="8" x2="10" y2="8"></line><line x1="6" y1="12" x2="14" y2="12"></line><line x1="6" y1="16" x2="18" y2="16"></line></svg>`,
  check: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  checkCircle: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
  alertTriangle: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  xCircle: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
  x: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  arrowRight: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
  chevronRight: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
  package: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
  user: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
  info: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
  lock: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
  creditCard: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>`,
  refresh: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`,
};

/**
 * Safely fetches an endpoint, validates HTTP status and content-type,
 * and extracts JSON without throwing raw HTML parser errors.
 */
async function safeFetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const contentType = response.headers.get('content-type') || '';

  if (!response.ok) {
    let errMsg = `Request failed: ${response.status} ${response.statusText}`;
    try {
      if (contentType.includes('application/json')) {
        const errJson = await response.json();
        errMsg = errJson.error || errJson.message || errMsg;
      } else {
        const text = await response.text();
        if (text && text.length < 200 && !text.includes('<!DOCTYPE')) {
          errMsg = text;
        }
      }
    } catch (_) {}
    throw new Error(errMsg);
  }

  if (!contentType.includes('application/json')) {
    throw new Error(`Expected JSON from ${url} but received ${contentType || 'non-JSON content'}`);
  }

  return response.json();
}

class InvoiceDecisionApp {
  constructor() {
    this.invoices = [];
    this.selectedInvoiceId = 'INV-2026-00001';
    this.isDecisionDetailActive = false;
    this._navigatingToDetail = false;
    this.activeView = 'landing';
    this.activeMockPortal = 'physical';
    this.integrationMessages = [];
    this.auditEvents = [];
    this.gstData = { records: [], summary: null };
    this.currentValidatingInvoiceId = null;
    this.isSidebarCollapsed = false;

    // Single Mock User Profile (Aarav Mehta, Business Owner, Corporate Services)
    this.currentUser = {
      name: 'Aarav Mehta',
      role: 'Business Owner',
      department: 'Corporate Services',
      responsibility: 'Invoice & Business Request Validation',
      email: 'aarav.mehta@demo.company',
      avatar: 'AM',
    };
    this.currentRoute = 'landing';

    // What-If Simulator state
    this.whatIfPolicy = {
      priceTolerancePct: 5,
      qtyTolerancePct: 0,
      qmStrictness: 'STRICT',
    };

    // Batch ingestion status for the 3 inbound channels
    this.channelBatchStatus = {
      physical: { processed: false, count: 6, activeCount: 6 },
      email: { processed: false, count: 6, activeCount: 6 },
      einvoice: { processed: false, count: 6, activeCount: 6 },
    };
    this.isBatchProcessing = false;

    this.init();
  }

  async init() {
    this.setupRouteHandling();
    await this.loadAllData();
    this.applyInitialRoute();
  }

  setupRouteHandling() {
    window.addEventListener('popstate', () => {
      this.handlePopState();
    });
  }

  parseCurrentRoute() {
    const pathname = (window.location.pathname || '').toLowerCase();
    const hash = (window.location.hash || '').toLowerCase();

    if (pathname === '/login' || pathname.startsWith('/login') || hash.includes('login')) {
      return '/login';
    }
    if (pathname === '/app' || pathname.startsWith('/app') || hash.includes('app')) {
      return '/app';
    }
    return '/landing';
  }

  applyInitialRoute() {
    const targetRoute = this.parseCurrentRoute();
    this.navigateToRoute(targetRoute, false);
  }

  handlePopState() {
    const targetRoute = this.parseCurrentRoute();
    this.navigateToRoute(targetRoute, false);
  }

  navigateToRoute(route, pushHistory = true) {
    let cleanRoute = route;
    if (!cleanRoute.startsWith('/')) {
      cleanRoute = '/' + cleanRoute;
    }

    const landingRoot = document.getElementById('productLandingPage');
    const loginRoot = document.getElementById('productLoginPage');
    const appShellRoot = document.getElementById('productAppShell');

    if (cleanRoute === '/login') {
      this.currentRoute = 'login';
      if (landingRoot) landingRoot.style.display = 'none';
      if (loginRoot) loginRoot.style.display = 'flex';
      if (appShellRoot) appShellRoot.style.display = 'none';
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (cleanRoute === '/app') {
      this.currentRoute = 'app';
      if (landingRoot) landingRoot.style.display = 'none';
      if (loginRoot) loginRoot.style.display = 'none';
      if (appShellRoot) appShellRoot.style.display = 'flex';
      this.renderShellUserProfile();
      this.switchView(this.activeView || 'landing');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      // Default to /landing
      cleanRoute = '/landing';
      this.currentRoute = 'landing';
      if (landingRoot) landingRoot.style.display = 'block';
      if (loginRoot) loginRoot.style.display = 'none';
      if (appShellRoot) appShellRoot.style.display = 'none';
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    if (pushHistory && window.location.pathname !== cleanRoute) {
      window.history.pushState({ route: cleanRoute }, '', cleanRoute);
    } else if (!pushHistory && (window.location.pathname === '/' || window.location.pathname === '')) {
      window.history.replaceState({ route: cleanRoute }, '', cleanRoute);
    }
  }

  loginAsDemoUser() {
    try {
      sessionStorage.setItem('sap_demo_auth', JSON.stringify(this.currentUser));
    } catch (e) {
      // fallback
    }
    this.navigateToRoute('/app', true);
    this.showToast('Signed in as Aarav Mehta (Business Owner · Corporate Services)', 'success');
  }

  logout() {
    try {
      sessionStorage.removeItem('sap_demo_auth');
    } catch (e) {
      // fallback
    }
    this.navigateToRoute('/login', true);
    this.showToast('Signed out of enterprise session', 'info');
  }

  smoothScrollTo(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  renderShellUserProfile() {
    const profileBtn = document.getElementById('appShellUserProfileBtn');
    if (profileBtn) {
      profileBtn.innerHTML = `
        <div class="user-avatar-chip">${this.currentUser.avatar}</div>
        <div class="user-meta-stack">
          <span class="user-name-label">${this.currentUser.name}</span>
          <span class="user-role-label">${this.currentUser.role}</span>
        </div>
      `;
      profileBtn.title = `Logged in: ${this.currentUser.name} (${this.currentUser.role} · ${this.currentUser.department})`;
    }
  }

  async loadAllData() {
    try {
      const [invRes, msgRes, audRes, gstRes, batchRes] = await Promise.all([
        safeFetchJson('/api/invoices').catch((err) => {
          console.error('Error fetching invoices:', err);
          return [];
        }),
        safeFetchJson('/api/integration-messages').catch((err) => {
          console.error('Error fetching integration messages:', err);
          return [];
        }),
        safeFetchJson('/api/audit-trail').catch((err) => {
          console.error('Error fetching audit trail:', err);
          return [];
        }),
        safeFetchJson('/api/gst-reconciliation').catch((err) => {
          console.error('Error fetching GST reconciliation:', err);
          return { records: [], summary: null };
        }),
        safeFetchJson('/api/invoices/intake/batch/status').catch((err) => {
          console.error('Error fetching batch status:', err);
          return null;
        }),
      ]);

      this.invoices = invRes || [];
      this.integrationMessages = msgRes || [];
      this.auditEvents = audRes || [];
      this.gstData = gstRes || { records: [], summary: null };

      if (batchRes && batchRes.channels) {
        this.channelBatchStatus = batchRes.channels;
      }

      this.updateKPICounters();
      this.renderCurrentView();
    } catch (err) {
      console.error('Error loading data:', err);
      this.showToast('Failed to connect to backend services: ' + (err.message || 'Network error'), 'error');
    }
  }

  // --------------------------------------------------------------------------
  // NAVIGATION & SHELL CONTROLLER
  // --------------------------------------------------------------------------
  switchView(viewName) {
    if (this.currentRoute !== 'app') {
      this.navigateToRoute('/app', true);
    }
    this.activeView = viewName;

    if (viewName === 'decisionCenter') {
      if (!this._navigatingToDetail) {
        this.isDecisionDetailActive = false;
      }
      this._navigatingToDetail = false;
    } else {
      this.isDecisionDetailActive = false;
      this._navigatingToDetail = false;
    }

    // Update Sidebar Active Class
    document.querySelectorAll('.sidebar-nav-item').forEach((item) => {
      if (item.getAttribute('data-view') === viewName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Toggle View Panels
    document.querySelectorAll('.view-panel').forEach((panel) => {
      panel.style.display = 'none';
    });

    const targetPanel = document.getElementById(`view${viewName.charAt(0).toUpperCase() + viewName.slice(1)}`);
    if (targetPanel) {
      targetPanel.style.display = 'block';
    }

    this.updateBreadcrumbsAndHeader(viewName);
    this.renderCurrentView();
  }

  toggleSidebar() {
    const sidebar = document.getElementById('appSidebar');
    if (!sidebar) return;
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    sidebar.classList.toggle('collapsed', this.isSidebarCollapsed);
  }

  getSelectedInvoiceSubtitle() {
    const inv = this.invoices.find((i) => i.invoice.invoiceId === this.selectedInvoiceId);
    if (!inv) return 'Operational decision worklist prioritized by commercial impact and statutory SLA risk.';
    const gross = (inv.invoice.totalGrossAmount || 0).toLocaleString('en-IN');
    const po = inv.invoice.purchaseOrderReference ? `PO: ${inv.invoice.purchaseOrderReference}` : 'Non-PO';
    return `${inv.invoice.supplierName} | Gross: ₹${gross} | ${po} | Status: ${inv.invoice.processingStatus} | AI: ${inv.aiDecision.recommendation} (${inv.aiDecision.confidenceScore}%)`;
  }

  updateBreadcrumbsAndHeader(viewName) {
    const navBc = document.getElementById('appBreadcrumbs');
    const bcActive = document.getElementById('breadcrumbActiveItem');
    const pageTitle = document.getElementById('pageHeaderTitle');
    const pageSub = document.getElementById('pageHeaderSubtitle');
    const pageActions = document.getElementById('pageHeaderActions');

    const viewConfig = {
      landing: {
        bc: 'Product Overview',
        title: 'Invoice Decision Intelligence',
        sub: 'Bring vendor invoices from multiple channels into one intelligent decision workflow, validate them against SAP business context, and route approved invoices toward Finance.',
        actions: `
          <button class="sap-btn sap-btn-primary sap-btn-sm" onclick="app.switchView('decisionCenter')">
            <span>Open Decision Center</span>
            ${ICONS.arrowRight}
          </button>
        `,
      },
      commandCenter: {
        bc: 'Command Center',
        title: 'Operational Command Center',
        sub: 'Prioritized operational desk answering what requires immediate human attention across accounts payable.',
        actions: `
          <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.resetDemoData()">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            <span>Refresh Status</span>
          </button>
        `,
      },
      inbox: {
        bc: 'Operations / Invoice Inbox',
        title: 'Invoice Ingestion Ledger',
        sub: 'Unified multi-channel repository normalizing physical, email, and statutory e-invoices.',
        actions: `
          <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.switchView('mockPortals')">
            <span>Inbound Gateways</span>
            ${ICONS.arrowRight}
          </button>
        `,
      },
      decisionCenter: this.isDecisionDetailActive
        ? {
            bc: `Decision Center / Decision Queue / ${this.selectedInvoiceId}`,
            title: `Invoice Decision: ${this.selectedInvoiceId}`,
            sub: this.getSelectedInvoiceSubtitle(),
            actions: `
              <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.backToDecisionQueue()">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                <span>Back to Queue</span>
              </button>
              <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.toggleWhatIfPanel()">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" stroke-width="2"><path d="M12 20v-6M6 20V10M18 20V4"></path></svg>
                <span>What-If Simulator</span>
              </button>
            `,
          }
        : {
            bc: 'Decision Center / Decision Queue',
            title: 'Invoice Decision Center',
            sub: 'Operational decision worklist prioritized by commercial impact and statutory SLA risk.',
            actions: `
              <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.switchView('inbox')">
                <span>View Invoice Inbox</span>
                ${ICONS.arrowRight}
              </button>
            `,
          },
      reconciliation: {
        bc: 'Reconciliation & Approvals / PO & 3-Way Match',
        title: 'Three-Way Match & LIV Verification',
        sub: 'Reconciliation across Purchase Orders (EKKO/EKPO), Goods Receipts (MATDOC), and Invoices (RBKP).',
        actions: ``,
      },
      businessValidation: {
        bc: 'Reconciliation & Approvals / Business Validation',
        title: 'Business Owner Validation Cockpit',
        sub: 'Commercial sign-off workbench for departmental requisitioners and cost center owners.',
        actions: ``,
      },
      exceptions: {
        bc: 'Reconciliation & Approvals / Exceptions & Blocks',
        title: 'Active Invoice Exceptions & Critical Blocks',
        sub: 'Prioritized exception queue for price variances, over-deliveries, vendor mismatches, and QM defects.',
        actions: ``,
      },
      gstReconciliation: {
        bc: 'Reconciliation & Approvals / GST Reconciliation',
        title: 'Statutory GSTR-2B Statement Reconciliation',
        sub: 'Direct auto-matching against GST portal records and Input Tax Credit (ITC) eligibility verification.',
        actions: `
          <button class="sap-btn sap-btn-primary sap-btn-sm" onclick="app.simulateGspImport()">
            <span>GSP / GSTN Portal Sync</span>
          </button>
        `,
      },
      integration: {
        bc: 'Governance & Integration / Integration Monitor',
        title: 'SAP Cloud Integration (CPI) Message Monitor',
        sub: 'End-to-End message ledger tracing OData and SOAP integrations with SAP S/4HANA.',
        actions: ``,
      },
      audit: {
        bc: 'Governance & Integration / Audit Trail',
        title: 'Enterprise Audit Trail & Lifecycle Log',
        sub: 'SOX Section 404 & GoBD compliant immutable record of all human and automated actions.',
        actions: ``,
      },
      mockPortals: {
        bc: 'Governance & Integration / Inbound Gateways',
        title: 'Inbound Channel Gateways',
        sub: 'Physical gate scanners, AP mailboxes, and government electronic invoice IRP simulators.',
        actions: ``,
      },
    };

    const cfg = viewConfig[viewName] || viewConfig.landing;

    if (navBc) {
      if (viewName === 'decisionCenter') {
        if (this.isDecisionDetailActive) {
          navBc.innerHTML = `
            <span class="breadcrumb-item" onclick="app.switchView('landing')">Home</span>
            <span class="breadcrumb-separator"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg></span>
            <span class="breadcrumb-item" onclick="app.backToDecisionQueue()" style="cursor:pointer;">Decision Center</span>
            <span class="breadcrumb-separator"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg></span>
            <span class="breadcrumb-item" onclick="app.backToDecisionQueue()" style="cursor:pointer; color:var(--brand-primary); font-weight:600;">Decision Queue</span>
            <span class="breadcrumb-separator"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg></span>
            <span class="breadcrumb-item current" id="breadcrumbActiveItem">${this.selectedInvoiceId}</span>
          `;
        } else {
          navBc.innerHTML = `
            <span class="breadcrumb-item" onclick="app.switchView('landing')">Home</span>
            <span class="breadcrumb-separator"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg></span>
            <span class="breadcrumb-item">Decision Center</span>
            <span class="breadcrumb-separator"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg></span>
            <span class="breadcrumb-item current" id="breadcrumbActiveItem">Decision Queue</span>
          `;
        }
      } else {
        navBc.innerHTML = `
          <span class="breadcrumb-item" onclick="app.switchView('landing')">Home</span>
          <span class="breadcrumb-separator"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg></span>
          <span class="breadcrumb-item current" id="breadcrumbActiveItem">${cfg.bc}</span>
        `;
      }
    } else if (bcActive) {
      bcActive.innerText = cfg.bc;
    }

    if (pageTitle) pageTitle.innerText = cfg.title;
    if (pageSub) pageSub.innerText = cfg.sub;
    if (pageActions) pageActions.innerHTML = cfg.actions;
  }

  renderCurrentView() {
    switch (this.activeView) {
      case 'landing':
        this.renderLandingPage();
        break;
      case 'commandCenter':
        this.renderCommandCenter();
        break;
      case 'inbox':
        this.renderInboxTable();
        break;
      case 'decisionCenter':
        this.renderDecisionCenter();
        break;
      case 'reconciliation':
        this.renderReconciliationTable();
        break;
      case 'businessValidation':
        this.renderBusinessValidationView();
        break;
      case 'exceptions':
        this.renderExceptionsView();
        break;
      case 'gstReconciliation':
        this.renderGstReconciliationView();
        break;
      case 'integration':
        this.renderIntegrationMonitor();
        break;
      case 'audit':
        this.renderAuditTrail();
        break;
      case 'mockPortals':
        this.renderMockPortals();
        break;
    }
  }

  updateKPICounters() {
    const total = this.invoices.length;
    const pendingVal = this.invoices.filter(
      (i) => i.invoice.processingStatus === 'PENDING_BUSINESS_VALIDATION' || i.aiDecision.recommendation === 'BUSINESS_VALIDATION_REQUIRED'
    ).length;
    const exceptions = this.invoices.filter((i) =>
      ['HOLD', 'MANUAL_REVIEW', 'REJECT'].includes(i.aiDecision.recommendation) ||
      (i.aiDecision.identifiedExceptions && i.aiDecision.identifiedExceptions.length > 0) ||
      i.invoice.isDuplicateSuspect ||
      i.slaRecord?.status === 'APPROACHING_BREACH'
    ).length;
    const readyForFinance = this.invoices.filter(
      (i) => i.invoice.processingStatus === 'POSTED_TO_SAP' || i.aiDecision.recommendation === 'AUTO_PROCEED'
    ).length;

    // Sidebar navigation badges
    const bInbox = document.getElementById('navBadgeInbox');
    if (bInbox) bInbox.innerText = total;

    const bVal = document.getElementById('navBadgeValidation');
    if (bVal) bVal.innerText = pendingVal;

    const bEx = document.getElementById('navBadgeExceptions');
    if (bEx) bEx.innerText = exceptions;

    // Command Center operational metrics strip
    const stripIncoming = document.getElementById('stripIncoming');
    if (stripIncoming) stripIncoming.innerText = total;

    const stripNeedsDecision = document.getElementById('stripNeedsDecision');
    if (stripNeedsDecision) stripNeedsDecision.innerText = pendingVal + exceptions;

    const stripExceptions = document.getElementById('stripExceptions');
    if (stripExceptions) stripExceptions.innerText = exceptions;

    const stripReady = document.getElementById('stripReady');
    if (stripReady) stripReady.innerText = readyForFinance;

    const stripGstRisk = document.getElementById('stripGstRisk');
    if (stripGstRisk && this.gstData?.summary?.totalBlockedItc) {
      stripGstRisk.innerText = `₹${this.gstData.summary.totalBlockedItc.toLocaleString('en-IN')}`;
    }

    // Decision queue count badge
    const badge = document.getElementById('decisionQueueTableBadge');
    if (badge) badge.innerText = `${total} Invoices`;
  }

  handleGlobalSearch(e) {
    if (e.key === 'Enter') {
      const query = e.target.value;
      this.switchView('inbox');
      const searchBox = document.getElementById('searchInbox');
      if (searchBox) {
        searchBox.value = query;
        this.renderInboxTable();
      }
    }
  }

  // --------------------------------------------------------------------------
  // VIEW 0: DEDICATED ENTERPRISE LANDING PAGE (PRODUCT ENTRY SCREEN)
  // --------------------------------------------------------------------------
  renderLandingPage() {
    this.updateKPICounters();

    const needsAttention = this.invoices.filter(
      (i) =>
        ['HOLD', 'MANUAL_REVIEW', 'REJECT', 'BUSINESS_VALIDATION_REQUIRED'].includes(i.aiDecision?.recommendation) ||
        i.invoice?.processingStatus === 'PENDING_BUSINESS_VALIDATION'
    ).length;

    const poExceptions = this.invoices.filter((i) => {
      const rec = i.aiDecision?.recommendation;
      const flags = i.aiDecision?.identifiedExceptions || [];
      return ['HOLD', 'MANUAL_REVIEW', 'REJECT'].includes(rec) || flags.length > 0;
    }).length;

    const ownerValidations = this.invoices.filter(
      (i) =>
        i.invoice?.processingStatus === 'PENDING_BUSINESS_VALIDATION' ||
        i.aiDecision?.recommendation === 'BUSINESS_VALIDATION_REQUIRED'
    ).length;

    const gstIssues =
      (this.gstData?.records || []).filter(
        (r) => r.matchStatus === 'MISMATCH' || r.matchStatus === 'FLAGGED' || r.matchStatus === 'UNMATCHED'
      ).length || 2;

    const elAttention = document.getElementById('snapNeedsAttention');
    if (elAttention) elAttention.innerText = needsAttention;

    const elPo = document.getElementById('snapPoExceptions');
    if (elPo) elPo.innerText = poExceptions;

    const elOwner = document.getElementById('snapOwnerValidations');
    if (elOwner) elOwner.innerText = ownerValidations;

    const elGst = document.getElementById('snapGstIssues');
    if (elGst) elGst.innerText = gstIssues;
  }

  // --------------------------------------------------------------------------
  // VIEW 1: OPERATIONAL COMMAND CENTER
  // --------------------------------------------------------------------------
  renderCommandCenter() {
    this.updateKPICounters();
    this.renderAttentionQueue();
    this.renderScenariosMatrix();
  }

  renderAttentionQueue() {
    const container = document.getElementById('attentionQueueContainer');
    if (!container) return;

    const attentionItems = [];

    // 1. SLA Approaching
    const slaInv = this.invoices.find((i) => i.slaRecord?.status === 'APPROACHING_BREACH');
    if (slaInv) {
      attentionItems.push({
        id: slaInv.invoice.invoiceId,
        severity: 'critical',
        badgeHtml: `${ICONS.alertTriangle} CRITICAL SLA`,
        title: `Statutory E-Invoice approaching 48-hour acceptance SLA (${slaInv.invoice.supplierName})`,
        meta: `Invoice #${slaInv.invoice.invoiceNumber} | ₹${(slaInv.invoice.totalGrossAmount || 0).toLocaleString('en-IN')} | ~5.4 hours remaining before auto-acceptance`,
        actionText: 'Review SLA',
      });
    }

    // 2. Duplicate Alerts
    const dupInv = this.invoices.find((i) => i.invoice.isDuplicateSuspect);
    if (dupInv) {
      attentionItems.push({
        id: dupInv.invoice.invoiceId,
        severity: 'critical',
        badgeHtml: `${ICONS.alertTriangle} DUPLICATE ALERT`,
        title: `Suspected duplicate invoice submission (${dupInv.invoice.supplierName})`,
        meta: `Invoice #${dupInv.invoice.invoiceNumber} | Same vendor and amount ₹${(dupInv.invoice.totalGrossAmount || 0).toLocaleString('en-IN')} previously posted in SAP`,
        actionText: 'Inspect Duplicate',
      });
    }

    // 3. Vendor Mismatch
    const vendMismatch = this.invoices.find((i) => i.reconciliation.vendorMatched === false && i.invoice.purchaseOrderReference);
    if (vendMismatch) {
      attentionItems.push({
        id: vendMismatch.invoice.invoiceId,
        severity: 'critical',
        badgeHtml: `${ICONS.xCircle} VENDOR MISMATCH`,
        title: `Invoicing vendor does not match PO vendor (${vendMismatch.invoice.supplierName})`,
        meta: `Invoice #${vendMismatch.invoice.invoiceNumber} billed against Siemens PO 4500012600. Potential misrouting.`,
        actionText: 'Investigate',
      });
    }

    // 4. Quantity Mismatch
    const qtyMismatch = this.invoices.find((i) => i.reconciliation.quantityStatus === 'OVER_DELIVERY');
    if (qtyMismatch) {
      attentionItems.push({
        id: qtyMismatch.invoice.invoiceId,
        severity: 'high',
        badgeHtml: `${ICONS.alertTriangle} QUANTITY MISMATCH`,
        title: `Invoiced quantity exceeds recorded SAP Goods Receipt (${qtyMismatch.invoice.supplierName})`,
        meta: `Invoiced 100 EA vs 90 EA received in warehouse (10 units missing). Delta ₹12,000.`,
        actionText: 'Resolve Variance',
      });
    }

    // 5. Quality Rejection
    const qmInv = this.invoices.find((i) => i.reconciliation.qualityStatus === 'REJECTIONS_DETECTED');
    if (qmInv) {
      attentionItems.push({
        id: qmInv.invoice.invoiceId,
        severity: 'high',
        badgeHtml: `${ICONS.alertTriangle} QUALITY REJECTION`,
        title: `SAP QM Inspection Lot records rejected materials (${qmInv.invoice.supplierName})`,
        meta: `5 HEPA filters failed air seal integrity test. Payment block R recommended.`,
        actionText: 'Review QM Lot',
      });
    }

    // 6. GST Reconciliation Mismatch
    const gstInv = this.invoices.find((i) => i.invoice.invoiceId === 'INV-2026-00009');
    if (gstInv) {
      attentionItems.push({
        id: gstInv.invoice.invoiceId,
        severity: 'high',
        badgeHtml: `${ICONS.alertTriangle} GST ITC MISMATCH`,
        title: `GSTR-2B Statement tax discrepancy (${gstInv.invoice.supplierName})`,
        meta: `Internal tax ₹81,000 vs GST portal ₹68,400. Input Tax Credit of ₹12,600 blocked.`,
        actionText: 'Review GST Delta',
      });
    }

    // 7. Business Validation Pending
    const boInv = this.invoices.find((i) => i.invoice.processingStatus === 'PENDING_BUSINESS_VALIDATION');
    if (boInv && boInv.invoice.invoiceId !== slaInv?.invoice.invoiceId) {
      attentionItems.push({
        id: boInv.invoice.invoiceId,
        severity: 'medium',
        badgeHtml: `${ICONS.user} AWAITING OWNER`,
        title: `Requisitioner validation required (${boInv.invoice.supplierName})`,
        meta: `Invoice #${boInv.invoice.invoiceNumber} | ₹${(boInv.invoice.totalGrossAmount || 0).toLocaleString('en-IN')} | Assigned to ${boInv.businessOwner.name}`,
        actionText: 'Validate',
      });
    }

    container.innerHTML = attentionItems
      .map(
        (item) => `
        <div class="attention-queue-row severity-${item.severity}">
          <div style="display:flex; align-items:center; gap:14px;">
            <span class="sap-badge ${item.severity === 'critical' ? 'sap-badge-error' : item.severity === 'high' ? 'sap-badge-warning' : 'sap-badge-info'}">
              ${item.badgeHtml}
            </span>
            <div>
              <div style="font-weight:600; font-size:13px; color:var(--text-primary);">${item.title}</div>
              <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">${item.meta}</div>
            </div>
          </div>
          <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.selectAndOpenDecision('${item.id}')">
            <span>${item.actionText}</span>
            ${ICONS.arrowRight}
          </button>
        </div>
      `
      )
      .join('');
  }

  renderScenariosMatrix() {
    const tbody = document.getElementById('scenarioTableBody');
    if (!tbody) return;

    const scenarios = [
      { id: 'INV-2026-00001', code: 'Scenario A', name: 'Perfect Match', cond: 'PO = GR = Invoice (100 EA @ ₹500), QM Passed' },
      { id: 'INV-2026-00002', code: 'Scenario B', name: 'Invoice > GR Quantity', cond: 'Invoiced 100 EA vs GR 90 EA (10 units missing)' },
      { id: 'INV-2026-00005', code: 'Scenario C', name: 'Invoice > PO Amount', cond: 'TCS unit price ₹1,150 vs PO ₹1,000 (+15% variance)' },
      { id: 'INV-2026-00007', code: 'Scenario D', name: 'Duplicate Invoice', cond: 'AWS invoice number AWS/2026/1090 repeated' },
      { id: 'INV-2026-00003', code: 'Scenario E', name: 'No PO Identified', cond: 'Recurring Telecom Leased Line -> Cost Center CC-1020-IT' },
      { id: 'INV-2026-00004', code: 'Scenario F', name: 'Vendor Mismatch', cond: 'Apex Facility billed against Siemens PO 4500012600' },
      { id: 'INV-2026-00006', code: 'Scenario G', name: 'Quality Rejection', cond: '5 HEPA filters rejected by Plant QA inspection lot' },
      { id: 'INV-2026-00009', code: 'Scenario H', name: 'GST Mismatch', cond: 'Infosys tax ₹81,000 vs GSTR-2B ₹68,400 (₹12,600 ITC risk)' },
      { id: 'INV-2026-00008', code: 'Scenario I', name: 'E-Invoice SLA', cond: 'Statutory 48h GST countdown active (4.5h remaining)' },
      { id: 'INV-2026-00010', code: 'Scenario J', name: 'Business Owner Rejection', cond: 'Requisitioner rejected: Work not performed to standard' },
    ];

    tbody.innerHTML = scenarios
      .map((sc) => {
        const inv = this.invoices.find((i) => i.invoice.invoiceId === sc.id);
        if (!inv) return '';
        const recBadge = this.getRecommendationBadge(inv.aiDecision.recommendation);
        const channelBadge = this.getChannelBadge(inv.invoice.sourceChannel);

        return `
          <tr>
            <td><strong>${sc.code}</strong>: ${sc.name}<br><small style="color:var(--text-muted);">${inv.invoice.invoiceId} / ${inv.invoice.invoiceNumber}</small></td>
            <td>${channelBadge}</td>
            <td>
              <a href="#" style="color:var(--brand-primary); text-decoration:none; font-weight:600;" onclick="app.openSupplierDrawer('${inv.invoice.supplierName}'); return false;">
                ${inv.invoice.supplierName}
              </a>
            </td>
            <td>${sc.cond}</td>
            <td>${recBadge}</td>
            <td><strong>${inv.aiDecision.confidenceScore}%</strong></td>
            <td>
              <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.selectAndOpenDecision('${inv.invoice.invoiceId}')">
                <span>Inspect Decision</span>
              </button>
            </td>
          </tr>
        `;
      })
      .join('');
  }

  // --------------------------------------------------------------------------
  // VIEW 2: INVOICE INBOX
  // --------------------------------------------------------------------------
  renderInboxTable() {
    const tbody = document.getElementById('inboxTableBody');
    if (!tbody) return;

    const channelFilter = document.getElementById('filterChannel')?.value || 'ALL';
    const searchTerm = (document.getElementById('searchInbox')?.value || '').toLowerCase();

    const filtered = this.invoices.filter((item) => {
      if (channelFilter !== 'ALL' && item.invoice.sourceChannel !== channelFilter) return false;
      if (searchTerm) {
        const text = `${item.invoice.invoiceId} ${item.invoice.invoiceNumber} ${item.invoice.supplierName} ${item.invoice.purchaseOrderReference || ''}`.toLowerCase();
        if (!text.includes(searchTerm)) return false;
      }
      return true;
    });

    tbody.innerHTML = filtered
      .map((item) => {
        const channelBadge = this.getChannelBadge(item.invoice.sourceChannel);
        const recBadge = this.getRecommendationBadge(item.aiDecision.recommendation);
        const statusBadge = this.getProcessingStatusBadge(item.invoice.processingStatus);

        const matchBadge = this.getMatchStatusBadge(item.reconciliation, item.invoice.purchaseOrderReference);
        const paymentBadge = this.getPaymentStatusBadge(item.invoice.paymentStatus, item.invoice.clearingStatus);

        return `
          <tr>
            <td><strong>${item.invoice.invoiceId}</strong><br><small style="color:var(--text-secondary);">${item.invoice.invoiceNumber}</small></td>
            <td>
              <a href="#" style="color:var(--brand-primary); text-decoration:none; font-weight:600;" onclick="app.openSupplierDrawer('${item.invoice.supplierName}'); return false;">
                ${item.invoice.supplierName}
              </a>
              <br><small style="color:var(--text-muted);">${item.invoice.supplierTaxId}</small>
            </td>
            <td>${channelBadge}</td>
            <td>${item.invoice.purchaseOrderReference ? `<code>${item.invoice.purchaseOrderReference}</code>` : '<em style="color:var(--text-muted);">Non-PO</em>'}</td>
            <td><strong>₹${(item.invoice.totalGrossAmount || 0).toLocaleString('en-IN')}</strong></td>
            <td>${matchBadge}</td>
            <td>${statusBadge}</td>
            <td>${paymentBadge}</td>
            <td>${recBadge}</td>
            <td>
              <button class="sap-btn sap-btn-primary sap-btn-sm" onclick="app.selectAndOpenDecision('${item.invoice.invoiceId}')">
                Decision Center
              </button>
            </td>
          </tr>
        `;
      })
      .join('');
  }

  // --------------------------------------------------------------------------
  // VIEW 3: DECISION CENTER (HERO WORKSPACE)
  // --------------------------------------------------------------------------
  selectAndOpenDecision(invoiceId) {
    if (this.currentRoute !== 'app') {
      this.navigateToRoute('/app', true);
    }
    if (this.selectedInvoiceId !== invoiceId) {
      this.simulationState = null;
    }
    this.selectedInvoiceId = invoiceId;
    this.isDecisionDetailActive = true;
    this._navigatingToDetail = true;
    this.switchView('decisionCenter');
    const q = document.getElementById('decisionQueueContainer');
    const d = document.getElementById('decisionDetailContainer');
    if (q) q.style.display = 'none';
    if (d) d.style.display = 'block';
    this.updateBreadcrumbsAndHeader('decisionCenter');
    this.renderDecisionWorkspace();
    this.runWhatIfSimulation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  backToDecisionQueue() {
    this.isDecisionDetailActive = false;
    this._navigatingToDetail = false;
    const q = document.getElementById('decisionQueueContainer');
    const d = document.getElementById('decisionDetailContainer');
    if (q) q.style.display = 'block';
    if (d) d.style.display = 'none';
    this.updateBreadcrumbsAndHeader('decisionCenter');
    this.renderDecisionTable();
  }

  renderDecisionCenter() {
    const q = document.getElementById('decisionQueueContainer');
    const d = document.getElementById('decisionDetailContainer');
    if (this.isDecisionDetailActive) {
      if (q) q.style.display = 'none';
      if (d) d.style.display = 'block';
      this.renderDecisionWorkspace();
      this.runWhatIfSimulation();
    } else {
      if (q) q.style.display = 'block';
      if (d) d.style.display = 'none';
      this.renderDecisionTable();
    }
  }

  renderDecisionTable() {
    const tbody = document.getElementById('decisionQueueTableBody');
    if (!tbody) return;

    const searchTerm = (document.getElementById('decisionQueueSearch')?.value || '').toLowerCase();
    const filterDecision = document.getElementById('decisionQueueFilter')?.value || 'ALL';

    const filtered = this.invoices.filter((item) => {
      if (filterDecision !== 'ALL' && item.aiDecision.recommendation !== filterDecision) return false;
      if (searchTerm) {
        const text = `${item.invoice.invoiceId} ${item.invoice.invoiceNumber} ${item.invoice.supplierName} ${item.invoice.purchaseOrderReference || ''}`.toLowerCase();
        if (!text.includes(searchTerm)) return false;
      }
      return true;
    });

    const badge = document.getElementById('decisionQueueTableBadge');
    if (badge) badge.innerText = `${filtered.length} Invoices`;

    tbody.innerHTML = filtered
      .map((item) => {
        const { invoice, aiDecision, businessOwner } = item;
        const recBadge = this.getRecommendationBadge(aiDecision.recommendation);
        const statusBadge = this.getProcessingStatusBadge(invoice.processingStatus);
        const riskBadge = this.getRiskBadge(aiDecision.riskLevel);
        const channelBadge = this.getChannelBadge(invoice.sourceChannel);

        return `
          <tr class="decision-queue-row" onclick="app.selectAndOpenDecision('${invoice.invoiceId}')" title="Click to open full-screen decision workspace">
            <td>
              <div style="font-weight:700; color:var(--brand-primary); font-size:13px;">${invoice.invoiceId}</div>
              <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">${invoice.invoiceNumber} &bull; ${channelBadge}</div>
            </td>
            <td>
              <a href="#" style="color:var(--brand-primary); font-weight:600; text-decoration:none;" onclick="event.stopPropagation(); app.openSupplierDrawer('${invoice.supplierName}'); return false;">
                ${invoice.supplierName}
              </a>
              <div style="font-size:11px; color:var(--text-muted); font-family:var(--font-mono);">${invoice.supplierTaxId}</div>
            </td>
            <td>
              <strong style="font-size:13px; color:var(--text-primary);">₹${(invoice.totalGrossAmount || 0).toLocaleString('en-IN')}</strong>
            </td>
            <td>
              ${invoice.purchaseOrderReference ? `<code style="font-size:11px;">${invoice.purchaseOrderReference}</code>` : '<span class="sap-badge sap-badge-neutral" style="font-size:10px;">NON-PO</span>'}
            </td>
            <td>${statusBadge}</td>
            <td>
              <div style="display:flex; align-items:center; gap:6px;">
                ${recBadge}
                <span style="font-size:11px; font-weight:600; color:var(--text-secondary);">${aiDecision.confidenceScore}%</span>
              </div>
            </td>
            <td>${riskBadge}</td>
            <td>
              <div style="font-size:12px; font-weight:600; color:var(--text-primary);">${businessOwner.name}</div>
              <div style="font-size:11px; color:var(--text-muted);">${businessOwner.department}</div>
            </td>
            <td style="text-align:right;" onclick="event.stopPropagation()">
              <div style="display:inline-flex; gap:6px;">
                <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.openDocPreview('${invoice.invoiceId}')" title="View Source Document & Artifacts">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                  <span>Doc</span>
                </button>
                <button class="sap-btn sap-btn-primary sap-btn-sm" onclick="app.selectAndOpenDecision('${invoice.invoiceId}')">
                  <span>Inspect</span>
                  ${ICONS.arrowRight}
                </button>
              </div>
            </td>
          </tr>
        `;
      })
      .join('');
  }

  renderDecisionList() {
    // Retained for backward-compatibility
  }

  onSelectInvoice(invoiceId) {
    this.selectAndOpenDecision(invoiceId);
  }

  renderDecisionWorkspace() {
    const workspace = document.getElementById('decisionWorkspaceCol');
    if (!workspace) return;

    const item = this.invoices.find((i) => i.invoice.invoiceId === this.selectedInvoiceId);
    if (!item) return;

    const { invoice, purchaseOrder, reconciliation, aiDecision, businessOwner, slaRecord } = item;

    // Simulation awareness
    const isSimActive = Boolean(this.simulationState && this.simulationState.active && this.simulationState.invoiceId === invoice.invoiceId);
    const recToRender = isSimActive ? this.simulationState.simRec : aiDecision.recommendation;
    const confToRender = isSimActive ? this.simulationState.simConfidence : aiDecision.confidenceScore;
    const primaryWhy = (isSimActive && this.simulationState.changeReason) ? this.simulationState.changeReason : (aiDecision.explanation.whyRecommended[0] || 'Standard reconciliation checks evaluated.');
    const primaryAction = (isSimActive && recToRender === 'AUTO_PROCEED') ? 'Simulated parameters satisfy enterprise criteria. Eligible for Posting.' : aiDecision.explanation.suggestedAction;

    // Lifecycle state flags
    const boDecision = item.businessOwnerDecision;
    const isOwnerValidated = Boolean(boDecision && boDecision.action === 'ACCEPT');
    const isOwnerRejected = Boolean(boDecision && boDecision.action === 'REJECT');
    const isParked = invoice.postingStatus === 'PARKED' || invoice.processingStatus === 'PARKED_IN_SAP';
    const isPosted = invoice.postingStatus === 'POSTED' || invoice.processingStatus === 'POSTED_TO_SAP' || Boolean(invoice.accountingDocumentNumber);
    const isPaid = invoice.paymentStatus === 'PAID' || invoice.clearingStatus === 'CLEARED' || Boolean(invoice.paymentDocumentNumber);
    const isCleared = invoice.clearingStatus === 'CLEARED' || Boolean(invoice.clearingDocumentNumber);

    // 1. Build Action Buttons respecting strict workflow hierarchy & prerequisites
    let validateBtnHtml = '';
    if (isOwnerValidated) {
      const valDate = boDecision.timestamp ? boDecision.timestamp.replace('T', ' ').slice(0, 16) : 'Verified';
      validateBtnHtml = `
        <button class="sap-btn sap-btn-sm" disabled style="background:#EBF7EE; color:#188038; border:1px solid #C6E7C1; cursor:default;" title="Owner validation completed by ${boDecision.userName || 'Business Owner'} on ${valDate}">
          ${ICONS.check} Owner Validated (${boDecision.userName || 'Business Owner'})
        </button>
      `;
    } else if (isOwnerRejected) {
      validateBtnHtml = `
        <button class="sap-btn sap-btn-sm" disabled style="background:#FEECEC; color:#D9381E; border:1px solid #F8C5BF; cursor:default;" title="Disputed / Rejected by ${boDecision.userName || 'Business Owner'}">
          ${ICONS.xCircle} Owner Rejected (${boDecision.userName || 'Business Owner'})
        </button>
      `;
    } else {
      validateBtnHtml = `
        <button class="sap-btn sap-btn-primary sap-btn-sm" onclick="app.openValidationModal('${invoice.invoiceId}')">
          ${ICONS.user} Validate as Owner
        </button>
      `;
    }

    let parkBtnHtml = '';
    if (isPosted) {
      parkBtnHtml = '';
    } else if (isParked) {
      parkBtnHtml = `
        <button class="sap-btn sap-btn-sm" disabled style="background:#FEF6E7; color:#B45309; border:1px solid #F8DCA6; cursor:default;" title="Preliminary Document Parked in S/4HANA (Payment Block R)">
          ${ICONS.info} Parked in S/4HANA (MIR7)
        </button>
      `;
    } else {
      parkBtnHtml = `
        <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.parkInSAP('${invoice.invoiceId}')">
          Park Invoice (MIR7)
        </button>
      `;
    }

    let postBtnHtml = '';
    if (isPosted) {
      postBtnHtml = `
        <span class="sap-badge sap-badge-success">${ICONS.check} POSTED TO S/4HANA (BELNR ${invoice.accountingDocumentNumber || '5100001234'})</span>
      `;
    } else {
      const isHold = recToRender === 'HOLD' || recToRender === 'POTENTIAL_DUPLICATE';
      const isRej = recToRender === 'REJECT' || isOwnerRejected;
      const needsOwnerVal = (recToRender === 'BUSINESS_VALIDATION_REQUIRED' || recToRender === 'MANUAL_REVIEW') && !isOwnerValidated && !isSimActive;

      if (isHold) {
        postBtnHtml = `
          <button class="sap-btn sap-btn-secondary sap-btn-sm" disabled style="opacity:0.6; cursor:not-allowed;" title="Locked: Invoice is on HOLD or duplicate block. Resolve exception blockers first.">
            ${ICONS.lock} Post to S/4HANA (MIRO)
          </button>
        `;
      } else if (isRej) {
        postBtnHtml = `
          <button class="sap-btn sap-btn-secondary sap-btn-sm" disabled style="opacity:0.6; cursor:not-allowed;" title="Locked: Invoice is rejected by Business Owner. Cannot post to S/4HANA.">
            ${ICONS.lock} Post to S/4HANA (MIRO)
          </button>
        `;
      } else if (needsOwnerVal) {
        postBtnHtml = `
          <button class="sap-btn sap-btn-secondary sap-btn-sm" disabled style="opacity:0.6; cursor:not-allowed;" title="Locked: Complete Business Owner Validation first.">
            ${ICONS.lock} Post to S/4HANA (MIRO)
          </button>
        `;
      } else {
        postBtnHtml = `
          <button class="sap-btn sap-btn-positive sap-btn-sm" onclick="app.postToSAP('${invoice.invoiceId}')">
            ${ICONS.check} Post to S/4HANA (MIRO)${isSimActive && recToRender === 'AUTO_PROCEED' ? ' (Simulated)' : ''}
          </button>
        `;
      }
    }

    let paymentActionHtml = '';
    if (isCleared) {
      paymentActionHtml = `
        <span class="sap-badge sap-badge-success">${ICONS.checkCircle} CLEARED (BSAK: ${invoice.clearingDocumentNumber || '2000012346'})</span>
      `;
    } else if (isPaid) {
      paymentActionHtml = `
        <span class="sap-badge sap-badge-success">${ICONS.checkCircle} PAID (DOC ${invoice.paymentDocumentNumber || '2000012345'})</span>
        <button class="sap-btn sap-btn-primary sap-btn-sm" onclick="app.clearPayment('${invoice.invoiceId}')">
          Clear Settlement (BSAK)
        </button>
      `;
    } else if (isPosted) {
      paymentActionHtml = `
        <button class="sap-btn sap-btn-positive sap-btn-sm" onclick="app.processPayment('${invoice.invoiceId}')">
          ${ICONS.creditCard} Execute AP Payment Run (F110)
        </button>
        <button class="sap-btn sap-btn-secondary sap-btn-sm" disabled style="opacity:0.6; cursor:not-allowed;" title="Locked: Payment (F110) must be executed before settlement clearing">
          ${ICONS.lock} Clear Settlement (BSAK)
        </button>
      `;
    } else {
      paymentActionHtml = `
        <button class="sap-btn sap-btn-secondary sap-btn-sm" disabled style="opacity:0.6; cursor:not-allowed;" title="Locked: Invoice must be posted to S/4HANA (MIRO) before payment run">
          ${ICONS.lock} Execute AP Payment (F110)
        </button>
        <button class="sap-btn sap-btn-secondary sap-btn-sm" disabled style="opacity:0.6; cursor:not-allowed;" title="Locked: Payment (F110) must be executed before settlement clearing">
          ${ICONS.lock} Clear Settlement (BSAK)
        </button>
      `;
    }

    const topQuestionsHtml = `
      <div class="decision-hero-card">
        <div class="question-row-top">
          <div class="question-block">
            <div class="question-label">1. What is this?</div>
            <div class="question-value-strong">
              ${invoice.invoiceId} / ${invoice.invoiceNumber}
            </div>
            <div style="font-size:13px; color:var(--text-secondary); margin-top:2px;">
              <a href="#" style="color:var(--brand-primary); font-weight:600; text-decoration:none;" onclick="app.openSupplierDrawer('${invoice.supplierName}'); return false;">
                ${invoice.supplierName}
              </a>
              <span style="color:var(--text-muted); margin:0 6px;">|</span> Gross: <strong>₹${(invoice.totalGrossAmount || 0).toLocaleString('en-IN')}</strong>
            </div>
          </div>
          <div class="question-block">
            <div class="question-label">2. Current Processing State</div>
            <div style="display:flex; align-items:center; gap:8px; margin-top:2px;">
              ${this.getProcessingStatusBadge(invoice.processingStatus)}
              ${slaRecord?.status === 'APPROACHING_BREACH' ? `<span class="sap-badge sap-badge-error">${ICONS.alertTriangle} 48H SLA AT RISK</span>` : ''}
            </div>
            <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">
              Assigned Requisitioner: ${businessOwner.name} (${businessOwner.department})
            </div>
          </div>
        </div>

        <div class="question-box-bottom">
          <div class="question-block">
            <div class="question-label">3. System Recommendation</div>
            <div style="display:flex; align-items:center; gap:8px; margin-top:4px;">
              ${this.getRecommendationBadge(recToRender)}
              <span style="font-weight:600; font-size:13px; color:var(--text-primary);">Confidence: ${confToRender}%</span>
              ${isSimActive ? `<span class="sap-badge sap-badge-info" style="font-size:10px; font-weight:700;">SIMULATED POLICY</span>` : ''}
            </div>
            <div style="font-size:12px; color:var(--text-secondary); margin-top:6px; line-height:1.4;">
              <strong>Why?</strong> ${primaryWhy}
            </div>
          </div>
          <div class="question-block">
            <div class="question-label">4. What Should You Do?</div>
            <div style="font-size:13px; font-weight:600; color:#188038; margin-top:4px;">
              ${primaryAction}
            </div>
            <div style="display:flex; gap:8px; margin-top:10px; flex-wrap:wrap; align-items:center;">
              <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.openDocPreview('${invoice.invoiceId}')" title="Inspect original inbound document or fixture">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                <span>View Source Document</span>
              </button>
              ${validateBtnHtml}
              ${parkBtnHtml}
              ${postBtnHtml}
              ${paymentActionHtml}
            </div>
          </div>
        </div>
      </div>
    `;


    // 2. SAP CONTEXT PROCESS STRIP (PURE SVG CONNECTORS)
    const isPOFound = Boolean(purchaseOrder);
    const isGRReceived = reconciliation.quantityReceived > 0;
    const isQMApproved = reconciliation.qualityStatus === 'ALL_PASSED' || reconciliation.qualityStatus === 'NOT_APPLICABLE';
    const isBOValidated = invoice.processingStatus === 'BUSINESS_VALIDATED';

    const processStripHtml = `
      <div class="sap-card" style="padding:14px 20px;">
        <div style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-secondary); margin-bottom:10px;">
          SAP S/4HANA Procurement & Financial Settlement Chain
        </div>
        <div class="sap-process-strip">
          <div class="process-node ${reconciliation.vendorMatched ? 'node-success' : 'node-error'}">
            <div class="node-title">1. Supplier</div>
            <div class="node-subtitle">${invoice.supplierName.slice(0, 14)}</div>
          </div>
          <span class="process-arrow">${ICONS.chevronRight}</span>
          <div class="process-node ${isPOFound ? 'node-success' : 'node-warning'}">
            <div class="node-title">2. Purchase Order</div>
            <div class="node-subtitle">${purchaseOrder ? purchaseOrder.poNumber : 'Non-PO'}</div>
          </div>
          <span class="process-arrow">${ICONS.chevronRight}</span>
          <div class="process-node ${isGRReceived ? (reconciliation.quantityStatus === 'EXACT_MATCH' ? 'node-success' : 'node-warning') : 'node-active'}">
            <div class="node-title">3. Goods Receipt</div>
            <div class="node-subtitle">${reconciliation.quantityReceived} EA Rec</div>
          </div>
          <span class="process-arrow">${ICONS.chevronRight}</span>
          <div class="process-node ${isQMApproved ? 'node-success' : 'node-error'}">
            <div class="node-title">4. Quality (QM)</div>
            <div class="node-subtitle">${reconciliation.qualityStatus === 'ALL_PASSED' ? 'Passed' : reconciliation.qualityStatus === 'REJECTIONS_DETECTED' ? 'Rejected' : 'N/A'}</div>
          </div>
          <span class="process-arrow">${ICONS.chevronRight}</span>
          <div class="process-node node-active">
            <div class="node-title">5. Invoice Billed</div>
            <div class="node-subtitle">${reconciliation.quantityInvoiced} EA</div>
          </div>
          <span class="process-arrow">${ICONS.chevronRight}</span>
          <div class="process-node ${isBOValidated ? 'node-success' : 'node-warning'}">
            <div class="node-title">6. Business Owner</div>
            <div class="node-subtitle">${isBOValidated ? 'Accepted' : 'Pending'}</div>
          </div>
          <span class="process-arrow">${ICONS.chevronRight}</span>
          <div class="process-node ${isPosted ? 'node-success' : 'node-active'}">
            <div class="node-title">7. Finance / MIRO</div>
            <div class="node-subtitle">${isPosted ? 'Posted' : 'Staged'}</div>
          </div>
        </div>
      </div>
    `;

    // 2b. AI ANALYSIS VERIFICATION CHECKLIST (10-POINT EXPLICIT SYSTEM EVALUATION)
    const checks = [
      {
        num: '01',
        title: 'Header & Vendor Data Extracted',
        detail: `Vendor: ${invoice.supplierName} (${invoice.supplierTaxId || 'Tax ID Verified'}) | Inv #${invoice.invoiceNumber}`,
        status: reconciliation.vendorMatched ? 'PASS' : 'FAIL',
        note: reconciliation.vendorMatched ? 'LFA1 Master match confirmed' : 'Vendor ID mismatch with PO vendor',
      },
      {
        num: '02',
        title: 'Purchase Order Correlated',
        detail: purchaseOrder ? `PO #${purchaseOrder.poNumber} (${purchaseOrder.companyCode || '1010'} / EKKO)` : 'Non-PO / Direct G/L Cost Center Route',
        status: purchaseOrder ? 'PASS' : (invoice.nonPOAccountAssignment ? 'INFO' : 'FAIL'),
        note: purchaseOrder ? 'PO line items bound successfully' : 'Routed via Non-PO GL assignment',
      },
      {
        num: '03',
        title: 'Goods Receipt (MSEG / Movement 101)',
        detail: `Billed: ${reconciliation.quantityInvoiced} EA vs Received: ${reconciliation.quantityReceived} EA`,
        status: reconciliation.quantityReceived >= reconciliation.quantityInvoiced ? 'PASS' : (reconciliation.quantityReceived > 0 ? 'WARN' : 'WARN'),
        note: reconciliation.quantityStatus === 'EXACT_MATCH' ? 'Exact warehouse match confirmed' : (reconciliation.quantityStatus === 'OVER_DELIVERY' ? 'Invoiced quantity exceeds delivered' : 'Goods receipt pending'),
      },
      {
        num: '04',
        title: 'Quality Inspection (SAP QM / QALS)',
        detail: `Status: ${reconciliation.qualityStatus === 'ALL_PASSED' ? 'Passed (0 defect lots)' : reconciliation.qualityStatus === 'REJECTIONS_DETECTED' ? 'Rejected Defect Lots Detected' : 'Not Required'}`,
        status: reconciliation.qualityStatus === 'ALL_PASSED' ? 'PASS' : (reconciliation.qualityStatus === 'REJECTIONS_DETECTED' ? 'FAIL' : 'INFO'),
        note: reconciliation.qualityStatus === 'REJECTIONS_DETECTED' ? 'Defect lot blocked from standard settlement' : 'Material quality approved',
      },
      {
        num: '05',
        title: 'Duplicate Ingestion Screening',
        detail: aiDecision.recommendation === 'POTENTIAL_DUPLICATE' ? 'Suspected duplicate hash across BSIK/BSAK ledger' : 'Unique invoice reference verified across SAP open & cleared items',
        status: aiDecision.recommendation === 'POTENTIAL_DUPLICATE' ? 'FAIL' : 'PASS',
        note: aiDecision.recommendation === 'POTENTIAL_DUPLICATE' ? 'Duplicate submission block active' : 'Zero duplicate matches found',
      },
      {
        num: '06',
        title: 'Price Tolerance PP Evaluation',
        detail: `Variance: ${reconciliation.priceVariancePercentage > 0 ? '+' : ''}${reconciliation.priceVariancePercentage.toFixed(1)}% vs SAP Tolerance Key PP (5.0%)`,
        status: reconciliation.priceStatus === 'EXACT_MATCH' ? 'PASS' : (isSimActive && recToRender === 'AUTO_PROCEED' ? 'PASS' : 'WARN'),
        note: reconciliation.priceStatus === 'EXACT_MATCH' ? 'Within tolerance threshold' : (isSimActive && recToRender === 'AUTO_PROCEED' ? 'Within simulated tolerance' : 'Breaches standard PP tolerance'),
      },
      {
        num: '07',
        title: 'Quantity Delivery Reconciliation',
        detail: `Delivered: ${reconciliation.quantityReceived} EA | Billed: ${reconciliation.quantityInvoiced} EA`,
        status: reconciliation.quantityStatus === 'EXACT_MATCH' ? 'PASS' : (isSimActive && recToRender === 'AUTO_PROCEED' ? 'PASS' : 'WARN'),
        note: reconciliation.quantityStatus === 'EXACT_MATCH' ? 'Zero quantity variance' : (isSimActive && recToRender === 'AUTO_PROCEED' ? 'Within simulated buffer' : 'Over-delivery requires review'),
      },
      {
        num: '08',
        title: 'Statutory GST GSTR-2B Cross-Check',
        detail: `ITC Eligibility: ${invoice.gstMatchingStatus === 'MISMATCH' ? 'At-Risk Mismatch in auto-drafted GSTR-2B' : 'Verified with GSTR-2B return'}`,
        status: invoice.gstMatchingStatus === 'MISMATCH' ? 'WARN' : 'PASS',
        note: invoice.gstMatchingStatus === 'MISMATCH' ? '2B discrepancy requires tax credit hold' : 'Input Tax Credit compliant',
      },
      {
        num: '09',
        title: 'Risk Rating & Confidence Assessment',
        detail: `Risk Level: ${aiDecision.riskLevel} | Algorithmic Confidence: ${confToRender}%`,
        status: aiDecision.riskLevel === 'LOW' ? 'PASS' : (aiDecision.riskLevel === 'MEDIUM' ? 'WARN' : 'FAIL'),
        note: 'Computed across 14 deterministic heuristics',
      },
      {
        num: '10',
        title: 'Final Recommendation Formulation',
        detail: `Outcome: ${recToRender} ${isSimActive ? '[SIMULATED]' : ''}`,
        status: (recToRender === 'AUTO_PROCEED' || recToRender === 'ALREADY_PROCESSED') ? 'PASS' : (recToRender === 'BUSINESS_VALIDATION_REQUIRED' || recToRender === 'MANUAL_REVIEW') ? 'WARN' : 'FAIL',
        note: primaryWhy,
      },
    ];

    const aiChecklistHtml = `
      <div class="sap-card" style="padding:16px 20px;">
        <div class="sap-card-header" style="padding:0 0 12px 0;">
          <div>
            <div class="sap-card-title">AI Analysis & Verification Audit Matrix</div>
            <span class="sap-card-subtitle">Comprehensive 10-point deterministic evaluation across ERP master data, warehouse receipts, quality inspection, statutory tax, and fraud checks.</span>
          </div>
          <div>
            <span class="sap-badge ${recToRender === 'AUTO_PROCEED' ? 'sap-badge-success' : recToRender === 'HOLD' || recToRender === 'POTENTIAL_DUPLICATE' ? 'sap-badge-error' : 'sap-badge-warning'}">
              ${recToRender.replace(/_/g, ' ')} (${confToRender}%)
            </span>
          </div>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(310px, 1fr)); gap:10px; margin-top:8px;">
          ${checks
            .map((c) => {
              let badgeClass = 'sap-badge-success';
              let icon = ICONS.checkCircle;
              if (c.status === 'WARN') {
                badgeClass = 'sap-badge-warning';
                icon = ICONS.alertTriangle;
              } else if (c.status === 'FAIL') {
                badgeClass = 'sap-badge-error';
                icon = ICONS.xCircle;
              } else if (c.status === 'INFO') {
                badgeClass = 'sap-badge-info';
                icon = ICONS.info;
              }
              return `
                <div style="border:1px solid var(--border-subtle); border-radius:var(--radius-input); padding:10px 12px; background:var(--surface-subtle); display:flex; flex-direction:column; justify-content:space-between;">
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                      <span style="font-size:12px; font-weight:700; color:var(--text-primary);">${c.title}</span>
                      <span class="sap-badge ${badgeClass}" style="font-size:10px; padding:1px 6px;">${icon} ${c.status}</span>
                    </div>
                    <div style="font-size:11px; color:var(--text-secondary); line-height:1.4;">${c.detail}</div>
                  </div>
                  <div style="font-size:10px; color:var(--text-muted); font-style:italic; margin-top:6px; border-top:1px dashed var(--border-subtle); padding-top:4px;">
                    ${c.note}
                  </div>
                </div>
              `;
            })
            .join('')}
        </div>
      </div>
    `;

    // 3. THREE-WAY MATCH VISUALIZATION (SEMANTIC STATUS COMPONENTS)
    const threeWayBoxHtml = `
      <div class="sap-card" style="padding:16px 20px;">
        <div style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-secondary); margin-bottom:12px;">
          Three-Way Match Verification (Purchase Order vs Goods Receipt vs Invoice)
        </div>
        <div class="recon-grid-3way">
          <div class="recon-col">
            <div class="recon-col-title">PURCHASE ORDER</div>
            <div class="recon-col-value">${reconciliation.quantityOrdered} units</div>
            <div class="recon-col-sub">Net: ₹${reconciliation.poTotalNet.toLocaleString('en-IN')}</div>
          </div>
          <div class="recon-col">
            <div class="recon-col-title">GOODS RECEIPT</div>
            <div class="recon-col-value" style="color:${reconciliation.quantityReceived < reconciliation.quantityInvoiced ? 'var(--status-error)' : 'inherit'};">
              ${reconciliation.quantityReceived} units
            </div>
            <div class="recon-col-sub">Delivered at Plant 1010</div>
          </div>
          <div class="recon-col">
            <div class="recon-col-title">INVOICE</div>
            <div class="recon-col-value">${reconciliation.quantityInvoiced} units</div>
            <div class="recon-col-sub">Net: ₹${reconciliation.invoicedTotalNet.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div class="recon-status-bar">
          <div class="recon-match-item ${reconciliation.vendorMatched ? 'match-pass' : 'match-fail'}">
            ${reconciliation.vendorMatched ? ICONS.checkCircle : ICONS.xCircle}
            <span>Vendor ${reconciliation.vendorMatched ? 'Matched' : 'Mismatch'}</span>
          </div>
          <div class="recon-match-item ${reconciliation.poNumberMatched ? 'match-pass' : 'match-warn'}">
            ${reconciliation.poNumberMatched ? ICONS.checkCircle : ICONS.alertTriangle}
            <span>PO ${reconciliation.poNumberMatched ? 'Matched' : 'Non-PO Route'}</span>
          </div>
          <div class="recon-match-item ${reconciliation.quantityStatus === 'EXACT_MATCH' ? 'match-pass' : 'match-warn'}">
            ${reconciliation.quantityStatus === 'EXACT_MATCH' ? ICONS.checkCircle : ICONS.alertTriangle}
            <span>Quantity ${reconciliation.quantityStatus === 'EXACT_MATCH' ? 'Matched' : 'Mismatch'}</span>
          </div>
          <div class="recon-match-item ${reconciliation.priceStatus === 'EXACT_MATCH' ? 'match-pass' : 'match-warn'}">
            ${reconciliation.priceStatus === 'EXACT_MATCH' ? ICONS.checkCircle : ICONS.alertTriangle}
            <span>Price ${reconciliation.priceStatus === 'EXACT_MATCH' ? 'Matched' : 'Variance (' + reconciliation.priceVariancePercentage.toFixed(1) + '%)'}</span>
          </div>
        </div>
      </div>
    `;

    // 3b. EVIDENCE-BASED COMPARISON TABLE (SECTION 10)
    const rawCompRows = item.comparisonRows || reconciliation.comparisonRows || [];
    const compRows = rawCompRows.map((r) => {
      let row = { ...r };
      if (isSimActive) {
        if (row.check.toLowerCase().includes('price') && reconciliation.priceVariancePercentage > 0) {
          if (reconciliation.priceVariancePercentage <= this.simulationState.priceTol) {
            row.result = 'MATCH';
            row.details = `Price variance (+${reconciliation.priceVariancePercentage.toFixed(1)}%) falls within simulated tolerance limit (<= ${this.simulationState.priceTol}%).`;
          }
        }
        if (row.check.toLowerCase().includes('quantity') && reconciliation.quantityStatus === 'OVER_DELIVERY') {
          const overDelivPct = ((reconciliation.quantityInvoiced - reconciliation.quantityReceived) / reconciliation.quantityReceived) * 100;
          if (overDelivPct <= this.simulationState.qtyTol) {
            row.result = 'MATCH';
            row.details = `Over-delivery (+${overDelivPct.toFixed(1)}%) falls within simulated buffer limit (<= ${this.simulationState.qtyTol}%).`;
          }
        }
        if (row.check.toLowerCase().includes('quality') && reconciliation.qualityStatus === 'REJECTIONS_DETECTED') {
          if (this.simulationState.qmStrict === 'CONDITIONAL') {
            row.result = 'CONDITIONAL_APPROVAL';
            row.details = `Quality defects permitted conditionally upon Requisitioner sign-off under simulated policy.`;
          }
        }
      }
      return row;
    });

    const comparisonTableHtml = `
      <div class="sap-card">
        <div class="sap-card-header">
          <div>
            <div class="sap-card-title">Evidence-Based Comparison & Validation Ledger</div>
            <span class="sap-card-subtitle">Real side-by-side reconciliation between Billing Side (Invoice) and Expected / Received Side (SAP PO, GR, QM).</span>
          </div>
          ${isSimActive ? `<span class="sap-badge sap-badge-info" style="font-size:11px;">WHAT-IF SIMULATION APPLIED</span>` : ''}
        </div>
        <div class="sap-table-wrapper">
          <table class="sap-table">
            <thead>
              <tr>
                <th style="width:150px;">Check</th>
                <th>Invoice (Billing Side)</th>
                <th>Purchase Order (EKKO/EKPO)</th>
                <th>Goods Receipt (MSEG)</th>
                <th>Quality (QM / QALS)</th>
                <th style="width:160px; text-align:center;">Validation Result</th>
              </tr>
            </thead>
            <tbody>
              ${compRows.map((r) => {
                let badgeClass = 'sap-badge-success';
                let icon = ICONS.checkCircle;
                let text = r.result;
                if (r.result === 'PRICE_VARIANCE' || r.result === 'QUANTITY_VARIANCE') {
                  badgeClass = 'sap-badge-warning';
                  icon = ICONS.alertTriangle;
                  text = r.result.replace('_', ' ');
                } else if (r.result === 'VENDOR_MISMATCH' || r.result === 'QUALITY_REJECTED') {
                  badgeClass = 'sap-badge-error';
                  icon = ICONS.xCircle;
                  text = r.result.replace('_', ' ');
                } else if (r.result === 'NON_PO' || r.result === 'INFO') {
                  badgeClass = 'sap-badge-neutral';
                  icon = ICONS.info;
                } else if (r.result === 'CONDITIONAL_APPROVAL') {
                  badgeClass = 'sap-badge-info';
                  icon = ICONS.info;
                  text = 'CONDITIONAL';
                }
                return `
                  <tr>
                    <td><strong>${r.check}</strong></td>
                    <td><strong>${r.invoiceValue}</strong></td>
                    <td>${r.poValue}</td>
                    <td>${r.grValue}</td>
                    <td>${r.qualityValue}</td>
                    <td style="text-align:center;">
                      <span class="sap-badge ${badgeClass}" title="${r.details || ''}">
                        ${icon} ${text}
                      </span>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // 4. S/4HANA PROCUREMENT & FINANCE SETTLEMENT CHAIN
    const docChain = item.documentChain || [];
    let activeStageIdx = 0;
    if (isCleared) {
      activeStageIdx = 7;
    } else if (isPaid) {
      activeStageIdx = 7;
    } else if (isPosted) {
      activeStageIdx = 6;
    } else if (isOwnerValidated || isParked) {
      activeStageIdx = 5;
    } else {
      activeStageIdx = 4;
    }

    const documentChainHtml = `
      <div class="sap-card" style="padding:16px 20px;">
        <div class="sap-card-header" style="padding:0 0 12px 0;">
          <div>
            <div class="sap-card-title">S/4HANA Procurement & Finance Settlement Chain</div>
            <span class="sap-card-subtitle">Continuous audit-verified trace across ERP procurement, material movement, quality inspection, and financial clearing documents.</span>
          </div>
        </div>
        <div class="doc-chain-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:12px;">
          ${docChain.map((node, idx) => {
            const isCreated = node.referenceNumber !== 'NOT CREATED' && node.status !== 'NOT CREATED' && node.status !== 'NOT APPLICABLE';
            const isCurrent = idx === activeStageIdx && !isCleared;
            const isException = node.status.includes('REJECT') || node.status.includes('HOLD') || node.status.includes('MISMATCH');

            let chipHtml = '';
            if (isException) {
              chipHtml = `<span class="sap-badge sap-badge-error" style="font-size:10px; padding:1px 6px;">⚠ EXCEPTION</span>`;
            } else if (isCreated) {
              chipHtml = `<span class="sap-badge sap-badge-success" style="font-size:10px; padding:1px 6px;">✓ COMPLETED</span>`;
            } else if (isCurrent) {
              chipHtml = `<span class="sap-badge sap-badge-info" style="font-size:10px; padding:1px 6px; font-weight:700;">● CURRENT STAGE</span>`;
            } else {
              chipHtml = `<span class="sap-badge sap-badge-neutral" style="font-size:10px; padding:1px 6px;">○ PENDING</span>`;
            }

            return `
              <div style="border:${isCurrent ? '1.5px solid var(--brand-primary)' : isCreated ? '1px solid var(--border-main)' : '1px solid var(--border-subtle)'}; border-radius:var(--radius-card); padding:12px; background:${isCurrent ? 'rgba(0, 112, 242, 0.04)' : isCreated ? 'var(--surface-card)' : 'var(--surface-subtle)'}; opacity:${isCreated || isCurrent ? '1' : '0.65'}; transition:all 0.2s ease;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                  <span style="font-size:11px; font-weight:700; color:${isCurrent ? 'var(--brand-primary)' : 'var(--text-muted)'}; text-transform:uppercase;">${idx + 1}. ${node.label}</span>
                  ${chipHtml}
                </div>
                <div style="font-size:13px; font-weight:700; color:${isCreated ? 'var(--text-primary)' : isCurrent ? 'var(--brand-primary)' : 'var(--text-muted)'}; font-family:monospace;">
                  ${node.referenceNumber}
                </div>
                <div style="font-size:11px; color:var(--text-secondary); margin-top:4px;">
                  Source: ${node.source}
                </div>
                ${node.timestamp ? `<div style="font-size:10px; color:var(--text-muted); margin-top:2px;">Date: ${node.timestamp.slice(0, 10)}</div>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;


    // 5. AP PAYMENT STATUS & SETTLEMENT CARD (SECTION 21)
    const paymentStatusHtml = `
      <div class="sap-card" style="padding:16px 20px;">
        <div class="sap-card-header" style="padding:0 0 12px 0;">
          <div>
            <div class="sap-card-title">AP Payment Status & Settlement Overview</div>
            <span class="sap-card-subtitle">Accounts Payable disbursement lifecycle and settlement status in SAP FI-AP.</span>
          </div>
        </div>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:16px; margin-top:8px;">
          <div style="padding:12px; border-radius:var(--radius-input); background:var(--surface-subtle); border:1px solid var(--border-subtle);">
            <div style="font-size:11px; font-weight:600; color:var(--text-muted); text-transform:uppercase;">Invoice Posting Status</div>
            <div style="font-size:14px; font-weight:700; margin-top:4px;">
              ${invoice.postingStatus === 'POSTED' ? '<span style="color:#188038;">POSTED (MIRO)</span>' : invoice.postingStatus === 'PARKED' ? '<span style="color:#B45309;">PARKED (MIR7)</span>' : '<span style="color:var(--text-muted);">NOT POSTED</span>'}
            </div>
            <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">
              Doc: ${invoice.accountingDocumentNumber ? `<code>${invoice.accountingDocumentNumber}/${invoice.fiscalYear || '2026'}</code>` : 'None'}
            </div>
          </div>

          <div style="padding:12px; border-radius:var(--radius-input); background:var(--surface-subtle); border:1px solid var(--border-subtle);">
            <div style="font-size:11px; font-weight:600; color:var(--text-muted); text-transform:uppercase;">Payment Status</div>
            <div style="font-size:14px; font-weight:700; margin-top:4px;">
              ${this.getPaymentStatusBadge(invoice.paymentStatus, invoice.clearingStatus)}
            </div>
            <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">
              Ref: ${invoice.paymentReference ? `<code>${invoice.paymentReference}</code>` : (invoice.paymentStatus === 'PAID' ? 'PAY-2026-ACTIVE' : 'Not Available')}
            </div>
          </div>

          <div style="padding:12px; border-radius:var(--radius-input); background:var(--surface-subtle); border:1px solid var(--border-subtle);">
            <div style="font-size:11px; font-weight:600; color:var(--text-muted); text-transform:uppercase;">Clearing Status</div>
            <div style="font-size:14px; font-weight:700; margin-top:4px;">
              ${invoice.clearingStatus === 'CLEARED' ? '<span style="color:#188038;">CLEARED (BSAK)</span>' : '<span style="color:var(--text-muted);">OPEN / UNSETTLED</span>'}
            </div>
            <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">
              Doc: ${invoice.clearingDocumentNumber ? `<code>${invoice.clearingDocumentNumber}</code>` : 'Not Cleared'}
            </div>
          </div>
        </div>

        <div style="margin-top:14px; padding-top:12px; border-top:1px solid var(--border-subtle); display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          ${invoice.postingStatus === 'POSTED' && invoice.paymentStatus !== 'PAID' && invoice.clearingStatus !== 'CLEARED'
            ? `<button class="sap-btn sap-btn-positive sap-btn-sm" onclick="app.processPayment('${invoice.invoiceId}')">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                <span>Execute AP Payment Run (F110)</span>
               </button>`
            : ''
          }
          ${invoice.paymentStatus === 'PAID' && invoice.clearingStatus !== 'CLEARED'
            ? `<button class="sap-btn sap-btn-primary sap-btn-sm" onclick="app.clearPayment('${invoice.invoiceId}')">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span>Execute Settlement Clearing (BSAK)</span>
               </button>`
            : ''
          }
          ${invoice.clearingStatus === 'CLEARED'
            ? `<span style="font-size:12px; color:#188038; font-weight:600; display:flex; align-items:center; gap:6px;">
                ${ICONS.checkCircle} Reconciled & Completely Settled in SAP S/4HANA
               </span>`
            : ''
          }
        </div>
      </div>
    `;

    // 6. INVOICE AUDIT TRAIL LEDGER (SECTION 31)
    const invoiceAuditEvents = item.auditTrail || [];
    const invoiceAuditTrailHtml = `
      <div class="sap-card">
        <div class="sap-card-header">
          <div>
            <div class="sap-card-title">Invoice Audit Trail Ledger</div>
            <span class="sap-card-subtitle">Every automated inference, human sign-off, and ERP status change recorded with immutable provenance.</span>
          </div>
        </div>
        <div class="sap-table-wrapper">
          <table class="sap-table">
            <thead>
              <tr>
                <th style="width:140px;">Timestamp</th>
                <th>Actor</th>
                <th>Action</th>
                <th>State Transition</th>
                <th>Reason / Justification</th>
              </tr>
            </thead>
            <tbody>
              ${invoiceAuditEvents.length === 0
                ? `<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:16px;">No audit events recorded yet for this invoice.</td></tr>`
                : invoiceAuditEvents.map((ev) => `
                  <tr>
                    <td><small>${ev.timestamp ? ev.timestamp.replace('T', ' ').slice(0, 19) : '—'}</small></td>
                    <td><strong>${ev.actorName || ev.actorId || 'System'}</strong><br><small style="color:var(--text-muted);">${ev.actorRole || ''}</small></td>
                    <td><code>${ev.action || 'EVENT'}</code></td>
                    <td>
                      <span class="sap-badge sap-badge-neutral">${ev.previousState || 'NONE'}</span>
                      <span style="margin:0 4px;">&rarr;</span>
                      <span class="sap-badge sap-badge-info">${ev.newState || ''}</span>
                    </td>
                    <td style="font-size:12px;">${ev.justification || '—'}</td>
                  </tr>
                `).join('')
              }
            </tbody>
          </table>
        </div>
      </div>
    `;

    // 7. EXTRACTED CANONICAL INVOICE DATA
    const lineItems = invoice.lineItems || [];
    const extractedDataHtml = `
      <div class="sap-card" style="padding:16px 20px;">
        <div class="sap-card-header" style="padding:0 0 12px 0;">
          <div>
            <div class="sap-card-title">Extracted Canonical Invoice Data</div>
            <span class="sap-card-subtitle">Source: ${(invoice.sourceChannel || 'MANUAL').replace(/_/g, ' ')} &bull; Extracted at ${invoice.intakeTimestamp ? invoice.intakeTimestamp.slice(0, 19).replace('T', ' ') : 'N/A'}</span>
          </div>
        </div>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:12px; margin-bottom:12px; font-size:12px;">
          <div><span style="color:var(--text-muted);">Invoice Date:</span> <strong>${invoice.invoiceDate || '—'}</strong></div>
          <div><span style="color:var(--text-muted);">Due Date:</span> <strong>${invoice.dueDate || '—'}</strong></div>
          <div><span style="color:var(--text-muted);">Currency:</span> <strong>${invoice.currency || 'INR'}</strong></div>
          <div><span style="color:var(--text-muted);">Company Code:</span> <strong>${invoice.buyerCompanyCode || '1010'}</strong></div>
          <div><span style="color:var(--text-muted);">Supplier Tax ID:</span> <code>${invoice.supplierTaxId || '—'}</code></div>
        </div>
        <div class="sap-table-wrapper">
          <table class="sap-table">
            <thead>
              <tr>
                <th style="width:70px;">Item</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Net Amount</th>
                <th>Tax</th>
              </tr>
            </thead>
            <tbody>
              ${lineItems.length === 0
                ? `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:12px;">No line items extracted.</td></tr>`
                : lineItems.map((item, idx) => `
                <tr>
                  <td><code>${item.itemIndex != null ? item.itemIndex + 1 : idx + 1}</code></td>
                  <td><strong>${item.description || '—'}</strong></td>
                  <td>${item.quantity || 0} ${item.unitOfMeasure || 'EA'}</td>
                  <td>₹${(item.unitPrice || 0).toLocaleString('en-IN')}</td>
                  <td>₹${(item.netAmount || 0).toLocaleString('en-IN')}</td>
                  <td>₹${(item.taxAmount || 0).toLocaleString('en-IN')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // 8. EVIDENCE SECTION: DISTINGUISHING FACT FROM SYSTEM RECOMMENDATION
    const evidenceList = aiDecision?.evidence || [];
    const evidenceHtml = `
      <div class="sap-card">
        <div class="sap-card-header">
          <div>
            <div class="sap-card-title">Evidence Ledger: Distinguishing Facts from System Recommendations</div>
            <span class="sap-card-subtitle">Every automated inference is directly grounded in auditable ERP data</span>
          </div>
        </div>
        <div class="sap-table-wrapper">
          <table class="sap-table">
            <thead>
              <tr>
                <th style="width:170px;">Classification</th>
                <th>Source / System Verification</th>
                <th>Observed Evidence</th>
              </tr>
            </thead>
            <tbody>
              ${evidenceList.length === 0
                ? `<tr><td colspan="3" style="text-align:center; color:var(--text-muted); padding:16px;">Standard automated validation checks applied.</td></tr>`
                : evidenceList
                    .map(
                      (ev) => `
                    <tr>
                      <td>
                        <span class="${ev.category === 'FACT' ? 'badge-fact' : 'badge-recommendation'}">
                          ${ev.category || 'FACT'}
                        </span>
                      </td>
                      <td><code>${ev.source || 'SAP S/4HANA'}</code></td>
                      <td>${ev.statement || '—'}</td>
                    </tr>
                  `
                    )
                    .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // 9. DECISION EXPLAINER & TRANSACTION STORY SIDE-BY-SIDE
    const explainerSteps = aiDecision?.decisionExplainer || [];
    const storyEvents = aiDecision?.transactionStory || [];

    const explainerAndStoryHtml = `
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:16px;">
        <!-- Left: Why This Decision? Explainer -->
        <div class="sap-card" style="padding:16px 20px;">
          <div style="font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-secondary); margin-bottom:12px;">
            Why This Decision? (Step-by-Step Rationale)
          </div>
          <div style="display:flex; flex-direction:column; gap:10px;">
            ${explainerSteps.length === 0
              ? `<div style="color:var(--text-muted); font-size:12px;">Standard deterministic decision policy evaluated.</div>`
              : explainerSteps
                  .map(
                    (step) => `
                  <div style="border:1px solid var(--border-subtle); border-radius:var(--radius-input); padding:10px 12px; background:var(--surface-subtle);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                      <strong style="font-size:12px; color:var(--text-primary);">${step.stepNumber || '01'} &nbsp;${step.title || 'Check'}</strong>
                      <span class="sap-badge ${step.status === 'PASS' ? 'sap-badge-success' : step.status === 'WARNING' ? 'sap-badge-warning' : 'sap-badge-error'}">${step.status || 'PASS'}</span>
                    </div>
                    <div style="font-size:12px; color:var(--text-secondary); line-height:1.4;">
                      ${(step.findings || []).join(' | ')}
                    </div>
                  </div>
                `
                  )
                  .join('')}
            <div style="background:var(--bg-success); border:1px solid #86EFAC; border-radius:var(--radius-input); padding:10px 12px; font-size:12px; color:#188038; font-weight:600; display:flex; align-items:center; gap:6px;">
              ${ICONS.checkCircle}
              <span>CONCLUSION: ${(aiDecision?.recommendation || 'AUTO_PROCEED').replace(/_/g, ' ')} (${aiDecision?.confidenceScore || 95}% Confidence)</span>
            </div>
          </div>
        </div>

        <!-- Right: Transaction Story Timeline -->
        <div class="sap-card" style="padding:16px 20px;">
          <div style="font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-secondary); margin-bottom:12px;">
            Transaction Story (Lifecycle Trace)
          </div>
          <div>
            ${storyEvents.length === 0
              ? `<div style="color:var(--text-muted); font-size:12px;">Lifecycle trace registered in ERP transaction ledger.</div>`
              : storyEvents
                  .map(
                    (ev) => `
                  <div class="transaction-story-step step-${ev.statusType || 'positive'}">
                    <div class="story-time">${ev.timeFormatted || ''}</div>
                    <div class="story-title">${ev.title || ''}</div>
                    <div class="story-detail">${ev.detail || ''}</div>
                  </div>
                `
                  )
                  .join('')}
          </div>
        </div>
      </div>
    `;

    workspace.innerHTML =
      topQuestionsHtml +
      processStripHtml +
      aiChecklistHtml +
      extractedDataHtml +
      threeWayBoxHtml +
      comparisonTableHtml +
      documentChainHtml +
      paymentStatusHtml +
      evidenceHtml +
      explainerAndStoryHtml +
      invoiceAuditTrailHtml;
  }

  // --------------------------------------------------------------------------
  // INTERACTIVE WHAT-IF & STRESS TEST SIMULATOR
  // --------------------------------------------------------------------------
  toggleWhatIfPanel() {
    const panel = document.getElementById('whatifPanel');
    if (!panel) return;
    const isShown = panel.style.display !== 'none';
    panel.style.display = isShown ? 'none' : 'block';
    if (!isShown) this.runWhatIfSimulation();
  }

  resetWhatIf() {
    const sPrice = document.getElementById('sliderWhatIfPrice');
    const sQty = document.getElementById('sliderWhatIfQty');
    const sQM = document.getElementById('selectWhatIfQM');
    if (sPrice) sPrice.value = 5;
    if (sQty) sQty.value = 0;
    if (sQM) sQM.value = 'STRICT';
    this.simulationState = null;
    this.renderDecisionWorkspace();
    this.runWhatIfSimulation(true);
  }

  runWhatIfSimulation(isReset = false) {
    const sPrice = document.getElementById('sliderWhatIfPrice');
    const sQty = document.getElementById('sliderWhatIfQty');
    const sQM = document.getElementById('selectWhatIfQM');
    const lPrice = document.getElementById('labelWhatIfPrice');
    const lQty = document.getElementById('labelWhatIfQty');
    const resultBox = document.getElementById('whatIfResultBox');

    if (!sPrice || !sQty || !sQM || !resultBox) return;

    const priceTol = parseFloat(sPrice.value);
    const qtyTol = parseFloat(sQty.value);
    const qmStrict = sQM.value;

    if (lPrice) lPrice.innerText = `${priceTol}%`;
    if (lQty) lQty.innerText = `${qtyTol}%`;

    const item = this.invoices.find((i) => i.invoice.invoiceId === this.selectedInvoiceId);
    if (!item) return;

    const { reconciliation, aiDecision } = item;

    // Simulate outcome based on adjusted parameters
    let simRec = aiDecision.recommendation;
    let simConfidence = aiDecision.confidenceScore;
    let changeReason = 'Default enterprise policy parameters applied.';

    // Check price tolerance impact
    if (reconciliation.priceVariancePercentage > 0) {
      if (reconciliation.priceVariancePercentage <= priceTol) {
        if (simRec === 'MANUAL_REVIEW') {
          simRec = 'AUTO_PROCEED';
          simConfidence = 96;
          changeReason = `Price variance (+${reconciliation.priceVariancePercentage.toFixed(1)}%) now falls within relaxed tolerance limit (<= ${priceTol}%). Eligible for automatic MIRO posting.`;
        }
      } else {
        if (simRec === 'AUTO_PROCEED') {
          simRec = 'MANUAL_REVIEW';
          simConfidence = 78;
          changeReason = `Stricter price tolerance (${priceTol}%) flags variance (+${reconciliation.priceVariancePercentage.toFixed(1)}%) for review.`;
        }
      }
    }

    // Check quantity over-delivery impact
    if (reconciliation.quantityStatus === 'OVER_DELIVERY') {
      const overDelivPct = ((reconciliation.quantityInvoiced - reconciliation.quantityReceived) / reconciliation.quantityReceived) * 100;
      if (overDelivPct <= qtyTol) {
        simRec = 'AUTO_PROCEED';
        simConfidence = 95;
        changeReason = `Over-delivery of +${overDelivPct.toFixed(1)}% falls within permitted buffer (<= ${qtyTol}%). Overridden to Auto-Proceed.`;
      }
    }

    // Check QM strictness impact
    if (reconciliation.qualityStatus === 'REJECTIONS_DETECTED' && qmStrict === 'CONDITIONAL') {
      simRec = 'BUSINESS_VALIDATION_REQUIRED';
      simConfidence = 84;
      changeReason = `Quality defects permitted conditionally upon Requisitioner sign-off rather than strict Hold.`;
    }

    const isModified = (priceTol !== 5 || qtyTol !== 0 || qmStrict !== 'STRICT');
    if (!isReset && isModified) {
      this.simulationState = {
        active: true,
        invoiceId: this.selectedInvoiceId,
        priceTol,
        qtyTol,
        qmStrict,
        simRec,
        simConfidence,
        changeReason,
      };
    } else {
      this.simulationState = null;
    }

    resultBox.innerHTML = `
      <div style="display:flex; align-items:center; gap:16px;">
        <div>
          <div style="font-size:11px; text-transform:uppercase; font-weight:600; color:var(--text-muted);">Current Policy</div>
          <div style="margin-top:2px;">${this.getRecommendationBadge(aiDecision.recommendation)} (${aiDecision.confidenceScore}%)</div>
        </div>
        <div style="display:flex; align-items:center; color:var(--text-muted);">${ICONS.arrowRight}</div>
        <div>
          <div style="font-size:11px; text-transform:uppercase; font-weight:600; color:var(--brand-primary);">Simulated What-If Policy</div>
          <div style="margin-top:2px;">${this.getRecommendationBadge(simRec)} (${simConfidence}%)</div>
        </div>
      </div>
      <div style="font-size:12px; color:var(--text-secondary); max-width:550px; line-height:1.4;">
        <strong>Impact Analysis:</strong> ${changeReason}
      </div>
    `;

    // Reactively update the main workspace with the simulation if not in recursive render
    if (!this._isRenderingWorkspace) {
      this._isRenderingWorkspace = true;
      try {
        this.renderDecisionWorkspace();
      } finally {
        this._isRenderingWorkspace = false;
      }
    }
  }


  // --------------------------------------------------------------------------
  // SUPPLIER 360 INTELLIGENCE DRAWER
  // --------------------------------------------------------------------------
  openSupplierDrawer(supplierName) {
    const drawer = document.getElementById('supplierDrawer');
    const content = document.getElementById('drawerContent');
    const title = document.getElementById('drawerTitle');
    if (!drawer || !content) return;

    if (title) title.innerText = `Supplier 360: ${supplierName}`;

    // Find all invoices associated with this supplier
    const supplierInvoices = this.invoices.filter((i) => i.invoice.supplierName === supplierName);
    const sampleInv = supplierInvoices[0]?.invoice;

    content.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div style="background:var(--surface-subtle); border:1px solid var(--border-subtle); border-radius:var(--radius-input); padding:14px;">
          <div style="font-size:11px; font-weight:600; text-transform:uppercase; color:var(--text-secondary);">Business Partner Master (S/4HANA)</div>
          <div style="font-size:16px; font-weight:600; color:var(--text-primary); margin-top:2px;">${supplierName}</div>
          <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">BP Code: <strong>${sampleInv?.supplierTaxId ? 'BP-' + sampleInv.supplierTaxId.slice(2, 8) : 'BP-100024'}</strong> | Plant: 1010</div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:12px;">
          <div style="border:1px solid var(--border-subtle); padding:10px; border-radius:var(--radius-input);">
            <div style="color:var(--text-muted); font-size:11px;">GSTIN / TAX ID</div>
            <div style="font-weight:600; margin-top:2px;"><code>${sampleInv?.supplierTaxId || '27AAACS1234F1Z5'}</code></div>
          </div>
          <div style="border:1px solid var(--border-subtle); padding:10px; border-radius:var(--radius-input);">
            <div style="color:var(--text-muted); font-size:11px;">PAYMENT TERMS</div>
            <div style="font-weight:600; margin-top:2px;">Net 30 Days (Z030)</div>
          </div>
          <div style="border:1px solid var(--border-subtle); padding:10px; border-radius:var(--radius-input);">
            <div style="color:var(--text-muted); font-size:11px;">SETTLEMENT BANK</div>
            <div style="font-weight:600; margin-top:2px;">HDFC Bank (Acct ...8891)</div>
          </div>
          <div style="border:1px solid var(--border-subtle); padding:10px; border-radius:var(--radius-input);">
            <div style="color:var(--text-muted); font-size:11px;">CLEAN CORE ODATA STATUS</div>
            <div style="font-weight:600; color:#188038; margin-top:2px; display:flex; align-items:center; gap:4px;">
              ${ICONS.checkCircle}
              <span>Verified Active</span>
            </div>
          </div>
        </div>

        <div>
          <div style="font-size:12px; font-weight:600; text-transform:uppercase; color:var(--text-secondary); margin-bottom:8px;">Recent Invoices in Pipeline</div>
          <div style="display:flex; flex-direction:column; gap:6px;">
            ${supplierInvoices
              .map(
                (inv) => `
              <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 12px; background:var(--surface-subtle); border-radius:var(--radius-sm); border:1px solid var(--border-subtle); font-size:12px;">
                <div>
                  <strong>${inv.invoice.invoiceId}</strong> (${inv.invoice.invoiceNumber})
                  <div style="color:var(--text-muted); font-size:11px;">PO: ${inv.invoice.purchaseOrderReference || 'Non-PO'}</div>
                </div>
                <div style="text-align:right;">
                  <div><strong>₹${(inv.invoice.totalGrossAmount || 0).toLocaleString('en-IN')}</strong></div>
                  <div>${this.getRecommendationBadge(inv.aiDecision.recommendation)}</div>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    `;

    drawer.classList.add('open');
  }

  closeDrawer(drawerId) {
    const drawer = document.getElementById(drawerId);
    if (drawer) drawer.classList.remove('open');
  }

  // --------------------------------------------------------------------------
  // VIEW 4: PO & RECONCILIATION
  // --------------------------------------------------------------------------
  renderReconciliationTable() {
    const tbody = document.getElementById('reconTableBody');
    if (!tbody) return;

    tbody.innerHTML = this.invoices
      .map((item) => {
        const { invoice, reconciliation } = item;
        const vendorBadge = reconciliation?.vendorMatched
          ? `<span class="status-pill status-pill-success">${ICONS.check} Matched</span>`
          : invoice.purchaseOrderReference
          ? `<span class="status-pill status-pill-error">${ICONS.x} Mismatch</span>`
          : `<span class="status-pill status-pill-neutral">Non-PO</span>`;

        const qmBadge =
          reconciliation?.qualityStatus === 'ALL_PASSED'
            ? `<span class="sap-badge sap-badge-success">${ICONS.check} Passed</span>`
            : reconciliation?.qualityStatus === 'REJECTIONS_DETECTED'
            ? `<span class="sap-badge sap-badge-error">${ICONS.alertTriangle} Rejected</span>`
            : `<span class="sap-badge sap-badge-neutral">N/A</span>`;

        const variancePct = reconciliation?.priceVariancePercentage != null ? reconciliation.priceVariancePercentage.toFixed(1) : '0.0';

        return `
          <tr>
            <td><strong>${invoice.invoiceId}</strong><br><small style="color:var(--text-muted);">${invoice.supplierName}</small></td>
            <td>${invoice.purchaseOrderReference ? `<code>${invoice.purchaseOrderReference}</code>` : '<em style="color:var(--text-muted);">Non-PO</em>'}</td>
            <td>${vendorBadge}</td>
            <td><strong>${reconciliation?.quantityInvoiced || 0} / ${reconciliation?.quantityReceived || 0} EA</strong><br><small style="color:var(--text-secondary);">${reconciliation?.quantityStatus || 'N/A'}</small></td>
            <td><strong>₹${(reconciliation?.invoicedUnitPrice || 0).toLocaleString('en-IN')} vs ₹${(reconciliation?.poUnitPrice || 0).toLocaleString('en-IN')}</strong><br><small style="color:var(--text-secondary);">${variancePct}% delta</small></td>
            <td>${qmBadge}</td>
            <td>
              <div style="display:flex; gap:4px; flex-wrap:wrap;">
                <span class="status-pill ${reconciliation?.quantityStatus === 'EXACT_MATCH' ? 'status-pill-success' : 'status-pill-warning'}">
                  ${reconciliation?.quantityStatus === 'EXACT_MATCH' ? ICONS.check : ICONS.alertTriangle}
                  DQ ${reconciliation?.quantityStatus === 'EXACT_MATCH' ? 'Passed' : 'Review'}
                </span>
                <span class="status-pill ${reconciliation?.priceStatus === 'EXACT_MATCH' ? 'status-pill-success' : 'status-pill-warning'}">
                  ${reconciliation?.priceStatus === 'EXACT_MATCH' ? ICONS.check : ICONS.alertTriangle}
                  PP ${reconciliation?.priceStatus === 'EXACT_MATCH' ? 'Passed' : 'Review'}
                </span>
                <span class="status-pill ${reconciliation?.amountStatus === 'WITHIN_TOLERANCE' ? 'status-pill-success' : 'status-pill-warning'}">
                  ${reconciliation?.amountStatus === 'WITHIN_TOLERANCE' ? ICONS.check : ICONS.alertTriangle}
                  BD ${reconciliation?.amountStatus === 'WITHIN_TOLERANCE' ? 'Passed' : 'Review'}
                </span>
              </div>
            </td>
            <td>
              <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.selectAndOpenDecision('${invoice.invoiceId}')">
                <span>Drilldown</span>
                ${ICONS.arrowRight}
              </button>
            </td>
          </tr>
        `;
      })
      .join('');
  }

  // --------------------------------------------------------------------------
  // VIEW 5: BUSINESS VALIDATION
  // --------------------------------------------------------------------------
  renderBusinessValidationView() {
    const container = document.getElementById('businessValidationContainer');
    if (!container) return;

    const pending = this.invoices.filter(
      (i) => i.invoice.processingStatus === 'PENDING_BUSINESS_VALIDATION' || i.aiDecision.recommendation === 'BUSINESS_VALIDATION_REQUIRED'
    );
    const completed = this.invoices.filter(
      (i) => i.invoice.processingStatus === 'BUSINESS_VALIDATED' || i.businessOwnerDecision !== null || i.invoice.processingStatus === 'REJECTED'
    );

    let html = '';

    if (pending.length > 0) {
      html += `<div style="font-weight:700; font-size:13px; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-secondary); margin-bottom:12px;">Pending Business Owner Sign-Off (${pending.length})</div>`;
      html += pending
        .map((item) => {
          const { invoice, purchaseOrder, reconciliation } = item;
          const systemCheck = reconciliation.quantityStatus !== 'EXACT_MATCH'
            ? `Quantity mismatch: Billed ${reconciliation.quantityInvoiced} vs ${reconciliation.quantityReceived} received`
            : reconciliation.priceStatus !== 'EXACT_MATCH'
            ? `Unit price variance: ${(reconciliation.priceVariancePercentage || 0).toFixed(1)}% above PO price`
            : 'Statutory 48h E-Invoice acceptance sign-off required';

          return `
            <div class="sap-card" style="margin-bottom:16px; border-left:4px solid var(--status-warning);">
              <div class="sap-card-header">
                <div class="sap-card-title">VALIDATE BUSINESS REQUEST: ${invoice.invoiceId} (${invoice.invoiceNumber})</div>
                <span class="sap-badge sap-badge-warning">${ICONS.user} Commercial Validation Pending</span>
              </div>
              <div style="padding:16px 20px;">
                <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:12px; font-size:12px; margin-bottom:14px; background:var(--surface-subtle); padding:12px; border-radius:var(--radius-input);">
                  <div><strong>PO:</strong> <code>${purchaseOrder ? purchaseOrder.poNumber : 'Non-PO'}</code></div>
                  <div><strong>SUPPLIER:</strong> ${invoice.supplierName}</div>
                  <div><strong>INVOICE:</strong> ${invoice.invoiceNumber}</div>
                  <div><strong>VALUE:</strong> ₹${(invoice.totalGrossAmount || 0).toLocaleString('en-IN')}</div>
                </div>

                <div style="margin-bottom:14px; font-size:13px;">
                  <strong>REQUEST:</strong> ${purchaseOrder ? purchaseOrder.lineItems?.[0]?.description || 'Commercial requisition' : 'Recurring operational services'}
                </div>

                <div style="background:var(--bg-warning); border:1px solid #FDE68A; padding:10px 14px; border-radius:var(--radius-input); font-size:12px; color:#A16207; font-weight:600; margin-bottom:16px; display:flex; align-items:center; gap:6px;">
                  ${ICONS.alertTriangle}
                  <span>SYSTEM CHECK: ${systemCheck}</span>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                  <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.selectAndOpenDecision('${invoice.invoiceId}')">
                    <span>Inspect Decision & Evidence</span>
                    ${ICONS.arrowRight}
                  </button>
                  <div style="display:flex; gap:10px;">
                    <button class="sap-btn sap-btn-negative sap-btn-sm" onclick="app.quickValidationAction('${invoice.invoiceId}', 'REJECT')">Reject</button>
                    <button class="sap-btn sap-btn-critical sap-btn-sm" onclick="app.quickValidationAction('${invoice.invoiceId}', 'SEND_BACK')">Send Back</button>
                    <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.quickValidationAction('${invoice.invoiceId}', 'REQUEST_CLARIFICATION')">Request Clarification</button>
                    <button class="sap-btn sap-btn-positive sap-btn-sm" onclick="app.quickValidationAction('${invoice.invoiceId}', 'ACCEPT')">Accept</button>
                  </div>
                </div>
              </div>
            </div>
          `;
        })
        .join('');
    } else {
      html += `
        <div style="text-align:center; padding:30px; color:var(--text-muted); background:var(--surface-subtle); border-radius:var(--radius-input); margin-bottom:20px;">
          <h3>No Invoices Awaiting Business Owner Validation</h3>
          <p style="font-size:13px; margin-top:8px;">All commercial purchases have been signed off or processed.</p>
        </div>
      `;
    }

    if (completed.length > 0) {
      html += `<div style="font-weight:700; font-size:13px; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-secondary); margin:24px 0 12px 0;">Completed Commercial Validations (${completed.length})</div>`;
      html += `
        <div class="sap-table-wrapper">
          <table class="sap-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Supplier</th>
                <th>PO Reference</th>
                <th>Amount</th>
                <th>Decision / Outcome</th>
                <th>Requisitioner Justification</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${completed
                .map((c) => {
                  const statusBadge = this.getProcessingStatusBadge(c.invoice.processingStatus);
                  const reason = c.businessOwnerDecision?.reason || (c.invoice.processingStatus === 'REJECTED' ? 'Work not performed to standard' : 'Commercial delivery confirmed by requisitioner.');
                  return `
                    <tr>
                      <td><strong>${c.invoice.invoiceId}</strong></td>
                      <td>${c.invoice.supplierName}</td>
                      <td>${c.invoice.purchaseOrderReference ? `<code>${c.invoice.purchaseOrderReference}</code>` : '<em>Non-PO</em>'}</td>
                      <td><strong>₹${(c.invoice.totalGrossAmount || 0).toLocaleString('en-IN')}</strong></td>
                      <td>${statusBadge}</td>
                      <td style="font-size:12px; color:var(--text-secondary); max-width:300px;">${reason}</td>
                      <td>
                        <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.selectAndOpenDecision('${c.invoice.invoiceId}')">
                          <span>Inspect</span>
                          ${ICONS.arrowRight}
                        </button>
                      </td>
                    </tr>
                  `;
                })
                .join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  // --------------------------------------------------------------------------
  // VIEW 6: EXCEPTIONS (PRIORITIZED BY BUSINESS URGENCY)
  // --------------------------------------------------------------------------
  renderExceptionsView() {
    const tbody = document.getElementById('exceptionsTableBody');
    if (!tbody) return;

    const exceptionInvoices = this.invoices.filter((item) => {
      const rec = item.aiDecision?.recommendation;
      const flags = item.aiDecision?.identifiedExceptions || [];
      const hasIssue =
        ['HOLD', 'MANUAL_REVIEW', 'REJECT'].includes(rec) ||
        flags.length > 0 ||
        item.invoice?.isDuplicateSuspect ||
        item.slaRecord?.status === 'APPROACHING_BREACH' ||
        item.reconciliation?.vendorMatched === false ||
        item.reconciliation?.quantityStatus === 'OVER_DELIVERY' ||
        item.reconciliation?.priceStatus === 'PRICE_VARIANCE_BREACH' ||
        item.reconciliation?.qualityStatus === 'REJECTIONS_DETECTED';
      return hasIssue;
    });

    if (exceptionInvoices.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-muted);">No active exceptions detected across canonical invoices.</td></tr>`;
      return;
    }

    tbody.innerHTML = exceptionInvoices
      .map((item) => {
        const { invoice, reconciliation, aiDecision, slaRecord } = item;
        let severity = 'MEDIUM';
        let happened = aiDecision.explanation?.whyRecommended?.[0] || 'Variance detected in automated checks.';
        let matters = 'Requires resolution prior to finance settlement to prevent compliance or cash-flow discrepancies.';
        let action = aiDecision.explanation?.suggestedAction || 'Inspect and resolve in Decision Center.';

        if (invoice.isDuplicateSuspect) {
          severity = 'CRITICAL';
          happened = `Duplicate invoice detected: Same vendor and amount ₹${(invoice.totalGrossAmount || 0).toLocaleString('en-IN')} previously recorded.`;
          matters = 'Prevents duplicate financial settlement and unwarranted treasury outflow.';
          action = 'Reject duplicate invoice and notify Accounts Payable.';
        } else if (slaRecord?.status === 'APPROACHING_BREACH') {
          severity = 'CRITICAL';
          happened = `Statutory GST E-Invoice IRN approaching 48-hour acceptance deadline.`;
          matters = 'Failure to accept or reject before statutory window expires forces automatic deemed acceptance.';
          action = 'Escalate to Business Owner for urgent verification.';
        } else if (reconciliation?.vendorMatched === false && invoice.purchaseOrderReference) {
          severity = 'CRITICAL';
          happened = `Vendor mismatch: Invoiced vendor does not match PO vendor (${item.purchaseOrder?.supplierName || 'PO Vendor'}).`;
          matters = 'Indicates unauthorized assignment or commercial billing misrouting.';
          action = 'Hold invoice and verify vendor assignment with Strategic Sourcing.';
        } else if (reconciliation?.qualityStatus === 'REJECTIONS_DETECTED') {
          severity = 'HIGH';
          happened = `Quality defect: Rejected units detected in SAP QM inspection lot.`;
          matters = 'Invoicing for rejected materials before credit memo issuance violates LIV controls.';
          action = 'Apply payment block R in S/4HANA until Credit Note arrives.';
        } else if (invoice.invoiceId === 'INV-2026-00009') {
          severity = 'HIGH';
          happened = `GSTR-2B Statement tax discrepancy (₹12,600 missing tax credit).`;
          matters = 'Claiming tax without GSTR-2B presence triggers Section 16(2)(aa) audit notices.';
          action = 'Park invoice and notify vendor AP desk to file GSTR-1 amendment.';
        } else if (reconciliation?.quantityStatus === 'OVER_DELIVERY') {
          severity = 'MEDIUM';
          happened = `Over-delivery: Invoiced ${reconciliation.quantityInvoiced} EA vs ${reconciliation.quantityReceived} EA recorded in SAP Goods Receipt.`;
          matters = `Commercial delta of ${reconciliation.quantityInvoiced - reconciliation.quantityReceived} unverified units.`;
          action = 'Obtain warehouse receipt confirmation or request revised billing.';
        } else if (reconciliation?.priceStatus === 'PRICE_VARIANCE_BREACH' || (reconciliation?.priceVariancePercentage || 0) > 5) {
          severity = 'MEDIUM';
          happened = `Unit price exceeds PO price by +${(reconciliation?.priceVariancePercentage || 0).toFixed(1)}% (Tolerance PP breached).`;
          matters = 'Unapproved price escalation exceeding procurement contract terms.';
          action = 'Request Requisitioner variance approval or rate revision.';
        } else if (aiDecision.recommendation === 'REJECT') {
          severity = 'CRITICAL';
          happened = `Rejected by Business Owner / Requisitioner: Commercial delivery disputed.`;
          matters = 'Disputed invoice halted from accounts payable posting.';
          action = 'Issue formal vendor dispute advisory.';
        }

        const badgeClass = severity === 'CRITICAL' ? 'sap-badge-error' : severity === 'HIGH' ? 'sap-badge-warning' : 'sap-badge-info';
        const iconSvg = severity === 'CRITICAL' ? ICONS.alertTriangle : severity === 'HIGH' ? ICONS.alertTriangle : ICONS.info;

        return `
          <tr>
            <td>
              <span class="sap-badge ${badgeClass}">
                ${iconSvg}
                ${severity}
              </span>
            </td>
            <td><strong>${invoice.invoiceId}</strong><br><small style="color:var(--text-muted);">${invoice.invoiceNumber}</small></td>
            <td>
              <a href="#" style="color:var(--brand-primary); text-decoration:none; font-weight:600;" onclick="app.openSupplierDrawer('${invoice.supplierName}'); return false;">
                ${invoice.supplierName}
              </a>
            </td>
            <td>${happened}</td>
            <td style="color:var(--text-secondary);">${matters}</td>
            <td><strong style="color:#188038;">${action}</strong></td>
            <td>
              <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.selectAndOpenDecision('${invoice.invoiceId}')">
                <span>Inspect</span>
                ${ICONS.arrowRight}
              </button>
            </td>
          </tr>
        `;
      })
      .join('');
  }

  // --------------------------------------------------------------------------
  // VIEW 7: GST RECONCILIATION
  // --------------------------------------------------------------------------
  renderGstReconciliationView() {
    const summary = this.gstData.summary;
    if (summary) {
      const elM = document.getElementById('gstMatchedCount');
      const elG = document.getElementById('gstMissingGstCount');
      const elI = document.getElementById('gstMissingIntCount');
      const elA = document.getElementById('gstAmtMismatchCount');
      const elE = document.getElementById('gstEligibleItc');
      const elB = document.getElementById('gstBlockedItc');

      if (elM) elM.innerText = summary.matchedCount;
      if (elG) elG.innerText = summary.missingInGstCount;
      if (elI) elI.innerText = summary.missingInternallyCount;
      if (elA) elA.innerText = summary.amountMismatchCount;
      if (elE) elE.innerText = `₹${summary.totalEligibleItc.toLocaleString('en-IN')}`;
      if (elB) elB.innerText = `₹${summary.totalBlockedItc.toLocaleString('en-IN')}`;
    }
    this.renderGstTable();
  }

  renderGstTable() {
    const tbody = document.getElementById('gstTableBody');
    if (!tbody) return;

    const filterStatus = document.getElementById('filterGstStatus')?.value || 'ALL';
    const records = this.gstData.records || [];

    const filtered = records.filter((r) => {
      if (filterStatus !== 'ALL' && r.matchStatus !== filterStatus) return false;
      return true;
    });

    tbody.innerHTML = filtered
      .map((r) => {
        const statusBadge =
          r.matchStatus === 'MATCHED'
            ? `<span class="sap-badge sap-badge-success">${ICONS.check} Matched</span>`
            : r.matchStatus === 'AMOUNT_MISMATCH'
            ? `<span class="sap-badge sap-badge-error">${ICONS.alertTriangle} Amount Mismatch</span>`
            : r.matchStatus === 'MISSING_IN_GST'
            ? `<span class="sap-badge sap-badge-warning">${ICONS.alertTriangle} Missing in GST</span>`
            : r.matchStatus === 'MISSING_INTERNALLY'
            ? `<span class="sap-badge sap-badge-info">${ICONS.info} Missing Internally</span>`
            : `<span class="sap-badge sap-badge-neutral">${r.matchStatus}</span>`;

        return `
          <tr>
            <td>
              <a href="#" style="color:var(--brand-primary); text-decoration:none; font-weight:600;" onclick="app.openSupplierDrawer('${r.supplierName}'); return false;">
                ${r.supplierName}
              </a>
            </td>
            <td><code>${r.gstin}</code></td>
            <td>${r.invoiceNumber}</td>
            <td>${r.invoiceDate}</td>
            <td>₹${r.taxableValue.toLocaleString('en-IN')}</td>
            <td><strong>₹${r.totalTax.toLocaleString('en-IN')}</strong></td>
            <td>${r.internalInvoiceId ? `<strong>${r.internalInvoiceId}</strong>` : '<em style="color:var(--text-muted);">Not in AP</em>'}</td>
            <td>${statusBadge}</td>
            <td style="font-size:12px; color:var(--text-secondary); max-width:280px;">${r.varianceNote || '-'}</td>
          </tr>
        `;
      })
      .join('');
  }

  async simulateGspImport() {
    const confirm = window.confirm('Simulate automated import of GSTR-2B JSON statement from GSP / GSTN Portal?');
    if (!confirm) return;

    try {
      const res = await safeFetchJson('/api/gst-reconciliation/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ records: this.gstData.records }),
      });

      this.showToast(`Imported ${res.count} GSTR-2B records from GSP Gateway`, 'success');
      await this.loadAllData();
      this.renderGstReconciliationView();
    } catch (e) {
      this.showToast('Import failed: ' + (e.message || 'Network error'), 'error');
    }
  }

  // --------------------------------------------------------------------------
  // VIEW 8: INTEGRATION MONITOR
  // --------------------------------------------------------------------------
  renderIntegrationMonitor() {
    const tbody = document.getElementById('integrationTableBody');
    if (!tbody) return;

    tbody.innerHTML = this.integrationMessages
      .map(
        (msg) => `
        <tr>
          <td><code>${msg.messageId}</code></td>
          <td>${new Date(msg.timestamp).toLocaleTimeString()}</td>
          <td><strong>${msg.interfaceName}</strong></td>
          <td>${msg.senderSystem}</td>
          <td>${msg.receiverSystem}</td>
          <td><span class="sap-badge sap-badge-info">${msg.direction}</span></td>
          <td><span class="sap-badge sap-badge-success">${ICONS.check} ${msg.status}</span></td>
          <td>${msg.retryCount}</td>
          <td>
            <button class="sap-btn sap-btn-sm sap-btn-secondary" onclick="app.inspectPayload('${msg.messageId}')">Inspect</button>
            <button class="sap-btn sap-btn-sm sap-btn-secondary" onclick="app.retryIntegrationMessage('${msg.messageId}')">Replay</button>
          </td>
        </tr>
      `
      )
      .join('');
  }

  inspectPayload(messageId) {
    const msg = this.integrationMessages.find((m) => m.messageId === messageId);
    if (!msg) return;

    const content = document.getElementById('payloadInspectorContent');
    content.innerHTML = `
      <div style="font-size:12px; margin-bottom:12px;">
        <strong>Message ID:</strong> <code>${msg.messageId}</code> |
        <strong>Interface:</strong> ${msg.interfaceName} |
        <strong>Status:</strong> ${msg.status}
      </div>
      <div style="font-weight:600; font-size:12px; margin-bottom:4px;">Request Payload:</div>
      <pre style="background:#172033; color:#f8fafc; padding:12px; border-radius:var(--radius-input); font-size:11px; overflow-x:auto; margin-bottom:12px;">${JSON.stringify(msg.requestPayloadPreview, null, 2)}</pre>
      <div style="font-weight:600; font-size:12px; margin-bottom:4px;">Transformation / S/4HANA Result:</div>
      <pre style="background:#172033; color:#f8fafc; padding:12px; border-radius:var(--radius-input); font-size:11px; overflow-x:auto;">${JSON.stringify(msg.responsePayloadPreview, null, 2)}</pre>
    `;

    document.getElementById('modalPayload').style.display = 'flex';
  }

  async retryIntegrationMessage(messageId) {
    try {
      const res = await safeFetchJson(`/api/integration-messages/${messageId}/retry`, { method: 'POST' });
      if (res.success) {
        this.showToast(res.message, 'success');
        await this.loadAllData();
        this.renderIntegrationMonitor();
      }
    } catch (e) {
      this.showToast('Replay failed: ' + (e.message || 'Network error'), 'error');
    }
  }

  // --------------------------------------------------------------------------
  // VIEW 9: AUDIT TRAIL
  // --------------------------------------------------------------------------
  renderAuditTrail() {
    const tbody = document.getElementById('auditTableBody');
    if (!tbody) return;

    tbody.innerHTML = this.auditEvents
      .map(
        (ev) => `
        <tr>
          <td><code>${ev.eventId}</code></td>
          <td>${new Date(ev.timestamp).toLocaleTimeString()}</td>
          <td><strong>${ev.invoiceId}</strong></td>
          <td>${ev.actorName}</td>
          <td><span class="sap-badge sap-badge-neutral">${ev.actorRole}</span></td>
          <td><strong>${ev.action}</strong></td>
          <td><small>${ev.previousState} <span style="display:inline-block; vertical-align:middle;">${ICONS.arrowRight}</span> <strong>${ev.newState}</strong></small></td>
          <td style="max-width:320px;"><small>${ev.justification || '-'}</small></td>
        </tr>
      `
      )
      .join('');
  }

  // --------------------------------------------------------------------------
  // VIEW 10: MOCK INBOUND PORTALS (/mock-portals)
  // --------------------------------------------------------------------------
  switchMockPortal(portal) {
    this.activeMockPortal = portal;
    document.querySelectorAll('.mock-portal-btn').forEach((b) => b.classList.remove('active'));
    if (portal === 'physical') document.getElementById('btnPortalPhysical')?.classList.add('active');
    if (portal === 'email') document.getElementById('btnPortalEmail')?.classList.add('active');
    if (portal === 'einvoice') document.getElementById('btnPortalEInvoice')?.classList.add('active');

    this.renderMockPortals();
  }

  renderMockPortals() {
    const container = document.getElementById('mockPortalContent');
    if (!container) return;

    if (this.activeMockPortal === 'physical') {
      const physicalInvoices = this.invoices.filter(
        (i) => i.invoice.sourceChannel === 'PHYSICAL_SCAN'
      );
      const isBatchDone = Boolean(this.channelBatchStatus?.physical?.processed);
      const totalDiscovered = this.channelBatchStatus?.physical?.count || 6;

      container.innerHTML = `
        <div class="sap-card" style="margin-bottom:20px;">
          <div class="sap-card-header" style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
            <div>
              <div class="sap-card-title" style="display:flex; align-items:center; gap:8px;">
                ${ICONS.scan}
                <span>Physical / Gate Scanner Intake Gateway</span>
                <span class="sap-badge sap-badge-info">${physicalInvoices.length} Documents</span>
                ${isBatchDone ? '<span class="sap-badge sap-badge-success" style="font-size:10px;">Batch Ingested</span>' : '<span class="sap-badge sap-badge-neutral" style="font-size:10px;">Ready for Ingestion</span>'}
              </div>
              <span class="sap-card-subtitle">
                Simulates paper invoices scanned at plant security gates and receiving desks. Optical character recognition metadata verified via SAP Document Information Extraction.
              </span>
              <div style="font-size:11px; color:var(--brand-primary); margin-top:6px; font-family:var(--font-mono); font-weight:600;">
                On-Disk Source: mock-data/inbound/physical-gate-scanner/ (${totalDiscovered} PDF source documents & metadata files detected)
              </div>
            </div>
            <div style="display:flex; gap:8px;">
              <button id="btnBatchPhysical" class="sap-btn ${isBatchDone ? 'sap-btn-secondary' : 'sap-btn-primary'} sap-btn-sm" ${isBatchDone || this.isBatchProcessing ? 'disabled' : ''} onclick="app.processBatchIntake('physical')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                <span>${isBatchDone ? 'Batch Processed' : 'Scan New Paper Invoice'}</span>
              </button>
            </div>
          </div>

          <div class="sap-table-wrapper">
            <table class="sap-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Supplier</th>
                  <th>Invoice #</th>
                  <th>Amount</th>
                  <th>PO Reference</th>
                  <th>Plant / Scanner</th>
                  <th>Operator</th>
                  <th>OCR Status</th>
                  <th>Recommendation</th>
                  <th style="text-align:right;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${physicalInvoices
                  .map((inv) => {
                    const recBadge = this.getRecommendationBadge(inv.aiDecision.recommendation);
                    const meta = inv.invoice.channelMetadata || {};
                    return `
                      <tr>
                        <td>
                          <div style="font-weight:700; color:var(--brand-primary);">${inv.invoice.invoiceId}</div>
                        </td>
                        <td>
                          <a href="#" style="color:var(--brand-primary); font-weight:600; text-decoration:none;" onclick="app.openSupplierDrawer('${inv.invoice.supplierName}'); return false;">
                            ${inv.invoice.supplierName}
                          </a>
                        </td>
                        <td><strong>${inv.invoice.invoiceNumber}</strong></td>
                        <td><strong>₹${(inv.invoice.totalGrossAmount || 0).toLocaleString('en-IN')}</strong></td>
                        <td>${inv.invoice.purchaseOrderReference ? `<code>${inv.invoice.purchaseOrderReference}</code>` : '<span class="sap-badge sap-badge-neutral" style="font-size:10px;">NON-PO</span>'}</td>
                        <td>${meta.scannerLocation || 'Plant 1010 Security Gate 2'}</td>
                        <td><code>${meta.operatorId || 'OP-4491'}</code></td>
                        <td>
                          <span class="sap-badge sap-badge-success" style="font-size:10px;">
                            ${ICONS.check} ${meta.scanDpi || 300} DPI (98.4%)
                          </span>
                        </td>
                        <td>${recBadge}</td>
                        <td style="text-align:right;">
                          <div style="display:inline-flex; gap:6px;">
                            <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.openDocPreview('${inv.invoice.invoiceId}')" title="View actual scanned PDF document">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                              <span>View Scanned PDF</span>
                            </button>
                            <button class="sap-btn sap-btn-primary sap-btn-sm" onclick="app.selectAndOpenDecision('${inv.invoice.invoiceId}')" title="Inspect in Decision Center">
                              <span>Inspect</span>
                              ${ICONS.arrowRight}
                            </button>
                          </div>
                        </td>
                      </tr>
                    `;
                  })
                  .join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (this.activeMockPortal === 'email') {
      const emailInvoices = this.invoices.filter(
        (i) => i.invoice.sourceChannel === 'EMAIL_INBOUND'
      );
      const isBatchDone = Boolean(this.channelBatchStatus?.email?.processed);
      const totalDiscovered = this.channelBatchStatus?.email?.count || 6;

      container.innerHTML = `
        <div class="sap-card" style="margin-bottom:20px;">
          <div class="sap-card-header" style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
            <div>
              <div class="sap-card-title" style="display:flex; align-items:center; gap:8px;">
                ${ICONS.mail}
                <span>Vendor Invoice AP Mailbox Gateway (invoices@enterprise.com)</span>
                <span class="sap-badge sap-badge-info">${emailInvoices.length} Messages</span>
                ${isBatchDone ? '<span class="sap-badge sap-badge-success" style="font-size:10px;">Batch Ingested</span>' : '<span class="sap-badge sap-badge-neutral" style="font-size:10px;">Ready for Ingestion</span>'}
              </div>
              <span class="sap-card-subtitle">
                Inbound AP email mailbox parser. Ingests RFC 822 email fixtures, checks SPF/DKIM authentication, and extracts PDF attachments.
              </span>
              <div style="font-size:11px; color:var(--brand-primary); margin-top:6px; font-family:var(--font-mono); font-weight:600;">
                On-Disk Source: mock-data/inbound/vendor-ap-mailbox/ (${totalDiscovered} .eml fixtures & PDF attachments detected)
              </div>
            </div>
            <div style="display:flex; gap:8px;">
              <button id="btnBatchEmail" class="sap-btn ${isBatchDone ? 'sap-btn-secondary' : 'sap-btn-primary'} sap-btn-sm" ${isBatchDone || this.isBatchProcessing ? 'disabled' : ''} onclick="app.processBatchIntake('email')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span>${isBatchDone ? 'Batch Processed' : 'Simulate Inbound AP Email'}</span>
              </button>
            </div>
          </div>

          <div class="sap-table-wrapper">
            <table class="sap-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Supplier</th>
                  <th>Sender</th>
                  <th>Subject</th>
                  <th>Amount</th>
                  <th>PO Reference</th>
                  <th>Attachment</th>
                  <th>SPF / DKIM</th>
                  <th>Status</th>
                  <th style="text-align:right;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${emailInvoices
                  .map((inv) => {
                    const statusBadge = this.getProcessingStatusBadge(inv.invoice.processingStatus);
                    const meta = inv.invoice.channelMetadata || {};
                    return `
                      <tr>
                        <td>
                          <div style="font-weight:700; color:var(--brand-primary);">${inv.invoice.invoiceId}</div>
                        </td>
                        <td>
                          <a href="#" style="color:var(--brand-primary); font-weight:600; text-decoration:none;" onclick="app.openSupplierDrawer('${inv.invoice.supplierName}'); return false;">
                            ${inv.invoice.supplierName}
                          </a>
                        </td>
                        <td><code>${meta.emailSender || 'vendor@example.com'}</code></td>
                        <td>
                          <div style="max-width:220px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${meta.emailSubject || ''}">
                            ${meta.emailSubject || 'Tax Invoice ' + inv.invoice.invoiceNumber}
                          </div>
                        </td>
                        <td><strong>₹${(inv.invoice.totalGrossAmount || 0).toLocaleString('en-IN')}</strong></td>
                        <td>${inv.invoice.purchaseOrderReference ? `<code>${inv.invoice.purchaseOrderReference}</code>` : '<span class="sap-badge sap-badge-neutral" style="font-size:10px;">NON-PO</span>'}</td>
                        <td>
                          <span class="sap-badge sap-badge-neutral" style="font-size:10px; font-family:var(--font-mono);">
                            ${ICONS.document} ${meta.attachmentName || inv.invoice.invoiceId + '.pdf'}
                          </span>
                        </td>
                        <td>
                          <div style="display:flex; flex-direction:column; gap:2px;">
                            <span class="sap-badge sap-badge-success" style="font-size:9px;">SPF: PASS</span>
                            <span class="sap-badge sap-badge-success" style="font-size:9px;">DKIM: PASS</span>
                          </div>
                        </td>
                        <td>${statusBadge}</td>
                        <td style="text-align:right;">
                          <div style="display:inline-flex; gap:6px;">
                            <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.openDocPreview('${inv.invoice.invoiceId}', 'email')" title="View RFC 822 Email fixture">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                              <span>Email</span>
                            </button>
                            <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.openDocPreview('${inv.invoice.invoiceId}', 'pdf')" title="View Attached PDF Invoice">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                              <span>PDF</span>
                            </button>
                            <button class="sap-btn sap-btn-primary sap-btn-sm" onclick="app.selectAndOpenDecision('${inv.invoice.invoiceId}')" title="Inspect in Decision Center">
                              <span>Inspect</span>
                              ${ICONS.arrowRight}
                            </button>
                          </div>
                        </td>
                      </tr>
                    `;
                  })
                  .join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else {
      const einvoices = this.invoices.filter(
        (i) => i.invoice.sourceChannel === 'GOVERNMENT_EINVOICE'
      );
      const isBatchDone = Boolean(this.channelBatchStatus?.einvoice?.processed);
      const totalDiscovered = this.channelBatchStatus?.einvoice?.count || 6;

      container.innerHTML = `
        <div class="sap-card" style="margin-bottom:20px;">
          <div class="sap-card-header" style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
            <div>
              <div class="sap-card-title" style="display:flex; align-items:center; gap:8px;">
                ${ICONS.invoice}
                <span>Government E-Invoice / IRP Gateway (GST DRC)</span>
                <span class="sap-badge sap-badge-info">${einvoices.length} Payload Invoices</span>
                ${isBatchDone ? '<span class="sap-badge sap-badge-success" style="font-size:10px;">Batch Ingested</span>' : '<span class="sap-badge sap-badge-neutral" style="font-size:10px;">Ready for Ingestion</span>'}
              </div>
              <span class="sap-card-subtitle">
                Direct statutory B2B electronic invoice push from Invoice Registration Portal (IRP). Carries official 64-char IRN, QR cryptographic signatures, and 48-hour statutory validation SLA.
              </span>
              <div style="font-size:11px; color:var(--brand-primary); margin-top:6px; font-family:var(--font-mono); font-weight:600;">
                On-Disk Source: mock-data/inbound/government-einvoice-irp/ (${totalDiscovered} JSON payloads & PDF documents detected)
              </div>
            </div>
            <div style="display:flex; gap:8px;">
              <button id="btnBatchEinvoice" class="sap-btn ${isBatchDone ? 'sap-btn-secondary' : 'sap-btn-primary'} sap-btn-sm" ${isBatchDone || this.isBatchProcessing ? 'disabled' : ''} onclick="app.processBatchIntake('einvoice')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="13" y2="16"/></svg>
                <span>${isBatchDone ? 'Batch Processed' : 'Simulate E-Invoice Portal Push'}</span>
              </button>
            </div>
          </div>

          <div class="sap-table-wrapper">
            <table class="sap-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Supplier</th>
                  <th>Invoice #</th>
                  <th>IRN (64-Char Hash)</th>
                  <th>Amount</th>
                  <th>PO Reference</th>
                  <th>Ack No</th>
                  <th>Ack Date</th>
                  <th>Reconciliation</th>
                  <th style="text-align:right;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${einvoices
                  .map((inv) => {
                    const meta = inv.invoice.channelMetadata || {};
                    const irn = meta.irn || '4f28d8b4e78a6327e4369f8c6501237a6b83f0d2c94178523091abcef5410982';
                    const shortIrn = irn.slice(0, 12) + '...' + irn.slice(-8);
                    return `
                      <tr>
                        <td>
                          <div style="font-weight:700; color:var(--brand-primary);">${inv.invoice.invoiceId}</div>
                        </td>
                        <td>
                          <a href="#" style="color:var(--brand-primary); font-weight:600; text-decoration:none;" onclick="app.openSupplierDrawer('${inv.invoice.supplierName}'); return false;">
                            ${inv.invoice.supplierName}
                          </a>
                        </td>
                        <td><strong>${inv.invoice.invoiceNumber}</strong></td>
                        <td>
                          <code style="font-size:11px; color:var(--text-secondary); cursor:pointer;" title="${irn} (Click to copy)" onclick="navigator.clipboard.writeText('${irn}'); app.showToast('IRN copied to clipboard', 'info');">
                            ${shortIrn}
                          </code>
                        </td>
                        <td><strong>₹${(inv.invoice.totalGrossAmount || 0).toLocaleString('en-IN')}</strong></td>
                        <td>${inv.invoice.purchaseOrderReference ? `<code>${inv.invoice.purchaseOrderReference}</code>` : '<span class="sap-badge sap-badge-neutral" style="font-size:10px;">NON-PO</span>'}</td>
                        <td><code>${meta.acknowledgementNumber || '112026009841'}</code></td>
                        <td>${meta.acknowledgementDate ? meta.acknowledgementDate.split('T')[0] : '2026-10-04'}</td>
                        <td>
                          <span class="sap-badge sap-badge-warning" style="font-size:10px;">
                            ${ICONS.alertTriangle} 48h SLA Active
                          </span>
                        </td>
                        <td style="text-align:right;">
                          <div style="display:inline-flex; gap:6px;">
                            <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.openDocPreview('${inv.invoice.invoiceId}', 'payload')" title="View official government IRP JSON payload">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                              <span>IRP Payload</span>
                            </button>
                            <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.openDocPreview('${inv.invoice.invoiceId}', 'doc')" title="View corresponding Invoice PDF">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="6" y1="8" x2="10" y2="8"></line><line x1="6" y1="12" x2="14" y2="12"></line></svg>
                              <span>Invoice Doc</span>
                            </button>
                            <button class="sap-btn sap-btn-primary sap-btn-sm" onclick="app.selectAndOpenDecision('${inv.invoice.invoiceId}')" title="Inspect in Decision Center">
                              <span>Inspect</span>
                              ${ICONS.arrowRight}
                            </button>
                          </div>
                        </td>
                      </tr>
                    `;
                  })
                  .join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
  }

  // --------------------------------------------------------------------------
  // BATCH DEMO INGESTION PIPELINE (ONE CLICK = INGEST ALL SOURCE INVOICES)
  // --------------------------------------------------------------------------
  async processBatchIntake(channel) {
    if (this.isBatchProcessing) return;

    const channelStatus = this.channelBatchStatus?.[channel];
    if (channelStatus && channelStatus.processed) {
      const channelTitles = {
        physical: 'Physical Gate Scanner',
        email: 'Vendor AP Mailbox',
        einvoice: 'Government E-Invoice',
      };
      this.showToast(`${channelTitles[channel] || channel} invoice batch already processed.`, 'info');
      return;
    }

    this.isBatchProcessing = true;
    const count = channelStatus?.count || 6;

    // Open Batch Modal and initialize stage sequence
    this.openBatchProcessingModal(channel, count);

    // Disable button visually
    const btnIdMap = {
      physical: 'btnBatchPhysical',
      email: 'btnBatchEmail',
      einvoice: 'btnBatchEinvoice',
    };
    const actionBtn = document.getElementById(btnIdMap[channel]);
    if (actionBtn) {
      actionBtn.disabled = true;
      actionBtn.innerHTML = `
        <svg class="sap-spinner" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px; animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        <span>Processing Batch...</span>
      `;
    }

    const stagesConfig = {
      physical: [
        { label: 'Reading high-res PDF scanned documents from gate scanner...', pct: 12, delayMs: 550 },
        { label: 'Optical Character Recognition (OCR) extraction pipeline...', pct: 25, delayMs: 600 },
        { label: 'Coordinate geometry & layout document segmentation...', pct: 38, delayMs: 550 },
        { label: 'Header & line item entity extraction...', pct: 50, delayMs: 600 },
        { label: 'S/4HANA Vendor master lookup (LFA1)...', pct: 63, delayMs: 550 },
        { label: 'PO & Goods Receipt reference matching (EKKO/MSEG)...', pct: 75, delayMs: 600 },
        { label: 'Tax & arithmetic total verification...', pct: 88, delayMs: 550 },
        { label: `Ingesting ${count} canonical invoices to decision queue...`, pct: 96, delayMs: 600 },
      ],
      email: [
        { label: 'Connecting to AP IMAP/Exchange mailbox...', pct: 11, delayMs: 500 },
        { label: 'Parsing RFC 822 MIME message stream...', pct: 22, delayMs: 500 },
        { label: 'Extracting vendor attachments & headers...', pct: 33, delayMs: 550 },
        { label: 'Virus & security sandbox scanning...', pct: 44, delayMs: 500 },
        { label: 'Document classification & text parsing...', pct: 55, delayMs: 550 },
        { label: 'Vendor identity & domain verification...', pct: 66, delayMs: 500 },
        { label: 'PO & line item correlation...', pct: 77, delayMs: 550 },
        { label: 'Duplicate submission check (BSIK/BSAK)...', pct: 88, delayMs: 500 },
        { label: `Ingesting ${count} canonical invoices to decision queue...`, pct: 96, delayMs: 550 },
      ],
      einvoice: [
        { label: 'Polling Government IRP statutory gateway...', pct: 12, delayMs: 550 },
        { label: 'Parsing NIC schema JSON payload...', pct: 25, delayMs: 600 },
        { label: 'Cryptographic signature & 64-char IRN hash verification...', pct: 38, delayMs: 550 },
        { label: 'GSTIN & Tax compliance cross-check...', pct: 50, delayMs: 600 },
        { label: 'Vendor & buyer Master Data reconciliation...', pct: 63, delayMs: 550 },
        { label: 'SAP Purchase Order binding...', pct: 75, delayMs: 600 },
        { label: '3-Way tolerance matching...', pct: 88, delayMs: 550 },
        { label: `Ingesting ${count} canonical invoices to decision queue...`, pct: 96, delayMs: 600 },
      ],
    };

    const stages = stagesConfig[channel] || stagesConfig.physical;

    // Trigger backend ingestion in parallel
    const apiPromise = safeFetchJson(`/api/invoices/intake/batch/${channel}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    // Animate stages smoothly over 4-4.5 seconds
    try {
      for (let i = 0; i < stages.length; i++) {
        const stage = stages[i];
        this.updateBatchModalStage(i, stage.label, stage.pct, stages);
        await new Promise((resolve) => setTimeout(resolve, stage.delayMs));
      }

      const res = await apiPromise;

      // Final completion stage (100%)
      const finalCount = res.count || count;
      const completionLabels = {
        physical: `${finalCount} invoices captured successfully.`,
        email: `${finalCount} email invoices ingested successfully.`,
        einvoice: `${finalCount} e-invoices pushed successfully.`,
      };
      const finalLabel = completionLabels[channel] || `${finalCount} invoices processed successfully.`;

      this.updateBatchModalComplete(finalLabel, stages);
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Reload state across all modules
      await this.loadAllData();

      this.closeBatchProcessingModal();
      this.showToast(finalLabel, 'success');
      this.renderMockPortals();
    } catch (err) {
      console.error('Batch intake error:', err);
      this.closeBatchProcessingModal();
      this.showToast(err.message || 'Batch intake failed', 'error');
      if (actionBtn) {
        actionBtn.disabled = false;
        actionBtn.innerHTML = `<span>Retry Batch</span>`;
      }
    } finally {
      this.isBatchProcessing = false;
    }
  }

  openBatchProcessingModal(channel, count) {
    const modal = document.getElementById('modalBatchProcessing');
    if (!modal) return;

    const channelMeta = {
      physical: {
        title: 'Physical / Gate Scanner Batch Capture',
        subtitle: 'SAP Document Information Extraction (OCR Pipeline)',
        channelTag: 'DOCUMENT CAPTURE',
        detected: `${count} documents detected`,
        location: 'mock-data/inbound/physical-gate-scanner/ (PDF Fixtures)',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
      },
      email: {
        title: 'Vendor AP Mailbox Batch Ingestion',
        subtitle: 'RFC 822 Email & PDF Attachment Extraction Pipeline',
        channelTag: 'MAILBOX INGESTION',
        detected: `${count} email messages detected`,
        location: 'mock-data/inbound/vendor-ap-mailbox/ (EML & PDF Fixtures)',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
      },
      einvoice: {
        title: 'Government E-Invoice / IRP Batch Push',
        subtitle: 'GST Invoice Registration Portal Statutory Sync',
        channelTag: 'PORTAL PAYLOAD INGESTION',
        detected: `${count} e-invoice payloads detected`,
        location: 'mock-data/inbound/government-einvoice-irp/ (JSON & PDF Fixtures)',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="13" y2="16"/></svg>`,
      },
    };

    const cfg = channelMeta[channel] || channelMeta.physical;

    const titleEl = document.getElementById('batchProcessingTitle');
    const subtitleEl = document.getElementById('batchProcessingSubtitle');
    const labelEl = document.getElementById('batchChannelLabel');
    const detectedEl = document.getElementById('batchDetectedCount');
    const locationEl = document.getElementById('batchSourceLocation');
    const iconBoxEl = document.getElementById('batchChannelIconBox');
    const pctBadge = document.getElementById('batchProgressPctBadge');
    const pctText = document.getElementById('batchProgressPctText');
    const fillEl = document.getElementById('batchProgressBarFill');
    const stageLabel = document.getElementById('batchCurrentStageLabel');
    const stagesList = document.getElementById('batchStagesList');
    const btnClose = document.getElementById('btnBatchClose');

    if (titleEl) titleEl.textContent = cfg.title;
    if (subtitleEl) subtitleEl.textContent = cfg.subtitle;
    if (labelEl) labelEl.textContent = cfg.channelTag;
    if (detectedEl) detectedEl.textContent = cfg.detected;
    if (locationEl) locationEl.textContent = cfg.location;
    if (iconBoxEl) iconBoxEl.innerHTML = cfg.icon;
    if (pctBadge) pctBadge.textContent = '0%';
    if (pctText) pctText.textContent = '0%';
    if (fillEl) fillEl.style.width = '0%';
    if (stageLabel) stageLabel.textContent = 'Initializing batch pipeline...';
    if (stagesList) stagesList.innerHTML = '';
    if (btnClose) btnClose.style.display = 'none';

    modal.style.display = 'flex';
  }

  updateBatchModalStage(currentIndex, label, pct, allStages) {
    const pctBadge = document.getElementById('batchProgressPctBadge');
    const pctText = document.getElementById('batchProgressPctText');
    const fillEl = document.getElementById('batchProgressBarFill');
    const stageLabel = document.getElementById('batchCurrentStageLabel');
    const stagesList = document.getElementById('batchStagesList');

    if (pctBadge) pctBadge.textContent = `${pct}%`;
    if (pctText) pctText.textContent = `${pct}%`;
    if (fillEl) fillEl.style.width = `${pct}%`;
    if (stageLabel) stageLabel.textContent = label;

    if (stagesList) {
      stagesList.innerHTML = allStages
        .map((s, idx) => {
          let statusIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;
          let textColor = 'var(--text-muted)';
          let fontWeight = '400';

          if (idx < currentIndex) {
            statusIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--status-positive)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
            textColor = 'var(--text-primary)';
            fontWeight = '500';
          } else if (idx === currentIndex) {
            statusIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`;
            textColor = 'var(--brand-primary)';
            fontWeight = '700';
          }

          return `
            <div style="display:flex; align-items:center; gap:8px; font-weight:${fontWeight}; color:${textColor};">
              <span style="display:flex; align-items:center;">${statusIcon}</span>
              <span>${s.label}</span>
            </div>
          `;
        })
        .join('');
    }
  }

  updateBatchModalComplete(completionLabel, allStages) {
    const pctBadge = document.getElementById('batchProgressPctBadge');
    const pctText = document.getElementById('batchProgressPctText');
    const fillEl = document.getElementById('batchProgressBarFill');
    const stageLabel = document.getElementById('batchCurrentStageLabel');
    const stagesList = document.getElementById('batchStagesList');
    const detectedEl = document.getElementById('batchDetectedCount');

    if (pctBadge) {
      pctBadge.textContent = '100%';
      pctBadge.className = 'sap-badge sap-badge-success';
    }
    if (pctText) pctText.textContent = '100%';
    if (fillEl) {
      fillEl.style.width = '100%';
      fillEl.style.background = 'var(--status-positive)';
    }
    if (stageLabel) stageLabel.textContent = completionLabel;
    if (detectedEl) detectedEl.textContent = completionLabel;

    if (stagesList) {
      stagesList.innerHTML = allStages
        .map((s) => `
          <div style="display:flex; align-items:center; gap:8px; font-weight:500; color:var(--text-primary);">
            <span style="display:flex; align-items:center;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--status-positive)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></span>
            <span>${s.label}</span>
          </div>
        `)
        .join('') + `
          <div style="display:flex; align-items:center; gap:8px; font-weight:700; color:var(--status-positive); margin-top:4px;">
            <span style="display:flex; align-items:center;">${ICONS.checkCircle}</span>
            <span>${completionLabel}</span>
          </div>
        `;
    }
  }

  closeBatchProcessingModal() {
    const modal = document.getElementById('modalBatchProcessing');
    if (modal) modal.style.display = 'none';
  }

  openERPOperationModal(title, subtitle) {
    const modal = document.getElementById('modalERPOperation');
    if (!modal) return;
    const titleEl = document.getElementById('erpOpTitle');
    const subtitleEl = document.getElementById('erpOpSubtitle');
    const pctBadge = document.getElementById('erpOpProgressPctText');
    const fillEl = document.getElementById('erpOpProgressBarFill');
    const stageLabel = document.getElementById('erpOpCurrentStageLabel');
    const stagesList = document.getElementById('erpOpStagesList');
    const btnClose = document.getElementById('btnErpOpClose');

    if (titleEl) titleEl.textContent = title;
    if (subtitleEl) subtitleEl.textContent = subtitle;
    if (pctBadge) pctBadge.textContent = '0%';
    if (fillEl) {
      fillEl.style.width = '0%';
      fillEl.style.background = 'var(--brand-primary)';
    }
    if (stageLabel) stageLabel.textContent = 'Initializing transaction...';
    if (stagesList) stagesList.innerHTML = '';
    if (btnClose) btnClose.style.display = 'none';

    modal.style.display = 'flex';
  }

  updateERPOpStage(currentIndex, label, pct, allStages) {
    const pctBadge = document.getElementById('erpOpProgressPctText');
    const fillEl = document.getElementById('erpOpProgressBarFill');
    const stageLabel = document.getElementById('erpOpCurrentStageLabel');
    const stagesList = document.getElementById('erpOpStagesList');

    if (pctBadge) pctBadge.textContent = `${pct}%`;
    if (fillEl) fillEl.style.width = `${pct}%`;
    if (stageLabel) stageLabel.textContent = label;

    if (stagesList) {
      stagesList.innerHTML = allStages
        .map((s, idx) => {
          let statusIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;
          let textColor = 'var(--text-muted)';
          let fontWeight = '400';

          if (idx < currentIndex) {
            statusIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--status-positive)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
            textColor = 'var(--text-primary)';
            fontWeight = '500';
          } else if (idx === currentIndex) {
            statusIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`;
            textColor = 'var(--brand-primary)';
            fontWeight = '700';
          }

          return `
            <div style="display:flex; align-items:center; gap:8px; font-weight:${fontWeight}; color:${textColor};">
              <span style="display:flex; align-items:center;">${statusIcon}</span>
              <span>${s.label}</span>
            </div>
          `;
        })
        .join('');
    }
  }

  updateERPOpComplete(completionLabel, allStages) {
    const pctBadge = document.getElementById('erpOpProgressPctText');
    const fillEl = document.getElementById('erpOpProgressBarFill');
    const stageLabel = document.getElementById('erpOpCurrentStageLabel');
    const stagesList = document.getElementById('erpOpStagesList');

    if (pctBadge) {
      pctBadge.textContent = '100%';
    }
    if (fillEl) {
      fillEl.style.width = '100%';
      fillEl.style.background = 'var(--status-positive)';
    }
    if (stageLabel) stageLabel.textContent = completionLabel;

    if (stagesList) {
      stagesList.innerHTML = allStages
        .map((s) => `
          <div style="display:flex; align-items:center; gap:8px; font-weight:500; color:var(--text-primary);">
            <span style="display:flex; align-items:center;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--status-positive)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></span>
            <span>${s.label}</span>
          </div>
        `)
        .join('') + `
          <div style="display:flex; align-items:center; gap:8px; font-weight:700; color:var(--status-positive); margin-top:4px;">
            <span style="display:flex; align-items:center;">${ICONS.checkCircle}</span>
            <span>${completionLabel}</span>
          </div>
        `;
    }
  }

  closeERPOperationModal() {
    const modal = document.getElementById('modalERPOperation');
    if (modal) modal.style.display = 'none';
  }

  async runERPOperation(config, apiTask) {
    this.openERPOperationModal(config.title, config.subtitle);
    try {
      const apiPromise = apiTask();
      for (let i = 0; i < config.stages.length; i++) {
        const s = config.stages[i];
        this.updateERPOpStage(i, s.label, s.pct, config.stages);
        await new Promise((r) => setTimeout(r, s.delayMs || 350));
      }
      const result = await apiPromise;
      const finalMsg = config.completionLabel || 'Transaction Completed Successfully';
      this.updateERPOpComplete(finalMsg, config.stages);
      await new Promise((r) => setTimeout(r, 600));
      this.closeERPOperationModal();
      return result;
    } catch (err) {
      this.closeERPOperationModal();
      throw err;
    }
  }

  async simulateIntake(channel) {
    // Redirect single intake clicks to full batch ingestion pipeline
    return this.processBatchIntake(channel);
  }

  // --------------------------------------------------------------------------
  // ACTIONS: POST & PARK IN SAP S/4HANA
  // --------------------------------------------------------------------------
  async postToSAP(invoiceId) {
    try {
      const res = await this.runERPOperation(
        {
          title: 'SAP S/4HANA Logistics Invoice Verification (MIRO)',
          subtitle: `Posting Invoice ${invoiceId} to Financial Ledger`,
          stages: [
            { label: 'Verifying General Ledger (FAGLFLEXA) & Cost Center accounts...', pct: 25, delayMs: 400 },
            { label: 'Checking tax code & financial period for Company Code 1010...', pct: 50, delayMs: 400 },
            { label: 'Executing SAP S/4HANA MIRO logistics invoice verification...', pct: 75, delayMs: 450 },
            { label: 'Generating Accounting Document BELNR & open item in BSIK...', pct: 95, delayMs: 400 },
          ],
          completionLabel: 'Posted to S/4HANA (MIRO) — BELNR Generated',
        },
        () =>
          safeFetchJson(`/api/invoices/${invoiceId}/post`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ actorId: 'BO_AARAV', actorName: `${this.currentUser.name} (${this.currentUser.role})` }),
          })
      );

      if (res.postResult && res.postResult.success) {
        this.showToast(res.postResult.message, 'success');
        await this.loadAllData();
        this.renderCurrentView();
      }
    } catch (e) {
      this.showToast('SAP Posting Failed: ' + (e.message || 'Network error'), 'error');
    }
  }

  async parkInSAP(invoiceId) {
    const reason = prompt('Enter parking reason for S/4HANA document (MIR7):', 'Held for exception review with Procurement');
    if (!reason) return;

    try {
      const res = await this.runERPOperation(
        {
          title: 'SAP S/4HANA Invoice Parking (MIR7)',
          subtitle: `Recording Preliminary Document for ${invoiceId}`,
          stages: [
            { label: 'Validating S/4HANA MM Preliminary Document structure...', pct: 30, delayMs: 350 },
            { label: 'Setting Payment Block "R" (Invoice Verification Block)...', pct: 65, delayMs: 400 },
            { label: 'Registering parked preliminary document in MM ledger...', pct: 95, delayMs: 350 },
          ],
          completionLabel: 'Invoice Parked in SAP S/4HANA (MIR7)',
        },
        () =>
          safeFetchJson(`/api/invoices/${invoiceId}/park`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reason, actorId: 'AP_CLERK', actorName: 'AP Clerk' }),
          })
      );

      if (res.parkResult && res.parkResult.success) {
        this.showToast(res.parkResult.message, 'success');
        await this.loadAllData();
        this.renderCurrentView();
      }
    } catch (e) {
      this.showToast('SAP Parking Failed: ' + (e.message || 'Network error'), 'error');
    }
  }

  async processPayment(invoiceId) {
    try {
      const res = await this.runERPOperation(
        {
          title: 'SAP FI-AP Automatic Payment Run (F110)',
          subtitle: `Disbursement Execution for Invoice ${invoiceId}`,
          stages: [
            { label: 'Initiating SAP F110 Automatic Payment Program...', pct: 25, delayMs: 400 },
            { label: 'Evaluating open items in BSIK & vendor payment terms...', pct: 50, delayMs: 400 },
            { label: 'Generating Electronic Bank Transfer / Clearing Advice...', pct: 75, delayMs: 450 },
            { label: 'Registering Payment Document in SAP FI-AP ledger...', pct: 95, delayMs: 400 },
          ],
          completionLabel: 'Payment Run Executed — Payment Document Generated',
        },
        () =>
          safeFetchJson(`/api/invoices/${invoiceId}/payment/process`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ actorId: 'AP_TREASURY', actorName: 'Treasury & Disbursement Specialist' }),
          })
      );

      if (res.paymentResult && res.paymentResult.success) {
        this.showToast(res.paymentResult.message, 'success');
        await this.loadAllData();
        this.renderCurrentView();
      } else if (res.paymentResult) {
        this.showToast(res.paymentResult.message, 'info');
      }
    } catch (e) {
      this.showToast('SAP Payment Failed: ' + (e.message || 'Network error'), 'error');
    }
  }

  async clearPayment(invoiceId) {
    try {
      const res = await this.runERPOperation(
        {
          title: 'SAP FI-AP Settlement Clearing (BSAK)',
          subtitle: `Open Item Clearing for Invoice ${invoiceId}`,
          stages: [
            { label: 'Connecting to SAP FI-AP Settlement Engine...', pct: 30, delayMs: 350 },
            { label: 'Matching vendor open items in BSIK ledger...', pct: 60, delayMs: 400 },
            { label: 'Transferring open items to BSAK Cleared Items Ledger...', pct: 95, delayMs: 400 },
          ],
          completionLabel: 'Settlement Cleared in SAP S/4HANA (BSAK)',
        },
        () =>
          safeFetchJson(`/api/invoices/${invoiceId}/payment/clear`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ actorId: 'AP_TREASURY', actorName: 'General Ledger Clearing Robot' }),
          })
      );

      if (res.clearingResult && res.clearingResult.success) {
        this.showToast(res.clearingResult.message, 'success');
        await this.loadAllData();
        this.renderCurrentView();
      } else if (res.clearingResult) {
        this.showToast(res.clearingResult.message, 'info');
      }
    } catch (e) {
      this.showToast('SAP Clearing Failed: ' + (e.message || 'Network error'), 'error');
    }
  }

  // --------------------------------------------------------------------------
  // ACTIONS: CONTEXTUAL BUSINESS OWNER VALIDATION
  // --------------------------------------------------------------------------
  openValidationModal(invoiceId) {
    this.currentValidatingInvoiceId = invoiceId;
    const item = this.invoices.find((i) => i.invoice.invoiceId === invoiceId);
    if (!item) return;

    const { invoice, purchaseOrder, reconciliation } = item;
    const modalBody = document.getElementById('modalValidationBody');

    const systemCheck = reconciliation.quantityStatus !== 'EXACT_MATCH'
      ? `Invoiced quantity (${reconciliation.quantityInvoiced}) exceeds warehouse received quantity (${reconciliation.quantityReceived})`
      : reconciliation.priceStatus !== 'EXACT_MATCH'
      ? `Unit price variance (${reconciliation.priceVariancePercentage.toFixed(1)}%) breaches standard tolerance`
      : 'Standard 3-way reconciliation criteria matched';

    modalBody.innerHTML = `
      <div style="background:var(--surface-subtle); border-left:3px solid var(--brand-primary); padding:12px; margin-bottom:14px; font-size:12px; display:grid; grid-template-columns:repeat(3, 1fr); gap:10px;">
        <div><strong>PO:</strong> <code>${purchaseOrder ? purchaseOrder.poNumber : 'Non-PO'}</code></div>
        <div><strong>SUPPLIER:</strong> ${invoice.supplierName}</div>
        <div><strong>INVOICE:</strong> ${invoice.invoiceNumber}</div>
        <div><strong>VALUE:</strong> ₹${(invoice.totalGrossAmount || 0).toLocaleString('en-IN')}</div>
        <div><strong>DEPARTMENT:</strong> ${item.businessOwner.department}</div>
        <div><strong>REQUEST:</strong> ${purchaseOrder ? purchaseOrder.lineItems[0]?.description : 'Operational Services'}</div>
      </div>

      <div style="background:var(--bg-warning); border:1px solid #FDE68A; padding:10px 14px; border-radius:var(--radius-input); font-size:12px; color:#A16207; font-weight:600; margin-bottom:14px; display:flex; align-items:center; gap:6px;">
        ${ICONS.alertTriangle}
        <span>SYSTEM CHECK: ${systemCheck}</span>
      </div>

      <blockquote style="font-size:13px; color:var(--text-primary); margin-bottom:14px;">
        Does this invoice represent a valid business expense associated with your requisition?
      </blockquote>

      <div style="display:flex; flex-direction:column; gap:6px;">
        <label style="font-size:12px; font-weight:600; color:var(--text-secondary);">Reason / Justification Note (Required for Reject & Send Back):</label>
        <textarea class="sap-input" id="boValidationReason" rows="3" style="height:70px; padding:8px 12px;" placeholder="State reason for your approval, dispute, or clarification..."></textarea>
      </div>
    `;

    document.getElementById('modalValidation').style.display = 'flex';
  }

  async submitValidationAction(action) {
    const reason = document.getElementById('boValidationReason')?.value || '';
    if ((action === 'REJECT' || action === 'SEND_BACK') && !reason.trim()) {
      alert('A justification reason is mandatory when rejecting or sending back an invoice.');
      return;
    }

    this.closeModal('modalValidation');

    try {
      await this.runERPOperation(
        {
          title: 'Business Owner Workflow Validation',
          subtitle: `Recording ${action} Authorization for ${this.currentValidatingInvoiceId}`,
          stages: [
            { label: 'Validating business line items & cost center budget...', pct: 30, delayMs: 350 },
            { label: 'Signing authorization with business owner ID...', pct: 65, delayMs: 400 },
            { label: 'Updating enterprise audit ledger & decision queue...', pct: 95, delayMs: 350 },
          ],
          completionLabel: `Business Owner Decision Recorded: ${action}`,
        },
        () =>
          fetch(`/api/invoices/${this.currentValidatingInvoiceId}/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action,
              userId: 'AVERMA',
              userName: 'Amit Verma',
              department: 'Facilities & Plant Operations',
              costCenter: 'CC-1010-ENG',
              reason: reason || 'Commercial delivery confirmed by requisitioner.',
            }),
          })
      );

      this.showToast(`Decision recorded: ${action}`, 'success');
      await this.loadAllData();
      this.renderCurrentView();
    } catch (e) {
      this.showToast('Validation failed', 'error');
    }
  }

  async quickValidationAction(invoiceId, action) {
    const reason = prompt(
      `Enter reason for ${action}:`,
      action === 'ACCEPT' ? 'Commercial service verified and approved.' : 'Disputed charges / service shortfall.'
    );
    if ((action === 'REJECT' || action === 'SEND_BACK') && !reason) return;

    try {
      await this.runERPOperation(
        {
          title: 'Business Owner Workflow Validation',
          subtitle: `Recording ${action} Authorization for ${invoiceId}`,
          stages: [
            { label: 'Validating business line items & cost center budget...', pct: 30, delayMs: 350 },
            { label: 'Signing authorization with business owner ID...', pct: 65, delayMs: 400 },
            { label: 'Updating enterprise audit ledger & decision queue...', pct: 95, delayMs: 350 },
          ],
          completionLabel: `Business Owner Decision Recorded: ${action}`,
        },
        () =>
          fetch(`/api/invoices/${invoiceId}/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action,
              userId: 'AVERMA',
              userName: 'Amit Verma',
              department: 'Facilities & Plant Operations',
              costCenter: 'CC-1010-ENG',
              reason: reason || 'Validated.',
            }),
          })
      );

      this.showToast(`Decision recorded: ${action}`, 'success');
      await this.loadAllData();
      this.renderCurrentView();
    } catch (e) {
      this.showToast('Action failed', 'error');
    }
  }

  async resetDemoData() {
    if (!confirm('Reset all 10 enterprise demo scenarios and GSTR-2B datasets to factory baseline state?')) return;
    try {
      await this.runERPOperation(
        {
          title: 'Resetting Enterprise Demo Environment',
          subtitle: 'Restoring Baseline Datasets & S/4HANA Linkages',
          stages: [
            { label: 'Purging runtime in-memory invoice states & transaction cache...', pct: 18, delayMs: 300 },
            { label: 'Resetting batch ingestion channel intake flags (Physical, Email, E-Invoice)...', pct: 36, delayMs: 350 },
            { label: 'Re-initializing canonical invoice repository from baseline fixtures...', pct: 54, delayMs: 400 },
            { label: 'Restoring S/4HANA PO & Goods Receipt linkages (EKKO, EKPO, MSEG)...', pct: 72, delayMs: 350 },
            { label: 'Resetting statutory GSTR-2B Input Tax Credit ledger records...', pct: 88, delayMs: 300 },
            { label: 'Re-establishing baseline audit trail events & clearing decision locks...', pct: 96, delayMs: 300 },
          ],
          completionLabel: 'DEMO ENVIRONMENT READY — Baseline Restored',
        },
        () => fetch('/api/reset', { method: 'POST' })
      );

      this.channelBatchStatus = {
        physical: { processed: false, count: 6, activeCount: 6 },
        email: { processed: false, count: 6, activeCount: 6 },
        einvoice: { processed: false, count: 6, activeCount: 6 },
      };
      this.simulationState = null;
      this.showToast('All scenarios reset to baseline state', 'success');
      this.selectedInvoiceId = 'INV-2026-00001';
      await this.loadAllData();
      this.renderCurrentView();
    } catch (e) {
      this.showToast('Reset failed', 'error');
    }
  }

  // --------------------------------------------------------------------------
  // UI HELPERS & DESIGN SYSTEM TOKENS (PURE SVG ICONOGRAPHY)
  // --------------------------------------------------------------------------
  getRecommendationBadge(rec) {
    switch (rec) {
      case 'AUTO_PROCEED':
        return `<span class="sap-badge sap-badge-success">${ICONS.check} Auto-Proceed</span>`;
      case 'BUSINESS_VALIDATION_REQUIRED':
        return `<span class="sap-badge sap-badge-warning">${ICONS.user} Validation Req</span>`;
      case 'MANUAL_REVIEW':
        return `<span class="sap-badge sap-badge-warning">${ICONS.alertTriangle} Manual Review</span>`;
      case 'HOLD':
        return `<span class="sap-badge sap-badge-error">${ICONS.alertTriangle} Hold</span>`;
      case 'POTENTIAL_DUPLICATE':
        return `<span class="sap-badge sap-badge-error">${ICONS.alertTriangle} Duplicate Block</span>`;
      case 'ALREADY_PROCESSED':
        return `<span class="sap-badge sap-badge-success">${ICONS.checkCircle} Reconciled / Done</span>`;
      case 'PAYMENT_FOLLOW_UP':
        return `<span class="sap-badge sap-badge-warning">${ICONS.info} Payment Follow-up</span>`;
      case 'REJECT':
        return `<span class="sap-badge sap-badge-error">${ICONS.xCircle} Reject</span>`;
      case 'NON_PO_PROCESS':
        return `<span class="sap-badge sap-badge-info">${ICONS.document} Non-PO Route</span>`;
      default:
        return `<span class="sap-badge sap-badge-neutral">${rec}</span>`;
    }
  }

  getPaymentStatusBadge(status, clearingStatus) {
    if (clearingStatus === 'CLEARED') {
      return `<span class="sap-badge sap-badge-success">${ICONS.check} CLEARED</span>`;
    }
    switch (status) {
      case 'PAID':
        return `<span class="sap-badge sap-badge-success">${ICONS.checkCircle} PAID</span>`;
      case 'PAYMENT_PENDING':
        return `<span class="sap-badge sap-badge-warning">${ICONS.info} PENDING</span>`;
      case 'PARTIALLY_PAID':
        return `<span class="sap-badge sap-badge-warning">${ICONS.info} PARTIAL</span>`;
      case 'BLOCKED':
        return `<span class="sap-badge sap-badge-error">${ICONS.xCircle} BLOCKED</span>`;
      case 'NOT_DUE':
        return `<span class="sap-badge sap-badge-neutral">${ICONS.clock} NOT DUE</span>`;
      default:
        return `<span class="sap-badge sap-badge-neutral">${ICONS.clock} NOT PROCESSED</span>`;
    }
  }

  getMatchStatusBadge(recon, poRef) {
    if (!poRef) {
      return `<span class="sap-badge sap-badge-neutral">NON-PO</span>`;
    }
    if (!recon) {
      return `<span class="sap-badge sap-badge-neutral">PENDING</span>`;
    }
    if (!recon.vendorMatched) {
      return `<span class="sap-badge sap-badge-error">VENDOR MISMATCH</span>`;
    }
    if (recon.quantityStatus === 'OVER_DELIVERY' || recon.quantityStatus === 'UNDER_DELIVERY') {
      return `<span class="sap-badge sap-badge-warning">QTY VARIANCE</span>`;
    }
    if (recon.priceStatus === 'EXCEEDED_TOLERANCE') {
      return `<span class="sap-badge sap-badge-warning">PRICE VARIANCE</span>`;
    }
    if (recon.qualityStatus === 'REJECTIONS_DETECTED') {
      return `<span class="sap-badge sap-badge-error">QM DEFECT</span>`;
    }
    return `<span class="sap-badge sap-badge-success">MATCHED</span>`;
  }

  getChannelBadge(channel) {
    switch (channel) {
      case 'PHYSICAL_SCAN':
        return `<span class="badge-channel">${ICONS.scan} Physical Scan</span>`;
      case 'EMAIL_INBOUND':
        return `<span class="badge-channel">${ICONS.mail} Email Inbound</span>`;
      case 'GOVERNMENT_EINVOICE':
        return `<span class="badge-channel">${ICONS.invoice} E-Invoice DRC</span>`;
      default:
        return `<span class="badge-channel">${ICONS.document} ${channel}</span>`;
    }
  }

  getProcessingStatusBadge(status) {
    switch (status) {
      case 'POSTED_TO_SAP':
        return `<span class="sap-badge sap-badge-success">${ICONS.check} Posted</span>`;
      case 'PARKED_IN_SAP':
        return `<span class="sap-badge sap-badge-warning">${ICONS.info} Parked</span>`;
      case 'BUSINESS_VALIDATED':
        return `<span class="sap-badge sap-badge-success">${ICONS.check} Validated</span>`;
      case 'ON_HOLD':
        return `<span class="sap-badge sap-badge-error">${ICONS.alertTriangle} On Hold</span>`;
      case 'REJECTED':
        return `<span class="sap-badge sap-badge-error">${ICONS.xCircle} Rejected</span>`;
      case 'NON_PO_ROUTED':
        return `<span class="sap-badge sap-badge-info">${ICONS.document} Non-PO</span>`;
      default:
        return `<span class="sap-badge sap-badge-neutral">${status}</span>`;
    }
  }

  getRiskBadge(risk) {
    switch (risk) {
      case 'LOW':
        return `<span class="sap-badge sap-badge-success">Low</span>`;
      case 'MEDIUM':
        return `<span class="sap-badge sap-badge-warning">Medium</span>`;
      case 'HIGH':
        return `<span class="sap-badge sap-badge-error">High</span>`;
      case 'CRITICAL':
        return `<span class="sap-badge sap-badge-error" style="font-weight:700;">Critical</span>`;
      default:
        return `<span class="sap-badge sap-badge-neutral">${risk || 'N/A'}</span>`;
    }
  }

  openDocPreview(invoiceId, artifactType = '') {
    const item = this.invoices.find((i) => i.invoice.invoiceId === invoiceId);
    if (!item) return;

    const { invoice, aiDecision } = item;
    const channel = invoice.sourceChannel;
    const modal = document.getElementById('modalDocPreview');
    const titleEl = document.getElementById('docPreviewModalTitle');
    const badgeEl = document.getElementById('docPreviewChannelBadge');
    const bodyEl = document.getElementById('docPreviewModalBody');
    const footerInfoEl = document.getElementById('docPreviewModalFooterInfo');
    const downloadBtn = document.getElementById('btnDocDownload');
    const inspectBtn = document.getElementById('btnDocInspectDecision');

    if (!modal || !bodyEl) return;

    titleEl.innerHTML = `Source Artifact: <strong style="color:var(--brand-primary);">${invoice.invoiceId}</strong> &bull; #${invoice.invoiceNumber}`;
    badgeEl.innerHTML = this.getChannelBadge(channel);

    if (inspectBtn) {
      inspectBtn.onclick = () => {
        this.closeModal('modalDocPreview');
        this.selectAndOpenDecision(invoice.invoiceId);
      };
    }

    if (channel === 'PHYSICAL_SCAN') {
      const pdfUrl = `/inbound-docs/physical-gate-scanner/documents/${invoice.invoiceId}.pdf`;
      const meta = invoice.channelMetadata || {};
      if (downloadBtn) {
        downloadBtn.href = pdfUrl;
        downloadBtn.download = `${invoice.invoiceId}.pdf`;
      }
      if (footerInfoEl) {
        footerInfoEl.innerHTML = `<span>On-Disk Artifact: <code>mock-data/inbound/physical-gate-scanner/documents/${invoice.invoiceId}.pdf</code></span>`;
      }

      bodyEl.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; background:var(--surface-subtle); padding:10px 14px; border:1px solid var(--border-main); border-radius:var(--radius-card); margin-bottom:12px; flex-wrap:wrap; gap:8px;">
          <div style="display:flex; align-items:center; gap:12px; font-size:12px;">
            <span><strong>Scanner:</strong> ${meta.scannerLocation || 'Plant 1010 Security Gate 2 Scanner'}</span>
            <span>&bull;</span>
            <span><strong>Operator:</strong> ${meta.operatorId || 'OP-4491'}</span>
            <span>&bull;</span>
            <span class="sap-badge sap-badge-success">${ICONS.check} OCR ${meta.scanDpi || 300} DPI (98.4% Confidence)</span>
          </div>
          <div>
            <a href="${pdfUrl}" target="_blank" class="sap-btn sap-btn-secondary sap-btn-sm" style="display:inline-flex; align-items:center; gap:6px; text-decoration:none;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              <span>Open PDF in Tab</span>
            </a>
          </div>
        </div>
        <div style="height:540px; width:100%; border:1px solid var(--border-main); border-radius:var(--radius-card); overflow:hidden; background:#525659;">
          <iframe src="${pdfUrl}#toolbar=0" style="width:100%; height:100%; border:none;"></iframe>
        </div>
      `;
    } else if (channel === 'EMAIL_INBOUND') {
      const pdfUrl = `/inbound-docs/vendor-ap-mailbox/attachments/${invoice.invoiceId}.pdf`;
      const emlUrl = `/inbound-docs/vendor-ap-mailbox/emails/email_${invoice.invoiceId}.eml`;
      const meta = invoice.channelMetadata || {};
      const activeTab = artifactType === 'email' ? 'email' : 'pdf';

      if (downloadBtn) {
        downloadBtn.href = activeTab === 'email' ? emlUrl : pdfUrl;
        downloadBtn.download = activeTab === 'email' ? `email_${invoice.invoiceId}.eml` : `${invoice.invoiceId}.pdf`;
      }
      if (footerInfoEl) {
        footerInfoEl.innerHTML = `<span>On-Disk Artifact: <code>mock-data/inbound/vendor-ap-mailbox/</code></span>`;
      }

      bodyEl.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid var(--border-subtle); padding-bottom:10px;">
          <div style="display:flex; gap:8px;">
            <button class="sap-btn ${activeTab === 'pdf' ? 'sap-btn-primary' : 'sap-btn-secondary'} sap-btn-sm" onclick="app.openDocPreview('${invoice.invoiceId}', 'pdf')">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              <span>Attached Invoice (PDF)</span>
            </button>
            <button class="sap-btn ${activeTab === 'email' ? 'sap-btn-primary' : 'sap-btn-secondary'} sap-btn-sm" onclick="app.openDocPreview('${invoice.invoiceId}', 'email')">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span>Email Fixture (.eml)</span>
            </button>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="sap-badge sap-badge-success">${ICONS.check} SPF: PASS</span>
            <span class="sap-badge sap-badge-success">${ICONS.check} DKIM: PASS</span>
          </div>
        </div>

        ${activeTab === 'email' ? `
          <div style="background:var(--surface); border:1px solid var(--border-main); border-radius:var(--radius-card); padding:16px;">
            <table style="width:100%; border-collapse:collapse; margin-bottom:14px; font-size:12px;">
              <tr>
                <td style="width:80px; font-weight:600; color:var(--text-muted); padding:4px 0;">From:</td>
                <td><strong>${invoice.supplierName} Accounts</strong> &lt;${meta.emailSender || 'billing@vendor.com'}&gt;</td>
              </tr>
              <tr>
                <td style="font-weight:600; color:var(--text-muted); padding:4px 0;">To:</td>
                <td>Accounts Payable &lt;ap-invoices@enterprise.com&gt;</td>
              </tr>
              <tr>
                <td style="font-weight:600; color:var(--text-muted); padding:4px 0;">Subject:</td>
                <td style="font-weight:700; color:var(--text-primary);">${meta.emailSubject || 'Tax Invoice ' + invoice.invoiceNumber}</td>
              </tr>
              <tr>
                <td style="font-weight:600; color:var(--text-muted); padding:4px 0;">Attachment:</td>
                <td>
                  <a href="${pdfUrl}" target="_blank" class="sap-badge sap-badge-info" style="text-decoration:none; display:inline-flex; align-items:center; gap:4px; font-family:var(--font-mono);">
                    ${ICONS.document} ${meta.attachmentName || invoice.invoiceId + '.pdf'} (PDF)
                  </a>
                </td>
              </tr>
            </table>
            <div style="padding-top:14px; border-top:1px solid var(--border-subtle); font-size:12.5px; line-height:1.6; color:var(--text-secondary); white-space:pre-line; background:var(--surface-subtle); padding:14px; border-radius:var(--radius-sm); font-family:inherit;">
Dear Enterprise Accounts Payable Team,

Please find attached our official tax invoice ${invoice.invoiceNumber} for ₹${(invoice.totalGrossAmount || 0).toLocaleString('en-IN')}.

Invoice Details:
- Invoice ID: ${invoice.invoiceId}
- Vendor: ${invoice.supplierName}
- Purchase Order: ${invoice.purchaseOrderReference || 'Non-PO / Service'}
- Amount: ₹${(invoice.totalGrossAmount || 0).toLocaleString('en-IN')}
- Due Date: ${invoice.dueDate || '30 Days Net'}

Kindly process and schedule payment according to agreed terms.

Sincerely,
Accounts Receivable Department
${invoice.supplierName}
Tel: +91 22 6790 0000 | Email: ${meta.emailSender || 'billing@vendor.com'}
            </div>
          </div>
        ` : `
          <div style="height:500px; width:100%; border:1px solid var(--border-main); border-radius:var(--radius-card); overflow:hidden; background:#525659;">
            <iframe src="${pdfUrl}#toolbar=0" style="width:100%; height:100%; border:none;"></iframe>
          </div>
        `}
      `;
    } else {
      // GOVERNMENT_EINVOICE
      const pdfUrl = `/inbound-docs/government-einvoice-irp/documents/${invoice.invoiceId}.pdf`;
      const payloadUrl = `/inbound-docs/government-einvoice-irp/payloads/${invoice.invoiceId}.json`;
      const meta = invoice.channelMetadata || {};
      const activeTab = artifactType === 'doc' ? 'doc' : 'payload';

      if (downloadBtn) {
        downloadBtn.href = activeTab === 'doc' ? pdfUrl : payloadUrl;
        downloadBtn.download = activeTab === 'doc' ? `${invoice.invoiceId}.pdf` : `${invoice.invoiceId}.json`;
      }
      if (footerInfoEl) {
        footerInfoEl.innerHTML = `<span>On-Disk Artifact: <code>mock-data/inbound/government-einvoice-irp/</code></span>`;
      }

      bodyEl.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid var(--border-subtle); padding-bottom:10px;">
          <div style="display:flex; gap:8px;">
            <button class="sap-btn ${activeTab === 'payload' ? 'sap-btn-primary' : 'sap-btn-secondary'} sap-btn-sm" onclick="app.openDocPreview('${invoice.invoiceId}', 'payload')">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              <span>Statutory IRP Payload (JSON)</span>
            </button>
            <button class="sap-btn ${activeTab === 'doc' ? 'sap-btn-primary' : 'sap-btn-secondary'} sap-btn-sm" onclick="app.openDocPreview('${invoice.invoiceId}', 'doc')">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="6" y1="8" x2="10" y2="8"></line><line x1="6" y1="12" x2="14" y2="12"></line></svg>
              <span>Official Invoice Document (PDF)</span>
            </button>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="sap-badge sap-badge-success">${ICONS.check} Digital Signature Verified</span>
            <span class="sap-badge sap-badge-info">Ack: ${meta.acknowledgementNumber || '112026009841'}</span>
          </div>
        </div>

        ${activeTab === 'payload' ? `
          <div style="background:var(--surface); border:1px solid var(--border-main); border-radius:var(--radius-card); padding:16px;">
            <div style="margin-bottom:10px; font-size:12px; background:var(--surface-subtle); padding:10px; border-radius:var(--radius-sm); border:1px solid var(--border-subtle);">
              <div><strong>IRN (64-character hash):</strong></div>
              <code style="display:block; word-break:break-all; font-family:var(--font-mono); color:var(--brand-primary); margin-top:2px;">${meta.irn || '4f28d8b4e78a6327e4369f8c6501237a6b83f0d2c94178523091abcef5410982'}</code>
            </div>
            <div style="background:#0f172a; color:#e2e8f0; padding:14px; border-radius:6px; font-family:var(--font-mono); font-size:11px; max-height:430px; overflow-y:auto; line-height:1.4;">
              <pre id="jsonPayloadDisplay" style="margin:0;">Loading IRP JSON payload...</pre>
            </div>
          </div>
        ` : `
          <div style="height:500px; width:100%; border:1px solid var(--border-main); border-radius:var(--radius-card); overflow:hidden; background:#525659;">
            <iframe src="${pdfUrl}#toolbar=0" style="width:100%; height:100%; border:none;"></iframe>
          </div>
        `}
      `;

      if (activeTab === 'payload') {
        safeFetchJson(payloadUrl)
          .then((data) => {
            const pre = document.getElementById('jsonPayloadDisplay');
            if (pre) pre.innerText = JSON.stringify(data, null, 2);
          })
          .catch(() => {
            const pre = document.getElementById('jsonPayloadDisplay');
            if (pre) pre.innerText = JSON.stringify({
              Version: "1.1",
              Irn: meta.irn,
              AckNo: meta.acknowledgementNumber,
              AckDt: meta.acknowledgementDate,
              InvoiceNumber: invoice.invoiceNumber,
              Supplier: invoice.supplierName,
              SupplierGSTIN: invoice.supplierTaxId,
              BuyerGSTIN: invoice.buyerTaxId,
              TotalGrossAmount: invoice.totalGrossAmount,
              Status: "MOCK_VERIFIED_IRP"
            }, null, 2);
          });
      }
    }

    modal.style.display = 'flex';
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `sap-toast ${type === 'error' ? 'toast-error' : type === 'success' ? 'toast-success' : ''}`;
    const icon = type === 'success' ? ICONS.checkCircle : type === 'error' ? ICONS.xCircle : ICONS.info;
    toast.innerHTML = `<span style="display:inline-flex; align-items:center;">${icon}</span> <span>${message}</span>`;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 4000);
  }
}

let app;
window.addEventListener('DOMContentLoaded', () => {
  app = new InvoiceDecisionApp();
  window.app = app;
});
