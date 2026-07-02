# 📂 Phase 6: Asynchronous JS & The Engine Loop

## 📄 02-promise-lifecycle-specifications.md

This module breaks down the internal engine state specifications, state-machine mutations, and execution queue priorities governing ECMAScript Promises.

---

## 1. Solving Inversion of Control

The primary architectural breakthrough of a **Promise** is that it flips the Inversion of Control model completely back on itself.

Instead of handing your program's callback functions over to a third-party script and hoping it executes them correctly, an asynchronous API returns a placeholder **Promise object instance** back to your code. Your application retains ownership of this object, managing its own success and failure handlers via `.then()` and `.catch()` hooks.

---

## 2. The Internal 3-State Machine Specification

An ECMAScript Promise behaves exactly like a synchronous, un-degradable state machine. Internally, a Promise instance contains a hidden slot property named **`[[PromiseState]]`** which can only occupy one of three mutual states:

* **`pending`:** The initial, default state of an unresolved operation. The promise remains here while background asynchronous tasks run.
* **`fulfilled`:** The operation completed successfully. The hidden **`[[PromiseResult]]`** property captures the returned data payload.
* **`rejected`:** The operation failed or encountered an error. The **`[[PromiseResult]]`** property captures the error exception object.

### 🛡️ The Immutable Settlement Protection

A Promise state transition is completely **irreversible and immutable**. A promise can only change states once: moving from `pending` to `fulfilled`, or from `pending` to `rejected`.

Once a promise lands on a settled state, its internal state and result are frozen. Any future attempt by a script to resolve or reject that same promise instance again is silently ignored by the engine. This completely solves the callback vulnerability of multiple accidental executions!

---

## 3. Microtask Queue Scheduling Priorities

The JavaScript engine manages asynchronous execution paths using two distinct task queues. Promises are given high-priority handling:

* **The Macrotask Queue (Task Queue):** Handles heavy events like `setTimeout`, `setInterval`, network I/O events, and user clicks.
* **The Microtask Queue:** Handles Promise settlement resolution callbacks (`.then()`, `.catch()`, `.finally()`) and `queueMicrotask()`.

### 🚨 The Priority Execution Rule

**The V8 engine prioritizes the Microtask Queue over the Macrotask Queue.** The event loop will continuously execute all available tasks inside the Microtask Queue until it is completely empty before it checks or releases a single task from the Macrotask Queue.

```javascript
setTimeout(() => console.log("Macrotask (setTimeout)"), 0);

Promise.resolve().then(() => {
    console.log("Microtask A (Promise)");
}).then(() => {
    console.log("Microtask B (Promise Chain)");
});

console.log("Synchronous Code");

// Execution Order:
// 1. "Synchronous Code"
// 2. "Microtask A (Promise)"
// 3. "Microtask B (Promise Chain)"
// 4. "Macrotask (setTimeout)"

```

---

## 4. Catching Failures: Unhandled Rejections

If a Promise changes its internal state to `rejected` but your script lacks an active `.catch()` listener or rejection callback attached to that chain link, the V8 engine flags the failure as an **Unhandled Promise Rejection**.

This triggers a fallback event on the global host scope (`unhandledrejection` in browsers or `unhandledRejection` in Node.js processes). If left unhandled, it can destabilize application states or crash backend processes completely.

---

## 🚀 Phase 6, Topic 2 Mastery Verification

Mark `02-promise-lifecycle-specifications.md` as **Complete** in your tracker manual! Let's verify your microtask scheduling skills:

```javascript
const hardwarePromise = new Promise((resolve, reject) => {
    console.log("1");
    resolve("2");
});

setTimeout(() => console.log("3"), 0);

hardwarePromise.then((res) => {
    console.log(res);
});

console.log("4");

```

> **Engineering Scenario:** When the script above executes, what is the exact sequence printed to the console? Trace carefully how the code inside the Promise constructor executes versus how its fulfillment handler is scheduled!


Here is why `"1"` beats `"4"` under the hood:

1. **The Constructor is Synchronous:** The initialization function passed into `new Promise((resolve, reject) => { ... })` executes **synchronously** right when it's created. Therefore, `"1"` logs immediately.
2. **Fulfillment Deferred:** Calling `resolve("2")` shifts the Promise state to `fulfilled`, but its `.then()` callback is pushed into the **Microtask Queue** to run after the current synchronous block finishes.
3. **The Script Completes:** The main execution line continues, logging `"4"`.
4. **Queues Drain:** The event loop checks the Microtask Queue first and prints `"2"`. Finally, it checks the Macrotask Queue and flushes the `setTimeout`, printing `"3"`.