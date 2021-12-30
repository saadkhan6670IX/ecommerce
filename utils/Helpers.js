//this function delays function call for some ms as 2nd arg
export const debounce = (func, delay) => {
  let timeoutId;

  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      return func(...args);
    }, delay);
  };
};


//this function formates number into two decimal and number
export const formateNumber = (number) => {
  if (Number.isInteger(Number(number)) === true) {
    return Number(number)
  }
  else{
    return Number(Number(number).toFixed(2))
  }
};

export function throttle (callback, limit) {
  var wait = false;                  // Initially, we're not waiting
  return function () {               // We return a throttled function
      if (!wait) {                   // If we're not waiting
          callback.call();           // Execute users function
          wait = true;               // Prevent future invocations
          setTimeout(function () {   // After a period of time
              wait = false;          // And allow future invocations
          }, limit);
      }
  }
}



//this function takes arrays of object with key id, and check if they are same
export function ArrayIsSame(_arr1, _arr2) {
  if (
    !Array.isArray(_arr1) ||
    !Array.isArray(_arr2) ||
    _arr1.length !== _arr2.length
  ) {
    return false;
  }

  // .concat() to not mutate arguments
  const arr1 = _arr1.map((val) => val.id).sort();
  const arr2 = _arr2.map((val) => val.id).sort();

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

//this function formats the floating numbers to only 2 points
export const formatPrice = (price) => {
  var formatted_price = parseFloat(price);
  formatted_price = formatted_price.toFixed(2);
  return parseFloat(formatted_price);
};

export const getType = (type) => {
  switch (type) {
    case 1:
      return 'Home';
    case 2:
      return 'Work';
    case 3:
      return 'Others';
    case 4:
      return 'Selected Location';
    default:
      return '';
  }
};
