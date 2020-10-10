<template>
  <div class="select-date">
    <!--连续12个月-->
    <el-dropdown @command="firstCommand" trigger="click">
      <el-button @click="link(1)" :type="radio == 1 ? 'primary' : 'normal'" size="mini">
        连续12个月年用水趋势分析<!--<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
      </el-button>
      <!--<el-dropdown-menu slot="dropdown">
        &lt;!&ndash;<el-dropdown-item command="1">近3年</el-dropdown-item>
        <el-dropdown-item command="2">近6年</el-dropdown-item>
        <el-dropdown-item command="3">近9年</el-dropdown-item>&ndash;&gt;
      </el-dropdown-menu>-->
    </el-dropdown>
    <!--连续30日-->
    <el-dropdown @command="secondCommand" trigger="click">
      <el-button @click="link(2)" :type="radio == 2 ? 'primary' : 'normal'" size="mini">
        连续30日月用水趋势分析<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="1">前推120天</el-dropdown-item>
        <el-dropdown-item command="2">前推240天</el-dropdown-item>
        <el-dropdown-item command="3">前推360天</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!--连续7日-->
    <el-dropdown @command="thirdCommand" trigger="click">
      <el-button @click="link(3)" :type="radio == 3 ? 'primary' : 'normal'" size="mini">
        连续7日周用水趋势分析<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="1">前推70天</el-dropdown-item>
        <el-dropdown-item command="2">前推140天</el-dropdown-item>
        <el-dropdown-item command="3">前推280天</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
    export default {
        name: "trend-date",
      data() {
        return {
          index: '1',
          radio: 1,
          type: 0,
        }
      },
      mounted() {
        this.firstCommand('');
      },
      methods: {
        firstCommand(command) {
          let end = new Date();
          let start = new Date(end.getTime() - 2 * 365 * 24 * 3600 * 1000);
          end = this.format(end,1);
          start = this.format(start,1);
          this.$emit('searchTimes',{start: start,end: end,type: 1});
        },
        secondCommand(command) {
          let end = new Date();
          let start;
          switch(command) {
            case '1': start = new Date(end.getTime() - 149 * 24 * 3600 *1000);
            break;
            case '2': start = new Date(end.getTime() - 269 * 24 * 3600 * 1000);
            break;
            case '3': start = new Date(end.getTime() - 389 * 24 * 3600 * 1000);
            break;
          }
          start = this.format(start,2);
          end = this.format(end,2);
          this.$emit('searchTimes',{start: start,end: end,type: 2});
        },
        thirdCommand(command) {
          let end = new Date();
          let start;
          switch(command) {
            case '1': start = new Date(end.getTime() - 76 * 24 * 3600 *1000);
              break;
            case '2': start = new Date(end.getTime() - 146 * 24 * 3600 * 1000);
              break;
            case '3': start = new Date(end.getTime() - 286 * 24 * 3600 * 1000);
              break;
          }
          start = this.format(start,2);
          end = this.format(end,2);
          this.$emit('searchTimes',{start: start,end: end,type: 3});
        },
        link(type) {
          if(type != this.type) {
            this.type = type;
            this.radio = type;
            switch(this.type) {
              case 1: this.firstCommand('');
              break;
              case 2: this.secondCommand('1');
              break;
              case 3: this.thirdCommand('1');
            }
          }
        },
        format(time,type) {
          time = new Date(time);
          let yy = time.getFullYear();
          let mm = time.getMonth() + 1;
          mm = mm < 10 ? '0' + mm : mm;
          let dd = time.getDate();
          dd = dd < 10 ? '0' + dd : dd;
          switch(type) {
            case 1: time = yy + '-' + mm;
            break;
            case 2: time = yy + '-' + mm + '-' + dd;
            break;
          }
          return time;
        },
      }
    }
</script>

<style scoped>
  .select-date .el-dropdown {margin-left: 20px;}
</style>
