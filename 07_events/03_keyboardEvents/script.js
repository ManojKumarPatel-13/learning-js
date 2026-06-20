// ============================================================================
// ARCHITECTURAL PLAYBOOK: KEYBOARD HARDWARE CAPTURE & SHORTCUT ENGINES
// ============================================================================

// --- TARGETING GLOBAL WINDOW CORE FOR KEY INPUTS ---
// Keyboard events are typically listened to on the global 'window' or 'document'
// object level so they can capture inputs from anywhere on the webpage layout.

window.addEventListener("keydown", function (e) {
    console.log("\n=== KEYBOARD HARDWARE INPUT CAPTURED ===");

    // ============================================================================
    // PART 1: THE PAYLOAD DATA SEPARATION ( .key VS .code )
    // ============================================================================
    /*
      - e.key  : Returns the literal text string character input. 
                 Adapts dynamically to Shift modifiers, languages, or caps states.
      - e.code : Returns the physical hardware button location string on the board.
                 Immutable layout anchor. (Verified Solution: Essential for game controls).
    */
    console.log(`Character State (.key) : "${e.key}"`);
    console.log(`Hardware Position (.code): "${e.code}"`);


    // ============================================================================
    // PART 2: THE AUTO-REPEAT INHIBITION GUARD ( e.repeat )
    // ============================================================================
    /*
      If a user holds a key down, the browser fires keydown continuously.
      We use the 'e.repeat' boolean property as a guard statement to intercept 
      and kill high-frequency thrashes, ensuring code runs exactly once per tap.
    */
    if (e.repeat) {
        console.log(`--> Throttled continuous repeat engine hold for: ${e.code}`);
        return; // Halt execution instantly
    }


    // ============================================================================
    // PART 3: ADVANCED SYSTEM SHORTCUT COMBINATIONS ( MODIFIER CONTROLS )
    // ============================================================================
    /*
      The event payload exposes true/false states for secondary system control keys:
      - e.ctrlKey  |  e.shiftKey  |  e.altKey  |  e.metaKey (Mac Command / Win Key)
    */

    // CASE ENGINE A: Custom Application Save Hotkey Command ( Ctrl + S )
    if (e.ctrlKey && e.code === "KeyS") {
        e.preventDefault(); // 🛑 Stop browser from bringing up its default "Save Webpage HTML" window
        console.log("CUSTOM ENGINE REACTION: Application save pipeline triggered safely.");
    }

    // CASE ENGINE B: Character Gaming Controls Setup Matrix ( W-A-S-D )
    // Using e.code ensures it runs flawlessly regardless of capitalization states or caps lock hooks!
    switch (e.code) {
        case "KeyW":
            console.log("Vector Action -> Move Ship Forward UP");
            break;
        case "KeyS":
            console.log("Vector Action -> Move Ship Reverse DOWN");
            break;
        case "KeyA":
            console.log("Vector Action -> Strafe Ship LEFT");
            break;
        case "KeyD":
            console.log("Vector Action -> Strafe Ship RIGHT");
            break;
    }
});

// ============================================================================
// PART 4: THE KEY RELEASE EVENT TRIPPED ( keyup )
// ============================================================================
window.addEventListener("keyup", function (e) {
    // Fires once at the precise millisecond the physical finger pressure releases the key
    // Perfect use case: Halting character momentum velocity loops when players let go of keys
    if (e.code === "KeyW") {
        console.log("Engine Note: Forward vector thrust deactivated via keyup.");
    }
});