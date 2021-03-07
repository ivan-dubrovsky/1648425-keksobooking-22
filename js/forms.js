 
const setMinValuesForTypes = () => {
  const type = document.querySelector('#type')
  const price = document.querySelector('#price')
    
  const setPrice = (cost) => {
    price.min = cost;
    price.placeholder = cost;
  }

  setPrice('1000')
  type.addEventListener('change', (evt) => {
    switch (evt.target.value) {
      case 'bungalow':
        setPrice('0')
        break;
      case 'flat':
        setPrice('1000')
        break;
      case 'house':
        setPrice('5000')
        break;
      case 'palace':
        setPrice('10000')
        break;
    }
  })
}

const setCheckTime = () => {
  const checkInTime = document.querySelector('#timein')
  const checkOutTime = document.querySelector('#timeout')
    
  checkInTime.addEventListener('change', (evt) => {
    checkOutTime.value = evt.target.value
  })
  checkOutTime.addEventListener('change', (evt) => {
    checkInTime.value = evt.target.value
  })
}
  
export {setMinValuesForTypes, setCheckTime}