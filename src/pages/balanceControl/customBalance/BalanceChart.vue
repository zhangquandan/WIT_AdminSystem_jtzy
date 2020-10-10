<template>
  <div style="height:100%;width:100%;text-align: center;">
    <v-chart theme="infographic" :options="polar" v-bind:style="{height:toHeight,width:toWidth}"/>
  </div>
</template>
<!--泛型E ：element 元素，一般用在集合中，T--type（java类），k--key，V--value，?--不确定什么类型，N--number类型-->
<script>
  import ECharts from 'vue-echarts/components/ECharts'
  import 'echarts'
  import theme from 'echarts/theme/infographic.js'

  require('echarts/theme/infographic.js')
  export default {
    components: {
      'v-chart': ECharts
    },
    name: "balance-chart",
    data() {
      return {
        polar: {
          title: {
            text: '',
            x: 'center',
            textStyle: {
              fontStyle: 'bolder'
            }
          },
          toolbox: {
            show: true,
            right: 30,
            top: '10px',
            feature: {
              saveAsImage: {}   //保存为图片
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          graphic: [{ //环形图中间添加文字
            type: 'text', //通过不同top值可以设置上下显示
            left: 'center',
            top: '45%',
            style: {
              text: '总用水量' + '\n\n' + '10000吨',
              textAlign: 'center',
              fill: '#007CDE', //文字的颜色
              width: 30,
              height: 30,
              fontSize: 25,
              fontWeight: 'bolder',
              fontFamily: "Microsoft YaHei"
            }
          }],
          grid: {
            left: '10%',
            right: '4%',
            top: '3%',
            containLabel: true
          },
          legend: {
            show: true,
            orient: 'horizontal',//vertical
            bottom: '10px',
            /*top: '10px',*/
            /*data: ['教学楼','体育馆']*/
          },
          series: [
            {
              name: '水量(吨)',
              type: 'pie',
              radius: ['40% ', '60%'], //饼图的半径，第一个为内半径，第二个为外半径
              center: ['50%', '50%'],
              label: {
                /*formatter: '{b}: {@2012} ({d}%)',*/
                /*formatter: '{d}%' + '\n' + '{b}' + '\n' + '{@2012}',*/
                normal: {
                  textStyle: {
                    fontSize: 16
                  },
                  formatter: function (a, b, c) {
                    return a.name + '\n' + a.value + '吨' + '\n' + a.percent.toFixed(1) + '%';
                  }
                }
              },
              data: [
                {value: 8000, name: '分表'},
                {value: 2000, name: '漏耗'},
              ],
              itemStyle: {
                normal: {
                  color: function (params) {
                    const colorList = [
                      '#0ADA0A',
                      '#F9DC36',
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
            }
          ]
        }
      }
    },
    created() {
      /*this.polar.legend.data = this.titleData ;
      this.polar.series[0].data = this.chartData ;
      this.polar.title.text = this.titleName ;*/
      /*{
        orient: 'horizontal',
          x: '1%',
        y: '10%',
        align: 'left',
        data: ['植被'],
      },*/
      var a = this.polar.series[0].data.length;
      a = a % 3 == 0 ? a / 3 : parseInt(a / 3) + 1;
      var arr = [];
      var x = 35;
      var y = 100 - a * 10;
      this.polar.series[0].data.forEach((item, index) => {
        if (index % 3 == 0 && index != 0) {
          y += 3;
          x = 25;
        }
        arr.push({orient: 'horizontal', x: x + '%', y: y + '%', show: true, align: 'left', data: [item.name]})
        x += 20;
      })
      this.polar.legend = arr;
    },
    mounted() {
      this.polar.series[0].data = this.chartData;
      this.polar.graphic[0].style.text = '总用水量' + '\n\n' + this.count + '吨';
    },
    props: {
      toHeight: {
        type: String,
        default: '100%'
      },
      toWidth: {
        type: String,
        default: '100%'
      },
      titleName: {
        type: String,
      },
      titleData: {
        type: Array,
      },
      chartData: {
        type: Array,
      },
      count: {
        type: String,
      }
    },
    watch: {
      titleData: {
        handler(newValue, oldValue) {
          this.polar.legend.data = newValue;
        }
      },
      chartData: {
        handler(newValue, oldValue) {
          this.polar.series[0].data = newValue;
        }
      }
    }
  }
</script>

<style scoped>

</style>
