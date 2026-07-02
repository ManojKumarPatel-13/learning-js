# 📂 Phase 6: Asynchronous JS & The Engine Loop

## 📄 04-async-await-wrapper.md

This module peels back the `async/await` syntax to expose how compilers transform declarations into generator-driven coroutine state machines, detailing runtime performance and exception handling models.

---

## 1. Compiler Under-the-Hood Transformation

The `async/await` syntax is purely **syntactic sugar** wrapped around native Promises and Generators. The engine does not possess a separate asynchronous execution model for `await`; instead, the V8 compiler rewrites your clean synchronous-looking functions into an automated state machine loop.

```javascript
async function fetchConfig() {
    const res = await fetch("/api");
    const data = await res.json();
    return data;
}

// ...Is compiled down into a Generator-driven State Machine Coroutine:
function fetchConfigCompiled() {
    return spawn(function* () {
        const res = yield fetch("/api");
        const data = yield res.json();
        return data;
    });
}

```

When your code hits an `await` expression, the function's active execution context is safely **paused and moved off the Call Stack**. The engine registers a microtask settlement listener against the yielded Promise, allowing other scripts to run. The moment that promise settles, the engine restores the context frame right back onto the Call Stack to resume running.

---

## 2. Execution Overhead & Microtask Tick Delays

While `async/await` makes code clean, it introduces subtle, native engine tick delays that you must factor into high-performance web systems.

Every time the engine encounters the `await` keyword, it wraps the trailing expression inside a hidden `Promise.resolve()` wrapper. This forces an immediate **Microtask Tick Delay**, pushing the remaining lines of the function down into the Microtask Queue to be run later.

```javascript
async function runDiagnostic() {
    console.log("A");
    await null; // Forces a promise wrap and microtask tick suspension
    console.log("B"); // Deferred to the microtask queue pass
}

runDiagnostic();
console.log("C");

// Output Order: A -> C -> B

```

---

## 3. Defensive Exception Tracking via Try-Catch

With standard promise chains, errors are passed down via `.catch()`. With `async/await`, rejections are un-wrapped and thrown as traditional runtime exceptions directly inside the context frame.

This requires wrapping your async blocks inside robust `try/catch/finally` blocks to prevent unhandled rejection crashes:

```javascript
async function ingestStream() {
    try {
        const payload = await fetchNetworkStream();
        process(payload);
    } catch (error) {
        // Intercepts network dropouts or parsing structural errors cleanly
        logErrorToTelemetry(error);
    } finally {
        // Runs no matter what—ideal for disconnecting web sockets or clearing loading states
        closeLoadingModal();
    }
}

```

---

## 🚀 Phase 6, Topic 4 Mastery Verification

Mark `04-async-await-wrapper.md` as **Complete** in your tracker manual! Let's verify your execution pacing analysis:

```javascript
async function taskEngine() {
    console.log("1");
    await Promise.resolve();
    console.log("2");
}

taskEngine();
console.log("3");

```

> **Engineering Scenario:** What will be the exact print sequence when this code block fires on the V8 engine? Trace exactly how the `await` keyword modifies the execution order of `"2"` relative to `"3"`!

Actually, the order is **`1, 3, 2`**!

### 🔬 The Step-by-Step Pacing Trace

Here is the exact step-by-step route the engine takes:

1. **Step 1:** `taskEngine()` is invoked. The first line runs synchronously, logging **`"1"`**.
2. **Step 2:** The engine encounters `await Promise.resolve()`. The execution of `taskEngine()` is instantly **paused**, and the rest of the function (the log for `"2"`) is packed up and pushed into the **Microtask Queue**. Control is returned back to the main file script.
3. **Step 3:** The main thread continues running the synchronous path, printing **`"3"`**.
4. **Step 4:** The synchronous script finishes, and the Event Loop checks the Microtask Queue. It pulls out the remaining instructions for `taskEngine()` and prints **`"2"`**.
