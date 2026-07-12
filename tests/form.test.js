/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Form validation', () => {
  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    document.documentElement.innerHTML = html;

    require('../js/form.js');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateName', () => {
    test('returns true for valid names with 2+ characters', () => {
      expect(window.__formTest.validateName('Иван')).toBe(true);
      expect(window.__formTest.validateName('Анна-Мария')).toBe(true);
      expect(window.__formTest.validateName('A')).toBe(false);
    });

    test('returns false for empty or short names', () => {
      expect(window.__formTest.validateName('')).toBe(false);
      expect(window.__formTest.validateName(' ')).toBe(false);
      expect(window.__formTest.validateName('A')).toBe(false);
    });
  });

  describe('validatePhone', () => {
    test('returns true for valid phone numbers with 10+ digits', () => {
      expect(window.__formTest.validatePhone('+7 (999) 123-45-67')).toBe(true);
      expect(window.__formTest.validatePhone('89991234567')).toBe(true);
      expect(window.__formTest.validatePhone('79991234567')).toBe(true);
    });

    test('returns false for invalid phone numbers', () => {
      expect(window.__formTest.validatePhone('')).toBe(false);
      expect(window.__formTest.validatePhone('123')).toBe(false);
      expect(window.__formTest.validatePhone('abc')).toBe(false);
    });
  });

  describe('validateService', () => {
    test('returns true when a service is selected', () => {
      expect(window.__formTest.validateService('therapy')).toBe(true);
      expect(window.__formTest.validateService('implantation')).toBe(true);
    });

    test('returns false when no service is selected', () => {
      expect(window.__formTest.validateService('')).toBe(false);
      expect(window.__formTest.validateService(null)).toBe(false);
      expect(window.__formTest.validateService(undefined)).toBe(false);
    });
  });

  describe('formatPhone', () => {
    test('formats phone correctly', () => {
      expect(window.__formTest.formatPhone('9991234567')).toBe('+7 (999) 123-45-67');
      expect(window.__formTest.formatPhone('79991234567')).toBe('+7 (999) 123-45-67');
    });

    test('returns empty for empty input', () => {
      expect(window.__formTest.formatPhone('')).toBe('');
    });

    test('handles partial input', () => {
      expect(window.__formTest.formatPhone('999')).toBe('+7 (999');
      expect(window.__formTest.formatPhone('999123')).toBe('+7 (999) 123');
    });
  });
});
