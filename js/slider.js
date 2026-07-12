(function () {
  'use strict';

  var track = document.getElementById('sliderTrack');
  var slides = track ? track.querySelectorAll('.slider__slide') : [];
  var prevBtn = document.getElementById('sliderPrev');
  var nextBtn = document.getElementById('sliderNext');
  var dotsContainer = document.getElementById('sliderDots');

  if (!track || slides.length === 0) return;

  var currentIndex = 0;
  var totalSlides = slides.length;
  var autoplayTimer = null;
  var isTransitioning = false;

  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (var i = 0; i < totalSlides; i++) {
      var dot = document.createElement('button');
      dot.className = 'slider__dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Отзыв ' + (i + 1));
      dot.dataset.index = i;
      dot.addEventListener('click', function () {
        if (!isTransitioning) {
          goTo(parseInt(this.dataset.index));
        }
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    var dots = dotsContainer.querySelectorAll('.slider__dot');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goTo(index) {
    if (isTransitioning) return;
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    if (index === currentIndex) return;

    isTransitioning = true;
    currentIndex = index;
    track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
    updateDots();

    setTimeout(function () {
      isTransitioning = false;
    }, 500);
  }

  function next() {
    goTo(currentIndex + 1);
  }

  function prev() {
    goTo(currentIndex - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(next, 5000);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function init() {
    createDots();

    if (prevBtn) prevBtn.addEventListener('click', function () { stopAutoplay(); prev(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { stopAutoplay(); next(); });

    var sliderEl = document.getElementById('reviewsSlider');
    if (sliderEl) {
      sliderEl.addEventListener('mouseenter', stopAutoplay);
      sliderEl.addEventListener('mouseleave', startAutoplay);
    }

    var touchStartX = 0;
    var touchEndX = 0;
    var isSwiping = false;

    if (sliderEl) {
      sliderEl.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
        isSwiping = true;
        stopAutoplay();
      }, { passive: true });

      sliderEl.addEventListener('touchend', function (e) {
        if (!isSwiping) return;
        touchEndX = e.changedTouches[0].screenX;
        var diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) next();
          else prev();
        }
        isSwiping = false;
        startAutoplay();
      }, { passive: true });
    }

    startAutoplay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.__sliderTest = {
    goTo: goTo,
    next: next,
    prev: prev,
    getCurrentIndex: function () { return currentIndex; },
    getTotalSlides: function () { return totalSlides; }
  };
})();
