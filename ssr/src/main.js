import Vue from 'vue'
import App from './App.vue'

import {
  createRouter
} from './router'

import {
  createStore
} from './store'

Vue.mixin({
  beforeMount() {
    let {
      initData
    } = this.$options
    
      if (initData) {
        // 将获取数据操作分配给 promise
        // 以便在组件中，我们可以在数据准备就绪后
        // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
        this.dataPromise = initData({
          store: this.$store,
        });
      }
  }
})
export function createApp(context) {
  let router = createRouter()
  let store = createStore()
  let app = new Vue({
    router,
    context,
    store,
    render: h => h(App)
  })
  return {
    app,
    router,
    store
  }
}