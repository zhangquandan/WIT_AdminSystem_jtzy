<template>
  <div class="select-times">
    <el-radio-group type="success" size="mini" v-model="radio" @change="change">
      <el-radio-button label="1">24小时</el-radio-button>
      <el-radio-button label="2">48小时</el-radio-button>
      <el-radio-button label="3">72小时</el-radio-button>
      <el-radio-button label="4">时间区段</el-radio-button>
    </el-radio-group>
    <el-date-picker
      v-if="radio == '4'"
      @change="changeTimes"
      v-model="value"
      style="width: 200px;padding-bottom: 5px;padding-top: 5px;padding-left: 10px;"
      size="mini"
      type="daterange"
      value-format="yyyy-MM-dd"
      range-separator="——"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
</template>

<script>
    export default {
      name: "select-times",
      data() {
        return {
          radio: '1',
          value: '',
        }
      },
      created() {
        this.change();
      },
      methods: {
        /*时间区段时间选择*/
        changeTimes() {
          let times = this.value;
          this.$emit('changeTimes',{start: times[0],end: times[1]});
        },
        /*单选按钮时间选择*/
        change() {
          let end = new Date();
          let start = end.getTime();
          switch(this.radio) {
            case '1': start = new Date(start - 24 * 3600 * 1000);
            break;
            case '2': start = new Date(start - 48 * 3600 * 1000);
            break;
            case '3': start = new Date(start - 72 * 3600 * 1000);
            break;
          }
          this.$emit('changeTimes',{start: this.format(start),end: this.format(end)});
        },
        /*时间格式化*/
        format(date) {
          date = new Date(date);
          let yy = date.getFullYear();
          let mm = date.getMonth() + 1;
          mm = mm < 10 ? '0' + mm : mm;
          let dd = date.getDate();
          dd = dd < 10 ? '0' + dd : dd;
          let hh = date.getHours();
          hh = hh < 10 ? '0' + hh : hh;
          let mi = date.getMinutes();
          mi = mi < 10 ? '0' + mi : mi;
          let ss = date.getSeconds();
          ss = ss < 10 ? '0' + ss : ss;
          return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mi + ':' + ss;
        },
      },
    }
</script>

<style scoped>
  .date-editor .el-input__inner {width: 400px;}
</style>
