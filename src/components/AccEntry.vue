<template>
  <div>
    <h2>Accounting Entry</h2>

    <vxe-toolbar>
      <span>table bar</span>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      show-footer
      border
      height="400"
      class="vxe-table-element"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}"
      :footer-span-method="footerColspanMethod"
      :footer-method="footerMethod"
    >
      <vxe-table-column type="index" width="50"></vxe-table-column>
      <vxe-table-column field="brief" title="摘要" :edit-render="{name: 'input',autoselect:true}"></vxe-table-column>
      <vxe-table-column
        field="classification"
        title="科目"
        :edit-render="{name: 'ElCascader',props:{options:classification}}"
      ></vxe-table-column>

      <vxe-table-column field="debit" title="借方" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="credit" title="贷方" :edit-render="{name: 'input'}"></vxe-table-column>

      <vxe-table-column title="操作" width="150">
        <template v-slot="{row,rowIndex}">
          <vxe-button @click="addRow(row,rowIndex)" :loading="row.loading">增加行</vxe-button>
          <vxe-button @click="deleteRow(rowIndex)" :loading="row.loading">删除行</vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>
<!--     <div>
      <div v-for="(item,index) in tableData" :key="index">{{item}}</div>
    </div> -->
    <div>
      {{daxieAmout}}
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
      this.tableData = [
        {
          brief: "",
          debit: 0,
          credit: "",
          classification: ["zichang", "flowedAssert"]
        },
        {
          brief: "",
          debit: "",
          credit: "",
          classification: ["zichang", "flowedAssert"]
        },
        {
          brief: "",
          debit: "",
          credit: "",
          classification: ["zichang", "flowedAssert"]
        }
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

    addRow(row, rowIndex) {
      let newRow = { brief: "", classifictiong: "", debit: "", credit: "" };
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

    colspanMethod({ row, rowIndex, column, columnIndex, data }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 2) {
          return {
            rowspan: 1,
            colspan: 2
          };
        } else if (columnIndex === 3) {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    footerMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return "平均";
          }
          // 合并为一列显示
          if (["brief"].includes(column.property)) {
            return "大写: "
            /* +this.daxieAmout */
          }
          if (columnIndex==2) {
           return this.tableCal.sum(data,'debit');
          }
          if (columnIndex==3) {
            return this.tableCal.sum(data,'credit');
          }
          return null;
        })
      
      ];
      return footerData;
    },
    footerColspanMethod({ column, columnIndex, data }) {
     if (columnIndex === 1) {
        return {
          rowspan: 1,
          colspan: 2
        };
      } else if (columnIndex === 4) {
        return {
          rowspan: 1,
          colspan: 0
        };
      } 
    }
  },
  computed: {
    daxieAmout:function(){
     let str=this.tableData[0].debit+""
     return this.tableCal.convertToZhCapital(str)
    }
  } 
};
</script>

<style>
.mytable-style.vxe-table .vxe-body--column.col-orange {
  background-color: #f60;
  color: #fff;
}
</style>