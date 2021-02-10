import {getInteger} from './integer.js';

const getRandomArrayElement = (elements) => {
  return elements[getInteger(0, elements.length -1)]
};

export {getRandomArrayElement};