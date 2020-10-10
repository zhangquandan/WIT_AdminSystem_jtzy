<template>
      <div class="block">
        <b>查询的月份：</b>
        <el-date-picker
          v-model="valueOfMonth"
          value-format="yyyy-MM"
          type="month"
          placeholder="选择月" @change="change">
        </el-date-picker>
        <el-button slot="append" icon="el-icon-search" :disabled="disable" @click="searchByMonth" style="background-color: aliceblue">查询</el-button>
      </div>
</template>

<script>
    export default {
        name: "search-by-month",
      data(){
          return {
            valueOfMonth:''
          }
      },
      props:{
        currentMonth:{
          type:String,
        },
        disable:{
          type:Boolean,
          default: false
        }
      },
      created(){
          this.valueOfMonth = this.currentMonth ;
      },
      methods:{
        /*日期变化时间*/
        change(){
          var times = this.valueOfMonth.split('-');
          var year = times[0] ;
          var month = times[1] ;
          if(year < '2018'){
            this.$message({
              message : '对不起，2018年以前的数据失踪了！',
              type:'warning'
            })
            year = '2018';
            this.valueOfMonth = year + '-' + month ;
          }
        },
        searchByMonth(){
          var times = this.valueOfMonth.split('-');
          var year = times[0] ;
          var month = times[1] ;
          var params = {
            year:year,
            month:month
          }
          this.$emit('searchByMonth',params)
        }
      }
    }
</script>

<style scoped>

</style>
