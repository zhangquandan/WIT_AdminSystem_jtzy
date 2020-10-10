<template>
  <div class="echarts" style="height:100%;width:100%;">
    <div id="myChart" ref="charts" style="height:100%;width:100%;"></div>
  </div>
</template>

<script>
    const echarts = require('echarts');
    export default {
      name: "bar-chart-for-quota",
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
            ],
            tooltip: {
              trigger: 'axis',
            },
            legend: {
              data: ['定额', '历史数据'],
              align:'left',
              y:'bottom',
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
                name: '月',
                data: ['1', '2', '3', '4', '5','6','7','8','9','10','11','12']
              }
            ],
            grid: {
              left: '3%',
              right: '4%',
              bottom: '7%',
              containLabel: true,
            },
            yAxis: [
              {
                name:'吨',
                type: 'value'
              }
            ],
            series: [
              {
                name: '定额',
                type: 'bar',
                smooth: true,
                data: [320, 332, 301, 334, 290]
              },
              {
                name: '历史数据',
                type: 'bar',
                smooth: true,
                data: [220, 182, 191, 234, 390]
              },
            ]
          };
          return option ;
        }
        return {
          options:getBox(),
          isShow: true,
        }
      },
      mounted(){
        this.init();
      },
      props: {
        quota: {
          type: Array,
        },
        history: {
          type: Array,
        }
      },
      watch: {
        quota: {
          handler(newValue,oldValue) {
            this.options.series[0].data = this.quota;
            this.init();
          }
        },
        history: {
          handler(newValue,oldValue) {
            this.options.series[1].data = this.history;
            this.init();
          }
        }
      },
      methods:{
        init(){
          this.options.series[0].data = this.quota;
          this.options.series[1].data = this.history;
          var myChart = echarts.init(this.$refs.charts);
          myChart.setOption(this.options,true);
        },
       /* setMyChart(){
          //获取父元素
          var echarts = $('.echarts');
          //获取父元素宽高
          var echartsWidth = echarts.outerWidth(true);
          var echartsHeight = echarts.outerHeight(true);
          //获取图表元素
          var myChart = $('#myChart');
          //将父元素宽高赋值给图表
          myChart.css('width', myChart);
          myChart.css('height', myChart);
        }*/
      }
    }
</script>

<style scoped>

</style>
