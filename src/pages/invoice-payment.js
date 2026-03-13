// ═══════════════════════════════════════════
// Invoice & Payment – Chapter 1.5
// Three-Way Matching + Payment Queue
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { formatSAR, formatCompact } from '../currency.js';
import { invoiceData } from '../data/mock-data.js';

export function renderInvoicePaymentPage() {
  const d = invoiceData.kpis;
  const twm = invoiceData.threeWayMatch;

  const page = document.createElement('div');
  page.className = 'page-container';
  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">${i18n.t('invoicePayment.chapter')}</div>
      <h1 class="page-header__title">${i18n.t('invoicePayment.title')}</h1>
      <p class="page-header__description">${i18n.t('invoicePayment.description')}</p>
    </div>

    <!-- KPI Grid -->
    <div class="kpi-grid">
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.1s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--orange">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↓ ${Math.abs(d.pendingInvoices.trend)}%</span>
        </div>
        <div class="kpi-card__value financial-amount">${d.pendingInvoices.value}</div>
        <div class="kpi-card__label">${i18n.t('invoicePayment.kpi.pendingInvoices')}</div>
      </div>
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.15s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↑ ${d.matchedInvoices.trend}%</span>
        </div>
        <div class="kpi-card__value financial-amount">${d.matchedInvoices.value}</div>
        <div class="kpi-card__label">${i18n.t('invoicePayment.kpi.matchedInvoices')}</div>
      </div>
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.2s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--down">↑ ${d.totalPayable.trend}%</span>
        </div>
        <div class="kpi-card__value financial-amount financial-amount--hero">${formatCompact(d.totalPayable.value)}</div>
        <div class="kpi-card__label">${i18n.t('invoicePayment.kpi.totalPayable')}</div>
      </div>
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.25s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--purple">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↓ ${Math.abs(d.discrepancies.trend)}%</span>
        </div>
        <div class="kpi-card__value financial-amount">${d.discrepancies.value}</div>
        <div class="kpi-card__label">${i18n.t('invoicePayment.kpi.discrepancies')}</div>
      </div>
    </div>

    <!-- Three-Way Matching -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.3s;margin-bottom:var(--space-2xl);">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">${i18n.t('invoicePayment.panels.threeWayMatch')}</div>
          <div class="card-panel__subtitle">${i18n.t('invoicePayment.panels.threeWayMatchSub')}</div>
        </div>
        <div class="card-panel__actions">
          <span style="font-family:var(--font-mono);font-weight:600;color:var(--accent-primary);font-size:0.85rem;">${twm.poNumber}</span>
          <span style="font-size:0.8rem;color:var(--text-secondary);margin-inline-start:var(--space-sm);">— ${twm.supplier}</span>
        </div>
      </div>
      <div class="card-panel__body">
        <div class="grid-3">
          <!-- PO Column -->
          <div style="background:var(--bg-secondary);border-radius:var(--radius-md);padding:var(--space-md);border:1px solid var(--border-secondary);">
            <div style="display:flex;align-items:center;gap:var(--space-xs);margin-bottom:var(--space-md);">
              <div class="kpi-card__icon kpi-card__icon--blue" style="width:28px;height:28px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/></svg>
              </div>
              <span style="font-weight:600;font-size:0.85rem;color:var(--text-primary);">${i18n.t('invoicePayment.panels.poData')}</span>
            </div>
            ${twm.poData.map(item => `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:var(--space-xs) 0;border-bottom:1px solid var(--border-secondary);">
                <span style="font-size:0.8rem;color:var(--text-primary);">${item.item}</span>
                <div style="display:flex;align-items:center;gap:var(--space-xs);">
                  <span class="financial-amount" style="font-size:0.8rem;font-weight:600;">${formatSAR(item.total)}</span>
                  ${item.match ? '<span style="color:var(--accent-success);font-size:0.7rem;">✓</span>' : '<span style="color:var(--accent-warning);font-size:0.7rem;">⚠</span>'}
                </div>
              </div>
            `).join('')}
            <div style="display:flex;justify-content:space-between;padding-top:var(--space-sm);margin-top:var(--space-xs);">
              <span style="font-size:0.75rem;font-weight:600;color:var(--text-secondary);">${i18n.t('invoicePayment.table.total')}</span>
              <span class="financial-amount financial-amount--large" style="font-size:0.85rem;font-weight:800;">${formatSAR(twm.poData.reduce((s, i) => s + i.total, 0))}</span>
            </div>
          </div>

          <!-- Receipt Column -->
          <div style="background:var(--bg-secondary);border-radius:var(--radius-md);padding:var(--space-md);border:1px solid var(--border-secondary);">
            <div style="display:flex;align-items:center;gap:var(--space-xs);margin-bottom:var(--space-md);">
              <div class="kpi-card__icon kpi-card__icon--green" style="width:28px;height:28px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/></svg>
              </div>
              <span style="font-weight:600;font-size:0.85rem;color:var(--text-primary);">${i18n.t('invoicePayment.panels.receiptData')}</span>
            </div>
            ${twm.receiptData.map(item => `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:var(--space-xs) 0;border-bottom:1px solid var(--border-secondary);">
                <span style="font-size:0.8rem;color:var(--text-primary);">${item.item}</span>
                <div style="display:flex;align-items:center;gap:var(--space-xs);">
                  <span class="financial-amount" style="font-size:0.8rem;font-weight:600;">${formatSAR(item.total)}</span>
                  ${item.match ? '<span style="color:var(--accent-success);font-size:0.7rem;">✓</span>' : '<span style="color:var(--accent-warning);font-size:0.7rem;">⚠</span>'}
                </div>
              </div>
            `).join('')}
            <div style="display:flex;justify-content:space-between;padding-top:var(--space-sm);margin-top:var(--space-xs);">
              <span style="font-size:0.75rem;font-weight:600;color:var(--text-secondary);">${i18n.t('invoicePayment.table.total')}</span>
              <span class="financial-amount financial-amount--large" style="font-size:0.85rem;font-weight:800;">${formatSAR(twm.receiptData.reduce((s, i) => s + i.total, 0))}</span>
            </div>
          </div>

          <!-- Invoice Column -->
          <div style="background:var(--bg-secondary);border-radius:var(--radius-md);padding:var(--space-md);border:1px solid var(--border-secondary);">
            <div style="display:flex;align-items:center;gap:var(--space-xs);margin-bottom:var(--space-md);">
              <div class="kpi-card__icon kpi-card__icon--orange" style="width:28px;height:28px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <span style="font-weight:600;font-size:0.85rem;color:var(--text-primary);">${i18n.t('invoicePayment.panels.invoiceData')}</span>
            </div>
            ${twm.invoiceItems.map(item => `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:var(--space-xs) 0;border-bottom:1px solid var(--border-secondary);">
                <span style="font-size:0.8rem;color:var(--text-primary);">${item.item}</span>
                <div style="display:flex;align-items:center;gap:var(--space-xs);">
                  <span class="financial-amount" style="font-size:0.8rem;font-weight:600;">${formatSAR(item.total)}</span>
                  ${item.match ? '<span style="color:var(--accent-success);font-size:0.7rem;">✓</span>' : '<span style="color:var(--accent-danger);font-size:0.7rem;">✗</span>'}
                </div>
              </div>
            `).join('')}
            <div style="display:flex;justify-content:space-between;padding-top:var(--space-sm);margin-top:var(--space-xs);">
              <span style="font-size:0.75rem;font-weight:600;color:var(--text-secondary);">${i18n.t('invoicePayment.table.total')}</span>
              <span class="financial-amount financial-amount--large" style="font-size:0.85rem;font-weight:800;">${formatSAR(twm.invoiceItems.reduce((s, i) => s + i.total, 0))}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Queue -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.4s">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">${i18n.t('invoicePayment.panels.paymentQueue')}</div>
          <div class="card-panel__subtitle">${i18n.t('invoicePayment.panels.paymentQueueSub')}</div>
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
                <th>${i18n.t('invoicePayment.table.invoiceNo')}</th>
                <th>${i18n.t('invoicePayment.table.supplier')}</th>
                <th>${i18n.t('invoicePayment.table.amount')}</th>
                <th>${i18n.t('invoicePayment.table.dueDate')}</th>
                <th>${i18n.t('invoicePayment.table.matchStatus')}</th>
                <th>${i18n.t('invoicePayment.table.bankSync')}</th>
              </tr>
            </thead>
            <tbody>
              ${invoiceData.paymentQueue.map(inv => `
                <tr>
                  <td><span style="font-family:var(--font-mono);font-weight:600;color:var(--accent-primary);font-size:0.85rem;">${inv.invoiceNo}</span></td>
                  <td style="font-weight:500;font-size:0.85rem;">${i18n.isRTL() ? (inv.supplierAr || inv.supplier) : inv.supplier}</td>
                  <td class="col-financial financial-amount--large" style="font-size:0.95rem;font-weight:800;">${formatSAR(inv.amount)}</td>
                  <td style="font-size:0.8rem;font-family:var(--font-mono);color:var(--text-secondary);">${inv.dueDate}</td>
                  <td>${renderMatchBadge(inv.matchStatus)}</td>
                  <td>
                    <div style="display:flex;align-items:center;gap:var(--space-xs);">
                      ${renderSyncStatus(inv.bankSync)}
                      ${inv.bankSync !== 'synced' ? `<button class="btn btn--ghost btn--sm sync-btn" data-invoice="${inv.invoiceNo}" style="font-size:0.7rem;padding:2px 8px;">${i18n.t('invoicePayment.match.syncNow')}</button>` : ''}
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Toast container -->
    <div id="inv-toast-container" style="position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:var(--space-sm);"></div>
  `;

  // Attach sync button handlers
  requestAnimationFrame(() => {
    page.querySelectorAll('.sync-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const invoiceNo = e.currentTarget.dataset.invoice;
        handleSync(invoiceNo, e.currentTarget);
      });
    });
  });

  return page;
}

function handleSync(invoiceNo, btn) {
  btn.disabled = true;
  btn.textContent = '⟳';
  btn.style.animation = 'spin 1s linear infinite';

  // Simulate sync
  setTimeout(() => {
    btn.style.animation = '';
    btn.textContent = '✓';
    btn.className = 'btn btn--success btn--sm';
    btn.style.fontSize = '0.7rem';
    btn.style.padding = '2px 8px';

    // Update status badge
    const row = btn.closest('tr');
    if (row) {
      const syncCell = row.querySelector('td:last-child');
      const statusSpan = syncCell?.querySelector('.badge');
      if (statusSpan) {
        statusSpan.className = 'badge badge--success';
        statusSpan.innerHTML = '● Synced';
      }
    }

    showInvToast(`${invoiceNo} — Banking sync completed`, true);
  }, 1500);
}

function showInvToast(message, isSuccess) {
  const container = document.getElementById('inv-toast-container');
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
  toast.innerHTML = `${isSuccess ? '🏦' : '❌'} ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 300ms ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function renderMatchBadge(status) {
  const map = {
    matched: { cls: 'badge--success', label: '✓ Matched' },
    partial: { cls: 'badge--warning', label: '⚠ Partial' },
    discrepancy: { cls: 'badge--danger', label: '✗ Discrepancy' },
  };
  const s = map[status] || map.matched;
  return `<span class="badge ${s.cls}">${s.label}</span>`;
}

function renderSyncStatus(status) {
  const map = {
    synced: { cls: 'badge--success', label: '● Synced' },
    pending: { cls: 'badge--warning', label: '○ Pending' },
    failed: { cls: 'badge--danger', label: '✗ Failed' },
  };
  const s = map[status] || map.pending;
  return `<span class="badge ${s.cls}">${s.label}</span>`;
}
