// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/reset.css'
import App from './App'
import router from './router'
import filters from './utils/filters';
import 'echarts/map/js/china.js';//解决地图只出现海南诸岛bug

//引入echarts库
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(echarts)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
