/* MADD - Multi-Agent Driven Development
   JavaScript for interactions */

document.addEventListener('DOMContentLoaded', function() {

  // ========================================
  // Keyboard Navigation (TUI-style)
  // ========================================
  const PAGES = [
    { path: '/', name: 'Home', key: 'h' },
    { path: '/concepts.html', name: 'Concepts', key: 'c' },
    { path: '/skills.html', name: 'Skills', key: 's' },
    { path: '/manifesto.html', name: 'Manifesto', key: 'm' },
    { path: '/examples.html', name: 'Examples', key: 'e' }
  ];

  // Normalize pathname for comparison
  function normalizePath(path) {
    if (path === '/' || path === '/index.html' || path === '') return '/';
    return path.replace(/^\//, '/').replace(/\/$/, '');
  }

  function getCurrentPageIndex() {
    const currentPath = normalizePath(window.location.pathname);
    return PAGES.findIndex(p => normalizePath(p.path) === currentPath);
  }

  function navigateToPage(index) {
    if (index >= 0 && index < PAGES.length) {
      window.location.href = PAGES[index].path;
    }
  }

  function navigatePrev() {
    const current = getCurrentPageIndex();
    if (current > 0) {
      navigateToPage(current - 1);
    } else if (current === 0) {
      navigateToPage(PAGES.length - 1); // Wrap to last
    }
  }

  function navigateNext() {
    const current = getCurrentPageIndex();
    if (current < PAGES.length - 1) {
      navigateToPage(current + 1);
    } else if (current === PAGES.length - 1) {
      navigateToPage(0); // Wrap to first
    }
  }

  // Keyboard shortcuts help modal
  function createHelpModal() {
    const modal = document.createElement('div');
    modal.id = 'keyboard-help-modal';
    modal.className = 'keyboard-help-modal';
    modal.innerHTML = `
      <div class="keyboard-help-modal__backdrop"></div>
      <div class="keyboard-help-modal__content">
        <div class="keyboard-help-modal__header">
          <h3>Raccourcis Clavier / Keyboard Shortcuts</h3>
          <button class="keyboard-help-modal__close" aria-label="Close">&times;</button>
        </div>
        <div class="keyboard-help-modal__body">
          <div class="keyboard-help-modal__section">
            <h4>Navigation</h4>
            <ul>
              <li><kbd>←</kbd> / <kbd>→</kbd> Page précédente / suivante</li>
              <li><kbd>g</kbd> <kbd>h</kbd> Aller à l'accueil (Home)</li>
              <li><kbd>g</kbd> <kbd>c</kbd> Aller aux Concepts</li>
              <li><kbd>g</kbd> <kbd>s</kbd> Aller aux Skills</li>
              <li><kbd>g</kbd> <kbd>m</kbd> Aller au Manifeste</li>
              <li><kbd>g</kbd> <kbd>e</kbd> Aller aux Exemples</li>
              <li><kbd>1</kbd>-<kbd>5</kbd> Navigation directe aux pages</li>
            </ul>
          </div>
          <div class="keyboard-help-modal__section">
            <h4>Défilement / Scroll</h4>
            <ul>
              <li><kbd>j</kbd> / <kbd>k</kbd> Défiler bas / haut</li>
              <li><kbd>J</kbd> / <kbd>K</kbd> Défiler rapidement</li>
              <li><kbd>g</kbd> <kbd>g</kbd> Haut de page</li>
              <li><kbd>G</kbd> Bas de page</li>
            </ul>
          </div>
          <div class="keyboard-help-modal__section">
            <h4>Actions</h4>
            <ul>
              <li><kbd>t</kbd> Basculer thème sombre / clair</li>
              <li><kbd>l</kbd> Changer la langue (FR/EN)</li>
              <li><kbd>?</kbd> Afficher cette aide</li>
              <li><kbd>Esc</kbd> Fermer les menus / modales</li>
            </ul>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Close handlers
    const closeBtn = modal.querySelector('.keyboard-help-modal__close');
    const backdrop = modal.querySelector('.keyboard-help-modal__backdrop');

    closeBtn.addEventListener('click', () => hideHelpModal());
    backdrop.addEventListener('click', () => hideHelpModal());

    return modal;
  }

  function showHelpModal() {
    let modal = document.getElementById('keyboard-help-modal');
    if (!modal) {
      modal = createHelpModal();
    }
    modal.classList.add('keyboard-help-modal--visible');
    document.body.style.overflow = 'hidden';
  }

  function hideHelpModal() {
    const modal = document.getElementById('keyboard-help-modal');
    if (modal) {
      modal.classList.remove('keyboard-help-modal--visible');
      document.body.style.overflow = '';
    }
  }

  // Track 'g' key for vim-style navigation
  let awaitingGCommand = false;
  let gCommandTimeout = null;

  function resetGCommand() {
    awaitingGCommand = false;
    if (gCommandTimeout) {
      clearTimeout(gCommandTimeout);
      gCommandTimeout = null;
    }
  }

  // Main keyboard handler
  document.addEventListener('keydown', function(e) {
    // Ignore if typing in an input or textarea
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
      return;
    }

    // Escape - close modal or dropdowns
    if (e.key === 'Escape') {
      hideHelpModal();
      resetGCommand();
      return;
    }

    // Help modal open - ignore other keys
    const helpModal = document.getElementById('keyboard-help-modal');
    if (helpModal && helpModal.classList.contains('keyboard-help-modal--visible')) {
      return;
    }

    // Handle 'g' prefix commands (vim-style)
    if (awaitingGCommand) {
      e.preventDefault();
      resetGCommand();

      switch (e.key.toLowerCase()) {
        case 'g': // gg - go to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        case 'h': // gh - home
          navigateToPage(0);
          return;
        case 'c': // gc - concepts
          navigateToPage(1);
          return;
        case 's': // gs - skills
          navigateToPage(2);
          return;
        case 'm': // gm - manifesto
          navigateToPage(3);
          return;
        case 'e': // ge - examples
          navigateToPage(4);
          return;
      }
      return;
    }

    // Start 'g' command sequence
    if (e.key === 'g' && !e.shiftKey) {
      awaitingGCommand = true;
      gCommandTimeout = setTimeout(resetGCommand, 1000); // 1s timeout
      return;
    }

    // Shift+G - go to bottom
    if (e.key === 'G') {
      e.preventDefault();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      return;
    }

    // Theme toggle
    if (e.key === 't') {
      e.preventDefault();
      if (window.MADD && window.MADD.i18n && window.MADD.i18n.toggleTheme) {
        window.MADD.i18n.toggleTheme();
      }
      return;
    }

    // Language toggle
    if (e.key === 'l') {
      e.preventDefault();
      if (window.MADD && window.MADD.i18n && window.MADD.i18n.loadLanguage) {
        const currentLang = document.documentElement.getAttribute('lang') || 'fr';
        const newLang = currentLang === 'fr' ? 'en' : 'fr';
        window.MADD.i18n.loadLanguage(newLang);
      }
      return;
    }

    // Help
    if (e.key === '?') {
      e.preventDefault();
      showHelpModal();
      return;
    }

    // Arrow navigation
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigatePrev();
      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      navigateNext();
      return;
    }

    // Scroll with j/k (vim-style)
    if (e.key === 'j') {
      e.preventDefault();
      window.scrollBy({ top: 100, behavior: 'smooth' });
      return;
    }

    if (e.key === 'k') {
      e.preventDefault();
      window.scrollBy({ top: -100, behavior: 'smooth' });
      return;
    }

    // Fast scroll with J/K
    if (e.key === 'J') {
      e.preventDefault();
      window.scrollBy({ top: 400, behavior: 'smooth' });
      return;
    }

    if (e.key === 'K') {
      e.preventDefault();
      window.scrollBy({ top: -400, behavior: 'smooth' });
      return;
    }

    // Number keys for direct page navigation (1-5)
    if (e.key >= '1' && e.key <= '5') {
      e.preventDefault();
      navigateToPage(parseInt(e.key) - 1);
      return;
    }
  });
  
  // ========================================
  // Mobile Navigation Toggle
  // ========================================
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('nav__links--open');
      const isOpen = navLinks.classList.contains('nav__links--open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav__links--open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ========================================
  // Help Button Toggle
  // ========================================
  const helpToggle = document.getElementById('help-toggle');
  if (helpToggle) {
    helpToggle.addEventListener('click', () => showHelpModal());
  }

  // ========================================
  // Quickstart Tabs
  // ========================================
  const tabButtons = document.querySelectorAll('.quickstart__tab');
  const tabContents = document.querySelectorAll('.quickstart__content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-tab');
      
      // Update buttons
      tabButtons.forEach(btn => btn.classList.remove('quickstart__tab--active'));
      this.classList.add('quickstart__tab--active');
      
      // Update content
      tabContents.forEach(content => {
        content.classList.remove('quickstart__content--active');
        if (content.id === targetId) {
          content.classList.add('quickstart__content--active');
        }
      });
    });
  });
  
  // ========================================
  // Smooth scroll for anchor links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ========================================
  // Intersection Observer for animations
  // ========================================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements with animation classes
  document.querySelectorAll('.principle, .problem__card, .agent-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Add visible styles
  const style = document.createElement('style');
  style.textContent = `
    .is-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
  
  // ========================================
  // Active nav link based on scroll
  // ========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav__link');
  
  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinksAll.forEach(link => {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();
  
});
