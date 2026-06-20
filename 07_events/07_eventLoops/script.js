// ============================================================================
// ARCHITECTURAL PLAYBOOK: THE ASYNCHRONOUS EVENT LOOP & TASK QUEUES
// ============================================================================

// ============================================================================
// PART 1: TECHNICAL DEFINITIONS & ENGINE COMPONENTS
// ============================================================================
/*
  1. THE CALL STACK (Single-Threaded Engine)
     - A strict LIFO (Last-In, First-Out) data structure that tracks running code.
     - JavaScript has exactly ONE call stack. It executes one frame at a time.
     - If a function blocks the stack, the browser layout engine completely freezes.

  2. WEB APIs (Browser C++ Background Helpers)
     - Threaded utilities provided by the browser environment (not the JS language).
     - Handles background operations like timers (setTimeout), network requests (fetch),
       and DOM hardware input tracking drivers.

  3. MICROTASK QUEUE (The VIP Priority Line)
     - Holds high-priority resolution callbacks generated exclusively by Promises 
       (.then, .catch, async/await structures) and MutationObservers.
     - RULE: The Event Loop MUST empty this queue to 0 before yielding control anywhere else.

  4. MACROTASK QUEUE / CALLBACK QUEUE (The Standard Line)
     - Holds low-priority callbacks from timers (setTimeout), I/O operations, and 
       hardware DOM user events (click, keydown).
     - RULE: The Event Loop executes exactly ONE macrotask per rotation cycle.
*/

// ============================================================================
// PART 2: TRACING THE TIMELINE MECHANICS
// ============================================================================

console.log("🚀 [STACK START]: Line 1 - Synchronous Frame"); // TASK 1

// Handed to Web API thread. Expires immediately (0ms) and queues into MACROTASK line.
setTimeout(() => {
    console.log("⏱️ [MACROTASK]: Timer Callback Executed."); // TASK 4
}, 0);

// Handed to Web API thread. Resolves instantly and queues into MICROTASK VIP line.
Promise.resolve().then(() => {
    console.log("💎 [MICROTASK VIP]: Promise Resolution Callback Executed."); // TASK 3
});

console.log("🏁 [STACK END]: Line 14 - Synchronous Frame"); // TASK 2

/*
  --- THE PREDICTED TECHNICAL EXECUTION FLOW ---
  1. Synchronous commands run first via the Call Stack: Prints "STACK START".
  2. setTimeout is offloaded to Web APIs -> Queues callback to Macrotask line.
  3. Promise is offloaded to Web APIs -> Queues callback to Microtask line.
  4. Synchronous commands finish: Prints "STACK END".
  5. Call Stack clears to empty. The Event Loop wakes up.
  6. Event Loop flushes the Microtask Queue completely: Prints "MICROTASK VIP".
  7. Event Loop pops exactly one entry from the Macrotask Queue: Prints "TIMER CALLBACK".
  
  Final Print Output Array Sequence:
  "STACK START" -> "STACK END" -> "MICROTASK VIP" -> "TIMER CALLBACK"
*/



const triggerBtn = document.getElementById("trigger-race");
const terminal = document.getElementById("terminal-screen");

triggerBtn.addEventListener("click", function () {
    // Clear the screen layout reset
    terminal.innerHTML = "";

    // 1. Synchronous Action (Call Stack)
    logToScreen("1. Pushing Synchronous Log A onto Call Stack", "sync");

    // 2. Macrotask Action (Timer)
    setTimeout(() => {
        logToScreen("4. Macrotask Queue Cleared: Timer Callback executed.", "macro");
    }, 0);

    // 3. Microtask Action (Promise VIP Line)
    Promise.resolve().then(() => {
        logToScreen("3. Microtask Queue Cleared: Promise VIP Callback executed.", "micro");
    });

    // 4. Synchronous Action (Call Stack)
    logToScreen("2. Pushing Synchronous Log B onto Call Stack", "sync");
});

// Helper tracking method to output formatted lines straight to our dashboard view
function logToScreen(message, classification) {
    const rowStr = `<div class="log-${classification}">${message}</div>`;
    terminal.innerHTML += rowStr;
}