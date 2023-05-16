<template>
    <div>
        <button @click="isShow = !isShow">显示/隐藏</button>
        <transition name="muxihong" appear>
            <h1 v-show="isShow">你好啊</h1>
        </transition>

    </div>
</template>

<script>
export default {
    nane: 'MyTest2',
    data() {
        return {
            isShow:true
        }
    },methods:{

    }
}
</script>

<style scoped>
    h1{
        background-color: orange;
    }

    .muxihong-enter-active{
        animation : identifier 1s;
    }


</style>