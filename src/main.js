// ═══════════════════════════════════════════════════════
// Main.js – Application Bootstrap
// AI-Powered Supply Chain Resilience Platform
// ═══════════════════════════════════════════════════════

import { themeEngine } from './theme.js';
import { i18n } from './i18n.js';
import { router } from './router.js';
import { renderSidebar, updateSidebarActive, updateSidebarLabels } from './components/sidebar.js';
import { renderHeader, updateBreadcrumb } from './components/header.js';

// ─── Only login is static (first screen) ───
import { renderLoginPage } from './pages/login.js';

// ─── App State ───
let appShell = null;

// ─── Page Import Map (Lazy) ───
// Each route maps to a dynamic import + its named export.
// Pages are loaded on-demand, keeping the initial bundle lean
// and preventing the IDE language server from choking on the
// full module graph (fixes -32099 stream crashes).
const PAGE_LOADER = {
  'dashboard':            () => import('./pages/dashboard.js').then(m => m.renderDashboardPage()),
  'market-research':      () => import('./pages/market-research.js').then(m => m.renderMarketResearchPage()),
  'supplier-selection':   () => import('./pages/supplier-selection.js').then(m => m.renderSupplierSelectionPage()),
  'order-management':     () => import('./pages/order-management.js').then(m => m.renderOrderManagementPage()),
  'receiving-qa':         () => import('./pages/receiving-qa.js').then(m => m.renderReceivingQAPage()),
  'invoice-payment':      () => import('./pages/invoice-payment.js').then(m => m.renderInvoicePaymentPage()),
  'supplier-mgmt':        () => import('./pages/supplier-mgmt.js').then(m => m.renderSupplierMgmtPage()),
  'inventory-management': () => import('./pages/inventory-management.js').then(m => m.renderInventoryManagementPage()),
  'logistics-management': () => import('./pages/logistics-management.js').then(m => m.renderLogisticsManagementPage()),
  'contract-management':  () => import('./pages/contract-management.js').then(m => m.renderContractManagementPage()),
  'risk-dashboard':       () => import('./pages/risk-dashboard.js').then(m => m.renderRiskDashboardPage()),
  'compliance-docs':      () => import('./pages/compliance-docs.js').then(m => m.renderComplianceDocsPage()),
  'demand-planning':      () => import('./pages/demand-planning.js').then(m => m.renderDemandPlanningPage()),
  'cost-engineering':     () => import('./pages/cost-engineering.js').then(m => m.renderCostEngineeringPage()),
  'spend-analysis':       () => import('./pages/spend-analysis.js').then(m => m.renderSpendAnalysisPage()),
  'intelligent-reporting': () => import('./pages/intelligent-reporting.js').then(m => m.renderIntelligentReportingPage()),
  'integration-settings': () => import('./pages/integration-settings.js').then(m => m.renderIntegrationSettingsPage()),
  'user-profile':         () => import('./pages/user-profile.js').then(m => m.renderUserProfilePage()),
};

// ─── Boot Sequence ───
function boot() {
  const app = document.getElementById('app');

  // Hide splash loader after a short delay
  setTimeout(() => {
    const loader = document.getElementById('app-loader');
    if (loader) loader.classList.add('hidden');
  }, 600);

  // Determine initial route
  const hash = window.location.hash.slice(2) || 'login';

  // Start with the correct layout
  if (hash === 'login' || !hash) {
    showLogin();
  } else {
    showAuthenticatedRoute(hash);
  }

  // Listen for hash changes
  window.addEventListener('hashchange', handleHashChange);

  // Language change: re-render
  window.addEventListener('lang-changed', () => {
    const currentHash = window.location.hash.slice(2) || 'login';
    appShell = null; // Force rebuild
    if (currentHash === 'login') {
      showLogin();
    } else {
      showAuthenticatedRoute(currentHash);
    }
  });
}

function handleHashChange() {
  const hash = window.location.hash.slice(2) || 'login';
  if (hash === 'login') {
    showLogin();
  } else {
    showAuthenticatedRoute(hash);
  }
}

function showLogin() {
  const app = document.getElementById('app');
  // Preserve the loader if it exists
  const loader = document.getElementById('app-loader');

  app.innerHTML = '';
  if (loader) app.appendChild(loader);

  const loginPage = renderLoginPage();
  app.appendChild(loginPage);
  appShell = null;
}

async function showAuthenticatedRoute(route) {
  // Build app shell if needed
  if (!appShell) {
    buildAppShell();
  }

  const main = document.getElementById('main-content');
  if (!main) return;

  // Exit animation — 300ms ease-in-out gold standard
  const oldContent = main.querySelector('.page-transition');
  if (oldContent) {
    oldContent.style.opacity = '0';
    oldContent.style.transform = 'translateX(-30px)';
    oldContent.style.transition = 'all 300ms ease-in-out';
  }

  // Wait for exit animation, then swap
  const delay = oldContent ? 300 : 0;
  await new Promise(resolve => setTimeout(resolve, delay));

  main.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'page-transition slide-enter';

  // ─── Dynamic page load ───
  const pageContent = await getPageContent(route);
  if (pageContent instanceof HTMLElement) {
    wrapper.appendChild(pageContent);
  } else if (typeof pageContent === 'string') {
    wrapper.innerHTML = pageContent;
  }

  main.appendChild(wrapper);

  // Update sidebar and breadcrumb
  updateSidebarActive(route);
  updateBreadcrumb(route);
}

async function getPageContent(route) {
  const loader = PAGE_LOADER[route];
  if (loader) {
    return await loader();
  }
  // Fallback: dashboard
  const fallback = PAGE_LOADER['dashboard'];
  return await fallback();
}

function buildAppShell() {
  const app = document.getElementById('app');
  const loader = document.getElementById('app-loader');

  app.innerHTML = '';
  if (loader) app.appendChild(loader);

  const shell = document.createElement('div');
  shell.className = 'app-shell';
  shell.id = 'app-shell';

  // Sidebar
  const sidebar = renderSidebar();
  shell.appendChild(sidebar);

  // Header
  const header = renderHeader();
  shell.appendChild(header);

  // Main content area
  const main = document.createElement('main');
  main.className = 'main-content';
  main.id = 'main-content';
  shell.appendChild(main);

  app.appendChild(shell);
  appShell = shell;
}

// ─── Initialize ───
document.addEventListener('DOMContentLoaded', boot);

// ─── HMR Support ───
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    window.removeEventListener('hashchange', handleHashChange);
    appShell = null;
  });
  import.meta.hot.accept();
}
