/**
 * 💡 THE CONCEPT:
 * Implicit Coercion is JavaScript automatically changing a value from one data 
 * type to another behind the scenes during operations.
 * * THE CORE UNDER-THE-HOOD RULES:
 * 1. Numeric Coercion with Math: Standard operators like (-), (*), and (/) coerce 
 * strings completely into numbers. However, the (+) operator is an exception—if 
 * ANY side is a string, it prioritizes string concatenation.
 * 2. The ToPrimitive Object Rule: When comparing an object/array to a primitive, 
 * the engine calls the object's internal .toString() method automatically.
 */

// 💻 LIVE CODE EXAMPLES:

// Rule 1: The Addition vs Subtraction Quirk
console.log("5" - 2); // ➔ Logs: 3 (String "5" is implicitly coerced to Number 5)
console.log("5" + 2); // ➔ Logs: "52" (String priority! 2 is coerced to String "2")

// Rule 2: Array-to-Primitive Coercion
console.log([].toString()); // ➔ Logs: "" (An empty array becomes an empty string)
console.log([] == 0);       // ➔ Logs: true! 
// Why? Step 1: [].toString() becomes "". Step 2: Number("") becomes 0. Step 3: 0 == 0 is true.


/**
 * ⚠️ INTERVIEW / SIDE TRAP: THE NOT OPERATOR DOUBLE COERCION
 * The (!) operator explicitly converts any value into its inverted boolean. 
 * An array [] is structurally an object, meaning it is always truthy. Therefore, `![]` evaluates to `false`.
 */
console.log([] == ![]); // ➔ Logs: true
// 🔬 Spec Tracing:
// 1. Evaluate right side: ![] becomes false. Expression is now: [] == false
// 2. Coerce Object to Primitive: [].toString() becomes "". Expression is now: "" == false
// 3. Coerce String/Boolean to Numbers: Number("") is 0, Number(false) is 0. 
// 4. Final calculation: 0 === 0 evaluates to true.

// 🛠️ PRODUCTION BEST PRACTICE:
// To avoid implicit bugs in production software, NEVER use abstract equality (==). 
// Always use strict equality (===), which completely bypasses coercion and verifies both Type and Value.