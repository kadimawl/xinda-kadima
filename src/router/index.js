import Vue from 'vue'
import Router from 'vue-router'

//pc懒加载
const HelloWorld = () => import('@/components/HelloWorld' )//默认首页
const outter = () => import('@/components/outter') //一级路由（登录、注册、忘记密码）
const tabs = () => import('@/components/tabs')
const login = () => import('@/views/login') //注册
const register  = () => import( '@/views/register' )//登录
const forgetpw  = () => import( '@/views/forgetpw') //忘记密码


const HomePage  = () => import( '@/components/ModelHomePage/HomePage') //首页模块
const taxationList  = () => import( '@/components/ModelHomePage/taxationList') //财税服务模块
const companyList  = () => import( '@/components/ModelHomePage/companyList' )//公司工商模块
const shoppingCart  = () => import( '@/components/ModelHomePage/shoppingCart') //购物车模块
const toJoinIn  = () => import( '@/components/ModelHomePage/toJoinIn' )//加入我们模块

const member  = () => import( '@/members/member') //会员中心首页
const memberBody  = () => import( '@/members/memberBody' )//会员body组件
const userEval  = () => import( '@/members/userEval') //用户评价模块
const gotoeval  = () => import( '@/members/gotoeval' )//去评价模块
const accountSet  = () => import( '@/members/accountSet' )//账户设置模块
const evalNone  = () => import( '@/members/evalNone') //未评价模块
const evalAlready  = () => import( '@/members/evalAlready') //已评价模块
const accountsetBody  = () => import( '@/members/accountsetBody') //账户设置body组件
const changePd  = () => import( '@/members/changePd') //改变密码模块

const detial  = () => import( '@/components/company/detial' )//商品详情路由
const service  = () => import( '@/components/company/ShopDetial/service') //商品详情
const evaluate  = () => import( '@/components/company/ShopDetial/evaluate') //商品详情

const shopIndex  = () => import( '@/components/company/shopIndex' )//店铺首页

const shopList  = () => import( '@/components/company/shopList') //店铺列表路由
const credentials  = () => import( '@/components/company/ShopList/credentials') //店铺列表服务
const custom  = () => import( '@/components/company/ShopList/custom') //店铺列表客服
const product  = () => import( '@/components/company/ShopList/product' )//店铺列表资质

const orderdetail  = () => import( '@/components/order/orderdetail') //订单详情
const Order  = () => import( '@/components/Order') //订单详情路由
const paymentSuccess  = () => import( '@/components/order/paymentSuccess') //支付成功
const paymentFailure  = () => import( '@/components/order/paymentFailure' )//支付失败
const payZfb  = () => import( '@/components/order/payZfb' )//支付宝支付
const payBank  = () => import( '@/components/order/payBank' )//银行支付


//WX端
const m = () => import( '@/mobile/m' )//WX端一级路由

const users = () => import( '@/mobile/users/users') //WX端我的框架页
const mobile = () => import( '@/mobile/users/mobile') //WX端我的未注册页
const mobileRegister = () => import( '@/views/mobileRegister') //WX端我的注册页
const logined = () => import( '@/mobile/users/logined') //WX端我的已登录页
const mobileLogin = () => import( '@/views/mobileLogin' )//WX端我的登录页
const mobileForgetPw = () => import( '@/views/mobileForgetPw' )//WX端我的忘记密码页
const accountSetting = () => import( '@/mobile/users/accountSetting') //WX端我的账户设置页
const myOrder = () => import( '@/mobile/users/myOrder') //WX端我的我的订单页



const mIndexLY = () => import( '@/mobile/mIndex') //WX端主页路由
const mIndex = () => import( '@/mobile/index/index') //WX端主页
const mIndexList = () => import( '@/mobile/index/indexList' )//WX端列表
const mProduct = () => import( '@/mobile/index/product') //WX端产品



const shop = () => import( '@/mobile/shop/shop') //WX端商品框架页
const shopDetail = () => import( '@/mobile/shop/shopDetail' )//商品详情


const carts = () => import( '@/mobile/carts/carts' )//WX端购物车框架页
const shopcarHave = () => import( '@/mobile/carts/shopcarHave' )//非空购物车
const shopcarNull = () => import( '@/mobile/carts/shopcarNull' )//空购物车

const store = () => import( '@/mobile/stores/store') //wx端店铺框架页
const wxshopHome = () => import( '@/mobile/stores/wxshopHome' )//店铺首页
const wxshopList = () => import( '@/mobile/stores/wxshopList') //店铺列表，也是店铺的默认跳转页



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
        },
        {
            path: '/mIndexList', //店铺列表
            component: mIndexList
        }
    ]
})