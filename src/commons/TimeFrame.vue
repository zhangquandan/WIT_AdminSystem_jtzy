<!--时间区段查询-->
<template>
  <div class="block">
    <b>时间区段：</b>
    <el-date-picker
      v-model="value"
      type="daterange"
      size="small"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
    <el-button slot="append" size="small" icon="el-icon-search" @click="searchByTimes"><b>查询</b></el-button>
  </div>
</template>

<script>
    export default {
      name: "time-frame",
      data() {
        return {
          pickerOptions: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
          value: '',
        }
      },
      methods: {
        searchByTimes() {

        }
      },
    }
</script>

<style scoped>
 /* .block {position: relative;}
  .block .el-button {position: absolute;top: 0px;}*/
  .block .el-button {padding-top: 10px;padding-bottom: 8px;}
</style>
