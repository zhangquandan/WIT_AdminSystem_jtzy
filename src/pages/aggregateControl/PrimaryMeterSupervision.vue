<template>
  <div class="flex">
    <div class="content body">
      <!--primary meter-->
      <div class="primary-meter box box-solid">
        <div class="box-header bg-aqua">一级水表监管</div>
        <div class="box-body">
          <primary-meter @link="link" @init="init"></primary-meter>
        </div>
      </div>
      <!--meterData-->
      <div class="meter-data box box-solid">
        <div class="box-header bg-aqua">{{meterName}}监测数据图表
          <el-button type="success" size="mini" icon="el-icon-download" @click="exportData">导出</el-button>
        </div>
        <div class="box-body">
          <radio-select v-if="meterId != 0" class="radio-select" @searchByTimes="searchByTimes"> </radio-select>
          <div class="meter-chart" v-loading="!show">
            <bar-chart-s v-if="show" :xData="xData" :yData="yData" :typeName="xName" :title="title"></bar-chart-s>
          </div>
          <div class="meter-table" v-loading="!showTable">
            <meter-table v-if="showTable" :tableData="tableData" :flowCount="flowCount" :compareCount="compareCount" :addCount="addCount"></meter-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import PrimaryMeter from "./primaryMeterSupervision/PrimaryMeter";
    import RadioSelect from "../../commons/RadioSelect";
    import BarChartS from "../../commons/BarChartS";
    import MeterTable from "./primaryMeterSupervision/MeterTable";
    import {export2Excel } from '../../js/utils';
    export default {
      components: {
        MeterTable,
        BarChartS,
        RadioSelect,
        PrimaryMeter},
      name: "primary-meter-supervision",
      data() {
        return {
          meterName: '',
          meterId: 0,
          start: '',
          end: '',
          compareStart: '',
          compareEnd: '',
          xData: [],
          yData: [],
          show: false,
          showTable: false,
          xName: '',
          title: '',
          type: 4,
          tableData: [],
          columns: [
            {name: '日期',prop: 'date'},
            {name: '累计水量',prop: 'total'},
            {name: '当前水量',prop: 'current'},
            {name: '同期水量',prop: 'samePeriod'},
            {name: '同比水量',prop: 'compare'},
          ],
          exportTable: [],
          flowCount: 0,
          compareCount: 0,
          addCount: 0,
        }
      },
      mounted() {

      },
      methods: {
        link(params) {
          this.meterName = params.name;
          this.meterId = params.id;
          this.findByType();
        },
        init(params) {
          this.meterName = params.name;
          this.meterId = params.id;
        },
        /*选择时间*/
        searchByTimes(params) {
          this.start = params.start;
          this.end = params.end;
          if(params.type == 2 || params.type == 3) {
            this.compareStart = params.compareStart;
            this.compareEnd = params.compareEnd;
          }
          this.type = params.type;
          this.findByType();
        },
        /*根据Type值确定访问接口类型*/
        findByType() {
          switch(this.type) {
            case 1: this.findFlowByYear();
              break;
            case 2: this.findFlowByMonth();
              break;
            case 3: this.findFlowByDay();
              break;
            case 4: this.findFlowByHour();
              break;
          }
        },
        /*根据年份查询水量及原始读数*/
        async findFlowByYear() {
          this.show = false;
          this.showTable= false;
          let params = {
            pageNum: 1,
            pageSize: 1000,
            watermeterid: this.meterId,
            startyy: this.start,
            endyy: this.end,
          }
          let data = await this.$api.waterMeterData.findTimesYearData(params);
          data = data && data.data && data.data.list && data.data.list.length > 0 ? data.data.list : false;
          let flow = await this.$api.waterMeterData.findTimesYearFlow(params);
          flow = flow && flow.data && flow.data.list && flow.data.list.length > 0 ? flow.data.list : false;
          this.title = flow[0].time + '至' + flow[flow.length - 1].time + '年水量图表';
          this.xName = '年';
          this.getChartsData(flow);
          this.getTableData(flow,data,[]);
        },
        /*根据月份查询水量及原始读数*/
        async findFlowByMonth() {
          this.show = false;
          this.showTable = false;
          let params = {
            pageNum: 1,
            pageSize: 1000,
            watermeterid: this.meterId,
            starttime: this.start,
            endtime: this.end
          }
          let data = await this.$api.waterMeterData.findTimesMonthData(params);
          data = data && data.data && data.data.list && data.data.list.length > 0 ? data.data.list : false;
          data ? data.shift() : false;
          let flow = await this.$api.waterMeterData.findTimesMonthFlow(params);
          flow = flow && flow.data && flow.data.list && flow.data.list.length > 0 ? flow.data.list : false;
          params.starttime = this.compareStart;
          params.endtime = this.compareEnd;
          let compareFlow = await this.$api.waterMeterData.findTimesMonthFlow(params);
          compareFlow = compareFlow && compareFlow.data && compareFlow.data.list && compareFlow.data.list.length > 0 ? compareFlow.data.list : false;
          this.title = flow[0].time + '至' + flow[flow.length - 1].time + '水量图表';
          this.xName = '月'
          this.getChartsData(flow);
          this.getTableData(flow,data,compareFlow);
        },
        /*根据日期查询水量及原始读数*/
        async findFlowByDay() {
          this.show = false;
          this.showTable = false;
          let params = {
            pageNum: 1,
            pageSize: 1000,
            watermeterid: this.meterId,
            starttime: this.start,
            endtime: this.end
          }
          let data = await this.$api.waterMeterData.findTimesDayData(params);
          data = data && data.data && data.data.list && data.data.list.length > 0 ? data.data.list : false;
          data ? data.shift() : false;
          let flow = await this.$api.waterMeterData.findTimesDayFlow(params);
          flow = flow && flow.data && flow.data.list && flow.data.list.length > 0 ? flow.data.list : false;
          params.starttime = this.compareStart;
          params.endtime = this.compareEnd;
          let compareFlow = await this.$api.waterMeterData.findTimesDayFlow(params);
          compareFlow = compareFlow && compareFlow.data && compareFlow.data.list && compareFlow.data.list.length > 0 ? compareFlow.data.list : false;
          this.title = flow[0].time + '至' + flow[flow.length - 1].time + '水量图表';;
          this.xName = '日';
          this.getChartsData(flow);
          this.getTableData(flow,data,compareFlow);
        },
        /*根据小时段查询水量及原始读数*/
        async findFlowByHour() {
          this.show = false;
          this.showTable= false;
          let params = {
            pageNum: 1,
            pageSize: 1000,
            watermeterid: this.meterId,
            starttime: this.start,
            endtime: this.end
          }
          let data = await this.$api.waterMeterData.findTimesHourData(params);
          data = data && data.data && data.data.list && data.data.list.length > 0 ? data.data.list : false;
          data ? data.shift() : false;
          let flow = await this.$api.waterMeterData.findTimesHourFlow(params);
          flow = flow && flow.data && flow.data.list && flow.data.list.length > 0 ? flow.data.list : false;
          this.title = flow[0].time + '至' + flow[flow.length - 1].time + '水量图表';
          this.xName = '时';
          this.getChartsData(flow);
            this.getTableData(flow,data,[]);
        },
        /*获取表格数据*/
        getTableData(flowData,data,compareFlow) {
          let tableData = [],exportTable = [],flow,compare,number,add,flowCount = 0,compareCount = 0,addCount = 0;
          if(flowData && this.type != 1 && this.type != 4) {
            flowData.forEach((item,index) => {
              number = data && data[index] ? data[index].readnumber.toFixed(1) : 0;
              flow = item.data ? item.data.toFixed(1) : 0;
              compare = compareFlow && compareFlow[index] ? compareFlow[index].data.toFixed(1) : 0;
              add = Number((Number(flow) - Number(compare)).toFixed(1));
              flowCount += Number(flow);
              compareCount += Number(compare);
              addCount += Number(add);
              tableData.push({date: item.time,total: number,current: flow,samePeriod: compare,compare: add});
              exportTable.push({date: item.time,total: number,current: flow,samePeriod: compare,compare: add});
            })
            exportTable.push({date: '合计',total: '--',current: flowCount,samePeriod: compareCount,compare: addCount});
            this.exportTable = exportTable;
            this.tableData = tableData;
            this.flowCount = flowCount.toFixed(1);
            this.compareCount = compareCount.toFixed(1);
            this.addCount = addCount.toFixed(1);
          }else {
            flowData.forEach((item,index) => {
              number = data && data[index] ? data[index].readnumber.toFixed(1) : 0;
              flow = item.data ? item.data.toFixed(1) : 0;
              flowCount += Number(flow);
              tableData.push({date: item.time,total: number,current: flow,samePeriod: '--',compare: '--'})
              exportTable.push({date: item.time,total: number,current: flow,samePeriod: '--',compare: '--'})
            })
            compareCount = '--';
            addCount = '--';
            exportTable.push({date: '合计',total: '--',current: flowCount,samePeriod: compareCount,compare: addCount});
            this.exportTable = exportTable;
            this.tableData = tableData;
            this.flowCount = flowCount.toFixed(1);
            this.compareCount = compareCount;
            this.addCount = addCount;
          }
          this.showTable = true;
        },
        /*获取柱形图数据*/
        getChartsData(flow) {
          let xData = [],yData = [];
          if(flow){
            flow.forEach(item => {
              xData.push(item.time);
              yData.push({value:item.data < 0 ? item.data*-1 : item.data,flag: item.data < 0});
            })
          }
          this.xData = xData;
          this.yData = yData;
          this.show = true;
        },
        /*报表导出*/
        exportData() {
          export2Excel(this.columns,this.exportTable,this.title);
        }
      }
    }
</script>

<style scoped>
  @import "../../../static/css/primaryMeterSupervision.css";
</style>
