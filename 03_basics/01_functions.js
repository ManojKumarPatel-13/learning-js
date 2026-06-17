// typical definition of function is function is a reusable block of code designed to perform a specific task 

function sayMyName() {
    console.log("M");
    console.log("A");
    console.log("N");
    console.log("O");
    console.log("J");
}

sayMyName() // called the function


// function addTwoNumbers(num1, num2) {
//    console.log(num1 + num2)
// }


function addTwoNumbers(num1, num2) {
    return (num1 + num2)
}

const result = addTwoNumbers(3, 4)

console.log(result);


function loginUserMessage(username) {

    if (!username) { // can use here username === undefined because when we don't give any argument 
        // parameter value becomes undefined
        console.log("Please enter a username")
        return
    } // the conditional statements will be covered in more advance in upcoming lectures 
    return `${username} just logged in`
}

console.log(loginUserMessage("Manoj"))
console.log(loginUserMessage()) // undefined just logged in


function calculateCartPrice(val1, val2, ...num1) { // here the three dots are rest operator and discussed earlier it is also called 
    // spread operator so this same thing is called spread or rest based on it's use case we will discuss more about it in future.

    // here this rest operator packs all the arguments given in a array except the first and second one because they will be
    //  named val1 and val2 respectively 
    return num1
}

console.log(calculateCartPrice(200, 300, 400, 2000))

const user = {
    username: "Manoj",
    course: "JS in Hindi",
    price: "299"
}

function handleObject(anyObject) {
    console.log(`Username ${anyObject.username} has enrolled in ${anyObject.course} of price ${anyObject.price}`)
}

handleObject(user)
handleObject({
    username: "Sam",
    course: "CSS in English",
    price: "199"
})