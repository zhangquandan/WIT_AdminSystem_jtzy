<!--自定义平衡分析-->
<template>
  <div class="flex">
    <div class="content body">
      <!--left-->
      <div class="left">
        <!--top-left-->
        <div class="left-chart box box-solid">
          <div class="box-header bg-aqua">平衡选择</div>
          <div class="box-body">
            <div class="select-campus">
              <select-date @searchTimes="searchTimes"></select-date>
            </div>
            <div class="chart">
              <balance-chart v-if="show" :count="count" :chartData="chartData"></balance-chart>
            </div>
          </div>
        </div>
      </div>
      <!--right-->
      <div class="right">
        <!--right-bottom-->
        <div class="right-bottom box box-solid">
          <div class="box-header bg-aqua">
            <div class="son-meter" :class="{'nav-active' : active == 2}" @click = "changeType(2)">
              <div class="total-meter" @click.stop ="changeType(1)" :class="{'nav-active' : active == 1}">总表</div>
              <div class="title">分表</div>
            </div>
            <el-button type="success" size="mini" icon="el-icon-download"  @click="exportData(active)">导出</el-button>
          </div>
          <div class="box-body">
            <total-meter-table @change="totalChange" :type="regionId" :totalFlow="totalFlow" v-show="active == 1"></total-meter-table>
            <son-meter-table @change="subChange" :type="regionId" :subFlow="subFlow" v-show="active == 2"></son-meter-table>
          </div>
        </div>
        <!--right-top-->
        <div class="right-top box box-solid">
          <div class="box-header bg-aqua">平衡分析报表
            <el-button type="success" size="mini" icon="el-icon-download"  @click="exportBalance">导出</el-button>
          </div>
          <div class="box-body">
            <balance-table :tableData="flowData"></balance-table>
          </div>
        </div>
        <!---->
      </div>
    </div>
  </div>
</template>

<script>
  import BalanceTable from "./customBalance/BalanceTable";
  import BalanceChart from "./customBalance/BalanceChart";
  import TotalMeterTable from "./customBalance/TotalMeterTable";
  import SonMeterTable from "./customBalance/SonMeterTable";
  import SelectDate from "./SelectDate";
  import {export2Excel } from '../../js/utils'

  export default {
    components: {
      SelectDate,
      SonMeterTable,
      TotalMeterTable,
      BalanceChart,
      BalanceTable,
    },
    name: "custom-balance",
    data() {
      return {
        active: 1,
        totalName: '选择总表',
        subName: '选择分表',
        totalData: [],
        subData: [],
        flowData: [],
        titleData: [],
        chartData: [],
        startTime: '',
        endTime: '',
        totalFlow: [],
        subFlow: [],
        show: false,
        count: 0,
        regionId: 1,
        title: '',
        columns: [],
        exportTotal: [],
        exportSub: [],
      }
    },
    methods: {
      /*总表/分表报表导出*/
      exportData(type) {
        this.columns = [
          {name: '序号',prop: 'index'},
          {name: '水表名称',prop: 'name'},
          {name: '水量(吨)',prop: 'flow'},
          {name: '流进/流出',prop: 'isIn'}
          ]
        if(type == 1) {
          this.title = '总表';
          export2Excel(this.columns,this.exportTotal,this.title);
        }else {
          this.title = '分表';
          export2Excel(this.columns,this.exportSub,this.title);
        }
      },
      /*获取导出报表数据*/
      getExport(table) {
        let data;
        if(table instanceof Array && table.length > 0) {
          data = table.map((item,index) => {
            return {index: index + 1,name: item.name,flow: item.flow,isIn: item.isin ? '流进' : '流出'};
          })
        }
        return data;
      },
      /*漏损分析表报表导出*/
      exportBalance() {
        this.columns = [
          {name: '序号',prop: 'index'},
          {name: '名称',prop: 'category'},
          {name: '时段',prop: 'times'},
          {name: '水量(吨)',prop: 'data'},
          {name: '所占比例(%)',prop: 'ratio'},
        ]
        this.title = '平衡分析报表';
        export2Excel(this.columns,this.flowData,this.title);
      },
      /*选择校区*/
      changeCampus(params) {
        this.regionId = params.id;
      },
      changeType(type) {
        this.active = type;
      },
      /*选择总表*/
      totalChange(params) {
        this.show = false;
        this.totalData = params.tableData;
        this.exportTotal = this.getExport(this.totalData);
        this.flowData = [];
      },
      /*选择分表*/
      subChange(params) {
        this.show = false;
        this.subData = params.tableData;
        this.exportSub = this.getExport(this.subData);
        this.flowData = [];
      },
      /*选择时间*/
      searchTimes(params) {
        this.show = false;
        this.startTime = params.start;
        this.endTime = params.end;
        this.getFlow();
      },
      /*获取用水数据*/
      getFlow(){
        let total = this.totalData ;
        let sub = this.subData ;
        let flowData = [] ;
        let titleData = [] ;
        let chartData = [] ;
        let totalData = 0 ;
        let subData = 0 ;
        let totalArr = [] ;
        let subArr = [] ;
        let times = this.startTime+'~'+this.endTime ;
        if(total.length < 1 || sub.length < 1) {
          this.$alert('请选择总表或分表！','提示');
          return;
        }
        total.forEach((item)=> {
          let params = {
            starttime:this.startTime,
            endtime:this.endTime,
            watermeterid:item.id
          }
          this.$api.logWaterMeter.findTotalFlowInTwoTimes(params).then(res => {
            totalArr.push(res);
            if(res.msg == 'ok'){
              this.$set(item,'flow',res.data[0].data);
              console.log(res.data[0].data)
            }else{
              this.$set(item,'flow',0);
            }
            if(item.isin){
              totalData += res.data[0].data ;
            }else{
              totalData -= res.data[0].data ;
            }
            /*总表水量回去完后查询分表水量*/
            if(totalArr.length == total.length){
              this.count = Number(totalData).toFixed(0);
              flowData.push({
                index: 1,
                category:'总表',
                times:times,
                data:Number(totalData).toFixed(1),
                ratio:Number((totalData/totalData)*100).toFixed(1)
              })
              sub.forEach((item) => {
                let param = {
                  starttime:this.startTime,
                  endtime:this.endTime,
                  watermeterid:item.id
                }
                this.$api.logWaterMeter.findTotalFlowInTwoTimes(param).then(val => {
                  subArr.push(val);
                  if(val.msg == 'ok'){
                    this.$set(item,'flow',val.data[0].data);
                  }else{
                    this.$set(item,'flow',0);
                  }
                  if(item.isin){
                    subData += val.data[0].data ;
                  }else{
                    subData -= val.data[0].data ;
                  }
                  if(subArr.length == sub.length){
                    flowData.push({
                      index: 2,
                      category:'分表',
                      times: times,
                      data: Number(subData).toFixed(1),
                      ratio:((Number(subData)/Number(totalData))*100).toFixed(1)
                    })
                    flowData.push({
                      index: 3,
                      category:'漏耗',
                      times:times,
                      data:Number((Number(totalData) - Number(subData))).toFixed(1),
                      ratio:(((totalData-subData)/totalData)*100).toFixed(1)
                    })
                    titleData.push(flowData[1].category,flowData[2].category);
                    chartData.push({value:(totalData - subData).toFixed(1),name:flowData[2].category},{value:subData.toFixed(1),name:flowData[1].category});
                    this.count = Number(totalData).toFixed(0);
                    this.flowData = flowData ;
                    this.titleData = titleData;
                    this.chartData = chartData ;
                    this.totalFlow = total;
                    this.subFlow = sub;
                    this.exportTotal = this.getExport(total);
                    this.exportSub = this.getExport(sub)
                    this.show = true;
                  }
                })
              })
            }
          })
        })
      },
    },
  }
</script>

<style scoped>
  @import "../../../static/css/customBalance.css";
  /*.nav-active {background: red;z-index: 999;}*/
</style>
