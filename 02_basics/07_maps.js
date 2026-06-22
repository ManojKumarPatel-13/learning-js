// maps and sets

// ============================================================================
// 1. THE UNIQUE SET PIPELINE (Array Deduplication)
// ============================================================================

const incomingUserIds = ["usr_1", "usr_2", "usr_1", "usr_3", "usr_2"];

// Eliminating duplicates instantly by feeding the array into a Set
const uniqueUserSet = new Set(incomingUserIds);

// Modifying data via native methods:
uniqueUserSet.add("usr_4");   // Appends a new unique string item
uniqueUserSet.add("usr_1");   // 🚫 Ignored by V8 engine! "usr_1" already exists.
uniqueUserSet.delete("usr_2"); // Removes "usr_2" directly from memory

console.log("--- 1. SET REVOLUTION UTILITY ---");
console.log("Total unique count via size property:", uniqueUserSet.size); // Output: 3
console.log("Does usr_1 exist inside?:", uniqueUserSet.has("usr_1"));    // Output: true


// ============================================================================
// 2. THE ADVANCED MAP SYSTEM (Object Keys & Order Enforcement)
// ============================================================================

const systemMetricsMap = new Map();

// Creating complex structural objects to act as KEYS
const serverProfileAlpha = { name: "Server_Alpha" };
const serverProfileBeta  = { name: "Server_Beta" };

// Binding data structures directly together
systemMetricsMap.set(serverProfileAlpha, { status: "healthy", connections: 140 });
systemMetricsMap.set(serverProfileBeta,  { status: "overloaded", connections: 920 });

console.log("\n--- 2. MAP KEY-VALUE INTEGRITY ---");
// Fetching data profiles instantly by passing the key object reference pointer
console.log("Alpha Server Stats:", systemMetricsMap.get(serverProfileAlpha)); 
// Output: { status: 'healthy', connections: 140 }


// ============================================================================
// 3. THE WEAKMAP ENGINE (Memory-Leak Protection Shield)
// ============================================================================

const memoryProtectedCache = new WeakMap();

// This object represents a massive UI DOM component reference string
let UIWidgetNode = { elementId: "dashboard_chart_root" };

// Form a Weak Reference allocation
memoryProtectedCache.set(UIWidgetNode, { cachedCanvasData: "Megabytes of image pixels..." });

console.log("\n--- 3. WEAKMAP LIVE STATUS ---");
console.log("Cache active for widget?:", memoryProtectedCache.has(UIWidgetNode)); // Output: true

// ---- THE SYSTEM CLEANUP TRIGGER ----
// Sever the strong reference to our widget object
UIWidgetNode = null; 

// 🔬 ENGINE EXPLANATION:
// Because UIWidgetNode is now null, the object { elementId: "dashboard_chart_root" } 
// has zero remaining strong reference references in the application.
// V8's Garbage Collector will instantly sweep that object out of the physical computer hardware RAM 
// on its next pass, automatically purging the cache from memoryProtectedCache!


// notes


/* * 💡 THE CONCEPT IN SIMPLE TERMS:
 * Standard objects ({}) are highly restricted: keys must be Strings/Symbols, and 
 * they risk Prototype Pollution. ES6 collections optimize hardware key-value storage.
 *
 * 🗺️ MAP: A robust key-value directory. Allows ANY data type to act as a key 
 * (including nested objects/arrays) and natively tracks its own `.size`.
 *
 * ⚡ SET: A collection of completely unique elements. The V8 engine filters out 
 * and drops any duplicate values automatically. Great for high-speed deduplication.
 *
 * 🔒 THE GARBAGE COLLECTION PROTOCOL (Mark-and-Sweep):
 * - Standard Maps/Arrays form a STRONG REFERENCE to objects. Even if the object's 
 * variable is nullified, it remains locked in the collection's memory heap, 
 * creating a dangerous MEMORY LEAK.
 * - WeakMaps and WeakSets form a WEAK REFERENCE. If an object has no strong pointers 
 * left outside the collection, V8's Garbage Collector automatically sweeps the 
 * object out of physical RAM and clears the collection slot.
 */

// 💻 LIVE CODE PRODUCTION TEMPLATE

// ============================================================================
// PIPELINE 1: DEDUPLICATION VIA SETS
// ============================================================================
const messyArray = ["token_1", "token_2", "token_1"];
const cleanSet = new Set(messyArray);

cleanSet.add("token_3"); // Appends item
cleanSet.add("token_1"); // 🚫 Silent rejection by engine (duplicate detected)
console.log("Unique Count:", cleanSet.size); // ➔ 3

// ============================================================================
// PIPELINE 2: COMPLEX MAPPING VIA MAPS
// ============================================================================
const sessionsMap = new Map();
const userPointer = { uid: 881 }; // Hexadecimal reference address (e.g., 0x99FF)

sessionsMap.set(userPointer, "Active_Data_Stream");
console.log("Fetch Map Value:", sessionsMap.get(userPointer)); // ➔ "Active_Data_Stream"


/* * ⚠️ INTERVIEW / PRODUCTION TRAP #1: THE MEMORY REFERENCE MISMATCH
 * Passing an object literal directly into .set() and .get() fails because the 
 * engine allocates a separate, unique Heap memory address for every literal written.
 */
const lookupContainer = new Map();
lookupContainer.set({ id: 5 }, "Target_Data");
console.log("➔ Trap 1 Failure Output:", lookupContainer.get({ id: 5 })); // ➔ undefined (Address mismatch!)


/* * ⚠️ INTERVIEW / PRODUCTION TRAP #2: WEAKMAP PRIMITIVE EXCLUSION
 * WeakMaps require keys to be objects/symbols so the Garbage Collector can trace 
 * their memory lifecycle. Trying to assign a primitive string/number as a key crashes.
 */
try {
    const brokenWeakMap = new WeakMap();
    brokenWeakMap.set("string_key", "some_data"); // ❌ Throws TypeError
} catch (error) {
    console.error("➔ Trap 2 Caught Engine Crash:", error.message); // Invalid value used as weak map key
}

// ============================================================================
// PIPELINE 3: MEMORY-SAFE CACHING VIA WEAKMAPS
// ============================================================================
const domWidgetCache = new WeakMap();
let activeWidget = { htmlNode: "div#chart_root" }; // Strong Reference

domWidgetCache.set(activeWidget, "Cached_Render_Pixels_Data");

// --- TRIGGERING MEMORY CLEANUP ---
activeWidget = null; 
// 🔬 V8 Clean: The object is now unreachable and will be fully purged from RAM 
// on the next Garbage Collection loop cycle, preventing leaks.

/* ============================================================================
 * END OF TOPIC 5
 * ============================================================================
 */