// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' //vue的路由实例化对象
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import qs from 'qs'
import { Header,MessageBox,Button,Radio } from 'mint-ui';

Vue.component(Radio.name, Radio);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button)

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
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.config.devtools = false;

//模糊搜索
/**
 * 持续调用只执行一次工具方法
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）
 * @return {Function}     返回一个“去弹跳”了的函数
 */
Vue.prototype.debounce = function debounce(fn, delay) {

  // 定时器，用来 setTimeout
  var timer

  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function () {

    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this
    var args = arguments

    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer)

    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function () { //句柄
      fn.apply(this, args)
    }, delay)
  }
}

const routeList = ['/tabs/companyList','/tabs/taxationList','/detial','/tabs/shoppingCart','/Order']
router.beforeEach((to,from,next)=>{
  for (var i = 0; i < routeList.length; i++) {
    if (to.path == routeList[i]) { //检测需要登录地址
      //判断当前有没有登录
      //如果没有登录则跳转到登录页
      axios.post('/xinda-api/sso/login-info').then(data=>{
        if (data.data.status == 0) { //没有登录
          next('/outter/login');
        }else{
          next();
        }
      })
      break;
    }
    next();
  }
  //判断移动端还是pc端
  if (to.path == "/HomePage") {
    if (browserRedirect()) {
      next("/m")
    } else {
      next();
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>', //用字符串的内容<App/>替换了#app的标签
  components: {
    App
  }
})

function browserRedirect() {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  if (
    bIsIpad ||
    bIsIphoneOs ||
    bIsMidp ||
    bIsUc7 ||
    bIsUc ||
    bIsAndroid ||
    bIsCE ||
    bIsWM
  ) {
    return true;
  } else {
    return false;
  }
}


//判断手机端重新设置fon-size
if(browserRedirect()) {
  (function(doc, win) {
    var docEl = doc.documentElement,
      resizeEvt =
        "orientationchange" in window ? "orientationchange" : "resize",
      recalc = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
          docEl.style.fontSize = 100 * (clientWidth / 750) + "px";
      };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener("DOMContentLoaded", recalc, false);
  })(document, window);
}