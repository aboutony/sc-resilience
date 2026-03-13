// ═══════════════════════════════════════════════════════
// Router – Hash-based SPA with Narrative Slide Transitions
// ═══════════════════════════════════════════════════════

import { Registry } from './infra/Registry.js';

// --- Imports for Content Modules ---
import { renderLoginPage } from './pages/login.js';
import { renderDashboardPage } from './pages/dashboard.js';
import { renderMarketResearchPage } from './pages/market-research.js';
import { renderSupplierSelectionPage } from './pages/supplier-selection.js';
import { renderOrderManagementPage } from './pages/order-management.js';
import { renderInventoryManagementPage } from './pages/inventory-management.js';
import { renderWarehouseGridPage } from './pages/WarehouseGrid.js'; // New Peer Module
import { renderReceivingQAPage } from './pages/receiving-qa.js';
import { renderInvoicePaymentPage } from './pages/invoice-payment.js';
import { renderSupplierMgmtPage } from './pages/supplier-mgmt.js';
import { renderIntegrationSettingsPage } from './pages/integration-settings.js';
import { renderUserProfilePage } from './pages/user-profile.js';

// Route order defines the "chapter" order for narrative slide direction
const ROUTE_ORDER = [
  'login',
  'dashboard',
  'market-research',
  'supplier-selection',
  'order-management',
  'inventory-management',
  'warehouse-grid', // The drill-down view
  'receiving-qa',
  'invoice-payment',
  'supplier-mgmt',
  'integration-settings',
  'user-profile'
];

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.currentPage = null;
    this.contentEl = null;
    this.onRouteChange = null;
  }

  register(path, loader) {
    this.routes[path] = loader;
  }

  setContentElement(el) {
    this.contentEl = el;
  }

  start() {
    // Register All Routes
    this.register('login', renderLoginPage);
    this.register('dashboard', renderDashboardPage);
    this.register('market-research', renderMarketResearchPage);
    this.register('supplier-selection', renderSupplierSelectionPage);
    this.register('order-management', renderOrderManagementPage);
    this.register('inventory-management', renderInventoryManagementPage);
    this.register('warehouse-grid', renderWarehouseGridPage);
    this.register('receiving-qa', renderReceivingQAPage);
    this.register('invoice-payment', renderInvoicePaymentPage);
    this.register('supplier-mgmt', renderSupplierMgmtPage);
    this.register('integration-settings', renderIntegrationSettingsPage);
    this.register('user-profile', renderUserProfilePage);

    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  }

  navigate(path) {
    window.location.hash = `#/${path}`;
  }

  async handleRoute() {
    const hash = window.location.hash.slice(2) || 'login';
    const loader = this.routes[hash];

    if (!loader || !this.contentEl) {
      if (!this.routes[hash]) {
        this.navigate('login');
      }
      return;
    }

    const prevRoute = this.currentRoute;
    this.currentRoute = hash;

    // ─── KILL-SWITCH: Tear down all registered instances ───
    Registry.cleanupAll();

    // Determine slide direction based on narrative order
    const prevIdx = ROUTE_ORDER.indexOf(prevRoute);
    const nextIdx = ROUTE_ORDER.indexOf(hash);
    const isForward = nextIdx >= prevIdx || prevIdx === -1;

    // Exit animation on current content
    if (this.currentPage) {
      const exitClass = isForward ? 'slide-exit' : 'slide-exit-reverse';
      this.currentPage.classList.add(exitClass);
      await new Promise(r => setTimeout(r, 300));
    }

    // Clear and render new page
    this.contentEl.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'page-transition';

    const pageContent = await loader();
    if (typeof pageContent === 'string') {
      wrapper.innerHTML = pageContent;
    } else if (pageContent instanceof HTMLElement) {
      wrapper.appendChild(pageContent);
    }

    this.contentEl.appendChild(wrapper);
    this.currentPage = wrapper;

    // Enter animation
    const enterClass = isForward ? 'slide-enter' : 'slide-enter';
    wrapper.classList.add(enterClass);

    // Fire route change callback
    if (this.onRouteChange) {
      this.onRouteChange(hash);
    }
  }

  getCurrentRoute() {
    return this.currentRoute;
  }
}

export const router = new Router();
