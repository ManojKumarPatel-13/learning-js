// ============================================================================
// ARCHITECTURAL PLAYBOOK: FORM SELECTIONS, EXTRACTORS, & DATA DEBOUNCING
// ============================================================================

// --- TARGET LAYOUT COMPONENT SELECTION POINTERS ---
const userForm = document.querySelector("#registration-form");
const passwordField = document.querySelector("#password-input");

if (userForm && passwordField) {

    // ============================================================================
    // PART 1: THE INPUT STATE FLOW MATRIX ( INPUT VS CHANGE VS BLUR )
    // ============================================================================

    // 1. Live Input Stream Tracker
    // Fires instantly every single millisecond a character is typed or deleted.
    passwordField.addEventListener("input", function (e) {
        console.log(`Live character tracking text current state payload: ${e.target.value}`);
    });

    // 2. Core Focus Highlight Hook
    // Fires the exact millisecond the user clicks inside or tabs into the input target box model
    passwordField.addEventListener("focus", function (e) {
        e.target.style.backgroundColor = "#1c2833"; // Change background tint on active focus
    });

    // 3. Core Blur Departure Hook
    // Fires the moment the user clicks out of this input field to move to another section.
    // Verified Solution: Ideal to check if an input is valid immediately after a user leaves it.
    passwordField.addEventListener("blur", function (e) {
        e.target.style.backgroundColor = "transparent"; // Reset presentation layout

        // Instant Validation Check Example:
        if (e.target.value.length < 8) {
            console.log("Validation Alert Rule Warning: Password input must span >= 8 characters.");
        }
    });


    // ============================================================================
    // PART 2: COMPONENT INPUT TIMEOUT OPTIMIZATION ( DEBOUNCING ENGINE )
    // ============================================================================
    /*
      Debounce Pattern Implementation:
      Prevents high-frequency data thrashing by resetting a countdown timer window 
      on every input cycle, executing the core processing logic only after typing pauses.
    */
    let validationTimer;

    passwordField.addEventListener("input", function (e) {
        // Clear the previous active timeout tracker to reset the loop window
        clearTimeout(validationTimer);

        // Delay the execution by 600ms
        validationTimer = setTimeout(() => {
            console.log(`---> Debounce Threshold Crossed. Running secure check for value: ${e.target.value}`);
        }, 600);
    });


    // ============================================================================
    // PART 3: REFRESH CAPTURE BLOCKING & FORMDATA OBJECT DICTIONARY
    // ============================================================================

    // Always attach the submission observer to the CONTAINER <form> element, never the button!
    userForm.addEventListener("submit", function (e) {

        // 🛑 ANCHOR INJUNCTION: Kill the browser's native default behavior to reload the screen viewport.
        // This locks our application data states inside active JavaScript heap execution memory maps safely.
        e.preventDefault();

        console.log("\n=== SUBMIT EVENT INTERCEPTED AT CONTAINER ===");

        // THE MODERN EXTRACTION SYSTEM:
        // Pass the structural layout form tag (e.target) straight into the FormData constructor.
        // CRITICAL REQ: Input elements MUST possess an internal 'name' attribute to serve as dictionary keys!
        const formPayloadBuffer = new FormData(e.target);

        // Flatten the buffer dictionary elements instantly into a clean JavaScript object literal map:
        const cleanApplicationDataMap = Object.fromEntries(formPayloadBuffer.entries());

        console.log("Packaged Form Submission Processing Complete:", cleanApplicationDataMap);
        // Output Model structure: { username: "dev_user", password: "rawPasswordStr" }
        // Project Application Step: Pass this clean data map directly to a fetch() API request network loop here!
    });

}