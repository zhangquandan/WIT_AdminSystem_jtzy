webpackJsonp([42],{IpTx:function(e,t){},Y89V:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={data:function(){return{editDialog:!1,addDialog:!1,tableData:[],options:[],show:!1,temp:"",ruleForm:{id:"",username:"",password:"",name:"",tel:"",address:"",email:"",explain:"",status:"",remark:"",roleid:""},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}],name:[{required:!0,message:"请输入姓名",trigger:"blur"}],tel:[{required:!0,message:"请输入联系人手机号码",trigger:"blur"},{pattern:"^(1)[0-9]{10}$",message:"号码格式错误",trigger:["blur","change"]}],roleid:[{required:!0,message:"请选择用户角色",trigger:"blur"}]}}},created:function(){this.refresh(),this.getAllRoles()},methods:{getAllRoles:function(){var e=this;this.$api.userInf.findAllRoles().then(function(t){e.options=t})},refresh:function(){var e=this;this.$api.userInf.findAllUsersRole().then(function(t){t.forEach(function(e){var t="";e.systemrole.forEach(function(e){t=t.concat(e.remark,"  ")}),e.role=t}),e.tableData=t})},addMessage:function(){this.addDialog=!0,this.ruleForm.id="",this.ruleForm.username="",this.ruleForm.password="",this.ruleForm.roleid="",this.ruleForm.name="",this.ruleForm.tel="",this.ruleForm.address="",this.ruleForm.email="",this.ruleForm.explain="",this.ruleForm.remark="",this.ruleForm.status=!1},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;var r=t.qs.stringify(t.ruleForm);t.$api.userInf.addUser(r).then(function(e){"ok"===e.msg?(t.addDialog=!1,t.$message({type:"success",message:"添加成功！"}),t.refresh()):t.$message({type:"error",message:"您的账号权限不足！"})})})},handleEdit:function(e,t){var r=this,l={id:t.id};this.$api.userInf.findAllUsers(l).then(function(e){delete e[0].systemrole,r.ruleForm=e[0]})},editForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;var r=t.qs.stringify(t.ruleForm);t.$api.userInf.updateUser(r).then(function(e){"ok"===e.msg?(t.editDialog=!1,t.$message({type:"success",message:"修改成功！"}),t.refresh()):t.$message({type:"error",message:"您的账号权限不足！"})})})},handleDelete:function(e,t){var r=this;this.$confirm("此操作将永久删除该内容, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){r.$api.userInf.deleteUser(t.id).then(function(e){"ok"==e.msg?(r.$message({type:"success",message:"删除成功!"}),r.refresh()):r.$message({type:"error",message:"您的账号权限不足！"})}).catch(function(){r.$message({type:"info",message:"删除失败！"})})}).catch(function(){r.$message({type:"info",message:"已取消删除"})})},exportExcel:function(){var e=this.xlsx.utils.table_to_book(document.querySelector("#out-table")),t=this.xlsx.write(e,{bookType:"xlsx",bookSST:!0,type:"array"});try{this.fileSaver.saveAs(new Blob([t],{type:"application/octet-stream"}),"用户信息.xlsx")}catch(e){"undefined"!=typeof console&&console.log(e,t)}return t}}},a={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"flex"},[r("el-dialog",{attrs:{title:"添加用户信息",visible:e.addDialog,width:"800px",top:"8%","modal-append-to-body":!1},on:{"update:visible":function(t){e.addDialog=t}}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px",size:"medium"}},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-xs-5"},[r("el-form-item",{attrs:{label:"用户名",prop:"username"}},[r("el-input",{model:{value:e.ruleForm.username,callback:function(t){e.$set(e.ruleForm,"username",t)},expression:"ruleForm.username"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"密码",prop:"password"}},[r("el-input",{model:{value:e.ruleForm.password,callback:function(t){e.$set(e.ruleForm,"password",t)},expression:"ruleForm.password"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"姓名",prop:"name"}},[r("el-input",{model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"用户角色",prop:"roleid"}},[r("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},model:{value:e.ruleForm.roleid,callback:function(t){e.$set(e.ruleForm,"roleid",t)},expression:"ruleForm.roleid"}},e._l(e.options,function(e){return r("el-option",{key:e.id,attrs:{label:e.remark,value:e.id}})}),1)],1),e._v(" "),r("el-form-item",{attrs:{label:"电话号码",prop:"tel"}},[r("el-input",{model:{value:e.ruleForm.tel,callback:function(t){e.$set(e.ruleForm,"tel",t)},expression:"ruleForm.tel"}})],1)],1),e._v(" "),r("div",{staticClass:"col-xs-5"},[r("el-form-item",{attrs:{label:"单位",prop:"address"}},[r("el-input",{model:{value:e.ruleForm.address,callback:function(t){e.$set(e.ruleForm,"address",t)},expression:"ruleForm.address"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[r("el-input",{model:{value:e.ruleForm.email,callback:function(t){e.$set(e.ruleForm,"email",t)},expression:"ruleForm.email"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"注册用途",prop:"explain"}},[r("el-input",{model:{value:e.ruleForm.explain,callback:function(t){e.$set(e.ruleForm,"explain",t)},expression:"ruleForm.explain"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"备注",prop:"remark"}},[r("el-input",{model:{value:e.ruleForm.remark,callback:function(t){e.$set(e.ruleForm,"remark",t)},expression:"ruleForm.remark"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"审核状态",prop:"status"}},[r("el-switch",{attrs:{"active-text":"开通","inactive-text":"未开通"},model:{value:e.ruleForm.status,callback:function(t){e.$set(e.ruleForm,"status",t)},expression:"ruleForm.status"}})],1)],1)])]),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.addDialog=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1),e._v(" "),r("el-dialog",{attrs:{title:"修改用户信息",visible:e.editDialog,width:"800px",top:"8%","modal-append-to-body":!1},on:{"update:visible":function(t){e.editDialog=t}}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px",size:"medium"}},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-xs-5"},[r("el-form-item",{attrs:{label:"用户名",prop:"username"}},[r("el-input",{model:{value:e.ruleForm.username,callback:function(t){e.$set(e.ruleForm,"username",t)},expression:"ruleForm.username"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"密码",prop:"password"}},[r("el-input",{model:{value:e.ruleForm.password,callback:function(t){e.$set(e.ruleForm,"password",t)},expression:"ruleForm.password"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"姓名",prop:"name"}},[r("el-input",{model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"电话号码",prop:"tel"}},[r("el-input",{model:{value:e.ruleForm.tel,callback:function(t){e.$set(e.ruleForm,"tel",t)},expression:"ruleForm.tel"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"单位",prop:"address"}},[r("el-input",{model:{value:e.ruleForm.address,callback:function(t){e.$set(e.ruleForm,"address",t)},expression:"ruleForm.address"}})],1)],1),e._v(" "),r("div",{staticClass:"col-xs-5"},[r("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[r("el-input",{model:{value:e.ruleForm.email,callback:function(t){e.$set(e.ruleForm,"email",t)},expression:"ruleForm.email"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"注册用途",prop:"explain"}},[r("el-input",{model:{value:e.ruleForm.explain,callback:function(t){e.$set(e.ruleForm,"explain",t)},expression:"ruleForm.explain"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"备注",prop:"remark"}},[r("el-input",{model:{value:e.ruleForm.remark,callback:function(t){e.$set(e.ruleForm,"remark",t)},expression:"ruleForm.remark"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"审核状态",prop:"status"}},[r("el-switch",{attrs:{"active-text":"开通","inactive-text":"未开通"},model:{value:e.ruleForm.status,callback:function(t){e.$set(e.ruleForm,"status",t)},expression:"ruleForm.status"}})],1)],1)])]),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.editDialog=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.editForm("ruleForm")}}},[e._v("确 定")])],1)],1),e._v(" "),r("div",{staticClass:"content"},[r("div",{staticClass:"box"},[r("div",{staticClass:"box-header bg-aqua"},[e._v("用户信息管理")]),e._v(" "),r("div",{staticClass:"box-body"},[r("div",{staticStyle:{"margin-bottom":"10px"}},[r("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:function(t){return t.stopPropagation(),e.addMessage(t)}}},[e._v("添加用户")]),e._v(" "),r("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-download"},on:{click:function(t){return t.stopPropagation(),e.exportExcel(t)}}},[e._v("报表导出")])],1),e._v(" "),r("el-table",{attrs:{data:e.tableData,size:"mini",stripe:"",id:"out-table",border:""}},[r("el-table-column",{attrs:{width:"50",type:"index",label:"序号"}}),e._v(" "),e.show?r("el-table-column",{attrs:{prop:"id",sortable:""}}):e._e(),e._v(" "),r("el-table-column",{attrs:{prop:"username",label:"用户名"}}),e._v(" "),r("el-table-column",{attrs:{prop:"password",label:"密码"}}),e._v(" "),r("el-table-column",{attrs:{prop:"name",label:"姓名"}}),e._v(" "),r("el-table-column",{attrs:{prop:"role",label:"账号权限"}}),e._v(" "),r("el-table-column",{attrs:{prop:"tel",label:"电话号码"}}),e._v(" "),r("el-table-column",{attrs:{prop:"address",label:"单位"}}),e._v(" "),r("el-table-column",{attrs:{prop:"email",label:"邮箱"}}),e._v(" "),r("el-table-column",{attrs:{prop:"explain",label:"注册用途"}}),e._v(" "),r("el-table-column",{attrs:{prop:"status",label:"审核状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.status?r("h6",{staticStyle:{color:"green"}},[e._v("通过")]):r("h6",{staticStyle:{color:"red"}},[e._v("未通过")])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"remark",label:"备注"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini",icon:"el-icon-edit"},on:{click:function(r){e.handleEdit(t.$index,t.row),e.editDialog=!0}}},[e._v("编辑")]),e._v(" "),r("el-button",{attrs:{size:"mini",icon:"el-icon-delete",type:"danger"},on:{click:function(r){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1)],1)])])],1)},staticRenderFns:[]};var o=r("VU/8")(l,a,!1,function(e){r("IpTx")},"data-v-4a72f2d3",null);t.default=o.exports}});
//# sourceMappingURL=42.ab899a0ed052821bed23.js.map