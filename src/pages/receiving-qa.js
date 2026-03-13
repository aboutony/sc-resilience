// ═══════════════════════════════════════════
// Receiving & QA – Chapter 1.4
// Quality Gauge + Inspection Dashboard
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { receivingData } from '../data/mock-data.js';

export function renderReceivingQAPage() {
  const d = receivingData.kpis;

  const page = document.createElement('div');
  page.className = 'page-container';
  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">${i18n.t('receivingQA.chapter')}</div>
      <h1 class="page-header__title">${i18n.t('receivingQA.title')}</h1>
      <p class="page-header__description">${i18n.t('receivingQA.description')}</p>
    </div>

    <!-- KPI Grid -->
    <div class="kpi-grid">
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.1s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↑ ${d.shipmentsReceived.trend}%</span>
        </div>
        <div class="kpi-card__value financial-amount">${d.shipmentsReceived.value}</div>
        <div class="kpi-card__label">${i18n.t('receivingQA.kpi.shipmentsReceived')}</div>
      </div>
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.15s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↑ ${d.qualityPassRate.trend}%</span>
        </div>
        <div class="kpi-card__value financial-amount">${d.qualityPassRate.value}</div>
        <div class="kpi-card__label">${i18n.t('receivingQA.kpi.qualityPassRate')}</div>
      </div>
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.2s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--orange">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↓ ${Math.abs(d.pendingInspections.trend)}%</span>
        </div>
        <div class="kpi-card__value financial-amount">${d.pendingInspections.value}</div>
        <div class="kpi-card__label">${i18n.t('receivingQA.kpi.pendingInspections')}</div>
      </div>
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.25s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--purple">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↓ ${Math.abs(d.rejectionRate.trend)}%</span>
        </div>
        <div class="kpi-card__value financial-amount">${d.rejectionRate.value}</div>
        <div class="kpi-card__label">${i18n.t('receivingQA.kpi.rejectionRate')}</div>
      </div>
    </div>

    <!-- Quality Gauge + Inbound Shipments Row -->
    <div class="grid-2-1" style="margin-bottom:var(--space-2xl);">
      <!-- Inbound Shipments -->
      <div class="card-panel animate-fade-in-up" style="animation-delay:0.3s">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('receivingQA.panels.inbound')}</div>
            <div class="card-panel__subtitle">${i18n.t('receivingQA.panels.inboundSub')}</div>
          </div>
        </div>
        <div class="card-panel__body">
          <div class="data-table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${i18n.t('receivingQA.table.poNumber')}</th>
                  <th>${i18n.t('receivingQA.table.supplier')}</th>
                  <th>${i18n.t('receivingQA.table.carrier')}</th>
                  <th>${i18n.t('receivingQA.table.items')}</th>
                  <th>${i18n.t('receivingQA.table.eta')}</th>
                  <th>${i18n.t('receivingQA.table.status')}</th>
                </tr>
              </thead>
              <tbody>
                ${receivingData.inboundShipments.map(s => `
                  <tr>
                    <td><span style="font-family:var(--font-mono);font-weight:600;color:var(--accent-primary);font-size:0.85rem;">${s.poNumber}</span></td>
                    <td style="font-weight:500;font-size:0.85rem;">${i18n.isRTL() ? (s.supplierAr || s.supplier) : s.supplier}</td>
                    <td style="font-size:0.8rem;color:var(--text-secondary);">${s.carrier}</td>
                    <td class="col-financial">${s.items}</td>
                    <td style="font-size:0.8rem;font-family:var(--font-mono);color:var(--text-secondary);">${s.eta}</td>
                    <td>${renderShipmentStatus(s.status)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Quality Gauge -->
      <div class="card-panel animate-fade-in-up" style="animation-delay:0.35s">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('receivingQA.panels.qualityGauge')}</div>
            <div class="card-panel__subtitle">${i18n.t('receivingQA.panels.qualityGaugeSub')}</div>
          </div>
        </div>
        <div class="card-panel__body" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:240px;">
          <div class="quality-gauge" style="position:relative;width:180px;height:100px;overflow:hidden;">
            <svg viewBox="0 0 200 110" style="width:100%;height:100%;">
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--border-primary)" stroke-width="14" stroke-linecap="round"/>
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#gaugeGradient)" stroke-width="14" stroke-linecap="round"
                    stroke-dasharray="${receivingData.qualityPassRate * 2.51} 251" style="transition:stroke-dasharray 1.5s ease;"/>
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="var(--accent-warning)"/>
                  <stop offset="50%" stop-color="var(--accent-success)"/>
                  <stop offset="100%" stop-color="#00E676"/>
                </linearGradient>
              </defs>
            </svg>
            <div style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);text-align:center;">
              <div style="font-family:var(--font-mono);font-size:2.2rem;font-weight:800;color:var(--accent-success);line-height:1;">${receivingData.qualityPassRate}%</div>
              <div style="font-size:0.7rem;color:var(--text-tertiary);margin-top:2px;">${i18n.t('receivingQA.kpi.qualityPassRate')}</div>
            </div>
          </div>
          <div style="display:flex;gap:var(--space-lg);margin-top:var(--space-xl);">
            <div style="text-align:center;">
              <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--accent-success);">142</div>
              <div style="font-size:0.65rem;color:var(--text-tertiary);">${i18n.t('receivingQA.inspection.passed')}</div>
            </div>
            <div style="width:1px;background:var(--border-primary);"></div>
            <div style="text-align:center;">
              <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--accent-danger);">5</div>
              <div style="font-size:0.65rem;color:var(--text-tertiary);">${i18n.t('receivingQA.inspection.failed')}</div>
            </div>
            <div style="width:1px;background:var(--border-primary);"></div>
            <div style="text-align:center;">
              <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700;color:var(--accent-warning);">8</div>
              <div style="font-size:0.65rem;color:var(--text-tertiary);">${i18n.t('receivingQA.inspection.pending')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Digital Verification Queue -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.4s">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">${i18n.t('receivingQA.panels.inspection')}</div>
          <div class="card-panel__subtitle">${i18n.t('receivingQA.panels.inspectionSub')}</div>
        </div>
      </div>
      <div class="card-panel__body">
        <div class="supplier-grid" id="inspection-queue">
          ${receivingData.inspectionQueue.map(item => `
            <div class="supplier-card" id="insp-card-${item.id}" style="border-color:${item.result === 'pass' ? 'var(--accent-success)' : item.result === 'fail' ? 'var(--accent-danger)' : 'var(--border-primary)'};">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-md);">
                <span style="font-family:var(--font-mono);font-weight:600;color:var(--accent-primary);font-size:0.85rem;">${item.poNumber}</span>
                <span class="badge ${item.result === 'pass' ? 'badge--success' : item.result === 'fail' ? 'badge--danger' : 'badge--warning'}" id="insp-badge-${item.id}">
                  ${item.result === 'pass' ? '✓ ' + i18n.t('receivingQA.inspection.passed') : item.result === 'fail' ? '✗ ' + i18n.t('receivingQA.inspection.failed') : '⏳ ' + i18n.t('receivingQA.inspection.pending')}
                </span>
              </div>
              <div style="font-weight:600;font-size:0.9rem;color:var(--text-primary);margin-bottom:var(--space-xs);">${i18n.isRTL() ? item.itemAr : item.item}</div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-xs);margin-bottom:var(--space-md);">
                <div>
                  <div style="font-size:0.65rem;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.06em;">${i18n.t('receivingQA.inspection.lot')}</div>
                  <div style="font-family:var(--font-mono);font-size:0.8rem;font-weight:600;color:var(--text-primary);">${item.lot}</div>
                </div>
                <div>
                  <div style="font-size:0.65rem;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.06em;">${i18n.t('receivingQA.inspection.qty')}</div>
                  <div style="font-family:var(--font-mono);font-size:0.8rem;font-weight:600;color:var(--text-primary);">${item.qty.toLocaleString()}</div>
                </div>
              </div>
              <div style="font-size:0.7rem;color:var(--text-secondary);padding:var(--space-xs) var(--space-sm);background:var(--bg-secondary);border-radius:var(--radius-sm);margin-bottom:var(--space-md);">
                <span style="font-size:0.6rem;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.06em;">${i18n.t('receivingQA.inspection.criteria')}: </span>${item.criteria}
              </div>
              ${item.result === null ? `
                <div style="display:flex;gap:var(--space-sm);">
                  <button class="btn btn--success btn--sm" style="flex:1;" data-action="approve" data-id="${item.id}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    ${i18n.t('receivingQA.inspection.approve')}
                  </button>
                  <button class="btn btn--ghost btn--sm" style="flex:1;border-color:var(--accent-danger);color:var(--accent-danger);" data-action="reject" data-id="${item.id}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    ${i18n.t('receivingQA.inspection.reject')}
                  </button>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Toast container -->
    <div id="qa-toast-container" style="position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:var(--space-sm);"></div>
  `;

  // Attach interactive handlers
  requestAnimationFrame(() => {
    page.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.currentTarget.dataset.action;
        const id = e.currentTarget.dataset.id;
        handleVerification(id, action, page);
      });
    });
  });

  return page;
}

function handleVerification(id, action, page) {
  const card = page.querySelector(`#insp-card-${id}`);
  const badge = page.querySelector(`#insp-badge-${id}`);
  if (!card || !badge) return;

  const isApprove = action === 'approve';

  // Update badge
  badge.className = `badge ${isApprove ? 'badge--success' : 'badge--danger'}`;
  badge.innerHTML = isApprove ? `✓ ${i18n.t('receivingQA.inspection.passed')}` : `✗ ${i18n.t('receivingQA.inspection.failed')}`;

  // Update card border with transition
  card.style.transition = 'all 300ms ease';
  card.style.borderColor = isApprove ? 'var(--accent-success)' : 'var(--accent-danger)';

  // Remove buttons
  const btnGroup = card.querySelector('[data-action]')?.parentElement;
  if (btnGroup) {
    btnGroup.style.transition = 'all 300ms ease';
    btnGroup.style.opacity = '0';
    btnGroup.style.transform = 'translateY(8px)';
    setTimeout(() => btnGroup.remove(), 300);
  }

  // Show toast
  showToast(isApprove ? i18n.t('receivingQA.toast.approved') : i18n.t('receivingQA.toast.rejected'), isApprove);
}

function showToast(message, isSuccess) {
  const container = document.getElementById('qa-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.style.cssText = `
    padding:var(--space-sm) var(--space-lg);
    background:${isSuccess ? 'var(--accent-success)' : 'var(--accent-danger)'};
    color:#fff;
    border-radius:var(--radius-md);
    font-size:0.85rem;
    font-weight:600;
    box-shadow:var(--shadow-lg);
    display:flex;
    align-items:center;
    gap:var(--space-sm);
    animation:fadeInUp 0.3s ease;
    min-width:280px;
  `;
  toast.innerHTML = `${isSuccess ? '✅' : '❌'} ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 300ms ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function renderShipmentStatus(status) {
  const map = {
    'in-transit': { cls: 'badge--info', label: '🚚 In Transit' },
    'at-port': { cls: 'badge--warning', label: '⚓ At Port' },
    'customs': { cls: 'badge--warning', label: '📋 Customs' },
    'arrived': { cls: 'badge--success', label: '📦 Arrived' },
    'received': { cls: 'badge--success', label: '✅ Received' },
  };
  const s = map[status] || map['in-transit'];
  return `<span class="badge ${s.cls}">${s.label}</span>`;
}
