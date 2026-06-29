# 📂 Phase 3: Data Structures & Modern ES6+

## 📄 04-advanced-engine-collections.md

This module details the runtime behaviors, key mutation permissions, and automatic garbage collection interactions of modern ECMAScript collection structures.

---

## 1. Key-Value Maps: `Map` vs. Plain Objects

While plain JavaScript objects traditionally store key-value strings, the ES6 **`Map`** collection provides a highly structured key-value matrix optimized for frequent insertion and extraction operations.

### 1.1 Key Specification Typing Freedom

Plain objects only accept **Strings** or **Symbols** as valid keys. If you pass an object or number as a key to an object, it automatically forces a string conversion (e.g., turning an object key into `"[object Object]"`).

A `Map` preserves **strict type integrity**. Any evaluation value—including objects, arrays, functions, or primitives—can serve as a completely independent key without undergoing type conversion.

```javascript
const nodeRegistry = new Map();
const corePointer = { id: 101 };

// Assign an object reference as a literal Map key
nodeRegistry.set(corePointer, "Cluster Primary Core");

console.log(nodeRegistry.get(corePointer)); // "Cluster Primary Core"

```

### 1.2 Performance & Tracking Features Matrix

| Feature / Operation Dimension | Plain Object (`{}`) | ES6 `Map` Collection |
| --- | --- | --- |
| **Allowed Key Data Types** | Strings and Symbols only. | Any valid value type (Objects, Functions, Primitives). |
| **Order Preservation** | Keys are sorted by an internal algorithm (integers first, then creation order). | Guarantees strict insertion order during iteration routines. |
| **Collection Size Lookup** | Manual computation required (`Object.keys(obj).length`). | Instant lookup via the native `.size` property instance. |
| **Iteration Compatibility** | Not directly iterable; requires an extraction bridge method. | Directly iterable natively out of the box. |
| **Frequent Add/Delete Performance** | Unoptimized; risks forcing the object into slow Dictionary Mode. | Highly optimized by the engine for high-frequency modifications. |

---

## 2. Element Uniqueness: The `Set` Collection

A **`Set`** is a collection of ordered values where **every element must remain structurally unique**.

When you attempt to append a value to a `Set` via `.add()`, the collection runs an internal equality check similar to `Object.is()`. If the value already exists inside the collection matrix, the addition is skipped.

```javascript
const corePorts = new Set();
corePorts.add(80);
corePorts.add(443);
corePorts.add(80); // ──► Duplicate value detected; silently ignored by the engine

console.log(corePorts.size); // 2

```

To quickly strip duplicate elements from an array structure, you can pass the array into a `Set` container and spread it back out:

```javascript
const uniqueValuesArray = [...new Set([1, 2, 2, 3, 4, 4])]; // [1, 2, 3, 4]

```

---

## 3. Ephemeral Memory Management: `WeakMap` and `WeakSet`

The standard `Map` and `Set` collections maintain **Strong References** to the objects stored inside them. This means that as long as the Map or Set remains active in memory, any objects referenced inside them **cannot be garbage collected**, even if those objects are completely deleted from the rest of your program. This can easily lead to memory leaks.

To prevent this, ECMAScript provides **`WeakMap`** and **`WeakSet`**.

### 3.1 Strict Design Restrictions for Weak Collections

To allow automatic memory cleanup, the engine enforces strict limits on these weak collections:

1. **Keys must be Objects or non-registered Symbols only.** Primitives are banned because they do not have lifecycles tracked by the Garbage Collector.
2. **They are completely non-iterable.** You cannot run loops over them, read keys, or check their size via a property. They are opaque black boxes.
3. They only expose basic structural methods: `.get()`, `.set()`, `.has()`, and `.delete()`.

### 3.2 The Weak Garbage Collection Pipeline

A `WeakMap` holds a **Weak Reference** to its object keys. If an object is used as a key in a `WeakMap`, but all other external references to that object are removed from your application, the Garbage Collector will reclaim that object during its next pass.

When the object is deleted from memory, its corresponding entry inside the `WeakMap` is **automatically destroyed as well**.

```javascript
let cacheNode = { metadata: "Active Cluster Node" };
const telemetryCache = new WeakMap();

telemetryCache.set(cacheNode, "Heavy Performance Telemetry Data Stream");

// ...Operations complete, we sever the primary reference link...
cacheNode = null; 

// During the next garbage collection pass, the object key is wiped from memory,
// and its telemetry data string inside the WeakMap is cleanly deallocated!

```

---

## 🚀 Phase 3, Topic 4 Mastery Verification

Mark `04-advanced-engine-collections.md` as **Complete** in your tracker manual index! Let's verify your architectural understanding of weak collections:

> **Engineering Scenario:** Imagine you are writing a clean tracking utility script that associates DOM elements with custom metadata records. Why would using a standard `Map` collection create a serious memory leak when elements are removed from the webpage, and how does switching to a `WeakMap` fix it?

Let me know your breakdown, and we will open **`05-serialization-standards.md`** to master deep JSON parsing mechanics and replacer filtration!