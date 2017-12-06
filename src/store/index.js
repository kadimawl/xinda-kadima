import Vue from 'vue'
import Vuex from 'vuex'
<<<<<<< HEAD
Vue.use(Vuex);
export default new Vuex.Store({
    state:{//状态集合
        num:'123'
    },
    mutations:{//突变集合
        // SET_NUM:function(state,num){
        //     state.num = num;
        // }
        SET_NUM(state,num){
            state.num = num;
        }
    },
    action:{//操作集合
        setNum({commit},num){
=======

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
>>>>>>> 9e6c482c5159c4a9717094225c9ae009f01f26a3
            commit('SET_NUM',num);
        }
    },
    getters:{//显示集合
<<<<<<< HEAD
        getNum(state){
            return state.num;
        }
    }
})

=======
        getNnum:state=>state.num
    }
});
>>>>>>> 9e6c482c5159c4a9717094225c9ae009f01f26a3
