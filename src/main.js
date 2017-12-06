// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'    //vue的路由实例化对象
import store from './store'
import axios  from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import qs from 'qs'

import qs from 'qs'


var objSort = function (name) {
  return function (o, p) {
    var a, b;
    if (typeof o === "object" && typeof p === "object" && o && p) {
      a = o[name];
      b = p[name];
      if (a === b) {
        return 0;
      }
      if (typeof a === typeof b) {
        return a < b ? -1 : 1;
      }
      return typeof a < typeof b ? -1 : 1;
    } else {
      throw "error";
    }
  };
};
Vue.prototype.objSort = objSort;
Vue.prototype.ajax = axios;
Vue.prototype.qs = qs;
Vue.use(ElementUI)
Vue.config.productionTip = false;
Vue.config.devtools = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',   //用字符串的内容<App/>替换了#app的标签
  components: { App }
})


