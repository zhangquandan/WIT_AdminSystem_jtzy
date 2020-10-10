<template>
  <div style="height:100%;">
    <div id="savingChart" ref="div" style="height:100%;width:100%;">
    </div>
  </div>
</template>

<script>
  const echarts = require('echarts');
  export default {
    name: "minimum-flow-line",
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
              saveAsImage: {show: true},
            }
          },
          calculable: true,
          xAxis: [
            {
              name: '日期',
              type: 'category',
              axisTick: {show: false},
              boundaryGap: true,  //距离坐标原点是否有间隙
              data: ['2014', '2015', '2016', '2017', '2018']
            }
          ],
          grid: {
            left: '2%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          yAxis: [
            {
              name:'吨',
              type: 'value',
            }
          ],
          series: [
            {
              name: '最小流量',
              type: 'line',
              symbol:'circle',//拐点样式
              symbolSize:5,   //拐点圆的大小
              lineStyle:{
                normal:{
                  color:'#5B9BD5',//折线的颜色
                  width:2//折线粗细
                }
              },
              itemStyle: {
                normal: {
                  color: 'white',//拐点颜色
                  borderColor: '#ED7D31',//拐点边框颜色
                  borderWidth: 1//拐点边框大小
                },
              },
              smooth: true,
              data: [80, 150, 301, 150, 60]
            },
          ]
        };
        return option ;
      }
      return {
        options:getBox(),
      }
    },
    mounted(){
      this.getChartData();
    },
    props: {
      xData: {
        type: Array,
      },
      yData: {
        type: Array,
      }
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
        this.options.series[0].data = this.yData ;
        this.options.xAxis[0].data = this.xData ;
        this.init();
      }
    }
  }
</script>

<style scoped>

</style>
