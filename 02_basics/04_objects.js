const tinderUser = new Object() // SingleTon Value

tinderUser.id = "123abc"
tinderUser.name = "Sammy"
tinderUser.isLoggedIn = false

console.log(tinderUser);

const regularUser = {
    email: "Sammy@gmail.com",
    fullName: {
        userFullName: {
            firstName: "Sammy",
            lastName: "dan"
        }
    }
}


console.log(regularUser.fullName.userFullName.firstName);

const obj1 = { 1: "a", 2: "b" }
const obj2 = { 3: "c", 4: "d" }

const obj3 = { obj1, obj2 }
console.log(obj3);

const obj4 = Object.assign(obj1, obj2) // here the output is saved in obj1

const obj5 = Object.assign({}, obj1, obj2) // hence we usually write a empty parenthesis at the start of of assign method

// but still we not use assign and the new obj method we use spread operator because it is latest and convenient

const obj6 = { ...obj1, ...obj2 }
// spread operator works same as discussed in arrays

console.log(obj6);


// when working with databases we get a array of object as input 
const users = [
    {
        id: 1,
        email: "user1@gmail.com"
    },
    {
        id: 2,
        email: "user2@gmail.com"
    },
    {
        id: 3,
        email: "user3@gmail.com"
    }
]

users[1].email // to access it we can use this type of syntax

// continuing tinderUser

console.log(tinderUser);

console.log(Object.keys(tinderUser)) // the return value data type is a array 
// it is a very important concept many hard problems both in dsa and dev will be solved by this approach
console.log(Object.values(tinderUser)); // we can extract all the values in form of array
console.log(Object.entries(tinderUser)); // we can extract both key value pair in form of array

console.log(tinderUser.hasOwnProperty('isLoggedIn')); // checks wether the property exist in the object or not 




// Learning Destructuring 

const course = {
    courseName: "JS in Hindi",
    price: "999",
    courseInstructor: "Manoj"
}

// when we need to extract things out of it we mostly use dot and bracket notations 

// we cam also do the following thing

const { courseInstructor: instructor } = course // this is a way by which we can extract things out and give them short 
// names if needed we usually do this when we need to access some property of object multiple times in our code 

console.log(instructor);


// react example
/*
const navbar = ({ company }) => {

}

navbar(company = "Manoj")

this is a react example where in the parameter section we write {company} instead of props.company
and here as we can see we are destructuring

*/


// Intro to APIs and JSON

// example of JSON

// {
//     "name": "Manoj Kumar Patel",
//     "courseName": "JS in Hindi",
//     "coursePrice": "Free"
// }

// sometimes api gives value in form of array of objects 