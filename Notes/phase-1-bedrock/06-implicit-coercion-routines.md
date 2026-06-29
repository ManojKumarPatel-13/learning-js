# 📂 Phase 1: The Bedrock

## 📄 06-implicit-coercion-routines.md

This module examines how the JavaScript runtime engine automatically converts types behind the scenes when executing mathematical operations, string tracking, and conditional evaluations.

---

## 1. The Dual-Nature of the Addition Operator (`+`)

The addition operator is the only arithmetic operator in JavaScript that handles both mathematical calculations and string concatenation. The engine decides which path to take using a strict type inspection routine:

- **String Concatenation Rules:** If **either** operand evaluates to a string (or becomes a string after an object-to-primitive conversion), the engine immediately halts all mathematical logic. It coerces the remaining operand into a string and links them together.
- **Numeric Addition Rules:** If neither operand is a string, the engine forces both sides through the internal `ToNumber()` routine and calculates the mathematical sum.

```javascript
console.log("20" + 6); // "206" (Number 6 is coerced to string "6")
console.log(true + 4); // 5     (Boolean true undergoes ToNumber() to become 1)
```

---

## 2. Arithmetic Strictness (`-`, `*`, `/`, `%`)

Unlike the addition operator, all other mathematical operators are strictly reserved for numeric operations. They never fall back to string manipulation. If they encounter non-number types, they automatically trigger the engine's internal `ToNumber()` coercion pipeline on both operands.

```javascript
console.log("20" - 6); // 14 (String "20" is implicitly converted to number 20)
console.log("foo" - 2); // NaN (String "foo" converts to NaN; any math with NaN yields NaN)
console.log([] - 1); // -1 (Array [] strings to "", which converts to number 0)
```

---

## 3. Object-to-Primitive Coercion: The Internal Hints

When the engine needs to convert an object into a primitive value (like during math operations or string interpolation), it relies on an internal specification routine called `ToPrimitive(input, PreferredType)`.

The engine uses three distinct "hints" based on the context:

```text
[Operation Context] ──► Determines Hint: "string", "number", or "default" ──► Invokes valueOf() / toString()

```

### 3.1 Hint: "string"

Triggered by operations that explicitly expect a string (e.g., `alert(obj)` or template literals). The engine tries to call the object's methods in this order:

1. `obj.toString()` (If it returns a primitive, use it).
2. `obj.valueOf()` (If the first fails).
3. If neither returns a primitive, throw a `TypeError`.

### 3.2 Hint: "number"

Triggered by mathematical operations (e.g., `obj3 * 2`). The engine flips the priority order:

1. `obj.valueOf()` (Usually returns the raw numerical value).
2. `obj.toString()` (If valueOf fails to yield a primitive).
3. If neither works, throw a `TypeError`.

### 3.3 Hint: "default"

Triggered by operations that are ambiguous, like the binary `+` operator or loose equality `==`. Most built-in objects treat the "default" hint exactly like the "number" hint, prioritizing `valueOf()`. The main exception is the `Date` object, which treats the default hint as a "string".

---

## 4. The Definitive 8 Falsy Values Checklist

When values are evaluated inside conditional structures (like `if` statements or loops), the engine converts them into booleans using the internal `ToBoolean()` routine.

To keep your code defensive, memorize the exact **eight values** that evaluation to a **falsy** state. Every other value in the language specification resolves to **truthy**.

| Falsy Operator Value | Description of Type Behavior                                 |
| -------------------- | ------------------------------------------------------------ |
| `false`              | The baseline logical boolean flag.                           |
| `0`                  | Standard 64-bit floating-point numeric zero.                 |
| `-0`                 | Signed negative numeric zero value.                          |
| `0n`                 | BigInt primitive representation of zero.                     |
| `""`                 | Completely empty string layout context (zero characters).    |
| `null`               | Explicit pointer representing the complete absence of value. |
| `undefined`          | The uninitialized value placeholder flag.                    |
| `NaN`                | The invalid numerical result token.                          |

---

## 🚀 Phase 1, Topic 6 Mastery Verification

Mark `06-implicit-coercion-routines.md` as **Complete** in your directory manual! Let's check your understanding of object coercion:

```javascript
console.log([] + {});
```

> **Engineering Scenario:** The code statement above prints the string `"[object Object]"` in a standard browser console. Based on the rules of the binary `+` operator and the `ToPrimitive` hint system, explain exactly how the engine processes the empty array `[]` and the empty object `{}` to construct this string result.

Once you walk through this process, we will open up **`07-iteration-matrix-traversal.md`** to wrap up Phase 1 by exploring performance loops and the dangers of prototype pollution!
