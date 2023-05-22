<template>
  <el-card class="box" v-show="alwaysList.length != 0">
    <template #header>
      <div class="card-header">
        <span>常用地址</span>
      </div>
    </template>
    <el-row>
      <el-col v-for="(item) in alwaysList" :key="item" :span="4">
        <el-card class="card" :body-style="{ padding: '10px 15px' }" shadow="hover" @click="jumpAlways(item)">
          <el-avatar :size="45" :src="item.src" />
          <div class="name">
            <span>{{ item.name }}</span>
          </div>
          <div class="count">
            <span><el-icon style="top: 3px" :size="15">
                <Link />
              </el-icon>次数：{{ item.count }}</span>
          </div>
          <el-divider>
            <el-icon><star-filled /></el-icon>
          </el-divider>
          <el-tag class="ml-2" size="large" type="success">{{ item.tag }}</el-tag>
          <div style="top: -30px;  font-size: 12px;color: #999;">
            <span>{{ item.value }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </el-card>
  <el-card class="box-card" v-for="(list, index) in urlList" :key="list">
    <template #header>
      <div class="card-header">
        <span>{{ urlList[index].tag }}</span>
      </div>
    </template>
    <el-row>
      <el-col v-for="(item) in urlList[index].list" :key="item" :span="4">
        <el-card class="card" :body-style="{ padding: '10px 15px' }" shadow="hover" @click="jump(item, urlList[index].tag)">
          <el-avatar :size="45" :src="item.src" />
          <div class="name">
            <span>{{ item.name }}</span>
          </div>
          <el-divider>
            <el-icon><star-filled /></el-icon>
          </el-divider>
          <div style="top: -40px;  font-size: 12px;color: #999;">
            <span>{{ item.value }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs ,onMounted } from 'vue'
import urlList from "../../js/navUrlList";

type urlType = {
  src: string;
  name: string;
  value: string;
  url: string;
  count: number;
  tag: string;
}
const alwaysList = reactive<Array<urlType>>([])

const jumpAlways = (item: urlType) => {
  const flag: boolean = false;
  if (alwaysList.includes(item)) {
    //访问次数+1
    !flag;
    alwaysList[alwaysList.indexOf(item)].count++;
  }
  alwaysList.sort((a, b) => b.count - a.count);
  //判断是否已经打开过
  if(flag) {
    window.open('javascript:;', state.ip+item.name);
  }else{
    window.open(item.url, state.ip+item.name);
  }
}

const jump = (item: urlType, tag: string) => {
  const flag: boolean = false;
  if (alwaysList.includes(item)) {
    //访问次数+1
    !flag;
    alwaysList[alwaysList.indexOf(item)].count++; 
  } else {
    item.tag = tag;
    alwaysList.push(item);
  }
  alwaysList.sort((a, b) => b.count - a.count);
  
  if(flag) {
    window.open('javascript:;', item.name);
  }else{
    window.open(item.url, item.name);
  }
}

const state = reactive({
  ip:'',
})

</script>

<style>
.card {
  height: 80%;
  width: 80%;
  left: 50px;
  top: 30px;
}

.el-divider {
  top: -23px;
}

.el-col {
  margin-left: -40px;
  margin-top: -20px;
}

.name {
  font-size: 14px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: rgb(55, 54, 54);
  float: right;
}

.el-avatar {
  background-color: rgb(255, 255, 255);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.card-header>span {
  font-weight: bold;
}

.box-card {
  width: 200%;
  top: 40px;
  margin-bottom: 15px;
}

.box {
  top: 20px;
  width: 200%;
}

.count {
  top: -30px;
  right: -100px;
  font-size: 10px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #999;
}

.ml-2 {
  top: -40px
}
</style>
