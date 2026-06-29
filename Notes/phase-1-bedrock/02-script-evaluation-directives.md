# 📂 Phase 1: The Bedrock

## 📄 02-script-evaluation-directives.md

This module details how browser engines load, parse, and execute external JavaScript assets relative to the parsing lifecycle of the HTML Document Object Model (DOM).

---

## 1. The HTML Parser Lifecycle

To understand why JavaScript loading strategies matter, we must look at how a browser's layout engine (e.g., Blink in Chrome, Gecko in Firefox) builds a webpage.

When a user requests a page, the browser reads the incoming network stream byte-by-byte and converts it into a structural hierarchy:

```text
Bytes (01011...) ──► Characters (<html>) ──► Tokens ──► Nodes ──► DOM Tree

```

By default, the HTML parser operates sequentially. If it encounters a classic `<script>` tag mid-stream, it faces a **parser-blocking bottleneck**:

1. **HTML Parsing Pauses:** The rendering engine stops building the DOM tree.
2. **Network Fetch:** The browser sends a network request to download the script file.
3. **Compilation & Execution:** The JS engine ingests, compiles, and runs the script.
4. **HTML Parsing Resumes:** Only after the script finishes executing does the HTML parser resume processing the remaining document.

---

## 2. Script Tag Variations: Mechanical Breakdown

To prevent scripts from blocking the initial page render, the HTML5 specification introduced the `async` and `defer` attributes.

```html
<script src="app.js"></script>

<script async src="app.js"></script>

<script defer src="app.js"></script>

```

### 2.1 Standard `<script>` (Parser Blocking)

The network download happens synchronously, and execution fires immediately. This creates a complete block on the HTML layout engine. If the script attempts to query a DOM node defined further down the page, it will return `null`.

### 2.2 `<script async>` (Asynchronous Fetch, Immediate Execution)

The file downloads in the background over a separate network thread while the HTML parser continues building the document. However, **the exact millisecond the file finishes downloading, the HTML parser freezes** so the JS engine can execute the script.

### 2.3 `<script defer>` (Asynchronous Fetch, Guarded Execution)

The file downloads in the background over a separate network thread, just like `async`. However, the script **never pauses HTML parsing**. The browser holds the downloaded script file in memory and waits until the HTML document is fully parsed before executing it.

---

## 3. Timeline Comparison Matrix

The diagram below maps out how the browser handles download and execution workloads across different loading strategies:

[Image comparing standard script, async script, and defer script execution timelines during HTML parsing]

| Execution & Lifecycle Dimension | Standard `<script>` | `async` Attribute | `defer` Attribute |
| --- | --- | --- | --- |
| **Download Timing** | Synchronous (Blocks HTML parsing). | Asynchronous (Parallel to HTML parsing). | Asynchronous (Parallel to HTML parsing). |
| **Execution Timing** | Immediate (Blocks HTML parsing). | Immediate upon download complete (Blocks HTML parsing). | Deferred (Runs only after HTML parsing completes). |
| **Guaranteed Order** | **Yes.** Executes in the exact order they appear in the HTML source code. | **No.** First-come, first-served execution order based on network speed. | **Yes.** Executes strictly in the sequence they are declared in the HTML source code. |
| **DOM Dependency Safety** | **No.** Risks querying unparsed elements if placed in the `<head>`. | **No.** High risk of running before the DOM tree finishes building. | **Yes.** Guaranteed to run after the DOM layout is fully built. |
| **Ideal Use Cases** | Legacy scripts or critical inline configurations. | Independent third-party modules (Analytics, Ads, Tracking scripts). | Core application bundles, UI components, framework entry points. |

---

## 4. Interaction with Lifecycle Events

The browser manages two critical events that track page readiness: `DOMContentLoaded` and `window.onload`. The script attributes interact with these events differently:

* **`DOMContentLoaded`:** Fires when the HTML document has been completely parsed and the DOM tree is built.
* **Interaction with Defer:** The browser will explicitly delay `DOMContentLoaded` until all deferred scripts have completed execution.
* **Interaction with Async:** Independent. `DOMContentLoaded` can fire before an async script executes, or after it, depending entirely on network latency.


* **`window.onload`:** Fires later, once the entire page is loaded—including heavy external assets like images, styles, and iframes. All scripts are guaranteed to have run by this point.

---

## 🚀 Phase 1, Topic 2 Mastery Verification

Mark `02-script-evaluation-directives.md` as **Complete** in your manual tracker! Let's test your troubleshooting skills:

> **Engineering Scenario:** Imagine you have two interconnected script files: `analytics-core.js` and `analytics-plugins.js` (which depends on constants declared in `analytics-core.js`). If you tag both of these scripts with the `async` attribute, what error could happen on a slow user network, and why would switching them to `defer` fix it?

When you're ready, let me know your answer, and we will open **`03-variable-allocation-specs.md`** to dissect the inner memory structures of `var`, `let`, and `const`!