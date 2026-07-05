# 📂 Short Notes Wrap

## 📄 02-functions-closures-cheat.md

This sheet maps execution scopes, hoisting priorities, lexical closures, and context execution targets into an integrated reference layout.

---

## 1. Function Architectures: Declarations vs. Expressions

JavaScript supports multiple functional definitions, each parsed uniquely by the engine:

* **Function Declaration:** Standard named functions parsed during the engine's compilation setup pass. They are completely hoisted.
* **Function Expression:** Functions assigned directly to variables. They act like standard variables and are not initialized until execution hits their exact line.
* **Arrow Functions (`() => {}`):** Compact syntax expressions that do not allocate an independent `this` context or an internal `arguments` array object.

```javascript
// 1. Function Declaration
function calculateLoad(nodes) {
    return nodes * 1.5;
}

// 2. Function Expression
const analyzeData = function(stream) {
    return stream.compact();
};

// 3. Arrow Function Expression (Implicit Return Mode)
const doubleValue = x => x * 2;

```

---

## 2. The Hoisting Engine Matrix

Before executing code line-by-line, the JavaScript engine runs a preparation phase. It scans your code, registers variable identifiers, and allocates their memory boundaries. This behavior is called **Hoisting**.

### 📋 Hoisting Initialization Hierarchy

| Code Element Structure | Hoisting Status | Phase Lifecycle Result |
| --- | --- | --- |
| **`function` Declarations** | **Fully Hoisted** | Attached directly to memory with its full internal function code block intact. You can invoke it safely *before* it is written textually in the file. |
| **`var` Declarations** | **Partially Hoisted** | The variable identifier key is hoisted, but its value is initialized to `undefined`. Invoking it early returns `undefined`. |
| **`let` / `const` Variables** | **Temporal Dead Zone** | The identifier is registered, but the memory slot remains sealed in an uninitialized state called the **Temporal Dead Zone (TDZ)**. Invoking it early throws a fatal `ReferenceError`. |

---

## 3. Scopes, Lexical Environments, and Closures

* **Scope:** The boundary matrix inside which specific variable keys are visible and accessible.
* **Lexical Environment:** The hidden nested nesting architecture that defines how variable scopes inherit access from parent contexts based on where the code was written in the text editor.

### 🧠 The Core Closure Mechanics

A **Closure** is an automatic engine feature where a nested function permanently retains structural access to its outer parent function's lexical scope environment variables, even **after the outer function has finished executing and popped off the Call Stack**.

```javascript
function allocateCounter(initialValue) {
    let internalCount = initialValue; // ◄── Saved alive inside a hidden closure bubble
    
    return {
        increment: function() {
            internalCount++;
            return internalCount;
        }
    };
}

const counterNode = allocateCounter(10);
console.log(counterNode.increment()); // Logs: 11
console.log(counterNode.increment()); // Logs: 12

```

---

## 4. The `this` Keyword Context Bind Engines

The `this` keyword does not point to the function declaration; it dynamically maps to **how the function was actively executed at runtime**.

### 📋 Context Priority Resolution Engine

```text
Priority 1: 'new' Constructor Bind ──► Priority 2: Explicit Bind (.call/.apply/.bind) ──► Priority 3: Implicit Object Method ──► Priority 4: Default Global/Undefined

```

```javascript
const nodeBroker = {
    tag: "BROKER_ALPHA",
    printTag() { console.log(this.tag); }
};

const foreignNode = { tag: "BROKER_BETA" };

// 1. Implicit Invocation Context Pass
nodeBroker.printTag(); // Logs: "BROKER_ALPHA" (Object left of the dot wins)

// 2. Explicit Injection Hijack Pass
nodeBroker.printTag.call(foreignNode); // Logs: "BROKER_BETA" (.call overrides implicit context)

// 3. Arrow Function Exception
const dynamicContainer = {
    tag: "NODE_C",
    stream: () => { console.log(this.tag); } // ❌ Arrow function resolves 'this' lexically from parent!
};

```

---

## 🚀 Cheat Sheet Rules of Thumb

* **Function Selection:** Default to Arrow functions for clean callback transformations (`map`, `filter`). Use traditional function declarations for top-level component blueprints or methods where dynamic object `this` properties are needed.
* **Scope Control:** Never use `var`. Keep your variables tightly locked inside block contexts using `const` and `let` to prevent accidental global scope pollution.
* **Context Interception:** Use `.call()` when passing dynamic single arguments immediately. Use `.apply()` if arguments are pre-packed in arrays. Use `.bind()` when generating sticky event handler actions or decoupled components that need a permanently locked target context.
