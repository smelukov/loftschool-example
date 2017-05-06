/* ДЗ 1 - Функции */

/*
 Задание 1:

 Функция должна принимать один аргумент и возвращать его
 */
function returnFirstArgument(arg) {
	return arg;
}
var x =  returnFirstArgument(1);

/*
 Задание 2:

 Функция должна принимать два аргумента и возвращать сумму переданных значений
 Значение по умолчанию второго аргумента должно быть 100
 */
function defaultParameterValue(a, b=100) {
	return a + b;
}
var y = defaultParameterValue(10);
/*
 Задание 3:

 Функция должна возвращать все переданные в нее аргументы в виде массива
 Количество переданных аргументов заранее неизвестно
 */
function returnArgumentsArray() {
	var result = [];
	for(var i = 0; i < arguments.length; i++){
		result[i] = arguments[i];
	}
	return result;
}
var z = returnArgumentsArray();
/*
 Задание 4:

 Функция должна принимать другую функцию и возвращать результат вызова переданной функции
 */
function returnFnResult(fn) {
	return fn();
}

var q = returnFnResult(function(){return 1+1;});

/*
 Задание 5:

 Функция должна принимать число (значение по умолчанию - 0) и возвращать функцию (F)
 При вызове F, переданное число должно быть увеличено на единицу и возвращено из F
 */
function returnCounter(number=0) {
	return number;
}
var fun = returnCounter(1);
/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию
 */
function bindFunction(f) {
return	function f (a,s){
	return a + s;
	}
}
var func = bindFunction(function f(){return a+s;});
var func1 = func(function(){});

export {
    returnFirstArgument,
    defaultParameterValue,
    returnArgumentsArray,
    returnFnResult,
    returnCounter,
    bindFunction
}
