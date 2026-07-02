# 📂 Phase 5: Object-Oriented JS

## 📄 03-object-architecture-blueprints.md

This module breaks down the low-level memory footprints, allocation variations, and prototype linkages of Constructors, Factory Functions, and `Object.create`.

---

## 1. Constructor Functions and `new` Memory Allocations

Before ES6 classes, constructor functions served as the primary instantiation pattern in JavaScript. When a function is called with the `new` operator, the V8 engine bypasses standard execution and forces a low-level four-step allocation routine:

```text
1. Create empty {} shell in Heap ──► 2. Link __proto__ to Constructor.prototype ──► 3. Bind 'this' & run code ──► 4. Return Object

```

```javascript
function DatabaseConnector(targetIp) {
  // Step 1: An empty {} object is created in the heap covertly.
  // Step 2: The engine links this new object's internal [[Prototype]] to DatabaseConnector.prototype.
  // Step 3: 'this' is bound to the new object shell.
  this.ip = targetIp;
  this.connected = false;
  // Step 4: The 'this' reference is returned automatically unless you return a different object explicitly.
}
```

### 🛑 The Return Override Trap

If a constructor function explicitly returns a primitive value (like a string or number), the engine ignores it and returns the newly created `this` instance anyway. However, if you explicitly return a **custom object** from the function, the engine discards the `this` instance entirely and passes that custom object out instead, breaking prototype chains.

---

## 2. Factory Functions vs. Constructor Footprints

A **Factory Function** is any standard function that sets up and returns a plain JavaScript object without using the `new` keyword.

```javascript
// Factory Function Pattern
function createSensor(id) {
  return {
    id,
    read() {
      return `Sensor ${id} data stream.`;
    },
  };
}
```

### 📋 Memory Allocation Comparison Matrix

| Operational Metric         | Constructor Pattern (`new`)                                                                                          | Factory Function Pattern                                                                      |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Method Allocation**      | Dedicated single instance on `.prototype`. Shared by millions of objects.                                            | Re-allocated in the heap _every single time_ the factory is called.                           |
| **RAM Footprint Overhead** | **Extremely Low:** Scale-friendly. Adding 10,000 instances creates 10,000 data properties but only 1 method pointer. | **High:** Adding 10,000 instances creates 10,000 duplicated method function copies in memory. |
| **Instance Verification**  | Supported natively via `instanceof`.                                                                                 | Missing. Objects show up generically as base `Object` types.                                  |

---

## 3. Pure Prototypal Linkages via `Object.create()`

If you want to establish an inheritance chain without running constructor initialization code or dealing with factory boilerplates, use **`Object.create(protoArg)`**.

This method cuts out the middleman: it allocates a brand new empty object shell in the heap and maps its internal `[[Prototype]]` pointer directly to whatever object you passed in as `protoArg`.

```javascript
const frameworkCore = {
  version: "v4.2",
  compile() {
    return "Parsing DOM structure...";
  },
};

// Allocate a clean instance linked directly to frameworkCore
const customInstance = Object.create(frameworkCore);

console.log(Object.getPrototypeOf(customInstance) === frameworkCore); // true
console.log(customInstance.version); // "v4.2" (resolved via immediate prototype chain lookup)
```

---

## 🚀 Phase 5, Topic 3 Mastery Verification

Mark `03-object-architecture-blueprints.md` as **Complete** in your manual workspace! Let's run a memory diagnostic trace:

```javascript
const machine = {
  turnOn() {
    return "Engine running.";
  },
};

function Robot(name) {
  this.name = name;
  return machine;
}

const bot = new Robot("T-800");
console.log(bot.name);
console.log(bot instanceof Robot);
```

> **Engineering Scenario:** When you run the code snippet above, what will be logged by `console.log(bot.name)` and `console.log(bot instanceof Robot)`? Trace the override allocation rules to explain your outputs!

Let me know your breakdown, and we will open **`04-modern-es6-class-sugar.md`** next!

### 🔬 The Mechanics of the Override

Because `Robot` explicitly returns an object (`machine`), the V8 engine completely discards the initial `this` object it allocated.

- As a result, the `bot` reference variable points directly to the `machine` object, which has no `name` property (returning `undefined`).
- Since `machine`'s prototype chain was never linked to `Robot.prototype`, `instanceof Robot` evaluates to `false`.
