<template>
<div>
  画像分析
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
