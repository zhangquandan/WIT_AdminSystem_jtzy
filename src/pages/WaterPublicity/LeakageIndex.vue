<!--漏损指数概况-->
<template>
  <div class="flex">
    <div class="content body">
      <div class="box box-solid">
        <div class="box-header  bg-aqua">漏损指数概况</div>
        <div class="box-body" v-loading="!showTable">
          <div class="select-row">
            <search-by-day :time="time" @searchByDay="searchByDay"></search-by-day>
            <el-radio-group fill="#67C23A" size="small" v-model="radio" @change="change">
              <el-radio-button label="1">校区漏损</el-radio-button>
              <el-radio-button label="2">DMA漏损</el-radio-button>
              <el-radio-button label="3">建筑漏损</el-radio-button>
              <el-radio-button label="4">水表漏损</el-radio-button>
            </el-radio-group>
            <div>
              <el-button size="small" type="success" icon="el-icon-download" @click="exportData">导出</el-button>
            </div>
          </div>
          <div class="table-row">
            <el-table border :data="tableData" v-if="showTable" size="mini" height="100%" :default-sort = "{prop: 'leakageIndex', order: 'descending'}">
              <el-table-column
                type="index"
                label="序号">
              </el-table-column>
              <el-table-column
                prop="name"
                align="center"
                :label="titleName"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-link type="primary" @click="toSupervision(scope.row)">
                    {{scope.row.name}}
                  </el-link>
                </template>
              </el-table-column>
              <!--<el-table-column v-for="(item,index) in tableColumn" :label="item.name"
                               :prop="item.prop" :key="index" align="center"
                               show-overflow-tooltip>&lt;!&ndash;:render-header="labelHead"&ndash;&gt;
                &lt;!&ndash;<template slot-scope="scope" v-if="item.prop == 'jjjjjj'">
                  <el-button
                    size="mini"
                    icon="el-icon-location"
                    type="primary"
                    @click="toWaterSupervision(scope.row)">
                  </el-button>
                </template>&ndash;&gt;
              </el-table-column>-->
              <el-table-column align="center" sortable label="综合漏损指数" prop="leakageIndex">
              </el-table-column>
              <el-table-column align="center" sortable label="当日水量" prop="total">
              </el-table-column>
              <el-table-column align="center" sortable label="前周同期日水量" prop="beforeTotal">
              </el-table-column>
              <el-table-column align="center" sortable label="当日最小量" prop="min">
              </el-table-column>
              <el-table-column align="center" sortable label="前周同期日最小量" prop="beforeMin">
              </el-table-column>
              <el-table-column align="center" sortable label="日量周同比增量" prop="addTotal">
              </el-table-column>
              <el-table-column width="170" align="center" sortable label="日量周同比增幅(%)" prop="addRangeTotal">
              </el-table-column>
              <el-table-column align="center" sortable label="最小量周同比增量" prop="addMin">
              </el-table-column>
              <el-table-column width="170" align="center" sortable label="最小量同比增幅(%)" prop="addRangeMin">
              </el-table-column>
              <el-table-column v-if = buildingFlag align="center" label="地图定位">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" icon="el-icon-location" @click="locateBuilding(scope.row)"></el-button>
                </template>
              </el-table-column>
              <el-table-column v-if = meterFlag align="center" label="地图定位">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" icon="el-icon-location" @click="locateMeter(scope.row)"></el-button>
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
    import SearchByDay from "../../commons/SearchByDay";
    import { export2Excel } from '../../js/utils'
    export default {
      components: {SearchByDay},
      name: "leakage-index",
      data() {
        return {
          meterFlag: false,
          buildingFlag: false,
          showTable: false,
          time: '',
          radio: '1',
          tableData: [],
          titleName: '校区名称',
          tableColumn: [
            {name: '综合漏损指数',prop: 'leakageIndex'},
            {name: '当日水量',prop: 'total'},
            {name: '前周同期日水量',prop: 'beforeTotal'},
            {name: '当日最小量',prop: 'min'},
            {name: '前周同期日最小量',prop: 'beforeMin'},
            {name: '日量周同比增量',prop: 'addTotal'},
            {name: '日量周同比增幅',prop: 'addRangeTotal'},
            {name: '最小量周同比增量',prop: 'addMin'},
            {name: '最小量同比增幅',prop: 'addRangeMin'},
          ],
          columns: [
            {name: '序号',prop: 'index'},
            {name: '校区名称',prop: 'name'},
            {name: '综合漏损指数',prop: 'leakageIndex'},
            {name: '当日水量',prop: 'total'},
            {name: '前周同期日水量',prop: 'beforeTotal'},
            {name: '当日最小量',prop: 'min'},
            {name: '前周同期日最小量',prop: 'beforeMin'},
            {name: '日量周同比增量',prop: 'addTotal'},
            {name: '日量周同比增幅',prop: 'addRangeTotal'},
            {name: '最小量周同比增量',prop: 'addMin'},
            {name: '最小量同比增幅',prop: 'addRangeMin'},
          ],
          title: '校区漏损指数概况',
          url: 'CampusWaterSupervision',
        }
      },
      created() {
        var date = new Date(new Date().getTime() - 24*3600*1000);
        var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        this.time = time;
      },
      mounted() {
        this.changeRadio();
      },
      methods: {
        /*建筑百度地图定位*/
        locateBuilding(row){
          let info,lng,lat;
          this.$api.buildingInf.findOne(row.id).then(res => {
            info = res.name ;
            lng = res.tag.substring(1,res.tag.length-1).split(',')[0];
            lat = res.tag.substring(1,res.tag.length-1).split(',')[1];
            this.$router.push({
              path:'/BmapGL',
              query:{
                marker : {lng:lng,lat:lat} ,
                info : info ,
              }
            })
          });
        },
        /*水表百度地图定位*/
        locateMeter(row){
          let info,lng,lat;
          this.$api.waterMeterInf.findOne(row.id).then(res => {
            info = res.name ;
            lng = res.tag.substring(1,res.tag.length-1).split(',')[0];
            lat = res.tag.substring(1,res.tag.length-1).split(',')[1];
            this.$router.push({
              path:'/BmapGL',
              query:{
                marker : {lng:lng,lat:lat} ,
                info : info ,
              }
            })
          });
        },
        /*选择时间*/
        searchByDay(params) {
          this.time = params.valueOfDay;
          this.changeRadio();
        },
        /*通过radio判定调用某个方法*/
        changeRadio() {
          this.showTable = false;
          switch(this.radio) {
            case '1' : this.titleName = '校区名称';
                        this.title = '校区漏损指数概况';
                        this.url = 'CampusWaterSupervision';
                        this.tableData = [];
                        this.regionInf();
                        this.meterFlag = false ;
                        this.buildingFlag = false ;
              break;
            case '2' : this.titleName = 'DMA名称';
                        this.title = 'DMA漏损指数概况';
                        this.url = 'DMAWaterSupervision';
                        this.tableData = [];
                        this.regionInf();
                        this.meterFlag = false ;
                        this.buildingFlag = false ;
              break;
            case '3' : this.titleName = '建筑名称';
                        this.title = '建筑漏损指数概况';
                        this.url = 'BuildingWaterSupervision';
                        this.tableData = [];
                        this.buildingLeakageIndex();
                        this.meterFlag = false ;
                        this.buildingFlag = true ;
              break;
            default : this.titleName = '水表名称';
                       this.title = '水表漏损指数概况';
                       this.url = 'WaterUseSupervision';
                       this.tableData = [];
                       this.waterMeterLeakageIndex();
                        this.meterFlag = true ;
                        this.buildingFlag = false ;
          }
        },
        /*切换单选按钮*/
        change() {
          this.changeRadio();
        },
        /*区域信息*/
        async regionInf() {
          var region = await this.$api.regionInf.findAll();
          if(region) {
            if(this.radio == '1') {
              this.campusLeakageIndex(region);
            }else {
              this.dmaLeakageIndex(region);
            }
          }
        },
        /*校区漏损*/
        campusLeakageIndex(region) {
          if(typeof region == 'object' && region.length > 0) {
            var params,data,count = 0,tableData = [];
            region = region.filter(item => item.statisticstype == 'REGION');
            region.forEach((item,index) => {
              params = {waterregionid: item.id,time: this.time};
              this.$api.regionData.findLeakageIndex(params).then(res => {
                data = res.data;
                tableData = this.getTableData(item,index,tableData,data);
                count ++;
                if(count == region.length){
                  this.tableData = tableData.sort(this.compare('index'));
                  this.showTable = true;
                }
              })
            })
          }
        },
        /*DMA漏损*/
        async dmaLeakageIndex(region) {
          if(typeof region == 'object' && region.length > 0){
            var params,data,count = 0,tableData = [];
            region = region.filter(item => item.statisticstype == 'DMA');
            region.forEach((item,index) => {
              params = {waterregionid: item.id,time: this.time};
              this.$api.regionData.findLeakageIndex(params).then(res => {
                data = res.data;
                tableData = this.getTableData(item,index,tableData,data);
                count ++;
                if(count == region.length){
                  this.tableData = tableData.sort(this.compare('index'));
                  this.showTable = true;
                }
              })
            })
          }
        },
        /*建筑漏损*/
        async buildingLeakageIndex() {
          var building = await this.$api.buildingInf.findALL();
          if(building && typeof building == 'object' && building.length > 0) {
            var params,data,count = 0,tableData = [];
            building.forEach((item,index) => {
              params = {buildingid: item.id,time: this.time};
              this.$api.buildingData.findLeakageIndex(params).then(res => {
                data = res.data;
                tableData = this.getTableData(item,index,tableData,data);
                count ++;
                if(count == building.length){
                  this.tableData = tableData.sort(this.compare('index'));
                  this.showTable = true;
                }
              })
            })
          }
          /*var building = await this.$api.buildingData.findLeakageIndex()*/
        },
        /*水表漏损*/
        async waterMeterLeakageIndex() {
          var meters = await this.$api.waterMeterInf.findALL();
          if(meters && typeof meters == 'object' && meters.length > 0) {
            var params,data,count = 0,tableData = [];
            meters.forEach((item,index) => {
              params = {watermeterid: item.id,time: this.time};
              this.$api.waterMeterData.findLeakageIndex(params).then(res => {
                data = res.data;
                tableData = this.getTableData(item,index,tableData,data);
                count ++;
                if(count == meters.length){
                  this.tableData = tableData.sort(this.compare('index'));
                  this.showTable = true;
                }
              })
            })
          }
        },
        /*获取表格数据*/
        getTableData(item,index,tableData,data) {
          if(data) {
            tableData.push({
              index : index + 1,
              name : item.name,
              id: item.id,
              leakageIndex: Number(data.leakageIndex.toFixed(1)),
              total: Number(data.total.toFixed(1)),
              beforeTotal: Number((data.total - data.addTotal).toFixed(1)),
              min: Number(data.min.toFixed(1)),
              beforeMin: Number((data.min - data.addMin).toFixed(1)),
              addTotal: Number(data.addTotal.toFixed(1)),
              addMin: Number(data.addMin.toFixed(1)),
              addRangeTotal: Number((parseFloat(data.addRangeTotal)).toFixed(1)),
              addRangeMin: Number((parseFloat(data.addRangeMin)).toFixed(1)),
            })
          }
          return tableData;
        },
        /*跳转至对应的水量监管*/
        toWaterSupervision(row) {

        },
        /*刷新表格*/
        refreshTable() {
          this.showTable = true;
        },
        /*按序号排序*/
        compare(props) {
          return function(a,b) {
            return a[props] - b[props];
          }
        },
        /*报表导出*/
        exportData() {
          export2Excel(this.columns,this.tableData,this.title);
        },
        /*点击名称跳转至对应的水量监管页面*/
        toSupervision(row) {
          this.$router.push({
            name: this.url,
            params: {
              id: row.id
            }
          })
        },
      },
    }
</script>

<style scoped>
  @import "../../../static/css/leakageIndex.css";
</style>
