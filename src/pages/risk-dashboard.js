// ═══════════════════════════════════════════
// Risk Dashboard – "The Shield of Governance" Chapter 3.2
// ─── IRONCLAD BUILD: What-If logic isolated to /logic ───
// What-If Simulator, Sovereign Risk Map, Contingency
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { riskData, kpiData } from '../data/mock-data.js';
import { formatCompact } from '../currency.js';
import { initWhatIfSimulator } from '../logic/whatif-simulator.js';

export function renderRiskDashboardPage() {
  const kpi = kpiData.riskDashboard;
  const page = document.createElement('div');
  page.className = 'page-container';

  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">${i18n.t('riskDashboard.chapter')}</div>
      <h1 class="page-header__title">${i18n.t('riskDashboard.title')}</h1>
      <p class="page-header__description">${i18n.t('riskDashboard.description')}</p>
    </div>

    <!-- KPI Row -->
    <div class="kpi-grid animate-fade-in-up" style="animation-delay:0.1s">
      ${renderKpi('🛡️', kpi.threatScore, 'riskDashboard.kpi.threatScore', 'blue')}
      ${renderKpi('⚠️', kpi.predictedRisks, 'riskDashboard.kpi.predictedRisks', 'orange')}
      ${renderKpi('✓', kpi.mitigated, 'riskDashboard.kpi.mitigated', 'green')}
      ${renderKpi('⚡', kpi.responseTime, 'riskDashboard.kpi.responseTime', 'purple')}
    </div>

    <!-- Sovereign Risk Map + What-If Simulator -->
    <div class="grid-2 animate-fade-in-up" style="animation-delay:0.2s;margin-bottom:var(--space-2xl);">
      <!-- Risk Map -->
      <div class="card-panel">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('riskDashboard.panels.riskMap')}</div>
            <div class="card-panel__subtitle">${i18n.t('riskDashboard.panels.riskMapSub')}</div>
          </div>
          <span class="badge badge--info">${riskData.riskMarkers.length} ${i18n.t('riskDashboard.panels.regions')}</span>
        </div>
        <div class="card-panel__body">
          <div class="risk-map-container" id="risk-map">
            ${renderRiskMap()}
          </div>
        </div>
      </div>

      <!-- What-If Simulator — CENTERPIECE -->
      <div class="card-panel whatif-panel">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('riskDashboard.panels.whatIf')}</div>
            <div class="card-panel__subtitle">${i18n.t('riskDashboard.panels.whatIfSub')}</div>
          </div>
          <span class="badge badge--warning">⚡ ${i18n.t('riskDashboard.panels.interactive')}</span>
        </div>
        <div class="card-panel__body">
          <!-- Variables -->
          <div class="whatif-sliders" id="whatif-sliders">
            ${riskData.whatIfVariables.map(v => `
              <div class="whatif-slider" data-var-id="${v.id}">
                <div class="whatif-slider__header">
                  <span class="whatif-slider__label">${i18n.getLang() === 'ar' ? v.labelAr : v.label}</span>
                  <span class="whatif-slider__value" id="val-${v.id}">${v.default}</span>
                </div>
                <input type="range" class="whatif-range" id="range-${v.id}" min="${v.min}" max="${v.max}" step="${v.step}" value="${v.default}" />
                <div class="whatif-slider__scale">
                  <span>${v.min}</span>
                  <span style="color:var(--accent-danger);font-weight:600;">${v.max}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Impact Meters -->
          <div class="whatif-impact" id="whatif-impact">
            <div class="whatif-impact__title">${i18n.t('riskDashboard.whatIf.impact')}</div>
            <div class="whatif-impact__grid">
              <div class="whatif-meter" id="meter-totalRevenue">
                <span class="whatif-meter__label">${i18n.t('riskDashboard.whatIf.revenue')}</span>
                <span class="whatif-meter__value whatif-meter__value--stable">${formatCompact(riskData.whatIfBaseline.totalRevenue)}</span>
              </div>
              <div class="whatif-meter" id="meter-supplyChainCost">
                <span class="whatif-meter__label">${i18n.t('riskDashboard.whatIf.cost')}</span>
                <span class="whatif-meter__value whatif-meter__value--stable">${formatCompact(riskData.whatIfBaseline.supplyChainCost)}</span>
              </div>
              <div class="whatif-meter" id="meter-deliveryOnTime">
                <span class="whatif-meter__label">${i18n.t('riskDashboard.whatIf.delivery')}</span>
                <span class="whatif-meter__value whatif-meter__value--stable">${riskData.whatIfBaseline.deliveryOnTime}%</span>
              </div>
              <div class="whatif-meter" id="meter-supplierScore">
                <span class="whatif-meter__label">${i18n.t('riskDashboard.whatIf.supplierScore')}</span>
                <span class="whatif-meter__value whatif-meter__value--stable">${riskData.whatIfBaseline.supplierScore}</span>
              </div>
              <div class="whatif-meter" id="meter-riskExposure">
                <span class="whatif-meter__label">${i18n.t('riskDashboard.whatIf.riskExposure')}</span>
                <span class="whatif-meter__value whatif-meter__value--stable">${formatCompact(riskData.whatIfBaseline.riskExposure)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contingency Plans -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.3s">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">${i18n.t('riskDashboard.panels.contingency')}</div>
          <div class="card-panel__subtitle">${i18n.t('riskDashboard.panels.contingencySub')}</div>
        </div>
      </div>
      <div class="card-panel__body">
        <div class="contingency-grid">
          ${riskData.contingencyPlans.map(cp => `
            <div class="contingency-card contingency-card--${cp.status}">
              <div class="contingency-card__header">
                <span class="contingency-card__id">${cp.id}</span>
                <span class="badge ${cp.status === 'armed' ? 'badge--success' : 'badge--neutral'}">${cp.status === 'armed' ? '🟢 Armed' : '⏸ Standby'}</span>
              </div>
              <div class="contingency-card__trigger">
                <span style="font-size:0.65rem;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.04em;">${i18n.t('riskDashboard.contingency.trigger')}</span>
                <span style="font-size:0.8rem;font-weight:600;color:var(--text-primary);">${i18n.getLang() === 'ar' ? cp.triggerAr : cp.trigger}</span>
              </div>
              <div class="contingency-card__action" style="margin-top:var(--space-xs);font-size:0.75rem;color:var(--text-secondary);">
                ${i18n.getLang() === 'ar' ? cp.actionAr : cp.action}
              </div>
              <div style="margin-top:var(--space-sm);font-size:0.7rem;color:var(--accent-success);font-weight:600;">
                ${i18n.t('riskDashboard.contingency.savings')}: ${formatCompact(cp.savingsEstimate)}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // ── Initialize What-If interactivity via isolated logic module ──
  requestAnimationFrame(() => {
    initWhatIfSimulator(riskData.whatIfBaseline, riskData.whatIfVariables);
  });

  return page;
}

// ── KPI Helper ──
function renderKpi(icon, data, labelKey, colorClass) {
  const trendIcon = data.trendDir === 'up' ? '↑' : '↓';
  const trendClass = data.trendDir === 'up' ? 'kpi-card__trend--up' : 'kpi-card__trend--down';
  return `
    <div class="kpi-card">
      <div class="kpi-card__header">
        <div class="kpi-card__icon kpi-card__icon--${colorClass}">${icon}</div>
        <div class="kpi-card__trend ${trendClass}">${trendIcon} ${Math.abs(data.trend)}%</div>
      </div>
      <div class="kpi-card__value">${data.value}</div>
      <div class="kpi-card__label">${i18n.t(labelKey)}</div>
    </div>
  `;
}

// ── Sovereign Risk Map (SVG) ──
function renderRiskMap() {
  return `
    <div class="risk-map">
      <div class="risk-map__legend">
        <span class="risk-map__legend-item"><span class="risk-dot risk-dot--low"></span> ${i18n.t('common.low')}</span>
        <span class="risk-map__legend-item"><span class="risk-dot risk-dot--medium"></span> ${i18n.t('common.medium')}</span>
        <span class="risk-map__legend-item"><span class="risk-dot risk-dot--high"></span> ${i18n.t('common.high')}</span>
      </div>
      <div class="risk-map__markers">
        ${riskData.riskMarkers.map(m => `
          <div class="risk-marker risk-marker--${m.risk}" title="${m.region}: ${m.desc}">
            <span class="risk-marker__dot"></span>
            <span class="risk-marker__label">${i18n.getLang() === 'ar' ? m.regionAr : m.region}</span>
            <span class="risk-marker__threats">${m.threats} ${i18n.t('riskDashboard.map.threats')}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
