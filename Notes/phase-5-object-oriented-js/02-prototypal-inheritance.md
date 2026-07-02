# 📂 Phase 5: Object-Oriented JS

## 📄 02-prototypal-inheritance.md

This module breaks down the physical architecture of the prototype chain, contrasting implicit fallback links against constructor configuration properties.

---

## 1. The Prototypal Memory Architecture

In class-based languages like Java or C++, inheritance acts as a structural blueprint copy operation; when an object is instantiated, class methods are duplicated into memory layouts for the new instance.

In JavaScript, inheritance is purely **behavioral delegation via live object references**.

Every object in JavaScript holds a hidden, internal pointer slot known in the ECMAScript specification as **`[[Prototype]]`**. This slot points directly to an independent parent object container. If you request a property or method on an object instance that does not exist locally, the V8 engine doesn't throw an error immediately—it traverses up this chain of pointers to look for it.

---

## 2. Differentiating `__proto__` vs. `.prototype`

One of the most common points of confusion in JavaScript engineering is the structural difference between these two prototype pointers. They have entirely different jobs in memory management:

### 2.1 The Implicit Instance Link (`__proto__` / `Object.getPrototypeOf`)

* **What it is:** This is the concrete, active pointer reference found on **object instances**. It points directly to the parent object that the instance is currently inheriting properties from.
* **Modern Standard:** The `__proto__` key accessor is an un-optimized legacy setter. In modern engines, always read and write this hidden link using the standard static methods:

```javascript
const parentNode = { active: true };
const childNode = Object.create(parentNode); // Creates link

console.log(Object.getPrototypeOf(childNode) === parentNode); // true

```

### 2.2 The Blueprint Constructor Property (`.prototype`)

* **What it is:** This is a standard, visible property that exists **exclusively on functions** (specifically constructor functions or ES6 classes). It is *not* the prototype of the function itself. Instead, it acts as a blueprint anchor.
* **The Connection:** When you instantiate an object using the `new` keyword, the engine reads the constructor function's `.prototype` property and assigns it directly to the new instance's internal `[[Prototype]]` pointer (`__proto__`).

```javascript
function Controller() {}
// Setting a method on the constructor blueprint
Controller.prototype.reboot = function() { return "System clear."; };

const nodeInstance = new Controller();
// The instance links back to the constructor's blueprint property
console.log(Object.getPrototypeOf(nodeInstance) === Controller.prototype); // true

```

---

## 3. The Mechanics of the "Dunder" Lookup Loop

When you execute code like `nodeInstance.reboot()`, the engine runs a synchronous fallback resolution loop:

1. The engine checks the local key definitions inside the physical `nodeInstance` heap allocation. It cannot find `reboot`.
2. It looks at `nodeInstance.[[Prototype]]` (which references `Controller.prototype`). It searches the key matrix there and finds the `reboot` function pointer.
3. The engine pulls the execution instructions down and runs them, binding the dynamic `this` context directly to `nodeInstance`.
4. If it hadn't found it there, it would follow `Controller.prototype.__proto__` up to `Object.prototype`. If it's missing there, it jumps to `Object.prototype.__proto__` which evaluates to **`null`**, terminating the loop and throwing a `TypeError`.

---

## 4. Shadowing Properties

If you assign a value to a property on an instance that shares the exact name of a method higher up on its prototype chain, you create a local property block known as **Property Shadowing**:

```javascript
const telemetryNode = {
    status: "ONLINE",
    log: function() { console.log(this.status); }
};

const offlineNode = Object.create(telemetryNode);
offlineNode.status = "OFFLINE"; // Shadowing the inherited 'status' property

offlineNode.log(); // Logs: "OFFLINE"

```

The inherited `log()` method still runs because it's retrieved from the prototype chain, but when it executes `this.status`, the dynamic context evaluation checks the local `offlineNode` properties first and returns the local overridden value!

---

## 🚀 Phase 5, Topic 2 Mastery Verification

Mark `02-prototypal-inheritance.md` as **Complete** in your manual directory! Let's test your prototype tracing skills:

```javascript
function Device() {}
Device.prototype.type = "Hardware";

const router = new Device();

Device.prototype = { type: "Network" };

console.log(router.type);

```

> **Engineering Scenario:** When the script above finishes running, what will be printed by `console.log(router.type)`? Trace the pointer allocations carefully to explain why changing the constructor's prototype *after* instantiation impacts or doesn't impact the existing instance!

Let me know your line breakdown, and we will open **`03-object-architecture-blueprints.md`** next!


### 🔬 The Pointer Allocation Trace

This is one of the coolest memory quirks in the V8 engine, and it comes down to how pointer references are assigned:

1. When you run `const router = new Device();`, the `router` instance sets its internal `[[Prototype]]` link (`__proto__`) to point directly to the *original* object in memory that `Device.prototype` was holding.
2. When you execute `Device.prototype = { type: "Network" };`, you are **reassigning** the `Device.prototype` pointer to an entirely new, different object space in the memory heap.
3. However, reassigning the constructor's pointer **does not change** where the existing `router` instance's `__proto__` pointer is looking! It is still happily linked to the *original* prototype object space, which still contains `type = "Hardware"`.
