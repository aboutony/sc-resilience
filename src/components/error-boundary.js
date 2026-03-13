// ═══════════════════════════════════════════
// Error Boundary – Vanilla JS Component Shield
// ─── IRONCLAD: Catches render failures, prevents re-render loops ───
// ═══════════════════════════════════════════

/**
 * Wraps a page render function in a try/catch error boundary.
 * If the page render throws, logs to console and shows a fallback UI.
 * Does NOT trigger re-render loops on the server.
 *
 * @param {Function} renderFn – The page render function (e.g., renderSupplierSelectionPage)
 * @param {string} pageName – Human-readable page name for the fallback display
 * @returns {HTMLElement} The rendered page, or a fallback error card
 */
export function withErrorBoundary(renderFn, pageName = 'Page') {
  try {
    const result = renderFn();

    // Handle async renders (shouldn't happen, but safety net)
    if (result instanceof Promise) {
      return result.catch((err) => {
        console.error(`[ERROR-BOUNDARY] Async render failed for "${pageName}":`, err);
        return createFallbackUI(pageName, err);
      });
    }

    return result;
  } catch (err) {
    // ─── Log but do NOT cascade ───
    console.error(`[ERROR-BOUNDARY] Render failed for "${pageName}":`, err);
    return createFallbackUI(pageName, err);
  }
}

/**
 * Wraps an async page render function in an error boundary.
 * @param {Function} asyncRenderFn – Async page render function
 * @param {string} pageName – Human-readable page name
 * @returns {Promise<HTMLElement>} Rendered page or fallback
 */
export async function withAsyncErrorBoundary(asyncRenderFn, pageName = 'Page') {
  try {
    return await asyncRenderFn();
  } catch (err) {
    console.error(`[ERROR-BOUNDARY] Async render failed for "${pageName}":`, err);
    return createFallbackUI(pageName, err);
  }
}

/**
 * Create a minimal, non-crashing fallback UI card.
 * Does NOT trigger re-renders or server-side loops.
 */
function createFallbackUI(pageName, error) {
  const container = document.createElement('div');
  container.className = 'page-container';
  container.innerHTML = `
    <div class="error-boundary-fallback" style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      padding: var(--space-2xl);
      text-align: center;
    ">
      <div style="
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: rgba(239, 68, 68, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: var(--space-lg);
        font-size: 1.5rem;
      ">🛡️</div>
      <h2 style="
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: var(--space-sm);
      ">Render Shield Active</h2>
      <p style="
        font-size: 0.85rem;
        color: var(--text-secondary);
        margin-bottom: var(--space-xs);
        max-width: 420px;
      ">${pageName} encountered an error but the server stream remains intact.</p>
      <code style="
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 0.7rem;
        color: var(--accent-danger);
        background: rgba(239, 68, 68, 0.08);
        padding: var(--space-xs) var(--space-sm);
        border-radius: var(--radius-sm);
        margin-bottom: var(--space-lg);
        max-width: 500px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      ">${error?.message || 'Unknown render error'}</code>
      <button id="error-boundary-retry" class="btn btn--ghost btn--sm" style="
        margin-top: var(--space-sm);
      ">↻ Retry Render</button>
    </div>
  `;

  // Wire up retry button – simple hash re-trigger, no re-render loop
  requestAnimationFrame(() => {
    const retryBtn = container.querySelector('#error-boundary-retry');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        const currentHash = window.location.hash;
        // Force a hashchange event by briefly changing and reverting
        window.location.hash = '#/__retry__';
        requestAnimationFrame(() => {
          window.location.hash = currentHash;
        });
      });
    }
  });

  return container;
}
