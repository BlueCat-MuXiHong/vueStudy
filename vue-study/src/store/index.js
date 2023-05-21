//该文件用于创建vuex中最为核心的store
//引入vue
import Vue from "vue";
//引入Vuex
import Vuex from "vuex";
Vue.use(Vuex)
//准备actions--用于响应组件中的动作
const actions={
    add:function (context,value){
        console.log("actions中的add被调用",context,value)
        context.commit("ADD",value)
    },
    minus:function (context,value){
        console.log("actions中的minus被调用",context,value)
        context.commit("MINUS",value)
    },
    addOdd:function (context,value){
        console.log("actions中的addOdd被调用",context,value)
        if (context.state.sum%2){
            context.commit("ADD",value)
        }
    },
    addWait:function (context,value){
        console.log("actions中的addWait被调用")
        setTimeout(()=>{
            context.commit('ADD',value)
        },500)
    }

};
//准备mutations--用于操作数据（state）
const mutations = {
    ADD(state,value){
        console.log("mutations中ADD被调用",state,value)
        state.sum+=value
    },
    MINUS(state,value){
        console.log("mutations中MINUS被调用",state,value)
        state.sum-=value
    }
}
//准备state --用于存储数据
const  state = {
    sum:0, //当前的和
    school:'尚硅谷',
    subject:'前端'
}
const getters={
    bigSum(state){
        return state.sum*10
    }
}

//创建store并导出
export default new Vuex.Store({
    actions:actions,
    mutations:mutations,
    state:state,
    getters
})