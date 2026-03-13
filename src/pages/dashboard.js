// ═══════════════════════════════════════════
// Dashboard Page – Source to Pay Overview
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { formatSAR, formatCompact } from '../currency.js';
import { kpiData } from '../data/mock-data.js';

export function renderDashboardPage() {
  const d = kpiData.dashboard;

  const page = document.createElement('div');
  page.className = 'page-container';
  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">${i18n.t('dashboard.chapter')}</div>
      <h1 class="page-header__title">${i18n.t('dashboard.title')}</h1>
      <p class="page-header__description">${i18n.t('dashboard.description')}</p>
    </div>

    <!-- KPI Grid -->
    <div class="kpi-grid">
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.1s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↑ ${d.totalSuppliers.trend}%</span>
        </div>
        <div class="kpi-card__value">${d.totalSuppliers.value}</div>
        <div class="kpi-card__label">${i18n.t('dashboard.kpi.totalSuppliers')}</div>
      </div>

      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.2s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↓ ${Math.abs(d.marketRisk.trend)}%</span>
        </div>
        <div class="kpi-card__value">${d.marketRisk.value}</div>
        <div class="kpi-card__label">${i18n.t('dashboard.kpi.marketRisk')}</div>
      </div>

      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.3s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--orange">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↑ ${d.costSavings.trend}%</span>
        </div>
        <div class="kpi-card__value financial-amount financial-amount--hero">${formatCompact(d.costSavings.value)}</div>
        <div class="kpi-card__label">${i18n.t('dashboard.kpi.costSavings')}</div>
      </div>

      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.4s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--purple">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--down">↓ ${Math.abs(d.pendingOrders.trend)}%</span>
        </div>
        <div class="kpi-card__value">${d.pendingOrders.value}</div>
        <div class="kpi-card__label">${i18n.t('dashboard.kpi.pendingOrders')}</div>
      </div>
    </div>

    <!-- Quick Navigation Cards -->
    <div class="grid-2" style="margin-bottom:var(--space-2xl)">
      <div class="card-panel animate-fade-in-up" style="animation-delay:0.5s;cursor:pointer;" id="dash-nav-market-research">
        <div class="card-panel__body" style="padding:var(--space-xl);">
          <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-md);">
            <div class="kpi-card__icon kpi-card__icon--blue" style="width:48px;height:48px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </div>
            <div>
              <h3 style="font-size:1.1rem;font-weight:700;color:var(--text-primary);">${i18n.t('nav.marketResearch')}</h3>
              <p style="font-size:0.8rem;color:var(--text-secondary);">${i18n.t('marketResearch.description')}</p>
            </div>
          </div>
          <div style="display:flex;gap:var(--space-md);">
            <span class="badge badge--info">1,284 ${i18n.t('marketResearch.kpi.suppliersAnalyzed')}</span>
            <span class="badge badge--warning">12 ${i18n.t('marketResearch.kpi.riskAlerts')}</span>
          </div>
        </div>
      </div>

      <div class="card-panel animate-fade-in-up" style="animation-delay:0.6s;cursor:pointer;" id="dash-nav-supplier-selection">
        <div class="card-panel__body" style="padding:var(--space-xl);">
          <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-md);">
            <div class="kpi-card__icon kpi-card__icon--green" style="width:48px;height:48px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <h3 style="font-size:1.1rem;font-weight:700;color:var(--text-primary);">${i18n.t('nav.supplierSelection')}</h3>
              <p style="font-size:0.8rem;color:var(--text-secondary);">${i18n.t('supplierSelection.description')}</p>
            </div>
          </div>
          <div style="display:flex;gap:var(--space-md);">
            <span class="badge badge--success">186 ${i18n.t('supplierSelection.kpi.evaluated')}</span>
            <span class="badge badge--info">92% ESG</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.7s">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">Source to Pay Pipeline</div>
          <div class="card-panel__subtitle">Phase One module readiness</div>
        </div>
      </div>
      <div class="card-panel__body">
        <div style="display:flex;flex-direction:column;gap:var(--space-md);">
          ${renderPipelineItem(i18n.t('nav.marketResearch'), 95, 'green')}
          ${renderPipelineItem(i18n.t('nav.supplierSelection'), 88, 'blue')}
          ${renderPipelineItem(i18n.t('nav.orderManagement'), 45, 'orange')}
          ${renderPipelineItem(i18n.t('nav.receivingQA'), 30, 'orange')}
          ${renderPipelineItem(i18n.t('nav.invoicePayment'), 20, 'orange')}
          ${renderPipelineItem(i18n.t('nav.supplierMgmt'), 35, 'orange')}
        </div>
      </div>
    </div>
  `;

  // Quick nav clicks
  page.querySelector('#dash-nav-market-research')?.addEventListener('click', () => {
    const { router } = require('../router.js') || {};
    window.location.hash = '#/market-research';
  });
  page.querySelector('#dash-nav-supplier-selection')?.addEventListener('click', () => {
    window.location.hash = '#/supplier-selection';
  });

  return page;
}

function renderPipelineItem(label, progress, color) {
  return `
    <div style="display:flex;align-items:center;gap:var(--space-md);">
      <span style="font-size:0.85rem;font-weight:500;color:var(--text-primary);min-width:180px;">${label}</span>
      <div class="progress-bar" style="flex:1;">
        <div class="progress-bar__fill progress-bar__fill--${color}" style="width:${progress}%"></div>
      </div>
      <span class="financial-amount" style="font-size:0.8rem;min-width:40px;text-align:end;">${progress}%</span>
    </div>
  `;
}
