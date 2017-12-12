import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
    state: { //状态集合
        num: 123,
        radios: '',
        title: '欢迎登录',
        name: ''
    },
    mutations: { //突变集合
        SET_NUM: (state, num) => {
            state.num = num;
        },
        SetRadio: (state, radios) => {
            state.radios = radios;
        },
        SET_TITLE: (state, title) => {
            state.title = title;
        },
        SET_NAME: (state,name) => {
            state.name = name;
        }
    },
    actions: { //操作集合
        setNum({ commit }, num) {
            commit('SET_NUM', num)
        },
        setRadio({ commit }, radios) {
            commit('SetRadio', radios)
        },
        setTitle({ commit }, title) {
            commit('SET_TITLE', title)
        },
        setName({commit}, name) {
            commit('SET_NAME',name)
        }
    },
    getters: { //显示集合
        getNum: state => state.num,
        getRadio: state => state.radios,
        getTitle: state => state.title,
        getName: state => state.name,   //顶部用户名显示
    }

})