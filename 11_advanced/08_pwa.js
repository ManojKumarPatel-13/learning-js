// ---------------------------------------------------------------------------------
// 📑 REGIME 1: WORKER SPECS MATRIX COMPARISON
// ---------------------------------------------------------------------------------
// * 1. DEDICATED WEB WORKERS: Bound to a single tab instance. Offloads heavy math,
//      physics loops, and parsing tasks from the Main UI Thread stack.
// * 2. SERVICE WORKERS: Background network proxies. Decoupled from tab lifecycles.
//      Intercepts HTTP requests, handles caching, and enables offline capability.

// ---------------------------------------------------------------------------------
// 🧪 SERVICE WORKER CORE BOILERPLATE (PWA OFFLINE ENGINE)
// ---------------------------------------------------------------------------------

// === FILE: COMPONENT-BOOT.JS (Main UI Thread Initialization) ===
function initializeProgressiveServiceEngine() {
    // Check if the browser platform supports service worker infrastructure
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("./service-network-proxy.js")
                .then(registration => {
                    console.log(`🛡️ SW Registration verified inside scope: ${registration.scope}`);
                })
                .catch(err => {
                    console.error(`🚨 SW Registration crashed: ${err}`);
                });
        });
    }
}

// === FILE: SERVICE-NETWORK-PROXY.JS (Isolated Service Worker Runtime Scope) ===
const CACHE_VERSION_NAME = "v1_core_architecture";
const IMMUTABLE_ASSET_MANIFEST = [
    "/index.html",
    "/styles/core-layout.css",
    "/scripts/main.js",
    "/assets/system-matrix-logo.png"
];

// 1. THE INSTALLATION EVENT: Allocate storage and pre-cache static layout shells
self.addEventListener("install", (event) => {
    console.log("[SW] Intercepting Installation. Compiling cache assets...");

    // Force the service worker to skip waiting and activate immediately
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_VERSION_NAME).then((cacheStorage) => {
            // Atomic write: downloads and stores all manifest files inside local storage
            return cacheStorage.addAll(IMMUTABLE_ASSET_MANIFEST);
        })
    );
});

// 2. THE ACTIVATION EVENT: Clean up outdated cache structures from old builds
self.addEventListener("activate", (event) => {
    console.log("[SW] Intercepting Activation. Purging obsolete cache rings...");

    // Instantly claim control of all active client pages/tabs
    event.waitUntil(self.clients.claim());

    event.waitUntil(
        caches.keys().then((cacheNamesList) => {
            return Promise.all(
                cacheNamesList.map((existingCacheName) => {
                    if (existingCacheName !== CACHE_VERSION_NAME) {
                        console.log(`[SW] Vaporizing Outdated Cache Ring: ${existingCacheName}`);
                        return caches.delete(existingCacheName);
                    }
                })
            );
        })
    );
});

// 3. THE FETCH ROUTING ENGINE: Enforcing Stale-While-Revalidate Routing Strategy
self.addEventListener("fetch", (event) => {
    // Only intercept standard GET request formats
    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Instantiate background network fetch pipeline immediately
            const backgroundNetworkFetch = fetch(event.request).then((networkResponse) => {
                // Ensure response is completely valid before caching
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
                    const responseCloneForCache = networkResponse.clone();
                    caches.open(CACHE_VERSION_NAME).then((cache) => {
                        // Silently update cache entry in background for next visit
                        cache.put(event.request, responseCloneForCache);
                    });
                }
                return networkResponse;
            }).catch(() => {
                console.warn("[SW] Host disconnected. Network fallback execution failed.");
            });

            // INSTANT RETURN VALUE: Return cache hit immediately for ultra-fast speeds.
            // Fall back to the pending network promise if cache is empty.
            return cachedResponse || backgroundNetworkFetch;
        })
    );
});

// ---------------------------------------------------------------------------------
// 🚨 ARCHITECTURAL CAP THEOREMS: TRANSFERS VS CLONING RETRIBUTION
// ---------------------------------------------------------------------------------
// * WEB WORKER TRAP: Transferring state between Web Workers and Main thread requires
//   structured cloning unless explicit ArrayBuffers are detached using Transferable arrays.
// * SERVICE WORKER TRAP: Service workers operate entirely in memory-isolated context. 
//   They cannot hold onto persistent variables because the browser can terminate them mid-flight
//   between network requests. All long-term states must be stored inside IndexedDB.
// =================================================================================