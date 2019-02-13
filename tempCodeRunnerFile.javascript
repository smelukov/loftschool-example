function isAllTrue(array, fn) {

  let newFunc = fn(item => item < 10);

  if (!Array.isArray(array) || array.length == 0) {
    throw new Error("empty array");
  } else if (typeof fn !== 'function') {
    throw new Error("fn is not a function");
  }

  for (let i = 0; i < array.length; i++) {

    return function newFunc(){
      if (!fn) {
        return false;
      }
      else if(fn()){
        // return true;
        
      }
    }

  }

}

console.log(isAllTrue([100, 2, 3, 4, 5], n => n < 10));