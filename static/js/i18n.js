/* MADD - Multi-Agent Driven Development
   Theme Toggle & Language Selector for Hugo */

(function() {
  'use strict';

  // ========================================
  // Configuration
  // ========================================
  const STORAGE_KEY_THEME = 'madd-theme';

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY_THEME);
    } catch (_) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
      return true;
    } catch (_) {
      return false;
    }
  }

  // ========================================
  // Theme Management
  // ========================================
  function initTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = getStoredTheme();
    const prefersDark = mediaQuery.matches;

    // Use system theme by default if no preference saved
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(theme, !savedTheme); // Don't persist to localStorage if using system default

    // Listen for system theme changes
    const handleSystemThemeChange = (e) => {
      if (!getStoredTheme()) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    // Safari < 14 fallback
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(handleSystemThemeChange);
    }
  }

  function setTheme(theme, skipPersist) {
    document.documentElement.setAttribute('data-theme', theme);
    if (!skipPersist) {
      setStoredTheme(theme);
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  // ========================================
  // Language Selector (Hugo-based)
  // ========================================
  function initLangSelector() {
    const langSelector = document.getElementById('lang-selector');
    if (!langSelector) return;

    const langBtn = langSelector.querySelector('.lang-selector__btn');
    if (!langBtn) return;

    // Toggle dropdown
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langSelector.classList.toggle('lang-selector--open');
      langBtn.setAttribute('aria-expanded', isOpen);
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
  // Language Toggle (keyboard shortcut)
  // ========================================
  function toggleLanguage() {
    const langSelector = document.getElementById('lang-selector');
    const currentLang = document.documentElement.getAttribute('lang') || 'en';

    // Prefer Hugo-generated translation links when available.
    if (langSelector) {
      const options = Array.from(langSelector.querySelectorAll('.lang-selector__option'));
      const targetOption = options.find((option) => !option.classList.contains('lang-selector__option--active'));

      if (targetOption) {
        window.location.href = targetOption.href;
        return;
      }
    }

    // Fallback path logic if selector links are not present.
    const currentPath = window.location.pathname;
    if (currentLang === 'en') {
      window.location.href = (currentPath === '/' || currentPath === '/index.html') ? '/fr/' : '/fr' + currentPath;
      return;
    }

    window.location.href = (currentPath === '/fr/' || currentPath === '/fr/index.html')
      ? '/'
      : currentPath.replace('/fr/', '/').replace('/fr', '');
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

  // ========================================
  // Initialize
  // ========================================
  function init() {
    try {
      initTheme();
    } catch (_) {
      // Theme auto-init failed, but explicit toggles should still work.
    }
    initThemeToggle();
    initLangSelector();
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
    toggleTheme,
    setTheme,
    toggleLanguage
  };

})();
