// ═══════════════════════════════════════════════════════
// OrderTable – Active Purchase Orders Table (Ch 1.3)
// Extracted from monolithic order-management.js
// ═══════════════════════════════════════════════════════

import { i18n } from '../../i18n.js';
import { formatSAR } from '../../currency.js';

// ─── Status Badge Renderer ───
function renderStatusBadge(status) {
  const map = {
    pending:   { cls: 'badge--warning', icon: '⏳' },
    approved:  { cls: 'badge--info', icon: '✓' },
    shipped:   { cls: 'badge--success', icon: '🚚' },
    delivered: { cls: 'badge--success', icon: '✅' },
  };
  const s = map[status] || map.pending;
  return `<span class="badge ${s.cls}">${s.icon} ${status.charAt(0).toUpperCase() + status.slice(1)}</span>`;
}

/**
 * Renders the Active Purchase Orders table panel.
 * @param {Array} purchaseOrders – array of PO objects from mock-data
 * @returns {HTMLElement}
 */
export function renderOrderTable(purchaseOrders) {
  const panel = document.createElement('div');
  panel.className = 'card-panel animate-fade-in-up';
  panel.style.cssText = 'animation-delay:0.3s;margin-bottom:var(--space-2xl);';

  panel.innerHTML = `
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
            ${purchaseOrders.map(po => `
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
  `;

  return panel;
}
