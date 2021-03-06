const MIN_LENGTH = 30;
const MAX_LENGTH = 100;

const roomNumber = document.querySelector('#room_number')
const capacity = document.querySelector('#capacity')
const price = document.querySelector('#price')

const titleValidity = () => {
  const titleInput = document.querySelector('#title')
  titleInput.addEventListener('input', () => {
    const valueLength = titleInput.value.length;
    if (valueLength < MIN_LENGTH) {
      titleInput.setCustomValidity('Ещё ' + (MIN_LENGTH - valueLength) +' симв.');
    } else if (valueLength > MAX_LENGTH) {
      titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_LENGTH) +' симв.');
    } else {
      titleInput.setCustomValidity('')
    }
    titleInput.reportValidity()
  })
}

//Проверяем цену
const priceValidity = (cost) => {
  price.addEventListener('input', () => {
    const priceValue = price.value;
    (priceValue < cost) ? price.setCustomValidity(`Минимальная цена для этого типа жилья: ${price.min} руб.`) :
      price.setCustomValidity('');
    price.reportValidity();
  });
}

//Устанавливаем минимальную цену и placeholder
const setMinValuesForTypes = () => {
  const type = document.querySelector('#type')

  const setPrice = (cost) => {
    price.min = cost;
    price.placeholder = String(cost);
    price.value = '';
    priceValidity(cost)
  }
  setPrice(1000)
  
  type.addEventListener('change', (evt) => {
    switch (evt.target.value) {
      case 'bungalow':
        setPrice(0)
        break;
      case 'flat':
        setPrice(1000)
        break;
      case 'house':
        setPrice(5000)
        break;
      case 'palace':
        setPrice(10000)
        break;
    }
  })
}

//Синхронизируем время въезда и выезда
const setCheckTime = () => {
  const checkInTime = document.querySelector('#timein')
  const checkOutTime = document.querySelector('#timeout')
    
  checkInTime.addEventListener('change', (evt) => {
    checkOutTime.value = evt.target.value
  })
  checkOutTime.addEventListener('change', (evt) => {
    checkInTime.value = evt.target.value
  })
}
  
// Валидация кол-ва гостей и комнат
const disableElement = (element) => {
  element.setAttribute('disabled', 'disabled')
};

const enableElement = (element) => {
  element.removeAttribute('disabled', 'disabled')
}

const disableElements = (element, elementNumbers) => {
  elementNumbers.forEach((elementNumber) => {
    disableElement(element[elementNumber])
  })
}

const enableElements = (element, elementNumbers) => {
  elementNumbers.forEach((elementNumber) => {
    enableElement(element[elementNumber])
  })
}

const capacityAndRoomsValidity = () => {
  roomNumber.setAttribute('disabled', 'disabled')
  capacity.addEventListener('change', (evt) => {
    roomNumber.removeAttribute('disabled', 'disabled')
    switch (evt.target.value) {
      case '1':
        enableElements(roomNumber, ['0', '1', '2'])
        disableElement(roomNumber[3])
        roomNumber.value = capacity.value
        break;
      case '2':
        disableElements(roomNumber, ['0', '3'])
        enableElement(roomNumber[1])
        roomNumber.value = capacity.value
        break;
      case '3':
        disableElements(roomNumber, ['0', '1', '3'])
        enableElement(roomNumber[2])
        roomNumber.value = capacity.value
        break;
      case '0':
        disableElements(roomNumber, ['0', '1', '2'])
        enableElement(roomNumber[3])
        roomNumber.value = '100'
        break;
    }
  })
}

export {setMinValuesForTypes, setCheckTime, titleValidity, capacityAndRoomsValidity}