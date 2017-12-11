import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
    state: { //状态集合
        num: 123,
        radios: '',
        title: '欢迎登录'
    },
    mutations: { //突变集合
        SET_NUM: (state, num) => {
            state.num = num;
        },
        SetRadio: (state, radios) => {
            state.radios = radios;
        }
    },
    actions: { //操作集合
        setNum({ commit }, num) {
            commit('SET_NUM', num)
        },
        setRadio({ commit }, radios) {
            commit('SetRadio', radios)
        }
    },
    getters: { //显示集合
        getNum: state => state.num,
        getRadio: state => state.radios,
        SET_TITLE: (state, title) => {
            state.title = title;
        }
    },
    actions: { //操作集合
        setTitle({ commit }, title) {
            commit('SET_TITLE', title)
        },
        setNum({ commit }, num) {
            commit('SET_NUM', num)
        }
    },
    getters: { //显示集合
        getTitle: state => state.title,
        getNum: state => state.num
    }
})