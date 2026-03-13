// ═══════════════════════════════════════════
// Logistics Management – "The Pulse of Goods" Chapter 2.2
// Route Optimization, Warehouse Ops, Contingency Planning
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { logisticsData, kpiData } from '../data/mock-data.js';
import { formatCompact } from '../currency.js';

export function renderLogisticsManagementPage() {
  const kpi = kpiData.logisticsMgmt;
  const page = document.createElement('div');
  page.className = 'page-container';

  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">${i18n.t('logisticsMgmt.chapter')}</div>
      <h1 class="page-header__title">${i18n.t('logisticsMgmt.title')}</h1>
      <p class="page-header__description">${i18n.t('logisticsMgmt.description')}</p>
    </div>

    <!-- KPI Row -->
    <div class="kpi-grid animate-fade-in-up" style="animation-delay:0.1s">
      ${renderKpi('🚛', kpi.activeShipments, 'logisticsMgmt.kpi.activeShipments', 'blue')}
      ${renderKpi('✓', kpi.onTimeDelivery, 'logisticsMgmt.kpi.onTimeDelivery', 'green')}
      ${renderKpi('⏱', kpi.avgTransitDays, 'logisticsMgmt.kpi.avgTransitDays', 'orange')}
      ${renderKpi('🌱', kpi.carbonSaved, 'logisticsMgmt.kpi.carbonSaved', 'purple')}
    </div>

    <!-- Route Optimization + Contingency Alerts -->
    <div class="grid-2 animate-fade-in-up" style="animation-delay:0.2s;margin-bottom:var(--space-2xl);">
      <!-- Route Cost Optimization -->
      <div class="card-panel">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('logisticsMgmt.panels.routeOptimization')}</div>
            <div class="card-panel__subtitle">${i18n.t('logisticsMgmt.panels.routeOptimizationSub')}</div>
          </div>
          <span class="badge badge--success">AI ${i18n.t('logisticsMgmt.panels.savings')}: ${formatCompact(logisticsData.routeCosts.aiSavings)}</span>
        </div>
        <div class="card-panel__body">
          <div class="chart-container" id="route-cost-chart"></div>
        </div>
      </div>

      <!-- Contingency Alerts -->
      <div class="card-panel">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('logisticsMgmt.panels.contingency')}</div>
            <div class="card-panel__subtitle">${i18n.t('logisticsMgmt.panels.contingencySub')}</div>
          </div>
        </div>
        <div class="card-panel__body">
          <div class="ai-feed">
            ${logisticsData.contingencyAlerts.map(alert => `
              <div class="ai-feed__item ai-feed__item--${alert.type}">
                <div class="ai-feed__icon">${alert.icon}</div>
                <div class="ai-feed__content">
                  <div class="ai-feed__title">${i18n.getLang() === 'ar' ? alert.titleAr : alert.title}</div>
                  <div class="ai-feed__text">${i18n.getLang() === 'ar' ? alert.textAr : alert.text}</div>
                  <div class="ai-feed__time">${i18n.getLang() === 'ar' ? alert.timeAr : alert.time}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- Inbound Logistics — Narrative Continuity from Phase 1 POs -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.3s;margin-bottom:var(--space-2xl);">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">${i18n.t('logisticsMgmt.panels.inbound')}</div>
          <div class="card-panel__subtitle">${i18n.t('logisticsMgmt.panels.inboundSub')}</div>
        </div>
        <span class="badge badge--info">${logisticsData.inboundShipments.length} ${i18n.t('logisticsMgmt.panels.shipments')}</span>
      </div>
      <div class="card-panel__body">
        <div class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${i18n.t('logisticsMgmt.table.poNumber')}</th>
                <th>${i18n.t('logisticsMgmt.table.supplier')}</th>
                <th>${i18n.t('logisticsMgmt.table.origin')}</th>
                <th>${i18n.t('logisticsMgmt.table.destination')}</th>
                <th>${i18n.t('logisticsMgmt.table.carrier')}</th>
                <th>${i18n.t('logisticsMgmt.table.eta')}</th>
                <th>${i18n.t('logisticsMgmt.table.progress')}</th>
                <th>${i18n.t('logisticsMgmt.table.status')}</th>
              </tr>
            </thead>
            <tbody>
              ${logisticsData.inboundShipments.map(s => `
                <tr>
                  <td><code style="font-family:var(--font-mono);font-size:0.8rem;color:var(--accent-primary);cursor:pointer;" title="Linked from Source-to-Pay Chapter 1">${s.poNumber}</code></td>
                  <td>${s.supplier}</td>
                  <td>${s.origin}</td>
                  <td><span class="badge badge--neutral">${s.destination}</span></td>
                  <td>${s.carrier}</td>
                  <td style="font-family:var(--font-mono);font-size:0.8rem;">${s.eta}</td>
                  <td>
                    <div class="progress-bar" style="width:100px;display:inline-block;vertical-align:middle;">
                      <div class="progress-bar__fill progress-bar__fill--${s.progress === 100 ? 'green' : s.progress > 70 ? 'blue' : 'orange'}" style="width:${s.progress}%"></div>
                    </div>
                    <span style="font-family:var(--font-mono);font-size:0.75rem;margin-inline-start:var(--space-xs);">${s.progress}%</span>
                  </td>
                  <td>${renderShipmentStatus(s.status)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Warehouse Picking Operations — Refinement #3: PO Reference in picking queue -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.4s">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">${i18n.t('logisticsMgmt.panels.warehouseOps')}</div>
          <div class="card-panel__subtitle">${i18n.t('logisticsMgmt.panels.warehouseOpsSub')}</div>
        </div>
      </div>
      <div class="card-panel__body">
        <div class="picking-grid">
          ${logisticsData.pickingQueues.map((wh, idx) => {
            // Narrative context: link picking to inbound POs for this warehouse
            const linkedPOs = logisticsData.inboundShipments
              .filter(s => s.destination.includes(wh.warehouse.split(' ')[0].substring(0, 3).toUpperCase())
                || (wh.warehouse === 'Riyadh Central' && s.destination === 'WH-RUH')
                || (wh.warehouse === 'Jeddah Port' && s.destination === 'WH-JED')
                || (wh.warehouse === 'Dammam Industrial' && s.destination === 'WH-DMM')
              );
            return `
              <div class="picking-card">
                <div class="picking-card__header">
                  <span class="picking-card__name">${i18n.getLang() === 'ar' ? wh.warehouseAr : wh.warehouse}</span>
                  <span class="badge ${wh.utilization > 80 ? 'badge--danger' : wh.utilization > 60 ? 'badge--warning' : 'badge--success'}">${wh.utilization}%</span>
                </div>
                <div class="picking-card__stats">
                  <span style="font-size:0.75rem;color:var(--text-secondary);">${wh.completed}/${wh.totalOrders} ${i18n.t('logisticsMgmt.picking.completed')}</span>
                </div>
                <div class="progress-bar" style="margin-top:var(--space-xs);">
                  <div class="progress-bar__fill progress-bar__fill--${wh.utilization > 80 ? 'orange' : 'blue'}" style="width:${(wh.completed / wh.totalOrders * 100).toFixed(0)}%"></div>
                </div>
                ${linkedPOs.length > 0 ? `
                  <div class="picking-card__po-refs" style="margin-top:var(--space-sm);padding-top:var(--space-sm);border-top:1px solid var(--border-secondary);">
                    <span style="font-size:0.65rem;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.04em;">${i18n.t('logisticsMgmt.picking.inboundPOs')}:</span>
                    <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px;">
                      ${linkedPOs.map(po => `<code style="font-family:var(--font-mono);font-size:0.7rem;color:var(--accent-primary);background:var(--bg-hover);padding:2px 6px;border-radius:4px;">${po.poNumber}</code>`).join('')}
                    </div>
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  // Init Chart
  requestAnimationFrame(() => {
    initRouteCostChart();
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

// ── Shipment Status Badge ──
function renderShipmentStatus(status) {
  const map = {
    'in-transit': { class: 'badge--info', label: '🚛 In Transit' },
    'at-port': { class: 'badge--warning', label: '⚓ At Port' },
    'delivered': { class: 'badge--success', label: '✅ Delivered' },
    'customs': { class: 'badge--neutral', label: '📋 Customs' },
    'delayed': { class: 'badge--danger', label: '⚠️ Delayed' },
  };
  const s = map[status] || map['in-transit'];
  return `<span class="badge ${s.class}">${s.label}</span>`;
}

// ── Chart.js: Route Cost Doughnut ──
function initRouteCostChart() {
  const ctx = document.getElementById('route-cost-chart');
  if (!ctx || typeof Chart === 'undefined') return;

  const canvas = document.createElement('canvas');
  ctx.appendChild(canvas);

  const r = logisticsData.routeCosts;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#e6edf3' : '#1f2937';

  new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: r.labels,
      datasets: [{
        data: r.values,
        backgroundColor: [
          'rgba(26,86,219,0.8)',
          'rgba(0,200,83,0.8)',
          'rgba(245,158,11,0.8)',
          'rgba(139,92,246,0.8)',
          'rgba(6,182,212,0.8)',
        ],
        borderColor: isDark ? '#161b22' : '#ffffff',
        borderWidth: 3,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '62%',
      plugins: {
        legend: { position: 'bottom', labels: { color: textColor, usePointStyle: true, padding: 14, font: { size: 11, family: 'Inter' } } },
        tooltip: {
          backgroundColor: isDark ? '#161b22' : '#fff',
          titleColor: isDark ? '#e6edf3' : '#1f2937',
          bodyColor: isDark ? '#8b949e' : '#57606a',
          borderColor: isDark ? '#30363d' : '#d0d7de',
          borderWidth: 1,
          callbacks: { label: ctx => ` ${ctx.label}: SAR ${(ctx.raw / 1000000).toFixed(1)}M` }
        }
      }
    }
  });
}
