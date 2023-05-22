<template>
    <el-card class="box-card-right">
        <template #header>
            <div class="card-header">
                <span>最近更新</span>
                <el-button class="button" text>更多内容</el-button>
            </div>
        </template>
        <div v-for="o in 8" :key="o" class="text item card__body">
            <el-row :gutter="12">
                <el-col :span="24">
                    <el-card shadow="hover" style="height: 130px;"> Hover </el-card>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<style scoped>
.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.box-card-right {
    float: right;
    width: 60%;
    right: -100%;
    top: -21%;
    border-radius: 30px;
}

:deep .el-card__header {
    border-bottom: 0px solid !important;
}

.card__body {
    top: -30px;
}
</style>