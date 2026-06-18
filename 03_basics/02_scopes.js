// ==========================================
// 1. WHAT IS SCOPE?
// ==========================================
// - Scope defines the boundary lines for variable visibility and accessibility.
// - It dictates exactly which lines of code can read or modify a variable.

// ==========================================
// 2. THE FOUR SCOPE LEVELS
// ==========================================
// A. Global Scope: Defined outside any braces; accessible everywhere in the file.
// B. Function Scope: Trapped inside a function; inaccessible to the outside world.
// C. Block Scope: Trapped inside any pair of curly braces {} (if-statements, loops).
//    -> CRITICAL: Only 'let' and 'const' respect block scope. 'var' breaks out of it!
// D. Module Scope: Code isolated to a single file, hidden from other files.

// ==========================================
// 3. KEY TERMINOLOGIES
// ==========================================
// - Scope Chain: The one-way path JavaScript takes looking for variables (Inward -> Outward).
// - Lexical Scope: Scope boundaries are locked in when you *type* the code, not when it runs.



// ============================================================================
// BLOCK SCOPE VS FUNCTION SCOPE
// ============================================================================

// 1. This variable lives in the GLOBAL LOBBY. Anyone can see it.
const globalHero = "Batman";

if (true) {
    // This is a BLOCK (Curly braces defining a specific room)

    var looseVariable = "I am a var, I break through block walls!";
    let strictLet = "I am a let, I am trapped in this block room!";
    const strictConst = "I am a const, I am also trapped here!";

    console.log("--- INSIDE THE BLOCK ---");
    console.log(globalHero);    // ✅ Works! Inner scopes can look OUT to the global lobby.
    console.log(strictLet);     // ✅ Works! We are inside the room where it was made.
}

console.log("\n--- OUTSIDE THE BLOCK ---");

// PUZZLE 1: Can we read the 'var' outside the block?
console.log(looseVariable);
// 📝 Output: "I am a var, I break through block walls!"
// 💡 WHY: 'var' completely ignores block braces '{}'. It is only trapped by functions!

// PUZZLE 2: Can we read 'let' or 'const' outside the block?
// console.log(strictLet); 
// 🛑 RESULT: ReferenceError: strictLet is not defined
// 💡 WHY: 'let' and 'const' are strictly BLOCK SCOPED. They die the moment the block closes.

// ============================================================================
// THE ONLY THING THAT CAN TRAP A 'VAR' (FUNCTION SCOPE)
// ============================================================================

function apartmentRoom() {
    var trappedVar = "I am a var, but I am finally trapped inside this function!";
    let trappedLet = "I am a let, obviously trapped here too!";

    console.log("\n--- INSIDE THE FUNCTION ---");
    console.log(trappedVar); // ✅ Works! Inside the function boundary.
}

apartmentRoom(); // We execute the function to run the code inside

console.log("\n--- OUTSIDE THE FUNCTION ---");
// console.log(trappedVar); 
// 🛑 RESULT: ReferenceError: trappedVar is not defined
// 💡 THE CORE RULE: 'var' ignores block braces {}, but it CANNOT escape function braces {}!

// ============================================================================
// THE SCOPE CHAIN (NESTED FUNCTIONS)
// ============================================================================

function parentFunction() {
    const parentIceCream = "Chocolate Ice Cream";

    function childFunction() {
        const childIceCream = "Vanilla Ice Cream";

        console.log("\n--- CHILD LOOKING OUTWARD ---");
        // ✅ Works! The child function can access its parent's variables.
        console.log(`Child is eating: ${childIceCream} and stealing Parent's: ${parentIceCream}`);
    }

    childFunction(); // Run the child function

    console.log("\n--- PARENT LOOKING INWARD ---");
    // console.log(childIceCream); 
    // 🛑 RESULT: ReferenceError: childIceCream is not defined
    // 💡 THE RULE: The Scope Chain is a ONE-WAY street. You can only look OUTWARD.
}

parentFunction();

// ============================================================================
// FUNCTION HOISTING (THE EXECUTION TRICK)
// ============================================================================

console.log("\n--- HOISTING TEST ---");

// TEST 1: Calling a standard function declaration BEFORE it is written
console.log(addOne(5)); // What will happen here? 

function addOne(num) {
    return num + 1;
}


// TEST 2: Calling a function expression (variable) BEFORE it is written
// console.log(addTwo(5)); 

const addTwo = function(num) {
    return num + 2;
};

// ============================================================================
// THE HOISTING RULE
// ============================================================================
// 1. Standard Function Declarations are completely hoisted. 
//    -> You CAN call them before they are defined in the file.
//
// 2. Function Expressions (Functions stored in let/const variables) are NOT usable before definition.
//    -> You will get a ReferenceError due to the Temporal Dead Zone (TDZ).

// ============================================================================
// DEFINITIONS FOR QUICK REFERENCE
// ============================================================================

// HOISTING (Simple): 
// -> The engine's way of setting up its props early. It scans the file and creates 
//    memory slots for all variable and function names at the top of their scope 
//    before running the code.

// HOISTING (Technical): 
// -> A compile-phase mechanism where memory allocation occurs for declarations 
//    before execution. Functions are hoisted with source; 'var' is hoisted as 
//    'undefined'; 'let'/'const' are hoisted but left uninitialized.

// TEMPORAL DEAD ZONE / TDZ (Simple): 
// -> The "waiting period" or locked-door phase. It is the danger zone between 
//    when a 'let' or 'const' variable is born in memory and when your code 
//    actually initializes it with a value. Touching it here causes a crash.

// TEMPORAL DEAD ZONE / TDZ (Technical): 
// -> The state of a block-scoped variable from the moment its block scope binds 
//    during compilation until its explicit declaration statement is evaluated 
//    during execution. Accessing it throws a structural ReferenceError.