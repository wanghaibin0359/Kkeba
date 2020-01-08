let watches =[]
class Watch{
    constructor(vm,key,cb) {
        this.vm = vm;
        this.exp =key
        this.cb = cb
        Dep.target = this
        this.vm[this.exp]
        Dep.target = null
    }
    update() {
        this.cb.call(this.vm,this.vm[this.exp])
    }
}