import {getAd} from './ad-description.js';  

const NUMBER_OF_OBJECTS = 10;

const getSimilarAds = () => {
  let array = [];
  for(let i = 0; i < NUMBER_OF_OBJECTS; i++) {
    array.push(getAd());
  }    return array;
};

export {getSimilarAds};