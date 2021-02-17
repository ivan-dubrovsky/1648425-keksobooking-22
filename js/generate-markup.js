import {getSimilarAds} from './similar-ads.js';
import {getDeclension} from './utils.js'

const ROOMS_WORDS = ['комната', 'комнаты', 'комнат'];
const GUESTS_WORDS = ['гостя', 'гостей', 'гостей'];

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
  
const getIcons = (featuresArray) => {
  let features = [];
  for (let i = 0; i < featuresArray.length; i++) {
    const getIcon = (feature) => {
      let featuresClass =`<li class="popup__feature popup__feature--${feature}"></li>`;
      return featuresClass
    }
    features += getIcon(featuresArray[i]);
  } return features
}
  
const createTextRoomsForGuests = (value, words) => {
  return `${value} ${getDeclension(value, words)}`;
}

const cardTemplate = document.querySelector('#card').content;
const mapBlock = document.querySelector('.map__canvas');
const similarAdsList = getSimilarAds();
const similarAdFragment = document.createDocumentFragment();
const generateMarkup = () => {
  similarAdsList.forEach((ad) => {
    const offerElement = cardTemplate.cloneNode(true);
    offerElement.querySelector('.popup__title').textContent = ad.offer.title;
    offerElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    offerElement.querySelector('.popup__text--price').innerHTML = `${ad.offer.price} &#x20bd;/ночь`;
    offerElement.querySelector('.popup__type').textContent = translateType(ad.offer.type);
    offerElement.querySelector('.popup__text--capacity').textContent = 
        `${createTextRoomsForGuests(ad.offer.rooms, ROOMS_WORDS)}
         для ${createTextRoomsForGuests(ad.offer.guests, GUESTS_WORDS)}`;
    offerElement.querySelector('.popup__text--time').textContent = 
        `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`; 
    offerElement.querySelector('.popup__features').innerHTML = '';
    offerElement.querySelector('.popup__features').innerHTML = getIcons(ad.offer.features);
    offerElement.querySelector('.popup__description').textContent = ad.offer.description;
    offerElement.querySelector('.popup__avatar').src = ad.author.avatar
    //Добавляем фото на страницу
    const cardPhoto = offerElement.querySelector('.popup__photos');
    const cardPhotoItem = cardPhoto.querySelector('img');
    if (ad.offer.photos.length === 0) {
      cardPhotoItem.style.display = 'none';
    }
    if (ad.offer.photos.length >= 1) {
      ad.offer.photos.forEach((obj, index) => {
        if (index === 0) {
          cardPhotoItem.src = obj;
        } else {
          const cardPhotos = cardPhotoItem.cloneNode(true);
          cardPhotos.src = obj;
          cardPhoto.appendChild(cardPhotos);
        }
      });
    }
    similarAdFragment.appendChild(offerElement)
  })
  mapBlock.appendChild(similarAdFragment.firstElementChild)
}

export {generateMarkup};