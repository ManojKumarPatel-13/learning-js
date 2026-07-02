# 📂 Phase 6: Asynchronous JS & The Engine Loop

## 📄 06-network-fetch-protocols.md

This module breaks down the Fetch API streaming architecture, Cross-Origin Resource Sharing (CORS) preflight validation states, and explicit network stream tearing using `AbortController`.

---

## 1. Fetch Architecture & Readable Streams

Unlike legacy XMLHttpRequests which hold a network connection open until an entire asset is downloaded into RAM, the modern **Fetch API** is built natively on top of web **Readable Streams**.

When a `fetch()` promise resolves, it doesn't mean the data payload has finished downloading. It simply means the remote server has responded with initial network HTTP headers. The actual response body is delivered as a live chunk-by-chunk stream.

```javascript
const response = await fetch("/large-dataset.json");

// response.body is a native ReadableStream
const reader = response.body.getReader();

while(true) {
    const { done, value } = await reader.read(); // Reads raw binary Uint8Array chunks chunk-by-chunk
    if (done) break;
    console.log(`Received raw stream chunk of size: ${value.length} bytes`);
}

```

---

## 2. CORS Preflight & Security Layouts

When making cross-origin requests, browsers enforce **Cross-Origin Resource Sharing (CORS)** guardrails to protect client data privacy.

If your script attempts to add custom headers (like `Authorization`) or uses non-simple HTTP methods (like `PUT` or `DELETE`), the browser intercepts the fetch call and injects an automated network handshake known as a **Preflight Request**.

```text
Browser ───► [ HTTP OPTIONS (Preflight) ] ───► Target Remote Server
                                                        │
Browser ◄─── [ 200 OK + Access-Control Allowed ] ◄──────┘
  │
  └─► actual target request executes (GET / PUT / POST)

```

The browser dispatches a quick `OPTIONS` request to the target server. It evaluates the server's response headers (`Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`) before allowing your actual network payload data to pass through.

---

## 3. Explicit Cancellation via `AbortController`

A common issue in single-page web applications is "ghost requests"—network fetches that continue wasting bandwidth even after a user has clicked away from a page view. To kill an active HTTP network stream instantly, use the native **`AbortController`** token interface:

```javascript
// Allocate a clean cancellation anchor
const controller = new AbortController();
const { signal } = controller;

try {
    // Inject the signal tracker directly into the fetch options block
    const telemetry = await fetch("/api/stream", { signal });
    const data = await telemetry.json();
} catch (error) {
    if (error.name === "AbortError") {
        console.log("Network operation canceled safely by user event.");
    } else {
        console.error("Standard network exception encountered:", error);
    }
}

// Somewhere else in your UI module (e.g., user clicks a 'Cancel' or 'Back' button):
controller.abort(); // Instantly tears down the physical browser network channel!

```

---

## 🚀 Phase 6 is Fully Complete!