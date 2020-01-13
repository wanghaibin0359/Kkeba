// 1.watch  {update,run,}
let uuid=0
class Watch{
    constructor(vm, expOrFn) {
        this.vm = vm
        this.expOrFn = expOrFn
        this.uuid =uuid++
    }
    run() { 
        this.expOrFn.call(this.vm)
    }
    update() {
        queueWatcher(this)
    }    
}