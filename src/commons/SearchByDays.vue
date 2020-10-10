<template>
  <el-date-picker
    @change="change"
    value-format="yyyy-MM-dd"
    v-model="value"
    type="daterange"
    size="mini"
    range-separator="至"
    start-placeholder="开始月份"
    end-placeholder="结束月份"
    :picker-options="pickerOptions">
  </el-date-picker>
</template>

<script>
    export default {
      name: "search-by-days",
      data() {
        return {
          value: '',
          pickerOptions: {
            shortcuts: [{
              text: '近7天',
              onClick(picker) {
                const end = new Date();
                /*end.setTime(end.getTime() - 3600 * 1000 * 24)*/
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '近14天',
              onClick(picker) {
                const end = new Date();
                /*end.setTime(end.getTime() - 3600 * 1000 * 24)*/
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '近30天',
              onClick(picker) {
                const end = new Date();
                /*end.setTime(end.getTime() - 3600 * 1000 * 24)*/
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '近60天',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
        }
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
        this.change();
      },
      methods: {
        /*选择日期*/
        change() {
          let start = this.value[0];
          let end = this.value[1];
          let compareStart = (start.split('-')[0] -1) + '-' + start.split('-')[1] + '-' + start.split('-')[2];
          let compareEnd = (end.split('-')[0] -1) + '-' + end.split('-')[1] + '-' + end.split('-')[2];
          let params = {start: start,end: end,compareStart: compareStart,compareEnd: compareEnd};
          this.$emit('change',params);
        },
      }
    }
</script>

<style scoped>

</style>
