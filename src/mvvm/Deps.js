class Dep{
    constructor() {
        this.watchs =[]
    }
    addDep(watch) {
         this.watchs.push(watch)
    }
    notify() {
          this.watchs.map(watch => watch.update())
    }
}