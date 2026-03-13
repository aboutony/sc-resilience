// ═══════════════════════════════════════════
// Supplier Management – Chapter 1.6
// Supplier Lifecycle Directory + Scorecard
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { formatSAR, formatCompact } from '../currency.js';
import { suppliers, contractData, supplierMgmtData } from '../data/mock-data.js';

export function renderSupplierMgmtPage() {
  const d = supplierMgmtData.kpis;

  // Cross-reference suppliers with contracts
  const supplierContracts = {};
  contractData.contracts.forEach(c => {
    supplierContracts[c.supplier] = c;
  });

  const page = document.createElement('div');
  page.className = 'page-container';
  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">${i18n.t('supplierMgmt.chapter')}</div>
      <h1 class="page-header__title">${i18n.t('supplierMgmt.title')}</h1>
      <p class="page-header__description">${i18n.t('supplierMgmt.description')}</p>
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
        <div class="kpi-card__value financial-amount">${d.totalSuppliers.value}</div>
        <div class="kpi-card__label">${i18n.t('supplierMgmt.kpi.totalSuppliers')}</div>
      </div>
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.15s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↑ ${d.activeContracts.trend}%</span>
        </div>
        <div class="kpi-card__value financial-amount">${d.activeContracts.value}</div>
        <div class="kpi-card__label">${i18n.t('supplierMgmt.kpi.activeContracts')}</div>
      </div>
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.2s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--orange">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↑ ${d.avgPerformance.trend}%</span>
        </div>
        <div class="kpi-card__value financial-amount">${d.avgPerformance.value}</div>
        <div class="kpi-card__label">${i18n.t('supplierMgmt.kpi.avgPerformance')}</div>
      </div>
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.25s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--purple">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↑ ${d.complianceRate.trend}%</span>
        </div>
        <div class="kpi-card__value financial-amount">${d.complianceRate.value}</div>
        <div class="kpi-card__label">${i18n.t('supplierMgmt.kpi.complianceRate')}</div>
      </div>
    </div>

    <!-- Supplier Directory -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.3s;margin-bottom:var(--space-2xl);">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">${i18n.t('supplierMgmt.panels.directory')}</div>
          <div class="card-panel__subtitle">${i18n.t('supplierMgmt.panels.directorySub')}</div>
        </div>
      </div>
      <div class="card-panel__body">
        <div class="supplier-grid">
          ${suppliers.map(s => {
            const contract = supplierContracts[s.name];
            return `
              <div class="supplier-card">
                <div class="supplier-card__header">
                  <div class="supplier-card__avatar" style="background:${s.color};">
                    ${s.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <div class="supplier-card__name">${s.name}</div>
                    <div class="supplier-card__region">${s.region} · ${s.category}</div>
                  </div>
                  <div style="margin-inline-start:auto;">
                    <div class="score-circle score-circle--${s.score >= 90 ? 'high' : s.score >= 80 ? 'mid' : 'low'}" style="width:44px;height:44px;font-size:0.8rem;">
                      ${s.score}
                    </div>
                  </div>
                </div>
                <div class="supplier-card__metrics">
                  <div>
                    <div class="supplier-card__metric-label">${i18n.t('common.quality')}</div>
                    <div class="supplier-card__metric-value">${s.quality}%</div>
                  </div>
                  <div>
                    <div class="supplier-card__metric-label">${i18n.t('common.delivery')}</div>
                    <div class="supplier-card__metric-value">${s.delivery}%</div>
                  </div>
                  <div>
                    <div class="supplier-card__metric-label">${i18n.t('common.reliability')}</div>
                    <div class="supplier-card__metric-value">${s.reliability}%</div>
                  </div>
                  <div>
                    <div class="supplier-card__metric-label">ESG</div>
                    <div class="supplier-card__metric-value">${s.esg}/100</div>
                  </div>
                </div>
                ${contract ? `
                  <div style="padding:var(--space-xs) var(--space-sm);background:var(--bg-secondary);border-radius:var(--radius-sm);margin-bottom:var(--space-sm);">
                    <div style="display:flex;align-items:center;justify-content:space-between;">
                      <div>
                        <div style="font-size:0.65rem;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.06em;">${i18n.t('supplierMgmt.table.contract')}</div>
                        <div style="font-family:var(--font-mono);font-size:0.75rem;font-weight:600;color:var(--accent-primary);">${contract.id}</div>
                      </div>
                      <div style="text-align:end;">
                        <div style="font-size:0.65rem;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.06em;">${i18n.t('supplierMgmt.table.contractValue')}</div>
                        <div class="financial-amount" style="font-size:0.75rem;font-weight:700;">${formatCompact(contract.value)}</div>
                      </div>
                    </div>
                    <div style="margin-top:var(--space-xs);">
                      <span class="badge ${contract.status === 'active' ? 'badge--success' : contract.status === 'expiring' ? 'badge--warning' : 'badge--info'}" style="font-size:0.6rem;">
                        ${i18n.t('supplierMgmt.contract.' + contract.status)}
                      </span>
                      <span class="badge badge--neutral" style="font-size:0.6rem;">${contract.type}</span>
                    </div>
                  </div>
                ` : `
                  <div style="padding:var(--space-xs) var(--space-sm);background:var(--bg-secondary);border-radius:var(--radius-sm);margin-bottom:var(--space-sm);text-align:center;">
                    <span class="badge badge--neutral" style="font-size:0.65rem;">${i18n.t('supplierMgmt.contract.none')}</span>
                  </div>
                `}
                <div class="supplier-card__tags">
                  ${s.certifications.map(c => `<span class="badge badge--info">${c}</span>`).join('')}
                  <span class="badge ${s.status === 'active' ? 'badge--success' : 'badge--warning'}">${s.status === 'active' ? '● Active' : '◐ Review'}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>

    <!-- Performance Scorecard Table -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.4s">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">${i18n.t('supplierMgmt.panels.scorecard')}</div>
          <div class="card-panel__subtitle">${i18n.t('supplierMgmt.panels.scorecardSub')}</div>
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
                <th>${i18n.t('supplierMgmt.table.supplier')}</th>
                <th>${i18n.t('supplierMgmt.table.region')}</th>
                <th>${i18n.t('supplierMgmt.table.quality')}</th>
                <th>${i18n.t('supplierMgmt.table.delivery')}</th>
                <th>${i18n.t('supplierMgmt.table.reliability')}</th>
                <th>${i18n.t('supplierMgmt.table.esg')}</th>
                <th>${i18n.t('supplierMgmt.table.contractValue')}</th>
                <th>${i18n.t('supplierMgmt.table.overall')}</th>
              </tr>
            </thead>
            <tbody>
              ${suppliers.map(s => {
                const contract = supplierContracts[s.name];
                return `
                  <tr>
                    <td>
                      <div style="display:flex;align-items:center;gap:var(--space-sm);">
                        <div style="width:28px;height:28px;border-radius:var(--radius-sm);background:${s.color};display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.6rem;font-weight:700;">${s.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</div>
                        <span style="font-weight:500;font-size:0.85rem;">${s.name}</span>
                      </div>
                    </td>
                    <td style="font-size:0.8rem;color:var(--text-secondary);">${s.region}</td>
                    <td class="col-financial">${s.quality}%</td>
                    <td class="col-financial">${s.delivery}%</td>
                    <td class="col-financial">${s.reliability}%</td>
                    <td><span class="badge ${s.esg >= 85 ? 'badge--success' : s.esg >= 75 ? 'badge--warning' : 'badge--danger'}">${s.esg}/100</span></td>
                    <td class="col-financial financial-amount--large">${contract ? formatCompact(contract.value) : '—'}</td>
                    <td>
                      <div class="score-circle score-circle--${s.score >= 90 ? 'high' : s.score >= 80 ? 'mid' : 'low'}" style="width:36px;height:36px;font-size:0.7rem;">
                        ${s.score}
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  return page;
}
