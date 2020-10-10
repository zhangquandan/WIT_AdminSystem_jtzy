<template>
  <div class="water-table">
    <div class="first-column"  :style="{width: columnWidth}">
      <div class="first-column-row">时间</div>
      <div class="first-column-row">累计水量</div>
      <div class="first-column-row">当前水量</div>
      <div class="first-column-row">同期水量</div>
      <div class="first-column-row">同比增减</div>
    </div>
    <div class="middle-column" v-for="(item,index) in table" :key="index" :style="{width: columnWidth}">
      <div class="middle-column-row">{{item.date}}</div>
      <div class="middle-column-row">{{item.total}}</div>
      <div class="middle-column-row">{{item.current}}</div>
      <div class="middle-column-row">{{item.samePeriod}}</div>
      <div class="middle-column-row">{{item.compare}}</div>
    </div>
    <div class="middle-column" v-for="i in (table.length < 13 ? 13 - table.length : 0)" :style="{width: columnWidth}">
      <div class="middle-column-row"></div>
      <div class="middle-column-row"></div>
      <div class="middle-column-row"></div>
      <div class="middle-column-row"></div>
      <div class="middle-column-row"></div>
    </div>
    <div class="last-column" :style="{width: columnWidth}">
      <div class="last-column-row">合计</div>
      <div class="last-column-row">--</div>
      <div class="last-column-row">{{flowCount == 'NaN' ? '--' : flowCount}}</div>
      <div class="last-column-row">{{compareCount == 'NaN' ? '--' : compareCount}}</div>
      <div class="last-column-row">{{addCount == 'NaN' ? '--' : addCount}}</div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "water-table",
      data() {
        return {
          table: [
            {date: '2020-01-01',total: '10000',current: '1000',samePeriod: '9999',compare: '999'},
            {date: '2020-01-02',total: '10000',current: '1000',samePeriod: '9999',compare: '999'},
            {date: '2020-01-03',total: '10000',current: '1000',samePeriod: '9999',compare: '999'},
            {date: '2020-01-04',total: '10000',current: '1000',samePeriod: '9999',compare: '999'},
            {date: '2020-01-05',total: '10000',current: '1000',samePeriod: '9999',compare: '999'},
            {date: '2020-01-06',total: '10000',current: '1000',samePeriod: '9999',compare: '999'},
          ],
        }
      },
      mounted(){
        this.table = this.tableData;
      },
      props: {
        tableData: {
          type: Array,
        },
        flowCount: {
          type: String
        },
        compareCount: {
          type: String,
        },
        addCount: {
         type: String
        }
      },
      computed:{
        columnWidth(){
          return (($(document).width()-200)/this.table.length)+'px';
        }
      }
    }
</script>

<style scoped>
  .water-table {height: 100%;width: 100%;display: flex;flex-flow: row;justify-content: space-between;overflow: auto;padding: 5px;}
  .water-table > div {margin-right: 4px;}
  .water-table > div:last-child {margin-right: 0px;}
  .first-column {height: 100%;min-width: 100px;display: flex;flex-flow: column;justify-content: space-between;}
  .first-column-row {height: 19%;background: #D0ECF9;display: flex;justify-content: center;align-items: center;}
  .middle-column {height: 100%;display: flex;flex-flow: column;justify-content: space-between;min-width: 100px;}
  .middle-column-row {height: 19%;background: #D0ECF9;display: flex;justify-content: center;align-items: center;}
  .last-column {height: 100%;min-width: 100px;display: flex;flex-flow: column;justify-content: space-between;}
  .last-column-row {height: 19%;background: #D0ECF9;display: flex;justify-content: center;align-items: center;}
  .table-row {height: 18%;width: 100%;background: #D0ECF9;}
</style>
