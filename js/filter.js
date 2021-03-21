/* global _:readonly */
import {createAdvertisingMarkers, removeMarkers} from './map.js'

const DEFAULT_TYPE = 'any'
const PRICE_VALUES = {
  'min': 10000,
  'max': 50000,
}
const ADS_COUNT = {
  'min': 0,
  'max': 10,
}
const RERENDER_DELAY = 500

const mapFilters = document.querySelector('.map__filters');
const typeInput = mapFilters.querySelector('#housing-type')
const priceInput = mapFilters.querySelector('#housing-price')
const roomsInput = mapFilters.querySelector('#housing-rooms')
const guestsInput = mapFilters.querySelector('#housing-guests')
const featuresInput = mapFilters.querySelector('#housing-features')


const setAdsFilter = (input, ad, dataType) => {
  return (input.value === DEFAULT_TYPE || ad === dataType(input.value)) 
}

const setPriceFilter = (ad) => {
  switch (priceInput.value) {
    case 'low':
      return (ad <= PRICE_VALUES.min);
    case 'high':
      return (ad >= PRICE_VALUES.max);
    case 'middle':
      return (ad > PRICE_VALUES.min && ad < PRICE_VALUES.max);
    default:
      return (priceInput.value === DEFAULT_TYPE);
  }
}

const getMatchesCount = (arrayA, arrayB) => {
  return arrayA.filter(element => arrayB.includes(element)).length
}

const setFeaturesFilter = (ad) => {
  const selectedCheckbox = featuresInput.querySelectorAll('input:checked');
  const featuresFilterValues = [];
  selectedCheckbox.forEach((element) => {
    featuresFilterValues.push(element.value)
  });
  const matchesCount = getMatchesCount(ad, featuresFilterValues);
  return (featuresFilterValues.length === 0 || featuresFilterValues.length === matchesCount);
}

const getFilteredAds = (ads) => {
  return ads
    .filter((ad) => (
      ((setAdsFilter(typeInput, ad.offer.type, String)) &&
      (setAdsFilter(roomsInput, ad.offer.rooms, Number)) &&
      (setAdsFilter(guestsInput, ad.offer.guests, Number)) &&
      (setPriceFilter(ad.offer.price)) &&
      (setFeaturesFilter(ad.offer.features)))
    ))
}

const getArraySlice = (array) => {
  array.slice(ADS_COUNT.min, ADS_COUNT.max)
} 

const showFilteredAdsMarkers = (ads) => {
  let markers = createAdvertisingMarkers(ads)
  mapFilters.addEventListener('reset', () => {
    removeMarkers(markers)
    markers = createAdvertisingMarkers(ads)
  })
  mapFilters.addEventListener('change', _.debounce(evt => {
    removeMarkers(markers)
    const filteredAds = getFilteredAds(ads, evt.target);
    getArraySlice(filteredAds)
    markers = createAdvertisingMarkers(filteredAds)
  }, RERENDER_DELAY))
}

const resetFilter = () => {
  mapFilters.reset();
};


export {showFilteredAdsMarkers, resetFilter}