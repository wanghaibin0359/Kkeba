let Vue

class Store {
    constructor(opts) {
        let {
            state,
            mutations,
            actions
        } = opts
        //因为需要响应式，所以state要做到响应
        this.state = new Vue({
            data: state
        })

        //this.state = state
        this.mutations = mutations
        this.actions = actions
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
    }
    commit(type,params) {
        this.mutations[type](this.state,params)
    }
    dispatch(type, params) {
        return this.actions[type](this, params)
    }
}

function install(_Vue) {
    Vue = _Vue


    _Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}
export default{
    Store,
    install
}