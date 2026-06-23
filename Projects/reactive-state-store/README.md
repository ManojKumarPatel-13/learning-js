# Reactive State Store Engine 🛒🔒

A lightweight, unidirectional state management engine built from scratch in vanilla JavaScript to demonstrate clean architecture, decoupled components, and absolute state immutability.

---

## 🏛️ Flow Architecture

```text
[ Product Payload ] ──► [ Guard: addData() ] ──► [ Mutate Central Store ]
                                                          │
                                                          ▼
[ Subscribers UI / Logs ] ◄── [ Megaphone Alert ] ◄── [ announceAddition() ]
          │
          ▼ (Requests State Snapshot)
[ Safe Immutability Layer ] ◄── [ structuredClone() + deepFreeze() ]
```

---

## ⚙️ Core Features

- **Unidirectional Data Flow (Pub-Sub):** Isolated modules (UI & Analytics) sync instantly and automatically via a central notification list when changes occur.
- **Strict Data Gatekeeper:** A single-entry guard validating existence, properties, mathematical logic, and bot limits before data updates.
- **Deep Immutability Layer:** Combines `structuredClone()` and recursive `Object.freeze()` to block external data-tampering attempts.
- **Strict Mode Activated:** Utilizes `"use strict";` to crash the script with hard `TypeError` warnings if a module tries to break immutability rules.

---

## 🚀 Built-In Test Simulations

The script contains an automated test runner showcasing three critical states:

1. **Successful Flow:** Validates a normal add-to-cart operation, updating all tracking blocks simultaneously.
2. **Exhaustion Guard:** Fails gracefully when trying to order more items than what exists in the warehouse stock catalog.
3. **Immutability Bypass Attack:** Intercepts a direct mutation hack, crashes execution into a safe `catch` block, and logs a defensive error.

---

## 💻 How to Use

1. Save the code into a file named `script.js`.
2. Execute the file using your terminal:

```bash
node script.js
```
