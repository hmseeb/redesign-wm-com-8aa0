/* =========================================================
   WM Los Angeles — Commercial Waste Service
   Interactions: mobile nav, tabs, accordions, scrollspy,
   sticky header state, back-to-top.
   ========================================================= */
(function () {
  'use strict';

  var doc = document;

  /* ---------------- Mobile navigation ---------------- */
  var masthead = doc.getElementById('masthead');
  var burger = doc.getElementById('burger');
  var nav = doc.getElementById('primary-nav');

  function closeMenu() {
    if (!masthead || !burger) return;
    masthead.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
  }

  function toggleMenu() {
    if (!masthead || !burger) return;
    var open = masthead.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (burger) {
    burger.addEventListener('click', toggleMenu);
  }

  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });
  }

  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  doc.addEventListener('click', function (e) {
    if (!masthead || !masthead.classList.contains('is-open')) return;
    if (!e.target.closest('#masthead')) closeMenu();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1040) closeMenu();
  });

  /* ---------------- Sticky header shadow + back to top ---------------- */
  var toTop = doc.getElementById('totop');

  function onScroll() {
    var y = window.pageYOffset || doc.documentElement.scrollTop;
    if (masthead) masthead.classList.toggle('is-stuck', y > 8);
    if (toTop) toTop.hidden = y < 600;
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      onScroll();
      ticking = false;
    });
  }, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------- Service guide tabs ---------------- */
  var tabWrap = doc.getElementById('tabs');

  function activateTab(btn, setFocus) {
    if (!tabWrap || !btn) return;
    var buttons = Array.prototype.slice.call(tabWrap.querySelectorAll('.tabs__btn'));
    var panes = Array.prototype.slice.call(tabWrap.querySelectorAll('.tabs__pane'));

    buttons.forEach(function (b) {
      var active = b === btn;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-selected', active ? 'true' : 'false');
      if (active) {
        b.removeAttribute('tabindex');
      } else {
        b.setAttribute('tabindex', '-1');
      }
    });

    var targetId = btn.getAttribute('aria-controls');
    panes.forEach(function (p) {
      var active = p.id === targetId;
      p.classList.toggle('is-active', active);
      if (active) {
        p.removeAttribute('hidden');
      } else {
        p.setAttribute('hidden', '');
      }
    });

    if (setFocus) btn.focus();
  }

  if (tabWrap) {
    var tabButtons = Array.prototype.slice.call(tabWrap.querySelectorAll('.tabs__btn'));

    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activateTab(btn, false);
      });
    });

    tabWrap.addEventListener('keydown', function (e) {
      var current = doc.activeElement;
      if (!current || !current.classList || !current.classList.contains('tabs__btn')) return;
      var i = tabButtons.indexOf(current);
      if (i < 0) return;
      var next = null;

      if (e.key === 'ArrowRight') next = tabButtons[(i + 1) % tabButtons.length];
      else if (e.key === 'ArrowLeft') next = tabButtons[(i - 1 + tabButtons.length) % tabButtons.length];
      else if (e.key === 'Home') next = tabButtons[0];
      else if (e.key === 'End') next = tabButtons[tabButtons.length - 1];

      if (next) {
        e.preventDefault();
        activateTab(next, true);
      }
    });

    /* Deep links from service cards, e.g. href="#guides" data-tab-link="organics" */
    Array.prototype.slice.call(doc.querySelectorAll('[data-tab-link]')).forEach(function (link) {
      link.addEventListener('click', function () {
        var key = link.getAttribute('data-tab-link');
        var btn = tabWrap.querySelector('.tabs__btn[data-tab="' + key + '"]');
        if (btn) activateTab(btn, false);
      });
    });
  }

  /* ---------------- Resource accordions ---------------- */
  var acc = doc.getElementById('acc');
  if (acc) {
    Array.prototype.slice.call(acc.querySelectorAll('.acc__btn')).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.acc__item');
        var panel = doc.getElementById(btn.getAttribute('aria-controls'));
        var open = btn.getAttribute('aria-expanded') === 'true';

        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        if (item) item.classList.toggle('is-open', !open);
        if (panel) {
          if (open) {
            panel.setAttribute('hidden', '');
          } else {
            panel.removeAttribute('hidden');
          }
        }
      });
    });
  }

  /* ---------------- Scroll spy for primary nav ---------------- */
  var navLinks = nav ? Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]')) : [];
  var sections = navLinks
    .map(function (a) { return doc.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-current', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------------- Reveal on scroll ---------------- */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealTargets = Array.prototype.slice.call(
    doc.querySelectorAll('.card, .myth, .mini-card, .panel, .acc__item, .contact__list li, .contact__card')
  );

  if (!reduceMotion && 'IntersectionObserver' in window && revealTargets.length) {
    revealTargets.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity .5s ease ' + ((i % 6) * 55) + 'ms, transform .5s ease ' + ((i % 6) * 55) + 'ms';
    });

    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------- Current year in footer legal ---------------- */
  // Content states © 2026 WM Intellectual Property Holdings, L.L.C. — left as authored.
})();
