import Vue from 'vue'
import Router from 'vue-router'
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

import member from '@/members/member' //会员中心首页
import memberBody from '@/members/memberBody' //会员body组件
import userEval from '@/members/userEval' //用户评价模块
import gotoeval from '@/members/gotoeval' //去评价模块
import accountSet from '@/members/accountSet' //账户设置模块
import evalNone from '@/members/evalNone' //未评价模块
import evalAlready from '@/members/evalAlready' //已评价模块
import accountsetBody from '@/members/accountsetBody' //账户设置body组件
import changePd from '@/members/changePd' //改变密码模块

import detial from '@/components/company/detial' //商品详情路由
import service from '@/components/company/ShopDetial/service' //商品详情
import evaluate from '@/components/company/ShopDetial/evaluate' //商品详情

import shopIndex from '@/components/company/shopIndex' //店铺首页

import shopList from '@/components/company/shopList' //店铺列表路由
import credentials from '@/components/company/ShopList/credentials' //店铺列表服务
import custom from '@/components/company/ShopList/custom' //店铺列表客服
import product from '@/components/company/ShopList/product' //店铺列表资质

import orderdetail from '@/components/order/orderdetail' //订单详情
import Order from '@/components/Order' //订单详情路由
import paymentSuccess from '@/components/order/paymentSuccess' //支付成功
import paymentFailure from '@/components/order/paymentFailure' //支付失败
import payZfb from '@/components/order/payZfb' //支付宝支付
import payBank from '@/components/order/payBank' //银行支付


//WX端
import m from '@/mobile/m' //WX端一级路由

import users from '@/mobile/users/users' //WX端我的框架页
import mobile from '@/mobile/users/mobile' //WX端我的未注册页
import mobileRegister from '@/views/mobileRegister' //WX端我的注册页
import logined from '@/mobile/users/logined' //WX端我的已登录页
import mobileLogin from '@/views/mobileLogin' //WX端我的登录页
import mobileForgetPw from '@/views/mobileForgetPw' //WX端我的忘记密码页
import accountSetting from '@/mobile/users/accountSetting' //WX端我的账户设置页
import myOrder from '@/mobile/users/myOrder' //WX端我的我的订单页



import mIndexLY from '@/mobile/mIndex' //WX端主页路由
import mIndex from '@/mobile/index/index' //WX端主页
import mIndexList from '@/mobile/index/indexList' //WX端列表
import mProduct from '@/mobile/index/product' //WX端产品


import shop from '@/mobile/shop/shop' //WX端店铺框架页
import wxshopHome from '@/mobile/shop/wxshopHome' //店铺首页
import wxshopList from '@/mobile/shop/wxshopList' //店铺列表，也是店铺的默认跳转页
import shopDetail from '@/mobile/shop/shopDetail' //商品详情

import carts from '@/mobile/carts/carts' //WX端购物车框架页
import wxshopcarHave from '@/mobile/carts/wxshopcarHave' //非空购物车
import wxshopcarNull from '@/mobile/carts/wxshopcarNull' //空购物车



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
              path: 'taxationList', //财税服务
              name: 'taxationList',
              component: taxationList
            },
            {
              path: 'companyList', //公司工商
              name: 'companyList',
              component: companyList
            },
            {
              path: 'goodsDetails', //商品详情
              name: 'goodsDetails',
              component: goodsDetails
            },
            {
              path: 'shoppingCart', //购物车
              name: 'shoppingCart',
              component: shoppingCart
            },
            {
              path: 'toJoinIn', //加入我们
              component: toJoinIn
            },
            {
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
              path: '/shopIndex', //店铺列表
              component: shopIndex
            }, {
              path: '/shopList', //店铺详情
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
            }
          ]
        },
        { //会员中心模块路径
          path: 'member',
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
              path: 'userEval/gotoeval',
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
        },




        //pc端支付
        {
          path: '/Order',
          redirect: 'Order/orderdetail',
          component: Order,
          children: [{
            path: 'orderdetail',
            component: orderdetail
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
      ]
    },

    //pc端注册登录，忘记密码(这是外挂一级路由，不要动！！！)
    {
      path: '/outter',
      name: 'outter',
      redirect: '/outter/login',
      component: outter,
      children: [{
        path: 'login',
        component: login,
      }, {
        path: 'register',
        component: register
      }, {
        path: 'forgetpw',
        component: forgetpw
      }]
    },




    //WX端临时路由--按原型挂四个二级路由
    {
      path: '/m',
      component: m,
      children: [{
          path: '/', //首页二级路由
          component: mIndexLY,
          redirect: 'mIndex',
          children: [{
            path: 'mIndex', //首页
            component: mIndex
          }, {
            path: 'mIndexList', //店铺列表
            component: mIndexList
          }, {
            path: 'mProduct', //产品分类
            component: mProduct
          }]
        },
        {
          path: 'shop', //店铺二级路由
          component: shop,
          children:[{
            path:'shopDetail',//商品详情
            component:shopDetail
          }]
        }, {
          path: 'carts', //购物车二级路由
          component: carts
        },

        {
          path: 'users', //我的二级路由
          component: users,
          redirect: 'users/mobile',
          children: [
              {
            path: 'mobile', //我的（未注册）
            component: mobile
        }, {
            path: 'mobileRegister', //我的（注册页）
            component: mobileRegister
        }, {
            path: 'mobileLogin', //我的（登录页）
            component: mobileLogin
        }, {
            path: 'logined', //我的（已登录）
            component: logined
        }, {
            path: 'mobileForgetPw', //我的（忘记密码）
            component: mobileForgetPw
        }, {
            path: 'accountSetting', //账户设置
            component: accountSetting,
        }, {
            path: 'myOrder', //我的订单
            component: myOrder}
          ]
        }
        
        //  {
        //     path: 'wxshopcarNull', //空购物车
        //     component: wxshopcarNull,
        // }, {
        //     path: 'wxshopcarHave', //非空购物车
        //     component: wxshopcarHave,
        // }, {
        //     path: 'wxshopHome', //店铺首页
        //     component: wxshopHome,
        // }, {
        //     path: 'wxshopList', //店铺列表
        //     component: wxshopList,
        // }






      ]
    },


  ]
})
