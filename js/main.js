const getInteger = (min, max) => {
  if (max <= min || max <= 0 || min < 0) {
    return 'Некорректный ввод'
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getArbitraryNumber = (min, max, decimalPlaces) => {
  if (max <= min || max <= 0 || min < 0) {
    return 'Некорректный ввод'
  }
  return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
}
getInteger();
getArbitraryNumber()



const getObject = () => {
  const typesArray = ['palace', 'flat', 'house', 'bungalow'];
  const checkinArray = ['12:00', '13:00', '14:00'];
  const checkoutArray = ['12:00', '13:00', '14:00'];
  const featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const photosArray = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  const location = {
    x: getArbitraryNumber(35.65000, 35.70000, 5),
    y: getArbitraryNumber(139.70000, 139.80000, 5),
  };
  const getRandomArrayElement = (elements) => {
    return elements[getInteger(0, elements.length -1)]
  }
  return {
    author: {avatar: 'img/avatars/user' + '0' + getInteger(1, 8) + '.png'},
    offer: {
      title: 'Заголовок',
      address: location.x + ', ' + location.y,
      price: getInteger(2000, 5000),
      type: getRandomArrayElement(typesArray),
      rooms: getInteger(1, 5),
      guests: getInteger(1, 5),
      checkin: getRandomArrayElement(checkinArray),
      checkout: getRandomArrayElement(checkoutArray),
      features: featuresArray.slice(getInteger(0, featuresArray.length -1 )),
      description: 'Описание помещения',
      photos: photosArray.slice(getInteger(0, photosArray.length -1 )),
    },
    location: {
      x: location.x,
      y: location.y,
    },
  }
};
getObject();

const NUMBER_OF_OBJECTS = 10;
const getArray = () => {
  let array = [];
  for(let i = 0; i < NUMBER_OF_OBJECTS; i++) {
    array.push(getObject());
  } return array;
};
getArray();
