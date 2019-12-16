<template>
  <div>
    <h2>Accounting Entry</h2>

    <vxe-toolbar>
      <span>table bar</span>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      resizable
      show-footer
      border
      height="400"
      class="vxe-table-element"
      :edit-rules="validRules"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}"
      :mouse-config="{selected: true}"
      :keyboard-config="{isArrow: true, isDel: true, isEnter:true,isTab:true,isEdit: true}"
      :footer-span-method="footerColspanMethod"
      :footer-method="footerMethod"
      @edit-closed="editClosedHandle"
      @cell-click="cellClickHandle"
      
    >
      <vxe-table-column title="操作" type="index" width="50" >
          <template v-slot="{row,rowIndex}">   
          <button @click="addRow(row,rowIndex)" >增</button>
          <button @click="deleteRow(rowIndex)" >删</button>
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="brief"
        title="摘要"
        :edit-render="{name: 'input',autoselect:true,events:{keydown:keydownHandle}}"
      ></vxe-table-column>
      <vxe-table-column
        field="classification"
        title="科目"
        width="300"
        :edit-render="{name: 'ElCascader',props:{options:classification,filterable:true,clearable:true},events:{keydown:keydownHandle}}"
      ></vxe-table-column>

      <vxe-table-column
        field="debit"
        title="借方"
        :edit-render="{name: 'input',autoselect:true,events:{keydown:keydownHandle}}"
      ></vxe-table-column>
      <vxe-table-column
        field="credit"
        title="贷方"
        :edit-render="{name: 'input',autoselect:true,events:{keydown:keydownHandle}}"
      ></vxe-table-column>
    </vxe-table>
    <div>
      <div v-for="(item,index) in tableData" :key="index">{{item}}</div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  data() {
    return {
      tableData: [],
      validRules: {
        brief: [
          { required: true, message: "写点摘要吧（点击鼠标复制上一栏内容）" },
          { min: 2, message: "至少两个字额" }
        ],
        classification: [{ required: true, message: "科目不能为空" }],
        debit: [{ type: "number", message: "请输入数字" }],
        credit: [{ type: "number", message: "please enter number" }]
      },
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
          debit: "",
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
      this.getRootAccCla();
      this.loading = false;
    }, 100);
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
          if (column.title === "序号") {
            return "合计";
          }
          // 合并为一列显示
          if (["brief"].includes(column.property)) {
            return "大写: " + this.daxieAmout;
            /* +this.daxieAmout */
          }
          if (columnIndex == 2) {
            return this.tableCal.sum(data, "debit");
          }
          if (columnIndex == 3) {
            return this.tableCal.sum(data, "credit");
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
    },

    editClosedHandle({
      row,
      rowIndex,
      $rowIndex,
      column,
      columnIndex,
      $columnIndex,
      cell
    }) {
      if (["debit"].includes(column.property)) {
        if (isNaN(this.tableData[rowIndex]["debit"])) {
          this.tableData[rowIndex]["debit"] = "";
          this.$message({
            message: "必须输入数字",
            type: "warning",
            offset: 300
          });
        } else if (
          this.tableData[rowIndex]["credit"] != "" &&
          this.tableData[rowIndex]["debit"] != ""
        ) {
          this.$message({
            message: "不能同时输入借方贷方,自动帮您删除另一个",
            type: "warning",
            offset: 300
          });
          this.tableData[rowIndex]["credit"] = "";
        }
      } else if (["credit"].includes(column.property)) {
        if (isNaN(this.tableData[rowIndex]["credit"])) {
          this.tableData[rowIndex]["credit"] = "";
          this.$message({
            message: "必须输入数字",
            type: "warning",
            offset: 300
          });
        } else if (
          this.tableData[rowIndex]["debit"] != "" &&
          this.tableData[rowIndex]["credit"] != ""
        ) {
          this.$message({
            message: "不能同时输入借方贷方,自动帮您删除另一个",
            type: "warning",
            offset: 300
          });
          this.tableData[rowIndex]["debit"] = "";
        }
      }
    },
    cellClickHandle(
      { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, cell },
      event
    ) {
      //自动填充摘要栏
      let val = this.tableData[rowIndex]["brief"];
      if (
        rowIndex > 0 &&
        columnIndex === 1 &&
        (val === "" || val === "undefined")
      ) {
        this.tableData[rowIndex]["brief"] = this.tableData[rowIndex - 1][
          "brief"
        ];
      }
    },
    handleKeyboardSpace() {
      // console.log("click space!")
    },
    keyupHandle(event) {
      //console.log("click up",event)
    },
    focusHandle({ rowIndex, columnIndex, data }, event) {
      //console.log(rowIndex,columnIndex,data)
    },
    keydownHandle({ row, rowIndex, column, columnIndex }, event) {
      if (event.keyCode == 32) {
        if (column.title === "借方") {
          this.$refs.xTable.setSelectCell(row, "credit");
          this.tableData[rowIndex]["credit"] = this.tableData[rowIndex][
            "debit"
          ];
          this.tableData[rowIndex]["debit"] = "";
        }
        if (column.title === "贷方") {
          this.$refs.xTable.setSelectCell(row, "debit");
          this.tableData[rowIndex]["debit"] = this.tableData[rowIndex][
            "credit"
          ];
          this.tableData[rowIndex]["credit"] = "";
        }
        event.stopPropagation();
        setTimeout(() => {
          this.$refs.xTable.updateFooter();
        }, 300);
      }

      if (event.keyCode == 187) {
        if (column.title == "借方") {
          this.$refs.xTable.setSelectCell(row, "credit");
          let val = parseFloat(this.tableData[rowIndex]["debit"]) || 0;
          this.tableData[rowIndex]["debit"] =
            this.totalCredit - this.totalDebit + val + "";
        } else if (column.title == "贷方") {
          this.$refs.xTable.setSelectCell(row, "debit");
          let val = parseFloat(this.tableData[rowIndex]["credit"]) || 0;
          this.tableData[rowIndex]["credit"] =
            this.totalCredit - this.totalDebit + val + "";
        }
        event.stopPropagation();
        setTimeout(() => {
          this.$refs.xTable.updateFooter();
        }, 300);
      }

      if(event.keyCode==13){
         console.log(rowIndex,columnIndex)
      }
    },
    getRootAccCla(){
      Axios({
        type:'get',
        baseURL:'http://localhost:8083',
        url:'/AccCla/rootPresentation/all',
      }).then(resp=>{
        this.classification= JSON.parse(JSON.stringify(resp.data.children))
      }).catch(err=>{
        throw err
      })
    }
  
  },

  computed: {
    daxieAmout: function() {
      if (this.totalDebit == this.totalCredit) {
        return this.tableCal.convertToZhCapital(this.totalDebit);
      } else {
        return "借贷不平衡";
      }
    },
    totalDebit: function() {
      return this.tableCal.sum(this.tableData, "debit");
    },
    totalCredit: function() {
      return this.tableCal.sum(this.tableData, "credit");
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