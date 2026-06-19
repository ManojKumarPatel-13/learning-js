// ----------------------------------------------------------------------------
// 1. THE ARCHITECTURAL RULES
// ----------------------------------------------------------------------------
// - Conditionals control the execution path of the Single Thread.
// - Strict Equality (===) verifies identity without allowing the engine to 
//   perform implicit type coercion (type shifting).
// - Scope Linkage: Variables declared with 'let' and 'const' inside an 'if' 
//   or 'else' block are structurally trapped inside that block scope.

// ----------------------------------------------------------------------------
// 2. THE EQUALITY TRAP EXERCISE
// ----------------------------------------------------------------------------
const stringScore = "100";
const numericScore = 100;

console.log("--- EQUALITY TESTING ---");
if (stringScore == numericScore) {
    // 💡 WHY THIS RUNS: '==' forces the string to convert into a number before checking.
    console.log("Loose Equality (==): Values match (Type coercion allowed).");
}

if (stringScore === numericScore) {
    console.log("Strict Equality (===): This line will NOT execute.");
} else {
    // 💡 WHY THIS RUNS: '===' sees a String and a Number. Different types = Immediate mismatch.
    console.log("Strict Equality (===): Mismatch detected safely because types differ.");
}


// ----------------------------------------------------------------------------
// 3. REAL-WORLD DEVELOPMENT PROBLEM
// SCENARIO: An e-commerce system needs to apply discounts based on user status 
// and cart value. If a user is logged in AND has a premium membership, OR if 
// their cart value exceeds $500, they get a discount.
// ----------------------------------------------------------------------------
console.log("\n--- DEVELOPMENT SCENARIO: E-COMMERCE CHECKOUT ---");

const isLoggedIn = true;
const isPremiumMember = false;
const cartTotal = 600;

if ((isLoggedIn && isPremiumMember) || cartTotal > 500) {
    console.log("Discount Applied: Checkout System updated successfully.");
} else {
    console.log("Full Price: Criteria for automatic discount not met.");
}


// ----------------------------------------------------------------------------
// 4. LOGIC / DSA PUZZLE: THE LEAP YEAR DETERMINATOR
// PROBLEM: Write an algorithm to determine if a given year is a leap year.
// RULES: A year is a leap year if it is divisible by 4, EXCEPT if it is 
// divisible by 100, UNLESS it is also divisible by 400.
// ----------------------------------------------------------------------------
console.log("\n--- DSA / LOGIC PUZZLE: LEAP YEAR CHECKER ---");

const year = 2026; // Current year check
let isLeapYear = false;

if (year % 4 === 0) {
    if (year % 100 === 0) {
        if (year % 400 === 0) {
            isLeapYear = true; // Divisible by 400 -> Leap Year
        } else {
            isLeapYear = false; // Divisible by 100 but not 400 -> Not Leap Year
        }
    } else {
        isLeapYear = true; // Divisible by 4 but not 100 -> Leap Year
    }
} else {
    isLeapYear = false; // Not divisible by 4 -> Not Leap Year
}

console.log(`Is the year ${year} a Leap Year? Answer: ${isLeapYear}`);