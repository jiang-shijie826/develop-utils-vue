<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { CollectionTag } from '@element-plus/icons-vue'

// 使用defineEmits创建名称，接受一个数组
const emit = defineEmits(['tagChild'])

const tagList = [
    {
        index: 1,
        name: "全部"
    },
    {
        index: 2,
        name: "偶像"
    },
    {
        index: 3,
        name: "日常"
    },
    {
        index: 4,
        name: "游戏"
    },
]

const handleCommand = (command: string | number | object) => {
    //传递给父组件
    emit('tagChild', {
        tag: command,
    })
}
</script>
<template>
    <div class="affix-container">
        <el-dropdown @command="handleCommand">
            <el-button type="warning" size="large" :icon="CollectionTag" circle />
            <template #dropdown>
                <el-dropdown-menu v-for="tag in tagList">
                    <el-dropdown-item :command=tag.index>{{ tag.name }}</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
<style scoped>
.affix-container {
    text-align: center;
    position: fixed;
    top: 92%;
    right: 1%;
}

.el-dropdown {
    width: 40%;
    cursor: pointer;
}
</style>
  