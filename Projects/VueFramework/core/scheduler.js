const queue = new Set();
let isFlushing = false;

const queueJob = (callback) => {
    queue.add(callback)

    if (!isFlushing) {
        isFlushing = true;
        queueMicrotask(() => {
            const jobsToFlush = Array.from(queue)

            queue.clear()

            jobsToFlush.forEach(job => job());

            isFlushing = false;
        })
    }
}

export { queueJob }