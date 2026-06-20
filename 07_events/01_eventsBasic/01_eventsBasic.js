// ============================================================================
// ARCHITECTURAL PLAYBOOK: EVENT LISTENERS & MEMORY REFERENCING
// ============================================================================

// ----------------------------------------------------------------------------
// CORE DEFINITIONS FOR BEGINNERS:
// ----------------------------------------------------------------------------
// - EVENT    : A digital notification broadcast by the browser core indicating 
//              that a physical interaction (click, keypress) has occurred.
// - LISTENER : An active background sentinel attached to a specific DOM node.
// - CALLBACK : The target JavaScript function executed when the event fires.

// ============================================================================
// PART 1: THE THREE EVOLUTIONARY APPROACHES
// ============================================================================

// --- APPROACH 1: INLINE MARKUP (DEPRECATED ANTI-PATTERN) ---
// Syntax: <button onclick="console.log('clicked')">
// pitfall: Violates clean-architecture laws by blending presentation data with logic strings.

// --- APPROACH 2: ELEMENT PROPERTY OVERWRITING (LIMITED CAPACITY) ---
const basicBtn = document.querySelector("#basic-action");
if (basicBtn) {
    basicBtn.onclick = function () { console.log("Action A"); };
    // 🚨 PITFALL: The line below completely overwrites and destroys Action A!
    basicBtn.onclick = function () { console.log("Action B"); };
}

// --- APPROACH 3: THE WEB API DOM STANDARD (ADD_EVENT_LISTENER) ---
// Syntax blueprint: element.addEventListener("eventTypeString", callbackBlueprint);
// Benefit: Allows an unlimited amount of decoupled listeners to monitor a single node.
const standardBtn = document.querySelector("#standard-action");
if (standardBtn) {
    const notifyUI = () => console.log("UI updated.");
    const syncData = () => console.log("Server synced.");

    standardBtn.addEventListener("click", notifyUI);
    standardBtn.addEventListener("click", syncData); // Both execute concurrently!
}

// ============================================================================
// PART 2: THE MEMORY REFERENCE LAW (ADD VS. REMOVE LISTENERS)
// ============================================================================
/*
  CRITICAL ENGINE MECHANIC:
  To cleanly unmount a listener via .removeEventListener(), you must pass the 
  EXACT same heap memory reference address pointer used during registration.
*/

const alertBtn = document.querySelector("#alert-action");

// --- SETUP A: THE ANONYMOUS TRAP (FAIL FLOW) ---
// Every time 'function()' or '()' is parsed inline, V8 instantiates a brand new object in the heap.
alertBtn.addEventListener("click", function () { console.log("Alert!"); });
alertBtn.removeEventListener("click", function () { console.log("Alert!"); });
// ❌ FAILURE: The removal address does not match the registration address. The listener leaks.

// --- SETUP B: THE NAMED REFERENCE ROUTE (SUCCESS FLOW) ---
function triggerAlert() { console.log("Alert!"); }

alertBtn.addEventListener("click", triggerAlert);    // Pass reference pointer address
alertBtn.removeEventListener("click", triggerAlert); // Matches exactly! Clean heap destruction.

// ============================================================================
// PART 3: IN-DEPTH DOM DATASET TRANSLATION ENGINE
// ============================================================================
/*
  The 'data-*' attributes allow you to embed custom state variables directly inside 
  the HTML markup structure without violating W3C semantic syntax rules.
  
  HTML Markup Sample:
  <div id="user-profile" data-user-id="992" data-account-tier="premium"></div>
  
  Engine Physics:
  1. The browser engine parses the HTML attributes stream.
  2. Any attribute prefixed with 'data-' is automatically converted into a camelCase property key.
  3. These properties are gathered into a single object literal attached to the element node: .dataset
*/

const profileBox = document.querySelector("#user-profile");
if (profileBox) {
    // Reading values directly out of the element's data object:
    console.log("Extracted User ID String:", profileBox.dataset.userId);       // maps from 'data-user-id'
    console.log("Extracted Account Tier:", profileBox.dataset.accountTier); // maps from 'data-account-tier'
}

// ============================================================================
// PART 4: REAL-WORLD APPLICATION ARCHITECTURE BENCHMARK
// ============================================================================
/*
  PROJECT CHALLENGE SPECIFICATION:
  Select multiple volume controllers dynamically, iterate over the collection, 
  and extract dataset variables inside an event callback using an arrow function wrapper.
*/

// Step 1: Query the group collection into a static NodeList wrapper
const volumeButtons = document.querySelectorAll(".vol-btn");

// Step 2: Define the execution logic function
function changeVolume(level) {
    console.log(`Master volume scale mutated to: ${level}%`);
}

// Step 3: Implement the dynamic allocation loop (Verified Solution Blueprint)
volumeButtons.forEach((btn, index) => {
    // The anonymous arrow function wrapper captures the thread context.
    // It remains un-invoked until the physical hardware click event fires!
    btn.addEventListener("click", () => {
        // Read the distinct data-volume value stored directly on the clicked element node instance
        const targetVolumeLevel = btn.dataset.volume;
        changeVolume(targetVolumeLevel);
    });
});