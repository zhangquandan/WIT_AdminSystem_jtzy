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
                <div class="box-header bg-aqua">武昌校区漏损导图</div>
                <div class="box-body">
                  <div class="area-map">
                    <div id="map" :style="{height:'100%',width:'100%'}" ref="map"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="liu-fang">
              <div class="box box-solid">
                <div class="box-header bg-aqua">流芳校区漏损导图</div>
                <div class="box-body">
                  <div class="area-map">
                    <div id="mapL" :style="{height:'100%',width:'100%'}" ref="mapL"></div>
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
  var wuChang = {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "id": "wcdma.1",
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [[[[114.38514691, 30.50203192, 0], [114.38573877, 30.50197254, 0], [114.38572262, 30.50192284, 0], [114.38547597, 30.50116383, 0], [114.38428845, 30.50174404, 0], [114.38383032, 30.50204848, 0], [114.38383044, 30.50228857, 0], [114.38411779, 30.50228846, 0], [114.38411797, 30.50263488, 0], [114.38514531, 30.50263448, 0], [114.38514691, 30.50203192, 0]]]]
      },
      "geometry_name": "the_geom",
      "properties": {
        "stroke": "#555555",
        "stroke-width": 2,
        "stroke-opacity": 1,
        "fill": "#555555",
        "fill-opacity": 0.5,
        "AreaID": 1,
        "AreaName": "区域：A01 区域水量=A-A01",
        "Handle": "21C",
        "Layer": "A01",
        "Population": 0,
        "Quantity": 0,
        "Shape_Leng": 594.6913673,
        "Owner": "武昌校区",
        "Shape_Area": 16456.8305667,
        "name": "A01"
      }
    }, {
      "type": "Feature",
      "id": "wcdma.2",
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [[[[114.38291138, 30.50375865, 0], [114.38363444, 30.50375837, 0], [114.38363441, 30.50370328, 0], [114.38514588, 30.50370269, 0], [114.38514531, 30.50263448, 0], [114.38411797, 30.50263488, 0], [114.38411779, 30.50228846, 0], [114.38383044, 30.50228857, 0], [114.38383032, 30.50204848, 0], [114.38150339, 30.50356014, 0], [114.38145977, 30.50544521, 0], [114.38289574, 30.50546473, 0], [114.38291138, 30.50375865, 0]]]]
      },
      "geometry_name": "the_geom",
      "properties": {
        "stroke": "#555555",
        "stroke-width": 2,
        "stroke-opacity": 1,
        "fill": "#555555",
        "fill-opacity": 0.5,
        "AreaID": 2,
        "AreaName": "区域：A02 区域水量=A01",
        "Handle": "21E",
        "Layer": "A02",
        "Population": 0,
        "Quantity": 0,
        "Shape_Leng": 1345.54021321,
        "Owner": "武昌校区",
        "Shape_Area": 65247.8686479,
        "name": "A02"
      }
    }, {
      "type": "Feature",
      "id": "wcdma.3",
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [[[[114.3838142, 30.50542356, 0], [114.38434539, 30.50542335, 0], [114.38434502, 30.50471609, 0], [114.38363493, 30.50471637, 0], [114.38363444, 30.50375837, 0], [114.38291138, 30.50375865, 0], [114.38289574, 30.50546473, 0], [114.38295407, 30.50625051, 0], [114.38381462, 30.50625018, 0], [114.3838142, 30.50542356, 0]]]]
      },
      "geometry_name": "the_geom",
      "properties": {
        "stroke": "#555555",
        "stroke-width": 2,
        "stroke-opacity": 1,
        "fill": "#555555",
        "fill-opacity": 0.5,
        "AreaID": 3,
        "AreaName": "区域：A03 区域水量=B0104",
        "Handle": 221,
        "Layer": "A03",
        "Population": 0,
        "Quantity": 0,
        "Shape_Leng": 823.85958186,
        "Owner": "武昌校区",
        "Shape_Area": 26138.6494432,
        "name": "A03"
      }
    }, {
      "type": "Feature",
      "id": "wcdma.4",
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [[[[114.38593577, 30.50542272, 0], [114.3851468, 30.50542303, 0], [114.38514588, 30.50370269, 0], [114.38363441, 30.50370328, 0], [114.38363444, 30.50375837, 0], [114.38363493, 30.50471637, 0], [114.38434502, 30.50471609, 0], [114.38434539, 30.50542335, 0], [114.38465972, 30.50542322, 0], [114.38466015, 30.50624985, 0], [114.38593622, 30.50624934, 0], [114.38593577, 30.50542272, 0]]]]
      },
      "geometry_name": "the_geom",
      "properties": {
        "stroke": "#555555",
        "stroke-width": 2,
        "stroke-opacity": 1,
        "fill": "#555555",
        "fill-opacity": 0.5,
        "AreaID": 4,
        "AreaName": "区域：A04 区域水量=B0106",
        "Handle": 220,
        "Layer": "A04",
        "Population": 0,
        "Quantity": 0,
        "Shape_Leng": 1006.3792,
        "Owner": "武昌校区",
        "Shape_Area": 33553.0207895,
        "name": "A04"
      }
    }, {
      "type": "Feature",
      "id": "wcdma.5",
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [[[[114.38434957, 30.50690616, 0], [114.38593657, 30.50690553, 0], [114.38593622, 30.50624934, 0], [114.38466015, 30.50624985, 0], [114.38465972, 30.50542322, 0], [114.38434539, 30.50542335, 0], [114.3838142, 30.50542356, 0], [114.38381462, 30.50625018, 0], [114.38295407, 30.50625051, 0], [114.38300877, 30.50698731, 0], [114.38434961, 30.50698679, 0], [114.38434957, 30.50690616, 0]]]]
      },
      "geometry_name": "the_geom",
      "properties": {
        "stroke": "#555555",
        "stroke-width": 2,
        "stroke-opacity": 1,
        "fill": "#555555",
        "fill-opacity": 0.5,
        "AreaID": 5,
        "AreaName": "区域：A05 区域水量=B01-B0104-B0106",
        "Handle": 223,
        "Layer": "A05",
        "Population": 0,
        "Quantity": 0,
        "Shape_Leng": 914.130688103,
        "Owner": "武昌校区",
        "Shape_Area": 29246.731722,
        "name": "A05"
      }
    }, {
      "type": "Feature",
      "id": "wcdma.6",
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [[[[114.38532738, 30.50716458, 0], [114.38593671, 30.50717201, 0], [114.38593657, 30.50690553, 0], [114.38434957, 30.50690616, 0], [114.38434961, 30.50698679, 0], [114.38434973, 30.50721046, 0], [114.38532738, 30.50716458, 0]]]]
      },
      "geometry_name": "the_geom",
      "properties": {
        "stroke": "#555555",
        "stroke-width": 2,
        "stroke-opacity": 1,
        "fill": "#555555",
        "fill-opacity": 0.5,
        "AreaID": 6,
        "AreaName": "区域：A07 区域水量=D",
        "Handle": "22E",
        "Layer": "A07",
        "Population": 0,
        "Quantity": 0,
        "Shape_Leng": 368.098492525,
        "Owner": "武昌校区",
        "Shape_Area": 4632.39189532,
        "name": "A07"
      }
    }, {
      "type": "Feature",
      "id": "wcdma.7",
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [[[[114.38434973, 30.50721046, 0], [114.38434961, 30.50698679, 0], [114.38300877, 30.50698731, 0], [114.38302986, 30.50727142, 0], [114.38434973, 30.50721046, 0]]]]
      },
      "geometry_name": "the_geom",
      "properties": {
        "stroke": "#555555",
        "stroke-width": 2,
        "stroke-opacity": 1,
        "fill": "#555555",
        "fill-opacity": 0.5,
        "AreaID": 7,
        "AreaName": "区域：A06 区域水量=C",
        "Handle": "22D",
        "Layer": "A06",
        "Population": 0,
        "Quantity": 0,
        "Shape_Leng": 311.943137916,
        "Owner": "武昌校区",
        "Shape_Area": 3597.80722424,
        "name": "A06"
      }
    }, {
      "type": "Feature",
      "id": "wcdma.8",
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [[[[114.38768622, 30.50409038, 0], [114.3885484, 30.50420278, 0], [114.38858886, 30.50349901, 0], [114.38770277, 30.50349939, 0], [114.38775131, 30.50171465, 0], [114.38572262, 30.50192284, 0], [114.38573877, 30.50197254, 0], [114.38514691, 30.50203192, 0], [114.3851468, 30.50542303, 0], [114.38593577, 30.50542272, 0], [114.38593622, 30.50624934, 0], [114.38593657, 30.50690553, 0], [114.38593671, 30.50717201, 0], [114.38599281, 30.50718195, 0], [114.3875918, 30.50738276, 0], [114.38768622, 30.50409038, 0]]]]
      },
      "geometry_name": "the_geom",
      "properties": {
        "stroke": "#555555",
        "stroke-width": 2,
        "stroke-opacity": 1,
        "fill": "#555555",
        "fill-opacity": 0.5,
        "AreaID": 8,
        "AreaName": "区域：A08 区域水量=E",
        "Handle": "22F",
        "Layer": "A08",
        "Population": 0,
        "Quantity": 0,
        "Shape_Leng": 1875.12708538,
        "Owner": "武昌校区",
        "Shape_Area": 136072.355843,
        "name": "A08"
      }
    }]
  };
  // var liuFang = {"type":"FeatureCollection","features":[{"type":"Feature","id":"lfdma_update2.1","geometry":{"type":"MultiPolygon","coordinates":[[[[114.42599416,30.46448436],[114.42602137,30.46441949],[114.42605281,30.46436031],[114.42610093,30.46428805],[114.4261397,30.46424009],[114.42617552,30.46420154],[114.42622524,30.46415423],[114.4262711,30.46411368],[114.4263388,30.4640584],[114.42640706,30.4640073],[114.42647,30.46395951],[114.42652406,30.46391642],[114.42658285,30.46386725],[114.42665227,30.46380584],[114.42673298,30.4637317],[114.42680686,30.46366286],[114.42688065,30.46359224],[114.42697493,30.46343598],[114.42700715,30.46334817],[114.42702334,30.46327546],[114.42703223,30.46320768],[114.42703426,30.46308826],[114.42645952,30.46304724],[114.42581045,30.4624707],[114.42581405,30.46239227],[114.42690408,30.46147733],[114.42666005,30.46125952],[114.42602164,30.46177577],[114.4255419,30.4621314],[114.42518981,30.46236819],[114.42501608,30.4624702],[114.42463361,30.46267382],[114.42392129,30.46303485],[114.42440798,30.46424825],[114.42456078,30.4642594],[114.42464473,30.46427127],[114.42508583,30.46436646],[114.42599416,30.46448436]]]]},"geometry_name":"the_geom","properties":{"OBJECTID":1,"AreaID":0,"Entity":"LWPolyline","Layer":"A14","Color":5,"Linetype":"Continuous","Elevation":0,"LineWt":25,"RefName":"","Shape_Leng":1150.38030174,"Shape_Area":51802.9499377,"name":"A14"}},{"type":"Feature","id":"lfdma_update2.2","geometry":{"type":"MultiPolygon","coordinates":[[[[114.42372431,30.46695874],[114.42496937,30.46709683],[114.42518639,30.46542576],[114.42398799,30.46529317],[114.42373361,30.46689995],[114.42267845,30.46678054],[114.42282242,30.46590455],[114.42176202,30.4657923],[114.42145429,30.46614812],[114.4206254,30.466238],[114.42009556,30.46601182],[114.41955769,30.46668623],[114.41955278,30.46674685],[114.41957133,30.46676608],[114.41959974,30.46678253],[114.41962764,30.46679232],[114.4214308,30.46676425],[114.42276067,30.46686268],[114.42372431,30.46695874]]]]},"geometry_name":"the_geom","properties":{"OBJECTID":2,"AreaID":0,"Entity":"LWPolyline","Layer":"A12","Color":5,"Linetype":"Continuous","Elevation":0,"LineWt":25,"RefName":"","Shape_Leng":1592.96260445,"Shape_Area":47006.5183734,"name":"A12"}},{"type":"Feature","id":"lfdma_update2.3","geometry":{"type":"MultiPolygon","coordinates":[[[[114.42293884,30.46486269],[114.42180342,30.4641637],[114.42161879,30.46427275],[114.42142039,30.46441277],[114.42122613,30.46459341],[114.42078895,30.46501914],[114.42059739,30.46534284],[114.42009556,30.46601182],[114.4206254,30.466238],[114.42145429,30.46614812],[114.42176202,30.4657923],[114.42282242,30.46590455],[114.42267845,30.46678054],[114.42373361,30.46689995],[114.42381937,30.46635825],[114.42316499,30.46627484],[114.42318899,30.46617025],[114.42324441,30.465896],[114.42333685,30.46559821],[114.42261414,30.46515329],[114.42293884,30.46486269]]]]},"geometry_name":"the_geom","properties":{"OBJECTID":3,"AreaID":0,"Entity":"LWPolyline","Layer":"A13","Color":3,"Linetype":"Continuous","Elevation":0,"LineWt":25,"RefName":"","Shape_Leng":1219.20986479,"Shape_Area":46105.1084299,"name":"A13"}},{"type":"Feature","id":"lfdma_update2.4","geometry":{"type":"MultiPolygon","coordinates":[[[[114.42887957,30.46134059],[114.4288827,30.46210816],[114.4291579,30.46224663],[114.42931799,30.46236145],[114.42949387,30.46254003],[114.42959035,30.4626936],[114.42965192,30.46284939],[114.42969682,30.46301657],[114.42970644,30.46314921],[114.42970135,30.46324896],[114.42969322,30.46331536],[114.42968013,30.46341246],[114.42964241,30.46362808],[114.42960027,30.46392422],[114.42935299,30.46546583],[114.43106145,30.46555059],[114.43107229,30.46535502],[114.43110738,30.46504007],[114.43121883,30.46410886],[114.43127427,30.46364555],[114.43112868,30.46363248],[114.43103632,30.462944],[114.43087657,30.46155046],[114.43078872,30.46119649],[114.43032085,30.46067797],[114.43029298,30.4606605],[114.43026539,30.46066926],[114.4297798,30.46100912],[114.42972899,30.46099814],[114.42962457,30.46087078],[114.42904066,30.46013384],[114.42873406,30.45978748],[114.42861612,30.45965425],[114.42804075,30.46016564],[114.427841,30.46033879],[114.42887957,30.46134059]]]]},"geometry_name":"the_geom","properties":{"OBJECTID":4,"AreaID":0,"Entity":"LWPolyline","Layer":"A10","Color":1,"Linetype":"Continuous","Elevation":0,"LineWt":25,"RefName":"","Shape_Leng":1738.03723551,"Shape_Area":96951.288157,"name":"A10"}},{"type":"Feature","id":"lfdma_update2.5","geometry":{"type":"MultiPolygon","coordinates":[[[[114.42861612,30.45965425],[114.42904066,30.46013384],[114.42962457,30.46087078],[114.42972899,30.46099814],[114.4297798,30.46100912],[114.43026539,30.46066926],[114.43029298,30.4606605],[114.43032085,30.46067797],[114.43078872,30.46119649],[114.43087657,30.46155046],[114.43103632,30.462944],[114.43112868,30.46363248],[114.43127427,30.46364555],[114.43192135,30.45823815],[114.43192116,30.45804354],[114.43176821,30.45780865],[114.43128969,30.4576913],[114.42861612,30.45965425]]]]},"geometry_name":"the_geom","properties":{"OBJECTID":5,"AreaID":0,"Entity":"LWPolyline","Layer":"A15","Color":5,"Linetype":"Continuous","Elevation":0,"LineWt":25,"RefName":"","Shape_Leng":1652.25262311,"Shape_Area":86720.3338873,"name":"A15"}},{"type":"Feature","id":"lfdma_update2.6","geometry":{"type":"MultiPolygon","coordinates":[[[[114.43103792,30.4663139],[114.43103638,30.46602828],[114.43105062,30.46574617],[114.43106145,30.46555059],[114.42935299,30.46546583],[114.42960027,30.46392422],[114.42964241,30.46362808],[114.42968013,30.46341246],[114.42969322,30.46331536],[114.42970135,30.46324896],[114.42970644,30.46314921],[114.42969682,30.46301657],[114.42965192,30.46284939],[114.42959035,30.4626936],[114.42949387,30.46254003],[114.42931799,30.46236145],[114.4291579,30.46224663],[114.4288827,30.46210816],[114.42887957,30.46134059],[114.427841,30.46033879],[114.42666005,30.46125952],[114.42690408,30.46147733],[114.42581405,30.46239227],[114.42581045,30.4624707],[114.42645952,30.46304724],[114.42703426,30.46308826],[114.42703223,30.46320768],[114.42702334,30.46327546],[114.42700715,30.46334817],[114.42697493,30.46343598],[114.42688065,30.46359224],[114.42680686,30.46366286],[114.42673298,30.4637317],[114.42665227,30.46380584],[114.42658285,30.46386725],[114.42652406,30.46391642],[114.42647,30.46395951],[114.42640706,30.4640073],[114.4263388,30.4640584],[114.4262711,30.46411368],[114.42622524,30.46415423],[114.42617552,30.46420154],[114.4261397,30.46424009],[114.42610093,30.46428805],[114.42605281,30.46436031],[114.42602137,30.46441949],[114.42599416,30.46448436],[114.42595222,30.46457916],[114.42588799,30.4647973],[114.42588439,30.46491413],[114.42590951,30.46523914],[114.42599355,30.46551844],[114.42631455,30.46592077],[114.42672354,30.46618508],[114.42711933,30.4663108],[114.42906059,30.46651641],[114.42912466,30.46647098],[114.42918888,30.46643248],[114.42974325,30.46648676],[114.43023044,30.4662391],[114.43103792,30.4663139]]]]},"geometry_name":"the_geom","properties":{"OBJECTID":6,"AreaID":0,"Entity":"LWPolyline","Layer":"A09","Color":3,"Linetype":"Continuous","Elevation":0,"LineWt":25,"RefName":"","Shape_Leng":2216.45462517,"Shape_Area":192160.762392,"name":"A09"}},{"type":"Feature","id":"lfdma_update2.7","geometry":{"type":"MultiPolygon","coordinates":[[[[114.43103792,30.4663139],[114.43023044,30.4662391],[114.42974325,30.46648676],[114.42918888,30.46643248],[114.42906059,30.46651641],[114.42711933,30.4663108],[114.42672354,30.46618508],[114.42631455,30.46592077],[114.42599355,30.46551844],[114.42590951,30.46523914],[114.42588439,30.46491413],[114.42588799,30.4647973],[114.42595222,30.46457916],[114.42599416,30.46448436],[114.42508583,30.46436646],[114.42464473,30.46427127],[114.42456078,30.4642594],[114.42440798,30.46424825],[114.42416343,30.46426049],[114.42332404,30.46461125],[114.4232229,30.46460844],[114.42293884,30.46486269],[114.42261414,30.46515329],[114.42333685,30.46559821],[114.42324441,30.465896],[114.42323825,30.46593767],[114.42316499,30.46627484],[114.42381937,30.46635825],[114.42398799,30.46529317],[114.42518639,30.46542576],[114.42496937,30.46709683],[114.42933224,30.46754846],[114.42951154,30.46757107],[114.43089409,30.46781111],[114.43106256,30.4677987],[114.43104302,30.46726269],[114.43103792,30.4663139]]]]},"geometry_name":"the_geom","properties":{"OBJECTID":7,"AreaID":0,"Entity":"LWPolyline","Layer":"A11","Color":1,"Linetype":"Continuous","Elevation":0,"LineWt":25,"RefName":"","Shape_Leng":2414.39885326,"Shape_Area":118169.347256,"name":"A11"}}],"totalFeatures":7,"numberMatched":7,"numberReturned":7,"timeStamp":"2020-07-14T01:23:47.384Z","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}}};
  var liuFang = {"type":"FeatureCollection","features":[{"type":"Feature","id":"lfdma_update4.1","geometry":{"type":"MultiPolygon","coordinates":[[[[114.43192135,30.45823815,0],[114.43192116,30.45804354,0],[114.43176821,30.45780865,0],[114.43128969,30.4576913,0],[114.42861612,30.45965425,0],[114.42873406,30.45978748,0],[114.42904065,30.46013384,0],[114.42962457,30.46087078,0],[114.42972899,30.46099814,0],[114.4297798,30.46100912,0],[114.43026539,30.46066926,0],[114.43029298,30.4606605,0],[114.43032085,30.46067797,0],[114.43078872,30.46119649,0],[114.43087657,30.46155046,0],[114.43103632,30.462944,0],[114.43112868,30.46363248,0],[114.43127427,30.46364555,0],[114.43192135,30.45823815,0]]]]},"geometry_name":"the_geom","properties":{"name":"A16"}},{"type":"Feature","id":"lfdma_update4.2","geometry":{"type":"MultiPolygon","coordinates":[[[[114.42602137,30.46441949,0],[114.42605281,30.46436031,0],[114.42610093,30.46428805,0],[114.4261397,30.46424009,0],[114.42617552,30.46420154,0],[114.42622524,30.46415423,0],[114.4262711,30.46411368,0],[114.4263388,30.4640584,0],[114.42640706,30.4640073,0],[114.42647,30.46395951,0],[114.42652406,30.46391642,0],[114.42658285,30.46386724,0],[114.42665227,30.46380584,0],[114.42673298,30.4637317,0],[114.42680686,30.46366286,0],[114.42688065,30.46359224,0],[114.42697493,30.46343598,0],[114.42700715,30.46334817,0],[114.42702335,30.46327546,0],[114.42703223,30.46320768,0],[114.42703426,30.46308826,0],[114.42645952,30.46304724,0],[114.42581045,30.4624707,0],[114.42581405,30.46239227,0],[114.42690408,30.46147733,0],[114.42666005,30.46125952,0],[114.42602164,30.46177577,0],[114.4255419,30.4621314,0],[114.42518981,30.46236819,0],[114.42501608,30.4624702,0],[114.42463361,30.46267382,0],[114.42392129,30.46303485,0],[114.42440798,30.46424825,0],[114.42456078,30.46425939,0],[114.42464473,30.46427127,0],[114.42508583,30.46436646,0],[114.42599416,30.46448436,0],[114.42602137,30.46441949,0]]]]},"geometry_name":"the_geom","properties":{"name":"A15"}},{"type":"Feature","id":"lfdma_update4.3","geometry":{"type":"MultiPolygon","coordinates":[[[[114.43107229,30.46535502,0],[114.43110738,30.46504007,0],[114.43121882,30.46410886,0],[114.43127427,30.46364555,0],[114.43112868,30.46363248,0],[114.43103632,30.462944,0],[114.43087657,30.46155046,0],[114.43078872,30.46119649,0],[114.43032085,30.46067797,0],[114.43029298,30.4606605,0],[114.43026539,30.46066926,0],[114.4297798,30.46100912,0],[114.42972899,30.46099814,0],[114.42962457,30.46087078,0],[114.42904065,30.46013384,0],[114.42873406,30.45978748,0],[114.42861612,30.45965425,0],[114.42804075,30.46016564,0],[114.427841,30.46033879,0],[114.42887957,30.46134059,0],[114.4288827,30.46210816,0],[114.4291579,30.46224663,0],[114.42931799,30.46236145,0],[114.42949387,30.46254003,0],[114.42959035,30.4626936,0],[114.42965192,30.46284939,0],[114.42969682,30.46301657,0],[114.42970644,30.46314921,0],[114.42970135,30.46324896,0],[114.42969322,30.46331536,0],[114.42968013,30.46341246,0],[114.42964241,30.46362809,0],[114.42960027,30.46392422,0],[114.42935299,30.46546583,0],[114.43106145,30.46555059,0],[114.43107229,30.46535502,0]]]]},"geometry_name":"the_geom","properties":{"name":"A10"}},{"type":"Feature","id":"lfdma_update4.4","geometry":{"type":"MultiPolygon","coordinates":[[[[114.42912466,30.46647098,0],[114.42918888,30.46643248,0],[114.42974325,30.46648676,0],[114.43023044,30.4662391,0],[114.43103792,30.4663139,0],[114.43103638,30.46602828,0],[114.43105062,30.46574617,0],[114.43106145,30.46555059,0],[114.42935299,30.46546583,0],[114.42960027,30.46392422,0],[114.42964241,30.46362809,0],[114.42968013,30.46341246,0],[114.42969322,30.46331536,0],[114.42970135,30.46324896,0],[114.42970644,30.46314921,0],[114.42969682,30.46301657,0],[114.42965192,30.46284939,0],[114.42959035,30.4626936,0],[114.42949387,30.46254003,0],[114.42931799,30.46236145,0],[114.4291579,30.46224663,0],[114.4288827,30.46210816,0],[114.42887957,30.46134059,0],[114.427841,30.46033879,0],[114.42666005,30.46125952,0],[114.42690408,30.46147733,0],[114.42581405,30.46239227,0],[114.42581045,30.4624707,0],[114.42645952,30.46304724,0],[114.42703426,30.46308826,0],[114.42703223,30.46320768,0],[114.42702335,30.46327546,0],[114.42700715,30.46334817,0],[114.42697493,30.46343598,0],[114.42688065,30.46359224,0],[114.42680686,30.46366286,0],[114.42673298,30.4637317,0],[114.42665227,30.46380584,0],[114.42658285,30.46386724,0],[114.42652406,30.46391642,0],[114.42647,30.46395951,0],[114.42640706,30.4640073,0],[114.4263388,30.4640584,0],[114.4262711,30.46411368,0],[114.42622524,30.46415423,0],[114.42617552,30.46420154,0],[114.4261397,30.46424009,0],[114.42610093,30.46428805,0],[114.42605281,30.46436031,0],[114.42602137,30.46441949,0],[114.42599416,30.46448436,0],[114.42595222,30.46457916,0],[114.42588799,30.4647973,0],[114.42588439,30.46491413,0],[114.42590951,30.46523914,0],[114.42599355,30.46551844,0],[114.42631455,30.46592077,0],[114.42672354,30.46618508,0],[114.42711933,30.4663108,0],[114.42906059,30.46651641,0],[114.42912466,30.46647098,0]]]]},"geometry_name":"the_geom","properties":{"name":"A09"}},{"type":"Feature","id":"lfdma_update4.5","geometry":{"type":"MultiPolygon","coordinates":[[[[114.42531683,30.46601229,0],[114.42599355,30.46551844,0],[114.42590951,30.46523914,0],[114.42588439,30.46491413,0],[114.42588799,30.4647973,0],[114.42595222,30.46457916,0],[114.42599416,30.46448436,0],[114.42508583,30.46436646,0],[114.42464473,30.46427127,0],[114.42456078,30.46425939,0],[114.42440798,30.46424825,0],[114.42416343,30.46426049,0],[114.42332404,30.46461125,0],[114.4232229,30.46460844,0],[114.42293884,30.46486269,0],[114.42261414,30.46515329,0],[114.42333685,30.46559821,0],[114.42324441,30.465896,0],[114.42323825,30.46593767,0],[114.42320596,30.46608629,0],[114.42318899,30.46617025,0],[114.42316499,30.46627484,0],[114.42381937,30.46635825,0],[114.42398799,30.46529317,0],[114.42518639,30.46542576,0],[114.42501944,30.46671126,0],[114.42522532,30.46673685,0],[114.42531683,30.46601229,0]]]]},"geometry_name":"the_geom","properties":{"name":"A12"}},{"type":"Feature","id":"lfdma_update4.6","geometry":{"type":"MultiPolygon","coordinates":[[[[114.42381937,30.46635825,0],[114.42316499,30.46627484,0],[114.42320596,30.46608629,0],[114.42324441,30.465896,0],[114.42333685,30.46559821,0],[114.42261414,30.46515329,0],[114.42293884,30.46486269,0],[114.42180342,30.4641637,0],[114.42161879,30.46427275,0],[114.42142039,30.46441277,0],[114.42122613,30.46459341,0],[114.42078895,30.46501914,0],[114.42059739,30.46534284,0],[114.42009556,30.46601182,0],[114.4206254,30.466238,0],[114.42145429,30.46614812,0],[114.42176202,30.4657923,0],[114.42282242,30.46590455,0],[114.42267844,30.46678054,0],[114.42373362,30.46689995,0],[114.42381937,30.46635825,0]]]]},"geometry_name":"the_geom","properties":{"name":"A14"}},{"type":"Feature","id":"lfdma_update4.7","geometry":{"type":"MultiPolygon","coordinates":[[[[114.42501944,30.46671126,0],[114.42518639,30.46542576,0],[114.42398799,30.46529317,0],[114.42381937,30.46635825,0],[114.42373362,30.46689995,0],[114.42267844,30.46678054,0],[114.42282242,30.46590455,0],[114.42176202,30.4657923,0],[114.42145429,30.46614812,0],[114.4206254,30.466238,0],[114.42009556,30.46601182,0],[114.41955769,30.46668623,0],[114.41955278,30.46674685,0],[114.41957133,30.46676608,0],[114.41959974,30.46678253,0],[114.41962764,30.46679232,0],[114.4214308,30.46676425,0],[114.42276067,30.46686268,0],[114.42372431,30.46695874,0],[114.42496937,30.46709683,0],[114.42501944,30.46671126,0]]]]},"geometry_name":"the_geom","properties":{"name":"A13"}},{"type":"Feature","id":"lfdma_update4.8","geometry":{"type":"MultiPolygon","coordinates":[[[[114.43106256,30.4677987,0],[114.43104302,30.46726269,0],[114.43103792,30.4663139,0],[114.43023044,30.4662391,0],[114.42974325,30.46648676,0],[114.42918888,30.46643248,0],[114.42906059,30.46651641,0],[114.42711933,30.4663108,0],[114.42672354,30.46618508,0],[114.42631455,30.46592077,0],[114.42599355,30.46551844,0],[114.42531683,30.46601229,0],[114.42522532,30.46673685,0],[114.42501944,30.46671126,0],[114.42496937,30.46709683,0],[114.42933224,30.46754846,0],[114.42951154,30.46757107,0],[114.43089409,30.46781111,0],[114.43106256,30.4677987,0]]]]},"geometry_name":"the_geom","properties":{"name":"A11"}}],"totalFeatures":8,"numberMatched":8,"numberReturned":8,"timeStamp":"2020-09-04T08:46:46.274Z","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}}}
  const echarts = require('echarts/dist/echarts');
  import map from '../../js/map'

  export default {
    components: {},
    name: "d-m-a-navigation",
    data() {
      const getDT = _ => {
        /*var url = require('../../assets/logo.png');*/
        var dt1 = [
          {
            name: 'A01',
            value: 1,
            text: '用水情况',
            id: 53,
            current: 100,
            weekIncrement: 120,
            weekRatio: 0.1,
            minimumIncrement: 10,
            minimumRatio: '5%',
            compositeIndex: 10
          },
          {
            name: 'A02',
            value: 2,
            text: '用水情况',
            id: 54,
            current: 200,
            weekIncrement: 110,
            weekRatio: 0.2,
            minimumIncrement: 10,
            minimumRatio: '5%',
            compositeIndex: 10
          },
          {
            name: 'A03',
            value: 3,
            text: '用水情况',
            id: 55,
            current: 300,
            weekIncrement: 90,
            weekRatio: 0.3,
            minimumIncrement: 10,
            minimumRatio: '5%',
            compositeIndex: 10
          },
          {
            name: 'A04',
            value: 4,
            text: '用水情况',
            id: 56,
            current: 400,
            weekIncrement: 80,
            weekRatio: 0.4,
            minimumIncrement: 10,
            minimumRatio: '5%',
            compositeIndex: 10
          },
          {
            name: 'A05',
            value: 5,
            text: '用水情况',
            id: 57,
            current: 500,
            weekIncrement: 70,
            weekRatio: 0.5,
            minimumIncrement: 10,
            minimumRatio: '5%',
            compositeIndex: 10
          },
          {
            name: 'A06',
            value: 6,
            text: '用水情况',
            id: 58,
            current: 600,
            weekIncrement: 60,
            weekRatio: 0.6,
            minimumIncrement: 10,
            minimumRatio: '5%',
            compositeIndex: 10
          },
          {
            name: 'A07',
            value: 7,
            text: '用水情况',
            id: 59,
            current: 700,
            weekIncrement: 50,
            weekRatio: 0.7,
            minimumIncrement: 10,
            minimumRatio: '5%',
            compositeIndex: 10
          },
          {
            name: 'A08',
            value: 8,
            text: '用水情况',
            id: 60,
            current: 1000,
            weekIncrement: 40,
            weekRatio: 0.8,
            minimumIncrement: 10,
            minimumRatio: '5%',
            compositeIndex: 10
          },
        ];
        var dt2 = [
          {
            name: 'A09',
            value: 9,
            text: '用水情况',
            id: 61,
            current: 100,
            weekIncrement: 100,
            weekRatio: 0.6,
            minimumIncrement: 10,
            minimumRatio: '5%',
            compositeIndex: 10
          },
          {
            name: 'A10',
            value: 10,
            text: '用水情况',
            id: 62,
            current: 200,
            weekIncrement: 100,
            weekRatio: 0.5,
            minimumIncrement: 10,
            minimumRatio: '5%',
            compositeIndex: 10
          },
          {
            name: 'A11',
            value: 11,
            text: '用水情况',
            id: 63,
            current: 300,
            weekIncrement: 100,
            weekRatio: 0.3,
            minimumIncrement: 10,
            minimumRatio: '5%',
            compositeIndex: 10
          },
          {
            name: 'A12',
            value: 12,
            text: '用水情况',
            id: 64,
            current: 400,
            weekIncrement: 100,
            weekRatio: 0.2,
            minimumIncrement: 10,
            minimumRatio: '5%',
            compositeIndex: 10
          },
          {
            name: 'A13',
            value: 13,
            text: '用水情况',
            id: 65,
            current: 500,
            weekIncrement: 100,
            weekRatio: 0.7,
            minimumIncrement: 10,
            minimumRatio: '5%',
            compositeIndex: 10
          },
          {
            name: 'A14',
            value: 14,
            text: '用水情况',
            id: 66,
            current: 600,
            weekIncrement: 100,
            weekRatio: 0.8,
            minimumIncrement: 10,
            minimumRatio: '5%',
            compositeIndex: 10
          },
          {
            name: 'A15',
            value: 15,
            text: '用水情况',
            id: 67,
            current: 1000,
            weekIncrement: 100,
            weekRatio: 0.9,
            minimumIncrement: 10,
            minimumRatio: '5%',
            compositeIndex: 10
          },
          {
            name: 'A16',
            value: 16,
            text: '用水情况',
            id: 89,
            current: 1000,
            weekIncrement: 100,
            weekRatio: 0.9,
            minimumIncrement: 10,
            minimumRatio: '5%',
            compositeIndex: 10
          },
        ]
        let params = {
          dt1: dt1,
          dt2: dt2
        }
        return params;
      }
      return {
        radio: '70',
        radioUrl: '3',
        dt1: getDT().dt1,
        dt2: getDT().dt2,
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
      /*console.log(this.dt1)
      this.getMaxAndMin('current');
      let time = new Date();
      let yy = time.getFullYear();
      let mm = time.getMonth() + 1;
      mm = mm < 10 ? '0' + mm : mm;
      let dd = time.getDate();
      dd = dd < 10 ? '0' + dd : dd;
      let params = {waterregionid: 53,time: yy + '-' + mm + '-' + dd};
      this.$api.regionData.findLeakageIndex(params).then(res => {
        console.log(res);
      })*/
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
                  wc = data.filter(item => item.address == '武昌校区');
                  lf = data.filter(item => item.address == '流芳校区');
                  this.dt1 = wc;
                  this.dt2 = lf;
                  this.init1();
                  this.init2();
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
        /*options.visualMap.max = max;
        options.visualMap.min = min;*/
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
        this.init2();
      },
      /*根据字段名切换value的值*/
      changeByName(name) {
        this.dt1.forEach(item => {
          item.value = item[name];
        })
        this.dt2.forEach(item => {
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
        var params = this.getMaxAndMin(this.dt1, 'value');
        let options = map.getMapOptions(this.dt1);
        /*this.options1.visualMap.max = params.max;
        this.options1.visualMap.min = params.min;*/
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
      },
      init2() {
        //var params = this.getMaxAndMin(this.dt2,'value');
        let options = map.getMapOptions1(this.dt2);
        options = this.getLegendData(options);
        /*this.options1.visualMap.max = params.max;
        this.options1.visualMap.min = params.min;*/
        echarts.registerMap('lf', liuFang);
        var myChart = echarts.init(this.$refs.mapL);
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
