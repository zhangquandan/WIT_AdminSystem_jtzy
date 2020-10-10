<template>
      <div class="block">
        <span class="demonstration"><b>{{title}}</b></span>
        <el-date-picker
        v-model="startTime"
        size="small"
        value-format="yyyy-MM-dd"
        type="date"
        align="right"
        placeholder="开始时间"
        @change="changeStart">
        </el-date-picker>
        --
        <el-date-picker
          v-model="endTime"
          size="small"
          value-format="yyyy-MM-dd"
          type="date"
          align="right"
          placeholder="结束时间"
          @change="changeEnd">
        </el-date-picker>
        <el-button size="small" slot="append" icon="el-icon-search" @click="searchInTwoTimes" style="background-color: aliceblue"><b>查询</b></el-button>
      </div>
</template>

<script>
    export default {
        name: "search-in-two-times",
      data(){
          return {
            dateRange:[],
            startTime:'',
            endTime:''
          }
      },
      props:{
        startDate:{
          type:String,
        },
        endDate:{
          type:String,
        },
        title:{
          type:String
        }
      },
      created(){
        this.startTime = this.startDate ;
        this.endTime = this.endDate ;
      },
      methods:{
        searchInTwoTimes(){
          var params = {
            startTime:this.startTime,
            endTime:this.endTime
          }
          this.$emit('searchInTwoTimes',params)
        },
        changeStart(){
          let timeDate = this.startTime.split('-');
          let year = timeDate[0] ;
          let month = timeDate[1] ;
          let day = timeDate[2] ;
          if(year < '2018'){
            this.$message({
              message : '对不起，2018年以前的数据失踪了！',
              type:'warning'
            })
            year = '2018'
            this.startTime = year+'-'+month+'-'+day;
          }
          var now = new Date();
          var date = new Date(this.startTime);
          var times = new Date(date.getTime()+24*3600*1000);
          this.endTime = this.dateFormat.dateFormat(times,'-')
          if(date > now){
            this.startTime = this.dateFormat.dateFormat(now,'-') ;
            this.endTime = this.dateFormat.dateFormat(now,'-') ;
          }else if(times> now){
            this.endTime = this.dateFormat.dateFormat(now,'-') ;
          }
        },
        changeEnd(){
          let timeDate = this.endTime.split('-');
          let year = timeDate[0] ;
          let month = timeDate[1] ;
          let day = timeDate[2] ;
          if(year < '2018'){
            this.$message({
              message : '对不起，2018年以前的数据失踪了！',
              type:'warning'
            })
            year = '2018'
            this.endTime = year+'-'+month+'-'+day;
          }
          var now = new Date();
          var date = new Date(this.endTime) ;
          if(date > now){
            this.endTime = this.dateFormat.dateFormat(now,'-');
            date = now ;
          }
          this.startTime = this.dateFormat.dateFormat(new Date(date.getTime()-24*3600*1000),'-');
        }
      }
    }
</script>

<style scoped>
</style>
