// ═══════════════════════════════════════════
// Cost Engineering – "The Oracle" Chapter 4.2
// Predictive Cost Models, Category Intelligence
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { costData, kpiData } from '../data/mock-data.js';
import { formatCompact } from '../currency.js';

export function renderCostEngineeringPage() {
  const kpi = kpiData.costEngineering;
  const page = document.createElement('div');
  page.className = 'page-container animate-convergence';

  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">${i18n.t('costEngineering.chapter')}</div>
      <h1 class="page-header__title">${i18n.t('costEngineering.title')}</h1>
      <p class="page-header__description">${i18n.t('costEngineering.description')}</p>
    </div>

    <div class="kpi-grid animate-fade-in-up" style="animation-delay:0.1s">
      ${renderKpi('💰', kpi.totalSpendYTD, 'costEngineering.kpi.totalSpendYTD', 'blue', true)}
      ${renderKpi('🛡️', kpi.costAvoidance, 'costEngineering.kpi.costAvoidance', 'green', true)}
      ${renderKpi('📦', kpi.categoryCount, 'costEngineering.kpi.categoryCount', 'purple')}
      ${renderKpi('🔍', kpi.spendLeakage, 'costEngineering.kpi.spendLeakage', 'orange')}
    </div>

    <!-- Commodity Forecast Chart -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.2s;margin-bottom:var(--space-2xl)">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">${i18n.t('costEngineering.panels.commodity')}</div>
          <div class="card-panel__subtitle">${i18n.t('costEngineering.panels.commoditySub')}</div>
        </div>
      </div>
      <div class="card-panel__body"><canvas id="commodityChart" height="280"></canvas></div>
    </div>

    <!-- Category Matrix + Leakage Detection -->
    <div class="grid-2 animate-fade-in-up" style="animation-delay:0.3s;margin-bottom:var(--space-2xl)">
      <div class="card-panel">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('costEngineering.panels.category')}</div>
            <div class="card-panel__subtitle">${i18n.t('costEngineering.panels.categorySub')}</div>
          </div>
        </div>
        <div class="card-panel__body">
          <div class="category-matrix">
            ${costData.categoryMatrix.map(c => {
              const riskColor = c.risk === 'high' ? 'var(--accent-danger)' : c.risk === 'medium' ? 'var(--accent-warning)' : 'var(--accent-success)';
              return `
                <div class="category-cell">
                  <div class="category-cell__header">
                    <span class="category-cell__name">${i18n.getLang() === 'ar' ? c.categoryAr : c.category}</span>
                    <span class="risk-dot" style="background:${riskColor};width:8px;height:8px;border-radius:50%;display:inline-block;"></span>
                  </div>
                  <div class="category-cell__spend">${formatCompact(c.spend)}</div>
                  <div class="category-cell__meta">
                    <span>${c.suppliers} ${i18n.t('common.suppliers')}</span>
                    <span style="color:var(--accent-success);">↓ ${formatCompact(c.savings)}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <div class="card-panel">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('costEngineering.panels.leakage')}</div>
            <div class="card-panel__subtitle">${i18n.t('costEngineering.panels.leakageSub')}</div>
          </div>
          <span class="badge badge--danger">⚠️ ${costData.leakages.length} ${i18n.t('costEngineering.panels.detected')}</span>
        </div>
        <div class="card-panel__body">
          <div class="leakage-list">
            ${costData.leakages.map(lk => `
              <div class="leakage-card">
                <div class="leakage-card__header">
                  <code style="font-family:var(--font-mono);font-size:0.75rem;color:var(--accent-danger);">${lk.id}</code>
                  <span class="badge badge--danger">${formatCompact(lk.amount)}</span>
                </div>
                <div style="font-size:0.75rem;font-weight:600;color:var(--text-primary);margin:4px 0;">${lk.category}</div>
                <div style="font-size:0.7rem;color:var(--text-secondary);margin-bottom:var(--space-xs);">${i18n.getLang() === 'ar' ? lk.causeAr : lk.cause}</div>
                <div style="font-size:0.7rem;color:var(--accent-success);font-weight:600;">💡 ${i18n.getLang() === 'ar' ? lk.opportunityAr : lk.opportunity}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => initCommodityChart());
  return page;
}

function initCommodityChart() {
  const ctx = document.getElementById('commodityChart');
  if (!ctx || typeof Chart === 'undefined') return;
  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-tertiary').trim();
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: costData.commodityForecast.labels,
      datasets: [
        { label: i18n.t('costEngineering.chart.steel'), data: costData.commodityForecast.steel, borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.1)', borderWidth: 2.5, pointRadius: 4, tension: 0.3, fill: true },
        { label: i18n.t('costEngineering.chart.chemicals'), data: costData.commodityForecast.chemicals, borderColor: '#8b5cf6', backgroundColor: 'rgba(139,92,246,0.1)', borderWidth: 2.5, pointRadius: 4, tension: 0.3, fill: true },
        { label: i18n.t('costEngineering.chart.polymers'), data: costData.commodityForecast.polymers, borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.1)', borderWidth: 2.5, pointRadius: 4, tension: 0.3, fill: true },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top', labels: { color: textColor, font: { family: 'Inter', size: 11 } } },
        tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: SAR ${ctx.parsed.y.toLocaleString()}/ton` } } },
      scales: {
        y: { grid: { color: 'rgba(128,128,128,0.1)' }, ticks: { color: textColor, font: { family: 'JetBrains Mono', size: 10 }, callback: v => `${v}` } },
        x: { grid: { display: false }, ticks: { color: textColor, font: { family: 'Inter', size: 10 } } }
      }
    }
  });
}

function renderKpi(icon, data, labelKey, colorClass, isCurrency = false) {
  const trendIcon = data.trendDir === 'up' ? '↑' : '↓';
  const trendClass = data.trendDir === 'up' ? 'kpi-card__trend--up' : 'kpi-card__trend--down';
  const displayVal = isCurrency ? formatCompact(data.value) : data.value;
  return `<div class="kpi-card"><div class="kpi-card__header"><div class="kpi-card__icon kpi-card__icon--${colorClass}">${icon}</div><div class="kpi-card__trend ${trendClass}">${trendIcon} ${Math.abs(data.trend)}%</div></div><div class="kpi-card__value">${displayVal}</div><div class="kpi-card__label">${i18n.t(labelKey)}</div></div>`;
}
