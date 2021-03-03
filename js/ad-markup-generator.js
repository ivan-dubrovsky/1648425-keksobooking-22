// import { getAd } from './ad-description.js';
import {translateType, createTextRoomsForGuests} from './utils.js'

const ROOMS_WORDS = ['комната', 'комнаты', 'комнат'];
const GUESTS_WORDS = ['гостя', 'гостей', 'гостей']

const getAdPhotos = (template, ad) => {
  const cardPhoto = template.querySelector('.popup__photos');
  const cardPhotoItem = cardPhoto.querySelector('img');
  if (ad.offer.photos.length === 0) {
    cardPhoto.style.display = 'none';
  }
  if (ad.offer.photos.length > 0) {
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
  
// Функция для генерации разметки объявления
const getTemplateMarkup = (ad) => {
  const cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');
  const offerMarkup = cardTemplate.cloneNode(true);
  offerMarkup.querySelector('.popup__title').textContent = ad.offer.title;
  offerMarkup.querySelector('.popup__text--address').textContent = ad.offer.address;
  offerMarkup.querySelector('.popup__text--price').innerHTML = `${ad.offer.price} &#x20bd;/ночь`;
  offerMarkup.querySelector('.popup__type').textContent = translateType(ad.offer.type);
  offerMarkup.querySelector('.popup__text--capacity').textContent = 
            `${createTextRoomsForGuests(ad.offer.rooms, ROOMS_WORDS)}
             для ${createTextRoomsForGuests(ad.offer.guests, GUESTS_WORDS)}`;
  offerMarkup.querySelector('.popup__text--time').textContent = 
            `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`; 
  (ad.offer.features.length === 0) ? offerMarkup.querySelector('.popup__features').style.display = 'none' :
    offerMarkup.querySelector('.popup__features').innerHTML = getFeaturesIcons(ad.offer.features);
  offerMarkup.querySelector('.popup__description').textContent = ad.offer.description;
  offerMarkup.querySelector('.popup__avatar').src = ad.author.avatar
  getAdPhotos(offerMarkup, ad)
  return offerMarkup
}

export {getTemplateMarkup};