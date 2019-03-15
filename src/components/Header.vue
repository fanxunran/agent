<template>
  <header class="header-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <!-- <img src="./../assets/logo.png" alt="" class="logo"> -->
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
          <i class="el-icon-menu icon-btn"></i>
        </div>
        <span class="title">后台管理系统</span>
      </el-col>
      <el-col :span="6" class="user">
        <div class="btn-fullscreen icon-font"></div>

        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: "header-nav",
  data() {
    return {
      collapse: false, //菜单栏是否闭合
      fullscreen: false,
      showlrc: true
    };
  },
  computed: {

  },
  methods: {
    collapseChage(){

    }
  },
  components: {

  }
};
</script>
<style scoped>
  .header-nav {
    width: 100%;
    height: 50px;
    background: #324057;
    color: #fff;
    border-bottom: 1px solid #1f2d3d;
    overflow: hidden;
    padding: 5px 0;
  }

  .collapse-btn {
    width: 50px;
    margin-left: 20px;
    display: inline-block;
  }
  .aplayer {
    margin: 0;
  }
  .icon-btn {
    font-size: 36px;
    vertical-align: middle;
    cursor: pointer;
  }
  .logo-container {
    line-height: 50px;
    min-width: 400px;
    padding: 0 5px;
    text-align: left;
  }

  .logo {
    height: 50px;
    width: 50px;
    margin-right: 5px;
    vertical-align: middle;
    display: inline-block;
  }

  .title {
    vertical-align: middle;
    font-size: 22px;
    font-family: "Microsoft YaHei";
    letter-spacing: 3px;
  }

  .user {
    line-height: 50px;
    text-align: right;
    float: right;
    padding-right: 10px;
  }

</style>
