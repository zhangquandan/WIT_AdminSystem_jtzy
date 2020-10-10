<template>
    <div class="type-table">
      <el-table border :data="table" size="mini" height="100%" :row-style="rowStyle">
        <el-table-column type="index" label="序号" width="100px" align="center">
        </el-table-column>
        <el-table-column v-for="(item,index) in tableColumn" :label="item.name"
                         :prop="item.prop" :key="index" align="center"><!--:render-header="labelHead"-->
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
      name: "type-table",
      data() {
        return {
          table: [
            {type: '场馆类建筑',flow: 1000,ratio: '12.7%'},
            {type: '食堂餐厅',flow: 200,ratio: '2.5%'},
            {type: '图书馆建筑',flow: 2000,ratio: '24.7%'},
            {type: '教学楼建筑',flow: 100,ratio: '1.2%'},
            {type: '实验室',flow: 1200,ratio: '14.8%'},
            {type: '学生宿舍',flow: 1500,ratio: '18.5%'},
            {type: '综合楼建筑',flow: 1800,ratio: '22.2%'},
            {type: '医院',flow: 300,ratio: '3.7%'},
            {type: '医院1',flow: 300,ratio: '3.7%'},
            {type: '医院2',flow: 300,ratio: '3.7%'},
            {type: '医院3',flow: 300,ratio: '3.7%'},
            {type: '医院4',flow: 300,ratio: '3.7%'},
            {type: '医院5',flow: 300,ratio: '3.7%'},
            {type: '医院6',flow: 300,ratio: '3.7%'},
            {type: '医院7',flow: 300,ratio: '3.7%'},
            {type: '医院8',flow: 300,ratio: '3.7%'},
            {type: '医院9',flow: 300,ratio: '3.7%'},
            {type: '医院10',flow: 300,ratio: '3.7%'},
          ],
          tableColumn: [
            {name: '建筑类型',prop: 'type'},
            {name: '总用水量(吨)',prop: 'flow'},
            {name: '所占比例(%)',prop: 'ratio'},
          ]
        }
      },
      props: {
        tableData: {
          type: Array,
        }
      },
      mounted() {
        this.table = this.tableData;
      },
      watch: {
        tableData: {
          handler(newValue,oldValue) {
            this.table = newValue;
          }
        }
      },
      methods: {
        /*表格行设置样式*/
        rowStyle({row,rowIndex}) {
          return 'height: 50px'
        }
      }
    }
</script>

<style scoped>
  .type-table {flex: 1;max-height: 100%;over-flow: auto;}
  .el-table {height: 100%;max-height: 100%;over-flow: auto;}
</style>
