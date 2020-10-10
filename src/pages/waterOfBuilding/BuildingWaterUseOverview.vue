<!--建筑用水概况-->
<template>
  <div class="flex">
    <div class="content body">
      <!--first row-->
      <div class="row first-row">
        <div class="col-xs-3">
          <div class="box box-solid basic">
            <div class="box-header bg-aqua">
              建筑基本信息
            </div>
            <div class="box-body">
              <select-building @change="change" :buildingId="buildingId"></select-building>
              <div class="basic-inf">
                <basic-inf ref="basicInfo"></basic-inf>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-9">
          <div class="box box-solid meter">
            <div class="box-header bg-aqua">
              建筑一级监控水表
            </div>
            <div class="box-body">
              <div class="meter-inf">
                <meter-inf ref="meterInfo"></meter-inf>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--second row-->
      <div class="row second-row">
        <div class="col-xs-3">
          <div class="water-index">
            <div class="box box-solid">
              <div class="box-header bg-aqua">
                主要用水指标
              </div>
              <div class="box-body">
                <div class="select-date">
                  <radio-group1 @radioChange="radioChange" :radioData="dateRadio"></radio-group1>
                </div>
                <div class="index-data">
                  <water-index ref="flowInfo"></water-index>
                </div>
              </div>
            </div>
          </div>
          <div class="image">
            <div class="box box-solid">
              <div class="box-header bg-aqua">
                建筑影像
              </div>
              <div class="box-body">
                <el-carousel indicator-position="inside" height="100%">
                  <el-carousel-item :key="item.id" v-for="item in imageData">
                    <img :src="item.image" alt="暂无图片" class="carousel_image_type">
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-9">
          <div class="box box-solid quota">
            <div class="box-header bg-aqua">
              节水概况与定额管理
            </div>
            <div class="box-body" v-loading="!show">
              <div class="quota-date">
                <el-radio-group size="mini" v-model="quotaRadio" @change="changeYear">
                  <el-radio-button label="1">今年</el-radio-button>
                  <el-radio-button label="2">去年</el-radio-button>
                </el-radio-group>
                <el-button size="mini" type="success" icon="el-icon-download" @click="exportData">导出</el-button>
              </div>
              <div class="quota-table">
                <quota-table v-if="show" :tableData="tableData"></quota-table>
              </div>
              <div class="quota-chart">
                <quota-chart v-if="show" :savingInf="savingInf" :quota="quota" :usage="usage" :saving="saving"></quota-chart>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--second row/-->
    </div>
  </div>
</template>

<script>
  import SelectBuilding from "../../commons/SelectBuilding";
  import BasicInf from "./buildingWaterUseOverview/BasicInf";
  import MeterInf from "./buildingWaterUseOverview/MeterInf";
  import WaterIndex from "./buildingWaterUseOverview/WaterIndex";
  import QuotaTable from "./buildingWaterUseOverview/QuotaTable";
  import QuotaChart from "./buildingWaterUseOverview/QuotaChart";
  import RadioGroup1 from "../../commons/RadioGroup1";
  import {export2Excel } from '../../js/utils'

  export default {
    components: {
      QuotaChart,
      QuotaTable,
      WaterIndex,
      MeterInf,
      BasicInf,
      SelectBuilding,
      RadioGroup1,
    },
    name: "building-water-use-overview",
    data() {
      return {
        dateRadio: 1,
        quotaRadio: 1,
        buildingId:137,
        imageData:[],
        savingInf: {},
        quota: [],
        usage: [],
        saving: [],
        show: false,
        year: new Date().getFullYear(),
        start: '',
        end: '',
        columns: [
          {name: '月份',prop:'name'},
          {name: '01',prop:'1'},
          {name: '02',prop:'2'},
          {name: '03',prop:'3'},
          {name: '04',prop:'4'},
          {name: '05',prop:'5'},
          {name: '06',prop:'6'},
          {name: '07',prop:'7'},
          {name: '08',prop:'8'},
          {name: '09',prop:'9'},
          {name: '10',prop:'10'},
          {name: '11',prop:'11'},
          {name: '12',prop:'12'},
          {name: '已用累计',prop:'count'},
        ],
        tableData: [],
        title: '建筑节水概况与定额管理'
      }
    },
    created() {
      let param = this.$route.query ;
      if(param.buildingId !== undefined){
        this.buildingId = param.buildingId;
      }
      let params = this.$route.params;
      if(params.id) {
        this.buildingId = params.id;
      }
    },
    mounted(){
      this.$refs.basicInfo.refreshBasic(this.buildingId);
      this.$refs.meterInfo.refreshWaterMeter(this.buildingId);
      this.$refs.flowInfo.initialize(this.buildingId);
      this.getBuildingPic();
      let time = new Date();
      let yy = time.getFullYear();
      this.year = yy;
      this.start = yy + '-' + '01';
      this.end = Number(yy) + 1 + '-' + '01';
      this.getBasicData();
    },
    methods:{
      /*报表导出*/
      exportData() {
        export2Excel(this.columns,this.tableData,this.title);
      },
      /*今年/去年*/
      changeYear() {
        let time = new Date();
        let yy = time.getFullYear();
        switch(this.quotaRadio) {
          case '1' : yy = yy;
            break;
          case '2' : yy -= 1;
            break;
        }
        this.year = yy;
        this.start = yy + '-' + '01';
        this.end = Number(yy) + 1 + '-' + '01';
        this.getBasicData();
      },
      async getBasicData() {
        this.show = false;
        let yy = new Date().getFullYear();
        let year = this.year;
        let buildingId = this.buildingId;
        let quotaParams = {buildingid: buildingId,quotayear: year}
        let quota = await this.$api.buildingQuota.findAll(quotaParams);
        quota = quota && quota.data && quota.data.length > 0 ? quota.data[0] : [];
        let flowParams = {
          pageNum: 1,
          pageSize: 12,
          buildingid: buildingId,
          starttime: this.start,
          endtime: this.end
        }
        let flow = await this.$api.buildingData.findTimesMonthFlow(flowParams);
        flow = flow && flow.data && flow.data.list && flow.data.list.length > 0 ? flow.data.list : [];
        flow.length > 0 && year == yy ? flow.pop() : flow;
        this.getSavingData(quota,flow);
      },
      getSavingData(quota,flow) {
        let name,columnName,quotaData,savingData,tableSaving,quotaY = [],flowY = [],saving = [];
        let tableData = [{name: '用量'},{name: '定额'},{name: '节水'}];
        let quotaCount = 0,flowCount = 0,currentQuota = 0,usageSaving = 0,usageRatio,flag;
        for(var i = 0;i <= 11;i++) {
          let flowData = 0;
          name = 'm' + (i + 1);
          columnName = i + 1 + '';
          quotaData = quota && quota[name] ? Number(quota[name]).toFixed(0) : 0;
          if(i < flow.length) {
            flowData = Number(flow[i].data).toFixed(0);
            flowCount += Number(flowData);
            quotaCount += Number(quotaData);
          }
          tableData[0][columnName] = flowData == 0 ? '--' : flowData;
          tableData[1][columnName] = quotaData;
          currentQuota += Number(quotaData);
          savingData = quotaData > 0 && flowData != 0 ? quotaData - flowData : 0;
          tableSaving = quotaData > 0 && flowData != 0 ? quotaData - flowData : '--';
          tableData[2][columnName] = tableSaving;
          quotaY.push(quotaData);
          flowY.push(flowData);
          saving.push({
            value: savingData < 0 ? savingData*-1 : savingData,
            flag: savingData < 0
          })
        }
        flowCount = Number(flowCount).toFixed(0)
        usageSaving = quotaCount > 0 && flowCount != 0 ? quotaCount - flowCount : '--';
        usageRatio = quotaCount > 0 && typeof usageSaving == 'number' ? ((usageSaving/quotaCount)*100).toFixed(1) : '--';
        tableData[0].count = flowCount;
        tableData[1].count = quotaCount;
        tableData[2].count = usageSaving;
        this.tableData = tableData;
        this.savingInf.currentQuota = currentQuota;
        this.savingInf.usage = flowCount;
        this.savingInf.saving = usageSaving;
        this.savingInf.ratio = usageRatio;
        this.quota = quotaY.map(item => item == 0 ? null : item);
        this.usage = flowY.map(item => item == 0 ? null : item);
        this.saving = saving.map(item => item.value != 0 ? {value: item.value,flag: item.flag} : {value: null,flag: item.flag});
        this.show = true;
      },
      /*获取建筑图片*/
      getBuildingPic(){
        this.imageData = [];
        let params = {
          buildingid:this.buildingId
        };
        this.$api.buildingPic.findById(params).then(res => {
          if(res == null || res === ''){
            this.imageData.push({
              id:'',
              image:''
            });
          }else{
            res.forEach((item)=>{
              item.image = "data:image/jpg;base64,"+item.image;
            });
            this.imageData = res ;
          }
        })
      },
      /*切换建筑查询所有信息*/
      change(params){
        this.buildingId = params.id ;
        this.$refs.basicInfo.refreshBasic(this.buildingId);
        this.$refs.meterInfo.refreshWaterMeter(this.buildingId);
        this.$refs.flowInfo.initialize(this.buildingId);
        this.getBuildingPic();
        this.dateRadio = 1 ;
        this.getBasicData();
      },
      /*切换选择固定时间查询建筑总用水量*/
      radioChange(params){
        this.dateRadio = params.radio ;
        let param = {
          starttime : params.starttime ,
          endtime : params.endtime ,
          buildingid : this.buildingId ,
          pageNum : 1 ,
          pageSize : 1 ,
        };
        if(params.type === 1){
          this.$refs.flowInfo.daysFlow(param);
        }else if(params.type === 2){
          this.$refs.flowInfo.monthsFlow(param);
        }else{
          let param1 = {
            startyy : params.starttime ,
            endyy : params.endtime ,
            buildingid : this.buildingId ,
            pageNum : 1 ,
            pageSize : 1 ,
          };
          this.$refs.flowInfo.yearsFlow(param1);
        }
      },
    }
  }
</script>

<style scoped>
  @import "../../../static/css/DMAWaterUseOverview.css";
  .carousel_image_type{
    height: 100%;
    width: 100%;
  }
</style>
