<template>
  <el-menu
    default-active="/index/configList"
    class="el-menu-vertica">
    <el-menu-item v-for="(item,index) in menu"
          :index="item.path"
         :key="index"
         class="side-menu"
         @click="jump(item)">
      <p>{{item.label}}</p>
    </el-menu-item>
  </el-menu>
</template>
<!--background-color: #cfdcf2;-->
<script>

export default {
  name: 'asideBar',
  data() {
    return {
      menu: [
        { path: '/index/configList', label: '用户分类' },
        { path: '/index/privilegeAction', label: '用户角色配置' },
        { path: '/index/roleAction', label: '角色权限配置' }
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

  },
  methods: {
    jump(item) {
      this.checked = item.path;
      console.log('this.checked', this.checked);
      this.$router.push({ path: item.path });
    },
  }
}
</script>

<style scoped lang="less">
.el-menu{
  background-color: #eceff3;
  color: #757575;
  .side-menu.is-active{
    background-color: #cfdcf2;
    color: #3879fb;
  }
  .side-menu:hover{
    background-color: #cfdcf2;
    color: #3879fb;
  }
}
</style>
