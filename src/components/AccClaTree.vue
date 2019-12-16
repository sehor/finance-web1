<template>
  <div>
    <div class="custom-tree-container">
      <div class="block">
        <el-input placeholder="输入关键字进行搜索" v-model="filterText"></el-input>
        <h3>{{prop_category}}</h3>
        <el-tree
          ref="tree"
          :data="data"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :check-on-click-node="true"
          :filter-node-method="filterNode"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>({{ data.id }})</span>
            <span>{{ data.label }}</span>
            <span>
              <el-button type="text" size="mini" @click="()=>edit(node,data)">Edit</el-button>
              <el-button type="text" size="mini" @click="() => append(data)">+</el-button>
              <el-button type="text" size="mini" @click="() => remove(node, data)">-</el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>

    <div>
      <el-dialog title="dialogTitle" :visible.sync="dialogVisible">
        <el-form :model="form">
          <div v-if="dialogTitle=='增加科目'">
            <div>上级科目编码：{{currentNodeData.id}}</div>
            <div>上级科目名称：{{currentNodeData.label}}</div>
          </div>
          <el-form-item  v-if="dialogTitle=='增加科目'" label="科目编码" :label-width="formLabelWidth">
            <el-input v-model="form.number" autocomplete="true"></el-input>
          </el-form-item>
          <el-form-item label="科目名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="true"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleComfirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>{{data}}</div>
  </div>
</template>

<script>
let id = 1000;
import axios from "axios";
import QS from "qs";
export default {
  props:{
    prop_category:String
  },
  created() {
    this.data = this.getRootAccCla();
  },
  data() {
    /* const data = [
      {
        id: 1,
        label: "一级 1",
        children: [
          {
            id: 4,
            label: "二级 1-1",
            children: [
              {
                id: 9,
                label: "三级 1-1-1",
                children: []
              },
              {
                id: 10,
                label: "三级 1-1-2",
                children: []
              }
            ]
          }
        ]
      }
    ]; */
    return {
      filterText: "",
      dialogTitle: "",
      currentNodeData: null,
      dialogVisible: false,
      form: {
        name: "",
        number: ""
      },
      formLabelWidth: "120px",
      data: []
    };
  },

  methods: {
    
    append(data) {
      this.dialogTitle = "增加科目";
      this.currentNodeData = data;

      this.dialogVisible = true;
    },

    remove(node, data) {
      this.$confirm("此操作将永久删除该科目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            method: "delete",
            baseURL: "http://localhost:8083",
            url: `/AccCla/delete/${data.id}`
          }).then(() => {
              const parent = node.parent;
              const children = parent.data.children || parent.data;
              const index = children.findIndex(d => d.id === data.id);
              children.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(err => {
              alert(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    edit(node, data) {
      this.dialogTitle = "编辑科目";
      this.currentNodeData = data;
      this.form.number = data.id;
      this.form.name = data.label;
      this.dialogVisible = true;
    },

    handleComfirm() {
      if (this.dialogTitle === "编辑科目") {
         this.currentNodeData.originAccCla.nameZh=this.form.name; 
        axios({
            method:'put',
            baseURL:'http://localhost:8083',
            url:`/AccCla/update`,
            data:this.currentNodeData.originAccCla
        }).then(resp=>{
                   this.currentNodeData.label = this.form.name;
                   this.currentNodeData.nameZh=this.form.name;
        }).catch(err=>{
            alert(err);
        });  


      } else if (this.dialogTitle === "增加科目") {
        const newChild = {
          id: this.form.number,
          label: this.form.name,
          nameZh: this.form.name,
          level: "sub",
          forIndustry: this.currentNodeData.forIndustry,
          parentId: this.currentNodeData.id,
          children: [],
          type: this.currentNodeData.type
        };
        axios({
          method: "post",
          baseURL: "http://localhost:8083",
          url: "/AccCla/add",
          data: newChild
        })
          .then(resp => {
            console.log(resp.data);
            this.currentNodeData.children.push(newChild);
          })
          .catch(err => {
            alert(err);
          });
      }

      this.dialogVisible = false;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) != -1;
    },
    getRootAccCla() {
      axios({
        method: "get",
        baseURL: "http://localhost:8083",
        url: `/AccCla/rootPresentation/${this.prop_category}`
      })
        .then(resp => {
        
          this.data = JSON.parse(JSON.stringify(resp.data.children));
          
        })
        .catch(err => {
          throw err;
        });
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;

  font-size: 14px;
  padding-right: 8px;
}
</style>