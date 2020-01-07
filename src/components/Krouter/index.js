import routerLink from "./router-link"
import routerView from "./router-view"

let _Vue

class KRouter {
    constructor(options) {
        this.$options = options
        this.current = "/"
        if (window) {
            window.addEventListener("hashchange", () => {
                this.current = window.location.hash.slice(1)
            })
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