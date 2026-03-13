// ═══════════════════════════════════════════════════════
// Main.js – Application Bootstrap
// AI-Powered Supply Chain Resilience Platform
// ═══════════════════════════════════════════════════════

import { themeEngine } from './theme.js';
import { i18n } from './i18n.js';
import { router } from './router.js';
import { renderSidebar, updateSidebarActive, updateSidebarLabels } from './components/sidebar.js';
import { renderHeader, updateBreadcrumb } from './components/header.js';
import { renderLoginPage } from './pages/login.js';
import { renderDashboardPage } from './pages/dashboard.js';
import { renderMarketResearchPage } from './pages/market-research.js';
import { renderSupplierSelectionPage } from './pages/supplier-selection.js';
import { renderIntegrationSettingsPage } from './pages/integration-settings.js';
import { renderUserProfilePage } from './pages/user-profile.js';
import { renderPlaceholderPage } from './pages/placeholder.js';
import { renderInventoryManagementPage } from './pages/inventory-management.js';
import { renderLogisticsManagementPage } from './pages/logistics-management.js';
import { renderContractManagementPage } from './pages/contract-management.js';
import { renderRiskDashboardPage } from './pages/risk-dashboard.js';
import { renderComplianceDocsPage } from './pages/compliance-docs.js';

// ─── App State ───
let appShell = null;

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

function showAuthenticatedRoute(route) {
  // Build app shell if needed
  if (!appShell) {
    buildAppShell();
  }

  const main = document.getElementById('main-content');
  if (!main) return;

  // Exit animation — Refinement #5: 300ms ease-in-out
  const oldContent = main.querySelector('.page-transition');
  if (oldContent) {
    oldContent.style.opacity = '0';
    oldContent.style.transform = 'translateX(-30px)';
    oldContent.style.transition = 'all 300ms ease-in-out';
  }

  setTimeout(() => {
    main.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'page-transition slide-enter';

    const pageContent = getPageContent(route);
    if (pageContent instanceof HTMLElement) {
      wrapper.appendChild(pageContent);
    } else if (typeof pageContent === 'string') {
      wrapper.innerHTML = pageContent;
    }

    main.appendChild(wrapper);

    // Update sidebar and breadcrumb
    updateSidebarActive(route);
    updateBreadcrumb(route);
  }, oldContent ? 300 : 0);
}

function getPageContent(route) {
  switch (route) {
    case 'dashboard':
      return renderDashboardPage();
    case 'market-research':
      return renderMarketResearchPage();
    case 'supplier-selection':
      return renderSupplierSelectionPage();
    case 'order-management':
      return renderPlaceholderPage('nav.orderManagement', 'placeholder.description');
    case 'receiving-qa':
      return renderPlaceholderPage('nav.receivingQA', 'placeholder.description');
    case 'invoice-payment':
      return renderPlaceholderPage('nav.invoicePayment', 'placeholder.description');
    case 'supplier-mgmt':
      return renderPlaceholderPage('nav.supplierMgmt', 'placeholder.description');
    case 'inventory-management':
      return renderInventoryManagementPage();
    case 'logistics-management':
      return renderLogisticsManagementPage();
    case 'contract-management':
      return renderContractManagementPage();
    case 'risk-dashboard':
      return renderRiskDashboardPage();
    case 'compliance-docs':
      return renderComplianceDocsPage();
    case 'integration-settings':
      return renderIntegrationSettingsPage();
    case 'user-profile':
      return renderUserProfilePage();
    default:
      return renderPlaceholderPage('placeholder.title', 'placeholder.description');
  }
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
