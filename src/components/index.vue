<template>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <AsideBar></AsideBar>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import AsideBar from '@/components/AsideBar';
import Header from "@/components/Header";
// import configList from "@/components/configList";
export default {
  name: 'HelloWorld',
  components: {AsideBar, Header},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header {
    margin:0;
    padding:0;
  }

  .el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
    position: fixed;
    top: 71px;
    left: 0;
    min-height: 100%;
    background-color: #324057;
    z-index: 99;
  }

  .el-main {
    position: absolute;
    left: 180px;
    right: 0;
    top: 72px;
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 30px;
    transition: left 0.3s ease-in-out;
    background: aliceblue;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

</style>
