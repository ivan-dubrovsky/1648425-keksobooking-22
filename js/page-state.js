import {TOKIO_CENTER} from './map.js';
import { userForm } from './event-listeners.js'; 
import {setMinValuesForTypes, setCheckTime, titleValidity, capacityAndRoomsValidity} from './forms.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const filterSelect = mapFilters.querySelectorAll('select'); 
const fieldsetBlock =  adForm.querySelectorAll('fieldset');
const addressBlock = document.querySelector('#address');


//Переводим страницу в неактивное состояние
const deactivatePage = () => {
  filterSelect.forEach((select) => {
    select.setAttribute('disabled', 'disabled')
  })
  mapFilters.querySelector('fieldset').setAttribute('disabled', 'disabled')
  mapFilters.classList.add('map__filters--disabled')
  fieldsetBlock.forEach((block) => {
    block.setAttribute('disabled', 'disabled')
  })
  adForm.classList.add('ad-form--disabled')
}

// Переводим страницу в активное состояние
const activatePage = (status) => {
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
    addressBlock.value = [TOKIO_CENTER.x.toFixed(5), TOKIO_CENTER.y.toFixed(5)];
    setMinValuesForTypes();
    setCheckTime();
    titleValidity()
    capacityAndRoomsValidity()
  }
}


// Функция очистки полей и установки значений по умолчанию в поле адрес
const cleanFields = () => {
  userForm.reset();
  addressBlock.value = `${TOKIO_CENTER.x.toFixed(5)},${TOKIO_CENTER.y.toFixed(5)}`
}


export {activatePage, deactivatePage, addressBlock, cleanFields}