<template>
  <div>
    <!--  query写法  -->
    <!--      <ul>-->
    <!--        <li>消息编号：{{$route.query.id}}</li>-->
    <!--        <li>消息内容：{{$route.query.title}}</li>-->
    <!--      </ul>-->
    <!--  params写法  -->
    <ul>
      <li>消息编号：{{ $route.params.id }}</li>
      <li>消息内容：{{ $route.params.title }}</li>
    </ul>

<!--  props第一种写法  -->
    <h3>{{id}}---{{title}}</h3>
  </div>
</template>

<script>
export default {
  name: 'MyDetail',
  props:['id','title'],
  computed:{

  },
  mounted() {
    console.log(this.$route)
  }
}
</script>

<style scoped>

</style>