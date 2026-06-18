// ============================================================================
// ITEM 5: IMMEDIATELY INVOKED FUNCTION EXPRESSIONS (IIFE)
// ============================================================================

// 1. WHAT IS AN IIFE?
// - Definition: A function expression that executes immediately the millisecond it is defined.
// - Core Purpose: To create an isolated local scope and prevent "Global Scope Pollution" 
//   (avoiding variable name clashes with external libraries or teammate scripts).

// 2. RUNNABLE EXAMPLES
// A. Named IIFE
(function connectDB() {
    const dbPassword = "Secret_123_Secure"; // Hidden safely inside this fortress!
    console.log("DB CONNECTED: Standard isolated initialization sequence complete.");
})();

// ⚠️ CRITICAL INTERVIEW GOTCHA: You MUST put a semicolon (;) at the end of an IIFE!
// JavaScript doesn't automatically know when an IIFE ends. If you write two IIFEs 
// back-to-back without a semicolon, your code will crash with a TypeError!

// B. Anonymous IIFE written as an Arrow Function with Parameters
((serverLocation) => {
    console.log(`LOAD BALANCER: Initialized immediately at region: ${serverLocation}`);
})("Mumbai-AWS-Region-1");


// 3. SUMMARY RULES FOR INTERVIEWS
// - Syntax Formula: (Function Definition Line)()
// - Variable Safety: Any data declared inside an IIFE dies when the IIFE finishes executing, 
//   keeping the Heap/Stack clean from leaking temporary setup variables.