const GET_INTEGER = function(min, max) {
  if (max <= min || max <= 0 || min < 0) {
    return 'Некорректный ввод'
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const ARBITRARY_NUMBER = function(min, max, decimalPlaces) {
  if (max <= min || max <= 0 || min < 0) {
    return 'Некорректный ввод'
  }
  return ((Math.random() * (max - min + 1)) + min).toFixed(decimalPlaces)
}