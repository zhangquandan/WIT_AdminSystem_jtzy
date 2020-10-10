<template>
  <div class="box box-solid third-second">
    <div class="box-body" v-loading="!show">
      <div class="using-survey">
        <bar-chart-s v-if="show" :title="title" :xData="xData" :yData="yData"></bar-chart-s>
      </div>
      <div class="using-basic">
        <div class="using-basic-inf">
          <span>{{typeof leakageData == 'object' && leakageData.addTotal ? leakageData.addTotal + '吨' : '--'}}</span>
          <span>当日周同比增量</span>
        </div>
        <div class="using-basic-inf">
          <span>{{typeof leakageData == 'object' && leakageData.addRangeTotal ? leakageData.addRangeTotal : '--'}}</span>
          <span>当日周同比增幅</span>
        </div>
        <div class="using-basic-inf">
          <span>{{typeof leakageData == 'object' && leakageData.addMin ? leakageData.addMin + '吨' : '--'}}</span>
          <span>当日周同比最小量增量</span>
        </div>
        <div class="using-basic-inf">
          <span>{{typeof leakageData == 'object' && leakageData.addRangeMin ? leakageData.addRangeMin : '--'}}</span>
          <span>当日周同比最小量增幅</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import BarChartS from "../../../commons/BarChartS";

    export default {
      components: {BarChartS},
      name: "bottom-right",
      data() {
        return {
          xData: [],
          yData: [],
          regionId: 1,
          leakageData: {},
          show: false,
          title: '',
        }
      },
      mounted() {
        this.getHourFlow();
        this.getLeakageIndex();
      },
      methods: {
        /*获取昨天开始前推72小时每时用水量*/
        getHourFlow() {
          let flow,xData = [],yData = [];
          let end = new Date(new Date().getTime() - 24 * 3600 * 1000);
          end = new Date(end.getFullYear(),end.getMonth(),end.getDate(),24);
          let start = new Date(end.getTime() - 72 * 3600 * 1000);
          let yy = end.getFullYear();
          let mm = end.getMonth() + 1;
          mm = mm < 10 ? '0' + mm : mm;
          let dd = end.getDate();
          dd = dd < 10 ? '0' + dd : dd;
          let hh = end.getHours();
          hh = hh < 10 ? '0' + hh : hh;
          end = yy + '-' + mm + '-' + dd + ' ' + hh;
          yy = start.getFullYear();
          mm = start.getMonth() + 1;
          mm = mm < 10 ? '0' + mm : mm;
          dd = start.getDate();
          dd = dd < 10 ? '0' + dd : dd;
          hh = start.getHours();
          hh = hh < 10 ? '0' + hh : hh;
          start = yy + '-' + mm + '-' + dd + ' ' + hh;
          let params = {
            pageNum: 1,
            pageSize: 1000,
            waterregionid: this.regionId,
            starttime: start,
            endtime: end,
          }
          this.$api.regionData.findTimesHourFlow(params).then(res => {
            flow = res.data && res.data.list && res.data.list.length > 0 ? res.data.list : [];
            if(typeof flow == 'object' && flow.length > 0) {
              flow.forEach(item => {
                xData.push(item.time);
                yData.push({
                  value: item.data < 0 ? item.data * -1 : item.data,
                  flag: item.data < 0,
                })
              })
              this.xData = xData;
              this.yData = yData;
              this.title = flow[0].time + '至' + flow[flow.length -1].time + '水量图表'
              this.show = true;
            }
          })
        },
        /*获取当前日期综合漏损指数参数*/
        getLeakageIndex() {
          let data;
          let time = new Date(new Date().getTime() - 24 * 3600 * 1000);
          let y = time.getFullYear();
          let m = time.getMonth() + 1;
          m = m < 10 ? '0' + m : m;
          let d = time.getDate();
          d = d < 10 ? '0' + d : d;
          let params = {
            waterregionid: this.regionId,
            time: y + '-' + m + '-' + d,
          };
          this.$api.regionData.findLeakageIndex(params).then(res => {
            data = res && res.data ? res.data : {};
            this.leakageData = data;
          })
        },

      },
    }
</script>

<style scoped>
  @import "../../../../static/css/waterSurey.css";
</style>
