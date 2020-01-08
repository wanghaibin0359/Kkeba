import routerLink from "./router-link"
import routerView from "./router-view"

let _Vue

class KRouter {
    constructor(options) {
        this.index = 0
        this.$options = options
        _Vue.util.defineReactive(this, "matched", [])
        // _Vue.util.defineReactive(this, "current", "/")
        this.current = window.location.hash.slice(1) || "/"
        if (window) {
            window.addEventListener("hashchange", () => {
                this.matched = []
                this.current = window.location.hash.slice(1) || "/"
                this.match()
            })
            window.addEventListener("load", () => {
                this.current = window.location.hash.slice(1) || "/"
            })
        }

        // this.mapRoute = {}
        // options.routes.map(route => {
        //     this.mapRoute[route.path] = route.component
        // })
        this.match()

    }
    match(routes = this.$options.routes) {

        for (const route of routes) {
            if (route.path == "/" && this.current == '/') {
                this.matched.push(route)
                return
            }
            if (route.path != "/" && this.current.indexOf(route.path) > -1) {
                this.matched.push(route)
                if (route.children) {
                    this.match(route.children)
                }
                return
            }
        }
    }
}



KRouter.install = function (Vue) {
    _Vue = Vue
    _Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                _Vue.prototype.$router = this.$options.router
            }
        }
    })
    _Vue.component("router-link", routerLink)
    _Vue.component("router-view", routerView)
}

export default KRouter