import {getObjectAd} from './object.js';  

const NUMBER_OF_OBJECTS = 10;

const getArray = () => {
  let array = [];
  for(let i = 0; i < NUMBER_OF_OBJECTS; i++) {
    array.push(getObjectAd());
  }    return array;
};

export {getArray};