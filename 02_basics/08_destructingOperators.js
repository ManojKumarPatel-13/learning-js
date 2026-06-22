// code destructing operator

// Simulated incoming dirty JSON payload from an HTTP network request client
const rawIncomingApiPayload = {
    userId: "usr_99X1A",
    accountToken: "JWT_SECRET_STRING_88312", // ⚠️ Sensitive!
    preferences: { theme: "dark", compactMode: true },
    metadata: { ipAddress: "192.168.1.1", browser: "Chrome" }
};

// ============================================================================
// 1. OBJECT DESTRUCTURING WITH VARIABLE RENAMING & DEFAULTS
// ============================================================================

// Extracting userId into a custom local variable name while applying a fallback default status
const {
    userId: uniqueIdentifier, // Renaming key 'userId' to local scope variable 'uniqueIdentifier'
    accountStatus = "active"  // Initializing an immediate fallback value because the key doesn't exist
} = rawIncomingApiPayload;

console.log("--- 1. DESTRUCTURING ISOLATION ---");
console.log("Extracted Identity Pointer:", uniqueIdentifier); // Output: usr_99X1A
console.log("Fallback Default Parameter:", accountStatus);    // Output: active


// ============================================================================
// 2. THE REST OPERATOR (Isolating and Bundling Data)
// ============================================================================

// Goal: Isolate the sensitive security token, and capture everything else into a clean data object.
const {
    accountToken,           // Extracts the token directly out into its own stack box
    ...sanitizedDatabasePayload // 🧹 REST: Vacuums up all remaining object properties into a brand-new container
} = rawIncomingApiPayload;

console.log("\n--- 2. REST COMPARTMENTALIZATION ---");
console.log("Quarantined Token:", accountToken); // Output: JWT_SECRET_STRING_88312
console.log("Sanitized Object Payload (Token Removed):", Object.keys(sanitizedDatabasePayload));
// Output: ['userId', 'preferences', 'metadata'] -> Complete segregation achieved!


// ============================================================================
// 3. THE SPREAD OPERATOR (Immutable Configuration Merging)
// ============================================================================

// System fallback server preferences configuration tree
const systemDefaultsConfig = {
    port: 8080,
    environment: "production",
    preferences: { theme: "light", debugMode: false }
};

// Merging user preferences over system preferences using the Spread Operator
const finalizedRuntimeConfig = {
    ...systemDefaultsConfig,                    // ⚡ SPREAD: Unpacks all top-level default settings
    environment: "staging",                     // Directly overwriting the top-level property
    preferences: { ...rawIncomingApiPayload.preferences } // 🔒 Shallow spread to overlay deep nesting cleanly
};

console.log("\n--- 3. IMMUTABLE SPREAD MERGE ---");
console.log("Merged Runtime Port:", finalizedRuntimeConfig.port);        // Output: 8080 (Inherited)
console.log("Overwritten Environment:", finalizedRuntimeConfig.environment); // Output: staging (Mutated)
console.log("Nested Merged Theme:", finalizedRuntimeConfig.preferences.theme); // Output: dark (Overlaid)


/* * 💡 THE CONCEPT IN SIMPLE TERMS:
 * Modern syntax operators allow us to cleanly extract, quarantine, and merge records 
 * in single declarative expressions rather than long, manual loops.
 *
 * 🔓 DESTRUCTURING: Unpacks properties from objects or elements from arrays into 
 * separate local variables. Supports aliasing (renaming) and fallback default parameters.
 *
 * 📥 REST OPERATOR (...): Written on the LEFT side of an assignment. Acts as a 
 * gathering vacuum to scoop up all unassigned properties into a completely separate 
 * new container array or object block.
 *
 * 📤 SPREAD OPERATOR (...): Written on the RIGHT side of an assignment. Acts as an 
 * unpacker to flatten an array or object's contents into individual data properties.
 */

// 💻 LIVE CODE PRODUCTION TEMPLATE
const incomingPayload = {
    serviceId: "srv_909",
    authToken: "SECURE_HASH_123",
    metrics: { cpuUsage: 12, userCount: 450 }
};

// ============================================================================
// PIPELINE 1: EXTRACTING WITH EXCLUSIONS & DEFAULTS
// ============================================================================

// 1. Destructure with custom renaming (serviceId -> localServiceId) and default fallbacks
const { serviceId: localServiceId, region = "us-east" } = incomingPayload;

// 2. Quarantine sensitive data using the Rest Operator
const { authToken, ...cleanDataPayload } = incomingPayload;
// 🔬 Engine Fact: cleanDataPayload is a brand-new object on the Heap. It does not share a pointer!

console.log("Sanitized Keys:", Object.keys(cleanDataPayload)); // ➔ ['serviceId', 'metrics']


/* * ⚠️ INTERVIEW / PRODUCTION TRAP #1: REST ARRAY INDEPENDENCE
 * When destructuring arrays, using the Rest operator (...variable) creates a 
 * completely independent, newly allocated array on the Heap. Mutating the original 
 * array downstream will NOT alter the collected rest variables.
 */
const platformStack = ["Node", "V8", "Docker"];
const [primaryRuntime, ...subsidiaryStack] = platformStack;
// subsidiaryStack points to a fresh Heap array: ["V8", "Docker"]

platformStack[1] = "Bun-Runtime"; // Mutating original array
console.log("➔ Trap 1 Element Check:", subsidiaryStack[0]); // ➔ "V8" (Completely un-mutated and isolated!)


/* * ⚠️ INTERVIEW / PRODUCTION TRAP #2: SPREAD IS STILL SHALLOW
 * The spread operator duplicates values into a fresh container, but nested structures 
 * within that container are copied BY REFERENCE. If you mutate a deeply nested object 
 * inside a spread structure, the original object will still be corrupted.
 */
const configurationDefaults = { port: 5000, logs: { verbose: true } };
const duplicatedRuntimeConfig = { ...configurationDefaults };

duplicatedRuntimeConfig.port = 8080;          // ✅ Safe! Top-level is isolated.
duplicatedRuntimeConfig.logs.verbose = false; // 🚨 CRITICAL BUG! Deep nested object reference shared.

console.log("➔ Trap 2 Leak Verification:", configurationDefaults.logs.verbose); // ➔ false (Original corrupted!)

/* ============================================================================
 * END OF PHASE 3
 * ============================================================================
 */