<script lang="ts" setup>
import { ref, reactive, watch, inject, onMounted } from "vue"
import Affix from "@/components/Affix.vue";
import { queryPhotoWallByTag } from "../../http/data/index.js"
import { ElMessage } from "element-plus";

const noneData = {
  img: '/src/assets/images/photo.svg',
  msg: '还没有照片，快贴上第一张吧'
};

//刷新页面
const reload: any = inject('reload')

const isLoading = ref(false)

const wallList: any = reactive([]);

const result = ref('1')
const clickEven = (val: any) => {
  result.value = val.tag;
}

watch(
  () => result.value,
  (newValue, oldValue) => {
    if (newValue != oldValue) {
      queryPhotoWallByTag(newValue).then((res: any) => {
        wallList.length = 0;
        if (res.data.length > 0) {
          res.data.forEach((item: any) => {
            wallList.push(item.imgUrl);
          });
        }
      })
    }
  }
);

onMounted(() => {
  queryPhotoWallByTag(result.value).then((res: any) => {
    if (res.data.length > 0) {
      res.data.forEach((item: any) => {
        wallList.push(item.imgUrl);
      });
    }
  }).catch((err: any) => {
    console.log(err)
  });
})




</script>

<template>
  <Affix @tagChild="clickEven" />
  <!-- 照片墙 -->
  <div class="picture-list">
    <div class="list-body" v-if="isLoading == false">
      <div class="picture" v-for="(picture, index) in wallList">
        <el-image :src="picture" :zoom-rate="1.2" :preview-src-list="wallList" :initial-index=index fit="cover" />
      </div>
    </div>

    <div class="noneData" v-if="wallList.length === 0 && isLoading == false">
      <img :src="noneData.img" alt="">
      <div class="noneDataMsg">{{ noneData.msg }}</div>
    </div>
  </div>
</template>

<style scoped>
.picture-list {
  width: 200%;
  margin-top: 10px;
}

.list-body {
  columns: 5;
  column-gap: 3px;
}

.picture {
  margin-bottom: 4px;
}

.picture>img {
  width: 100%;
  height: 100%;
  vertical-align: bottom;
}

.hover:hover {
  transform: translateY(-6px);
  transition: all 0.4s;
}

.noneData {
  width: 100%;
  text-align: center;
  padding-top: 80px;
  color: #949494;
  font-weight: 700;
  font-family: serif;
  font-size: 20px;
}

.loading {
  width: 100%;
  text-align: center;
}

.loading-text {
  font-size: 24px;
  font-family: serif;
  color: #949494;
  margin-top: -50px;
}

#lottie {
  height: 200px;
  margin-top: 20px;
}
</style>