<template>
    <div>
        <h3>KForm表单</h3>
        <hr />
        <k-form :model="userInfo" :rules="rules" ref="form">
            <k-form-item label="用户名" prop="username">
                <k-input v-model="userInfo.username"></k-input>
            </k-form-item>
            <k-form-item label="密码" prop="password">
                <k-input v-model="userInfo.password"></k-input>
            </k-form-item>
        </k-form>
        <button @click="onClick">提交</button>
        {{userInfo}}
    </div>
</template>

<script>
import KForm from "./form";
import KInput from "./Kinput";
import KFormItem from "./KFormItem";
import Create from "../../util/create";
import Notice from "../Notice";
export default {
    provide() {
        return {
            form: this
        };
    },
    components: {
        KForm,
        KInput,
        KFormItem
    },
    data() {
        return {
            userInfo: {
                username: "tom",
                password: ""
            },
            rules: {
                username: [{ required: true, message: "请输入用户名称" }],
                password: [{ required: true, message: "请输入密码" }]
            }
        };
    },

    created() {},
    mounted() {},
    methods: {
        onClick() {
            this.$refs.form.validator(boolean => {
                if (boolean) {
                    Create(Notice, {
                        title: "成功",
                        message: "登陆成功，"
                    }).show();
                } else {
                    Create(Notice, {
                        title: "失败了把，",
                        message: "失败了把，"
                    }).show();
                }
            });
        }
    }
};
</script>

<style scoped lang="less">
</style>
