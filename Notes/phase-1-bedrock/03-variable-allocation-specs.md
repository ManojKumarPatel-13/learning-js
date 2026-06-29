# 📂 Phase 1: The Bedrock

## 📄 03-variable-allocation-specs.md

This module examines how JavaScript variables are allocated, scoped, and tracked within execution environment records, and dissects the compilation rules governing the Temporal Dead Zone (TDZ).

---

## 1. Scope Boundaries: Functional vs. Block Scoping

JavaScript engines manage visibility and access structures via **Lexical Environments**. Variables are bound by either the function containing them or the immediate code block wrapping them.

### 1.1 `var` (Function/Global Scoped)

Variables declared with `var` ignore structural code blocks like `if` statements, `switch` cases, or `for` loops. They attach themselves to the nearest wrapping function boundary. If no function wraps them, they are instantiated globally.

### 1.2 `let` & `const` (Block Scoped)

Variables declared with `let` or `const` bind directly to their nearest wrapping block layout—demarcated by explicit curly braces `{}`. They are inaccessible from anywhere outside those specific braces.

```javascript
if (true) {
  var globalLeak = "accessible outside";
  let blockScoped = "isolated inside";
}
console.log(globalLeak); // "accessible outside"
// console.log(blockScoped); // Throws ReferenceError: blockScoped is not defined
```

---

## 2. Hoisting Mechanics Under the Hood

During the engine's initial compilation phase, before a single line of code is executed, the engine runs a pass over the text source to discover and register identifier declarations. This process is commonly referred to as **Hoisting**.

### 2.1 The `var` Initialization Routine

When the engine encounters a `var` statement during compilation, it allocates space for the variable identifier in memory and instantly initializes its value to `undefined`. Because of this baseline assignment, you can read or write to a `var` identifier before its explicit declaration line in the script without throwing an error.

### 2.2 The `let` & `const` Metadata Phase

When the engine encounters `let` or `const` during compilation, it still reserves space for the identifier in its environment records. However, **it does not initialize it**. The variable is left completely uninitialized, making any early lookups illegal at runtime.

---

## 3. The Temporal Dead Zone (TDZ) Specification

The TDZ is not a static placement in a text file; it is a dynamic timeframe. It spans from the exact millisecond a block scope begins execution until the line of code containing the initializing declaration statement is fully evaluated by the engine thread.

```javascript
{
  // ──► TDZ for 'payload' begins at block entry

  // console.log(payload); // ❌ Throws ReferenceError: Cannot access 'payload' before initialization

  let tracker = "active"; // The TDZ for 'tracker' clears here, but 'payload' remains dead!

  let payload = { id: 101 }; // ──► TDZ for 'payload' clears right here on evaluation

  console.log(payload); // ✅ Prints: { id: 101 }
}
```

If a line of code tries to reference an identifier while it is still trapped inside the TDZ, the engine will halt execution and throw a `ReferenceError: Cannot access variable before initialization`.

---

## 4. Re-declaration and Re-assignment Protection Matrix

To protect codebase stability, the engine checks for syntax safety rules during compilation before running the script:

- **Re-declaration:** `var` allows you to declare the exact same variable identifier multiple times in the same scope without an error. Doing this with `let` or `const` causes the parser to immediately halt compilation and throw a `SyntaxError: Identifier has already been declared`.
- **The `const` Immutability Guard:** Declaring a variable with `const` creates an immutable binding link between the variable name and its memory reference address pointer. You must provide an initial assignment value when declaring it, or the compiler throws a `SyntaxError: Missing initializer in const declaration`. Trying to point that variable to a new address later throws a `TypeError: Assignment to constant variable`.

> ⚠️ **CRITICAL MEMORY NOTE:** `const` makes the _binding_ immutable, not the underlying _value_ itself. If a `const` variable holds a reference pointer to an object or array in the memory heap, you can freely modify the internal properties of that object because the memory address pointer itself never changes!

---

## 🚀 Phase 1, Topic 3 Mastery Verification

Mark `03-variable-allocation-specs.md` as **Complete** in your tracker index. Let’s look at a subtle edge-case behavior:

```javascript
let factor = 10;
{
  console.log(factor);
  let factor = 5;
}
```

> **Engineering Scenario:** If you run the code block above, does the `console.log(factor)` pull the value `10` from the outer scope, print `undefined`, or throw a fatal `ReferenceError`? Based on how compilation and the TDZ work, explain exactly what happens!

Let me know your answer, and we will open **`04-data-type-layout.md`** to map out Stack vs. Heap memory allocations!
