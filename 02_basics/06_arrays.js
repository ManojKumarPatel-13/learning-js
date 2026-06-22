// filter map reduce and filtermap

// Raw dataset received from our store backend database API
const rawOrderData = [
    { orderId: "ORD_101", status: "completed", amount: 250, items: ["Laptop", "Mouse"] },
    { orderId: "ORD_102", status: "pending",   amount: 45,  items: ["Keyboard"] },
    { orderId: "ORD_103", status: "completed", amount: 120, items: ["Headphones", "Mic"] }
];

// ============================================================================
// 1. FILTER STREAM (The Gatekeeper)
// ============================================================================
// Goal: Extract ONLY completed orders to avoid skewing revenue metrics.
// Callback parameters: (currentElement) -> returns true/false
const completedOrders = rawOrderData.filter((order) => {
    return order.status === "completed";
});
// Result: A brand-new array containing only ORD_101 and ORD_103.


// ============================================================================
// 2. MAP STREAM (The Transformer)
// ============================================================================
// Goal: Extract an array of just the pure financial amount integers from completed orders.
// Callback parameters: (currentElement) -> returns the new transformed value
const orderAmounts = completedOrders.map((order) => {
    return order.amount;
});
// Result: [250, 120]


// ============================================================================
// 3. FLATMAP STREAM (The Single-Pass Flattening Weapon)
// ============================================================================
// Goal: Compile a master, flat list of all individual physical items sold in completed orders.
// Callback parameters: (currentElement) -> returns an array that is automatically flattened
const universalInventorySold = completedOrders.flatMap((order) => {
    return order.items;
});
// Result: ["Laptop", "Mouse", "Headphones", "Mic"]
// Note: If you used .map() here, you would get a messy nested array: [["Laptop", "Mouse"], ["Headphones", "Mic"]]


// ============================================================================
// 4. REDUCE PRODUCTION USE CASES (The Master Accumulator)
// ============================================================================

// --- USE CASE A: CALCULATING FINANCIAL REVENUE TOTALS ---
// Objective: Sum up all order amounts down into a single final numeric total.
// Callback parameters: (accumulator, currentElement)
const totalRevenue = orderAmounts.reduce((runningTotal, currentPrice) => {
    // Whatever is returned here becomes the 'runningTotal' for the next element loop
    return runningTotal + currentPrice;
}, 0); // ➔ '0' is the critical initialValue (the starting point)
// Result: 370


// --- USE CASE B: DATA TRANSFORMATION (ARRAY-TO-OBJECT INDEX LOOKUP MAP) ---
// Objective: Convert our raw order array into a high-speed lookup table indexed by orderId.
// Why do this in production? Searching an array takes O(N) time. Looking up an object key takes O(1) time.
const orderLookupIndex = rawOrderData.reduce((lookupObject, currentOrder) => {
    // 1. Create a key inside our accumulator object equal to the current order's ID
    lookupObject[currentOrder.orderId] = currentOrder;
    
    // 2. Critical Rule: ALWAYS return the accumulator object back to the engine loop
    return lookupObject;
}, {}); // ➔ '{}' is the initialValue (we are accumulating data inside an empty object!)

/* Result: 
{
  "ORD_101": { orderId: "ORD_101", status: "completed", amount: 250... },
  "ORD_102": { orderId: "ORD_102", status: "pending", ... }
}
*/


// --- USE CASE C: BATCH CATEGORY GROUPING ---
// Objective: Group our database entries into categories based on their operational status.
const groupedByStatus = rawOrderData.reduce((groups, currentOrder) => {
    // 1. Read the status key ("completed" or "pending")
    const currentStatus = currentOrder.status;
    
    // 2. If the status bucket doesn't exist yet in our object, initialize it as an empty array
    if (!groups[currentStatus]) {
        groups[currentStatus] = [];
    }
    
    // 3. Push the current order object into the correct matching category bucket array
    groups[currentStatus].push(currentOrder);
    
    // 4. Return the accumulator object
    return groups;
}, {}); // ➔ '{}' is our initial empty categorization ledger object

/**
 * ============================================================================
 * MODULE: THE ADVANCED ARRAY LIFECYCLE (DECLARATIVE DATA STREAMS)
 * ============================================================================
 * Course/Target: 120% JavaScript Mastery
 * File Destination: 02_basics/05_iterations.js
 * ============================================================================
 */

/* * 💡 THE CONCEPT IN SIMPLE TERMS:
 * Old-school loops are IMPERATIVE (you tell the engine step-by-step how to count). 
 * Modern High-Order Array Methods are DECLARATIVE (you tell the engine exactly 
 * what you want done to the data, and it manages the looping loops internally).
 *
 * ⚙️ CORES METHODS EXPLAINED:
 * 1. map() -> Takes an array, runs a transformation function on every element, 
 * and returns a brand-new array of the exact same length. Original is safe.
 * 2. filter() -> Evaluates every element against a boolean test function. Returns 
 * a new array containing only elements that evaluated to true.
 * 3. flatMap() -> Executes a map and then a structural flat() simultaneously. 
 * Bypasses V8 dual-pass array allocation overhead to process data in a single sweep.
 * 4. reduce() -> Compresses an entire array down into a single final data target 
 * (Number, Object, Array, String) by feeding an active "Accumulator" memory slot.
 */

// 💻 LIVE CODE PRODUCTION PIPELINE TEMPLATE
const databaseOrders = [
    { id: "ORD_A", status: "completed", price: 100, inventory: ["Book"] },
    { id: "ORD_B", status: "pending",   price: 50,  inventory: ["Pen"] },
    { id: "ORD_C", status: "completed", price: 200, inventory: ["Bag", "Shoes"] }
];

// Pipeline Execution: Filter completed -> Map prices -> Accumulate revenue
const totalCompletedRevenue = databaseOrders
    .filter(order => order.status === "completed") // Filter out pendings
    .map(order => order.price)                     // Extract raw price numbers: [100, 200]
    .reduce((acc, currentPrice) => acc + currentPrice, 0); // Accumulate to 300

console.log("Total Clean Revenue:", totalCompletedRevenue); // ➔ 300


/* * ⚠️ INTERVIEW / PRODUCTION TRAP #1: THE REDUCE ACCUMULATOR BLACK HOLE
 * Inside the reduce callback, the engine updates the accumulator variable with 
 * whatever your callback function explicitly RETURNS. If you forget to write `return`, 
 * the accumulator implicitly becomes `undefined`, causing a TypeError on the next loop iteration.
 */
try {
    const errorSimulation = [1, 2, 3].reduce((acc, val) => {
        acc.push(val * 2);
        // 🚨 CRITICAL BUG: Missing 'return acc;' statement here!
    }, []);
} catch (error) {
    console.error("➔ Trap 1 Caught Engine Crash:", error.message); 
    // Logs: Cannot read properties of undefined (reading 'push')
}


/* * 🛠️ PRODUCTION USE CASE: HIGH-SPEED INDEXING O(1) LOOKUP UTILITY
 * In enterprise software, searching through a large array of objects via .find() 
 * takes O(N) time. Converting that array into an indexed Object map via .reduce() 
 * allows scripts to look up records instantly in O(1) constant time.
 */
const highSpeedIndexMap = databaseOrders.reduce((lookupContainer, currentRecord) => {
    // Dynamically write key name using bracket notation variable evaluation
    lookupContainer[currentRecord.id] = currentRecord;
    
    // Always return the updated accumulator object back to the engine loop
    return lookupContainer;
}, {}); // Initial value is an empty object block

// Verification of instant O(1) lookup speed
console.log("Instant Target Lookup:", highSpeedIndexMap["ORD_C"].inventory); // ➔ ['Bag', 'Shoes']

/* ============================================================================
 * END OF TOPIC 4
 * ============================================================================
 */


// 1. Raw event logs streaming from multiple server endpoints
const globalSystemLogs = [
    { eventId: "evt_1", type: "click",   severity: "low",    details: { latencyMs: 12 },   errors: [] },
    { eventId: "evt_2", type: "network", severity: "high",   details: { latencyMs: 450 },  errors: ["TIMEOUT_ERR", "GATEWAY_502"] },
    { eventId: "evt_3", type: "auth",    severity: "critical", details: { latencyMs: 89 },   errors: ["BAD_AUTH_SIGNATURE"] },
    { eventId: "evt_4", type: "click",   severity: "low",    details: { latencyMs: 5 },    errors: [] },
    { eventId: "evt_5", type: "network", severity: "high",   details: { latencyMs: 620 },  errors: ["SOCKET_DROPPED"] }
];

// ============================================================================
// 🧱 THE MASTER PROCESSING PIPELINE
// ============================================================================

// STEP A: Filter out trivial "low" severity click noise (Gatekeeper Stream)
const highPriorityLogs = globalSystemLogs.filter((log) => {
    return log.severity === "high" || log.severity === "critical";
});

// STEP B: Normalize and clean up the format of the remaining logs (Transformation Stream)
const normalizedMetrics = highPriorityLogs.map((log) => {
    return {
        id: log.eventId,
        category: log.type,
        performanceMs: log.details.latencyMs,
        hasCrashed: log.errors.length > 0
    };
});

// STEP C: Flatten all scattered system errors into a single clean array list (Flattening Stream)
const masterErrorBlacklist = highPriorityLogs.flatMap((log) => {
    return log.errors;
});

// STEP D: Reduce the clean data down into a final Analytics Summary Report (Accumulator Stream)
const finalAnalyticsReport = normalizedMetrics.reduce((report, currentMetric) => {
    // 1. Accumulate total latency to calculate averages later
    report.totalTrackedLatency += currentMetric.performanceMs;

    // 2. Increment specific category counters dynamically using Bracket Notation
    const categoryKey = currentMetric.category;
    if (!report.categoryCounts[categoryKey]) {
        report.categoryCounts[categoryKey] = 0;
    }
    report.categoryCounts[categoryKey] += 1;

    // 3. Track total application failure alerts
    if (currentMetric.hasCrashed) {
        report.totalAlertsRaised += 1;
    }

    // 4. Return the updated accumulator block
    return report;
}, { 
    totalTrackedLatency: 0, 
    totalAlertsRaised: 0, 
    categoryCounts: {} 
}); // ➔ Handing the engine our custom initial reporting object structure


// ============================================================================
// 🧪 LOGGING THE PRODUCTION METRIC RESULTS
// ============================================================================

console.log("--- FINAL ANALYTICS REPORT ---");
console.log(finalAnalyticsReport);
/* Output:
{
  totalTrackedLatency: 1159,
  totalAlertsRaised: 3,
  categoryCounts: { network: 2, auth: 1 }
}
*/

console.log("\n--- UNIFIED ERROR BLACKLIST ---");
console.log(masterErrorBlacklist);
// Output: ['TIMEOUT_ERR', 'GATEWAY_502', 'BAD_AUTH_SIGNATURE', 'SOCKET_DROPPED']