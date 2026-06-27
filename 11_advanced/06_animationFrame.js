// ---------------------------------------------------------------------------------
// 📑 REGIME 1: DEBOUNCING VS THROTTLING SPECIFICATION
// ---------------------------------------------------------------------------------
// * DEBOUNCE: Delays execution until a burst of high-frequency inputs completely ceases.
//   Resets the execution timer on every invocation. (Best for: Search Auto-complete).
// * THROTTLE: Locks execution to a maximum frequency window limit. Ignores intermediate
//   calls inside the time block. (Best for: Infinite Scroll, Drag-and-Drop, Resize).

// ✅ PRODUCTION-GRADE DEBOUNCE IMPLEMENTATION
function debounce(callback, delayContext) {
    let internalTimerId = null;

    return function (...args) {
        // Clear previous pending timers to force a fresh countdown reset
        clearTimeout(internalTimerId);

        internalTimerId = setTimeout(() => {
            callback.apply(this, args);
        }, delayContext);
    };
}

// ✅ PRODUCTION-GRADE THROTTLE IMPLEMENTATION (rAF OPTIMIZED)
function throttleToAnimationFrame(callback) {
    let isLocked = false;

    return function (...args) {
        // Skip execution if a render frame is already scheduled
        if (isLocked) return;

        isLocked = true;

        // Defer execution straight to the browser's rendering tick
        requestAnimationFrame(() => {
            callback.apply(this, args);
            isLocked = false; // Release lock after repaint loop executes
        });
    };
}

// ---------------------------------------------------------------------------------
// 📑 REGIME 2: DOM LAYOUT THRASHING ELIMINATION SYSTEM
// ---------------------------------------------------------------------------------
// * CRITICAL PATH INFRASTRUCTURE: Writes dirty the layout schema. Reads force immediate, 
//   expensive synchronous reflow refactorings if executed immediately after a write.

// ❌ ANTI-PATTERN: LOOP-BASED LAYOUT THRASHING (Forces Synchronous Reflow)
function executeCrashedRenderLoop() {
    const panels = document.querySelectorAll(".system-panel");

    panels.forEach(panel => {
        // 🚨 METRIC READ SLAM: Forces layout computation
        const baselineHeight = document.getElementById("hero").offsetHeight;

        // 🚨 METRIC WRITE SLAM: Dirties the layout state instantly
        panel.style.height = (baselineHeight * 0.5) + "px";
    });
}

// ✅ PRO-PATTERN: READ-PHASE / WRITE-PHASE SEPARATION MATRIX
function executeOptimizedRenderLoop() {
    const panels = document.querySelectorAll(".system-panel");

    // Step 1: Execute all necessary DOM READS upfront out of loops
    // The browser layout remains pristine and cached
    const baselineHeight = document.getElementById("hero").offsetHeight;

    // Step 2: Queue up all DOM WRITES into a requestAnimationFrame batch
    requestAnimationFrame(() => {
        panels.forEach(panel => {
            panel.style.height = (baselineHeight * 0.5) + "px"; // Batch Writes!
        });
        console.log("🛡️ DOM mutation phase flushed cleanly at render boundary.");
    });
}

// ---------------------------------------------------------------------------------
// 📑 REGIME 3: REAL-WORLD FRAMEWORK COMPONENT SCRIPT
// ---------------------------------------------------------------------------------

class SmoothScrollParallax {
    constructor(targetSelector) {
        this.parallaxElements = document.querySelectorAll(targetSelector);

        // Wrap the scroll listener in our rAF performance throttle
        this.optimizedScrollHandler = throttleToAnimationFrame(() => this.updateLayerPositions());

        this.activateListeners();
    }

    activateListeners() {
        window.addEventListener("scroll", this.optimizedScrollHandler);
    }

    updateLayerPositions() {
        // Safe Read: Performed once out of loop
        const currentScrollOffset = window.scrollY;

        this.parallaxElements.forEach((layer, index) => {
            const parallaxSpeedOffset = (index + 1) * 0.15;
            // Pure Writes: No intervening reads to crash the render path!
            layer.style.transform = `translate3d(0, ${currentScrollOffset * parallaxSpeedOffset}px, 0)`;
        });
    }

    dismantle() {
        window.removeEventListener("scroll", this.optimizedScrollHandler);
    }
}
// =================================================================================