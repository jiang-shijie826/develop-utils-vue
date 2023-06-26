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
                        <button @click="Login(user)">登录</button>
                        <span class="tips">忘记密码</span>
                    </el-tab-pane>
                    <el-tab-pane label="注册" name="second">
                        <!-- <CountrySelect style="margin-left:40px;" ref="child" selected="cn" top="jp,us,gb"></CountrySelect>   -->
                        <input v-model="user.account" class="inputs user" placeholder="邮箱" type="context">
                        <input v-model="user.password" class="inputs pwd" placeholder="设置密码" type="password">
                        <input v-model="user.againPassword" class="inputs pwd" placeholder="再次确认密码" type="password">
                        <input v-model="user.checkCode" class="inputs user" placeholder="验证码" type="context">
                        <!-- 重新发送 60S 置灰  -->
                        <span class="code" :style="codeStyle" @click="sendCode(user.account)">
                            {{codeNum==60 ? "获取验证码" : "重新发送 " + codeNum + 'S'}}
                        </span>
                        <button @click="Register(user)">注册</button>
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
import { ref, reactive, onMounted } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { userLogin, getCode, registerUser } from "../http/data/index.js"
import {useRouter} from 'vue-router'

//默认国家地区号
const value = ref('86')

const user = reactive({
    account: '',
    password: '',
    againPassword: '',
    checkCode: '',
})

const router=useRouter()
const Login = (user: any): void => {
    userLogin(user).then((res: any) => {
        if (res.status == 1) {
            ElMessage({
                showClose: true,
                message: res.msg
            });
            //跳转页面
            router.push({ name: 'Admin', params: { account: user.account }});
        } else if (res.status == -1) {
            ElMessage({
                showClose: true,
                message: res.msg
            });
        }
    })
};
//标签页
const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}

//获取验证码样式
const get = 'rgb(92, 122, 213)';
//重新发送倒计时样式
const again = 'rgb(160, 170, 182)';
const codeStyle = reactive({
    color: get,
    PointerEvent: ''
})

//倒计时初始变量
const codeNum = ref(60);
// 定时器id
let clearId: number;
const sendCode = async (username: string) => {
    // 防止下次点击 如果倒计时的时间不是60 就不执行下面逻辑
    if (codeNum.value != 60) return;
    // 获取验证码后显示重新发送1分钟倒计时,并置灰
    codeStyle.color = again;
    codeStyle.PointerEvent = 'none';
    
    await getCode(username);

    // 把定时器赋值给 变量clearId 目的：清除定时器
    clearId = setInterval(() => {
    // 每次 时间1s -1
    codeNum.value--;
    // 时间=0时 清除定时器 
    if (codeNum.value == 0) {
      clearInterval(clearId);
        // 还原 倒计时60s
      codeNum.value = 60;
      codeStyle.color = get;
    }
  }, 1000);
}

//离开页面销毁定时器
onMounted(() => {
    clearInterval(clearId)
})

const Register = (user: any): void => {
    registerUser(user).then((res: any) => {
        ElMessage({
            showClose: true,
            message: res.msg
        });
        if(res.code == 200) {
            //跳转页面
            router.push({ name: 'Admin', params: { userId: res.data.id }})
        }
    })
}
</script>

<style>
.el-tabs__item {
    font-size: 20px;
}

.input-with-select .el-input-group__prepend {
    background-color: var(--el-fill-color-blank);
}

.content {
    width: 188%;
}
</style>