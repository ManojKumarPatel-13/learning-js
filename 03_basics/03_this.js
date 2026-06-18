// ============================================================================
// 'THIS' KEYWORD DEFINITIONS
// ============================================================================
// - Simple Def: 'this' is a dynamic pointer that refers to the "current object execution context."
// - Technical Def: An automatically evaluated evaluation-phase binding that refers to 
//   the object currently executing or invoking the active function.
// - The Rule: Its value is not static; it is determined entirely by *how* a function is called at runtime.


// ============================================================================
// THE DYNAMIC 'THIS' KEYWORD
// ============================================================================

// 1. GLOBAL CONTEXT
console.log("Global 'this' in Node:", this);
// 📝 Output: {} (An empty object in Node.js environment)


// 2. OBJECT METHOD CONTEXT
const user = {
    username: "Manoj",
    price: 999,

    welcomeMessage: function () {
        // 'this' points directly to the object currently running the function
        console.log(`\n${this.username}, welcome to the website!`);

        // Let's print the entire object context:
        console.log("Current 'this' Context:", this);
    }
}

user.welcomeMessage();
// ✅ Works! Prints: "Manoj, welcome..." and shows the user object.

// --- THE CONTEXT SHIFT ---
user.username = "Sam"; // We change the value inside the object
user.welcomeMessage();
// ✅ Works! Prints: "Sam, welcome..." because 'this' looks at the current data state.

// ============================================================================
// WHERE TO USE 'THIS' & FUTURE SCOPE
// ============================================================================
// 1. Current Uses: Inside Object Methods to access internal properties, 
//    and in Browser DOM events to reference clicked elements.
//
// 2. Future Concepts to Learn:
//    - Explicit Binding (call, apply, bind): Overriding JS to force-assign 'this'.
//    - Class Constructors: Using 'this' to assign properties to new objects.
//    - Lexical 'this' (Arrow Functions): Functions that inherit 'this' from their outer parent.