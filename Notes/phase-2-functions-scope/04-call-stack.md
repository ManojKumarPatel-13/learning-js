# 📂 Phase 2: Functions & Deep Scope

## 📄 04-call-stack.md

This module examines how the JavaScript engine uses a Call Stack to track function execution order, manage thread allocations, and handle frame limitations.

---

## 1. The Call Stack Mechanics (LIFO Lifecycle)

JavaScript is a **single-threaded language**, meaning it can execute exactly one operation at a time on the main UI thread. To keep track of where it is across nested function calls, the engine uses a synchronized tracking structure known as the **Call Stack**.

The Call Stack operates on a strict **Last In, First Out (LIFO)** scheduling model:

* When a function is called, the engine creates its corresponding execution context frame and pushes (**push**) it onto the top of the stack.
* The engine focuses all computing resources on the context frame sitting at the very top of the stack.
* When the function hits a `return` keyword or its closing curly brace, its context frame is popped (**pop**) off the stack, and execution control drops back down to the frame directly underneath it.

---

## 2. Real-Time Stack Trace Compilation

To see how the engine manages memory changes across function calls, trace the execution of this script:

```javascript
function evaluateNode() {
    return "Node Checked";
}

function runCluster() {
    evaluateNode();
}

runCluster();

```

The diagram below tracks the states of the stack memory as line-by-line execution occurs:

```text
Step 1: Script Boots Up     Step 2: runCluster() Called   Step 3: evaluateNode() Called
┌───────────────────────┐   ┌───────────────────────┐     ┌───────────────────────┐
│                       │   │                       │     │ evaluateNode() Frame  │ ◄─ Current Active
├───────────────────────┤   ├───────────────────────┤     ├───────────────────────┤
│                       │   │  runCluster() Frame   │     │  runCluster() Frame   │
├───────────────────────┤   ├───────────────────────┤     ├───────────────────────┤
│ Global Context Frame  │   │ Global Context Frame  │     │ Global Context Frame  │
└───────────────────────┘   └───────────────────────┘     └───────────────────────┘

Step 4: evaluateNode() Pops  Step 5: runCluster() Pops     Step 6: Script Finishes
┌───────────────────────┐   ┌───────────────────────┐     ┌───────────────────────┐
│                       │   │                       │     │                       │
├───────────────────────┤   ├───────────────────────┤     ├───────────────────────┤
│  runCluster() Frame   │ ◄─│                       │     │                       │
├───────────────────────┤   ├───────────────────────┤     ├───────────────────────┤
│ Global Context Frame  │   │ Global Context Frame  │ ◄─  │                       │
└───────────────────────┘   └───────────────────────┘     └───────────────────────┘

```

---

## 3. Stack Frame Limitations: Maximum Call Stack Size

Because the Call Stack is a finite block of fast contiguous memory allocated by the browser, it has a hard capacity ceiling. If a function continues to push new frames onto the stack without ever popping them off, it will hit this ceiling.

This typically occurs via **Infinite Recursion**—a function calling itself indefinitely without a termination rule:

```javascript
function triggerCrash() {
    triggerCrash(); // Pushes frames endlessly
}
triggerCrash();

```

### 💥 The Maximum Call Stack Size Exceeded Crash

When this script runs:

1. `triggerCrash()` pushes a frame onto the stack.
2. Before it can return, it calls itself, pushing a secondary frame.
3. This loop runs thousands of times until the stack runs completely out of memory.
4. The engine halts execution instantly to protect the operating system, throwing a fatal **`RangeError: Maximum call stack size exceeded`** (commonly known as a **Stack Overflow**).

The exact frame allocation limit varies by browser engine:

* **V8 (Chrome/Edge):** Roughly 10,000 to 11,000 frames.
* **JavaScriptCore (Safari):** Up to 30,000 frames.
* **SpiderMonkey (Firefox):** Dynamic, based on current system memory allocations.

---

## 🚀 Phase 2, Topic 4 Mastery Verification

Mark `04-call-stack.md` as **Complete**! Let's verify your architectural understanding of the engine:

> **Engineering Scenario:** Why doesn't a web app crash with a `RangeError` when it handles thousands of user click events or running asynchronous timer loops (`setTimeout`), even though an infinite loop crashes the engine in less than a second? What structural safety mechanism prevents asynchronous actions from overflowing the Call Stack?

Let me know your thoughts, and we will open **`05-hoisting-mechanics.md`** to look at compilation scans!