<template>
  <div style="height:100%;">
    <div id="totalChart" ref="div" style="height:100%;width:100%;"></div>
  </div>
</template>

<script>
  const echarts = require('echarts');
    export default {
        name: "total-monitoring-bar",
      data(){
        const getBox =_=> {
          let option = {
            color: ['#00fff6', '#006699', '#e5323e'],
            tooltip: {
              trigger: 'axis',
            },
            legend: {
              data: ['2017年用水量(吨)', '去年用水量(吨)', '今年用水量(吨)'],
              align: 'left'
            },
            toolbox: {
              right:30,
              feature: {
                saveAsImage: {}
              }
            },
            xAxis:
              {
                type: 'category',
                boundaryGap: false,
                data: ['2014', '2015', '2016', '2017', '2018']
              }
            ,
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '2017年用水量(吨)',
                type: 'line',
                data: [320, 332, 301, 334, 390]
              },
              {
                name: '去年用水量(吨)',
                type: 'line',
                data: [220, 182, 191, 234, 290]
              },
              {
                name: '今年用水量(吨)',
                type: 'line',
                data: [150, 232, 201, 154, 190]
              }
            ]
          };
          return option ;
        }
        return {
          options:getBox(),
        }
      },
      props:{
        dataOfStandardYear:{//以2017年为基准年份
          type:Object,
        },
        dataOfLastYear:{//去年用水量
          type:Object,
        },
        dataOfCurrentYear:{//今年用水量
          type:Object,
        },
        time:{
          type:Array,
        }
      },
      watch:{
        dataOfStandardYear:{
          handler(newValue,oldValue){
            this.options.series[0].data = newValue.data ;
            this.options.series[0].name = newValue.name ;
            this.options.legend.data.splice(0,1,newValue.name);
            this.init();
          }
        },
        dataOfLastYear:{
          handler(newValue,oldValue){
            this.options.series[1].data = newValue.data ;
            this.options.series[1].name = newValue.name ;
            this.options.legend.data.splice(1,1,newValue.name);
            this.init();
          }
        },
        dataOfCurrentYear:{
          handler(newValue,oldValue){
            this.options.series[2].data = newValue.data ;
            this.options.series[2].name = newValue.name ;
            this.options.legend.data.splice(2,1,newValue.name);
            this.init();
          }
        },
        time:{
          handler(newValue,oldValue){
            this.options.xAxis.data = newValue ;
            this.init();
          }
        }
      },
      mounted(){
        this.getChartData();
      },
      methods:{
        init(){
          this.$nextTick(function(){
            var myChart = echarts.init(this.$refs.div) ;
            myChart.setOption(this.options,true);
          })
        },
        compare(property){
          return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2 ;
          }
        },
        getChartData(){
          this.options.series[0].data = this.dataOfStandardYear.data ;
          this.options.series[0].name = this.dataOfStandardYear.name ;
          this.options.legend.data.splice(0,1,this.dataOfStandardYear.name);
          this.options.series[1].data = this.dataOfLastYear.data ;
          this.options.series[1].name = this.dataOfLastYear.name ;
          this.options.legend.data.splice(1,1,this.dataOfLastYear.name)
          this.options.series[2].data = this.dataOfCurrentYear.data ;
          this.options.series[2].name = this.dataOfCurrentYear.name ;
          this.options.legend.data.splice(2,1,this.dataOfCurrentYear.name)
          this.options.xAxis.data = this.time ;
          this.init();
        }
      }
    }
</script>

<style scoped>

</style>
