<template>
  <div style="height:100%;">
    <div id="savingChart" ref="div" style="height:100%;width:100%;">
    </div>
  </div>
</template>

<script>
  const echarts = require('echarts');
  export default {
    name: "trend-chart",
    data(){
      const getBox =_=> {
        /*let option = {
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          title: {
            left: 'center',
            text: '大数据量面积图',
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
          },
          dataZoom: [{
            type: 'inside',
            start: 0,
            end: 10
          }, {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }],
          series: [
            {
              name: '模拟数据',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                color: 'rgb(255, 70, 131)'
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgb(255, 158, 68)'
                }, {
                  offset: 1,
                  color: 'rgb(255, 70, 131)'
                }])
              },
              data: data
            }
          ]
        };*/
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
            top: '10px',//top center bottom
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
              name: '月',
              axisTick: {show: false},
              boundaryGap: false,
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
              name: '用水量',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                color: 'rgb(255, 70, 131)'
              },
              data: [80, 150, 301, 150, 60],
              /*areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'red'
                }, {
                  offset: 1,
                  color: 'green'
                }])
              },*/
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgb(0, 0, 255)'
                }, {
                  offset: 1,
                  color: 'rgb(193, 210, 240)'
                }])
              },
            },
          ]
        };
        return option ;
      }
      return {
        options:getBox(),
      }
    },
    props: {
      xData: {
        tyep: Array,
      },
      yData: {
        type: Array
      }
    },
    mounted(){
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
        this.options.series[0].data = this.yData ;
        this.options.xAxis[0].data = this.xData ;
        this.init();
      }
    }
  }
</script>

<style scoped>

</style>
