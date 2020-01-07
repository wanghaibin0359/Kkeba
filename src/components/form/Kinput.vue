<template>
    <div>
        <input type="text" :value="value" @input="onInput" />
    </div>
</template>

<script>
import emitter from "@/mixin/emitter.js";
export default {
    mixins: [emitter],
    data() {
        return {};
    },
    props: {
        value: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: "text"
        }
    },
    created() {},
    mounted() {},
    methods: {
        onInput(e) {
            this.$emit("input", e.target.value);
            // this.$parent.validator()
            this.dispatch("KFormItem","validator","Asdf","Asdfdddd")
        }
    }
};
</script>

<style scoped lang="less">
</style>
