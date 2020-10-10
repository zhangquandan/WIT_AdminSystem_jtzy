<template>
    <el-date-picker
      v-model="value"
      @change="change"
      size="mini"
      type="monthrange"
      value-format="yyyy-MM"
      range-separator="至"
      start-placeholder="开始月份"
      end-placeholder="结束月份"
      :picker-options="pickerOptions">
    </el-date-picker>
</template>

<script>
    export default {
      name: "search-by-months",
      data() {
        return {
          value: '',
          pickerOptions: {
            shortcuts: [{
              text: '近12个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 12 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '近24个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '近48个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 48 * 30);
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
          let start  = new Date(new Date().getTime() - 12 * 30 * 24 * 3600 * 1000);
          let year = start.getFullYear();
          let month = start.getMonth() + 1;
          month = month < 10 ? '0' + month : month;
          start = year + '-' + month;
          let end = new Date();
          year = end.getFullYear();
          month = end.getMonth() + 1;
          month = month < 10 ? '0' + month : month;
          end = year + '-' + month;
          return {start: start,end: end,};
          this.change();
        },
        /*选择时间*/
        change() {
          let start = this.value[0];
          let end = this.value[1];
          let compareStart = (start.split('-')[0] -1) + '-' + start.split('-')[1];
          let compareEnd = (end.split('-')[0] -1) + '-' + end.split('-')[1];
          let params = {start: start,end: end,compareStart: compareStart,compareEnd: compareEnd};
          this.$emit('change',params);
        },
      }
    }
</script>

<style scoped>

</style>
