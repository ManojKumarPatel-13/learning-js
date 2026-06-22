/**
 * 💡 THE CONCEPT:
 * Hoisting is the JavaScript engine allocating memory spaces for your variables 
 * and functions during the "Creation Phase" before a single line of logic runs.
 * * The Temporal Dead Zone (TDZ) is the safety state extending from the start of 
 * the enclosing block scope until the line where a let or const variable is declared.
 */

// 💻 LIVE CODE EXAMPLES:

// 1. Var Hoisting
console.log(lootedMoney); // ➔ Logs: undefined (Memory allocated, but value isn't loaded yet)
var lootedMoney = 100;

// 2. Function Declaration Hoisting
sayHello(); // ➔ Logs: "Hello World" (Works perfectly! Entire function body is hoisted)
function sayHello() {
    console.log("Hello World");
}


/**
 * ⚠️ INTERVIEW / SIDE TRAP: THE LET/CONST HOISTING & TDZ FAILURE
 * A common junior myth is that let and const are not hoisted. They ARE hoisted. 
 * However, they are left uninitialized in the TDZ instead of getting "undefined".
 */

try {
    // ---- START OF THE TDZ FOR 'secureCode' ----
    console.log(secureCode); // ❌ Throws ReferenceError: Cannot access 'secureCode' before initialization
    // ---- END OF THE TDZ ----
    let secureCode = 9931; 
} catch (error) {
    console.error("Caught TDZ Error:", error.message);
}

/**
 * ⚠️ THE FUNCTION EXPRESSION TRAP:
 * If you assign a function to a var, let, or const variable, it hoists according 
 * to the VARIABLE's rules, not function rules.
 */
try {
    executeAction(); // ❌ Throws TypeError: executeAction is not a function
    var executeAction = function() {
        console.log("Executing...");
    };
} catch (error) {
    console.error("Caught Expression Error:", error.message);
}
