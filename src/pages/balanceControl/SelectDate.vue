<template>
  <div class="block" id="custom">
    时间选择:
    <el-date-picker
      @change="change"
      value-format="yyyy-MM-dd"
      size="mini"
      v-model="value"
      type="daterange"
      range-separator="--"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
    <el-button type="primary" size="mini" icon="el-icon-search" @click="searchTimes">查询</el-button>
  </div>
</template>

<script>
    export default {
      name: "select-date",
      data() {
        return {
          value: '',
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
        }
      },
      props:{
        regionId: {
          type: Number,
        },
        titleName:{
          type:String,
          default: '校区：'
        },
      },
      mounted() {
        let start  = new Date(new Date().getTime() - 7 * 24 * 3600 * 1000);
        let year = start.getFullYear();
        let month = start.getMonth() + 1;
        let day = start.getDate();
        let hour = start.getHours();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        hour = hour < 10 ? '0' + hour : hour;
        start = year + '-' + month + '-' + day;
        let end = new Date();
        /*end.setTime(end.getTime() - 3600 * 1000 *24);*/
        year = end.getFullYear();
        month = end.getMonth() + 1;
        day = end.getDate();
        hour = end.getHours();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        hour = hour < 10 ? '0' + hour : hour;
        end = year + '-' + month + '-' + day;
        this.value = [start,end];
      },
      methods: {
        /*选择日期*/
        change() {
          let start = this.value[0];
          let end = this.value[1];
          let params = {start: start,end: end};
          this.$emit('change',params);
        },
        searchTimes() {
          let start = this.value[0];
          let end = this.value[1];
          let params = {start: start,end: end};
          this.$emit('searchTimes',params);
        },
      }
    }
</script>

<style scoped>
  .block {font-weight: bolder;}
  .el-button {margin-left: 5px;}
  .el-input__inner {width: 300px;}
</style>
