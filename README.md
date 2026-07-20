<div align="center">

  <h1>⚡ Learning JS: A Repo Where I Learn JavaScript</h1>
  
  <p><b>My personal hands-on vault documenting the journey of mastering JavaScript—from basic syntax to low-level V8 engine mechanics, practice problem sets, and custom-built projects.</b></p>

  <!-- Badges -->
  <p>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/Language-JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" /></a>
    <img src="https://img.shields.io/badge/Focus-Active_Learning_%26_Building-8A2BE2?style=for-the-badge" alt="Focus" />
    <img src="https://img.shields.io/badge/Status-Active_&_Updated-blue?style=for-the-badge" alt="Status" />
    <img src="https://img.shields.io/badge/License-MIT-orange?style=for-the-badge" alt="License" />
  </p>

</div>

---

## 🎯 About & Purpose

Welcome to **Learning JS**! 🚀

This repository is my dedicated personal workspace and continuous learning journal for mastering JavaScript from the ground up. Rather than just skimming surface-level tutorials, I built this space to **write code every day, experiment with language edge cases, break down engine mechanics, and document everything I learn in real-time.**

It serves a dual purpose:

1. **A Personal Knowledge Vault:** A living, structured reference manual that I can always return to whenever I need to refresh concepts, review tricky syntax, or revisit architectural patterns.
2. **A Proof-of-Work Portfolio:** A transparent showcase of my growth as a developer—moving from basic variables and loops to V8 memory allocations, multi-threaded Web Workers, and custom reactive micro-frameworks.

### 💡 Why I Built This Repo

- 🧪 **Hands-On Experimentation:** Theory without practice doesn't stick. Every module here contains runnable code files where I test concepts as I learn them.
- 🔍 **Deep Engine Curiosity:** I wanted to go beyond just using JavaScript to understanding _how_ it runs under the hood—analyzing the Call Stack, Execution Contexts, Hoisting, Memory Leaks, and Event Loop mechanics.
- 🏋️ **Active Problem Solving:** Includes dedicated practice sheets to solve tricky output-tracing challenges, closure puzzles, and low-level algorithmic exercises.
- 🛠️ **Building Real Stuff:** Applying learned concepts immediately by building custom mini-apps, reactive state stores, terminal engines, and canvas image processing tools from scratch.

### 🌟 Key Highlights

- 📚 **11 Modular Code Directories:** Step-by-step code modules spanning basic logic to advanced browser APIs.
- 📖 **Comprehensive Notes Directory (`/Notes`):** 8 structured phases of deep-dive markdown technical specifications and cheat sheets.
- 🏋️ **Practice Sheets (`/PracticeSheet`):** Dedicated problem sets testing execution contexts, async microtasks, and object models.
- 🛠️ **Vanilla JS Projects (`/Projects`):** Real-world applications demonstrating practical implementation of DOM manipulation, multithreading, and reactive architecture.

---

## 📁 Repository Structure

The repository is modularly organized into structured topic folders, technical markdown notes, practice challenges, and mini-applications:

```text
.
├── 01_basics/                    # Variables, Data Types, Memory, Coercion, Math, Dates
├── 02_basics/                    # Arrays, Objects, Maps, Destructuring
├── 03_basics/                    # Functions, Scopes, 'this', Arrow Functions, IIFE, Closures, Hoisting
├── 04_controlFlow/               # If/Else, Truthy/Falsy, Switch Statements
├── 05_iterations/                # Loops (for, while, for...of, for...in), Array Higher-Order Methods
├── 06_dom/                       # DOM Fundamentals, DOM Tree, Element Generation, Events, Observer APIs
├── 07_events/                    # Mouse/Keyboard/Form Events, Lifecycle, Custom Events, Event Loop
├── 08_asyncJS/                   # Promises, Async/Await, Event Loop, Combinators, AbortController
├── 09_oop/                       # 'this' Context, Object.create(), ES6 Classes & Inheritance
├── 10_advanced/                  # Modules, Error Handling, Generators, Regex, Functional Programming, Metaprogramming
├── 11_advanced/                  # V8 Internals, Memory Allocation, Web Workers, ArrayBuffers, PWA, WASM
├── browser-apis-directory/       # Location/Hardware, Media, Storage Pipelines, System Signals
├── Notes/                        # 8-Phase Deep Technical Markdown Specifications & Cheats
│   ├── phase-1-bedrock/
│   ├── phase-2-functions-scope/
│   ├── phase-3-data-structures-es6/
│   ├── phase-4-browser-dom-events/
│   ├── phase-5-object-oriented-js/
│   ├── phase-6-asynchronous-js/
│   ├── phase-7-advanced-concepts/
│   ├── phase-8-hardcore-under-the-hood/
│   └── short-notes-wrap/
├── PracticeSheet/                # Problem sets on mechanics, async event loops, low-level DSA
├── Projects/                     # Interactive apps (Image Editor, State Store, Tech Terminal, Custom Vue)
└── README.md

Curriculum & Learning Roadmap
The learning path inside this repository follows a structured 4-stage progression:
```

## 🗺️ Curriculum & Learning Roadmap

The repository follows an 8-phase deep-dive curriculum progression:

```

┌──────────────────────────────────────┐
│ Phase 1: Bedrock & Foundations       │ ──► Variables, Memory Layout, Coercion, Iteration
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│ Phase 2: Functions & Execution Scope │ ──► Call Stack, Contexts, Hoisting, TDZ, Closures
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│ Phase 3: Data Structures & ES6+      │ ──► V8 Object Layout, Iterators, Maps/Sets, Serialization
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│ Phase 4: Browser DOM & Event Models  │ ──► DOM/CSSOM, Propagation, Delegation, BOM, Storage
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│ Phase 5: Object-Oriented JS          │ ──► 'this' Binding, Prototypes, OOP Patterns, ES6 Classes
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│ Phase 6: Asynchronous Engineering    │ ──► Promises, Combinators, Async/Await, V8 Event Loop
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│ Phase 7: Advanced Architectures      │ ──► Modules, Functional JS, Generators, Metaprogramming
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│ Phase 8: Hardcore Under-The-Hood     │ ──► V8 Compiler, Memory Allocations, Workers, ArrayBuffers, WASM
└──────────────────────────────────────┘

```

## 📖 Core Concepts Index

This repository covers everything from fundamental syntax to low-level engine specifications. Detailed technical write-ups for each concept are available in the [`/Notes`](./Notes) directory across 8 structured phases:

<details>
<summary><b>01 - 03. Language Foundations & Execution Mechanics</b></summary>

- 🔹 **Basics (`/01_basics` & `Notes/phase-1-bedrock`):** Variables, Data Types, Stack vs. Heap Allocation, Implicit Coercion, Strings, Math, and Dates.
- 🔹 **Core Structures (`/02_basics` & `Notes/phase-3-data-structures-es6`):** Arrays, Objects, Maps, Sets, Destructuring, and V8 Internal Layouts.
- 🔹 **Functions & Scope (`/03_basics` & `Notes/phase-2-functions-scope`):** First-class Functions, Scopes, `this` Keyword, Arrow Functions, IIFEs, Execution Context, Call Stack, Hoisting, TDZ, and Closures.

</details>

<details>
<summary><b>04 - 05. Control Flow, Logic & Iterations</b></summary>

- 🔹 **Control Flow (`/04_controlFlow`):** Conditional evaluation (`if/else`), Truthy vs Falsy coercion, and `switch` statements.
- 🔹 **Iterations (`/05_iterations`):** Loops (`for`, `while`, `do-while`), Matrix Traversal, `for...of`, `for...in`, `forEach`, and higher-order transformations (`filter`, `map`, `reduce`).

</details>

<details>
<summary><b>06 - 07. DOM Engine, BOM & Browser Events</b></summary>

- 🔹 **DOM Architecture (`/06_dom` & `Notes/phase-4-browser-dom-events`):** DOM & CSSOM Tree, Element Generation, and Browser Observation APIs (`IntersectionObserver`, `ResizeObserver`).
- 🔹 **Event Pipelines (`/07_events`):** Mouse, Keyboard, Form, and Custom Events, Lifecycle Hooks, Event Propagation Mechanics (Bubbling/Capturing), Event Delegation, and Event Loop integration.

</details>

<details>
<summary><b>08 - 09. Asynchronous Engineering & Object-Oriented JS</b></summary>

- 🔹 **Async Execution (`/08_asyncJS` & `Notes/phase-6-asynchronous-js`):** Sync vs Async execution, Promises, Async/Await, V8 Event Loop Engine, Promise Combinators, `AbortController`, and Network Fetch protocols.
- 🔹 **OOP Architectures (`/09_oop` & `Notes/phase-5-object-oriented-js`):** Dynamic `this` Context, Prototypal Inheritance, `Object.create()`, Blueprint Patterns, and ES6 Class Syntactic Sugar.

</details>

<details>
<summary><b>10 - 11. Advanced Paradigms, V8 Engine & Web APIs</b></summary>

- 🔹 **Advanced Concepts (`/10_advanced` & `Notes/phase-7-advanced-concepts`):** ESM Modules, Defensive Error Handling, Generators, Custom Iterators, Regular Expressions, Functional Programming Paradigms, and Metaprogramming (`Proxy`, `Reflect`).
- 🔹 **V8 Internals & Low-Level JS (`/11_advanced` & `Notes/phase-8-hardcore-under-the-hood`):** V8 Compiler Pipeline, Memory Allocation, Memory Leaks, Web Workers, `requestAnimationFrame`, `ArrayBuffers`, PWAs, and WebAssembly (WASM).
- 🔹 **Browser APIs Directory (`/browser-apis-directory`):** Hardware/Location, Media & Processing, Storage & Caching Pipelines, and Performance System Signals.

</details>

---

## 🛠️ Projects Showcase

Custom applications and micro-frameworks built with pure Vanilla JavaScript, DOM APIs, and Web Workers:

| Project Name                | Architecture & Key Technical Specs                                                                            |                           Source Directory                           |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------: |
| 🖼️ **Image Editor**         | Canvas manipulation, pixel processing, and multi-threaded calculations via Web Workers (`pixelWorker.js`).    |            [`./Projects/imgEditor`](./Projects/imgEditor)            |
| 🔄 **Reactive State Store** | Custom lightweight state management store built with pub/sub reactivity mechanisms.                           | [`./Projects/reactive-state-store`](./Projects/reactive-state-store) |
| 💻 **Tech Terminal**        | Terminal UI featuring an Event Bus engine, Viewport Engine, Data Normalizer, and Network Service.             |         [`./Projects/TechTerminal`](./Projects/TechTerminal)         |
| ⚡ **Vue Micro-Framework**  | Custom reactive UI framework containing a dynamic Template Compiler, Reactivity Observer, and Task Scheduler. |         [`./Projects/VueFramework`](./Projects/VueFramework)         |

---

## 📝 Practice Sheets & Problem Sets

Dedicated problem sets inside the [`/PracticeSheet`](./PracticeSheet) directory designed to test core execution mechanics, event loop timing, and memory models:

```text
PracticeSheet/
├── 01_after05.js                       # Logic & iteration exercises
├── sheet-2-execution-mechanics.js      # Call stack, execution contexts, hoisting & closures
├── sheet-3-async-event-loop.js         # Promises, microtask vs macrotask execution order
├── sheet-4-object-oriented-memory.js   # Prototype chains, 'this' resolution & memory allocations
└── sheet-5-low-level-dsa.js            # Algorithmic problem-solving & low-level data structures
```

## 🚀 How to Use & Run Locally

Want to test the code snippets, run practice sheets, or launch mini-projects on your local machine? Follow these simple steps:

### Prerequisites

Make sure you have Node.js and a code editor (like VS Code) installed:

- [Node.js](https://nodejs.org/) (v16.0 or higher recommended)
- [VS Code](https://code.visualstudio.com/)

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/everything-javascript.git](https://github.com/your-username/everything-javascript.git)
cd everything-javascript

```

### 2. Run Practice Sheets or Concept Files

You can execute any individual `.js` file directly in your terminal using Node.js:

```bash
# Example: Running a concept file
node 01-javascript-fundamentals/01-variables.js

# Example: Running a practice sheet
node 07-practice-sheets/02-array-methods-mastery.js

```

### 3. Run Mini-Projects (DOM / Web Apps)

For DOM projects, open the `index.html` file in your browser, or use VS Code's **Live Preview** extension:

```bash
# Navigate to a project folder
cd 08-mini-projects/todo-app

# If using npx live-server:
npx live-preview

```

---

## 👨‍💻 Author & Connect

**Built by Manoj Kumar Patel**

---

## 📜 License

This repository is licensed under the **MIT License** — you are free to use, modify, and learn from this code for personal or commercial projects. See the [LICENSE](https://www.google.com/search?q=LICENSE) file for more details.
