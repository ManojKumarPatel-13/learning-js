# 📂 Phase 1: The Bedrock

## 📄 04-data-type-layout.md

This module details how JavaScript data types are segmented, initialized, and maintained across the Call Stack and Memory Heap segments of the runtime engine.

---

## 1. Stack Allocation vs. Heap Allocation Matrix

The JavaScript runtime engine splits data storage between two primary hardware-managed memory spaces: the **Call Stack** and the **Memory Heap**.

### 1.1 The Call Stack (LIFO: Last In, First Out)

The stack is a highly organized, contiguous block of fast execution memory. It holds execution context tracking frames and variables that store **Primitive Types**. The engine knows the exact size of primitive values during compilation, allowing it to allocate fixed blocks of stack memory that are cleared instantly when a function exits scope.

### 1.2 The Memory Heap

The heap is a massive, unstructured pool of memory designed for **Structural Types** (Objects, Arrays, Functions). Because these structures can grow dynamically at runtime (e.g., pushing items into an array), their memory sizes cannot be predicted ahead of time. The engine allocates space for them in the heap, and passes a hexadecimal address pointer back to the variable identifier on the stack.

---

## 2. Primitive Types Specification (Value-Based)

Primitives are completely immutable. When you alter a primitive value, you aren't changing the data block itself; you are overwriting the variable identifier with a reference to a completely new primitive value in stack memory.

- **String:** An immutable sequence of UTF-16 character code units.
- **Number:** Double-precision 64-bit binary format IEEE 754 floating-point values. It includes three distinct semantic values: `+Infinity`, `-Infinity`, and `NaN` (Not-a-Number).
- **Boolean:** A single-bit logical flag holding either `true` or `false`.
- **null:** An intentional, explicitly assigned structural marker showing the absence of any object value.
- **undefined:** A default fallback marker assigned automatically by the engine to variables that have been declared but not yet initialized.
- **Symbol:** An immutable, globally unique token introduced in ES6. Used primarily to attach hidden, non-colliding property keys to object matrices.
- **BigInt:** Introduced in ES2020. Stores arbitrary-precision integers safely beyond the standard `Number.MAX_SAFE_INTEGER` boundaries ($2^{53} - 1$). Created by appending an `n` token to an integer literal (e.g., `9007199254740991n`).

---

## 3. Structural Types Specification (Reference-Based)

Objects do not store data directly on the variable stack slot. Instead, the variable slot holds a hexadecimal memory address pointer that references a location in the engine's memory heap.

- **Object:** A mutable dictionary allocation mapping string or symbol keys to arbitrary value types.
- **Sub-Types:** Built-in structures like `Array`, `Function`, `Date`, and `RegExp` are specialized object implementations that inherit from the baseline `Object.prototype` layer.

### 📋 Structural Assignment Copying Mechanics

When you copy a primitive value, the engine duplicates the raw value into a completely new stack slot. When you copy an object, however, the engine simply copies the **hexadecimal reference pointer**. Both variables end up pointing to the exact same object in the memory heap.

```javascript
// Primitive Copying
let initialScore = 100;
let copyScore = initialScore; // Duplicated data inside stack memory slot
copyScore = 200; // initialScore remains 100

// Object Copying
let userAccount = { balance: 500 };
let aliasAccount = userAccount; // Copies ONLY the hexadecimal heap address pointer
aliasAccount.balance = 0; // Modifies shared object in the memory heap
console.log(userAccount.balance); // 0 (Reflects change)
```

---

## 4. The 1995 `typeof null` Specification Bug

One of JavaScript's most famous language quirks is that evaluating `typeof null` returns the string `"object"`. This is not an intentional design choice; it is a legacy bug inherited from the initial prototype engine built in 1995.

```javascript
console.log(typeof null); // "object"
```

### 🔬 The Low-Level Reason

In the original implementation of JavaScript, values were stored in 32-bit units. Each unit consisted of a 1-to-3 bit **type tag** followed by the actual data bits representing the value. The engine read these tags to identify types:

- Tag `000`: Object Type reference.
- Value `null`: Represented by a complete sequence of zero bits across all 32 bits (`0x00`).

Because the null pointer consisted entirely of zeroes, the engine checked the first three bits, matched them against the object type tag (`000`), and incorrectly categorized `null` as an object. This behavior was codified into the official ECMAScript specification because fixing it would break millions of early websites.

---

## 🚀 Phase 1, Topic 4 Mastery Verification

Mark `04-data-type-layout.md` as **Complete** in your manual. Let's run a memory tracking test:

```javascript
const framework = { name: "React" };
framework.name = "Vue";

framework = { name: "Angular" };
```

> **Engineering Scenario:** Which specific line of code above triggers a fatal runtime crash, and why? Contrast what happens to the variables on the **Call Stack** versus what happens to the data inside the **Memory Heap** during these updates.

Let me know your breakdown, and we will open **`05-strict-type-verification.md`** to dissect the Abstract Equality Comparison Algorithm!
