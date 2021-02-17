const getArbitraryNumber = (min, max, decimalPlaces) => {
  if (max <= min || max <= 0 || min < 0) {
    return 'Некорректный ввод'
  }
  return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
};

const getInteger = (min, max) => {
  if (max <= min || max <= 0 || min < 0) {
    return 'Некорректный ввод'
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Функция для склонения числительных
const getDeclension = (value, words) => {  
  value = Math.abs(value) % 100; 
  let num = value % 10;
  if(value > 10 && value < 20) return words[2]; 
  if(num > 1 && num < 5) return words[1];
  if(num == 1) return words[0]; 
  return words[2];
}

export {getArbitraryNumber};
export {getInteger};
export {getDeclension}