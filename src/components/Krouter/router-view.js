export default {
    render: function (h) {
        let {
            app,
            mapRoute
        } = this.$router;

        let comp = mapRoute[app.current] || null
        return h(comp)
    }
}