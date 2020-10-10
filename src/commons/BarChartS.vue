<template>
  <div style="height:100%;">
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
    name: "bar-chart-s",
    mounted(){
      /*this.orgOptions.xAxis.data = this.xData ;
      this.orgOptions.series[0].data = this.yData ;
      this.orgOptions.xAxis.name = this.typeName ;
      this.orgOptions.title.text = this.title ;
      this.orgOptions.yAxis.name = this.yName ;
      this.orgOptions.xAxis.axisLabel.rotate = this.xRotate ;
      if(this.color != null && this.color != '')
      this.orgOptions.series[0].itemStyle.normal.color = this.color;*/
      this.orgOptions.title.text = this.title ;
      this.orgOptions.xAxis.name = this.typeName ;
      this.orgOptions.xAxis.data = this.xData ;
      this.orgOptions.series[0].data = this.yData ;
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
            name: '时',
            type: 'category',
            data: [],
          },
          /*xAxis: [
            {
              name: '时',
              type: 'category',
              axisTick: {show: false},
              boundaryGap: true,
              data: [],
            }
          ],*/
         /* dataZoom: {
            realtime: true, //拖动滚动条时是否动态的更新图表数据
            height: 30,//滚动条高度
            start: 0,//滚动条开始位置（共100等份）
            end: 100//结束位置（共100等份）
          },*/
          grid: {
            left: '2%',
            right: '3%',
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
            data: [],
            type: 'bar',
            name: '用水量(吨)',
            smooth: true,
            itemStyle: {
              normal: {
                color: function (params) {
                  const colorList = [
                    '#5B9BD5',
                    '#92D03C',
                    '#DC143C',
                    '#ADFF2F'
                  ];
                  let a,b,c,d,flag;
                  if(params.name.length == 4) {
                    a = params.dataIndex%2 == 0;
                  }else if(params.name.length ==7) {
                    a = Number(params.name.split('-')[0])%2 == 0;
                  }else if(params.name.length == 10) {
                    a = Number(params.name.split('-')[1])%2 == 0;
                  }else {
                    b = Number(params.name.split(' ')[0].split('-')[2]);
                    c = Number(params.name.split(' ')[0].split('-')[1]);
                    d = Number(params.name.split(' ')[0].split('-')[0]);
                    a = b%2 == 0;
                    let arr = [1,3,5,7,8,10,12];
                    let arr1 = [1,2,3,5,7,8,10,12];
                    if(d%4 == 0) {
                      flag = arr1.indexOf(c) > -1 && ((c == 2 && b == 29) || b == 31);
                    }else {
                      flag = arr.indexOf(c) > -1 && b == 31;
                    }
                  }
                  if(a && !params.data.flag && !flag) {
                    return colorList[0];
                  }else if(params.data.flag && !flag) {
                    return colorList[2];
                  }else if(flag) {
                    return colorList[3];
                  }else {
                    return colorList[1];
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
          }]

        }
      }
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
        default: '时'
      },
      title:{
        type:String,
      },
      yName:{
        type:String,
        default:'吨'
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
v-chart {
  width:100%;
}
  .echarts {
    height:100%;
  }
</style>
