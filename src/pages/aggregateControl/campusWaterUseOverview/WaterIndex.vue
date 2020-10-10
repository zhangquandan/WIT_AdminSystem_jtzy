<template>
    <div class="water-box">
      <div class="index-name">
        <div><b>当前用量</b></div>
        <div><b>生均单耗</b></div>
        <div><b>建面单耗</b></div>
      </div>
      <div class="index-value">
        <div>{{flow}}吨</div>
        <div>{{personFlow}}升</div>
        <div>{{buildingAreaFlow}}升</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "water-index",
      data(){
        return {
          flow:'--',
          buildingArea:'',
          population:'',
          personFlow:'--',
          buildingAreaFlow:'--',
        }
      },
      methods:{
        dateFtt(date){
          date = new Date(date);
          return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        },
        initialize(id) {
          let date = new Date();
          let todayDate = date.getTime();
          let today = this.dateFtt(todayDate);
          let yesterDayDate = date.getTime() - 24 * 3600 * 1000;
          let yesterDay = this.dateFtt(yesterDayDate);
          let params = {
            pageNum : 1 ,
            pageSize : 1 ,
            waterregionid : id ,
            starttime : yesterDay ,
            endtime : today ,
          };
          let params1 = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.regionInf.findTotalFlowAnyDay(params).then(res => {
            if (res.msg === 'ok'){
              this.flow = res.data.list[0].data.toFixed(1);
              this.$api.regionInf.findOne(id).then(res1 => {
                this.population = res1.population ;
                this.personFlow = (this.flow/this.population*1000).toFixed(1);
              });
              this.$api.stats.findAllPage(params1).then(res2 =>{
                if(id === 1){
                  this.buildingsArea = res2.list[2].value ;
                }else if(id === 2){
                  this.buildingsArea = res2.list[16].value ;
                }else{
                  this.buildingsArea = res2.list[20].value ;
                }
                let a = Number(this.buildingsArea);
                let b = Number(this.flow);
                this.buildingAreaFlow = (b/a*1000).toFixed(1);
              })
            }else{
              this.flow = '--' ;
              this.personFlow = '--' ;
              this.buildingAreaFlow = '--' ;
            }
          })
        },
        daysFlow(params){
          let params1 = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.regionInf.findTotalFlowAnyDay(params).then(res => {
            if (res.msg === 'ok'){
              this.flow = res.data.list[0].data.toFixed(1);
              this.$api.regionInf.findOne(params.waterregionid).then(res1 => {
                this.population = res1.population ;
                this.personFlow = (this.flow/this.population*1000).toFixed(1);
              });
              this.$api.stats.findAllPage(params1).then(res2 =>{
                if(params.waterregionid === 1){
                  this.buildingsArea = res2.list[2].value ;
                }else if(params.waterregionid === 2){
                  this.buildingsArea = res2.list[16].value ;
                }else{
                  this.buildingsArea = res2.list[20].value ;
                }
                let a = Number(this.buildingsArea);
                let b = Number(this.flow);
                this.buildingAreaFlow = (b/a*1000).toFixed(1);
              })
            }else{
              this.flow = '--' ;
              this.personFlow = '--' ;
              this.buildingAreaFlow = '--' ;
            }
          })
        },
        monthsFlow(params){
          let params1 = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.regionInf.findTotalFlowAnyMonth(params).then(res => {
            if(res.msg === 'ok'){
              this.flow = res.data.list[0].data.toFixed(1);
              this.$api.regionInf.findOne(params.waterregionid).then(res1 => {
                this.population = res1.population ;
                this.personFlow = (this.flow/this.population/30*1000).toFixed(1) ;
              });
              this.$api.stats.findAllPage(params1).then(res2 =>{
                if(params.waterregionid === 1){
                  this.buildingsArea = res2.list[2].value ;
                }else if(params.waterregionid === 2){
                  this.buildingsArea = res2.list[16].value ;
                }else{
                  this.buildingsArea = res2.list[20].value ;
                }
                let a = Number(this.buildingsArea);
                let b = Number(this.flow);
                this.buildingAreaFlow = (b/a/30*1000).toFixed(1);
              })
            }else{
              this.flow = '--' ;
              this.personFlow = '--' ;
              this.buildingAreaFlow = '--' ;
            }
          })
        },
        yearsFlow(params){
          let params1 = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.regionInf.findTotalFlowAnyYear(params).then(res => {
            if(res.msg === 'ok'){
              this.flow = res.data.list[0].data.toFixed(1);
              this.$api.regionInf.findOne(params.waterregionid).then(res1 => {
                this.population = res1.population ;
                this.personFlow = (this.flow/this.population/365*1000).toFixed(1) ;
              });
              this.$api.stats.findAllPage(params1).then(res2 =>{
                if(params.waterregionid === 1){
                  this.buildingsArea = res2.list[2].value ;
                }else if(params.waterregionid === 2){
                  this.buildingsArea = res2.list[16].value ;
                }else{
                  this.buildingsArea = res2.list[20].value ;
                }
                let a = Number(this.buildingsArea);
                let b = Number(this.flow);
                this.buildingAreaFlow = (b/a/365*1000).toFixed(1);
              })
            }else{
              this.flow = '--' ;
              this.personFlow = '--' ;
              this.buildingAreaFlow = '--' ;
            }
          })
        },
      }
    }
</script>

<style scoped>
    .water-box {height: 100%;display:flex;flex-flow: column;justify-content: space-evenly;}
  .index-name {height: 45%;width: 100%;display:inline-flex;justify-content: space-evenly;}
  .index-name div{width: 32%;height: 100%;background: #DEEBF7;display: flex;justify-content: center;align-items: center;}
  .index-value {height: 45%;width: 100%;display: inline-flex;justify-content: space-evenly;}
  .index-value div {width: 32%;height: 100%;background: #DEEBF7;display: flex;justify-content: center;align-items: center;}
</style>
