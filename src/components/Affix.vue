<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { CollectionTag } from '@element-plus/icons-vue'
import { onMounted, reactive } from "vue";
import { queryAllTag } from "../http/data/index.js"


// 使用defineEmits创建名称，接受一个数组
const emit = defineEmits(['tagChild'])

const handleCommand = (command: string | number | object) => {
    //传递给父组件
    emit('tagChild', {
        tag: command,
    })
}


const tagList: any = reactive([]);

onMounted(() => {
    queryAllTag().then((res: any) => {
    if (res.data.length > 0) {
      res.data.forEach((item: any) => {
        console.log(item);
        tagList.push(item);
      });
    }
  }).catch((err: any) => {
    console.log(err)
  });
})

</script>
<template>
    <div class="affix-container">
        <el-dropdown @command="handleCommand">
            <el-button type="warning" size="large" :icon="CollectionTag" circle />
            <template #dropdown>
                <el-dropdown-menu v-for="tag in tagList">
                    <el-dropdown-item :command=tag.sort>{{ tag.tagName }}</el-dropdown-item>
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
    z-index: 999;
}

.el-dropdown {
    width: 40%;
    cursor: pointer;
}
</style>
  