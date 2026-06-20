// ============================================================================
// ARCHITECTURAL PLAYBOOK: CUSTOM EVENT DISPATCHING & COMPONENT DECOUPLING
// ============================================================================

// ============================================================================
// PART 1: THE DISPATCH ENGINE BLUEPRINT
// ============================================================================
/*
  SYNTAX CONFIGURATION RULES:
  1. Instantiate via 'new CustomEvent("yourEventName", optionsObject)'
  2. The custom event name string can be any custom keyword you invent.
  3. Custom parameters/data payloads MUST be attached under the reserved 'detail' key.
  4. Use 'element.dispatchEvent(eventInstance)' to broadcast it into the DOM tree.
*/

// ============================================================================
// PART 2: THE DECOUPLED PROJECT SCENARIO (E-COMMERCE MATRIX)
// ============================================================================

// --- COMPONENT A: THE GLOBAL RECEIVER SENTINEL (THE HEADER BASKET COUNTER) ---
// This component sits autonomously at the top of the app, listening for broadcasts.
window.addEventListener("cartUpdated", function (e) {
    console.log("\n📥 [HEADER COMPONENT INTERCEPT] -> Notification Received!");

    // Extracting the data payload safely from the protected e.detail object block
    const itemAddedTitle = e.detail.productTitle;
    const itemCost = e.detail.price;
    const currentCartSize = e.detail.totalItemsCount;

    console.log(`Payload Processed: Added "${itemAddedTitle}" costing $${itemCost}.`);
    console.log(`UI Update Action: Synchronizing global basket badge indicator to read: [${currentCartSize}]`);
});

// --- COMPONENT B: THE SECONDARY RECEIVER (THE ANALYTICS LOGGING ENGINE) ---
// Adding new functionality is simple. We add a new listener without changing the button's code!
window.addEventListener("cartUpdated", function (e) {
    console.log("📊 [ANALYTICS ENGINE LOG] -> Syncing transaction data to background metrics server...");
    console.log(`Telemetry Sync: Product Code ID [${e.detail.productId}] transmitted.`);
});


// --- COMPONENT C: THE TRIGGER ORIGIN SOURCE (THE ADD-TO-CART BUTTON) ---
const mockAddToCartButton = {
    // Simulating a real DOM button action workflow pattern
    triggerFakeHardwareClick: function () {
        console.log("\n🎯 [HARDWARE BUTTON LAYER] -> User physically pressed 'Add to Cart'.");

        // 1. Pack the application state variables into a fresh event instance object
        const systemMessage = new CustomEvent("cartUpdated", {
            detail: {
                productId: 4019,
                productTitle: "Ergonomic Mechanical Keyboard",
                price: 129,
                totalItemsCount: 3
            }
        });

        // 2. Fire the custom event message globally out into the window stream
        window.dispatchEvent(systemMessage);
    }
};

// --- SIMULATING PROJECT WORKFLOW RUNTIME ---
// Executing the click simulation triggers both receiver components synchronously!
mockAddToCartButton.triggerFakeHardwareClick();