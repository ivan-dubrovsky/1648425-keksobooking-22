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
  const type = ['palace', 'flat', 'house', 'bungalow'];
  const checkin = ['12:00', '13:00', '14:00'];
  const checkout = ['12:00', '13:00', '14:00'];
  const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  const location = {
    x: getArbitraryNumber(35.65000, 35.70000, 5),
    y: getArbitraryNumber(139.70000, 139.80000, 5),
  };
  return {
    author: {avatar: 'img/avatars/user' + '0' + getInteger(1, 8) + '.png'},
    offer: {
      title: 'Заголовок',
      address: location.x + ', ' + location.y,
      price: getInteger(2000, 5000),
      type: type[getInteger(0, type.length -1)],
      rooms: getInteger(1, 5),
      guests: getInteger(1, 5),
      checkin: checkin[getInteger(0, checkin.length -1)],
      checkout: checkout[getInteger(0, checkout.length -1)],
      features: features.slice(getInteger(0, features.length -1 )),
      description: 'Описание помещения',
      photos: photos.slice(getInteger(0, photos.length -1 )),
    },
    location: {
      x: location.x,
      y: location.y,
    },
  }
};
getObject();