function defineReactive(object, key, val) {
    observe(val)
    const dep = new Dep()
    Object.defineProperty(object, key, {
        get() {
            Dep.target && dep.addDep(Dep.target)
            return val
        },
        set(newVal) {
            if (newVal != val) {
                val = newVal;
                dep.notify()
            }
        }
    })
}