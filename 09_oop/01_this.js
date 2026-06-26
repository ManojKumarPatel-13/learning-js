// -------------------------------------------------------------------------
// 📑 SUB-TOPIC A: "Prototype-Based vs. Class-Based"
// -------------------------------------------------------------------------
// * THE CORE DIFFERENCE:
//   - Class-Based Languages (Java, Python): Use strict, rigid paper 
//     blueprints (Classes) to stamp out empty instances (Objects).
//   - Prototype-Based Languages (JavaScript): No blueprints exist. Every
//     entity is a live, active Object in memory. To share traits, objects
//     are directly LINKED to other objects via a "Prototype Chain".
//
// * HOW IT WORKS UNDER THE HOOD:
//   When you try to access a property or method on an object, JavaScript
//   looks inside that object first. If it's missing, it follows an invisible 
//   upward pointer link to its parent object (the Prototype) to find it.

// -------------------------------------------------------------------------
// 📑 SUB-TOPIC B: "The 'this' Keyword & Implicit Binding"
// -------------------------------------------------------------------------
// * THE SENTENCE ANALOGY:
//   Think of 'this' like the pronoun "I" or "me". The meaning of "I" shifts
//   depending entirely on who is currently speaking the sentence.
//
// * THE GOLDEN ENGINE RULE:
//   It does not matter WHERE a function was created. The value of 'this' is
//   evaluated dynamically at runtime based solely on HOW the function is called.
//
// * RULE 1: IMPLICIT BINDING (The Dot Rule)
//   When a method is invoked, look at the immediate LEFT of the dot. That 
//   object becomes the execution context ('this').

const userB = {
    name: "Alex",
    sayHello() {
        console.log(`Hello, my name is ${this.name}`);
    }
};

// -------------------------------------------------------------------------
// 🚨 CRITICAL ARCHITECTURAL TRAP: LOST CONTEXT
// -------------------------------------------------------------------------
// If you copy an object's method to a regular variable, you tear the function
// away from its parent container. You are only copying the raw code string.

const brokenGreeting = userB.sayHello; // Connection to userB snaps here!

// brokenGreeting(); 
// ❌ CRASH / BUG: Logs "Hello, my name is undefined"
// Why? There is no dot to the left of the call. It falls back to default 
// binding, making 'this' look at the global window scope where 'name' is missing.

// -------------------------------------------------------------------------
// 🛡️ THE PRODUCTION FIX: .bind()
// -------------------------------------------------------------------------
// .bind() explicitly forces a function to lock its context to a specific target.

const fixedGreeting = userB.sayHello.bind(userB); // Permanently welded!
fixedGreeting(); // ✅ Outputs safely: "Hello, my name is Alex"

// -------------------------------------------------------------------------
// 📑 SUB-TOPIC A: "Explicit Binding (.call vs .apply)"
// -------------------------------------------------------------------------
// * THE CONCEPT:
//   Forcefully hijacking a function and telling it exactly what object to
//   use as 'this' for that immediate execution cycle.
//
// * THE SEPARATION TECHNIQUE:
//   - .call()  -> Invokes instantly. Pass extra arguments individually (Commas).
//   - .apply() -> Invokes instantly. Pass extra arguments grouped inside an (Array).

function registerNode(sector, grid) {
    console.log(`[${this.nodeId}] Assigned: Sector ${sector} | Grid ${grid}`);
}

const nodeAlpha = { nodeId: "CORE_ALPHA" };

// Explicit Invocation Examples:
registerNode.call(nodeAlpha, "Alpha-4", "G-9");      // C -> Commas
registerNode.apply(nodeAlpha, ["Alpha-4", "G-9"]);   // A -> Array

// -------------------------------------------------------------------------
// 📑 SUB-TOPIC B: "Lexical Binding (Arrow Functions)"
// -------------------------------------------------------------------------
// * THE CORE RULE:
//   Arrow functions do NOT possess their own 'this' tracking context. 
//   They behave exactly like normal variables: they look up to the physical 
//   surrounding code block (lexical environment) where they were written.

const dashboard = {
    systemName: "Mainframe X",
    metrics: ["CPU High"],
    
    printMetrics() {
        // Arrow function inherits 'this' directly from printMetrics() scope
        this.metrics.forEach((item) => {
            console.log(`[${this.systemName}] -> ${item}`); // ✅ Mainframe X
        });
    }
};

// -------------------------------------------------------------------------
// 🚨 CRITICAL ARCHITECTURAL TRAPS & GOTCHAS TO NOTE:
// -------------------------------------------------------------------------
// * * TRAP 1: The Callback Void
//   Passing standard functions into array utilities (like .forEach, .map, or .filter) 
//   forces the callback to execute as a standalone function in the background. 
//   This snaps 'this' back to undefined/window. Always use arrow functions for callbacks.
//
// * * TRAP 2: .bind() is Permalocked
//   Once a function has been hard-bound using '.bind()', you cannot use '.call()' 
//   or '.apply()' later to change its context to a new object. The original bound 
//   context is permanent and wins forever.