<template>
<div>
  <div class="middle-content">
    <p class="title">标签分类</p>
    <div class="con-button">
      <el-button type="primary" size="mini" round @click="dialogFormVisible = true">添加分类</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="分类名称"
        >
      </el-table-column>
      <el-table-column
        prop="code"
        label="分类代码"
        >
      </el-table-column>
      <el-table-column
        prop="descriptions"
        label="分类说明"
        show-overflow-tooltip
        >
      </el-table-column>
      <el-table-column
        prop="namePinyin"
        label="分类名称对应的拼音"
        >
      </el-table-column>
      <el-table-column
        prop="bizType"
        label="业务类型"
        >
      </el-table-column>
      <el-table-column
        prop="tagCount"
        label="标签数量">
        <template slot-scope="scope">
          <el-button v-if="scope.row.tagCount"
                     class="formButton"
                     type="primary"
                     round
          @click="">{{scope.row.tagCount}}</el-button>
        </template>
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
        prop="createdBy"
        label="创建者"
        >
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        show-overflow-tooltip>
        <template slot-scope = "scope">
          {{scope.row.updateTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="updatedBy"
        label="更新者"
        >
      </el-table-column>
      <el-table-column
        prop="updateCnt"
        label="更新次数"
        >
      </el-table-column>
      <el-table-column
        label="操作"
      width="200">
        <template slot-scope="scope">
          <!--<el-button @click="handleClick(scope.row)" type="text" size="small">调整顺序</el-button>-->
          <span class="orderTitle">调整顺序</span>
          <el-input size="medium" class="orderValue" type="text" v-model.number="order[scope.row.id]" @blur="changeCategoryMove(scope.row.id)"></el-input>
          <span class="orderTitle">{{scope.row.status=== "Y" ? '上线' : '下线' }}</span>
        </template>
      </el-table-column>
    </el-table>

    <!--新增分类内容-->
    <el-dialog title="新增分类:" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类代码:" :label-width="formLabelWidth">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类说明:" :label-width="formLabelWidth">
          <el-input v-model="form.descriptions" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类名称对应的拼音:" :label-width="formLabelWidth">
          <el-input v-model="form.namePinyin" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="业务类型:" :label-width="formLabelWidth">
          <el-input v-model="form.bizType" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewCategory">确 定</el-button>
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
</div>
</template>

<script>
  import utils from '../utils/date.js';
  import agentApi from '../api/index';
  export default {
    name: 'configList',
    data(){
      return {
        tableData:[],
        order: [],//调整顺序值

        dialogFormVisible: false,
        form: {
          name: '',
          code: '',
          descriptions: '',
          namePinyin: '',
          bizType: ''
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
        return utils.format(date, 'YYYY-MM-DD HH:mm:ss');
      }
    },

    mounted(){
      this.getTagcategoryList();
    },

    methods:{
      //获取标签分类列表
      getTagcategoryList(){
        agentApi
          .tagcategoryList({
            pn: this.page.pageNo,
            numbers: this.page.pageSize
          })
          .then(res => {
            this.tableData = res.data.list;
            this.totalCount = res.data.total;
          });
      },

      //新增分类
      addNewCategory(){
        let params = {
          ...this.form
        };
        agentApi
          .newCategory(params)
          .then(res => {
            this.dialogFormVisible = false;
            this.getTagcategoryList()
          });
      },

      //调整标签分类顺序
      changeCategoryMove(value){
        console.log(this.order);
        if(!this.order[value]){return false;}
        let params = {
          id: value,
          site: this.order[value]
        };
        agentApi
          .categoryMove(params)
          .then(res => {
            this.order = [];
            this.getTagcategoryList()
          });
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
    .el-table {
      .el-table__header-wrapper {
        background: rgba(245, 245, 245, 1);
      }
    }
    .dss-pagination {
      text-align: right;
      margin-top: 10px;
      position: relative;
    }

    .formButton {
      height: 22px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      line-height: 22px;
      margin: 0;
      padding: 0px 5px;
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
    .el-input--medium.orderValue {
      width: 40px;
      height: 22px;

      .el-input__inner {
        height: 22px;
      }
    }
  }
</style>
