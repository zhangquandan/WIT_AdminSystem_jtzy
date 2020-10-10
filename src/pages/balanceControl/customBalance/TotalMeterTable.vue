<template>
  <div class="total-meter-table">
    <select-custom-water-meter :type="meterType" :buttonName="totalName" @selectWaterMeter="selectTotal"></select-custom-water-meter>
    <el-table v-if="show" border :data="totalData" height="100%" width="100%" size="mini" :header-row-style="rowStyle"  :row-style="rowStyle">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column v-for="(item,index) in tableColumn" :label="item.name"
                       :prop="item.prop" :key="item.id" align="center" min-width="150">
      </el-table-column>
      <el-table-column
        prop=""
        align="center"
        label="流进/流出">
        <template slot-scope="scope">
          <h6 v-if="scope.row.isin">流进</h6>
          <h6 v-else style="color: deepskyblue;">流出</h6>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-switch
            @change="changeIsIn(scope.$index)"
            style="margin-right: 30px;"
            v-model = "state[scope.$index]"
            active-text=""
            inactive-text="">
          </el-switch>
          <el-button
            size="mini"
            icon="el-icon-delete"
            type="danger"
            @click="totalDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    import SelectCustomWaterMeter from "../../../commons/SelectCustomWaterMeter";
    export default {
      components: {SelectCustomWaterMeter},
      name: "total-meter-table",
      data() {
        return {
         totalData: [],
          state: [],
         tableColumn: [
           {name: '水表名称',prop: 'name'},
           {name: '水量(吨)',prop: 'flow'},
         ],
          totalName: '选择总表',
          show: true,
          meterType: 1,
        }
      },
      props: {
        totalFlow: {
          type: Array,
        },
        type: {
          type: Number,
        }
      },
      watch: {
        type: {
          handler(newValue,oldValue) {
            this.meterType = newValue;
          }
        },
        totalFlow: {
          handler(newValue,oldValue) {
            this.totalData = newValue;
          }
        },
        totalData: {
          handler(newValue,oldValue) {
            if(newValue.length > 0) {
              for(var i = 0;i < newValue.length;i ++) {
                this.state[i] = newValue[i].isin;
              }
            }
            this.$emit('change',{tableData: newValue})
          }
        }
      },
      methods: {
        rowStyle({row,rowIndex}) {
          return 'height: 50px';
        },
        /*选择总表*/
        selectTotal(params) {
          this.show = true;
          params.tableData.forEach((item) => {
            item.isin = true ;
          })
          this.totalData = this.totalData.concat(params.tableData) ;
          this.$emit('change',{tableData: this.totalData});
        },
        /*获取元素在数组中的下标*/
        getIndex(arr,id){
          for(var i = 0 ; i < arr.length ; i++){
            let index = -1 ;
            if(arr[i].id == id){
              index = i ;
            }
            return index ;
          }
        },
        /*删除总表*/
        totalDelete(row){
          let index;
          for(var i = 0 ; i < this.totalData.length ; i++) {
            if (this.totalData[i].id == row.id) {
              index = i;
            }
          }
          this.totalData.splice(index,1);//index为元素在数组中的下标，1表示删除一个
          this.$emit('change',{tableData: this.totalData});
        },
       /*改变流进流出状态*/
        changeIsIn(index) {
          this.totalData[index].isin = this.state[index];
          this.$emit('change',{tableData: this.totalData});
        },
      },
    }
</script>

<style scoped>
  /*.total-meter-table {flex: 1;max-height: 100%;background: green;}*/
  .total-meter-table {height: 100%;display: flex;flex-flow: column;}
  .el-table {flex: 1;}
</style>
