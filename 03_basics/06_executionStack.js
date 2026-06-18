// ============================================================================
//         THE ULTIMATE MASTERCLASS GUIDE TO JAVASCRIPT EXECUTION CONTEXT
// ============================================================================

// ----------------------------------------------------------------------------
// THEORY SECTION 1: WHAT IS THE EXECUTION CONTEXT (EC)?
// ----------------------------------------------------------------------------
// - Definition: The Execution Context is an abstract environment created by the 
//   JavaScript engine to evaluate, manage, and execute code. Think of it as a 
//   container box that holds the memory and tools a specific block of code 
//   needs while it is running.
// 
// - The Three Types of Execution Contexts in JavaScript:
//   1. Global Execution Context (GEC): The default, base container created when 
//      your script file first loads. There is always EXACTLY ONE GEC per file. 
//      It creates the global object ('window' in browsers, 'global' in Node.js) 
//      and binds it to the 'this' keyword.
//   2. Function Execution Context (FEC): A brand-new local container spawned 
//      dynamically every single time a function is called. If you call a function 
//      100 times, 100 distinct local execution contexts are born and destroyed.
//   3. Eval Execution Context: A niche context created inside internal 'eval()' 
//      functions (discouraged in modern development due to security issues).

// ----------------------------------------------------------------------------
// THEORY SECTION 2: THE IMMUTABLE TWO-PHASE ENGINE LIFECYCLE
// ----------------------------------------------------------------------------
// JavaScript is an interpreted, single-threaded language, but it does not just 
// blind-read code line-by-line instantly. It processes every single execution 
// context in two strict, mandatory passes:
//
// PHASE 1: SYSTEM MEMORY CREATION PHASE (The Scan Pass)
// - The engine acts like a scout scanning the layout of the terrain. It runs 
//   through your source code from top to bottom searching exclusively for 
//   declarations of variables and functions.
// - It carves out physical space allocations inside the computer's RAM.
// - Key behavior: Variables are allocated space but left as 'undefined'. 
//   Functions have their entire literal body block stored in memory references.
// - No actual logic, assignments, math, or console statements run here.
//
// PHASE 2: CODE EXECUTION PHASE (The Run Pass)
// - The engine travels back to the top of the context environment and starts 
//   processing code line-by-line.
// - This is where values are calculated, string concatenations happen, variables 
//   are initialized with real values, and functions are physically executed.

// ----------------------------------------------------------------------------
// SECTION 3: THE HIGH-LEVEL EXECUTABLE TRACE CODE
// ----------------------------------------------------------------------------

let val1 = 10;
let val2 = 5;

function addNum(num1, num2) {
    let total = num1 + num2;
    return total;
}

// Triggers execution context births and deaths:
let result1 = addNum(val1, val2);
let result2 = addNum(10, 2);

// ----------------------------------------------------------------------------
// SECTION 4: THE MICROSCOPIC RUNTIME LOG FOR THE ABOVE CODE
// ----------------------------------------------------------------------------
// Let's trace the exact atomic states of memory during the running of this file.
//
// STEP 1: Global Execution Context (GEC) is spawned.
//         - The 'this' keyword points to the global object.
//
// STEP 2: PHASE 1 (Memory Creation Phase for Global Code)
//         - Variable 'val1'    --> Allocated slot, initialized as 'undefined'
//         - Variable 'val2'    --> Allocated slot, initialized as 'undefined'
//         - Function 'addNum'  --> Stores its complete literal definition blueprint
//         - Variable 'result1' --> Allocated slot, initialized as 'undefined'
//         - Variable 'result2' --> Allocated slot, initialized as 'undefined'
//
// STEP 3: PHASE 2 (Code Execution Phase for Global Code)
//         - Line 35: 'val1' is explicitly assigned the integer value 10.
//         - Line 36: 'val2' is explicitly assigned the integer value 5.
//         - Lines 38-41: Skipped entirely (blueprint already handled).
//         - Line 44: The engine hits an invocation trigger: addNum(val1, val2).
//                    -> Global execution halts immediately.
//                    -> A local Function Execution Context (FEC) is born.

// ----------------------------------------------------------------------------
// STEP 4: INSIDE THE FIRST MINI-UNIVERSE: FEC for addNum(val1, val2)
// ----------------------------------------------------------------------------
//   -> A. Local Memory Pass:
//      - Parameter 'num1'   --> Created as an empty slot
//      - Parameter 'num2'   --> Created as an empty slot
//      - Variable 'total'   --> Allocated local slot, initialized as 'undefined'
//
//   -> B. Local Execution Pass:
//      - Argument matching: 'num1' receives the passed value 10.
//      - Argument matching: 'num2' receives the passed value 5.
//      - Line 39: The addition math (10 + 5) runs. The value 15 is saved to 'total'.
//      - Line 40: The 'return' keyword is reached. 
//                 - The value 15 is sent out to the global layer.
//                 - CRITICAL MECHANISM: The engine deletes this entire execution 
//                   context immediately. 'num1', 'num2', and 'total' are 
//                   permanently thrown out of RAM via garbage collection.
//
//   -> Global Update: Back in the GEC, the returned value 15 is locked into 'result1'.

// ----------------------------------------------------------------------------
// STEP 5: INSIDE THE SECOND MINI-UNIVERSE: FEC for addNum(10, 2)
// ----------------------------------------------------------------------------
//   -> Line 45: Another invocation trigger is hit. Global execution pauses.
//   -> A completely fresh Function Execution Context is born.
//
//   -> A. Local Memory Pass:
//      - Parameter 'num1' and 'num2' are generated as fresh variables.
//      - Variable 'total' is re-allocated as a new 'undefined' instance.
//
//   -> B. Local Execution Pass:
//      - 'num1' directly receives the value 10.
//      - 'num2' directly receives the value 2.
//      - Line 39: Addition runs (10 + 2). The value 12 is saved to 'total'.
//      - Line 40: 'return' is reached. The value 12 is sent out.
//                 - The local execution context is immediately vaporized from memory.
//
//   -> Global Update: Back in the GEC, the returned value 12 is locked into 'result2'.

// ----------------------------------------------------------------------------
// SUMMARY OF TRACE OUTCOMES
// ----------------------------------------------------------------------------
console.log("--- WORKBENCH OUTCOMES ---");
console.log(`Global val1: ${val1} | Global val2: ${val2}`); // Outputs: 10 | 5
console.log(`Result 1 context output: ${result1}`);       // Outputs: 15
console.log(`Result 2 context output: ${result2}`);       // Outputs: 12

// ----------------------------------------------------------------------------
// SECTION 5: CRITICAL CORNERSTONES EVERY DEVELOPER MUST REMEMBER
// ----------------------------------------------------------------------------
// 1. ISOLATION: Local variables created inside a function's execution context 
//    cannot be accessed by the global scope. They exist only while that function's 
//    context is actively running.
// 2. LIFECYCLE: Functions act like stars—they are born when called, create 
//    energy (data), and collapse into nothingness when their 'return' line is reached.
// 3. THIS BINDING: Every unique Execution Context sets up its own reference for 
//    the 'this' keyword, matching the environment that invoked the execution.









// ============================================================================
// THE CALL STACK (THE LIFECYCLE MANAGER)
// ============================================================================

// 1. CORE DEFINITIONS
// - Simple Def: The Call Stack is a literal stack of "Execution Context Boxes" 
//   piled on top of each other. It tracks exactly where the program currently 
//   is and which function is actively executing.
// - The LIFO Principle: Stands for "Last In, First Out". The last function pushed 
//   onto the stack must be completely finished and popped off before JavaScript 
//   can return to the functions underneath it.
// - Single-Threaded Nature: Because JavaScript has only ONE Call Stack, it can 
//   only do ONE thing at a time. It cannot execute two functions simultaneously.

// ----------------------------------------------------------------------------
// 2. THE THREE-STORY NESTING SIMULATION
// ----------------------------------------------------------------------------
// Let's look at what happens when functions call other functions inside a chain.

function grandParent() {
    console.log("1. Inside Grandparent - Spawning Parent");
    parent();
    console.log("5. Grandparent back on top - complete!");
}

function parent() {
    console.log("2. Inside Parent - Spawning Child");
    child();
    console.log("4. Parent back on top - complete!");
}

function child() {
    console.log("3. Inside Child - Executing core task");
    // At this exact millisecond, the Call Stack is at its maximum height!
}

// TRIGGERING THE STACK MACHINE:
grandParent();

// ----------------------------------------------------------------------------
// 3. VISUAL ARCHITECTURAL TRACE OF THE CALL STACK FOR THE ABOVE RUN
// ----------------------------------------------------------------------------
// Read this from bottom to top to see how memory stacks up and clears down:
//
// [ MOMENT 0: Empty Terminal ]  --> Call Stack: (empty)
// [ MOMENT 1: File Loads ]      --> Call Stack: [ GEC ]
// [ MOMENT 2: line 188 Runs ]    --> Call Stack: [ grandParent ] -> [ GEC ]
// [ MOMENT 3: line 172 Runs ]    --> Call Stack: [ parent ] -> [ grandParent ] -> [ GEC ]
// [ MOMENT 4: line 178 Runs ]    --> Call Stack: [ child ] -> [ parent ] -> [ grandParent ] -> [ GEC ] 
//                                   (💥 MAXIMUM TOWER HEIGHT REACHED HERE 💥)
//
// [ MOMENT 5: child Returns ]   --> Call Stack: [ parent ] -> [ grandParent ] -> [ GEC ]  ('child' is popped!)
// [ MOMENT 6: parent Returns ]  --> Call Stack: [ grandParent ] -> [ GEC ]                ('parent' is popped!)
// [ MOMENT 7: gParent Returns ] --> Call Stack: [ GEC ]                                   ('grandParent' is popped!)
// [ MOMENT 8: Script Ends ]     --> Call Stack: (empty)                                   (GEC is popped, memory clean)

// ----------------------------------------------------------------------------
// 4. THE ULTIMATE STACK TROUBLE: MAXIMUM CALL STACK SIZE EXCEEDED
// ----------------------------------------------------------------------------
// - What is "Stack Overflow"? 
//   If a function calls itself infinitely (infinite recursion) without stopping, 
//   the Call Stack will keep adding boxes onto the pile until it runs out of 
//   allocated browser/Node memory.
// - When it hits the ceiling, the engine panics and throws:
//   "RangeError: Maximum call stack size exceeded"




// ============================================================================
// ITEM 8: THREADS IN JAVASCRIPT (THE SINGLE CONVEYOR BELT)
// ============================================================================

// 1. WHAT IS A THREAD?
// - Definition: A thread is the smallest sequence of programmed instructions 
//   that can be managed independently by an operating system's CPU scheduler. 
//   Think of it as a literal "execution track" or "worker lane" inside the computer.

// 2. THE SINGLE-THREADED ARCHITECTURE OF JS
// - Core Feature: JavaScript is a Synchronous, Single-Threaded language.
// - "Synchronous" means: Code executes in a specific, predictable order (Top -> Bottom).
// - "Single-Threaded" means: The engine possesses exactly ONE execution thread. 
//   It can only handle one instruction box inside its Call Stack at any given time.

// 3. THE SYNCHRONOUS BLOCKING PROBLEM (THE TRUCK ON THE HIGHWAY)
// - Because there is only one thread, if a specific line of code takes 10 seconds 
//   to compute (like an infinite loop or heavy image processing calculation), the 
//   entire thread freezes up. 
// - In a browser environment, this results in the entire webpage UI locking up—the 
//   user cannot click, scroll, or type because the lone thread is stuck processing.

function blockThread() {
    console.log("Thread: Starting calculation...");

    // Simulating a heavy computation that holds the thread hostage
    for (let i = 0; i < 1000000000; i++) {
        // The lone CPU thread is locked inside this loop block!
    }

    console.log("Thread: Finished! The lane is finally clear.");
}

// 4. PREVIEW: HOW DOES JS FEEL FAST IF IT'S SINGLE-THREADED?
// - If JavaScript can only do one thing at a time, how does it load images, 
//   fetch APIs, and run timers smoothly without freezing?
// - Answer: The engine itself is single-threaded, but the environment hosting it 
//   (the Web Browser or Node.js runtime) provides extra helper components 
//   (like Web APIs, the Event Loop, and the Callback Queue) to handle heavy operations 
//   in the background. 
// - You will dive deep into this mechanism when you study Asynchronous JavaScript later!