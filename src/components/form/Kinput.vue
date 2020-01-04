<template>
    <div>
        <input type="text" :value="value" @input="onInput" />
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      }
    },
    created() {},
    mounted() {},
    methods: {
        onInput(e){
            this.$emit("input",e.target.value)
            this.$parent.validator()
        }
    }
};
</script>

<style scoped lang="less">
</style>
