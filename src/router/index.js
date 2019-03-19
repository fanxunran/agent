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
          meta: {title: "分类"}
        },
        {
          path: "/index/reportLog",
          name: "home",
          component: () => import("../view/reportLog"),
          meta: {title: "标签"}
        },
        {
          path: "/index/tagValue",
          name: "home",
          component: () => import("../view/tagValue"),
          meta: {title: "标签值"}
        },
      ]
    }
  ]
})

