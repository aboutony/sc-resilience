// ═══════════════════════════════════════════
// Header Component — With Narrative Breadcrumbs
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { themeEngine } from '../theme.js';

// ── Refinement #2: Breadcrumb Narrative Depth ──
// Each route maps to a narrative chapter title, not just a plain page name
const BREADCRUMB_NARRATIVES = {
  'dashboard':            'breadcrumb.dashboard',
  'market-research':      'breadcrumb.marketResearch',
  'supplier-selection':   'breadcrumb.supplierSelection',
  'order-management':     'breadcrumb.orderManagement',
  'receiving-qa':         'breadcrumb.receivingQA',
  'invoice-payment':      'breadcrumb.invoicePayment',
  'supplier-mgmt':        'breadcrumb.supplierMgmt',
  'inventory-management': 'breadcrumb.inventoryMgmt',
  'logistics-management': 'breadcrumb.logisticsMgmt',
  'contract-management':  'breadcrumb.contractMgmt',
  'risk-dashboard':       'breadcrumb.riskDashboard',
  'compliance-docs':      'breadcrumb.complianceDocs',
  'integration-settings': 'breadcrumb.integrationSettings',
  'user-profile':         'breadcrumb.userProfile',
};

const sunIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const moonIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const bellIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`;

export function renderHeader() {
  const header = document.createElement('header');
  header.className = 'header';
  header.id = 'main-header';

  header.innerHTML = `
    <div class="header__left">
      <div class="header__breadcrumb" id="header-breadcrumb">
        <span>${i18n.t('app.name')}</span>
        <span class="header__breadcrumb-sep">/</span>
        <span class="header__breadcrumb-current" id="breadcrumb-current">${i18n.t('breadcrumb.dashboard')}</span>
      </div>
    </div>
    <div class="header__right">
      <button class="header__control" id="theme-toggle" title="Toggle Theme">
        ${themeEngine.isDark() ? sunIcon : moonIcon}
      </button>
      <button class="header__control header__lang-btn" id="lang-toggle" title="Toggle Language">
        ${i18n.getLang() === 'en' ? 'AR' : 'EN'}
      </button>
      <button class="header__control" id="notifications-btn" title="${i18n.t('header.notifications')}">
        ${bellIcon}
        <span class="header__badge">3</span>
      </button>
      <div class="header__divider"></div>
      <div class="header__profile" id="header-profile">
        <div class="header__avatar">FA</div>
        <div class="header__user-info">
          <span class="header__user-name">Fahad Al-Rashid</span>
          <span class="header__user-role">Chief Procurement Officer</span>
        </div>
      </div>
    </div>
  `;

  // Theme toggle
  header.querySelector('#theme-toggle').addEventListener('click', () => {
    themeEngine.toggle();
    header.querySelector('#theme-toggle').innerHTML = themeEngine.isDark() ? sunIcon : moonIcon;
  });

  // Language toggle
  header.querySelector('#lang-toggle').addEventListener('click', () => {
    i18n.toggle();
  });

  return header;
}

export function updateBreadcrumb(route) {
  const el = document.getElementById('breadcrumb-current');
  if (el && BREADCRUMB_NARRATIVES[route]) {
    el.textContent = i18n.t(BREADCRUMB_NARRATIVES[route]);
  }
}
