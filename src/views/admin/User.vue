<template>
    <Admin />
    <div class="container">
        <h2>用户信息</h2>
        <div class="elOperation">
            <el-button type="primary" plain @click="drawer2 = true">新增</el-button>
            <el-button type="danger" plain @click="">删除</el-button>
        </div>
        <el-table v-loading="loading" :data="tableData" class="table" :row-class-name="tableRowClassName"
            @selection-change="handleSelectionChange" :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{ 'text-align': 'center' }">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="age" label="年龄" width="180" />
            <el-table-column prop="email" label="E-MAIL" width="230" />
            <el-table-column prop="nickName" label="昵称" width="180" />
            <el-table-column prop="phoneNumber" label="手机号码" width="230" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="50" />

        <el-drawer v-model="drawer2" :direction="direction" :before-close="handleClose">
            <template #header>
                <h4>新增用户信息</h4>
            </template>
            <template #default>
                <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
                    class="demo-ruleForm">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model.number="ruleForm.age" />
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="昵称" prop="nickName">
                        <el-input v-model="ruleForm.nickName" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phoneNum">
                        <el-input v-model="ruleForm.phoneNum" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
                    </el-form-item>
                </el-form>
            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import Admin from '@/components/layout/Admin.vue'
import { ref, reactive } from 'vue'
import { queryAllUser } from "../../http/data/index.js"
import { tr } from 'element-plus/es/locale';
import { ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

interface User {
    name: string
    age: number
    email: string
    nickName: string
    phoneNumber: string
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
const loading = ref(true);

const tableData: User[] = reactive([]);
queryAllUser().then((res: any) => {
    if (res.length > 0) {
        res.forEach((item: any) => {
            tableData.push(item);
        });
        loading.value = false;
    }
}).catch((err: any) => {
    console.log(err)
})

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

const drawer2 = ref(false)
const direction = ref('rtl')

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('你确定关闭此操作吗?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}
function cancelClick() {
    drawer2.value = false
}
function confirmClick() {
    ElMessageBox.alert(`提交成功`)
        .then(() => {
            drawer2.value = false
        })
        .catch(() => {
            // catch error
        })
}


const ruleFormRef = ref<FormInstance>()

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  age: '',
  name: '',
  email: '',
  phoneNum: '',
  nickName: ''
})

// const rules = reactive<FormRules<typeof ruleForm>>({
//   pass: [{ validator: validatePass, trigger: 'blur' }],
//   checkPass: [{ validator: validatePass2, trigger: 'blur' }],
//   age: [{ validator: checkAge, trigger: 'blur' }],
// })

const rules = reactive({});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
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

.el-pagination {
    position: relative;
    float: right;
    margin-top: 100px;
    margin-right: 25px;
}
</style>