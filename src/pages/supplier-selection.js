// ═══════════════════════════════════════════
// Supplier Selection Page – AI-Powered Scoring
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { formatSAR, formatCompact } from '../currency.js';
import { kpiData, suppliers } from '../data/mock-data.js';

let radarChart = null;
let costChart = null;

export function renderSupplierSelectionPage() {
  const d = kpiData.supplierSelection;
  const topSuppliers = [...suppliers].sort((a, b) => b.score - a.score).slice(0, 3);

  const page = document.createElement('div');
  page.className = 'page-container';
  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">${i18n.t('supplierSelection.chapter')}</div>
      <h1 class="page-header__title">${i18n.t('supplierSelection.title')}</h1>
      <p class="page-header__description">${i18n.t('supplierSelection.description')}</p>
    </div>

    <!-- KPI Grid -->
    <div class="kpi-grid">
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
    </div>

    <!-- AI Recommendations -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.3s;margin-bottom:var(--space-2xl);">
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
    </div>

    <!-- Charts Row -->
    <div class="grid-2" style="margin-bottom:var(--space-2xl);">
      <!-- Performance Radar -->
      <div class="card-panel animate-fade-in-up" style="animation-delay:0.4s">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('supplierSelection.panels.performanceRadar')}</div>
            <div class="card-panel__subtitle">${i18n.t('supplierSelection.panels.performanceRadarSub')}</div>
          </div>
        </div>
        <div class="card-panel__body">
          <div class="chart-container" id="radar-chart-container">
            <canvas id="radar-chart"></canvas>
          </div>
        </div>
      </div>

      <!-- Cost Optimization Chart -->
      <div class="card-panel animate-fade-in-up" style="animation-delay:0.45s">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('supplierSelection.panels.costAnalysis')}</div>
            <div class="card-panel__subtitle">${i18n.t('supplierSelection.panels.costAnalysisSub')}</div>
          </div>
        </div>
        <div class="card-panel__body">
          <div class="chart-container" id="cost-chart-container">
            <canvas id="cost-chart"></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- All Suppliers Table -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.5s">
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
    </div>
  `;

  requestAnimationFrame(() => {
    setTimeout(() => {
      initRadarChart();
      initCostChart();
    }, 100);
  });

  return page;
}

function initRadarChart() {
  const canvas = document.getElementById('radar-chart');
  if (!canvas || typeof Chart === 'undefined') return;
  if (radarChart) { radarChart.destroy(); radarChart = null; }

  const style = getComputedStyle(document.documentElement);
  const textColor = style.getPropertyValue('--chart-text').trim();
  const gridColor = style.getPropertyValue('--chart-grid').trim();
  const top3 = [...suppliers].sort((a, b) => b.score - a.score).slice(0, 3);

  radarChart = new Chart(canvas.getContext('2d'), {
    type: 'radar',
    data: {
      labels: [i18n.t('common.quality'), i18n.t('common.cost'), i18n.t('common.delivery'), i18n.t('common.reliability'), i18n.t('common.sustainability')],
      datasets: top3.map((s, idx) => ({
        label: s.name,
        data: [s.quality, s.cost, s.delivery, s.reliability, s.esg],
        borderColor: s.color,
        backgroundColor: s.color + '20',
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 7,
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { color: textColor, usePointStyle: true, font: { family: "'Inter', sans-serif", size: 11 } } },
        tooltip: {
          backgroundColor: 'rgba(13,17,23,0.9)', titleColor: '#e6edf3', bodyColor: '#8b949e',
          borderColor: '#30363d', borderWidth: 1, padding: 10, cornerRadius: 8,
        }
      },
      scales: {
        r: {
          beginAtZero: true, max: 100,
          grid: { color: gridColor },
          angleLines: { color: gridColor },
          pointLabels: { color: textColor, font: { family: "'Inter', sans-serif", size: 11 } },
          ticks: { display: false }
        }
      }
    }
  });
}

function initCostChart() {
  const canvas = document.getElementById('cost-chart');
  if (!canvas || typeof Chart === 'undefined') return;
  if (costChart) { costChart.destroy(); costChart = null; }

  const style = getComputedStyle(document.documentElement);
  const textColor = style.getPropertyValue('--chart-text').trim();
  const gridColor = style.getPropertyValue('--chart-grid').trim();

  const sorted = [...suppliers].sort((a, b) => b.revenue - a.revenue).slice(0, 6);

  costChart = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: sorted.map(s => s.name.split(' ').slice(0, 2).join(' ')),
      datasets: [{
        label: 'Revenue (SAR)',
        data: sorted.map(s => s.revenue / 1e6),
        backgroundColor: sorted.map(s => s.color + '80'),
        borderColor: sorted.map(s => s.color),
        borderWidth: 1,
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(13,17,23,0.9)', titleColor: '#e6edf3', bodyColor: '#8b949e',
          callbacks: { label: (ctx) => `SAR ${ctx.raw.toFixed(1)}M` }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: textColor, font: { family: "'Inter', sans-serif", size: 10 } } },
        y: {
          grid: { color: gridColor },
          ticks: { color: textColor, font: { family: "'JetBrains Mono', monospace", size: 11 }, callback: (v) => `${v}M` }
        }
      }
    }
  });
}

window.addEventListener('theme-changed', () => {
  setTimeout(() => { initRadarChart(); initCostChart(); }, 50);
});
