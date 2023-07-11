<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue"
import Picture from './Picture.vue'


const isLoading = ref(false)
const messageList = ref([
  {
    imgurl: 'https://images.unsplash.com/photo-1682687219570-4c596363fd96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    imgurl: 'https://images.unsplash.com/photo-1688934150111-ab9a5d327087?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
  }, {
    imgurl: 'https://images.unsplash.com/photo-1688904524620-527b42849240?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    imgurl: 'https://plus.unsplash.com/premium_photo-1673913966947-a9e2bf8ddf20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    imgurl: 'https://images.unsplash.com/photo-1688655046171-286a6025377a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
  }
])
const noneData =
{
  img: '/src/assets/images/photo.svg',
  msg: '还没有照片，快贴上第一张吧'
};

</script>

<template>
  <h2>照片墙</h2>
  <!-- 照片墙 -->
  <div class="picture-list">
    <div class="list-body" v-if="isLoading == false">
      <Picture class="picture" v-for="picture in messageList" :picture="picture" />
    </div>
    <div class="noneData" v-if="messageList.length === 0 && isLoading == false">
      <img :src="noneData.img" alt="">
      <div class="noneDataMsg">{{ noneData.msg }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.title {
    font-size: 56px;
    margin: 0 auto;
    text-align: center;
    margin-top: 46px;
}

.desc {
    font-size: 14px;
    color: #5B5B5B;
    text-align: center;
    margin-top: 20px;
}

.tag {
    margin-top: 40px;
    text-align: center;
    display: flex;
    justify-content: center;

    .btn {
        height: 28px;
        color: #5B5B5B;
        margin: 0 4px;
        padding: 0 14px;
        text-align: center;
        line-height: 28px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }

    .active {
        height: 28px;
        line-height: 28px;
        border: 1px solid rgba(32, 32, 32, 1);
        border-radius: 14px;
        color: #202020;
        font-weight: 600;
    }
}

.card-list {
    width: 1500px;
    min-height: 400px;
    margin: auto;
    display: flex;
    margin-top: 28px;
    flex-wrap: wrap;
}

.picture-list {
    width: 88%;
    min-height: 400px;
    margin: auto;
    margin-top: 28px;

    .list-body {
        columns: 6;
        column-gap: 4px;
    }

    .picture {
        width: 276px;
        margin-bottom: 4px;
    }
}

.addMessageBtn {
    position: fixed;
    right: 15px;
    // bottom: 30px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #202020;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
    cursor: pointer;
    transition: all 0.3s;

    .iconfont {
        font-size: 24px;
    }
}

.hover:hover {
    transform: translateY(-6px);
    transition: all 0.4s;
}

.activeCard {
    border: 1px solid #3B73F0;
}

.noneData {
    width: 100%;
    text-align: center;
    padding-top: 80px;
    color: #949494;
    font-weight: 700;
    font-family: serif;
    font-size: 20px;
    // display: flex;
    // align-items: center;
    // justify-content: center;
}

.loading {
    width: 100%;
    text-align: center;
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
}
</style>