<template>
    <div class="chart-box">
      <div class="chart-row">
        <div>
          <saving-bar-chart-s :quota="quotaData" :usage="usageData" :saving="savingData"></saving-bar-chart-s>
        </div>
      </div>
      <div class="count-row">
        <div>当年定额(吨)：{{basicInf.currentQuota}}</div>
        <div>已用累计(吨)：{{basicInf.usage}}</div>
        <div>已用节水(吨)：{{basicInf.saving}}</div>
        <div>已用节水率(%)：{{basicInf.ratio}}</div>
      </div>
    </div>
</template>

<script>
    import SavingBarChartS from "../../../commons/SavingBarChartS";

    export default {
      components: {SavingBarChartS},
      name: "quota-chart",
      data() {
        return {
          quotaData: [],
          usageData: [],
          savingData: [],
          basicInf: {},
        }
      },
      created() {
        this.quotaData = this.quota;
        this.usageData = this.usage;
        this.savingData = this.saving;
        this.basicInf = this.savingInf;
      },
      props: {
        quota: {
          type: Array
        },
        usage: {
          type: Array,
        },
        saving: {
          type: Array,
        },
        savingInf: {
          type: Object,
        }
      }
    }
</script>

<style scoped>
  .chart-box {height: 100%;display: flex;flex-flow: column;}
  .chart-row {flex: 1;}
  .chart-row > div{height: 100%;}
  .count-row {display: inline-flex;justify-content: space-evenly;}
  .count-row div {background: #cccccc;padding: 1px 5px;margin: 10px 0px; }
</style>
