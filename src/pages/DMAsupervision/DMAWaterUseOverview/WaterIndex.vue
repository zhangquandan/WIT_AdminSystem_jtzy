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
                if(this.population == 0){
                  this.personFlow = '--'
                }else{
                  this.personFlow = (this.flow/this.population*1000).toFixed(1);
                }
              });
              this.$api.stats.findAllPage(params1).then(res2 =>{
                switch(id){
                  case 53 :
                    this.buildingsArea = res2.list[25].value ;
                    break;
                  case 54 :
                    this.buildingsArea = res2.list[27].value ;
                    break;
                  case 55 :
                    this.buildingsArea = res2.list[29].value ;
                    break;
                  case 56 :
                    this.buildingsArea = res2.list[31].value ;
                    break;
                  case 57 :
                    this.buildingsArea = res2.list[33].value ;
                    break;
                  case 58 :
                    this.buildingsArea = res2.list[35].value ;
                    break;
                  case 59 :
                    this.buildingsArea = res2.list[37].value ;
                    break;
                  case 60 :
                    this.buildingsArea = res2.list[39].value ;
                    break;
                  case 61 :
                    this.buildingsArea = res2.list[41].value ;
                    break;
                  case 62 :
                    this.buildingsArea = res2.list[43].value ;
                    break;
                  case 63 :
                    this.buildingsArea = res2.list[45].value ;
                    break;
                  case 64 :
                    this.buildingsArea = res2.list[47].value ;
                    break;
                  case 65 :
                    this.buildingsArea = res2.list[49].value ;
                    break;
                  case 66 :
                    this.buildingsArea = res2.list[51].value ;
                    break;
                  case 67 :
                    this.buildingsArea = res2.list[53].value ;
                    break;
                  case 89 :
                    this.buildingsArea = res2.list[55].value ;
                    break;
                }
                let a = Number(this.buildingsArea);
                if(a === 0){
                  this.buildingAreaFlow = '--'
                }else{
                  let b = Number(this.flow);
                  this.buildingAreaFlow = (b/a/365*1000).toFixed(1);
                }
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
                if(this.population == 0){
                  this.personFlow = '--'
                }else{
                  this.personFlow = (this.flow/this.population*1000).toFixed(1);
                }
                this.$api.stats.findAllPage(params1).then(res2 =>{
                  switch(params.waterregionid){
                    case 53 :
                      this.buildingsArea = res2.list[25].value ;
                      break;
                    case 54 :
                      this.buildingsArea = res2.list[27].value ;
                      break;
                    case 55 :
                      this.buildingsArea = res2.list[29].value ;
                      break;
                    case 56 :
                      this.buildingsArea = res2.list[31].value ;
                      break;
                    case 57 :
                      this.buildingsArea = res2.list[33].value ;
                      break;
                    case 58 :
                      this.buildingsArea = res2.list[35].value ;
                      break;
                    case 59 :
                      this.buildingsArea = res2.list[37].value ;
                      break;
                    case 60 :
                      this.buildingsArea = res2.list[39].value ;
                      break;
                    case 61 :
                      this.buildingsArea = res2.list[41].value ;
                      break;
                    case 62 :
                      this.buildingsArea = res2.list[43].value ;
                      break;
                    case 63 :
                      this.buildingsArea = res2.list[45].value ;
                      break;
                    case 64 :
                      this.buildingsArea = res2.list[47].value ;
                      break;
                    case 65 :
                      this.buildingsArea = res2.list[49].value ;
                      break;
                    case 66 :
                      this.buildingsArea = res2.list[51].value ;
                      break;
                    case 67 :
                      this.buildingsArea = res2.list[53].value ;
                      break;
                    case 89 :
                      this.buildingsArea = res2.list[55].value ;
                      break;
                  }
                  let a = Number(this.buildingsArea);
                  if(a === 0){
                    this.buildingAreaFlow = '--'
                  }else{
                    let b = Number(this.flow);
                    this.buildingAreaFlow = (b/a/365*1000).toFixed(1);
                  }
                })
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
                if(this.population == 0){
                  this.personFlow = '--'
                }else{
                  this.personFlow = (this.flow/this.population*1000).toFixed(1);
                }
                this.$api.stats.findAllPage(params1).then(res2 =>{
                  switch(params.waterregionid){
                    case 53 :
                      this.buildingsArea = res2.list[25].value ;
                      break;
                    case 54 :
                      this.buildingsArea = res2.list[27].value ;
                      break;
                    case 55 :
                      this.buildingsArea = res2.list[29].value ;
                      break;
                    case 56 :
                      this.buildingsArea = res2.list[31].value ;
                      break;
                    case 57 :
                      this.buildingsArea = res2.list[33].value ;
                      break;
                    case 58 :
                      this.buildingsArea = res2.list[35].value ;
                      break;
                    case 59 :
                      this.buildingsArea = res2.list[37].value ;
                      break;
                    case 60 :
                      this.buildingsArea = res2.list[39].value ;
                      break;
                    case 61 :
                      this.buildingsArea = res2.list[41].value ;
                      break;
                    case 62 :
                      this.buildingsArea = res2.list[43].value ;
                      break;
                    case 63 :
                      this.buildingsArea = res2.list[45].value ;
                      break;
                    case 64 :
                      this.buildingsArea = res2.list[47].value ;
                      break;
                    case 65 :
                      this.buildingsArea = res2.list[49].value ;
                      break;
                    case 66 :
                      this.buildingsArea = res2.list[51].value ;
                      break;
                    case 67 :
                      this.buildingsArea = res2.list[53].value ;
                      break;
                    case 89 :
                      this.buildingsArea = res2.list[55].value ;
                      break;
                  }
                  let a = Number(this.buildingsArea);
                  if(a === 0){
                    this.buildingAreaFlow = '--'
                  }else{
                    let b = Number(this.flow);
                    this.buildingAreaFlow = (b/a/365*1000).toFixed(1);
                  }
                })
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
                if(this.population == 0){
                  this.personFlow = '--'
                }else{
                  this.personFlow = (this.flow/this.population*1000).toFixed(1);
                }
                this.$api.stats.findAllPage(params1).then(res2 =>{
                  switch(params.waterregionid){
                    case 53 :
                      this.buildingsArea = res2.list[25].value ;
                      break;
                    case 54 :
                      this.buildingsArea = res2.list[27].value ;
                      break;
                    case 55 :
                      this.buildingsArea = res2.list[29].value ;
                      break;
                    case 56 :
                      this.buildingsArea = res2.list[31].value ;
                      break;
                    case 57 :
                      this.buildingsArea = res2.list[33].value ;
                      break;
                    case 58 :
                      this.buildingsArea = res2.list[35].value ;
                      break;
                    case 59 :
                      this.buildingsArea = res2.list[37].value ;
                      break;
                    case 60 :
                      this.buildingsArea = res2.list[39].value ;
                      break;
                    case 61 :
                      this.buildingsArea = res2.list[41].value ;
                      break;
                    case 62 :
                      this.buildingsArea = res2.list[43].value ;
                      break;
                    case 63 :
                      this.buildingsArea = res2.list[45].value ;
                      break;
                    case 64 :
                      this.buildingsArea = res2.list[47].value ;
                      break;
                    case 65 :
                      this.buildingsArea = res2.list[49].value ;
                      break;
                    case 66 :
                      this.buildingsArea = res2.list[51].value ;
                      break;
                    case 67 :
                      this.buildingsArea = res2.list[53].value ;
                      break;
                    case 89 :
                      this.buildingsArea = res2.list[55].value ;
                      break;
                  }
                  let a = Number(this.buildingsArea);
                  if(a === 0){
                    this.buildingAreaFlow = '--'
                  }else{
                    let b = Number(this.flow);
                    this.buildingAreaFlow = (b/a/365*1000).toFixed(1);
                  }
                })
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
