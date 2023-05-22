<template>
    <el-row>
        <el-col class="col1" :span="8">
            <img class="img" src="../../assets/images/cal.gif" />
        </el-col>
        <el-col class="col3" :span="4">
            <el-popover :visible="visible" placement="top" :width="240">
                <div class="demo-date-picker">
                    <div class="block">
                        <el-date-picker v-model="picker" type="date" placeholder="选择日期" :shortcuts="shortcuts" :size="size"
                            format="YYYY/MM/DD hh:mm:ss" value-format="x" />
                    </div>
                </div>
                <div style="text-align: right; margin-top: -15px;">
                    <el-button size="small" text @click="visible = false">取消</el-button>
                    <el-button size="small" type="primary" @click="getDate()">确定</el-button>
                </div>
                <template #reference>
                    <el-button type="primary" class="ml-2" @click="visible = true">设置倒计时</el-button>
                </template>
            </el-popover>
        </el-col>
        <el-col class="col2" :span="12">
            <el-countdown format="DD [days] HH:mm:ss" :value="time">
                <template #title>
                    <div style="display: inline-flex; align-items: center">
                        <el-icon style="margin-right: 4px" :size="24">
                            <Calendar />
                        </el-icon>
                        倒计时
                    </div>
                </template>
            </el-countdown>
            <div class="countdown-footer">Target Date：{{ time.format('YYYY-MM-DD') }}</div>
        </el-col>
    </el-row>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { Calendar } from '@element-plus/icons-vue'



const size = ref<'default' | 'large' | 'small'>('default')
const visible = ref(false)
const picker = ref('')

const time = ref(dayjs().add(1, 'month').startOf('month'))
console.log('time-->', time.value);

const getDate = () => {
    time.value = dayjs(picker.value);
    visible.value = false;
}

const shortcuts = [
    {
        text: 'Today',
        value: new Date(),
    },
    {
        text: 'Tomorrow',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            return date
        },
    },
    {
        text: 'After a week',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
            return date
        },
    },
]


</script>
  
<style scoped>
.el-row{
    width: 200%;
    top: 80px;
}
.demo-date-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
    text-align: center;
}

.demo-date-picker .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
}

.demo-date-picker .block:last-child {
    border-right: none;
}

.demo-date-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}

.img {
    float: left;
    left: 30px;
    height: 190px;
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3CforeignObject width='100%25' height='100%25'%3E%3Cbody class='wrap' xmlns='http://www.w3.org/1999/xhtml'%3E%3Cstyle%3E.wrap%7Bbox-sizing:border-box;margin:0;height:100%25;padding:10px%7D.shadow%7Bheight:100%25;background:%23000;border-radius:10px;box-shadow:0 0 5px %23000,0 0 10px %23000,0 0 15px %23000%7D%3C/style%3E%3Cdiv class='shadow'/%3E%3C/body%3E%3C/foreignObject%3E%3C/svg%3E")
}

.col2 {
    font-size:x-large;
    top: 50px;
}

.col3 {
    right: 300px;
    top: 25px;
    position: relative;
}
.ml-2 {
    left: 50px;
}
</style>
  