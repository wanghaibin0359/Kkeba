let watchQueue = [],
    has = {},
    index = 0,
    wating = false

function queueWatcher(watch) {
    if (!has[watch.uuid]) {
        index++
        has[watch.uuid] = true
        watchQueue.push(watch)
        if (!wating) {
            wating = true
            nextTieck(flushSchedulerQueue)
        }
    }
}

function flushSchedulerQueue() {
    watchQueue.forEach(watch => {
        watch.run()
    })
}