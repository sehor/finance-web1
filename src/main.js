import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element.js'

//vxe table stuff
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import VXETablePluginElement from 'vxe-table-plugin-element'
//import 'vxe-table-plugin-element/dist/style.css'

Vue.config.productionTip = false
Vue.use(VXETable)
VXETable.use(VXETablePluginElement)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
