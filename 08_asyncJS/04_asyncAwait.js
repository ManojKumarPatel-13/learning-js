// Simulating an asynchronous core worker function
const simulatedApiCall = (shouldSucceed) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldSucceed) {
                resolve({ status: 200, payload: "System Matrix Re-aligned." });
            } else {
                reject(new Error("Database write-lock conflict [ERR_CODE_551]"));
            }
        }, 1000);
    });
};

// =========================================================================
// 🔬 MODERN ASYNC/AWAIT PRODUCTION PIPELINE
// =========================================================================

/**
 * --- THE MECHANICS ---
 * Placed before the function, 'async' forces the function to return a Promise.
 * Inside, 'await' unrolls the resolved payload of a promise sequentially.
 */
async function executeSystemDiagnostics() {
    console.log("1. 🟢 [ASYNC EXECUTION]: Initiating system diagnostic scan...");

    // We open a try block to gracefully trap any runtime failures or promise rejections
    try {
        // Line 35 pauses this function's execution thread until simulatedApiCall resolves.
        // The main thread drops out to process other UI actions while this waits!
        const successResponse = await simulatedApiCall(true); 
        console.log(`2. 🔗 [SUCCESS UNPACKED]: Response Data -> ${successResponse.payload}`);

        console.log("3. ⚠️ [CRITICAL TEST]: Intentionally triggering a failure vector...");
        
        // This next call forces a rejection. The promise will fail, and JavaScript
        // will instantly interrupt execution here and hurl the error into the catch block.
        const structuralFailure = await simulatedApiCall(false);
        
        console.log("This line will NEVER execute"); // Because line 37 thrown straight to catch

    } catch (error) {
        // Centralized location where all internal errors or rejected promises land safely
        console.error(`4. 💥 [CRITICAL CATCH CAPTURE]: Intercepted operational error: ${error.message}`);
    } finally {
        // Runs cleanly regardless of success or crash vectors, ideal for state cleanup
        console.log("5. 🔒 [CYCLE COMPLETION]: Diagnostic runtime pipeline deactivated.");
    }
}

// Running the master function
executeSystemDiagnostics();


// =========================================================================
// 🚨 CRITICAL ARCHITECTURAL TRAPS & GOTCHAS TO NOTE:
// =========================================================================

/**
 * * * TRAP 1: The "Async Poisoning" Cascade Effect
 * The moment you mark a function as 'async', it ALWAYS returns a Promise. This means 
 * any other function that calls this function must now treat it as asynchronous. 
 * Asynchrony spreads through a codebase like a virus; you cannot easily extract 
 * a synchronous value out of an async context.
 * * Example:
 * async function getNumber() { return 42; }
 * const value = getNumber(); 
 * console.log(value); // ❌ Logs: 'Promise { <pending> }' instead of the number 42!
 * * * TRAP 2: The Sequential Execution Bottleneck (The Serial Sluggishness)
 * Putting 'await' on every single line blocks that specific sequence from moving forward. 
 * If you have three completely independent API fetches to run, awaiting them one after 
 * another multiplies your waiting time needlessly.
 * * Slow Code Example:
 * const users = await fetchUsers(); // Waits 1 second
 * const posts = await fetchPosts(); // Waits 1 second (Starts after users finishes)
 * const memes = await fetchMemes(); // Waits 1 second (Starts after posts finishes)
 * // ❌ Total execution time = 3 seconds! 
 * * * TRAP 3: Forgetting the 'await' entirely
 * If you invoke an asynchronous function but forget to type the 'await' keyword before it, 
 * JavaScript will not pause. It will assign the raw pending Promise object instance directly 
 * to your variable and move on down the page instantly without throwing a warning.
 * * Example:
 * const data = simulatedApiCall(true); // Missing await!
 * console.log(data.payload);           // ❌ Logs: 'undefined' because data is just a pending Promise object!
 */