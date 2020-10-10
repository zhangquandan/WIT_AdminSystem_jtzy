<template>
  <div class="box box-solid second-second">
    <div class="box-header bg-aqua">节水概况与定额管理</div>
    <div class="box-body">
      <el-radio-group class="select-year" v-model="radio" size="mini" type="primary" @change="change">
        <el-radio-button label="1">今年</el-radio-button>
        <el-radio-button label="2">去年</el-radio-button>
      </el-radio-group>
      <div class="saving-inf" v-loading="!show">
        <div class="saving-survey">
          <saving-bar-chart-s v-if="show" :quota="quota" :usage="usage" :saving="saving"></saving-bar-chart-s>
        </div>
        <div class="saving-basic">
          <div class="saving-basic-inf"><span>{{savingInf.currentQuota}}吨</span><span>当年定额</span></div>
          <div class="saving-basic-inf"><span>{{savingInf.usage}}吨</span><span>已用累计</span></div>
          <div class="saving-basic-inf"><span>{{savingInf.saving == '--' ? '--' : savingInf.saving + '吨'}}</span><span>已用节水</span></div>
          <div class="saving-basic-inf"><span>{{savingInf.ratio == '--' ? '--' : savingInf.ratio + '%'}}</span><span>已用节水率</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import SavingBarChartS from "../../../commons/SavingBarChartS";

    export default {
      components: {SavingBarChartS},
      name: "center-right",
      data() {
        return {
          radio: '1',
          year: '',
          start: '',
          end: '',
          regionId: 1,
          quota: [],
          usage: [],
          saving: [],
          show: false,
          savingInf: {
            currentQuota: 0,
            usage: 0,
            saving: 0,
            ratio: '',
          }
        }
      },
      props: {
        time: {
          type: String
        }
      },
      watch: {
        time: {
          handler(newValue,oldValue) {
            this.year = newValue;
            this.getBasicData();
          }
        }
      },
      mounted() {
        let time = new Date();
        let yy = time.getFullYear();
        this.year = yy;
        this.start = yy + '-' + '01';
        this.end = Number(yy) + 1 + '-' + '01';
        this.getBasicData();
      },
      methods: {
        async getBasicData() {
          this.show = false;
          let yy = new Date().getFullYear();
          let year = this.year;
          let regionId = this.regionId;
          let quotaParams = {waterregionid: regionId,quotayear: year}
          let quota = await this.$api.waterRegionQuota.findAll(quotaParams);
          quota = quota && quota.data && quota.data.length > 0 ? quota.data[0] : [];
          let flowParams = {
            pageNum: 1,
            pageSize: 12,
            waterregionid: regionId,
            starttime: this.start,
            endtime: this.end
          }
          let flow = await this.$api.regionData.findTimesMonthFlow(flowParams);
          flow = flow && flow.data && flow.data.list && flow.data.list.length > 0 ? flow.data.list : [];
          flow.length > 0 && year == yy ? flow.pop() : flow;
          this.getSavingData(quota,flow);
        },
        getSavingData(quota,flow) {
          let name,quotaData,savingData,quotaY = [],flowY = [],saving = [];
          let quotaCount = 0,flowCount = 0,currentQuota = 0,usageSaving = 0,usageRatio,flag;
          for(var i = 0;i <= 11;i++) {
            let flowData = 0;
            name = 'm' + (i + 1);
            quotaData = quota && quota[name] ? Number(quota[name]) : 0;
            if(i < flow.length) {
              flowData = Number(flow[i].data);
              flowCount += flowData;
              quotaCount += quotaData;
            }
            currentQuota += quotaData;
            savingData = quotaData > 0 && flowData != 0 ? quotaData - flowData : 0;
            quotaY.push(quotaData);
            flowY.push(flowData);
            saving.push({
              value: savingData < 0 ? savingData*-1 : savingData,
              flag: savingData < 0
            })
          }
          flowCount = Number(flowCount.toFixed(0))
          usageSaving = quotaCount > 0 && flowCount != 0 ? quotaCount - flowCount : '--';
          usageRatio = quotaCount > 0 && typeof usageSaving == 'number' ? ((usageSaving/quotaCount)*100).toFixed(1) : '--';
          this.savingInf.currentQuota = currentQuota;
          this.savingInf.usage = flowCount;
          this.savingInf.saving = usageSaving;
          this.savingInf.ratio = usageRatio;
          this.quota = quotaY.map(item => item == 0 ? null : item);
          this.usage = flowY.map(item => item == 0 ? null : item);
          this.saving = saving.map(item => item.value != 0 ? {value: item.value.toFixed(1),flag: item.flag} : {value: null,flag: item.flag});
          this.show = true;
        },
        change() {
          let time = new Date();
          let yy = time.getFullYear();
          switch(this.radio) {
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
      },
    }
</script>

<style scoped>
  @import "../../../../static/css/waterSurey.css";
  .box {margin-bottom: 7px;}
</style>
