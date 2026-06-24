// Helper utility to simulate remote server endpoints
const buildWorkerNode = (payload, delay, shouldSucceed = true) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (shouldSucceed) res(payload);
            else rej(new Error(`Node Crash: Failure inside [${payload}]`));
        }, delay);
    });
};

// =========================================================================
// 🔬 MODULE 1: CONCURRENT PROMISE COMBINATORS IN ACTION
// =========================================================================

async function runParallelCombinators() {
    console.log("1. 🟢 [COMBINATORS START]: Initializing concurrent worker array...");

    const taskList = [
        buildWorkerNode("PACKET_ALPHA", 1000, true),
        buildWorkerNode("PACKET_BRAVO", 1500, true),
        buildWorkerNode("PACKET_CHARLIE", 500, true)
    ];

    // --- 1. PROMISE.ALL EXECUTING IN PARALLEL ---
    try {
        const startTime = Date.now();
        // Spawns all three background workers simultaneously.
        // Total time is determined by the SLOWEST task (1500ms), NOT the sum of all!
        const consolidatedResults = await Promise.all(taskList);
        console.log(`2. ⚡ [PROMISE.ALL SUCCESS]: Execution duration: ${Date.now() - startTime}ms`);
        console.log("   Results Array:", consolidatedResults); // ["PACKET_ALPHA", "PACKET_BRAVO", "PACKET_CHARLIE"]
    } catch (err) {
        console.error("Promise.all crashed completely due to a single failure vector.");
    }

    // --- 2. PROMISE.ALLSETTLED SAFETY NET ---
    console.log("\n3. 🔍 [ALL_SETTLED RUN]: Spawning mixed outcome array...");
    const mixedTasks = [
        buildWorkerNode("SECURE_NODE", 500, true),
        buildWorkerNode("CORRUPTED_NODE", 800, false) // This one will throw an error
    ];

    const auditReport = await Promise.allSettled(mixedTasks);
    // Never crashes! It delivers an array describing the lifecycle of every element.
    console.log("   Audit Report Structure:", auditReport);
    /* Output Shape:
       [
         { status: "fulfilled", value: "SECURE_NODE" },
         { status: "rejected", reason: Error: Node Crash... }
       ]
    */
}

runParallelCombinators();


// =========================================================================
// 🔬 MODULE 2: API CONSUMPTION WITH REAL-TIME NETWORK CANCELLATION
// =========================================================================

async function fetchWithNetworkTimeout(url, timeoutMs) {
    // Step 1: Instantiate the browser's native control machine
    const controller = new AbortController();
    const { signal } = controller; // Extract the tracking configuration token

    // Step 2: Establish a self-destruct countdown timer
    const timeoutId = setTimeout(() => {
        console.log(`\n🚨 [TIMEOUT TRIGGER]: Server hung beyond ${timeoutMs}ms. Activating kill switch!`);
        controller.abort(); // Intercepts the HTTP pipeline and snaps the connection instantly
    }, timeoutMs);

    try {
        // Step 3: Pass the tracking signal directly into the options object of the fetch API
        const response = await fetch(url, { signal });
        const cleanJson = await response.json();

        clearTimeout(timeoutId); // Network completed safely in time! Clear the countdown bomb.
        return cleanJson;

    } catch (error) {
        // When controller.abort() triggers, fetch throws a specialized DOMException color-coded error
        if (error.name === "AbortError") {
            console.error("💥 [NETWORK CANCELLATION]: Fetch request successfully destroyed at client boundary.");
        } else {
            console.error("💥 [STANDARD NETWORK ERROR]: Real connection problem:", error.message);
        }
    }
}

// Testing the abort machinery against a real, slow streaming API network route
fetchWithNetworkTimeout("https://httpbin.org/delay/5", 2000);
// Request takes 5 seconds to load, but our threshold is 2 seconds. It will abort!


/**
 * =========================================================================
 * 🚨 CRITICAL ARCHITECTURAL TRAPS & GOTCHAS TO NOTE:
 * =========================================================================
 * * * TRAP 1: The Promise.all Short-Circuit Blast Radius
 * If you feed 50 independent promises into Promise.all, and 49 succeed perfectly but 1 single 
 * minor background item fails, Promise.all rejects instantly. You lose visibility into all 
 * other 49 successful packets. For resilient apps where minor task failures are fine, 
 * use Promise.allSettled() instead.
 * * * TRAP 2: Reusing AbortController Signals
 * Once an AbortController instance invokes '.abort()', that specific internal signal token 
 * is permanently marked as aborted. If you attempt to pass that same signal token to a subsequent 
 * fetch call, the new fetch call will crash and cancel itself instantly before ever opening a network socket. 
 * Always create a 'new AbortController()' instance for fresh network lifecycles.
 * * * TRAP 3: Promise.race Silent Promise Rejections
 * If you use Promise.race to establish timeouts on regular processing routines, remember: 
 * if a slower promise fails AFTER the faster promise has already won, that background rejection 
 * can still throw unhandled promise rejection warnings in the global scope if not configured carefully.
 */