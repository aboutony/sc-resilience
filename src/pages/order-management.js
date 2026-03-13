// ═══════════════════════════════════════════════════════
// Order Management – Chapter 1.3 (Decompressed)
// Active POs + Smart Approval Workflow
// ─── Sub-components loaded from /components/order-management/ ───
// ═══════════════════════════════════════════════════════

import { i18n } from '../i18n.js';
import { formatCompact } from '../currency.js';
import { orderData } from '../data/mock-data.js';

// ─── Extracted Sub-Components ───
import { renderOrderTable } from '../components/order-management/OrderTable.js';
import { renderApprovalWorkflow } from '../components/order-management/ApprovalWorkflow.js';

export function renderOrderManagementPage() {
  const d = orderData.kpis;

  const page = document.createElement('div');
  page.className = 'page-container';

  // ─── Page Header ───
  const header = document.createElement('div');
  header.className = 'page-header animate-fade-in-up';
  header.innerHTML = `
    <div class="page-header__chapter">${i18n.t('orderManagement.chapter')}</div>
    <h1 class="page-header__title">${i18n.t('orderManagement.title')}</h1>
    <p class="page-header__description">${i18n.t('orderManagement.description')}</p>
  `;
  page.appendChild(header);

  // ─── KPI Grid (lightweight – stays inline) ───
  const kpiGrid = document.createElement('div');
  kpiGrid.className = 'kpi-grid';
  kpiGrid.innerHTML = `
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
  `;
  page.appendChild(kpiGrid);

  // ─── Active Purchase Orders Table (extracted) ───
  const orderTable = renderOrderTable(orderData.purchaseOrders);
  page.appendChild(orderTable);

  // ─── Smart Approval Workflow + Vision 2030 Badge (extracted) ───
  const approvalPanel = renderApprovalWorkflow(orderData.smartApproval);
  page.appendChild(approvalPanel);

  return page;
}
