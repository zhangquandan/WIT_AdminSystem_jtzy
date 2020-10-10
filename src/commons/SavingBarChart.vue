<template>
  <div style="height:100%;">
    <div id="savingChart" ref="div" style="height:100%;width:100%;"></div>
  </div>
</template>

<script>
    const echarts = require('echarts');
    export default {
        name: "saving-bar-chart",
      data(){
          const getBox =_=> {
            let option = {
              title:{
                text:'',
                x:'center'
              },
              color: [
                '#2d63ff',
                '#3aa6ff',
                '#ff5965'
              ],
              tooltip: {
                trigger: 'axis',
              },
              legend: {
                data: ['定额', '用水量', '节水量'],
                align:'left',
                y:'bottom',
                show: true
              },
              toolbox: {
                show: true,
                //orient: 'vertical',
                //left: 'right',
                right:30,
                top: 'top',//top center bottom
                feature: {
                  mark: {show: true},
                  //dataView: {show: true, readOnly: false},
                  magicType: {show: true, type: ['line', 'bar']},//['line', 'bar', 'stack', 'tiled']
                  //restore: {show: true},
                  saveAsImage: {show: true}
                }
              },
              calculable: true,
              xAxis: [
                {
                  type: 'category',
                  axisTick: {show: false},
                  data: ['2014', '2015', '2016', '2017', '2018']
                }
              ],
              grid: {
                left: '3%',
                right: '4%',
                bottom: '7%',
                containLabel: true
              },
              yAxis: [
                {
                  name:'水量（吨）',
                  type: 'value'
                }
              ],
              series: [
                {
                  name: '2017年用水量(吨)',
                  type: 'bar',
                  data: [320, 332, 301, 334, 390]
                },
                {
                  name: '2018年用水量(吨)',
                  type: 'bar',
                  data: [220, 182, 191, 234, 290]
                },
                {
                  name: '今年用水量(吨)',
                  type: 'bar',
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
        quota:{//定额
          type:Object,
        },
        usage:{//用水量
          type:Object,
        },
        saving:{//节水量
          type:Object,
        },
        time:{
          type:Array,
        },
        titleName:{
          type:String,
        },
      },
      watch:{
        quota:{
          handler(newValue,oldValue){
            /*this.options.series[0].data = newValue.data ;
            this.options.series[0].name = newValue.name;
            this.options.legend.data = [this.quota.name,this.usage.name,this.saving.name];*/
          },
          deep:true
        },
        usage:{
          handler(newValue,oldValue){
            /*this.options.series[1].data = newValue.data ;
            this.options.series[1].name = newValue.name ;
            this.options.legend.data = [this.quota.name,this.usage.name,this.saving.name];*/
          },
          deep:true
        },
        saving:{
          handler(newValue,oldValue){
            /*this.options.series[2].data = newValue.data ;
            this.options.series[2].name = newValue.name ;
            this.options.legend.data = [this.quota.name,this.usage.name,this.saving.name];*/
          },
          deep:true
        },
        time:{
          handler(newValue,oldValue){
            /*this.options.xAxis[0].data = newValue ;
            this.options.legend.data = [this.quota.name,this.usage.name,this.saving.name];*/
          },
          deep:true
        }
      },
      mounted(){
       this.getChartData();
      },
      updated(){
        this.getChartData();
      },
      methods:{
        init(){
            var myChart = echarts.init(this.$refs.div) ;
            myChart.setOption(this.options,true);
        },
        compare(property){
          return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2 ;
          }
        },
        getChartData(){
          this.options.title.text = this.titleName;
          this.options.series[0].data = this.quota.data ;
          this.options.series[0].name = this.quota.name ;
          this.options.series[1].data = this.usage.data ;
          this.options.series[1].name = this.usage.name ;
          this.options.series[2].data = this.saving.data ;
          this.options.series[2].name = this.saving.name ;
          this.options.xAxis[0].data = this.time ;
          this.options.legend.data = [this.quota.name,this.usage.name,this.saving.name];
          this.init();
        }
      }
    }
</script>

<style scoped>

</style>
