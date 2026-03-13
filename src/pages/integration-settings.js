// ═══════════════════════════════════════════
// Integration Settings Page – ERP & Payment Rails
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';

const ERP_CONNECTORS = [
  { id: 'sap', name: 'SAP S/4HANA', type: 'ERP System', icon: 'S4', color: '#0070f2', connected: true, lastSync: '2026-03-13 03:42:00', syncEnabled: true },
  { id: 'oracle', name: 'Oracle Fusion', type: 'ERP System', icon: 'OF', color: '#c74634', connected: true, lastSync: '2026-03-13 03:38:00', syncEnabled: true },
  { id: 'dynamics', name: 'Microsoft Dynamics 365', type: 'ERP System', icon: 'D3', color: '#00a4ef', connected: false, lastSync: '—', syncEnabled: false },
];

const PAYMENT_RAILS = [
  { id: 'snb', name: 'Saudi National Bank', type: 'Host-to-Host', icon: 'SN', color: '#005c3e', connected: true, lastSync: '2026-03-13 03:40:00', syncEnabled: true },
  { id: 'rajhi', name: 'Al Rajhi Bank', type: 'Host-to-Host', icon: 'AR', color: '#00843d', connected: true, lastSync: '2026-03-13 03:35:00', syncEnabled: true },
  { id: 'stripe', name: 'Stripe', type: 'Payment Gateway', icon: 'St', color: '#635bff', connected: false, lastSync: '—', syncEnabled: false },
  { id: 'adyen', name: 'Adyen', type: 'Payment Gateway', icon: 'Ad', color: '#0abf53', connected: false, lastSync: '—', syncEnabled: false },
];

// ── Phase Two: ERP Physical Sync Connectors ──
const ERP_PHYSICAL_SYNC = [
  { id: 'sap-gr', name: 'SAP S/4HANA', type: 'Goods Receipt', icon: 'GR', color: '#0070f2', connected: false, lastSync: '—', syncEnabled: false },
  { id: 'oracle-sm', name: 'Oracle Fusion', type: 'Stock Movements', icon: 'SM', color: '#c74634', connected: false, lastSync: '—', syncEnabled: false },
];

// Track toggle states
const toggleStates = {};

export function renderIntegrationSettingsPage() {
  // Init toggle states
  [...ERP_CONNECTORS, ...PAYMENT_RAILS, ...ERP_PHYSICAL_SYNC].forEach(c => {
    if (toggleStates[c.id] === undefined) toggleStates[c.id] = c.syncEnabled;
  });

  const page = document.createElement('div');
  page.className = 'page-container';
  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">${i18n.t('integrationSettings.chapter')}</div>
      <h1 class="page-header__title">${i18n.t('integrationSettings.title')}</h1>
      <p class="page-header__description">${i18n.t('integrationSettings.description')}</p>
    </div>

    <!-- ERP Connectors -->
    <div style="margin-bottom:var(--space-2xl);">
      <h3 style="font-size:1rem;font-weight:600;color:var(--text-primary);margin-bottom:var(--space-xs);">${i18n.t('integrationSettings.erp.title')}</h3>
      <p style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:var(--space-lg);">${i18n.t('integrationSettings.erp.subtitle')}</p>
      <div class="connector-grid">
        ${ERP_CONNECTORS.map(c => renderConnectorCard(c)).join('')}
      </div>
    </div>

    <!-- Payment Rails -->
    <div style="margin-bottom:var(--space-2xl);">
      <h3 style="font-size:1rem;font-weight:600;color:var(--text-primary);margin-bottom:var(--space-xs);">${i18n.t('integrationSettings.payment.title')}</h3>
      <p style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:var(--space-lg);">${i18n.t('integrationSettings.payment.subtitle')}</p>
      <div class="connector-grid">
        ${PAYMENT_RAILS.map(c => renderConnectorCard(c)).join('')}
      </div>
    </div>

    <!-- Phase Two: ERP Physical Sync -->
    <div style="margin-bottom:var(--space-2xl);">
      <h3 style="font-size:1rem;font-weight:600;color:var(--text-primary);margin-bottom:var(--space-xs);">${i18n.t('integrationSettings.physical.title')}</h3>
      <p style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:var(--space-lg);">${i18n.t('integrationSettings.physical.subtitle')}</p>
      <div class="connector-grid">
        ${ERP_PHYSICAL_SYNC.map(c => renderConnectorCard(c)).join('')}
      </div>
    </div>

    <!-- AML/KYC Compliance Section -->
    <div class="card-panel animate-fade-in-up" style="margin-top:var(--space-2xl);animation-delay:0.5s">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">AML/KYC Compliance Engine</div>
          <div class="card-panel__subtitle">Automated Anti-Money Laundering & Know Your Customer checks</div>
        </div>
        <span class="badge badge--success">Active</span>
      </div>
      <div class="card-panel__body">
        <div class="grid-3">
          <div style="text-align:center;padding:var(--space-lg);">
            <div class="financial-amount financial-amount--hero" style="color:var(--accent-success);margin-bottom:var(--space-xs);">247</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);">Suppliers Verified</div>
          </div>
          <div style="text-align:center;padding:var(--space-lg);border-inline:1px solid var(--border-secondary);">
            <div class="financial-amount financial-amount--hero" style="color:var(--accent-primary);margin-bottom:var(--space-xs);">99.2%</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);">Compliance Rate</div>
          </div>
          <div style="text-align:center;padding:var(--space-lg);">
            <div class="financial-amount financial-amount--hero" style="color:var(--accent-warning);margin-bottom:var(--space-xs);">3</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);">Pending Reviews</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach event listeners after DOM insertion
  requestAnimationFrame(() => {
    // Toggle switches — update both status AND sync button state
    page.querySelectorAll('.connector-toggle').forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        toggleStates[id] = e.target.checked;
        const card = page.querySelector(`#connector-${id}`);
        if (!card) return;

        const statusEl = card.querySelector('.connector-card__status');
        const syncBtn = card.querySelector('.sync-btn');

        // Update status indicator
        if (statusEl) {
          if (e.target.checked) {
            statusEl.innerHTML = `<span class="status-dot status-dot--success"></span> ${i18n.t('integrationSettings.connected')}`;
          } else {
            statusEl.innerHTML = `<span class="status-dot status-dot--danger"></span> ${i18n.t('integrationSettings.disconnected')}`;
          }
        }

        // ── Refinement #1: Contextual Sync Button ──
        if (syncBtn) {
          if (e.target.checked) {
            // Connected: primary brand color with active hover
            syncBtn.classList.remove('btn--ghost', 'sync-btn--disabled');
            syncBtn.classList.add('btn--primary');
            syncBtn.disabled = false;
            syncBtn.style.opacity = '1';
          } else {
            // Disconnected: ghost style at 50% opacity
            syncBtn.classList.remove('btn--primary');
            syncBtn.classList.add('btn--ghost', 'sync-btn--disabled');
            syncBtn.disabled = true;
            syncBtn.style.opacity = '0.5';
          }
        }
      });
    });

    // Sync buttons — animated state transition
    page.querySelectorAll('.sync-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (btn.disabled) return;
        const originalText = btn.textContent;
        btn.textContent = '⟳ Syncing...';
        btn.disabled = true;
        btn.style.opacity = '0.7';
        setTimeout(() => {
          btn.textContent = '✓ Synced';
          btn.classList.remove('btn--primary');
          btn.classList.add('btn--success');
          btn.style.opacity = '1';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.classList.remove('btn--success');
            btn.classList.add('btn--primary');
            btn.style.opacity = '1';
          }, 2000);
        }, 1500);
      });
    });
  });

  return page;
}

function renderConnectorCard(connector) {
  const isOn = toggleStates[connector.id] ?? connector.syncEnabled;
  // ── Refinement #1: Contextual button styling ──
  const syncBtnClass = isOn ? 'btn btn--primary btn--sm sync-btn' : 'btn btn--ghost btn--sm sync-btn sync-btn--disabled';
  const syncBtnDisabled = isOn ? '' : 'disabled';
  const syncBtnOpacity = isOn ? 'opacity:1;' : 'opacity:0.5;';

  return `
    <div class="connector-card animate-fade-in-up" id="connector-${connector.id}">
      <div class="connector-card__header">
        <div class="connector-card__logo">
          <div class="connector-card__icon" style="background:${connector.color}20;color:${connector.color};font-weight:800;font-size:0.9rem;">${connector.icon}</div>
          <div>
            <div class="connector-card__name">${connector.name}</div>
            <div class="connector-card__type">${connector.type}</div>
          </div>
        </div>
        <div class="connector-card__status" id="status-${connector.id}">
          <span class="status-dot ${isOn ? 'status-dot--success' : 'status-dot--danger'}"></span>
          ${isOn ? i18n.t('integrationSettings.connected') : i18n.t('integrationSettings.disconnected')}
        </div>
      </div>
      <div class="connector-card__settings">
        <div class="connector-card__row">
          <span class="connector-card__row-label">${i18n.t('integrationSettings.enabled')}</span>
          <label class="toggle-switch">
            <input type="checkbox" class="connector-toggle" data-id="${connector.id}" ${isOn ? 'checked' : ''} />
            <span class="toggle-switch__slider"></span>
          </label>
        </div>
        <div class="connector-card__row">
          <span class="connector-card__row-label">${i18n.t('integrationSettings.syncDirection')}</span>
          <span class="badge badge--info">${i18n.t('integrationSettings.bidirectional')}</span>
        </div>
      </div>
      <div class="connector-card__footer">
        <span class="connector-card__timestamp">${i18n.t('integrationSettings.lastSync')}: ${connector.lastSync}</span>
        <button class="${syncBtnClass}" data-id="${connector.id}" ${syncBtnDisabled} style="${syncBtnOpacity}transition:all 0.3s ease;">${i18n.t('integrationSettings.syncNow')}</button>
      </div>
    </div>
  `;
}
