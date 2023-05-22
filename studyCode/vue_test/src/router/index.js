//该文件创建整个应用的路由
import VueRouter from "vue-router"


//引入组件
import Home from "../components/Home.vue";
import About from "../components/About.vue";
//创建并暴露一个路由器
export default new VueRouter({
    routes:[
        {
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home
        }
    ]
})