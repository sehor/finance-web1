<template>
  <div>
    <div id="vuex">
      <p>Vuex</p>
      <div>
        <label>count:</label>
        <span>{{count}}</span>
        <button @click="incrementCount({skip:2})">increment!</button>

        <div>todosCount:{{todosCount}}</div>
        <div>doneTodosCount:{{doneTodosCount}}</div>
        <div>doneTodos:{{doneTodos}}</div>
        <div>getTodoByIndex:{{getTodoByIndex(2)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters ,mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(
        {incrementCount:"increment"}
        ),
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
      "getTodoByIndex"
    ])
  }
};
</script>