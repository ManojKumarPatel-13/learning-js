// ============================================================================
// TOPIC: HIGH-PERFORMANCE FUNCTIONAL ARRAY MANIPULATION (FILTER, MAP, REDUCE)
// ============================================================================

// ----------------------------------------------------------------------------
// SECTION 1: TECHNICAL TERMS DEFINITIONS & ENGINE MECHANICS
// ----------------------------------------------------------------------------
//
// 1. DATA IMMUTABILITY: 
//    Unlike structural methods like .sort() or .splice() which directly alter 
//    (mutate) the original array data in memory, .filter(), .map(), and .reduce() 
//    treat data as unchangeable. They leave the original array pristine and 
//    allocate a brand-new array structure in the Heap to return the results.
//
// 2. ARRAY.PROTOTYPE.FILTER:
//    - Technical Def: A high-order evaluation routine that passes every element 
//      through a conditional callback function. The callback MUST return a 
//      truthy or falsy value (known as a predicate condition).
//    - Engine Action: If the callback evaluates to true, a shallow copy of that 
//      element is pushed into the new destination array. If false, it is skipped.
//
// 3. ARRAY.PROTOTYPE.MAP:
//    - Technical Def: A high-order transformation projection routine that applies 
//      a modification callback mapping function to every single item.
//    - Engine Action: Whatever value your callback explicitly returns on each pass 
//      is stored at that exact corresponding index position inside the new array.
//
// 4. ARRAY.PROTOTYPE.REDUCE:
//    - Technical Def: A high-order reduction accumulator function that processes 
//      an entire collection down into a single consolidated value (number, string, object).
//    - The Callback Signature: Accepts four arguments, primarily: (accumulator, currentValue).
//    - Accumulator: The rolling value carrying the accumulated result of all previous loops.
//    - Initial Value: The starting value explicitly handed to the accumulator. 
//      CRITICAL: If you omit the initial value, the engine skips the first loop pass, 
//      assigns index [0] as the accumulator, and starts running the callback at index [1]!




// ----------------------------------------------------------------------------
// SECTION 2: REAL-WORLD DEVELOPMENT SCENARIO
// ----------------------------------------------------------------------------
console.log("--- DEVELOPMENT SCENARIO: E-COMMERCE TAX AND TOTAL BILLING ---");

// Raw database records of an active shopping cart checkout session:
const enterpriseCart = [
    { item: "Gaming Laptop", price: 1200, category: "Electronics" },
    { item: "Mechanical Switches", price: 40, category: "Accessories" },
    { item: "Ergonomic Desk", price: 350, category: "Furniture" },
    { item: "Wireless Mouse", price: 80, category: "Electronics" }
];

// PROBLEM: The store needs to isolate all 'Electronics', apply an 18% sales tax 
// to each of those items, and then calculate the grand total bill.

// METHOD CHAINING: We connect methods sequentially like an industrial assembly line!
const grandTotalBill = enterpriseCart
    .filter((product) => product.category === "Electronics") // Step 1: Filter electronics
    .map((electronicItem) => electronicItem.price * 1.18)    // Step 2: Apply 18% tax
    .reduce((acc, taxedPrice) => acc + taxedPrice, 0);       // Step 3: Accumulate values

console.log(`Final payment due for electronics items: $${grandTotalBill.toFixed(2)}`);
// ✅ Success Outcome: $1510.40


// ----------------------------------------------------------------------------
// SECTION 3: LOGIC / DSA PUZZLES
// ----------------------------------------------------------------------------
console.log("\n--- DSA PUZZLE: THE FREQUENCY MAP COMPILER ---");

// PROBLEM: Take a raw array of log severities and count the exact frequency 
// occurrence of each string status using ONLY a single .reduce() operation.
// Expected Output: { Info: 3, Warning: 1, Critical: 2 }

const serverSystemLogs = ["Info", "Critical", "Info", "Warning", "Critical", "Info"];

const frequencyReport = serverSystemLogs.reduce((reportAcc, currentSeverity) => {
    // If the severity string doesn't exist as a key inside our accumulator object yet, initialize it at 0
    reportAcc[currentSeverity] = (reportAcc[currentSeverity] || 0) + 1;

    return reportAcc; // Always explicitly return the accumulator structure to keep the chain alive!
}, {}); // 💡 Initializing the accumulator as a fresh empty object literal {}

console.log("Compiled Log Frequencies:", frequencyReport);


// ----------------------------------------------------------------------------
// SECTION 4: CRITICAL HIDDEN TRAPS
// ----------------------------------------------------------------------------

// TRAP A: THE ARROW FUNCTION IMPLICIT RETURN BLOCK BLUNDER
const scoresList = [10, 20, 30];

// The Developer intends to filter items greater than 15:
const brokenFilter = scoresList.filter((num) => {
    num > 15; // 🛑 ERROR: Curly braces {} create a Block Scope! 
    // Without an explicit 'return' keyword, this returns undefined (falsy).
});
console.log("\nBroken Filter Output (No return inside braces):", brokenFilter); // 📝 Output: []

// The Correction: Explicitly type 'return' OR drop the curly braces entirely!
const fixedFilter = scoresList.filter((num) => num > 15);
console.log("Fixed Filter Output (Implicit shorthand):", fixedFilter); // 📝 Output: [20, 30]


// TRAP B: OMITTING THE REDUCE INITIAL VALUE WITH AN OBJECT ARRAY
const userProfiles = [{ age: 25 }, { age: 30 }, { age: 35 }];

/*
const crashedReduce = userProfiles.reduce( (acc, user) => acc + user.age );
// 🛑 CRASH / BUG LOGIC: Because no initial value was given, the engine skips setup.
// Loop 1 Accumulator = The whole literal object: { age: 25 }
// CurrentValue = The second object: { age: 30 }
// It attempts to add: { age: 25 } + 30 -> Result: "[object Object]30" (String coercion bug)
*/

// The Correction: Always provide an explicit starting primitive zero:
const safeTotalAge = userProfiles.reduce((acc, user) => acc + user.age, 0);
console.log("Safe Total Age Summation:", safeTotalAge); // 📝 Output: 90


// ----------------------------------------------------------------------------
// SECTION 5: FUTURE SCOPE / BEYOND THE BASICS
// ----------------------------------------------------------------------------
// - Performance Tradeoffs: Traditional 'for' loops can be faster because high-order 
//   methods introduce function invocation overhead. However, declarative methods 
//   are vastly preferred in modern development due to readability and safety.
// - Other Useful Array Utilities to Study Later:
//   - .find(): Returns the very first item that matches a condition.
//   - .some(): Returns true if even ONE element passes a condition check.
//   - .every(): Returns true only if EVERY single item passes a condition check.