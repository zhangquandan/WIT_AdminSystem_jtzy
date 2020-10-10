<template>
      <div class="block">
        <b>{{titleName}}</b>
        <el-date-picker
          v-model="valueOfYear"
          :style="{width:setWidth}"
          size="mini"
          value-format="yyyy"
          type="year"
          placeholder="选择年" @change="change">
        </el-date-picker>
        <el-button size="mini" slot="append" icon="el-icon-search" :disabled="disable" @click="searchByYear" style="background-color: aliceblue">{{searchName}}</el-button>
      </div>
</template>

<script>
    export default {
        name: "search-by-year",
      data(){
          return {
          valueOfYear:'',
          }
      },
      created(){
          this.valueOfYear = this.currentYear;
      },
      props:{
        currentYear:{
          type:String,
        },
        titleName:{
          type:String,
          default:'年份选择：'
        },
        searchName:{
          type:String,
          default:'查询'
        },
        setWidth:{
          type:String,
        },
        disable:{
          type:Boolean,
          default: false
        }
      },
      methods:{
        change(){
          /*let year = this.valueOfYear ;
          if(year < '2018'){
            this.$message({
              message : '对不起，2018年以前的数据失踪了！',
              type:'warning'
            })
            this.valueOfYear = '2018';
          }*/
        },
        searchByYear(){
          var params = {
            valueOfYear : this.valueOfYear
          }
          this.$emit('searchByYear',params);
        },
        }
    }
</script>

<style scoped>

</style>
