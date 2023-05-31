<script setup  lang="ts">
import { reactive, onMounted } from "vue";
import { ElMessage } from 'element-plus'
import { sqlRequest } from "../../http/data/index.js"
import useClipboard from 'vue-clipboard3'

const data = reactive({
  visible: false,
  sqlStatement: '',
  sqlPara: '',
  returnSql: '',
  isShow: false
})

const add = (): void => {
  if (data.sqlStatement == '') {
    ElMessage.error('暂无SQL语句');
    return;
  };
  if (data.sqlPara == '') {
    ElMessage.error('暂无SQL参数');
    return;
  };

  sqlRequest(data).then(res => {
    data.returnSql = res.returnSql;
    console.log("sql", data.returnSql);
    //判断是否显示结果框
    if (data.returnSql != null) {
      data.isShow = true
      //复制替换过的sql到剪贴板
      touchCopy()
    }
  }).catch(err => {
    console.log(err)
  })
};

// 点击复制
function touchCopy() {
  // 调用
  copy(data.returnSql)
  ElMessage.success('SQL语句复制成功')
}
// 使用插件
const { toClipboard } = useClipboard()
const copy = async (msg) => {
  try {
    // 复制
    await toClipboard(msg)
    // 复制成功
  } catch (e) {
    // 复制失败
  }
}

const deleteData = (): void => {
  data.sqlStatement = '',
    data.sqlPara = ''
  data.returnSql = ''
  data.isShow = false
};



</script>

<template>
  <div class="sql">
    <el-page-header :icon="1">
      <template #content>
        <div class="flex items-center">
          <el-avatar :size="32" class="mr-3" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        </div>
      </template>
    </el-page-header>
    <div class="common-layout">
      <el-container>
        <el-header>
          <el-divider>Structured Query Language</el-divider>
        </el-header>
        <el-main>
          <el-button type="primary">SQL语句</el-button>
          <el-button type="danger" round class="copy" v-on:click="deleteData()">清空</el-button>
          <el-input type="textarea" :rows="5" class="textarea" placeholder="请输入sql" v-model="data.sqlStatement">
          </el-input>
          <el-divider></el-divider>
          <el-button type="primary">SQL参数</el-button>
          <el-input v-model="data.sqlPara" class="textarea" placeholder="请输入参数"></el-input>
          <el-divider></el-divider>
          <el-button class="sqlbutton" type="primary" round @click="add()">开始替换SQL语句</el-button>
          <el-button type="warning" round v-if="data.isShow" v-clipboard:copy="data.returnSql" v-on:click="touchCopy()"
            class="copy">复制
          </el-button>
          <el-input v-if="data.isShow" type="textarea" class="textarea" :rows="5" v-model="data.returnSql">
          </el-input>
        </el-main>
      </el-container>
    </div>
  </div>
</template>


<style scoped>
.sql {
  width: 200%;
}

.el-button {
  float: left;
}

.el-main {
  text-align: center;
}

.copy {
  float: right;
}

.textarea {
  border: none;
  outline: none;
  resize: none;
  appearance: none;
  box-sizing: border-box;
  border-radius: 0.03rem;
  font-size: 1rem;
  font-weight: 400;
}

.el-page-header {
  margin-top: 20px;
}
</style>
