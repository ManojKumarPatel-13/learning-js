// ----------------------------------------------------------------------------
// TOPIC: FIXED-VALUE BRANCHING (SWITCH) & CONDITIONAL EXPRESSIONS (TERNARY)
// ----------------------------------------------------------------------------
// - Switch Fall-Through: Omitting 'break' forces the single thread to run 
//   down into subsequent cases without checking conditions.
// - Statement vs Expression: 'if-else' executes code blocks; 'ternary' evaluates 
//   directly into a single value that can be immediately assigned or returned.

// ----------------------------------------------------------------------------
// DEVELOPMENT SCENARIO: SERVER API ROUTER SWITCH
// PROBLEM: A backend server router reads incoming request paths and assigns 
// permissions. If a case matches, it handles it. If it doesn't, a default 
// fallback catches it.
// ----------------------------------------------------------------------------
console.log("--- SYSTEM SWITCH ROUTER RUN ---");

const userRole = "editor";
let systemAccessLevel;

switch (userRole) {
    case "admin":
        systemAccessLevel = "Full_Root_Access";
        break; // Exits the switch block cleanly
    case "editor":
    case "author":
        // 💡 ADVANCED DESIGN: Intentional fall-through! Both editor and author 
        // will land here and share the exact same permissions block.
        systemAccessLevel = "Write_Edit_Access";
        break;
    case "viewer":
        systemAccessLevel = "Read_Only_Access";
        break;
    default:
        systemAccessLevel = "Denied_Access";
}

console.log(`Role assigned access state: ${systemAccessLevel}`);


// ----------------------------------------------------------------------------
// LOGIC / DSA PUZZLE: THE BALANCED TERNARY ASSIGNER
// PROBLEM: A game engine updates player status based on high scores. Write a 
// compact expression that nests conditions to assign "Legend", "Pro", or "Rookie".
// ----------------------------------------------------------------------------
console.log("\n--- TERNARY VALUE ASSIGNMENT ---");

const playerScore = 850;

// Traditional If-Else Approach (Statement)
let statusTextStatement;
if (playerScore >= 900) {
    statusTextStatement = "Legend";
} else {
    statusTextStatement = "Pro";
}

// Modern Ternary Expression Approach (Assigned directly to a variable!)
// Formula: Condition ? Value_If_True : Value_If_False
const statusTextExpression = playerScore >= 900 ? "Legend" : "Pro";

// 120% DEEP TRAP: Nested Ternaries (Use carefully, can hurt readability!)
const rank = playerScore >= 900 ? "Legend" : playerScore >= 500 ? "Pro" : "Rookie";

console.log(`Player rank evaluated via expression: ${rank}`);


// ----------------------------------------------------------------------------
// EXTRA TRAP: THE SWITCH BREAK OVERFLOW
// ----------------------------------------------------------------------------
const targetMonth = 2;
console.log("\nExecuting Broken Switch (Missing breaks):");

switch (targetMonth) {
    case 1:
        console.log("January");
    case 2:
        console.log("February"); // Matches here!
    case 3:
        console.log("March");    // Executes automatically due to fall-through!
    case 4:
        console.log("April");    // Executes automatically due to fall-through!
        break;
    default:
        console.log("Default Month");
}