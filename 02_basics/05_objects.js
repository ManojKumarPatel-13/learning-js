// freeze and seal

// production code
// ========================================================
// SCENARIO 1: THE ACTION REGISTRY (SEALED SYSTEM)
// ========================================================

const actionRegistry = {
    LOGIN_SUCCESS: "AUTH_LOGIN_SUCCESS",
    LOGOUT_TRIGGER: "AUTH_LOGOUT_TRIGGER"
};

// Apply the No Entry, No Exit Protocol
Object.seal(actionRegistry);

// Test A: Attempt to add a new malicious action type
actionRegistry.HACK_SYSTEM = "MALICIOUS_INJECTION"; // 🚫 Engine blocks creation!

// Test B: Attempt to delete an essential core action type
delete actionRegistry.LOGIN_SUCCESS; // 🚫 Engine blocks deletion!

// Test C: Modifying an existing valid value (Legitimate configuration change)
actionRegistry.LOGIN_SUCCESS = "USER_LOGIN_VERIFIED"; // ✅ Allowed!

console.log("--- SEALED REGISTRY TEST RESULTS ---");
console.log("Is sealed?:", Object.isSealed(actionRegistry)); // Output: true
console.log("Registry Keys:", Object.keys(actionRegistry));   // Output: ['LOGIN_SUCCESS', 'LOGOUT_TRIGGER']
console.log("Updated Value:", actionRegistry.LOGIN_SUCCESS); // Output: USER_LOGIN_VERIFIED


// ========================================================
// SCENARIO 2: GLOBAL THEME STATE TREE (DEEP FREEZE UTILITY)
// ========================================================

// A standard nested state tree object
const appGlobalState = {
    theme: "dark",
    dimensions: {
        sidebarWidth: 280,
        headerHeight: 60
    }
};

/**
 * 🚀 120% MASTERY UTILITY: deepFreeze
 * Iterates recursively through all nested layers of an object and applies Object.freeze()
 */
function deepFreeze(object) {
    // 1. Fetch all property names currently attached to the object
    const propNames = Reflect.ownKeys(object);

    // 2. Loop through every property to look for nested child objects/arrays
    for (const name of propNames) {
        const value = object[name];

        // If the child property is an active object or array, freeze it recursively first
        if (value && typeof value === "object") {
            deepFreeze(value);
        }
    }

    // 3. Finally, freeze the main parent layer
    return Object.freeze(object);
}

// Execute the ultimate architectural lockdown
deepFreeze(appGlobalState);

// --- TESTING SHALLOW VS DEEP IMMUTABILITY ---

// Attempting to modify top level
appGlobalState.theme = "light"; // 🚫 Blocked!

// Attempting to modify a deeply nested sub-property
appGlobalState.dimensions.sidebarWidth = 500; // 🔒 Locked by deepFreeze! (Standard Object.freeze would fail here)

console.log("\n--- DEEP IMMUTABILITY TEST RESULTS ---");
console.log("Top-level property (theme):", appGlobalState.theme); // Output: dark (Safe)
console.log("Deeply nested property (sidebarWidth):", appGlobalState.dimensions.sidebarWidth); // Output: 280 (Completely protected!)


/* * 💡 THE CONCEPT IN SIMPLE TERMS:
 * When managing larger datasets, configuring properties one by one is inefficient. 
 * JavaScript provides global, object-level locking utilities that manipulate 
 * all internal property descriptor flags simultaneously.
 *
 * 🔓 OBJECT.SEAL() -> The "No Entry, No Exit" Protocol:
 * - Prevents adding new keys.
 * - Prevents deleting existing keys.
 * - ALLOWS modifying the values of existing properties.
 * - Under the hood: Sets [[configurable]]: false on all properties and locks extensions.
 *
 * ❄️ OBJECT.FREEZE() -> The "Absolute Zero" Protocol:
 * - Prevents adding new keys.
 * - Prevents deleting existing keys.
 * - PREVENTS modifying any existing property values (Read-Only).
 * - Under the hood: Sets BOTH [[configurable]]: false and [[writable]]: false on all keys.
 */

// 💻 LIVE CODE PRODUCTION TEMPLATE
const actionRegistry = {
    USER_LOGIN: "AUTH_LOGIN",
    USER_LOGOUT: "AUTH_LOGOUT"
};

// Sealing the object
Object.seal(actionRegistry);
actionRegistry.USER_LOGIN = "AUTH_LOGIN_MUTATED"; // ✅ Permitted! Value changes.
delete actionRegistry.USER_LOGOUT;               // 🚫 Blocked! Cannot delete sealed keys.
actionRegistry.USER_REGISTER = "AUTH_REG";       // 🚫 Blocked! Cannot extend sealed objects.


/* * ⚠️ INTERVIEW / PRODUCTION TRAP #1: THE SHALLOW FREEZE FALLACY
 * Object.freeze() is fundamentally SHALLOW. It only locks primitive values on the 
 * immediate top-level keys. If a key points to a nested object or array, the engine 
 * only freezes the memory pointer address, NOT the data inside the nested heap object.
 */

const checkoutInvoice = {
    id: "INV_001",
    financials: { subtotal: 250 } // Nested object on the Heap
};

Object.freeze(checkoutInvoice);
checkoutInvoice.id = "INV_HACKED";           // 🚫 Blocked! Top-level primitive is safe.
checkoutInvoice.financials.subtotal = 0;     // 🔥 CRITICAL LEAK! Modifies deep data successfully!


/* * 🛠️ 120% PRODUCTION SOLUTION: THE RECURSIVE DEEP FREEZE UTILITY
 * To fully secure an object tree, we use a recursive traversal block.
 * We must use `Reflect.ownKeys` instead of `for...in` to bypass prototype pollution 
 * leaks and capture hidden symbol properties.
 */
function perfectDeepFreeze(targetObject) {
    // Reflect.ownKeys returns an array of ALL local keys (enumerable, non-enumerable, and symbols)
    const allKeys = Reflect.ownKeys(targetObject);

    for (const currentKey of allKeys) {
        const itemProperty = targetObject[currentKey];

        // If the inner property is a nested structural container, freeze it first
        if (itemProperty && typeof itemProperty === "object") {
            perfectDeepFreeze(itemProperty);
        }
    }

    // Freeze the current structural layer
    return Object.freeze(targetObject);
}

// Verification of Absolute Security
perfectDeepFreeze(checkoutInvoice);
checkoutInvoice.financials.subtotal = 9999; // 🔒 Now completely frozen and blocked!

/* ============================================================================
 * END OF TOPIC
 * ============================================================================
 */



// production level code

// A complex, nested object representation of a user session
const masterUserDataset = {
    userId: "usr_rc_88",
    createdAt: new Date("2026-06-22"), // ⚠️ Date Object!
    preferences: {
        theme: "midnight",
        notifications: ["email", "sms"] // ⚠️ Nested Array!
    }
};

// ========================================================
// METHOD 1: THE NATIVE MODERN ENGINE (structuredClone)
// ========================================================

// This is the optimized, native browser Web API for true deep cloning
const cleanDeepCopy = structuredClone(masterUserDataset);

// Verify total memory isolation
cleanDeepCopy.preferences.theme = "solarized";
cleanDeepCopy.preferences.notifications.push("push");

console.log("--- METHOD 1: STRUCTURED CLONE RESULTS ---");
console.log("Original Theme:", masterUserDataset.preferences.theme); // Output: midnight (Safe!)
console.log("Original Pull:", masterUserDataset.preferences.notifications); // Output: ['email', 'sms'] (Untouched!)
console.log("Is Date intact?:", cleanDeepCopy.createdAt instanceof Date); // Output: true


// ========================================================
// METHOD 2: THE LEGACY HACK (JSON.parse/stringify)
// ========================================================

// 🚨 WARNING: Do not use this in production if your object contains Dates, Functions, or BigInts!
const legacyHackCopy = JSON.parse(JSON.stringify(masterUserDataset));

console.log("\n--- METHOD 2: LEGACY HACK CRITICAL FAILURE ---");
// The date object was completely destroyed and flattened into a plain string!
console.log("Type of createdAt in Legacy:", typeof legacyHackCopy.createdAt); // Output: string 


// ========================================================
// METHOD 3: 120% MASTERY CUSTOM STRUCTURAL CLONE UTILITY
// ========================================================

/**
 * A highly optimized, custom deep cloning function capable of traveling 
 * structural layers and re-instantiating Dates and Arrays cleanly.
 */
function customDeepClone(source) {
    // 1. Handle primitive types and null cleanly
    if (source === null || typeof source !== "object") {
        return source;
    }

    // 2. Handle specialized built-in Objects like Dates
    if (source instanceof Date) {
        return new Date(source.getTime());
    }

    // 3. Initialize a clean structural target (Array vs Object detection)
    const cloneTarget = Array.isArray(source) ? [] : {};

    // 4. Extract all local properties via Reflect to preserve symbols
    const operationalKeys = Reflect.ownKeys(source);

    for (const key of operationalKeys) {
        // Recursively clone down the line and assign to our target
        cloneTarget[key] = customDeepClone(source[key]);
    }

    return cloneTarget;
}

const customCloneExecution = customDeepClone(masterUserDataset);
customCloneExecution.preferences.theme = "matrix-green";

console.log("\n--- METHOD 3: CUSTOM DEEP CLONE RESULTS ---");
console.log("Original Theme:", masterUserDataset.preferences.theme); // Output: midnight (Safe!)
console.log("Custom Clone Date Object Verification:", customCloneExecution.createdAt instanceof Date); // Output: true

/**
 * ============================================================================
 * MODULE: HARDWARE-LEVEL MEMORY ALLOCATION & DEEP CLONING PIPELINES
 * ============================================================================
 * Course/Target: 120% JavaScript Mastery
 * File Destination: 02_basics/04_objects.js
 * ============================================================================
 */

/* * 💡 THE CONCEPT IN SIMPLE TERMS:
 * JavaScript manages data using two physical computer hardware memory spaces:
 *
 * 1. THE STACK: Super-fast, fixed-size memory storage. It stores primitive values 
 * (Strings, Numbers, Booleans) directly by value. When you copy a primitive, 
 * the engine physically duplicates the data bits into a brand-new stack box.
 *
 * 2. THE HEAP: Large, dynamic memory storage. It stores complex structures 
 * (Objects, Arrays). The variable on the Stack does NOT hold the object; 
 * it holds a hexadecimal MEMORY REFERENCE POINTER ADDRESS (e.g., 0x7A1F) 
 * pointing to the data's location inside the Heap.
 *
 * 🚨 THE BUG MATRIX:
 * If you assign an object to another variable using normal assignment (=), 
 * you are only copying the pointer address. Both variables now look at the 
 * exact same spot on the Heap. Modifying one instantly alters the other.
 */


/* ============================================================================
   🔧 ENGINE GLOSSARY: UNDER-THE-HOOD KEYWORDS & FUNCTIONS USED BELOW
   ============================================================================
   • structuredClone(source) : A modern native Web API that leverages the 
     Structured Clone Algorithm to automatically traverse and duplicate deep data 
     trees cleanly while fully maintaining internal object structures.
   
   • JSON.stringify() / JSON.parse() : An old-school serialization hack. It flattens 
     objects into raw JSON string text, then reconstructs a plain object out of it.
   
   • instanceof : A low-level memory evaluation operator. It inspects an object instance 
     by walking backward down its "Prototype Chain" to verify if it was stamped out 
     by a specific master constructor blueprint function (e.g., Date or Array).
   
   • Reflect.ownKeys(target) : An advanced metaprogramming built-in utility. It bypasses 
     standard security loops to extract an array of ALL keys physically attached to an 
     object—including hidden, non-enumerable properties and custom Symbols.
   ============================================================================ */


// 💻 LIVE CODE PRODUCTION TEMPLATE
const originalUserSession = {
    token: "session_993A",
    loginDate: new Date("2026-06-22"), // Handled cleanly via instanceof
    preferences: {
        interface: "dark",
        modules: ["dashboard", "billing"] // Deep nested Heap data
    }
};

// ============================================================================
// PIPELINE 1: THE NATIVE PRODUCTION STANDARD (structuredClone)
// ============================================================================
const safeProductionClone = structuredClone(originalUserSession);

// Mutating the clone to test complete hardware-level memory isolation
safeProductionClone.preferences.interface = "light";
safeProductionClone.preferences.modules.push("analytics");

console.log("--- PIPELINE 1 RESULTS ---");
console.log("Original Interface:", originalUserSession.preferences.interface); // ➔ "dark" (Safe!)
console.log("Original Modules:", originalUserSession.preferences.modules);     // ➔ ['dashboard', 'billing'] (Safe!)


/* * ⚠️ INTERVIEW / PRODUCTION TRAP #1: THE SERIALIZATION FLATTENING TRAP
 * Using JSON.parse(JSON.stringify()) is highly dangerous. It completely breaks 
 * complex native objects like Dates (converts them to flat strings) and completely 
 * crashes if it encounters a BigInt or a custom function reference.
 */
const dangerousJsonClone = JSON.parse(JSON.stringify(originalUserSession));
console.log("\n--- TRAP 1 CRITICAL FAILURE ---");
console.log("Is cloned loginDate an instance of Date?:", dangerousJsonClone.loginDate instanceof Date); // ➔ false
console.log("Actual Data Type after JSON mutation:", typeof dangerousJsonClone.loginDate);           // ➔ "string" (Corrupted!)


/* * 🛠️ 120% PRODUCTION SOLUTION: THE SECURE CUSTOM STRUCTURAL CLONE PIPELINE
 * A robust utility that combines recursive mapping, prototype footprint tracing, 
 * and deep reflective key extractions to securely duplicate data structures.
 */
function secureDeepCloneEngine(sourceElement) {
    // 1. Instantly exit and return if the element is a raw primitive or null
    if (sourceElement === null || typeof sourceElement !== "object") {
        return sourceElement;
    }

    // 2. [instanceof check] Intercept specialized Date blueprints to re-instantiate them cleanly
    if (sourceElement instanceof Date) {
        return new Date(sourceElement.getTime()); // Duplicates internal millisecond timestamp
    }

    // 3. Setup a clean heap target container by checking if the source is an Array or Object
    const targetContainer = Array.isArray(sourceElement) ? [] : {};

    // 4. [Reflect check] Extract ALL keys, preserving non-enumerables and Symbols securely
    const rawObjectKeys = Reflect.ownKeys(sourceElement);

    // 5. Loop through keys using 'for...of' (safe array iterator loop syntax)
    for (const executionKey of rawObjectKeys) {
        // Recursively trigger the cloning engine for nested properties
        targetContainer[executionKey] = secureDeepCloneEngine(sourceElement[executionKey]);
    }

    return targetContainer;
}

// Executing the custom structural clone engine
const customEngineClone = secureDeepCloneEngine(originalUserSession);
customEngineClone.preferences.interface = "cyberpunk-neon";

console.log("\n--- PIPELINE 3 (CUSTOM ENGINE) RESULTS ---");
console.log("Original Interface Configuration:", originalUserSession.preferences.interface); // ➔ "dark" (Protected!)
console.log("Custom Clone Date Re-instantiation check:", customEngineClone.loginDate instanceof Date); // ➔ true (Successful!)

/* ============================================================================
 * END OF TOPIC
 * ============================================================================
 */