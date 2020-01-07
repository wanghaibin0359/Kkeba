import routerLink from "./router-link"
import routerView from "./router-view"

let _Vue

class KRouter {
    constructor(options) {
        this.$options = options
        //_Vue.util.defineReactive(this, "current", "/")
        this.app = new _Vue({
            data: {
                current: "/"
            }
        })
        // this.current = "/"
        if (window) {
            window.addEventListener("hashchange", () => {
                this.app.current = window.location.hash.slice(1)
            })
            window.addEventListener("load", () => {
                this.app.current = window.location.hash.slice(1)
            })
        }

        this.mapRoute = {}
        options.routes.map(route => {
            this.mapRoute[route.path] = route.component
        })

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