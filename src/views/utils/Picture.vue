<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import dayjs from 'dayjs'
import { feedback } from "@/api/wall"
const props =defineProps({
    picture: Object
})
const userStore = useUserStore()

// 反馈
const doFeedBack = (type:any) => {
    const data = {
        wallId: props.picture.id,
        userId: userStore.ip,
        type,
        moment: dayjs().format('YYYY/MM/DD HH:mm')
    }
}
</script>

<template>
    <div class="picture">
        <img :src="picture.imgurl" alt="">
        <div class="mask"></div>
    </div>
</template>

<style lang="less" scoped>
.picture {
    width: 100%;
    position: relative;
    transition: all .3s;

    &:hover {
        cursor: pointer;

        &>.like {
            opacity: 1;

        }

        &>.mask {
            opacity: 1;
        }
    }

    img {
        width: 100%;
        height: 100%;
        vertical-align: bottom;
    }

    .mask {
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .2);
        opacity: 0;
        width: 100%;
        height: 100%;
    }

    .like {
        position: absolute;
        top: 8px;
        left: 8px;
        background-color: hsla(0, 0%, 100%, .8);
        backdrop-filter: blur(4px);
        height: 28px;
        border-radius: 14px;
        padding: 0 8px;
        display: flex;
        align-items: center;
        transition: all .3s;
        opacity: 0;

        .iconfont {
            margin-right: 5px;

            &:hover {
                color: #F67770;
                cursor: pointer;
            }
        }

        .isLike {
            color: #f67770;
        }
    }
}
</style>
