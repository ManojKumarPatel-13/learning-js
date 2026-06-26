// -------------------------------------------------------------------------
// 📑 SUB-TOPIC A: "Custom Error Architecture"
// -------------------------------------------------------------------------
// * THE CONCEPT: Extending the native Error class allows you to include custom
//   metadata (like specific status codes or form fields) to handle errors intelligently.

class DatabaseError extends Error {
    constructor(message, queryLine, errorCode) {
        super(message);                     // Handshake: Configures base message & stack trace
        this.name = "DatabaseError";        // Crucial: Override the generic default string name
        this.queryLine = queryLine;         // Custom contextual property
        this.errorCode = errorCode;         // Custom contextual property
    }
}

// -------------------------------------------------------------------------
// 📑 SUB-TOPIC B: "The Bubbling & Re-throwing Mechanism"
// -------------------------------------------------------------------------
// * THE ENGINE RULE: Errors travel upward through the call stack (bubbling). 
//   If a try/catch block intercepts an error but shouldn't handle it, use 'throw' 
//   to re-emit it up to the next layer.

function executeQuery() {
    throw new DatabaseError("Connection Timeout", "SELECT * FROM users", 504);
}

function controllerLayer() {
    try {
        executeQuery();
    } catch (error) {
        if (error instanceof DatabaseError) {
            console.log(`🔧 DB Crash on line: ${error.queryLine}`);
        } else {
            throw error; // Re-throwing an unhandled error type up the stack
        }
    }
}

// -------------------------------------------------------------------------
// 📑 SUB-TOPIC C: "Global Environment Fallback Boundaries"
// -------------------------------------------------------------------------
// * THE CORE RULE: Every production app must have a top-level global boundary 
//   hook to intercept rogue unhandled errors before they brick the client application.

// Browser Environment Protections:
window.onerror = function (message, source, lineno, colno, error) {
    console.log(`🛡️ Global Trap: ${message} at line ${lineno}`);
    return true; // Returning TRUE stops the error from making the browser console bleed red
};

// Async Promise Rejection Safety Net:
window.addEventListener('unhandledrejection', function (event) {
    console.log(`🚨 Unhandled Promise Failure: ${event.reason}`);
});