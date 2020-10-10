<template>
  <div class="balance-table">
    <el-table border :data="table" size="mini" height="100%" :header-row-style="rowStyle"  :row-style="rowStyle">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column v-for="(item,index) in tableColumn" :label="item.name" :width="item.name == '安装地址' ? columnWidth : ''"
                       :prop="item.prop" :key="index" align="center" min-width="120"><!--:render-header="labelHead"-->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "balance-table",
    data() {
      return {
        table: [],
        tableColumn: [
          {name: '名称',prop:'category'},
          {name: '时段',prop: 'times'},
          {name: '水量(吨)',prop:'data'},
          {name: '所占比例(%)',prop:'ratio'},
        ],
        rowHeight: '200px',
      }
    },
    props: {
      tableData: {
        type: Array,
      },
    },
    watch: {
      tableData: {
        handler(newValue,oldValue) {
          this.table = newValue;
        }
      }
    },
    methods: {
      rowStyle({row,rowIndex}) {
        return 'height: 50px';
      },

    },
    created() {

    },
  }
</script>

<style scoped>
  .balance-table {flex: 1;max-height: 100%;background: green;}
</style>
