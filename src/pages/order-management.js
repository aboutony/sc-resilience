// ═══════════════════════════════════════════
// Order Management – Chapter 1.3
// Active POs + Smart Approval Workflow
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { formatSAR, formatCompact } from '../currency.js';
import { orderData } from '../data/mock-data.js';

export function renderOrderManagementPage() {
  const d = orderData.kpis;
  const approval = orderData.smartApproval;

  const page = document.createElement('div');
  page.className = 'page-container';
  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">${i18n.t('orderManagement.chapter')}</div>
      <h1 class="page-header__title">${i18n.t('orderManagement.title')}</h1>
      <p class="page-header__description">${i18n.t('orderManagement.description')}</p>
    </div>

    <!-- KPI Grid -->
    <div class="kpi-grid">
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.1s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↑ ${d.activePOs.trend}%</span>
        </div>
        <div class="kpi-card__value financial-amount">${d.activePOs.value}</div>
        <div class="kpi-card__label">${i18n.t('orderManagement.kpi.activePOs')}</div>
      </div>
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.15s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--orange">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↓ ${Math.abs(d.awaitingApproval.trend)}%</span>
        </div>
        <div class="kpi-card__value financial-amount">${d.awaitingApproval.value}</div>
        <div class="kpi-card__label">${i18n.t('orderManagement.kpi.awaitingApproval')}</div>
      </div>
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.2s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↑ ${d.totalPOValue.trend}%</span>
        </div>
        <div class="kpi-card__value financial-amount financial-amount--hero">${formatCompact(d.totalPOValue.value)}</div>
        <div class="kpi-card__label">${i18n.t('orderManagement.kpi.totalPOValue')}</div>
      </div>
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.25s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--purple">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↓ ${Math.abs(d.avgCycleTime.trend)}%</span>
        </div>
        <div class="kpi-card__value financial-amount">${d.avgCycleTime.value}</div>
        <div class="kpi-card__label">${i18n.t('orderManagement.kpi.avgCycleTime')}</div>
      </div>
    </div>

    <!-- Active Purchase Orders Table -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.3s;margin-bottom:var(--space-2xl);">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">${i18n.t('orderManagement.panels.activePOs')}</div>
          <div class="card-panel__subtitle">${i18n.t('orderManagement.panels.activePOsSub')}</div>
        </div>
        <div class="card-panel__actions">
          <button class="btn btn--ghost btn--sm">${i18n.t('common.export')}</button>
        </div>
      </div>
      <div class="card-panel__body">
        <div class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${i18n.t('orderManagement.table.poNumber')}</th>
                <th>${i18n.t('orderManagement.table.supplier')}</th>
                <th>${i18n.t('orderManagement.table.category')}</th>
                <th>${i18n.t('orderManagement.table.items')}</th>
                <th>${i18n.t('orderManagement.table.value')}</th>
                <th>${i18n.t('orderManagement.table.date')}</th>
                <th>${i18n.t('orderManagement.table.status')}</th>
                <th>${i18n.t('orderManagement.table.approver')}</th>
              </tr>
            </thead>
            <tbody>
              ${orderData.purchaseOrders.map(po => `
                <tr>
                  <td><span style="font-family:var(--font-mono);font-weight:600;color:var(--accent-primary);font-size:0.85rem;">${po.poNumber}</span></td>
                  <td style="font-weight:500;font-size:0.85rem;">${i18n.isRTL() ? (po.supplierAr || po.supplier) : po.supplier}</td>
                  <td><span class="badge badge--info">${po.category}</span></td>
                  <td class="col-financial">${po.items}</td>
                  <td class="col-financial financial-amount--large">${formatSAR(po.value)}</td>
                  <td style="font-size:0.8rem;color:var(--text-secondary);">${po.createdDate}</td>
                  <td>${renderStatusBadge(po.status)}</td>
                  <td style="font-size:0.8rem;color:var(--text-secondary);">${po.approver}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Smart Approval Workflow -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.4s">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">${i18n.t('orderManagement.panels.approvalWorkflow')}</div>
          <div class="card-panel__subtitle">${i18n.t('orderManagement.panels.approvalWorkflowSub')}</div>
        </div>
        <div class="card-panel__actions">
          <span class="badge badge--warning" style="font-size:0.75rem;">${i18n.isRTL() ? approval.titleAr : approval.title}</span>
        </div>
      </div>
      <div class="card-panel__body">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-xl);padding:var(--space-md);background:var(--bg-secondary);border-radius:var(--radius-md);">
          <div>
            <span style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.06em;">${i18n.t('orderManagement.approval.requisition')}</span>
            <div style="font-family:var(--font-mono);font-weight:700;color:var(--accent-primary);font-size:1rem;">${approval.requisitionId}</div>
          </div>
          <div style="text-align:end;">
            <span style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.06em;">${i18n.t('orderManagement.kpi.totalPOValue')}</span>
            <div class="financial-amount financial-amount--large" style="font-size:1.1rem;font-weight:800;">${formatSAR(approval.totalValue)}</div>
          </div>
        </div>

        <div class="approval-workflow" style="display:flex;align-items:flex-start;justify-content:space-between;position:relative;padding:var(--space-lg) 0;">
          <!-- Connecting line -->
          <div style="position:absolute;top:28px;left:40px;right:40px;height:3px;background:var(--border-primary);z-index:0;"></div>
          <div style="position:absolute;top:28px;left:40px;height:3px;background:var(--accent-success);z-index:1;width:${getApprovalProgress(approval.steps)}%;transition:width 1s ease;"></div>

          ${approval.steps.map((step, idx) => `
            <div style="display:flex;flex-direction:column;align-items:center;z-index:2;flex:1;max-width:160px;" class="animate-fade-in-up" >
              <div style="
                width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;
                font-weight:700;font-size:0.9rem;border:3px solid;margin-bottom:var(--space-sm);
                transition:all 300ms ease;
                ${step.status === 'completed' ? 'background:var(--accent-success);border-color:var(--accent-success);color:#fff;' :
                  step.status === 'current' ? 'background:var(--surface-card);border-color:var(--accent-primary);color:var(--accent-primary);box-shadow:0 0 0 6px rgba(26,86,219,0.15);animation:pulse-ring 2s infinite;' :
                  'background:var(--bg-secondary);border-color:var(--border-primary);color:var(--text-tertiary);'}
              ">
                ${step.status === 'completed' ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : step.initials}
              </div>
              <div style="text-align:center;">
                <div style="font-size:0.8rem;font-weight:600;color:var(--text-primary);margin-bottom:2px;">${i18n.isRTL() ? step.roleAr : step.role}</div>
                <div style="font-size:0.7rem;color:var(--text-secondary);">${step.name}</div>
                <div style="font-size:0.65rem;color:var(--text-tertiary);margin-top:4px;">
                  ${step.status === 'completed' ? `<span class="badge badge--success" style="font-size:0.6rem;">${i18n.t('orderManagement.approval.completed')}</span>` :
                    step.status === 'current' ? `<span class="badge badge--info" style="font-size:0.6rem;animation:pulse-ring 2s infinite;">${i18n.t('orderManagement.approval.current')}</span>` :
                    `<span class="badge badge--neutral" style="font-size:0.6rem;">${i18n.t('orderManagement.approval.pending')}</span>`}
                </div>
                ${step.timestamp ? `<div style="font-size:0.6rem;color:var(--text-tertiary);margin-top:2px;font-family:var(--font-mono);">${step.timestamp}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <style>
      @keyframes pulse-ring {
        0% { box-shadow: 0 0 0 4px rgba(26,86,219,0.15); }
        50% { box-shadow: 0 0 0 10px rgba(26,86,219,0.05); }
        100% { box-shadow: 0 0 0 4px rgba(26,86,219,0.15); }
      }
    </style>
  `;

  return page;
}

function getApprovalProgress(steps) {
  const completedCount = steps.filter(s => s.status === 'completed').length;
  const currentIdx = steps.findIndex(s => s.status === 'current');
  if (currentIdx >= 0) return ((currentIdx) / (steps.length - 1)) * 100;
  return (completedCount / (steps.length - 1)) * 100;
}

function renderStatusBadge(status) {
  const map = {
    pending: { cls: 'badge--warning', icon: '⏳' },
    approved: { cls: 'badge--info', icon: '✓' },
    shipped: { cls: 'badge--success', icon: '🚚' },
    delivered: { cls: 'badge--success', icon: '✅' },
  };
  const s = map[status] || map.pending;
  return `<span class="badge ${s.cls}">${s.icon} ${status.charAt(0).toUpperCase() + status.slice(1)}</span>`;
}
