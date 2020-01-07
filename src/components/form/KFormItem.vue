<template>
    <div>
        <label v-if="label">{{label}}</label>
        <slot></slot>
        <p v-if="error">{{error}}</p>
    </div>
</template>

<script>
import Schema from "async-validator";
export default {
    componentName:"KFormItem",
    name:"KFormItem",
    inject: ["form"],
    props: {
        label: {
            // 输入项标签
            type: String,
            default: ""
        },
        prop: {
            // 字段名
            type: String,
            default: ""
        }
    },
    data() {
        return {
            error: ""
        };
    },
    created() {},
    mounted() {
        this.$on("validator", () => {
            this.validator();
        });
    },
    methods: {
        validator() {
            let { model, rules: role } = this.form;
            let myModel = model[this.prop];
            let myRole = role[this.prop];

            var validator = new Schema({ [this.prop]: myRole });
            return validator.validate({ [this.prop]: myModel }, errors => {
                if (errors) {
                    this.error = errors[0].message;
                } else {
                    this.error = "";
                }
            });
        }
    }
};
</script>

<style scoped lang="less">
</style>
