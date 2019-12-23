import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const log = console.log;
import accClaApi from '../api/accCla.js'

export default new Vuex.Store({
  state: {
    count: 10,
    todos: [
      { index: 1, value: 'java study', done: false },
      { index: 2, value: 'javaScript study', done: false },
      { index: 1, value: 'ES2015 study', done: true },
    ],
    accClas: ''
  },
  mutations: {
    increment(state, playLoad) {
      state.count += playLoad.skip
    },
    initAccClas(state, accClas) {
      state.accClas = accClas
    },
    deleteAccClaById(state, id) {
      let index = state.accClas.findIndex(e => e.id == id);
      if (index > -1) {
        state.accClas.splice(index, 1);
      }
    },
    addAccCla(state, new_accCla) {
      state.accClas.push(new_accCla);
    },
    updateAccCla(state, new_accCla) {
      let index = state.accClas.findIndex(e => e.id == new_accCla.id);
      log(index)
      if(index>-1){
        log(index)
        state.accClas.splice(index, 1, new_accCla);
      }
      
    }
  },

  getters: {
    doneTodos: (state) => { return state.todos.filter(todo => todo.done) },
    todosCount: (state) => { return state.todos.length },
    doneTodosCount: (state, getters) => { return getters.doneTodos.length },
    getTodoByIndex: (state) => (id) => { return state.todos.find(todo => todo.index == id) },

    getAccClasTree: (state) => {
      let nodes = [...state.accClas];


      const addChildren = (parent) => {
        let children = nodes.filter(e => e.parentId == parent.id)
        if (children && children.length > 0) {
          parent.children = children;
          children.forEach(e => addChildren(e))
        }
      }

      let rootNode = { id: 'root', name: 'rootNode', children: [] }
      addChildren(rootNode);
      return rootNode.children
    }
  },

  actions: {
  },
  modules: {
  },
})
