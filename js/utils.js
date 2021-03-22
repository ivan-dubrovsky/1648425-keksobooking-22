const getArbitraryNumber = (min, max, decimalPlaces) => {
  if (max <= min || max <= 0 || min < 0) {
    return 'Некорректный ввод'
  }
  return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
};

const getInteger = (min, max) => {
  if (max <= min || max <= 0 || min < 0) {
    return 'Некорректный ввод'
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Функция для склонения числительных
const getDeclension = (value, words) => {  
  value = Math.abs(value) % 100; 
  let num = value % 10;
  if(value > 10 && value < 20) {
    return words[2];
  } 
  if(num > 1 && num < 5) {
    return words[1];
  }
  if(num === 1) {
    return words[0];
  } 
  return words[2];
}

const createTextRoomsForGuests = (value, words) => {
  return `${value} ${getDeclension(value, words)}`;
}

const translateType = (type) => {
  switch (type) {
    case 'palace':
      return 'Дворец'
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    default:
      return type;
  }
}


export {getInteger, getDeclension, getArbitraryNumber, translateType, createTextRoomsForGuests};