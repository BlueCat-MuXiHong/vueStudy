<template>
  <div>
    <h1>求和的值为：{{sum}}</h1>


    <h1>人员列表</h1>
    <h1>列表中第一个人的名字：{{ firstPersonName }}</h1>
    <input type="text" placeholder="请输入名字" v-model="name">
    <button @click="addWang">添加</button>
    <button @click="addPersonServer">添加服务器人员</button>
    <ul>
      <li v-for="p in personList" :key="p.id">{{p.name}}</li>
    </ul>
  </div>
</template>

<script>
  // import {mapState} from "vuex";
  import {nanoid} from "nanoid";
  // import {mapState} from "vuex";

  export default {
    name:'MyPerson',
    data(){
      return{
        name:''
      }
    },
    computed:{
      personList(){
        return this.$store.state.personOptions.personList;
      },
      sum(){
        return this.$store.state.countOptions.sum
      },
      firstPersonName(){
        return this.$store.getters['personOptions/firstPersonName']
      }
      // ...mapState('countOptions',['sum']),
      // ...mapState('personOptions',['personList']),
    },
    methods:{
      add(){
        const personObj = {id:nanoid(),name:this.name}
        this.$store.commit("personOptions/ADD_PERSON",personObj)
        this.name = ''
      },
      addWang() {
        const personObj = {id:nanoid(),name:this.name}
        this.$store.dispatch('personOptions/addOnlyWang',personObj)
        this.name = ''
      },
      addPersonServer(){
        this.$store.dispatch('personOptions/addPersonServer')
      }
    }
  }



</script>


<style scoped>
html {
  background-color: red;
}

</style>