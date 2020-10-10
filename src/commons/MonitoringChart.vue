<template>
  <div style="height:100%;">
    <div v-if="show" id="savingChart" ref="div" style="height:100%;width:100%;">
    </div>
    <div class="no-data" v-if="!show">
      暂无数据
    </div>
  </div>
</template>

<script>
  const echarts = require('echarts');
  export default {
    name: "monitoring-chart",
    data(){
      const getBox =_=> {
        let option = {
          title:{
            text:'',
            x:'center'
          },
          color: [
            '#5B9BD5',
            '#ED7D31',
          ],
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['当前', '同期'],
            align:'left',
            y:'top',
            x:'right',
            padding:[10,200,0,0],
            show: true,
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
              boundaryGap: true,  //距离坐标原点是否有间隙
              data: ['2014', '2015', '2016', '2017', '2018']
            }
          ],
          grid: {
            left: '2%',
            right: '4%',
            bottom: '0%',
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
              name: '当前',
              type: 'line',
              smooth: true,
              data: [80, 150, 301, 150, 60]
            },
            {
              name: '同期',
              type: 'line',
              smooth: true,
              data: [70, 140, 291, 140, 50]
            },
          ]
        };
        return option;
      }
      return {
        options:getBox(),
        show: true,
      }
    },
    props: {
      current: {
        type: Array,
      },
      last: {
        type: Array,
      },
      time: {
        type: Array,
      }
    },
    mounted(){
      this.getChartData();
    },
    methods:{
      init(){
        var myChart = echarts.init(this.$refs.div);
        myChart.setOption(this.options,true);
      },
      compare(property){
        return function(a,b){
          var value1 = a[property];
          var value2 = b[property];
          return value1 - value2 ;
        }
      },
      setColor() {
        var options = this.options;
        var series = options.series;
        var datas = series[2].data;
        for (var i in datas) {
          if(parseInt(i.value) < 0) {
            i.itemStyle = i.itemStyle || {};
            i.itemStyle = {
              "normal": {
                "color" : "#ff5965"
              }
            }
          }
        }
      },
      getChartData(){
        /*this.options.title.text = this.titleName;
        this.options.series[0].data = this.quota.data ;
        this.options.series[0].name = this.quota.name ;
        this.options.series[1].data = this.usage.data ;
        this.options.series[1].name = this.usage.name ;
        this.options.series[2].data = this.saving.data ;
        this.options.series[2].name = this.saving.name ;
        this.options.xAxis[0].data = this.time ;
        this.options.legend.data = [this.quota.name,this.usage.name,this.saving.name];*/
        if(this.time && this.time.length > 0) {
          this.show = true;
          this.options.xAxis[0].data = this.time ;
          this.options.series[0].data = this.current;
          this.options.series[1].data = this.last ;
          this.init();
        }else {
          this.show = false;
        }
      }
    }
  }
</script>

<style scoped>
  .no-data {height: 100%;display: flex;justify-content: center;align-items: center;font-size: 18px;}
</style>
