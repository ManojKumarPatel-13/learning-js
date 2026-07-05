# 📂 Short Notes Wrap

## 📄 03-async-event-loop-cheat.md

This sheet maps the runtime Event Loop priorities, Promise state transitions, and asynchronous syntax wrappers into a highly scannable reference format.

---

## 1. The V8 Event Loop & Queue Priorities

JavaScript is inherently single-threaded, executing one instruction at a time on a single Call Stack. Asynchronous tasks (like network requests, timers, or disk inputs) are handled by the browser's web API container threads.

When these background operations complete, their callbacks return to the main thread via a strict, multi-tiered hierarchy monitored by the **Event Loop**.

### 📋 The Asynchronous Priority Matrix

| Execution Priority Layer | Target Component Channels | Operational Rules & Behavior |
| --- | --- | --- |
| **1. Synchronous Code** | Core Call Stack Operations | Executed instantly line-by-line. Blocks all other execution paths until the stack is completely clear. |
| **2. Microtasks** | `Promise.prototype.then()` / `queueMicrotask()` | **High Priority:** The Event Loop will completely empty the Microtask Queue before moving on. If a microtask schedules another microtask, it blocks the thread! |
| **3. Macrotasks** | `setTimeout()` / `setInterval()` / DOM Events | **Low Priority:** Processed exactly one callback per Event Loop tick, alternating with rendering updates. |

---

## 2. Promise Lifecycles & State Transitions

A **Promise** is a standard placeholder object tracking the eventual completion or failure of an asynchronous operations.

### 📋 The Three Immutable States

* **`Pending`:** The initial starting state. The asynchronous work is still executing in the background.
* **`Fulfilled`:** The operation completed successfully. Invokes attached `.then()` callbacks.
* **`Rejected`:** The operation failed due to a timeout or error. Invokes attached `.catch()` blocks.

```text
               ┌───────────────┐
               │    PENDING    │
               └───────┬───────┘
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
┌─────────────────┐         ┌────────────────┐
│    FULFILLED    │         │    REJECTED    │
│  (.then() trigger)│       │ (.catch() trigger)│
└─────────────────┘         └────────────────┘

```

> 🛑 **THE IMMUTABILITY LAW:** State changes are irreversible. Once a Promise flips from `Pending` to `Fulfilled` or `Rejected`, its state and inner data payload are locked down forever.

```javascript
// Quick-Construct Promise Sandbox
const fetchNodeStatus = () => {
    return new Promise((resolve, reject) => {
        const networkSuccess = true;
        if (networkSuccess) {
            resolve({ code: 200, status: "ONLINE" }); // Resolves to Fulfilled
        } else {
            reject(new Error("Network Isolation"));   // Resolves to Rejected
        }
    });
};

fetchNodeStatus()
    .then(data => console.log("Success Pass:", data))
    .catch(error => console.error("Failure Pass:", error.message));

```

---

## 3. Asynchronous Combinators Comparison

When coordinating multiple parallel Promise pipelines, choose the combinator that fits your architecture goals:

* **`Promise.all([...])`:** Runs tasks concurrently. **Fails instantly** if *one single* Promise rejects, abandoning the entire batch.
* **`Promise.allSettled([...])`:** Runs tasks concurrently and **never rejects**. It waits for every promise to either fulfill or fail, returning an array of structural diagnostic summaries (`{ status: "fulfilled", value: X }`).
* **`Promise.race([...])`:** Settles the moment the **very first** promise finishes, returning its payload regardless of whether it was a success or a failure.

---

## 4. Syntactic Sugar: `async / await`

The `async` and `await` keywords act as an elegant syntactic wrapper over raw Promise chains, transforming asynchronous code layouts into a structure that looks and reads like synchronous logic.

```javascript
// Adding 'async' forces the function to automatically return a Promise
async function executeTelemetryWorkflow() {
    try {
        // 'await' pauses local execution until the Promise resolves
        const status = await fetchNodeStatus();
        console.log("Telemetry payload intercepted:", status);
    } catch (error) {
        // Catches rejected Promises natively via standard try/catch blocks
        console.error("Intercepted workflow exception safely:", error.message);
    }
}

```

---

## 🚀 Cheat Sheet Rules of Thumb

* **Error Safety Integration:** Never leave an `await` statement loose without a defensive `try/catch` layout wrapper. Uncaught promise rejections can cause runtime script environments to crash.
* **Batch Performance Optimization:** Avoid cascading serial `await` tags sequentially if the actions are independent. Group them inside a `Promise.all()` wrapper to fire them concurrently, cutting down network latency bottlenecks.
* **Queue Evaluation Rule:** `Stack Wiped Clean` ──► `Process ALL Available Microtasks` ──► `Process ONE Single Macrotask`
