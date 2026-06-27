const createObserver = (rawObject, callback) => {
    const handler = {
        get(target, prop) {
            console.log("Got it for you!");
            const value = Reflect.get(target, prop)
            if ((typeof value) === "object" && (value != null)) {
                return createObserver(value, callback)
            } else {
                return value;
            }
        },

        set(target, prop, value) {
            console.log("Setting it");
            const success = Reflect.set(target, prop, value);

            if (success) {
                callback(prop, value);
            }
            return success;
        }
    };

    return new Proxy(rawObject, handler);
};

export { createObserver };