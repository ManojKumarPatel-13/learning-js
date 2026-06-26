
// -------------------------------------------------------------------------
// 📑 THE CLASS CORE BLUEPRINT
// -------------------------------------------------------------------------
// * UNDER THE HOOD: 'class' is not a new inheritance engine. It is a visual
//   wrapper (syntactic sugar) for Constructor Functions and Prototypes.

class ParentTerminal {
    // 1. PRIVATE FIELDS: Declared at the very top using a hashtag (#).
    //    Completely unreachable from outside the class brackets.
    #firmwareKey = "0x8892_ALPHA";

    // 2. CONSTRUCTOR: Runs automatically on 'new'. Sets up instance-specific properties.
    constructor(hostId) {
        this.hostId = hostId; // Local property
    }

    // 3. PROTOTYPE METHOD: Automatically added to ParentTerminal.prototype.
    //    Shared via reference link across all future instances.
    verifyAccess() {
        return `Host ${this.hostId} verified via key ${this.#firmwareKey}`;
    }

    // 4. STATIC METHOD: Attached directly to the Class constructor namespace itself.
    //    Cannot be called by instances; called only via the Class name.
    static compileLogs() {
        return "Aggregating global telemetry...";
    }
}

// -------------------------------------------------------------------------
// 📑 SUBCLASSES AND SUPER INHERITANCE
// -------------------------------------------------------------------------
class ChildNode extends ParentTerminal {
    constructor(hostId, coordinate) {
        // HANDSHAKE: Must call super() before touching 'this'.
        // It executes the parent's constructor to build the base object first.
        super(hostId); 
        this.coordinate = coordinate;
    }
}

const workstation = new ChildNode("NODE_77", "Grid-Beta");

// -------------------------------------------------------------------------
// 🚨 CRITICAL ARCHITECTURAL TRAPS & GOTCHAS TO NOTE:
// -------------------------------------------------------------------------
// * * TRAP 1: The 'super()' Initialization Wall
//   In a subclass constructor, if you attempt to read or modify 'this' before 
//   calling 'super()', JavaScript will hurl a hard ReferenceError and halt your script.
//
// * * TRAP 2: Static Methods are Non-Inheritable by Instances
//   workstation.compileLogs(); // ❌ TypeError: workstation.compileLogs is not a function
//   ParentTerminal.compileLogs(); // ✅ Works perfectly!
//
// * * TRAP 3: Private Fields Syntax Error
//   console.log(workstation.#firmwareKey); // ❌ Hard Syntax Error: Private field '#firmwareKey' must be declared in an enclosing class