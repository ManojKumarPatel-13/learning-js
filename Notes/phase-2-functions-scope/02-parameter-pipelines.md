# 📂 Phase 2: Functions & Deep Scope

## 📄 02-parameter-pipelines.md

This module breaks down parameter initialization routines, evaluation barriers for default assignments, and memory copying mechanics within Rest and Spread syntax operations.

---

## 1. Default Parameters & The Intermediate Scope Barrier

When a function utilizes ES6 Default Parameters, the engine's initialization process shifts. Instead of assigning values directly to the function's local execution scope, the engine constructs an **Intermediate Parameter Scope (Environment Record)** that sits between the calling outer scope and the inner function body scope.

```javascript
function processQuery(base, multiply = base * 2) {
    // Parameter initialization runs inside an isolated, temporary scope layer
    return base + multiply;
}

```

### 🔬 The Initialization Pipeline and TDZ

Parameters are evaluated sequentially from left to right. Because default parameters are declared within this intermediate parameter block, they follow the strict rules of block scopes:

1. As each parameter is parsed, it clears its individual Temporal Dead Zone (TDZ).
2. A parameter initialized later *can* look backward to reference a previously initialized parameter to its left.
3. A parameter *cannot* look forward to reference a parameter to its right, because that forward parameter is still trapped inside the TDZ.

```javascript
// ❌ Throws ReferenceError: Cannot access 'offset' before initialization
function setPosition(target = offset + 10, offset = 5) { return target; }

```

---

## 2. Rest Parameters (`...rest`) vs. Spread Operators (`...spread`)

While both features use the identical triple-dot syntax token (`...`), they serve exact opposite purposes within the engine's memory pipeline.

```text
Rest Syntax:   Multiple Arguments ──► Enfolds into ──► Single Array Structure
Spread Syntax: Single Collection  ──► Unrolls into ──► Individual Stack Elements

```

### 2.1 Rest Parameters: True Allocation

The Rest syntax is an inline functional assignment collector. It gathers remaining trailing arguments and allocates a **genuine stack-allocated Array** instance to hold them.

Unlike the legacy `arguments` object, a rest parameter array inherits directly from `Array.prototype`. This means you can instantly invoke chainable array methods like `.map()`, `.filter()`, and `.reduce()` directly on it without running manual type conversion steps.

```javascript
function processLog(level, ...messages) {
    // 'messages' is a real array instance
    return messages.map(msg => `[${level}] ${msg}`);
}

```

### 2.2 Spread Operators: Memory Deconstruction

The Spread operator is a deconstruction mechanic. It consumes an iterable structure (like an array) or a plain object dictionary and unrolls its individual entries directly into a new target destination.

---

## 3. Memory Copying Mechanics during Spread Expansions

When you use the spread operator to clone or merge arrays and objects, it is vital to understand what the engine is doing inside its memory heap. **The spread operator always executes a Shallow Copy operation.**

### 3.1 Deep Dive: Shallow Copy Memory Trace

When the engine expands an object or array via spread syntax:

1. It allocates a brand-new, independent memory structure in the heap for the top-level container.
2. It loops through the target data and copies primitive values directly by value.
3. If it encounters a nested sub-object or array, it **does not clone it**. It simply copies the existing hexadecimal memory reference pointer.

```javascript
const hardwareNode = {
    coreId: 101,
    metrics: { temperature: 42 }
};

// Shallow clone via Spread Operator
const clonedNode = { ...hardwareNode };

clonedNode.coreId = 999; 
console.log(hardwareNode.coreId); // 101 (Primitive copy is safe and decoupled)

clonedNode.metrics.temperature = 85; 
console.log(hardwareNode.metrics.temperature); // 85 ❌ (Shared pointer altered)

```

Both `hardwareNode.metrics` and `clonedNode.metrics` point to the exact same sub-object in the memory heap. Modifying a nested property through one variable changes it for both, exposing a classic memory trap in data manipulation workflows.

---

## 🚀 Phase 2, Topic 2 Mastery Verification

Mark `02-parameter-pipelines.md` as **Complete**! Let's test your ability to trace intermediate scopes:

```javascript
let mode = "global";
function toggle(mode = "local", callback = () => mode) {
    let mode = "inner";
    console.log(callback());
}
toggle();

```

> **Engineering Scenario:** The code snippet above executes without throwing an error. Does the `console.log(callback())` print `"global"`, `"local"`, or `"inner"`? Based on how the engine isolates **Intermediate Parameter Scopes** from the internal function block scope, explain the exact mechanical lookup pathway the engine takes.

Let me know your breakdown, and we will open **`03-execution-context.md`** to explore the allocation phases of Call Stack frames!