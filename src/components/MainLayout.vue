<template>
  <div>
    <el-container>
      <el-header>
        <span>Header</span>
      </el-header>
      <el-container>
        <el-aside withd="100px">
          <el-menu default-active="2" class="el-menu-vertical-demo" @select="handleSelect">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>账务</span>
              </template>
              <el-menu-item-group>
                <template slot="title">日常</template>
                <el-menu-item index="AccEntry">AccEntry</el-menu-item>
                <el-menu-item index="GridTest">GridTest</el-menu-item>
                <el-menu-item index="ShowAccCla">ShowAccCla</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
        
            <el-tabs
              v-model="activeName"
              @tab-click="handleClick"
              type="card"
              closable
              @tab-remove="removeTab"
            >
              <el-tab-pane
                v-for="(item,index) in tabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
              >
               <keep-alive> <component :is="currentComponentName"></component></keep-alive>
              </el-tab-pane>
            </el-tabs>
          
        </el-main>
      </el-container>
      <el-footer>
        <span>footer</span>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import AccEntry from "./AccEntry.vue";
import GridTest from "./GridTest.vue";
import ShowAccCla from './ShowAccCla.vue'
export default {
  components: {
    AccEntry,
    GridTest,
    ShowAccCla
  },
  data() {
    return {
      activeName: "",
      tabs: []
    };
  },
  methods: {
    //tabs click
    handleClick(tab, event) {
      //console.log(tab, event);
    },

    //tab remove
    removeTab(targeName, action) {
      let _activeName = this.activeName;
      let _tabs = this.tabs;
      if (targeName === this.activeName) {
        this.tabs.forEach((item, index) => {
          if (item.name == targeName) {
            let nextTab = this.tabs[index + 1] || this.tabs[index - 1]; //active neighbor
            if (nextTab) {
              _activeName = nextTab.name;
            }
          }
        });
      }

      this.activeName = _activeName;

      this.tabs = _tabs.filter(tab => tab.name !== targeName); // remove target tab
    },

    // menu select action,  pass key to tabs elements to decide which tab page will be opened
    handleSelect(key, keyPath) {
      if (key === "") return;
      /*       let exist=false;
      this.components.forEach(item=>{
         if(item.name===key) exist=true;
      })
        if (!exist) return; */

      for (let i = 0; i < this.tabs.length; i++) {
        if (key === this.tabs[i].name) {
          //有打开的对应组件，激活
          this.activeName = key;
          return;
        }
      }

      this.tabs.push({
        //有对应组件，生产新的tab
        title: key,
        name: key
      });
      this.activeName = key;
    }
  },

  computed: {
    // current component in tab
    currentComponentName: function() {
      return this.activeName;
    }
  }
};
</script>


<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  /*  background-color: #d3dce6; */
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /* background-color: #e9eef3; */
  /*  color: #333;
  text-align: center;
  line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

