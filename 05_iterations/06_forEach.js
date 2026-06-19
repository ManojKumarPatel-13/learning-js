// ============================================================================
// TOPIC: HIGH-ORDER FUNCTIONS, CALLBACK MECHANICS, AND FOREACH ITERATION
// ============================================================================

// ----------------------------------------------------------------------------
// SECTION 1: TECHNICAL TERMS DEFINITIONS & ENGINE MECHANICS
// ----------------------------------------------------------------------------
//
// 1. FIRST-CLASS CITIZENS:
//    In JavaScript, functions are treated as data values. The engine allows them 
//    to be assigned to variables, stored inside objects, returned from other 
//    functions, and passed around as physical method arguments.
//
// 2. HIGH-ORDER FUNCTION (HOF):
//    - Technical Def: A function that operates on other functions, either by 
//      taking one or more functions as input arguments, or by returning a function.
//    - Real-World Role: It acts as the "Manager" or wrapper layout that controls 
//      *when* and *how* internal operations execute.
//
// 3. CALLBACK FUNCTION:
//    - Technical Def: A function passed into a high-order function as an argument, 
//      which is intended to be invoked ("called back") at a later specific moment.
//    - Engine Action: It does not run immediately when the code line is compiled. 
//      It waits inside memory until the HOF explicitly executes its memory reference pointer.
//
// 4. ARRAY.PROTOTYPE.FOREACH:
//    - Technical Def: A built-in, native array method that automates collection 
//      iteration by invoking a provided callback function exactly once for each item.
//    - Memory Execution Frame: For every single element inside the array, the engine 
//      spawns a brand-new local Function Execution Context (FEC) for the callback.
//    - The Three-Argument Payload: On every single iteration pass, the engine 
//      automatically pushes three arguments into the callback function parameters:
//      1. Current Element Value (The actual array item data)
//      2. Current Element Index (The active loop counter integer: 0, 1, 2...)
//      3. Complete Source Array (A direct memory pointer to the original array structure)




// ----------------------------------------------------------------------------
// SECTION 2: REAL-WORLD DEVELOPMENT SCENARIO
// ----------------------------------------------------------------------------
console.log("--- DEVELOPMENT SCENARIO: SYSTEM USER ROLE AUDITING ---");

// Array of user objects extracted from a database JSON response:
const rawUserCollection = [
    { username: "manoj_99", status: "active", tier: "Premium" },
    { username: "alex_dev", status: "suspended", tier: "Free" },
    { username: "sam_manager", status: "active", tier: "Admin" }
];

// PROBLEM: A security middleware script must loop through all users, parse their status, 
// and print an administrative log tracking their access rights.

// High-Order invocation passing an anonymous arrow function callback:
rawUserCollection.forEach((userRecord) => {
    if (userRecord.status === "suspended") {
        console.log(`[ACCESS DENIED]: Account ${userRecord.username} is frozen.`);
    } else {
        console.log(`[ACCESS GRANTED]: Account ${userRecord.username} cleared into system.`);
    }
});


// ----------------------------------------------------------------------------
// SECTION 3: LOGIC / DSA PUZZLES
// ----------------------------------------------------------------------------
console.log("\n--- DSA PUZZLE: THE THE-PAYLOAD TRACKER ---");

// PROBLEM: Given a mathematical array, print every single element value alongside 
// its exact memory position, and verify the structural capacity of the array 
// dynamically at runtime using the third hidden argument injected by the engine.

const datasetMatrix = [1024, 2048, 4096];

// Declaring the callback payload standalone to show explicit architectural separation:
const payloadInspectorCallback = function (elementValue, positionIndex, completeSourceArray) {
    const totalCapacity = completeSourceArray.length;
    console.log(
        `Index: ${positionIndex} | Value: ${elementValue} | Matrix Length: ${totalCapacity}`
    );
};

// Passing the named function reference into the forEach High-Order manager:
datasetMatrix.forEach(payloadInspectorCallback);


// ----------------------------------------------------------------------------
// SECTION 4: CRITICAL HIDDEN TRAPS
// ----------------------------------------------------------------------------

// TRAP A: THE SYNTAX BREAK CRASH
const systemAlerts = ["Warn_1", "Fatal_Error", "Warn_2"];

/*
systemAlerts.forEach((alert) => {
    if (alert === "Fatal_Error") {
        break; // 🛑 ENGINE PANIC / CRASH: SyntaxError: Illegal break statement
    }
});
// 💡 WHY IT FAILS: 'break' and 'continue' only look for loop blocks (for/while). 
//   They are illegal inside independent function callback execution contexts!
*/

// THE CORRECTION / ALTERNATIVE:
// If you use 'return' inside the callback, it acts exactly like a traditional 'continue'.
// It skips the rest of the code block for THAT SPECIFIC element, but the main loop keeps running!
console.log("\nExecuting forEach with 'return' skip:");
systemAlerts.forEach((alert) => {
    if (alert === "Fatal_Error") {
        console.log("-> Critical alert bypassed early via return.");
        return; // Exits this specific context frame early, jumping to next item.
    }
    console.log(`Processing Alert Code: ${alert}`);
});


// TRAP B: THE RETURN VALUE VOID ASSIGNMENT
const numbersList = [5, 10, 15];

const mutatedStorage = numbersList.forEach((num) => {
    return num * 2;
});

console.log("\nValue inside mutatedStorage variable:", mutatedStorage);
// 📝 Output: undefined
// 💡 WHY: The forEach function is hardcoded by the ECMAScript specifications to 
//   ALWAYS return 'undefined', regardless of what your callback returns! It cannot 
//   be used to create or save a transformed array directly.


// ----------------------------------------------------------------------------
// SECTION 5: FUTURE SCOPE / BEYOND THE BASICS
// ----------------------------------------------------------------------------
// - Side Effects: Because forEach returns undefined, its sole engineering purpose 
//   is to execute "side effects" (mutating outer variables, logging to terminal, 
//   updating database rows, or modifying DOM states).
// - Upcoming Chapter Connection: When your goal is to transform or filter data 
//   without changing the source array, you leave forEach behind and step into 
//   immutable pipeline operations like .filter() and .map().