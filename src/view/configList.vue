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
        },
        pn: 1,
        numbers: 20
      }
    },
    mounted(){
      this.getTagcategoryList()
    },
    methods:{
      getTagcategoryList(){
        agentApi
          .tagcategoryList({
            pn: this.pn,
            numbers: this.numbers
          })
          .then(res => {
            console.log(res.data);
            // this.tableData = res.data
          });
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
