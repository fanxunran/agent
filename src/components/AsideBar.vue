<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    background-color="#324057"
    text-color="#fff"
    active-text-color="#409EFF">
    <el-menu-item index="1">
      <span slot="title">参数配置列表</span>
    </el-menu-item>
    <el-menu-item index="2">
      <span slot="title">上报日志列表</span>
    </el-menu-item>
    <el-menu-item index="3">
      <span slot="title">定时器列表</span>
    </el-menu-item>
    <el-menu-item index="4">
      <span slot="title">任务列表</span>
    </el-menu-item>
    <el-menu-item index="5">
      <span slot="title">数据源列表</span>
    </el-menu-item>
    <el-menu-item index="6">
      <span slot="title">SQL查询</span>
    </el-menu-item>
    <el-menu-item index="7">
      <span slot="title">新增任务</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'asideBar',
    methods: {
      handleOpen (){

      }
    }
  }
</script>

<style scoped>
.el-menu{
  width: 200px;
}
</style>
