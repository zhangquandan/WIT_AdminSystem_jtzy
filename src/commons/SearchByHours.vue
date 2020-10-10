<template>
  <el-date-picker
    size="mini"
    v-model="value"
    type="datetimerange"
    @change="change"
    format="yyyy-MM-dd HH"
    value-format="yyyy-MM-dd HH"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :picker-options="pickerOptions">
  </el-date-picker>
</template>

<script>
    export default {
      name: "search-by-hours",
      data() {
        return {
          value: '',
          pickerOptions: {
            shortcuts: [{
              text: '24小时',
              onClick(picker) {
                const end = new Date();
                end.setTime(end.getTime() - end.getHours() * 3600 * 1000);
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 - start.getHours() * 3600 * 1000);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '48小时',
              onClick(picker) {
                const end = new Date();
                end.setTime(end.getTime() - end.getHours() * 3600 * 1000);
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 48 - start.getHours() * 3600 * 1000);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '72小时',
              onClick(picker) {
                const end = new Date();
                end.setTime(end.getTime() - end.getHours() * 3600 * 1000);
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 72 - start.getHours() * 3600 * 1000);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '240小时',
              onClick(picker) {
                const end = new Date();
                end.setTime(end.getTime() - end.getHours() * 3600 * 1000);
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 240 - start.getHours() * 3600 * 1000);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
        }
      },
      mounted() {
        let time = this.initTime();
        this.value = [time.start,time.end];
        this.change();
      },
      methods: {
        /*初始化时间*/
        initTime() {
          let start  = new Date();
          start = new Date(new Date().getTime() - 24 * 3600 * 1000 - start.getHours() * 3600 * 1000)
          let year = start.getFullYear();
          let month = start.getMonth() + 1;
          let day = start.getDate();
          let hour = start.getHours();
          let minute = start.getMinutes();
          let seconds = start.getSeconds();
          month = month < 10 ? '0' + month : month;
          day = day < 10 ? '0' + day : day;
          hour = hour < 10 ? '0' + hour : hour;
          minute = minute < 10 ? '0' + minute : minute;
          seconds = seconds < 10 ? '0' + seconds : seconds;
          start = year + '-' + month + '-' + day + ' ' + hour;
          let end = new Date();
          end = new Date(new Date().getTime() - end.getHours() * 3600 * 1000)
          year = end.getFullYear();
          month = end.getMonth() + 1;
          day = end.getDate();
          hour = end.getHours();
          minute = end.getMinutes();
          seconds = end.getSeconds();
          month = month < 10 ? '0' + month : month;
          day = day < 10 ? '0' + day : day;
          hour = hour < 10 ? '0' + hour : hour;
          seconds = seconds < 10 ? '0' + seconds : seconds;
          end = year + '-' + month + '-' + day + ' ' + hour;
          return {start: start,end: end};
        },
        /*选择时间*/
        change() {
          var params = {start: this.value[0],end: this.value[1]};
          let start = this.value[0].split(' ')[0].split('-');
          let end = this.value[1].split(' ')[0].split('-');
          end = new Date(Number(end[0]),Number(end[1]) - 1,Number(end[2]));
          start = new Date(Number(start[0]),Number(start[1]) - 1,Number(start[2]));
          if((end.getTime() - start.getTime())/(3600 * 1000) > 240) {
            this.$message({
              message : '时间范围不能超过240小时',
              type:'warning'
            })
            return
          }
          this.$emit("change",params);
        },
      }
    }
</script>

<style scoped>

</style>
