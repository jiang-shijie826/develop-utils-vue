<template>
    <Admin />
    <div class="container">
        <h2>用户信息</h2>
        <div class="elOperation">
            <el-button type="primary" plain @click="add">新增</el-button>
            <el-button type="danger" plain @click="batchDelete">删除</el-button>
        </div>
        <el-table :data="tableData" class="table" :row-class-name="tableRowClassName"
            @selection-change="handleSelectionChange"
            :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{ 'text-align': 'center' }"
            >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="date" label="姓名" width="180" />
            <el-table-column prop="name" label="年龄" width="180" />
            <el-table-column prop="name" label="E-MAIL" width="230" />
            <el-table-column prop="name" label="昵称" width="180" />
            <el-table-column prop="name" label="手机号码" width="230" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="50" />
    </div>
</template>

<script setup lang="ts">
import Admin from '@/components/layout/Admin.vue'
import { ref } from 'vue'

interface User {
    date: string
    name: string
    address: string
}

const tableRowClassName = ({
    row,
    rowIndex,
}: {
    row: User
    rowIndex: number
}) => {
    if (rowIndex % 2 === 0) {
        return 'warning-row'
    } else {
        return 'success-row'
    }
    return ''
}

const tableData: User[] = [
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]

const handleEdit = (index: number, row: User) => {
    console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
    console.log(index, row)
}
const multipleSelection = ref<User[]>([])
const handleSelectionChange = (val: User[]) => {
    multipleSelection.value = val
    console.log(multipleSelection.value);

}
//新增
const add = (() => {

})

//批量删除
const batchDelete = (() => {

})
</script>

<style>
.container {
    margin-left: 170px;
    top: 0%;
    width: 181%;
    position: absolute;
    height: 100vh;
    text-align: left;
    padding-left: 25px;
}

.el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-primary-light-9);
}

.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.table {
    width: 98%;
    top: 3%;
    font-size: medium;
}

.elOperation {
    top: 20px;
}

.container>h2 {
    margin-top: 30px;
}
.el-pagination{
    position: relative;
    float: right;
    margin-top: 100px;
    margin-right: 25px;
}
</style>