// =========================================================================
// 🔬 TOPIC 1: SYNCHRONOUS VS. ASYNCHRONOUS EXECUTION
// =========================================================================

/**
 * --- THE CONCEPT ---
 * JavaScript is inherently SINGLE-THREADED. It possesses exactly one Call Stack.
 * This means it can only calculate or execute one single thing at a time.
 * * 1. SYNCHRONOUS (Blocking):
 * Code runs line-by-line, strictly in order. Line 2 CANNOT run until Line 1 
 * is completely finished. If Line 1 takes a long time, the whole browser freezes.
 * * 2. ASYNCHRONOUS (Non-Blocking):
 * Allows JavaScript to offload massive or slow tasks (like network fetches or timers)
 * to the browser environment (Web APIs). JavaScript skips the waiting phase and
 * instantly executes the next lines of code, keeping the interface fluid.
 */

// --- LIVE EXAMPLE: SYNCHRONOUS THREAD BLOCKING ---
console.log("🟢 [SYNC START]: Initiating system boot sequence.");

function blockMainThreadForTwoSeconds() {
    const startTime = Date.now();
    // This heavy while-loop forcefully locks up the single JavaScript Call Stack
    while (Date.now() - startTime < 2000) {
        // The thread is trapped here. Try clicking buttons in a browser while this runs!
    }
    console.log("⚠️ [SYNC MID]: Heavy calculation finally completed after 2 seconds.");
}

blockMainThreadForTwoSeconds();
console.log("🔴 [SYNC END]: UI Dashboard successfully rendered.");
// EXPECTED LOG ORDER: 
// 1. [SYNC START] -> 2. [SYNC MID] (2s freeze) -> 3. [SYNC END]

console.log("--------------------------------------------------");

// --- LIVE EXAMPLE: ASYNCHRONOUS NON-BLOCKING ENGINE ---
console.log("🟢 [ASYNC START]: Deploying scanner sensor packet.");

// We offload a 2-second delay to the Web API timer pool.
// The JavaScript engine instantly moves past this line without waiting!
setTimeout(() => {
    console.log("⚡ [ASYNC MID]: Background data packet successfully returned.");
}, 2000);

console.log("🔴 [ASYNC END]: Interface terminal fully stabilized.");
// EXPECTED LOG ORDER:
// 1. [ASYNC START] -> 2. [ASYNC END] (Instant) -> 3. [ASYNC MID] (Fires 2s later)


// =========================================================================
// 🔬 TOPIC 2: CALLBACKS & THE HELL OF NESTED INVERSION
// =========================================================================

/**
 * --- THE CONCEPT ---
 * Because asynchronous actions finish in the background at an unpredictable time,
 * you cannot just assign their result to a standard variable.
 * * 1. CALLBACK FUNCTION:
 * A regular function passed as an input argument into another function. 
 * The host function promises to execute this argument later when its 
 * background work concludes.
 * * 2. CALLBACK HELL (The Pyramid of Doom):
 * When sequential asynchronous steps depend on each other (e.g., Get User -> 
 * Get User's Posts -> Get Post Comments), you are forced to nest callbacks inside 
 * callbacks. The code starts expanding horizontally, forming an unreadable pyramid shape.
 */

// --- LIVE EXAMPLE: STANDARD ASYNCHRONOUS CALLBACK ---
function checkUserSecurityClearance(userId, callbackAction) {
    console.log(`[DATABASE]: Querying records for User: ${userId}...`);
    
    setTimeout(() => {
        const fakeUserRecord = { id: userId, username: "manoj_dev", clearance: "Level-3" };
        // We pass the completed background object into our callback trigger
        callbackAction(fakeUserRecord);
    }, 1500);
}

// Consuming the callback function
checkUserSecurityClearance(101, (user) => {
    console.log(`➡️ [CALLBACK EXECUTED]: Access granted for ${user.username}. Clearance: ${user.clearance}`);
});


// --- LIVE EXAMPLE: THE MANIFESTATION OF CALLBACK HELL ---
// Watch how the code aggressively indents inward to execute 4 dependent steps sequentially.
function simulateCallbackHell() {
    setTimeout(() => {
        console.log("🛑 Layer 1: Authenticated User Login Token.");
        
        setTimeout(() => {
            console.log("   🛑 Layer 2: Extracted User Profile Settings.");
            
            setTimeout(() => {
                console.log("      🛑 Layer 3: Fetched Channel Subscription Streams.");
                
                setTimeout(() => {
                    console.log("         🛑 Layer 4: Hydrated DOM Layout Blocks. App Loaded.");
                    
                }, 500);
            }, 500);
        }, 500);
    }, 500);
}
simulateCallbackHell();


/**
 * =========================================================================
 * 🚨 CRITICAL ARCHITECTURAL TRAPS & GOTCHAS TO NOTE:
 * =========================================================================
 * * * TRAP 1: The Inversion of Control Trust Fracture
 * When you pass a callback function into a third-party open-source library or external utility, 
 * you lose all control of your execution thread. You are entirely trusting that external library 
 * to invoke your code. If their internal module has a bug, your callback might be executed 
 * zero times, executed 500 times in a loop, or executed at the wrong timestamp entirely.
 * * * TRAP 2: Fragile Error Handling Duplication
 * In standard Callback design, errors must be passed manually back down through the arguments. 
 * Because of this, you are forced to duplicate error handling logic at every single level of 
 * your nested code blocks, creating massive structural redundancy:
 * * Example of Error Trap code shape:
 * databaseCall((data, error) => {
 * if (error) { handleTheError(); return; }
 * networkCall(data, (response, error) => {
 * if (error) { handleTheError(); return; } // Duplicated catch code
 * renderUi(response);
 * });
 * });
 * * * TRAP 3: The Ghostly Return Value
 * You cannot 'return' a value out of an asynchronous callback back into your main synchronous code.
 * Example:
 * function getData() {
 * setTimeout(() => { return "Secret Data"; }, 1000);
 * }
 * const result = getData(); 
 * console.log(result); // ❌ Outputs: 'undefined'! Because getData() finished instantly before the timer ran.
 */