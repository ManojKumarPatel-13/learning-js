# 📂 Phase 6: Asynchronous JS & The Engine Loop

## 📄 03-promise-combinators.md

This module breaks down the concurrency models, short-circuit rules, and error handling architectures of the four native ECMAScript Promise combinators.

---

## 1. Concurrency Matrices Overview

When your application needs to coordinate multiple asynchronous network streams simultaneously, executing them sequentially using sequential `await` expressions creates a performance bottleneck.

Instead, you can run them in parallel by passing them as an array into one of the four native **Promise Combinators**. Each combinator uses a completely different short-circuit rule to determine when to return data or throw an error.

---

## 2. Deep-Dive Specification Breakdown

### 2.1 `Promise.all(iterable)` (The "All-or-Nothing" Engine)

- **Resolution Rule:** Resolves only when **every single promise** in the array fulfills successfully. It returns an array containing all fulfillment payloads in the exact order they were requested.
- **Short-Circuit Rejection:** If even a single promise rejects, the entire operation drops immediately. It short-circuits and returns that single error string, discarding any other successful data streams.

```javascript
// Useful for co-dependent initialization data
Promise.all([fetchProfiles(), fetchSettings()])
  .then(([profiles, settings]) => console.log("All systems ready"))
  .catch((error) => console.error("Initialization aborted:", error));
```

### 2.2 `Promise.allSettled(iterable)` (The High-Resiliency Inspector)

- **Resolution Rule:** Never short-circuits. It waits for **every single promise** to either resolve _or_ reject completely. It always fulfills, returning an array of objects mapping the explicit status and data of each stream.

```javascript
Promise.allSettled([fetchNodeA(), fetchNodeB()]).then((results) => {
  results.forEach((res) => {
    if (res.status === "fulfilled") console.log(res.value);
    if (res.status === "rejected") console.error(res.reason);
  });
});
```

### 2.3 `Promise.race(iterable)` (The Pure Speed Test)

- **Resolution Rule:** Settles as soon as **any single promise** in the array finishes, regardless of whether it fulfills or rejects. The first promise to pass the finish line locks in the final state.

```javascript
// Useful for implementing network timeouts
Promise.race([
  fetchLargePayload(),
  new Promise((_, reject) =>
    setTimeout(() => reject("Timeout Exceeded"), 5000),
  ),
]);
```

### 2.4 `Promise.any(iterable)` (The First-Success Engine)

- **Resolution Rule:** Settles as soon as **any single promise fulfills successfully**. If the fastest promise fails, it skips it and waits for the next one.
- **Short-Circuit Rejection:** It only rejects if **every single promise in the array fails**. If they all fail, it throws an `AggregateError` containing all rejection reasons bundled inside its `.errors` property.

---

## 🚀 Phase 6, Topic 3 Mastery Verification

Mark `03-promise-combinators.md` as **Complete** in your tracker manual layout! Let's test your concurrency tracking:

```javascript
const p1 = new Promise((res) => setTimeout(() => res("Speed"), 100));
const p2 = new Promise((_, rej) => setTimeout(() => rej("Fail"), 50));

Promise.any([p1, p2])
  .then((res) => console.log("Resolved:", res))
  .catch((err) => console.log("Rejected:", err));
```

> **Engineering Scenario:** When the script above executes, what will be logged to the developer console? Trace the settlement timing and short-circuit conditions of `Promise.any` to back up your answer!

It is a tricky one! It will actually log: **`Resolved: Speed`**.

### 🔬 The Mechanics of `Promise.any`

* `Promise.any` is looking exclusively for the **first successful fulfillment**.
* At `50ms`, `p2` fails (`"Fail"`). However, `Promise.any` completely ignores this failure and keeps waiting to see if any other promise in the array will succeed.
* At `100ms`, `p1` successfully resolves with `"Speed"`. Because this is the first successful fulfillment, `Promise.any` resolves immediately, bypassing the `.catch()` block entirely!
