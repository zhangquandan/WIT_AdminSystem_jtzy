<!--水表运行监管-->
<template>
  <div class="flex">
    <div class="content body">
      <!--top-->
      <div class="meter-icon">
        <div class="box box-solid">
          <div class="box-header bg-aqua">水表用水监测图表</div>
          <div class="box-body">
            <!--选择水表和时间组件-->
            <div class="select-meter">
              <!--水表查询-->
              <el-input placeholder="请输入内容" size="mini" autofocus="true" v-model="input" clearable>
                <el-select v-model="select" slot="prepend" placeholder="查询水表">
                  <el-option label="名称" value="name"></el-option>
                  <el-option label="编号" value="snumber"></el-option>
                  <el-option label="通讯编号" value="comno"></el-option>
                  <el-option label="出厂编号" value="productsn"></el-option>
                  <el-option label="材质" value="material"></el-option>
                  <el-option label="规格" value="dimension"></el-option>
                  <el-option label="口径" value="caliber"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click.stop="search"></el-button>
              </el-input>
              <!--时间选择-->
              <el-radio-group v-model="radio" type="success" size="mini" @change="radioChange">
                <el-radio-button label="1">全部水表</el-radio-button>
                <el-radio-button label="2">在线水表</el-radio-button>
                <el-radio-button label="3">离线水表</el-radio-button>
              </el-radio-group>
              <!--了解更多-->
              <el-radio-group class="more" v-model="more" type="success" size="mini" @change="toOtherPage">
                <el-radio-button disabled> 更多了解>> </el-radio-button>
                <el-radio-button label="1">水表水量监控</el-radio-button>
                <el-radio-button label="2">水表最小流量监测</el-radio-button>
              </el-radio-group>
            </div>
            <!--水表简图展示-->
            <div class="show-meter">
              <meters @link="link" :metersData="metersData" :meterData="meterData"></meters>
            </div>
          </div>
        </div>
      </div>
      <!--bottom-->
      <div class="meter-table">
        <div class="box box-solid">
          <div class="box-header bg-aqua">
            水表基本详细
            <el-button class="down-load" type="success" size="mini" icon="el-icon-download" @click="exportData">导出</el-button>
          </div>
          <div class="box-body">
            <meters-table v-if="show" :rowData="rowData" :tableData="tableData" @rowClick="rowClick"></meters-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Meters from "./waterMeterOperationSupervision/Meters";
    import MetersTable from "./waterMeterOperationSupervision/MetersTable";
    import { export2Excel } from '../../js/utils'

    export default {
      components: {
        MetersTable,
        Meters},
      name: "water-meter-operation-supervision",
      data() {
        return {
          input: '',
          select: '',
          radio: '1',
          more: '0',
          metersData: [],
          meterData: {},
          tableData: [],
          rowData: {},
          selectData: [],
          show: false,
          toIndex: -1,
          count: 0,
          meterId: -1,
          title: '水表基本信息',
          tableColumn: [
            {name: '名称',prop: 'name'},
            {name: '编号',prop: 'snumber'},
            {name: '通讯编号',prop: 'comno'},
            {name: '出厂编号',prop: 'productsn'},
            {name: '材质',prop: 'material'},
            {name: '规格',prop: 'dimension'},
            {name: '口径',prop: 'caliber'},
            {name: '安装地址',prop: 'setaddress'},
          ],
        }
      },
      created() {
        this.getMetersInf();
      },
      methods: {
        /*点击选中某块水表*/
        link(params) {
          this.count ++;
          this.rowData = {row: params.row,count: this.count};
          this.meterId = params.row.id;
        },
        /*点击表格某行*/
        rowClick(params) {
          this.count ++;
          this.meterData = {row: params.row,count: this.count};
          this.meterId = params.row.id;
        },
        /*选择全部/在线/离线水表*/
        radioChange() {
          let data;
          switch(this.radio) {
            case '1' : data = this.selectData;
            break;
            case '2' : data = this.selectData.filter(item => item.isonline);
            break;
            case '3' : data = this.selectData.filter(item => !item.isonline);
            break;
          }
          this.metersData = data;
          this.tableData = data;
          this.meterId = data ? data[0].id : '';
        },
        /*页面跳转*/
        toOtherPage() {
          let name;
          switch(this.more) {
            case '1' : name = 'WaterUseSupervision';
            break;
            case '2' : name = 'MeterMinimumFlowMonitoring';
            break;
          }
          this.$router.push({
            name: name,
            params: {
              id : this.meterId
            }
          })
        },
        /*获取水表信息*/
        getMetersInf() {
          let data;
          this.$api.waterMeterInf.findALL().then(res => {
            data = res ? res : [];
            this.metersData = data;
            this.selectData = data;
            this.tableData = data;
            this.meterId = data ? data[0].id : '';
            this.show = true;
          })
        },
        /*水表查询*/
        search() {
          let name = this.select;
          let value = this.input;
          let params = {
            pageNum: 1,
            pageSize: 1000,
            name: name,
            value: value,
          };
          this.$api.waterMeterInf.searchWaterMeter(params).then(res => {
            this.metersData = res.data.list;
            this.tableData = res.data.list;
            this.meterId = res.data.list[0].id;
          })
        },
        exportData() {
          export2Excel(this.tableColumn,this.metersData,this.title);
        }
        /**/
      }
    }
</script>

<style scoped>
  @import "../../../static/css/waterMeterOperationSupervision.css";
</style>
