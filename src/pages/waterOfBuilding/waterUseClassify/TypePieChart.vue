  <template>
  <div style="height:100%;width:100%;text-align: center;">
    <v-chart theme="infographic" :options="polar" v-bind:style="{height:toHeight,width:toWidth}"/>
  </div>
</template>
<!--泛型E ：element 元素，一般用在集合中，T--type（java类），k--key，V--value，?--不确定什么类型，N--number类型-->
<script>
    import ECharts from 'vue-echarts/components/ECharts'
    import 'echarts'
    import theme from 'echarts/theme/macarons.js' //infographic
    require('echarts/theme/infographic.js');
    export default {
      components:{
        'v-chart': ECharts
      },
        name: "type-pie-chart",
      data(){
          return {
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
                feature: {
                  saveAsImage: {}   //保存为图片
                }
              },
              tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              graphic: [{ //环形图中间添加文字
                type: 'text', //通过不同top值可以设置上下显示
                left: 'center',
                top: '40%',
                style: {
                  text: '过去31天'+'\n\n'+'建筑用水分类统计',
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
                textStyle: { //图例文字的样式
                  fontSize: 30
                }
                  /*top: '10px',*/
                /*data: ['教学楼','体育馆']*/
              },
              series : [
                {
                  name: '用水量(吨)',
                  type: 'pie',
                  radius : ['40% ','60%'], //饼图的半径，第一个为内半径，第二个为外半径
                  center: ['50%', '45%'],
                  label: {
                    /*formatter: '{b}: {@2012} ({d}%)',*/
                  /*formatter: '{d}%' + '\n' + '{b}' + '\n' + '{@2012}',*/
                  normal: {
                    formatter: function(a,b,c) {
                      return a.name + '\n' + a.value + '\n' + a.percent.toFixed(1) + '%';
                    },
                    textStyle: { //图例文字的样式
                      fontSize: 16
                    }
                    }
                  },
                  data:[
                    {value:1000,name: '场馆类建筑'},
                    {value:200,name: '食堂餐厅'},
                    {value:2000,name: '图书馆建筑'},
                    {value:100,name: '教学楼建筑'},
                    {value:1200,name: '实验室'},
                    {value:1500,name: '学生宿舍'},
                    {value:1800,name: '综合楼建筑'},
                    {value:300,name: '医院'},
                    {value:300,name: '医院1'},
                    {value:300,name: '医院2'},
                    {value:300,name: '医院3'},
                    {value:300,name: '医院4'},
                    {value:300,name: '医院5'},
                    {value:300,name: '医院6'},
                    {value:300,name: '医院7'},
                    {value:300,name: '医院8'},
                    {value:300,name: '医院9'},
                    {value:300,name: '医院10'},
                  ],
                  itemStyle: {
                    normal: {
                      color: function (params) {
                        const colorList = [
                          "#51b447","#ffe1c5",'#7EC0EE', '#FF9F7F', '#FFD700', '#C9C9C9', '#E066FF', '#C0FF3E','#DDA9FF','#88FFBE','#FF6BFB'
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
        this.polar.series[0].data = this.chartData ;
        var a = this.polar.series[0].data.length;
        a = a%3 == 0 ? a/3 : parseInt(a/3) + 1;
        var arr = [];
        var x = 20;
        var y = 100 - a*3;
        this.polar.series[0].data.forEach((item,index) => {
          if(index%3 == 0 && index != 0) {
            y += 3;
            x = 20;
          }
          arr.push({orient: 'horizontal',x: x + '%',y: y + '%',show: true,align: 'left',data: [item.name],textStyle: {fontSize: 14}})
          x += 25;
        })
        this.polar.legend = arr;
      },
      mounted() {
        this.polar.graphic[0].style.text = this.text + '\n\n'+'建筑用水分类统计';
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
        },
        text: {
          type: String,
        }
      },
      watch:{
        text: {
          handler(newValue,oldValue) {
            this.polar.graphic[0].style.text = newValue + '\n\n'+'建筑用水分类统计';
          }
        },
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
