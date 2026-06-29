# 📂 Phase 3: Data Structures & Modern ES6+

## 📄 02-functional-iterators.md

This module examines the algorithmic execution pathways, Big-O complexity ratings, and structural mutations managed by JavaScript's high-order array methods.

---

## 1. The Algorithmic Mechanics of Array Iterators

Native JavaScript array iterators are **Higher-Order Functions**. They accept a user-defined callback function as an argument and execute it against every valid element slot within the underlying array structure.

In a traditional array data structure, elements are stored sequentially in memory. When executing these methods, the engine manages an internal pointer counter ($i$) that steps linearly from index `0` up to `array.length - 1`.

---

## 2. Exhaustive Dissection of Core Array Iterators

Every iterator method has unique characteristics regarding its **return values**, **mutability rules**, and **algorithmic time/space complexities**.

### 2.1 `forEach()` — The Side-Effect Pointer

* **Algorithmic Execution:** Iterates line-by-line across elements, invoking the callback with the current item, index, and parent array.
* **Return Value:** Strictly `undefined`.
* **Mutability:** Does not modify the array container itself, but your callback code *can* mutate properties on any objects referenced within the array slots.
* **Big-O Complexity:** Time: $O(N)$ | Space: $O(1)$ (Operates directly in-place without generating a new array structure).

### 2.2 `map()` — The Transformation Engine

* **Algorithmic Execution:** Allocates a brand-new array block in memory of the exact same length as the source array. As it loops, it stores the direct return value of each callback invocation into the matching index slot of the new array.
* **Return Value:** A fresh, populated Array instance.
* **Mutability:** Strictly non-mutating to the source array.
* **Big-O Complexity:** Time: $O(N)$ | Space: $O(N)$ (Requires fresh allocation for the transformed copy).

### 2.3 `filter()` — The Condition Gate

* **Algorithmic Execution:** Spawns a new, empty array block in memory. It evaluates the callback for each element. If the callback returns a truthy value, the item is pushed into the new array; if falsy, it is skipped.
* **Return Value:** A new Array instance containing only matching elements (can be empty `[]`).
* **Mutability:** Strictly non-mutating.
* **Big-O Complexity:** Time: $O(N)$ | Space: $O(N)$ (Worst-case space allocation matches source length).

### 2.4 `reduce()` — The Accumulator Reducer

* **Algorithmic Execution:** Maintains an active internal tracking register called the **Accumulator**. It feeds the accumulator and the current element into each callback loop, using the return value of that callback to overwrite the accumulator register for the next cycle.
* **Return Value:** The final collapsed value of the accumulator register (can be a primitive, object, or array).
* **Big-O Complexity:** Time: $O(N)$ | Space: $O(1)$ if accumulating to a primitive, or $O(N)$ if compounding into an array or object collection.

---

## 3. High-Performance Search & Structural Expansion

### 3.1 Validation Operations: `every()` vs. `some()`

These methods optimize performance by utilizing **Short-Circuit Evaluation Execution**:

* **`every()`:** Scans elements sequentially. The exact millisecond it hits an element that returns a falsy value from the callback, it terminates iteration immediately and returns `false`. It only scans the entire array if every item is valid.
* **`some()`:** The inverse behavior. The instant it hits an element that returns a truthy value, it cuts iteration short and returns `true`.

### 3.2 Finding Elements: `find()`

Scans the array linearly. Once an item matches the callback's condition, it stops execution and returns that specific element directly. If no item matches, it returns `undefined`.

* **Big-O Complexity:** Best-case Time: $O(1)$ (First item matches) | Worst-case Time: $O(N)$ (Scans the entire array).

### 3.3 Matrix Flattening: `flatMap()`

Introduced in modern ES2019. It combines a standard mapping transformation with a structural flattening pass of depth `1`.

* It is highly optimized within the V8 engine, executing both operations in a single pass instead of creating an intermediate array layer like `.map().flat()` does.
* **Big-O Complexity:** Time: $O(N \cdot M)$ where $N$ is array length and $M$ is the sub-array dimension depth.

---

## 🚀 Phase 3, Topic 2 Mastery Verification

Mark `02-functional-iterators.md` as **Complete** in your directory manual index tracker. Let's verify your DSA algorithmic instincts with a code snippet:

```javascript
const rawNumbers = [10, 20, 30, 40, 50];

const processedData = rawNumbers
    .filter(num => num > 25)
    .map(num => num * 2);

```

> **Engineering Scenario:** The code chain above works perfectly, but from a strict DSA resource-management perspective, it is inefficient for large datasets.
> 1. Track the total number of element iteration cycles this code runs.
> 2. Track how many temporary arrays are allocated in the memory heap.
> 3. Show how you could refactor this operation using a single `.reduce()` call to optimize time and space performance.
> 
> 

Let me know your optimization breakdown, and we will open **`03-destructuring-assignment.md`** next!


```javascript
const processedData = rawNumbers.reduce((acc, now) => {
    if (now > 25) {
        acc.push(now * 2);
    }
    return acc;
}, []);

```
