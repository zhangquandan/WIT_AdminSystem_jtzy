webpackJsonp([41],{nVnm:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("Xxa5"),o=e.n(i),r=e("pFYg"),s=e.n(r),n=e("exGp"),l=e.n(n),u=e("h9gA"),d=e("9K4H"),c=e("y8LD"),h=e("r03E"),v={components:{BarChartForQuota:e("iJVS").a,SetMonthQuota:h.a,SetQuotaTable:c.a,SearchByYear:d.a,SelectCampus:u.a},name:"set-campus-quota",data:function(){return{totalOfSearchYear:0,proportion:100,quotaRadio:"1",radio:"1",totalQuota:0,historyTotal:0,ariaHidden:!1,currentName:"定额年份：",historyName:"参考年份：",regionId:1,current:"",history:"",quota:{},historyQuota:{},historyFlow:[],tableData:[],show:!1,quotaData:[],historyData:[],dialogVisible:!1,monthData:[],status:-1,id:0,regionName:"",editor:"",editorDepartment:""}},created:function(){this.editor=localStorage.getItem("userName");var t=new Date;this.current=String(t.getFullYear()),this.history=String(this.current-1),this.init()},methods:{getQuotaData:function(){var t=this,a=new Date,e=(localStorage.getItem("userName"),a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate()+" "+a.getHours()+":"+a.getMinutes()+":"+a.getSeconds()),i={};return this.tableData.forEach(function(a,e){e<12?i["m"+(e+1)]=a.value:t.totalQuota=a.value}),i.id=this.id,i.waterregionid=this.regionId,i.quotayear=this.current,i.editor=this.editor,i.editordepartment=this.editorDepartment,i.edittime=e,i.totalquota=this.totalQuota,0==this.status&&delete i.id,i},keep:function(){var t=this;this.$confirm("请确认是否保存当前校区年度定额?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var a=t.qs.stringify(t.getQuotaData());0==t.status?t.$api.waterRegionQuota.addQuota(a).then(function(a){"ok"==a.msg?t.$alert("定额设置成功","提示"):t.$alert("定额设置失败，你的权限不够！","提示"),t.init}):t.$api.waterRegionQuota.updateQuota(a).then(function(a){"ok"==a.msg?t.$alert("定额修改成功","提示"):t.$alert("定额修改失败，你的权限不够！","提示")})}).catch(function(){t.$message({type:"info",message:"已取消保存"})})},setData:function(t){this.monthData=t.current},link:function(){var t=this,a=[];this.tableData.forEach(function(e,i){var o=t.monthData[i].number;e.value=o,a.push(o)}),this.quotaData=a,this.dialogVisible=!1},setUpQuota:function(){var t=this,a=0,e=void 0,i=void 0;e=this.tableData,"1"==this.quotaRadio?(a=this.proportion/100,this.tableData=e.map(function(e){if("--"!=e.history)return{name:e.name,value:Number(Number(e.history)*a).toFixed(0),history:e.history};t.$alert("参考年份暂无数据！","提示")})):(i=this.totalOfSearchYear,this.tableData=e.map(function(a){var o=a.history;if("--"!=o){var r=Number(o)/Number(e[e.length-1].history);return{name:a.name,value:Number(i*r).toFixed(0),history:a.history}}t.$alert("参考年份暂无数据！","提示")}));var o=this.tableData.map(function(t){return t.value});o.pop(),this.quotaData=o},handleClose:function(t){this.$confirm("确认关闭？").then(function(a){t()}).catch(function(t){})},changeRadio:function(){"1"==this.radio?this.getHistoryFlow():this.getHistoryQuota()},init:function(){var t=this;return l()(o.a.mark(function a(){var e,i,r,n,l;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e={waterregionid:t.regionId,quotayear:t.current},a.next=3,t.$api.waterRegionQuota.findAll(e);case 3:return(i=(i=a.sent).data&&"object"==s()(i.data)&&i.data.length>0?i.data[0]:{}).id?(t.status=1,t.id=i.id,t.regionName=i.waterregionname):t.status=0,e.quotayear=t.history,a.next=9,t.$api.waterRegionQuota.findAll(e);case 9:return r=(r=a.sent).data&&"object"==s()(r.data)&&r.data.length>0?r.data[0]:{},n={pageNum:1,pageSize:12,waterregionid:t.regionId,yy:t.history},a.next=14,t.$api.regionInf.findFlowPageYearMonth(n);case 14:l=(l=a.sent).data&&l.data.list?l.data.list:null,t.quota=i,t.historyQuota=r,t.historyFlow=l,t.getTableData();case 20:case"end":return a.stop()}},a,t)}))()},getTableData:function(){var t,a=this.quota,e=this.historyQuota,i=this.historyFlow,o=[],r=[],s=[],n=void 0,l=void 0,u=void 0,d=void 0,c=0;t=a.totalquota?Number(a.totalquota):0,"1"!=this.radio&&(c=e.totalquota?e.totalquota:"--");for(var h=1;h<=12;h++)l=h,u=a[n="m"+h]?a[n]:"--","1"==this.radio?c+="--"==(d=i?Number(i[h-1].data).toFixed(0):"--")?0:Number(d):d=e[n]?Number(e[n]).toFixed(0):"--",o.push({name:l,value:u,history:d}),r.push(u),s.push("--"==d?0:d);this.historyTotal=0==c?"--":c,this.totalQuota=t,this.totalOfSearchYear=c,o.push({name:"合计",value:t,history:c}),this.tableData=o,this.historyData=s,this.quotaData=r,this.show=!0},getCurrentQuota:function(){var t=this,a={waterregionid:this.regionId,quotayear:this.current};this.$api.waterRegionQuota.findAll(a).then(function(a){var e=a.data&&"object"==s()(a.data)&&a.data.length>0?a.data[0]:{};e.id?(t.status=1,t.id=e.id,t.regionName=e.waterregionname):t.status=0,t.quota=e,t.getTableData()})},getHistoryQuota:function(){var t=this,a={waterregionid:this.regionId,quotayear:this.history};this.$api.waterRegionQuota.findAll(a).then(function(a){var e=a.data&&"object"==s()(a.data)&&a.data.length>0?a.data[0]:{};t.historyQuota=e,t.getTableData()})},getHistoryFlow:function(){var t=this,a={pageNum:1,pageSize:12,waterregionid:this.regionId,yy:this.history};this.$api.regionInf.findFlowPageYearMonth(a).then(function(a){var e=a.data&&a.data.list?a.data.list:null;t.historyFlow=e,t.getTableData()})},searchCurrent:function(t){this.current=t.valueOfYear,this.getCurrentQuota()},searchHistory:function(t){this.history=t.valueOfYear,this.changeRadio()},selectCampus:function(t){this.regionId=t.id,this.changeRadio(),this.getCurrentQuota()}}},p={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"flex"},[e("div",{staticClass:"content body"},[e("div",{staticClass:"quota box box-solid"},[e("div",{staticClass:"box-header bg-aqua"},[t._v("定额及历史数据")]),t._v(" "),e("div",{staticClass:"box-body"},[e("div",{staticClass:"select-quota"},[e("select-campus",{attrs:{regionId:t.regionId},on:{change:t.selectCampus}}),t._v(" "),e("search-by-year",{staticClass:"search-year",attrs:{currentYear:t.current,titleName:t.currentName},on:{searchByYear:t.searchCurrent}}),t._v(" "),e("search-by-year",{staticClass:"search-year",attrs:{currentYear:t.history,titleName:t.historyName},on:{searchByYear:t.searchHistory}}),t._v(" "),e("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-s-tools"},on:{click:function(a){t.dialogVisible=!0}}},[t._v("定额设置")]),t._v(" "),e("el-dialog",{attrs:{title:"定额设置",visible:t.dialogVisible,"modal-append-to-body":!1,width:"350px",top:"10vh",modal:"","before-close":t.handleClose},on:{"update:visible":function(a){t.dialogVisible=a}}},[e("set-month-quota",{on:{setData:t.setData}}),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{size:"mini"},on:{click:function(a){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.link}},[t._v("确 定")])],1)],1),t._v(" "),e("el-radio-group",{staticClass:"radio-group",attrs:{size:"mini",type:"success"},on:{change:t.changeRadio},model:{value:t.radio,callback:function(a){t.radio=a},expression:"radio"}},[e("el-radio-button",{attrs:{label:"1"}},[t._v("历史用量")]),t._v(" "),e("el-radio-button",{attrs:{label:"2"}},[t._v("历史定额")])],1)],1),t._v(" "),e("div",{directives:[{name:"loading",rawName:"v-loading",value:!t.show,expression:"!show"}],staticClass:"quota-table"},[t.show?e("set-quota-table",{attrs:{tableData:t.tableData}}):t._e()],1),t._v(" "),e("div",{staticClass:"quota-radio"},[e("el-radio",{attrs:{label:"1"},model:{value:t.quotaRadio,callback:function(a){t.quotaRadio=a},expression:"quotaRadio"}},[t._v("依参考数据按比例调整:\n            "),e("el-input-number",{attrs:{size:"mini","controls-position":"right",min:10,step:1,disabled:1!=t.quotaRadio},model:{value:t.proportion,callback:function(a){t.proportion=a},expression:"proportion"}}),t._v("(%) \n            "),e("el-button",{attrs:{type:"primary",plain:"",size:"mini",disabled:1!=t.quotaRadio},on:{click:t.setUpQuota}},[t._v("\n              设为当前校区定额\n            ")])],1),t._v(" "),e("el-radio",{attrs:{label:"2"},model:{value:t.quotaRadio,callback:function(a){t.quotaRadio=a},expression:"quotaRadio"}},[t._v("依参考月比例按总额调整:\n            "),e("el-input-number",{attrs:{size:"mini","controls-position":"right",min:0,step:100,disabled:2!=t.quotaRadio},model:{value:t.totalOfSearchYear,callback:function(a){t.totalOfSearchYear=a},expression:"totalOfSearchYear"}}),t._v("(吨)\n            "),e("el-button",{attrs:{type:"primary",plain:"",size:"mini",disabled:2!=t.quotaRadio},on:{click:t.setUpQuota}},[t._v("\n              设为当前校区定额\n            ")])],1),t._v(" "),e("div",[t._v("定额责任人:"),e("el-input",{attrs:{size:"mini",placeholder:"请输入内容",clearable:""},model:{value:t.editor,callback:function(a){t.editor=a},expression:"editor"}})],1),t._v(" "),e("div",[t._v("定额下达部门:"),e("el-input",{attrs:{size:"mini",placeholder:"请输入内容",clearable:""},model:{value:t.editorDepartment,callback:function(a){t.editorDepartment=a},expression:"editorDepartment"}})],1),t._v(" "),e("el-button",{staticClass:"keep",attrs:{type:"primary",size:"mini",icon:"el-icon-s-tools"},on:{click:t.keep}},[t._v("保存")])],1)])]),t._v(" "),e("div",{staticClass:"quota-charts box box-solid"},[e("div",{staticClass:"box-header bg-aqua"},[t._v("定额及历史数据图表")]),t._v(" "),e("div",{staticClass:"box-body"},[e("div",{directives:[{name:"loading",rawName:"v-loading",value:!t.show,expression:"!show"}],staticClass:"quota-history"},[t.show?e("bar-chart-for-quota",{attrs:{quota:t.quotaData,history:t.historyData}}):t._e()],1)])])])])},staticRenderFns:[]};var m=e("VU/8")(v,p,!1,function(t){e("sjGF")},"data-v-4c4f7194",null);a.default=m.exports},sjGF:function(t,a){}});
//# sourceMappingURL=41.d36572e280bc89339d85.js.map