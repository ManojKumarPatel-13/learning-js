// ----------------------------------------------------------------------------
// TOPIC: VARIABLE-DRIVEN CONDITIONALS (WHILE & DO-WHILE)
// ----------------------------------------------------------------------------
// - Entry-Controlled (while): Condition checked first. Block execution min = 0.
// - Exit-Controlled (do-while): Condition checked last. Block execution min = 1.
// - Infinite Loop Danger: If the tracking condition statement is never updated 
//   inside the block scope, the thread locks up infinitely, causing a crash.

// ----------------------------------------------------------------------------
// DEVELOPMENT SCENARIO: SERVER API POLLING (ENTRY-CONTROLLED)
// PROBLEM: A client application needs to poll a server gateway for a status update. 
// It will keep polling as long as the status is "PENDING" and we haven't hit 
// the max retry threshold.
// ----------------------------------------------------------------------------
console.log("--- STARTING API SERVER POLLING ---");

let serverStatus = "PENDING";
let retryAttempts = 0;
const maxRetries = 3;

while (serverStatus === "PENDING" && retryAttempts < maxRetries) {
    retryAttempts++;
    console.log(`Connection attempt ${retryAttempts}: Fetching updates...`);

    if (retryAttempts === 2) {
        // Simulating the server updating its data state dynamically
        serverStatus = "SUCCESS";
    }
}

console.log(`Polling complete. Final Server State: ${serverStatus}`);


// ----------------------------------------------------------------------------
// DEVELOPMENT SCENARIO: DOCKER CONTAINER BOOT SEQUENCE (EXIT-CONTROLLED)
// PROBLEM: A container startup script must run its system self-check logic 
// at least once. If it detects a bad environment configuration, it flags the error 
// and stops; otherwise, it loops to maintain uptime.
// ----------------------------------------------------------------------------
console.log("\n--- INITIATING CONTAINER RUN ENVIRONMENT ---");

let environmentIsHealthy = false;

do {
    // 💡 WHY THIS RUNS: Even though environmentIsHealthy is false, the engine 
    // enters the exit-controlled block immediately before evaluating the condition!
    console.log("System Status: Executing core boot architecture scan...");

    // Perform manual calibration check:
    console.log("Alert: Critical health anomaly registered.");
    // Condition remains false, preventing a lock up loop
} while (environmentIsHealthy);

console.log("Container boot execution halted cleanly.");


// ----------------------------------------------------------------------------
// LOGIC / DSA PUZZLE: THE BINARY DECOMPOSITION MATRIX
// PROBLEM: Take any positive integer and divide it by 2 repeatedly using a loop 
// until it drops down to less than or equal to 1. Track how many operations it took.
// (This is the underlying math for log2 calculations used in big-O performance).
// ----------------------------------------------------------------------------
console.log("\n--- LOGIC PUZZLE: BINARY LOG DECOMPOSITION ---");

let evaluationTarget = 64;
let operationStepsCount = 0;

while (evaluationTarget > 1) {
    evaluationTarget = Math.floor(evaluationTarget / 2);
    operationStepsCount++;
    console.log(`Step ${operationStepsCount}: Target decomposed down to: ${evaluationTarget}`);
}

console.log(`Total log2 step iterations required: ${operationStepsCount}`);


// ----------------------------------------------------------------------------
// TOPIC: THE INFINITE LOOP MEMORY MYTH (INTERVIEW GRADE)
// ----------------------------------------------------------------------------
// - The Core Question: Does an infinite loop cause a Stack Overflow?
// - The Answer: NO. A Stack Overflow only happens when the Call Stack grows 
//   VERTICALLY (e.g., recursive functions piling up memory frames).
// - Loop Reality: A loop operates HORIZONTALLY inside the exact same execution 
//   context frame. The stack frame size stays flat at 1.
// - The True Danger: Single-Thread Blockage (CPU Resource Starvation). The 
//   engine consumes 100% of the thread's processing power, freezing the runtime.

// ----------------------------------------------------------------------------
// THE DANGEROUS WORKBENCH (DO NOT UNCOMMENT IN PRODUCTION)
// ----------------------------------------------------------------------------
/*
let environmentIsHealthy = false;

do {
    console.log("System Running...");
    environmentIsHealthy = true; // 🚨 THE TRAP: Flipped to true with no exit strategy!
    
    // The Call Stack remains at: [ GEC ]
    // It never grows, so it never throws a Stack Overflow error.
    // Result: Terminal floods infinitely, CPU usage spikes to max capacity.
} while (environmentIsHealthy);
*/