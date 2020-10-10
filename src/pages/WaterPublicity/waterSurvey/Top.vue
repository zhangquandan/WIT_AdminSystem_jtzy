<template>
    <div class="row">
      <div class="col-xs-2 top-left">
        <div class="small-box bg-aqua">
          <div class="first-box">
            <span class="main-title">{{totalFlowOfYesterday}}吨</span>
          </div>
          <div class="first-box-footer">昨日用水总量</div>
        </div>
      </div>
      <div class="col-xs-2 top-middle">
        <div class="small-box bg-aqua">
          <div class="second-box">
            <span class="main-title">{{totalFlowOfCurrentMonth}}吨</span>
          </div>
          <div class="second-box-footer">本月用水总量</div>
        </div>
      </div>
      <div class="col-xs-2 top-middle">
        <div class="small-box bg-aqua">
          <div class="third-box">
            <span class="main-title">{{totalFlowOfCurrentYear}}吨</span>
          </div>
          <div class="third-box-footer">本年用水总量</div>
        </div>
      </div>
      <div class="col-xs-2 top-middle">
        <div class="small-box bg-aqua">
          <div class="four-box">
            <span class="main-title">{{totalAveragePerFlow}}升/人.日</span>
          </div>
          <div class="four-box-footer">本年生均单耗</div>
        </div>
      </div>
      <div class="col-xs-2 top-middle">
        <div class="small-box bg-aqua">
          <div class="five-box">
            <span class="main-title">{{totalAverageAreaFlow}}升/平方米.日</span>
          </div>
          <div class="five-box-footer">本年建面单耗</div>
        </div>
      </div>
      <div class="col-xs-2 top-right">
        <div class="small-box bg-aqua">
          <div class="six-box">
            <span class="main-title">{{totalWaterSavingRate}}%</span>
          </div>
          <div class="six-box-footer">本年节水率</div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "top",
      data() {
        return {
          totalFlowOfYesterday: 0,//总体昨日总用水量
          wuChangFlowOfYesterday: 0,//武昌昨日总用水量
          liuFangFlowOfYesterday: 0,//流芳昨日总用水量
          totalFlowOfCurrentMonth: 0,//总体本月总用水量
          wuChangFlowOfCurrentMonth: 0,//武昌本月总用水量
          liuFangFlowOfCurrentMonth: 0,//流芳本月总用水量
          totalFlowOfCurrentYear: 0,//总体今年总用水量
          wuChangFlowOfCurrentYear: 0,//武昌今年总用水量
          liuFangFlowOfCurrentYear: 0,//流芳今年总用水量
          totalAveragePerFlow: 0,//总体今年生均单耗
          wuChangAveragePerFlow: 0,//武昌今年生均单耗
          liuFangAveragePerFlow:0,//流芳今年生均单耗
          totalAverageAreaFlow: 0,//总体今年建面单耗
          wuChangeAverageAreaFlow: 0,//武昌今年建面单耗
          liuFangAverageAreaFlow: 0,//流芳今年建面单耗
          totalWaterSavingRate: 0,//总体今年节水率
          wuChangWaterSavingRate: 0,//武昌今年节水率
          liuFangWaterSavingRate: 0,//流芳今年节水率
          x1: 0,//全校区中间值
          x2: 0,//武昌校区中间值
          x3: 0,//流芳校区中间值
        }
      },
      mounted(){
        this.daysFlow();
        this.monthsFlow();
        this.yearsFlow();
      },
      methods: {
        dateFtt(date){
          date = new Date(date);
          return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        },
        getTime(){
          let date = new Date();
          /*今日*/
          let todayDate = date.getTime();
          let currentDay = this.dateFtt(todayDate);
          /*昨日*/
          let yesterdayDate = date.getTime()-24*3600*1000;
          let lastDay = this.dateFtt(yesterdayDate);
          /*本月*/
          let currentMonth = date.getMonth()+1;
          /*下月*/
          let yearByMonth = '';
          let nextMonth = '';
          if(date.getMonth() === 12){
            yearByMonth = currentYear + 1;
            nextMonth = 1 ;
          }else{
            yearByMonth = date.getFullYear() ;
            nextMonth = date.getMonth() + 2 ;
          }
          /*今年*/
          let currentYear = date.getFullYear();
          /*明年*/
          let nextYear = currentYear + 1 ;
          let dateTime = [] ;
          dateTime ={
            currentDay : currentDay,
            lastDay : lastDay,
            currentMonth : currentMonth,
            nextMonth : nextMonth,
            currentYear : currentYear,
            nextYear : nextYear,
            yearByMonth : yearByMonth,
          };
          return dateTime ;
        },
        daysFlow(){
          let dateTime = this.getTime();
          let param1 = {
            pageNum : 1 ,
            pageSize : 1 ,
            waterregionid : 1 ,
            starttime : dateTime.lastDay ,
            endtime : dateTime.currentDay ,
          };
          let param2 = {
            pageNum : 1 ,
            pageSize : 1 ,
            waterregionid : 2 ,
            starttime : dateTime.lastDay ,
            endtime : dateTime.currentDay ,
          };
          let param3 = {
            pageNum : 1 ,
            pageSize : 1 ,
            waterregionid : 3 ,
            starttime : dateTime.lastDay ,
            endtime : dateTime.currentDay ,
          };
          this.$api.regionInf.findTotalFlowAnyDay(param1).then(res => {
            if (res.msg === 'ok'){
              this.totalFlowOfYesterday = res.data.list[0].data.toFixed(1);
            }else{
              this.totalFlowOfYesterday = '--' ;
            }
          });
          this.$api.regionInf.findTotalFlowAnyDay(param2).then(res => {
            if (res.msg === 'ok'){
              this.wuChangFlowOfYesterday = res.data.list[0].data.toFixed(1);
            }else{
              this.wuChangFlowOfYesterday = '--' ;
            }
          });
          this.$api.regionInf.findTotalFlowAnyDay(param3).then(res => {
            if (res.msg === 'ok'){
              this.liuFangFlowOfYesterday = res.data.list[0].data.toFixed(1);
            }else{
              this.liuFangFlowOfYesterday = '--' ;
            }
          })
        },
        monthsFlow(){
          let dateTime = this.getTime();
          let param1 = {
            pageNum : 1 ,
            pageSize : 1 ,
            waterregionid : 1 ,
            starttime : dateTime.yearByMonth + '-' + dateTime.currentMonth ,
            endtime : dateTime.yearByMonth + '-' + dateTime.nextMonth ,
          };
          let param2 = {
            pageNum : 1 ,
            pageSize : 1 ,
            waterregionid : 2 ,
            starttime : dateTime.yearByMonth + '-' + dateTime.currentMonth ,
            endtime : dateTime.yearByMonth + '-' + dateTime.nextMonth ,
          };
          let param3 = {
            pageNum : 1 ,
            pageSize : 1 ,
            waterregionid : 3 ,
            starttime : dateTime.yearByMonth + '-' + dateTime.currentMonth ,
            endtime : dateTime.yearByMonth + '-' + dateTime.nextMonth ,
          };
          this.$api.regionInf.findTotalFlowAnyMonth(param1).then(res => {
            if (res.msg === 'ok'){
              this.totalFlowOfCurrentMonth = res.data.list[0].data.toFixed(1);
            }else{
              this.totalFlowOfCurrentMonth = '--' ;
            }
          });
          this.$api.regionInf.findTotalFlowAnyMonth(param2).then(res => {
            if (res.msg === 'ok'){
              this.wuChangFlowOfCurrentMonth = res.data.list[0].data.toFixed(1);
            }else{
              this.wuChangFlowOfCurrentMonth = '--' ;
            }
          });
          this.$api.regionInf.findTotalFlowAnyMonth(param3).then(res => {
            if (res.msg === 'ok'){
              this.liuFangFlowOfCurrentMonth = res.data.list[0].data.toFixed(1);
            }else{
              this.liuFangFlowOfCurrentMonth = '--' ;
            }
          })
        },
        yearsFlow: function () {
          let dateTime = this.getTime();
          let param1 = {
            pageNum: 1,
            pageSize: 1,
            waterregionid: 1,
            startyy: dateTime.currentYear,
            endyy: dateTime.currentYear,
          };
          let param2 = {
            pageNum: 1,
            pageSize: 1,
            waterregionid: 2,
            startyy: dateTime.currentYear,
            endyy: dateTime.currentYear,
          };
          let param3 = {
            pageNum: 1,
            pageSize: 1,
            waterregionid: 3,
            startyy: dateTime.currentYear,
            endyy: dateTime.currentYear,
          };
          let param4 = {
            pageNum: 1,
            pageSize: 100,
          };
          let param5 = {
            waterregionid: 1,
            quotayear: dateTime.currentYear,
          };
          let param6 = {
            waterregionid: 2,
            quotayear: dateTime.currentYear,
          };
          let param7 = {
            waterregionid: 3,
            quotayear: dateTime.currentYear,
          };
          let a = dateTime.currentDay;
          let b = Number(a.split('-')[1]);
          let c = Number(a.split('-')[2]);
          let d = new Date().getFullYear()+'-'+(new Date().getMonth()+1);
          let e = new Date().getFullYear()+'-'+(new Date().getMonth()+2);
          let days = ((b-1) * 30) + c;
          let param8 = {
            pageNum : 1 ,
            pageSize : 1 ,
            waterregionid : 1 ,
            starttime : d ,
            endtime : e ,
          };
          let param9 = {
            pageNum : 1 ,
            pageSize : 1 ,
            waterregionid : 2 ,
            starttime : d ,
            endtime : e ,
          };
          let param10 = {
            pageNum : 1 ,
            pageSize : 1 ,
            waterregionid : 3 ,
            starttime : d ,
            endtime : e ,
          };
          this.$api.regionInf.findTotalFlowAnyYear(param1).then(res => {
            if (res.msg === 'ok') {
              let temp = res.data.list[0].data;
              this.totalFlowOfCurrentYear = temp.toFixed(1) ;
              this.$api.regionInf.findTotalFlowAnyMonth(param8).then(res0 => {
                if(res0.msg == 'ok'){
                  this.x1 = temp - res0.data.list[0].data ;
                }else{
                  this.x1 = temp ;
                }
                this.$api.regionInf.findOne(param1.waterregionid).then(res1 => {
                this.totalAveragePerFlow = (temp / res1.population / days * 1000).toFixed(1);
                this.$api.stats.findAllPage(param4).then(res2 => {
                  let totalArea = res2.list[2].value;
                  this.totalAverageAreaFlow = (temp / totalArea / days * 1000).toFixed(1);
                });
                this.$api.waterRegionQuota.findAll(param5).then(res3 => {
                  switch (b) {
                      case 1 :
                        let quota1 = res3.data[0].m1;
                        this.totalWaterSavingRate = ((1 - this.x1 / quota1) * 100).toFixed(1);
                        break;
                      case 2 :
                        let quota2 = (res3.data[0].m1);
                        this.totalWaterSavingRate = ((1 - this.x1 / quota2) * 100).toFixed(1);
                        break;
                      case 3 :
                        let quota3 = (res3.data[0].m1 + res3.data[0].m2);
                        this.totalWaterSavingRate = ((1 - this.x1 / quota3) * 100).toFixed(1);
                        break;
                      case 4 :
                        let quota4 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3);
                        this.totalWaterSavingRate = ((1 - this.x1 / quota4) * 100).toFixed(1);
                        break;
                      case 5 :
                        let quota5 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4);
                        this.totalWaterSavingRate = ((1 - this.x1 / quota5) * 100).toFixed(1);
                        break;
                      case 6 :
                        let quota6 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 + res3.data[0].m5);
                        this.totalWaterSavingRate = ((1 - this.x1 / quota6) * 100).toFixed(1);
                        break;
                      case 7 :
                        let quota7 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 + res3.data[0].m5 + res3.data[0].m6);
                        this.totalWaterSavingRate = ((1 - this.x1 / quota7) * 100).toFixed(1);
                        break;
                      case 8 :
                        let quota8 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 + res3.data[0].m5 + res3.data[0].m6
                          + res3.data[0].m7);
                        this.totalWaterSavingRate = ((1 - this.x1 / quota8) * 100).toFixed(1);
                        break;
                      case 9 :
                        let quota9 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 + res3.data[0].m5 + res3.data[0].m6
                          + res3.data[0].m7 + res3.data[0].m8);
                        this.totalWaterSavingRate = ((1 - this.x1 / quota9) * 100).toFixed(1);
                        break;
                      case 10 :
                        let quota10 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 + res3.data[0].m5 + res3.data[0].m6
                          + res3.data[0].m7 + res3.data[0].m8 + res3.data[0].m9);
                        this.totalWaterSavingRate = ((1 - this.x1 / quota10) * 100).toFixed(1);
                        break;
                      case 11 :
                        let quota11 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 + res3.data[0].m5 + res3.data[0].m6
                          + res3.data[0].m7 + res3.data[0].m8 + res3.data[0].m9 + res3.data[0].m10);
                        this.totalWaterSavingRate = ((1 - this.x1 / quota11) * 100).toFixed(1);
                        break;
                      case 12 :
                        let quota12 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 + res3.data[0].m5 + res3.data[0].m6
                          + res3.data[0].m7 + res3.data[0].m8 + res3.data[0].m9 + res3.data[0].m10 + res3.data[0].m11);
                        this.totalWaterSavingRate = ((1 - this.x1 / quota12) * 100).toFixed(1);
                        break;
                    }
                })
              });
              });
            } else {
              this.totalFlowOfCurrentYear = '--' ;
              this.totalAveragePerFlow = '--' ;
              this.totalAverageAreaFlow = '--' ;
              this.totalWaterSavingRate = '--' ;
            }
          });
          this.$api.regionInf.findTotalFlowAnyYear(param2).then(res => {
            if (res.msg === 'ok') {
              let temp = res.data.list[0].data;
              this.wuChangFlowOfCurrentYear = temp.toFixed(1);
              this.$api.regionInf.findTotalFlowAnyMonth(param9).then(res0 => {
                if(res0.msg == 'ok'){
                  this.x2 = temp - res0.data.list[0].data ;
                }else{
                  this.x2 = temp ;
                }
                this.$api.regionInf.findOne(param2.waterregionid).then(res1 => {
                  this.wuChangAveragePerFlow = (temp / res1.population / days * 1000).toFixed(1);
                  this.$api.stats.findAllPage(param4).then(res2 => {
                    let wuArea = res2.list[16].value;
                    this.wuChangeAverageAreaFlow = ((temp / wuArea) / days * 1000).toFixed(1);
                  });
                  this.$api.waterRegionQuota.findAll(param6).then(res3 => {
                    switch (b) {
                      case 1 :
                        let quota1 = res3.data[0].m1;
                        this.wuChangWaterSavingRate = ((1 - this.x2 / quota1) * 100).toFixed(1);
                        break;
                      case 2 :
                        let quota2 = (res3.data[0].m1);
                        this.wuChangWaterSavingRate = ((1 - this.x2 / quota2) * 100).toFixed(1);
                        break;
                      case 3 :
                        let quota3 = (res3.data[0].m1 + res3.data[0].m2);
                        this.wuChangWaterSavingRate = ((1 - this.x2 / quota3) * 100).toFixed(1);
                        break;
                      case 4 :
                        let quota4 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3);
                        this.wuChangWaterSavingRate = ((1 - this.x2 / quota4) * 100).toFixed(1);
                        break;
                      case 5 :
                        let quota5 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4);
                        this.wuChangWaterSavingRate = ((1- this.x2 / quota5) * 100).toFixed(1);
                        break;
                      case 6 :
                        let quota6 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 + res3.data[0].m5);
                        this.wuChangWaterSavingRate = ((1 - this.x2 / quota6) * 100).toFixed(1);
                        break;
                      case 7 :
                        let quota7 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 + res3.data[0].m5 + res3.data[0].m6);
                        this.wuChangWaterSavingRate = ((1 - this.x2 / quota7) * 100).toFixed(1);
                        break;
                      case 8 :
                        let quota8 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 + res3.data[0].m5 + res3.data[0].m6
                          + res3.data[0].m7);
                        this.wuChangWaterSavingRate = ((1 - this.x2 / quota8) * 100).toFixed(1);
                        break;
                      case 9 :
                        let quota9 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 + res3.data[0].m5 + res3.data[0].m6
                          + res3.data[0].m7 + res3.data[0].m8 );
                        this.wuChangWaterSavingRate = ((1 - this.x2 / quota9) * 100).toFixed(1);
                        break;
                      case 10 :
                        let quota10 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 + res3.data[0].m5 + res3.data[0].m6
                          + res3.data[0].m7 + res3.data[0].m8 + res3.data[0].m9 );
                        this.wuChangWaterSavingRate = ((1 - this.x2 / quota10) * 100).toFixed(1);
                        break;
                      case 11 :
                        let quota11 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 + res3.data[0].m5 + res3.data[0].m6
                          + res3.data[0].m7 + res3.data[0].m8 + res3.data[0].m9 + res3.data[0].m10 );
                        this.wuChangWaterSavingRate = ((1 - this.x2 / quota11) * 100).toFixed(1);
                        break;
                      case 12 :
                        let quota12 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 + res3.data[0].m5 + res3.data[0].m6
                          + res3.data[0].m7 + res3.data[0].m8 + res3.data[0].m9 + res3.data[0].m10 + res3.data[0].m11 );
                        this.wuChangWaterSavingRate = ((1 - this.x2 / quota12) * 100).toFixed(1);
                        break;
                    }
                  })
                });
              });
            } else {
              this.wuChangFlowOfCurrentYear = '--' ;
              this.wuChangAveragePerFlow = '--' ;
              this.wuChangeAverageAreaFlow = '--' ;
              this.wuChangWaterSavingRate = '--' ;
            }
          });
          this.$api.regionInf.findTotalFlowAnyYear(param3).then(res => {
            if (res.msg === 'ok') {
              let temp = res.data.list[0].data;
              this.liuFangFlowOfCurrentYear = temp.toFixed(1);
              this.$api.regionInf.findTotalFlowAnyMonth(param10).then(res0 => {
                if(res0.msg == 'ok'){
                  this.x3 = temp - res0.data.list[0].data ;
                }else{
                  this.x3 = temp ;
                }
                this.$api.regionInf.findOne(param3.waterregionid).then(res1 => {
                  this.liuFangAveragePerFlow = (temp / res1.population / days * 1000).toFixed(1);
                  this.$api.stats.findAllPage(param4).then(res2 => {
                    let liuArea = res2.list[20].value;
                    this.liuFangAverageAreaFlow = (temp / liuArea / days * 1000).toFixed(1);
                  });
                  this.$api.waterRegionQuota.findAll(param7).then(res3 => {
                    switch (b) {
                      case 1 :
                        let quota1 = res3.data[0].m1;
                        this.liuFangWaterSavingRate = ((1 - this.x3 / quota1) * 100).toFixed(1);
                        break;
                      case 2 :
                        let quota2 = (res3.data[0].m1);
                        this.liuFangWaterSavingRate = ((1 - this.x3 / quota2) * 100).toFixed(1);
                        break;
                      case 3 :
                        let quota3 = (res3.data[0].m1 + res3.data[0].m2 );
                        this.liuFangWaterSavingRate = ((1 - this.x3 / quota3) * 100).toFixed(1);
                        break;
                      case 4 :
                        let quota4 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 );
                        this.liuFangWaterSavingRate = ((1 - this.x3 / quota4) * 100).toFixed(1);
                        break;
                      case 5 :
                        let quota5 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 );
                        this.liuFangWaterSavingRate = ((1 - this.x3 / quota5) * 100).toFixed(1);
                        break;
                      case 6 :
                        let quota6 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 + res3.data[0].m5 );
                        this.liuFangWaterSavingRate = ((1 - this.x3 / quota6) * 100).toFixed(1);
                        break;
                      case 7 :
                        let quota7 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 + res3.data[0].m5 + res3.data[0].m6);
                        this.liuFangWaterSavingRate = ((1 - this.x3 / quota7) * 100).toFixed(1);
                        break;
                      case 8 :
                        let quota8 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 + res3.data[0].m5 + res3.data[0].m6
                          + res3.data[0].m7 );
                        this.liuFangWaterSavingRate = ((1 - this.x3 / quota8) * 100).toFixed(1);
                        break;
                      case 9 :
                        let quota9 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 + res3.data[0].m5 + res3.data[0].m6
                          + res3.data[0].m7 + res3.data[0].m8 );
                        this.liuFangWaterSavingRate = ((1 - this.x3 / quota9) * 100).toFixed(1);
                        break;
                      case 10 :
                        let quota10 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 + res3.data[0].m5 + res3.data[0].m6
                          + res3.data[0].m7 + res3.data[0].m8 + res3.data[0].m9 );
                        this.liuFangWaterSavingRate = ((1 - this.x3 / quota10) * 100).toFixed(1);
                        break;
                      case 11 :
                        let quota11 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 + res3.data[0].m5 + res3.data[0].m6
                          + res3.data[0].m7 + res3.data[0].m8 + res3.data[0].m9 + res3.data[0].m10 );
                        this.liuFangWaterSavingRate = ((1 - this.x3 / quota11) * 100).toFixed(1);
                        break;
                      case 12 :
                        let quota12 = (res3.data[0].m1 + res3.data[0].m2 + res3.data[0].m3 + res3.data[0].m4 + res3.data[0].m5 + res3.data[0].m6
                          + res3.data[0].m7 + res3.data[0].m8 + res3.data[0].m9 + res3.data[0].m10 + res3.data[0].m11 );
                        this.liuFangWaterSavingRate = ((1 - this.x3 / quota12) * 100).toFixed(1);
                        break;
                    }
                  })
                });
              });
            } else {
              this.liuFangFlowOfCurrentYear = '--' ;
              this.liuFangAveragePerFlow = '--' ;
              this.liuFangAverageAreaFlow = '--' ;
              this.liuFangWaterSavingRate = '--' ;
            }
          });
        },
      }
    }
</script>

<style scoped>
  @import "../../../../static/css/waterSurey.css";
  .small-box {margin-bottom: 7px;}
</style>
