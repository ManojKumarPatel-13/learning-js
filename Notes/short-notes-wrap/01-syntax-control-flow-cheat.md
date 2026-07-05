# 📂 Short Notes Wrap

## 📄 01-syntax-control-flow-cheat.md

This sheet condenses JavaScript core syntax rules, data foundations, conditional logic patterns, and the iteration matrix into a rapid-review dashboard.

---

## 1. Variables & Primitive Data Types

JavaScript utilizes three declaration keywords, managed by specific allocation rules:

* **`let` / `const`:** Block-scoped (`{ }`). They are bound to the block where they are declared and do not leak out. `const` prevents reference re-assignment.
* **`var`:** Function-scoped. It completely ignores standard block gates like `if` or `for` loops, creating legacy global pollution risks.

### 📋 Primitive Types Quick-Reference

| Primitive Type | Core Behavior & Description | Rule of Thumb |
| --- | --- | --- |
| **Number** | Double-precision 64-bit float values. | Watch out for floating-point inaccuracies (e.g., $0.1 + 0.2 \neq 0.3$). |
| **String** | Immutable UTF-16 character sequences. | Use template literals (``text ${var}``) for clean evaluation layouts. |
| **Boolean** | Logical flags: `true` or `false`. | Evaluates instantly inside conditional testing matrices. |
| **BigInt** | Numeric values tracking values past the standard Safe Integer boundary. | Append an `n` suffix to the number token (e.g., `9007199254740991n`). |
| **Symbol** | Guaranteed completely unique, immutable tokens. | Ideal for generating hidden or collision-proof object keys. |
| **undefined** | Automatically assigned to declared variables lacking a value definition. | Means a variable has been declared, but its value is uninitialized. |
| **null** | Explicit, intentional assignment representing an empty object reference pointer. | `typeof null === "object"` is a legacy engine bug to keep in mind. |

---

## 2. Conditionals & Dynamic Truthiness

Conditional statements switch execution paths based on an expression's truth value.

```javascript
// Strict Equality Check (Rule of Thumb: ALWAYS use === over ==)
if (status === "ACTIVE") {
    executeNode();
} else if (status === "PENDING") {
    stageNode();
} else {
    terminateNode();
}

// Short-Circuit Assignment Alternatives
const displayColor = userTheme || "DEFAULT_DARK"; // Fallback if userTheme is falsy
const databasePort = customPort ?? 8080;          // Nullish Coalescing: Only falls back if customPort is strictly null or undefined

```

### 🛑 Falsy Values Checklist

When evaluated in a conditional check, exactly **eight values** are recognized by the engine as **falsy** (everything else evaluates to `true`):

1. `false`
2. `0` (including `-0` and `0n`)
3. `""` (Empty String)
4. `null`
5. `undefined`
6. `NaN`

---

## 3. The Iteration Matrix (Loop Selection Blueprint)

Choosing the correct loop architecture depends on the data structure you are traversing and your performance goals.

### 3.1 `for...of` Loop (The Array Choice)

* **Target:** Iterables (Arrays, Strings, Maps, Sets).
* **Rule of Thumb:** Use this by default for arrays. It extracts values directly, respects loops breaks (`break`, `continue`), and works natively with async operations.

```javascript
const clusters = ["Cluster-A", "Cluster-B"];
for (const cluster of clusters) {
    console.log(cluster); // Directly logs: "Cluster-A", "Cluster-B"
}

```

### 3.2 `for...in` Loop (The Object Inspector)

* **Target:** Object properties (Enumerable keys).
* **Rule of Thumb:** Use this exclusively to inspect properties on plain objects. **Never use this for arrays** because it iterates over indices as string keys and crawls up the prototype chain.

```javascript
const serverLog = { node: "S1", ping: 12 };
for (const key in serverLog) {
    console.log(`${key}: ${serverLog[key]}`); // Logs "node: S1", "ping: 12"
}

```

### 3.3 Functional Array Iterators (`forEach`, `map`, `filter`)

* **Target:** Higher-order array processing.
* **Rule of Thumb:** Use `map` when transforming data into a new array of identical length. Use `filter` to prune arrays. Use `forEach` for side effects, but remember: **you cannot break or return out of a `forEach` loop early.**

```javascript
const rawPings = [10, 45, 120, 30];

// Transform array values using a map loop
const adjustedPings = rawPings.map(ping => ping + 5);

// Filter values based on a condition
const highLagPings = rawPings.filter(ping => ping > 40);

```

---

## 🚀 Cheat Sheet Rules of Thumb

* **Variable Isolation:** Default to `const`. Switch to `let` only if variable value reassignment is explicitly required. Ban `var` from your codebase entirely.
* **Type Validation:** Always enforce strict equality `===` checking. Using abstract `==` forces the engine into complex implicit coercion loops that hide software logic bugs.
* **Loop Traversal Efficiency:** * Loops over data arrays $\rightarrow$ `for...of` or functional methods (`map`/`filter`).
* Loops over object property keys $\rightarrow$ `for...in`.