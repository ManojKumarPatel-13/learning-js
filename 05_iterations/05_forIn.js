// ----------------------------------------------------------------------------
// TOPIC: PROPERTY ITERATION (FOR...IN) vs VALUE ITERATION (FOR...OF)
// ----------------------------------------------------------------------------
// - Object Iteration Trap: Standard objects are NOT iterable. Using for...of 
//   on an object triggers an immediate TypeError crash.
// - for...in Mechanics: Designed specifically to loop through the 'Keys' of an 
//   object that are marked as 'enumerable' (visible to loops).
// - Array Index Quirks: Using for...in on an Array extracts the index strings 
//   ("0", "1", "2"), NOT the actual element values. Always use for...of for arrays!

// ----------------------------------------------------------------------------
// DEVELOPMENT SCENARIO: DYNAMIC SETTINGS PARSER
// PROBLEM: A web application loads a local configuration settings object. We need 
// to read every single setting key and its value to populate a dashboard panel.
// ----------------------------------------------------------------------------
console.log("--- OBJECT SYSTEM CONFIG PARSER ---");

const systemConfig = {
    theme: "dark",
    resolution: "1080p",
    refreshRate: "144Hz",
    autoSave: true
};

// USING FOR...IN TO UNPACK OBJECTS
for (const settingKey in systemConfig) {
    // 💡 SYNTAX NOTE: We use bracket notation systemConfig[settingKey] because 
    // settingKey is a dynamic string variable evaluated on every pass loop.
    console.log(`Setting Name: ${settingKey} -> Active Value: ${systemConfig[settingKey]}`);
}


// ----------------------------------------------------------------------------
// LOGIC / DSA PUZZLE: THE ARRAY TRAP WITH FOR...IN
// PROBLEM: Demonstrate what happens when an inexperienced developer uses 
// a for...in loop on an array collection compared to a for...of loop.
// ----------------------------------------------------------------------------
console.log("\n--- LOGIC WORKBENCH: FOR...IN ARRAYS DESTRUCTION ---");

const scoreCard = [95, 82, 88];

console.log("Executing for...in on Array:");
for (const keyIndex in scoreCard) {
    console.log(`Extracted Target: ${keyIndex} | Type: ${typeof keyIndex}`);
    // 🛑 NOTICE: It extracts string index positions "0", "1", "2", NOT the numbers 95, 82, 88!
}

console.log("\nExecuting for...of on Array:");
for (const numericValue of scoreCard) {
    console.log(`Extracted Value: ${numericValue} | Type: ${typeof numericValue}`);
    // ✅ SUCCESS: It extracts the actual values directly as numbers.
}


// ----------------------------------------------------------------------------
// EXTRA TRAP: TRYING TO FOR...IN A MAP
// ----------------------------------------------------------------------------
const connectionMap = new Map();
connectionMap.set("status", "connected");

console.log("\nTrying to use for...in on a Map:");
for (const key in connectionMap) {
    console.log(key);     // 📝 Output: (Blank!)
} 
// 💡 WHY: Map properties are not stored as traditional enumerable object keys. 
// for...in will completely skip a Map. Maps require for...of!
