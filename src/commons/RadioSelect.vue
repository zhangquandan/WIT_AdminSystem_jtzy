<template>
    <div class="select-date">
      <!--<el-button @click="link(1)" size="mini" :type="radio == 1 ? 'primary': 'normal'">年度用水</el-button>-->
      <el-dropdown @command="handlerCommand">
        <el-button size="mini" @click="link(1)" :type="radio == 1 ? 'primary' : 'normal'">
          年度用水<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" v-if="radio == 1">
          <el-dropdown-item command="1">近3年</el-dropdown-item>
          <el-dropdown-item command="2">近6年</el-dropdown-item>
          <el-dropdown-item command="3">近9年</el-dropdown-item>
        </el-dropdown-menu>
        <el-dropdown-menu slot="dropdown" v-if="radio != 1"></el-dropdown-menu>
      </el-dropdown>
      <!--<search-by-years v-if="radio == 1" :start="startTime" :end="endTime" @searchByYears="searchByYears"></search-by-years>-->
      <el-button @click="link(2)" size="mini" :type="radio == 2 ? 'primary': 'normal'">月度用水</el-button>
      <search-by-months v-if="radio == 2" @change="changeMonth"></search-by-months>
      <el-button @click="link(3)" size="mini" :type="radio == 3 ? 'primary': 'normal'">日用水</el-button>
      <search-by-days v-if="radio == 3" @change="changeDay"></search-by-days>
      <el-button @click="link(4)" size="mini" :type="radio == 4 ? 'primary': 'normal'">小时用水</el-button>
      <search-by-hours v-if="radio == 4" @change="changeTime"></search-by-hours>
    </div>
</template>

<script>
    import SearchByYears from "./SearchByYears";
    import SearchByMonths from "./SearchByMonths";
    import SearchByDays from "./SearchByDays";
    import SearchByHours from "./SearchByHours";

    export default {
      components: {
        SearchByHours,
        SearchByDays,
        SearchByMonths,
        SearchByYears},
      name: "radio-select",
      data() {
        return {
          radio: 4,
          startTime: '',
          endTime: '',
          num: 0,
        }
      },
      methods: {
        /*选择时间类型*/
        link(type) {
          if(type != 1) {
            this.num = 0;
          }
          this.radio = type;
          if(this.num == 0 && type == 1) {
            this.handlerCommand('1');
            this.num ++;
          }
        },
        /*年度查询快捷选择*/
        handlerCommand(command) {
          let date = new Date();
          let current = date.getFullYear() -1;
          let threeYears = current - 2;
          let sixYears = current - 5;
          let nineYears = current - 8;
          switch(command) {
            case '1': this.startTime = threeYears + '';
                       this.endTime = current + '';
                       break;
            case '2': this.startTime = sixYears + '';
                       this.endTime = current + '';
                       break;
            case '3': this.startTime = nineYears + '';
                       this.endTime = current + '';
                       break;
          }
          let params = {start: this.startTime,end: this.endTime,type: 1}
          this.$emit('searchByTimes',params);
        },
        /*/!*年度查询*!/
        searchByYears(params) {
          params.type = 1;
          this.$emit('searchByTimes',params);
        },*/
        /*月份查询*/
        changeMonth(params) {
          params.type = 2;
          this.$emit('searchByTimes',params);
        },
        /*日查询*/
        changeDay(params) {
          params.type = 3;
          this.$emit('searchByTimes',params);
        },
        /*小时查询*/
        changeTime(params) {
          params.type = 4;
          this.$emit('searchByTimes',params);
        }
      },
    }
</script>

<style scoped>
  .select-date {width: 100%;display: inline-flex;}
  .select-date > * {margin-left: 10px;}
  .select-date > *:first-child {margin-left: 0px;}
  .select-quota .el-date-editor.el-input, .el-date-editor.el-input__inner  {width: 330px;}
</style>
