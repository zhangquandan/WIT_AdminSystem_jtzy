<!--建筑漏损导图-->
<template>
  <div class="flex">
    <div class="content body">
      <div class="navigation box box-solid">
        <div class="box-header bg-aqua">建筑漏损导图</div>
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
              <el-radio-button label="1">建筑用水概况</el-radio-button>
              <el-radio-button label="2">建筑水量管控</el-radio-button>
              <el-radio-button label="3">最小流量监测</el-radio-button>
            </el-radio-group>
          </div>
          <div class="navigation-area">
            <div class="wu-chang">
              <div class="box box-solid">
                <div class="box-header bg-aqua">武汉交通职业学院漏损导图</div>
                <div class="box-body">
                  <!--                  <img class="wc-back-image" src="../../../static/images/WC.png" alt="">-->
                  <div class="echarts-area">
                    <div id="map" ref="map"></div>
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
  var wuChang = {"type":"FeatureCollection","features":[{"type":"Feature","id":"building_jtzy.45","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26121333,30.4330103,0],[114.26119826,30.43278764,0],[114.2609728,30.43279921,0],[114.26098786,30.43302187,0],[114.26121333,30.4330103,0]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"BIM创新中心","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.8","geometry":{"type":"MultiPolygon","coordinates":[[[[114.25918232,30.42769763,12.081],[114.25918033,30.42766837,12.081],[114.25923821,30.42766557,12.081],[114.25923902,30.42766553,12.081],[114.25923085,30.42754624,12.081],[114.25866974,30.42757498,12.081],[114.25866642,30.42752636,12.081],[114.25840141,30.42753993,12.081],[114.25841155,30.42768868,12.081],[114.25859921,30.42767907,12.081],[114.25860171,30.42771563,12.081],[114.25867652,30.4277118,12.081],[114.25867732,30.4277235,12.081],[114.25918232,30.42769763,12.081]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"南苑二舍","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.9","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26222086,30.42776961,8.747],[114.26221546,30.4276906,8.747],[114.26157165,30.42772369,8.747],[114.26157697,30.42780261,8.747],[114.26222086,30.42776961,8.747]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"公租房4栋","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.2","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26125092,30.42712227,9.201],[114.26124553,30.42704328,9.201],[114.26076267,30.42706809,9.201],[114.26076799,30.42714701,9.201],[114.26125092,30.42712227,9.201]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"公租房7栋","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.4","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26219616,30.42742249,9.171],[114.26219077,30.42734348,9.171],[114.26154696,30.42737657,9.171],[114.26155228,30.42745549,9.171],[114.26219616,30.42742249,9.171]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"公租房6栋","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.10","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26129907,30.42781752,9.21],[114.26129368,30.42773854,9.21],[114.26081082,30.42776335,9.21],[114.26081614,30.42784227,9.21],[114.26129907,30.42781752,9.21]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"公租房3栋","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.11","geometry":{"type":"MultiPolygon","coordinates":[[[[114.25922824,30.42805517,11.558],[114.25922767,30.4280468,11.558],[114.25926487,30.42804489,11.558],[114.25925429,30.42788982,11.558],[114.25925398,30.42788985,11.558],[114.25873079,30.42791665,11.558],[114.2587269,30.42785956,11.558],[114.25864782,30.42786361,11.558],[114.2586485,30.42787351,11.558],[114.2584254,30.42788494,11.558],[114.25843642,30.42804648,11.558],[114.25858855,30.42803869,11.558],[114.25858793,30.42802969,11.558],[114.25869704,30.4280241,11.558],[114.258701,30.42808218,11.558],[114.25922824,30.42805517,11.558]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"南苑一舍","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.12","geometry":{"type":"MultiPolygon","coordinates":[[[[114.2622447,30.42811748,9.073],[114.26223931,30.42803847,9.073],[114.26159549,30.42807156,9.073],[114.26160081,30.42815048,9.073],[114.2622447,30.42811748,9.073]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"公租房2栋","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.13","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26132222,30.42816474,9.185],[114.26131683,30.42808575,9.185],[114.26083396,30.42811057,9.185],[114.26083928,30.42818948,9.185],[114.26132222,30.42816474,9.185]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"公租房1栋","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.14","geometry":{"type":"MultiPolygon","coordinates":[[[[114.25726671,30.42831943,0],[114.25717155,30.42698032,0],[114.25708966,30.42698483,0],[114.25707361,30.42713112,0],[114.25714814,30.42818004,0],[114.25718482,30.42832366,0],[114.25726671,30.42831943,0]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"体育馆","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.16","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26222442,30.42835476,0],[114.26221819,30.42826472,0],[114.2620132,30.42827536,0],[114.26201943,30.4283654,0],[114.26222442,30.42835476,0]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"公租房泵房","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.20","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26309065,30.42961573,0],[114.26308591,30.4295463,0],[114.2629716,30.42955216,0],[114.26297634,30.42962159,0],[114.26309065,30.42961573,0]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"转运站","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.6","geometry":{"type":"MultiPolygon","coordinates":[[[[114.2612748,30.42746983,9.185],[114.26126941,30.42739084,9.185],[114.26078655,30.42741565,9.185],[114.26079187,30.42749457,9.185],[114.2612748,30.42746983,9.185]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"公租房5栋","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.22","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26332662,30.42980934,0],[114.26332314,30.42975825,0],[114.26319559,30.42976479,0],[114.26319908,30.42981587,0],[114.26332662,30.42980934,0]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"花房","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.40","geometry":{"type":"MultiPolygon","coordinates":[[[[114.25840251,30.42918081,10.573],[114.25840035,30.42914923,10.573],[114.25830039,30.42915435,10.573],[114.25830254,30.42918593,10.573],[114.25840251,30.42918081,10.573]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"泵房","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.41","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26169073,30.43012706,0],[114.26169147,30.43013787,0],[114.26176795,30.43013395,0],[114.26176721,30.43012314,0],[114.2620967,30.43010761,0],[114.26208773,30.42997614,0],[114.26203577,30.4299788,0],[114.26203184,30.42992117,0],[114.26183898,30.42993106,0],[114.26175481,30.42993537,0],[114.26130695,30.42995832,0],[114.26131769,30.43014618,0],[114.26169073,30.43012706,0]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"教学楼南楼","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.42","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26180969,30.43073957,0],[114.26189386,30.43073526,0],[114.26208672,30.43072537,0],[114.26208279,30.43066775,0],[114.26213475,30.43066508,0],[114.26212577,30.43053361,0],[114.26179647,30.43055184,0],[114.26179573,30.43054104,0],[114.26171925,30.43054496,0],[114.26171999,30.43055576,0],[114.26134694,30.43057488,0],[114.26136183,30.43076252,0],[114.26180969,30.43073957,0]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"教学楼北楼","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.21","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26297648,30.42977643,0],[114.26297167,30.42970588,0],[114.26296599,30.42962271,0],[114.26296118,30.42955215,0],[114.26258502,30.42957143,0],[114.26258983,30.42964199,0],[114.26259551,30.42972516,0],[114.26260032,30.42979571,0],[114.26297648,30.42977643,0]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"后勤服务中心","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.44","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26051581,30.43152342,0],[114.2605091,30.43150397,0],[114.26055009,30.43149215,0],[114.26052853,30.43143638,0],[114.26060388,30.43141211,0],[114.26067724,30.43138364,0],[114.26074832,30.4313511,0],[114.2608168,30.43131462,0],[114.2608355,30.43133915,0],[114.26087283,30.43131695,0],[114.26067611,30.43107657,0],[114.26060316,30.43111741,0],[114.26052613,30.43115217,0],[114.26044568,30.43118054,0],[114.26036253,30.43120228,0],[114.2602774,30.43121718,0],[114.26019104,30.43122513,0],[114.2601042,30.43122606,0],[114.26001763,30.43121995,0],[114.25993211,30.43120685,0],[114.25984837,30.4311869,0],[114.25976714,30.43116025,0],[114.25968915,30.43112714,0],[114.25952648,30.43138592,0],[114.25956657,30.43140417,0],[114.25958181,30.43137789,0],[114.25965477,30.43140712,0],[114.25972978,30.43143218,0],[114.2598065,30.43145296,0],[114.25988463,30.43146937,0],[114.2598708,30.43152695,0],[114.25991311,30.43153451,0],[114.2599091,30.43155451,0],[114.26001036,30.43156629,0],[114.26011238,30.43157129,0],[114.26021453,30.43156948,0],[114.26031622,30.43156085,0],[114.26041685,30.43154547,0],[114.26051581,30.43152342,0]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"图书馆","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.38","geometry":{"type":"MultiPolygon","coordinates":[[[[114.25965006,30.42767884,20.758],[114.25964447,30.42759689,20.758],[114.25981145,30.42758834,20.758],[114.25980654,30.4275163,20.758],[114.25984498,30.42751433,20.758],[114.2598393,30.42743104,20.758],[114.25980085,30.42743292,20.758],[114.25978221,30.42715963,20.758],[114.25982065,30.42715766,20.758],[114.25981491,30.42707346,20.758],[114.25977906,30.4270753,20.758],[114.2597745,30.42700839,20.758],[114.25938842,30.42702781,20.758],[114.25938835,30.42702782,20.758],[114.25939655,30.42714803,20.758],[114.25936475,30.42714966,20.758],[114.25936966,30.42722169,20.758],[114.25940146,30.42722006,20.758],[114.25941938,30.42748282,20.758],[114.25938759,30.42748445,20.758],[114.25940172,30.42769156,20.758],[114.25965006,30.42767884,20.758]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"南苑轩","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.39","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26127402,30.42886669,0],[114.26105483,30.42853188,0],[114.26105213,30.42852951,0],[114.26104921,30.42852699,0],[114.26104378,30.42852329,0],[114.26103561,30.42851851,0],[114.26102884,30.42851532,0],[114.26102139,30.42851252,0],[114.26101661,30.42851106,0],[114.26100724,30.42850894,0],[114.26100108,30.42850804,0],[114.26099724,30.42850766,0],[114.26099154,30.42850738,0],[114.26098644,30.42850738,0],[114.26098428,30.42851046,0],[114.26098167,30.42851469,0],[114.26097966,30.42851844,0],[114.26097783,30.4285224,0],[114.26097602,30.42852713,0],[114.26097471,30.42853134,0],[114.26097359,30.42853607,0],[114.26097294,30.42853979,0],[114.26097242,30.42854459,0],[114.26097224,30.42854951,0],[114.26097234,30.42855322,0],[114.26097283,30.42855851,0],[114.26097356,30.42856291,0],[114.26097446,30.42856685,0],[114.26097504,30.42856892,0],[114.26097563,30.42857082,0],[114.26119481,30.42890563,0],[114.26127402,30.42886669,0]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"致远号","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.43","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26128331,30.4306066,0],[114.26119724,30.43059274,0],[114.26120975,30.43051757,0],[114.26121517,30.43044177,0],[114.26121348,30.43036584,0],[114.26120477,30.43029079,0],[114.26118911,30.43021659,0],[114.2611666,30.43014373,0],[114.26125018,30.43012117,0],[114.26122172,30.43005114,0],[114.2611874,30.4299831,0],[114.26114741,30.42991744,0],[114.26110197,30.42985449,0],[114.26098048,30.42992586,0],[114.26098743,30.42993485,0],[114.26097787,30.42994032,0],[114.26100786,30.42998219,0],[114.26103507,30.43002546,0],[114.26099834,30.43004183,0],[114.26103091,30.43010333,0],[114.26098322,30.4301203,0],[114.26100211,30.43016372,0],[114.26101435,30.43016012,0],[114.26103769,30.43022868,0],[114.26105391,30.43029877,0],[114.26106289,30.43036983,0],[114.26106447,30.43044429,0],[114.26105809,30.43051857,0],[114.26104382,30.43059201,0],[114.26103118,30.43058968,0],[114.26101833,30.43063473,0],[114.26106798,30.43064671,0],[114.26104401,30.43071111,0],[114.26108271,30.43072361,0],[114.26106157,30.43076936,0],[114.26103749,30.43081401,0],[114.26104772,30.43081846,0],[114.26104204,30.4308281,0],[114.26117239,30.43088656,0],[114.26120896,30.43081941,0],[114.26123974,30.43075012,0],[114.26126457,30.43067905,0],[114.26128331,30.4306066,0]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"教学楼大厅","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.25","geometry":{"type":"MultiPolygon","coordinates":[[[[114.2626294,30.43012424,8.137],[114.26262866,30.43011344,8.137],[114.26287597,30.43010076,8.137],[114.26299682,30.43009457,8.137],[114.26299756,30.43010537,8.137],[114.26304224,30.43010308,8.137],[114.26303037,30.42992918,8.137],[114.26278061,30.42994198,8.137],[114.26277608,30.42987573,8.137],[114.26260671,30.42988441,8.137],[114.2626231,30.43012457,8.137],[114.2626294,30.43012424,8.137]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"校医院","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.27","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26310981,30.43077643,-1.48],[114.26309595,30.43057328,-1.48],[114.26286109,30.43058818,-1.48],[114.26277683,30.43066912,-1.48],[114.26278535,30.43079306,-1.48],[114.26310981,30.43077643,-1.48]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"商铺","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.28","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26308459,30.4309541,-1.48],[114.263083,30.43093069,-1.48],[114.26313287,30.43092814,-1.48],[114.26312249,30.43077578,-1.48],[114.26310981,30.43077643,-1.48],[114.26278535,30.43079306,-1.48],[114.26263863,30.43080058,-1.48],[114.26264865,30.43095307,-1.48],[114.26300298,30.43093479,-1.48],[114.26300458,30.4309582,-1.48],[114.26308459,30.4309541,-1.48]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"临湖九舍","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.29","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26406131,30.43126705,9.811],[114.26404357,30.43100719,9.811],[114.26385747,30.43101836,9.811],[114.2636555,30.43103049,9.811],[114.263673,30.43128696,9.811],[114.26406131,30.43126705,9.811]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"污水处理厂","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.30","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26302976,30.43132717,-1.42],[114.26303136,30.43135058,-1.42],[114.26311137,30.43134649,-1.42],[114.26310978,30.43132307,-1.42],[114.26315966,30.43132052,-1.42],[114.26314928,30.43116816,-1.42],[114.26242732,30.43120516,-1.42],[114.26242573,30.43118199,-1.42],[114.26234567,30.43118609,-1.42],[114.26234727,30.4312095,-1.42],[114.26229735,30.43121152,-1.42],[114.26230787,30.43136443,-1.42],[114.26302976,30.43132717,-1.42]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"临湖8舍","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.31","geometry":{"type":"MultiPolygon","coordinates":[[[[114.25771132,30.43142385,11.501],[114.25770655,30.43135397,11.501],[114.25771279,30.43135365,11.501],[114.25770253,30.43120327,11.501],[114.2576963,30.43120359,11.501],[114.25769416,30.43117225,11.501],[114.25773032,30.4311704,11.501],[114.25773069,30.43117581,11.501],[114.25789652,30.43116731,11.501],[114.25789923,30.43120864,11.501],[114.25794986,30.43120615,11.501],[114.25794851,30.43118634,11.501],[114.25801983,30.43118268,11.501],[114.25802022,30.43118849,11.501],[114.25828489,30.43117454,11.501],[114.25828451,30.43116913,11.501],[114.25833964,30.4311663,11.501],[114.2583268,30.43097802,11.501],[114.25828981,30.43097991,11.501],[114.25829242,30.43101818,11.501],[114.25826644,30.43101951,11.501],[114.25826153,30.43094747,11.501],[114.25817549,30.43095188,11.501],[114.25817635,30.43096458,11.501],[114.25774251,30.4309868,11.501],[114.25773895,30.43093457,11.501],[114.25752074,30.43094574,11.501],[114.2575243,30.43099797,11.501],[114.25749582,30.43099943,11.501],[114.25749496,30.43098673,11.501],[114.25747085,30.43098797,11.501],[114.2574987,30.43139633,11.501],[114.25751741,30.43139537,11.501],[114.25752002,30.43143364,11.501],[114.25771132,30.43142385,11.501]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"教师楼","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.5","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26308524,30.43211334,0],[114.26308683,30.43213675,0],[114.26316685,30.43213266,0],[114.26316525,30.43210924,0],[114.26321513,30.43210669,0],[114.26320475,30.43195433,0],[114.26248279,30.43199133,0],[114.2624812,30.43196816,0],[114.26240114,30.43197226,0],[114.26240274,30.43199567,0],[114.26235282,30.43199769,0],[114.26236334,30.43215061,0],[114.26308524,30.43211334,0]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"临湖六舍","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.15","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26145815,30.43222022,0],[114.26145655,30.4321968,0],[114.26217849,30.43216008,0],[114.26216813,30.43200716,0],[114.26211829,30.43201025,0],[114.26211669,30.43198684,0],[114.26203663,30.43199094,0],[114.26203821,30.43201412,0],[114.26131624,30.43205111,0],[114.26132666,30.43220347,0],[114.26137654,30.43220091,0],[114.26137814,30.43222432,0],[114.26145815,30.43222022,0]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"临湖三舍","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.32","geometry":{"type":"MultiPolygon","coordinates":[[[[114.2624661,30.43177312,10.114],[114.26246451,30.43174994,10.114],[114.26318648,30.43171294,10.114],[114.26317606,30.43156058,10.114],[114.26312618,30.43156314,10.114],[114.26312458,30.43153973,10.114],[114.26304457,30.43154384,10.114],[114.26304617,30.43156725,10.114],[114.26232423,30.43160398,10.114],[114.26233459,30.4317569,10.114],[114.26238443,30.43175381,10.114],[114.26238603,30.43177722,10.114],[114.2624661,30.43177312,10.114]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"临湖七舍","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.34","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26191913,30.43191071,11.714],[114.26191177,30.43180265,11.714],[114.26209881,30.43179307,11.714],[114.26208749,30.43162721,11.714],[114.26183394,30.4316402,11.714],[114.26182064,30.43164088,11.714],[114.26180699,30.43164295,11.714],[114.26179573,30.43164576,11.714],[114.26178784,30.43164837,11.714],[114.26177479,30.43165399,11.714],[114.26176389,30.43166014,11.714],[114.26175622,30.43166543,11.714],[114.26174575,30.43167431,11.714],[114.26173866,30.43168179,11.714],[114.26173035,30.43169286,11.714],[114.26172633,30.43169962,11.714],[114.26172379,30.43170463,11.714],[114.2617206,30.43171227,11.714],[114.26171842,30.43171902,11.714],[114.26171646,30.43172745,11.714],[114.26171576,30.43173188,11.714],[114.26171543,30.43173474,11.714],[114.26171509,30.4317394,11.714],[114.26171502,30.43174569,11.714],[114.26171544,30.43175251,11.714],[114.26172281,30.43186056,11.714],[114.26164841,30.43186438,11.714],[114.26165234,30.43192201,11.714],[114.26191913,30.43191071,11.714]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"活动中心","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.19","geometry":{"type":"MultiPolygon","coordinates":[[[[114.25887539,30.432673,0],[114.25886533,30.43252553,0],[114.25854963,30.4325417,0],[114.25855969,30.43268916,0],[114.25887539,30.432673,0]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"焊接中心","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.33","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26254791,30.43295227,11.483],[114.26254633,30.43292909,11.483],[114.2632683,30.43289209,11.483],[114.26325789,30.43273973,11.483],[114.26320801,30.43274229,11.483],[114.26320641,30.43271888,11.483],[114.26312639,30.43272299,11.483],[114.26312799,30.4327464,11.483],[114.26240605,30.43278313,11.483],[114.26241641,30.43293606,11.483],[114.26246625,30.43293296,11.483],[114.26246785,30.43295637,11.483],[114.26254791,30.43295227,11.483]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"临湖四舍","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.35","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26210266,30.43295183,11.483],[114.26210424,30.43297501,11.483],[114.26218431,30.43297091,11.483],[114.26218271,30.43294749,11.483],[114.26223262,30.43294547,11.483],[114.26222211,30.43279256,11.483],[114.26150021,30.43282982,11.483],[114.26149861,30.43280641,11.483],[114.26141859,30.4328105,11.483],[114.26142019,30.43283392,11.483],[114.26137031,30.43283647,11.483],[114.26138069,30.43298883,11.483],[114.26210266,30.43295183,11.483]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"临湖一舍","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.37","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26252157,30.43255929,11.534],[114.26251998,30.43253611,11.534],[114.26324195,30.43249911,11.534],[114.26323154,30.43234675,11.534],[114.26318166,30.43234931,11.534],[114.26318006,30.4323259,11.534],[114.26310004,30.43233001,11.534],[114.26310164,30.43235342,11.534],[114.2623797,30.43239015,11.534],[114.26239006,30.43254307,11.534],[114.2624399,30.43253998,11.534],[114.2624415,30.43256339,11.534],[114.26252157,30.43255929,11.534]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"临湖五舍","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.36","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26089035,30.4330249,0],[114.26087529,30.43280421,0],[114.26049461,30.43282369,0],[114.2605098,30.43304637,0],[114.26089035,30.4330249,0]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"学生澡堂","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.18","geometry":{"type":"MultiPolygon","coordinates":[[[[114.25798338,30.43267032,11.626],[114.25798103,30.43263591,11.626],[114.25844697,30.43261204,11.626],[114.25843772,30.43247646,11.626],[114.25809428,30.43249405,11.626],[114.25807403,30.43219715,11.626],[114.2584173,30.43217957,11.626],[114.25840812,30.43204241,11.626],[114.25806468,30.43206,11.626],[114.25804515,30.43177371,11.626],[114.25838859,30.43175612,11.626],[114.25837889,30.43161012,11.626],[114.25791387,30.43163393,11.626],[114.25790998,30.43157946,11.626],[114.25762427,30.43159477,11.626],[114.25762794,30.43164858,11.626],[114.25753442,30.43165337,11.626],[114.25753361,30.43165341,11.626],[114.25754357,30.4317994,11.626],[114.2576454,30.43179419,11.626],[114.25766493,30.43208047,11.626],[114.25756299,30.43208592,11.626],[114.25757233,30.43222284,11.626],[114.25767416,30.43221763,11.626],[114.25769443,30.43251478,11.626],[114.25759271,30.43251999,11.626],[114.25760194,30.43265532,11.626],[114.25769526,30.43265054,11.626],[114.25769762,30.43268501,11.626],[114.25798338,30.43267032,11.626]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"实训楼","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.23","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26081385,30.43274109,11.651],[114.26081021,30.43268778,11.651],[114.26090342,30.432683,11.651],[114.26088683,30.43243988,11.651],[114.2611674,30.4324255,11.651],[114.26116187,30.43234407,11.651],[114.26122499,30.43234082,11.651],[114.26121553,30.43220215,11.651],[114.26115325,30.43220534,11.651],[114.26114365,30.43206477,11.651],[114.26068788,30.4320881,11.651],[114.26069243,30.43215473,11.651],[114.2606824,30.43215553,11.651],[114.26067083,30.43215711,11.651],[114.26065944,30.4321594,11.651],[114.26064699,30.43216279,11.651],[114.26063109,30.43216855,11.651],[114.26062143,30.43217294,11.651],[114.26060824,30.43218016,11.651],[114.2605968,30.43218779,11.651],[114.26058755,30.43219508,11.651],[114.26057751,30.43220442,11.651],[114.26057091,30.43221161,11.651],[114.2605608,30.43222488,11.651],[114.26055495,30.43223441,11.651],[114.26055171,30.43224057,11.651],[114.26054851,30.43224757,11.651],[114.26054548,30.4322555,11.651],[114.26054236,30.43226596,11.651],[114.26054035,30.43227546,11.651],[114.26053908,30.43228527,11.651],[114.26053889,30.43229607,11.651],[114.26053888,30.43230453,11.651],[114.26046174,30.43230848,11.651],[114.26048874,30.43270425,11.651],[114.26065018,30.43269598,11.651],[114.26065382,30.43274929,11.651],[114.26081385,30.43274109,11.651]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"临湖轩","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.24","geometry":{"type":"MultiPolygon","coordinates":[[[[114.259025,30.42989501,11.846],[114.25902513,30.42989688,11.846],[114.25920552,30.42988764,11.846],[114.25920539,30.42988577,11.846],[114.25938072,30.42987679,11.846],[114.2593811,30.42988243,11.846],[114.2594209,30.4298804,11.846],[114.25942052,30.42987475,11.846],[114.25947663,30.42987188,11.846],[114.25947036,30.42978,11.846],[114.2594953,30.42977872,11.846],[114.25949328,30.42974919,11.846],[114.25937638,30.42975518,11.846],[114.25937049,30.42966873,11.846],[114.25877611,30.42969918,11.846],[114.25878174,30.42978162,11.846],[114.2587506,30.42978322,11.846],[114.25875878,30.42990865,11.846],[114.259025,30.42989501,11.846]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"信息楼","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.7","geometry":{"type":"MultiPolygon","coordinates":[[[[114.25938835,30.42702782,20.758],[114.25938842,30.42702781,20.758],[114.25955211,30.42701943,20.758],[114.25954138,30.42686211,20.758],[114.25916627,30.42688133,20.758],[114.25916303,30.42683388,20.758],[114.25870791,30.42685719,20.758],[114.25870952,30.42688087,20.758],[114.25869581,30.42688157,20.758],[114.25869374,30.42685132,20.758],[114.25868668,30.42685168,20.758],[114.25868744,30.42686285,20.758],[114.2586545,30.42686453,20.758],[114.25864609,30.42686496,20.758],[114.25864981,30.42691953,20.758],[114.25866643,30.42691868,20.758],[114.25867343,30.42702133,20.758],[114.25905374,30.42700185,20.758],[114.25905286,30.42698898,20.758],[114.25908403,30.42698738,20.758],[114.25908784,30.42704321,20.758],[114.25938835,30.42702782,20.758]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"南苑4舍","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.1","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26217208,30.42707478,9.19],[114.26216669,30.42699577,9.19],[114.26152288,30.42702885,9.19],[114.2615282,30.42710777,9.19],[114.26217208,30.42707478,9.19]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"公租房8栋","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.3","geometry":{"type":"MultiPolygon","coordinates":[[[[114.25915801,30.4273541,11.224],[114.25915601,30.42732484,11.224],[114.2592139,30.42732204,11.224],[114.25921471,30.427322,11.224],[114.25920654,30.42720271,11.224],[114.25864543,30.42723145,11.224],[114.25864211,30.42718283,11.224],[114.2583771,30.4271964,11.224],[114.25838724,30.42734515,11.224],[114.2585749,30.42733554,11.224],[114.2585774,30.4273721,11.224],[114.25865221,30.42736827,11.224],[114.25865301,30.42737997,11.224],[114.25915801,30.4273541,11.224]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"南苑三舍","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.17","geometry":{"type":"MultiPolygon","coordinates":[[[[114.26207537,30.4325589,11.534],[114.26207695,30.43258207,11.534],[114.26215702,30.43257797,11.534],[114.26215542,30.43255456,11.534],[114.26220533,30.43255254,11.534],[114.26219482,30.43239963,11.534],[114.26147292,30.43243689,11.534],[114.26147132,30.43241348,11.534],[114.26139131,30.43241757,11.534],[114.2613929,30.43244098,11.534],[114.26134302,30.43244353,11.534],[114.2613534,30.43259589,11.534],[114.26207537,30.4325589,11.534]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"临湖二舍","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}},{"type":"Feature","id":"building_jtzy.26","geometry":{"type":"MultiPolygon","coordinates":[[[[114.25757356,30.43016734,11.501],[114.2575877,30.43016511,11.501],[114.25760179,30.43016118,11.501],[114.25761381,30.43015631,11.501],[114.25762387,30.43015096,11.501],[114.25763248,30.43014527,11.501],[114.25764107,30.43013828,11.501],[114.25764818,30.43013119,11.501],[114.25765422,30.43012386,11.501],[114.25766061,30.43011407,11.501],[114.25766298,30.43010678,11.501],[114.25811646,30.43008356,11.501],[114.25811732,30.43009625,11.501],[114.25820336,30.43009185,11.501],[114.25819845,30.43001981,11.501],[114.25822443,30.43001848,11.501],[114.25822704,30.43005675,11.501],[114.25826403,30.43005485,11.501],[114.25825119,30.42986657,11.501],[114.25819605,30.42986939,11.501],[114.25819569,30.42986398,11.501],[114.25793098,30.42987714,11.501],[114.25793137,30.42988295,11.501],[114.25786006,30.4298866,11.501],[114.25785871,30.42986679,11.501],[114.25780809,30.42986948,11.501],[114.25781102,30.4299108,11.501],[114.25764519,30.42991929,11.501],[114.25764556,30.42992469,11.501],[114.2576094,30.42992654,11.501],[114.25760726,30.42989521,11.501],[114.2576135,30.42989489,11.501],[114.25760324,30.42974451,11.501],[114.25759701,30.42974483,11.501],[114.25759224,30.42967495,11.501],[114.25740094,30.42968475,11.501],[114.25740355,30.42972302,11.501],[114.25738485,30.42972398,11.501],[114.25741269,30.43013234,11.501],[114.2574368,30.43013111,11.501],[114.25743594,30.43011841,11.501],[114.25746441,30.43011695,11.501],[114.25747073,30.4301282,11.501],[114.25747796,30.43013597,11.501],[114.25748404,30.43014139,11.501],[114.25749334,30.43014826,11.501],[114.25750516,30.43015507,11.501],[114.25751497,30.43015943,11.501],[114.25752768,30.43016362,11.501],[114.25753856,30.43016604,11.501],[114.25755529,30.43016786,11.501],[114.25756607,30.43016787,11.501],[114.25757356,30.43016734,11.501]]]]},"geometry_name":"geom","properties":{"objectid":null,"name":"行政楼","category":null,"structure":null,"function":null,"floors":null,"area":null,"floorarea":null,"groundz":null,"height":null,"owner":null,"population":null,"builtdate":null,"builder":null,"address":null,"remark":null,"shape_leng":null,"shape_area":null}}],"totalFeatures":45,"numberMatched":45,"numberReturned":45,"timeStamp":"2020-10-16T03:16:31.536Z","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}}};
  const echarts = require('echarts/dist/echarts');
  import map from '../../js/map'

  export default {
    components: {},
    name: "building-navigation",
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
        radioUrl: '1',
        dt1: getDT().dt1,
        current: [],  //当日水量
        weekIncrement: [],  //周同比增减量
        weekRatio: [], //周同比增减率
        minimumIncrement: [], //最小流量周同比增减量
        minimumRatio: [], //最小流量周同比增减率
        compositeIndex: [], //综合漏损指数
        max: 1000,  //热力图最大值
        min: 0, //热力图最小值
        url: 'BuildingWaterUseOverview', //跳转路径
        show: false,
        legend: [],
      }
    },
    created() {
      this.getInf();
    },
    methods: {
      /*获取DMA信息*/
      async getInf() {
        let wc, data = [];
        let time = new Date(new Date().getTime() - 24 * 3600 * 1000);
        let yy = time.getFullYear();
        let mm = time.getMonth() + 1;
        mm = mm < 10 ? '0' + mm : mm;
        let dd = time.getDate();
        dd = dd < 10 ? '0' + dd : dd;
        let inf = await this.$api.buildingInf.findALL();
        if (typeof inf == 'object' && inf.length > 0) {
          inf = inf.filter(item => item.remark == '1');
          inf.forEach(item => {
            this.$api.buildingData.findLeakageIndex({buildingid: item.id, time: yy + '-' + mm + '-' + dd}).then(res => {
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
          pieces.push({min: 0, max: 0, label: 0, color: color[0]});
        }
        options.visualMap.pieces = pieces;
        return options;
      },

      /*切换跳转路径*/
      changeUrl() {
        switch (this.radioUrl) {
          case '1' :
            this.url = 'BuildingWaterUseOverview';
            break;
          case '2' :
            this.url = 'BuildingWaterSupervision';
            break;
          case '3' :
            this.url = 'BuildingMinimumFlowMonitoring';
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
            break;
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
        arr.sort(this.compare(name));
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
  @import "../../../static/css/buildingNavigation.css";
</style>
