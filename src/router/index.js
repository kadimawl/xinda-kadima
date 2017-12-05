import Vue from 'vue'
import Router from 'vue-router'
import Distpicker from 'v-distpicker' //三级联动插件
import HelloWorld from '@/components/HelloWorld' //默认首页
import outter from '../components/outter' //一级路由（登录、注册、忘记密码）
import login from '@/views/login' //注册
import register from '@/views/register' //登录
import forgetpw from '@/views/forgetpw' //忘记密码


import HomePage from '@/components/ModelHomePage/HomePage' //首页模块
import taxationList from '@/components/ModelHomePage/taxationList' //财税服务模块
import companyList from '@/components/ModelHomePage/companyList' //公司工商模块
import goodsDetails from '@/components/ModelHomePage/goodsDetails' //商品详情模块
import shoppingCart from '@/components/ModelHomePage/shoppingCart' //购物车模块

import member from '@/members/member'
import memberBody from '@/members/memberBody'
import userEval from '@/members/userEval'
import gotoeval from '@/members/gotoeval'
import accountSet from '@/members/accountSet'
import evalNone from '@/members/evalNone'
import evalAlready from '@/members/evalAlready'
import accountsetBody from '@/members/accountsetBody'
import changePd from '@/members/changePd'



import detial from '@/components/detial'//商品详情
import shopIndex from '@/components/shopIndex'//店铺首页
import Order from '@/components/Order'//订单详情路由

import shopList from '@/components/shopList'//店铺列表路由
import credentials from '@/components/ShopList/credentials'//店铺列表路由
import custom from '@/components/ShopList/custom'//店铺列表路由
import product from '@/components/ShopList/product'//店铺列表路由

import order from '@/components/order/order' //订单详情
import paymentSuccess from '@/components/order/paymentSuccess' //支付成功
import paymentFailure from '@/components/order/paymentFailure' //支付失败
import payZfb from '@/components/order/payZfb' //支付宝支付
import payBank from '@/components/order/payBank' //银行支付


Vue.component('v-distpicker', Distpicker)
Vue.use(Router)
export default new Router({
  routes: [
    //首页
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [{
        path: '/HomePage',
        alias: '/',
        component: HomePage,
      }]
    },

    {
      path: 'outter',
      name: 'outter',
      component: outter,
      children: [{
        path: '/outter/login',
        component: login,
      }, {
        path: '/outter/register',
        component: register
      }, {
        path: '/outter/forgetpw',
        component: forgetpw
      }]
    },

    {
      path: '/taxationList', //财税服务
      name: 'taxationList',
      component: taxationList
    },
    {
      path: '/companyList', //公司工商
      name: 'companyList',
      component: companyList
    },
    {
      path: '/goodsDetails', //商品详情
      name: 'goodsDetails',
      component: goodsDetails
    },
    {
      path: '/shoppingCart', //购物车
      name: 'shoppingCart',
      component: shoppingCart
    },


    {
      path: '/member',
      name: 'member',
      component: member,
      children: [{
          path: '/memberBody', //父级特有模块路径
          alias: '/member', //父级路径   当加载父级路径，父级特有模块也会被加载
          component: memberBody //父级特有模块
        },
        {
          path: 'evalAlready',
          component: evalAlready
        }
      ]
    },

    {
      path: 'gotoeval',
      component: gotoeval
    },
    {
      path: 'accountSet',
      component: accountSet,
      children: [{
          path: 'accountsetBody',
          alias: 'accountSet',
          component: accountsetBody
        },
        {
          path: 'changePd',
          component: changePd
        }
      ]
    },





    {
      path: '/Order',
      component: Order,
      children: [{
        path: '/',
        component: order
      }, {
        path: 'success',
        component: paymentSuccess
      }, {
        path: 'failure',
        component: paymentFailure
      }, {
        path: 'payZfb',
        component: payZfb
      }, {
        path: 'payBank',
        component: payBank
      }]
    }, {
      path: '/detial',
      component: detial
    }, {
      path: '/shopIndex',
      component: shopIndex
    }, {
        path: '/shopList',
        component: shopList,
        children: [{
            path: '/',
            component: credentials
        }, {
            path: 'custom',
            component: custom
        }, {
            path: 'product',
            component: product
        }]
    }]
})
