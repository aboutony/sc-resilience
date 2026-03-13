// ═══════════════════════════════════════════
// Header Component — With Narrative Breadcrumbs
// & Functional Notification Bell
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { themeEngine } from '../theme.js';

// ── Refinement #2: Breadcrumb Narrative Depth ──
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
  'demand-planning':      'breadcrumb.demandPlanning',
  'cost-engineering':     'breadcrumb.costEngineering',
  'spend-analysis':       'breadcrumb.spendAnalysis',
  'intelligent-reporting':'breadcrumb.intelligentReporting',
  'integration-settings': 'breadcrumb.integrationSettings',
  'user-profile':         'breadcrumb.userProfile',
};

const sunIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const moonIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const bellIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`;

// Notification data
const NOTIFICATIONS = [
  { id: 'n1', type: 'success', icon: '🏛️', time: '2m', route: 'supplier-mgmt',
    title: 'dashboard.notifications.iktva', detail: 'dashboard.notifications.iktvaSub' },
  { id: 'n2', type: 'danger', icon: '⚓', time: '18m', route: 'receiving-qa',
    title: 'dashboard.notifications.portDelay', detail: 'dashboard.notifications.portDelaySub' },
  { id: 'n3', type: 'warning', icon: '📋', time: '45m', route: 'order-management',
    title: 'dashboard.notifications.approval', detail: 'dashboard.notifications.approvalSub' },
  { id: 'n4', type: 'info', icon: '✅', time: '1h', route: 'supplier-selection',
    title: 'dashboard.notifications.compliance', detail: 'dashboard.notifications.complianceSub' },
];

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
      <div class="header__notification-wrap" style="position:relative;">
        <button class="header__control" id="notifications-btn" title="${i18n.t('header.notifications')}">
          ${bellIcon}
          <span class="header__badge" id="notif-badge">${NOTIFICATIONS.length}</span>
        </button>
        <!-- Glassmorphic Notification Dropdown -->
        <div class="notif-dropdown" id="notif-dropdown" style="display:none;">
          <div class="notif-dropdown__header">
            <span class="notif-dropdown__title">${i18n.t('dashboard.notifications.title')}</span>
            <button class="notif-dropdown__mark-read" id="notif-mark-all">${i18n.t('dashboard.notifications.markRead')}</button>
          </div>
          <div class="notif-dropdown__list">
            ${NOTIFICATIONS.map(n => `
              <div class="notif-item notif-item--${n.type}" id="notif-${n.id}" data-route="${n.route}">
                <span class="notif-item__icon">${n.icon}</span>
                <div class="notif-item__content">
                  <div class="notif-item__title">${i18n.t(n.title)}</div>
                  <div class="notif-item__detail">${i18n.t(n.detail)}</div>
                  <div class="notif-item__time">${n.time}</div>
                </div>
                <div class="notif-item__dot"></div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="header__divider"></div>
      <div class="header__profile" id="header-profile">
        <div class="header__avatar">FA</div>
        <div class="header__user-info">
          <span class="header__user-name">Fahad Al-Rashid</span>
          <span class="header__user-role">Chief Procurement Officer</span>
        </div>
      </div>
    </div>

    <style>
      .notif-dropdown {
        position:absolute; top:calc(100% + 8px); right:0; width:380px; max-height:440px;
        background:var(--surface-card); border:1px solid var(--border-primary);
        border-radius:var(--radius-lg); box-shadow:var(--shadow-xl);
        backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
        z-index:1000; overflow:hidden;
        animation:fadeInDown 0.2s ease;
      }
      @keyframes fadeInDown {
        from { opacity:0; transform:translateY(-8px); }
        to { opacity:1; transform:translateY(0); }
      }
      .notif-dropdown__header {
        display:flex; justify-content:space-between; align-items:center;
        padding:var(--space-md) var(--space-lg);
        border-bottom:1px solid var(--border-secondary);
      }
      .notif-dropdown__title {
        font-size:0.85rem; font-weight:700; color:var(--text-primary);
      }
      .notif-dropdown__mark-read {
        font-size:0.7rem; font-weight:500; color:var(--accent-primary);
        background:none; border:none; cursor:pointer; padding:4px 8px;
        border-radius:var(--radius-sm); transition:all 200ms ease;
      }
      .notif-dropdown__mark-read:hover { background:rgba(26,86,219,0.08); }
      .notif-dropdown__list {
        max-height:360px; overflow-y:auto; padding:var(--space-xs) 0;
      }
      .notif-item {
        display:flex; gap:var(--space-sm); padding:var(--space-sm) var(--space-lg);
        cursor:pointer; transition:all 200ms ease; position:relative;
        border-left:3px solid transparent;
      }
      .notif-item:hover { background:var(--bg-secondary); }
      .notif-item--success { border-left-color:#37bc64; }
      .notif-item--danger { border-left-color:var(--accent-danger); }
      .notif-item--warning { border-left-color:var(--accent-warning); }
      .notif-item--info { border-left-color:var(--accent-primary); }
      .notif-item__icon { font-size:1.3rem; line-height:1; flex-shrink:0; margin-top:2px; }
      .notif-item__content { flex:1; min-width:0; }
      .notif-item__title { font-size:0.8rem; font-weight:600; color:var(--text-primary); margin-bottom:2px; }
      .notif-item__detail { font-size:0.7rem; color:var(--text-secondary); line-height:1.4; margin-bottom:4px; }
      .notif-item__time { font-size:0.6rem; color:var(--text-tertiary); font-family:var(--font-mono); }
      .notif-item__dot {
        width:8px; height:8px; border-radius:50%; background:var(--accent-primary);
        flex-shrink:0; margin-top:6px; transition:all 300ms ease;
      }
      .notif-item--read .notif-item__dot { opacity:0; }
      .notif-item--read .notif-item__title { color:var(--text-secondary); font-weight:400; }
    </style>
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

  // Notification bell toggle
  const notifBtn = header.querySelector('#notifications-btn');
  const notifDropdown = header.querySelector('#notif-dropdown');
  const notifBadge = header.querySelector('#notif-badge');

  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notifDropdown.style.display = notifDropdown.style.display === 'none' ? 'block' : 'none';
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!header.querySelector('.header__notification-wrap')?.contains(e.target)) {
      if (notifDropdown) notifDropdown.style.display = 'none';
    }
  });

  // Mark all as read
  header.querySelector('#notif-mark-all')?.addEventListener('click', (e) => {
    e.stopPropagation();
    header.querySelectorAll('.notif-item').forEach(item => {
      item.classList.add('notif-item--read');
    });
    if (notifBadge) {
      notifBadge.style.display = 'none';
    }
  });

  // Notification item clicks → navigate
  header.querySelectorAll('.notif-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const route = item.dataset.route;
      item.classList.add('notif-item--read');

      // Update badge count
      const unread = header.querySelectorAll('.notif-item:not(.notif-item--read)').length;
      if (notifBadge) {
        notifBadge.textContent = unread;
        if (unread === 0) notifBadge.style.display = 'none';
      }

      // Close dropdown and navigate
      notifDropdown.style.display = 'none';
      if (route) window.location.hash = '#/' + route;
    });
  });

  return header;
}

export function updateBreadcrumb(route) {
  const el = document.getElementById('breadcrumb-current');
  if (el && BREADCRUMB_NARRATIVES[route]) {
    el.textContent = i18n.t(BREADCRUMB_NARRATIVES[route]);
  }
}
