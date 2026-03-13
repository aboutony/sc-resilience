// ═══════════════════════════════════════════
// Supplier Selection Page – AI-Powered Scoring
// ─── FRAGMENTED BUILD: Composed from isolated sub-components ───
// ─── ZERO /logic/ imports in parent – HMR safe ───
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { kpiData, suppliers } from '../data/mock-data.js';

// ─── Isolated sub-components (each imports only its own logic) ───
import { renderComparisonCards } from '../components/supplier-selection/ComparisonCards.js';
import { renderRadarAnalysis } from '../components/supplier-selection/RadarAnalysis.js';
import { renderCostSavingsChart } from '../components/supplier-selection/CostSavingsChart.js';
import { renderESGTable } from '../components/supplier-selection/ESGTable.js';

// ─── DirectCompareModal is NOT imported here ───
// It is lazy-loaded on demand via dynamic import() below.

export function renderSupplierSelectionPage() {
  const d = kpiData.supplierSelection;

  const page = document.createElement('div');
  page.className = 'page-container';

  // ── Page Header with Direct Compare button ──
  const header = document.createElement('div');
  header.className = 'page-header animate-fade-in-up';
  header.innerHTML = `
    <div class="page-header__chapter">${i18n.t('supplierSelection.chapter')}</div>
    <h1 class="page-header__title">${i18n.t('supplierSelection.title')}</h1>
    <p class="page-header__description">${i18n.t('supplierSelection.description')}</p>
    <div style="margin-top:var(--space-md);">
      <button class="btn btn--ghost btn--sm" id="btn-direct-compare" style="display:inline-flex;align-items:center;gap:var(--space-xs);">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M21 3l-7 7"/><path d="M3 3l7 7"/></svg>
        Direct Compare
      </button>
    </div>
  `;
  page.appendChild(header);

  // ── KPI Grid ──
  const kpiGrid = document.createElement('div');
  kpiGrid.className = 'kpi-grid';
  kpiGrid.innerHTML = `
    <div class="kpi-card animate-fade-in-up" style="animation-delay:0.1s">
      <div class="kpi-card__header">
        <div class="kpi-card__icon kpi-card__icon--blue">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
        </div>
        <span class="kpi-card__trend kpi-card__trend--up">↑ ${d.evaluated.trend}%</span>
      </div>
      <div class="kpi-card__value financial-amount">${d.evaluated.value}</div>
      <div class="kpi-card__label">${i18n.t('supplierSelection.kpi.evaluated')}</div>
    </div>
    <div class="kpi-card animate-fade-in-up" style="animation-delay:0.15s">
      <div class="kpi-card__header">
        <div class="kpi-card__icon kpi-card__icon--green">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <span class="kpi-card__trend kpi-card__trend--up">↑ ${d.shortlisted.trend}%</span>
      </div>
      <div class="kpi-card__value financial-amount">${d.shortlisted.value}</div>
      <div class="kpi-card__label">${i18n.t('supplierSelection.kpi.shortlisted')}</div>
    </div>
    <div class="kpi-card animate-fade-in-up" style="animation-delay:0.2s">
      <div class="kpi-card__header">
        <div class="kpi-card__icon kpi-card__icon--orange">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
        <span class="kpi-card__trend kpi-card__trend--up">↑ ${d.avgScore.trend}%</span>
      </div>
      <div class="kpi-card__value financial-amount">${d.avgScore.value}</div>
      <div class="kpi-card__label">${i18n.t('supplierSelection.kpi.avgScore')}</div>
    </div>
    <div class="kpi-card animate-fade-in-up" style="animation-delay:0.25s">
      <div class="kpi-card__header">
        <div class="kpi-card__icon kpi-card__icon--purple">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
        </div>
        <span class="kpi-card__trend kpi-card__trend--up">↑ ${d.esgCompliant.trend}%</span>
      </div>
      <div class="kpi-card__value financial-amount">${d.esgCompliant.value}</div>
      <div class="kpi-card__label">${i18n.t('supplierSelection.kpi.esgCompliant')}</div>
    </div>
  `;
  page.appendChild(kpiGrid);

  // ── AI Recommendations (ComparisonCards sub-component) ──
  page.appendChild(renderComparisonCards(suppliers));

  // ── Charts Row: Radar + Cost (isolated sub-components) ──
  const chartsRow = document.createElement('div');
  chartsRow.className = 'grid-2';
  chartsRow.style.marginBottom = 'var(--space-2xl)';
  chartsRow.appendChild(renderRadarAnalysis(suppliers));
  chartsRow.appendChild(renderCostSavingsChart(suppliers));
  page.appendChild(chartsRow);

  // ── ESG Table (isolated sub-component) ──
  page.appendChild(renderESGTable(suppliers));

  // ── Lazy-Load Direct Compare Modal on click ──
  requestAnimationFrame(() => {
    const compareBtn = document.getElementById('btn-direct-compare');
    if (compareBtn) {
      compareBtn.addEventListener('click', async () => {
        compareBtn.disabled = true;
        compareBtn.textContent = 'Loading…';
        try {
          const { openDirectCompareModal } = await import(
            '../components/supplier-selection/DirectCompareModal.js'
          );
          openDirectCompareModal(suppliers);
        } catch (err) {
          console.warn('[SUPPLIER-SELECTION] Direct Compare lazy-load failed:', err.message);
        } finally {
          compareBtn.disabled = false;
          compareBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M21 3l-7 7"/><path d="M3 3l7 7"/></svg>
            Direct Compare
          `;
        }
      });
    }
  });

  return page;
}
