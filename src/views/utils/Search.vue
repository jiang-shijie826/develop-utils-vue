<template>
    <div id="search">
        <Weather />
        <el-select v-model="value" class="m-2"  @change="changeMenu($event)">
            <el-option 
                v-for="item in options" 
                :key="item.value" 
                :label="item.label" 
                :value="item.value"
                />
        </el-select>
        <div :class="search_classes">
            <input type="text" v-model="search_content" placeholder="搜索" @keydown.enter="EnterSearch()" ref="refInput" />
        </div>
        <transition name="menu">
            <div class="menu" v-show="store.isShow">
                <div class="box filter_box" v-for="box in boxes" :key="box.src" @click="Open(box.src)">
                    <div class="box_img">
                        <img :src="getImageUrl(box.img)" alt="图片加载失败" />
                    </div>
                    <div class="box_text">{{ box.text }}</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { showStore } from "../../stores/show";
import { ElMessage } from "element-plus";
import type { TabsPaneContext } from 'element-plus'
import Weather from "../../views/weather/Weather.vue";

const store = showStore();
const activeName = ref('first')

let search_classes = ref("");

if (store.isShow === true) {
    search_classes.value = "search filter_box search_top";
} else {
    search_classes.value = "search filter_box search_bottom";
}

watch(
    () => store.isShow,
    (newValue) => {
        if (newValue === true) {
            search_classes.value = "search filter_box search_top";
        } else {
            search_classes.value = "search filter_box search_bottom";
        }
    }
);

// 搜索栏的内容
const search_content = ref("");
const search_target = ref("https://www.baidu.com/s?wd=");
let target: string;

// 监视input框里的内容，赋值给target
watch(
    () => search_content,
    (newValue) => {
        target = search_target.value + search_content.value;
    },
    {
        immediate: true,
        deep: true,
    }
);

// 搜索
const EnterSearch = (): void => {
    window.open(target, "_blank");
    search_content.value = "";
};

// 常用标签
const boxes: {
    text: string;
    src: string;
    img: string;
}[] = [
        {
            text: "百度",
            src: "https://www.baidu.com",
            img: "1.png",
        },
        {
            text: "bilibili",
            src: "https://www.bilibili.com/",
            img: "2.png",
        },
        {
            text: "Github",
            src: "https://github.com/",
            img: "3.png",
        },
        {
            text: "qq邮箱",
            src: "https://mail.qq.com/",
            img: "4.png",
        },
        {
            text: "百度翻译",
            src: "https://fanyi.baidu.com/",
            img: "5.png",
        },
        {
            text: "知乎",
            src: "https://www.zhihu.com/",
            img: "6.png",
        },
        {
            text: "图标库",
            src: "https://www.iconfont.cn/",
            img: "7.png",
        },
        {
            text: "Element",
            src: "https://element-plus.org/zh-CN/",
            img: "8.png",
        },
        {
            text: "",
            src: "",
            img: "9.png",
        },
    ];

const value = ref('网络搜索')
const options = [
    {
        value: 'Option1',
        label: '网络搜索',
    },
    {
        value: 'Option2',
        label: '本地搜索',
    }
]

const Open = (target: string): void => {
    if (`${target}` == '') {
        ElMessage({
            showClose: true,
            message: "加急开发中",
        });
    } else {
        window.open(target, "_blank");
    }
};

const getImageUrl = (name: string): string => {
    return new URL(`../../assets/images/${name}`, import.meta.url).href;
};

// 焦点
const refInput = ref();

const getFocus = async () => {
    nextTick(() => {
        refInput.value.focus();
    });
};

getFocus();

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
    store.isShow = !store.isShow
}

const changeMenu = (event: string): void => {
    if(event == 'Option2') {
        store.isShow = false;
    }else{
        store.isShow = true;
    }
};

</script>

<style scoped>
#search {
    margin: auto;
    max-width: 660px;
}

.filter_box {
    backdrop-filter: blur(20px);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
    background-color: var(--float-backgroundColor);
    padding: 10px;
}

.search {
    margin: auto;
    width: 100%;
    height: 30px;
    border-radius: 15px;
    transition: all 0.7s, background-color 0.3s;
}

.search_top {
    margin-top: 50px;
}

.search_bottom {
    margin-top: 50px;
    transform: translateY(-90%);
}

.search input {
    width: 100%;
    border: none;
    background-color: transparent;
    border-radius: 10px;
    height: 30px;
    font-size: 19px;
    font-weight: 700;
    outline: 0px;
    color: var(--color);
    line-height: 30px;
    text-align: center;
    letter-spacing: 3px;
    top: -35px;
}

.search input::placeholder {
    color: var(--color);
}

.menu {
    margin: auto;
    margin-top: 30px;
    width: 100%;
    min-height: 340px;
    border-radius: 15px;
    transition: all 0.1s;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.menu:hover {
    cursor: pointer;
    background-color: rgb(255, 255, 255, 0.1);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
}

.box {
    cursor: pointer;
    width: 90px;
    height: 90px;
    border-radius: 10px;
    margin: 20px;
    transition: background-color 0.1s;
}

.box:hover {
    background-color: var(--float-backgroundColor-hover);
}

.box_img {
    margin-top: -4.5px;
    height: 80px;
    width: 100%;
    text-align: center;
}

.box_img img {
    width: 45px;
    height: 45px;
}

.box_text {
    position: absolute;
    bottom: -10px;
    left: -15px;
    width: 120px;
    text-align: center;
    color: var(--default-color);
    font-weight: 700;
    font-size: 18px;
}

.menu-enter-from,
.menu-leave-to {
    opacity: 0;
}

.menu-enter-to,
.menu-leave-from {
    opacity: 1;
}

.menu-enter-active {
    transition: opacity 0.8s ease;
}

.menu-leave-active {
    transition: opacity 0.8s ease;
}

.demo-tabs>.el-tabs__content {
    padding: 25px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

:deep() .el-tabs__nav-wrap::after {
    content: "";
    width: 56%;
}
.m-2{
    left: -35px;
    width: 40%;
}
</style>