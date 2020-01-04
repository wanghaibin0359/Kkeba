<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    provide() {
        return {
            form: this
        };
    },
    props: {
        model: {
            type: Object,
            required: true
        },
        rules: {
            type: Object
        }
    },
    data() {
        return {};
    },
    created() {},
    mounted() {},
    methods: {
        validator(cb){
            let children = this.$children
            let promiseAll = children.filter(item=>item.prop).map(item=>item.validator())
            Promise.all(promiseAll).then(()=>{
                cb(true)
            }).catch(()=>{
                cb(false)
            })
        }
    }
};
</script>

<style scoped lang="less">
</style>
