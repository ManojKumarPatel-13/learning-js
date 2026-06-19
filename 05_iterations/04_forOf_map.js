// ----------------------------------------------------------------------------
// TOPIC: MODERN VALUE ITERATION (FOR...OF) & MAP ARCHITECTURE
// ----------------------------------------------------------------------------
// A. DEEP-DIVE: THE FOR...OF MECHANISM
// - What it is: A high-level loop introduced in ES6 to read values directly.
// - How it works under the hood: It hooks into a secret protocol called the 
//   "Iterable Protocol". The engine requests an internal pointer iterator from 
//   the data structure and calls next() automatically behind the scenes until 
//   the collection runs out of elements. 
// - The Benefit: You never write 'i++', track array lengths, or manually 
//   extract elements using index numbers like array[i].
//
// B. DEEP-DIVE: THE MAP ARCHITECTURE
// - What it is: A specialized structural collection of key-value pairs built 
//   on top of the Object type hierarchy. It is NOT a brand-new primitive data type.
// - Why it exists (Object vs Map):
//   1. Key Flex: Standard Objects convert ALL keys to Strings. Maps allow keys 
//      to be numbers, booleans, arrays, or complete objects.
//   2. Clean Slate: Standard Objects inherit default prototype properties (like 
//      'toString'). Maps start 100% completely empty.
//   3. Size Guard: To find the size of an object, you must manually count keys. 
//      Maps give you an instant O(1) time complexity '.size' property.

// ----------------------------------------------------------------------------
// EXPANDED CONCEPT WORKBENCH: FOR...OF & MAP BASICS
// ----------------------------------------------------------------------------
console.log("--- EXPANDED FOR...OF MECHANICS ---");

const simpleString = "CHAI";
// The engine extracts each character value directly without index management
for (const alphabet of simpleString) {
    console.log(`Character track: ${alphabet}`);
}

console.log("\n--- EXPLICIT OBJECT KEY COERCION DEMO ---");
const regularObject = {};
regularObject[100] = "Numeric Key?";

// Accessing the keys array reveals the engine mutated the number to text!
console.log("Actual Object Key Type:", typeof Object.keys(regularObject)[0]);
// 📝 Output: string (The engine coerced 100 into "100")

const realMap = new Map();
realMap.set(100, "True Numeric Key!");
// Verification check:
for (const [key, value] of realMap) {
    console.log(`Map Key Type: ${typeof key} | Value: ${value}`);
    // 📝 Output: number (Type integrity is preserved perfectly!)
}

// 1. ADVANCED ARRAYS AND STRINGS WITH FOR...OF
console.log("--- ITERATING VALUE COLLECTION ITEMS ---");

const frameworkStack = ["React", "Vue", "Node", "Next.js"];

for (const framework of frameworkStack) {
    // 💡 SCOPE NOTE: 'const' is safe here because each iteration creates a distinct local block binding.
    console.log(`Stack Element: ${framework}`);
}

const customToken = "IND-2026";
let whiteSpaceCount = 0;

for (const char of customToken) {
    if (char === "-") {
        console.log(`Delimiter matched inside string value flow.`);
    }
}


// ----------------------------------------------------------------------------
// DEVELOPMENT SCENARIO: RETAIL BILLING CACHE WITH MAPS
// PROBLEM: An enterprise retail system tracks live inventory items using unique 
// configuration codes. The keys cannot be simple strings; they must remain numbers.
// ----------------------------------------------------------------------------
console.log("\n--- DEVELOPMENT SCENARIO: ENTERPRISE MAP STORAGE ---");

const inventoryMap = new Map();

// Setting map values (.set(key, value))
inventoryMap.set(101, { name: "Pro Laptop", price: 1200 });
inventoryMap.set(102, { name: "Mechanical Keyboard", price: 150 });
inventoryMap.set(103, { name: "UltraWide Monitor", price: 450 });
inventoryMap.set(101, { name: "Pro Laptop V2", price: 1250 }); // 🚨 Overwrites the initial duplicate key 101!

// Reading a map value (.get(key))
console.log("Fetch ID 102:", inventoryMap.get(102));
console.log(`Total unique items logged in memory: ${inventoryMap.size}`);


// ----------------------------------------------------------------------------
// LOGIC / DSA PUZZLE: THE ALIEN ENTRY LOG MATRIX (MAP DESTRUCTURING ITERATION)
// PROBLEM: Loop through the inventory Map structure and cleanly unpack both 
// the product key and its name property simultaneously using array destructuring syntax.
// ----------------------------------------------------------------------------
console.log("\n--- LOGIC PUZZLE: DESTRUCTURING IN ITERATION ---");

// A Map iterated by for...of returns an array layout of [key, value] on every pass.
// We use [id, details] to destructively slice them apart instantly!
for (const [id, details] of inventoryMap) {
    console.log(`ID Code: ${id} | Product Title: ${details.name} | Cost: $${details.price}`);
}