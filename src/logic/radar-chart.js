// ═══════════════════════════════════════════
// Logic Module – Radar Chart Initialization
// Isolated from supplier-selection.js for LSP stability
// ═══════════════════════════════════════════

import { i18n } from '../i18n.js';

/**
 * Initialize a radar chart comparing top suppliers across 5 dimensions.
 * @param {HTMLCanvasElement} canvas – The canvas element to render onto
 * @param {Array} suppliers – Full suppliers array from mock-data
 * @param {Chart|null} existingChart – Previous chart instance to destroy
 * @returns {Chart|null} The new Chart instance, or null if Chart.js unavailable
 */
export function initRadarChart(canvas, suppliers, existingChart = null) {
  if (!canvas || typeof Chart === 'undefined') return null;
  if (existingChart) { existingChart.destroy(); }

  const style = getComputedStyle(document.documentElement);
  const textColor = style.getPropertyValue('--chart-text').trim();
  const gridColor = style.getPropertyValue('--chart-grid').trim();
  const top3 = [...suppliers].sort((a, b) => b.score - a.score).slice(0, 3);

  return new Chart(canvas.getContext('2d'), {
    type: 'radar',
    data: {
      labels: [
        i18n.t('common.quality'),
        i18n.t('common.cost'),
        i18n.t('common.delivery'),
        i18n.t('common.reliability'),
        i18n.t('common.sustainability'),
      ],
      datasets: top3.map((s) => ({
        label: s.name,
        data: [s.quality, s.cost, s.delivery, s.reliability, s.esg],
        borderColor: s.color,
        backgroundColor: s.color + '20',
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 7,
      })),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: textColor,
            usePointStyle: true,
            font: { family: "'Inter', sans-serif", size: 11 },
          },
        },
        tooltip: {
          backgroundColor: 'rgba(13,17,23,0.9)',
          titleColor: '#e6edf3',
          bodyColor: '#8b949e',
          borderColor: '#30363d',
          borderWidth: 1,
          padding: 10,
          cornerRadius: 8,
        },
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          grid: { color: gridColor },
          angleLines: { color: gridColor },
          pointLabels: {
            color: textColor,
            font: { family: "'Inter', sans-serif", size: 11 },
          },
          ticks: { display: false },
        },
      },
    },
  });
}
