<template>
  <div>
    <h2>我是Home的内容</h2>
    <div>
      <ul class="nav nav-tabs">
        <li>
          <router-link class="list-group-item" active-class="active" to="/home/news">News</router-link>
        </li>
        <li>
          <router-link class="list-group-item" active-class="active" to="/home/message">Message</router-link>
        </li>
      </ul>
<!--   保持活跃 展示得东西都被缓存 include="News"指定组件名缓存 -->
      <keep-alive :include='["MyNews","MyMessage"]'>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
	export default {
		name:'MyHome',
    mounted() {
      console.log('MyHome被加载')
    },
    beforeDestroy() {
      console.log('MyHome被销毁')
    }
	}
</script>