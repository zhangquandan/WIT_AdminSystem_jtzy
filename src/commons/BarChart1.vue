<template>
  <div style="height:100%;">
    <v-chart theme="shine" :options="orgOptions" :style="{height:toHeight,width:toWidth}"/>
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
    name: "bar-chart1",
    mounted(){
      this.orgOptions.xAxis.data = this.xData ;
      this.orgOptions.series[0].data = this.yData ;
      this.orgOptions.xAxis.name = this.typeName ;
      this.orgOptions.title.text = this.title ;
      if(this.color != null && this.color != '')
      this.orgOptions.series[0].itemStyle.normal.color = this.color;
    },
    data: function () {
      return {
        orgOptions: {
          title: {
            text: '',
            x: 'center',
            textStyle:{
              fontStyle:'bolder'
            }
          },
          xAxis: {
            name: '单位(月)',
            type: 'category',
            data: [1],
            axisLabel: {
              interval: 0,//3代表x轴间隔3个显示一次
              rotate: 0, //45代表逆时针旋转45度
            }
          },
          dataZoom: {
            realtime: true, //拖动滚动条时是否动态的更新图表数据
            height: 30,//滚动条高度
            start: 0,//滚动条开始位置（共100等份）
            end: 100//结束位置（共100等份）
          },
          grid: {
            left: '3%',
            right: '8%',
            bottom: '10%',
            containLabel: true
          },
          legend: {
            data: ['']
          },
          tooltip: {
            trigger: 'axis'
          },
          yAxis: {
            name: '用水量（吨）',
            type: 'value',
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
            data: [1],
            type: 'bar',
            name: '水量(吨)',
            smooth: true,
            itemStyle: {
              normal: {
                color: function (params) {

                  const colorList = [
                    '#7bb9dd',
                    '#68bedd',
                    '#43b4dd',
                    '#11aedd',
                    '#73b1dd',
                    '#55a7dd',
                    '#2ea0dd',
                    '#0093dd',
                    '#6a95dd',
                    '#4984dd',
                    '#2470dd',
                    '#0059dd',
                    '#8494dd',
                    '#6a7add',
                    '#546fdd',
                    '#3758dd',
                    '#234add',
                    '#7bb9dd',
                    '#68bedd',
                    '#43b4dd',
                    '#11aedd',
                    '#73b1dd',
                    '#55a7dd',
                    '#2ea0dd',
                    '#0093dd',
                    '#6a95dd',
                    '#4984dd',
                    '#2470dd',
                    '#0059dd',
                    '#8494dd',
                    '#6a7add',
                    '#546fdd',
                    '#3758dd',
                    '#234add',
                    '#7bb9dd',
                    '#68bedd',
                    '#43b4dd',
                    '#11aedd',
                    '#73b1dd',
                    '#55a7dd',
                    '#2ea0dd',
                    '#0093dd',
                    '#6a95dd',
                    '#4984dd',
                    '#2470dd',
                    '#0059dd',
                    '#8494dd',
                    '#6a7add',
                    '#546fdd',
                    '#3758dd',
                    '#234add',
                  ];
                  return colorList[params.dataIndex]
                },
              }
            }
          }]
        }
      }
    },
    props:{
      toHeight:{
        type: String,
        default:"100%"
      },
      toWidth:{
        type: String,
        default:"100%"
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
      color:{
        type:String,
      }
    },
    watch: {
      title:{
        handler(newValue,oldValue){
          this.orgOptions.title.text = newValue ;
        }
      },
      typeName:{
        handler(newValue,oldValue){
          this.orgOptions.xAxis.name = newValue ;
        },
        deep: true
      },
      xData: {
        handler(newValue, oldValue) {
          this.orgOptions.xAxis.data = newValue ;
        },
        deep: true
      },
      yData: {
        handler(newValue, oldValue) {
          this.orgOptions.series[0].data = newValue ;
        },
        deep: true
      }
    }
  }
</script>

<style scoped>

</style>
