
export const keydownHandle=({ row, rowIndex, column, columnIndex }, event,context)=> {

    if (event.keyCode == 32) {
      if (column.title === "借方") {
        context.$refs.xTable.setSelectCell(row, "credit");
        context.tableData[rowIndex]["credit"] = context.tableData[rowIndex][
          "debit"
        ];
        context.tableData[rowIndex]["debit"] = "";
      }
      if (column.title === "贷方") {
        context.$refs.xTable.setSelectCell(row, "debit");
        context.tableData[rowIndex]["debit"] = context.tableData[rowIndex][
          "credit"
        ];
        context.tableData[rowIndex]["credit"] = "";
      }
      event.stopPropagation();
      setTimeout(() => {
        context.$refs.xTable.updateFooter();
      }, 300);
    }

    else if (event.keyCode == 187) {
      log(event.keyCode)
      
      if (column.title == "借方") {
        context.$refs.xTable.setSelectCell(row, "credit");
        let val = parseFloat(context.tableData[rowIndex]["debit"]) || 0;
        context.tableData[rowIndex]["debit"] =
        context.totalCredit - (context.totalDebit - val )+ "";
      } else if (column.title == "贷方") {
        context.$refs.xTable.setSelectCell(row, "debit");
        let val = parseFloat(context.tableData[rowIndex]["credit"]) || 0;
        context.tableData[rowIndex]["credit"] =context.totalDebit - context.totalCredit+ val + "";
      }
      event.stopPropagation();
      setTimeout(() => {
        context.$refs.xTable.updateFooter();
      }, 300);
    }
    else if(event.keyCode == 187){

    }
  }