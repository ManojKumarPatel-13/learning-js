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
                    if (typeof callback === 'function') {
                        callback(myPayLoad)
                    }
                } catch (err) {
                    console.error(err)
                }
            });
        })
    }
}