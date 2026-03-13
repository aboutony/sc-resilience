// ═══════════════════════════════════════════
// ESGTable – ESG Scoring Data Table
// ─── ISOLATED: No /logic/ imports – pure rendering ───
// ═══════════════════════════════════════════

import { i18n } from '../../i18n.js';
import { formatCompact } from '../../currency.js';

/**
 * Render the ESG Scoring data table.
 * Pure data rendering – no logic module dependencies.
 * @param {Array} suppliers – Full supplier dataset
 * @returns {HTMLElement}
 */
export function renderESGTable(suppliers) {
  const section = document.createElement('div');
  section.className = 'card-panel animate-fade-in-up';
  section.style.cssText = 'animation-delay:0.5s';

  section.innerHTML = `
    <div class="card-panel__header">
      <div>
        <div class="card-panel__title">${i18n.t('supplierSelection.panels.esgScoring')}</div>
        <div class="card-panel__subtitle">${i18n.t('supplierSelection.panels.esgScoringSub')}</div>
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
              <th>Supplier</th>
              <th>${i18n.t('common.quality')}</th>
              <th>${i18n.t('common.cost')}</th>
              <th>${i18n.t('common.delivery')}</th>
              <th>${i18n.t('common.reliability')}</th>
              <th>ESG</th>
              <th>Revenue</th>
              <th>Overall</th>
            </tr>
          </thead>
          <tbody>
            ${suppliers.map(s => `
              <tr>
                <td>
                  <div style="display:flex;align-items:center;gap:var(--space-sm);">
                    <div style="width:28px;height:28px;border-radius:var(--radius-sm);background:${s.color};display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.6rem;font-weight:700;">${s.name.split(' ').map(w => w[0]).slice(0,2).join('')}</div>
                    <span style="font-weight:500;font-size:0.85rem;">${s.name}</span>
                  </div>
                </td>
                <td class="col-financial">${s.quality}%</td>
                <td class="col-financial">${s.cost}%</td>
                <td class="col-financial">${s.delivery}%</td>
                <td class="col-financial">${s.reliability}%</td>
                <td><span class="badge ${s.esg >= 85 ? 'badge--success' : s.esg >= 75 ? 'badge--warning' : 'badge--danger'}">${s.esg}/100</span></td>
                <td class="col-financial financial-amount--large">${formatCompact(s.revenue)}</td>
                <td>
                  <div class="score-circle score-circle--${s.score >= 90 ? 'high' : s.score >= 80 ? 'mid' : 'low'}" style="width:36px;height:36px;font-size:0.7rem;">
                    ${s.score}
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  return section;
}
