let Vue

class Store {
    constructor(opts) {
        let {
            state,
            mutations,
            actions,
            getters
        } = opts

        const computed = {}
        const store = this
        this.getters = {}
        Object.keys(getters).map(key => {
            computed[key] = function () {
                return getters[key](store.state)
            }
            Object.defineProperty(store.getters, key, {
                get: () => {
                    return store._vm[key]
                }
            })
        })

        //因为需要响应式，所以state要做到响应
        this._vm = new Vue({
            data: {
                $$state: state,
            },
            computed: computed
        })


        this.mutations = mutations
        this.actions = actions
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)


    }
    get state() {
        return this._vm._data.$$state
    }
    set state(val) {
        console.log("这样不好，你造吗？")
    }
    commit(type, params) {
        this.mutations[type](this.state, params)
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
export default {
    Store,
    install
}