# 📂 Phase 1: The Bedrock

## 📄 05-strict-type-verification.md

This module details the logical mechanics behind JavaScript's comparison operations, breaking down the ECMAScript specification rules for both Strict Identity and Loose Abstract Equality.

---

## 1. Strict Equality (`===`) Runtime Checklist

When the engine processes a strict equality operation (`===`), it bypasses all forms of implicit type conversion. It evaluates identity using a strict verification checklist:

1. **Type Verification:** The engine checks the underlying data types of both operands. If they do not match, the comparison immediately short-circuits and returns `false`.
2. **Primitive Value Check:** If the types match and are primitives, it compares their raw values directly.
3. **Reference Pointer Check:** If the types match and are objects, it checks whether they point to the **exact same memory address pointer** in the heap. Two objects with identical key-value properties will still return `false` if they reside in different locations in memory.

```javascript
console.log(5 === "5"); // false (Mismatched types: Number vs String)
console.log({ id: 1 } === { id: 1 }); // false (Mismatched heap references)

const account = { id: 1 };
const alias = account;
console.log(account === alias); // true (Identical heap reference pointer)
```

---

## 2. Loose Equality (`==`) & The Coercion Cascade

When you use loose equality (`==`), the engine follows the official **ECMAScript Abstract Equality Comparison Algorithm**. If the operands are of different types, the engine will automatically run a series of type conversions to force them into matching types before evaluating their values.

### ⚙️ The Abstract Conversion Cascading Pipeline

The algorithm follows a strict hierarchy when types don't match:

```text
[Null or Undefined?] ──► Return true if both are null/undefined.
         │
         ▼
[String vs Number?]   ──► Coerce String to Number via ToNumber().
         │
         ▼
[Boolean vs Any?]     ──► Coerce Boolean to Number (true->1, false->0).
         │
         ▼
[Object vs Primitive?]─► Coerce Object to Primitive via ToPrimitive().

```

1. **Null and Undefined:** `null` and `undefined` are hardcoded to be loosely equal to each other, and _only_ to each other. They will not coerce to any other falsy values.
2. **String vs. Number:** The string operand is passed through the internal `ToNumber()` operation, converting it into a numeric value.
3. **Boolean vs. Any:** The boolean operand is converted into a number (`true` becomes `1`, `false` becomes `0`). This often leads to multi-step conversions.
4. **Object vs. Primitive:** The object is converted into a primitive value using the internal `ToPrimitive(viewport, hint)` operation, which calls the object's internal `valueOf()` or `toString()` methods.

---

## 3. The Structural Exceptions Matrix

Because JavaScript relies on specific underlying standards (like IEEE 754 for floating-point math), certain loose comparisons yield highly counter-intuitive results:

```javascript
console.log(0 == false); // true  -> false becomes 0 -> 0 == 0
console.log("" == false); // true  -> "" and false both become 0 -> 0 == 0
console.log(null == undefined); // true  -> Hardcoded specification rule
console.log(NaN == NaN); // false -> Structural Exception
```

### 🔬 The NaN Identity Quirk

According to the IEEE 754 standard specification, `NaN` represents an unrepresentable or undefined mathematical result (such as `0 / 0`). Because one undefined mathematical value cannot be assumed to equal another, the spec mandates that **`NaN` is strictly unequal to every value, including itself**.

---

## 4. Modern Alternative: `Object.is()`

To fix the structural edge cases of `===`, ECMAScript 6 introduced `Object.is()`. This method evaluates whether two values are exactly identical under the hood without any historical quirks:

| Identity Scenario   | Loose (`==`) | Strict (`===`) | `Object.is()` |
| ------------------- | ------------ | -------------- | ------------- |
| `NaN === NaN`       | `false`      | `false`        | `true`        |
| `-0 === +0`         | `true`       | `true`         | `false`       |
| `"foo" == "foo"`    | `true`       | `true`         | `true`        |
| `null == undefined` | `true`       | `false`        | `false`       |

---

## 🚀 Phase 1, Topic 5 Mastery Verification

Mark `05-strict-type-verification.md` as **Complete** in your digital tracking guide! Let's test your ability to trace the Abstract Equality Algorithm:

```javascript
console.log([] == ![]);
```

> **Engineering Scenario:** The expression above returns `true`. This is a classic JavaScript trick question. Using the steps of the Abstract Equality Comparison Algorithm (and your knowledge of truthy/falsy values), trace out the exact step-by-step conversions the engine runs to reach `true`.

Let me know your breakdown, and we will open **`06-implicit-coercion-routines.md`** to look at math operator coercion!

That is a very common line of thinking, but it actually contains a classic trap! If the engine just checked if both sides were truthy, `[] == ![]` would actually fail because `![]` evaluates to `false`.

Let's break down the exact step-by-step conversion cascade the engine runs under the hood to arrive at `true`.

---

### 🔬 Tracing the `[] == ![]` Coercion Cascade

#### Step 1: Evaluate the Unary NOT Operator (`!`)

Before comparing, the engine evaluates the right side: `![]`.

- In JavaScript, all objects (including empty arrays `[]`) are **truthy**.
- The `!` operator flips a truthy value to its boolean opposite.
- Therefore, `![]` evaluates to `false`.
- **Current State:** `[] == false`

#### Step 2: Coerce the Boolean to a Number

The Abstract Equality Algorithm states that if one operand is a boolean, it must be coerced into a number via `Number()`.

- `Number(false)` converts to `0`.
- **Current State:** `[] == 0`

#### Step 3: Coerce the Object to a Primitive

Now we have an Object (`[]`) compared to a Number (`0`). The engine forces the object to a primitive value using its internal `ToPrimitive()` routine, which defaults to calling `.toString()`.

- An empty array converted to a string `[].toString()` results in an empty string: `""`.
- **Current State:** `"" == 0`

#### Step 4: Coerce the String to a Number

Finally, we have a String (`""`) compared to a Number (`0`). The engine converts the string to a number via `Number()`.

- An empty string `Number("")` converts to `0`.
- **Current State:** `0 == 0`

#### Step 5: Final Evaluation

The engine compares the two numbers directly. Since `0 === 0` is strictly **`true`**, the entire expression evaluates to `true`!
