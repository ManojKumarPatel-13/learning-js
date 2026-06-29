# 📂 Phase 2: Functions & Deep Scope

## 📄 03-execution-context.md

This module dissects the operational lifecycles, memory structures, and structural compilation frames that govern JavaScript Execution Contexts under the hood.

---

## 1. What is an Execution Context?

An **Execution Context** is an abstract internal environment record created by the engine to manage the parsing, compilation, and live execution of a block of code. Think of it as a wrapping safety container that holds everything a script needs to evaluate safely line-by-line.

Every time a script boots up, or a function is invoked, the engine spawns a new context frame containing three vital internal memory blocks:

1. **The Variable Environment:** Stores internal function variables, parameters, and identifiers declared using the legacy `var` keyword.
2. **The Lexical Environment:** Stores identifiers and blocks instantiated via block-scoped keywords (`let`, `const`) alongside local function declarations.
3. **The Outer Environment Reference Pointer (`OuterEnv`):** A physical link address pointing to the parent lexical scope wrapper. This memory string is what forms the engine's active **Scope Chain**.

---

## 2. The Two Primary Context Layers

### 2.1 The Global Execution Context (GEC)

The baseline environment built the absolute millisecond your script file is loaded by the host engine.

* Only **one** GEC can exist per program runtime lifetime.
* It initializes the global object structure (`window` in browsers, `global` in Node.js).
* It maps the baseline `this` assignment keyword pointer directly to that global object context.

### 2.2 The Function Execution Context (FEC)

A localized context layer spawned dynamically **only when a function is explicitly invoked** via code execution.

* Every single function execution generates its own temporary context frame.
* It allocates a private inner parameter storage record (`arguments`) and tracks its own local evaluation scopes.

---

## 3. The Lifecycle: Creation Phase vs. Execution Phase

An Execution Context does not just execute text linearly. It undergoes a two-step lifecycle process every single time it fires up.

```text
[Function Invocation] ──► [1. Creation Phase] ──► [2. Execution Phase] ──► [Context Destruction]
                                │                        │
                       • Scan for var/let/const         • Line-by-line execution
                       • Hoist declarations             • Run calculations
                       • Assign default undefined       • Assign values to memory

```

### 3.1 Step 1: The Creation Phase (The Compilation Pass)

Before running a single line of code, the engine scans the function text block from top to bottom:

1. It reads all variable and function declarations.
2. It allocates memory spaces for those identifiers inside the `VariableEnvironment` or `LexicalEnvironment` tables.
3. It sets up hoisting properties (initializing `var` identifiers instantly to `undefined`, leaving `let` and `const` tokens uninitialized).
4. It reads its physical location in the text file and hardcodes its `OuterEnv` pointer string to lock down its Lexical Scope boundary.

### 3.2 Step 2: The Execution Phase (The Line-by-Line Run)

Once the creation checklist finishes, the engine resets its pointer back to the top of the context block and runs the text sequentially:

1. It assigns actual values to variables as it hits assignment lines (`x = 42`).
2. It evaluates operations, calculates expressions, and executes nested function calls.

---

## 4. Execution Context State Transitions in Memory

To see this transformation in action, look at how the engine records and shifts states within an FEC internally:

```javascript
function processCluster(coreId) {
    var status = "online";
    let coreLimit = 8;
}
processCluster(101);

```

### 📋 Phase 1: Creation Phase State Memory Record

```json
FunctionExecutionContext = {
    LexicalEnvironment: {
        EnvironmentRecord: {
            coreId: 101,
            coreLimit: <uninitialized> (Trapped in TDZ)
        },
        OuterEnvRef: <GlobalEnvironment>
    },
    VariableEnvironment: {
        EnvironmentRecord: {
            status: undefined
        }
    }
}

```

### 📋 Phase 2: Execution Phase State Memory Record (After running line-by-line)

```json
FunctionExecutionContext = {
    LexicalEnvironment: {
        EnvironmentRecord: {
            coreId: 101,
            coreLimit: 8
        },
        OuterEnvRef: <GlobalEnvironment>
    },
    VariableEnvironment: {
        EnvironmentRecord: {
            status: "online"
        }
    }
}

```

Once the execution thread hits the final closing curly brace of the function block, this execution context record is popped off the engine's main Call Stack tracking pipeline, and its contents are flagged for memory deletion via Garbage Collection!

---

## 🚀 Phase 2, Topic 3 Mastery Verification

Mark `03-execution-context.md` as **Complete** in your personal index list! Let's verify your architectural understanding:

> **Engineering Scenario:** Why does an engine need a separate `VariableEnvironment` and `LexicalEnvironment` inside the exact same Execution Context frame? What mechanical parsing flaw or historical behavior are these two independent inner maps tracking?

Let me know your breakdown, and we will open **`04-call-stack.md`** to track stack frame pile-ups and call limitations!

### 🏛️ The Great Environmental Schism: `var` vs. `let/const`

When ES6 introduced block scoping, the engineers at TC39 faced a major constraint: **they could not change how `var` works without breaking the entire existing web.** Millions of websites relied on the loose, function-scoped, auto-initialized behavior of `var`.

To add strict block scoping and the Temporal Dead Zone without touching legacy code, they split every Execution Context into two separate environment records:

#### 1. The Legacy Layer: `VariableEnvironment`

This map is reserved exclusively for `var` declarations and function declarations.

* It ignores code blocks (`if`, `for`).
* It automatically initializes everything to `undefined` during the compilation pass.
* This architecture preserves the legacy hoisting mechanics that JavaScript has used since day one.

#### 2. The Modern Layer: `LexicalEnvironment`

This map handles modern block-scoped bindings (`let`, `const`).

* It respects block boundaries (`{}`). Every time a block is entered, a fresh `LexicalEnvironment` is created and nested inside the current context.
* It leaves identifiers completely uninitialized until their actual code line is reached, enforcing the **Temporal Dead Zone**.
* This protects `const` variables from being read as `undefined` before they are assigned their immutable values.

By creating this parallel record design, the engine can run both legacy and modern code at the exact same time without them conflicting!
