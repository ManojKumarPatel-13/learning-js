/* Before we start string let us discuss a bit about memory management 

So Computer Memory (RAM) is the temporary digital workspace that a computer sets aside for a running program.

Now what is Memory Management 
as clear by name it is a process of controlling program's memory lifecycle. which always follow three steps:
allocating a piece of RAM to new data
using the data in our code
and releasing it when it is no longer needed

C language force developers to do the memory management manually whereas in JavaScript it is done automatically by 
using a built-in background tool called Garbage Collector

to handle this automatic management, JavaScript divides it allocated RAM into two distinct storage zones based on the
type of data being saved: the Stack and the Heap


The Stack Memory
The Stack is a highly organized, ultra-fast memory zone that stores data with a fixed, predictable size. 
JavaScript uses the Stack to immediately hold all Primitive data types (like Numbers, Strings, and Booleans) 
as well as the names/pointers of your variables. Because it has a strict, stacked structure, data is instantly 
added and cleared out the moment your code finishes using it.

The Heap Memory
The Heap is a massive, unstructured pool of memory used to store large or dynamically changing data that doesn't 
have a fixed size. JavaScript uses the Heap to store all Complex data types (Objects, Arrays, and Functions)
because they can grow or shrink at any time. Instead of storing these directly in a variable, JavaScript puts 
them in the Heap and gives the Stack a "memory address" pointer to track where they live.

*/



// Starting Strings 

console.log("Hello, World!");
console.log('Hello, World!');
console.log(`Hello, World!`);

// three types of quotes can be used while logging strings but we should use backtick

let myName = "Manoj Kumar Patel"
let repoCount = 5
console.log(`Hello my name is ${myName} and my repo count is  ${repoCount}`);

// now there is one more keyword or can say modern practice we should use while declaring string is 

const gameName = new String("Manoj-Game")

// because these gives us extra control over our string 
// but let us see what is it's data type is it still string or it changed

console.log(typeof gameName); // object

// so as we saw it is no longer a string it is converted to a object with new keyword will discuss about this keyword 
// and syntax in future 
// just for basic info new is a constructor operator which tells JavaScript to manufacture brand new empty 
// Object in the Heap memory. It must be paired with a factory blueprint (a constructor function like String()), 
// which it uses to fill that empty object with data and properties. 

// some features (benefits) of declaring the strings like this 

console.log(gameName[0]);
console.log(gameName.length); // 10
console.log(gameName.toUpperCase()); // MANOJ-GAME
console.log(gameName.charAt(5)); // -
console.log(gameName.indexOf('n')); // 2

const newString = gameName.substring(0, 4)
console.log(newString); // Mano

const anotherString = gameName.slice(-8, 4)
console.log(anotherString); // no

// the difference b/w substring and slice is that slice allows us to use negative indexing as well

const newStringOne = "    Manoj    "
console.log(newStringOne);
console.log(newStringOne.trim()); // will trim the white space there is trim start and end kind of functions as well

const url = "https://ManojGame.com/Manoj%13Game"

console.log(url.replace('%13', '-')) // https://ManojGame.com/Manoj-Game
console.log(url.includes('manoj')) // false
console.log(url.includes('Manoj')) // true

const splitString = "Manoj-Kumar-Patel-Game"

console.log(splitString.split('-')); // [ 'Manoj', 'Kumar', 'Patel', 'Game' ]
