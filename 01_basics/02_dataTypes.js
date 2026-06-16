"use strict"; // treat all JS code as newer version 

// although no need to write it nowadays but still for the sake of it we can write it 

// alert(3 + 3); // we are using node js so we can't run alert if using browser to run it you can use 

/*

console.log(
        3 + 
        3)

code readability should be high this is not good practice

*/

let name = "Manoj"
let age = 19
let isLoggedIn = false

// number => 2 to power 53
// bigint 
// string => ""
// boolean => true/false
// null => standalone value
// undefined => value not assigned yet 
// symbol => used for uniqueness

// object 


console.log(typeof 5); // number
console.log(typeof null); // object
console.log(typeof undefined); // undefined

// here as we see type of null return object it is historic mistake actually null is also a datatype but the creators 
// of javascript to make it fast made typeof function to only see first 3 bits so object first 3 bits are 000 and 
// null all bits are 0 so typeof function confuses and give object as output so this is a mistake we have to continue 
// with , summarizing in one line . "Null is a datatype whereas typeof function gives object as output for null"

// In javascript there are 8 major data types divided into two main categories 
// Primitive and Objects

// 1. Number 
// 2. Strings
// 3. Boolean
// 4. Undefined
// 5. Null
// 6. BigInt
// 7. Symbol

// 8. Object