<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input v-model="val"/><button @click="transfer">转换</button>
    <div>
    <span style="color:blue">{{daxie}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      val:"",
      daxie:''
    }
  },
  methods:{
      transfer(){

        this.daxie=this.tableCal.convertToZhCapital(this.val);
      }
  },
  computed:{
  /*   daxie:function(){
       return this.tableCal.convertToZhCapital(this.val);
    } */
  }
}
</script>
