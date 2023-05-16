<template>
    <div>
        <MyTest/>
        <MyTest2/>
    </div>
</template>

<script>
import MyTest from "@/components/MyTest.vue";
import MyTest2 from "@/components/MyTest2.vue";
export default {
    name: 'App',
    components: {MyTest,MyTest2}
}
</script>

<style>
</style>
