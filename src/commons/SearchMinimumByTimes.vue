<template>
  <div class="radio-group">
    <el-radio-group type="success" size="mini" v-model="radio" @change="change">
      <el-radio-button label="1">连续7日</el-radio-button>
      <el-radio-button label="2">连续21日</el-radio-button>
      <el-radio-button label="3">连续63日</el-radio-button>
      <el-radio-button label="4">时间区间</el-radio-button>
    </el-radio-group>
    <el-date-picker
      v-if="radio == '4'"
      @change="changeTimes"
      v-model="value"
      size="small"
      type="daterange"
      value-format="yyyy-MM-dd"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
</template>

<script>

    export default {
      components: {},
      name: "search-minimum-by-times",
      data() {
        return {
          radio: '1',
          value: '',
          startTime: '',
          endTime: '',
        }
      },
      mounted() {
        this.change()
      },
      methods: {
        /*时间格式化*/
        dateFormat(time,format) {
          let date;
          if(typeof time == 'object' && time.getFullYear()) {
            date = time.getFullYear() + format + (time.getMonth()+1) + format + time.getDate();
          }
          return date;
        },
        /*连续7日*/
        getDays() {
          let endTime = new Date(new Date().getTime());
          let time1 = new Date(endTime.getTime() - 6*24*3600*1000);
          let time2 = new Date(endTime.getTime() - 22*24*3600*1000);
          let time3 = new Date(endTime.getTime() - 62*24*3600*1000);
          let params = {startTime: '',endTime: this.dateFormat(endTime,'-')};
          switch(this.radio) {
            case '1' : params.startTime = this.dateFormat(time1,'-');
            break;
            case '2' : params.startTime = this.dateFormat(time2,'-');
            break;
            case '3' : params.startTime = this.dateFormat(time3,'-');
            break;
          }
          return params;
        },
        /*切换时间*/
        change() {
          var params;
          if(this.radio != '4') {
            params = this.getDays();
            this.$emit('change',params);
          }
        },
        /*选择自定义时间段*/
        changeTimes() {
          var arr  = this.value;
          var start = arr[0].split('-');
          var end = arr[1].split('-');
          var days = parseInt((new Date(end[0],end[1] - 1,end[2]).getTime() - new Date(start[0],start[1] - 1,start[2]).getTime())/(24 * 3600 * 1000)) + 1;
          if(days > 120) {
            this.$message({
              type: 'warning',
              message: '时间区段不能超过120天'
            })
            return;
          }
          var params = {
            startTime: arr[0],
            endTime: arr[1],
          }
          this.$emit('change',params);
        },
      }
    }
</script>

<style scoped>
  .radio-group {position: relative;}
  .select-quota .el-date-editor.el-input, .el-date-editor.el-input__inner  {width: 300px;}
  .el-range-editor--small.el-input__inner {height: 30px;}
  .el-range-editor {position: absolute;top: 0px;margin-left: 10px;}
</style>
