<<<<<<< HEAD
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
    state:{//状态集合
        num:123,
    },
    mutations:{//突变集合
        SET_NUM(state){
            state.num = num;
        }
    },
    actions:{//操作集合
        setNum({commit},num){
            commit("SET_NUM",num)
        }
    },
    getters:{//显示集合
        getNum:state=>state.num
    }
})
=======
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
    state: { //状态集合
        num: 123,
        title: '欢迎登录'
    },
    mutations: { //突变集合
        SET_NUM: (state, num) => {
            state.num = num;
        },
        SET_TITLE: (state,title) =>{
            state.title = title;
        }
    },
    actions: { //操作集合
        setTitle({ commit }, title) {
            commit('SET_TITLE', title)
        }
    },
    getters: { //显示集合
        gitTitle: state => state.title
    }
})
>>>>>>> 989622f11ab76cca1765fb1f016e6137e9c765bd
