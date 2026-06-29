# 📂 Phase 4: The Browser, DOM, & Events

## 📄 04-propagation-mechanics.md

This module breaks down the low-level mechanical routing engine responsible for moving events through the DOM tree node architecture, detailing event path compilation, window targeting, and interception mechanics.

---

## 1. The W3C Event Flow Specification

When an event interaction occurs (e.g., a pointer click or tap), the browser's UI layout thread must determine exactly which element received the input and notify the JavaScript runtime engine. The W3C standard mandates a deterministic, 3-stage traversal architecture across the DOM tree hierarchy.

```text
[Window] ──► [Document] ──► [Body] ──► [Parent Div] (Capturing / Trickling Down)
                                            │
                                            ▼
                                      [Target Button] (Target Phase)
                                            │
                                            ▼
[Window] ◄── [Document] ◄── [Body] ◄── [Parent Div] (Bubbling / Rising Up)

```

### 1.1 Phase 1: Capturing (The Trickle-Down Pipeline)

The event starts at the absolute top structural root of the environment (`window`), passes into the `document`, moves through the `<html>` root element, and travels sequentially downward layer-by-layer through nested parent elements until it reaches the parent node wrapping the interaction point.

### 1.2 Phase 2: The Target Phase

The event arrives at the single most deeply nested node that physically intersected the user's input coordinates. This element is stored permanently in the immutable event state property **`event.target`**.

### 1.3 Phase 3: Bubbling (The Rise-Up Pipeline)

The execution path reverses completely. The event climbs back up from the target's immediate parent node, moving line-by-line through every ancestral element layer until it reaches the global `window` container again.

---

## 2. Compiling the Event Path Array

Before a single JavaScript event listener function is executed, the browser's rendering engine freezes the state of the DOM and compiles an ordered array list known as the **Event Path**.

You can read this exact compiled route in your code via the native **`event.composedPath()`** method.

```javascript
const hardwareActionBtn = document.getElementById("action-btn");

hardwareActionBtn.addEventListener("click", function (event) {
  const executedRouteArray = event.composedPath();
  console.log(executedRouteArray);
  // Outputs: [button#action-btn, div.container, body, html, document, window]
});
```

### 🧠 The Architectural Guardrail

Because the engine pre-compiles this execution route array _before_ running your listeners, **modifying or deleting parent nodes from the webpage while a listener is currently executing will not change the event path.** If you delete a parent `div` during the target phase, the event will still bubble up through the reference pointer of that deleted parent in memory!

---

## 3. Controlling and Halting the Pipeline

The `Event` object exposed inside your callback functions gives you two independent control methods that manipulate this traversal engine.

### 3.1 `event.stopPropagation()` vs. `event.stopImmediatePropagation()`

- **`event.stopPropagation()`:** Stops the event from traveling further down the compiled path array to _other elements_. If called during the target phase, it prevents the event from bubbling up to any parent nodes. However, if the current element has multiple distinct click listeners attached to itself, they will all still run.
- **`event.stopImmediatePropagation()`:** Takes halting a step further. It instantly freezes event execution. Not only does it block the event from moving to parent elements, but it also cancels any remaining, unexecuted event listener functions attached to the _current element_.

```javascript
const diagnosticsBtn = document.getElementById("diagnostics-btn");

diagnosticsBtn.addEventListener("click", (e) => {
  console.log("Listener A Fired");
  e.stopImmediatePropagation(); // ──► Hard stop gate clears right here
});

diagnosticsBtn.addEventListener("click", () => {
  console.log("Listener B Fired"); // ❌ Will NEVER execute because of the hard stop above
});
```

### 3.2 Non-Bubbling Structural Exceptions

Not every event in the browser follows this travel architecture. For performance and security reasons, specific native events are locked to the target phase and **never bubble**:

- **`focus` / `blur`:** Changing text cursor focuses will not bubble up to parent containers (use `focusin` / `focusout` if you require bubbling).
- **`mouseenter` / `mouseleave`:** Fires exclusively when a pointer boundary intersects an element bounding box (use `mouseover` / `mouseout` for standard bubbling).
- **`scroll`:** Page scrolling animations do not bubble up past their immediate scrolling container node layers.

---

## 🚀 Phase 4, Topic 4 Mastery Verification

Mark `04-propagation-mechanics.md` as **Complete** in your manual workspace layout! Let's test your ability to read compiled paths:

```javascript
const parentContainer = document.getElementById("parent");
const modalBtn = document.getElementById("btn");

parentContainer.addEventListener(
  "click",
  (e) => {
    console.log("Parent Logged");
  },
  false,
);

modalBtn.addEventListener(
  "click",
  (e) => {
    e.stopPropagation();
    console.log("Button Logged");
  },
  false,
);
```

> **Engineering Scenario:** If a user clicks the `#btn` element, the console outputs `"Button Logged"`. If you immediately change the button's listener registration to run during the capturing phase (`true`), what will the console output look like when clicked? Trace the path to verify your answer!

Let me know your step-by-step route trace, and we will open **`05-event-delegation-engineering.md`** next!
