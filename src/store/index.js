import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
    state: { //状态集合
        num: 0, //购物车商品数量
        title: '欢迎登录',
        name: '', //用户名
        code: '', //订单编号
        headX: '', //用户头像
        // pd: '', //用户密码加密过的
    },
    mutations: { //突变集合
        SET_NUM: (state, num) => {
            state.num = num;
        },
        SET_TITLE: (state, title) => {
            state.title = title;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_CODE: (state, code) => {
            state.code = code;
        },
        SET_headX: (state, headX) => {
            state.headX = headX;
        },
        // SET_PD: (state, pd) => {
        //     state.pd = pd;
        // },
    },
    actions: { //操作集合
        setNum({ commit }, num) {
            commit('SET_NUM', num)
        },
        setTitle({ commit }, title) {
            commit('SET_TITLE', title)
        },
        setName({ commit }, name) {
            commit('SET_NAME', name)
        },
        setCode({ commit }, code) {
            commit('SET_CODE', code)
        },
        setheadX({ commit }, headX) {
            commit('SET_headX', headX)
        },
        // setPd({ commit }, pd) {
        //     commit('SET_PD', pd)
        // },
    },
    getters: { //显示集合
        getNum: state => state.num,
        getTitle: state => state.title,
        getName: state => {
            if (state.name) {
                return state.name;
            } else {
                return sessionStorage.getItem('user');
            }
        }, //顶部用户名显示
        getCode: state => state.code, //用户中心向订单详情发送的订单编号
        getheadX: state => state.headX, //用户头像
        // getPd: state => state.pd, //用户密码

    }

})