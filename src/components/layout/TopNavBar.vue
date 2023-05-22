<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <el-menu-item index="0" class="img">
            <img src="../../assets/favicon.ico" class="icoClass" @click="router.push('Home')" />
        </el-menu-item>
        <el-menu-item index="1">
        </el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="2" @click="router.push('Home')">
            <el-icon :size="20">
                <HomeFilled />
            </el-icon>首页</el-menu-item>
        <el-menu-item index="3" @click="router.push('Navigation')">
            <el-icon :size="20">
                <Promotion />
            </el-icon>导航</el-menu-item>
        <el-menu-item index="4" @click="drawer = true">
            <el-icon :size="20">
                <Search />
            </el-icon>搜索
            <el-drawer v-model="drawer" title="" :with-header="false">
            <Searched />
            </el-drawer>
        </el-menu-item>
        <el-sub-menu index="5">
            <template #title>
                <el-icon :size="20">
                    <Present />
                </el-icon>工具</template>
            <el-menu-item index="5-1" @click="router.push('SqlBeauty')">SQL自动拼接</el-menu-item>
            <el-menu-item index="5-2" @click="router.push('Calendar')">日历</el-menu-item>
            <el-menu-item index="5-2" @click="router.push('DatePicker')">倒计时</el-menu-item>
            <el-menu-item index="5-2" @click="router.push('DatePicker')">ChatGPT</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="6" @click="openBlog()">
            <el-icon :size="20">
                <Collection />
            </el-icon>创作
        </el-menu-item>
        <el-menu-item index="7" @click="toggleDark()">
            <img src="../../assets/sun.png" class="themeClass" />
        </el-menu-item>
        <el-menu-item index="8" @click="router.push('Login')">
            <img src="../../assets/center.png" class="centerClass"  />
        </el-menu-item>
    </el-menu>
</template>
  
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useRouter } from "vue-router";
import Searched from "../../views/utils/Search.vue";


const drawer = ref(false)

// 路由
const router = useRouter();

//切换主题
const isDark = useDark()
const toggleDark = useToggle(isDark)

const activeIndex = ref('')
const handleSelect = (key: string, keyPath: string[]) => {

}

// 功能未开放提示
const openBlog = (): void => {
    window.open('https://jiang-shijie826.github.io/', '_blank');
};
</script>
  
<style scoped>
.flex-grow {
    flex-grow: 1;
}

.icoClass {
    height: 45px;
}

.themeClass {
    top: 13px;
    height: 30px;
}

.centerClass {
    top: 15px;
    height: 25px;
}

.el-menu-item:hover {
    background-color: transparent !important;
}

.el-menu {
    background-color: transparent !important;
}

.el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 2px solid transparent !important;
    background-color: transparent !important;
}

.el-menu--horizontal {
    border-bottom: solid 1px transparent;
}
.el-menu--horizontal>.el-menu-item {
    margin: 0px -12px;
}
</style>
  