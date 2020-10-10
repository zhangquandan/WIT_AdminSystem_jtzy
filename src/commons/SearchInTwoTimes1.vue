<template>
  <div class="block">
    <span class="demonstration"><b>时间查询：</b></span>
    <el-date-picker
      v-model="startTime"
      value-format="yyyy-MM-dd"
      type="date"
      align="right"
      placeholder="开始时间"
      @change="changeStart"
      >
    </el-date-picker>
    --
    <el-date-picker
      v-model="endTime"
      value-format="yyyy-MM-dd"
      type="date"
      align="right"
      placeholder="结束时间"
      @change="changeEnd"
      >
    </el-date-picker>
    <el-button slot="append" icon="el-icon-search" :disabled="disable" @click="searchInTwoTimes" style="background-color: aliceblue"><b>查询</b></el-button>
  </div>
</template>

<script>
  export default {
    name: "search-in-two-times1",
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
      disable:{
        type:Boolean,
        default: false
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
        var date1 = new Date(this.endTime) ;
        if(date > now){
          this.startTime = this.dateFormat.dateFormat(now,'-') ;
        }else if(date > date1){
          this.startTime = this.endTime ;
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
        var date1 = new Date(this.startTime);
        if(date > now){
          this.endTime = this.dateFormat.dateFormat(now,'-');
          date = now ;
        }else if(date < date1){
          this.endTime = this.startTime ;
        }
      }
    }
  }
</script>

<style scoped>

</style>
