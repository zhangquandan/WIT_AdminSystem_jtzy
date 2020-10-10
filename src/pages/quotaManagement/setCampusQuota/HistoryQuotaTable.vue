<template>
  <div class="history-quota-table">
    <div class="first-row">
      <div class="table-body">
        <div class="header-item">月份</div>
        <div class="header-item">{{radio == 1 ? "用水量" : "定额"}}</div>
      </div>
      <div class="table-body" v-for="item in tableData">
        <div class="header-item">{{item.name}}</div>
        <div class="header-item">{{item.value}}</div>
      </div>
    </div>
    <div class="second-row">
      <div class="table-body">
        <div class="header-item">月份</div>
        <div class="header-item">{{radio == 1 ? "用水量" : "定额"}}</div>
      </div>
      <div class="table-body" v-for="item in tableDataS">
        <div class="header-item">{{item.name}}</div>
        <div class="header-item">{{item.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "history-quota-table",
    data() {
      return {
        tableData: [
          {name: '一月',value: 1999},
          {name: '二月',value: 1999},
          {name: '三月',value: 1999},
          {name: '四月',value: 1999},
          {name: '五月',value: 1999},
          {name: '六月',value: 1999},
        ],
        tableDataS: [
          {name: '七月',value: 1999},
          {name: '八月',value: 1999},
          {name: '九月',value: 1999},
          {name: '十月',value: 1999},
          {name: '十一月',value: 1999},
          {name: '十二月',value: 1999},
        ],
      }
    },
    methods: {

    },created() {

    },
    props: {
      radio: {
        type: String,
        default: '1',
      }
    }
  }
</script>

<style scoped>
  .history-quota-table {height: 100%;width: 100%;display: flex;flex-flow: column;border: 1px solid #DEEBF7;padding: 10px}
  .first-row {height: calc(50% - 5px);width: 100%;display: flex;margin-bottom: 10px;justify-content: space-between;}
  .first-row .table-body {width: calc(14% - 7px);min-width: 100px;height: 100%;display: flex;flex-flow: column;justify-content: space-between;}
  .first-row .header-item {width: 100%;height: calc(50% - 5px);background-color: #DEEBF7;display: flex;justify-content: center;align-items: center;}
  .second-row {height: calc(50% - 5px);width: 100%;display: flex;justify-content: space-between;}
  .second-row .table-body {width: calc(14% - 7px);min-width: 100px;height: 100%;display: flex;flex-flow: column;justify-content: space-between;}
  .second-row .header-item {width: 100%;height: calc(50% - 5px);;background-color: #DEEBF7;display: flex;justify-content: center;align-items: center;}
</style>

