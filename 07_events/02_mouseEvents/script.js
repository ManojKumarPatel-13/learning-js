// ============================================================================
// MASTER ARCHITECTURAL NOTES: FILE 2 — MOUSE & POINTER SYSTEM CODES
// ============================================================================

// --- CORE ENGINE DEFINITIONS FOR PROJECT BUILDING ---
// - VIEWPORT : The physical visible glass viewing window frame of the web browser screen.
// - BOX MODEL: The physical bounding box perimeter borders of an individual HTML element tag.
// - HIGH-FREQUENCY EVENT: An event that fires dozens of times per second, which can drag 
//   down system performance metrics if its callback execution code isn't highly optimized.

// ----------------------------------------------------------------------------
// STEP 1: QUERY SECUREMENT
// ----------------------------------------------------------------------------
// We grab our memory references from the DOM tree. If either selector returns null, 
// our protective guard condition (if statement wrapper) prevents the code from throwing runtime errors.
const interactionPad = document.querySelector("#interaction-pad");
const readout = document.querySelector("#screen-readout");

if (interactionPad) {

    // ============================================================================
    // PART 1: THE CORE TRACKING INTERACTION EVENT PIPELINE
    // ============================================================================

    // --- 1. THE STANDARD PRIMARY CLICK ---
    // Engine Mechanics: Fires strictly when the main primary pointer button (usually left-click) 
    // is fully depressed and released while remaining within the coordinate bounds of the target box.
    interactionPad.addEventListener("click", function (e) {
        console.log("--- CLICK EVENT TRIGGERED ---");
        updateDisplay("Single Click Left Detected!", e);
    });

    // --- 2. THE RAPID DOUBLE CLICK ACTION ---
    // Engine Mechanics: Fires when two primary click events hit the same element inside a restricted 
    // millisecond window managed by the operating system's timing thread.
    // Project Practicality: Ideal for "double-tap to save/favorite an item" or custom media zoom boxes.
    interactionPad.addEventListener("dblclick", function (e) {
        console.log("--- DOUBLE CLICK EVENT INTERCEPTED ---");
        updateDisplay("⚡ Double Click Action Intercepted!", e);
    });

    // --- 3. THE BOUNDARY HOVER ENTRY ---
    // Engine Mechanics: Fires the exact millisecond the physical hardware arrow cursor intersects 
    // the outer edge coordinate boundary path of the targeted layout element box.
    // Core Distinctions: Unlike 'mouseover', 'mouseenter' is ultra-clean; it does NOT bubble 
    // up to parent nodes when crossing into deeper child nodes nested inside this container.
    interactionPad.addEventListener("mouseenter", function (e) {
        interactionPad.style.borderColor = "var(--accent-cyan)"; // Dynamic UI feedback link
        console.log("Pointer entered element boundary.");
    });

    // --- 4. THE BOUNDARY HOVER EXIT ---
    // Engine Mechanics: Fires the inverse millisecond the physical cursor clears the outer 
    // edge coordinate path, leaving the element's box layout zone entirely.
    interactionPad.addEventListener("mouseleave", function (e) {
        interactionPad.style.borderColor = "#555555"; // Revert UI frame look
        readout.innerHTML = "Pointer left target zone boundary.";
        console.log("Pointer left element boundary.");
    });

    // --- 5. THE HIGH-FREQUENCY POINTER TRACKER ---
    // Engine Mechanics: Fires constantly and continuously—often matching your monitor's fresh 
    // rate (60Hz to 144Hz+)—for every single pixel unit step the cursor takes inside the target box area.
    // 🚨 PERFORMANCE WARNING: Keep code inside 'mousemove' listeners lightweight. Do not execute 
    // heavy math equations or heavy layout calculations here, or you will cause rendering lags!
    interactionPad.addEventListener("mousemove", function (e) {
        // We pass the streaming event object (e) payload directly into our visual renderer function below
        updateDisplay("Moving Pointer Stream...", e);
    });

    // --- 6. NATIVE BEHAVIOR BLOCKING PIPELINE ---
    // Engine Mechanics: Every hardware input triggers a built-in browser default behavior routine. 
    // Right-clicking tells the browser's lower-level C++ thread to paint its generic grey options box.
    // Project Practicality: Executing 'e.preventDefault()' tells the browser engine to dump that default 
    // behavior entirely, freeing you up to spawn your own custom popup window boxes on the fly.
    interactionPad.addEventListener("contextmenu", function (e) {
        e.preventDefault(); // 🛑 INTERRUPT: Kill the browser's default dropdown panel block!

        console.log("\n=== CUSTOM CONTEXT MENU CORE WOKEN ===");
        updateDisplay("🟥 Right-Click Blocked! Custom Context Triggered.", e);
    });

}

// ============================================================================
// PART 2: THE COORDINATE DUALITY MATRIX COMPUTATION ENGINE
// ============================================================================
/*
  Whenever an interaction executes, the browser engine passes a comprehensive MouseEvent 
  data object payload directly into the callback function argument position marked as 'eventObject' (e).
  This object exposes two completely different pixel measurement layouts:

  1. CLIENT COORDINATES (.clientX / .clientY):
     - Measures the exact physical pixel distance from the absolute TOP-LEFT CORNER of the 
       browser's current visible window glass viewport display screen area.
     - Entirely blind to layout elements or page scroll bars. If you scroll down 5000px, 
       clientX remains locked strictly to your physical computer monitor screen's viewable frame.

  2. OFFSET COORDINATES (.offsetX / .offsetY):
     - Measures the local pixel distance starting directly from the inner TOP-LEFT BOUNDARY 
       CORING of the specific targeted element node itself.
     - If an element box is exactly 300px wide and you click perfectly in its horizontal center, 
       offsetX will compute out to exactly '150px' no matter where that box lives on the screen.
     - Verified Application Formula: Crucial for building custom volume sliders, custom video scrubber bars, 
       or HTML5 mouse-drawing canvas pads.
*/
function updateDisplay(statusString, eventObject) {
    readout.innerHTML = `
        <strong>STATUS:</strong> ${statusString}<br>
        <strong>Viewport Coordinates (clientX/Y):</strong> X: ${eventObject.clientX}px | Y: ${eventObject.clientY}px<br>
        <strong>Local Element Coordinates (offsetX/Y):</strong> X: ${eventObject.offsetX}px | Y: ${eventObject.offsetY}px
    `;
}