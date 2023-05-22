//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//引入VueRouter
import VueRouter from "vue-router";
import router from './router'

//关闭Vue的生产提示
Vue.config.productionTip = false

Vue.use(VueRouter)
//创建vm
new Vue({
	el:'#app',
	router:router,
	render: h => h(App)
})