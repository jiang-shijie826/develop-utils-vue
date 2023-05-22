<template>
    <el-card class="box-card-left">
        <template #header>
            <div class="card-header">
                <span>热门</span>
            </div>
        </template>
        <el-row>
            <el-col v-for="(o, index) in 6" :key="o" :span="4">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                        class="card_image" />
                    <div style="padding: 4px">
                        <span style="font-weight:bold;">线上视频的不足和改进</span>
                        <div class="bottom">
                            <el-button text class="button">tag</el-button>
                            {{dataFliter(currentDate) }}
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-card>
    <LastUpdate />
</template>

<script lang="ts" setup>
import { constant } from 'lodash';
import LastUpdate from './LastUpdate.vue';
import { ref } from 'vue'
import dayjs from "dayjs"

const currentDate = ref(new Date())

const dataFliter = (val:Date) => {
      return dayjs(val).format("YYYY-MM-DD");
    }

</script>

<style scoped>
.box-card-left {
    top: 26px;
    border-radius: 30px;
    width: 135%;
    background-color: antiquewhite;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

:deep .el-card__header {
    border-bottom: 0px solid !important;
}

.card__body {
    top: -30px;
}
.bottom {
  margin-top: 3px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.card_image {
  width: 100%;
  height: 120px;
  display: block;
}

.el-col-4 {
    top: -30px;
    margin: 15px 12px;
    height: 90%;
}
:deep .el-card {
    border-radius: 10px;
    width: 100%;
    left: 15px;
}
</style>