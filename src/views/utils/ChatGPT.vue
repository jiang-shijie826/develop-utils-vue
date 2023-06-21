<template>
    <div>
        <div id="container" class="map"/>
    </div>
</template>

<script>

export default {
    name: 'GMap',
    methods: {
        //初始化地图
        initMap() {
            let self = this
            let map = new AMap.Map('container', {
                center: [116.397428, 39.90923],
                resizeEnable: true,
                zoom: 10
            })
            self.map = map
        }

    },
    //在mounted阶段调用（mounted可以操作DOM）
    mounted() {
        this.initMap()
    }

}

</script>

<style>
.map {
    width: 205%;
    height: 690px;
    margin-left: -20px;
}
</style>