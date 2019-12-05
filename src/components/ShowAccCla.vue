<template>
  <div>
    <el-tabs type="border-card">
      
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-date"></i> 资 产
          </span>
          <AccClaTree :prop_category="'asset'" />
        </el-tab-pane>
        <el-tab-pane label="负 债 类">
          <AccClaTree :prop_category="'liability'" />
        </el-tab-pane>
        <el-tab-pane label="成 本 类">
          <AccClaTree :prop_category="'cost'" />
        </el-tab-pane>
        <el-tab-pane label="费用和损益">
          <AccClaTree :prop_category="'profit and loss'" />
        </el-tab-pane>
        <el-tab-pane label="所有者权益">
          <AccClaTree :prop_category="'equity'" />
        </el-tab-pane>
        <el-tab-pane label="共同类">
          <AccClaTree :prop_category="'common'" />
        </el-tab-pane>
     
    </el-tabs>
  </div>
</template>
<script>
import AccClaTree from "./AccClaTree.vue";
export default {
  components: {
    AccClaTree
  },
  data() {
    return {};
  }
};
</script>