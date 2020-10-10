<template>
  <div style="text-align: right;">
    <el-radio-group v-model="radio" size="mini" @change="radioChange">
      <el-radio-button :label="1">昨日</el-radio-button>
      <el-radio-button :label="2">上月</el-radio-button>
      <el-radio-button :label="3">去年</el-radio-button>
      <el-radio-button :label="4">前年</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    name: "radio-group1",
    data(){
      return {
        radio:1,
        starttime:'',
        endtime:'',
      }
    },
    props:{
      radioData:{
        type : Number,
      }
    },
    watch:{
      radioData:{
        handler(newValue,oldValue){
          this.radio = newValue;
        }
      }
    },
    methods:{
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
        /*上月*/
        let yearByMonth = '';
        let lastMonth = '';
        if(date.getMonth() == 0){
          yearByMonth = currentYear -1;
          lastMonth = 12 ;
        }else{
          yearByMonth = date.getFullYear() ;
          lastMonth = date.getMonth() ;
        }
        /*今年*/
        let currentYear = date.getFullYear();
        /*去年*/
        let lastYear = currentYear - 1 ;
        let dateTime = [] ;
        dateTime ={
          currentDay : currentDay,
          lastDay : lastDay,
          currentYear : currentYear,
          currentMonth : currentMonth,
          yearByMonth : yearByMonth,
          lastMonth : lastMonth,
          lastYear : lastYear
        };
        return dateTime ;
      },
      radioChange(){
        let dateTime = this.getTime();
        switch(this.radio){
          case 1 : //昨日
            this.starttime = dateTime.lastDay;
            this.endtime = dateTime.currentDay;
            break;
          case 2 : //上月
            this.starttime = dateTime.yearByMonth + '-' + dateTime.lastMonth ;
            this.endtime = dateTime.yearByMonth + '-' + (dateTime.lastMonth+1) ;
            break;
          case 3 : //去年
            this.starttime = dateTime.lastYear ;
            this.endtime = dateTime.lastYear ;
            break;
          case 4 : //前年
            this.starttime = dateTime.lastYear-1 ;
            this.endtime = dateTime.lastYear-1 ;
            break;
        }
        let type = 0 ;
        if(this.radio === 1){
          type = 1 ;
        }else if(this.radio === 2){
          type = 2 ;
        }else if(this.radio === 3){
          type = 3 ;
        }else{
          type = 4 ;
        }
        let params = {
          radio : this.radio,
          type : type,
          starttime : this.starttime,
          endtime : this.endtime,
        }
        this.$emit('radioChange',params)
      }
    }
  }
</script>

<style scoped>

</style>
