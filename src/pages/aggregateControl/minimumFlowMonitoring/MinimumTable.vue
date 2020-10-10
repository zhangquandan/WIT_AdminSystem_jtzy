<template>
  <div class="water-table">
    <div class="first-column" :style="{width: columnWidth}">
      <div class="first-column-row">时段</div>
      <div class="first-column-row">凌晨0-1</div>
      <div class="first-column-row">凌晨1-2</div>
      <div class="first-column-row">凌晨2-3</div>
      <div class="first-column-row">凌晨3-4</div>
    </div>
    <div class="middle-column" v-for="(item,index) in table" :key="index" :style="{width: columnWidth}">
      <div class="middle-column-row">{{item ? item.date : null}}</div>
      <div class="middle-column-row" :class="{miniFlow: selectMin(item.first,item)}">{{item ? item.first : null}}</div>
      <div class="middle-column-row" :class="{miniFlow: selectMin(item.second,item)}">{{item ? item.second : null}}</div>
      <div class="middle-column-row" :class="{miniFlow: selectMin(item.third,item)}">{{item ? item.third : null}}</div>
      <div class="middle-column-row" :class="{miniFlow: selectMin(item.fourth,item)}">{{item ? item.fourth : null}}</div>
    </div>
    <div class="middle-column" v-if="table.length < 15" v-for="i in (15 - table.length < 0 ? 0 : 15 - table.length)" :style="{width: columnWidth}">
      <div class="middle-column-row"></div>
      <div class="middle-column-row"></div>
      <div class="middle-column-row"></div>
      <div class="middle-column-row"></div>
      <div class="middle-column-row"></div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "minimum-table",
      data() {
        return {
          table: [
            {date: '2020-01-01',first: 10000,second: 999,third: 9999,fourth: 1000},
            {date: '2020-01-02',first: 999,second: 10000,third: 9999,fourth: 1000},
          ],
        }
      },
      mounted() {
        this.table = this.tableData;
      },
      props: {
        tableData: {
          type: Array,
        }
      },
      watch: {
        tableData: {
          handler(newValue,oldValue) {
            this.tableData = newValue;
          }
        }
      },
      methods: {
        selectMin(value,obj) {
          var flag = true;
          for(var i in obj) {
            if(Number(obj[i]) < Number(value) && i != 'date') {
              flag = false;
            }
          }
          return flag;
        }
      },
      computed:{
        columnWidth(){
          return (($(document).width()-200)/this.tableData.length)+'px';
        }
      }
    }
</script>

<style scoped>
  .water-table {height: 100%;width: 100%;display: flex;flex-flow: row;justify-content: space-between;overflow: auto;padding: 5px;}
  .water-table > div {margin-right: 5px;}
  .water-table > div:last-child {margin-right: 0px;}
  .first-column {height: 100%;min-width: 100px;display: flex;flex-flow: column;justify-content: space-between;}
  .first-column-row {height: 19%;background: #D0ECF9;display: flex;justify-content: center;align-items: center;}
  .middle-column {height: 100%;display: flex;flex-flow: column;justify-content: space-between;min-width: 100px;}
  .middle-column-row {height: 19%;background: #D0ECF9;display: flex;justify-content: center;align-items: center;}
  .miniFlow {background:#ED7D31;}
</style>
