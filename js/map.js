/* global L:readonly */
import {activatePage, addressBlock} from './page-state.js'
import {getTemplateMarkup} from './ad-markup-generator.js';

//Центр Токио
const TOKIO_CENTER = {
  x: 35.67949339551154,
  y: 139.75235328394038,
}
const map = L.map('map');

const moveMarker = (marker) => {
  marker.on('move', (evt) => {
    addressBlock.value = [evt.target.getLatLng().lat.toFixed(5), evt.target.getLatLng().lng.toFixed(5)];
    addressBlock.readOnly = true;
  });
}


// Добавляем главный маркер на карту
const createMainMarker = () => {
  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  const mainMarker = L.marker(
    {
      lat:  TOKIO_CENTER.x,
      lng: TOKIO_CENTER.y,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  moveMarker(mainMarker);
  mainMarker.addTo(map)
  return mainMarker
}

//Добавляем точки объявлений
const createAdvertisingMarkers = (adsArray) => {
  const markers = [];
  if (adsArray) {
    adsArray.forEach((ad) => {
      const pinIcon = L.icon({
        iconUrl: 'img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });
      const marker = L.marker(
        {
          lat: ad.location.lat,
          lng: ad.location.lng,
        },
        {
          pinIcon,
        },
      );

      marker
        .addTo(map)
        .bindPopup(getTemplateMarkup(ad))
      markers.push(marker)
    }); 
  } return markers 
}

const removeMarkers = (markers) => {
  markers.forEach(marker => {
    marker.remove();
  });
}

//Отображение карты
const showMap = () => {
  map.on('load', () => {
    activatePage()
  })
    .setView({
      lat:  TOKIO_CENTER.x,
      lng: TOKIO_CENTER.y,
    }, 10);
  
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
}
  
export {showMap, TOKIO_CENTER, createAdvertisingMarkers, createMainMarker, moveMarker, removeMarkers}