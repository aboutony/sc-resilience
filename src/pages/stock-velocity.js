// ═══════════════════════════════════════════
// Stock Velocity & Throughput — Friction Engine
// Predictive Friction Detection · Throughput Stagnation
// ═══════════════════════════════════════════

import { inventoryData } from '../data/mock-data.js';
import { Registry } from '../infra/Registry.js';

export function renderStockVelocityPage() {
  const warehouses = inventoryData.warehouses || [];

  // Derive velocity metrics from zone fill data
  const allZones = warehouses.flatMap(wh =>
    wh.zones.map(z => ({ ...z, warehouse: wh.name, whId: wh.id, city: wh.city }))
  );

  const frictionZones = allZones.filter(z => z.fill >= 80);
  const avgFill = Math.round(allZones.reduce((s, z) => s + z.fill, 0) / allZones.length);
  const criticalCount = allZones.filter(z => z.fill >= 90).length;
  const optimalCount = allZones.filter(z => z.fill < 60).length;

  function fillColor(fill) {
    if (fill >= 85) return 'var(--accent-danger)';
    if (fill >= 60) return 'var(--accent-warning)';
    return 'var(--accent-success)';
  }

  const page = document.createElement('div');
  page.className = 'page-container';
  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">Chapter 2.2 — Velocity Analytics</div>
      <h1 class="page-header__title">Stock Velocity & Throughput</h1>
      <p class="page-header__description">Predictive friction detection and throughput stagnation monitoring across all warehouses and zones.</p>
    </div>

    <!-- Velocity KPIs -->
    <div class="kpi-grid" style="margin-bottom:var(--space-2xl);">
      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.1s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <span class="badge badge--info">Throughput</span>
        </div>
        <div class="kpi-card__value">${avgFill}%</div>
        <div class="kpi-card__label">Avg Zone Utilization</div>
      </div>

      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.2s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--orange">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <span class="badge badge--danger">Critical</span>
        </div>
        <div class="kpi-card__value">${criticalCount}</div>
        <div class="kpi-card__label">Zones ≥90% (Stagnation Risk)</div>
      </div>

      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.3s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <span class="badge badge--success">Optimal</span>
        </div>
        <div class="kpi-card__value">${optimalCount}</div>
        <div class="kpi-card__label">Zones &lt;60% (Free Flow)</div>
      </div>

      <div class="kpi-card animate-fade-in-up" style="animation-delay:0.4s">
        <div class="kpi-card__header">
          <div class="kpi-card__icon kpi-card__icon--purple">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
          </div>
          <span class="badge badge--warning">Monitored</span>
        </div>
        <div class="kpi-card__value">${allZones.length}</div>
        <div class="kpi-card__label">Total Zones Tracked</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:var(--space-xl);margin-bottom:var(--space-2xl);">
      <!-- Velocity Index Chart -->
      <div class="card-panel animate-fade-in-up" style="animation-delay:0.5s;">
        <div class="card-panel__header">
          <div class="card-panel__title">Velocity Index by Zone</div>
          <span class="badge badge--info">${allZones.length} Zones</span>
        </div>
        <div class="card-panel__body">
          <div style="display:flex;align-items:flex-end;justify-content:space-around;gap:4px;height:200px;padding-bottom:var(--space-md);border-bottom:1px solid var(--border-primary);">
            ${allZones.map(z => `
              <div style="display:flex;flex-direction:column;align-items:center;flex:1;height:100%;justify-content:flex-end;">
                <div style="font-family:var(--font-mono);font-size:0.6rem;font-weight:700;color:${fillColor(z.fill)};margin-bottom:4px;">${z.fill}%</div>
                <div style="width:100%;max-width:28px;background:${fillColor(z.fill)};opacity:0.8;border-radius:4px 4px 0 0;height:${z.fill}%;transition:all 0.5s ease;"></div>
                <div style="font-size:0.5rem;color:var(--text-tertiary);margin-top:6px;writing-mode:vertical-lr;transform:rotate(180deg);white-space:nowrap;">${z.warehouse.split(' ')[0]} ${z.zone}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Friction Alerts -->
      <div class="card-panel animate-fade-in-up" style="animation-delay:0.6s;">
        <div class="card-panel__header">
          <div class="card-panel__title" style="color:var(--accent-danger);">Friction Alerts</div>
          <span class="badge badge--danger">${frictionZones.length} Active</span>
        </div>
        <div class="card-panel__body" style="display:flex;flex-direction:column;gap:var(--space-md);">
          ${frictionZones.length > 0 ? frictionZones.map(z => `
            <div style="display:flex;align-items:center;gap:var(--space-md);padding:var(--space-md);background:rgba(248,81,73,0.05);border:1px solid rgba(248,81,73,0.15);border-left:4px solid var(--accent-danger);border-radius:8px;">
              <div style="width:8px;height:8px;border-radius:50%;background:var(--accent-danger);box-shadow:0 0 8px rgba(248,81,73,0.5);animation:pulse 2s infinite;"></div>
              <div>
                <div style="font-weight:700;font-size:0.75rem;color:var(--text-primary);text-transform:uppercase;">${z.whId} · ${z.zone}</div>
                <div style="font-size:0.7rem;color:var(--text-secondary);">Stagnation Risk: <span style="font-family:var(--font-mono);font-weight:bold;color:var(--accent-danger);">${z.fill}%</span> capacity — ${z.category}</div>
              </div>
            </div>
          `).join('') : '<p style="font-size:0.8rem;color:var(--text-tertiary);font-style:italic;">Velocity nominal. No friction detected.</p>'}
        </div>
      </div>
    </div>

    <!-- Slow Movers Table -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.7s;">
      <div class="card-panel__header">
        <div class="card-panel__title">Slow-Moving Inventory — AI Disposition Recommendations</div>
      </div>
      <div class="card-panel__body">
        <table class="data-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Item</th>
              <th>Category</th>
              <th>Days on Hand</th>
              <th>Value (SAR)</th>
              <th>Warehouse</th>
              <th>AI Disposition</th>
            </tr>
          </thead>
          <tbody>
            ${(inventoryData.slowMovers || []).map(item => `
              <tr>
                <td style="font-family:var(--font-mono);font-weight:600;font-size:0.75rem;">${item.sku}</td>
                <td>${item.name}</td>
                <td><span class="badge badge--info">${item.category}</span></td>
                <td style="font-family:var(--font-mono);font-weight:700;color:${item.daysOnHand >= 150 ? 'var(--accent-danger)' : 'var(--accent-warning)'};">${item.daysOnHand}</td>
                <td style="font-family:var(--font-mono);font-weight:700;">${item.value.toLocaleString()}</td>
                <td>${item.warehouse}</td>
                <td><span class="badge badge--${item.disposition.includes('Scrap') ? 'danger' : item.disposition.includes('Liquidate') ? 'warning' : 'success'}">${item.disposition}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  Registry.add({ id: 'stock-velocity-logic', destroy: () => {} });

  return page;
}
