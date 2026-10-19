/**
 * DB IMPEX - Main Interactive JavaScript
 * Modern, Lightweight, Accessible
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Handling
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const drawerClose = document.querySelector('.drawer-close');

  function openDrawer() {
    if (drawer && overlay) {
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawer && overlay) {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // Mobile submenu accordion
  const submenuToggles = document.querySelectorAll('.mobile-submenu-toggle');
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSubmenu = toggle.nextElementSibling;
      if (targetSubmenu) {
        targetSubmenu.classList.toggle('active');
        toggle.classList.toggle('expanded');
      }
    });
  });

  // 2. Sticky Header Transition
  const header = document.querySelector('.site-header');
  function handleHeaderScroll() {
    if (header) {
      if (window.scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // 3. Back to Top Button
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Product Category Filtering & Live Search
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  const searchInput = document.querySelector('#product-search');

  function filterProducts() {
    const activeCategory = document.querySelector('.filter-btn.active')?.dataset.category || 'all';
    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';

    productCards.forEach(card => {
      const cardCategory = card.dataset.category || '';
      const cardTitle = (card.querySelector('.product-card-title')?.textContent || '').toLowerCase();
      const cardDesc = (card.querySelector('.product-card-sub')?.textContent || '').toLowerCase();

      const matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);
      const matchesSearch = (!searchQuery || cardTitle.includes(searchQuery) || cardDesc.includes(searchQuery));

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProducts();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterProducts);
  }

  // 5. Quote Request Modal
  const modal = document.querySelector('#quoteModal');
  const modalClose = document.querySelector('.modal-close');
  const modalProductInput = document.querySelector('#quoteProduct');

  function openQuoteModal(productName = '') {
    if (modal) {
      if (modalProductInput) {
        modalProductInput.value = productName || 'General Security Equipment Inquiry';
      }
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeQuoteModal() {
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.open-quote-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = btn.dataset.product || btn.closest('.product-card')?.querySelector('.product-card-title')?.textContent || '';
      openQuoteModal(product.trim());
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeQuoteModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeQuoteModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuoteModal();
      closeDrawer();
    }
  });

  // 6. Form Submission Handling (with Toast Notification)
  const forms = document.querySelectorAll('.ajax-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      // Let it submit naturally if send_form_email.php is handling POST, or provide nice feedback
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = 'Submitting...';
        submitBtn.disabled = true;
      }
    });
  });

  // 7. Interactive Map Location Switcher
  const mapIframe = document.querySelector('#locationMap');
  const locationCards = document.querySelectorAll('.location-card[data-map]');

  locationCards.forEach(card => {
    card.addEventListener('click', () => {
      locationCards.forEach(c => c.classList.remove('active-location'));
      card.classList.add('active-location');
      const mapSrc = card.dataset.map;
      if (mapIframe && mapSrc) {
        mapIframe.src = mapSrc;
      }
    });
  });

  // 8. Tasteful Viewport Scroll Reveal Animations
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll(
      '.section-header, .category-card, .service-card, .product-card, .industry-card, .video-card, .location-card, .form-card, .about-visual, .about-content, .brand-logo-item'
    );

    revealTargets.forEach(el => {
      el.classList.add('reveal-on-scroll');
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    revealTargets.forEach(el => revealObserver.observe(el));
  }
});
