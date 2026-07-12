/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Map', () => {
  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    document.documentElement.innerHTML = html;

    var mockMarker = {
      addTo: jest.fn().mockReturnThis(),
      bindPopup: jest.fn().mockReturnThis()
    };
    var mockTileLayer = {
      addTo: jest.fn().mockReturnThis()
    };
    var mockMap = {
      setView: jest.fn().mockReturnThis(),
      on: jest.fn(),
      invalidateSize: jest.fn(),
      remove: jest.fn()
    };

    global.L = {
      map: jest.fn().mockReturnValue(mockMap),
      tileLayer: jest.fn().mockReturnValue(mockTileLayer),
      divIcon: jest.fn().mockReturnValue({}),
      marker: jest.fn().mockReturnValue(mockMarker)
    };

    require('../js/map.js');
  });

  test('initializes Leaflet map on #map element', () => {
    const mapEl = document.getElementById('map');
    expect(mapEl).toBeTruthy();
    expect(global.L.map).toHaveBeenCalledWith('map', expect.objectContaining({
      center: [55.7522, 37.5876],
      zoom: 15
    }));
  });

  test('adds OpenStreetMap tile layer', () => {
    expect(global.L.tileLayer).toHaveBeenCalledWith(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      expect.objectContaining({ maxZoom: 19 })
    );
  });

  test('adds marker at clinic location', () => {
    expect(global.L.marker).toHaveBeenCalledWith(
      [55.7522, 37.5876],
      expect.any(Object)
    );
  });
});
