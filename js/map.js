/* global L:readonly */
import {activatePage, addressBlock} from './page-state.js'
import {getTemplateMarkup} from './ad-markup-generator.js';
import { getSimilarAds } from './similar-ads.js';

//Центр Токио
const TOKIO_CENTER = {
  x: 35.67949339551154,
  y: 139.75235328394038,
}
const map = L.map('map');

const moveMarker = (marker) => {
  marker.on('move', (evt) => {
    addressBlock.value = [evt.target.getLatLng().lat.toFixed(5), evt.target.getLatLng().lng.toFixed(5)];
    addressBlock.setAttribute('disabled', 'disabled')
  });
}

// Добавляем главный маркер на карту
const getMainMarker = () => {
  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  const mainMarker = L.marker(
    {
      lat:  35.67949339551154,
      lng: 139.75235328394038,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  moveMarker(mainMarker);
  mainMarker.addTo(map)
}

//Добавляем точки объявлений
const getAdvertisingMarkers = (adsArray) => {
  adsArray.forEach((ad) => {
    const {location} = ad
    const pinIcon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const marker = L.marker(
      {
        lat: location.x,
        lng: location.y,
      },
      {
        pinIcon,
      },
    );
    
    marker
      .addTo(map)
      .bindPopup(getTemplateMarkup())
  });
}


//Отображение карты
const showMap = () => {
  map.on('load', () => {
    status === true
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
  getMainMarker();
  getAdvertisingMarkers(getSimilarAds())
}
  
export {showMap, TOKIO_CENTER}