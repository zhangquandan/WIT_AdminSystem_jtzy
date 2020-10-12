<!--报警信息概况-->
<template>
  <div class="flex">
    <div class="content body">
      <div class="box box-solid">
        <div class="box-header bg-aqua">
          报警信息概况
        </div>
        <div class="box-body" v-loading="!show">
          <div class="select-row">
            <select-times @changeTimes="changeTimes"></select-times>
            <select-alarm-type :type="radioType" @changeType="changeType"></select-alarm-type>
            <select-status @changeStatus="changeStatus"></select-status>
            <div>
              <el-button type="success" size="small" icon="el-icon-download" @click="exportData">导出</el-button>
            </div>
          </div>
          <div class="table-row">
            <el-table v-if="show" border :data="tableData" size="mini" height="100%" :default-sort = "{prop: 'leakageIndex', order: 'descending'}">
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

              <el-table-column
                show-overflow-tooltip
                align="center"
                label="报警编号"
                prop="id">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="报警地址">
                <template slot-scope="scope">
                  <el-link type="primary" @click="toWaterSupervision(scope.row)">{{scope.row.address}}</el-link>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="报警时间"
                sortable
                prop="alarmTime">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="报警类型"
                prop="category">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                sortable
                label="综合漏损指数"
                width="130"
                prop="leakageIndex">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                sortable
                label="报警日水量"
                width="130"
                prop="totalQuantity">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                sortable
                label="日量周同比增量"
                width="150"
                prop="addTotal">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                sortable
                label="日量周同比增幅(%)"
                width="170"
                prop="addRangeTotal">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                sortable
                width="130"
                label="报警日最小量"
                prop="minQuantity">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                sortable
                label="最小量周同比增量"
                width="170"
                prop="addMin">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                sortable
                label="最小量周同比增幅(%)"
                width="170"
                prop="addRangeMin">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="处理状态"
                width="80"
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
              <el-table-column
                align="center"
                label="地图定位"
                width="80"
                prop="">
                <template slot-scope="scope">
                  <el-button :disabled="new Array('校区漏损','DMA漏损').indexOf(scope.row.category) > -1"
                             type="primary" size="mini" icon="el-icon-location" @click="link(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TimeFrame from "../../commons/TimeFrame";
  import SelectAlarmType from "./alarmMessage/SelectAlarmType";
  import SelectTimes from "./alarmMessage/SelectTimes";
  import SelectStatus from "./alarmMessage/SelectStatus";
  import { export2Excel } from '../../js/utils';

  export default {
    components: {
      SelectStatus,
      SelectTimes,
      SelectAlarmType,
      TimeFrame
    },
    name: "alarm-message",
    data() {
      return {
        isActive: true,
        noActive: false,
        start: '',
        end: '',
        type: '',
        radioType: '',
        disposalStatus: 1,
        show: false,
        tableData: [],
        title: '报警信息',
        flag: 0,
        columns: [
          {name: '报警编号',prop: 'id'},
          {name: '报警地址',prop: 'address'},
          {name: '报警时间',prop: 'alarmTime'},
          {name: '报警类型',prop: 'category'},
          {name: '综合漏损指数',prop: 'leakageIndex'},
          {name: '报警日水量',prop: 'totalQuantity'},
          {name: '日量周同比增量',prop: 'addTotal'},
          {name: '日量周同比增幅',prop: 'addRangeTotal'},
          {name: '报警日最小量',prop: 'minQuantity'},
          {name: '最小量周同比增量',prop: 'addMin'},
          {name: '最小量周同比增幅',prop: 'addRangeMin'},
          {name: '处理状态',prop: 'disposalStatus'},
          {name: '地图定位',prop: 'h'}
        ],
        name:'status',
        value:'2',
      }
    },
    mounted() {
      /*request("leakagelndex","login",{},function(res){
        localStorage.setItem("token",res.data.data);
      })*/
    },
    methods: {
      /*查询报警信息*/
      searchAlarm() {
        this.show = false;
        let params = {
          pageNum: 1,
          pageSize: 10000,
          category: this.type,
          disposalStatus: this.disposalStatus,
          startTime: this.start,
          endTime: this.end,
          name: this.name,
          value: this.value,
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
            /*if(item.status) {
              item.disposalStatus = item.status;
            }*/
            item.type = item.category;
            switch(item.category) {
              case '10': item.category = '表具漏损';
              break;
              case '20': item.category = '建筑漏损';
              break;
              case '30': item.category = 'DMA漏损';
              break;
              case '40': item.category = '校区漏损';
              break;
              case '50': item.category = '设备故障';
              break;
            }
            switch(item.disposalStatus) {
              case '1': item.disposalStatus = '待处理';
                break;
              case '2': item.disposalStatus = '√';
                break;
              case '3': item.disposalStatus = '×';
                item.flag = false;
                break;
            }
            item.addRangeTotal = item.addRangeTotal ? parseFloat(item.addRangeTotal) : '';
            item.addRangeMin = item.addRangeMin ? parseFloat(item.addRangeMin) : '';
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
      /*选择报警时间*/
      changeTimes(params) {
        let param = this.$route.params;
        if(this.flag === 0) {
          this.radioType = param.radio;
          this.type = param.type;
          this.flag = 1 ;
        }
        this.show = false;
        this.start = params.start;
        this.end = params.end;
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
      /*跳转至对应的水量监管*/
      toWaterSupervision(row) {
        let url = '';
        switch(row.type) {
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
      },
      /*报表导出*/
      exportData() {
        export2Excel(this.columns,this.tableData,this.title);
      },
      /*点击地图定位跳转*/
      link(row) {
        if(row.category == '建筑漏损'){
          let info,lng,lat;
          this.$api.buildingInf.findOne(row.id.substring(1,4)).then(res => {
            info = res.name ;
            lng = res.tag.substring(1,res.tag.length-1).split(',')[0];
            lat = res.tag.substring(1,res.tag.length-1).split(',')[1];
            this.$router.push({
              path:'/BmapGL',
              query:{
                marker : {lng:lng,lat:lat},
                info : info,
              }
            })
          });
        }else{
          let info,lng,lat;
          this.$api.waterMeterInf.findOne(row.id.substring(1,4)).then(res1 => {
            info = res1.name ;
            lng = res1.tag.substring(1,res1.tag.length-1).split(',')[0];
            lat = res1.tag.substring(1,res1.tag.length-1).split(',')[1];
            this.$router.push({
              path:'/BmapGL',
              query:{
                marker : {lng:lng,lat:lat} ,
                info : info ,
              }
            })
          });
        }
      },
    }
  }
</script>

<style scoped>
  @import "../../../static/css/alarmMessage.css";

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
