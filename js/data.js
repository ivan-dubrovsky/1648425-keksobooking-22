import {cleanFields} from './page-state.js';
import {addErrorMessage, addSuccessMessage, showAlert} from './messages.js';
import {showMap, createAdvertisingMarkers} from './map.js';

// Отправляем данные 
const sendData = (data) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        cleanFields()
        addSuccessMessage()
      } 
      else {
        addErrorMessage();
      }
    })
    .catch(() => {
      addErrorMessage();
    });
}

const mapFilters = document.querySelector('.map__filters');
const houseInput = mapFilters.querySelector('#housing-type')


const typeFilter = (array, cb) => {
  houseInput.addEventListener('change', () => {
    const arrayFilter = array
      .filter((el) => el.offer.type === houseInput.value || el.offer.type === 'any')
    console.log(arrayFilter)
    cb(arrayFilter) 
  })

}
  
// Загружаем данные
const loadData = () => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((ads) => {
      typeFilter(ads, createAdvertisingMarkers)
      showMap(ads)
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные. Попробуйте ещё раз');
      showMap()
    });
}

export {sendData, loadData}