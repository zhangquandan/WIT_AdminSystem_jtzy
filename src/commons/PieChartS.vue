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
    require('echarts/theme/infographic.js');
    export default {
      components:{
        'v-chart': ECharts
      },
        name: "pie-chart-s",
      data(){
          return {
            waterMeterSum: 0,
            onlineSum: 0,
            offlineSum: 0,

            polar: {
              title : {
                text: '',
                x:'center',
                textStyle:{
                  fontStyle:'bolder'
                }
              },
              toolbox: {
                show: true,
                right: 30,
                top: '10px',
                /*feature: {
                  saveAsImage: {}   //保存为图片
                }*/
              },
              tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              graphic: [{ //环形图中间添加文字
                type: 'text', //通过不同top值可以设置上下显示
                left: 'center',
                top: '45%',
                style: {
                  text: '水表总数'+'\n',
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
                bottom: '7%',
                containLabel: true
              },
              legend: {
                show: true,
                orient: 'vertical',
                left: '10px',
                top: '10px',
                /*data: ['教学楼','体育馆']*/
              },
              series : [{
                name: '用水量(吨)',
                type: 'pie',
                radius : ['50%','70%'], //饼图的半径，第一个为内半径，第二个为外半径
                center: ['50%','50%'],
                data:[
                  {value:0,name: '在线'},
                  {value:0,name: '离线'},
                ],
                label: {
                  normal: {
                    textStyle: {
                      fontSize: 16
                    },
                    formatter: function(a,b,c) {
                      return a.name + '\n' + a.value + '只' + '\n' + a.percent.toFixed(1) + '%';
                    },
                  }
                },
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
              }]
            }
          }
      },
      /*created(){
        this.polar.legend.data = this.titleData ;
        this.polar.series[0].data = this.chartData ;
        this.polar.title.text = this.titleName ;
      },*/
      props:{
        toHeight:{
          type:String,
          default:'100%'
        },
        toWidth:{
          type:String,
          default:'100%'
        },
        titleName:{
          type:String,
        },
        titleData:{
          type:Array,
        },
        chartData:{
          type:Array,
        }
      },
      /*watch:{
        titleData:{
          handler(newValue,oldValue){
            this.polar.legend.data = newValue ;
          }
        },
        chartData:{
          handler(newValue,oldValue){
            this.polar.series[0].data = newValue ;
          }
        }
      },*/
      mounted(){
        this.polar.graphic[0].style.text = '水表总数' + '\n' + this.$parent.total;
        this.polar.series[0].data[0].value = this.$parent.onLine;
        this.polar.series[0].data[1].value = this.$parent.offLine;
      },
    }
</script>

<style scoped>

</style>
