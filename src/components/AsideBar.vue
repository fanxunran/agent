<template>
  <el-menu
    default-active="/index/configList"
    background-color="#324057"
    text-color="#fff"
    active-text-color="#409EFF"
    class="el-menu-vertical-demo">
    <el-menu-item v-for="(item,index) in menu"
          :index="item.path"
         :key="index"
         class="side-menu"
         @click="jump(item)">
      <p>{{item.label}}</p>
    </el-menu-item>
  </el-menu>
</template>

<script>
  import agentApi from '../api/index';
export default {
  name: 'asideBar',
  data() {
    return {
      menu: [
        { path: '/index/configList', label: '参数配置列表' },
        { path: '/index/reportLog', label: '上报日志列表' },
        { path: '/index/timerList', label: '定时器列表' },
        { path: '/index/taskList', label: '任务列表' },
        { path: '/index/dataSourceList', label: '数据源列表' },
        { path: '/index/getDataSource', label: 'SQL查询' },
        { path: '/index/addTask', label: '新增任务' },
        { path: '/index/overview', label: '新增任务' }
      ],
      key: ''
    }
  },
  computed: {
    path () {
      return this.$route.path
    },
  },
  mounted(){
    this.getMenuData()
  },
  methods: {
    handleOpen (){

    },
    jump(item) {
      this.checked = item.path;
      console.log('this.checked', this.checked);
      this.$router.push({ path: item.path });
    },
    getMenuData(){
      agentApi
        .configList({
          key: this.key,
        })
        .then(res => {
          console.log(res.data)
        });
    }
  }
}
</script>

<style scoped>

</style>
