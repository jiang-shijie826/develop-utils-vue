<template>
    <div class="content">
        <div class="left">
            <img src="../assets/login/img2.png" class="people p-animtion" alt="people">
            <img src="../assets/login/img1.png" class="sphere s-animtion" alt="sphere">
        </div>
        <div class="right">
            <div class="form-wrappepr">
                <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                    <el-tab-pane label="登录" name="first">
                        <input v-model="user.account" class="inputs user" placeholder="邮箱/手机号码" type="context">
                        <input v-model="user.password" class="inputs pwd" placeholder="密码" type="password">
                        <span class="tips">忘记密码</span>
                        <button @click="Login(user)">登录</button>
                    </el-tab-pane>
                    <el-tab-pane label="注册" name="second">
                        <!-- <CountrySelect style="margin-left:40px;" ref="child" selected="cn" top="jp,us,gb"></CountrySelect>   -->
                        <input v-model="user.account" class="inputs user" placeholder="邮箱" type="context">
                        <input v-model="user.password" class="inputs pwd" placeholder="设置密码" type="password">
                        <!-- <input v-model="user.password" class="inputs pwd" placeholder="再次确认密码" type="password"> -->
                        <button @click="Login(user)">注册</button>
                    </el-tab-pane>
                </el-tabs>
                <div class="other-login">
                    <div class="divider">
                        <span class="line"></span>
                        <span class="divider-text">其他方式登录</span>
                        <span class="line"></span>
                    </div>
                    <div class="other-login-wrapper">
                        <div class="other-login-item">
                            <img src="../assets/login/QQ.png" alt="QQ">
                        </div>
                        <div class="other-login-item">
                            <img src="../assets/login/WeChat.png" alt="WeChat">
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import "../style/login/style.css";
import { ElMessage } from "element-plus";
import { ref, reactive } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import CountrySelect from '../components/CountrySelect.vue'

const input1 = ref('')

//默认国家地区号
const value = ref('86')
type userType = {
    account: string;
    password: string;
}

const user = reactive<userType>({
    account: '',
    password: ''
})

const Login = (userInput: userType): void => {
    if (userInput.account == 'admin' && userInput.password == '123') {
        ElMessage({
            showClose: true,
            message: "登录成功"
        });
    } else if (userInput.account == '') {
        ElMessage({
            showClose: true,
            message: "请输入帐号！"
        });
    } else if (userInput.password == '') {
        ElMessage({
            showClose: true,
            message: "请输入密码！"
        });
    } else {
        ElMessage({
            showClose: false,
            message: "用户名或密码错误！"
        });
    }

};
//标签页
const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
</script>

<style>
.el-tabs__item {
    font-size: 20px;
}

.input-with-select .el-input-group__prepend {
    background-color: var(--el-fill-color-blank);
}
</style>