// -------------------------------------------------------------------------
// 📑 SUB-TOPIC A: "CommonJS (The Runtime Server Engine)"
// -------------------------------------------------------------------------
// * SYNTAX: require() and module.exports
// * MECHANICS: Synchronous and evaluated entirely at runtime.
// * BEHAVIOR: Pauses thread execution to read from disk. Ideal for server operations,
//   highly inefficient for browser environments due to blocking network characteristics.

// -------------------------------------------------------------------------
// 📑 SUB-TOPIC B: "ES Modules (The Static Web Standard)"
// -------------------------------------------------------------------------
// * SYNTAX: import and export
// * MECHANICS: Asynchronous and evaluated during a pre-runtime "Static Analysis" phase.
// * REASON FOR EXISTENCE: Allows browsers to concurrently stream separate file 
//   dependencies over the network before running the application logic.

// ------------------ 🚨 MASTER CONSTRAINTS & BEHAVIORS ---------------------
//
// * CONSTRAINT 1: FULL FILE EXECUTION & LIFETIME CACHING
//   Importing any single item from a file executes that entire file from top to bottom 
//   exactly ONCE. Subsequent imports of the same file point to a memory cache and 
//   do not trigger re-execution.
//
// * CONSTRAINT 2: THE TOP-LEVEL STRUCTURAL ISOLATION WALL
//   Standard 'import' and 'export' statements are static structural declarations. 
//   They CANNOT be nested inside conditional blocks (if), loops (for), or functions.
//
// * WRONG ARCHITECTURE (Will crash compilation):
//   if (condition) { import { asset } from './file.js'; }
//
// * CORRECT MODERN CORRECTION (Dynamic Runtime Loading):
//   if (condition) { 
//       const module = await import('./file.js'); // Returns a promise!
//   }

// -------------------------------------------------------------------------
// 📑 STATIC IMPORTS (The Pre-Execution Compiler Layer)
// -------------------------------------------------------------------------
// * SYNTAX: import { asset } from './module.js';
// * LIFECYCLE TIMELINE: Executes during the "Compilation/Parsing" phase.
// * CHARACTERISTICS: 
//   - Occurs BEFORE the Global Execution Context is born.
//   - Occurs BEFORE memory allocation / Hoisting occurs.
//   - Bundles code structurally on day one; non-conditional.

// -------------------------------------------------------------------------
// 📑 DYNAMIC IMPORTS (The Runtime Evaluation Layer)
// -------------------------------------------------------------------------
// * SYNTAX: import('./module.js').then(mod => {}) OR await import('./module.js')
// * LIFECYCLE TIMELINE: Executes during the "Line-by-Line Execution" phase.
// * CHARACTERISTICS:
//   - Occurs long AFTER the Global Execution Context and Hoisting are finished.
//   - Asynchronous: Returns a Promise object tracking the file download.
//   - Allows for 'Lazy Loading' and conditional optimization inside blocks/functions.

// -------------------------------------------------------------------------
// ⏳ THE DEFINITIVE ENGINE ENGINE TIMELINE SUMMARY:
// -------------------------------------------------------------------------
// 1. COMPILATION PHASE: Engine scans text -> Resolves & fetches Static Imports.
// 2. CONTEXT CREATION: Global Execution Context is created in RAM.
// 3. HOISTING SCAN: Memory slots are reserved for variables/functions.
// 4. RUNTIME EXECUTION: Code runs line-by-line -> Fiers logs & handles Dynamic Imports.