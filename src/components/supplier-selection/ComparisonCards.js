// ═══════════════════════════════════════════
// ComparisonCards – Top AI Recommendations
// ─── ISOLATED: Imports only direct-compare.js ───
// ═══════════════════════════════════════════

import { i18n } from '../../i18n.js';
import { getTopSuppliers } from '../../logic/direct-compare.js';

/**
 * Render the top AI-recommended supplier comparison cards.
 * @param {Array} suppliers – Full supplier dataset
 * @returns {HTMLElement}
 */
export function renderComparisonCards(suppliers) {
  const topSuppliers = getTopSuppliers(suppliers, 3);

  const section = document.createElement('div');
  section.className = 'card-panel animate-fade-in-up';
  section.style.cssText = 'animation-delay:0.3s;margin-bottom:var(--space-2xl);';

  section.innerHTML = `
    <div class="card-panel__header">
      <div>
        <div class="card-panel__title">${i18n.t('supplierSelection.panels.topRecommendations')}</div>
        <div class="card-panel__subtitle">${i18n.t('supplierSelection.panels.topRecommendationsSub')}</div>
      </div>
    </div>
    <div class="card-panel__body">
      <div class="supplier-grid">
        ${topSuppliers.map((s, idx) => `
          <div class="supplier-card" id="supplier-card-${s.id}">
            <div class="supplier-card__header">
              <div class="supplier-card__avatar" style="background:${s.color};">
                ${s.name.split(' ').map(w => w[0]).slice(0,2).join('')}
              </div>
              <div>
                <div class="supplier-card__name">${s.name}</div>
                <div class="supplier-card__region">${s.region} · ${s.category}</div>
              </div>
              <div style="margin-inline-start:auto;">
                <div class="score-circle score-circle--${s.score >= 90 ? 'high' : 'mid'}">
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
                <div class="supplier-card__metric-label">${i18n.t('common.cost')}</div>
                <div class="supplier-card__metric-value">${s.cost}%</div>
              </div>
              <div>
                <div class="supplier-card__metric-label">${i18n.t('common.delivery')}</div>
                <div class="supplier-card__metric-value">${s.delivery}%</div>
              </div>
              <div>
                <div class="supplier-card__metric-label">${i18n.t('common.reliability')}</div>
                <div class="supplier-card__metric-value">${s.reliability}%</div>
              </div>
            </div>
            <div style="margin-bottom:var(--space-sm);">
              <div class="supplier-card__metric-label" style="margin-bottom:4px;">${i18n.t('common.sustainability')}</div>
              <div class="progress-bar">
                <div class="progress-bar__fill progress-bar__fill--green" style="width:${s.esg}%"></div>
              </div>
              <div style="display:flex;justify-content:space-between;margin-top:4px;">
                <span style="font-size:0.7rem;color:var(--text-tertiary);">ESG Score</span>
                <span class="financial-amount" style="font-size:0.75rem;">${s.esg}/100</span>
              </div>
            </div>
            <div class="supplier-card__tags">
              ${s.certifications.map(c => `<span class="badge badge--info">${c}</span>`).join('')}
            </div>
            <div style="margin-top:var(--space-md);display:flex;gap:var(--space-xs);">
              <span class="badge badge--success" style="font-size:0.7rem;">AI Confidence: ${98 - idx * 3}%</span>
              <span class="badge badge--neutral" style="font-size:0.7rem;">Rank #${idx + 1}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  return section;
}
