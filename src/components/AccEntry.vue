<template>
  <div>
    <h2>Accounting Entry</h2> 

    <vxe-toolbar>
      <span>table bar</span>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      border
      height="400"
      class="vxe-table-element"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}"
    >
      <vxe-table-column type="index" width="20"></vxe-table-column>
      <vxe-table-column field="brief" title="摘要" :edit-render="{name: 'input',autoselect:true}"></vxe-table-column>
      <vxe-table-column
        field="classification"
        title="科目"
        :edit-render="{name: 'ElCascader',props:{options:classification}}"
      ></vxe-table-column>

<!--       <vxe-table-column
        field="AC"
        title="ElCascader"
        width="200"
        :edit-render="{type: 'default'}"
      >
        <template v-slot:edit="{ row }">
          <el-cascader v-model="row.AC" :options="classfication"  filterable ></el-cascader>
        </template>
        <template v-slot="{ row }">{{ getCascaderLabel(row.AC,classfication)}}</template>
      </vxe-table-column> -->

      <vxe-table-column field="debit" title="借方" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="credit" title="贷方" :edit-render="{name: 'input'}"></vxe-table-column>

      <vxe-table-column title="操作" width="150">
        <template v-slot="{row,rowIndex}">
          <vxe-button @click="addRow(row,rowIndex)" :loading="row.loading" >增加行</vxe-button>
          <vxe-button @click="deleteRow(rowIndex)" :loading="row.loading">删除行</vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <div>
       <div v-for="(item,index) in tableData" :key="index">{{item}}</div>
    </div>

  </div>
</template>

<script>
export default {
  
  data() {
    return {
      tableData: [],
      classification: [],
      selectRow: null,
      selectColumn: null
    };
  },
  created() {
    this.loading = true;
    setTimeout(() => {
      this.tableData = [{"brief":"","debit":"","credit":"","classification": [ "zichang", "flowedAssert" ]},
      {"brief":"","debit":"","credit":"","classification": [ "zichang", "flowedAssert" ]},
      {"brief":"","debit":"","credit":"","classification": [ "zichang", "flowedAssert" ]},
      ];
      this.classification = [
        {
          value: "zichang",
          label: "资产",
          children: [
            { value: "fixedAssert", label: "固定资产" },
            { value: "flowedAssert", label: "流动资产" }
          ]
        },
                {
          value: "zichang",
          label: "资产2",
          children: [
            { value: "fixedAssert", label: "固定资产2" },
            { value: "flowedAssert", label: "流动资产2" }
          ]
        },
        {
          value: "fuzhai",
          label: "负债",
          children: [
            { value: "longtermDebt", label: "长期负债" },
            {
              value: "shortTermDebt",
              label: "短期负债",
              children: [
                {
                  value: "personalDebt",
                  label: "个人负债",
                  children: [{ value: "pzr", label: "pengzhuorong" }]
                }
              ]
            }
          ]
        }
      ];
      this.loading = false;
    }, 300);
  },
  methods: {
    cellClassName({ row, column }) {
      if (row === this.selectRow && column == this.selectColumn)
        return "col-orange";
    },
/*     handleCellClick({ row, column }) {
      this.selectRow = row;
      this.selectColumn = column;
    }, */

    addRow(row, rowIndex) {
      let newRow = {"brief":"","classifictiong":"","debit":"","credit":""};
      this.$refs.xTable.insertAt(row).then(({ row }) => {
        this.$refs.xTable.setActiveCell(row, "name");
        this.tableData.splice(rowIndex, 0, newRow);
      });
    },
    deleteRow(rowIndex) {
      this.$refs.xTable
        .remove(rowIndex)
        .then(() => this.tableData.splice(rowIndex, 1));
    },


/*     getCascaderLabel (value, list) {
              let values = value || []
              let labels = []
              let matchCascaderData = function (index, list) {
                let val = values[index]
                if (list && values.length > index) {
                   for(let i=0;i<list.length;i++){
                     if(list[i].value===val){
                       labels.push(list[i].label);
                       matchCascaderData(++index,list[i].children);
                       break;
                     }
                   }

                  list.forEach(item => {
                    if (item.value === val) {
                      labels.push(item.label)
                      matchCascaderData(++index, item.children)
                      return
                    }
                  })
                }
              }
              matchCascaderData(0, list)
              return labels.join(' / ')
            }, */ 
    /*    
    editActivedEvent({ row, column }, event) {
      console.log(`打开 ${column.title} 列编辑`);
    },
    editClosedEvent({ row, column }, event) {
      console.log(`关闭 ${column.title} 列编辑`);
    } */
  },
  computed:{
    
  }
};
</script>

<style>
.mytable-style.vxe-table .vxe-body--column.col-orange {
  background-color: #f60;
  color: #fff;
}
</style>