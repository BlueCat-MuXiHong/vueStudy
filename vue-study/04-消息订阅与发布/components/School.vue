<template>
	<div class="school">
		<h2>学校名称：{{name}}</h2>
		<h2>学校地址：{{address}}</h2>

	</div>
</template>

<script>
import pubsub from 'pubsub-js'
	export default {
		name:'MySchool',
		data() {
			return {
				name:'尚硅谷',
				address:'北京',
			}
		},
		mounted() {
			this.pubId = pubsub.subscribe('hello',function (msgName,value){
				console.log('有人发布了消息',msgName,value)
			})
		},
		beforeDestroy() {
			pubsub.unsubscribe(this.pubId)
		}
	}
</script>

<style scoped>
	.school{
		background-color: skyblue;
		padding: 5px;
	}
</style>