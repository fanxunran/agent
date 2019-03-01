<template>
  <el-menu
    default-active="1"
    background-color="#324057"
    text-color="#fff"
    active-text-color="#409EFF"
    class="el-menu-vertical-demo">
    <el-menu-item v-for="(item,index) in menu"
         :key="index"
         class="side-menu"
         :class="{'checked':checked===item.path}"
         @click="jump(item)">
      <p>{{item.label}}</p>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'asideBar',
  data() {
    return {
      checked: '/index/configList',
      menu: [
        { path: '/index/configList', label: '参数配置列表' },
        { path: '/index/reportLog', label: '上报日志列表' },
        { path: '/index/timerList', label: '定时器列表' },
        { path: '/index/taskList', label: '任务列表' },
        { path: '/index/dataSourceList', label: '数据源列表' },
        { path: '/index/getDataSource', label: 'SQL查询' },
        { path: '/index/addTask', label: '新增任务' }
      ]
    }
  },
  methods: {
    handleOpen (){

    },
    jump(item) {
      this.checked = item.path;
      console.log('this.checked', this.checked);
      this.$router.push({ path: item.path });
    },
  }
}
</script>

<style scoped>
.el-menu{
  width: 200px;

}
</style>
