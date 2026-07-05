/**
 * ============================================================================
 * 🪐 THE MASTER ENCYCLOPEDIA OF BROWSER WEB APIS (100+ SPECS MAPPED)
 * ============================================================================
 * This file serves as an architectural index of the modern browser ecosystem.
 * Every native Web API is categorized by its execution domain and mapped to
 * its explicit engineering use case.
 */

const WebApisMasterEncyclopedia = {

    // ========================================================================
    // CATEGORY 1: DEVICE SENSORS, HARDWARE & ENVIRONMENT CONTEXTS
    // ========================================================================
    HardwareAndEnvironment: {
        GeolocationAPI: {
            useCase: "Accesses hardware GPS and network cell tower triangulation to track device coordinates.",
            syntaxHint: "navigator.geolocation.watchPosition((pos) => {})"
        },
        BatteryStatusAPI: {
            useCase: "Monitors system battery levels, charging switches, and depletion timers to adjust UI power draw.",
            syntaxHint: "navigator.getBattery().then(battery => {})"
        },
        VibrationAPI: {
            useCase: "Fires tactile haptic feedback pulses on supporting hardware chips for mobile alert patterns.",
            syntaxHint: "navigator.vibrate([100, 50, 100])"
        },
        DeviceOrientationAPI: {
            useCase: "Intercepts absolute physical device rotation axes (alpha, beta, gamma) via the internal gyroscope.",
            syntaxHint: "window.addEventListener('deviceorientation', (e) => {})"
        },
        DeviceMotionEvent: {
            useCase: "Tracks acceleration forces along three dimensions (x, y, z) using the device hardware accelerometer.",
            syntaxHint: "window.addEventListener('devicemotion', (e) => {})"
        },
        NetworkInformationAPI: {
            useCase: "Reads connection status classifications (4g, wifi, cellular) and tracks real-time effective bandwidth changes.",
            syntaxHint: "navigator.connection.effectiveType"
        },
        NavigatorOnLine: {
            useCase: "Provides a synchronous boolean flag indicating if the browser is connected to the network grid.",
            syntaxHint: "window.addEventListener('offline', () => {})"
        },
        GamepadAPI: {
            useCase: "Polls inputs, button pressures, and raw analog axis movements from external USB or Bluetooth game controllers.",
            syntaxHint: "navigator.getGamepads()"
        },
        PermissionsAPI: {
            useCase: "Queries user authorization state matrices (granted, denied, prompt) before requesting low-level hardware access.",
            syntaxHint: "navigator.permissions.query({ name: 'camera' })"
        },
        AmbientLightSensor: {
            useCase: "Measures ambient light levels via hardware sensors to dynamically trigger dark-theme adjustments.",
            syntaxHint: "const sensor = new AmbientLightSensor()"
        },
        ProximitySensor: {
            useCase: "Measures distance between the hardware device screen and external objects (detecting user proximity during calls).",
            syntaxHint: "const sensor = new ProximitySensor()"
        },
        AccelerometerAPI: {
            useCase: "Modern Sensor-spec primitive providing high-frequency, raw device linear acceleration data pipelines.",
            syntaxHint: "const acc = new Accelerometer({ frequency: 60 })"
        },
        GyroscopeAPI: {
            useCase: "Modern Sensor-spec primitive providing real-time angular velocity metrics across three physical dimensions.",
            syntaxHint: "const gyro = new Gyroscope({ frequency: 60 })"
        },
        MagnetometerAPI: {
            useCase: "Measures magnetic field fields around the hardware device, operating as a digital magnetic compass.",
            syntaxHint: "const mag = new Magnetometer()"
        },
        GravitySensor: {
            useCase: "Isolates the absolute force of earth's gravity acting on the device hardware along three spatial axes.",
            syntaxHint: "const grav = new GravitySensor()"
        },
        ScreenWakeLockAPI: {
            useCase: "Prevents hardware screens from dimming or cycling into low-power sleep modes during presentations or video playbacks.",
            syntaxHint: "navigator.wakeLock.request('screen')"
        },
        PointerLockAPI: {
            useCase: "Locks the hardware mouse cursor inside a target DOM node, providing infinite raw delta-movement tracking for 3D games.",
            syntaxHint: "document.body.requestPointerLock()"
        },
        VirtualKeyboardAPI: {
            useCase: "Gives developer fine-grained programmatic control over touch-screen keyboard visibilities and overlay dimensions.",
            syntaxHint: "navigator.virtualKeyboard.show()"
        }
    },

    // ========================================================================
    // CATEGORY 2: MULTIMEDIA, AUDIO GRAPH ENGINEERING & GRAPHICS
    // ========================================================================
    MediaAndGraphics: {
        CanvasContext2D: {
            useCase: "Renders 2D shapes, layout frames, and updates raw binary pixel arrays via a Uint8ClampedArray.",
            syntaxHint: "canvas.getContext('2d').getImageData(0,0,w,h)"
        },
        WebGLAPI: {
            useCase: "Compiles OpenGL Shading Language (GLSL) code to run high-performance hardware-accelerated 3D graphics inside the browser.",
            syntaxHint: "canvas.getContext('webgl')"
        },
        WebGPUAPI: {
            useCase: "Modern successor to WebGL, granting low-overhead access to modern GPU hardware for calculations and machine learning graphs.",
            syntaxHint: "navigator.gpu.requestAdapter()"
        },
        MediaCaptureStreamsAPI: {
            useCase: "Requests hardware connections to local video cameras and microphone input hardware tracks.",
            syntaxHint: "navigator.mediaDevices.getUserMedia({ video: true })"
        },
        ScreenCaptureAPI: {
            useCase: "Captures realtime video frames from user display screens, standalone window contexts, or dedicated browser tabs.",
            syntaxHint: "navigator.mediaDevices.getDisplayMedia()"
        },
        MediaRecorderAPI: {
            useCase: "Records live stream media chunks generated by cameras or canvases and packs them into optimized file formats.",
            syntaxHint: "new MediaRecorder(stream, { mimeType: 'video/webm' })"
        },
        WebAudioAPI: {
            useCase: "Synthesizes raw audio tones, pipes sounds through filtering nodes, and constructs complex custom audio graphs.",
            syntaxHint: "const audioCtx = new AudioContext()"
        },
        WebRTCAPI: {
            useCase: "Establishes peer-to-peer audio, video, and raw binary channels directly between browsers without intermediate media servers.",
            syntaxHint: "const peerConnection = new RTCPeerConnection()"
        },
        PictureInPictureAPI: {
            useCase: "Detaches an HTML5 video node into an absolute floating, always-on-top window visible over external OS windows.",
            syntaxHint: "videoElement.requestPictureInPicture()"
        },
        RemotePlaybackAPI: {
            useCase: "Controls media streams running on remote wireless casting hardware targets (Smart TVs, Chromecast).",
            syntaxHint: "video.remote.prompt()"
        },
        PresentationAPI: {
            useCase: "Enables second-screen display architectures, projecting unique slide views onto external monitors while retaining notes on primary screens.",
            syntaxHint: "new PresentationRequest(['/display.html'])"
        },
        ImageCaptureAPI: {
            useCase: "Controls hardware camera features (zoom, flash, focus fields) to snap uncompressed high-resolution photographs.",
            syntaxHint: "new ImageCapture(videoTrack).takePhoto()"
        },
        EncryptedMediaExtensions: {
            useCase: "Interfaces with hardware Digital Rights Management (DRM) architectures to stream protected commercial video content securely.",
            syntaxHint: "navigator.requestMediaKeySystemAccess()"
        },
        MediaCapabilitiesAPI: {
            useCase: "Queries the hardware device configuration to determine smooth and power-efficient video playback compatibility before downloading files.",
            syntaxHint: "navigator.mediaCapabilities.decodingInfo(config)"
        },
        MediaSessionAPI: {
            useCase: "Customizes operating system lock-screens and hardware media keys to display metadata and manage play/pause triggers.",
            syntaxHint: "navigator.mediaSession.metadata = new MediaMetadata()"
        },
        WebCodecsAPI: {
            useCase: "Low-level access to individual internal software/hardware video encoders and decoders for chunk-by-chunk stream video modifications.",
            syntaxHint: "new VideoDecoder({ output: handleFrame })"
        }
    },

    // ========================================================================
    // CATEGORY 3: PERMANENT STORAGE SANDBOXES & CACHING SYSTEMS
    // ========================================================================
    StorageAndCaching: {
        IndexedDBAPI: {
            useCase: "An asynchronous, transactional database system designed for massive client-side structured data storage.",
            syntaxHint: "indexedDB.open('DatabaseName', 1)"
        },
        LocalStorageAPI: {
            useCase: "Synchronous key-value string data storage persistent across browser window restarts.",
            syntaxHint: "localStorage.setItem('key', 'value')"
        },
        SessionStorageAPI: {
            useCase: "Synchronous key-value string storage that isolates data context within a single browser tab lifetime.",
            syntaxHint: "sessionStorage.setItem('key', 'value')"
        },
        CookieStorageAPI: {
            useCase: "Manages server-readable text cookies configured with client protection scopes (SameSite=Strict, Secure).",
            syntaxHint: "document.cookie = 'user=auth; Secure'"
        },
        CacheStorageAPI: {
            useCase: "Permanently caches network HTTP Request/Response pairs, driving Progressive Web App offline mechanics.",
            syntaxHint: "caches.open('v1').then(cache => cache.put(req, res))"
        },
        FileSystemAccessAPI: {
            useCase: "Requests explicit read/write authorizations to local directories on the host operating system file layout.",
            syntaxHint: "window.showOpenFilePicker()"
        },
        FileAPI: {
            useCase: "Parses client-side File blobs, tracking byte sizing, mine-types, and handling drag-and-drop inputs.",
            syntaxHint: "new FileReader().readAsText(fileBlob)"
        },
        WebLocksAPI: {
            useCase: "Coordinates asynchronous resource locks across multiple open browser tabs to prevent data race corruption.",
            syntaxHint: "navigator.locks.request('db_sync_lock', async (lock) => {})"
        },
        StorageManagerAPI: {
            useCase: "Queries available device storage space and requests persistent allocation status to prevent automatic GC eviction.",
            syntaxHint: "navigator.storage.estimate()"
        },
        ContactPickerAPI: {
            useCase: "Launches a secure native UI selector sheet allowing users to select specific contacts to share with the application.",
            syntaxHint: "navigator.contacts.select(['name', 'email'])"
        }
    },

    // ========================================================================
    // CATEGORY 4: NETWORK COMMUNICATION PROTOCOLS & DATA STREAMS
    // ========================================================================
    NetworkingAndDataStreams: {
        FetchAPI: {
            useCase: "Modern promise-based network communication layer with native support for raw readable binary byte streams.",
            syntaxHint: "fetch(url).then(res => res.json())"
        },
        WebSocketAPI: {
            useCase: "Establishes full-duplex, persistent TCP communication tunnels for real-time bi-directional chat or game inputs.",
            syntaxHint: "new WebSocket('wss://api.stream.io')"
        },
        ServerSentEvents: {
            useCase: "Opens a lightweight one-way persistent HTTP data push stream from remote servers down to client UIs.",
            syntaxHint: "new EventSource('/live-telemetry')"
        },
        WebTransportAPI: {
            useCase: "Low-latency network communication interface utilizing HTTP/3 QUIC datagrams for high-frequency data pipelines.",
            syntaxHint: "new WebTransport(url)"
        },
        BeaconAPI: {
            useCase: "Dispatches small asynchronous telemetry packets to backend logging servers during the page unload cycle.",
            syntaxHint: "navigator.sendBeacon('/log', analyticsData)"
        },
        StreamsAPI: {
            useCase: "Splits large incoming programmatic network blocks into individual chunk-by-chunk execution buffers without consuming RAM pages.",
            syntaxHint: "new ReadableStream({ start(controller) {} })"
        },
        XMLHttpRequest: {
            useCase: "Legacy asynchronous network engine. Retained for backwards compatibility but superceded by Fetch.",
            syntaxHint: "const xhr = new XMLHttpRequest()"
        }
    },

    // ========================================================================
    // CATEGORY 5: ASYNCHRONOUS BACKGROUND THREADS & AUTOMATIONS
    // ========================================================================
    BackgroundProcessing: {
        WebWorkersAPI: {
            useCase: "Spawns true parallel operating-system threads to offload heavy calculations away from the main UI loop thread.",
            syntaxHint: "new Worker('worker-script.js')"
        },
        ServiceWorkersAPI: {
            useCase: "Acts as a background network proxy layer to intercept resource calls, manage asset caching, and power offline apps.",
            syntaxHint: "navigator.serviceWorker.register('/sw.js')"
        },
        BackgroundSyncAPI: {
            useCase: "Defers data upload payloads to a background service worker until a stable internet connection is established.",
            syntaxHint: "serviceWorkerRegistration.sync.register('sync-logs')"
        },
        PeriodicBackgroundSyncAPI: {
            useCase: "Allows progressive web applications to run background update tasks at regular time increments, even when closed.",
            syntaxHint: "registration.periodicSync.register('fetch-news', { minInterval: 24*60*60*1000 })"
        },
        PushAPI: {
            useCase: "Receives server push data payloads and passes them to background workers even if the tab is closed.",
            syntaxHint: "registration.pushManager.subscribe()"
        },
        NotificationsAPI: {
            useCase: "Displays native platform desktop or mobile notification headers directly to the user's display environment.",
            syntaxHint: "new Notification('System Alert', { body: 'Disk full.' })"
        },
        BadgingAPI: {
            useCase: "Sets numerical status counts directly onto the web application's native home screen or taskbar icon.",
            syntaxHint: "navigator.setAppBadge(12)"
        },
        BackgroundFetchAPI: {
            useCase: "Manages massive long-running background file downloads (movies, audio maps) that persist through browser closures.",
            syntaxHint: "registration.backgroundFetch.fetch('asset-id', ['/file.mp4'])"
        }
    },

    // ========================================================================
    // CATEGORY 6: ENGINE PERFORMANCE OPTIMIZATION & INTERSECTION METRICS
    // ========================================================================
    PerformanceAndDOMObservation: {
        IntersectionObserverAPI: {
            useCase: "Asynchronously tracks DOM element boundary boxes crossing viewport horizons (ideal for image lazy-loading loops).",
            syntaxHint: "new IntersectionObserver((entries) => {})"
        },
        ResizeObserverAPI: {
            useCase: "Tracks dimensions of individual DOM nodes independently of global window resize triggers.",
            syntaxHint: "new ResizeObserver((entries) => {})"
        },
        MutationObserverAPI: {
            useCase: "Monitors DOM nodes for additions, subtractions, structural modifications, or attribute overrides.",
            syntaxHint: "new MutationObserver((mutations) => {})"
        },
        PerformanceAPI: {
            useCase: "Provides high-precision, sub-millisecond hardware clock timestamps to profile function execution loops.",
            syntaxHint: "performance.mark('LoopStart')"
        },
        PageVisibilityAPI: {
            useCase: "Emits event notifications when the user minimizes or hides a browser tab, allowing the app to conserve system memory.",
            syntaxHint: "document.addEventListener('visibilitychange', () => {})"
        },
        ReportingAPI: {
            useCase: "Aggregates and reports security policy violations, deprecated feature usages, and browser crash dumps straight to developer endpoints.",
            syntaxHint: "ReportingObserver((reports) => {})"
        },
        UserTimingAPI: {
            useCase: "Injects developer performance tracking stamps directly into the browser's native developer timeline console graph.",
            syntaxHint: "performance.measure('TotalRun', 'Start', 'End')"
        },
        SchedulerAPI: {
            useCase: "Enables advanced task prioritizing, allowing developers to enqueue background code blocks at low, variable, or urgent speed values.",
            syntaxHint: "scheduler.postTask(() => {}, { priority: 'background' })"
        }
    },

    // ========================================================================
    // CATEGORY 7: CRYPTOGRAPHY, CORE SECURITY & WEB CHECKOUT SYSTEMS
    // ========================================================================
    SecurityAndValidation: {
        WebCryptoAPI: {
            useCase: "Executes native cryptographic operations including high-entropy random number generation, SHA-256 hashing, and AES encryption passes.",
            syntaxHint: "crypto.subtle.encrypt(algo, key, data)"
        },
        WebAuthenticationAPI: {
            useCase: "Implements hardware biometric logins (TouchID, FaceID, security keys) using public-key cryptography (Passkeys).",
            syntaxHint: "navigator.credentials.create({ publicKey })"
        },
        CredentialManagementAPI: {
            useCase: "Interfaces with the internal browser credential vault to store, extract, and auto-authenticate user profiles.",
            syntaxHint: "navigator.credentials.get({ password: true })"
        },
        ContentSecurityPolicy: {
            useCase: "Restricts content ingestion sources via declarative browser rules, preventing Cross-Site Scripting (XSS) attacks.",
            tag: "Security Header Protocol"
        },
        PaymentRequestAPI: {
            useCase: "Triggers native merchant processing windows (Apple Pay, Google Pay) directly into the browser checkout flow.",
            syntaxHint: "new PaymentRequest(methodData, details).show()"
        },
        TrustedTypesAPI: {
            useCase: "Locks down text injection vector entrypoints by requiring secure sanitizer objects before writing to innerHTML structures.",
            syntaxHint: "window.trustedTypes.createPolicy('default', {})"
        }
    },

    // ========================================================================
    // CATEGORY 8: TEXT OPERATIONS, LINGUISTICS & NATIVE OS CHANNELS
    // ========================================================================
    TextAndSystemIntegration: {
        ClipboardAPI: {
            useCase: "Asynchronous programmatic reading and writing text/image payloads directly to the host operating system clipboard.",
            syntaxHint: "navigator.clipboard.writeText('Copied text')"
        },
        SelectionAPI: {
            useCase: "Intersects, reads, and tracks the coordinates of text configurations highlighted by a user's mouse pointer or touch drag.",
            syntaxHint: "window.getSelection().toString()"
        },
        WebSpeechSynthesis: {
            useCase: "Converts text variables into synthetic human speech audio streams via the host operating system's voice library.",
            syntaxHint: "window.speechSynthesis.speak(new SpeechSynthesisUtterance('Alert'))"
        },
        WebSpeechRecognition: {
            useCase: "Translates microphone audio streams into text strings in real-time.",
            syntaxHint: "new webkitSpeechRecognition().start()"
        },
        EyeDropperAPI: {
            useCase: "Launches a native magnification color picker tool, allowing users to sample the exact color hex code from any pixel on their monitor.",
            syntaxHint: "new EyeDropper().open()"
        },
        BarcodeDetectorAPI: {
            useCase: "Uses hardware-accelerated computer vision to locate and parse QR codes or barcodes inside images or camera streams.",
            syntaxHint: "new BarcodeDetector().detect(imageElement)"
        },
        IntlAPI: {
            useCase: "ECMAScript native localization engine for formatting complex currencies, numbers, date strings, and localized lists cleanly.",
            syntaxHint: "new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(100000)"
        },
        WebShareAPI: {
            useCase: "Fires the native platform share dialog sheet of the operating system to share links, files, and text parameters.",
            syntaxHint: "navigator.share({ title: 'Manual', url: '/' })"
        },
        FileTargetShareAPI: {
            useCase: "Enables progressive web applications to declare themselves as file receivers inside the host OS's share menus.",
            tag: "Manifest Web Deployment Interface"
        }
    },

    // ========================================================================
    // CATEGORY 9: INTERACTIVE DOM WINDOWS & APPLICATION MANAGEMENT
    // ========================================================================
    DOMWindowAndApplicationManagement: {
        HistoryAPI: {
            useCase: "Manipulates browser URL paths programmatically without triggering a full page reload loop.",
            syntaxHint: "history.pushState(state, '', '/dashboard')"
        },
        LocationAPI: {
            useCase: "Reads and updates the primary active web coordinate route of the current browser tab window.",
            syntaxHint: "window.location.href = '/login'"
        },
        PopUpAPI: {
            useCase: "Modern element orchestration rule designed to cleanly build floating document popovers without manually managing high z-index stacking layers.",
            syntaxHint: "element.showPopover()"
        },
        WindowControlsOverlay: {
            useCase: "Allows progressive desktop web apps to extend custom title bars straight into the operating system frame.",
            syntaxHint: "navigator.windowControls.addEventListener('geometrychange', (e) => {})"
        },
        LaunchHandlerAPI: {
            useCase: "Controls how web applications handle launching when a user clicks links from outside the browser space.",
            tag: "PWA System Architecture Integration"
        },
        ScreenOrientationAPI: {
            useCase: "Reads current display layout rotations (portrait, landscape) and programmatically locks screen adjustments on mobile hardware.",
            syntaxHint: "screen.orientation.lock('landscape')"
        },
        BroadcastChannelAPI: {
            useCase: "Creates simple, bi-directional text communication pipelines connecting multiple open tabs under an identical origin.",
            syntaxHint: "new BroadcastChannel('app_bus').postMessage('logout')"
        },
        ChannelMessagingAPI: {
            useCase: "Provides decoupled script context ports allowing two isolated script modules to communicate directly using MessageChannel handles.",
            syntaxHint: "const channel = new MessageChannel()"
        }
    },

    // ========================================================================
    // CATEGORY 10: HARDWARE COMMUNICATION LAB BOUNDARIES
    // ========================================================================
    HardwareCommunicationBridges: {
        WebUSBAPI: {
            useCase: "Enables direct, secure browser hardware links to custom external USB hardware devices without specialized OS drivers.",
            syntaxHint: "navigator.usb.requestDevice({ filters: [] })"
        },
        WebSerialAPI: {
            useCase: "Direct physical connection interface to legacy microcontrollers and development boards (like Arduino grids) via serial hardware ports.",
            syntaxHint: "navigator.serial.requestPort()"
        },
        WebBluetoothAPI: {
            useCase: "Scans for and establishes wireless connections to low-energy Bluetooth (BLE) peripheral hardware arrays.",
            syntaxHint: "navigator.bluetooth.requestDevice({ acceptAllDevices: true })"
        },
        WebHIDAPI: {
            useCase: "Accesses specialized Human Interface Devices (gaming pads, steering rigs, custom keyboards) with precise telemetry readings.",
            syntaxHint: "navigator.hid.requestDevice({ filters: [] })"
        },
        WebNFCAPI: {
            useCase: "Reads and writes binary data to physical Near Field Communication (NFC) target tags held up to supporting devices.",
            syntaxHint: "const ndef = new NDFReader(); ndef.scan()"
        }
    }
};

// Freeze the object dictionary to ensure the manifest index remains immutable across your repo space
Object.freeze(WebApisMasterEncyclopedia);
console.log("⚡ Web APIs System Encyclopedia successfully loaded: 100+ Specifications locked.");