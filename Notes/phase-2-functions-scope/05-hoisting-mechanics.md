# 📂 Phase 2: Functions & Deep Scope

## 📄 05-hoisting-mechanics.md

This module dissects how the JavaScript compiler processes different declaration types during its initial parsing pass, mapping out identifier prioritization rules and Temporal Dead Zone constraints.

---

## 1. The Compilation Scan Mechanics

Hoisting is often described as the browser physically moving lines of code to the top of a file. This is a metaphor. In reality, hoisting is an artifact of the engine's two-phase lifecycle design: the **Creation Pass** and the **Execution Pass**.

During the creation pass, the compiler scans your script text line-by-line before running it. It looks for token identifiers (`var`, `let`, `const`, `function`) and registers them inside the environment records of the current scope. The code lines stay exactly where you wrote them, but the identifiers are allocated in memory ahead of time.

---

## 2. Hoisting Prioritization: Functions vs. Variables

When the compiler runs its initial scan, it follows a strict hierarchy when it encounters matching identifier names. **Function Declarations always take priority over Variable Declarations.**

```javascript
console.log(typeof renderEngine); // Prints: "function"

var renderEngine = "WebGL Source";

function renderEngine() {
  return "V8 Engine Instance";
}

console.log(typeof renderEngine); // Prints: "string"
```

### 🔬 The Step-by-Step Compilation Trace

Look at how the engine resolves the identifier `renderEngine` across both passes:

1. **The Compilation Pass (Function First):** The compiler sees the function declaration on line 5. It creates the identifier `renderEngine` inside the context record and links it directly to the function code block.
2. **The Compilation Pass (Variable Skip):** The compiler encounters `var renderEngine` on line 3. Because an identifier named `renderEngine` already exists, the compiler skips initializing it to `undefined` to protect the function reference.
3. **The Execution Pass (Line 1):** The engine runs `console.log(typeof renderEngine)`. It looks at memory, sees the function reference, and prints `"function"`.
4. **The Execution Pass (Line 3 Override):** The engine executes the assignment line `renderEngine = "WebGL Source"`. It overwrites the function reference in memory with the string primitive.
5. **The Execution Pass (Line 7):** The engine runs the second log. The identifier now holds a string, so it prints `"string"`.

---

## 3. Hoisting Styles Across Declaration Types

The engine handles allocations differently depending on the specific keyword used to declare the identifier:

| Declaration Type Syntax      | Hoisted Status                                       | Initial Compilation Assigned Value         | Early Access Runtime Consequence                                                                 |
| ---------------------------- | ---------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| **Function Declaration**     | **Fully Hoisted**                                    | Direct reference link to function body.    | Valid. Executes successfully before text declaration line.                                       |
| **`var` Variable**           | **Partially Hoisted**                                | Automatically assigned `undefined`.        | Valid, but evaluates to `undefined` (Risks bug leaks).                                           |
| **`let` / `const` Variable** | **Lexically Hoisted**                                | Uninitialized (**Trapped in TDZ**).        | Fatal Crash. Throws a runtime `ReferenceError`.                                                  |
| **Function Expression**      | Governed by wrapping keyword (`var` or `let/const`). | Dependent on variable keyword rules above. | Fatal Crash. Either throws `TypeError` (if var is undefined) or `ReferenceError` (if TDZ block). |

---

## 4. Class Declaration Hoisting Exception

Just like `let` and `const`, modern ES6 Class Declarations are lexically hoisted by the compiler, but they are **not initialized**. They are bound by the strict constraints of the Temporal Dead Zone.

```javascript
// ❌ Throws ReferenceError: Cannot access 'ClusterEngine' before initialization
const productionNode = new ClusterEngine();

class ClusterEngine {
  constructor() {
    this.status = "operational";
  }
}
```

Even though a class behaves like a function under the hood, trying to instantiate or access a class before its declaration line will trip the engine's TDZ boundary guard, halting execution with an instant runtime `ReferenceError`.

---

## 🚀 Phase 2, Topic 5 Mastery Verification

Mark `05-hoisting-mechanics.md` as **Complete**! Let's test your compiler tracing skills on a classic double-hoisting puzzle:

```javascript
var testingSuite = "Global Module";
function verifyEngine() {
  console.log(testingSuite);
  var testingSuite = "Local Module";
}
verifyEngine();
```

> **Engineering Scenario:** When `verifyEngine()` runs, does the `console.log(testingSuite)` print `"Global Module"`, `"Local Module"`, or `undefined`? Trace the compilation pass and execution pass of the local function context to explain exactly why this happens!

Let me know your breakdown, and we will open **`06-lexical-scoping-closures.md`** to explore how closures capture and retain memory!
