<template>
	<div>
		<h1>当前求和为：{{ sum }}</h1>
		<h1>当前求和放大10：{{ bigSum }}</h1>
		<h2>我在：{{ school }},学习：{{subject}}</h2>
    <h2>下方的总人数是：{{personList.length}}</h2>
		<select v-model.number="n">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
		</select>
		<button @click="increment(n)">+</button>
		<button @click="decrement">-</button>
		<button @click="incrementOdd(n)">当前求和为奇数再加</button>
		<button @click="incrementWait">等一等再加</button>
	</div>
</template>

<script>
	import {mapState,mapGetters,mapMutations,mapActions} from "vuex";
	export default {
		name:'MyCount',
		data() {
			return {
				n:1, //用户选择的数字
			}
		},
		computed:{
			// sum(){
			// 	return this.$store.state.sum
			// },
			// school(){
			// 	return this.$store.state.school
			// },
			// subject(){
			// 	return this.$store.state.subject
			// },
			//...是把对象的所有属性放入新的对象
			//借助mapstate生成属性，从state中读取数据。（对象写法）
			// ...mapState({sum:'sum',school:'school',subject:'subject'}),
			//借助mapstate生成属性，从state中读取数据。（数组写法）
					//属性名和计算属性名相同
			...mapState(['sum','school','subject','personList']),


			// bigSum(){
			// 	return  this.$store.getters.bigSum
			// }
			//借助mapstate生成属性，从getter中读取数据。（数组写法）
			...mapGetters(['bigSum'])
		},
		methods: {
			// increment(){
			// 	// this.$store.dispatch('add',this.n)
			// 	//没有业务逻辑直接commit
			// 	this.$store.commit('ADD',this.n)
			// },
			//借助mapMutations 生成对应的方法，方法中会调用commit去联系mutations(对象写法)
			...mapMutations({increment:'ADD'}),
			decrement(){
				// this.$store.dispatch('minus',this.n)
				//没有业务逻辑直接commit
				this.$store.commit('MINUS',this.n)
			},
			// incrementOdd(){
			// 	this.$store.dispatch('addOdd',this.n)
			// },
			...mapActions({incrementOdd:'addOdd'}),
			incrementWait(){
				this.$store.dispatch('addWait',this.n)
			},
		},mounted() {
			const x = mapState({sum:'sum',school:'school',subject:'subject'})
			console.log(x)
		}
	}
</script>

<style lang="css">
	button{
		margin-left: 5px;
	}
</style>
