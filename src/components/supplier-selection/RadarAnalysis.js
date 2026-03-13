// ═══════════════════════════════════════════
// RadarAnalysis – Performance Radar Chart
// ─── ISOLATED: Imports only radar-chart.js ───
// ═══════════════════════════════════════════

import { i18n } from '../../i18n.js';
import { initRadarChart } from '../../logic/radar-chart.js';

let radarChart = null;
let _themeHandler = null;

/**
 * Render the Performance Radar chart panel.
 * Owns its own chart instance and theme-change listener.
 * @param {Array} suppliers – Full supplier dataset
 * @returns {HTMLElement}
 */
export function renderRadarAnalysis(suppliers) {
  // Clean up previous theme listener to prevent ghost handlers
  if (_themeHandler) {
    window.removeEventListener('theme-changed', _themeHandler);
    _themeHandler = null;
  }

  const section = document.createElement('div');
  section.className = 'card-panel animate-fade-in-up';
  section.style.cssText = 'animation-delay:0.4s';

  section.innerHTML = `
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
  `;

  // Initialize chart after DOM attachment
  requestAnimationFrame(() => {
    setTimeout(() => {
      const canvas = document.getElementById('radar-chart');
      radarChart = initRadarChart(canvas, suppliers, radarChart);
    }, 100);
  });

  // Own theme-change handler
  _themeHandler = () => {
    setTimeout(() => {
      const canvas = document.getElementById('radar-chart');
      radarChart = initRadarChart(canvas, suppliers, radarChart);
    }, 50);
  };
  window.addEventListener('theme-changed', _themeHandler);

  return section;
}
