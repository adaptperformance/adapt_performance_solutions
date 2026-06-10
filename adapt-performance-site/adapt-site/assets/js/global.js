/* ============================================
   ADAPT PERFORMANCE SOLUTIONS — GLOBAL JS
   Nav active states, scroll behaviors, shared
   interactive components
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── ACTIVE NAV LINK based on current page ──
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage && linkPage === currentPage) {
      link.classList.add('active');
    }
  });

  // ── STICKY NAV shadow on scroll ──
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 4px 32px rgba(0,0,0,0.5)'
        : 'none';
    }, { passive: true });
  }

  // ── FAQ ACCORDION ──
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', function () {
      const item = this.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── FAQ SEARCH ──
  const faqSearch = document.getElementById('faq-search');
  if (faqSearch) {
    faqSearch.addEventListener('input', function () {
      const term = this.value.toLowerCase().trim();
      document.querySelectorAll('.faq-item').forEach(item => {
        const q = item.querySelector('.faq-q-text');
        const a = item.querySelector('.faq-a-inner');
        const visible = !term
          || (q && q.textContent.toLowerCase().includes(term))
          || (a && a.textContent.toLowerCase().includes(term));
        item.style.display = visible ? 'block' : 'none';
      });
    });
  }

  // ── FAQ SIDEBAR SCROLL HIGHLIGHT ──
  const faqGroups = ['kits', 'orders', 'returns', 'install'];
  if (faqGroups.some(id => document.getElementById(id))) {
    window.addEventListener('scroll', () => {
      let current = faqGroups[0];
      faqGroups.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      });
      document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
      const active = document.getElementById('nav-' + current);
      if (active) active.classList.add('active');
    }, { passive: true });
  }

  // ── CHASSIS FILTER (all-chassis page) ──
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      const make = this.dataset.make || 'all';
      document.querySelectorAll('.make-section').forEach(s => {
        s.style.display = (make === 'all' || s.id === 'make-' + make) ? 'block' : 'none';
      });
    });
  });

  // ── SERVICE KITS FILTER CHIPS ──
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', function () {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ── STICKY TIER / CAT NAV scroll highlight ──
  function setupStickyNavHighlight(sectionIds, tabSelector, hrefPrefix) {
    const tabs = document.querySelectorAll(tabSelector);
    if (!tabs.length) return;
    window.addEventListener('scroll', () => {
      let current = sectionIds[0];
      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      });
      tabs.forEach(t => {
        t.classList.remove('active');
        if (t.getAttribute('href') === (hrefPrefix || '#') + current) {
          t.classList.add('active');
        }
      });
    }, { passive: true });
  }

  // Chassis page tier nav
  setupStickyNavHighlight(['kits','brake','drivetrain','master'], '.tier-tab', '#');
  // Fluids cat nav
  setupStickyNavHighlight(['engine-oil','gear-oil','brake-fluid','additives','coolant'], '.cat-tab', '#');

  // ── ENGINE SPEC TAB SWITCHER (chassis pages) ──
  window.switchEngine = function (engine, btn) {
    document.querySelectorAll('.engine-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.spec-data-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('panel-' + engine);
    if (panel) panel.classList.add('active');
  };

  // ── CHASSIS PAGE MAKE FILTER (inline, all-chassis page) ──
  window.filterMake = function (make, btn) {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.make-section').forEach(s => {
      s.style.display = (make === 'all' || s.id === 'make-' + make) ? 'block' : 'none';
    });
  };

  // ── CONTACT FORM SUBMIT ──
  window.submitForm = function () {
    const fname   = document.getElementById('fname');
    const email   = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    if (!fname || !email || !subject || !message) return;
    if (!fname.value.trim() || !email.value.trim() || !subject.value || !message.value.trim()) {
      alert('Please fill in all required fields before sending.');
      return;
    }
    const form = document.getElementById('contact-form');
    const success = document.getElementById('form-success');
    if (form) form.style.display = 'none';
    if (success) success.style.display = 'block';
    window.scrollTo({ top: success.offsetTop - 100, behavior: 'smooth' });
  };

  // ── BRANDS TICKER (pause on hover) ──
  const track = document.querySelector('.brands-track');
  if (track) {
    track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
  }

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
  }

  // ── NOTIFY ME buttons (placeholder) ──
  document.querySelectorAll('.btn-notify').forEach(btn => {
    btn.addEventListener('click', function () {
      this.textContent = '✓ You\'re on the list';
      this.style.color = 'var(--accent)';
      this.style.borderColor = 'var(--accent)';
      this.disabled = true;
    });
  });

});
