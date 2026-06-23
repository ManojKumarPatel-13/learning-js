export default class asyncEventBus {
    constructor() {
        this.events = {}
    }

    on(eventname, callback) {
        if (!Object.hasOwn(this.events, eventname)) {
            this.events[eventname] = [];
        }
        this.events[eventname].push(callback)
    }

    emit(eventname, payload) {
        if (!Object.hasOwn(this.events, eventname)) {
            return
        }

        const myCallbacks = [...this.events[eventname]]
        const myPayLoad = payload ?? {}

        Promise.resolve().then(() => {
            myCallbacks.forEach(callback => {
                try {
                    if (typeof callback !== 'function') {
                        console.error("not a function")
                    } else {
                        callback(myPayLoad)
                    }
                } catch (err) {
                    console.error(err)
                }
            });
        })
    }
}

const bus = new asyncEventBus();

// Module A: Analytics Tracker
bus.on("post:clicked", (data) => {
    console.log(`[ANALYTICS]: Tracked click on item ID: ${data.id}`);
});

// Main Stream Execution
console.log("1. User scrolls dashboard...");

bus.emit("post:clicked", { id: "media_card_99", title: "Nebula Space Photo" });

console.log("2. Render next view layout updates...");