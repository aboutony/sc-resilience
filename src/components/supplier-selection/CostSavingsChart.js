// ═══════════════════════════════════════════
// CostSavingsChart – Cost Analysis Bar Chart
// ─── ISOLATED: Imports only cost-chart.js ───
// ═══════════════════════════════════════════

import { i18n } from '../../i18n.js';
import { initCostChart } from '../../logic/cost-chart.js';

let costChart = null;
let _themeHandler = null;

/**
 * Render the Cost Analysis bar chart panel.
 * Owns its own chart instance and theme-change listener.
 * @param {Array} suppliers – Full supplier dataset
 * @returns {HTMLElement}
 */
export function renderCostSavingsChart(suppliers) {
  // Clean up previous theme listener to prevent ghost handlers
  if (_themeHandler) {
    window.removeEventListener('theme-changed', _themeHandler);
    _themeHandler = null;
  }

  const section = document.createElement('div');
  section.className = 'card-panel animate-fade-in-up';
  section.style.cssText = 'animation-delay:0.45s';

  section.innerHTML = `
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
  `;

  // Initialize chart after DOM attachment
  requestAnimationFrame(() => {
    setTimeout(() => {
      const canvas = document.getElementById('cost-chart');
      costChart = initCostChart(canvas, suppliers, costChart);
    }, 100);
  });

  // Own theme-change handler
  _themeHandler = () => {
    setTimeout(() => {
      const canvas = document.getElementById('cost-chart');
      costChart = initCostChart(canvas, suppliers, costChart);
    }, 50);
  };
  window.addEventListener('theme-changed', _themeHandler);

  return section;
}
