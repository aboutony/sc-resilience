// ═══════════════════════════════════════════
// Inventory Management – "The Pulse of Goods" Chapter 2.1
// Predictive Analytics, Real-Time Tracking, Waste Reduction
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { inventoryData, kpiData } from '../data/mock-data.js';
import { formatSAR } from '../currency.js';

export function renderInventoryManagementPage() {
  const kpi = kpiData.inventoryMgmt;
  const page = document.createElement('div');
  page.className = 'page-container';

  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">${i18n.t('inventoryMgmt.chapter')}</div>
      <h1 class="page-header__title">${i18n.t('inventoryMgmt.title')}</h1>
      <p class="page-header__description">${i18n.t('inventoryMgmt.description')}</p>
    </div>

    <!-- KPI Row -->
    <div class="kpi-grid animate-fade-in-up" style="animation-delay:0.1s">
      ${renderKpi('📦', kpi.skusTracked, 'inventoryMgmt.kpi.skusTracked', 'blue')}
      ${renderKpi('✓', kpi.stockAccuracy, 'inventoryMgmt.kpi.stockAccuracy', 'green')}
      ${renderKpi('🔄', kpi.reorderRate, 'inventoryMgmt.kpi.reorderRate', 'orange')}
      ${renderKpi('♻️', kpi.wasteReduction, 'inventoryMgmt.kpi.wasteReduction', 'purple')}
    </div>

    <!-- Demand Forecast + Warehouse Heatmap -->
    <div class="grid-2 animate-fade-in-up" style="animation-delay:0.2s;margin-bottom:var(--space-2xl);">
      <div class="card-panel">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('inventoryMgmt.panels.demandForecast')}</div>
            <div class="card-panel__subtitle">${i18n.t('inventoryMgmt.panels.demandForecastSub')}</div>
          </div>
          <span class="badge badge--info">AI</span>
        </div>
        <div class="card-panel__body">
          <div class="chart-container" id="demand-forecast-chart"></div>
        </div>
      </div>

      <!-- Warehouse Heatmap — Refinement #1: Glassmorphic Integrated Finish -->
      <div class="card-panel">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('inventoryMgmt.panels.warehouseHeatmap')}</div>
            <div class="card-panel__subtitle">${i18n.t('inventoryMgmt.panels.warehouseHeatmapSub')}</div>
          </div>
        </div>
        <div class="card-panel__body" id="warehouse-heatmap-container">
          ${renderWarehouseHeatmap()}
        </div>
      </div>
    </div>

    <!-- IoT Live Feed — Refinement: Subtle pulse animations -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.3s;margin-bottom:var(--space-2xl);">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">${i18n.t('inventoryMgmt.panels.iotFeed')}</div>
          <div class="card-panel__subtitle">${i18n.t('inventoryMgmt.panels.iotFeedSub')}</div>
        </div>
        <span class="badge badge--success iot-live-badge">● LIVE</span>
      </div>
      <div class="card-panel__body">
        <div class="iot-signal-grid">
          ${inventoryData.iotSignals.map(s => renderIotCard(s)).join('')}
        </div>
      </div>
    </div>

    <!-- Slow-Moving Stock Table -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.4s">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">${i18n.t('inventoryMgmt.panels.slowMovers')}</div>
          <div class="card-panel__subtitle">${i18n.t('inventoryMgmt.panels.slowMoversSub')}</div>
        </div>
        <span class="badge badge--warning">♻️ ${i18n.t('inventoryMgmt.panels.sustainability')}</span>
      </div>
      <div class="card-panel__body">
        <div class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${i18n.t('inventoryMgmt.table.sku')}</th>
                <th>${i18n.t('inventoryMgmt.table.item')}</th>
                <th>${i18n.t('inventoryMgmt.table.category')}</th>
                <th>${i18n.t('inventoryMgmt.table.daysOnHand')}</th>
                <th>${i18n.t('inventoryMgmt.table.value')}</th>
                <th>${i18n.t('inventoryMgmt.table.warehouse')}</th>
                <th>${i18n.t('inventoryMgmt.table.aiDisposition')}</th>
              </tr>
            </thead>
            <tbody>
              ${inventoryData.slowMovers.map(item => `
                <tr>
                  <td><code style="font-family:var(--font-mono);font-size:0.8rem;color:var(--accent-primary);">${item.sku}</code></td>
                  <td>${item.name}</td>
                  <td><span class="badge badge--neutral">${item.category}</span></td>
                  <td><span style="font-family:var(--font-mono);font-weight:600;color:${item.daysOnHand > 150 ? 'var(--accent-danger)' : item.daysOnHand > 100 ? 'var(--accent-warning)' : 'var(--text-primary)'};">${item.daysOnHand}d</span></td>
                  <td class="col-financial">${formatSAR(item.value)}</td>
                  <td>${item.warehouse}</td>
                  <td><span class="badge badge--info">${item.disposition}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  // Initialize Chart.js after DOM insertion
  requestAnimationFrame(() => {
    initDemandForecastChart();
  });

  return page;
}

// ── KPI Card Helper ──
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

// ── Warehouse Heatmap — Refinement #1: Glassmorphic Integrated Finish ──
function renderWarehouseHeatmap() {
  return inventoryData.warehouses.map(wh => `
    <div class="heatmap-warehouse">
      <div class="heatmap-warehouse__name">${i18n.getLang() === 'ar' ? wh.nameAr : wh.name}</div>
      <div class="heatmap-grid">
        ${wh.zones.map(z => {
          // Sophisticated teal→amber→coral gradient via HSL interpolation
          const hue = z.fill <= 50 ? 170 - (z.fill * 1.4) : 100 - (z.fill * 0.88);
          const sat = 40 + (z.fill * 0.2);
          const lightBg = `hsla(${hue}, ${sat}%, 50%, 0.14)`;
          const lightBorder = `hsla(${hue}, ${sat}%, 50%, 0.25)`;
          return `
            <div class="heatmap-cell" style="background:${lightBg};border-color:${lightBorder};" title="${z.zone}: ${z.category} — ${z.fill}%">
              <span class="heatmap-cell__zone">${z.zone}</span>
              <span class="heatmap-cell__pct">${z.fill}%</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `).join('');
}

// ── IoT Signal Card — with live pulse dot ──
function renderIotCard(signal) {
  const alertClass = signal.alertLevel === 'critical' ? 'danger' : signal.alertLevel === 'warning' ? 'warning' : 'success';
  return `
    <div class="iot-card">
      <div class="iot-card__header">
        <span class="iot-card__name">${i18n.getLang() === 'ar' ? signal.warehouseAr : signal.warehouse}</span>
        <span class="iot-pulse iot-pulse--${alertClass}"></span>
      </div>
      <div class="iot-card__metrics">
        <div class="iot-card__metric">
          <span class="iot-card__metric-icon">🌡️</span>
          <div>
            <div class="iot-card__metric-value">${signal.temp}°C</div>
            <div class="iot-card__metric-label">${i18n.t('inventoryMgmt.iot.temp')}</div>
          </div>
        </div>
        <div class="iot-card__metric">
          <span class="iot-card__metric-icon">💧</span>
          <div>
            <div class="iot-card__metric-value">${signal.humidity}%</div>
            <div class="iot-card__metric-label">${i18n.t('inventoryMgmt.iot.humidity')}</div>
          </div>
        </div>
        <div class="iot-card__metric">
          <span class="iot-card__metric-icon">📡</span>
          <div>
            <div class="iot-card__metric-value" style="font-family:var(--font-mono);">${signal.rfidScans.toLocaleString()}</div>
            <div class="iot-card__metric-label">${i18n.t('inventoryMgmt.iot.rfidScans')}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ── Chart.js: Demand Forecast ──
function initDemandForecastChart() {
  const ctx = document.getElementById('demand-forecast-chart');
  if (!ctx || typeof Chart === 'undefined') return;

  const canvas = document.createElement('canvas');
  ctx.appendChild(canvas);

  const f = inventoryData.forecast;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const gridColor = isDark ? 'rgba(48,54,61,0.5)' : 'rgba(208,215,222,0.5)';
  const textColor = isDark ? '#8b949e' : '#57606a';

  new Chart(canvas, {
    type: 'line',
    data: {
      labels: f.months,
      datasets: [
        {
          label: i18n.t('inventoryMgmt.chart.actual'),
          data: f.actual,
          borderColor: '#1a56db',
          backgroundColor: 'rgba(26,86,219,0.1)',
          borderWidth: 2.5,
          pointRadius: 4,
          pointBackgroundColor: '#1a56db',
          tension: 0.3,
          fill: false,
        },
        {
          label: i18n.t('inventoryMgmt.chart.predicted'),
          data: f.predicted,
          borderColor: '#00C853',
          borderDash: [6, 3],
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: '#00C853',
          tension: 0.3,
          fill: false,
        },
        {
          label: i18n.t('inventoryMgmt.chart.confidence'),
          data: f.upperBand,
          borderColor: 'transparent',
          backgroundColor: 'rgba(0,200,83,0.08)',
          borderWidth: 0,
          pointRadius: 0,
          fill: '+1',
          tension: 0.3,
        },
        {
          label: '',
          data: f.lowerBand,
          borderColor: 'transparent',
          backgroundColor: 'rgba(0,200,83,0.08)',
          borderWidth: 0,
          pointRadius: 0,
          fill: false,
          tension: 0.3,
        },
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: true, labels: { color: textColor, usePointStyle: true, padding: 16, font: { size: 11, family: 'Inter' }, filter: item => item.text !== '' } },
        tooltip: { backgroundColor: isDark ? '#161b22' : '#fff', titleColor: isDark ? '#e6edf3' : '#1f2937', bodyColor: isDark ? '#8b949e' : '#57606a', borderColor: isDark ? '#30363d' : '#d0d7de', borderWidth: 1 }
      },
      scales: {
        x: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11, family: 'Inter' } } },
        y: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11, family: 'Inter' } }, beginAtZero: false }
      }
    }
  });
}
