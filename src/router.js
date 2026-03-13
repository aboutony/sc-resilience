// ═══════════════════════════════════════════════════════
// Router – Hash-based SPA with Narrative Slide Transitions
// ═══════════════════════════════════════════════════════

// Route order defines the "chapter" order for narrative slide direction
const ROUTE_ORDER = [
  'login',
  'dashboard',
  'market-research',
  'supplier-selection',
  'order-management',
  'receiving-qa',
  'invoice-payment',
  'supplier-mgmt',
  'integration-settings',
  'user-profile'
];

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.currentPage = null;
    this.contentEl = null;
    this.onRouteChange = null;
  }

  register(path, loader) {
    this.routes[path] = loader;
  }

  setContentElement(el) {
    this.contentEl = el;
  }

  start() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  }

  navigate(path) {
    window.location.hash = `#/${path}`;
  }

  async handleRoute() {
    const hash = window.location.hash.slice(2) || 'login';
    const loader = this.routes[hash];

    if (!loader || !this.contentEl) {
      if (!this.routes[hash]) {
        this.navigate('login');
      }
      return;
    }

    const prevRoute = this.currentRoute;
    this.currentRoute = hash;

    // Determine slide direction based on narrative order
    const prevIdx = ROUTE_ORDER.indexOf(prevRoute);
    const nextIdx = ROUTE_ORDER.indexOf(hash);
    const isForward = nextIdx >= prevIdx || prevIdx === -1;

    // Exit animation on current content
    if (this.currentPage) {
      const exitClass = isForward ? 'slide-exit' : 'slide-exit-reverse';
      this.currentPage.classList.add(exitClass);
      await new Promise(r => setTimeout(r, 300));
    }

    // Clear and render new page
    this.contentEl.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'page-transition';

    const pageContent = await loader();
    if (typeof pageContent === 'string') {
      wrapper.innerHTML = pageContent;
    } else if (pageContent instanceof HTMLElement) {
      wrapper.appendChild(pageContent);
    }

    this.contentEl.appendChild(wrapper);
    this.currentPage = wrapper;

    // Enter animation
    const enterClass = isForward ? 'slide-enter' : 'slide-enter';
    wrapper.classList.add(enterClass);

    // Fire route change callback
    if (this.onRouteChange) {
      this.onRouteChange(hash);
    }
  }

  getCurrentRoute() {
    return this.currentRoute;
  }
}

export const router = new Router();
