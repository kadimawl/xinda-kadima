// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'    //vue的路由实例化对象
<<<<<<< HEAD
import axios  from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

=======
import axios from 'axios'
>>>>>>> 1ba99b8b45869b6c8987f72ea5fe5d5c4079a32e

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
Vue.use(ElementUI)
Vue.config.productionTip = false;
Vue.config.devtools = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',   //用字符串的内容<App/>替换了#app的标签
  components: { App }
})


