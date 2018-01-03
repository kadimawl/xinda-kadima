// import Vue from 'vue'
import Router from 'vue-router'

//pc懒加载
const HelloWorld = () => import('@/components/HelloWorld' )//默认首页
const outter = () => import(/* webpackChunkName: 'outter' */'@/components/outter') //一级路由（登录、注册、忘记密码）
const tabs = () => import(/* webpackChunkName: 'tabs' */'@/components/tabs')
const login = () => import(/* webpackChunkName: 'outter' */'@/views/login') //注册
const register  = () => import(/* webpackChunkName: 'outter' */ '@/views/register' )//登录
const forgetpw  = () => import(/* webpackChunkName: 'outter' */ '@/views/forgetpw') //忘记密码


const HomePage  = () => import('@/components/ModelHomePage/HomePage') //首页模块
const taxationList  = () => import(/* webpackChunkName: 'tabs' */ '@/components/ModelHomePage/taxationList') //财税服务模块
const companyList  = () => import(/* webpackChunkName: 'tabs' */ '@/components/ModelHomePage/companyList' )//公司工商模块
const wisdomList  = () => import(/* webpackChunkName: 'tabs' */ '@/components/ModelHomePage/wisdomList' )//知识产权模块
const securityList  = () => import(/* webpackChunkName: 'tabs' */ '@/components/ModelHomePage/securityList' )//社保代理模块
const shoppingCart  = () => import( /* webpackChunkName: 'tabs' */'@/components/ModelHomePage/shoppingCart') //购物车模块
const toJoinIn  = () => import( /* webpackChunkName: 'tabs' */'@/components/ModelHomePage/toJoinIn' )//加入我们模块

const member  = () => import(/* webpackChunkName: 'members' */ '@/members/member') //会员中心首页
const memberBody  = () => import(/* webpackChunkName: 'members' */  '@/members/memberBody' )//会员body组件
const userEval  = () => import(/* webpackChunkName: 'members' */  '@/members/userEval') //用户评价模块
const gotoeval  = () => import(/* webpackChunkName: 'members' */  '@/members/gotoeval' )//去评价模块
const accountSet  = () => import(/* webpackChunkName: 'members' */  '@/members/accountSet' )//账户设置模块
const evalNone  = () => import( /* webpackChunkName: 'members' */ '@/members/evalNone') //未评价模块
const evalAlready  = () => import( /* webpackChunkName: 'members' */ '@/members/evalAlready') //已评价模块
const accountsetBody  = () => import( /* webpackChunkName: 'members' */ '@/members/accountsetBody') //账户设置body组件
const changePd  = () => import( /* webpackChunkName: 'members' */ '@/members/changePd') //改变密码模块

const detial  = () => import(/* webpackChunkName: 'company' */  '@/components/company/detial' )//商品详情路由
const service  = () => import(/* webpackChunkName: 'company' */  '@/components/company/ShopDetial/service') //商品详情
const evaluate  = () => import(/* webpackChunkName: 'company' */  '@/components/company/ShopDetial/evaluate') //商品详情

const shopIndex = () =>
    import ('@/components/company/shopIndex') //店铺首页

const shopList  = () => import(/* webpackChunkName: 'company' */  '@/components/company/shopList') //店铺列表路由
const credentials  = () => import(/* webpackChunkName: 'company' */  '@/components/company/ShopList/credentials') //店铺列表服务
const custom  = () => import(/* webpackChunkName: 'company' */  '@/components/company/ShopList/custom') //店铺列表客服
const product  = () => import(/* webpackChunkName: 'company' */  '@/components/company/ShopList/product' )//店铺列表资质

const orderdetail  = () => import(/* webpackChunkName: 'order' */  '@/components/order/orderdetail') //订单详情
const Order  = () => import(/* webpackChunkName: 'order' */ '@/components/Order') //订单详情路由
const paymentSuccess  = () => import( /* webpackChunkName: 'order' */'@/components/order/paymentSuccess') //支付成功
const paymentFailure  = () => import( /* webpackChunkName: 'order' */'@/components/order/paymentFailure' )//支付失败
const payZfb  = () => import( /* webpackChunkName: 'order' */'@/components/order/payZfb' )//支付宝支付
const payBank  = () => import( /* webpackChunkName: 'order' */'@/components/order/payBank' )//银行支付


//WX端
const m = () =>
    import ('@/mobile/m') //WX端一级路由

const users = () => import(/* webpackChunkName: 'users' */ '@/mobile/users/users') //WX端我的框架页
const mobile = () => import(/* webpackChunkName: 'users' */ '@/mobile/users/mobile') //WX端我的未注册页
const mobileRegister = () => import(/* webpackChunkName: 'users' */ '@/views/mobileRegister') //WX端我的注册页
const logined = () => import( /* webpackChunkName: 'users' */ '@/mobile/users/logined') //WX端我的已登录页
const mobileLogin = () => import(/* webpackChunkName: 'users' */ '@/views/mobileLogin' )//WX端我的登录页
const mobileForgetPw = () => import(/* webpackChunkName: 'users' */ '@/views/mobileForgetPw' )//WX端我的忘记密码页
const accountSetting = () => import(/* webpackChunkName: 'users' */ '@/mobile/users/accountSetting') //WX端我的账户设置页
const myOrder = () => import(/* webpackChunkName: 'users' */ '@/mobile/users/myOrder') //WX端我的我的订单页



const mIndexLY = () =>
    import ('@/mobile/mIndex') //WX端主页路由
const mIndex = () =>
    import ('@/mobile/index/index') //WX端主页
const mIndexList = () =>
    import ('@/mobile/index/indexList') //WX端列表
const mProduct = () =>
    import ('@/mobile/index/product') //WX端产品



const shop = () =>
    import ('@/mobile/shop/shop') //WX端商品框架页
const shopDetail = () =>
    import ('@/mobile/shop/shopDetail') //商品详情


const carts = () => import(/* webpackChunkName: 'cart' */  '@/mobile/carts/carts' )//WX端购物车框架页
const shopcarHave = () => import(/* webpackChunkName: 'cart' */ '@/mobile/carts/shopcarHave' )//非空购物车
const shopcarNull = () => import(/* webpackChunkName: 'cart' */ '@/mobile/carts/shopcarNull' )//空购物车

const store = () => import(/* webpackChunkName: 'store' */ '@/mobile/stores/store') //wx端店铺框架页
const wxshopHome = () => import( /* webpackChunkName: 'store' */ '@/mobile/stores/wxshopHome' )//店铺首页
const wxshopList = () => import( /* webpackChunkName: 'store' */ '@/mobile/stores/wxshopList') //店铺列表，也是店铺的默认跳转页



Vue.use(Router)
export default new Router({
    routes: [
        //首页
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld,
            redirect: 'HomePage',
            children: [{
                    path: '/HomePage',
                    // alias: '/',
                    component: HomePage,
                },
                {
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
                            path:'wisdomList', //知识产权
                            name:'wisdomList',
                            component: wisdomList
                        },
                        {
                            path:'securityList', //社保代理
                            name:'securityList',
                            component: securityList
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
                    path: 'shop', //商品二级路由
                    component: shop,
                    redirect: 'shop/shopDetail',
                    children: [{
                        path: 'shopDetail', //商品详情
                        component: shopDetail
                    }]
                },
                {
                    path: 'store', //店铺二级路由
                    component: store,
                    redirect: 'store/List',
                    children: [{
                        path: 'List', //店铺列表
                        component: wxshopList,
                    }, {
                        path: 'Home', //店铺首页
                        component: wxshopHome,
                    }]
                },
                {
                    path: 'carts', //购物车二级路由
                    component: carts,
                    children: [{
                        path: 'Null', //空购物车
                        component: shopcarNull,
                    }, {
                        path: 'Have', //非空购物车
                        component: shopcarHave,
                    }, ]
                },
                {
                    path: 'users', //我的二级路由
                    component: users,
                    redirect: 'users/mobile',
                    children: [{
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
                        component: myOrder
                    }]
                }
            ]
        }
    ]
})