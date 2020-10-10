<!--用水趋势分析-->
<template>
  <div class="flex">
    <div class="content body">
      <div class=" box box-solid">
        <div class="box-header bg-aqua">用水趋势分析</div>
        <div class="box-body">
          <div class="select-date">
            <select-campus :regionId="regionId" @change="changeCampus"></select-campus>
            <trend-date class="trend-date" @searchTimes="searchTimes"></trend-date>
            <el-button type="success" size="mini" icon="el-icon-download" @click="exportData">导出</el-button>
          </div>
          <div class="trend-chart" v-loading="!show">
            <trend-chart v-if="show" :xData="xData" :yData="yData"></trend-chart>
          </div>
          <div class="trend-table" v-loading="!show">
            <trend-table v-if="show" :tableData="tableData"></trend-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import SelectCampus from "../../commons/SelectCampus";
    import TrendDate from "./waterUseTrendAnalysis/TrendDate";
    import TrendChart from "./waterUseTrendAnalysis/TrendChart";
    import TrendTable from "./waterUseTrendAnalysis/TrendTable";
    import {export2Excel } from '../../js/utils'

    export default {
      components: {
        TrendTable,
        TrendChart,
        TrendDate,
        SelectCampus},
      name: "water-use-trend-analysis",
      data() {
        return {
          regionId: 1,
          type: 1,
          start: '',
          end: '',
          xData: [],
          yData: [],
          xName: [],
          show: false,
          tableData: [],
          columns: [
            {name: '时间',prop:'date'},
            {name: '统计水量(吨)',prop:'total'},
            {name: '当前水量(吨)',prop:'current'},
          ],
          title: '用水趋势分析报表',
        }
      },
      methods: {
        /*选择校区*/
        changeCampus(params) {
          this.show = false;
          this.regionId = params.id;
          this.getDataByType();
        },
        /*选择数据分析*/
        searchTimes(params) {
          this.show = false;
          this.start = params.start;
          this.end = params.end;
          this.type = params.type;
          this.getDataByType();
        },
        /*根据type类型选择获取数据方法*/
        getDataByType() {
          if(this.type == 1) {
            this.xName = '月';
            this.getMonthData();
          }else if(this.type == 2) {
            this.xName = '日';
            this.getDayData();
          }else if(this.type == 3) {
            this.xName = '日';
            this.getWeekData();
          }
        },
        /*连续7日*/
        getWeekData() {
          let params = {
            pageNum: 1,
            pageSize: 1000,
            waterregionid: this.regionId,
            starttime: this.start,
            endtime: this.end
          };
          let start = 0,end = 7,xData = [],yData = [],tableData = [];
          this.$api.regionData.findTimesDayFlow(params).then(res => {
            let data = res.data.list;
            if(data instanceof Array && data.length > 0) {
              data = data.filter(item => item.data != 0);
              if(data.length > 7) {
                let first = data.slice(start,end);
                let count = 0,current;
                first.forEach(item => {
                  count += Number(item.data);
                });
                current = first[first.length - 1];
                tableData.push({date: current.time,total: Number(count).toFixed(0),current: Number(Number(current.data).toFixed(0))});
                xData.push(current.time);
                yData.push(count);
                for(let i = end; i < data.length ; i ++) {
                  count = Number(Number(count) - Number(data[start].data) + Number(data[end].data)).toFixed(0);
                  xData.push(data[end].time);
                  yData.push(count);
                  tableData.push({date: data[end].time,total: Number(count).toFixed(0),current: Number(Number(data[end].data).toFixed(0))});
                  start ++;
                  end ++;
                }
                this.tableData = tableData
                this.xData = xData;
                this.yData = yData;
                this.show = true;
              }else{
                this.$alert('提示','数据太少！')
                return;
              }
            }
          })
        },
        /*连续30日*/
        getDayData() {
          let params = {
            pageNum: 1,
            pageSize: 1000,
            waterregionid: this.regionId,
            starttime: this.start,
            endtime: this.end
          };
          let start = 0,end = 30,xData = [],yData = [],tableData = [];
          this.$api.regionData.findTimesDayFlow(params).then(res => {
            let data = res.data.list;
            if(data instanceof Array && data.length > 0) {
              data = data.filter(item => item.data != 0);
              if(data.length > 30) {
                let first = data.slice(start,end);
                let count = 0,current;
                first.forEach(item => {
                  count += Number(item.data);
                });
                current = first[first.length - 1];
                tableData.push({date: current.time,total: Number(count).toFixed(0),current: Number(Number(current.data).toFixed(0))});
                xData.push(current.time);
                yData.push(count);
                for(var i = end; i < data.length ; i ++) {
                  count = Number(Number(count) - Number(data[start].data) + Number(data[end].data)).toFixed(0);
                  xData.push(data[end].time);
                  yData.push(count);
                  tableData.push({date: data[end].time,total: Number(count).toFixed(0),current: Number(Number(data[end].data).toFixed(0))});
                  start ++;
                  end ++;
                }
                this.tableData = tableData;
                this.xData = xData;
                this.yData = yData;
                this.show = true;
              }else{
                this.$alert('提示','数据太少！');
                return;
              }
            }
          })
        },
        /*连续12个月*/
        getMonthData() {
          let params = {
            pageNum: 1,
            pageSize: 1000,
            waterregionid: this.regionId,
            starttime: this.start,
            endtime: this.end
          };
          let start = 0,end = 12,xData = [],yData = [],tableData = [];
          this.$api.regionData.findTimesMonthFlow(params).then(res => {
            let data = res.data.list;
            if(data instanceof Array && data.length > 0) {
              data = data.filter(item => item.data != 0);
              if(data.length > 12) {
                let first = data.slice(start,end);
                let count = 0,current;
                first.forEach(item => {
                  count += Number(item.data);
                });
                current = first[first.length - 1];
                tableData.push({date: current.time,total: Number(count).toFixed(0),current: Number(Number(current.data).toFixed(0))});
                xData.push(current.time);
                yData.push(count);
                for(let i = end; i < data.length ; i ++) {
                  count = Number(Number(count) - Number(data[start].data) + Number(data[end].data)).toFixed(0);
                  xData.push(data[end].time);
                  yData.push(count);
                  tableData.push({date: data[end].time,total: Number(count).toFixed(0),current: Number(Number(data[end].data).toFixed(0))});
                  start ++;
                  end ++;
                }
                this.tableData = tableData
                this.xData = xData;
                this.yData = yData;
                this.show = true;
              }else{
               this.$alert('提示','数据太少！')
                return;
              }
            }
          })
        },
        /*报表导出*/
        exportData() {
          export2Excel(this.columns,this.tableData,this.title);
        }
        /**/
      },
    }
</script>

<style scoped>
  @import "../../../static/css/waterUseTrendAnalysis.css";
</style>
