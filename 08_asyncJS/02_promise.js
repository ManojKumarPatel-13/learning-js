/**
 * =========================================================================
 * MASTER FILE 02: THE PROMISE PARADIGM & LINEAR PROMISE CHAINING
 * File Type: Live JavaScript (.js) Code Documentation
 * =========================================================================
 * * PURPOSE: To completely master the creation, state transitions, and
 * fluent chaining of Promises, eliminating the nested callback pattern.
 */

// =========================================================================
// 🔬 TOPIC 1: PROMISE CONSTRUCTION & INDEPENDENT CONSUMPTION
// =========================================================================

/**
 * --- THE PRODUCER SIDE (Creating a Promise) ---
 * We use the 'new Promise()' constructor. It accepts an execution function
 * that gives us two built-in control triggers:
 * - resolve(value): Flips state from 'pending' -> 'fulfilled'
 * - reject(error): Flips state from 'pending' -> 'rejected'
 */
const fetchDatabaseRecord = (recordId) => {
    return new Promise((resolve, reject) => {
        console.log(`📡 [PRODUCER]: Initiating background task for ID: ${recordId}...`);

        // Offloading data fetch to the browser Web API background thread
        setTimeout(() => {
            const operationSuccessful = true; // Toggle to false to force a rejection error

            if (operationSuccessful) {
                const rawRecord = { id: recordId, data: "System Matrix Payload" };
                resolve(rawRecord); 
            } else {
                reject(new Error(`Database connection timed out on record: ${recordId}`));
            }
        }, 1500);
    });
};

/**
 * --- THE CONSUMER SIDE (Handling a Promise) ---
 * We listen to the state changes of the promise using explicit method blocks:
 * - .then()   -> Executes immediately when the state changes to 'fulfilled'
 * - .catch()  -> Executes immediately when the state changes to 'rejected'
 * - .finally()-> Executes no matter what, when the operation closes down
 */
console.log("🟢 [SYSTEM]: Activating independent promise test.");

fetchDatabaseRecord("REC_001")
    .then((recordData) => {
        console.log(`➡️ [CONSUMER .then()]: Success data unpacked:`, recordData);
    })
    .catch((error) => {
        console.error(`💥 [CONSUMER .catch()]: Caught expected error: ${error.message}`);
    })
    .finally(() => {
        console.log("🔒 [CONSUMER .finally()]: Operational cycle terminated.");
    });


// =========================================================================
// 🔬 TOPIC 2: PROMISE CHAINING (Linear Pipelines)
// =========================================================================

/**
 * --- THE CONCEPT ---
 * To execute asynchronous operations sequentially without nesting, we take 
 * advantage of the rule: Every '.then()' block returns a NEW Promise.
 * By returning data or a fresh Promise from inside a '.then()', we pipe values
 * straight down into the next sequential '.then()' block underneath it.
 */

function step1Authenticate(userId) {
    return new Promise((res) => setTimeout(() => res({ uid: userId, token: "AUTH_XYZ" }), 500));
}

function step2FetchPermissions(authObject) {
    return new Promise((res) => setTimeout(() => res(`Clearance level for token ${authObject.token}: Admin`), 500));
}

console.log("\n🚀 [SYSTEM]: Starting sequential pipeline chain...");

// Notice how the code stacks vertically downwards instead of indenting horizontally!
step1Authenticate("Manoj_99")
    .then((authResult) => {
        console.log("🔗 [CHAIN STEP 1]: User token generated.");
        // We return a NEW promise. The next .then() down the line will wait for it!
        return step2FetchPermissions(authResult); 
    })
    .then((permissionsResult) => {
        console.log(`🔗 [CHAIN STEP 2]: ${permissionsResult}`);
        // We return a simple raw string string value
        return "Pipeline Complete!"; 
    })
    .then((finalString) => {
        // The simple string returned above is automatically wrapped in a resolved promise!
        console.log(`🏁 [CHAIN STEP 3]: ${finalString}`);
    })
    .catch((chainError) => {
        // Centralized Error Catching: If STEP 1 or STEP 2 fails, execution drops instantly
        // straight down to this single catch block, completely skipping intermediate steps.
        console.error(`💥 [CHAIN ERROR]: Pipeline crashed: ${chainError.message}`);
    });


/**
 * =========================================================================
 * 🚨 CRITICAL ARCHITECTURAL TRAPS & GOTCHAS TO NOTE:
 * =========================================================================
 * * * TRAP 1: The Broken Chain (The Forgotten Return)
 * If you do not explicitly use the 'return' keyword inside a '.then()' block, 
 * the next '.then()' in the chain will receive 'undefined' as its input argument!
 * * Bad Example:
 * .then(user => { step2FetchPermissions(user); }) // Missing 'return' before step2!
 * .then(data => { console.log(data); })          // ❌ Logs: 'undefined' immediately!
 * * * TRAP 2: Immutability Constraint
 * A Promise can change its internal state EXACTLY ONCE. Once it flips from pending 
 * to fulfilled or rejected, it is permanently locked down. You cannot call resolve() 
 * twice to stream multiple values out over time.
 * * * TRAP 3: The "Nested Promise" Anti-Pattern (Returning to Callback Hell)
 * Do not nest promises inside each other. If you write a '.then()' and open another 
 * promise chain inside it without returning it, you are re-creating Callback Hell using Promises!
 * * Bad Example:
 * fetchUser().then(user => {
 * fetchPosts(user).then(posts => { // ❌ Nested! This destroys the vertical advantage.
 * console.log(posts);
 * });
 * });
 * * Correct Architecture:
 * fetchUser()
 * .then(user => return fetchPosts(user)) // Flattened!
 * .then(posts => console.log(posts));
 */