<template>
	<div class="student">
		<h2>学生姓名：{{name}}</h2>
		<h2>学生性别：{{sex}}</h2>
		<button @click="sendStudentName">sendStudentName</button>
	</div>
</template>

<script>
	export default {
		name:'MyStudent',
		data() {
			return {
				name:'张三',
				sex:'男',
				number:0
			}
		},
		methods:{
			sendStudentName(){
				this.$bus.$emit('hello',666)
			}
		}
	}
</script>

<style scoped>
	.student{
		background-color: pink;
		padding: 5px;
		margin-top: 30px;
	}
</style>
