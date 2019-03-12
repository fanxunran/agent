<template>
<div class="content">
  <el-row :gutter="20">
    <el-col :span="24"><div class="grid-content bg-purple-dark">
        <ChartTrend></ChartTrend>
    </div></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="grid-content bg-purple">
        <ChartMap></ChartMap>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple-light">
        <Chartbar></Chartbar>
    </div>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="8"><div class="grid-content bg-purple">
      <ChartbarXShadow></ChartbarXShadow>
    </div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple-light">
      <ChartbarYShadow></ChartbarYShadow>
    </div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple">
      <ChartPie></ChartPie>
    </div></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="24"><div class="grid-content bg-purple-dark">
    </div></el-col>
  </el-row>
</div>
</template>

<script>
  import ChartPie from '../components/common/ChartPie'
  import Chartbar from '../components/common/Chartbar'
  import ChartTrend from '../components/common/ChartTrend'
  import ChartbarYShadow from '../components/common/ChartbarYShadow'
  import ChartbarXShadow from '../components/common/ChartbarXShadow'
  import ChartMap from '../components/common/ChartMap'
  export default {
    name: 'overview',
    components:{ChartMap, ChartPie, Chartbar, ChartbarXShadow, ChartbarYShadow, ChartTrend},
    data(){
      return{

      }
    }
  }
</script>

<style lang="scss">
  .el-row {
    margin-bottom: 20px;
    &:last-child {
    margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    height:300px;
    background: #ffffff;
    padding: 20px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
