// ═══════════════════════════════════════════
// Sidebar Component — Phase 1 + Phase 2 Navigation
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { router } from '../router.js';

const NAV_ITEMS = [
  { section: 'nav.sections.sourceToPayChapter', items: [
    { key: 'dashboard', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`, label: 'nav.dashboard', route: 'dashboard' },
    { key: 'market-research', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>`, label: 'nav.marketResearch', route: 'market-research' },
    { key: 'supplier-selection', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`, label: 'nav.supplierSelection', route: 'supplier-selection' },
    { key: 'order-management', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`, label: 'nav.orderManagement', route: 'order-management' },
    { key: 'receiving-qa', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`, label: 'nav.receivingQA', route: 'receiving-qa' },
    { key: 'invoice-payment', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`, label: 'nav.invoicePayment', route: 'invoice-payment' },
    { key: 'supplier-mgmt', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`, label: 'nav.supplierMgmt', route: 'supplier-mgmt' },
  ]},
  // ── Phase Two: The Pulse of Goods ──
  { section: 'nav.sections.inventoryLogisticsChapter', items: [
    { key: 'inventory-management', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`, label: 'nav.inventoryMgmt', route: 'inventory-management' },
    { key: 'logistics-management', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`, label: 'nav.logisticsMgmt', route: 'logistics-management' },
  ]},
  // ── Phase Three: The Shield of Governance ──
  { section: 'nav.sections.contractGovernanceChapter', items: [
    { key: 'contract-management', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M9 15l3 3 3-3"/></svg>`, label: 'nav.contractMgmt', route: 'contract-management' },
    { key: 'risk-dashboard', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`, label: 'nav.riskDashboard', route: 'risk-dashboard' },
    { key: 'compliance-docs', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></svg>`, label: 'nav.complianceDocs', route: 'compliance-docs' },
  ]},
  // ── System Configuration ──
  { section: 'nav.sections.systemConfig', items: [
    { key: 'integration-settings', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`, label: 'nav.integrationSettings', route: 'integration-settings' },
    { key: 'user-profile', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`, label: 'nav.userProfile', route: 'user-profile' },
  ]}
];

export function renderSidebar() {
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.id = 'main-sidebar';

  sidebar.innerHTML = `
    <div class="sidebar__brand">
      <div class="sidebar__brand-icon">SC</div>
      <div class="sidebar__brand-text">
        <span class="sidebar__brand-name">${i18n.t('app.name')}</span>
        <span class="sidebar__brand-sub">${i18n.t('app.subtitle')}</span>
      </div>
    </div>
    <nav class="sidebar__nav" id="sidebar-nav"></nav>
  `;

  const nav = sidebar.querySelector('#sidebar-nav');

  NAV_ITEMS.forEach(section => {
    const sectionEl = document.createElement('div');
    sectionEl.className = 'sidebar__section';
    sectionEl.innerHTML = `<div class="sidebar__section-label">${i18n.t(section.section)}</div>`;

    section.items.forEach(item => {
      const link = document.createElement('a');
      link.className = 'sidebar__link';
      link.dataset.route = item.route;
      link.id = `nav-${item.key}`;
      link.innerHTML = `
        <span class="sidebar__link-icon">${item.icon}</span>
        <span class="sidebar__link-label">${i18n.t(item.label)}</span>
      `;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        router.navigate(item.route);
      });
      sectionEl.appendChild(link);
    });

    nav.appendChild(sectionEl);
  });

  return sidebar;
}

export function updateSidebarActive(route) {
  document.querySelectorAll('.sidebar__link').forEach(link => {
    link.classList.toggle('active', link.dataset.route === route);
  });
}

export function updateSidebarLabels() {
  const brand = document.querySelector('.sidebar__brand-name');
  const sub = document.querySelector('.sidebar__brand-sub');
  if (brand) brand.textContent = i18n.t('app.name');
  if (sub) sub.textContent = i18n.t('app.subtitle');

  NAV_ITEMS.forEach(section => {
    section.items.forEach(item => {
      const label = document.querySelector(`#nav-${item.key} .sidebar__link-label`);
      if (label) label.textContent = i18n.t(item.label);
    });
  });

  document.querySelectorAll('.sidebar__section-label').forEach((el, idx) => {
    if (NAV_ITEMS[idx]) el.textContent = i18n.t(NAV_ITEMS[idx].section);
  });
}
