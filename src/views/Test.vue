<template>
  <div>
    <div id="vuex">
      <p>Vuex</p>
      <div>
        <label>count:</label>
        <span>{{count}}</span>
      </div>
      <div>
        <label>alias:</label>
        <span>{{alias}}</span>
      </div>
      <div>
        <label>countPlusLocalState:</label>
        <span>{{countPlusLocalState}}</span>
      </div>
    </div> 

    <div>
      <p>API</p>

      <ul>
        <li
          v-for="(item,index) of allAccClas"
          :key="index"
        >id:{{item.id}} name:{{item.name}} parentId:{{item.parentId}}</li>
      </ul>
    </div>
    <div>
      操作
      <button @click="_deleteAccClaById">deleteAccClaById</button>
      <button @click="_addAccCla">addAccCla</button>
      <button @click="_updateAccCla">updateAccCla</button>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import _ from "underscore";
import { mapState, mapMutations } from "vuex";
import accCla from "../api/accCla.js";
var log = console.log;
export default {
  data() {
    return {
      
    };
  },
  methods: {
    practic1() {
      var json = {};

      $("#test-form")
        .find("input, select")
        .filter(function() {
          return this.name != "gender" || this.checked;
        })
        .map(function() {
          json[this.name] = this.value;
        });
      json = JSON.stringify(json);
      log(json);
    },
    
    ...mapMutations([
      "initAccClas",
      "deleteAccClaById",
      "addAccCla",
      "updateAccCla",
      "increment"
    ]),
    _deleteAccClaById() {
      this.deleteAccClaById("3001");
    },

    _addAccCla() {
      this.addAccCla({ id: "3001", name: "利润", parentId: "root" });
    },
    _updateAccCla() {
      this.updateAccCla({ id: "3001", name: "好多利润", parentId: "root" });
    }
  },
  created() {
    
  

    //log('getAccCla',accCla.getById('200101'));
    //accCla.add({ id: '10010103', number: '10010102', name: '微信理财', parentId: '100101', chidlren: [] });
    //log('getAccCla',accCla.getById('10010102'))
    //accCla.deleteById('10010102');
  },
  computed: {
    ...mapState({
      count: state => state.count * 2,
      alias: "count",
      countPlusLocalState(state) {
        return state.count + this.count;
      }
    }),
    allAccClas:()=>{return [];}
  }
};

</script>