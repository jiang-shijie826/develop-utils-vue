<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue"
import Affix  from "@/components/Affix.vue";

const isLoading = ref(false)
const messageList = ref([
  {
    imgurl: 'https://images.unsplash.com/photo-1682687219570-4c596363fd96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
    tag: 1
  },
  {
    imgurl: 'https://images.unsplash.com/photo-1688934150111-ab9a5d327087?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
    tag: 1
  }, {
    imgurl: 'https://images.unsplash.com/photo-1688613532714-c0bd8b6b2f3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    tag: 1
  },
  {
    imgurl: 'https://plus.unsplash.com/premium_photo-1673913966947-a9e2bf8ddf20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
    tag: 1
  },
  {
    imgurl: 'https://images.unsplash.com/photo-1682687219570-4c596363fd96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
    tag: 1
  },
  {
    imgurl: 'https://images.unsplash.com/photo-1494472155656-f34e81b17ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2F0ZXJmYWxsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    tag: 1
  }, {
    imgurl: 'https://images.unsplash.com/photo-1688904524620-527b42849240?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
    tag: 1
  },
  {
    imgurl: 'https://plus.unsplash.com/premium_photo-1673913966947-a9e2bf8ddf20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
    tag: 1
  },
  {
    imgurl: 'https://images.unsplash.com/photo-1688655046171-286a6025377a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
    tag: 1
  }
]);

const srcList = [
  'https://images.unsplash.com/photo-1682687219570-4c596363fd96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1688934150111-ab9a5d327087?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1688904524620-527b42849240?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://plus.unsplash.com/premium_photo-1673913966947-a9e2bf8ddf20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1688655046171-286a6025377a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1682687219570-4c596363fd96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1688904524620-527b42849240?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://plus.unsplash.com/premium_photo-1673913966947-a9e2bf8ddf20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1688655046171-286a6025377a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
]

const noneData =
{
  img: '/src/assets/images/photo.svg',
  msg: '还没有照片，快贴上第一张吧'
};

const result=ref('')
const clickEven=(val)=>{
  console.log(val.tag);
  result.value = val.tag
}

</script>

<template>
  <Affix @tagChild="clickEven" />
  <!-- 照片墙 -->
  <div class="picture-list">
    <h2>照片墙</h2>
    <div class="list-body" v-if="isLoading == false">
      <div class="picture" v-for="picture in messageList" :key="index">
        <el-image
          :src="picture.imgurl"
          :zoom-rate="1.2"
          :preview-src-list="srcList"
          :initial-index=index
          fit="cover"
        />
      </div>
    </div>

    <div class="noneData" v-if="messageList.length === 0 && isLoading == false">
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