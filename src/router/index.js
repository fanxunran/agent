import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
// import configList from '@/components/configList'
// import reportLog from '@/components/reportLog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "index",
      meta: {title: "首页"},
      component: () => import('../components/index.vue'),
      redirect: "/index/configList",
      children: [
        {
          path: "/index/configList",
          name: "home",
          component: () => import("../view/configList"),
          meta: {title: "参数配置列表"}
        },
        {
          path: "/index/reportLog",
          name: "home",
          component: () => import("../view/reportLog"),
          meta: {title: "上报日志列表"}
        },
        {
          path: "/index/reportLog",
          name: "home",
          component: () => import("../view/reportLog"),
          meta: {title: "定时器列表"}
        },
        {
          path: "/index/reportLog",
          name: "home",
          component: () => import("../view/reportLog"),
          meta: {title: "任务列表"}
        },
        {
          path: "/index/reportLog",
          name: "home",
          component: () => import("../view/reportLog"),
          meta: {title: "数据源列表"}
        },
        {
          path: "/index/reportLog",
          name: "home",
          component: () => import("../view/reportLog"),
          meta: {title: "SQL查询"}
        },
        {
          path: "/index/reportLog",
          name: "home",
          component: () => import("../view/reportLog"),
          meta: {title: "新增任务"}
        },
        {
          path: "/index/overview",
          name: "home",
          component: () => import("../view/overview"),
          meta: {title: "图表样式"}
        }
      ]
    }
  ]
})

