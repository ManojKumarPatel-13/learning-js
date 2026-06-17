const score = 400
console.log(score);

const balance = new Number(100)
console.log(balance);

// same as string here also new constructor creates a new object which gives us additional features or control 
// over the number 

console.log(balance.toString()); // Converts the number to string then can use all the methods of string 
console.log(balance.toString().length); // used length method of string here
console.log(balance.toFixed(2)); // return number as a string and the argument it take here 2 is how much number 
// we want after decimal point -> 100.00

const anotherNumber = 23.8966
console.log(anotherNumber.toPrecision(3)); // return number as a string and here we tell how much digit we want 
// in our number -> 23.9

const hundreds = 10000000
console.log(hundreds.toLocaleString('en-IN')) // returns a string with commas around the zero in en-IN (indian notation)
// -> 1,00,00,000


// +++++++++++++++ Maths +++++++++++++++++++++++
// this is a default library we get with JavaScript 

console.log(Math) // object 
console.log(Math.abs(-4)); // Gives positive value always 
console.log(Math.round(4.6)); // rounds the decimal off 5
console.log(Math.ceil(4.2)); // always give the top value 5
console.log(Math.floor(4.9)); // always give the down value 4
console.log(Math.max(1, 2, 3, 4, 5, 6, 7)) // returns max value 7
console.log(Math.min(1, 2, 3, 4, 5, 6, 7)) // returns min value 1

console.log(Math.random()) // always gives value b/w zero and one 
console.log((Math.random() * 10) + 1) // this will return values from 1 to 10 
console.log(Math.floor((Math.random() * 10) + 1)) // this will return values from 1 to 10 just the integer part 

const max = 20
const min = 10

console.log(Math.floor(Math.random() * (max - min + 1)) + min) // this will give us integer values b/w 10 to 20 
// inclusive of both