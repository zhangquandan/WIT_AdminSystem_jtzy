<!--水表最小流量监管-->
<template>
  <div class="flex">
    <div class="content body">
      <div class="box box-solid mini-charts">
        <div class="box-header bg-aqua">水表日最小流量监测图表</div>
        <div class="box-body" v-loading="!show">
          <div class="select-date">
            <select-meter :meterId="meterId" @change="selectMeter"></select-meter>
            <search-minimum-by-times @change="change" class="minimum"></search-minimum-by-times>
          </div>
          <div class="charts-line">
            <minimum-flow-line v-if="show" :xData="xData" :yData="yData"></minimum-flow-line>
          </div>
        </div>
      </div>
      <div class="box box-solid mini-table">
        <div class="box-header bg-aqua">水表日最小流量检测数据 <el-button type="success" size="mini" icon="el-icon-download" @click="exportData">导出</el-button></div>
        <div class="box-body">
          <div class="mini-table-data" v-loading="!tableShow">
            <minimum-table v-if="tableShow" :tableData="tableData"></minimum-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MinimumTable from "./minimumFlowMonitoring/MinimumTable";
  import { export2Excel } from '../../js/utils'
  import SelectMeter from "./SelectMeter";
  import SearchMinimumByTimes from "../../commons/SearchMinimumByTimes";
  import MinimumFlowLine from "../../commons/MinimumFlowLine";
  export default {
    components: {
      MinimumFlowLine,
      SearchMinimumByTimes,
      SelectMeter,
      MinimumTable,},
    name: "minimum-flow-monitoring",
    data() {
      return {
        columns: [
          {name: '日期',prop: 'date'},
          {name: '凌晨0-1',prop: 'first'},
          {name: '凌晨1-2',prop: 'second'},
          {name: '凌晨2-3',prop: 'third'},
          {name: '凌晨3-4',prop: 'fourth'},
        ],
        tableData: [],
        title: '水表日最小流量检测数据',
        startTime: '',
        endTime: '',
        meterId: 1,
        xData: [],
        yData: [],
        show: false,
        tableShow: false,
      }
    },
    created() {
      let param = this.$route.query ;
      if(param.waterMeterId !== undefined){
        this.meterId = param.waterMeterId;
      }
      let params = this.$route.params;
      if(params.id) {
        this.meterId = params.id;
      }
    },
    methods: {
      /*切换时间组件*/
      change(params) {
        this.show = false;
        this.tableShow = false;
        this.startTime = params.startTime;
        this.endTime = params.endTime;
        this.getMinimumInf();
      },
      /*选择水表*/
      selectMeter(params){
        this.show = false;
        this.tableShow = false;
        this.meterId = params.id;
        this.getMinimumInf();
      },
      /*根据时间段查询水表最小流量信息*/
      async getMinimumInf() {
        var params = {watermeterid: this.meterId,starttime: this.startTime,endtime: this.endTime};
        var minimum = await this.$api.waterMeterData.findTimesMinFlow(params)
        if(minimum.data && minimum.data.length > 0){
          this.getChartsData(minimum.data);
          this.getTableData(minimum.data);
        }else{
          this.show = true;
          this.tableShow = true;
          this.xData = [];
          this.yData = [];
          this.tableData = [];
        }
      },
      /*获取折线图数据*/
      getChartsData(data) {
        var xData = [],yData = [];
        if(data && typeof data == 'object' && data.length > 0) {
          data.forEach(item => {
            xData.push(item.time);
            yData.push(item.data.filter(val => val.status)[0].data)
          })
          this.xData = xData;
          this.yData = yData;
          this.show = true;
        }
      },
      /*获取表格数据*/
      getTableData(data) {
        var tableData = [];
        if(data && typeof data == 'object' && data.length > 0) {
          data.forEach(item => {
            tableData.push({date: item.time,first: item.data[0].data,second: item.data[1].data,third: item.data[2].data,fourth : item.data[3].data});
          })
          this.tableData = tableData;
          this.tableShow = true;
        }
      },
      exportData() {
        export2Excel(this.columns,this.tableData,this.title);
      }
    }
  }
</script>

<style scoped>
  @import "../../../static/css/minimumFlowMonitoring.css";
</style>
