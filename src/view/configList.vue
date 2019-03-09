<template>
<div>
  <div class="top-content">
    <el-button type="success">增加</el-button>
    <el-input v-model="key" class="importText"  placeholder="请输入内容"></el-input>
    <el-button type="primary">查询</el-button>
  </div>
  <div class="middle-content">
    <template>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="key"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="value"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
        </el-table-column>
      </el-table>
    </template>
  </div>
</div>
</template>

<script>
  export default {
    name: 'configList',
    data(){
      return {
        key:'',
        tableData:[]
      }
    }
  }
</script>

<style scoped>
.importText{
  width:200px;
}
</style>
