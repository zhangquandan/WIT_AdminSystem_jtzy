<template>
  <div class="select-date">
    <!--周选择-->
    <el-dropdown @command="firstCommand" trigger="click">
      <el-button @click="link(1)" :type="radio == 1 ? 'primary' : 'normal'" size="mini">
        周选择<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="1">近1周</el-dropdown-item>
        <el-dropdown-item command="2">近2周</el-dropdown-item>
        <el-dropdown-item command="3">近3周</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!--月选择-->
    <el-dropdown @command="secondCommand" trigger="click">
      <el-button @click="link(2)" :type="radio == 2 ? 'primary' : 'normal'" size="mini">
        月选择<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="1">近1月</el-dropdown-item>
        <el-dropdown-item command="2">近2月</el-dropdown-item>
        <el-dropdown-item command="3">近3月</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!--年选择-->
    <el-dropdown @command="thirdCommand" trigger="click">
      <el-button @click="link(3)" :type="radio == 3 ? 'primary' : 'normal'" size="mini">
        年选择<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="1">今年</el-dropdown-item>
        <el-dropdown-item command="2">去年</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-button @click="link(4)" size="mini" :type="radio == 4 ? 'primary': 'normal'">时间区间</el-button>
    <search-by-hours v-if="radio == 4" @change="changeHour"></search-by-hours>
  </div>
</template>

<script>
    import SearchByHours from "../../../commons/SearchByHours";

    export default {
      components: {
        SearchByHours,},
      name: "trend-date",
      data() {
        return {
          radio: 1,
          command: 1,
          type: 0,
          count: 0,
        }
      },
      mounted() {
        this.link(1);
      },
      methods: {
        firstCommand(command) {
          let end = new Date();
          let start,text;
          switch(command) {
            case '1': start = new Date(end.getTime() - 7 * 24 * 3600 * 1000);
                    text = '近1周';
            break;
            case '2': start = new Date(end.getTime() - 14 * 24 * 3600 * 1000);
                    text = '近2周';
            break;
            case '3': start = new Date(end.getTime() - 21 * 24 * 3600 * 1000);
                    text = '近3周';
            break;
          }
          this.$emit('searchTimes',{start: this.format(start),end: this.format(end),text: text,type: 1});
        },
        secondCommand(command) {
          let end = new Date();
          let start,text;
          switch(command) {
            case '1': start = new Date(end.getTime() - 30 * 24 * 3600 * 1000);
                    text = '近1月';
              break;
            case '2': start = new Date(end.getTime() - 60 * 24 * 3600 * 1000);
                    text = '近2月';
              break;
            case '3': start = new Date(end.getTime() - 90 * 24 * 3600 * 1000);
                    text = '近3月';
              break;
          }
          this.$emit('searchTimes',{start: this.format(start),end: this.format(end),text: text,type: 1});
        },
        thirdCommand(command) {
          let time = new Date();
          let yy,text;
          switch(command) {
            case '1': yy = time.getFullYear();
                   text = '今年';
              break;
            case '2': yy = time.getFullYear() - 1;
                   text = '去年';
              break;
          }
          this.$emit('searchTimes',{yy: yy,text: text,type: 2});
        },
        link(type) {
          if(this.type != type) {
            this.type = type;
            switch(type) {
              case 1: this.firstCommand('1');
                break;
              case 2: this.secondCommand('1');
                break;
              case 3: this.thirdCommand('1');
                break;
            }
          }
          this.radio = type;
        },
        /*选择时间区段*/
        changeHour(params) {
          let start = params.start.split(' ')[0];
          let end = params.end.split(' ')[0];
          this.$emit('searchTimes',{start: start,end: end,text: start + '~' + end,type: 1})
        },
        /*日期格式化*/
        format(time) {
          if(typeof time == 'object' && time instanceof Date) {
            time = new Date(time);
            let yy = time.getFullYear();
            let mm = time.getMonth();
            mm = mm < 10 ? '0' + mm : mm;
            let dd = time.getDate();
            dd = dd < 10 ? '0' + dd : dd;
            let hh = time.getHours();
            hh = hh < 10 ? '0' + hh : hh;
            time = yy + '-' + mm + '-' + dd + ' ' + hh;
          }
          return time;
        }
      }
    }
</script>

<style scoped>
/*  .select-date .el-dropdown {margin-left: 20px;}*/
  .select-date {width: 100%;display: inline-flex;}
  .select-date > * {margin-left: 10px;}
  .select-date > *:first-child {margin-left: 0px;}
  .select-quota .el-date-editor.el-input, .el-date-editor.el-input__inner  {width: 330px;}
</style>
