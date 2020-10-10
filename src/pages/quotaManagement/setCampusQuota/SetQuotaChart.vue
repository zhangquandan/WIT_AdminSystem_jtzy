<template>
  <div class="quota-chart">
    <v-chart theme="shine" :options="orgOptions" v-bind:style="{height:toHeight,width:toWidth}"/>
  </div>
</template>

<script>
  import ECharts from 'vue-echarts/components/ECharts'
  import 'echarts'
  import theme from 'echarts/theme/dark.js'
  require('echarts/theme/shine.js')
  export default {
    components:{
      'v-chart':ECharts
    },
    name: "set-quota-chart",
    mounted(){

    },
    data: function () {
      return {
        /*toHeight: "100%",
        toWidth: "100%",*/
        orgOptions: {
          title: {
            text: '',
            x: 'center',
            textStyle:{
              fontStyle:'bolder'
            }
          },
          xAxis: {
            name: '月',
            type: 'category',
            data: [1,2,3,4,5,6,7,8,9,10,11,12],
            axisLabel: {
              rotate: 0,
              interval: 0,
            }
          },
          /*dataZoom: {
            realtime: true, //拖动滚动条时是否动态的更新图表数据
            height: 30,//滚动条高度
            start: 0,//滚动条开始位置（共100等份）
            end: 100//结束位置（共100等份）
          },*/
          grid: {
            left: '3%',
            right: '5%',
            bottom: '3%',
            containLabel: true
          },
          legend: {
            data: ['']
          },
          tooltip: {
            trigger: 'axis'
          },
          yAxis: {
            name: '吨',
            type: 'value',
            /*nameTextStyle: {
              fontSize: 14
            },
            axisLabel : {
              formatter: '{value}',

            },
            gridIndex: 0,
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
            position: 'left',//--位置靠左
            nameLocation: 'middle', //--位置居中
            nameGap: 60, //--与y轴距离
            nameRotate: 90 //--角度*/
          },
          toolbox: {
            show: true,
            right:30,
            feature: {
              /*dataZoom: {
                yAxisIndex: 'none'
              },*/ //区域缩放，区域缩放还原
              magicType: {
                type: ['line', 'bar']
              },  //切换为折线图，切换为柱状图
              /* restore: {},  //还原*/
              saveAsImage: {}   //保存为图片
            }
          },
          series: [{
            data: [1,2,3,4,5,6,8,5,3,6,8,7],
            type: 'bar',
            name: '用水量(吨)',
            smooth: true,
            itemStyle: {
              normal: {
                color: function (params) {
                  const colorList = [
                    '#7bb9dd',
                    '#68bedd',
                    '#43b4dd',
                    '#11aedd',
                  ];

                  return colorList[params.dataIndex]

                },

                //以下为是否显示，显示位置和显示格式的设置了

                /*label: {

                  show: true,

                  position: 'top',

                  formatter: '{b}\n{c}'

                }*/
              }
            }
          }]

        },
      }
    },
    mounted() {
      this.orgOptions.xAxis.name = newValue ;
    },
    props:{
      toHeight:{
        type:String,
        default:'100%'
      },
      toWidth:{
        type:String,
        default:'100%'
      },
      xData:{
        type: Array,
      },
      yData:{
        type: Array ,
      },
      typeName:{
        type:String,
      },
      title:{
        type:String,
      },
      xRotate:{
        type:Number
      },
      color:{
        type:String
      }
    },
    watch: {
      title:{
        handler(newValue,oldValue){
          this.orgOptions.xAxis.data = this.xData ;
          this.orgOptions.series[0].data = this.yData ;
        }
      },
      typeName:{
        handler(newValue,oldValue){
          this.orgOptions.xAxis.name = newValue ;
        },
        deep: true
      },
      quota: {
        handler(newValue, oldValue) {
          this.orgOptions.xAxis.data = newValue ;
        },
        deep: true
      },
      history: {
        handler(newValue, oldValue) {
          this.orgOptions.series[0].data = newValue ;
        },
        deep: true
      },
      yName:{
        handler(newValue,oldValue){
          this.orgOptions.yAxis.name = newValue;
        }
      }
    }
  }
</script>

<style scoped>
  /*v-chart {width:100%;}
  .echarts {height:100%;}*/
  .quota-chart {flex: 1;border: 1px solid #DEEBF7;}
</style>
