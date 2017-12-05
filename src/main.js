// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'    //vue的路由实例化对象
<<<<<<< HEAD
import axios  from 'axios'
=======
import axios from 'axios'
>>>>>>> 4dbc4f1b3e8aaf75b202c11de7ae1e9c05637ce1
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


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


