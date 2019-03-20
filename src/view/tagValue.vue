<template>
  <div class="middle-content">
    <p class="title">标签值</p>
    <div class="con-button">
      <el-button type="primary" size="mini" round @click="addButton">添加标签值</el-button>
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
        prop="name"
        label="维度名称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="dimValue"
        label="维度对应的值"
        width="120">
      </el-table-column>
      <el-table-column
        prop="descriptions"
        label="描述信息"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="namePinyin"
        label="标签名称对应的拼音"
        width="160">
      </el-table-column>
      <el-table-column
        prop="typeCode"
        label="类型编码"
        width="150">
      </el-table-column>
      <el-table-column
        prop="tagCode"
        label="标签code"
        width="80">
      </el-table-column>
      <el-table-column
        prop="orderId"
        label="排序id"
        width="130">
      </el-table-column>
      <el-table-column
        prop="queryCnt"
        label="标签使用次数"
        width="110">
      </el-table-column>
      <el-table-column
        prop="showLevel"
        label="展示级别"
        width="120">
      </el-table-column>

      <el-table-column
        prop="createTime"
        label="创建时间"
        width="100"
        show-overflow-tooltip>
        <template slot-scope = "scope">
          {{scope.row.createTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="createdBy"
        label="创建者"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="100"
        show-overflow-tooltip>
        <template slot-scope = "scope">
          {{scope.row.updateTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="updatedBy"
        label="更新者"
        width="100">
      </el-table-column>

      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <!--<el-button @click="handleClick(scope.row)" type="text" size="small">调整顺序</el-button>-->
          <span class="orderTitle">调整顺序</span>
          <el-input size="medium" class="orderValue" type="text" v-model.number="order[scope.row.id]" @blur="changeCategoryMove(scope.row.id)"></el-input>

          <el-tooltip class="item" effect="dark" content="修改上下线状态" placement="top-start">
            <span class="orderTitle button" @click="TodoUpdateStatus(scope.row)">{{scope.row.status=== "Y" ? '上线' : '下线' }}</span>
          </el-tooltip>
          <span class="orderTitle button" @click="getTagcategoryContent(scope.row.id)">修改</span>
        </template>
      </el-table-column>
    </el-table>

    <!--新增分类内容-->
    <el-dialog :title="typeValue.title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item v-if="typeValue===typeTitle.UPDATE" label="id:" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签名称:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="维度对应的值:" :label-width="formLabelWidth">
          <el-input v-model="form.dimValue" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述信息:" :label-width="formLabelWidth">
          <el-input v-model="form.descriptions" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型编码:" :label-width="formLabelWidth">
          <el-input v-model="form.typeCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签code:" :label-width="formLabelWidth">
          <el-input v-model="form.tagCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="展示级别:" :label-width="formLabelWidth">
          <el-input v-model="form.showLevel" autocomplete="off"></el-input>
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
        code: null,
        typeTitle,
        typeValue: typeTitle.ADD,
        tableData:[],
        order: [],//调整顺序值
        status: null,

        operationType: 'ADD',//ADD新增，UPDATE更新
        dialogFormVisible: false,
        form: {
          id: '',
          name: '',
          dimValue: '',
          descriptions: '',
          typeCode: '',
          tagCode: '',
          showLevel: ''
        },
        formLabelWidth: '160px',


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
      this.code = this.$route.query.code;
      this.getTagList();
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
      //获取标签分类列表
      getTagList(){
        agentApi
          .tagValueList({
            pn: this.page.pageNo,
            numbers: this.page.pageSize,
            code: this.code
          })
          .then(res => {
            this.tableData = res.data.list;
            this.totalCount = res.data.total;
          });
      },

      //获取单条分类内容
      getTagcategoryContent(id){
        agentApi
          .tagValueCategory({
            ids: id,
            cid: cid
          })
          .then(res => {
            utils.listAssign(this.form ,res.data);
            this.dialogFormVisible = true;
            this.typeValue = typeTitle.UPDATE
          });
      },

      //新增分类
      addNewCategory(){
        let params = {
          ...this.form
        };
        agentApi
          .tagValueAdd(params)
          .then(res => {
            this.dialogFormVisible = false;
            this.getTagList()
          });
      },

      //更新分类
      TodoUpdateCategory(){
        let params = {
          ...this.form
        };
        agentApi
          .tagValueUpdate(params)
          .then(res => {
            this.dialogFormVisible = false;
            this.getTagList()
          });
      },

      //更新分类状态
      TodoUpdateStatus(value){
        let params = {
          id: value.id,
          status: value.status==='Y'? 0 : 1
        };
        agentApi
          .tagValueStatus(params)
          .then(res => {
            this.getTagList();
            this.$message({
              message: '状态更新成功',
              type: 'success'
            });
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
          .tagValueMove(params)
          .then(res => {
            this.order = [];
            this.getTagList()
          });
      },


      //每页展示条数
      onSizeChange(size) {
        this.page.pageSize = size;
        this.page.pageNo = 1;
        this.getTagList();
      },

      //当前展示页码
      onPageChange(page) {
        this.page.pageNo = page;
        this.getTagList();
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
  .el-select{
    width:100%;
  }

</style>
