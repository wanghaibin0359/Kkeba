export default {
    props: {
        to: {
            type: String,
            required: true
        }
    },
    render: function (h) {
        return h("a", {
            attrs: {
                href: '#' + this.to,

            },
            class: "Asdf"
        }, this.$slots.default)
    }
}