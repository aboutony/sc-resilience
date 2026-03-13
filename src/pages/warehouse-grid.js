// ═══════════════════════════════════════════
// Warehouse Grid – Operational Pulse
// Zone Utilization · IoT Telemetry · Made-in-KSA
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { inventoryData } from '../data/mock-data.js';
import { Registry } from '../infra/Registry.js';

export function renderWarehouseGridPage() {
  const warehouses = inventoryData.warehouses || [];
  const iotSignals = inventoryData.iotSignals || [];

  function fillColor(fill) {
    if (fill >= 85) return 'var(--accent-danger)';
    if (fill >= 60) return 'var(--accent-warning)';
    return 'var(--accent-success)';
  }

  function fillBg(fill) {
    if (fill >= 85) return 'rgba(248,81,73,0.1)';
    if (fill >= 60) return 'rgba(245,158,11,0.1)';
    return 'rgba(0,200,83,0.1)';
  }

  const page = document.createElement('div');
  page.className = 'page-container';
  page.innerHTML = `
    <div class="page-header animate-fade-in-up">
      <div class="page-header__chapter">Chapter 2.1 — Operational Pulse</div>
      <h1 class="page-header__title">Warehouse Grid Intelligence</h1>
      <p class="page-header__description">Master-grid for localized zone utilization, IoT telemetry, and Made-in-KSA asset tracking across all strategic facilities.</p>
    </div>

    <!-- IoT Signal Strip -->
    <div class="kpi-grid" style="margin-bottom:var(--space-2xl);">
      ${iotSignals.map((sig, idx) => `
        <div class="kpi-card animate-fade-in-up" style="animation-delay:${0.1 + idx * 0.1}s">
          <div class="kpi-card__header">
            <div class="kpi-card__icon kpi-card__icon--${sig.alertLevel === 'critical' ? 'orange' : sig.alertLevel === 'warning' ? 'orange' : 'green'}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <span class="badge badge--${sig.alertLevel === 'critical' ? 'danger' : sig.alertLevel === 'warning' ? 'warning' : 'success'}" style="text-transform:uppercase;font-size:0.6rem;">${sig.alertLevel}</span>
          </div>
          <div class="kpi-card__value" style="font-size:1.2rem;">${sig.warehouse}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--space-sm);margin-top:var(--space-md);">
            <div style="text-align:center;">
              <div style="font-size:0.6rem;color:var(--text-tertiary);text-transform:uppercase;">Temp</div>
              <div style="font-family:var(--font-mono);font-weight:700;font-size:0.95rem;color:var(--text-primary);">${sig.temp}&deg;C</div>
            </div>
            <div style="text-align:center;">
              <div style="font-size:0.6rem;color:var(--text-tertiary);text-transform:uppercase;">Humidity</div>
              <div style="font-family:var(--font-mono);font-weight:700;font-size:0.95rem;color:var(--text-primary);">${sig.humidity}%</div>
            </div>
            <div style="text-align:center;">
              <div style="font-size:0.6rem;color:var(--text-tertiary);text-transform:uppercase;">RFID</div>
              <div style="font-family:var(--font-mono);font-weight:700;font-size:0.95rem;color:var(--text-primary);">${sig.rfidScans.toLocaleString()}</div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Warehouse Heatmap Grids -->
    ${warehouses.map((wh, whIdx) => `
      <div class="card-panel animate-fade-in-up" style="animation-delay:${0.4 + whIdx * 0.15}s;margin-bottom:var(--space-xl);">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title" style="display:flex;align-items:center;gap:var(--space-sm);">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
              ${wh.name}
            </div>
            <div class="card-panel__subtitle">${wh.id} · ${wh.city}</div>
          </div>
          <span class="badge badge--info">${wh.zones.length} Zones</span>
        </div>
        <div class="card-panel__body">
          <div class="heatmap-grid" style="grid-template-columns:repeat(3,1fr);gap:var(--space-md);">
            ${wh.zones.map(z => `
              <div class="heatmap-cell" style="background:${fillBg(z.fill)};padding:var(--space-md);">
                <div class="heatmap-cell__zone">${z.zone}</div>
                <div class="heatmap-cell__pct" style="color:${fillColor(z.fill)};font-size:1.4rem;">${z.fill}%</div>
                <div style="font-size:0.65rem;color:var(--text-tertiary);margin-top:var(--space-xs);">${z.category}</div>
                <div style="display:flex;gap:var(--space-md);margin-top:var(--space-xs);">
                  <span style="font-size:0.6rem;color:var(--text-tertiary);">${z.temp}&deg;C</span>
                  <span style="font-size:0.6rem;color:var(--text-tertiary);">${z.humidity}% RH</span>
                </div>
                <div class="progress-bar" style="margin-top:var(--space-sm);height:4px;">
                  <div class="progress-bar__fill" style="width:${z.fill}%;background:${fillColor(z.fill)};"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('')}
  `;

  Registry.add({ id: 'warehouse-grid-logic', destroy: () => {} });

  return page;
}
