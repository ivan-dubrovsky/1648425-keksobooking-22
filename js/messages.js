import {onClickRemove, onKeyRemove} from './event-listeners.js'

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

export {showAlert, addErrorMessage, addSuccessMessage}