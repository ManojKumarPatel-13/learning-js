# 📂 Phase 5: Object-Oriented JS

## 📄 04-modern-es6-class-sugar.md

This module peels back modern ES6 class syntax to expose how the compiler converts declarations into prototypical engines, handling constructor method flags, super lookup chains, and private fields.

---

## 1. Class Syntax Parsing: Pure Prototypal Syntactic Sugar

ES6 classes do not introduce a new object-oriented inheritance model to JavaScript. Under the hood, **a class declaration is simply a specialized function wrapper** pointing directly back to standard prototypal inheritance networks.

When the V8 compiler parses a class declaration block, it performs a structural conversion:

```javascript
class Engine {
    constructor(power) {
        this.power = power;
    }
    ignite() { return "System firing."; }
}

// ...Is structurally compiled by V8 into:
function Engine(power) {
    if (!(this instanceof Engine)) throw new TypeError("Class constructor cannot be invoked without 'new'");
    this.power = power;
}
Object.defineProperty(Engine.prototype, "ignite", {
    value: function() { return "System firing."; },
    enumerable: false, // ◄── Classes mark prototype methods as non-enumerable by default
    writable: true,
    configurable: true
});

```

---

## 2. Super Execution Chains & Subclass Linkage

When using the `extends` keyword to establish a subclass relationship, the engine handles prototype links across two separate tracks:

1. **Instance Linkage:** Connects the child's `.prototype` to the parent's `.prototype` (inheriting methods).
2. **Static Linkage:** Connects the child constructor function itself directly to the parent constructor function (inheriting static methods).

```javascript
class CoreProcessor extends Engine {
    constructor(power, cores) {
        // Architectural Guardrail: 'this' does NOT exist here yet!
        super(power); // Invokes the parent constructor and initializes 'this' memory allocation
        this.cores = cores;
    }
}

```

> 🛑 **THE SUPER INITIALIZATION RULE:** In a subclass constructor, you are strictly forbidden from reading or writing to `this` before invoking `super()`. The parent constructor must run first to allocate the core object instance in memory before the subclass can append additional properties.

---

## 3. Encapsulation: Private Class Fields

Historically, developers mimicked private class properties using an underscore prefix (`_privateProp`), which was merely a naming convention and offered no real data protection.

Modern ECMAScript specifications introduce true, hardware-enforced encapsulation via the hash **`#`** prefix.

```javascript
class Mainframe {
    #securityToken; // Declares a true runtime private field

    constructor(token) {
        this.#securityToken = token;
    }

    validateToken(input) {
        return this.#securityToken === input;
    }
}

const sys = new Mainframe("HEX-88");
console.log(sys.validateToken("HEX-88")); // true
// console.log(sys.#securityToken); // ❌ Throws a compilation SyntaxError!

```

### 🧠 The V8 Implementation Matrix

Private fields are not implemented using standard object properties. The engine maintains an internal, unexposed mapping structure called a **Private Name Map** separate from the object's normal layout shape. This ensures that utilities like `Object.keys()` or `for...in` loops cannot see or leak private data pointers.

---

## 🚀 Phase 5 Complete!
