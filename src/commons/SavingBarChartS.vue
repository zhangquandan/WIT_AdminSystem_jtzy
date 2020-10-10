<template>
  <div style="height:100%;position: relative;">
    <div id="savingChart" ref="div" style="height:100%;width:100%;" v-if="isShow">
    </div>
    <div class="legend">
      <div class="legend-item"><div class="quota"></div>定额</div>
      <div class="legend-item"><div class="waterUse"></div>用水量</div>
      <div class="legend-item"><div class="waterSaving"></div>节水量</div>
      <div class="legend-item"><div class="more"></div>超额用水量</div>
    </div>
  </div>
</template>

<script>
    const echarts = require('echarts');
    export default {
        name: "saving-bar-chart-s",
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
                '#32CD32',
                '#ff5965' /*#ff5965*/
              ],
              tooltip: {
                trigger: 'axis',
              },
              /*legend: {
                data: ['定额', '用水量','节水量','超额用水'],
                align:'left',
                y:'bottom',
                show: true,
              },*/
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
                containLabel: true
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
                  name: '用水量',
                  type: 'bar',
                  smooth: true,
                  data: [220, 182, 191, 234, 390]
                },
                {
                  name: '节水量',
                  type: 'bar',
                  smooth: true,
                  /*data: [150, 200, 201, 300, -190],*/
                  data: [{value: 100,flag: false,},
                    {value: 150,flag: false,},
                    {value: 110,flag: false,},
                    {value: 100,flag: false,},
                    {value: 100,flag: true,}],
                  itemStyle: {
                    normal: {
                      color: function (params) {
                        const colorList = [
                          '#2d63ff',
                          '#3aa6ff',
                          '#32CD32',
                          '#ff5965'
                        ];
                        if(params.data.flag) {//Number(params.data) < 0
                          params.seriesName = '超额用水'
                          return colorList[3];
                        }else {
                          params.seriesName = '节水量'
                          return colorList[2];
                        }
                        /*return colorList[params.dataIndex]*/
                      },
                      //以下为是否显示，显示位置和显示格式的设置了

                      /*label: {

                        show: true,

                        position: 'top',

                        formatter: '{b}\n{c}'

                      }*/
                    }
                  }
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
        this.getChartData();
      },
      props: {
        quota: {
          type: Array,
        } ,
        usage: {
          type: Array,
        },
        saving: {
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
          /*this.options.title.text = this.titleName;
          this.options.series[0].data = this.quota.data ;
          this.options.series[0].name = this.quota.name ;
          this.options.series[1].data = this.usage.data ;
          this.options.series[1].name = this.usage.name ;
          this.options.series[2].data = this.saving.data ;
          this.options.series[2].name = this.saving.name ;
          this.options.xAxis[0].data = this.time ;
          this.options.legend.data = [this.quota.name,this.usage.name,this.saving.name];*/
          this.options.series[0].data = this.quota;
          this.options.series[1].data = this.usage;
          this.options.series[2].data = this.saving;
          this.init();
        }
      }
    }
</script>

<style scoped>
  .legend {width: 100%;height: 15px;display: inline-flex;justify-content: center;position: absolute;bottom: 2px;}
  .legend .legend-item {height: 15px;display: inline-flex;align-items: center;font-size: 6px;margin-left: 10px;}
  .quota {width: 25px;height: 100%;background: #2d63ff;border-radius: 4px;margin-right: 3px;}
  .waterUse {width: 25px;height: 100%;background: #3aa6ff;border-radius: 4px;margin-right: 3px;}
  .waterSaving {width: 25px;height: 100%;background: #32CD32;border-radius: 4px;margin-right: 3px;}
  .more {width: 25px;height: 100%;background: #ff5965;border-radius: 4px;margin-right: 3px;}
</style>
