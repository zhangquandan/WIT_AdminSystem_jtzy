<template>
  <div class="meter-table">
    <el-table ref="singleTable" border @row-click="rowClick" :row-class-name="rowClassName" :data="table" size="mini" height="100%" highlight-current-row> <!--:row-style="rowStyle"-->
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column show-overflow-tooltip v-for="(item,index) in tableColumn"
                       :label="item.name" :width="item.name == '安装地址' ? columnWidth : ''"
                       :prop="item.prop" :key="index" align="center" min-width="120"><!--:render-header="labelHead"-->
      </el-table-column>
      <el-table-column align="center" label="地图定位">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-location" @click="locateMeter(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
      name: "meters-table",
      data() {
        return {
          table: [],
          tableColumn: [
            {name: '名称',prop: 'name'},
            {name: '编号',prop: 'snumber'},
            {name: '通讯编号',prop: 'comno'},
            {name: '出厂编号',prop: 'productsn'},
            {name: '材质',prop: 'material'},
            {name: '规格',prop: 'dimension'},
            {name: '口径',prop: 'caliber'},
            {name: '安装地址',prop: 'setaddress'},
          ],
          columnWidth: '400px',
        }
      },
      mounted() {
        this.table = this.tableData;
        this.$refs.singleTable.setCurrentRow(this.table[0]);
      },
      props: {
        tableData: {
          type: Array
        },
        rowData: {
          type: Object
        },
      },
      watch: {
        tableData: {
          handler(newValue,oldValue){
            this.$refs.singleTable.setCurrentRow(newValue[0]);
            this.table = newValue;
            this.scrollTo(0);
          }
        },
        rowData: {
          handler(newValue,oldValue) {
            this.$refs.singleTable.setCurrentRow(newValue.row);
            let toIndex;
            this.tableData.forEach((item,index) => {
              if(item.id == newValue.row.id) {
                toIndex = index;
              }
            })
            this.scrollTo(toIndex);
          }
        }
      },
      methods: {
        rowClick(row,column,event) {
          let params = {row: row};
          this.$emit('rowClick',params);
        },
        rowClassName({row,rowIndex}) {
          return 'row_' + rowIndex;
        },
        scrollTo(index) {
          if(index != -1) {
            document.getElementsByClassName('row_' + index)[0].scrollIntoView();
          }
        },
        /*水表百度地图定位*/
        locateMeter(row){
          let info,lng,lat;
          this.$api.waterMeterInf.findOne(row.id).then(res => {
            info = res.name ;
            lng = res.tag.substring(1,res.tag.length-1).split(',')[0];
            lat = res.tag.substring(1,res.tag.length-1).split(',')[1];
            this.$router.push({
              path:'/TestGL',
              query:{
                marker : {lng:lng,lat:lat} ,
                info : info ,
              }
            })
          });
        }
      }
    }
</script>

<style scoped>
  .meter-table {height: 100%;max-height: 100%;}
  .el-table {flex: 1;max-height: 100%;overflow: auto;}
</style>
