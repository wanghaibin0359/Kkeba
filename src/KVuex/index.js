let Vue

export default class Store {
    constructor(opts) {

    }
}
Store.install = function (_Vue) {
    Vue = _Vue.prototype.$store

    _Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                _Vue.prototype.$store = this.$options.store
            }
        }
    })
}