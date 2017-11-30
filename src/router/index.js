import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import outter from '../components/outter'
import login from '@/views/login'
import register from '@/views/register'
import forgetpw from '@/views/forgetpw'

import member from '@/members/member'
import memberBody from '@/members/memberBody'
import userEval from '@/members/userEval'
import gotoeval from '@/members/gotoeval'
import accountSet from '@/members/accountSet'
import evalNone from '@/members/evalNone'
import evalAlready from '@/members/evalAlready'
import accountsetBody from '@/members/accountsetBody'
import changePd from '@/members/changePd'


import order from '@/components/Order' //订单详情
import detial from '@/components/detial' //商品详情
import shopIndex from '@/components/shopIndex' //店铺首页
import shopList from '@/components/shopList' //店铺列表

import paymentSuccess from '@/components/order/paymentSuccess' //支付成功
import paymentFailure from '@/components/order/paymentFailure' //支付失败
import payZfb from '@/components/order/payZfb' //支付宝支付
import payBank from '@/components/order/payBank' //银行支付


Vue.use(Router)
export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/outter',
            name: 'outter',
            component: outter,
            children: [{
                    path: '/login',
                    component: login,
                },
                {
                    path: '/register',
                    component: register
                },
                {
                    path: '/forgetpw',
                    component: forgetpw
                }
            ]
        },




        {
            path: '/member',
            name: 'member',
            component: member,
            children: [{
                    path: '/memberBody',
                    alias: '/member',
                    component: memberBody
                },
                {
                    path: 'userEval',
                    component: userEval,
                    children: [{
                            path: '/evalNone',
                            alias: '/userEval',
                            component: evalNone
                        },
                        {
                            path: '/evalAlready',
                            component: evalAlready
                        }
                    ]
                },
                {
                    path: '/gotoeval',
                    component: gotoeval
                },
                {
                    path: '/accountSet',
                    component: accountSet,
                    children: [{
                            path: '/accountsetBody',
                            alias: '/accountSet',
                            component: accountsetBody
                        },
                        {
                            path: '/changePd',
                            component: changePd
                        }
                    ]
                }
            ]
        },



        {
            path: '/order',
            component: order,
            children: [{
                    path: '/success',
                    // alias: '/accountSet',
                    component: paymentSuccess
                },
                {
                    path: '/failure',
                    component: paymentFailure
                },
                {
                    path: '/payZfb',
                    component: payZfb
                },
                {
                    path: '/payBank',
                    component: payBank
                }
            ]
        },
        {
            path: '/detial',
            component: detial
        },
        {
            path: '/shopIndex',
            component: shopIndex
        },
        {
            path: '/shopList',
            component: shopList
        }
    ]
})