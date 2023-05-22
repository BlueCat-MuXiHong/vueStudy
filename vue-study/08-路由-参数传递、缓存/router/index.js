//该文件创建整个应用的路由
import VueRouter from "vue-router"


//引入组件
import Home from "../components/MyHome.vue";
import About from "../components/MyAbout.vue";
import Message from '../components/MyMessage.vue'
import News from '../components/MyNews.vue'
import Detail from "@/components/MyDetail.vue";
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
                    component: Message,
                    children: [
                        //query写法
                        // {
                        //     //这里的name属性，在router-link中，:to中可以用{name:detail}属性代替path属性(path属性得完整得把路由路径写完)
                        //     name : 'detail',
                        //     path: 'detail',
                        //     component: Detail
                        // }
                        //params写法
                        {
                            name : 'detail',
                            path: 'detail/:id/:title',
                            component: Detail,
                            //第一种写法，值为对象
                            // props:{a:1,b:'hello'}
                            //第二种写法,值为布尔值，若布尔值为真，就会把该路由组件收到得所有params参数以props得形式传递给组件
                            // props:true
                            //第三种写法,值为函数，若布尔值为真，就会把该路由组件收到得所有params参数以props得形式传递给组件
                            props($route){
                                return {id:$route.query.id,title:$route.query.title}
                            }
                        }
                    ]
                },
                {
                    path: 'news',
                    component: News
                }
            ]
        }
    ]
})