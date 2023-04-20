// formValidations.js
export function required(value) {
    return value.trim() !== '';
  }
  
  export function minLength(length) {
    return (value) => value.length >= length;
  }
  
  export function isRating(value) {
    return !isNaN(parseFloat(value)) && isFinite(value) && parseFloat(value) >= 0 && parseFloat(value) <= 5;
  }
  
  
  