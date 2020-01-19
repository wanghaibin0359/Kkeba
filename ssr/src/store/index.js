import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: { count: 1 },
    mutations: {
      add(state,count) {
        state.count = count+state.count
      }
    },
    actions: {
      add({ commit}) {
        return new Promise(resolve => {
          setTimeout(() => {
            commit("add", 10)
            resolve()
          },1000)
        })
      }
    },
    modules: {}
  })
}