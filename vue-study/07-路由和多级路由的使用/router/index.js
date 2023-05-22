//该文件创建整个应用的路由
import VueRouter from "vue-router"


//引入组件
import Home from "../components/MyHome.vue";
import About from "../components/MyAbout.vue";
import Message from '../components/MyMessage.vue'
import News from '../components/MyNews.vue'
//创建并暴露一个路由器
export default new VueRouter({
    routes: [
        // 一级路由
        {
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home,
            children: [
                //子路由
                {
                    path: 'message',
                    component: Message
                },
                {
                    path: 'news',
                    component: News
                }
            ]
        }
    ]
})