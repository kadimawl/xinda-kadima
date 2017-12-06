import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{//属性集合
        num: 123
    },
    mutations:{//突变集合（大写字母命名）
        SET_NUM: function(state,num){
            state.num = num;
        }
    },
    actions:{//操作集合
        setNum({commit},num) {
            commit('SET_NUM',num);
        }
    },
    getters:{//显示集合
        getNnum:state=>state.num
    }
});
