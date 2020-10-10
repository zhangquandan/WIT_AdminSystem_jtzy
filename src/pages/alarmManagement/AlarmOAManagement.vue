<!--报警OA管理-->
<template>
  <div class="flex">
    <div class="content body">
      <div class="box box-solid">
        <div class="box-header bg-aqua">报警OA管理</div>
        <div class="box-body" v-loading="!show">
          <div class="select-row">
            <select-times @changeTimes="changeTimes"></select-times>
            <select-alarm-type @changeType="changeType"></select-alarm-type>
            <select-status @changeStatus="changeStatus"></select-status>
            <el-button type="primary" size="mini" icon="el-icon-download" @click="exportData">导出</el-button>
          </div>
          <div class="table-row">
            <el-table  v-if="show" border :data="tableData" size="mini" height="100%" :default-sort = "{prop: 'alarmTime', order: 'descending'} ">
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <div v-for = "item in scope.row.childrenAlarm">
                    <el-form inline>
                      <el-form-item class="redItem" label="报警编号：">
                        <span style="color: #A0A0A0;">{{ item.id }}</span>
                      </el-form-item>
                      <el-form-item class="redItem" label="报警时间：">
                        <span style="color: #A0A0A0;">{{ item.alarmTime }}</span>
                      </el-form-item>
                      <el-form-item class="redItem" label="地址：">
                        <span style="color: #A0A0A0;">{{ item.address }}</span>
                      </el-form-item>
                      <el-form-item class="redItem" label="说明：">
                        <span style="color: #A0A0A0;">{{ item.reportContent }}</span>
                      </el-form-item>
                      <el-form-item class="redItem" label="综合指数：">
                        <span style="color: #A0A0A0;">{{item.leakageIndex==null ? "---" : item.leakageIndex}}</span>
                      </el-form-item>
                      <el-form-item class="redItem" label="日用水量：">
                        <span style="color: #A0A0A0;">{{item.totalQuantity==null ? "---" : item.totalQuantity}}</span>
                      </el-form-item>
                      <el-form-item class="redItem" label="日量周同比增量：">
                        <span style="color: #A0A0A0;">{{item.addTotal==null ? "---" : item.addTotal}}</span>
                      </el-form-item>
                      <el-form-item class="redItem" label="日量周同比增幅：">
                        <span style="color: #A0A0A0;">{{item.addRangeTotal==null ? "---" : item.addRangeTotal}}</span>
                      </el-form-item>
                      <el-form-item class="redItem" label="日最小流量：">
                        <span style="color: #A0A0A0;">{{item.minQuantity==null ? "---" : item.minQuantity}}</span>
                      </el-form-item>
                      <el-form-item class="redItem" label="最小量周同比增量：">
                        <span style="color: #A0A0A0;">{{item.addMin==null ? "---" : item.addMin}}</span>
                      </el-form-item>
                      <el-form-item class="redItem" label="最小量周同比增幅：">
                        <span style="color: #A0A0A0;">{{item.addRangeMin==null ? "---" : item.addRangeMin}}</span>
                      </el-form-item>
                    </el-form>
                    <el-divider></el-divider>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="报警编号" prop="id" align="center" min-width="90">
              </el-table-column>
              <el-table-column label="报警地址" prop="address" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-link type="primary" @click="link(scope.row)">{{scope.row.address}}</el-link>
                  <!--v-if="scope.row.category != '50'" <el-link v-if="scope.row.category == '50'">{{scope.row.address}}</el-link>-->
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
              <el-table-column label="综合漏损指数" prop="leakageIndex" width="140" align="center" sortable>
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
              <el-table-column label="预处理" prop="disposalStatus" align="center">
                <template slot-scope="scope">
                  <div :class="scope.row.disposalStatus == '待处理'? 'yellow' : 'green'">
                    {{scope.row.disposalStatus}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="派单人" prop="dispatcher" align="center">
                <template slot-scope="scope">
                  <div :class="scope.row.dispatcher == '待处理' ? 'yellow' : 'green'">
                    {{scope.row.dispatcher}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="出单人" prop="disposaler" align="center">
                <template slot-scope="scope">
                  <div :class="scope.row.disposaler == '待处理' ? 'yellow' : 'green'">
                    {{scope.row.disposaler}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="出单验收人" prop="disposalChecker" align="center">
                <template slot-scope="scope">
                  <div :class="scope.row.disposalChecker == '待处理' ? 'yellow' : 'green'">
                    {{scope.row.disposalChecker}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="转派单人" prop="transferer" align="center">
                <template slot-scope="scope">
                  <div :class="scope.row.transferer == '待处理' ? 'yellow' : 'green'">
                    {{scope.row.transferer}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="转派出单人" prop="transferDisposaler" align="center">
                <template slot-scope="scope">
                  <div :class="scope.row.transferDisposaler == '待处理' ? 'yellow' : 'green'">
                    {{scope.row.transferDisposaler}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="回单人" prop="checker" align="center">
                <template slot-scope="scope">
                  <div :class="scope.row.checker == '待处理' ? 'yellow' : 'green'">
                    {{scope.row.checker}}
                  </div>
                </template>
              </el-table-column>
            <el-table-column label="操作" align="center" width="240">
              <template slot-scope="scope">
                <el-select v-model="scope.row.disposalStatus" @change="change(scope.row)" size="mini" placeholder="预处理" :disabled="scope.row.disposalStatus != '待处理'">
                  <el-option label="需处理" value="2"></el-option>
                  <el-option label="无需处理" value="3"></el-option>
                </el-select>
                <el-popover
                  placement="bottom"
                  width="400"
                  trigger="click">
                  <div class="alarm-management">
                    <el-button v-if="scope.row.category != '50'" :disabled="scope.row.status" type="success" size="mini" @click="alarmHandle(scope.row)">报警信息处理</el-button>
                    <el-button v-if="scope.row.category != '50'" type="success" size="mini" @click="alarmPrint(1,scope.row)">漏损勘察单</el-button>
                    <el-button v-if="scope.row.category != '50'" type="success" size="mini" @click="alarmPrint(2,scope.row)">维修转派单</el-button>
                    <el-button v-if="scope.row.category == '50'" :disabled="scope.row.status" type="success" size="mini" @click="alarmHandle(scope.row)">报警信息处理</el-button>
                    <el-button v-if="scope.row.category == '50'" type="success" size="mini" @click="alarmPrint(3,scope.row)">故障处理单</el-button>
                  </div>
                  <el-button slot="reference"  type="primary" size="mini" :disabled="scope.row.disposalStatus == '×' || scope.row.disposalStatus == '待处理'" @click="openPrint">报警OA管理</el-button>
                </el-popover>
              </template>
            </el-table-column>
            </el-table>
            <!--表格打印-->
            <print-dialog :alarmId="printId" :status="status" @changePrint="changePrint" :isOpen="isOpen"></print-dialog>
            <!--勘察派单-->
            <survey-dispatch :userName="userName" :alarmId="dispatchFlag ? alarmId : ''" :dispatchFlag="dispatchFlag" @changeSurveyDispatch="changeSurveyDispatch"></survey-dispatch>
            <!--勘察出单-->
            <survey-sheet :userName="userName" :alarmId="sheetFlag ? alarmId : ''" :sheetFlag="sheetFlag" @changeSheetDispatch="changeSheetDispatch"></survey-sheet>
            <!--勘察回单-->
            <survey-receipt :userName="userName" :alarmId="receiptFlag ? alarmId : ''" :receiptFlag="receiptFlag" @changeSurveyReceipt="changeSurveyReceipt"></survey-receipt>
            <!--维修转派单-->
            <repair-transfer :userName="userName" :alarmId="repairTransferFlag ? alarmId : ''" @changeRepairTransfer="changeRepairTransfer" :repairTransferFlag="repairTransferFlag"></repair-transfer>
            <!--维修出单-->
            <repair-order :userName="userName" :alarmId="repairOrderFlag ? alarmId : ''" @changeRepairOrder="changeRepairOrder" :repairOrderFlag="repairOrderFlag"></repair-order>
            <!--维修回单-->
            <repair-receipt :userName="userName" :alarmId="repairReceiptFlag ? alarmId : ''" @changeRepairReceipt="changeRepairReceipt" :repairReceiptFlag="repairReceiptFlag"></repair-receipt>
            <!--故障处理派单-->
            <fault-dispatch :userName="userName" :alarmId="faultDispatchFlag ? alarmId : ''" @changeFaultDispatch="changeFaultDispatch" :faultDispatchFlag="faultDispatchFlag"></fault-dispatch>
            <!--故障处理出单-->
            <fault-order :userName="userName" :alarmId="faultOrderFlag ? alarmId : ''" @changeFaultOrder="changeFaultOrder" :faultOrderFlag="faultOrderFlag"></fault-order>
            <!--故障处理回单-->
            <fault-receipt :userName="userName" :alarmId="faultReceiptFlag ? alarmId : ''" @changeFaultReceipt="changeFaultReceipt" :faultReceiptFlag="faultReceiptFlag"></fault-receipt>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import SelectTimes from "./alarmManagement/SelectTimes";
    import SelectAlarmType from "./alarmManagement/SelectAlarmType";
    import PrintDialog from "./alarmManagement/PrintDialog";
    import SurveyDispatch from "./alarmManagement/SurveyDispatch";
    import SurveySheet from "./alarmManagement/SurveySheet";
    import SurveyReceipt from "./alarmManagement/SurveyReceipt";
    import RepairTransfer from "./alarmManagement/RepairTransfer";
    import RepairOrder from "./alarmManagement/RepairOrder";
    import RepairReceipt from "./alarmManagement/RepairReceipt";
    import FaultDispatch from "./alarmManagement/FaultDispatch";
    import FaultOrder from "./alarmManagement/FaultOrder";
    import FaultReceipt from "./alarmManagement/FaultReceipt";
    import { export2Excel } from '../../js/utils'
    import SelectStatus from "./alarmManagement/SelectStatus";

    export default {
      components: {
        SelectStatus,
        FaultReceipt,
        FaultOrder,
        FaultDispatch,
        RepairReceipt,
        RepairOrder,
        RepairTransfer,
        SurveyReceipt,
        SurveySheet,
        SurveyDispatch,
        PrintDialog,
        SelectAlarmType,
        SelectTimes
      },
      name: "alarm-o-a-management",
      data() {
        return {
          // tableData: [{id: 100010,address: '武昌校区',leakageIndex: '100'}],

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
          dispatchFlag: false, // 勘察派单
          sheetFlag: false, //勘察出单
          receiptFlag: false, //勘察回单
          repairTransferFlag: false, // 维修转派单
          repairOrderFlag: false, // 维修出单
          repairReceiptFlag: false, // 维修回单
          faultDispatchFlag: false, // 故障处理派单
          faultOrderFlag: false,  // 故障处理出单
          faultReceiptFlag: false,  //  故障处理回单
          alarmId: '', //要处理的单条报警信息
          printId: '',  // 要打印的报警ID
          userName: '', // 登陆用户名
          name:'status',
          value:'2',
          disposalStatus: 1,
        }
      },
      created() {
        this.userName = localStorage.getItem('userName');
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
            // data = this.tableData;
            this.tableData = this.getTableData(data);
            this.show = true;
          })
        },
        /*处理tableData数据*/
        getTableData(data) {
          if(data instanceof Array && data.length > 0) {
            data.forEach(item => {
              item.flag = true;
              /*if(item.status) {
                item.disposalStatus = item.status;
              }*/
              switch(item.disposalStatus) {
                case '1': item.disposalStatus = '待处理';
                  break;
                case '2': item.disposalStatus = '√';
                  break;
                case '3': item.disposalStatus = '×';
                          item.flag = false;
                  break;
              }
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
        change(row) {
          this.$confirm('此操作将修改该条报警信息的预处理状态, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            this.$api.alarm.updateStatus(this.qs.stringify({id: row.id,disposalStatus: row.disposalStatus})).then(res => {
              if(res.status == '200'){
                this.$message({
                  type: 'success',
                  message: '处理成功！'
                });
              }else{
                this.$message({
                  type: 'error',
                  message: '权限不足！'
                });
              }
              this.searchAlarm();
            }).catch(()=>{
              this.$message({
                type: 'info',
                message: '处理失败！'
              });
              this.searchAlarm();
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消处理'
            });
            this.searchAlarm();
          })
        },
        /*点击地址跳转至水量监管页面*/
        toWaterSupervision(row) {

        },
        /*选择时间区段*/
        changeTimes(params) {
          this.start = params.start;
          this.end = params.end;
          this.show = false;
          this.searchAlarm();
        },
        /*选择报警类型*/
        changeType(params) {
          this.type = params.type;
          this.show = false;
          this.searchAlarm();
        },
        /*选择报警信息处置状态*/
        changeStatus(params) {
          if(params.status === '2'){
            this.show = false;
            this.name = 'status';
            this.value = params.status;
            this.disposalStatus = 1;
            this.searchAlarm();
          }else if(params.status === '0' || params.status === '1'){
            this.show = false;
            this.name = 'status';
            this.value = params.status;
            this.disposalStatus = 2;
            this.searchAlarm();
          }else if(params.status === '3'){
            this.show = false;
            this.name = 'status';
            this.value = '1';
            this.disposalStatus = 3;
            this.searchAlarm();
          }
        },
        /*报警OA管理/报警信息处理*/
        alarmHandle(row) {
          //this.dispatchFlag = true;
          //this.sheetFlag = true;
          //this.receiptFlag = true;
          //this.repairTransferFlag = true;
          //this.repairOrderFlag = true;
          //this.repairReceiptFlag = true;
          //this.faultDispatchFlag = true;
          //this.faultOrderFlag = true; // 故障处理出单
          //this.faultReceiptFlag = true; // 故障处理回单
          this.alarmId = row.id;
          let type = row.processStatus;
          switch(type) {
            case '100': this.dispatchFlag = true; //勘察派单
            break;
            case '110': this.sheetFlag = true; //勘察出单
            break;
            case '120': this.receiptFlag = true; // 勘察回单
            break;
            case '200': this.repairTransferFlag = true; //维修转派单
            break;
            case '210': this.repairOrderFlag = true; // 维修出单
            break;
            case '220': this.repairReceiptFlag = true; // 维修回单
            break;
            case '300': this.faultDispatchFlag = true; // 故障处理派单
            break;
            case '310': this.faultOrderFlag = true; // 故障处理出单
            break;
            case '320': this.faultReceiptFlag = true; // 故障处理回单
            break;
          }
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
        },
        openPrint() {
          this.status = 0;
        },
        /*勘察派单*/
        changeSurveyDispatch(params) {
          this.dispatchFlag = params.dispatchFlag;
          if(params.type && params.type == 1) {
            this.searchAlarm();
          }
        },
        /*勘察出单*/
        changeSheetDispatch(params) {
          this.sheetFlag = params.sheetFlag;
          if(params.type && params.type == 1) {
            this.searchAlarm();
          }
        },
        /*勘察回单*/
        changeSurveyReceipt(params) {
          this.receiptFlag = params.receiptFlag;
          if(params.type && params.type == 1) {
            this.searchAlarm();
          }
        },
        /*维修转派单*/
        changeRepairTransfer(params) {
          this.repairTransferFlag = params.repairTransferFlag;
          if(params.type && params.type == 1) {
            this.searchAlarm();
          }
        },
        /*维修出单*/
        changeRepairOrder(params) {
          this.repairOrderFlag = params.repairOrderFlag;
          if(params.type && params.type == 1) {
            this.searchAlarm();
          }
        },
        /*维修回单*/
        changeRepairReceipt(params) {
          this.repairReceiptFlag = params.repairReceiptFlag;
          if(params.type && params.type == 1) {
            this.searchAlarm();
          }
        },
        /*故障处理派单*/
        changeFaultDispatch(params) {
          this.faultDispatchFlag = params.faultDispatchFlag;
          if(params.type && params.type == 1) {
            this.searchAlarm();
          }
        },
        /*故障处理出单*/
        changeFaultOrder(params) {
          this.faultOrderFlag = params.faultOrderFlag;
          if(params.type && params.type == 1) {
            this.searchAlarm();
          }
        },
        /*故障处理回单*/
        changeFaultReceipt(params) {
          this.faultReceiptFlag = params.faultReceiptFlag;
          if(params.type && params.type == 1) {
            this.searchAlarm();
          }
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
