export default {
    render: function (h) {
        let {
            current,
            mapRoute
        } = this.$router;

        this.$vnode.data.routerView = true
        let parent = this.parent
        let dept = 0
        while (parent) {
            const vnodeData = parent.$vnode && parent.$vnode.data
            if (vnodeData &&vnodeData.routerView) {
                  dept++
            }
            parent = parent.parent
        }
        console.log(dept)



        let comp
        const route = this.$router.matched[dept]
        if (route) {
            comp = route.component
        }
        return h(comp)
    }
}