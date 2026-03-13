// ═══════════════════════════════════════════
// Logic Module – Cost Analysis Chart
// Isolated from supplier-selection.js for LSP stability
// ═══════════════════════════════════════════

/**
 * Initialize a bar chart showing supplier revenue comparison.
 * @param {HTMLCanvasElement} canvas – The canvas element to render onto
 * @param {Array} suppliers – Full suppliers array from mock-data
 * @param {Chart|null} existingChart – Previous chart instance to destroy
 * @returns {Chart|null} The new Chart instance, or null if Chart.js unavailable
 */
export function initCostChart(canvas, suppliers, existingChart = null) {
  if (!canvas || typeof Chart === 'undefined') return null;
  if (existingChart) { existingChart.destroy(); }

  const style = getComputedStyle(document.documentElement);
  const textColor = style.getPropertyValue('--chart-text').trim();
  const gridColor = style.getPropertyValue('--chart-grid').trim();

  const sorted = [...suppliers].sort((a, b) => b.revenue - a.revenue).slice(0, 6);

  return new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: sorted.map((s) => s.name.split(' ').slice(0, 2).join(' ')),
      datasets: [{
        label: 'Revenue (SAR)',
        data: sorted.map((s) => s.revenue / 1e6),
        backgroundColor: sorted.map((s) => s.color + '80'),
        borderColor: sorted.map((s) => s.color),
        borderWidth: 1,
        borderRadius: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(13,17,23,0.9)',
          titleColor: '#e6edf3',
          bodyColor: '#8b949e',
          callbacks: { label: (ctx) => `SAR ${ctx.raw.toFixed(1)}M` },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: textColor,
            font: { family: "'Inter', sans-serif", size: 10 },
          },
        },
        y: {
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            font: { family: "'JetBrains Mono', monospace", size: 11 },
            callback: (v) => `${v}M`,
          },
        },
      },
    },
  });
}
