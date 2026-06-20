// ============================================================================
// ARCHITECTURAL PLAYBOOK: LIFECYCLE TIMELINES & HIGH-FREQUENCY MECHANICS
// ============================================================================

// ============================================================================
// PART 1: BROWSER BOOTUP TIMELINE LIFECYCLE HOOKS
// ============================================================================

/*
  1. DOMContentLoaded Event
     - Target Anchor: document
     - Timing: Fires the exact millisecond the HTML text is fully parsed and the 
       DOM tree structure is built in memory. 
     - Advantage: It does NOT wait for heavy images or stylesheets. It is the absolute
       safest and fastest gate to boot up script files.
*/
document.addEventListener("DOMContentLoaded", function () {
    console.log("⏱️ Lifecycle Log: DOM Tree fully built. Initializing script elements safely.");

    // Verified Solution: Target elements here safely even if the script is loaded in the <head>
    const mainButton = document.querySelector("#submit-btn");
    if (mainButton) mainButton.style.backgroundColor = "blue";
});

/*
  2. Window Load Event
     - Target Anchor: window
     - Timing: Fires much later in the timeline when the entire webpage—including images,
       stylesheets, fonts, and sub-frame widgets—is 100% downloaded and painted.
     - Primary Use Case: Initializing complex image dimensions or stripping off a loading overlay.
*/
window.addEventListener("load", function () {
    console.log("🎨 Lifecycle Log: All resources (images, fonts, styles) fully loaded.");
});


// ============================================================================
// PART 2: HIGH-FREQUENCY MECHANICAL PERFORMANCE OPTIMIZATION
// ============================================================================

/*
  THE HIGH-FREQUENCY TRAP:
  Events like 'scroll' and 'resize' fire dozens of times per second. Putting heavy 
  layout-calculating JavaScript inside them forces the browser engine to run continuous, 
  expensive Reflow and Repaint steps, dragging down performance frames.
*/

// --- OPTIMIZATION ARCHITECTURE: FRAME-RATE THROTTLING FLAG ---
let tickingFrameFlag = false;

window.addEventListener("scroll", function () {
    // Step A: Guard Clause Interception
    // If the flag is true, a animation frame calculation is already scheduled. Drop the event.
    if (tickingFrameFlag) return;

    // Step B: Lock the track gate
    tickingFrameFlag = true;

    // Step C: Sync execution with the browser's native screen monitor refresh rate (60Hz / 120Hz)
    requestAnimationFrame(function () {
        // Read window scroll coordinates:
        // window.scrollY measures how many physical pixels the document has shifted upward
        const currentScrollPosition = window.scrollY;

        console.log(`⚡ Optimized Scroll Core Computation Readout: ${currentScrollPosition}px`);

        // PROJECT USE CASE APPLICATION LOGIC:
        // Build a sticky navigation bar feature:
        // if (currentScrollPosition > 150) { navBar.classList.add('sticky'); }

        // Step D: Unlock the gate after processing finishes so the next frame cycle can enter
        tickingFrameFlag = false;
    });
});

// --- THE LAYOUT RESIZE MONITORED CORE ---
window.addEventListener("resize", function () {
    // Tracks adjustments to window viewport dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;

    console.log(`📐 Viewport Window Resize Detected: ${width}px width x ${height}px height`);
});