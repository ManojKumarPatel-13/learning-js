// -------------------------------------------------------------------------
// 📑 SUB-TOPIC A: "The Iterator Protocol"
// -------------------------------------------------------------------------
// * THE CONCEPT: For an object to be loopable via 'for...of', it must possess 
//   a method under the hidden key [Symbol.iterator]. 
//   This method returns an object containing a '.next()' utility.

const manualIterator = {
    data: ['A', 'B'],
    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index < this.data.length) {
                    return { value: this.data[index++], done: false };
                }
                return { value: undefined, done: true }; // Signals loop termination
            }
        };
    }
};

// -------------------------------------------------------------------------
// 📑 SUB-TOPIC B: "Generators (State-Preserving Pausable Functions)"
// -------------------------------------------------------------------------
// * THE MECHANISM: function* combined with 'yield' allows functions to step 
//   off the call stack mid-execution without losing their local variable memory.

function* controlFlowFactory() {
    console.log("Stage 1");
    yield "Break Point A"; // Execution FREEZES here on call 1
    
    console.log("Stage 2"); // This only fires when call 2 starts!
    yield "Break Point B"; 
}

// -------------------------------------------------------------------------
// 📑 SUB-TOPIC C: "Async/Await Under the Hood"
// -------------------------------------------------------------------------
// * THE SENIOR TRUTH: Async/Await does not exist natively at the engine core.
//   It is synthetic sugar that wraps Generators and Promises together.
//
// * HOW THE ENGINE TRANSPORTS IT (Conceptual compilation emulation):
//   - An 'async' function is rewritten as a Generator function (*).
//   - Every 'await' expression is converted into a 'yield' statement.
//   - An internal helper runner executes the generator step-by-step. Every time 
//     a promise resolves, the runner automatically pushes the data back inside 
//     by calling generator.next(resolvedData), mimicking synchronous execution flows.