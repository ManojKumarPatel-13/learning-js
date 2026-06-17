// need to explore about singleton from internet 

// we can create object in two ways constructor and literals 
// Object.create() // this is constructor method and in this method singleton is formed 

// object literals 

const mySym = Symbol("key1") // symbol defined to use in the object 

const JsUser = {
    name: "Manoj",
    "full name": "Manoj Kumar Patel",
    [mySym]: "myKey1", // it is necessary to use bracket notation while defining symbol as a key it is asked in the interview
    // if not used bracket notation it will not throw any error just will be saved as string (default)
    age: 18,
    location: "SagarPali",
    email: "manoj123@gmail.com",
    isLoggedIn: false,
    lastLoggedInDays: ["Monday", "Saturday"]
}

// just like defining object there is two ways we can extract information from it 
// dot notation and bracket notation

console.log(JsUser.email);
console.log(JsUser["email"]); // need to give the keyword as string because by default object saves keywords as strings
console.log(JsUser["full name"]); // whenever there is a space in keyword we must use bracket notation
console.log(JsUser[mySym]); // while accessing symbol keyword we must use bracket notation


JsUser.email = "manoj123@google.com"
// Object.freeze(JsUser)  // it is used to freeze the object means we can't do any further changes 
// i commented this because we need to do some changes to the object to understand some following concepts 
JsUser.email = "manoj123@chatgpt.com"

console.log(JsUser);

JsUser.greetings = function () {
    console.log("Hello JS user")
} // saving function as a value in object with keyword greetings or can say greetings is the function name

JsUser.greetingsTwo = function () {
    console.log(`Hello JS user, ${this.name}`) // this is a keyword use to refer to the same object here, JsUser
} // will discuss about the this keyword in upcoming chapters or lectures 

JsUser.greetings() // will give "Hello JS user" as output 
console.log(JsUser.greetings) // will give [Function (anonymous)] as output
console.log(JsUser.greetings()) // will give the message as output with undefined as well 
JsUser.greetingsTwo() // will give "Hello JS user, Manoj"


// function anonymous comes as a output because parenthesis are the go button of the function 
// you can consider the function call without parenthesis as a paper with the set of instruction which you can just see or read 
// and with parenthesis you do the instructions