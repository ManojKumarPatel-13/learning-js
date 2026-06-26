/**
 * =========================================================================
 * TOPIC 4: OBJECT CREATION PATTERNS & MEMORY ALLOCATION
 * =========================================================================
 * PROGRESSION: LEARN -> PRACTICE -> NOTE
 */

// -------------------------------------------------------------------------
// 📑 PATTERN 1: Factory Functions (Explicit Returners)
// -------------------------------------------------------------------------
// * MECHANISM: A standard function that explicitly builds and returns a brand 
//   new object literal. No special operators required.
// * DRAWBACK: High memory consumption. Functions defined inside the block are 
//   re-created completely in RAM for every single instance generated.

function factoryPatternBot(name) {
    return {
        name,
        action() { return "scanning"; } // ❌ Duplicated in memory for every instance
    };
}

// -------------------------------------------------------------------------
// 📑 PATTERN 2: Constructor Functions (Implicit Prototype Manufacturers)
// -------------------------------------------------------------------------
// * MECHANISM: Relies entirely on the 'new' keyword to automate empty instance 
//   creation, [[Prototype]] linking, and tracking 'this' context.
// * BENEFIT: High memory efficiency. Methods are attached once to the public 
//   '.prototype' object, which all instances look up to via reference delegation.

function ConstructorPatternBot(name) {
    this.name = name; // Local instance property
}
ConstructorPatternBot.prototype.action = function () { return "scanning"; }; // ✅ Shared globally in RAM

// -------------------------------------------------------------------------
// 📑 PATTERN 3: Object.create() (The Direct Lookup Linker)
// -------------------------------------------------------------------------
// * MECHANISM: Bypasses constructor bodies entirely. Generates a completely 
//   empty object {} and forcefully links its internal [[Prototype]] slot 
//   directly to the object passed as the first argument.

const sharedPrototypeAsset = {
    action() { return "scanning"; }
};

const pureLinkedInstance = Object.create(sharedPrototypeAsset);
pureLinkedInstance.name = "Charlie"; // Manually added locally to the instance

// -------------------------------------------------------------------------
// 🚨 ARCHITECTURAL DIFFERENCE IN SPECTRAL STORAGE:
// -------------------------------------------------------------------------
// factoryPatternBot("A").hasOwnProperty('action');      // => true (Local asset)
// pureLinkedInstance.hasOwnProperty('action');          // => false (Prototype asset)