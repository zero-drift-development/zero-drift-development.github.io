/* MADD - Multi-Agent Driven Development
   Theme Toggle & Internationalization (i18n) */

(function() {
  'use strict';

  // ========================================
  // Configuration
  // ========================================
  const SUPPORTED_LANGUAGES = ['fr', 'en'];
  const DEFAULT_LANGUAGE = 'fr';
  const STORAGE_KEY_LANG = 'madd-lang';
  const STORAGE_KEY_THEME = 'madd-theme';

  // ========================================
  // State
  // ========================================
  let currentLang = DEFAULT_LANGUAGE;
  let translations = {};

  // ========================================
  // Theme Management
  // ========================================
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Use system theme by default if no preference saved
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(theme, !savedTheme); // Don't persist to localStorage if using system default

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY_THEME)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  function setTheme(theme, skipPersist) {
    document.documentElement.setAttribute('data-theme', theme);
    if (!skipPersist) {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  // ========================================
  // Language Management
  // ========================================
  async function loadLanguage(lang) {
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      lang = DEFAULT_LANGUAGE;
    }

    try {
      const response = await fetch(`lang/${lang}.json`);
      if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
      translations = await response.json();
      currentLang = lang;
      localStorage.setItem(STORAGE_KEY_LANG, lang);
      applyTranslations();
      updateLangUI();
      updateHtmlLang();
    } catch (error) {
      console.error('Error loading language:', error);
      // Fallback to default if current fails
      if (lang !== DEFAULT_LANGUAGE) {
        loadLanguage(DEFAULT_LANGUAGE);
      }
    }
  }

  function getTranslation(key) {
    const keys = key.split('.');
    let value = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return value;
  }

  function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = getTranslation(key);

      if (translation !== key) {
        if (el.hasAttribute('data-i18n-html')) {
          el.innerHTML = translation;
        } else {
          el.textContent = translation;
        }
      }
    });
  }

  function updateLangUI() {
    // Update current language display
    const currentLangEl = document.getElementById('current-lang');
    if (currentLangEl) {
      currentLangEl.textContent = currentLang.toUpperCase();
    }

    // Update active state on language options
    const langOptions = document.querySelectorAll('.lang-selector__option');
    langOptions.forEach(option => {
      const isActive = option.getAttribute('data-lang') === currentLang;
      option.classList.toggle('lang-selector__option--active', isActive);
    });
  }

  function updateHtmlLang() {
    document.documentElement.setAttribute('lang', currentLang);
  }

  function initLanguage() {
    // Check URL parameter first
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');

    // Then check localStorage
    const savedLang = localStorage.getItem(STORAGE_KEY_LANG);

    // Then check browser language
    const browserLang = navigator.language.split('-')[0];

    // Priority: URL > localStorage > browser > default
    const lang = urlLang || savedLang || (SUPPORTED_LANGUAGES.includes(browserLang) ? browserLang : DEFAULT_LANGUAGE);

    loadLanguage(lang);
  }

  // ========================================
  // UI Event Handlers
  // ========================================
  function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }
  }

  function initLangSelector() {
    const langSelector = document.getElementById('lang-selector');
    if (!langSelector) return;

    const langBtn = langSelector.querySelector('.lang-selector__btn');
    const langOptions = langSelector.querySelectorAll('.lang-selector__option');

    // Toggle dropdown
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langSelector.classList.toggle('lang-selector--open');
      langBtn.setAttribute('aria-expanded', isOpen);
    });

    // Language selection
    langOptions.forEach(option => {
      option.addEventListener('click', () => {
        const lang = option.getAttribute('data-lang');
        loadLanguage(lang);
        langSelector.classList.remove('lang-selector--open');
        langBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!langSelector.contains(e.target)) {
        langSelector.classList.remove('lang-selector--open');
        langBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        langSelector.classList.remove('lang-selector--open');
        langBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ========================================
  // Initialize
  // ========================================
  function init() {
    initTheme();
    initThemeToggle();
    initLangSelector();
    initLanguage();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for external use if needed
  window.MADD = window.MADD || {};
  window.MADD.i18n = {
    loadLanguage,
    getTranslation,
    toggleTheme,
    setTheme
  };

})();
