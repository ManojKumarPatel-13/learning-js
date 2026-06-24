// =========================================================================
// 🔬 THE EVENT LOOP TIMELINE DEMONSTRATION
// =========================================================================

console.log("1. 🟢 [SYNCHRONOUS]: Main thread execution begins.");

// --- MACRO-TASK REGISTRATION ---
// We register a timer set to exactly ZERO milliseconds.
// It finishes instantly and its callback gets queued inside the MACRO-TASK queue.
setTimeout(() => {
    console.log("2. 🍊 [MACRO-TASK]: setTimeout (0ms) callback executed.");
}, 0);

// --- MICRO-TASK REGISTRATION ---
// We resolve a promise instantly.
// Its '.then()' callback gets queued inside the high-priority MICRO-TASK queue.
Promise.resolve()
    .then(() => {
        console.log("3. 🧪 [MICRO-TASK A]: First Promise resolution handler executed.");
    })
    .then(() => {
        // Chained .then() blocks run sequentially as part of the microtask draining process
        console.log("4. 🧪 [MICRO-TASK B]: Second chained Promise handler executed.");
    });

console.log("5. 🔴 [SYNCHRONOUS]: Main thread script reaches the end.");

/**
 * =========================================================================
 * 📋 EXACT RUNTIME LOGGING OUTPUT ORDER EXPLAINED:
 * =========================================================================
 * * 1st -> "1. 🟢 [SYNCHRONOUS]: Main thread execution begins."
 * 2nd -> "5. 🔴 [SYNCHRONOUS]: Main thread script reaches the end."
 * 3rd -> "3. 🧪 [MICRO-TASK A]: First Promise resolution handler executed."
 * 4th -> "4. 🧪 [MICRO-TASK B]: Second chained Promise handler executed."
 * 5th -> "2. 🍊 [MACRO-TASK]: setTimeout (0ms) callback executed."
 * * WHY? Trace the execution machinery step-by-step:
 * 1. Synchronous statements (Log 1 and 5) run instantly on the primary Call Stack.
 * 2. The stack clears. The Event Loop wakes up and checks priorities.
 * 3. It sees the Microtask Queue contains 'MICRO-TASK A'. It runs it.
 * 4. Running A generates 'MICRO-TASK B'. The Event Loop refuses to move on to macro
 * tasks until the microtask queue is dead empty, so it executes B immediately.
 * 5. With the microtask lane clear, the loop finally checks the Macrotask queue 
 * and executes the waiting 'setTimeout' callback.
 */


// =========================================================================
// 🚨 CRITICAL ARCHITECTURAL TRAPS & GOTCHAS TO NOTE:
// =========================================================================

/**
 * * * TRAP 1: The UI-Freezing Thread Starvation
 * Because the Event Loop will aggressively execute microtasks until the queue is empty 
 * before ever allowing macrotasks or UI re-rendering cycles to pass, recursively adding 
 * tasks to the Microtask Queue will permanently starve the browser. The interface will 
 * completely freeze, animations will break, and the page will crash.
 * * Dangerous Example (DO NOT EXECUTE IN BROWSER):
 * function infiniteMicrotaskLoop() {
 * Promise.resolve().then(infiniteMicrotaskLoop); // Locks the microtask cycle forever!
 * }
 * * * TRAP 2: The Fallacy of the setTimeout Timer
 * The millisecond argument you give to 'setTimeout(callback, 1000)' is NOT a guarantee 
 * that the code will run exactly 1000ms later. It means the code will enter the Macrotask 
 * Queue *no earlier* than 1000ms. If the Call Stack or the Microtask Queue is busy running 
 * intense operations when that timer expires, your timer callback will sit and wait in line, 
 * running much later than requested.
 * * * TRAP 3: Synchronous Promise Constructor Logic
 * Remember that the inside code of a Promise constructor function is executed SYNCHRONOUSLY! 
 * Only the execution triggers you hook up inside '.then()' or '.catch()' are pushed off 
 * into the asynchronous Microtask Queue.
 * * Example:
 * new Promise((resolve) => {
 * console.log("Inside Constructor"); // ◄── This line runs SYNCHRONOUSLY, right now!
 * resolve();
 * }).then(() => {
 * console.log("Inside .then()");     // ◄── This line runs ASYNCHRONOUSLY as a microtask.
 * });
 */