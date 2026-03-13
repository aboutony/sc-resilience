// ═══════════════════════════════════════════
// Theme Engine – Light/Dark Mode Toggle
// ═══════════════════════════════════════════

const STORAGE_KEY = 'scp-theme';

class ThemeEngine {
  constructor() {
    this.current = localStorage.getItem(STORAGE_KEY) || 'dark';
    this.apply(this.current);
  }

  apply(theme) {
    this.current = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme } }));
  }

  toggle() {
    this.apply(this.current === 'dark' ? 'light' : 'dark');
  }

  isDark() {
    return this.current === 'dark';
  }
}

export const themeEngine = new ThemeEngine();
