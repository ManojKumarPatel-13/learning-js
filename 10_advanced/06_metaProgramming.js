// -------------------------------------------------------------------------
// 📑 THE METAPROGRAMMING PRINCIPLE
// -------------------------------------------------------------------------
// * DEFINITION: Code that inspects, intercepts, or manipulates other code 
//   at the system behavior level.

const databaseRecord = { id: 101, classification: "RESTRICTED" };

// -------------------------------------------------------------------------
// 📑 THE PROXY WRAPPER & REFLECT ALIGNMENT
// -------------------------------------------------------------------------
const secureShield = new Proxy(databaseRecord, {
    // 1. GET TRAP: Intercepts property reads
    get(target, prop, receiver) {
        if (target[prop] === "RESTRICTED") {
            return "ACCESS DENIED: CLEARANCE REQUIRED";
        }
        return Reflect.get(target, prop, receiver); // Safe fallback read
    },

    // 2. SET TRAP: Intercepts property writes/mutations
    set(target, prop, value, receiver) {
        if (prop === "id") {
            console.error("❌ Crucial Gotcha: Mutating record IDs is forbidden.");
            return false; // Rejects the mutation
        }
        // Safely updates memory according to engine specifications
        return Reflect.set(target, prop, value, receiver);
    }
});

// -------------------------------------------------------------------------
// 🚨 THE ISOLATION WALL GOTCHA:
// -------------------------------------------------------------------------
// secureShield.id = 555;     // ❌ Logs error. Rejects change.
// databaseRecord.id = 555;   // ⚠️ BYPASSES PROXY entirely! Memory updates silently with zero reactivity.