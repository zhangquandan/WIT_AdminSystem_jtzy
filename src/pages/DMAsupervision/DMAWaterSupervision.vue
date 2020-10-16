<!--DMA水量监管-->
<template>
  <div class="flex">
    <div class="content body">
      <div class="water-charts">
        <!--top-->
        <div class="box box-solid">
          <div class="box-header bg-aqua">DMA用水监测图表</div>
          <div class="box-body">
            <div class="water-charts-selectDate">
              <select-d-m-a :regionId="regionId" @change="link" class="dma"></select-d-m-a>
              <radio-select @searchByTimes="searchByTimes" class="radio-select"></radio-select>
            </div>
            <div class="water-charts-line" v-loading="!show">
              <water-charts-line v-if="show" :currentData="currentData" :lastData="lastData" :timeData="time" :leakageData="leakageIndexData"></water-charts-line>
            </div>
          </div>
        </div>
      </div>
      <!--bottom-->
      <div class="water-table">
        <div class="box box-solid">
          <div class="box-header bg-aqua">DMA用水监测数据<el-button size="mini" type="success" icon="el-icon-download" @click="exportData">导出</el-button></div>
          <div class="box-body">
            <div class="water-table-data" v-loading="!showTable">
              <water-table v-if="showTable" :tableData="tableData" :flowCount="flowCount" :compareCount="compareCount" :addCount="addCount"></water-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SelectDMA from "../../commons/SelectDMA";
  import RadioSelect from "../../commons/RadioSelect";
  import WaterChartsLine from "./DMAWaterSupervision/waterChartsLine";
  import WaterTable from "./DMAWaterSupervision/WaterTable";
  import {export2Excel } from '../../js/utils';

  export default {
    components: {
      WaterTable,
      WaterChartsLine,
      RadioSelect,
      SelectDMA},
    name: "d-m-a-water-supervision",
    data() {
      return {
        regionId: 2,
        start: '',
        end: '',
        compareStart: '',
        compareEnd: '',
        type: 4,
        currentData: [],
        lastData: [],
        tableData: [],
        exportTable: [],
        columns: [
          {name: '日期',prop: 'date'},
          {name: '累计水量',prop: 'total'},
          {name: '当前水量',prop: 'current'},
          {name: '同期水量',prop: 'samePeriod'},
          {name: '同比水量',prop: 'compare'},
        ],
        title: '校区用水监测数据',
        flowCount: '',
        compareCount: '',
        addCount: '',
        time: [],
        show: false,
        showTable: false,
        leakageIndexData: {},
      }
    },
    created() {
      let params = this.$route.params;
      if(params.id) {
        this.regionId = params.id;
      }
    },
    mounted() {
      this.getLeakageIndex();
    },
    methods: {
      /*选择校区*/
      link(params) {
        this.regionId = params.id;
        this.findByType();
        this.getLeakageIndex();
      },
      /*获取当前日期综合漏损指数参数*/
      getLeakageIndex() {
        let data,addTotal,addRatio,addMin,minRatio;
        let time = new Date(new Date().getTime() - 24 * 3600 * 1000);
        /*let time = new Date(new Date().getTime() - 3600 * 24 * 1000);*/
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = time.getDate();
        d = d < 10 ? '0' + d : d;
        time = y + '-' + m + '-' + d;
        let params = {
          waterregionid: this.regionId,
          time: y + '-' + m + '-' + d,
        }
        this.$api.regionData.findLeakageIndex(params).then(res => {
          data = res && res.data ? res.data : {};
          this.leakageIndexData = data;
        })
      },
      /*时间选择*/
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
      /*根据年份查询水量*/
      async findFlowByYear() {
        this.show = false;
        this.showTable = false;
        let params = {
          pageNum: 1,
          pageSize: 1000,
          waterregionid: this.regionId,
          startyy: this.start,
          endyy: this.end,
        }
        let data = await this.$api.regionData.findTimesYearData(params);
        data = data && data.data && data.data.list && data.data.list.length > 0 ? data.data.list : false;
        let flow = await this.$api.regionData.findTimesYearFlow(params);
        flow = flow && flow.data && flow.data.list && flow.data.list.length > 0 ? flow.data.list : false;
        this.getChartsData(flow,[]);
        this.getTableData(flow,data,[]);
      },
      /*根据月份查询水量*/
      async findFlowByMonth() {
        this.show = false;
        this.showTable = false;
        let params = {
          pageNum: 1,
          pageSize: 1000,
          waterregionid: this.regionId,
          starttime: this.start,
          endtime: this.end,
        }
        let data = await this.$api.regionData.findTimesMonthData(params);
        data = data && data.data && data.data.list && data.data.list.length > 0 ? data.data.list : false;
        data ? data.shift() : false;
        let flow = await this.$api.regionData.findTimesMonthFlow(params);
        flow = flow && flow.data && flow.data.list && flow.data.list.length > 0 ? flow.data.list : false;
        params.starttime = this.compareStart;
        params.endtime = this.compareEnd;
        let compare = await this.$api.regionData.findTimesMonthFlow(params);
        compare = compare && compare.data && compare.data.list && compare.data.list.length > 0 ? compare.data.list : false;
        this.getChartsData(flow,compare);
        this.getTableData(flow,data,compare);
      },
      /*根据日期查询水量*/
      async findFlowByDay() {
        this.show = false;
        this.showTable = false;
        let params = {
          pageNum: 1,
          pageSize: 1000,
          waterregionid: this.regionId,
          starttime: this.start,
          endtime: this.end,
        }
        let data = await this.$api.regionData.findTimesDayData(params);
        data = data && data.data && data.data.list && data.data.list.length > 0 ? data.data.list : [];
        data ? data.shift() : [];
        let flow = await this.$api.regionData.findTimesDayFlow(params);
        flow = flow && flow.data && flow.data.list && flow.data.list.length > 0 ? flow.data.list : [];
        params.starttime = this.compareStart;
        params.endtime = this.compareEnd;
        let compare = await this.$api.regionData.findTimesDayFlow(params);
        compare = compare && compare.data && compare.data.list && compare.data.list.length > 0 ? compare.data.list : [];
        this.getChartsData(flow,compare);
        this.getTableData(flow,data,compare);
      },
      /*根据小时查询水量*/
      async findFlowByHour() {
        this.show = false;
        this.showTable = false;
        let params = {
          pageNum: 1,
          pageSize: 1000,
          waterregionid: this.regionId,
          starttime: this.start,
          endtime: this.end,
        }
        let data = await this.$api.regionData.findTimesHourData(params);
        data = data && data.data && data.data.list && data.data.list.length > 0 ? data.data.list : false;
        data ? data.shift() : false;
        let flow = await this.$api.regionData.findTimesHourFlow(params);
        flow = flow && flow.data && flow.data.list && flow.data.list.length > 0 ? flow.data.list : false;
        this.getChartsData(flow,[]);
        this.getTableData(flow,data,[]);
      },
      /*获取折线图数据*/
      getChartsData(flow,compare) {
        let current = [],last = [],time = [];
        if(flow && this.type != 1 && this.type != 4) {
          flow.forEach((item,index) => {
            time.push(item.time);
            current.push(item.data);
            last.push(compare[index] ? compare[index].data : null);
          })
        }else {
          if(typeof flow == 'object' && flow.length > 0) {
            flow.forEach(item => {
              time.push(item.time);
              current.push(item.data)
            })
          }
        }
        this.currentData = current;
        this.lastData = last;
        this.time = time;
        this.show = true;
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
            tableData.push({date: item.time,total: '--',current: flow,samePeriod: compare,compare: add});
            exportTable.push({date: item.time,total: '--',current: flow,samePeriod: compare,compare: add});
          })
          exportTable.push({date: '合计',total: '--',current: flowCount,samePeriod: compareCount,compare: addCount});
        }else {
          if(typeof flowData == 'object' && flowData.length > 0) {
            flowData.forEach((item,index) => {
              number = data && data[index] ? data[index].readnumber.toFixed(1) : 0;
              flow = item.data ? item.data.toFixed(1) : 0;
              flowCount += Number(flow);
              tableData.push({date: item.time,total: '--',current: flow,samePeriod: '--',compare: '--'})
              exportTable.push({date: item.time,total: '--',current: flow,samePeriod: '--',compare: '--'})
            })
            compareCount = '--';
            addCount = '--';
            exportTable.push({date: '合计',total: '--',current: flowCount,samePeriod: compareCount,compare: addCount});
          }
        }
        this.exportTable = exportTable;
        this.tableData = tableData;
          this.flowCount = typeof parseFloat(flowCount) != 'number' ? '--' : Number(flowCount).toFixed(1);
          this.compareCount = typeof parseFloat(compareCount) != 'number' ? '--' : Number(compareCount).toFixed(1);
          this.addCount = typeof parseFloat(addCount) != 'number' ? '--' : Number(addCount).toFixed(1);
        this.showTable = true;
      },
      /*报表导出*/
      exportData() {
        export2Excel(this.columns,this.exportTable,this.title);
      }
    },
  }
</script>

<style scoped>
  @import "../../../static/css/DMAWaterSupervision.css";
</style>
