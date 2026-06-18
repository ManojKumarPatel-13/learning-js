// ============================================================================
//               THE DEFINITIVE ARROW FUNCTIONS & CONTEXT GUIDE
// ============================================================================

// ----------------------------------------------------------------------------
// SECTION 1: THE NORMAL FUNCTION STRUCTURE
// ----------------------------------------------------------------------------
// - The traditional way of defining reusable blocks of code in JavaScript.
// - They use the explicit 'function' keyword.
// - They are heavily hoisted (can be called before written in the file).

function normalAdd(a, b) {
    return a + b; // Requires explicit return statement to give back data
}


// ----------------------------------------------------------------------------
// SECTION 2: THE ARROW FUNCTION (INTRODUCED IN ES6 / 2015)
// ----------------------------------------------------------------------------
// DEFINITION: 
// A compact, lightweight alternative to traditional function expressions. 
// It eliminates boilerplate syntax and fundamentally changes context binding.

// A. Structure - Explicit Return (Uses Curly Braces)
const arrowAddExplicit = (a, b) => {
    return a + b; 
};

// B. Structure - Implicit Return (One-Liner Shortcut)
// If the body has only one expression, omit {} and the 'return' keyword.
const arrowAddImplicit = (a, b) => a + b;

// C. Real-World Use Cases:
// 1. Array Callbacks: Perfect for short utility operations like map, filter, reduce.
const numbers = [1, 2, 3];
const squares = numbers.map(num => num * num);

// 2. Inline Event Handlers & Timers: Keeping simple utility code readable.
setTimeout(() => console.log("Time is up!"), 1000);

// D. Future Implementation & Cross-Language / Library Concepts:
// - React Hooks & Components: Modern React relies entirely on Arrow Functions for 
//   Functional Components and event hooks (e.g., const MyComponent = () => {}).
// - Node.js Middleware: Express.js routes heavily utilize arrow functions for 
//   clean request/response pipeline handling.
// - Java & Python Lambdas: Arrow functions are JavaScript's equivalent to 
//   "Lambda Expressions" in Python/Java—nameless anonymous functions used for quick tasks.


// ----------------------------------------------------------------------------
// SECTION 3: HOW THEY DIFFER STRUCTURAL-WISE (WITHOUT 'THIS')
// ----------------------------------------------------------------------------
// 1. Syntax Overhead: Regular functions require the word 'function' and braces. 
//    Arrow functions use the fat-arrow assignment operator (`=>`).
// 2. Hoisting: Regular function declarations are hoisted with their content. 
//    Arrow functions are assigned to variables (let/const), meaning they live 
//    in the Temporal Dead Zone (TDZ) and cannot be used before declaration.
// 3. The 'arguments' Object: Regular functions have access to a local built-in 
//    array-like object called `arguments` that holds passed parameters. 
//    Arrow functions DO NOT have an arguments object.
// 4. Constructor Ability: Regular functions can be used with the 'new' keyword 
//    to manufacture objects. Arrow functions cannot be used as constructors.


// ----------------------------------------------------------------------------
// SECTION 4: ENTERING THE WORLD OF 'THIS' CONTEXT
// ----------------------------------------------------------------------------
// Remember: 'this' references the "owner" or execution environment of the code.

// A. Regular Functions: Dynamic 'this'
// - A regular function binds its 'this' keyword dynamically at runtime based 
//   on WHO called it. If an object calls it, 'this' is that object. If it's called 
//   standalone, 'this' falls back to the global environment (Window/Global).

const standardUser = {
    name: "Manoj",
    logName: function() {
        console.log("Normal function context:", this.name); // 'this' works!
    }
};

// B. Arrow Functions: Lexical 'this'
// - Arrow functions DO NOT possess their own 'this' keyword slot in memory.
// - Instead, they capture the 'this' value of the surrounding lexical context 
//   (the boundary scope they were typed inside) at the time they are created.

const arrowUser = {
    name: "Manoj",
    logName: () => {
        // Looks outward to the global file scope because the object literal doesn't create a scope block!
        console.log("Arrow function context:", this.name); // returns undefined!
    }
};


// ----------------------------------------------------------------------------
// SECTION 5: DEEPER DISCUSSION & PRACTICAL 'THIS' EXAMPLES
// ----------------------------------------------------------------------------
// Why does this difference matter? Let's look at timers inside objects.

const smartphone = {
    brand: "Apple",
    
    // SCENARIO 1: The Regular Function Problem inside nested code
    delayedLogRegular() {
        setTimeout(function() {
            // CRASH/UNDEFINED: Because setTimeout invokes this function globally,
            // 'this' no longer points to the smartphone object.
            console.log(`Regular Timer Brand: ${this.brand}`); 
        }, 500);
    },

    // SCENARIO 2: The Arrow Function Fix
    delayedLogArrow() {
        setTimeout(() => {
            // SUCCESS: Because arrow functions have no 'this', it grabs 'this' 
            // lexically from delayedLogArrow(), which safely points to smartphone!
            console.log(`Arrow Timer Brand: ${this.brand}`);
        }, 500);
    }
};


// ----------------------------------------------------------------------------
// SECTION 6: WRAPPING IT ALL UP
// ----------------------------------------------------------------------------
// Use Regular Functions when:
// - You are writing methods inside standard objects.
// - You want structural hoisting capabilities across a file.
// - You need constructor patterns using the 'new' operator.
//
// Use Arrow Functions when:
// - You want to write short, functional collection callbacks (.map, .filter).
// - You are writing nested code (like timers/promises) and want to preserve 
//   the outer parent's 'this' context automatically.


// ----------------------------------------------------------------------------
// SECTION 7: EXTRA CRITICAL THINGS EVERYONE IGNORES (THE TRAPS)
// ----------------------------------------------------------------------------
// 1. The Implicit Return Object Trap:
//    When implicitly returning an object literal, you MUST wrap it in parentheses.
//    If you write: () => { age: 25 } -> JS thinks the braces are a code block and returns undefined.
//    Correct way:   () => ({ age: 25 })

// 2. The Prototype Exclusion:
//    Because arrow functions lack a constructor mechanism, they do not possess 
//    a `.prototype` property link in memory. They cannot participate in prototypal inheritance.

// 3. Methods on Objects:
//    Never casually convert object methods to arrow functions unless you explicitly 
//    intend for 'this' to break away from the object and point to the global file scope.

// ============================================================================
// ARROW FUNCTIONS & THE 'THIS' TRAP
// ============================================================================

const normalAndArrowObj = {
    username: "Manoj",
    
    // 1. REGULAR FUNCTION AS A METHOD
    regularMethod: function() {
        console.log("Regular Method 'this':", this.username); 
        // 📝 Output: "Manoj"
        // 💡 WHY: Regular functions bind 'this' to the object that called it.
    },

    // 2. ARROW FUNCTION AS A METHOD
    arrowMethod: () => {
        console.log("Arrow Method 'this':", this.username); 
        // 📝 Output: undefined
        // 💡 WHY: Arrow functions don't create a 'this'. They look OUTWARD to the 
        //    global scope. In Node, global 'this' is {}, which doesn't have 'username'.
    }
};

normalAndArrowObj.regularMethod();
normalAndArrowObj.arrowMethod();