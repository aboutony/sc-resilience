// ═══════════════════════════════════════════
// Market Research Page – AI-Driven Discovery
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { formatSAR, formatCompact } from '../currency.js';
import { kpiData, marketData, aiInsights, suppliers } from '../data/mock-data.js';

let commodityChart = null;

export function renderMarketResearchPage() {
  const d = kpiData.marketResearch;

  const page = document.createElement('div');
  page.className = 'page-container';
  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">${i18n.t('marketResearch.chapter')}</div>
      <h1 class="page-header__title">${i18n.t('marketResearch.title')}</h1>
      <p class="page-header__description">${i18n.t('marketResearch.description')}</p>
    </div>

    <!-- KPI Grid -->
    <div class="kpi-grid">
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.1s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↑ ${d.suppliersAnalyzed.trend}%</span>
        </div>
        <div class="kpi-card__value financial-amount">${d.suppliersAnalyzed.value.toLocaleString()}</div>
        <div class="kpi-card__label">${i18n.t('marketResearch.kpi.suppliersAnalyzed')}</div>
      </div>
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.15s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↑ ${d.marketsMonitored.trend}%</span>
        </div>
        <div class="kpi-card__value financial-amount">${d.marketsMonitored.value}</div>
        <div class="kpi-card__label">${i18n.t('marketResearch.kpi.marketsMonitored')}</div>
      </div>
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.2s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--orange">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↓ ${Math.abs(d.riskAlerts.trend)}</span>
        </div>
        <div class="kpi-card__value financial-amount">${d.riskAlerts.value}</div>
        <div class="kpi-card__label">${i18n.t('marketResearch.kpi.riskAlerts')}</div>
      </div>
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.25s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--purple">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <span class="kpi-card__trend kpi-card__trend--up">↑ ${d.newDiscoveries.trend}%</span>
        </div>
        <div class="kpi-card__value financial-amount">${d.newDiscoveries.value}</div>
        <div class="kpi-card__label">${i18n.t('marketResearch.kpi.newDiscoveries')}</div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid-2-1" style="margin-bottom:var(--space-2xl);">
      <!-- Commodity Price Trends Chart -->
      <div class="card-panel animate-fade-in-up" style="animation-delay:0.3s">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('marketResearch.panels.commodityTrends')}</div>
            <div class="card-panel__subtitle">${i18n.t('marketResearch.panels.commodityTrendsSub')}</div>
          </div>
          <div class="card-panel__actions">
            <button class="btn btn--ghost btn--sm">${i18n.t('common.export')}</button>
          </div>
        </div>
        <div class="card-panel__body">
          <div class="chart-container" id="commodity-chart-container">
            <canvas id="commodity-chart"></canvas>
          </div>
        </div>
      </div>

      <!-- AI Insights Feed -->
      <div class="card-panel animate-fade-in-up" style="animation-delay:0.35s">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('marketResearch.panels.aiInsights')}</div>
            <div class="card-panel__subtitle">${i18n.t('marketResearch.panels.aiInsightsSub')}</div>
          </div>
        </div>
        <div class="card-panel__body">
          <div class="ai-feed" id="ai-insights-feed">
            ${aiInsights.map((item, idx) => `
              <div class="ai-feed__item ai-feed__item--${item.type}" style="animation-delay:${0.1 * idx}s">
                <div class="ai-feed__icon">${item.icon}</div>
                <div class="ai-feed__content">
                  <div class="ai-feed__title">${item.title}</div>
                  <div class="ai-feed__text">${item.text}</div>
                  <div class="ai-feed__time">${item.time}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- Risk Assessment Matrix -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.4s;margin-bottom:var(--space-2xl);">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">${i18n.t('marketResearch.panels.riskMatrix')}</div>
          <div class="card-panel__subtitle">${i18n.t('marketResearch.panels.riskMatrixSub')}</div>
        </div>
        <div class="card-panel__actions">
          <button class="btn btn--ghost btn--sm">${i18n.t('common.filter')}</button>
        </div>
      </div>
      <div class="card-panel__body">
        <div class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${i18n.t('common.category')}</th>
                <th>Saudi Arabia</th>
                <th>GCC</th>
                <th>Asia Pacific</th>
                <th>Europe</th>
                <th>Americas</th>
              </tr>
            </thead>
            <tbody>
              ${marketData.riskMatrix.map(row => `
                <tr>
                  <td style="font-weight:600;">${row.category}</td>
                  <td>${riskBadge(row.saudiArabia)}</td>
                  <td>${riskBadge(row.gcc)}</td>
                  <td>${riskBadge(row.asia)}</td>
                  <td>${riskBadge(row.europe)}</td>
                  <td>${riskBadge(row.americas)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Supplier Discovery Table -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.45s">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">${i18n.t('marketResearch.panels.supplierDiscovery')}</div>
          <div class="card-panel__subtitle">${i18n.t('marketResearch.panels.supplierDiscoverySub')}</div>
        </div>
        <div class="card-panel__actions">
          <button class="btn btn--ghost btn--sm">${i18n.t('common.filter')}</button>
          <button class="btn btn--primary btn--sm">${i18n.t('common.viewAll')}</button>
        </div>
      </div>
      <div class="card-panel__body">
        <div class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Supplier</th>
                <th>${i18n.t('common.region')}</th>
                <th>${i18n.t('common.category')}</th>
                <th>${i18n.t('common.score')}</th>
                <th>Revenue</th>
                <th>${i18n.t('common.status')}</th>
              </tr>
            </thead>
            <tbody>
              ${suppliers.slice(0, 6).map(s => `
                <tr>
                  <td><span class="financial-amount" style="font-size:0.8rem;">${s.id}</span></td>
                  <td>
                    <div style="display:flex;align-items:center;gap:var(--space-sm);">
                      <div style="width:32px;height:32px;border-radius:var(--radius-sm);background:${s.color};display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.7rem;font-weight:700;">${s.name.split(' ').map(w => w[0]).slice(0,2).join('')}</div>
                      <span style="font-weight:500;">${s.name}</span>
                    </div>
                  </td>
                  <td>${s.region}</td>
                  <td><span class="badge badge--neutral">${s.category}</span></td>
                  <td>
                    <div class="score-circle score-circle--${s.score >= 90 ? 'high' : s.score >= 80 ? 'mid' : 'low'}" style="width:40px;height:40px;font-size:0.75rem;">
                      ${s.score}
                    </div>
                  </td>
                  <td class="col-financial">${formatCompact(s.revenue)}</td>
                  <td><span class="badge ${s.status === 'active' ? 'badge--success' : 'badge--warning'}">${s.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  // Initialize chart after DOM insertion
  requestAnimationFrame(() => {
    setTimeout(() => initCommodityChart(), 100);
  });

  return page;
}

function riskBadge(level) {
  const colors = { high: 'danger', medium: 'warning', low: 'success' };
  const labels = { high: i18n.t('common.high'), medium: i18n.t('common.medium'), low: i18n.t('common.low') };
  return `<span class="badge badge--${colors[level]}"><span class="status-dot status-dot--${colors[level]}"></span> ${labels[level]}</span>`;
}

function initCommodityChart() {
  const canvas = document.getElementById('commodity-chart');
  if (!canvas || typeof Chart === 'undefined') return;

  if (commodityChart) {
    commodityChart.destroy();
    commodityChart = null;
  }

  const ctx = canvas.getContext('2d');
  const style = getComputedStyle(document.documentElement);
  const gridColor = style.getPropertyValue('--chart-grid').trim();
  const textColor = style.getPropertyValue('--chart-text').trim();

  const colors = ['#1a56db', '#00C853', '#f59e0b', '#ef4444'];

  commodityChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: marketData.months,
      datasets: marketData.commodities.map((c, idx) => ({
        label: c.name,
        data: c.prices,
        borderColor: colors[idx],
        backgroundColor: colors[idx] + '15',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 6,
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: {
          position: 'top',
          labels: { color: textColor, usePointStyle: true, padding: 20, font: { family: "'Inter', sans-serif", size: 12 } }
        },
        tooltip: {
          backgroundColor: 'rgba(13,17,23,0.9)',
          titleColor: '#e6edf3',
          bodyColor: '#8b949e',
          borderColor: '#30363d',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: { family: "'Inter', sans-serif", weight: '600' },
          bodyFont: { family: "'JetBrains Mono', monospace" },
        }
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: { color: textColor, font: { family: "'Inter', sans-serif", size: 11 } }
        },
        y: {
          grid: { color: gridColor },
          ticks: { color: textColor, font: { family: "'JetBrains Mono', monospace", size: 11 } }
        }
      }
    }
  });
}

// Re-init chart on theme change to pick up new colors
window.addEventListener('theme-changed', () => {
  setTimeout(() => initCommodityChart(), 50);
});
