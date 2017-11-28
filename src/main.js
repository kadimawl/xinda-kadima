// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'    //vue的路由实例化对象

Vue.config.productionTip = false;
Vue.config.devtools = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',   //用字符串的内容<App/>替换了#app的标签
  components: { App }
})


// console.log('hello vue')
// setTimeout(()=>{   //异步
//   console.log(5);
// },1000);
// var promise = new Promise(function(resolve,reject){   //此function是同步的
//   console.log(1);
//   resolve();      //resolve()对应的事件处理函数不会立即执行
//   console.log(2);
// })
// promise.then(function(){
//   console.log(3);
// })
// console.log(4);




// console.log(2)

// require('./mode')
// import d,{b,c} from './mode';//解构赋值的形式接受的{b:2}
// console.log(b,c,d)