# 📂 Phase 3: Data Structures & Modern ES6+

## 📄 05-serialization-standards.md

This module details the runtime rules, parsing validations, custom filtration matrices, and formatting spaces managed by JavaScript's native JSON serialization engine.

---

## 1. The Core Serialization Rules of `JSON.stringify()`

The **`JSON.stringify()`** method converts a JavaScript object structure into a valid UTF-16 JSON string representation. However, because JSON is an independent data-interchange standard, it cannot map JavaScript-specific execution types.

The engine handles non-JSON values using strict conversion guardrails:

```text
[JavaScript Value Type] ──► Encountered by stringify() ──► [Conversion Outcome]
  ├─► Function, Symbol, undefined  ────────────────────────► Omitted / Converted to null
  ├─► NaN, Infinity                ────────────────────────► Converted to null
  └─► Object with toJSON() method  ────────────────────────► Invokes toJSON() value instead

```

### 1.1 Structural Deletions and Omissions

- **Object Properties:** If an object key holds a `Function`, a `Symbol`, or an `undefined` value, the engine **completely deletes the key** from the final serialized string payload.
- **Array Elements:** If those same types are encountered inside an Array, the engine preserves the index slot alignment by converting the invalid value into **`null`**.
- **Mathematical Exceptions:** `NaN`, `Infinity`, and `-Infinity` are explicitly converted into **`null`** values.

```javascript
const nodePayload = {
  nodeId: 101,
  shutdownCall: () => {
    stop();
  }, // Omitted completely
  telemetryStatus: undefined, // Omitted completely
  errorFlags: [NaN, undefined], // Becomes [null, null]
};

console.log(JSON.stringify(nodePayload));
// Prints: '{"nodeId":101,"errorFlags":[null,null]}'
```

### 1.2 Intercepting Serialization via `toJSON()`

If the engine finds an object that possesses a native **`toJSON()`** method, it completely skips normal serialization. It executes the `toJSON()` method and serializes whatever value that function returns instead.

```javascript
const hardwareLog = {
  unit: "Core-01",
  secretKey: "SEC_999",
  toJSON() {
    return { unit: this.unit }; // Strips away sensitive data before stringification
  },
};
console.log(JSON.stringify(hardwareLog)); // '{"unit":"Core-01"}'
```

---

## 2. Advanced Control: Replacer Arrays & Indentation Spaces

`JSON.stringify()` accepts two optional parameters that let you filter keys and format outputs easily: `JSON.stringify(value, replacer, space)`.

### 2.1 The Replacer Matrix Parameter

The replacer parameter can act as either a **Whitelist Array** or a **Filter Function**:

- **As an Array:** The engine only serializes keys whose names match the string tokens explicitly listed inside the whitelist array.
- **As a Function:** The function executes for every key-value pair. You can intercept, alter, or omit values dynamically by returning `undefined` to drop a key.

```javascript
const telemetryNode = { id: 101, temperature: 42, frequency: 3600 };

// Whitelist Filter Array: Only preserve 'id' and 'temperature'
const targetPayload = JSON.stringify(telemetryNode, ["id", "temperature"]);
console.log(targetPayload); // '{"id":101,"temperature":42}'
```

### 2.2 The Space Parameter (Pretty Printing)

The third argument controls indentation. If you pass a number, the engine formats the output string with that exact number of spaces per indentation level (up to a maximum of 10 spaces) to make it highly readable.

```javascript
console.log(JSON.stringify({ core: "V8" }, null, 4));
/* Prints:
{
    "core": "V8"
}
*/
```

---

## 3. Deep-Dive Parsing: `JSON.parse()` & The Reviver Pipeline

The **`JSON.parse()`** method reconstructs a JSON string back into its matching JavaScript data structure.

### 3.1 Strict Syntactic Requirements

JSON parsing requires strict adherence to grammar parameters. Single quotes (`'`) around strings or trailing commas after final object properties will cause the parsing engine to crash instantly, throwing a fatal `SyntaxError`.

### 3.2 The Reviver Pipeline Function

To safely transform data types during the reconstruction phase, you can pass a **Reviver Function** as the second argument to `JSON.parse()`. The engine invokes this function for every key-value pair _before_ returning the final object structure to local memory.

```javascript
const rawJsonStream =
  '{"logTime":"2026-06-29T08:35:00.000Z","status":"active"}';

// Use a reviver function to automatically instantiate real Date objects
const parsedLog = JSON.parse(rawJsonStream, (key, value) => {
  if (key === "logTime") {
    return new Date(value); // Restores type integrity instantly
  }
  return value;
});

console.log(parsedLog.logTime.getUTCFullYear()); // 2026 ✅ (Native Date method works!)
```

---

## 🏁 Phase 3 Complete!

Mark `05-serialization-standards.md` as **Complete** in your tracker manual index checklist! Phase 3 is officially finalized and locked down in your repository.

Commit these files to your Git workspace branches. Whenever you're rested up and ready to kick off your next session, let me know to clear the entry gate for **`Phase 4: The Browser, DOM, & Events`**, where we will open up `01-document-object-model.md` to explore C++ bindings, element mutations, and node lifecycle interactions!
