<template>
    <el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        active-text-color="#ffd04b">
        <h3 class="title">
            <img src="../../assets/favicon.ico" class="icoClass" />
            <span>冰凉西瓜</span>
        </h3>
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <Platform />
                </el-icon> <span>系统管理</span>
            </template>
            <el-menu-item index="1-1" @click="router.push('User')">
                <el-icon>
                    <UserFilled />
                </el-icon> 用户信息</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2"  @click="router.push('Carousel')">
            <el-icon><icon-menu /></el-icon>
            <template #title>首页轮播图</template>
        </el-menu-item>
        <el-menu-item index="3"  @click="router.push('Compass')">
            <el-icon>
                <Compass />
            </el-icon>
            <template #title>导航信息</template>
        </el-menu-item>
        <el-menu-item index="4"  @click="router.push('SearchIco')">
            <el-icon>
                <ZoomIn />
            </el-icon>
            <template #title>搜索图标</template>
        </el-menu-item>
        <el-sub-menu index="5">
            <template #title>
                <el-icon>
                    <Tools />
                </el-icon>
                <span>工具</span>
            </template>
            <el-menu-item index="5-1"  @click="router.push('Countdown')">
                <el-icon>
                    <Timer />
                </el-icon>倒计时</el-menu-item>
            <el-menu-item index="5-1"  @click="router.push('Notepad')">
                <el-icon>
                    <List />
                </el-icon>记事本</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import {
    Menu as IconMenu,
    Platform,
    UserFilled,
    Compass,
    ZoomIn,
    Tools,
    Timer
} from '@element-plus/icons-vue'
import { useRouter } from "vue-router";


const handleOpen = (key: string, keyPath: string[]) => {
    console.log("user", key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

// 路由
const router = useRouter();

</script>
  
<style>
.wrapper {
    top: -61px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    margin-top: -57px;
    margin-left: -30px;
    width: 200px;
    min-height: 100vh;
    position: fixed;
}

.title {
    font-size: 20px;
    font-weight: bold;
    color: rgb(33, 129, 144);
    text-align: center;
}

.icoClass {
    height: 45px;
    cursor: pointer;
}

.title span {
    top: -13px;
    margin-left: 15px;
}

</style>
  