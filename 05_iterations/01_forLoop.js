// ----------------------------------------------------------------------------
// TOPIC: TRADITIONAL FOR LOOPS & CONTROLLER MODIFIERS
// ----------------------------------------------------------------------------
// - Memory Lifecycle: When declaring 'let i' inside a for-loop statement, a 
//   brand-new 'i' binding instance is created for EVERY single iteration pass.
// - Modifier Break: Terminates the loop tower entirely.
// - Modifier Continue: Aborts the current pass code, skipping directly to increment.

// ----------------------------------------------------------------------------
// DEVELOPMENT SCENARIO: E-COMMERCE STOCK AUDITING & DEFECT DETECTION
// PROBLEM: A warehouse scanning script loops through an array of items. 
// - If it hits a "DEFECTIVE" item, it must log an alert and skip processing it.
// - If the inventory total reaches a specific limit capacity, it must stop 
//   scanning entirely to prevent database overflow.
// ----------------------------------------------------------------------------
console.log("--- SYSTEM WAREHOUSE SCAN ACTIVE ---");

const warehouseBox = ["Packaged", "Packaged", "DEFECTIVE", "Packaged", "Packaged"];
let processedCount = 0;

for (let i = 0; i < warehouseBox.length; i++) {
    if (warehouseBox[i] === "DEFECTIVE") {
        console.log(`Warning at index ${i}: Defect found! Skipping item...`);
        continue; // Immediately halts this iteration, jumps straight to i++
    }

    processedCount++;
    console.log(`Item ${i} processed successfully.`);

    if (processedCount === 3) {
        console.log("Capacity limit reached. Stopping scanner loop.");
        break; // Instantly vaporizes the loop completely
    }
}


// ----------------------------------------------------------------------------
// LOGIC / DSA PUZZLE: THE MATRIX TWOFOLD COMPLEMENT (NESTED LOOPS)
// PROBLEM: Find if there are any two distinct numbers in an array that add up 
// to a specific target number. Return their indices. (Classic Target Sum Problem).
// ----------------------------------------------------------------------------
console.log("\n--- DSA PUZZLE: TARGET TWO-SUM SEARCH ---");

const numberList = [2, 7, 11, 15];
const targetSum = 9;
let foundIndices = [];

// Outer loop picks the first number anchor
for (let i = 0; i < numberList.length; i++) {
    // Inner loop scans the remaining numbers ahead of the anchor
    for (let j = i + 1; j < numberList.length; j++) {
        if (numberList[i] + numberList[j] === targetSum) {
            foundIndices = [i, j];
            break; // Breaks out of the inner loop
        }
    }
    if (foundIndices.length > 0) break; // Breaks out of the outer loop once found
}

console.log(`Indices matching target sum ${targetSum}: [${foundIndices}]`);