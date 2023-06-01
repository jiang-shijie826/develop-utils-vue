<template>
    <!-- <el-col class="col1" :span="8">
        <img class="img"
            src="https://cn.bing.com/th?id=OHR.ReefAwareness_ZH-CN8840949729_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp" />
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
    </el-col> -->
    <div class="container" :style="{ background: url }">
        <el-row>
            <el-col>
                <h2 class="h_two">距离XX倒计时:</h2>
            </el-col>
            <el-col>
                <el-countdown class="HH_mm" format="DD [天] HH小时mm分ss秒" :value="time" />
            </el-col>
            <el-col>
                <div class="h_three">
                    <el-carousel height="40px" direction="vertical" indicator-position="none" :autoplay="true">
                        <el-carousel-item v-for="item in saying_list">
                            <a href="javascript:void(0)" class="item">{{ item }}</a>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </el-col>
            <el-col class="col2" :span="12">
                <div class="countdown-footer">截至日：{{ time.format('YYYY-MM-DD') }}</div>
            </el-col>
        </el-row>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import dayjs, { UnitTypeLong } from 'dayjs'
import { Calendar } from '@element-plus/icons-vue'
import saying_list from '../../js/navUrlList'
import { queryBing } from '../../http/data/index.js'


const size = ref<'default' | 'large' | 'small'>('default')
const visible = ref(false)
const picker = ref('')

const time = ref(dayjs().add(1, 'month').startOf('month'))

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

// 动态绑定背景
const url = ref('');
queryBing().then((res: any) => {
    url.value = `url("`.concat(res.url, `") 0 / cover fixed`);
    console.log(url.value);
})
</script>
  
<style scoped>
.container {
    position: fixed;
    left: 0;
    top: 10;
    content: '';
    width: 100%;
    height: 100%;
    z-index: -1;
}

.container::after {
    position: fixed;
    left: 0;
    top: 57px;
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgba(0 0 0 / .45);
    z-index: -2;
}

.el-row {
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
}

.col2 {
    font-size: large;
    margin-left: 50px;
    top: 230px;
    color: #ffffff;
}

.col3 {
    right: 300px;
    top: 25px;
    position: relative;
}

.ml-2 {
    left: 50px;
}

@font-face {
    font-family: "lazy";
    src: url(../../assets/font/font.ttf);
}

@font-face {
    font-family: "youshe";
    src: url(../../assets/font/youshe.ttf);
}

.h_two {
    font-size: 65px;
    margin-left: 50px;
    font-family: "lazy";
    font-weight: bold;
    color: #ffffff;
}

.h_three {
    margin-left: 50px;
    top: 100px;
}

a,
.green {
    color: #ffffff;
    font-size: 30px;
    font-family: "lazy";
    opacity: 0.75;
    font-weight: 400;
    font-style: oblique;
}

:deep() .el-statistic__content {
    font-size: 80px;
    margin-left: 50px;
    bottom: 10px;
    font-family: "lazy";
    float: left;
    color: #ffffff;
}

.HH_mm {
    top: 60px;
    font-weight: bolder;
}
</style>
  