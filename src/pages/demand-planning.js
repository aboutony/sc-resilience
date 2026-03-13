// ═══════════════════════════════════════════
// Demand Planning – "The Oracle" Chapter 4.1
// Advanced Forecasting, Scenario Planning
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { demandData, kpiData } from '../data/mock-data.js';

export function renderDemandPlanningPage() {
  const kpi = kpiData.demandPlanning;
  const page = document.createElement('div');
  page.className = 'page-container animate-convergence';

  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">${i18n.t('demandPlanning.chapter')}</div>
      <h1 class="page-header__title">${i18n.t('demandPlanning.title')}</h1>
      <p class="page-header__description">${i18n.t('demandPlanning.description')}</p>
    </div>

    <div class="kpi-grid animate-fade-in-up" style="animation-delay:0.1s">
      ${renderKpi('🔮', kpi.forecastAccuracy, 'demandPlanning.kpi.forecastAccuracy', 'green')}
      ${renderKpi('📅', kpi.planningHorizon, 'demandPlanning.kpi.planningHorizon', 'blue')}
      ${renderKpi('⚡', kpi.autoTriggers, 'demandPlanning.kpi.autoTriggers', 'purple')}
      ${renderKpi('📊', kpi.demandVolatility, 'demandPlanning.kpi.demandVolatility', 'orange')}
    </div>

    <!-- Forecast Chart -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.2s;margin-bottom:var(--space-2xl)">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">${i18n.t('demandPlanning.panels.forecast')}</div>
          <div class="card-panel__subtitle">${i18n.t('demandPlanning.panels.forecastSub')}</div>
        </div>
        <span class="badge badge--info">18 ${i18n.t('common.months')}</span>
      </div>
      <div class="card-panel__body"><canvas id="demandForecastChart" height="280"></canvas></div>
    </div>

    <!-- Scenario Planner + Replenishment -->
    <div class="grid-2 animate-fade-in-up" style="animation-delay:0.3s;margin-bottom:var(--space-2xl)">
      <div class="card-panel">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('demandPlanning.panels.scenario')}</div>
            <div class="card-panel__subtitle">${i18n.t('demandPlanning.panels.scenarioSub')}</div>
          </div>
        </div>
        <div class="card-panel__body">
          <div class="scenario-cards">
            ${demandData.scenarios.map(s => `
              <div class="scenario-card" style="border-left:3px solid ${s.color}">
                <div class="scenario-card__title">${i18n.getLang() === 'ar' ? s.labelAr : s.label}</div>
                <div class="scenario-card__metrics">
                  <div class="scenario-card__metric">
                    <span class="scenario-card__val" style="color:${s.color}">${s.growth > 0 ? '+' : ''}${s.growth}%</span>
                    <span class="scenario-card__label">${i18n.t('demandPlanning.scenario.growth')}</span>
                  </div>
                  <div class="scenario-card__metric">
                    <span class="scenario-card__val">${(s.revenue / 1000000).toFixed(0)}M</span>
                    <span class="scenario-card__label">${i18n.t('demandPlanning.scenario.revenue')}</span>
                  </div>
                  <div class="scenario-card__metric">
                    <span class="scenario-card__val">${s.triggers}</span>
                    <span class="scenario-card__label">${i18n.t('demandPlanning.scenario.triggers')}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="card-panel">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('demandPlanning.panels.replenishment')}</div>
            <div class="card-panel__subtitle">${i18n.t('demandPlanning.panels.replenishmentSub')}</div>
          </div>
        </div>
        <div class="card-panel__body">
          ${demandData.replenishment.map(r => {
            const pct = Math.min(100, (r.currentStock / r.reorderPoint) * 100);
            const isBelowReorder = r.currentStock < r.reorderPoint;
            return `
              <div class="replen-item ${isBelowReorder ? 'replen-item--alert' : ''}">
                <div class="replen-item__header">
                  <code style="font-family:var(--font-mono);font-size:0.75rem;color:var(--accent-primary);">${r.sku}</code>
                  <span class="badge ${r.autoTrigger ? 'badge--success' : 'badge--neutral'}">${r.autoTrigger ? '⚡ Auto' : '⏸ Manual'}</span>
                </div>
                <div style="font-size:0.8rem;font-weight:600;color:var(--text-primary);margin:2px 0;">${i18n.getLang() === 'ar' ? r.itemAr : r.item}</div>
                <div class="progress-bar" style="margin:var(--space-xs) 0;">
                  <div class="progress-bar__fill progress-bar__fill--${isBelowReorder ? 'orange' : 'green'}" style="width:${pct}%"></div>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:0.65rem;color:var(--text-tertiary);">
                  <span>${i18n.t('demandPlanning.replen.stock')}: ${r.currentStock.toLocaleString()} / ${r.reorderPoint.toLocaleString()}</span>
                  <span>${i18n.t('demandPlanning.replen.lead')}: ${r.leadDays}d</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => initDemandChart());
  return page;
}

function initDemandChart() {
  const ctx = document.getElementById('demandForecastChart');
  if (!ctx || typeof Chart === 'undefined') return;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: demandData.forecast.labels,
      datasets: [
        { label: i18n.t('demandPlanning.chart.actual'), data: demandData.forecast.actual, borderColor: 'rgb(0,200,83)', backgroundColor: 'rgba(0,200,83,0.1)', borderWidth: 2.5, pointRadius: 4, tension: 0.3, fill: false },
        { label: i18n.t('demandPlanning.chart.predicted'), data: demandData.forecast.predicted, borderColor: 'rgb(59,130,246)', backgroundColor: 'rgba(59,130,246,0.1)', borderWidth: 2, borderDash: [6,3], pointRadius: 3, tension: 0.3, fill: false },
        { label: i18n.t('demandPlanning.chart.upperBand'), data: demandData.forecast.upperBand, borderColor: 'rgba(59,130,246,0.3)', backgroundColor: 'rgba(59,130,246,0.05)', borderWidth: 1, pointRadius: 0, tension: 0.3, fill: '+1' },
        { label: i18n.t('demandPlanning.chart.lowerBand'), data: demandData.forecast.lowerBand, borderColor: 'rgba(59,130,246,0.3)', borderWidth: 1, pointRadius: 0, tension: 0.3, fill: false },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top', labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim(), font: { family: 'Inter', size: 11 } } } },
      scales: {
        y: { grid: { color: 'rgba(128,128,128,0.1)' }, ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-tertiary').trim(), font: { family: 'JetBrains Mono', size: 10 } } },
        x: { grid: { display: false }, ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-tertiary').trim(), font: { family: 'Inter', size: 10 } } }
      }
    }
  });
}

function renderKpi(icon, data, labelKey, colorClass) {
  const trendIcon = data.trendDir === 'up' ? '↑' : '↓';
  const trendClass = data.trendDir === 'up' ? 'kpi-card__trend--up' : 'kpi-card__trend--down';
  return `<div class="kpi-card"><div class="kpi-card__header"><div class="kpi-card__icon kpi-card__icon--${colorClass}">${icon}</div><div class="kpi-card__trend ${trendClass}">${trendIcon} ${Math.abs(data.trend)}%</div></div><div class="kpi-card__value">${data.value}</div><div class="kpi-card__label">${i18n.t(labelKey)}</div></div>`;
}
