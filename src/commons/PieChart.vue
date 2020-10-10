  <template>
  <div style="height:100%;width:100%;">
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
      components:{
        'v-chart': ECharts
      },
        name: "pie-chart",
      data(){
          return {
            polar: {
              title : {
                text: '建筑分类用水量统计',
                x:'center',
                textStyle:{
                  fontStyle:'bolder'
                }
              },
              toolbox: {
                show: true,
                right: 30,
                feature: {
                  saveAsImage: {}   //保存为图片
                }
              },
              tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                show: true,
                orient: 'vertical',
                left: 'left',
                data: ['教学楼','体育馆','图书馆','行政楼','宿舍楼']
              },
              series : [
                {
                  name: '用水量(吨)',
                  type: 'pie',
                  radius : '60%',
                  center: ['50%', '50%'],
                  data:[
                    {value:335, name:'教学楼'},
                    {value:310, name:'体育馆'},
                    {value:234, name:'图书馆'},
                    {value:135, name:'行政楼'},
                    {value:1548, name:'宿舍楼'}
                  ],
                  itemStyle: {
                    normal: {
                      color: function (params) {
                        const colorList = [
                          '#ff5965',
                          '#2d63ff',
                          '#3aa6ff',
                          '#bb8dcb',
                          '#00c1af',
                          '#ffbe59',
                          '#8dcb6c',
                          '#6075cb',
                          '#49cb7c',
                          '#2d63ff',
                          '#3aa6ff',
                          '#ff5965',
                          '#b382cb',
                          '#00c1af',
                          '#ffbe59',
                          '#8dcb6c',
                          '#6075cb',
                          '#49cb7c',
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
      created(){
        this.polar.legend.data = this.titleData ;
        this.polar.series[0].data = this.chartData ;
        this.polar.title.text = this.titleName ;
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
      watch:{
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
      }
    }
</script>

<style scoped>

</style>
