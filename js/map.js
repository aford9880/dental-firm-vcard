(function () {
  'use strict';

  function initMap() {
    var mapContainer = document.getElementById('map');
    if (!mapContainer || typeof L === 'undefined') return;

    if (mapContainer._leafletMap) return;

    var map = L.map('map', {
      center: [55.7522, 37.5876],
      zoom: 15,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map);

    var markerIcon = L.divIcon({
      className: 'custom-marker',
      html: '<svg width="36" height="44" viewBox="0 0 24 36" fill="none"><path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 24 12 24s12-15 12-24C24 5.37 18.63 0 12 0z" fill="#0d47a1"/><circle cx="12" cy="12" r="5" fill="#00bcd4"/></svg>',
      iconSize: [36, 44],
      iconAnchor: [18, 44],
      popupAnchor: [0, -44]
    });

    var marker = L.marker([55.7522, 37.5876], { icon: markerIcon }).addTo(map);
    marker.bindPopup('<b>DentalCare</b><br>ул. Новый Арбат, д. 15');

    setTimeout(function () {
      map.invalidateSize();
    }, 300);

    mapContainer._leafletMap = map;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
  } else {
    initMap();
  }

  window.__mapTest = {
    initMap: initMap
  };
})();
