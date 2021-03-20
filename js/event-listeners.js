import {cleanFields} from './page-state.js';
import {sendData} from './data.js';
import { createMainMarker} from './map.js';
import {resetFilter} from './filter.js'

const cleanButton = document.querySelector('.ad-form__reset')
const userForm = document.querySelector('.ad-form')

const setUserFormSubmit = () => {
  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(formData)
  });
};

// Функция удаления элемента по клику
const onClickRemove = (errorMessage) => {
  document.body.addEventListener('mousedown', () => {
    errorMessage.remove();
  })
}
  
// Функция удаления элемента по нажатию ESC
const onKeyRemove = (errorMessage) => {
  document.body.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      errorMessage.remove();
    }
  })
};


// Функция очистки всех поле по клику на "Очистить"
const onClickClearButton = (cb) => {
  cleanButton.addEventListener('click', (evt) => {
    evt.preventDefault()
    cb()
  })
}

const clearForms = () => {
  cleanFields()
}

onClickClearButton(clearForms)

const clearFilters = () => {
  let marker = createMainMarker()
  cleanButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    marker.remove()
    marker = createMainMarker()
    resetFilter()
  })
}
clearFilters()

export {onClickRemove, onKeyRemove, setUserFormSubmit, userForm}