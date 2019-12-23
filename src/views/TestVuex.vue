<template>
  <div>
    <div id="vuex">
      <p>Vuex</p>
      <div>
        <label>count:</label>
        <span>{{count}}</span>
        <button @click="increment({skip:2})">increment!</button>

        <div>todosCount:{{todosCount}}</div>
        <div>doneTodosCount:{{doneTodosCount}}</div>
        <div>doneTodos:{{doneTodos}}</div>
        <div>getTodoByIndex:{{getTodoByIndex(2)}}</div>
        <div class="block">
          <span class="demonstration">单选可搜索</span>
          <el-cascader
            placeholder="试试搜索.."
            :options="getAccClasTree"
            filterable
            :props="{ value: 'id', label: 'name'}"
          ></el-cascader>
        </div>
        <div>
          操作
          <button @click="_deleteAccClaById">deleteAccClaById</button>
          <button @click="_addAccCla">addAccCla</button>
          <button @click="_updateAccCla">updateAccCla</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var log = console.log;
import accCalApi from "../api/accCla.js";
import { mapGetters, mapMutations } from "vuex";

export default {
  created() {
    if (this.$store.state.accClas.length == 0) {
      log("nothig!");
    }
  },
  methods: {
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
      this.addAccCla({ id: "3001", name: "利润", parentId: "2001" });
    },
    _updateAccCla() {
      this.updateAccCla({ id: "3001", name: "好多利润", parentId: "root" });
    }

    /*  incrementCouont() {
      this.$store.commit("increment", { skip: 2 });
    } */
  },

  computed: {
    count() {
      return this.$store.state.count;
    },

    ...mapGetters([
      "todosCount",
      "doneTodosCount",
      "doneTodos",
      "getTodoByIndex",
      "getAccClasTree"
    ])
  }
};
</script>