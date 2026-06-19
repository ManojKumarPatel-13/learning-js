// ----------------------------------------------------------------------------
// TOPIC: DEEP INTERVIEW ARCHITECTURE — BREAK, CONTINUE, & EMPTINESS
// ----------------------------------------------------------------------------
// - break: The "Eject Button". Instantly halts the loop machinery and transfers 
//   execution control to the next line completely outside the loop structure.
// - continue: The "Skip Pass". Immediately abandons the remaining instructions 
//   in the *current* iteration block and forces the index pointer to increment.
// - The 'pass' Concept (Empty Statement): JS does not have a 'pass' keyword. 
//   Emptiness is achieved using naked curly braces {} or a standalone semicolon.

// 1. THE BREAK & CONTINUE CONCRETE MATRIX
console.log("\n--- MODIFIER WORKBENCH ---");

for (let currentFloor = 1; currentFloor <= 5; currentFloor++) {
    if (currentFloor === 2) {
        console.log(`Floor ${currentFloor}: Maintenance active. Skipping floor layout.`);
        continue; // 🚨 Instruction skip! Jumps straight to currentFloor++
    }

    if (currentFloor === 4) {
        console.log(`Floor ${currentFloor}: Emergency alarm triggered! Evacuating loop entirely.`);
        break; // 🚨 Hard termination! The loop dies right here.
    }

    console.log(`Successfully inspected Floor: ${currentFloor}`);
}
// Output will show floors 1 and 3 inspected successfully. Floor 2 skips, floor 4 ejects.


// 2. EMULATING THE PYTHON 'PASS' IN JAVASCRIPT
console.log("\n--- EMPTINESS TESTING ---");

const serverLogs = ["Alert", "Ignore_Me", "Critical"];

for (let j = 0; j < serverLogs.length; j++) {
    if (serverLogs[j] === "Ignore_Me") {
        // Python developers use 'pass' here. In JavaScript, we use an empty block:
        { }
        // Or a raw semicolon: ;
        // It does absolutely nothing, letting the single thread continue flowing down naturally.
        console.log(`Encountered a placeholder block at index ${j}`);
    } else {
        console.log(`Action required for status: ${serverLogs[j]}`);
    }
}


// 3. CORE SUMMARY RULES FOR YOUR REVISION NOTES
// - Scope Leaks: Always initialize loops with 'let' to block-scope the counter. 
//   Avoid 'var' to prevent index leakage pollution outside the loop boundary.
// - Resource Conservation: Use 'break' to stop scanning collections early the 
//   moment your target element is found. This prevents wasting valuable CPU cycles.