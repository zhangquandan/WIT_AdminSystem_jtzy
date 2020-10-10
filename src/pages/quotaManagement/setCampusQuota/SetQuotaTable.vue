<template>
  <div class="set-quota-table">
    <div class="first-row">
      <div class="table-body">
        <div class="header-item">月份</div>
        <div class="header-item">定额(吨)</div>
        <div class="header-item">参考数据(吨)</div>
      </div>
      <div class="table-body" v-for="item in table">
        <div class="header-item">{{item.name}}</div>
        <div class="header-item">{{item.value}}</div>
        <div class="header-item">{{item.history}}</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "set-quota-table",
      data() {
        return {
          table: [
            {name: '一月',value: 1999,history: 2000},
            {name: '二月',value: 1999,history: 2000},
            {name: '三月',value: 1999,history: 2000},
            {name: '四月',value: 1999,history: 2000},
            {name: '五月',value: 1999,history: 2000},
            {name: '六月',value: 1999,history: 2000},
            {name: '七月',value: 1999,history: 2000},
            {name: '八月',value: 1999,history: 2000},
            {name: '九月',value: 1999,history: 2000},
            {name: '十月',value: 1999,history: 2000},
            {name: '十一月',value: 1999,history: 2000},
            {name: '十二月',value: 1999,history: 2000},
            {name: '合计',value: 1999,history: 2000},
          ],
        }
      },
      props: {
        tableData: {
          type: Array,
        }
      },
      watch: {
        tableData: {
          handler(newValue,oldValue) {
            this.table = newValue;
          }
        }
      },
      methods: {

      },
      created() {
        this.table = this.tableData;
      },
    }
</script>

<style scoped>
  .set-quota-table {height: 100%;width: 100%;display: flex;flex-flow: column;border: 1px solid #DEEBF7;padding: 10px;overflow: auto;}
  .first-row {height: 100%;width: 100%;display: flex;justify-content: space-between;}
  .first-row .table-body {width: calc(7% - 4px);min-width: 100px;height: 100%;display: flex;flex-flow: column;justify-content: space-between;}
  .first-row .header-item {width: 100%;height: calc(33% - 5px);background-color: #DEEBF7;display: flex;justify-content: center;align-items: center;}
</style>
