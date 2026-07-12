/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

function advanceTransition() {
  jest.advanceTimersByTime(500);
}

describe('Slider', () => {
  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    document.documentElement.innerHTML = html;

    jest.useFakeTimers();
    require('../js/slider.js');
  });

  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('initialization', () => {
    test('creates the correct number of dots', () => {
      const dots = document.querySelectorAll('.slider__dot');
      const slides = document.querySelectorAll('.slider__slide');
      expect(dots.length).toBe(slides.length);
    });

    test('first dot is active initially', () => {
      const firstDot = document.querySelector('.slider__dot:first-child');
      expect(firstDot.classList.contains('active')).toBe(true);
    });
  });

  describe('navigation', () => {
    test('goTo navigates to the correct slide', () => {
      window.__sliderTest.goTo(2);
      advanceTransition();
      expect(window.__sliderTest.getCurrentIndex()).toBe(2);
    });

    test('next advances the slide', () => {
      window.__sliderTest.goTo(0);
      advanceTransition();
      window.__sliderTest.next();
      advanceTransition();
      expect(window.__sliderTest.getCurrentIndex()).toBe(1);
    });

    test('prev goes back a slide', () => {
      window.__sliderTest.goTo(1);
      advanceTransition();
      window.__sliderTest.prev();
      advanceTransition();
      expect(window.__sliderTest.getCurrentIndex()).toBe(0);
    });

    test('next wraps to first slide from last', () => {
      const last = window.__sliderTest.getTotalSlides() - 1;
      window.__sliderTest.goTo(last);
      advanceTransition();
      window.__sliderTest.next();
      advanceTransition();
      expect(window.__sliderTest.getCurrentIndex()).toBe(0);
    });

    test('prev wraps to last slide from first', () => {
      window.__sliderTest.goTo(0);
      advanceTransition();
      window.__sliderTest.prev();
      advanceTransition();
      const last = window.__sliderTest.getTotalSlides() - 1;
      expect(window.__sliderTest.getCurrentIndex()).toBe(last);
    });
  });

  describe('dots', () => {
    test('clicking a dot navigates to that slide', () => {
      const dots = document.querySelectorAll('.slider__dot');
      dots[2].click();
      advanceTransition();
      expect(window.__sliderTest.getCurrentIndex()).toBe(2);
    });

    test('active dot updates after navigation', () => {
      window.__sliderTest.goTo(0);
      advanceTransition();
      window.__sliderTest.next();
      advanceTransition();
      const activeDot = document.querySelector('.slider__dot.active');
      expect(activeDot.dataset.index).toBe('1');
    });
  });
});
