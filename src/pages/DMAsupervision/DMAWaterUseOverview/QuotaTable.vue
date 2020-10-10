<template>
  <div class="quota-box">
    <el-table border :data="table" size="mini">
      <el-table-column v-for="(item,index) in tableColumn" :label="item.name"
                       :prop="item.prop" :key="index" align="center"><!--:render-header="labelHead"-->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "quota-table",
    data() {
      return {
        table: [{name: '用量'},{name: '定额'},{name: '节水'}],
        tableColumn: [
          {name: '月份',prop:'name'},
          {name: '01',prop:'1'},
          {name: '02',prop:'2'},
          {name: '03',prop:'3'},
          {name: '04',prop:'4'},
          {name: '05',prop:'5'},
          {name: '06',prop:'6'},
          {name: '07',prop:'7'},
          {name: '08',prop:'8'},
          {name: '09',prop:'9'},
          {name: '10',prop:'10'},
          {name: '11',prop:'11'},
          {name: '12',prop:'12'},
          {name: '已用累计',prop:'count'},
        ],
      }
    },
    created() {
      this.table = this.tableData;
    },
    props: {
      tableData: {
        type: Array,
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
