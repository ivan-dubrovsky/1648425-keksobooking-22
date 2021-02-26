/* global L:readonly */

import {getTemplateMarkup} from './ad-markup-generator.js';
import { getSimilarAds } from './similar-ads.js';

//Центр Токио
const TOKIO_CENTER = {
  x: 35.67949339551154,
  y: 139.75235328394038,
}
  
//Переводим страницу в неактивное состояние
const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const filterSelect = mapFilters.querySelectorAll('select');
filterSelect.forEach((select) => {
  select.setAttribute('disabled', 'disabled')
})
mapFilters.querySelector('fieldset').setAttribute('disabled', 'disabled')
mapFilters.classList.add('map__filters--disabled')
const fieldsetBlock =  adForm.querySelectorAll('fieldset');
fieldsetBlock.forEach((block) => {
  block.setAttribute('disabled', 'disabled')
})
adForm.classList.add('ad-form--disabled')

// Переводим страницу в активное состояние
const addressBlock = document.querySelector('#address');
const activityPage = (status) => {
  if (!status) {
    adForm.classList.remove('ad-form--disabled')   
    fieldsetBlock.forEach((block) => {
      block.removeAttribute('disabled', 'disabled')
      mapFilters.querySelector('fieldset').removeAttribute('disabled', 'disabled')
      mapFilters.classList.remove('map__filters--disabled')
      filterSelect.forEach((select) => {
        select.removeAttribute('disabled', 'disabled')
      })
    })
    addressBlock.value = [TOKIO_CENTER.x.toFixed(5), TOKIO_CENTER.y.toFixed(5)]
  }
}

//Отображение карты
const map = L.map('map')
const showMap = () => {
  map.on('load', () => {
    status === true
    activityPage()
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
  
// Добавляем главный маркер на карту
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
mainMarker.addTo(map)
  
mainMarker.on('move', (evt) => {
  addressBlock.value = [evt.target.getLatLng().lat.toFixed(5), evt.target.getLatLng().lng.toFixed(5)];
  addressBlock.setAttribute('disabled', 'disabled')
});
  
//Добавляем точки объявлений
getSimilarAds().forEach((ad) => {
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

export {showMap}