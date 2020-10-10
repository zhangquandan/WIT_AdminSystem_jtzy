<!--用水综合分类-->
<template>
  <div class="flex">
    <div class="content">
      <div class="row">
        <!--饼图-->
        <div class="col-xs-6">
          <div class="box box-solid">
            <div class="box-header bg-aqua">建筑用水综合分类饼图</div>
            <div class="box-body"  v-loading="!show">
              <trend-date @searchTimes="searchTimes"></trend-date>
              <div class="type-line">
                <type-pie-chart v-if="show" :text="text" :chartData="chartData"></type-pie-chart>
              </div>
            </div>
          </div>
        </div>
        <!--表格-->
        <div class="col-xs-6">
          <div class="box box-solid">
            <div class="box-header bg-aqua">
              建筑用水综合分类统计报表
              <el-button class="down-load" type="success" size="mini" icon="el-icon-download" @click="exportData">导出</el-button>
            </div>
            <div class="box-body" v-loading="!show">
              <type-table :tableData="tableData"></type-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import TypePieChart from "./waterUseClassify/TypePieChart";
    import TypeTable from "./waterUseClassify/TypeTable";
    import TrendDate from "./waterUseClassify/TrendDate";
    import {export2Excel } from '../../js/utils'

    export default {
      components: {
        TrendDate,
        TypeTable,
        TypePieChart},
      name: "water-use-classify",
      data() {
        return {
          radio: '1',
          chartData: [],
          tableData: [],
          text: '',
          show: false,
          columns: [
            {name: '序号',prop: 'index'},
            {name: '建筑类型',prop: 'type'},
            {name: '总用水量(吨)',prop: 'flow'},
            {name: '所占比例(%)',prop: 'ratio'},
          ],
          title: '建筑用水综合分类统计报表',
        }
      },
      methods: {
        /*选择时间*/
        searchTimes(params) {
          this.show = false;
          this.text = params.text;
          let data;
          if(params.type == 1) {
            this.$api.buildingInf.findCategoryFlowTwoTimes({starttime: params.start,endtime: params.end}).then(res => {
              data = res.data ? res.data : [];
              this.getChartsData(data);
              this.getTableData(data);
            })
          }else {
            this.$api.buildingInf.findCategoryFlowAnyYear({yy: params.yy}).then(res => {
              data = res.data ? res.data : [];
              this.getChartsData(data);
              this.getTableData(data);
            })
          }
        },
        /*获取表格数据*/
        getTableData(data) {
          data = data.filter(item => item.data != 0)
          let tableData = [],total = 0;
          if(data instanceof Array && data.length > 0) {
            data.forEach(item => {
              total += Number(item.data);
              tableData.push({type: item.name,flow: Number(item.data)})
            })
          }
          tableData = tableData.map((item,index) => {
            return {index: (index + 1),type: item.type,flow: item.flow.toFixed(1),ratio: Number((item.flow/total)*100).toFixed(1)}
          })
          this.tableData = tableData;
        },
        /*获取图形数据*/
        getChartsData(data) {
          data = data.filter(item => item.data != 0);
          let chart = [];
          if(data instanceof Array && data.length > 0) {
            chart = data.map(item => {
              return {name: item.name,value: item.data}
            })
          }
          this.chartData = chart;
          this.show = true;
        },
        /*报表导出*/
        /*报表导出*/
        exportData() {
          export2Excel(this.columns,this.tableData,this.title);
        },
      }
    }
</script>

<style scoped>
  @import "../../../static/css/waterUseClassify.css";
</style>
