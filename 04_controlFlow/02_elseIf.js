// ----------------------------------------------------------------------------
// TOPIC: MULTI-BRANCH CONDITIONALS (ELSE IF) & IMPLICIT COERCION
// ----------------------------------------------------------------------------
// - The Engine Execution Rule: In an if / else if chain, the engine executes 
//   ONLY the first true block and skips the rest of the file's conditional tree.
// - Value Coercion: Expressions inside if() are forcefully cast to a Boolean.

// ----------------------------------------------------------------------------
// DEVELOPMENT SCENARIO: E-COMMERCE SHIPMENT PRICING SYSTEM
// PROBLEM: A logistical application calculates delivery fees based on order tiers.
// Premium gets free shipping, Standard gets flat rate, and Free tiers pay by weight.
// ----------------------------------------------------------------------------

const userMembership = "Standard";
const cartAmount = 120;
let shippingCost;

if (userMembership === "Gold") {
    shippingCost = 0;
} else if (userMembership === "Standard" && cartAmount >= 100) {
    // 💡 WHY THIS RUNS: The engine matches this true condition first and stops searching!
    shippingCost = 5;
} else if (cartAmount > 50) {
    shippingCost = 10; // Even though 120 > 50 is true, this block is skipped entirely!
} else {
    shippingCost = 20;
}

console.log(`Final calculated shipping charge: $${shippingCost}`);


// ----------------------------------------------------------------------------
// LOGIC / DSA PUZZLE: THE FIZZBUZZ MATRIX ALTERATION
// PROBLEM: Write an algorithm that logs "Fizz" if a number is divisible by 3, 
// "Buzz" if divisible by 5, and "FizzBuzz" if divisible by BOTH 3 and 5.
// CRITICAL GOTCHA: The order of your 'else if' branches completely determines 
// whether your code succeeds or fails!
// ----------------------------------------------------------------------------

const testNumber = 15;

// WRONG ORDER TRAP: If you put checking for 3 or 5 at the very top, 15 would trigger 
// that branch immediately, and you would never hit the "FizzBuzz" combination check.

console.log("\nExecuting FizzBuzz Cascade:");
if (testNumber % 3 === 0 && testNumber % 5 === 0) {
    // Always put the most specific combination constraint at the absolute top of the cascade
    console.log("Result: FizzBuzz");
} else if (testNumber % 3 === 0) {
    console.log("Result: Fizz");
} else if (testNumber % 5 === 0) {
    console.log("Result: Buzz");
} else {
    console.log(`Result: ${testNumber} is not divisible by 3 or 5`);
}


// ----------------------------------------------------------------------------
// EXTRA TRAPS: THE COERCION UNDER THE HOOD
// ----------------------------------------------------------------------------
// When you pass a raw variable into if(), JavaScript checks its "truthiness".

const activeConnections = 0;

if (activeConnections) {
    console.log("This will not log because the number 0 is implicitly coerced to false.");
}

const usernameInput = "Manoj";

if (usernameInput) {
    // ✅ Works! Any non-empty string is implicitly coerced to true.
    console.log(`Welcome back, user context initialized for: ${usernameInput}`);
}