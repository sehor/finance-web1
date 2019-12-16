import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:10,
    todos:[
      {index:1,value:'java study',done:false},
      {index:2,value:'javaScript study',done:false},
      {index:1,value:'ES2015 study',done:true},
    ]
  },
  mutations: {
    increment(state,playLoad){
      state.count+=playLoad.skip
    }
  },

  getters:{
         doneTodos:(state)=>{return state.todos.filter(todo=>todo.done)},
         todosCount:(state)=>{return state.todos.length},
         doneTodosCount:(state,getters)=>{return getters.doneTodos.length},
         getTodoByIndex:(state)=>(id)=>{return state.todos.find(todo=>todo.index==id)}
  },
  actions: {
  },
  modules: {
  }
})
