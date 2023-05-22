<template>
  <div>
    <h1>求和的值为：{{sum}}</h1>


    <h1>人员列表</h1>
    <input type="text" placeholder="请输入名字" v-model="name">
    <button @click="add">添加</button>
    <ul>
      <li v-for="p in personList" :key="p.id">{{p.name}}</li>
    </ul>
  </div>
</template>

<script>
  // import {mapState} from "vuex";
  import {nanoid} from "nanoid";

  export default {
    name:'MyPerson',
    data(){
      return{
        name:''
      }
    },
    computed:{
      personList(){
        return this.$store.state.personList;
      },
      sum(){
        return this.$store.state.sum
      }
      // ...mapState(['personList'])
    },
    methods:{
      add(){
        const personObj = {id:nanoid(),name:this.name}
        this.$store.commit("ADD_PERSON",personObj)
        this.name = ''
      }
    }
  }



</script>


<style scoped>
html {
  background-color: red;
}

</style>