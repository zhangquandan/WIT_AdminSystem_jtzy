webpackJsonp([5],{"7URT":function(a,t){},COhD:function(a,t){},GsXQ:function(a,t){},IqBM:function(a,t){},"JnQ/":function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={name:"top",data:function(){return{totalFlowOfYesterday:0,wuChangFlowOfYesterday:0,liuFangFlowOfYesterday:0,totalFlowOfCurrentMonth:0,wuChangFlowOfCurrentMonth:0,liuFangFlowOfCurrentMonth:0,totalFlowOfCurrentYear:0,wuChangFlowOfCurrentYear:0,liuFangFlowOfCurrentYear:0,totalAveragePerFlow:0,wuChangAveragePerFlow:0,liuFangAveragePerFlow:0,totalAverageAreaFlow:0,wuChangeAverageAreaFlow:0,liuFangAverageAreaFlow:0,totalWaterSavingRate:0,wuChangWaterSavingRate:0,liuFangWaterSavingRate:0,x1:0,x2:0,x3:0}},mounted:function(){this.daysFlow(),this.monthsFlow(),this.yearsFlow()},methods:{dateFtt:function(a){return(a=new Date(a)).getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate()},getTime:function(){var a=new Date,t=a.getTime(),e=this.dateFtt(t),i=a.getTime()-864e5,n=this.dateFtt(i),s=a.getMonth()+1,r="",o="";12===a.getMonth()?(r=d+1,o=1):(r=a.getFullYear(),o=a.getMonth()+2);var d=a.getFullYear();return{currentDay:e,lastDay:n,currentMonth:s,nextMonth:o,currentYear:d,nextYear:d+1,yearByMonth:r}},daysFlow:function(){var a=this,t=this.getTime(),e={pageNum:1,pageSize:1,waterregionid:1,starttime:t.lastDay,endtime:t.currentDay},i={pageNum:1,pageSize:1,waterregionid:2,starttime:t.lastDay,endtime:t.currentDay},n={pageNum:1,pageSize:1,waterregionid:3,starttime:t.lastDay,endtime:t.currentDay};this.$api.regionInf.findTotalFlowAnyDay(e).then(function(t){"ok"===t.msg?a.totalFlowOfYesterday=t.data.list[0].data.toFixed(1):a.totalFlowOfYesterday="--"}),this.$api.regionInf.findTotalFlowAnyDay(i).then(function(t){"ok"===t.msg?a.wuChangFlowOfYesterday=t.data.list[0].data.toFixed(1):a.wuChangFlowOfYesterday="--"}),this.$api.regionInf.findTotalFlowAnyDay(n).then(function(t){"ok"===t.msg?a.liuFangFlowOfYesterday=t.data.list[0].data.toFixed(1):a.liuFangFlowOfYesterday="--"})},monthsFlow:function(){var a=this,t=this.getTime(),e={pageNum:1,pageSize:1,waterregionid:1,starttime:t.yearByMonth+"-"+t.currentMonth,endtime:t.yearByMonth+"-"+t.nextMonth},i={pageNum:1,pageSize:1,waterregionid:2,starttime:t.yearByMonth+"-"+t.currentMonth,endtime:t.yearByMonth+"-"+t.nextMonth},n={pageNum:1,pageSize:1,waterregionid:3,starttime:t.yearByMonth+"-"+t.currentMonth,endtime:t.yearByMonth+"-"+t.nextMonth};this.$api.regionInf.findTotalFlowAnyMonth(e).then(function(t){"ok"===t.msg?a.totalFlowOfCurrentMonth=t.data.list[0].data.toFixed(1):a.totalFlowOfCurrentMonth="--"}),this.$api.regionInf.findTotalFlowAnyMonth(i).then(function(t){"ok"===t.msg?a.wuChangFlowOfCurrentMonth=t.data.list[0].data.toFixed(1):a.wuChangFlowOfCurrentMonth="--"}),this.$api.regionInf.findTotalFlowAnyMonth(n).then(function(t){"ok"===t.msg?a.liuFangFlowOfCurrentMonth=t.data.list[0].data.toFixed(1):a.liuFangFlowOfCurrentMonth="--"})},yearsFlow:function(){var a=this,t=this.getTime(),e={pageNum:1,pageSize:1,waterregionid:1,startyy:t.currentYear,endyy:t.currentYear},i={pageNum:1,pageSize:1,waterregionid:2,startyy:t.currentYear,endyy:t.currentYear},n={pageNum:1,pageSize:1,waterregionid:3,startyy:t.currentYear,endyy:t.currentYear},s={pageNum:1,pageSize:100},r={waterregionid:1,quotayear:t.currentYear},o={waterregionid:2,quotayear:t.currentYear},d={waterregionid:3,quotayear:t.currentYear},l=t.currentDay,v=Number(l.split("-")[1]),c=Number(l.split("-")[2]),g=(new Date).getFullYear()+"-"+((new Date).getMonth()+1),m=(new Date).getFullYear()+"-"+((new Date).getMonth()+2),u=30*(v-1)+c,h={pageNum:1,pageSize:1,waterregionid:1,starttime:g,endtime:m},f={pageNum:1,pageSize:1,waterregionid:2,starttime:g,endtime:m},x={pageNum:1,pageSize:1,waterregionid:3,starttime:g,endtime:m};this.$api.regionInf.findTotalFlowAnyYear(e).then(function(t){if("ok"===t.msg){var i=t.data.list[0].data;a.totalFlowOfCurrentYear=i.toFixed(1),a.$api.regionInf.findTotalFlowAnyMonth(h).then(function(t){"ok"==t.msg?a.x1=i-t.data.list[0].data:a.x1=i,a.$api.regionInf.findOne(e.waterregionid).then(function(t){a.totalAveragePerFlow=(i/t.population/u*1e3).toFixed(1),a.$api.stats.findAllPage(s).then(function(t){var e=t.list[2].value;a.totalAverageAreaFlow=(i/e/u*1e3).toFixed(1)}),a.$api.waterRegionQuota.findAll(r).then(function(t){switch(v){case 1:var e=t.data[0].m1;a.totalWaterSavingRate=(100*(1-a.x1/e)).toFixed(1);break;case 2:var i=t.data[0].m1;a.totalWaterSavingRate=(100*(1-a.x1/i)).toFixed(1);break;case 3:var n=t.data[0].m1+t.data[0].m2;a.totalWaterSavingRate=(100*(1-a.x1/n)).toFixed(1);break;case 4:var s=t.data[0].m1+t.data[0].m2+t.data[0].m3;a.totalWaterSavingRate=(100*(1-a.x1/s)).toFixed(1);break;case 5:var r=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4;a.totalWaterSavingRate=(100*(1-a.x1/r)).toFixed(1);break;case 6:var o=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4+t.data[0].m5;a.totalWaterSavingRate=(100*(1-a.x1/o)).toFixed(1);break;case 7:var d=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4+t.data[0].m5+t.data[0].m6;a.totalWaterSavingRate=(100*(1-a.x1/d)).toFixed(1);break;case 8:var l=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4+t.data[0].m5+t.data[0].m6+t.data[0].m7;a.totalWaterSavingRate=(100*(1-a.x1/l)).toFixed(1);break;case 9:var c=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4+t.data[0].m5+t.data[0].m6+t.data[0].m7+t.data[0].m8;a.totalWaterSavingRate=(100*(1-a.x1/c)).toFixed(1);break;case 10:var g=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4+t.data[0].m5+t.data[0].m6+t.data[0].m7+t.data[0].m8+t.data[0].m9;a.totalWaterSavingRate=(100*(1-a.x1/g)).toFixed(1);break;case 11:var m=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4+t.data[0].m5+t.data[0].m6+t.data[0].m7+t.data[0].m8+t.data[0].m9+t.data[0].m10;a.totalWaterSavingRate=(100*(1-a.x1/m)).toFixed(1);break;case 12:var u=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4+t.data[0].m5+t.data[0].m6+t.data[0].m7+t.data[0].m8+t.data[0].m9+t.data[0].m10+t.data[0].m11;a.totalWaterSavingRate=(100*(1-a.x1/u)).toFixed(1)}})})})}else a.totalFlowOfCurrentYear="--",a.totalAveragePerFlow="--",a.totalAverageAreaFlow="--",a.totalWaterSavingRate="--"}),this.$api.regionInf.findTotalFlowAnyYear(i).then(function(t){if("ok"===t.msg){var e=t.data.list[0].data;a.wuChangFlowOfCurrentYear=e.toFixed(1),a.$api.regionInf.findTotalFlowAnyMonth(f).then(function(t){"ok"==t.msg?a.x2=e-t.data.list[0].data:a.x2=e,a.$api.regionInf.findOne(i.waterregionid).then(function(t){a.wuChangAveragePerFlow=(e/t.population/u*1e3).toFixed(1),a.$api.stats.findAllPage(s).then(function(t){var i=t.list[16].value;a.wuChangeAverageAreaFlow=(e/i/u*1e3).toFixed(1)}),a.$api.waterRegionQuota.findAll(o).then(function(t){switch(v){case 1:var e=t.data[0].m1;a.wuChangWaterSavingRate=(100*(1-a.x2/e)).toFixed(1);break;case 2:var i=t.data[0].m1;a.wuChangWaterSavingRate=(100*(1-a.x2/i)).toFixed(1);break;case 3:var n=t.data[0].m1+t.data[0].m2;a.wuChangWaterSavingRate=(100*(1-a.x2/n)).toFixed(1);break;case 4:var s=t.data[0].m1+t.data[0].m2+t.data[0].m3;a.wuChangWaterSavingRate=(100*(1-a.x2/s)).toFixed(1);break;case 5:var r=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4;a.wuChangWaterSavingRate=(100*(1-a.x2/r)).toFixed(1);break;case 6:var o=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4+t.data[0].m5;a.wuChangWaterSavingRate=(100*(1-a.x2/o)).toFixed(1);break;case 7:var d=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4+t.data[0].m5+t.data[0].m6;a.wuChangWaterSavingRate=(100*(1-a.x2/d)).toFixed(1);break;case 8:var l=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4+t.data[0].m5+t.data[0].m6+t.data[0].m7;a.wuChangWaterSavingRate=(100*(1-a.x2/l)).toFixed(1);break;case 9:var c=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4+t.data[0].m5+t.data[0].m6+t.data[0].m7+t.data[0].m8;a.wuChangWaterSavingRate=(100*(1-a.x2/c)).toFixed(1);break;case 10:var g=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4+t.data[0].m5+t.data[0].m6+t.data[0].m7+t.data[0].m8+t.data[0].m9;a.wuChangWaterSavingRate=(100*(1-a.x2/g)).toFixed(1);break;case 11:var m=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4+t.data[0].m5+t.data[0].m6+t.data[0].m7+t.data[0].m8+t.data[0].m9+t.data[0].m10;a.wuChangWaterSavingRate=(100*(1-a.x2/m)).toFixed(1);break;case 12:var u=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4+t.data[0].m5+t.data[0].m6+t.data[0].m7+t.data[0].m8+t.data[0].m9+t.data[0].m10+t.data[0].m11;a.wuChangWaterSavingRate=(100*(1-a.x2/u)).toFixed(1)}})})})}else a.wuChangFlowOfCurrentYear="--",a.wuChangAveragePerFlow="--",a.wuChangeAverageAreaFlow="--",a.wuChangWaterSavingRate="--"}),this.$api.regionInf.findTotalFlowAnyYear(n).then(function(t){if("ok"===t.msg){var e=t.data.list[0].data;a.liuFangFlowOfCurrentYear=e.toFixed(1),a.$api.regionInf.findTotalFlowAnyMonth(x).then(function(t){"ok"==t.msg?a.x3=e-t.data.list[0].data:a.x3=e,a.$api.regionInf.findOne(n.waterregionid).then(function(t){a.liuFangAveragePerFlow=(e/t.population/u*1e3).toFixed(1),a.$api.stats.findAllPage(s).then(function(t){var i=t.list[20].value;a.liuFangAverageAreaFlow=(e/i/u*1e3).toFixed(1)}),a.$api.waterRegionQuota.findAll(d).then(function(t){switch(v){case 1:var e=t.data[0].m1;a.liuFangWaterSavingRate=(100*(1-a.x3/e)).toFixed(1);break;case 2:var i=t.data[0].m1;a.liuFangWaterSavingRate=(100*(1-a.x3/i)).toFixed(1);break;case 3:var n=t.data[0].m1+t.data[0].m2;a.liuFangWaterSavingRate=(100*(1-a.x3/n)).toFixed(1);break;case 4:var s=t.data[0].m1+t.data[0].m2+t.data[0].m3;a.liuFangWaterSavingRate=(100*(1-a.x3/s)).toFixed(1);break;case 5:var r=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4;a.liuFangWaterSavingRate=(100*(1-a.x3/r)).toFixed(1);break;case 6:var o=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4+t.data[0].m5;a.liuFangWaterSavingRate=(100*(1-a.x3/o)).toFixed(1);break;case 7:var d=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4+t.data[0].m5+t.data[0].m6;a.liuFangWaterSavingRate=(100*(1-a.x3/d)).toFixed(1);break;case 8:var l=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4+t.data[0].m5+t.data[0].m6+t.data[0].m7;a.liuFangWaterSavingRate=(100*(1-a.x3/l)).toFixed(1);break;case 9:var c=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4+t.data[0].m5+t.data[0].m6+t.data[0].m7+t.data[0].m8;a.liuFangWaterSavingRate=(100*(1-a.x3/c)).toFixed(1);break;case 10:var g=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4+t.data[0].m5+t.data[0].m6+t.data[0].m7+t.data[0].m8+t.data[0].m9;a.liuFangWaterSavingRate=(100*(1-a.x3/g)).toFixed(1);break;case 11:var m=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4+t.data[0].m5+t.data[0].m6+t.data[0].m7+t.data[0].m8+t.data[0].m9+t.data[0].m10;a.liuFangWaterSavingRate=(100*(1-a.x3/m)).toFixed(1);break;case 12:var u=t.data[0].m1+t.data[0].m2+t.data[0].m3+t.data[0].m4+t.data[0].m5+t.data[0].m6+t.data[0].m7+t.data[0].m8+t.data[0].m9+t.data[0].m10+t.data[0].m11;a.liuFangWaterSavingRate=(100*(1-a.x3/u)).toFixed(1)}})})})}else a.liuFangFlowOfCurrentYear="--",a.liuFangAveragePerFlow="--",a.liuFangAverageAreaFlow="--",a.liuFangWaterSavingRate="--"})}}},n={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-xs-2 top-left"},[e("div",{staticClass:"small-box bg-aqua"},[e("div",{staticClass:"first-box"},[e("span",{staticClass:"main-title"},[a._v(a._s(a.totalFlowOfYesterday)+"吨")])]),a._v(" "),e("div",{staticClass:"first-box-footer"},[a._v("昨日用水总量")])])]),a._v(" "),e("div",{staticClass:"col-xs-2 top-middle"},[e("div",{staticClass:"small-box bg-aqua"},[e("div",{staticClass:"second-box"},[e("span",{staticClass:"main-title"},[a._v(a._s(a.totalFlowOfCurrentMonth)+"吨")])]),a._v(" "),e("div",{staticClass:"second-box-footer"},[a._v("本月用水总量")])])]),a._v(" "),e("div",{staticClass:"col-xs-2 top-middle"},[e("div",{staticClass:"small-box bg-aqua"},[e("div",{staticClass:"third-box"},[e("span",{staticClass:"main-title"},[a._v(a._s(a.totalFlowOfCurrentYear)+"吨")])]),a._v(" "),e("div",{staticClass:"third-box-footer"},[a._v("本年用水总量")])])]),a._v(" "),e("div",{staticClass:"col-xs-2 top-middle"},[e("div",{staticClass:"small-box bg-aqua"},[e("div",{staticClass:"four-box"},[e("span",{staticClass:"main-title"},[a._v(a._s(a.totalAveragePerFlow)+"升/人.日")])]),a._v(" "),e("div",{staticClass:"four-box-footer"},[a._v("本年生均单耗")])])]),a._v(" "),e("div",{staticClass:"col-xs-2 top-middle"},[e("div",{staticClass:"small-box bg-aqua"},[e("div",{staticClass:"five-box"},[e("span",{staticClass:"main-title"},[a._v(a._s(a.totalAverageAreaFlow)+"升/平方米.日")])]),a._v(" "),e("div",{staticClass:"five-box-footer"},[a._v("本年建面单耗")])])]),a._v(" "),e("div",{staticClass:"col-xs-2 top-right"},[e("div",{staticClass:"small-box bg-aqua"},[e("div",{staticClass:"six-box"},[e("span",{staticClass:"main-title"},[a._v(a._s(a.totalWaterSavingRate)+"%")])]),a._v(" "),e("div",{staticClass:"six-box-footer"},[a._v("本年节水率")])])])])},staticRenderFns:[]};var s=e("VU/8")(i,n,!1,function(a){e("nCWn")},"data-v-33bdbb80",null).exports,r={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"box box-solid second-first"},[e("div",{staticClass:"box-header bg-aqua"},[a._v("学校基本信息")]),a._v(" "),e("div",{staticClass:"box-body"},[e("div",{staticClass:"basic-box"},[e("div",{staticClass:"basic-inf-name"},[a._v("占地面积")]),a._v(" "),e("div",{staticClass:"basic-inf"},[a._v(a._s(a.area)+"㎡")]),a._v(" "),e("div",{staticClass:"basic-inf-name"},[a._v("住校学生")]),a._v(" "),e("div",{staticClass:"basic-inf"},[a._v(a._s(a.student)+"人")])]),a._v(" "),e("div",{staticClass:"basic-box"},[e("div",{staticClass:"basic-inf-name"},[a._v("建筑面积")]),a._v(" "),e("div",{staticClass:"basic-inf"},[a._v(a._s(a.buildingsArea)+"㎡")]),a._v(" "),e("div",{staticClass:"basic-inf-name"},[a._v("本(专)科生")]),a._v(" "),e("div",{staticClass:"basic-inf"},[a._v(a._s(a.undergraduate)+"人")])]),a._v(" "),e("div",{staticClass:"basic-box"},[e("div",{staticClass:"basic-inf-name"},[a._v("教职工")]),a._v(" "),e("div",{staticClass:"basic-inf"},[a._v(a._s(a.teacher)+"人")]),a._v(" "),e("div",{staticClass:"basic-inf-name"},[a._v("硕士生")]),a._v(" "),e("div",{staticClass:"basic-inf"},[a._v(a._s(a.master)+"人")])]),a._v(" "),e("div",{staticClass:"basic-box"},[e("div",{staticClass:"basic-inf-name"},[a._v("住校职工")]),a._v(" "),e("div",{staticClass:"basic-inf"},[a._v(a._s(a.workers)+"人")]),a._v(" "),e("div",{staticClass:"basic-inf-name"},[a._v("博士生")]),a._v(" "),e("div",{staticClass:"basic-inf"},[a._v(a._s(a.doctor)+"人")])]),a._v(" "),e("div",{staticClass:"basic-box"},[e("div",{staticClass:"basic-inf-name"},[a._v("住校户数")]),a._v(" "),e("div",{staticClass:"basic-inf"},[a._v(a._s(a.household)+"户")]),a._v(" "),e("div",{staticClass:"basic-inf-name"},[a._v("留学生")]),a._v(" "),e("div",{staticClass:"basic-inf"},[a._v(a._s(a.overseas)+"人")])])])])},staticRenderFns:[]};var o=e("VU/8")({name:"center-left",data:function(){return{basicInf:[],area:"",student:"",buildingsArea:"",undergraduate:"",teacher:"",master:"",workers:"",doctor:"",household:"",overseas:""}},mounted:function(){this.refresh()},methods:{refresh:function(){var a=this;this.$api.stats.findAllPage({pageNum:1,pageSize:100}).then(function(t){a.area=t.list[0].value,a.student=t.list[9].value,a.buildingsArea=t.list[2].value,a.undergraduate=t.list[3].value+t.list[7].value,a.teacher=t.list[10].value,a.master=t.list[4].value,a.workers=t.list[11].value,a.doctor=t.list[5].value,a.household=t.list[12].value,a.overseas=t.list[6].value})}}},r,!1,function(a){e("hxT4")},"data-v-c4c9b9d8",null).exports,d=e("Xxa5"),l=e.n(d),v=e("exGp"),c=e.n(v),g={components:{SavingBarChartS:e("DQ4D").a},name:"center-right",data:function(){return{radio:"1",year:"",start:"",end:"",regionId:1,quota:[],usage:[],saving:[],show:!1,savingInf:{currentQuota:0,usage:0,saving:0,ratio:""}}},props:{time:{type:String}},watch:{time:{handler:function(a,t){this.year=a,this.getBasicData()}}},mounted:function(){var a=(new Date).getFullYear();this.year=a,this.start=a+"-01",this.end=Number(a)+1+"-01",this.getBasicData()},methods:{getBasicData:function(){var a=this;return c()(l.a.mark(function t(){var e,i,n,s,r,o,d;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a.show=!1,e=(new Date).getFullYear(),i=a.year,n=a.regionId,s={waterregionid:n,quotayear:i},t.next=7,a.$api.waterRegionQuota.findAll(s);case 7:return r=(r=t.sent)&&r.data&&r.data.length>0?r.data[0]:[],o={pageNum:1,pageSize:12,waterregionid:n,starttime:a.start,endtime:a.end},t.next=12,a.$api.regionData.findTimesMonthFlow(o);case 12:(d=(d=t.sent)&&d.data&&d.data.list&&d.data.list.length>0?d.data.list:[]).length>0&&i==e&&d.pop(),a.getSavingData(r,d);case 16:case"end":return t.stop()}},t,a)}))()},getSavingData:function(a,t){for(var e,i,n=void 0,s=void 0,r=void 0,o=[],d=[],l=[],v=0,c=0,g=0,m=0;m<=11;m++){var u=0;n="m"+(m+1),s=a&&a[n]?Number(a[n]):0,m<t.length&&(c+=u=Number(t[m].data),v+=s),g+=s,r=s>0&&0!=u?s-u:0,o.push(s),d.push(u),l.push({value:r<0?-1*r:r,flag:r<0})}c=Number(c.toFixed(0)),e=v>0&&0!=c?v-c:"--",i=v>0&&"number"==typeof e?(e/v*100).toFixed(1):"--",this.savingInf.currentQuota=g,this.savingInf.usage=c,this.savingInf.saving=e,this.savingInf.ratio=i,this.quota=o.map(function(a){return 0==a?null:a}),this.usage=d.map(function(a){return 0==a?null:a}),this.saving=l.map(function(a){return 0!=a.value?{value:a.value.toFixed(1),flag:a.flag}:{value:null,flag:a.flag}}),this.show=!0},change:function(){var a=(new Date).getFullYear();switch(this.radio){case"1":a=a;break;case"2":a-=1}this.year=a,this.start=a+"-01",this.end=Number(a)+1+"-01",this.getBasicData()}}},m={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"box box-solid second-second"},[e("div",{staticClass:"box-header bg-aqua"},[a._v("节水概况与定额管理")]),a._v(" "),e("div",{staticClass:"box-body"},[e("el-radio-group",{staticClass:"select-year",attrs:{size:"mini",type:"primary"},on:{change:a.change},model:{value:a.radio,callback:function(t){a.radio=t},expression:"radio"}},[e("el-radio-button",{attrs:{label:"1"}},[a._v("今年")]),a._v(" "),e("el-radio-button",{attrs:{label:"2"}},[a._v("去年")])],1),a._v(" "),e("div",{directives:[{name:"loading",rawName:"v-loading",value:!a.show,expression:"!show"}],staticClass:"saving-inf"},[e("div",{staticClass:"saving-survey"},[a.show?e("saving-bar-chart-s",{attrs:{quota:a.quota,usage:a.usage,saving:a.saving}}):a._e()],1),a._v(" "),e("div",{staticClass:"saving-basic"},[e("div",{staticClass:"saving-basic-inf"},[e("span",[a._v(a._s(a.savingInf.currentQuota)+"吨")]),e("span",[a._v("当年定额")])]),a._v(" "),e("div",{staticClass:"saving-basic-inf"},[e("span",[a._v(a._s(a.savingInf.usage)+"吨")]),e("span",[a._v("已用累计")])]),a._v(" "),e("div",{staticClass:"saving-basic-inf"},[e("span",[a._v(a._s("--"==a.savingInf.saving?"--":a.savingInf.saving+"吨"))]),e("span",[a._v("已用节水")])]),a._v(" "),e("div",{staticClass:"saving-basic-inf"},[e("span",[a._v(a._s("--"==a.savingInf.ratio?"--":a.savingInf.ratio+"%"))]),e("span",[a._v("已用节水率")])])])])],1)])},staticRenderFns:[]};var u=e("VU/8")(g,m,!1,function(a){e("GsXQ")},"data-v-d3c399c0",null).exports,h=e("sE1n");e("XLwt"),e("cyXY");e("cyXY");var f={components:{"v-chart":h.a},name:"pie-chart-s",data:function(){return{waterMeterSum:0,onlineSum:0,offlineSum:0,polar:{title:{text:"",x:"center",textStyle:{fontStyle:"bolder"}},toolbox:{show:!0,right:30,top:"10px"},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},graphic:[{type:"text",left:"center",top:"45%",style:{text:"水表总数\n",textAlign:"center",fill:"#007CDE",width:30,height:30,fontSize:25,fontWeight:"bolder",fontFamily:"Microsoft YaHei"}}],grid:{left:"10%",right:"4%",bottom:"7%",containLabel:!0},legend:{show:!0,orient:"vertical",left:"10px",top:"10px"},series:[{name:"用水量(吨)",type:"pie",radius:["50%","70%"],center:["50%","50%"],data:[{value:0,name:"在线"},{value:0,name:"离线"}],label:{normal:{textStyle:{fontSize:16},formatter:function(a,t,e){return a.name+"\n"+a.value+"只\n"+a.percent.toFixed(1)+"%"}}},itemStyle:{normal:{color:function(a){return["#0ADA0A","#F9DC36"][a.dataIndex]}}}}]}}},props:{toHeight:{type:String,default:"100%"},toWidth:{type:String,default:"100%"},titleName:{type:String},titleData:{type:Array},chartData:{type:Array}},mounted:function(){this.polar.graphic[0].style.text="水表总数\n"+this.$parent.total,this.polar.series[0].data[0].value=this.$parent.onLine,this.polar.series[0].data[1].value=this.$parent.offLine}},x={render:function(){var a=this.$createElement,t=this._self._c||a;return t("div",{staticStyle:{height:"100%",width:"100%","text-align":"center"}},[t("v-chart",{style:{height:this.toHeight,width:this.toWidth},attrs:{theme:"infographic",options:this.polar}})],1)},staticRenderFns:[]};var p={components:{PieChartS:e("VU/8")(f,x,!1,function(a){e("IqBM")},"data-v-6171c4bc",null).exports},name:"bottom-left",data:function(){return{total:0,onLine:0,onLineRate:0,offLine:0,offLineRate:0,show:!1}},mounted:function(){this.getOnlineRate()},methods:{getOnlineRate:function(){var a=this,t={name:"",value:""};this.$api.waterMeterInf.searchWaterMeter({name:"isonline",value:1}).then(function(e){var i=e.data.total;a.onLine=i,a.$api.waterMeterInf.searchWaterMeter(t).then(function(t){var e=t.data.total;a.total=e,a.offLine=e-a.onLine,a.onLineRate=(i/e*100).toFixed(1),a.offLineRate=((e-i)/e*100).toFixed(1),a.show=!0})})}}},_={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"box box-solid third-first"},[e("div",{staticClass:"box-header bg-aqua"},[a._v("监控水表运行概况")]),a._v(" "),e("div",{staticClass:"box-body"},[e("div",{staticClass:"meter-left"},[a.show?e("pie-chart-s"):a._e()],1),a._v(" "),e("div",{staticClass:"meter-right"},[e("div",{staticClass:"meter-right-inf"},[a._m(0),a._v(" "),a._m(1),a._v(" "),e("div",[a._v(a._s(a.onLine)+"只")]),a._v(" "),a._m(2),a._v(" "),a._m(3),a._v(" "),e("div",[a._v(a._s(a.onLineRate)+"%")]),a._v(" "),a._m(4),a._v(" "),a._m(5),a._v(" "),e("div",[a._v(a._s(a.offLine)+"只")]),a._v(" "),a._m(6),a._v(" "),a._m(7),a._v(" "),e("div",[a._v(a._s(a.offLineRate)+"%")])])])])])},staticRenderFns:[function(){var a=this.$createElement,t=this._self._c||a;return t("div",[t("div")])},function(){var a=this.$createElement,t=this._self._c||a;return t("div",[t("div",[this._v("在线水表")])])},function(){var a=this.$createElement,t=this._self._c||a;return t("div",[t("div")])},function(){var a=this.$createElement,t=this._self._c||a;return t("div",[t("div",[this._v("在线率")])])},function(){var a=this.$createElement,t=this._self._c||a;return t("div",[t("div")])},function(){var a=this.$createElement,t=this._self._c||a;return t("div",[t("div",[this._v("离线水表")])])},function(){var a=this.$createElement,t=this._self._c||a;return t("div",[t("div")])},function(){var a=this.$createElement,t=this._self._c||a;return t("div",[t("div",[this._v("离线率")])])}]};var w=e("VU/8")(p,_,!1,function(a){e("kx7/")},"data-v-eb3529f6",null).exports,F=e("pFYg"),b=e.n(F),C={components:{BarChartS:e("zQgQ").a},name:"bottom-right",data:function(){return{xData:[],yData:[],regionId:1,leakageData:{},show:!1,title:""}},mounted:function(){this.getHourFlow(),this.getLeakageIndex()},methods:{getHourFlow:function(){var a=this,t=void 0,e=[],i=[],n=new Date((new Date).getTime()-864e5);n=new Date(n.getFullYear(),n.getMonth(),n.getDate(),24);var s=new Date(n.getTime()-2592e5),r=n.getFullYear(),o=n.getMonth()+1;o=o<10?"0"+o:o;var d=n.getDate();d=d<10?"0"+d:d;var l=n.getHours();n=r+"-"+o+"-"+d+" "+(l=l<10?"0"+l:l),s=(r=s.getFullYear())+"-"+(o=(o=s.getMonth()+1)<10?"0"+o:o)+"-"+(d=(d=s.getDate())<10?"0"+d:d)+" "+(l=(l=s.getHours())<10?"0"+l:l);var v={pageNum:1,pageSize:1e3,waterregionid:this.regionId,starttime:s,endtime:n};this.$api.regionData.findTimesHourFlow(v).then(function(n){"object"==(void 0===(t=n.data&&n.data.list&&n.data.list.length>0?n.data.list:[])?"undefined":b()(t))&&t.length>0&&(t.forEach(function(a){e.push(a.time),i.push({value:a.data<0?-1*a.data:a.data,flag:a.data<0})}),a.xData=e,a.yData=i,a.title=t[0].time+"至"+t[t.length-1].time+"水量图表",a.show=!0)})},getLeakageIndex:function(){var a=this,t=void 0,e=new Date((new Date).getTime()-864e5),i=e.getFullYear(),n=e.getMonth()+1;n=n<10?"0"+n:n;var s=e.getDate();s=s<10?"0"+s:s;var r={waterregionid:this.regionId,time:i+"-"+n+"-"+s};this.$api.regionData.findLeakageIndex(r).then(function(e){t=e&&e.data?e.data:{},a.leakageData=t})}}},y={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"box box-solid third-second"},[e("div",{directives:[{name:"loading",rawName:"v-loading",value:!a.show,expression:"!show"}],staticClass:"box-body"},[e("div",{staticClass:"using-survey"},[a.show?e("bar-chart-s",{attrs:{title:a.title,xData:a.xData,yData:a.yData}}):a._e()],1),a._v(" "),e("div",{staticClass:"using-basic"},[e("div",{staticClass:"using-basic-inf"},[e("span",[a._v(a._s("object"==typeof a.leakageData&&a.leakageData.addTotal?a.leakageData.addTotal+"吨":"--"))]),a._v(" "),e("span",[a._v("当日周同比增量")])]),a._v(" "),e("div",{staticClass:"using-basic-inf"},[e("span",[a._v(a._s("object"==typeof a.leakageData&&a.leakageData.addRangeTotal?a.leakageData.addRangeTotal:"--"))]),a._v(" "),e("span",[a._v("当日周同比增幅")])]),a._v(" "),e("div",{staticClass:"using-basic-inf"},[e("span",[a._v(a._s("object"==typeof a.leakageData&&a.leakageData.addMin?a.leakageData.addMin+"吨":"--"))]),a._v(" "),e("span",[a._v("当日周同比最小量增量")])]),a._v(" "),e("div",{staticClass:"using-basic-inf"},[e("span",[a._v(a._s("object"==typeof a.leakageData&&a.leakageData.addRangeMin?a.leakageData.addRangeMin:"--"))]),a._v(" "),e("span",[a._v("当日周同比最小量增幅")])])])])])},staticRenderFns:[]};var S={components:{BottomRight:e("VU/8")(C,y,!1,function(a){e("COhD")},"data-v-e6ae0f02",null).exports,BottomLeft:w,CenterRight:u,CenterLeft:o,Top:s},name:"water-survey",data:function(){return{}},mounted:function(){},methods:{}},D={render:function(){var a=this.$createElement,t=this._self._c||a;return t("div",{staticClass:"flex"},[t("div",{staticClass:"content body"},[t("top"),this._v(" "),t("div",{staticClass:"surplus"},[t("div",{staticClass:"surplus-top"},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-xs-5"},[t("center-left")],1),this._v(" "),t("div",{staticClass:"col-xs-7"},[t("center-right")],1)])]),this._v(" "),t("div",{staticClass:"surplus-bottom"},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-xs-5"},[t("bottom-left")],1),this._v(" "),t("div",{staticClass:"col-xs-7"},[t("bottom-right")],1)])])])],1)])},staticRenderFns:[]};var R=e("VU/8")(S,D,!1,function(a){e("xv/f")},"data-v-3eb3c08b",null);t.default=R.exports},hxT4:function(a,t){},"kx7/":function(a,t){},nCWn:function(a,t){},"xv/f":function(a,t){},zQgQ:function(a,t,e){"use strict";var i=e("sE1n");e("XLwt"),e("SwK5");e("jjRC");var n={components:{"v-chart":i.a},name:"bar-chart-s",mounted:function(){this.orgOptions.title.text=this.title,this.orgOptions.xAxis.name=this.typeName,this.orgOptions.xAxis.data=this.xData,this.orgOptions.series[0].data=this.yData},data:function(){return{orgOptions:{title:{text:"",x:"center",textStyle:{fontStyle:"bolder"}},xAxis:{name:"时",type:"category",data:[]},grid:{left:"2%",right:"3%",bottom:"3%",containLabel:!0},legend:{data:[""]},tooltip:{trigger:"axis"},yAxis:{name:"吨",type:"value"},toolbox:{show:!0,right:30,feature:{magicType:{type:["line","bar"]},saveAsImage:{}}},series:[{data:[],type:"bar",name:"用水量(吨)",smooth:!0,itemStyle:{normal:{color:function(a){var t=["#5B9BD5","#92D03C","#DC143C","#ADFF2F"],e=void 0,i=void 0,n=void 0,s=void 0;if(4==a.name.length)e=a.dataIndex%2==0;else if(7==a.name.length)e=Number(a.name.split("-")[0])%2==0;else if(10==a.name.length)e=Number(a.name.split("-")[1])%2==0;else{i=Number(a.name.split(" ")[0].split("-")[2]),n=Number(a.name.split(" ")[0].split("-")[1]),e=i%2==0;s=Number(a.name.split(" ")[0].split("-")[0])%4==0?[1,2,3,5,7,8,10,12].indexOf(n)>-1&&(2==n&&29==i||31==i):[1,3,5,7,8,10,12].indexOf(n)>-1&&31==i}return!e||a.data.flag||s?a.data.flag&&!s?t[2]:s?t[3]:t[1]:t[0]}}}}]}}},props:{toHeight:{type:String,default:"100%"},toWidth:{type:String,default:"100%"},xData:{type:Array},yData:{type:Array},typeName:{type:String,default:"时"},title:{type:String},yName:{type:String,default:"吨"},xRotate:{type:Number},color:{type:String}},watch:{title:{handler:function(a,t){this.orgOptions.title.text=a}},typeName:{handler:function(a,t){this.orgOptions.xAxis.name=a},deep:!0},xData:{handler:function(a,t){this.orgOptions.xAxis.data=a},deep:!0},yData:{handler:function(a,t){this.orgOptions.series[0].data=a},deep:!0},yName:{handler:function(a,t){this.orgOptions.yAxis.name=a}}}},s={render:function(){var a=this.$createElement,t=this._self._c||a;return t("div",{staticStyle:{height:"100%"}},[t("v-chart",{style:{height:this.toHeight,width:this.toWidth},attrs:{theme:"shine",options:this.orgOptions}})],1)},staticRenderFns:[]};var r=e("VU/8")(n,s,!1,function(a){e("7URT")},"data-v-033483f8",null);t.a=r.exports}});
//# sourceMappingURL=5.f37aa8181afdb5a766c8.js.map