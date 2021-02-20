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
  
const getAdPhotos = (template, offer) => {
  const cardPhoto = template.querySelector('.popup__photos');
  const cardPhotoItem = cardPhoto.querySelector('img');
  if (offer.photos.length === 0) {
    cardPhoto.style.display = 'none';
  }
  if (offer.photos.length > 0) {
    offer.photos.forEach((obj, index) => {
      if (index === 0) {
        cardPhotoItem.src = obj;
      } else {
        const cardPhotos = cardPhotoItem.cloneNode(true);
        cardPhotos.src = obj;
        cardPhoto.appendChild(cardPhotos);
      }
    });
  }
}

const getFeaturesIcons = (featuresArray) => {
  let features = [];
  for (let i = 0; i < featuresArray.length; i++) {
    const getFeatureIcon = (feature) => {
      const featuresClass =`<li class="popup__feature popup__feature--${feature}"></li>`;
      return featuresClass
    }
    features += getFeatureIcon(featuresArray[i]);
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
  similarAdsList.forEach(({author, offer}) => {
    const offerElement = cardTemplate.cloneNode(true);
    offerElement.querySelector('.popup__title').textContent = offer.title;
    offerElement.querySelector('.popup__text--address').textContent = offer.address;
    offerElement.querySelector('.popup__text--price').innerHTML = `${offer.price} &#x20bd;/ночь`;
    offerElement.querySelector('.popup__type').textContent = translateType(offer.type);
    offerElement.querySelector('.popup__text--capacity').textContent = 
        `${createTextRoomsForGuests(offer.rooms, ROOMS_WORDS)}
         для ${createTextRoomsForGuests(offer.guests, GUESTS_WORDS)}`;
    offerElement.querySelector('.popup__text--time').textContent = 
        `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`; 

    (offer.features.length === 0) ? offerElement.querySelector('.popup__features').style.display = 'none' :
      offerElement.querySelector('.popup__features').innerHTML = getFeaturesIcons(offer.features);

    offerElement.querySelector('.popup__description').textContent = offer.description;
    offerElement.querySelector('.popup__avatar').src = author.avatar
    getAdPhotos(offerElement, offer)

    similarAdFragment.appendChild(offerElement)
  })
  mapBlock.appendChild(similarAdFragment.firstElementChild)
}

export {generateMarkup};