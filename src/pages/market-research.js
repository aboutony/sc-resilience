// ═══════════════════════════════════════════
// Market Research Page – AI-Driven Discovery
// Layout: Centralized & Actionable
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';
import { formatSAR, formatCompact } from '../currency.js';
import { kpiData, marketData, aiInsights, suppliers } from '../data/mock-data.js';

let commodityChart = null;

// Action map for AI insights
const insightActions = [
  { label: 'View Profile', labelAr: 'عرض الملف', route: 'supplier-selection' },
  { label: 'Analyze Risk', labelAr: 'تحليل المخاطر', route: 'risk-dashboard' },
  { label: 'View Report', labelAr: 'عرض التقرير', route: 'intelligent-reporting' },
  { label: 'Review Now', labelAr: 'مراجعة الآن', route: 'supplier-selection' },
  { label: 'View Compliance', labelAr: 'عرض الامتثال', route: 'compliance-docs' },
  { label: 'Initiate Onboarding', labelAr: 'بدء التأهيل', route: 'supplier-mgmt' },
];

// Region-to-filter map for risk matrix
const regionMap = {
  saudiArabia: 'Saudi Arabia',
  gcc: ['UAE', 'Kuwait', 'Bahrain', 'Qatar', 'Oman'],
  asia: ['China', 'India', 'Japan', 'South Korea'],
  europe: ['Germany', 'France', 'UK', 'Italy'],
  americas: ['USA', 'Canada', 'Brazil', 'Mexico'],
};

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

    <!-- Row 1: AI Feed (left) | Global Map (center) -->
    <div class="grid-1-2" style="margin-bottom:var(--space-2xl);">
      <!-- AI Intelligence Feed with Direct Action Buttons -->
      <div class="card-panel animate-fade-in-up" style="animation-delay:0.3s">
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
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-top:var(--space-xs);">
                    <div class="ai-feed__time">${item.time}</div>
                    <button class="btn btn--ghost btn--sm ai-action-btn" data-route="${insightActions[idx]?.route || 'dashboard'}" style="font-size:0.65rem;padding:3px 10px;">
                      ${i18n.isRTL() ? (insightActions[idx]?.labelAr || 'عرض') : (insightActions[idx]?.label || 'View')}
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- CENTER: Global Supplier Discovery Map -->
      <div class="card-panel animate-fade-in-up" style="animation-delay:0.35s">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('marketResearch.panels.supplierDiscovery')}</div>
            <div class="card-panel__subtitle">${i18n.t('marketResearch.panels.supplierDiscoverySub')}</div>
          </div>
          <div class="card-panel__actions" style="display:flex;align-items:center;gap:var(--space-sm);">
            <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:0.75rem;color:var(--text-secondary);">
              <span>🇸🇦</span>
              <span>${i18n.t('dashboard.vision2030Toggle') || 'Local Content'}</span>
              <input type="checkbox" id="map-local-toggle" checked style="accent-color:#37bc64;">
            </label>
          </div>
        </div>
        <div class="card-panel__body">
          <!-- SVG World Map -->
          <div class="global-map" id="global-map-container" style="position:relative;min-height:320px;background:var(--bg-secondary);border-radius:var(--radius-md);overflow:hidden;">
            ${renderGlobalMap()}
          </div>
        </div>
      </div>
    </div>

    <!-- Row 2: Commodity Chart (left) | Risk Matrix (right) -->
    <div class="grid-2" style="margin-bottom:var(--space-2xl);">
      <!-- Commodity Price Trends Chart -->
      <div class="card-panel animate-fade-in-up" style="animation-delay:0.4s">
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

      <!-- Risk Assessment Matrix (Clickable) -->
      <div class="card-panel animate-fade-in-up" style="animation-delay:0.45s">
        <div class="card-panel__header">
          <div>
            <div class="card-panel__title">${i18n.t('marketResearch.panels.riskMatrix')}</div>
            <div class="card-panel__subtitle">${i18n.t('marketResearch.panels.riskMatrixSub')}</div>
          </div>
          <div class="card-panel__actions">
            <button class="btn btn--ghost btn--sm" id="risk-clear-filter" style="display:none;">✕ Clear Filter</button>
          </div>
        </div>
        <div class="card-panel__body">
          <div class="data-table-wrap">
            <table class="data-table" id="risk-matrix-table">
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
                    <td>${riskBadgeClickable(row.saudiArabia, row.category, 'saudiArabia')}</td>
                    <td>${riskBadgeClickable(row.gcc, row.category, 'gcc')}</td>
                    <td>${riskBadgeClickable(row.asia, row.category, 'asia')}</td>
                    <td>${riskBadgeClickable(row.europe, row.category, 'europe')}</td>
                    <td>${riskBadgeClickable(row.americas, row.category, 'americas')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Active Filter Indicator -->
    <div id="filter-indicator" style="display:none;margin-bottom:var(--space-md);padding:var(--space-sm) var(--space-md);background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:var(--radius-md);display:none;">
      <span style="font-size:0.8rem;color:var(--accent-danger);font-weight:600;" id="filter-text"></span>
    </div>

    <!-- Supplier Discovery Table (Filtered by Risk Matrix) -->
    <div class="card-panel animate-fade-in-up" style="animation-delay:0.5s">
      <div class="card-panel__header">
        <div>
          <div class="card-panel__title">${i18n.t('marketResearch.panels.supplierDiscovery')}</div>
          <div class="card-panel__subtitle" id="discovery-subtitle">${i18n.t('marketResearch.panels.supplierDiscoverySub')}</div>
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
            <tbody id="supplier-table-body">
              ${renderSupplierRows(suppliers.slice(0, 6))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <style>
      .grid-1-2 {
        display:grid;
        grid-template-columns:1fr 2fr;
        gap:var(--space-xl);
      }
      @media (max-width:900px) {
        .grid-1-2 { grid-template-columns:1fr; }
      }
      .risk-cell { cursor:pointer; transition:all 300ms ease; border-radius:var(--radius-sm); }
      .risk-cell:hover { transform:scale(1.08); box-shadow:0 2px 8px rgba(0,0,0,0.15); }
      .risk-cell--active { outline:2px solid var(--accent-primary); outline-offset:2px; }
      .ai-action-btn { transition:all 300ms ease !important; }
      .ai-action-btn:hover { transform:scale(1.05); }

      /* Global Map */
      .global-map { padding:var(--space-md); }
      .map-region { transition:all 300ms ease; cursor:default; }
      .map-pin { transition:all 300ms ease; cursor:pointer; }
      .map-pin:hover { transform:scale(1.3); }
      .map-pin--ksa { animation: saudi-pulse 2s infinite; }
      @keyframes saudi-pulse {
        0%,100% { filter:drop-shadow(0 0 2px rgba(55,188,100,0.3)); }
        50% { filter:drop-shadow(0 0 10px rgba(55,188,100,0.7)); }
      }
      .map-tooltip {
        position:absolute; padding:8px 12px; background:var(--surface-card);
        border:1px solid var(--border-primary); border-radius:var(--radius-md);
        box-shadow:var(--shadow-lg); font-size:0.75rem; pointer-events:none;
        white-space:nowrap; z-index:10;
        backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
      }
      .supplier-row-highlight { animation:row-flash 0.6s ease; }
      @keyframes row-flash {
        0% { background:rgba(239,68,68,0.15); }
        100% { background:transparent; }
      }
    </style>
  `;

  // ── Event Handlers ──
  requestAnimationFrame(() => {
    setTimeout(() => initCommodityChart(), 100);

    // AI Feed action buttons → navigate
    page.querySelectorAll('.ai-action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const route = btn.dataset.route;
        if (route) window.location.hash = '#/' + route;
      });
    });

    // Risk Matrix cell clicks → filter supplier table
    page.querySelectorAll('.risk-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        const category = cell.dataset.category;
        const region = cell.dataset.region;
        const level = cell.dataset.level;

        // Highlight active cell
        page.querySelectorAll('.risk-cell').forEach(c => c.classList.remove('risk-cell--active'));
        cell.classList.add('risk-cell--active');

        // Show clear button and filter indicator
        const clearBtn = page.querySelector('#risk-clear-filter');
        const filterIndicator = page.querySelector('#filter-indicator');
        const filterText = page.querySelector('#filter-text');
        if (clearBtn) clearBtn.style.display = 'inline-flex';
        if (filterIndicator) {
          filterIndicator.style.display = 'block';
          filterText.textContent = `🔍 Filtering: ${category} × ${region} (${level} risk)`;
        }

        // Filter supplier table
        filterSupplierTable(page, category, region);
      });
    });

    // Clear filter
    page.querySelector('#risk-clear-filter')?.addEventListener('click', () => {
      page.querySelectorAll('.risk-cell').forEach(c => c.classList.remove('risk-cell--active'));
      page.querySelector('#risk-clear-filter').style.display = 'none';
      page.querySelector('#filter-indicator').style.display = 'none';
      const tbody = page.querySelector('#supplier-table-body');
      if (tbody) {
        tbody.innerHTML = renderSupplierRows(suppliers.slice(0, 6));
      }
    });

    // Local Content toggle on map
    const mapToggle = page.querySelector('#map-local-toggle');
    if (mapToggle) {
      mapToggle.addEventListener('change', () => {
        const pins = page.querySelectorAll('.map-pin--ksa');
        pins.forEach(pin => {
          if (mapToggle.checked) {
            pin.style.display = 'block';
            pin.classList.add('map-pin--ksa-active');
          } else {
            pin.style.opacity = mapToggle.checked ? '1' : '0.3';
            pin.classList.toggle('map-pin--ksa-active', mapToggle.checked);
          }
        });
        // Toggle KSA highlight on map
        const ksaRegion = page.querySelector('#map-ksa-highlight');
        if (ksaRegion) {
          ksaRegion.style.opacity = mapToggle.checked ? '1' : '0';
        }
      });
    }

    // Map pin hover tooltips
    page.querySelectorAll('.map-pin').forEach(pin => {
      pin.addEventListener('mouseenter', (e) => {
        const name = pin.dataset.name;
        const score = pin.dataset.score;
        const region = pin.dataset.region;
        const tooltip = document.createElement('div');
        tooltip.className = 'map-tooltip';
        tooltip.id = 'map-tooltip-active';
        tooltip.innerHTML = `<strong>${name}</strong><br/>${region} · Score: ${score}`;
        const mapContainer = page.querySelector('#global-map-container');
        if (mapContainer) {
          const rect = mapContainer.getBoundingClientRect();
          const pinRect = pin.getBoundingClientRect();
          tooltip.style.left = (pinRect.left - rect.left + 15) + 'px';
          tooltip.style.top = (pinRect.top - rect.top - 40) + 'px';
          mapContainer.appendChild(tooltip);
        }
      });
      pin.addEventListener('mouseleave', () => {
        const tooltip = document.getElementById('map-tooltip-active');
        if (tooltip) tooltip.remove();
      });
    });
  });

  return page;
}

function renderGlobalMap() {
  // Stylized SVG world map with supplier pins
  const supplierPins = suppliers.map(s => {
    const pos = getSupplierMapPosition(s.region);
    const isKSA = s.isKSA;
    const pinColor = isKSA ? '#37bc64' : s.color;
    const pinClass = isKSA ? 'map-pin map-pin--ksa' : 'map-pin';

    return `<g class="${pinClass}" data-name="${s.name}" data-score="${s.score}" data-region="${s.region}" transform="translate(${pos.x}, ${pos.y})">
      <circle r="6" fill="${pinColor}" stroke="#fff" stroke-width="1.5" opacity="0.9"/>
      <circle r="3" fill="#fff" opacity="0.6"/>
      ${isKSA ? `<circle r="10" fill="none" stroke="#37bc64" stroke-width="1" opacity="0.4"><animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/></circle>` : ''}
    </g>`;
  }).join('');

  return `
    <svg viewBox="0 0 600 320" style="width:100%;height:100%;" xmlns="http://www.w3.org/2000/svg">
      <!-- Background grid -->
      <defs>
        <pattern id="mapGrid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="var(--border-secondary)" stroke-width="0.3" opacity="0.5"/>
        </pattern>
      </defs>
      <rect width="600" height="320" fill="url(#mapGrid)"/>

      <!-- Simplified continent shapes -->
      <!-- Europe -->
      <path d="M280 60 L310 50 L340 55 L350 70 L345 90 L320 95 L300 90 L285 80 Z"
            fill="var(--bg-tertiary)" stroke="var(--border-primary)" stroke-width="0.5" class="map-region" opacity="0.6"/>
      <!-- Africa -->
      <path d="M285 110 L320 100 L340 115 L345 160 L330 200 L305 210 L280 190 L270 150 L275 120 Z"
            fill="var(--bg-tertiary)" stroke="var(--border-primary)" stroke-width="0.5" class="map-region" opacity="0.6"/>
      <!-- Asia -->
      <path d="M350 40 L420 35 L480 50 L510 80 L500 120 L460 130 L420 115 L380 100 L350 80 Z"
            fill="var(--bg-tertiary)" stroke="var(--border-primary)" stroke-width="0.5" class="map-region" opacity="0.6"/>
      <!-- Americas -->
      <path d="M60 30 L120 25 L150 45 L160 90 L155 130 L140 160 L120 200 L100 230 L80 250 L70 220 L65 180 L60 130 L55 80 Z"
            fill="var(--bg-tertiary)" stroke="var(--border-primary)" stroke-width="0.5" class="map-region" opacity="0.6"/>
      <!-- Middle East / KSA highlighted -->
      <path id="map-ksa-highlight" d="M340 90 L370 85 L385 95 L380 115 L365 125 L345 120 L335 105 Z"
            fill="rgba(55,188,100,0.15)" stroke="#37bc64" stroke-width="1.5" stroke-dasharray="4,2" opacity="1"/>

      <!-- Region labels -->
      <text x="105" y="70" fill="var(--text-tertiary)" font-size="8" font-family="Inter,sans-serif" text-anchor="middle" opacity="0.7">AMERICAS</text>
      <text x="310" y="45" fill="var(--text-tertiary)" font-size="8" font-family="Inter,sans-serif" text-anchor="middle" opacity="0.7">EUROPE</text>
      <text x="360" y="78" fill="#37bc64" font-size="8" font-family="Inter,sans-serif" text-anchor="middle" font-weight="600">KSA</text>
      <text x="450" y="45" fill="var(--text-tertiary)" font-size="8" font-family="Inter,sans-serif" text-anchor="middle" opacity="0.7">ASIA PACIFIC</text>
      <text x="310" y="155" fill="var(--text-tertiary)" font-size="8" font-family="Inter,sans-serif" text-anchor="middle" opacity="0.7">AFRICA</text>

      <!-- Supplier Pins -->
      ${supplierPins}

      <!-- Legend -->
      <g transform="translate(20, 270)">
        <circle r="4" cx="4" cy="4" fill="#37bc64"/>
        <text x="14" y="8" fill="var(--text-tertiary)" font-size="7" font-family="Inter,sans-serif">KSA · Vision 2030</text>
        <circle r="4" cx="110" cy="4" fill="var(--accent-primary)"/>
        <text x="120" y="8" fill="var(--text-tertiary)" font-size="7" font-family="Inter,sans-serif">International</text>
      </g>
    </svg>
  `;
}

function getSupplierMapPosition(region) {
  const positions = {
    'Saudi Arabia': { x: 360, y: 105 },
    'UAE': { x: 385, y: 110 },
    'Kuwait': { x: 355, y: 92 },
    'Bahrain': { x: 375, y: 102 },
    'Qatar': { x: 378, y: 106 },
    'Germany': { x: 310, y: 60 },
    'China': { x: 470, y: 75 },
    'India': { x: 430, y: 100 },
    'USA': { x: 110, y: 65 },
  };
  return positions[region] || { x: 300, y: 160 };
}

function renderSupplierRows(list) {
  return list.map(s => `
    <tr class="supplier-row" data-region="${s.region}" data-category="${s.category}">
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
  `).join('');
}

function filterSupplierTable(page, category, regionKey) {
  const tbody = page.querySelector('#supplier-table-body');
  if (!tbody) return;

  // Get matching region names
  const regionNames = regionKey === 'saudiArabia'
    ? ['Saudi Arabia']
    : Array.isArray(regionMap[regionKey]) ? regionMap[regionKey] : [];

  // Filter suppliers by category match (all regions shown, category-filtered)
  let filtered = suppliers.filter(s => {
    const catMatch = s.category.toLowerCase().includes(category.toLowerCase()) ||
                     category.toLowerCase().includes(s.category.toLowerCase().split(' ')[0]);
    return catMatch;
  });

  // If no exact match, show all suppliers for that region
  if (filtered.length === 0) {
    filtered = suppliers.filter(s => {
      return regionNames.includes(s.region);
    });
  }

  // Fallback: show all
  if (filtered.length === 0) filtered = suppliers;

  tbody.innerHTML = renderSupplierRows(filtered);

  // Flash animation
  tbody.querySelectorAll('tr').forEach(row => {
    row.classList.add('supplier-row-highlight');
  });
}

function riskBadgeClickable(level, category, regionKey) {
  const colors = { high: 'danger', medium: 'warning', low: 'success' };
  const labels = { high: i18n.t('common.high'), medium: i18n.t('common.medium'), low: i18n.t('common.low') };
  return `<span class="badge badge--${colors[level]} risk-cell" data-level="${level}" data-category="${category}" data-region="${regionKey}" style="cursor:pointer;">
    <span class="status-dot status-dot--${colors[level]}"></span> ${labels[level]}
  </span>`;
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
  // Confidence intervals (±%) for each commodity
  const confidenceIntervals = [2.1, 1.8, 1.5, 3.2];

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
        pointHoverRadius: 7,
        pointHoverBorderWidth: 3,
        pointHoverBackgroundColor: '#fff',
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
          backgroundColor: 'rgba(13,17,23,0.95)',
          titleColor: '#e6edf3',
          bodyColor: '#8b949e',
          borderColor: '#30363d',
          borderWidth: 1,
          padding: 14,
          cornerRadius: 10,
          titleFont: { family: "'Inter', sans-serif", weight: '600', size: 13 },
          bodyFont: { family: "'JetBrains Mono', monospace", size: 12 },
          displayColors: true,
          callbacks: {
            label: function(context) {
              const value = context.parsed.y;
              const datasetIdx = context.datasetIndex;
              const commodity = marketData.commodities[datasetIdx];
              const ci = confidenceIntervals[datasetIdx];
              const sarValue = commodity.name === 'Crude Oil' ? `$${value}/bbl` : `SAR ${value.toLocaleString()}/MT`;
              return `${commodity.name}: ${sarValue}  ±${ci}%`;
            },
            afterLabel: function(context) {
              const datasetIdx = context.datasetIndex;
              const ci = confidenceIntervals[datasetIdx];
              const value = context.parsed.y;
              const low = (value * (1 - ci/100)).toFixed(0);
              const high = (value * (1 + ci/100)).toFixed(0);
              return `  AI Confidence: ${low} – ${high}`;
            },
            title: function(tooltipItems) {
              return `📊 ${tooltipItems[0].label} — Market Intelligence`;
            }
          }
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

// Re-init chart on theme change
window.addEventListener('theme-changed', () => {
  setTimeout(() => initCommodityChart(), 50);
});
