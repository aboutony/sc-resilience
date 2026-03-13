// ═══════════════════════════════════════════
// Spend Analysis – "The Oracle" Chapter 4.3
// ─── IRONCLAD BUILD: Savings via Web Worker ───
// Spend Waterfall, Supplier Distribution, Savings
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { spendData, kpiData } from '../data/mock-data.js';
import { formatCompact } from '../currency.js';
import { computeSavingsDelta } from '../logic/savings-bridge.js';

export function renderSpendAnalysisPage() {
  const kpi = kpiData.spendAnalysis;
  const page = document.createElement('div');
  page.className = 'page-container animate-convergence';

  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">${i18n.t('spendAnalysis.chapter')}</div>
      <h1 class="page-header__title">${i18n.t('spendAnalysis.title')}</h1>
      <p class="page-header__description">${i18n.t('spendAnalysis.description')}</p>
    </div>

    <div class="kpi-grid animate-fade-in-up" style="animation-delay:0.1s">
      ${renderKpi('🌐', kpi.networkSpend, 'spendAnalysis.kpi.networkSpend', 'blue', true)}
      ${renderKpi('🎯', kpi.addressableSpend, 'spendAnalysis.kpi.addressableSpend', 'green')}
      ${renderKpi('💰', kpi.savingsIdentified, 'spendAnalysis.kpi.savingsIdentified', 'purple', true)}
      ${renderKpi('✓', kpi.complianceRate, 'spendAnalysis.kpi.complianceRate', 'orange')}
    </div>

    <!-- Spend Waterfall + Supplier Doughnut -->
    <div class="grid-2 animate-fade-in-up" style="animation-delay:0.2s;margin-bottom:var(--space-2xl)">
      <div class="card-panel">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('spendAnalysis.panels.waterfall')}</div>
            <div class="card-panel__subtitle">${i18n.t('spendAnalysis.panels.waterfallSub')}</div>
          </div>
          <span class="badge badge--info">🔗 ${i18n.t('spendAnalysis.panels.crossPhase')}</span>
        </div>
        <div class="card-panel__body"><canvas id="spendWaterfallChart" height="300"></canvas></div>
      </div>

      <div class="card-panel">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('spendAnalysis.panels.supplierDist')}</div>
            <div class="card-panel__subtitle">${i18n.t('spendAnalysis.panels.supplierDistSub')}</div>
          </div>
        </div>
        <div class="card-panel__body"><canvas id="supplierDoughnut" height="300"></canvas></div>
      </div>
    </div>

    <!-- Savings Intelligence -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.3s">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">${i18n.t('spendAnalysis.panels.savings')}</div>
          <div class="card-panel__subtitle">${i18n.t('spendAnalysis.panels.savingsSub')}</div>
        </div>
        <span class="badge badge--success">💰 ${formatCompact(spendData.savingsOpportunities.reduce((a,b) => a+b.savings, 0))}</span>
      </div>
      <div class="card-panel__body">
        <div class="ai-feed">
          ${spendData.savingsOpportunities.map(s => `
            <div class="ai-feed__item ai-feed__item--${s.type}">
              <div class="ai-feed__icon">${s.icon}</div>
              <div class="ai-feed__content">
                <div class="ai-feed__title">${i18n.getLang() === 'ar' ? s.titleAr : s.title}</div>
                <div class="ai-feed__text">${i18n.getLang() === 'ar' ? s.textAr : s.text}</div>
                <div style="font-size:0.7rem;font-weight:700;color:var(--accent-success);margin-top:4px;">↓ ${formatCompact(s.savings)} ${i18n.t('common.potential')}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => { initWaterfallChart(); initSupplierDoughnut(); });

  // ─── IRONCLAD: Offload savings delta to Web Worker ───
  // Runs off the UI thread – if the main thread crashes, worker survives
  computeSavingsDelta({
    waterfall: spendData.waterfall,
    supplierSpend: spendData.supplierSpend,
    savingsOpportunities: spendData.savingsOpportunities,
  }).then((result) => {
    console.info('[SAVINGS-WORKER] ✓ Delta computed off-thread:', {
      totalSavings: result.totalSavings,
      savingsPercent: result.savingsAsPercentOfSpend + '%',
      riskDistribution: result.riskPercentages,
    });
  }).catch((err) => {
    console.warn('[SAVINGS-WORKER] Computation failed (non-blocking):', err.message);
  });

  return page;
}

function initWaterfallChart() {
  const ctx = document.getElementById('spendWaterfallChart');
  if (!ctx || typeof Chart === 'undefined') return;
  const riskColors = { total: 'rgba(59,130,246,0.8)', positive: 'rgba(0,200,83,0.8)', neutral: 'rgba(245,158,11,0.8)', negative: 'rgba(239,68,68,0.8)' };
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: spendData.waterfall.map(w => i18n.getLang() === 'ar' ? w.labelAr : w.label),
      datasets: [{ data: spendData.waterfall.map(w => w.value), backgroundColor: spendData.waterfall.map(w => riskColors[w.type]), borderRadius: 6, borderSkipped: false }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => `SAR ${(ctx.parsed.y / 1000000).toFixed(1)}M` } } },
      scales: {
        y: { grid: { color: 'rgba(128,128,128,0.1)' }, ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-tertiary').trim(), font: { family: 'JetBrains Mono', size: 10 }, callback: v => `${(v / 1000000).toFixed(0)}M` } },
        x: { grid: { display: false }, ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-tertiary').trim(), font: { family: 'Inter', size: 10 } } }
      }
    }
  });
}

function initSupplierDoughnut() {
  const ctx = document.getElementById('supplierDoughnut');
  if (!ctx || typeof Chart === 'undefined') return;
  const riskColorMap = { low: 'rgba(0,200,83,0.8)', medium: 'rgba(245,158,11,0.8)', high: 'rgba(239,68,68,0.8)' };
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: spendData.supplierSpend.map(s => s.supplier),
      datasets: [{ data: spendData.supplierSpend.map(s => s.spend), backgroundColor: spendData.supplierSpend.map(s => riskColorMap[s.risk]), borderWidth: 2, borderColor: getComputedStyle(document.documentElement).getPropertyValue('--surface-card').trim() }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '60%',
      plugins: {
        legend: { position: 'right', labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim(), font: { family: 'Inter', size: 10 }, boxWidth: 12 } },
        tooltip: { callbacks: { label: (ctx) => `${ctx.label}: SAR ${(ctx.parsed / 1000000).toFixed(1)}M (${spendData.supplierSpend[ctx.dataIndex].pct}%)` } }
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
