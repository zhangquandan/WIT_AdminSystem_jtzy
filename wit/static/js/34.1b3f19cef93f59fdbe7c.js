webpackJsonp([34],{"+ub6":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={name:"building-category-management",data:function(){return{editDialog:!1,addDialog:!1,tableData:[],currentPage:1,size:10,total:0,ruleForm:{id:"",name:"",code:"",remark:""},rules:{id:[{required:!0,message:"请输入类别编号",trigger:"blur"}],name:[{required:!0,message:"请输入建筑类别",trigger:"blur"}]}}},created:function(){this.refresh()},methods:{refresh:function(){var e=this,t={pageNum:this.currentPage,pageSize:this.size};this.$api.buildingInf.findPageCategory(t).then(function(t){e.tableData=t.list,e.total=t.total})},changePage:function(e){this.currentPage=e.currentPage,this.size=e.size,this.refresh()},addMessage:function(){this.addDialog=!0,this.ruleForm.id="",this.ruleForm.name="",this.ruleForm.code="",this.ruleForm.remark=""},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;var r=t.qs.stringify(t.ruleForm);t.$api.buildingInf.addBuildingCategory(r).then(function(e){"ok"===e.msg?(t.addDialog=!1,t.$message({type:"success",message:"添加成功！"}),t.total%t.size==0?(t.currentPage=t.pages+1,t.refresh()):(t.currentPage=t.pages,t.refresh())):t.$message({type:"error",message:"您的账号权限不足！"})})})},editForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;var r=t.qs.stringify(t.ruleForm);t.$api.buildingInf.updateBuildingCategory(r).then(function(e){"ok"===e.msg?(t.editDialog=!1,t.$message({type:"success",message:"修改成功！"}),t.refresh()):t.$message({type:"error",message:"您的账号权限不足！"})})})},handleEdit:function(e,t){this.ruleForm=t,this.refresh()},handleDelete:function(e,t){var r=this;this.$confirm("此操作将永久删除该内容, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){r.$api.buildingInf.deleteCategory(t.id).then(function(e){"ok"==e.msg?(r.$message({type:"success",message:"删除成功!"}),r.total%r.size==1&&r.currentPage==r.pages&&(r.currentPage=r.pages-1),r.refresh()):r.$message({type:"error",message:"您的账号权限不足！"})}).catch(function(){r.$message({type:"info",message:"删除失败！"})})}).catch(function(){r.$message({type:"info",message:"已取消删除"})})},exportExcel:function(){var e=this.xlsx.utils.table_to_book(document.querySelector("#out-table")),t=this.xlsx.write(e,{bookType:"xlsx",bookSST:!0,type:"array"});try{this.fileSaver.saveAs(new Blob([t],{type:"application/octet-stream"}),"建筑类别信息.xlsx")}catch(e){"undefined"!=typeof console&&console.log(e,t)}return t}}},o={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"flex"},[r("el-dialog",{attrs:{title:"添加建筑类别",visible:e.addDialog,width:"400px",top:"5%","modal-append-to-body":!1},on:{"update:visible":function(t){e.addDialog=t}}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px",size:"medium"}},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-xs-10"},[r("el-form-item",{attrs:{label:"建筑类别",prop:"name"}},[r("el-input",{model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"类别编号",prop:"id"}},[r("el-input",{model:{value:e.ruleForm.id,callback:function(t){e.$set(e.ruleForm,"id",t)},expression:"ruleForm.id"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"代码",prop:"code"}},[r("el-input",{model:{value:e.ruleForm.code,callback:function(t){e.$set(e.ruleForm,"code",t)},expression:"ruleForm.code"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"备注",prop:"remark"}},[r("el-input",{model:{value:e.ruleForm.remark,callback:function(t){e.$set(e.ruleForm,"remark",t)},expression:"ruleForm.remark"}})],1)],1)])]),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.addDialog=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1),e._v(" "),r("el-dialog",{attrs:{title:"修改建筑类别",visible:e.editDialog,width:"400px",top:"5%","modal-append-to-body":!1},on:{"update:visible":function(t){e.editDialog=t}}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px",size:"medium"}},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-xs-10"},[r("el-form-item",{attrs:{label:"建筑类别",prop:"name"}},[r("el-input",{model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"代码",prop:"code"}},[r("el-input",{model:{value:e.ruleForm.code,callback:function(t){e.$set(e.ruleForm,"code",t)},expression:"ruleForm.code"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"备注",prop:"remark"}},[r("el-input",{model:{value:e.ruleForm.remark,callback:function(t){e.$set(e.ruleForm,"remark",t)},expression:"ruleForm.remark"}})],1)],1)])]),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.editDialog=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.editForm("ruleForm")}}},[e._v("确 定")])],1)],1),e._v(" "),r("div",{staticClass:"content"},[r("div",{staticClass:"box"},[r("div",{staticClass:"box-header bg-aqua"},[e._v("建筑类别信息管理")]),e._v(" "),r("div",{staticClass:"box-body"},[r("div",{staticStyle:{"margin-bottom":"10px"}},[r("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:function(t){return t.stopPropagation(),e.addMessage(t)}}},[e._v("添加建筑类别")]),e._v(" "),r("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-download"},on:{click:function(t){return t.stopPropagation(),e.exportExcel(t)}}},[e._v("报表导出")])],1),e._v(" "),r("el-table",{attrs:{data:e.tableData,size:"mini",stripe:"",id:"out-table",border:""}},[r("el-table-column",{attrs:{width:"50",type:"index",label:"序号"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s((e.currentPage-1)*e.size+t.$index+1))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"name",label:"建筑类别"}}),e._v(" "),r("el-table-column",{attrs:{prop:"id",label:"类别编号"}}),e._v(" "),r("el-table-column",{attrs:{prop:"code",label:"代码"}}),e._v(" "),r("el-table-column",{attrs:{prop:"remark",label:"备注"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini",icon:"el-icon-edit"},on:{click:function(r){e.handleEdit(t.$index,t.row),e.editDialog=!0}}},[e._v("编辑")]),e._v(" "),r("el-button",{attrs:{size:"mini",icon:"el-icon-delete",type:"danger"},on:{click:function(r){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1)],1),e._v(" "),r("div",{staticClass:"box-footer"},[r("page",{attrs:{total:e.total},on:{changePage:e.changePage}})],1)])])],1)},staticRenderFns:[]};var l=r("VU/8")(a,o,!1,function(e){r("PTWS")},"data-v-d03739ce",null);t.default=l.exports},PTWS:function(e,t){}});
//# sourceMappingURL=34.1b3f19cef93f59fdbe7c.js.map