<template>
  <!--初始化加载百度地图-->
  <baidu-map
    class="map"
    ak="cGMT45K7PWj21dGVIu74UxS4FaVd43A1&s=1"
    :center="center"
    :zoom="18"
    :min-zoom="17"
    @ready="location"
    :scroll-wheel-zoom="true">
    <!--地图瓦片图层-->
    <bm-tile
      :isTransparentPng="true"
      tileUrlTemplate="static/images/{Z}/tile-{X}_{Y}.png">
    </bm-tile>
    <!--比例尺控件-->
    <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
    <!--从其他页面跳转至地图页面显示定位-->
    <bm-marker :position="marker" animation="BMAP_ANIMATION_BOUNCE" @click="infoWindowOpen1">
      <bm-info-window
        :show="show"
        title="定位信息"
        :width="0"
        :height="0"
        @close="infoWindowClose1"
        @open="infoWindowOpen1">
        {{info}}
      </bm-info-window>
    </bm-marker>
    <!--地图所有水表定位点-->
    <bm-marker
      v-for="(marker,index) of markers"
      :key="index"
      :position="{lng: marker.lng, lat: marker.lat}"
      :icon="marker.markerIcon"
      :offset="markerSize"
      @click="infoWindowOpen2(index, marker)">
      <!--水表信息窗口-->
      <bm-info-window
        :show="marker.show"
        title="<span style='font-size:18px;color:#0029ff;background-color:#FFFFFF'>水表信息:</span>"
        :width="0"
        :height="0"
        @close="infoWindowClose2(index, marker)"
        @open="infoWindowOpen2(index, marker)"
      >
        {{marker.name}}
      </bm-info-window>
      <!--鼠标右键菜单-->
      <bm-context-menu :width=120>
        <bm-context-menu-item :callback="getMeterId1" text="水表水量监控" iconUrl="static/images/title_icon.png"></bm-context-menu-item>
        <bm-context-menu-item seperator></bm-context-menu-item>
        <bm-context-menu-item :callback="getMeterId2" text="最小流量监测" iconUrl="static/images/title_icon.png"></bm-context-menu-item>
      </bm-context-menu>
    </bm-marker>
    <!--地图所有建筑定位点-->
    <bm-marker
      v-for="(buildingMarker,index) of buildingMarkers"
      :key="'b'+index"
      :position="{lng: buildingMarker.lng, lat: buildingMarker.lat}"
      :icon="buildingMarker.markerIcon"
      :offset="buildingMarkerSize"
      @click="infoWindowOpen3(index, buildingMarker)"
    >
      <!--建筑信息窗口-->
      <bm-info-window
        :show="buildingMarker.show"
        title="<span style='font-size:18px;color:#0029ff;background-color:#FFFFFF'>建筑信息:</span>"
        :width="0"
        :height="0"
        @close="infoWindowClose3(index, buildingMarker)"
        @open="infoWindowOpen3(index, buildingMarker)"
      >
        {{buildingMarker.name}}
      </bm-info-window>
      <!--鼠标右键菜单-->
      <bm-context-menu :width=120>
        <bm-context-menu-item :callback="getBuildingId" text="建筑用水概况" iconUrl="static/images/title_icon.png"></bm-context-menu-item>
        <bm-context-menu-item seperator></bm-context-menu-item>
        <bm-context-menu-item :callback="getBuildingId1" text="建筑水量监控" iconUrl="static/images/title_icon.png"></bm-context-menu-item>
        <bm-context-menu-item seperator></bm-context-menu-item>
        <bm-context-menu-item :callback="getBuildingId2" text="最小流量监测" iconUrl="static/images/title_icon.png"></bm-context-menu-item>
      </bm-context-menu>
    </bm-marker>
    <!--校区定位切换-->
    <bm-control :offset = "size">
      <button  @click="changeCenter1()" :class="{handleColor: index === button1}">武昌校区</button>
      <button  @click="changeCenter2()" :class="{handleColor: index === button2}">流芳校区</button>
    </bm-control>
  </baidu-map>
</template>

<script>
  import { BaiduMap,BmScale,BmMarker,BmInfoWindow,BmTile,BmView,BmControl,BmContextMenuItem,BmContextMenu,} from 'vue-baidu-map'
  export default {
    components: {
      BaiduMap,
      BmScale,
      BmMarker,
      BmInfoWindow,
      BmTile,
      BmView,
      BmControl,
      BmContextMenuItem,
      BmContextMenu,
    },
    data () {
      return {
        button1: '1',
        button2: '2',
        index: '0',
        markers:[
          {id:8,name:'武昌-家属区总表',lng:114.398908,lat:30.510425,show:false},
          {id:9,name:'武昌-南大门总表',lng:114.397044,lat:30.505221,show:false},
          {id:10,name:'武昌-北门总表',lng:114.39593,lat:30.510635,show:false},
          {id:11,name:'武昌-孵化楼总表',lng:114.396052,lat:30.510608,show:false},
          {id:12,name:'武昌-西门点总表',lng:114.396011,lat:30.510643,show:false},
          {id:13,name:'流芳-体育场东总表',lng:114.443173,lat:30.467479,show:false},
          {id:14,name:'流芳-校医院总表',lng:114.436871,lat:30.465864,show:false},
          {id:15,name:'流芳-西北区总表',lng:114.431535,lat:30.468311,show:false},
          {id:16,name:'流芳-大化工总表',lng:114.431063,lat:30.468782,show:false},
          {id:17,name:'流芳-加星耐火总表',lng:114.442791,lat:30.462432,show:false},
          {id:160,name:'武昌-北门泵房出水',lng:114.395858,lat:30.510538,show:false},
          {id:161,name:'武昌-孵化器大楼',lng:114.396451,lat:30.510503,show:false},
          {id:162,name:'武昌-材料楼',lng:114.396716,lat:30.510491,show:false},
          {id:163,name:'武昌-二号教学楼',lng:114.395638,lat:30.510514,show:false},
          {id:164,name:'武昌-领创大楼西北',lng:114.395625,lat:30.509752,show:false},
          {id:165,name:'武昌-北区西南区域',lng:114.395575,lat:30.50981,show:false},
          {id:166,name:'武昌-领创大楼东北',lng:114.396442,lat:30.509767,show:false},
          {id:167,name:'武昌-北区东南区域',lng:114.396528,lat:30.509818,show:false},
          {id:168,name:'武昌-领创大楼正南',lng:114.395656,lat:30.509239,show:false},
          {id:169,name:'武昌-领创大楼西南',lng:114.396105,lat:30.50925,show:false},
          {id:170,name:'武昌-一号教学楼东北',lng:114.396869,lat:30.508986,show:false},
          {id:171,name:'武昌-一教学楼西北',lng:114.395288,lat:30.508982,show:false},
          {id:172,name:'武昌-1、2号学生楼',lng:114.395243,lat:30.508912,show:false},
          {id:173,name:'武昌-学生二食堂',lng:114.396204,lat:30.50736,show:false},
          {id:174,name:'武昌-8、9号学生楼',lng:114.396936,lat:30.507955,show:false},
          {id:175,name:'武昌-7号学生楼西北',lng:114.396011,lat:30.506287,show:false},
          {id:176,name:'武昌-南区西北区域',lng:114.395845,lat:30.506271,show:false},
          {id:177,name:'武昌-3、4号学生楼',lng:114.395288,lat:30.506971,show:false},
          {id:178,name:'武昌-7号学生楼西南',lng:114.395975,lat:30.506115,show:false},
          {id:179,name:'武昌-行政楼',lng:114.396186,lat:30.505874,show:false},
          {id:180,name:'流芳-中快餐厅',lng:114.435721,lat:30.467852,show:false},
          {id:181,name:'流芳-嘉庭苑餐厅',lng:114.435461,lat:30.467825,show:false},
          {id:182,name:'流芳-教辅楼区生活',lng:114.435011,lat:30.467957,show:false},
          {id:183,name:'流芳-教辅楼区消防',lng:114.435016,lat:30.467981,show:false},
          {id:184,name:'流芳-1教辅楼东南',lng:114.434967,lat:30.467938,show:false},
          {id:185,name:'流芳-4号实验楼B栋消防',lng:114.440576,lat:30.469623,show:false},
          {id:186,name:'流芳-4号实验楼B栋生活',lng:114.439781,lat:30.469553,show:false},
          {id:187,name:'流芳-4号实验楼A栋消防1',lng:114.438111,lat:30.469288,show:false},
          {id:188,name:'流芳-4号实验楼A栋消防2',lng:114.438061,lat:30.469276,show:false},
          {id:189,name:'流芳-4号实验楼A栋生活1',lng:114.438129,lat:30.469253,show:false},
          {id:190,name:'流芳-4号实验楼A栋生活2',lng:114.438084,lat:30.469234,show:false},
          {id:191,name:'流芳-外环生活常压',lng:114.441093,lat:30.469763,show:false},
          {id:192,name:'流芳-外环生活加压',lng:114.441093,lat:30.469724,show:false},
          {id:193,name:'流芳-外环消防',lng:114.441115,lat:30.469673,show:false},
          {id:194,name:'流芳-工程实训中心',lng:114.436386,lat:30.468132,show:false},
          {id:195,name:'流芳-文科楼生活',lng:114.437432,lat:30.468588,show:false},
          {id:196,name:'流芳-文科楼消防',lng:114.437441,lat:30.468658,show:false},
          {id:197,name:'流芳-2号实验楼消防北',lng:114.437378,lat:30.467946,show:false},
          {id:198,name:'流芳-2号实验楼生活北',lng:114.437643,lat:30.467732,show:false},
          {id:199,name:'流芳-2号实验楼生活南',lng:114.437617,lat:30.467701,show:false},
          {id:200,name:'流芳-2号实验楼消防南',lng:114.437873,lat:30.46735,show:false},
          {id:201,name:'流芳-1号实验楼生活南',lng:114.438178,lat:30.467117,show:false},
          {id:202,name:'流芳-1号实验楼生活北',lng:114.43816,lat:30.46716,show:false},
          {id:203,name:'流芳-1号实验楼消防南',lng:114.438461,lat:30.466883,show:false},
          {id:204,name:'流芳-大礼堂消防东北',lng:114.438039,lat:30.46607,show:false},
          {id:205,name:'流芳-大礼堂消防东南',lng:114.438582,lat:30.465786,show:false},
          {id:206,name:'流芳-大礼堂生活东南',lng:114.438542,lat:30.465763,show:false},
          {id:207,name:'流芳-图书馆生活常压',lng:114.438605,lat:30.466631,show:false},
          {id:208,name:'流芳-图书馆生活加压',lng:114.438614,lat:30.466576,show:false},
          {id:209,name:'流芳-大学生活动中心生活',lng:114.440159,lat:30.465206,show:false},
          {id:210,name:'流芳-大学生活动中心消防',lng:114.440213,lat:30.465203,show:false},
          {id:211,name:'流芳-东进生活常压北',lng:114.441394,lat:30.466872,show:false},
          {id:212,name:'流芳-东进生活常压南',lng:114.441412,lat:30.466813,show:false},
          {id:213,name:'流芳-1号教学楼生活',lng:114.441268,lat:30.466736,show:false},
          {id:214,name:'流芳-1号教学楼消防',lng:114.441255,lat:30.466693,show:false},
          {id:215,name:'流芳-保卫处及运动场',lng:114.441636,lat:30.466751,show:false},
          {id:216,name:'流芳-2号教学楼消防',lng:114.441138,lat:30.467576,show:false},
          {id:217,name:'流芳-3号教学楼生活',lng:114.441012,lat:30.468498,show:false},
          {id:218,name:'流芳-3号教学楼消防',lng:114.440967,lat:30.468809,show:false},
          {id:219,name:'流芳-计算机学院生活常压',lng:114.439624,lat:30.470553,show:false},
          {id:220,name:'流芳-计算机学院消防',lng:114.439687,lat:30.470564,show:false},
          {id:221,name:'流芳-4号教学楼生活',lng:114.437464,lat:30.470327,show:false},
          {id:222,name:'流芳-4号教学楼消防',lng:114.437477,lat:30.47028,show:false},
          {id:223,name:'流芳-大学生活动中心游泳馆',lng:114.439656,lat:30.464059,show:false},
          {id:233,name:'武昌-磷资源工程中心东北',lng:114.395405,lat:30.509806,show:false},
          {id:234,name:'武昌-磷资源工程中心东南',lng:114.395346,lat:30.509219,show:false},
          {id:237,name:'武昌-领创大楼绿化取水点',lng:114.396649,lat:30.509238,show:false},
          {id:236,name:'武昌-井泵房绿化取水点',lng:114.396945,lat:30.508006,show:false},
          {id:230,name:'武昌-学生一食堂北',lng:114.395567,lat:30.507356,show:false},
          {id:231,name:'武昌-学生一食堂东',lng:114.396083,lat:30.507025,show:false},
          {id:232,name:'武昌-5、6号学生楼',lng:114.39487,lat:30.5068,show:false},
          {id:235,name:'武昌-6号学生楼绿化取水点',lng:114.396919,lat:30.50659,show:false},
          {id:241,name:'流芳-计算机学院生活加压',lng:114.439651,lat:30.470463,show:false},
          {id:243,name:'流芳-计算机学院绿化取水点',lng:114.439723,lat:30.470506,show:false},
          {id:245,name:'流芳-4号实验楼A栋绿化取水点',lng:114.438254,lat:30.469307,show:false},
          {id:238,name:'流芳-中快餐厅东生活常压',lng:114.436642,lat:30.467934,show:false},
          {id:239,name:'流芳-中快餐厅东生活加压',lng:114.436734,lat:30.467941,show:false},
          {id:240,name:'流芳-中快餐厅东消防',lng:114.436817,lat:30.467947,show:false},
          {id:244,name:'流芳-1号实验楼绿化取水点',lng:114.438272,lat:30.467163,show:false},
          {id:242,name:'流芳-1号教学楼绿化取水点',lng:114.441356,lat:30.46671,show:false},

        ],
        buildingMarkers:[
          {id:199,name:'大学生活动中心',lng:114.439665,lat:30.46465,show:false},
          {id:200,name:'大礼堂',lng:114.437783,lat:30.465712,show:false},
          {id:202,name:'流芳校区校医院',lng:114.437149,lat:30.465981,show:false},
          {id:203,name:'配电房',lng:114.438268,lat:30.466101,show:false},
          {id:201,name:'流芳校区图书馆',lng:114.439323,lat:30.466366,show:false},
          {id:250,name:'厚情楼',lng:114.435326,lat:30.466615,show:false},
          {id:245,name:'留学生公寓',lng:114.437432,lat:30.466689,show:false},
          {id:244,name:'羽毛球乒乓球馆',lng:114.436718,lat:30.466506,show:false},
          {id:204,name:'1号实验楼',lng:114.438942,lat:30.467183,show:false},
          {id:218,name:'嘉庭苑餐厅',lng:114.435546,lat:30.467712,show:false},
          {id:217,name:'中快餐厅',lng:114.43608,lat:30.467759,show:false},
          {id:219,name:'金工实习中心',lng:114.435097,lat:30.467736,show:false},
          {id:205,name:'2号实验楼',lng:114.438438,lat:30.467774,show:false},
          {id:221,name:'1教辅楼',lng:114.434607,lat:30.468012,show:false},
          {id:212,name:'标准体育场',lng:114.442494,lat:30.467802,show:false},
          {id:223,name:'3教辅楼',lng:114.434028,lat:30.468339,show:false},
          {id:260,name:'西北门门房1',lng:114.43149,lat:30.468385,show:false},
          {id:220,name:'工程实训中心',lng:114.435793,lat:30.468238,show:false},
          {id:259,name:'法商学院2号楼',lng:114.431863,lat:30.468273,show:false},
          {id:222,name:'2教辅楼',lng:114.434634,lat:30.468397,show:false},
          {id:261,name:'西北门门房2',lng:114.431405,lat:30.468459,show:false},
          {id:243,name:'配电室',lng:114.435254,lat:30.468463,show:false},
          {id:242,name:'智能制造中心',lng:114.435865,lat:30.468529,show:false},
          {id:254,name:'西北区食堂',lng:114.433246,lat:30.468459,show:false},
          {id:268,name:'校园服务中心',lng:114.434095,lat:30.468568,show:false},
          {id:206,name:'文科楼',lng:114.438097,lat:30.468428,show:false},
          {id:253,name:'教工宿舍商铺',lng:114.433776,lat:30.468669,show:false},
          {id:209,name:'1、2、3号教学楼',lng:114.440644,lat:30.467813,show:false},
          {id:252,name:'教工宿舍',lng:114.434104,lat:30.468825,show:false},
          {id:255,name:'8教辅楼',lng:114.43343,lat:30.468864,show:false},
          {id:256,name:'法商学院1号楼',lng:114.431908,lat:30.468926,show:false},
          {id:269,name:'5教辅楼',lng:114.434755,lat:30.468887,show:false},
          {id:257,name:'法商学院3号楼',lng:114.431122,lat:30.469066,show:false},
          {id:207,name:'4号实验楼A栋',lng:114.438614,lat:30.469078,show:false},
          {id:258,name:'法商学院4号楼',lng:114.4314,lat:30.469199,show:false},
          {id:225,name:'6教辅楼',lng:114.434517,lat:30.469331,show:false},
          {id:208,name:'4号实验楼B栋',lng:114.44032,lat:30.46923,show:false},
          {id:237,name:'垃圾回收站',lng:114.442719,lat:30.469397,show:false},
          {id:240,name:'大化工中心2号楼',lng:114.435654,lat:30.469202,show:false},
          {id:215,name:'蓄水池',lng:114.438187,lat:30.469627,show:false},
          {id:216,name:'泵房',lng:114.438326,lat:30.469665,show:false},
          {id:241,name:'多功能报告厅',lng:114.43692,lat:30.469856,show:false},
          {id:239,name:'大化工中心1号楼',lng:114.435546,lat:30.469872,show:false},
          {id:238,name:'7教辅楼',lng:114.434454,lat:30.469876,show:false},
          {id:214,name:'4号教学楼',lng:114.437882,lat:30.469985,show:false},
          {id:213,name:'计算机学院',lng:114.440496,lat:30.470307,show:false},
          {id:236,name:'南门东侧门房',lng:114.397139,lat:30.505054,show:false},
          {id:235,name:'南门西侧门房',lng:114.396806,lat:30.505174,show:false},
          {id:141,name:'办公楼',lng:114.397237,lat:30.505548,show:false},
          {id:198,name:'教工25号楼',lng:114.399649,lat:30.50561,show:false},
          {id:197,name:'教工24号楼',lng:114.39964,lat:30.505863,show:false},
          {id:139,name:'科教大楼',lng:114.396725,lat:30.505781,show:false},
          {id:266,name:'B12栋',lng:114.398881,lat:30.506045,show:false},
          {id:196,name:'教工23号楼',lng:114.399631,lat:30.506119,show:false},
          {id:140,name:'7号学生楼',lng:114.396447,lat:30.506189,show:false},
          {id:195,name:'教工22号楼',lng:114.399631,lat:30.506368,show:false},
          {id:267,name:'车队车库1',lng:114.399833,lat:30.506543,show:false},
          {id:193,name:'车队车库2',lng:114.399833,lat:30.506644,show:false},
          {id:143,name:'6号学生楼',lng:114.396469,lat:30.506687,show:false},
          {id:142,name:'5号学生楼B区',lng:114.395086,lat:30.50666,show:false},
          {id:227,name:'5号学生楼A区',lng:114.395638,lat:30.506648,show:false},
          {id:187,name:'教工26号楼',lng:114.399038,lat:30.506858,show:false},
          {id:262,name:'教工20号楼',lng:114.399627,lat:30.506866,show:false},
          {id:230,name:'南湖驾校',lng:114.394453,lat:30.507068,show:false},
          {id:150,name:'武昌校区校医院',lng:114.397615,lat:30.506991,show:false},
          {id:186,name:'教工27号楼',lng:114.399047,lat:30.50708,show:false},
          {id:184,name:'教工19号楼',lng:114.399609,lat:30.507107,show:false},
          {id:144,name:'4号学生楼',lng:114.394987,lat:30.507049,show:false},
          {id:148,name:'学生一食堂',lng:114.39576,lat:30.507111,show:false},
          {id:149,name:'学生二食堂',lng:114.396577,lat:30.507099,show:false},
          {id:183,name:'教工18号楼',lng:114.3996,lat:30.50736,show:false},
          {id:145,name:'3号学生楼',lng:114.394951,lat:30.507333,show:false},
          {id:189,name:'教工31号楼',lng:114.400525,lat:30.507352,show:false},
          {id:228,name:'8号学生楼',lng:114.395796,lat:30.507562,show:false},
          {id:182,name:'教工17号楼',lng:114.399609,lat:30.507609,show:false},
          {id:188,name:'教工30号楼',lng:114.400516,lat:30.507652,show:false},
          {id:229,name:'9号学生楼',lng:114.396609,lat:30.507582,show:false},
          {id:181,name:'教工16号楼',lng:114.399595,lat:30.507862,show:false},
          {id:233,name:'运动场',lng:114.394412,lat:30.507788,show:false},
          {id:151,name:'体育馆',lng:114.396173,lat:30.508002,show:false},
          {id:146,name:'2号学生楼',lng:114.395095,lat:30.507893,show:false},
          {id:176,name:'离退休教工活动中心',lng:114.395095,lat:30.507893,show:false},
          {id:153,name:'武昌校区图书馆',lng:114.397615,lat:30.508496,show:false},
          {id:147,name:'1号学生楼',lng:114.39492,lat:30.508496,show:false},
          {id:264,name:'发电机房',lng:114.394722,lat:30.508892,show:false},
          {id:177,name:'配电房2',lng:114.395027,lat:30.508912,show:false},
          {id:152,name:'一号教学楼',lng:114.396155,lat:30.508861,show:false},
          {id:174,name:'教工14号楼',lng:114.399182,lat:30.50892,show:false},
          {id:175,name:'教工15号楼',lng:114.399622,lat:30.508924,show:false},
          {id:226,name:'教工12号楼',lng:114.399173,lat:30.50918,show:false},
          {id:173,name:'教工13号楼',lng:114.399173,lat:30.50918,show:false},
          {id:172,name:'教工11号楼',lng:114.399627,lat:30.50946,show:false},
          {id:171,name:'教工10号楼',lng:114.399169,lat:30.509464,show:false},
          {id:137,name:'领创大楼',lng:114.396164,lat:30.509425,show:false},
          {id:165,name:'教工6号楼',lng:114.398414,lat:30.509526,show:false},
          {id:170,name:'教工9号楼',lng:114.399631,lat:30.509717,show:false},
          {id:169,name:'教工8号楼',lng:114.399178,lat:30.509736,show:false},
          {id:155,name:'实验楼东配楼',lng:114.397215,lat:30.509697,show:false},
          {id:164,name:'教工5号楼',lng:114.398428,lat:30.509725,show:false},
          {id:154,name:'磷资源工程中心',lng:114.395149,lat:30.50969,show:false},
          {id:162,name:'教工4号楼',lng:114.398419,lat:30.509985,show:false},
          {id:163,name:'教工7号楼',lng:114.399371,lat:30.50997,show:false},
          {id:159,name:'教工3号楼',lng:114.398423,lat:30.510195,show:false},
          {id:161,name:'教工28号楼',lng:114.399317,lat:30.510258,show:false},
          {id:156,name:'二号教学楼（老）',lng:114.395261,lat:30.510164,show:false},
          {id:138,name:'材料楼',lng:114.397228,lat:30.510409,show:false},
          {id:158,name:'雅苑教师公寓',lng:114.398383,lat:30.510499,show:false},
          {id:160,name:'教工29号楼',lng:114.399299,lat:30.51058,show:false},
          {id:157,name:'孵化器大楼',lng:114.397192,lat:30.510619,show:false},
          {id:232,name:'北门西门房',lng:114.396007,lat:30.510689,show:false},
          {id:234,name:'北门东门房',lng:114.396335,lat:30.510689,show:false},
          {id:231,name:'北门商铺',lng:114.395319,lat:30.510689,show:false},


        ],
        marker:{},
        info:'',
        size: new BMap.Size(10, 10),
        buildingMarkerSize: new BMap.Size(0,-10),
        markerSize: new BMap.Size(0,-10),
        center:{lng:114.397152,lat:30.508348},
        show: true,
      }
    },
    created() {
      this.markerAddAttr1();
      this.markerAddAttr2();
    },
    methods: {
      location(){
        let params = this.$route.query ;
        if(params.marker != undefined){
          this.marker = params.marker ;
          this.info = params.info ;
          this.center = params.marker ;
        }
      },
      click(e){
        alert(e.point.lng + "," + e.point.lat);
      },
      getMeterId1(e){
        for(let i=0;i<this.markers.length;i++){
          if(e.point.lng < (this.markers[i].lng + 0.0001) && e.point.lng > (this.markers[i].lng - 0.0001)){
            if(e.point.lat < (this.markers[i].lat + 0.0001) && e.point.lat > (this.markers[i].lat - 0.0001)){
              this.$router.push({
                path:'/WaterMeterControl/WaterUseSupervision',
                query:{
                  waterMeterId : this.markers[i].id,
                }
              })
            }
          }
        }
      },
      getMeterId2(e){
        for(let i=0;i<this.markers.length;i++){
          if(e.point.lng < (this.markers[i].lng + 0.0001) && e.point.lng > (this.markers[i].lng - 0.0001)){
            if(e.point.lat < (this.markers[i].lat + 0.0001) && e.point.lat > (this.markers[i].lat - 0.0001)){
              this.$router.push({
                path:'/WaterMeterControl/MinimumFlowMonitoring',
                query:{
                  waterMeterId : this.markers[i].id,
                }
              })
            }
          }
        }
      },
      getBuildingId(e){
        for(let i=0;i<this.buildingMarkers.length;i++){
          if(e.point.lng < (this.buildingMarkers[i].lng + 0.0002) && e.point.lng > (this.buildingMarkers[i].lng - 0.0002)){
            if(e.point.lat < (this.buildingMarkers[i].lat + 0.0002) && e.point.lat > (this.buildingMarkers[i].lat - 0.0002)){
              this.$router.push({
                path:'/WaterOfBuilding/BuildingWaterUseOverview',
                query:{
                  buildingId : this.buildingMarkers[i].id,
                }
              })
            }
          }
        }
      },
      getBuildingId1(e){
        for(let i=0;i<this.buildingMarkers.length;i++){
          if(e.point.lng < (this.buildingMarkers[i].lng + 0.0002) && e.point.lng > (this.buildingMarkers[i].lng - 0.0002)){
            if(e.point.lat < (this.buildingMarkers[i].lat + 0.0002) && e.point.lat > (this.buildingMarkers[i].lat - 0.0002)){
              this.$router.push({
                path:'/WaterOfBuilding/BuildingWaterSupervision',
                query:{
                  buildingId : this.buildingMarkers[i].id,
                }
              })
            }
          }
        }
      },
      getBuildingId2(e){
        for(let i=0;i<this.buildingMarkers.length;i++){
          if(e.point.lng < (this.buildingMarkers[i].lng + 0.0002) && e.point.lng > (this.buildingMarkers[i].lng - 0.0002)){
            if(e.point.lat < (this.buildingMarkers[i].lat + 0.0002) && e.point.lat > (this.buildingMarkers[i].lat - 0.0002)){
              this.$router.push({
                path:'/WaterOfBuilding/MinimumFlowMonitoring',
                query:{
                  buildingId : this.buildingMarkers[i].id,
                }
              })
            }
          }
        }
      },
      infoWindowClose1 () {
        this.show = false
      },
      infoWindowOpen1 () {
        this.show = true
      },
      infoWindowOpen2 (index, marker) {//打开窗口
        marker.show = true;
        this.$set(this.markers, index, marker);
      },
      infoWindowClose2 (index, marker) {//关闭窗口
        marker.show = false;
        this.$set(this.markers, index, marker);
      },
      infoWindowOpen3 (index, buildingMarker) {//打开窗口
        buildingMarker.show = true;
        this.$set(this.buildingMarkers, index, buildingMarker);
      },
      infoWindowClose3 (index, buildingMarker) {//关闭窗口
        buildingMarker.show = false;
        this.$set(this.buildingMarkers, index, buildingMarker);
      },
      changeCenter1 () {//武昌校区地图转移定位
        this.center = {lng:114.397152,lat:30.508348};
        this.index = this.button1;
      },
      changeCenter2 () {//流芳校区地图转移定位
        this.center = {lng:114.438681,lat:30.467938};
        this.index = this.button2;
      },
      markerAddAttr1 () {//添加水表图标
        this.markers.map((item, index) => {
          item = Object.assign({
            ... !item.markerIcon && {markerIcon: {
                url: 'static/images/meter3.png',
                size: {width: 18, height: 18},
              }
            },
            ... !item.show && {show: index>0 ? false: true},
          }, item);
          this.$set(this.markers, index, item);
        })
      },
      markerAddAttr2 () {//添加建筑图标
        this.buildingMarkers.map((item, index) => {
          item = Object.assign({
            ... !item.markerIcon && {markerIcon: {
                url: 'static/images/building1.png',
                size: {width: 32, height: 32},
              }
            },
            ... !item.show && {show: index>0 ? false: true},
          }, item);
          this.$set(this.buildingMarkers, index, item);
        })
      },
    },
  }
</script>

<style>
  .map {
    width: 100%;
    height: 100%;
  }
  .handleColor {background: #60c6ff;}
</style>
