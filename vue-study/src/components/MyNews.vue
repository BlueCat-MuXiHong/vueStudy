<template>
	<ul>
    <li :style="{opacity}">渐变色</li>
		<li>news001 <input type="text"></li>
		<li>news002 <input type="text"></li>
		<li>news003 <input type="text"></li>
	</ul>
</template>

<script>
	export default {
		name:'MyNews',
    data(){
      return{
        opacity :1
      }
    },
    // mounted() {
    //   this.timer = setInterval(()=>{
    //     this.opacity -= 0.01
    //     if (this.opacity<=0) this.opacity = 1
    //   },16)
    // },
    // beforeDestroy() {
    //   console.log('news被销毁');
    //   clearInterval(this.timer)
    // },
    //激活
    activated() {
      console.log("激活")
      this.timer = setInterval(()=>{
        this.opacity -= 0.01
        if (this.opacity<=0) this.opacity = 1
      },16)
    },
    deactivated() {
      console.log("失活")
      console.log('news被销毁');
      clearInterval(this.timer)
    }
  }
</script>