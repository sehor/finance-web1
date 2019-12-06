import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element.js'

//vxe table stuff
import utils from'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import VXETablePluginElement from 'vxe-table-plugin-element'
//import 'vxe-table-plugin-element/dist/style.css'

import {tableCalculator}  from './utils/TableCalculator.js'


Vue.config.productionTip = false
Vue.use(utils)
Vue.use(VXETable)
VXETable.use(VXETablePluginElement)

Vue.prototype.tableCal=tableCalculator

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
