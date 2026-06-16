let value = 3;
let negValue = -3;

console.log(negValue);

// operations like +, -, *, /, %
console.log(2 + 2) // 4 
console.log(2 - 2) // 0
console.log(2 * 2) // 4
console.log(2 / 2) // 1
console.log(2 % 2) // 0

// some addition of strings and numbers
console.log("1" + 2) // 12
console.log(1 + "2") // 12
console.log("1" + 2 + 2) // 122
console.log(1 + 2 + "2") // 32

/*
console.log(+true); // 1
console.log(+""); // 0

not good should not use in production 
can use while in exam 

it is all a game of precedence 

you can study more about it from tc39.es


let num1, num2, num3

num1 = num2 = num3 = 2 + 2

this is also not good code
*/

// Prefix and Postfix incremental operators

let gameCounter = 100;
++gameCounter;
console.log(gameCounter)

// Prefix incremental operator it first increments and then saves the value whereas postfix operator first saves and 
// then increments it.