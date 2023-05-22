<template>
    <el-carousel height="620px" pause-on-hover="true" class="home">
        <el-carousel-item v-for="item in imgList" :key="item" autoplay="false">
            <img :src="item.src" />
        </el-carousel-item>
    </el-carousel>
    <el-backtop :right="50" :bottom="50" :visibility-height="400" />
    <!-- <Classification/> -->
</template>

<script lang="ts" setup>
import Classification from './content/Classification.vue';
const imgList: {
    src: string;
}[] = [
        { src: "https://w.wallhaven.cc/full/we/wallhaven-we1lrq.jpg", },
        { src: "https://w.wallhaven.cc/full/o5/wallhaven-o5yqr5.jpg", },
        { src: "https://w.wallhaven.cc/full/9d/wallhaven-9dz1e8.jpg", },
        { src: "https://w.wallhaven.cc/full/5g/wallhaven-5g5gw1.png", },
    ]

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