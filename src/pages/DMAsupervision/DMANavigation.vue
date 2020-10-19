<!--DMA导航-->
<template>
  <div class="flex">
    <div class="content body">
      <div class="navigation box box-solid">
        <div class="box-header bg-aqua">DMA漏损导图</div>
        <div class="box-body">
          <div class="navigation-radio">
            <el-radio-group type="success" v-model="radio" @change="change" size="mini">
              <el-radio-button label="70">综合漏损指数</el-radio-button>
              <el-radio-button label="10">当日水量</el-radio-button>
              <el-radio-button label="20">日量隔周增量</el-radio-button>
              <el-radio-button label="30">日量隔周增幅</el-radio-button>
              <el-radio-button label="50">最小流量隔周增量</el-radio-button>
              <el-radio-button label="60">最小流量隔周增幅</el-radio-button>
            </el-radio-group>
            <el-radio-group type="success" v-model="radioUrl" size="mini" @change="changeUrl">
              <el-radio-button disabled>了解更多 >></el-radio-button>
              <el-radio-button label="1">DMA用水概况</el-radio-button>
              <el-radio-button label="2">DMA水量管控</el-radio-button>
              <el-radio-button label="3">最小流量监测</el-radio-button>
            </el-radio-group>
          </div>
          <div class="navigation-area">
            <div class="wu-chang">
              <div class="box box-solid">
                <div class="box-header bg-aqua">武汉交通职业学院漏损导图</div>
                <div class="box-body">
                  <div class="area-map">
                    <div id="map" :style="{height:'100%',width:'100%'}" ref="map"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var wuChang = {"type":"FeatureCollection","features":[{"type":"Feature","id":"dma_jtzy.1","geometry":{"type":"MultiPolygon","coordinates":[[[[114.25966223,30.42839207,0],[114.25996666,30.42808856,0],[114.26001408,30.42808629,0],[114.25992714,30.42671099,0],[114.25992253,30.42663799,0],[114.25992099,30.42661359,0],[114.25988536,30.42661494,0],[114.2582518,30.42669862,0],[114.2583849,30.42815325,0],[114.25948022,30.42809226,0],[114.25951029,30.42854355,0],[114.25966223,30.42839207,0]]]]},"geometry_name":"geom","properties":{"areaid":"1","areaname":"南区","name":"南区","layer":"南区","population":0,"quantity":null,"shape_leng":null,"owner":"武汉交通职业学院","shape_area":null}},{"type":"Feature","id":"dma_jtzy.2","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26440689,30.42909765,0],[114.2639315,30.42647582,0],[114.26394005,30.42640715,0],[114.26005458,30.42660627,0],[114.25992099,30.42661359,0],[114.25992253,30.42663799,0],[114.25992714,30.42671099,0],[114.26001408,30.42808629,0],[114.25996666,30.42808856,0],[114.25966223,30.42839207,0],[114.25987932,30.42838113,0],[114.2600096,30.42837443,0],[114.26021646,30.42836192,0],[114.26074428,30.42833669,0],[114.26086829,30.42832995,0],[114.26134528,30.42830571,0],[114.26157308,30.42831631,0],[114.26183112,30.42839329,0],[114.26201269,30.42849244,0],[114.26215433,30.42861164,0],[114.26223029,30.42869784,0],[114.26226503,30.42875208,0],[114.262309,30.42883988,0],[114.26235002,30.42892874,0],[114.26236151,30.42895878,0],[114.26236976,30.4289896,0],[114.26238024,30.429047,0],[114.26238687,30.42910478,0],[114.26238911,30.42912977,0],[114.26440689,30.42909765,0]]]]},"geometry_name":"geom","properties":{"areaid":"2","areaname":"教职工住宅区","name":"教职工住宅区","layer":"教职工住宅区","population":0,"quantity":null,"shape_leng":null,"owner":"武汉交通职业学院","shape_area":null}},{"type":"Feature","id":"dma_jtzy.3","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26009895,30.43203439,0],[114.26040012,30.43201847,0],[114.26116805,30.43197102,0],[114.26127427,30.43193949,0],[114.26145453,30.43184335,0],[114.26207732,30.43124196,0],[114.2622888,30.43103659,0],[114.26297973,30.43036384,0],[114.2630293,30.43034248,0],[114.26307394,30.43033259,0],[114.26324358,30.43031521,0],[114.26419536,30.43026545,0],[114.26461814,30.4302517,0],[114.26440689,30.42909765,0],[114.26238911,30.42912977,0],[114.26238687,30.42910478,0],[114.26238024,30.429047,0],[114.26236976,30.4289896,0],[114.26236151,30.42895878,0],[114.26235002,30.42892874,0],[114.262309,30.42883988,0],[114.26226503,30.42875208,0],[114.26223029,30.42869784,0],[114.26215433,30.42861164,0],[114.26201269,30.42849244,0],[114.26183112,30.42839329,0],[114.26157308,30.42831631,0],[114.26134528,30.42830571,0],[114.26086829,30.42832995,0],[114.26074428,30.42833669,0],[114.26021646,30.42836192,0],[114.2600096,30.42837443,0],[114.25987932,30.42838113,0],[114.25966223,30.42839207,0],[114.25951029,30.42854355,0],[114.25905467,30.42899778,0],[114.25892644,30.42912255,0],[114.25844858,30.42959222,0],[114.25838979,30.42968025,0],[114.25833065,30.42980878,0],[114.25831722,30.42987889,0],[114.25831277,30.42994891,0],[114.2583282,30.43017418,0],[114.25834313,30.43039117,0],[114.25835992,30.43063527,0],[114.2583745,30.43084694,0],[114.25838667,30.43100462,0],[114.25839703,30.43105852,0],[114.25841333,30.4311113,0],[114.25843544,30.43116247,0],[114.25846313,30.43121156,0],[114.25856628,30.43133256,0],[114.25885327,30.43155661,0],[114.25891147,30.43160204,0],[114.25898602,30.4316585,0],[114.25933858,30.43192711,0],[114.25940492,30.43196779,0],[114.25944543,30.43198589,0],[114.2596009,30.43203453,0],[114.25965384,30.4320445,0],[114.25974608,30.4320505,0],[114.26009895,30.43203439,0]]]]},"geometry_name":"geom","properties":{"areaid":"3","areaname":"中区","name":"中区","layer":"中区","population":0,"quantity":null,"shape_leng":null,"owner":"武汉交通职业学院","shape_area":null}},{"type":"Feature","id":"dma_jtzy.4","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26511331,30.43302789,0],[114.26510325,30.43291923,0],[114.26461814,30.4302517,0],[114.26419536,30.43026545,0],[114.26324358,30.43031521,0],[114.26307394,30.43033259,0],[114.2630293,30.43034248,0],[114.26297973,30.43036384,0],[114.2622888,30.43103659,0],[114.26207732,30.43124196,0],[114.26145453,30.43184335,0],[114.26127427,30.43193949,0],[114.26116805,30.43197102,0],[114.26040012,30.43201847,0],[114.26009895,30.43203439,0],[114.25974608,30.4320505,0],[114.25965384,30.4320445,0],[114.2596009,30.43203453,0],[114.25944543,30.43198589,0],[114.25940492,30.43196779,0],[114.25933858,30.43192711,0],[114.25898602,30.4316585,0],[114.25891147,30.43160204,0],[114.25883774,30.4316226,0],[114.25867403,30.43168061,0],[114.25851032,30.43173862,0],[114.25850761,30.4317395,0],[114.25850259,30.43174057,0],[114.25849745,30.43174098,0],[114.25847864,30.43174216,0],[114.25848459,30.43183784,0],[114.25854043,30.43265114,0],[114.25858892,30.43336195,0],[114.26511331,30.43302789,0]]]]},"geometry_name":"geom","properties":{"areaid":"4","areaname":"北区","name":"北区","layer":"北区","population":0,"quantity":null,"shape_leng":null,"owner":"武汉交通职业学院","shape_area":null}},{"type":"Feature","id":"dma_jtzy.5","geometry":{"type":"MultiPolygon","coordinates":[[[[114.25858847,30.43336197,0],[114.25848459,30.43183784,0],[114.25847864,30.43174216,0],[114.25849745,30.43174098,0],[114.25850259,30.43174057,0],[114.25850761,30.4317395,0],[114.25883774,30.4316226,0],[114.25891147,30.43160204,0],[114.25885327,30.43155661,0],[114.25856628,30.43133256,0],[114.25846313,30.43121156,0],[114.25843544,30.43116247,0],[114.25841333,30.4311113,0],[114.25839703,30.43105852,0],[114.25838667,30.43100462,0],[114.2583745,30.43084694,0],[114.25835992,30.43063527,0],[114.25834313,30.43039117,0],[114.2583282,30.43017418,0],[114.25831277,30.42994891,0],[114.25831722,30.42987889,0],[114.25833065,30.42980878,0],[114.25838979,30.42968025,0],[114.25844858,30.42959222,0],[114.25892644,30.42912255,0],[114.25905467,30.42899778,0],[114.25951029,30.42854355,0],[114.25948022,30.42809226,0],[114.2583849,30.42815325,0],[114.2582518,30.42669862,0],[114.25647827,30.42678945,0],[114.25641735,30.42683401,0],[114.25639068,30.42693629,0],[114.25704492,30.42953728,0],[114.25709464,30.43027182,0],[114.25710651,30.43044053,0],[114.25712556,30.43071986,0],[114.2571379,30.43088532,0],[114.2573035,30.43331888,0],[114.25731713,30.43335244,0],[114.25734964,30.43338864,0],[114.25744228,30.43342067,0],[114.25858847,30.43336197,0]]]]},"geometry_name":"geom","properties":{"areaid":"5","areaname":"西区","name":"西区","layer":"西区","population":0,"quantity":null,"shape_leng":null,"owner":"武汉交通职业学院","shape_area":null}}],"totalFeatures":5,"numberMatched":5,"numberReturned":5,"timeStamp":"2020-10-19T03:01:16.251Z","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}}}
  const echarts = require('echarts/dist/echarts');
  import map from '../../js/map'

  export default {
    components: {},
    name: "d-m-a-navigation",
    data() {
      const getDT = _ => {
        var dt1 = [];
        let params = {
          dt1: dt1,
        }
        return params;
      }
      return {
        radio: '70',
        radioUrl: '3',
        dt1: getDT().dt1,
        current: [],  //当日水量
        weekIncrement: [],  //周同比增减量
        weekRatio: [], //周同比增减率
        minimumIncrement: [], //最小流量周同比增减量
        minimumRatio: [], //最小流量周同比增减率
        compositeIndex: [], //综合漏损指数
        max: 1000,  //热力图最大值
        min: 0, //热力图最小值
        url: 'DMAMinimumFlowMonitoring', //跳转路径
        legend: [],
      }
    },

    created() {
      this.getInf();
    },

    methods: {
      /*获取DMA信息*/
      async getInf() {
        let wc, lf, data = [];
        let time = new Date(new Date().getTime() - 24 * 3600 * 1000);
        let yy = time.getFullYear();
        let mm = time.getMonth() + 1;
        mm = mm < 10 ? '0' + mm : mm;
        let dd = time.getDate();
        dd = dd < 10 ? '0' + dd : dd;
        let inf = await this.$api.regionInf.findAll({statisticstype: 'DMA'});
        if (typeof inf == 'object' && inf.length > 0) {
          inf.forEach(item => {
            this.$api.regionData.findLeakageIndex({
              waterregionid: item.id,
              time: yy + '-' + mm + '-' + dd
            }).then(res => {
              let a = res.data;
              if (a) {
                data.push({
                  id: item.id,
                  name: item.name,
                  address: item.address,
                  value: a.leakageIndex,
                  total: a.total,
                  addTotal: a.addTotal,
                  addRangeTotal: parseFloat(a.addRangeTotal),
                  addMin: a.addMin,
                  addRangeMin: parseFloat(a.addRangeMin),
                  leakageIndex: a.leakageIndex,
                })
              } else {
                data.push({
                  id: item.id,
                  name: item.name,
                  address: item.address,
                  value: 0,
                  total: 0,
                  addTotal: 0,
                  addRangeTotal: 0,
                  addMin: 0,
                  addRangeMin: 0,
                  leakageIndex: 0,
                })
              }
              if (data.length == inf.length) {
                this.$api.navigation.findAllStandard().then(res => {
                  this.legend = res.data;
                  wc = data.filter(item => item.address == '武汉交通职业学院');
                  this.dt1 = wc;
                  console.log(wc)
                  this.init1();
                })
              }
            })
          })
        }
      },
      /*给图例赋值*/
      getLegendData(options) {
        let legend = this.legend;
        let category = this.radio;
        let pieces = [], obj;
        let color = ["#159c14", "#51b447", "#53c257", "#d5ffc7", "#f4ffee", "#FFFFFF", "#ffe1c5", "#ffc7b5", "#ff8e7a", "#ff6f64", "#ff4036", "#c13330", "#b43330", "#762421", "#000000"]
        let arr = legend.filter(item => item.category == category);
        if (arr.length > 0) {
          obj = arr[0];
          pieces.push({max: obj['range1'], label: '<' + obj['range1'], color: color[0]})
          for (var i = 1; i < 14; i++) {
            let min = 'range' + i;
            let max = 'range' + (i + 1);
            min = obj[min];
            max = obj[max];
            if (i < 13) {
              pieces.push({min: min, max: max - 1, label: min + '~' + (max - 1), color: color[i]});
            } else {
              pieces.push({min: min, max: max - 1, label: min + '~' + max, color: color[i]});
            }
          }
          pieces.push({min: obj['range14'], label: '>' + obj['range14'], color: color[14]});
        } else {
          pieces.push({min: 0, max: 0, label: 0, color: color[0]})
        }
        options.visualMap.pieces = pieces;
        return options;
      },
      /*切换跳转路径*/
      changeUrl() {
        switch (this.radioUrl) {
          case '1' :
            this.url = 'DMAWaterUseOverview';
            break;
          case '2' :
            this.url = 'DMAWaterSupervision';
            break;
          case '3' :
            this.url = 'DMAMinimumFlowMonitoring';
            break;
        }
      },
      /*切换指标*/
      change(params) {
        switch (params) {
          case '10':
            this.changeByName('total');
            break;
          case '20':
            this.changeByName('addTotal');
            break;
          case '30':
            this.changeByName('addRangeTotal');
            break;
          case '50':
            this.changeByName('addMin');
            break;
          case '60':
            this.changeByName('addRangeMin');
            break;
          case '70':
            this.changeByName('leakageIndex');
        }
        this.init1();
      },
      /*根据字段名切换value的值*/
      changeByName(name) {
        this.dt1.forEach(item => {
          item.value = item[name];
        })
      },
      /*根据字段名取出最大值和最小值*/
      getMaxAndMin(arr, name) {
        if (typeof arr == 'object' && arr.length > 0) {
          arr.sort(this.compare(name));
        }
        return {max: arr[0][name], min: arr[arr.length - 1][name]};
      },
      /*指标参数赋值给dt对应的DMA value*/
      /*对象数组排序*/
      compare(name) {
        return function (a, b) {
          var value1 = a[name];
          var value2 = b[name];
          return value1 - value2;
        }
      },
      init1() {
        // var params = this.getMaxAndMin(this.dt1, 'value');
        let options = map.getMapOptions(this.dt1);
        options = this.getLegendData(options);
        echarts.registerMap('wc', wuChang);
        var myChart = echarts.init(this.$refs.map);
        myChart.setOption(options, true);
        myChart.on('click', (params) => {
          this.$router.push({
            name: this.url,
            params: {
              name: params.data.name,
              id: params.data.id
            }
          })
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../../static/css/dmaNavigation.css";
</style>
