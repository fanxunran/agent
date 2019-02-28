<template>
  <div id="app">
    <el-container class="container">
      <div style="position:absolute;top:60px;bottom: 0;width:200px;background: #36455E;"></div>
      <el-aside width="200px" v-loading="loading">
        <div class="key-search" v-if="epList.length">
          <i class="el-icon-search"></i><el-select style="width:152px" filterable v-model="value" placeholder="请选择" size="small">
          <el-option
            v-for="item in epList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            @click.native="onEpChanage(item)">
          </el-option>
        </el-select>
        </div>
        <el-menu router :default-active="path">
          <template v-for="(item,index) in menus">
            <el-submenu v-if="item.childMenu&&item.childMenu.length" :index="item.url" :key="index">
              <template slot="title">
                <i :class="icons[item.url]"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item v-for="(child,index) in item.childMenu" :index="child.url" :key="index">{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="item.url" :key="index">
              <i :class="icons[item.url]"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-container style="padding: 17px 30px 30px">
        <el-main v-if="isNoCard" style="padding:0;overflow: unset;">
          <transition name="fade" mode="out-in">
            <router-view v-if="isRouterAlive"/>
          </transition>
        </el-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  // import { mapState } from 'vuex'
  // import store from '@/dss-common/store/base'
  // import baseApi from '@/dss-common/api/base'
  // import mixin from '@/dss-common/mixins/base'
export default {
  mixins: [mixin],
  data() {
    return {
      loading: true,
      epList: [],
      value: '',
      titles: {
        'log': ['操作日志'],
        'store': ['门店管理'],
        'device': ['热点设备管理'],
        'content': ['内容管理'],
        'feedback': ['问题管理'],
        'user/list': ['用户管理'],
        // 'user/code': ['用户管理', '邀请码生成'],
        'company/review': ['企业管理', '企业审核'],
        'company/auth': ['企业管理', '企业权限管理'],
        'company/role': ['企业管理', '角色管理'],
        //'member/analyze': ['我的会员', '会员分析'],
        'member/list': ['我的会员', '会员管理'],
        //'member/growup': ['我的会员', '会员成长体系'],
        //'member/reward': ['我的会员', '会员积分体系'],
        'member/profile': ['我的会员', '会员画像'],
        'monitor/conditionManage': ['监控管理', '监控项管理']
      },

      icons: {
        '/store': 'icon-store',
        '/user': 'icon-user',
        '/device': 'icon-device',
        '/content': 'icon-content',
        '/feedback': 'icon-feedback',
        '/company': 'icon-company',
        '/member': 'icon-member',
        '/log': 'el-icon-time',
        '/monitor': 'icon-monitor'
      },

      menus: [],
      isRouterAlive: true
    }
  },
  computed: {
    path() {
      return this.$route.path
    },

  },
  methods: {

  },
  mounted () {

  }
}
</script>

<style lang="less">
  .main-title {
    margin: 0;
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #3B4757;
    letter-spacing: 0;
  }

  .container {
    border-radius: 2px;
    padding: 20px 0 0;
    [class^="icon-"] {
      display: inline-block;
      width: 24px;
      height: 24px;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-size: contain;
    }
    [class^="icon-"]:before {
      content: ''
    }
    .icon-store {
      background-image: url('../../dss-common/img/menu/store.png')
    }
    .icon-user {
      background-image: url('../../dss-common/img/menu/user.png')
    }
    .icon-device {
      background-image: url('../../dss-common/img/menu/device.png')
    }
    .icon-content {
      background-image: url('../../dss-common/img/menu/content.png')
    }
    .icon-feedback {
      background-image: url('../../dss-common/img/menu/question.png')
    }
    .icon-company {
      background-image: url('../../dss-common/img/menu/company.png')
    }
    .icon-member {
      background-image: url('../../dss-common/img/menu/member.png')
    }
    .icon-monitor {
      background-image: url('../../dss-common/img/menu/monitor.png')
    }
    .el-menu-item.is-active,
    .el-menu-item:focus,
    .el-menu-item:hover,
    .el-submenu.is-active,
    .el-submenu__title:hover {
      .icon-store {
        background-image: url('../../dss-common/img/menu/store_on.png')
      }
      .icon-user {
        background-image: url('../../dss-common/img/menu/user_on.png')
      }
      .icon-device {
        background-image: url('../../dss-common/img/menu/device_on.png')
      }
      .icon-content {
        background-image: url('../../dss-common/img/menu/content_on.png')
      }
      .icon-feedback {
        background-image: url('../../dss-common/img/menu/question_on.png')
      }
      .icon-company {
        background-image: url('../../dss-common/img/menu/company_on.png')
      }
      .icon-member {
        background-image: url('../../dss-common/img/menu/member_on.png')
      }
      .icon-monitor {
        background-image: url('../../dss-common/img/menu/monitor_on.png')
      }
    }
    .el-submenu.is-opened {
      background: #2B3951;
      .el-menu {
        background: #2B3951;
      }
    }
  }
  .key-search {
    margin: 20px 16px;
    border-bottom: solid 2px rgba(116, 132, 154, 0.25);
    position: relative;
  }
  .key-search .el-input__inner {
    box-sizing: border-box;
    width: 100%;
    background: transparent;
    border: 0;
    outline: 0;
    height: 30px;
    line-height: 30px;
    color: #fff
  }
  .key-search .el-icon-search {
    color: #74849a;
    font-size: 16px;
  }
  .key-search:hover .el-icon-search{
    color: #fff;
  }
</style>
