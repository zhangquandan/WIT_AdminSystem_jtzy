<template>
  <div class="set-month-quota">
    <!--<div class="quota-header">
      <div class="quota-name">月份</div>
      <div class="quota-number">定额(吨)</div>
    </div>
    <div class="month-quota" v-for="(item,index) in monthInf">
      <div class="month-number">{{item.name}}</div>
      <div class="set-number">
        <el-input-number v-model="item.number" size="mini" :step="10" controls-position="right"></el-input-number>
      </div>
    </div>
    <div class="quota-footer">
      <div class="total-data">
        <div>总定额</div>
        <div></div>
        <div></div>
      </div>
    </div>-->
    <table border="0" width="100%">
      <tr><td>月份</td><td>定额(吨)</td></tr>
      <tr v-for="(item,index) in monthInf">
        <td>{{item.name}}</td>
        <td>
          <el-input-number v-model="item.number" @change="change" :disabled="index == monthInf.length - 1" size="mini" :step="10" controls-position="right"></el-input-number>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
    export default {
      name: "set-month-quota",
      data() {
        return {
          totalQuota: 10000,
          totalRatio: 99,
          radio: 1,
          monthInf: [
            {name: '1月',number: 0,ratio: 10},
            {name: '2月',number: 0,ratio: 10},
            {name: '3月',number: 0,ratio: 10},
            {name: '4月',number: 0,ratio: 10},
            {name: '5月',number: 0,ratio: 10},
            {name: '6月',number: 0,ratio: 10},
            {name: '7月',number: 0,ratio: 10},
            {name: '8月',number: 0,ratio: 10},
            {name: '9月',number: 0,ratio: 10},
            {name: '10月',number: 0,ratio: 10},
            {name: '11月',number: 0,ratio: 10},
            {name: '12月',number: 0,ratio: 10},
            {name: '总定额',number: 0,ratio: 100}
          ]
        }
      },
      mounted() {

      },
      props: {

      },
      watch: {

      },
      methods: {
        getCurrentData() {
          let params = {
            current: this.monthInf
          }
          this.$emit('setData',params);
        },
        change() {
          let total = 0;
          this.monthInf.forEach((item,index) => {
            if(index < this.monthInf.length -1) {
              total += item.number;
            }else {
              item.number = total;
            }
          })
          this.getCurrentData();
        }
      }
    }
</script>

<style scoped>
  td {text-align: center;}
  tr {height: 40px;}
</style>
