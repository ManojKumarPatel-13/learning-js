# 📂 Phase 5: Object-Oriented JS

## 📄 01-this-keyword-context.md

This module dissects the architectural rules governing the runtime evaluation of the `this` keyword, mapping context bind targets, explicit engine interception hooks, and lexical scope exemptions.

---

## 1. The Dynamic Binding Core Principle

Unlike languages where the `this` reference is statically locked to an object instance at compile time, JavaScript’s `this` context keyword is **purely dynamic**. It does not care where a function was textually declared; it is determined entirely by **how the function was actively executed** at the exact millisecond of invocation.

When an Execution Context is pushed onto the Call Stack, the V8 engine assigns a special internal reference property named `ThisBinding`. The engine determines this reference by evaluating four explicit runtime priority rules.

---

## 2. The 4 Evaluation Context Priorities

### 2.1 Rule 1: Default Binding (Global / Undefined)

If a standalone function is invoked without any execution modifiers, `this` defaults to the global object scope container.

```javascript
function clearConsole() {
  console.log(this);
}
clearConsole(); // In non-strict mode: window (browser) or global (Node)
```

> 🛑 **THE STRICT MODE AMENDMENT:** If a function file executes under `"use strict"`, the default binding rule is blocked from falling back to the global object. Instead, `ThisBinding` evaluates strictly to **`undefined`**, protecting global variables from accidental mutation.

### 2.2 Rule 2: Implicit Binding (Context Object Owners)

When a function is called as a property method on an object container, the object situated immediately to the left of the invocation dot becomes the active reference target.

```javascript
const hardwareNode = {
  id: "Node-A",
  readTelemetry: function () {
    console.log(this.id);
  },
};
hardwareNode.readTelemetry(); // Logs: "Node-A" (this points directly to hardwareNode)
```

#### 🪓 The Implicit Loss Trap

If you slice a method pointer out of its parent object and assign it to a new reference variable, the implicit context tracking tie is severed instantly:

```javascript
const looseRead = hardwareNode.readTelemetry;
looseRead(); // ❌ Logs: undefined! (Execution falls back to Default Binding)
```

### 2.3 Rule 3: Explicit Binding (`call`, `apply`, `bind`)

To bypass context guessing rules entirely, JavaScript functions inherit three prototypical prototype methods that force an explicit binding target into the engine:

- **`.call(thisArg, arg1, arg2, ...)`:** Invokes the target function immediately, forcing `thisArg` as the runtime context pointer while expanding trailing parameters sequentially.
- **`.apply(thisArg, [argsArray])`:** Operates identically to `.call()`, but accepts trailing function arguments wrapped cleanly inside a single structured array array block.
- **`.bind(thisArg, arg1, ...)`:** Does not execute the function. Instead, it alters the function's internal metadata pointer and returns a brand-new, immutable function wrapper permanently locked to the provided `thisArg` context.

```javascript
function calibrate(mode, factor) {
  console.log(`${this.id} adjusted to ${mode} with multiplier ${factor}`);
}

const subsystem = { id: "Subsystem-4" };

calibrate.call(subsystem, "SAFE", 1.5); // Immediate call via arguments
calibrate.apply(subsystem, ["MAX", 2.0]); // Immediate call via array array
const lockedCalibrate = calibrate.bind(subsystem); // Persistent link returned
```

### 2.4 Rule 4: The `new` Constructor Binding

When a function is called with the `new` prefix operator keyword, the engine triggers a unique instantiation pipeline: a brand new empty object is generated in the memory heap, its internal prototype chain is linked, and `this` is bound directly to that new object shell for the duration of the execution block.

---

## 3. Lexical Arrow Function Exemptions

Arrow functions (`() => {}`) do not possess their own internal `ThisBinding` property slot. They are entirely blind to the four standard dynamic binding rules outlined above.

Instead, arrow functions behave exactly like standard variable closures: they capture the `this` context from their **lexical parent context scope** at compile time and lock it down permanently.

```javascript
const loggingTerminal = {
  tag: "SYS-LOG",
  initStream: function () {
    // The outer function has dynamic implicit access to loggingTerminal
    setTimeout(() => {
      // Arrow function resolves 'this' lexically from initStream
      console.log(`Connection established for: ${this.tag}`);
    }, 100);
  },
};
loggingTerminal.initStream(); // Logs: "Connection established for: SYS-LOG"
```

> ⚠️ **THE ARROW BIND OVERRIDE BUG:** Because arrow functions resolve context lexically through the scope chain, attempts to alter their context runtime vectors using `.call()`, `.apply()`, or `.bind()` will be silently ignored by the engine without throwing an explicit error.

---

## 🚀 Phase 5, Topic 1 Mastery Verification

Mark `01-this-keyword-context.md` as **Complete** in your workspace tracker index! Let's trace an extraction pipeline check:

```javascript
const coreProcessor = {
  frequency: "4.2GHz",
  getFreq: function () {
    return this.frequency;
  },
};

const serverLog = {
  frequency: "2.1GHz",
};

const extractedMethod = coreProcessor.getFreq;
const boundMethod = extractedMethod.bind(serverLog);

console.log(boundMethod.call(coreProcessor));
```

> **Engineering Scenario:** When the code snippet above runs on the Call Stack, what will be logged to the console, and why? Trace how priority rules resolve when an explicit `.call()` attempts to hijack a previously instantiated `.bind()` reference link!

### 🔬 The Context Priority Trace

Here is why `.call()` loses this battle under the hood:

1. `extractedMethod` points to the raw function `getFreq`.
2. `boundMethod = extractedMethod.bind(serverLog)` wraps that raw function in an exotic internal object link that permanently locks its internal `[[BoundThis]]` slot to `serverLog`.
3. When you run `boundMethod.call(coreProcessor)`, you are attempting to overwrite the context at runtime. However, the internal implementation specification for bound functions states that **once a function is explicitly bound via `.bind()`, its `this` target can never be overridden again by `.call()` or `.apply()`.** The engine silently ignores `coreProcessor` and executes the function using the locked `serverLog` context ($2.1\text{GHz}$).

Let's keep moving. Open up your second file: **`notes/phase-5-object-oriented-js/02-prototypal-inheritance.md`** and let's map out the memory linkages of the language.
