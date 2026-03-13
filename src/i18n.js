// ═══════════════════════════════════════════
// I18n Engine – Arabic/English with RTL
// ═══════════════════════════════════════════

import en from './locales/en.json';
import ar from './locales/ar.json';

const STORAGE_KEY = 'scp-lang';

const dictionaries = { en, ar };

class I18nEngine {
  constructor() {
    this.current = localStorage.getItem(STORAGE_KEY) || 'en';
    this.apply(this.current);
  }

  apply(lang) {
    this.current = lang;
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(STORAGE_KEY, lang);
    window.dispatchEvent(new CustomEvent('lang-changed', { detail: { lang, dir } }));
  }

  toggle() {
    this.apply(this.current === 'en' ? 'ar' : 'en');
  }

  t(key) {
    const dict = dictionaries[this.current] || dictionaries.en;
    const keys = key.split('.');
    let val = dict;
    for (const k of keys) {
      val = val?.[k];
    }
    return val ?? key;
  }

  isRTL() {
    return this.current === 'ar';
  }

  getLang() {
    return this.current;
  }
}

export const i18n = new I18nEngine();
