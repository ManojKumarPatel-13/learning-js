// ---------------------------------------------------------------------------------
// 📑 THE CONCURRENCY TRANSMISSION MATRIX
// ---------------------------------------------------------------------------------
// * 1. STRUCTURED CLONE: Default allocation. Duplicates data objects completely.
//      High memory overhead, zero cross-thread data corruption risks.
// * 2. TRANSFERABLE OBJECTS: Zero-copy pointer handover. Instantly evacuates memory 
//      from the source thread and re-allocates ownership to the destination thread.
// * 3. SHAREDARRAYBUFFER: True parallel concurrency. Both threads point to the exact
//      same byte matrix in system RAM. Requires Atomics to eliminate race conditions.

// ---------------------------------------------------------------------------------
// 🧪 MULTI-THREADED IMPLEMENTATION BOILERPLATE (SHARED RETRIEVAL ENGINE)
// ---------------------------------------------------------------------------------

// === FILE: MAIN-THREAD.JS ===
class MultiThreadedOrchestrator {
    constructor() {
        // Allocate 4 Kilobytes of shared raw binary heap memory
        this.memoryAllocation = new SharedArrayBuffer(4096);

        // Wrap raw buffer in a 32-bit Signed Integer array view (1024 slots)
        this.typedDataMatrix = new Int32Array(this.memoryAllocation);

        this.computeWorker = new Worker(new URL("./matrix-worker.js", import.meta.url));
        this.establishCommunicationLink();
    }

    executeParallelAnalysis() {
        // Hydrate data matrix with initial values
        for (let i = 0; i < 10; i++) {
            this.typedDataMatrix[i] = i * 5;
        }

        console.log("[MAIN] Dispatching Shared Memory Pointer to Worker...");
        // Pass the raw SharedArrayBuffer reference. Zero serialization overhead!
        this.computeWorker.postMessage({ buffer: this.memoryAllocation });
    }

    establishCommunicationLink() {
        this.computeWorker.onmessage = (msg) => {
            if (msg.data.status === "COMPLETE") {
                // Read from the shared memory pool instantly updated by the worker
                console.log(`[MAIN] Sync verified. Index 0 value: ${Atomics.load(this.typedDataMatrix, 0)}`);
            }
        };
    }
}

// === FILE: MATRIX-WORKER.JS ===
// Running inside an entirely isolated background thread global scope
self.onmessage = function (event) {
    const { buffer } = event.data;

    // Bind the worker's local array view to the exact same shared memory pointer address
    const localDataView = new Int32Array(buffer);

    console.log("[WORKER] Shared memory connected. Initiating Atomics calculations...");

    for (let i = 0; i < 10; i++) {
        // 🚨 CRITICAL DEFENSE: Using Atomics to prevent race condition data corruptions.
        // Performs an atomic multiplication step directly on the raw memory address.
        Atomics.multiply(localDataView, i, 2);
    }

    // Signal back to main thread that the memory segment has been updated
    self.postMessage({ status: "COMPLETE" });
};

// ---------------------------------------------------------------------------------
// 📑 THE ATOMICS CORE REFERENCE HANDBOOK
// ---------------------------------------------------------------------------------
// * Atomics.load(array, index) 
//   -> Guarantees a clean, un-cached read of a memory location right from system RAM.
// * Atomics.store(array, index, value)
//   -> Writes a value instantly to memory, locking out intermediate thread interruptions.
// * Atomics.wait(typedArray, index, value, timeout)
//   -> Puts a worker thread to sleep until another thread modifies that memory cell.
//   -> 🚨 CRITICAL RULE: Atomics.wait can NOT be executed on the Main Thread (causes UI freeze).
// * Atomics.notify(typedArray, index, count)
//   -> Wakes up worker threads currently sleeping on a wait() lock at that index.
// =================================================================================