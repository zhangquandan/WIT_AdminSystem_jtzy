<template>
  <el-table v-if="show" border :data="tableData" size="mini" height="100%">
    <el-table-column v-for="(item,index) in tableColumn" :label="item.name"
                     :prop="item.prop" :key="index" align="center"
                     show-overflow-tooltip  min-width="100"><!--:render-header="labelHead"-->
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
      name: "table-data",
      data() {
        return {

        }
      },
      props: {
        tableColumn: {
          type: Array
        },
        tableData: {
          type: Array
        },
        show: {
          type: Boolean,
          default: false
        }
      }
    }
</script>

<style scoped>

</style>
