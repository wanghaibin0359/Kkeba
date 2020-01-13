let p = Promise.resolve(),
    queue = [],
    pending = false
let timerFn = () => {
    p.then(flushCallback)
}

function flushCallback() {
    pending = false
    queue.forEach(cb => {
        cb()
    })
}

function nextTieck(cb, ctx) {
    queue.push(() => {
        cb.call(ctx)
    })
    if (!pending) {
        pending = true
        timerFn()
    }
}