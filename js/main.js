import {showMap, TOKIO_CENTER} from './map.js'
import {deactivatePage, addressBlock} from './page-state.js';
deactivatePage()


const userForm = document.querySelector('.ad-form')

const setUserFormSubmit = () => {
  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(formData)
  });

};

setUserFormSubmit()

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
loadData()


// Сообщение об ошибке
const ALERT_SHOW_TIME =  5000
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

// Сообщение об успешной отправке данных
const addSuccessMessage = () => {
  const successMessage = document.querySelector('#success').content.querySelector('.success');
  successMessage.style.zIndex = 1000;
  document.body.append(successMessage)
  onClickRemove(successMessage)
  onKeyRemove(successMessage)
}

// Сообщение об ошибке при отправке данных
const addErrorMessage = () => {
  const errorMessage = document.querySelector('#error').content.querySelector('.error');
  errorMessage.style.zIndex = 1000;
  document.body.append(errorMessage)
  onClickRemove(errorMessage)
  onKeyRemove(errorMessage)

}

// Функция удаления элемента по клику
const onClickRemove = (errorMessage) => {
  document.body.addEventListener('mousedown', (evt) => {
    evt.preventDefault()
    errorMessage.remove();
  })
}

const onKeyRemove = (errorMessage) => {
  document.body.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      errorMessage.remove();
    }
  })
};

// Функция очистки всех поле по клику на "Очистить" 
const cleanButton = document.querySelector('.ad-form__reset')
const cleanForm = () => {
  cleanButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cleanFields()
  })
}
cleanForm()

// Функция очистки полей и установки значений по умолчанию в поле адрес
const cleanFields = () => {
  userForm.reset();
  addressBlock.value = `${TOKIO_CENTER.x.toFixed(5)},${TOKIO_CENTER.y.toFixed(5)}`
}