<template>
  <div>
    <ul>
      <li v-for="p in messageList" :key="p.id">

        <!--        跳转路由并携带query参数，to的字符串写法-->
        <!--        <router-link :to="`/home/message/detail?id=${p.id}&title=${p.title}`">{{p.title}}</router-link>-->

        <!--        跳转路由并携带params参数，to的字符串写法-->
        <!--                <router-link :to="`/home/message/detail/id=${p.id}/title=${p.title}`">{{p.title}}</router-link>-->

        <!--        跳转路由并携带query参数，to的对象写法-->
        <!--        <router-link :to="{-->
        <!--          path:'detail',-->
        <!--          query:{-->
        <!--              id:p.id,-->
        <!--              title:p.title-->
        <!--          }-->
        <!--        }">-->
        <!--          {{ p.title }}-->
        <!--        </router-link>-->

        <!--        跳转路由并携带params参数，to的对象写法-->
        <router-link :to="{
          //params写法必须用name
                  name:'detail',
                  params:{
                      id:p.id,
                      title:p.title
                  }
                }">
          {{ p.title }}
          <button @click="pushShow(p)">push查看</button>
          <button @click="replaceShow(p)">replace查看</button>
        </router-link>
      </li>
    </ul>
    <hr>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'MyMessage',
  data() {
    return {
      messageList: [
        {id: '001', title: '百度', url: 'http://www.baidu.com'},
        {id: '002', title: '网易', url: 'http://www.163.com'},
        {id: '003', title: 'B站', url: 'http://www.bilibili.com'}
      ]
    }
  },
  methods:{
    pushShow(p){
      this.$router.push({
        name:'detail',
        query:{
          id:p.id,
          title:p.title
        }
      })
    },
    replaceShow(p){
      this.$router.replace({
        name:'detail',
        query:{
          id:p.id,
          title:p.title
        }
      })
    }
  }
}
</script>