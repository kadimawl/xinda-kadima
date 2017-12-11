import Vue from 'vue'
import Router from 'vue-router'
import Distpicker from 'v-distpicker' //三级联动插件
import HelloWorld from '@/components/HelloWorld' //默认首页
import outter from '../components/outter' //一级路由（登录、注册、忘记密码）
import tabs from '../components/tabs'
import login from '@/views/login' //注册
import register from '@/views/register' //登录
import forgetpw from '@/views/forgetpw' //忘记密码


import HomePage from '@/components/ModelHomePage/HomePage' //首页模块
import taxationList from '@/components/ModelHomePage/taxationList' //财税服务模块
import companyList from '@/components/ModelHomePage/companyList' //公司工商模块
import goodsDetails from '@/components/ModelHomePage/goodsDetails' //商品详情模块
import shoppingCart from '@/components/ModelHomePage/shoppingCart' //购物车模块
import toJoinIn from '@/components/ModelHomePage/toJoinIn' //加入我们模块

import member from '@/members/member'
import memberBody from '@/members/memberBody'
import userEval from '@/members/userEval'
import gotoeval from '@/members/gotoeval'
import accountSet from '@/members/accountSet'
import evalNone from '@/members/evalNone'
import evalAlready from '@/members/evalAlready'
import accountsetBody from '@/members/accountsetBody'
import changePd from '@/members/changePd'

import detial from '@/components/company/detial' //商品详情路由
import service from '@/components/company/ShopDetial/service' //商品详情
import evaluate from '@/components/company/ShopDetial/evaluate' //商品详情

import shopIndex from '@/components/company/shopIndex' //店铺首页

import shopList from '@/components/company/shopList' //店铺列表路由
import credentials from '@/components/company/ShopList/credentials' //店铺列表服务
import custom from '@/components/company/ShopList/custom' //店铺列表客服
import product from '@/components/company/ShopList/product' //店铺列表资质

import Order from '@/components/Order' //订单详情路由
import order from '@/components/order/order' //订单详情
import paymentSuccess from '@/components/order/paymentSuccess' //支付成功
import paymentFailure from '@/components/order/paymentFailure' //支付失败
import payZfb from '@/components/order/payZfb' //支付宝支付
import payBank from '@/components/order/payBank' //银行支付


//移动端
import mobile from '@/components/mobile' //移动端我的框架页
import mobileRegister from '@/views/mobileRegister' //移动端我的注册页
import logined from '@/views/logined' //移动端我的已登录页
import mobileLogin from '@/views/mobileLogin' //移动端我的登录页

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
      }, {
        path: 'tabs',
        component: tabs,
        children: [{
          path: 'toJoinIn',
          component: toJoinIn,
        },
        {
          path: '/taxationList', //财税服务
          name: 'taxationList',
          component: taxationList
        },
        {
          path: 'companyList', //公司工商
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
          path: '/toJoinIn', //加入我们
          component: toJoinIn
        },
        ]
      }, {
        path: '/detial',
        component: detial,
        redirect: '/detial/service',
        children: [{
          path: 'service',
          component: service
        }, {
          path: 'evaluate',
          component: evaluate
        }],
      }, {
        path: '/shopIndex', //店铺首页
        component: shopIndex
      }, {
        path: '/shopList', //店铺列表
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
    }
    ,
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
    }
    ,
    {
      path: '/member',
      redirect: '/member/memberBody',
      component: member,
      children: [{
        name: 'memberBody',
        path: 'memberBody', //父级特有模块路径
        // alias: '/member', //父级路径   当加载父级路径，父级特有模块也会被加载
        component: memberBody //父级特有模块
      },
      {
        path: 'userEval',
        name: 'userEval',
        redirect: 'userEval/evalNone',
        component: userEval,
        children: [{
          path: 'evalNone',
          component: evalNone
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
        name: 'accountSet',
        path: 'accountSet',
        component: accountSet,
        redirect: 'accountSet/accountsetBody',
        children: [{
          path: 'accountsetBody',
          component: accountsetBody
        },
        {
          path: 'changePd',
          component: changePd
        }
        ]
      }
      ]
    }
    ,
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
    }
    ,
    {
      path: 'gotoeval',
      component: gotoeval
    }
    ,
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
    }
    ,
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
    },
    //移动端临时路由
    {
      path: '/mobile',   //我的（未注册）
      component: mobile,
    }, {
      path: '/mobileRegister',   //我的（注册页）
      component: mobileRegister
    },{
      path: '/mobileLogin',      //我的（登录页）
      component: mobileLogin
    },{
      path: '/logined',   //我的（已登录）
      component: logined
    }



  ]
})
