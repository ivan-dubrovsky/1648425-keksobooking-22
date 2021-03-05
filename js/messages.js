import {onClickRemove, onKeyRemove} from './event-listeners.js'

const ERROR_MESSAGE = document.querySelector('#error').content.querySelector('.error');
const SUCCESS_MESSAGE = document.querySelector('#success').content.querySelector('.success');

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
  SUCCESS_MESSAGE.style.zIndex = 1000;
  document.body.append(SUCCESS_MESSAGE)
  onClickRemove(SUCCESS_MESSAGE)
  onKeyRemove(SUCCESS_MESSAGE)
}

// Сообщение об ошибке при отправке данных
const addErrorMessage = () => {
  ERROR_MESSAGE.style.zIndex = 1000;
  document.body.append(ERROR_MESSAGE)
  onClickRemove(ERROR_MESSAGE)
  onKeyRemove(ERROR_MESSAGE)
}

export {showAlert, addErrorMessage, addSuccessMessage}