<template>
	<h2>我是About的内容</h2>
</template>

<script>
	export default {
		name:'MyAbout',
    mounted() {
      console.log('about被加载')
    },
    beforeDestroy() {
      console.log('about被销毁')
    }
  }
</script>