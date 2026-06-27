// -------------------------------------------------------------------------
// 📑 THE V8 COMPILATION PIPELINE
// -------------------------------------------------------------------------
// * PARSER -> Generates an Abstract Syntax Tree (AST) from raw source strings.
// * IGNITION -> V8's fast interpreter. Compiles AST into Bytecode instantly.
// * TURBOFAN -> V8's optimizing JIT compiler. Converts hot bytecode into Machine Code.

// -------------------------------------------------------------------------
// 🚨 PERFORMANCE ANTI-PATTERNS: MONOMORPHISM VS POLYMORPHISM
// -------------------------------------------------------------------------
// * Monomorphic Code: Functions that always receive the exact same data types/shapes.
// * Polymorphic Code: Functions where input structures continuously shift types.

// ✅ Monomorphic Pattern (TurboFan Optimized Line):
const processDataFixed = (obj) => obj.id + 10;
processDataFixed({ id: 1 });
processDataFixed({ id: 2 }); // TurboFan loves this. Same shape.

// ❌ Polymorphic/Morphic Mutation Pattern (Triggers De-optimization):
const processDataUnstable = (obj) => obj.id + 10;
processDataUnstable({ id: 5 });       // Shape A: { id: Integer }
processDataUnstable({ id: "Five" });   // Shape B: { id: String } -> TurboFan Bails Out!

// -------------------------------------------------------------------------
// 1. THE PARSER LAYER
// -------------------------------------------------------------------------
// * TOKENIZATION: Converts string source stream into lexical tokens.
// * AST NODE: Structural tree mapping out grammatical dependencies.
// * PRE-PARSER TRAP: Functions nested inside unexecuted code blocks are NOT 
//   fully parsed; V8 parses them lazily on invocation to prevent memory bloat.

// -------------------------------------------------------------------------
// 2. THE IGNITION BYTECODE SYSTEM
// -------------------------------------------------------------------------
// * ACCUMULATOR DESIGN: Uses an internal CPU-level emulation register (a0)
//   to pipeline calculations rapidly without heavy memory swapping.
// * FEEDBACK VECTORS: Maps type history metadata per instruction line.
//   This metadata is the absolute prerequisite for JIT compilation.

// -------------------------------------------------------------------------
// 3. THE TURBOFAN JIT SYSTEM
// -------------------------------------------------------------------------
// * SEA-OF-NODES: Relational graph architecture merging Control Flow & Data Flow.
// * INLINE CACHING: Bakes direct memory offset lookups into the CPU machine code,
//   bypassing standard dynamic key lookup loops.
// * BAILOUT PROCESS: Triggering a type mutation forces an instant stack-unwind,
//   de-optimizing back down to Ignition bytecode mid-execution.