//求和相关的配置
export default {
    namespaced: true,
    actions: {
        add: function (context, value) {
            console.log("actions中的add被调用", context, value)
            context.commit("ADD", value)
        },
        minus: function (context, value) {
            console.log("actions中的minus被调用", context, value)
            context.commit("MINUS", value)
        },
        addOdd: function (context, value) {
            console.log("actions中的addOdd被调用", context, value)
            if (context.state.sum % 2) {
                context.commit("ADD", value)
            }
        },
        addWait: function (context, value) {
            console.log("actions中的addWait被调用")
            setTimeout(() => {
                context.commit('ADD', value)
            }, 500)
        }
    },
    mutations: {
        ADD(state, value) {
            console.log("mutations中ADD被调用", state, value)
            state.sum += value
        },
        MINUS(state, value) {
            console.log("mutations中MINUS被调用", state, value)
            state.sum -= value
        }
    },
    state: {
        sum: 0, //当前的和
        school: '尚硅谷',
        subject: '前端',
    },
    getters: {
        bigSum(state) {
            return state.sum * 10
        }
    },
}