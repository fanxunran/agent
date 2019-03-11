// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/reset.css'
import App from './App'
import router from './router'
import filters from './utils/filters';

//引入echarts库
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

//配置代理引入文件
// import axios from 'axios'
// Vue.prototype.axios = axios
// axios.defaults.baseURL = '/api'

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
