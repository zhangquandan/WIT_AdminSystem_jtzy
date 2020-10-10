<template>
    <div style="text-align: right;">
      <el-radio-group v-model="radio" style="margin-top: 15px;text-align: right;" @change="radioChange">
        <el-radio :label="1">今日</el-radio>
        <el-radio :label="2">昨日</el-radio>
        <el-radio :label="3">本月</el-radio>
        <el-radio :label="4">上月</el-radio>
        <el-radio :label="5">今年</el-radio>
        <el-radio :label="6">去年</el-radio>
      </el-radio-group>
    </div>
</template>

<script>
    export default {
        name: "radio-group",
      data(){
          return {
            radio:1,
            title:'',
            yy : '',
            mm : '',
            dd : ''

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
          var date = new Date();
          /*今日*/
          var todayDate = date.getTime()-24*3600*1000;

          var currentDay = this.dateFtt(todayDate);
          /*昨日*/
          var yesterdayDate = date.getTime()-48*3600*1000;

          var lastDay = this.dateFtt(yesterdayDate);
          /*本月*/
          var currentMonth = date.getMonth()+1;
          /*上月*/
          var yearByMonth = '';
          var lastMonth = '';
          if(date.getMonth() == 0){
            yearByMonth = currentYear -1;
            lastMonth = 12 ;
          }else{
            yearByMonth = date.getFullYear() ;
            lastMonth = date.getMonth() ;
          }
          /*今年*/
          var currentYear = date.getFullYear();
          /*去年*/
          var lastYear = currentYear - 1 ;
          var dateTime = [] ;
          dateTime ={
            currentDay : currentDay,
            lastDay : lastDay,
            currentYear : currentYear,
            currentMonth : currentMonth,
            yearByMonth : yearByMonth,
            lastMonth : lastMonth,
            lastYear : lastYear
          }
          return dateTime ;
        },
        radioChange(){
          var dateTime = this.getTime();
          switch(this.radio){
            case 1 : this.title='今日';
                      this.yy = dateTime.currentDay.split('-')[0];
                      this.mm = dateTime.currentDay.split('-')[1];
                      this.dd = dateTime.currentDay.split('-')[2];
              break;
            case 2 : this.title='昨日';
                      this.yy = dateTime.lastDay.split('-')[0];
                      this.mm = dateTime.lastDay.split('-')[1];
                      this.dd = dateTime.lastDay.split('-')[2];
              break;
            case 3 : this.title='本月';
                      this.yy = dateTime.currentYear ;
                      this.mm = dateTime.currentMonth ;
              break;
            case 4 : this.title='上月';
                      this.yy = dateTime.yearByMonth ;
                      this.mm = dateTime.lastMonth ;
              break;
            case 5 : this.title='今年';
                      this.yy = dateTime.currentYear ;
              break;
            case 6 : this.title='去年';
                      this.yy = dateTime.lastYear ;
              break;
          }
          var type = 0 ;
          if(this.radio == 1 || this.radio == 2){
            type = 1 ;
          }else if(this.radio == 3 || this.radio == 4){
            type = 2 ;
          }else{
            type = 3 ;
          }
          var params = {
            radio : this.radio,
            title:this.title,
            type : type,
            yy : this.yy ,
            mm : this.mm ,
            dd : this.dd
          }
          this.$emit('radioChange',params)
        }
      }
    }
</script>

<style scoped>

</style>
