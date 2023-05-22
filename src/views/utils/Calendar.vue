<template>
    <div class="cal">
        <el-calendar v-model="date.value" class="main" ref="calendar">
            <template #header="{ date }">
                <span>{{ date }}</span>
                <el-button-group>
                    <el-button :icon="ArrowLeft" color="cadetblue" size="small" @click="selectDate('prev-month')" />
                    <el-button :icon="ArrowRight" color="cadetblue" size="small" @click="selectDate('next-month')" />
                </el-button-group>
            </template>
            <template #date-cell="{ data }">
                <div :class="{ selected: comAction.isSelected(data) }">
                    <div class="solar">{{ data.day.split('-')[2] }}</div>
                    <div class="lunar" :class="{ festival: comAction.isFestival(data) }">
                        <span v-html="comAction.solarToLunar(data)"></span>
                    </div>
                </div>
            </template>
        </el-calendar>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import cal from "../../js/calendar";
import {
    ArrowLeft,
    ArrowRight,
} from '@element-plus/icons-vue'

const calendar = ref()
const selectDate = (val: string) => {
    calendar.value.selectDate(val)
}

const date = reactive({
    value: new Date()
})

// 根据selectedDates设置选中日期
const selectedDates = reactive({
    value: ['2023-04-07', '2020-04-08', '2020-04-09']
})

const comAction = {
    // 是否选中日期
    isSelected(slotData: any) {
        return selectedDates.value.includes(slotData.day)
    },
    // 是否节假日
    isFestival(slotData: any) {
        //console.log(slotData);
        let solarDayArr = slotData.day.split('-');
        let lunarDay: any = cal.solar2lunar(solarDayArr[0], solarDayArr[1], solarDayArr[2])

        // 公历节日\农历节日\农历节气
        let festAndTerm: any = [];
        festAndTerm.push(lunarDay.festival == null ? '' : ' ' + lunarDay.festival)
        festAndTerm.push(lunarDay.lunarFestival == null ? '' : '' + lunarDay.lunarFestival)
        festAndTerm.push(lunarDay.Term == null ? '' : '' + lunarDay.Term)
        festAndTerm = festAndTerm.join('')

        return festAndTerm != ''
    },
    // 公历转农历
    solarToLunar(slotData: any) {
        // console.log(slotData);
        let solarDayArr = slotData.day.split('-');
        let lunarDay: any = cal.solar2lunar(solarDayArr[0], solarDayArr[1], solarDayArr[2])

        // 农历日期
        let lunarMD = lunarDay.IMonthCn + lunarDay.IDayCn

        // 公历节日\农历节日\农历节气
        let festAndTerm = '';
        festAndTerm += (lunarDay.festival == null ? '' : lunarDay.festival + '<br />')
        festAndTerm += (lunarDay.lunarFestival == null ? '' : lunarDay.lunarFestival + '<br />')
        festAndTerm += (lunarDay.Term == null ? '' : lunarDay.Term + '<br />')
        return festAndTerm == '' ? lunarMD : festAndTerm;
    }
}


</script>

<style scoped>
.cal {
    width: 200%;
}

.main {
    background-image: url('../../assets/images/cal_bg.png');
    font-weight: 400;
}

/**隐藏上一月、本月、下一月*/
.ep-calendar__button-group {
    display: none;
}

/**月份居中*/
.ep-calendar__title {
    width: 100%;
    text-align: center;
}

/**日期div的样式*/
.ep-calendar-table tr td:first-child {
    border-left: 0px;
}

.ep-calendar-table td {
    min-height: 110px;
    min-width: 110px;
    border-right: 0px;
}

.ep-calendar-table td.is-selected {
    background-color: white;
}

.ep-calendar-table .ep-calendar-day {
    height: 100%;
    padding: 0px;
    text-align: center;
}

.ep-calendar-table .ep-calendar-day>div {
    height: 104px;
    text-align: center
}

/**日期div的样式-代办*/
.ep-calendar-table .ep-calendar-day>div .text {
    padding-top: 2px;
    text-align: center
}

/**日期div的样式-公历*/
.ep-calendar-table .ep-calendar-day>div .solar {
    padding-top: 12px;
    text-align: center
}

/**日期div的样式-农历*/
.ep-calendar-table .ep-calendar-day>div .lunar {
    padding-top: 2px;
    text-align: center;
}

/**日期div的样式-选中*/
.ep-calendar-table .ep-calendar-day>div .context {
    text-align: center;
}

/**本月周末设置为红色*/
.ep-calendar-table .current:nth-last-child(-n+2) .solar {
    color: red;
}

/**本月农历设置为灰色*/
.ep-calendar-table .current .lunar {
    color: #606266;
}

/**本月农历节日设置为红色*/
.ep-calendar-table .current .lunar.festival {
    color: red;
}

/**禁用点击效果*/
/*.el-calendar-table td {*/
/*pointer-events: none;*/
/*}*/
</style>

