<!--维修表单总览-->
<template>
  <div class="flex">
    <div class="content body">
      <div class="box box-solid">
        <div class="box-header bg-aqua">维修表单总览</div>
        <div class="box-body" v-loading="!show">
          <div class="select-row">
            <select-times1 @changeTimes="changeTimes"></select-times1>
            <el-button type="primary" size="mini" icon="el-icon-download" @click="exportData">导出</el-button>
          </div>
          <div class="table-row">
            <el-table  v-if="show" border :data="tableData" size="mini" height="100%" :default-sort = "{prop: 'alarmTime', order: 'descending'} ">
              <el-table-column label="报警编号" prop="id" align="center" min-width="90">
              </el-table-column>
              <el-table-column label="报警地址" prop="address" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-link type="primary" @click="link(scope.row)">{{scope.row.address}}</el-link>
                </template>
              </el-table-column>
              <el-table-column label="报警时间" prop="alarmTime" width="140" align="center" sortable>
              </el-table-column>
              <el-table-column label="报警类型" prop="category" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.category == 10">水表报警</span>
                  <span v-if="scope.row.category == 20">建筑报警</span>
                  <span v-if="scope.row.category == 30">DMA报警</span>
                  <span v-if="scope.row.category == 40">区域报警</span>
                  <span v-if="scope.row.category == 50">设备报警</span>
                </template>
              </el-table-column>
              <el-table-column label="综合漏损指数" prop="leakageIndex" align="center" sortable>
                <template slot-scope="scope">
                  <el-popover
                    placement="bottom"
                    width="220"
                    trigger="hover">
                    <div class="index-message">
                      <div>报警日水量(吨)：{{scope.row.totalQuantity ? scope.row.totalQuantity : '--'}}</div>
                      <div>日量周同比增量(吨)：{{scope.row.addTotal ? scope.row.addTotal : '--'}}</div>
                      <div>日量周同比增幅：{{scope.row.addRangeTotal ? scope.row.addRangeTotal : '--'}}</div>
                      <div>报警日最小流量(吨)：{{scope.row.minQuantity ? scope.row.minQuantity : '--'}}</div>
                      <div>最小量周同比增量(吨)：{{scope.row.addMin ? scope.row.addMin : '--'}}</div>
                      <div>最小量周同比增幅：{{scope.row.addRangeMin ? scope.row.addRangeMin : '--'}}</div>
                    </div>
                    <el-link slot="reference" type="primary">{{scope.row.leakageIndex ? scope.row.leakageIndex : '--'}}</el-link>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="处理状态"
                prop="status">
                <template slot-scope="scope">
                  <el-popover
                    placement="bottom"
                    width="600"
                    trigger="hover">
                    <div class="box-title">
                      <div>预处理</div>
                      <div>派单人</div>
                      <div>出单人</div>
                      <div>出单验收人</div>
                      <div>转派单人</div>
                      <div>转派出单人</div>
                      <div>回单人</div>
                    </div>
                    <div class="box-content">
                      <div :class="[scope.row.disposalStatus != '待处理' ? 'green' : 'yellow']">{{scope.row.disposalStatus}}</div>
                      <div :class="[scope.row.dispatcher != '待处理' ? 'green' : 'yellow']">{{scope.row.dispatcher}}</div>
                      <div :class="[scope.row.disposaler != '待处理' ? 'green' : 'yellow']">{{scope.row.disposaler}}</div>
                      <div :class="[scope.row.disposalChecker != '待处理' ? 'green' : 'yellow']">{{scope.row.disposalChecker}}</div>
                      <div :class="[scope.row.transferer != '待处理' ? 'green' : 'yellow']">{{scope.row.transferer}}</div>
                      <div :class="[scope.row.transferDisposaler != '待处理' ? 'green' : 'yellow']">{{scope.row.transferDisposaler}}</div>
                      <div :class="[scope.row.checker != '待处理' ? 'green' : 'yellow']">{{scope.row.checker}}</div>
                    </div>
                    <el-link slot="reference" type="primary">{{scope.row.disposalStatus}}</el-link>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.category != '50'" type="success" size="mini" @click="alarmPrint(1,scope.row)">漏损勘察单</el-button>
                  <el-button v-if="scope.row.category != '50'" type="success" size="mini" @click="alarmPrint(2,scope.row)">维修转派单</el-button>
                  <el-button v-if="scope.row.category == '50'" type="success" size="mini" @click="alarmPrint(3,scope.row)">故障处理单</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--表格打印-->
            <print-dialog :alarmId="printId" :status="status" @changePrint="changePrint" :isOpen="isOpen"></print-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SelectTimes1 from "./alarmManagement/SelectTimes1";
  import PrintDialog from "./alarmManagement/PrintDialog";
  import { export2Excel } from '../../js/utils'

  export default {
    components: {
      PrintDialog,
      SelectTimes1
    },
    name: "repair-form-overview",
    data() {
      return {
        columns: [
          {name: '报警编号',prop: 'id'},
          {name: '报警地址',prop: 'address'},
          {name: '报警时间',prop: 'alarmTime'},
          {name: '报警类型',prop: 'reportContent'},
          {name: '综合漏损指数',prop: 'leakageIndex'},
          {name: '预处理',prop: 'disposalStatus'},
          {name: '派单人',prop: 'dispatcher'},
          {name: '出单人',prop: 'disposaler'},
          {name: '出单验收人',prop: 'disposalChecker'},
          {name: '转派单人',prop: 'transferer'},
          {name: '转派出单人',prop: 'transferDisposaler'},
          {name: '回单人',prop: 'checker'},
        ],
        title: '报警信息',
        start: '',
        end: '',
        type: '',
        show: false,
        flag: true,
        isOpen: false, //打印故障处理单等
        status: 0,
        printId: '',  // 要打印的报警ID
        name:'status',
        value:'1',
        disposalStatus: 2,
      }
    },
    methods: {
      /*查询报警信息*/
      searchAlarm() {
        this.show = false;
        let params = {
          pageNum: 1,
          pageSize: 10000,
          category: this.type,
          startTime: this.start,
          endTime: this.end,
          name: this.name,
          value: this.value,
          disposalStatus: this.disposalStatus,
        };
        let data = [];
        this.$api.alarm.findAll(params).then(res => {
          data = res.data.list;
          this.tableData = this.getTableData(data);
          this.show = true;
        })
      },
      /*处理tableData数据*/
      getTableData(data) {
        if(data instanceof Array && data.length > 0) {
          data.forEach(item => {
            item.flag = true;
            item.disposalStatus = '处理完成';
            if(item.flag && item.category != '50' && !item.status) {
              item.dispatcher = item.dispatcher ? item.dispatcher : '待处理';
              item.disposaler = item.disposaler ? item.disposaler : '待处理';
              item.disposalChecker = item.disposalChecker ? item.disposalChecker : '待处理';
              item.transferer = item.transferer ? item.transferer : '待处理';
              item.transferDisposaler = item.transferDisposaler ? item.transferDisposaler : '待处理';
              item.checker = item.checker ? item.checker : '待处理';
            }else if(item.flag && item.category == '50' && !item.status) {
              item.dispatcher = item.dispatcher ? item.dispatcher : '待处理';
              item.disposaler = item.disposaler ? item.disposaler : '待处理';
              item.disposalChecker = item.disposalChecker ? item.disposalChecker : '待处理';
              item.transferer = '无';
              item.transferDisposaler = '无';
              item.checker = '无';
            }else if(item.status) {
              item.dispatcher = item.dispatcher ? item.dispatcher : '无';
              item.disposaler = item.disposaler ? item.disposaler : '无';
              item.disposalChecker = item.disposalChecker ? item.disposalChecker : '无';
              item.transferer = item.transferer ? item.transferer : '无';
              item.transferDisposaler = item.transferDisposaler ? item.transferDisposaler : '无';
              item.checker = item.checker ? item.checker : '无';
            }else {
              item.dispatcher = '无';
              item.disposaler = '无';
              item.disposalChecker = '无';
              item.transferer = '无';
              item.transferDisposaler = '无';
              item.checker = '无';
            }
          })
        }
        return data;
      },
      /*选择时间区段*/
      changeTimes(params) {
        this.start = params.start;
        this.end = params.end;
        this.show = false;
        this.searchAlarm();
      },
      /*报警OA管理/打印单*/
      alarmPrint(type,row) {
        this.isOpen = true;
        this.status = type;
        this.printId = row.id;
      },
      /*是否开启打印弹窗*/
      changePrint(params) {
        this.isOpen = params.isOpen;
        this.status = 0;
      },
      /*报表导出*/
      exportData() {
        export2Excel(this.columns,this.tableData,this.title);
      },
      /*点击地址跳转*/
      link(row) {
        let url = '';
        switch(row.category) {
          case '10': url = 'WaterUseSupervision';
            break;
          case '20': url = 'BuildingWaterSupervision';
            break;
          case '30': url = 'DMAWaterSupervision';
            break;
          case '40': url = 'CampusWaterSupervision';
            break;
          case '50': url = 'WaterUseSupervision';
            break;
        }
        this.$router.push({
          name: url,
          params:{
            id : Number(row.id.substring(1,4))
          }
        })
      }
    },
  }
</script>

<style scoped>
  @import "../../../static/css/alarmOAManagement.css";
  .el-select {width: 100px;padding-bottom: 5px;padding-top:3px;}
  .yellow {background: yellow;height: 100%;width: 100%;}
  .green {background: green;height: 100%;width: 100%;color: white;}

  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 15%;
  }
  .redItem .el-form-item__label{
    color: #A0A0A0;
  }
  .el-divider {
    margin: 1px 0;
  }
</style>
