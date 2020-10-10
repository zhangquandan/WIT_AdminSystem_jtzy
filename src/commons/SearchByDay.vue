<template>
  <div class="block">
    <b>日期选择：</b>
    <el-date-picker
      v-model="valueOfDay"
      value-format="yyyy-MM-dd"
      type="date"
      size="small"
      placeholder="选择日期">
    </el-date-picker>
    <el-button slot="append" size="small" icon="el-icon-search" @click="searchByDay" style="background-color: aliceblue">查询</el-button>
  </div>
</template>

<script>
    export default {
      name: "search-by-day",
      data(){
        return {
          valueOfDay:'',
        }
      },
      created(){
        this.valueOfDay = this.time;
      },
      props:{
        time:{
          type:String,
        }
      },
      methods:{
        searchByDay(){
          let params = {
            valueOfDay:this.valueOfDay
          }
          this.$emit('searchByDay',params);
        },
      }
    }
</script>

<style scoped>

</style>
