<template>
  <div>
    <vxe-grid
      border
      show-overflow
      ref="xGrid"
      class="vxe-table-element"
      height="460"
      :data="tableData"
      :columns="tableColumn"
      :toolbar="tableToolbar"
      :edit-config="{trigger: 'click', mode: 'cell'}"
      @edit-closed="handleEditedClose"
    ></vxe-grid>
    <div>
      <div v-for="(item,index) in tableData" :key="index">{{item}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      classification: [
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
      ],
      tableData: [{ brief: "", classification: "classfication", debit: "", credit: "" }],
      tableColumn: [
        {
          field: "brief",
          title: "摘要",
          width: 160,
          editRender: { name: "ElInput" }
        },
        {
          field: "classification",
          title: "科目",
          width: 160,
          editRender: { name: "ElCascader", props: {filterable:true, options: this.classification } }
        },
        {
          field: "debit",
          title: "借方",
          width: 140,
          editRender: { name: "ElInput" }
        },
        {
          field: "credit",
          title: "贷方",
          width: 140,
          editRender: { name: "ElInput" }
        }
      ],
      tableToolbar: {},
      
    };
  },
  created() {
    this.tableColumn[1].editRender.props.options=this.classification;
  },
  methods: {
    handleEditedClose(row){
       //console.log(row);
    }
  }
};
</script>