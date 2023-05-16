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
    nane: 'MyTest',
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

    .muxihong-leave-active{
        animation : identifier 1s reverse;
    }

    @keyframes identifier {
        from{
            transform: translateX(-100%);
        }
        to{
            transform: translateX(0px);
        }
    }
</style>