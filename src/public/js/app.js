/**
 * REUSABLE ENTERPRISE AI FRONTEND DESIGN SYSTEM
 * Application Controller: SAP Invoice Decision Intelligence
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
};

class InvoiceDecisionApp {
  constructor() {
    this.invoices = [];
    this.selectedInvoiceId = 'INV-2026-00001';
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
      const [invRes, msgRes, audRes, gstRes] = await Promise.all([
        fetch('/api/invoices').then((r) => r.json()),
        fetch('/api/integration-messages').then((r) => r.json()),
        fetch('/api/audit-trail').then((r) => r.json()),
        fetch('/api/gst-reconciliation').then((r) => r.json()),
      ]);

      this.invoices = invRes || [];
      this.integrationMessages = msgRes || [];
      this.auditEvents = audRes || [];
      this.gstData = gstRes || { records: [], summary: null };

      this.updateKPICounters();
    } catch (err) {
      console.error('Error loading data:', err);
      this.showToast('Failed to connect to SAP BTP backend services', 'error');
    }
  }

  // --------------------------------------------------------------------------
  // NAVIGATION & SHELL CONTROLLER
  // --------------------------------------------------------------------------
  switchView(viewName) {
    this.activeView = viewName;

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

  updateBreadcrumbsAndHeader(viewName) {
    const bcActive = document.getElementById('breadcrumbActiveItem');
    const pageTitle = document.getElementById('pageHeaderTitle');
    const pageSub = document.getElementById('pageHeaderSubtitle');
    const pageActions = document.getElementById('pageHeaderActions');

    const viewConfig = {
      landing: {
        bc: 'Product Overview',
        title: 'SAP Invoice Decision Intelligence',
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
      decisionCenter: {
        bc: `Operations / Decision Center / ${this.selectedInvoiceId}`,
        title: 'Invoice Decision Center',
        sub: 'Cognitive validation, three-way matching, explainable rationale, and Clean Core S/4HANA actions.',
        actions: `
          <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.toggleWhatIfPanel()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" stroke-width="2"><path d="M12 20v-6M6 20V10M18 20V4"></path></svg>
            <span>What-If Simulator</span>
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
    if (bcActive) bcActive.innerText = cfg.bc;
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
      ['HOLD', 'MANUAL_REVIEW', 'REJECT'].includes(i.aiDecision.recommendation)
    ).length;

    const bInbox = document.getElementById('navBadgeInbox');
    if (bInbox) bInbox.innerText = total;

    const bVal = document.getElementById('navBadgeValidation');
    if (bVal) bVal.innerText = pendingVal;

    const bEx = document.getElementById('navBadgeExceptions');
    if (bEx) bEx.innerText = exceptions;
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
            <td>${statusBadge}</td>
            <td>${recBadge}</td>
            <td><strong>${item.aiDecision.confidenceScore}%</strong></td>
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
    this.selectedInvoiceId = invoiceId;
    this.switchView('decisionCenter');
  }

  renderDecisionCenter() {
    this.renderDecisionList();
    this.renderDecisionWorkspace();
    this.runWhatIfSimulation();
  }

  renderDecisionList() {
    const listContainer = document.getElementById('decisionCardList');
    if (!listContainer) return;

    listContainer.innerHTML = this.invoices
      .map((item) => {
        const isSelected = item.invoice.invoiceId === this.selectedInvoiceId;
        const recBadge = this.getRecommendationBadge(item.aiDecision.recommendation);

        return `
          <div class="invoice-item-card ${isSelected ? 'selected' : ''}" onclick="app.onSelectInvoice('${item.invoice.invoiceId}')">
            <div class="invoice-card-top">
              <span class="invoice-card-title">${item.invoice.invoiceId}</span>
              ${recBadge}
            </div>
            <div class="invoice-card-vendor">${item.invoice.supplierName}</div>
            <div class="invoice-card-meta">
              <span style="font-weight:600; color:var(--text-primary);">₹${(item.invoice.totalGrossAmount || 0).toLocaleString('en-IN')}</span>
              <span style="color:var(--text-muted); font-size:11px;">${item.invoice.purchaseOrderReference ? 'PO ' + item.invoice.purchaseOrderReference : 'Non-PO'}</span>
            </div>
          </div>
        `;
      })
      .join('');
  }

  onSelectInvoice(invoiceId) {
    this.selectedInvoiceId = invoiceId;
    this.updateBreadcrumbsAndHeader('decisionCenter');
    this.renderDecisionList();
    this.renderDecisionWorkspace();
    this.runWhatIfSimulation();
  }

  renderDecisionWorkspace() {
    const workspace = document.getElementById('decisionWorkspaceCol');
    if (!workspace) return;

    const item = this.invoices.find((i) => i.invoice.invoiceId === this.selectedInvoiceId);
    if (!item) return;

    const { invoice, purchaseOrder, reconciliation, aiDecision, businessOwner, slaRecord } = item;

    // 1. TOP 5-QUESTION SUMMARY CARD (ENTERPRISE HERO EXPERIENCE)
    const primaryWhy = aiDecision.explanation.whyRecommended[0] || 'Standard reconciliation checks evaluated.';
    const primaryAction = aiDecision.explanation.suggestedAction;

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
              ${this.getRecommendationBadge(aiDecision.recommendation)}
              <span style="font-weight:600; font-size:13px; color:var(--text-primary);">Confidence: ${aiDecision.confidenceScore}%</span>
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
            <div style="display:flex; gap:8px; margin-top:10px; flex-wrap:wrap;">
              ${
                invoice.processingStatus === 'POSTED_TO_SAP'
                  ? `<span class="sap-badge sap-badge-success">${ICONS.check} POSTED TO SAP S/4HANA (BELNR ACTIVE)</span>`
                  : invoice.processingStatus === 'PARKED_IN_SAP'
                  ? `<span class="sap-badge sap-badge-warning">${ICONS.info} PARKED IN SAP S/4HANA (PAYMENT BLOCK R)</span>`
                  : `
                  <button class="sap-btn sap-btn-positive sap-btn-sm" onclick="app.postToSAP('${invoice.invoiceId}')" ${aiDecision.recommendation === 'HOLD' || aiDecision.recommendation === 'REJECT' ? 'disabled style="opacity:0.5;"' : ''}>Post to S/4HANA (MIRO)</button>
                  <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.parkInSAP('${invoice.invoiceId}')">Park Invoice (MIR7)</button>
                  <button class="sap-btn sap-btn-primary sap-btn-sm" onclick="app.openValidationModal('${invoice.invoiceId}')">Validate as Owner</button>
                `
              }
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
    const isPosted = invoice.processingStatus === 'POSTED_TO_SAP';

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

    // 4. EVIDENCE SECTION: DISTINGUISHING FACT FROM SYSTEM RECOMMENDATION
    const evidenceList = aiDecision.evidence || [];
    const evidenceHtml = `
      <div class="sap-card">
        <div class="sap-card-header">
          <div class="sap-card-title">Evidence Ledger: Distinguishing Facts from System Recommendations</div>
          <span class="sap-card-subtitle">Every automated inference is directly grounded in auditable ERP data</span>
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
              ${evidenceList
                .map(
                  (ev) => `
                <tr>
                  <td>
                    <span class="${ev.category === 'FACT' ? 'badge-fact' : 'badge-recommendation'}">
                      ${ev.category}
                    </span>
                  </td>
                  <td><code>${ev.source}</code></td>
                  <td>${ev.statement}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // 5. DECISION EXPLAINER & TRANSACTION STORY SIDE-BY-SIDE
    const explainerSteps = aiDecision.decisionExplainer || [];
    const storyEvents = aiDecision.transactionStory || [];

    const explainerAndStoryHtml = `
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
        <!-- Left: Why This Decision? Explainer -->
        <div class="sap-card" style="padding:16px 20px;">
          <div style="font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-secondary); margin-bottom:12px;">
            Why This Decision? (Step-by-Step Rationale)
          </div>
          <div style="display:flex; flex-direction:column; gap:10px;">
            ${explainerSteps
              .map(
                (step) => `
              <div style="border:1px solid var(--border-subtle); border-radius:var(--radius-input); padding:10px 12px; background:var(--surface-subtle);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                  <strong style="font-size:12px; color:var(--text-primary);">${step.stepNumber} &nbsp;${step.title}</strong>
                  <span class="sap-badge ${step.status === 'PASS' ? 'sap-badge-success' : step.status === 'WARNING' ? 'sap-badge-warning' : 'sap-badge-error'}">${step.status}</span>
                </div>
                <div style="font-size:12px; color:var(--text-secondary); line-height:1.4;">
                  ${step.findings.join(' | ')}
                </div>
              </div>
            `
              )
              .join('')}
            <div style="background:var(--bg-success); border:1px solid #86EFAC; border-radius:var(--radius-input); padding:10px 12px; font-size:12px; color:#188038; font-weight:600; display:flex; align-items:center; gap:6px;">
              ${ICONS.checkCircle}
              <span>CONCLUSION: ${aiDecision.recommendation.replace(/_/g, ' ')} (${aiDecision.confidenceScore}% Confidence)</span>
            </div>
          </div>
        </div>

        <!-- Right: Transaction Story Timeline -->
        <div class="sap-card" style="padding:16px 20px;">
          <div style="font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-secondary); margin-bottom:12px;">
            Transaction Story (Lifecycle Trace)
          </div>
          <div>
            ${storyEvents
              .map(
                (ev) => `
              <div class="transaction-story-step step-${ev.statusType}">
                <div class="story-time">${ev.timeFormatted}</div>
                <div class="story-title">${ev.title}</div>
                <div class="story-detail">${ev.detail}</div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    `;

    workspace.innerHTML = topQuestionsHtml + processStripHtml + threeWayBoxHtml + evidenceHtml + explainerAndStoryHtml;
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
    this.runWhatIfSimulation();
  }

  runWhatIfSimulation() {
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
        const vendorBadge = reconciliation.vendorMatched
          ? `<span class="status-pill status-pill-success">${ICONS.check} Matched</span>`
          : `<span class="status-pill status-pill-error">${ICONS.x} Mismatch</span>`;

        return `
          <tr>
            <td><strong>${invoice.invoiceId}</strong><br><small style="color:var(--text-muted);">${invoice.supplierName}</small></td>
            <td>${invoice.purchaseOrderReference ? `<code>${invoice.purchaseOrderReference}</code>` : '<em>Non-PO</em>'}</td>
            <td>${vendorBadge}</td>
            <td><strong>${reconciliation.quantityInvoiced} / ${reconciliation.quantityReceived} EA</strong><br><small>${reconciliation.quantityStatus}</small></td>
            <td><strong>₹${reconciliation.invoicedUnitPrice} vs ₹${reconciliation.poUnitPrice}</strong><br><small>${reconciliation.priceVariancePercentage.toFixed(1)}% delta</small></td>
            <td><span class="sap-badge ${reconciliation.qualityStatus === 'ALL_PASSED' ? 'sap-badge-success' : reconciliation.qualityStatus === 'REJECTIONS_DETECTED' ? 'sap-badge-error' : 'sap-badge-neutral'}">${reconciliation.qualityStatus === 'ALL_PASSED' ? 'Passed' : reconciliation.qualityStatus === 'REJECTIONS_DETECTED' ? 'Rejected' : 'N/A'}</span></td>
            <td>
              <div style="display:flex; gap:4px; flex-wrap:wrap;">
                <span class="status-pill ${reconciliation.quantityStatus === 'EXACT_MATCH' ? 'status-pill-success' : 'status-pill-warning'}">
                  ${reconciliation.quantityStatus === 'EXACT_MATCH' ? ICONS.check : ICONS.alertTriangle}
                  DQ ${reconciliation.quantityStatus === 'EXACT_MATCH' ? 'Passed' : 'Review'}
                </span>
                <span class="status-pill ${reconciliation.priceStatus === 'EXACT_MATCH' ? 'status-pill-success' : 'status-pill-warning'}">
                  ${reconciliation.priceStatus === 'EXACT_MATCH' ? ICONS.check : ICONS.alertTriangle}
                  PP ${reconciliation.priceStatus === 'EXACT_MATCH' ? 'Passed' : 'Review'}
                </span>
                <span class="status-pill ${reconciliation.amountStatus === 'WITHIN_TOLERANCE' ? 'status-pill-success' : 'status-pill-warning'}">
                  ${reconciliation.amountStatus === 'WITHIN_TOLERANCE' ? ICONS.check : ICONS.alertTriangle}
                  BD ${reconciliation.amountStatus === 'WITHIN_TOLERANCE' ? 'Passed' : 'Review'}
                </span>
              </div>
            </td>
            <td>
              <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.selectAndOpenDecision('${invoice.invoiceId}')">
                <span>Drilldown</span>
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

    if (pending.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:40px; color:var(--text-muted);">
          <h3>No Invoices Awaiting Business Owner Validation</h3>
          <p style="font-size:13px; margin-top:8px;">All commercial purchases have been signed off or processed.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = pending
      .map((item) => {
        const { invoice, purchaseOrder, reconciliation } = item;
        const systemCheck = reconciliation.quantityStatus !== 'EXACT_MATCH'
          ? `Quantity mismatch: Billed ${reconciliation.quantityInvoiced} vs ${reconciliation.quantityReceived} received`
          : reconciliation.priceStatus !== 'EXACT_MATCH'
          ? `Unit price variance: ${reconciliation.priceVariancePercentage.toFixed(1)}% above PO price`
          : 'All three-way matching criteria verified';

        return `
          <div class="sap-card" style="margin-bottom:16px; border-left:4px solid var(--status-warning);">
            <div class="sap-card-header">
              <div class="sap-card-title">VALIDATE BUSINESS REQUEST: ${invoice.invoiceId}</div>
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
                <strong>REQUEST:</strong> ${purchaseOrder ? purchaseOrder.lineItems[0]?.description : 'Recurring operational services'}
              </div>

              <div style="background:var(--bg-warning); border:1px solid #FDE68A; padding:10px 14px; border-radius:var(--radius-input); font-size:12px; color:#A16207; font-weight:600; margin-bottom:16px; display:flex; align-items:center; gap:6px;">
                ${ICONS.alertTriangle}
                <span>SYSTEM CHECK: ${systemCheck}</span>
              </div>

              <div style="display:flex; justify-content:flex-end; gap:10px;">
                <button class="sap-btn sap-btn-negative sap-btn-sm" onclick="app.quickValidationAction('${invoice.invoiceId}', 'REJECT')">Reject</button>
                <button class="sap-btn sap-btn-critical sap-btn-sm" onclick="app.quickValidationAction('${invoice.invoiceId}', 'SEND_BACK')">Send Back</button>
                <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.quickValidationAction('${invoice.invoiceId}', 'REQUEST_CLARIFICATION')">Request Clarification</button>
                <button class="sap-btn sap-btn-positive sap-btn-sm" onclick="app.quickValidationAction('${invoice.invoiceId}', 'ACCEPT')">Accept</button>
              </div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  // --------------------------------------------------------------------------
  // VIEW 6: EXCEPTIONS (PRIORITIZED BY BUSINESS URGENCY)
  // --------------------------------------------------------------------------
  renderExceptionsView() {
    const tbody = document.getElementById('exceptionsTableBody');
    if (!tbody) return;

    const exceptionList = [
      {
        severity: 'CRITICAL',
        invoiceId: 'INV-2026-00008',
        supplier: 'Schneider Electric India Pvt Ltd',
        happened: 'Statutory GST E-Invoice IRN approaching 48-hour acceptance deadline.',
        matters: 'Failure to accept or reject before 48h forces automatic statutory acceptance under GST DRC regulations.',
        action: 'Escalate to Business Owner Amit Verma for immediate sign-off.',
      },
      {
        severity: 'CRITICAL',
        invoiceId: 'INV-2026-00007',
        supplier: 'Amazon Web Services India Pvt Ltd',
        happened: 'Duplicate invoice detected against existing posted BELNR 5105600101.',
        matters: 'Prevents double financial posting and duplicate treasury cash outflow.',
        action: 'Reject duplicate submission and notify Accounts Payable.',
      },
      {
        severity: 'CRITICAL',
        invoiceId: 'INV-2026-00004',
        supplier: 'Apex Facility Services Pvt Ltd',
        happened: 'Vendor mismatch: Invoice vendor differs from PO vendor (Siemens Healthcare).',
        matters: 'Indicates unauthorized assignment or commercial billing misrouting.',
        action: 'Hold invoice and verify vendor assignment with Strategic Sourcing.',
      },
      {
        severity: 'HIGH',
        invoiceId: 'INV-2026-00006',
        supplier: 'Camfil Clean Air Systems India Pvt Ltd',
        happened: '5 units rejected in SAP QM Inspection Lot 030000018902.',
        matters: 'Invoicing for rejected / failed materials before credit memo issuance.',
        action: 'Apply payment block R in S/4HANA until Credit Note arrives.',
      },
      {
        severity: 'HIGH',
        invoiceId: 'INV-2026-00009',
        supplier: 'Infosys Limited',
        happened: 'GSTR-2B Statement tax discrepancy (₹12,600 missing tax credit).',
        matters: 'Claiming tax without GSTR-2B presence triggers Section 16(2)(aa) audit notices.',
        action: 'Park invoice and notify Infosys AP desk to file GSTR-1 amendment.',
      },
      {
        severity: 'MEDIUM',
        invoiceId: 'INV-2026-00002',
        supplier: 'L&T Electrical & Automation Ltd',
        happened: 'Over-delivery: Invoiced 100 EA vs 90 EA recorded in SAP Goods Receipt.',
        matters: 'Commercial exposure of ₹12,000 unverified inventory.',
        action: 'Obtain warehouse receipt confirmation or request revised billing.',
      },
      {
        severity: 'MEDIUM',
        invoiceId: 'INV-2026-00005',
        supplier: 'Tata Consultancy Services Ltd',
        happened: 'Unit price exceeds PO price by +15.0% (Tolerance Key PP breached).',
        matters: 'Unapproved price escalation exceeding procurement contract terms.',
        action: 'Request Requisitioner variance approval or rate revision.',
      },
    ];

    tbody.innerHTML = exceptionList
      .map(
        (ex) => `
        <tr>
          <td>
            <span class="sap-badge ${ex.severity === 'CRITICAL' ? 'sap-badge-error' : ex.severity === 'HIGH' ? 'sap-badge-warning' : 'sap-badge-info'}">
              ${ex.severity === 'CRITICAL' ? ICONS.alertTriangle : ex.severity === 'HIGH' ? ICONS.alertTriangle : ICONS.info}
              ${ex.severity}
            </span>
          </td>
          <td><strong>${ex.invoiceId}</strong></td>
          <td>
            <a href="#" style="color:var(--brand-primary); text-decoration:none; font-weight:600;" onclick="app.openSupplierDrawer('${ex.supplier}'); return false;">
              ${ex.supplier}
            </a>
          </td>
          <td>${ex.happened}</td>
          <td style="color:var(--text-secondary);">${ex.matters}</td>
          <td><strong style="color:#188038;">${ex.action}</strong></td>
          <td>
            <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.selectAndOpenDecision('${ex.invoiceId}')">
              <span>Resolve</span>
            </button>
          </td>
        </tr>
      `
      )
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
      const res = await fetch('/api/gst-reconciliation/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ records: this.gstData.records }),
      }).then((r) => r.json());

      this.showToast(`Imported ${res.count} GSTR-2B records from GSP Gateway`, 'success');
      await this.loadAllData();
      this.renderGstReconciliationView();
    } catch (e) {
      this.showToast('Import failed', 'error');
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
      const res = await fetch(`/api/integration-messages/${messageId}/retry`, { method: 'POST' }).then((r) => r.json());
      if (res.success) {
        this.showToast(res.message, 'success');
        await this.loadAllData();
        this.renderIntegrationMonitor();
      }
    } catch (e) {
      this.showToast('Replay failed', 'error');
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

      container.innerHTML = `
        <div class="sap-card" style="padding:24px; margin-bottom:20px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; flex-wrap:wrap; gap:12px;">
            <div>
              <div class="sap-card-title" style="display:flex; align-items:center; gap:8px;">
                ${ICONS.scan}
                <span>Physical / Plant Gate Scanner Intake Simulator</span>
              </div>
              <p style="font-size:13px; color:var(--text-secondary); margin-top:4px;">
                Simulates physical invoice scanning at security gates and mailrooms. Normalizes scan metadata via SAP Document Information Extraction.
              </p>
              <div style="font-size:11px; color:var(--brand-primary); margin-top:6px; font-family:var(--font-mono); font-weight:600;">
                Persistent Source: mock-data/invoices/physical/ (${physicalInvoices.length} on-disk records)
              </div>
            </div>
            <button class="sap-btn sap-btn-primary sap-btn-sm" onclick="app.simulateIntake('physical')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><path d="M12 5v14M5 12h14"/></svg>
              <span>Scan New Paper Invoice</span>
            </button>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(360px, 1fr)); gap:16px; margin-top:16px;">
            ${physicalInvoices.map((inv) => {
              const recBadge = this.getRecommendationBadge(inv.aiDecision.recommendation);
              const meta = inv.invoice.channelMetadata || {};
              return `
                <div style="background:var(--surface-subtle); border:1px solid var(--border-main); border-radius:var(--radius-card); padding:16px; display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                      <div>
                        <div style="font-weight:700; font-size:14px; color:var(--brand-primary);">${inv.invoice.invoiceId}</div>
                        <div style="font-size:12px; font-weight:600; color:var(--text-primary); margin-top:2px;"># ${inv.invoice.invoiceNumber}</div>
                      </div>
                      ${recBadge}
                    </div>

                    <div style="font-size:13px; color:var(--text-primary); font-weight:600; margin-bottom:8px;">
                      ${inv.invoice.supplierName}
                    </div>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; font-size:11px; background:var(--surface); padding:8px 10px; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); margin-bottom:8px;">
                      <div><span style="color:var(--text-muted);">Amount:</span> <strong>₹${(inv.invoice.totalGrossAmount || 0).toLocaleString('en-IN')}</strong></div>
                      <div><span style="color:var(--text-muted);">PO Ref:</span> ${inv.invoice.purchaseOrderReference || 'Non-PO'}</div>
                      <div><span style="color:var(--text-muted);">Scanner:</span> ${meta.scannerLocation || 'Gate 2'}</div>
                      <div><span style="color:var(--text-muted);">Operator:</span> ${meta.operatorId || 'OP-01'}</div>
                    </div>
                  </div>

                  <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-subtle); padding-top:10px;">
                    <span class="sap-badge sap-badge-success" style="font-size:10px;">${ICONS.check} OCR ${meta.scanDpi || 300} DPI</span>
                    <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.selectAndOpenDecision('${inv.invoice.invoiceId}')">
                      <span>Inspect in Decision Center</span>
                      ${ICONS.arrowRight}
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    } else if (this.activeMockPortal === 'email') {
      const emailInvoices = this.invoices.filter(
        (i) => i.invoice.sourceChannel === 'EMAIL_INBOUND'
      );

      container.innerHTML = `
        <div class="sap-card" style="padding:24px; margin-bottom:20px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; flex-wrap:wrap; gap:12px;">
            <div>
              <div class="sap-card-title" style="display:flex; align-items:center; gap:8px;">
                ${ICONS.mail}
                <span>Vendor Invoice Inbound Mailbox (invoices@enterprise.com)</span>
              </div>
              <p style="font-size:13px; color:var(--text-secondary); margin-top:4px;">
                Electronic vendor invoices ingested from shared AP accounts. Normalizes email sender, PDF attachments, and cryptographic hashes.
              </p>
              <div style="font-size:11px; color:var(--brand-primary); margin-top:6px; font-family:var(--font-mono); font-weight:600;">
                Persistent Source: mock-data/invoices/email/ (${emailInvoices.length} on-disk records)
              </div>
            </div>
            <button class="sap-btn sap-btn-primary sap-btn-sm" onclick="app.simulateIntake('email')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><path d="M12 5v14M5 12h14"/></svg>
              <span>Simulate Inbound AP Email</span>
            </button>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(360px, 1fr)); gap:16px; margin-top:16px;">
            ${emailInvoices.map((inv) => {
              const recBadge = this.getRecommendationBadge(inv.aiDecision.recommendation);
              const meta = inv.invoice.channelMetadata || {};
              return `
                <div style="background:var(--surface-subtle); border:1px solid var(--border-main); border-radius:var(--radius-card); padding:16px; display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                      <div>
                        <div style="font-weight:700; font-size:14px; color:var(--brand-primary);">${inv.invoice.invoiceId}</div>
                        <div style="font-size:12px; font-weight:600; color:var(--text-primary); margin-top:2px;"># ${inv.invoice.invoiceNumber}</div>
                      </div>
                      ${recBadge}
                    </div>

                    <div style="font-size:13px; color:var(--text-primary); font-weight:600; margin-bottom:4px;">
                      ${inv.invoice.supplierName}
                    </div>

                    <div style="font-size:11px; color:var(--text-secondary); margin-bottom:8px;">
                      <strong>From:</strong> <code>${meta.emailSender || 'vendor@example.com'}</code>
                    </div>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; font-size:11px; background:var(--surface); padding:8px 10px; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); margin-bottom:8px;">
                      <div><span style="color:var(--text-muted);">Amount:</span> <strong>₹${(inv.invoice.totalGrossAmount || 0).toLocaleString('en-IN')}</strong></div>
                      <div><span style="color:var(--text-muted);">PO Ref:</span> ${inv.invoice.purchaseOrderReference || 'Non-PO'}</div>
                      <div style="grid-column: span 2;"><span style="color:var(--text-muted);">Attachment:</span> <code>${meta.attachmentName || 'invoice.pdf'}</code></div>
                    </div>
                  </div>

                  <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-subtle); padding-top:10px;">
                    <span class="sap-badge sap-badge-info" style="font-size:10px;">${ICONS.check} SPF/DKIM Verified</span>
                    <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.selectAndOpenDecision('${inv.invoice.invoiceId}')">
                      <span>Inspect in Decision Center</span>
                      ${ICONS.arrowRight}
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    } else {
      const einvoices = this.invoices.filter(
        (i) => i.invoice.sourceChannel === 'GOVERNMENT_EINVOICE'
      );

      container.innerHTML = `
        <div class="sap-card" style="padding:24px; margin-bottom:20px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; flex-wrap:wrap; gap:12px;">
            <div>
              <div class="sap-card-title" style="display:flex; align-items:center; gap:8px;">
                ${ICONS.invoice}
                <span>Government E-Invoice / IRP Gateway (GST DRC)</span>
              </div>
              <p style="font-size:13px; color:var(--text-secondary); margin-top:4px;">
                Statutory B2B electronic invoice push carrying cryptographic 64-character Invoice Reference Number (IRN) and QR digital signatures.
              </p>
              <div style="font-size:11px; color:var(--brand-primary); margin-top:6px; font-family:var(--font-mono); font-weight:600;">
                Persistent Source: mock-data/invoices/einvoice/ (${einvoices.length} on-disk records)
              </div>
            </div>
            <button class="sap-btn sap-btn-primary sap-btn-sm" onclick="app.simulateIntake('einvoice')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><path d="M12 5v14M5 12h14"/></svg>
              <span>Simulate E-Invoice Portal Push</span>
            </button>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(360px, 1fr)); gap:16px; margin-top:16px;">
            ${einvoices.map((inv) => {
              const recBadge = this.getRecommendationBadge(inv.aiDecision.recommendation);
              const meta = inv.invoice.channelMetadata || {};
              return `
                <div style="background:var(--surface-subtle); border:1px solid var(--border-main); border-radius:var(--radius-card); padding:16px; display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                      <div>
                        <div style="font-weight:700; font-size:14px; color:var(--brand-primary);">${inv.invoice.invoiceId}</div>
                        <div style="font-size:12px; font-weight:600; color:var(--text-primary); margin-top:2px;"># ${inv.invoice.invoiceNumber}</div>
                      </div>
                      ${recBadge}
                    </div>

                    <div style="font-size:13px; color:var(--text-primary); font-weight:600; margin-bottom:4px;">
                      ${inv.invoice.supplierName}
                    </div>

                    <div style="font-size:11px; color:var(--text-secondary); margin-bottom:8px; word-break:break-all;">
                      <strong>IRN:</strong> <code style="font-size:10px;">${meta.irn || 'N/A'}</code>
                    </div>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; font-size:11px; background:var(--surface); padding:8px 10px; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); margin-bottom:8px;">
                      <div><span style="color:var(--text-muted);">Amount:</span> <strong>₹${(inv.invoice.totalGrossAmount || 0).toLocaleString('en-IN')}</strong></div>
                      <div><span style="color:var(--text-muted);">PO Ref:</span> ${inv.invoice.purchaseOrderReference || 'Non-PO'}</div>
                      <div style="grid-column: span 2;"><span style="color:var(--text-muted);">Ack No:</span> ${meta.acknowledgementNumber || '122619945001'} (${meta.acknowledgementDate || '2026-10-04'})</div>
                    </div>
                  </div>

                  <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-subtle); padding-top:10px;">
                    <span class="sap-badge sap-badge-warning" style="font-size:10px;">${ICONS.alertTriangle} 48h Statutory SLA Active</span>
                    <button class="sap-btn sap-btn-secondary sap-btn-sm" onclick="app.selectAndOpenDecision('${inv.invoice.invoiceId}')">
                      <span>Inspect in Decision Center</span>
                      ${ICONS.arrowRight}
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }
  }

  async simulateIntake(channel) {
    let endpoint = '/api/invoices/intake/physical';
    let payload = {};

    if (channel === 'physical') {
      endpoint = '/api/invoices/intake/physical';
      payload = {
        invoiceNumber: `SEI/2026/${Math.floor(1000 + Math.random() * 9000)}`,
        supplierTaxId: '27AAACS1234F1Z5',
        supplierName: 'Schneider Electric India Pvt Ltd',
        invoiceDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        currency: 'INR',
        poReference: '4500012456',
        totalNetAmount: 50000,
        taxAmount: 9000,
        totalGrossAmount: 59000,
        scannerLocation: 'Plant 1010 Security Gate 2 Scanner',
        operatorId: 'OP-4491',
        scanDpi: 300,
        lineItems: [
          {
            itemNumber: '00010',
            description: 'Industrial Miniature Circuit Breakers (MCB 32A)',
            quantity: 100,
            unitOfMeasure: 'EA',
            unitPrice: 500,
            netAmount: 50000,
            taxRate: 18,
            taxAmount: 9000,
          },
        ],
      };
    } else if (channel === 'email') {
      endpoint = '/api/invoices/intake/email';
      payload = {
        emailSender: 'billing.support@tcs.com',
        emailSubject: `Invoice TCS-${Math.floor(1000 + Math.random() * 9000)} - S/4HANA Consulting`,
        attachmentName: `TCS_Consulting_Invoice_${Math.floor(1000 + Math.random() * 9000)}.pdf`,
        extractedInvoiceNumber: `TCS/2026/${Math.floor(1000 + Math.random() * 9000)}`,
        supplierTaxId: '27AAACT1999A1Z1',
        supplierName: 'Tata Consultancy Services Ltd',
        invoiceDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        currency: 'INR',
        poReference: '4500012750',
        totalNetAmount: 115000,
        taxAmount: 20700,
        totalGrossAmount: 135700,
        lineItems: [
          {
            itemNumber: '00010',
            description: 'Senior SAP S/4HANA Solution Architect (Consulting Hours)',
            quantity: 100,
            unitOfMeasure: 'HR',
            unitPrice: 1150,
            netAmount: 115000,
            taxRate: 18,
            taxAmount: 20700,
          },
        ],
      };
    } else {
      endpoint = '/api/invoices/intake/einvoice';
      const fakeIrn = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      payload = {
        irn: fakeIrn,
        acknowledgementNumber: `${Math.floor(100000000000 + Math.random() * 900000000000)}`,
        acknowledgementDate: new Date().toISOString().split('T')[0],
        digitalSignatureValid: true,
        invoiceNumber: `SEI/EINV/${Math.floor(1000 + Math.random() * 9000)}`,
        supplierGstin: '27AAACS1234F1Z5',
        supplierLegalName: 'Schneider Electric India Pvt Ltd',
        buyerGstin: '29AABCT1332L1ZV',
        invoiceDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0],
        currency: 'INR',
        poReference: '4500012900',
        totalTaxableValue: 845000,
        cgstAmount: 76050,
        sgstAmount: 76050,
        totalInvoiceValue: 997100,
        lineItems: [
          {
            itemNumber: '00010',
            description: 'PLC Programmable Logic Controller Modicon M580',
            quantity: 10,
            unitOfMeasure: 'EA',
            unitPrice: 84500,
            taxableAmount: 845000,
            gstRate: 18,
            gstAmount: 152100,
          },
        ],
      };
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).then((r) => r.json());

      this.showToast(`Simulated intake ingested: ${res.invoice?.invoiceId || 'Success'}`, 'success');
      await this.loadAllData();
      this.renderMockPortals();
    } catch (e) {
      this.showToast('Intake simulation failed', 'error');
    }
  }

  // --------------------------------------------------------------------------
  // ACTIONS: POST & PARK IN SAP S/4HANA
  // --------------------------------------------------------------------------
  async postToSAP(invoiceId) {
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actorId: 'BO_AARAV', actorName: `${this.currentUser.name} (${this.currentUser.role})` }),
      }).then((r) => r.json());

      if (res.postResult && res.postResult.success) {
        this.showToast(res.postResult.message, 'success');
        await this.loadAllData();
        this.renderCurrentView();
      }
    } catch (e) {
      this.showToast('SAP Posting Failed', 'error');
    }
  }

  async parkInSAP(invoiceId) {
    const reason = prompt('Enter parking reason for S/4HANA document (MIR7):', 'Held for exception review with Procurement');
    if (!reason) return;

    try {
      const res = await fetch(`/api/invoices/${invoiceId}/park`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason, actorId: 'AP_CLERK', actorName: 'AP Clerk' }),
      }).then((r) => r.json());

      if (res.parkResult && res.parkResult.success) {
        this.showToast(res.parkResult.message, 'success');
        await this.loadAllData();
        this.renderCurrentView();
      }
    } catch (e) {
      this.showToast('SAP Parking Failed', 'error');
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

    try {
      await fetch(`/api/invoices/${this.currentValidatingInvoiceId}/validate`, {
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
      });

      this.closeModal('modalValidation');
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
      await fetch(`/api/invoices/${invoiceId}/validate`, {
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
      });

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
      await fetch('/api/reset', { method: 'POST' });
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
      case 'REJECT':
        return `<span class="sap-badge sap-badge-error">${ICONS.xCircle} Reject</span>`;
      case 'NON_PO_PROCESS':
        return `<span class="sap-badge sap-badge-info">${ICONS.document} Non-PO Route</span>`;
      default:
        return `<span class="sap-badge sap-badge-neutral">${rec}</span>`;
    }
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
});
