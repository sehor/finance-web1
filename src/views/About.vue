<template>
  <div id="root" class="about">
    <h1>This is an about page</h1>
    <input v-model="val" />
    <button @click="transfer">转换</button>
    <div>
      <span style="color:blue">{{daxie}}</span>
    </div>

    <button @click="draw">绘制</button>
    <canvas id="tutorial" width="1000" height="1000"></canvas>
  </div>
</template>
<script>
import _ from "underscore";
export default {
  data() {
    return {
      val: ""
    };
  },
  methods: {
    transfer() {},
    draw() {
      var canvas = document.getElementById("tutorial");
      if (!canvas.getContext) return;
      var ctx = canvas.getContext("2d");
     // ctx.fillRect(10, 10, 100, 50); //绘制矩形,填充的默认颜色为黑色
      //ctx.strokeRect(10, 70, 100, 50); //绘制矩形边框

      ctx.arc(300,300,5,0,Math.PI*10,false) ;
      ctx.stroke();
   
      ctx.arc(300,300,50,Math.PI*50/4,Math.PI*50/2,true)
      ctx.stroke(); 
    }
  },

  computed: {
    daxie: function() {
      return this.tableCal.convertToZhCapital(this.val);
    }
  }
};
</script>
