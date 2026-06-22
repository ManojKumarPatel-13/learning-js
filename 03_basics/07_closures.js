/**
 * ============================================================================
 * MODULE: LEXICAL SCOPING & CLOSURES (PHASE 2 DEEP DIVE)
 * ============================================================================
**/

/* ============================================================================
   TOPIC 1: LEXICAL SCOPING
   ============================================================================ */

/**
 * 💡 THE CONCEPT IN SIMPLE TERMS:
 * Imagine your code is a house with multiple floors.
 * - The GLOBAL SCOPE is the ground floor.
 * - Every time you write a new function, you build a NEW FLOOR on top of it.
 * * People standing on the top floor can look down out of the windows and see 
 * what is happening on the lower floors. However, people on the ground floor 
 * can NEVER look up to see what variables exist on the top floor.
 * * In JavaScript, where you physically *write* your function in your editor 
 * sets its "floor". An inner function can always look upward to read variables 
 * from its parent's floor, but a parent can never look down into a child's floor.
 * * ⚙️ UNDER THE HOOD MECHANICS:
 * When the engine compiles your code, it creates an "Environment Record" 
 * object for every block/function. Each record contains a hidden pointer called 
 * 'outer' that links directly to its parent scope textually. The process of 
 * traversing these pointers upwards is called the "Scope Chain".
 */

// 💻 LIVE CODE TEMPLATE:
const groundFloorValue = "I am global";

function firstFloor() {
    const firstFloorValue = "I am on floor 1";

    function secondFloor() {
        const secondFloorValue = "I am on floor 2";
        
        // SUCCESS: Looking UP the structural stairs via the Scope Chain
        console.log(groundFloorValue); // Accessible!
        console.log(firstFloorValue);  // Accessible!
        console.log(secondFloorValue); // Accessible locally!
    }
    
    secondFloor();
    
    // CRASH TRAP TEST:
    // console.log(secondFloorValue); 
    // ❌ ReferenceError! The parent floor cannot look down into the child floor.
}
firstFloor();


/**
 * ⚠️ INTERVIEW / SIDE TRAP: VARIABLE SHADOWING
 * If a child floor declares a variable with the exact same name as a parent 
 * floor, the child floor "shadows" (hides) the parent's variable. The engine 
 * stops searching upward the moment it finds the first match in the scope chain.
 */
let instructor = "Gemini"; 

function classroom() {
    let instructor = "Local Teacher"; 
    // The global "Gemini" variable is now shadowed and temporarily un-reachable.
    console.log(instructor); // ➔ Logs: "Local Teacher"
}
classroom();



/* ============================================================================
   TOPIC 2: CLOSURES
   ============================================================================ */

/**
 * 💡 THE CONCEPT IN SIMPLE TERMS:
 * Normally, when a execution function finishes executing, its entire call 
 * stack frame is destroyed and its memory is completely wiped clean to save 
 * space (Garbage Collection).
 * * A CLOSURE is like a custom, invisible "backpack" that an inner function 
 * puts on before leaving its parent function. Even if the parent function is dead 
 * and gone from the execution stack, the inner function carries that backpack 
 * around forever, allowing it to read, write, and change the parent's variables 
 * whenever it gets called.
 * * ⚙️ UNDER THE HOOD MECHANICS:
 * If an inner function is exposed to an outer scope (returned, assigned to a 
 * global variable, or passed to an async timer), the V8 engine sees that it 
 * references parent variables. Instead of garbage collecting the parent's 
 * Environment Record, V8 moves that specific scope into a persistent memory 
 * structure on the Heap, preserving it.
 */

// 💻 LIVE CODE TEMPLATE:
function createCounter() {
    let count = 0; // This primitive variable lives inside the function's "backpack"

    return function increment() {
        count++; // Modifying the locked variable inside the closure backpack
        return count;
    };
}

const myCounter = createCounter(); 
console.log(myCounter()); // ➔ 1
console.log(myCounter()); // ➔ 2 (The memory safely persisted between calls!)


/**
 * ⚠️ INTERVIEW / SIDE TRAP: THE ASYNC SHARED LOOP REFERENCE TRAP
 * When using `var` inside loops containing asynchronous callbacks (like `setTimeout`), 
 * `var` does not respect block boundaries `{}`. This means a single, shared memory 
 * slot is created for the variable `i`. 
 * * By the time the async 1-second delay finishes, the loop has completed and 
 * overwritten that single slot until `i` becomes 4. Every callback looks up the 
 * scope chain and reads that exact same shared value.
 */

// ❌ THE TRAP CODE (Prints "4" three times instead of 1, 2, 3):
function brokenAlerts() {
    for (var i = 1; i <= 3; i++) {
        setTimeout(function () {
            // Looks up scope chain, reads shared parent variable which is now 4
            console.log("Alert triggered for ID: " + i); 
        }, 1000);
    }
}
brokenAlerts();

// ✅ THE MODERN PRODUCTION FIX:
// Always use `let`. `let` is block-scoped. On every single loop iteration, 
// the engine physically forces the creation of a brand-new, isolated memory slot 
// for `i`, giving each async callback its own unique, un-mutable snapshot backpack.
function fixedAlerts() {
    for (let i = 1; i <= 3; i++) {
        setTimeout(function () {
            console.log("Alert triggered for ID: " + i); // ➔ Logs: 1, then 2, then 3
        }, 1000);
    }
}
fixedAlerts();
