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

function copyArrayProto(arr) {
    let sourceArray = Array.prototype;
    arr.__proto__ = Object.create(sourceArray);
    // arr.push(),需要进行相应  push,shift,pop,unshift
    ["push", "shift", "pop", "unshift"].forEach(key => {
        let fn = sourceArray[key]
        arr[key] = function (...arg) {
            //触发更新函数
            console.log("进行了数组方法")
            fn.apply(this,arg)
        }
    })
    let keys = Object.keys(arr)
    for (let i = 0; i < arr.length; i++){
        observe(obj)
    }
}