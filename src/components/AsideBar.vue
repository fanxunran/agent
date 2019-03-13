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

export default {
  name: 'asideBar',
  data() {
    return {
      menu: [
        { path: '/index/configList', label: '画像分析' },
        { path: '/index/reportLog', label: '用户人群' },
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
  }
}
</script>

<style scoped>

</style>
