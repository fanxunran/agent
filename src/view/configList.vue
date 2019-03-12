<template>
<div>
  <div class="top-content">
    <el-button size="small" type="success">增加</el-button>
    <el-input size="small" v-model="key" class="importText"  placeholder="请输入内容"></el-input>
    <el-button size="small" type="primary">查询</el-button>
  </div>
  <div class="middle-content">
    <template>
      <el-table
        :data="tableData"
        stripe
        class="table-list"
        style="width: 100%">
        <el-table-column
          prop="key"
          label="key"
          width="150">
        </el-table-column>
        <el-table-column
          prop="value"
          label="value">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</div>
</template>

<script>
  import agentApi from '../api/index';
  export default {
    name: 'configList',
    data(){
      return {
        key:'',
        tableData:[]
      }
    },
    mounted(){
      this.getMenuData()
    },
    methods:{
      getMenuData(){
        agentApi
          .configList({
            key: this.key,
          })
          .then(res => {
            this.tableData = res.data
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .importText{
    width:200px;
  }
  .top-content{
    margin-bottom:20px;
  }
</style>
