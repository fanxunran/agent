<template>
<div>
  <div class="top-content">
    <el-button size="small" type="success" @click="dialogFormVisible = true">增加</el-button>
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
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="key:">
        <el-input v-model="form.key"></el-input>
      </el-form-item>
      <el-form-item label="value:">
        <el-input v-model="form.value"></el-input>
      </el-form-item>
      <el-form-item label="description:">
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
  import agentApi from '../api/index';
  export default {
    name: 'configList',
    data(){
      return {
        key:'',
        tableData:[],
        dialogFormVisible: false,
        form: {
          key: '',
          value: '',
          desc: ''
        }
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
      },
      onSubmit(){
        const params = this.form;
        console.log(params);
        this.dialogFormVisible = false;
        agentApi
          .addApplication({
            params
          })
          .then(res =>{

          })
      }
    }
  }
</script>

<style lang="scss">
  .importText{
    width:200px;
  }
  .top-content{
    margin-bottom:20px;
  }
  .middle-content{
   .el-table{
     .el-table__header-wrapper{
       background: rgba(245, 245, 245, 1);
     }
   }
  }
</style>
