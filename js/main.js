(function () {
  'use strict';

  var header = document.getElementById('header');
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  var navLinks = document.querySelectorAll('.header__nav-link');

  function toggleMenu() {
    burger.classList.toggle('active');
    nav.classList.toggle('open');
  }

  function closeMenu() {
    burger.classList.remove('active');
    nav.classList.remove('open');
  }

  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  function handleNavClick(e) {
    e.preventDefault();
    var targetId = this.getAttribute('href').substring(1);
    var target = document.getElementById(targetId);
    if (target) {
      var offset = header.offsetHeight;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
    closeMenu();
  }

  if (burger && nav) {
    burger.addEventListener('click', toggleMenu);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', handleNavClick);
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  document.addEventListener('click', function (e) {
    if (nav && nav.classList.contains('open') && !nav.contains(e.target) && !burger.contains(e.target)) {
      closeMenu();
    }
  });

  var statNumbers = document.querySelectorAll('.hero__stat-num[data-count]');
  var animated = false;

  function animateNumbers() {
    if (animated) return;
    var heroContent = document.querySelector('.hero__content');
    if (!heroContent) return;
    var rect = heroContent.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    animated = true;

    statNumbers.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'));
      var current = 0;
      var increment = Math.ceil(target / 60);
      var timer = setInterval(function () {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current + (el.getAttribute('data-count') === '98' ? '%' : '+');
      }, 30);
    });
  }

  function checkStats() {
    if (!animated) {
      animateNumbers();
    }
  }

  window.addEventListener('scroll', checkStats, { passive: true });
  setTimeout(checkStats, 500);

  var revealElements = document.querySelectorAll('[data-aos]');

  function checkReveal() {
    revealElements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }

  revealElements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
    var delay = el.getAttribute('data-aos-delay');
    if (delay) {
      el.style.transitionDelay = delay + 'ms';
    }
  });

  window.addEventListener('scroll', checkReveal, { passive: true });
  setTimeout(checkReveal, 300);

  var faqItems = document.querySelectorAll('.faq__question');
  faqItems.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      faqItems.forEach(function (item) {
        item.setAttribute('aria-expanded', 'false');
      });
      if (!expanded) {
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  window.__mainTest = {
    animateNumbers: animateNumbers,
  };
})();
