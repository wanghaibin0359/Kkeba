import Vue from 'vue'
import Vuex from './KVuex/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increase(state) {
      state.count++
    }
  },
  actions: {
    increase({
      commit
    }) {
      setTimeout(function () {
        commit("increase")
      }, 1000)
    }
  }
})