<template>
  <div class="middle-content">
    <p class="title">角色权限</p>
    <div class="con-button">
      <el-button type="primary" size="mini" round @click="addButton">新增权限</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="50">
      </el-table-column>
      <el-table-column
        prop="code"
        label="role编码">
      </el-table-column>
      <el-table-column
        prop="resType"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="resCode"
        label="分类code/标签">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        show-overflow-tooltip>
        <template slot-scope = "scope">
          {{scope.row.createTime | formatDate}}
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <!--<el-button @click="handleClick(scope.row)" type="text" size="small">调整顺序</el-button>-->
          <span class="orderTitle button" @click="todoUserRoleDelete(scope.row.id)">删除</span>
          <span class="orderTitle button" @click="gettagcategoryContent(scope.row.id)">修改</span>
        </template>
      </el-table-column>
    </el-table>

    <!--新增分类内容-->
    <el-dialog :title="typeValue.title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item v-if="typeValue===typeTitle.UPDATE" label="id:" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="role编码:" :label-width="formLabelWidth">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源类:" :label-width="formLabelWidth">
          <el-input v-model="form.roleResourceType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类code/标签:" :label-width="formLabelWidth">
          <el-input v-model="form.resCodes" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="operation">{{typeValue.button}}</el-button>
      </div>
    </el-dialog>


    <!--分页功能-->
    <el-pagination layout="prev, pager, next, jumper, sizes, total"
                   :total="totalCount"
                   :page-size="page.pageSize"
                   :current-page="page.pageNo"
                   :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
                   @size-change="onSizeChange"
                   @current-change="onPageChange"
                   class="dss-pagination">
    </el-pagination>
  </div>
</template>

<script>
  import utils from '../utils/index.js';
  import agentApi from '../api/index';
  const typeTitle = {
    ADD: { title: '新增内容', button: '提交'},
    UPDATE: { title: '更新内容', button: '更新'}
  };
  export default {
    name: 'configList',
    data(){
      return {
        typeTitle,
        typeValue: typeTitle.ADD,
        tableData:[],
        order: [],//调整顺序值
        status: null,

        operationType: 'ADD',//ADD新增，UPDATE更新
        dialogFormVisible: false,
        form: {
          id: '',
          code: '',
          roleResourceType: '',
          resCodes: ''
        },
        formLabelWidth: '150px',


        page: {
          pageNo: 1,
          pageSize: 20
        },
        totalCount: 0,
      }
    },

    filters: {
      formatDate(time) {
        var date = new Date(time);
        return utils.timeFormat(date, 'YYYY-MM-DD HH:mm:ss');
      }
    },

    mounted(){
      this.getTagcategoryList();
    },

    methods:{
      //添加按钮
      addButton(){
        this.dialogFormVisible = true;
        this.typeValue = typeTitle.ADD
      },
      //提交
      operation(){
        switch (this.typeValue) {
          case typeTitle.ADD :
            this.addNewCategory();
            break;
          case typeTitle.UPDATE :
            this.TodoUpdateCategory();
            break;
          case defalut:
            break;
        }
      },
      //获取用户角色列表
      getTagcategoryList(){
        agentApi
          .roleList({
            pn: this.page.pageNo,
            numbers: this.page.pageSize
          })
          .then(res => {
            this.tableData = res.data.list;
            this.totalCount = res.data.total;
          });
      },

      //删除用户角色
      todoUserRoleDelete(id){
        agentApi
          .roleDelete({
            id:id
          })
          .then(res => {
            this.getTagcategoryList()
          });
      },

      //获取用户角色内容
      gettagcategoryContent(id){
        agentApi
          .rolegeGet({
            id: id,
          })
          .then(res => {
            utils.listAssign(this.form ,res.data);
            this.dialogFormVisible = true;
            this.typeValue = typeTitle.UPDATE
          });
      },

      //新增用户角色
      addNewCategory(){
        let params = {
          ...this.form
        };
        agentApi
          .roleAdd(params)
          .then(res => {
            this.dialogFormVisible = false;
            this.getTagcategoryList()
          });
      },

      //更新用户角色
      TodoUpdateCategory(){
        let params = {
          ...this.form
        };
        agentApi
          .roleUpdate(params)
          .then(res => {
            this.dialogFormVisible = false;
            this.getTagcategoryList()
          });
      },

      //跳转到标签页
      toTagPage(value){
        this.$router.push({ path: '/index/reportLog', query: { code: value } })
      },

      //每页展示条数
      onSizeChange(size) {
        this.page.pageSize = size;
        this.page.pageNo = 1;
        this.getTagcategoryList();
      },

      //当前展示页码
      onPageChange(page) {
        this.page.pageNo = page;
        this.getTagcategoryList();
      }
    }
  }
</script>

<style lang="less">
  @import "../style/da-table.less";
  .importText{
    width:200px;
  }
  .top-content{
    margin-bottom:20px;
  }
  .middle-content {
    .el-table.el-table--fit {
      /*overflow: scroll;*/
      .el-table__header-wrapper {
        background: rgba(245, 245, 245, 1);
      }
    }
    .dss-pagination {
      text-align: right;
      margin-top: 10px;
      position: relative;
      margin-bottom: 40px;
    }

    .formButton {
      height: 22px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      line-height: 22px;
      margin: 0;
      padding: 0 5px;
      width: 40px;
    }
    .orderTitle {
      height: 22px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      line-height: 22px;
      color: #409eff;
    }
    .orderTitle.button{
      cursor: pointer;
    }
    .el-input--medium.orderValue {
      width: 40px;
      height: 22px;

      .el-input__inner {
        height: 22px;
      }
    }
  }
</style>

