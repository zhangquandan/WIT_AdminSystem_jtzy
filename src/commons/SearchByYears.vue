<template>
  <div class="search-years">
    <el-date-picker
      class="picker"
      v-model="startYear"
      value-format="yyyy"
      type="year"
      size="mini"
      placeholder="开始年份" @change="changeStart">
    </el-date-picker>
    --
    <el-date-picker
      class="picker"
      v-model="endYear"
      value-format="yyyy"
      type="year"
      size="mini"
      placeholder="结束年份" @change="changeEnd">
    </el-date-picker>
    <el-button slot="append" size="mini" icon="el-icon-search" @click="link" style="background-color: aliceblue"><b>查询</b></el-button>
  </div>
</template>

<script>
    export default {
        name: "search-by-years",
      data(){
          return {
            startYear:'',
            endYear:'',
          }
      },
      props:{
        start:{
          type:String,
        },
        end:{
          type:String,
        },
      },
      watch: {
        start: {
          handler(newValue,oldValue) {
            this.startYear = newValue;
          }
        },
        end: {
          handler(newValue,oldValue) {
            this.endYear = newValue;
          }
        }
      },
      mounted(){
        this.startYear = String(Number(new Date().getFullYear()) - 2);
        this.endYear = String(Number(new Date().getFullYear()));
        this.searchByYears();
      },
      props: {
        type: {
          type: Number,
        }
      },
      methods:{
        changeStart(){
          let year  = this.startYear ;
          if(this.endYear) {
            if(this.endYear < this.startYear) {
              var emp = this.endYear ;
              this.endYear = this.startYear ;
              this.startYear = emp;
            }
          }
          /*if(year < '2018'){
            this.$message({
              message : '对不起，2018年以前的数据失踪了！',
              type:'warning'
            })
            this.startYear = '2018';
          }*/
        },
        changeEnd(){
          let year = this.endYear ;
          if(this.startYear) {
            if(this.endYear < this.startYear) {
              var emp = this.endYear ;
              this.endYear = this.startYear ;
              this.startYear = emp;
            }
          }
          /*if(year < '2018'){
            this.$message({
              message : '对不起，2018年以前的数据失踪了！',
              type:'warning'
            })
            this.endYear = '2018';
          }*/
        },
        searchByYears(){
          var params = {
            start : this.startYear,
            end : this.endYear
          }
          this.$emit('searchByYears',params);
        },
        link() {
          if(this.type == 1) {
            var params = {
              start : this.startYear,
              end : this.endYear
            }
            this.$emit('searchByYears',params);
          }
        },
      }
    }
</script>

<style scoped>
  .el-input__inner {
    width:50%;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner  {width: 120px;}
  /*.search-years {border: 1px dashed skyblue;}*/
</style>
