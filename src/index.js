//  1. ------------------------------------------------------------ 
function returnFirstArgument(a) {
  var result = a;
  
  return result;
}
var first = returnFirstArgument(10);
console.log(first)


// 2.------------------------------------------------------------
function sumWithDefaults(a) {
  var result = a + 100;

  return result;
}
 var one = sumWithDefaults(50)
 console.log(one)

// 3.------------------------------------------------------------

function returnFnResult() {
  function sum(a) {
    return a;
  };
  return sum;
};

var sum = returnFnResult(); 
sum(1);  
// 4.------------------------------------------------------------
function returnCounter(number){
  return function(f){
    return ++number ;
  };
}

let f = returnCounter(50);


console.log(f());
console.log(f());
console.log(f());
// 5.------------------------------------------------------------
function returnArgumentsArray() {
    console.log(arguments)
}
  let r = returnArgumentsArray ('Привет', 'всем', 5, 5, 6); 
  console.log(r);
// ------------------------------------------------------------