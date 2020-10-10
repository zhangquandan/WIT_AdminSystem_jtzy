<template>
  <div class="son-meter-table">
    <select-custom-water-meter :type="meterType" :buttonName="subName" @selectWaterMeter="selectSub"></select-custom-water-meter>
    <el-table v-if="show" border :data="subData" height="100%" width="100%" size="mini" :header-row-style="rowStyle"  :row-style="rowStyle">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column v-for="(item,index) in tableColumn" :label="item.name"
                       :prop="item.prop" :key="index" align="center" min-width="150"><!--:render-header="labelHead"-->
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
            @click="subDelete(scope.row)">删除
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
      name: "son-meter-table",
      data() {
        return {
          tableColumn: [
            {name: '水表名称',prop: 'name'},
            {name: '水量(吨)',prop: 'flow'},
          ],
          subData: [],
          subName: '选择分表',
          state: [],
          show: true,
          meterType: 1,
        }
      },
      props: {
        subFlow: {
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
        subFlow: {
          handler(newValue,oldValue) {
            this.subData = newValue;
          }
        },
        subData: {
          handler(newValue,oldValue) {
            if(newValue.length > 0) {
              for(var i = 0;i < newValue.length;i ++) {
                this.state[i] = newValue[i].isin;
              }
            }
          }
        }
      },
      methods: {
        rowStyle({row,rowIndex}) {
          return 'height: 50px';
        },
        /*选择总表*/
        selectSub(params) {
          this.show = true;
          params.tableData.forEach((item) => {
            item.isin = true ;
          })
          this.subData = this.subData.concat(params.tableData) ;
          this.$emit('change',{tableData: this.subData});
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
        subDelete(row){
          let index;
          for(var i = 0 ; i < this.subData.length ; i++) {
            if (this.subData[i].id == row.id) {
              index = i;
            }
          }
          this.subData.splice(index,1);//index为元素在数组中的下标，1表示删除一个
          this.$emit('change',{tableData: this.subData});
        },
        /*改变流进流出状态*/
        changeIsIn(index) {
          this.subData[index].isin = this.state[index];
          this.$emit('change',{tableData: this.subData});
        },
      },
    }
</script>

<style scoped>
  /*.son-meter-table {flex: 1;max-height: 100%;background: green;}*/
  .son-meter-table {height: 100%;display: flex;flex-flow: column;}
  .el-talbe {flex: 1;}
</style>
