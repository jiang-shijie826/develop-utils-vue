<template>
    <el-carousel height="620px" pause-on-hover="true" class="home">
        <el-carousel-item v-for="item in imgList" :key="item" autoplay="false">
            <img :src="item.picSrc" />
        </el-carousel-item>
    </el-carousel>
    <el-backtop :right="50" :bottom="50" :visibility-height="400" />
    <!-- <Classification/> -->
</template>

<script lang="ts" setup>
import Classification from './content/Classification.vue';
import { queryCarouselPicture } from "../http/data/index.js"
import { ref, reactive } from "vue";
const imgList:any = reactive([]);

//定义轮播图片数量
const count = ref(4);

queryCarouselPicture(count.value).then( (res: any) => {
    if (res.length > 0) {
        res.forEach((item:any) => {
            imgList.push(item);
        });
    }
}).catch( (err: any) => {
    console.log(err)
})

</script>

<style scoped>
.img {
    width: 200%;
}

.el-carousel__item img {
    display: cover;
    color: #475669;
    height: 150%;
}

.home {
    width: 200%;
}
</style>