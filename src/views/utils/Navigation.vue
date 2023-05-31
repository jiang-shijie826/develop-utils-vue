<template>
  <el-card class="box" v-show="alwaysList.length != 0">
    <template #header>
      <div class="card-header">
        <span>常用地址</span>
      </div>
    </template>
    <el-row>
      <el-col v-for="(item) in alwaysList" :key="item" :span="4">
        <el-card class="card" :body-style="{ padding: '10px 15px' }" shadow="hover" @click="jump(item)">
          <el-avatar :size="45" :src="item.icoSrc" />
          <div class="name">
            <span>{{ item.name }}</span>
          </div>
          <div class="count">
            <span><el-icon style="top: 3px" :size="15">
                <Link />
              </el-icon>次数：{{ item.score }}</span>
          </div>
          <el-divider>
            <el-icon><star-filled /></el-icon>
          </el-divider>
          <el-tag class="ml-2" size="large" type="success">{{ item.tag }}</el-tag>
          <div style="top: -30px;  font-size: 12px;color: #999;">
            <span>{{ item.description }}</span>
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
        <el-card class="card" :body-style="{ padding: '10px 15px' }" shadow="hover" @click="jump(item)">
          <el-avatar :size="45" :src="item.icoSrc" />
          <div class="name">
            <span>{{ item.name }}</span>
          </div>
          <el-divider>
            <el-icon><star-filled /></el-icon>
          </el-divider>
          <div style="top: -40px;  font-size: 12px;color: #999;">
            <span>{{ item.description }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, inject  } from 'vue'
import { queryNavigationUrl, updateNavigationCount, queryCommon } from "../../http/data/index.js"

const alwaysList:any = reactive([]);

queryCommon().then( (res: any) => {
  if (res.length > 0) {
    res.forEach((item:any) => {
      alwaysList.push(item);
    });
  }
}).catch( (err: any) => {
    console.log(err)
})

//刷新页面
const reload: any = inject('reload')

const jump = (item: any) => {
  const flag: boolean = false;
  if (alwaysList.includes(item)) {
    !flag;
  }
  //更新缓存中点击次数
  updateNavigationCount(item).then();
  reload();
  if(flag) {
    window.open('javascript:;', item.name);
  }else{
    window.open(item.url, item.name);
  }

}

const urlList:any = reactive([]);
queryNavigationUrl().then( (res: any) => {
  if (res.length > 0) {
    res.forEach((item:any) => {
      urlList.push(item);
    });
  }
}).catch( (err: any) => {
    console.log(err)
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
