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

// some extra code playing with the 4 property of object

// 1. Initialize a clean, empty configuration container object
const appConfig = {};

// 2. Define the DEPLOYMENT ENVIRONMENT (Read-Only & Locked)
Object.defineProperty(appConfig, 'ENV', {
    value: 'production',
    writable: false,       // 🔒 Value cannot be overwritten
    enumerable: true,      // 👁️ Visible in standard configuration loops
    configurable: false    // 🚫 Cannot be deleted; flags cannot be altered
});

// 3. Define the SENSITIVE API KEY (Hidden from Loops & Logs)
Object.defineProperty(appConfig, 'API_SECRET_KEY', {
    value: 'SECURE_TOKEN_XYZ_9931',
    writable: false,       // 🔒 Read-Only
    enumerable: false,     // 🥷 GHOST! Hidden from Object.keys() and loops
    configurable: false    // 🚫 Un-deletable
});

// 4. Define a DYNAMIC COUNTER (Writable but Un-deletable)
Object.defineProperty(appConfig, 'requestCount', {
    value: 0,
    writable: true,        // ⚡ ALLOW MUTATION! This value can change dynamically
    enumerable: true,      // 👁️ Visible
    configurable: false    // 🚫 Protected against deletion or flag tampering
});

// ==========================================
// 🧪 LIVE SYSTEM TESTS (ENGINE ENFORCED)
// ==========================================

console.log("--- BEFORE TAMPERING ---");
console.log("Environment:", appConfig.ENV);          // Output: production
console.log("Request Count:", appConfig.requestCount); // Output: 0

// Test A: Attempting to overwrite a read-only field (ENV)
appConfig.ENV = 'staging'; // Engine silently blocks this assignment
console.log("\nAfter mutation attempt on ENV:", appConfig.ENV); // Output: production (unchanged!)

// Test B: Mutating the counter (requestCount)
appConfig.requestCount += 1;
console.log("After legitimate counter increment:", appConfig.requestCount); // Output: 1

// Test C: Attempting to delete the counter from memory
const deleteResult = delete appConfig.requestCount;
console.log("Did the engine allow deletion?:", deleteResult); // Output: false
console.log("Request Count after deletion attempt:", appConfig.requestCount); // Output: 1 (still exists!)

// Test D: Visibility Sweeping (The Ghost Test)
console.log("\n--- CONFIGURATION SWEEPING DETECTION ---");
console.log("Visible Keys in appConfig:", Object.keys(appConfig));
// Output: ['ENV', 'requestCount'] 
// Notice that 'API_SECRET_KEY' is completely absent! It is safe from discovery.

// Yet, if you target it directly, it reads perfectly:
console.log("Targeted Fetch of Secret Key:", appConfig.API_SECRET_KEY);
// Output: SECURE_TOKEN_XYZ_9931


// writting my self
const userSession = {
    username: "alex99",
    id: "usr_77312"
};

Object.defineProperty(userSession, 'id', {
    value: 'usr_77312',
    writable: false,
    enumerable: true,
    configurable: false,
})

// notes for the same

/**
 * ============================================================================
 * MODULE: OBJECT PROPERTY DESCRIPTORS
 * ============================================================================
 */

/* * 💡 THE CONCEPT IN SIMPLE TERMS
 * Under the hood, a JavaScript object property is not just a raw key-value pair. 
 * Every single property contains a hidden metadata configuration block called a 
 * "Property Descriptor". Think of these as four internal security switches 
 * that dictate exactly what operations are permitted on that property.
 *
 * ⚙️ THE 4 INTERNAL SWITCHES:
 * 1. [[value]]: Contains the actual data payload.
 * 2. [[writable]]: Controls mutation. If false, the property value is read-only.
 * 3. [[enumerable]]: Controls visibility. If false, the key becomes a "ghost"—
 * it's hidden from loops, Object.keys(), and object spread operators.
 * 4. [[configurable]]: Controls administration. If false, the property cannot 
 * be deleted from memory, and its metadata descriptor flags cannot be altered again.
 *
 * 🔬 ENGINE DEFAULT BEHAVIOR NOTE:
 * - When creating properties via Object Literals ({ key: val }), flags default to TRUE.
 * - When creating properties via Object.defineProperty(), omitted flags default to FALSE.
 */

// 💻 LIVE CODE PRODUCTION TEMPLATE
const userSession = {
    username: "alex99",
    id: "usr_77312" // Created via literal, so initially fully unlocked
};

// Programmatically applying low-level architectural locks
Object.defineProperty(userSession, 'id', {
    writable: false,      // 🔒 Value is frozen; cannot be overwritten
    enumerable: true,     // 👁️ Left visible for object iteration and API parsing
    configurable: false   // 🚫 Permanent lock. Cannot be deleted or re-configured
});


/* * ⚠️ INTERVIEW / PRODUCTION TRAP #1: THE STRICT MODE TYPEERROR
 * In sloppy mode, attempting to overwrite a read-only (writable: false) property 
 * fails silently. In strict mode, it triggers an immediate application crash.
 */
(() => {
    "use strict";
    try {
        userSession.id = "hacked_id"; // ❌ Throws TypeError: Cannot assign to read only property
    } catch (error) {
        // Runtime exception successfully caught and handled
    }
})();


/* * ⚠️ INTERVIEW / PRODUCTION TRAP #2: THE CONFIGURABLE ONE-WAY STREET
 * Setting configurable to false is permanent. You cannot call Object.defineProperty 
 * a second time to unlock or alter the metadata configuration settings.
 */
try {
    Object.defineProperty(userSession, 'id', { writable: true }); 
    // ❌ Throws TypeError: Cannot redefine property
} catch (error) {
    // Engine blocked the security circumvention attempt
}