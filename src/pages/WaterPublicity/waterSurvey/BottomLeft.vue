<template>
  <div class="box box-solid third-first">
    <div class="box-header bg-aqua">监控水表运行概况</div>
    <div class="box-body">
      <div class="meter-left">
        <pie-chart-s v-if="show"></pie-chart-s>
      </div>
      <div class="meter-right">
        <div class="meter-right-inf">
          <div><div></div></div>
          <div><div>在线水表</div></div>
          <div>{{onLine}}只</div>
          <div><div></div></div>
          <div><div>在线率</div></div>
          <div>{{onLineRate}}%</div>
          <div><div></div></div>
          <div><div>离线水表</div></div>
          <div>{{offLine}}只</div>
          <div><div></div></div>
          <div><div>离线率</div></div>
          <div>{{offLineRate}}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import PieChartS from "../../../commons/PieChartS";

    export default {
      components: {PieChartS},
      name: "bottom-left",
      data(){
        return {
          total: 0 ,
          onLine: 0 ,
          onLineRate: 0 ,
          offLine: 0 ,
          offLineRate: 0 ,
          show: false ,
        }
      },
      mounted(){
        this.getOnlineRate();
      },
      methods: {
        /*获取水表在线率*/
        getOnlineRate(){
          let params = {
            name : 'isonline',
            value : 1,
          };
          let params1 = {
            name : '',
            value : '',
          };
          this.$api.waterMeterInf.searchWaterMeter(params).then(res => {
            let a = res.data.total ;
            this.onLine = a ;
            this.$api.waterMeterInf.searchWaterMeter(params1).then(res1 => {
              let b = res1.data.total ;
              this.total = b ;
              this.offLine = b - this.onLine ;
              this.onLineRate = (a / b *100).toFixed(1) ;
              this.offLineRate = ((b-a) / b *100).toFixed(1) ;
              this.show = true ;
            });
          });
        },
      }
    }
</script>

<style scoped>
  @import "../../../../static/css/waterSurey.css";
</style>
