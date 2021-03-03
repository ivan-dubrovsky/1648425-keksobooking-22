import {cleanFields} from './page-state.js';
import {addErrorMessage, addSuccessMessage, showAlert} from './messages.js';
import {showMap} from './map.js';

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
  
// Загружаем данные
const loadData = () => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((wizards) => {
      showMap(wizards)
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные. Попробуйте ещё раз');
      showMap()
    });
}

export {sendData, loadData}