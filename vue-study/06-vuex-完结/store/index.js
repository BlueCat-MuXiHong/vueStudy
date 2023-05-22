//该文件用于创建vuex中最为核心的store
//引入vue
import Vue from "vue";
//引入Vuex
import Vuex from "vuex";
//使用vuex
Vue.use(Vuex)


import countOptions from './count'
import personOptions from './person'


//创建store并导出
export default new Vuex.Store({
    modules: {
        // a:countOptions,
        // b:personOptions
        //简写形式
        countOptions,
        personOptions

    }
})