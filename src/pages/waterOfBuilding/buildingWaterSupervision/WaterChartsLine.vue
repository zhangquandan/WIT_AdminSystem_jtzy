<!--上部组件图表-->
<template>
  <div class="charts-line">
    <div class="line-left">
      <monitoring-chart v-if="show" :time="time" :current="current" :last="last"></monitoring-chart>
    </div>
    <div class="line-right">
      <div>
        <span>{{leakageData.addTotal ? leakageData.addTotal + '吨' : '--'}}</span><br>
        <span>当日周同比增量</span>
      </div>
      <div>
        <span>{{leakageData.addRangeTotal ? leakageData.addRangeTotal : '--'}}</span><br>
        <span>当日周同比增幅</span>
      </div>
      <div>
        <span>{{leakageData.addMin ? leakageData.addMin + '吨' : '--'}}</span><br>
        <span>当日周同比最小量增量</span>
      </div>
      <div>
        <span>{{leakageData.addRangeMin ? leakageData.addRangeMin : '--'}}</span><br>
        <span>当日周同比最小量增幅</span>
      </div>
    </div>
  </div>
</template>

<script>
  import MonitoringChart from "../../../commons/MonitoringChart";

  export default {
    components: {MonitoringChart},
    name: "water-charts-line",
    data() {
      return {
        current: [],
        last: [],
        time: [],
        show: false,
      }
    },
    mounted() {
      this.current = this.currentData;
      this.last = this.lastData;
      this.time = this.timeData;
      this.show = true;
      console.log()
    },
    props: {
      currentData: {
        type: Array,
      },
      lastData: {
        type: Array,
      },
      timeData: {
        type: Array,
      },
      leakageData: {
        type: Object,
      },
    },
    methods: {

    },
  }
</script>

<style scoped>
  .charts-line {flex: 1;width: 100%;display: inline-flex;}
  .line-left {height: 100%;flex: 1;display: flex;flex-flow: column;}
  .line-right {height: 100%;width: 12%;display: flex;flex-flow: column;justify-content: space-evenly;align-items: center;}
  .line-right div {height: 23%;background: #DEEBF7;width: 93%;display: flex;flex-flow:column;align-items: center;justify-content: center;}
</style>
