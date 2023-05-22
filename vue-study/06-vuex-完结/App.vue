<template>
	<div>
		<MyCount/>
    <hr>
    <MyPersons/>
	</div>
</template>

<script>
	import MyCount from './components/MyCount.vue'
  import MyPersons from "@/components/MyPersons.vue";
	export default {
		name:'App',
		components:{MyCount,MyPersons}
	}
</script>
