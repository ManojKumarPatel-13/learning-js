# 📂 Short Notes Wrap

## 📄 04-memory-v8-internals-cheat.md

This summary sheet tracks engine JIT compilation pipelines, garbage collection algorithms, memory allocations, and performance bottlenecks into a rapid-review layout.

---

## 1. The V8 JIT Hybrid Compilation Loop

Modern JavaScript engines do not use a slow line-by-line interpretation system. They leverage a **Just-In-Time (JIT)** hybrid compilation infrastructure to run code at near-native hardware speeds.

* **Ignition Interpreter:** Fast-starts execution by converting the parsed Abstract Syntax Tree (AST) into compact, memory-efficient **Bytecode**.
* **TurboFan Optimizer:** Monitors code execution. If a function runs frequently with identical data types ("Hot Function"), TurboFan compiles its bytecode straight into ultra-fast **Native Machine Code**.

```text
[JS Source Code] ──► [Ignition Bytecode] ──► Profiler Flags "Hot Function" ──► [TurboFan Machine Code]
                                                                                      │
  Interpreter Loop ◄───────────────── Type Guard Mismatch (Deopt Trigger) ◄───────────┘

```

### 🚀 Hidden Classes (Shapes) Rule of Thumb

V8 assigns an unexposed tracking map called a **Hidden Class (or Shape)** to objects based on the exact sequence their properties are declared. To maximize TurboFan optimization:

* **Always initialize object properties in the exact same order.**
* Avoid mixing property types dynamically (which causes performance-killing *Polymorphism*).

---

## 2. Generational Memory Heap Architecture

V8 divides system RAM into two distinct generational spaces based on the **Weak Generational Hypothesis**: the observation that most objects die almost immediately after allocation.

### 📋 Heap Allocation Summary

| Heap Memory Zone | Algorithmic Mechanism | Collection Operational Rules |
| --- | --- | --- |
| **New Space (Young Gen)** | **Cheney Scavenger Algorithm** | High-frequency, rapid copying GC pass. Splits memory into *From-Space* and *To-Space*. Active objects are evacuated to the To-Space; survivors of multiple rounds are promoted. |
| **Old Space (Old Gen)** | **Mark-Sweep-Compact Algorithm** | Low-frequency, comprehensive GC pass. Traces the root reachability graph, sweeps unreferenced bytes into a *Free List*, and compacts memory pages to eliminate fragmentation. |

---

## 3. High-Frequency Memory Leak Traps

A memory leak occurs when data is no longer needed by application logic, but remains **fully reachable** along the structural graph starting from a global **GC Root**.

### 3.1 The Hidden Closure Lexical Trap

When sibling closures are created in a shared parent function scope, they share the exact same internal lexical environment instance. If one closure references a large variable, *all* sibling closures hold onto it, even if they don't use it.

```javascript
let globalHook = null;
function createLeak() {
    const hugePayload = new Array(1000000).fill("⚠️"); // Massive heap usage
    const priorHook = globalHook;
    
    globalHook = function() { // Closure A: Retained globally
        if (priorHook) console.log("Ping");
    };
    
    function unusedUtility() { // Closure B: Shares parent scope with Closure A!
        return hugePayload;     // ❌ Forces hugePayload to stay alive indefinitely!
    }
}
setInterval(createLeak, 50); // Causes a rapid Out-Of-Memory crash

```

### 3.2 Detached DOM Elements

Removing an element from the active webpage layout via `.remove()` while keeping a reference pointer to it inside a JavaScript object creates a **Detached DOM Leak**. V8 is forced to keep that node—and its entire associated DOM tree branch—locked inside system memory.

---

## 4. UI Performance & Rate-Limiting Mechanics

To prevent **Layout Thrashing (Jank)** and maintain a fluid 60 FPS refresh cycle, you must coordinate high-frequency events with the browser's native rendering pipeline.

* **Debouncing:** Delays function execution until a specific period of inactivity passes. Consolidates rapid keystroke bursts into a single final action pass.
* **Throttling:** Enforces a hard rate-limit constraint, guaranteeing a function executes **exactly once per specified time window** (ideal for scroll and resize tracking).
* **`requestAnimationFrame` (rAF):** Completely bypasses macrotask queuing delays. It schedules visual rendering mutations to execute **in perfect synchronization with the monitor’s hardware repaint cycle**.

---

## 🚀 Cheat Sheet Rules of Thumb

* **Performance Validation:** Keep data shapes predictable. The moment you alter object structures dynamically, TurboFan executes an expensive **Deoptimization** pass and falls back to bytecode interpretation.
* **Memory Management:** Ensure event listeners are explicitly torn down via `.removeEventListener()` and set unused long-lived object references to `null` to sever GC Root paths.
* **Concurrency Allocation:** For heavy data mutations (like image filtering or massive mathematical array operations), offload the calculation payload to an isolated **Web Worker** thread using **Transferable Objects** for zero-copy performance.
