webpackJsonp([10],{"6ap7":function(a,t){},KReo:function(a,t){},NLgF:function(a,t){},e49J:function(a,t){},fDNo:function(a,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=i("Xxa5"),n=i.n(e),s=i("exGp"),o=i.n(s),r=i("kWzz"),l={name:"basic-inf",props:{buildingId:{type:Number}},data:function(){return{basicInf:[]}},methods:{refreshBasic:function(a){var t=this;this.$api.buildingInf.findOne(a).then(function(a){t.basicInf=a})}}},d={render:function(){var a=this,t=a.$createElement,i=a._self._c||t;return i("div",{staticClass:"basic-box"},[i("div",{staticClass:"basic-row"},[a._m(0),a._v(" "),i("div",{staticClass:"basic-value"},[a._v(a._s(a.basicInf.name))]),a._v(" "),a._m(1),a._v(" "),i("div",{staticClass:"basic-value"},[a._v(a._s(a.basicInf.snumber))])]),a._v(" "),i("div",{staticClass:"basic-row"},[a._m(2),a._v(" "),i("div",{staticClass:"basic-value"},[a._v(a._s(a.basicInf.category))]),a._v(" "),a._m(3),a._v(" "),i("div",{staticClass:"basic-value"},[a._v(a._s(a.basicInf.storeys)+"层")])]),a._v(" "),i("div",{staticClass:"basic-row"},[a._m(4),a._v(" "),i("div",{staticClass:"basic-value"},[a._v(a._s(a.basicInf.buildingarea)+"㎡")]),a._v(" "),a._m(5),a._v(" "),i("div",{staticClass:"basic-value"},[a._v(a._s(a.basicInf.population)+"人")])])])},staticRenderFns:[function(){var a=this.$createElement,t=this._self._c||a;return t("div",{staticClass:"basic-name"},[t("b",[this._v("建筑名称")])])},function(){var a=this.$createElement,t=this._self._c||a;return t("div",{staticClass:"basic-name"},[t("b",[this._v("建筑编号")])])},function(){var a=this.$createElement,t=this._self._c||a;return t("div",{staticClass:"basic-name"},[t("b",[this._v("建筑类别")])])},function(){var a=this.$createElement,t=this._self._c||a;return t("div",{staticClass:"basic-name"},[t("b",[this._v("建筑楼层")])])},function(){var a=this.$createElement,t=this._self._c||a;return t("div",{staticClass:"basic-name"},[t("b",[this._v("建筑面积")])])},function(){var a=this.$createElement,t=this._self._c||a;return t("div",{staticClass:"basic-name"},[t("b",[this._v("入驻人数")])])}]};var u=i("VU/8")(l,d,!1,function(a){i("vz6t")},"data-v-38cefffb",null).exports,c={render:function(){var a=this,t=a.$createElement,i=a._self._c||t;return i("div",{staticClass:"meter"},[i("el-table",{attrs:{border:"",data:a.tableData,size:"mini",height:"100%"}},[i("el-table-column",{attrs:{label:"序号",type:"index",align:"center"}}),a._v(" "),a._l(a.tableColumn,function(a,t){return i("el-table-column",{key:t,attrs:{label:a.name,prop:a.prop,align:"center"}})}),a._v(" "),i("el-table-column",{attrs:{label:"地图定位",align:"center"},scopedSlots:a._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-location"},on:{click:function(i){return a.locateMeter(t.row)}}})]}}])})],2)],1)},staticRenderFns:[]};var v=i("VU/8")({name:"meter-inf",data:function(){return{tableData:[],tableColumn:[{name:"水表名称",prop:"name"},{name:"水表编号",prop:"snumber"},{name:"通讯编号",prop:"comno"},{name:"出厂编号",prop:"productsn"},{name:"水表类型",prop:"category"},{name:"材质",prop:"material"},{name:"规格",prop:"dimension"}]}},methods:{refreshWaterMeter:function(a){var t=this;this.$api.waterMeterInf.findByBuildingId(a).then(function(a){t.tableData=a})},locateMeter:function(a){var t=this,i=void 0,e=void 0,n=void 0;this.$api.waterMeterInf.findOne(a.id).then(function(a){i=a.name,e=a.tag.substring(1,a.tag.length-1).split(",")[0],n=a.tag.substring(1,a.tag.length-1).split(",")[1],t.$router.push({path:"/BmapGL",query:{marker:{lng:e,lat:n},info:i}})})}}},c,!1,function(a){i("NLgF")},"data-v-0da49c45",null).exports,f={name:"water-index",data:function(){return{flow:"--",buildingArea:"",population:"",personFlow:"--",buildingAreaFlow:"--"}},methods:{dateFtt:function(a){return(a=new Date(a)).getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate()},initialize:function(a){var t=this,i=new Date,e=i.getTime(),n=this.dateFtt(e),s=i.getTime()-864e5,o=this.dateFtt(s),r={pageNum:1,pageSize:1,buildingid:a,starttime:o,endtime:n};this.$api.buildingInf.findTotalFlowAnyDay(r).then(function(i){"ok"===i.msg?(t.flow=i.data.list[0].data.toFixed(1),t.$api.buildingInf.findOne(a).then(function(a){t.population=a.population,t.buildingArea=a.buildingarea,t.personFlow=(t.flow/t.population*1e3).toFixed(1),t.buildingAreaFlow=(t.flow/t.buildingArea*1e3).toFixed(1)})):(t.flow="--",t.personFlow="--",t.buildingAreaFlow="--")})},daysFlow:function(a){var t=this;this.$api.buildingInf.findTotalFlowAnyDay(a).then(function(i){"ok"===i.msg?(t.flow=i.data.list[0].data.toFixed(1),t.$api.buildingInf.findOne(a.buildingid).then(function(a){t.population=a.population,t.buildingArea=a.buildingarea,t.personFlow=(t.flow/t.population*1e3).toFixed(1),t.buildingAreaFlow=(t.flow/t.buildingArea*1e3).toFixed(1)})):(t.flow="--",t.personFlow="--",t.buildingAreaFlow="--")})},monthsFlow:function(a){var t=this;this.$api.buildingInf.findTotalFlowAnyMonth(a).then(function(i){"ok"===i.msg?(t.flow=i.data.list[0].data.toFixed(1),t.$api.buildingInf.findOne(a.buildingid).then(function(a){t.buildingArea=a.buildingarea,t.population=a.population,t.personFlow=(t.flow/t.population/30*1e3).toFixed(1),t.buildingAreaFlow=(t.flow/t.buildingArea/30*1e3).toFixed(1)})):(t.flow="--",t.personFlow="--",t.buildingAreaFlow="--")})},yearsFlow:function(a){var t=this;this.$api.buildingInf.findTotalFlowAnyYear(a).then(function(i){"ok"===i.msg?(t.flow=i.data.list[0].data.toFixed(1),t.$api.buildingInf.findOne(a.buildingid).then(function(a){t.buildingArea=a.buildingarea,t.population=a.population,t.buildingAreaFlow=(t.flow/t.buildingArea/365*1e3).toFixed(1),t.personFlow=(t.flow/t.population/365*1e3).toFixed(1)})):(t.flow="--",t.personFlow="--",t.buildingAreaFlow="--")})}}},b={render:function(){var a=this,t=a.$createElement,i=a._self._c||t;return i("div",{staticClass:"water-box"},[a._m(0),a._v(" "),i("div",{staticClass:"index-value"},[i("div",[a._v(a._s(a.flow)+"吨")]),a._v(" "),i("div",[a._v(a._s(a.personFlow)+"升")]),a._v(" "),i("div",[a._v(a._s(a.buildingAreaFlow)+"升")])])])},staticRenderFns:[function(){var a=this.$createElement,t=this._self._c||a;return t("div",{staticClass:"index-name"},[t("div",[t("b",[this._v("当前用量")])]),this._v(" "),t("div",[t("b",[this._v("生均单耗")])]),this._v(" "),t("div",[t("b",[this._v("建面单耗")])])])}]};var p=i("VU/8")(f,b,!1,function(a){i("e49J")},"data-v-1db96a78",null).exports,g={name:"quota-table",data:function(){return{table:[{name:"用量"},{name:"定额"},{name:"节水"}],tableColumn:[{name:"月份",prop:"name"},{name:"01",prop:"1"},{name:"02",prop:"2"},{name:"03",prop:"3"},{name:"04",prop:"4"},{name:"05",prop:"5"},{name:"06",prop:"6"},{name:"07",prop:"7"},{name:"08",prop:"8"},{name:"09",prop:"9"},{name:"10",prop:"10"},{name:"11",prop:"11"},{name:"12",prop:"12"},{name:"已用累计",prop:"count"}]}},created:function(){this.table=this.tableData},props:{tableData:{type:Array}},methods:{}},h={render:function(){var a=this.$createElement,t=this._self._c||a;return t("div",{staticClass:"quota-box"},[t("el-table",{attrs:{border:"",data:this.table,size:"mini"}},this._l(this.tableColumn,function(a,i){return t("el-table-column",{key:i,attrs:{label:a.name,prop:a.prop,align:"center"}})}),1)],1)},staticRenderFns:[]};var m=i("VU/8")(g,h,!1,function(a){i("6ap7")},"data-v-3c09edfc",null).exports,_={components:{SavingBarChartS:i("DQ4D").a},name:"quota-chart",data:function(){return{quotaData:[],usageData:[],savingData:[],basicInf:{}}},created:function(){this.quotaData=this.quota,this.usageData=this.usage,this.savingData=this.saving,this.basicInf=this.savingInf},props:{quota:{type:Array},usage:{type:Array},saving:{type:Array},savingInf:{type:Object}}},w={render:function(){var a=this,t=a.$createElement,i=a._self._c||t;return i("div",{staticClass:"chart-box"},[i("div",{staticClass:"chart-row"},[i("div",[i("saving-bar-chart-s",{attrs:{quota:a.quotaData,usage:a.usageData,saving:a.savingData}})],1)]),a._v(" "),i("div",{staticClass:"count-row"},[i("div",[a._v("当年定额(吨)："+a._s(a.basicInf.currentQuota))]),a._v(" "),i("div",[a._v("已用累计(吨)："+a._s(a.basicInf.usage))]),a._v(" "),i("div",[a._v("已用节水(吨)："+a._s(a.basicInf.saving))]),a._v(" "),i("div",[a._v("已用节水率(%)："+a._s(a.basicInf.ratio))])])])},staticRenderFns:[]};var I=i("VU/8")(_,w,!1,function(a){i("pXeK")},"data-v-0eac5194",null).exports,x=i("uwMp"),C=i("mF0L"),F={components:{QuotaChart:I,QuotaTable:m,WaterIndex:p,MeterInf:v,BasicInf:u,SelectBuilding:r.a,RadioGroup1:x.a},name:"building-water-use-overview",data:function(){return{dateRadio:1,quotaRadio:1,buildingId:137,imageData:[],savingInf:{},quota:[],usage:[],saving:[],show:!1,year:(new Date).getFullYear(),start:"",end:"",columns:[{name:"月份",prop:"name"},{name:"01",prop:"1"},{name:"02",prop:"2"},{name:"03",prop:"3"},{name:"04",prop:"4"},{name:"05",prop:"5"},{name:"06",prop:"6"},{name:"07",prop:"7"},{name:"08",prop:"8"},{name:"09",prop:"9"},{name:"10",prop:"10"},{name:"11",prop:"11"},{name:"12",prop:"12"},{name:"已用累计",prop:"count"}],tableData:[],title:"建筑节水概况与定额管理"}},created:function(){var a=this.$route.query;void 0!==a.buildingId&&(this.buildingId=a.buildingId);var t=this.$route.params;t.id&&(this.buildingId=t.id)},mounted:function(){this.$refs.basicInfo.refreshBasic(this.buildingId),this.$refs.meterInfo.refreshWaterMeter(this.buildingId),this.$refs.flowInfo.initialize(this.buildingId),this.getBuildingPic();var a=(new Date).getFullYear();this.year=a,this.start=a+"-01",this.end=Number(a)+1+"-01",this.getBasicData()},methods:{exportData:function(){Object(C.a)(this.columns,this.tableData,this.title)},changeYear:function(){var a=(new Date).getFullYear();switch(this.quotaRadio){case"1":a=a;break;case"2":a-=1}this.year=a,this.start=a+"-01",this.end=Number(a)+1+"-01",this.getBasicData()},getBasicData:function(){var a=this;return o()(n.a.mark(function t(){var i,e,s,o,r,l,d;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a.show=!1,i=(new Date).getFullYear(),e=a.year,s=a.buildingId,o={buildingid:s,quotayear:e},t.next=7,a.$api.buildingQuota.findAll(o);case 7:return r=(r=t.sent)&&r.data&&r.data.length>0?r.data[0]:[],l={pageNum:1,pageSize:12,buildingid:s,starttime:a.start,endtime:a.end},t.next=12,a.$api.buildingData.findTimesMonthFlow(l);case 12:(d=(d=t.sent)&&d.data&&d.data.list&&d.data.list.length>0?d.data.list:[]).length>0&&e==i&&d.pop(),a.getSavingData(r,d);case 16:case"end":return t.stop()}},t,a)}))()},getSavingData:function(a,t){for(var i,e,n=void 0,s=void 0,o=void 0,r=void 0,l=void 0,d=[],u=[],c=[],v=[{name:"用量"},{name:"定额"},{name:"节水"}],f=0,b=0,p=0,g=0;g<=11;g++){var h=0;n="m"+(g+1),s=g+1+"",o=a&&a[n]?Number(a[n]).toFixed(0):0,g<t.length&&(h=Number(t[g].data).toFixed(0),b+=Number(h),f+=Number(o)),v[0][s]=0==h?"--":h,v[1][s]=o,p+=Number(o),r=o>0&&0!=h?o-h:0,l=o>0&&0!=h?o-h:"--",v[2][s]=l,d.push(o),u.push(h),c.push({value:r<0?-1*r:r,flag:r<0})}b=Number(b).toFixed(0),i=f>0&&0!=b?f-b:"--",e=f>0&&"number"==typeof i?(i/f*100).toFixed(1):"--",v[0].count=b,v[1].count=f,v[2].count=i,this.tableData=v,this.savingInf.currentQuota=p,this.savingInf.usage=b,this.savingInf.saving=i,this.savingInf.ratio=e,this.quota=d.map(function(a){return 0==a?null:a}),this.usage=u.map(function(a){return 0==a?null:a}),this.saving=c.map(function(a){return 0!=a.value?{value:a.value,flag:a.flag}:{value:null,flag:a.flag}}),this.show=!0},getBuildingPic:function(){var a=this;this.imageData=[];var t={buildingid:this.buildingId};this.$api.buildingPic.findById(t).then(function(t){null==t||""===t?a.imageData.push({id:"",image:""}):(t.forEach(function(a){a.image="data:image/jpg;base64,"+a.image}),a.imageData=t)})},change:function(a){this.buildingId=a.id,this.$refs.basicInfo.refreshBasic(this.buildingId),this.$refs.meterInfo.refreshWaterMeter(this.buildingId),this.$refs.flowInfo.initialize(this.buildingId),this.getBuildingPic(),this.dateRadio=1,this.getBasicData()},radioChange:function(a){this.dateRadio=a.radio;var t={starttime:a.starttime,endtime:a.endtime,buildingid:this.buildingId,pageNum:1,pageSize:1};if(1===a.type)this.$refs.flowInfo.daysFlow(t);else if(2===a.type)this.$refs.flowInfo.monthsFlow(t);else{var i={startyy:a.starttime,endyy:a.endtime,buildingid:this.buildingId,pageNum:1,pageSize:1};this.$refs.flowInfo.yearsFlow(i)}}}},y={render:function(){var a=this,t=a.$createElement,i=a._self._c||t;return i("div",{staticClass:"flex"},[i("div",{staticClass:"content body"},[i("div",{staticClass:"row first-row"},[i("div",{staticClass:"col-xs-3"},[i("div",{staticClass:"box box-solid basic"},[i("div",{staticClass:"box-header bg-aqua"},[a._v("\n            建筑基本信息\n          ")]),a._v(" "),i("div",{staticClass:"box-body"},[i("select-building",{attrs:{buildingId:a.buildingId},on:{change:a.change}}),a._v(" "),i("div",{staticClass:"basic-inf"},[i("basic-inf",{ref:"basicInfo"})],1)],1)])]),a._v(" "),i("div",{staticClass:"col-xs-9"},[i("div",{staticClass:"box box-solid meter"},[i("div",{staticClass:"box-header bg-aqua"},[a._v("\n            建筑一级监控水表\n          ")]),a._v(" "),i("div",{staticClass:"box-body"},[i("div",{staticClass:"meter-inf"},[i("meter-inf",{ref:"meterInfo"})],1)])])])]),a._v(" "),i("div",{staticClass:"row second-row"},[i("div",{staticClass:"col-xs-3"},[i("div",{staticClass:"water-index"},[i("div",{staticClass:"box box-solid"},[i("div",{staticClass:"box-header bg-aqua"},[a._v("\n              主要用水指标\n            ")]),a._v(" "),i("div",{staticClass:"box-body"},[i("div",{staticClass:"select-date"},[i("radio-group1",{attrs:{radioData:a.dateRadio},on:{radioChange:a.radioChange}})],1),a._v(" "),i("div",{staticClass:"index-data"},[i("water-index",{ref:"flowInfo"})],1)])])]),a._v(" "),i("div",{staticClass:"image"},[i("div",{staticClass:"box box-solid"},[i("div",{staticClass:"box-header bg-aqua"},[a._v("\n              建筑影像\n            ")]),a._v(" "),i("div",{staticClass:"box-body"},[i("el-carousel",{attrs:{"indicator-position":"inside",height:"100%"}},a._l(a.imageData,function(a){return i("el-carousel-item",{key:a.id},[i("img",{staticClass:"carousel_image_type",attrs:{src:a.image,alt:"暂无图片"}})])}),1)],1)])])]),a._v(" "),i("div",{staticClass:"col-xs-9"},[i("div",{staticClass:"box box-solid quota"},[i("div",{staticClass:"box-header bg-aqua"},[a._v("\n            节水概况与定额管理\n          ")]),a._v(" "),i("div",{directives:[{name:"loading",rawName:"v-loading",value:!a.show,expression:"!show"}],staticClass:"box-body"},[i("div",{staticClass:"quota-date"},[i("el-radio-group",{attrs:{size:"mini"},on:{change:a.changeYear},model:{value:a.quotaRadio,callback:function(t){a.quotaRadio=t},expression:"quotaRadio"}},[i("el-radio-button",{attrs:{label:"1"}},[a._v("今年")]),a._v(" "),i("el-radio-button",{attrs:{label:"2"}},[a._v("去年")])],1),a._v(" "),i("el-button",{attrs:{size:"mini",type:"success",icon:"el-icon-download"},on:{click:a.exportData}},[a._v("导出")])],1),a._v(" "),i("div",{staticClass:"quota-table"},[a.show?i("quota-table",{attrs:{tableData:a.tableData}}):a._e()],1),a._v(" "),i("div",{staticClass:"quota-chart"},[a.show?i("quota-chart",{attrs:{savingInf:a.savingInf,quota:a.quota,usage:a.usage,saving:a.saving}}):a._e()],1)])])])])])])},staticRenderFns:[]};var D=i("VU/8")(F,y,!1,function(a){i("KReo")},"data-v-4da90cbe",null);t.default=D.exports},pXeK:function(a,t){},vz6t:function(a,t){}});
//# sourceMappingURL=10.c90e938ba594925e67ce.js.map