import Vue from "vue"

export default function (Component, props) {
    //使用extend
    const Comp = Vue.extend(Component)
    const comp = new Comp({
        propsData: props
    }).$mount()
    document.body.appendChild(comp.$el)
    comp.remove = () => {
        document.body.removeChild(comp.$el)
        comp.$destroy()
    }



    //这是创建一个新的实例，使用render函数，最终挂在body上
    // const vm = new Vue({
    //     render(h) {
    //         return h(Component, { props })
    //     }
    // }).$mount()
    // document.body.appendChild(vm.$el)
    // const comp = vm.$children[0]
    // comp.remove = () => {
    //     document.body.removeChild(vm.$el)
    //     vm.$destroy()
    // }
    return comp
}