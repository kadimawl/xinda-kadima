// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'    //vue的路由实例化对象
import axios  from 'axios'


Vue.prototype.ajax = axios;
Vue.config.productionTip = false;
Vue.config.devtools = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',   //用字符串的内容<App/>替换了#app的标签
  components: { App }
})


