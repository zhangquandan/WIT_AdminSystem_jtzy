<template>
  <!--存放百度地图容器-->
  <div id="container"></div>
</template>

<script>
  export default {
    data() {
      return {
        marker:{},
        info:'',
        center:{lng:114.397152,lat:30.508348},
        points: [
          {lng:114.397052,lat:30.508368,count:50},
          {lng:114.397052,lat:30.508668,count:31},
          {lng:114.397052,lat:30.508968,count:15},
          {lng:114.397052,lat:30.509268,count:40},
          {lng:114.397052,lat:30.509568,count:10},
          {lng:114.397052,lat:30.509868,count:46},
          {lng:114.397052,lat:30.510168,count:98},
          {lng:114.397052,lat:30.510468,count:20},
          {lng:114.397052,lat:30.510768,count:11},
          {lng:114.397052,lat:30.508068,count:7},
          {lng:114.397052,lat:30.507768,count:42},
          {lng:114.397052,lat:30.507468,count:47},
          {lng:114.397052,lat:30.507168,count:27},
          {lng:114.397052,lat:30.506868,count:73},
          {lng:114.397052,lat:30.506568,count:60},
          {lng:114.397052,lat:30.506268,count:98},
          {lng:114.397052,lat:30.505968,count:15},
          {lng:114.397052,lat:30.505668,count:75},
          {lng:114.397052,lat:30.505368,count:21},
          {lng:114.397052,lat:30.505068,count:91},

          {lng:114.397552,lat:30.508368,count:50},
          {lng:114.397552,lat:30.508668,count:41},
          {lng:114.397552,lat:30.508968,count:98},
          {lng:114.397552,lat:30.509268,count:40},
          {lng:114.397552,lat:30.509568,count:100},
          {lng:114.397552,lat:30.509868,count:6},
          {lng:114.397552,lat:30.510168,count:18},
          {lng:114.397552,lat:30.510468,count:80},
          {lng:114.397552,lat:30.510768,count:11},
          {lng:114.397552,lat:30.508068,count:7},
          {lng:114.397552,lat:30.507768,count:42},
          {lng:114.397552,lat:30.507468,count:4},
          {lng:114.397552,lat:30.507168,count:27},
          {lng:114.397552,lat:30.506868,count:23},
          {lng:114.397552,lat:30.506568,count:60},
          {lng:114.397552,lat:30.506268,count:8},
          {lng:114.397552,lat:30.505968,count:98},
          {lng:114.397552,lat:30.505668,count:85},
          {lng:114.397552,lat:30.505368,count:21},

          {lng:114.399052,lat:30.508368,count:50},
          {lng:114.399052,lat:30.508668,count:51},
          {lng:114.399052,lat:30.508968,count:15},
          {lng:114.399052,lat:30.509268,count:40},
          {lng:114.399052,lat:30.509568,count:100},
          {lng:114.399052,lat:30.509868,count:6},
          {lng:114.399052,lat:30.510168,count:18},
          {lng:114.399052,lat:30.510468,count:80},
          {lng:114.399052,lat:30.510768,count:11},
          {lng:114.399052,lat:30.511068,count:81},
          {lng:114.399052,lat:30.508068,count:7},
          {lng:114.399052,lat:30.507768,count:42},
          {lng:114.399052,lat:30.507468,count:98},
          {lng:114.399052,lat:30.507168,count:77},
          {lng:114.399052,lat:30.506868,count:23},
          {lng:114.399052,lat:30.506568,count:60},
          {lng:114.399052,lat:30.506268,count:8},
          {lng:114.399052,lat:30.505968,count:15},
          {lng:114.399052,lat:30.505668,count:25},
          {lng:114.399052,lat:30.505368,count:21},

          {lng:114.398552,lat:30.508368,count:50},
          {lng:114.398552,lat:30.508668,count:51},
          {lng:114.398552,lat:30.508968,count:15},
          {lng:114.398552,lat:30.509268,count:40},
          {lng:114.398552,lat:30.509568,count:100},
          {lng:114.398552,lat:30.509868,count:6},
          {lng:114.398552,lat:30.510168,count:18},
          {lng:114.398552,lat:30.510468,count:80},
          {lng:114.398552,lat:30.510768,count:11},
          {lng:114.398552,lat:30.508068,count:78},
          {lng:114.398552,lat:30.507768,count:42},
          {lng:114.398552,lat:30.507468,count:98},
          {lng:114.398552,lat:30.507168,count:27},
          {lng:114.398552,lat:30.506868,count:23},
          {lng:114.398552,lat:30.506568,count:60},
          {lng:114.398552,lat:30.506268,count:86},
          {lng:114.398552,lat:30.505968,count:15},
          {lng:114.398552,lat:30.505668,count:55},
          {lng:114.398552,lat:30.505368,count:21},

          {lng:114.399552,lat:30.508368,count:50},
          {lng:114.399552,lat:30.508668,count:98},
          {lng:114.399552,lat:30.508968,count:15},
          {lng:114.399552,lat:30.509268,count:40},
          {lng:114.399552,lat:30.509568,count:10},
          {lng:114.399552,lat:30.509868,count:6},
          {lng:114.399552,lat:30.510168,count:18},
          {lng:114.399552,lat:30.510468,count:80},
          {lng:114.399552,lat:30.510768,count:71},
          {lng:114.399552,lat:30.511068,count:91},
          {lng:114.399552,lat:30.508068,count:7},
          {lng:114.399552,lat:30.507768,count:42},
          {lng:114.399552,lat:30.507468,count:4},
          {lng:114.399552,lat:30.507168,count:98},
          {lng:114.399552,lat:30.506868,count:23},
          {lng:114.399552,lat:30.506568,count:60},
          {lng:114.399552,lat:30.506268,count:8},
          {lng:114.399552,lat:30.505968,count:15},
          {lng:114.399552,lat:30.505668,count:25},
          {lng:114.399552,lat:30.505368,count:21},

          {lng:114.397552,lat:30.508368,count:50},
          {lng:114.397552,lat:30.508668,count:51},
          {lng:114.397552,lat:30.508968,count:65},
          {lng:114.397552,lat:30.509268,count:40},
          {lng:114.397552,lat:30.509568,count:10},
          {lng:114.397552,lat:30.509868,count:98},
          {lng:114.397552,lat:30.510168,count:18},
          {lng:114.397552,lat:30.510468,count:30},
          {lng:114.397552,lat:30.510768,count:11},
          {lng:114.397552,lat:30.508068,count:7},
          {lng:114.397552,lat:30.507768,count:42},
          {lng:114.397552,lat:30.507468,count:4},
          {lng:114.397552,lat:30.507168,count:27},
          {lng:114.397552,lat:30.506868,count:23},
          {lng:114.397552,lat:30.506568,count:60},
          {lng:114.397552,lat:30.506268,count:88},
          {lng:114.397552,lat:30.505968,count:15},
          {lng:114.397552,lat:30.505668,count:98},
          {lng:114.397552,lat:30.505368,count:21},

          {lng:114.397052,lat:30.508368,count:50},
          {lng:114.397052,lat:30.508668,count:11},
          {lng:114.397052,lat:30.508968,count:15},
          {lng:114.397052,lat:30.509268,count:40},
          {lng:114.397052,lat:30.509568,count:100},
          {lng:114.397052,lat:30.509868,count:67},
          {lng:114.397052,lat:30.510168,count:18},
          {lng:114.397052,lat:30.510468,count:80},
          {lng:114.397052,lat:30.510768,count:11},
          {lng:114.397052,lat:30.508068,count:98},
          {lng:114.397052,lat:30.507768,count:42},
          {lng:114.397052,lat:30.507468,count:48},
          {lng:114.397052,lat:30.507168,count:27},
          {lng:114.397052,lat:30.506868,count:23},
          {lng:114.397052,lat:30.506568,count:60},
          {lng:114.397052,lat:30.506268,count:87},
          {lng:114.397052,lat:30.505968,count:15},
          {lng:114.397052,lat:30.505668,count:35},
          {lng:114.397052,lat:30.505368,count:21},

          {lng:114.396552,lat:30.508368,count:50},
          {lng:114.396552,lat:30.508668,count:98},
          {lng:114.396552,lat:30.508968,count:15},
          {lng:114.396552,lat:30.509268,count:70},
          {lng:114.396552,lat:30.509568,count:100},
          {lng:114.396552,lat:30.509868,count:6},
          {lng:114.396552,lat:30.510168,count:18},
          {lng:114.396552,lat:30.510468,count:80},
          {lng:114.396552,lat:30.510768,count:11},
          {lng:114.396552,lat:30.508068,count:7},
          {lng:114.396552,lat:30.507768,count:42},
          {lng:114.396552,lat:30.507468,count:4},
          {lng:114.396552,lat:30.507168,count:67},
          {lng:114.396552,lat:30.506868,count:98},
          {lng:114.396552,lat:30.506568,count:60},
          {lng:114.396552,lat:30.506268,count:8},
          {lng:114.396552,lat:30.505968,count:15},
          {lng:114.396552,lat:30.505668,count:25},
          {lng:114.396552,lat:30.505368,count:21},

          {lng:114.396052,lat:30.508368,count:50},
          {lng:114.396052,lat:30.508668,count:98},
          {lng:114.396052,lat:30.508968,count:15},
          {lng:114.396052,lat:30.509268,count:40},
          {lng:114.396052,lat:30.509568,count:100},
          {lng:114.396052,lat:30.509868,count:6},
          {lng:114.396052,lat:30.510168,count:48},
          {lng:114.396052,lat:30.510468,count:80},
          {lng:114.396052,lat:30.510768,count:11},
          {lng:114.396052,lat:30.508068,count:7},
          {lng:114.396052,lat:30.507768,count:42},
          {lng:114.396052,lat:30.507468,count:4},
          {lng:114.396052,lat:30.507168,count:27},
          {lng:114.396052,lat:30.506868,count:98},
          {lng:114.396052,lat:30.506568,count:60},
          {lng:114.396052,lat:30.506268,count:8},
          {lng:114.396052,lat:30.505968,count:65},
          {lng:114.396052,lat:30.505668,count:25},

          {lng:114.395552,lat:30.508368,count:98},
          {lng:114.395552,lat:30.508668,count:51},
          {lng:114.395552,lat:30.508968,count:85},
          {lng:114.395552,lat:30.509268,count:98},
          {lng:114.395552,lat:30.509568,count:100},
          {lng:114.395552,lat:30.509868,count:6},
          {lng:114.395552,lat:30.510168,count:18},
          {lng:114.395552,lat:30.510468,count:40},
          {lng:114.395552,lat:30.510768,count:61},
          {lng:114.395552,lat:30.508068,count:7},
          {lng:114.395552,lat:30.507768,count:72},
          {lng:114.395552,lat:30.507468,count:43},
          {lng:114.395552,lat:30.507168,count:98},
          {lng:114.395552,lat:30.506868,count:13},
          {lng:114.395552,lat:30.506568,count:60},
          {lng:114.395552,lat:30.506268,count:8},
          {lng:114.395552,lat:30.505968,count:15},

          {lng:114.395052,lat:30.508368,count:50},
          {lng:114.395052,lat:30.508668,count:98},
          {lng:114.395052,lat:30.508968,count:15},
          {lng:114.395052,lat:30.509268,count:40},
          {lng:114.395052,lat:30.509568,count:100},
          {lng:114.395052,lat:30.509868,count:6},
          {lng:114.395052,lat:30.510168,count:18},
          {lng:114.395052,lat:30.510468,count:98},
          {lng:114.395052,lat:30.510768,count:11},
          {lng:114.395052,lat:30.508068,count:7},
          {lng:114.395052,lat:30.507768,count:98},
          {lng:114.395052,lat:30.507468,count:4},
          {lng:114.395052,lat:30.507168,count:87},
          {lng:114.395052,lat:30.506868,count:23},
          {lng:114.395052,lat:30.506568,count:60},
          {lng:114.395052,lat:30.506268,count:8},

          {lng:114.394552,lat:30.508368,count:30},
          {lng:114.394552,lat:30.508668,count:51},
          {lng:114.394552,lat:30.508968,count:98},
          {lng:114.394552,lat:30.509268,count:40},
          {lng:114.394552,lat:30.509568,count:100},
          {lng:114.394552,lat:30.509868,count:6},
          {lng:114.394552,lat:30.510168,count:88},
          {lng:114.394552,lat:30.510468,count:80},
          {lng:114.394552,lat:30.510768,count:11},
          {lng:114.394552,lat:30.508068,count:57},
          {lng:114.394552,lat:30.507768,count:98},
          {lng:114.394552,lat:30.507468,count:4},
          {lng:114.394552,lat:30.507168,count:87},
          {lng:114.394552,lat:30.506868,count:98},

          {lng:114.394052,lat:30.508368,count:50},
          {lng:114.394052,lat:30.508668,count:51},
          {lng:114.394052,lat:30.508968,count:85},
          {lng:114.394052,lat:30.509268,count:98},
          {lng:114.394052,lat:30.509568,count:10},
          {lng:114.394052,lat:30.509868,count:6},
          {lng:114.394052,lat:30.510168,count:18},
          {lng:114.394052,lat:30.510468,count:80},
          {lng:114.394052,lat:30.510768,count:11},
          {lng:114.394052,lat:30.508068,count:7},
          {lng:114.394052,lat:30.507768,count:82},
          {lng:114.394052,lat:30.507468,count:4},
          {lng:114.394052,lat:30.507168,count:98},

          {lng:114.393552,lat:30.508368,count:50},
          {lng:114.393552,lat:30.508668,count:11},
          {lng:114.393552,lat:30.508968,count:15},
          {lng:114.393552,lat:30.509268,count:40},
          {lng:114.393552,lat:30.509568,count:98},
          {lng:114.393552,lat:30.509868,count:6},
          {lng:114.393552,lat:30.510168,count:18},
          {lng:114.393552,lat:30.510468,count:80},
          {lng:114.393552,lat:30.510768,count:98},
          {lng:114.393552,lat:30.508068,count:7},
          {lng:114.393552,lat:30.507768,count:42},
          {lng:114.393552,lat:30.507468,count:4},

          {lng:114.398052,lat:30.508368,count:30},
          {lng:114.398052,lat:30.508668,count:51},
          {lng:114.398052,lat:30.508968,count:15},
          {lng:114.398052,lat:30.509268,count:40},
          {lng:114.398052,lat:30.509568,count:98},
          {lng:114.398052,lat:30.509868,count:86},
          {lng:114.398052,lat:30.510168,count:18},
          {lng:114.398052,lat:30.510468,count:80},
          {lng:114.398052,lat:30.510768,count:21},
          {lng:114.398052,lat:30.508068,count:7},
          {lng:114.398052,lat:30.507768,count:98},
          {lng:114.398052,lat:30.507468,count:4},
          {lng:114.398052,lat:30.507168,count:17},
          {lng:114.398052,lat:30.506868,count:23},
          {lng:114.398052,lat:30.506568,count:60},
          {lng:114.398052,lat:30.506268,count:18},
          {lng:114.398052,lat:30.505968,count:34},
          {lng:114.398052,lat:30.505668,count:25},
          {lng:114.398052,lat:30.505368,count:56},
        ],
        measuringPoints: [
          {id:8,name:'武昌校区中部测量点',lng:114.397052,lat:30.508368},
          {id:9,name:'武昌校区东部测量点',lng:114.399052,lat:30.507768},
          {id:10,name:'武昌校区北部测量点',lng:114.396052,lat:30.510168},
          {id:11,name:'武昌校区西南测量点',lng:114.394052,lat:30.507168},
          {id:12,name:'武昌校西南部测量点',lng:114.398052,lat:30.505368},
        ],
        pumpHousePoints:[
          {id:202,name:'武昌校区A泵房',lng:114.396552,lat:30.510168},
          {id:209,name:'武昌校区B泵房',lng:114.394052,lat:30.508968},
        ],
        map: '',// 保存地图实例
        heatmapOverlay: {},// 热力图覆盖物
      }
    },
    methods: {
      // 创建和初始化地图函数
      initMap(){
        this.createMap();
        //this.initHeatMap();
        this.initTileLayer();
        this.addGridLayer();
        this.campusChange();
        this.initPressLegend1();
        this.initPressLegend2();
        this.initPressLegend3();
        this.initPressLegend4();
        this.initPressLegend5();
        this.initPressLegend6();
        this.initPressLegend7();
        this.initPressLegend8();
      },
      //创建地图
      createMap(){
        let params = this.$route.query ;
        if(params.marker != undefined){
          this.marker = params.marker ;
          this.info = params.info ;
          this.center = params.marker ;
        }
        // 在百度地图容器中创建地图实例
        let map = new BMap.Map("container",{minZoom:17,maxZoom:19});
        // 将map变量存储在全局
        this.map = map;
        // 设定地图的中心点和坐标
        let point = new BMap.Point(this.center.lng, this.center.lat);
        // 设置中心点坐标和地图级别
        this.map.centerAndZoom(point, 18);
        // 允许滚轮缩放
        this.map.enableScrollWheelZoom(true);
        // 添加左上角缩放比例尺(offset: new BMap.Size(0, 0)为比例尺的坐标位置)
        //var opts = {offset: new BMap.Size(10, 10)};
        //this.map.addControl(new BMap.NavigationControl(opts));
        // 设置地图默认缩放比例
        this.map.setZoom(18);
        var point1 = new BMap.Point(this.marker.lng, this.marker.lat);//从其他页面跳转至地图页面显示定位点
        var marker = new BMap.Marker(point1);
        this.map.addOverlay(marker);
        var content =this.info;
        var opts ={
          width :0,
          height:0,
          title :"<span style='font-size:18px;color:#0029ff;background-color:#FFFFFF'>定位信息:</span>"
        };
        var infoWindow =new BMap.InfoWindow(content, opts);// 创建信息窗口对象
        marker.addEventListener("click",function(){
          this.map.openInfoWindow(infoWindow,point1);
        });
      },
      //添加压力图例
      initPressLegend1(){
        var div;
        // 定义一个控件类,即function
        function ZoomControl(){
          // 默认停靠位置和偏移量
          this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
          this.defaultOffset = new BMap.Size(10, 60);
        }

        // 通过JavaScript的prototype属性继承于BMap.Control
        ZoomControl.prototype = new BMap.Control();

        // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
        // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
        ZoomControl.prototype.initialize = function(map){
          // 创建一个DOM元素
          div = document.createElement("div");
          // 添加文字说明
          div.appendChild(document.createTextNode("0--15"));
          // 设置样式
          div.style.border = "1px solid gray";
          div.style.width = "70px";
          div.style.textAlign = "center";
          div.style.backgroundColor = "#19e53b";
          // 添加DOM元素到地图中
          map.getContainer().appendChild(div);
          // 将DOM元素返回
          return div;
        };
        // 创建控件
        var myZoomCtrl = new ZoomControl();
        // 添加到地图当中
        this.map.addControl(myZoomCtrl);
      },
      initPressLegend2(){
        var div;
        // 定义一个控件类,即function
        function ZoomControl(){
          // 默认停靠位置和偏移量
          this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
          this.defaultOffset = new BMap.Size(10, 90);
        }

        // 通过JavaScript的prototype属性继承于BMap.Control
        ZoomControl.prototype = new BMap.Control();

        // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
        // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
        ZoomControl.prototype.initialize = function(map){
          // 创建一个DOM元素
          div = document.createElement("div");
          // 添加文字说明
          div.appendChild(document.createTextNode("15--30"));
          // 设置样式
          div.style.border = "1px solid gray";
          div.style.width = "70px";
          div.style.textAlign = "center";
          div.style.backgroundColor = "#9ae53a";
          // 添加DOM元素到地图中
          map.getContainer().appendChild(div);
          // 将DOM元素返回
          return div;
        };
        // 创建控件
        var myZoomCtrl = new ZoomControl();
        // 添加到地图当中
        this.map.addControl(myZoomCtrl);
      },
      initPressLegend3(){
        var div;
        // 定义一个控件类,即function
        function ZoomControl(){
          // 默认停靠位置和偏移量
          this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
          this.defaultOffset = new BMap.Size(10, 120);
        }

        // 通过JavaScript的prototype属性继承于BMap.Control
        ZoomControl.prototype = new BMap.Control();

        // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
        // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
        ZoomControl.prototype.initialize = function(map){
          // 创建一个DOM元素
          div = document.createElement("div");
          // 添加文字说明
          div.appendChild(document.createTextNode("30--45"));
          // 设置样式
          div.style.border = "1px solid gray";
          div.style.width = "70px";
          div.style.textAlign = "center";
          div.style.backgroundColor = "#ffffff";
          // 添加DOM元素到地图中
          map.getContainer().appendChild(div);
          // 将DOM元素返回
          return div;
        };
        // 创建控件
        var myZoomCtrl = new ZoomControl();
        // 添加到地图当中
        this.map.addControl(myZoomCtrl);
      },
      initPressLegend4(){
        var div;
        // 定义一个控件类,即function
        function ZoomControl(){
          // 默认停靠位置和偏移量
          this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
          this.defaultOffset = new BMap.Size(10, 150);
        }

        // 通过JavaScript的prototype属性继承于BMap.Control
        ZoomControl.prototype = new BMap.Control();

        // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
        // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
        ZoomControl.prototype.initialize = function(map){
          // 创建一个DOM元素
          div = document.createElement("div");
          // 添加文字说明
          div.appendChild(document.createTextNode("45--60"));
          // 设置样式
          div.style.border = "1px solid gray";
          div.style.width = "70px";
          div.style.textAlign = "center";
          div.style.backgroundColor = "#fff961";
          // 添加DOM元素到地图中
          map.getContainer().appendChild(div);
          // 将DOM元素返回
          return div;
        };
        // 创建控件
        var myZoomCtrl = new ZoomControl();
        // 添加到地图当中
        this.map.addControl(myZoomCtrl);
      },
      initPressLegend5(){
        var div;
        // 定义一个控件类,即function
        function ZoomControl(){
          // 默认停靠位置和偏移量
          this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
          this.defaultOffset = new BMap.Size(10, 180);
        }

        // 通过JavaScript的prototype属性继承于BMap.Control
        ZoomControl.prototype = new BMap.Control();

        // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
        // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
        ZoomControl.prototype.initialize = function(map){
          // 创建一个DOM元素
          div = document.createElement("div");
          // 添加文字说明
          div.appendChild(document.createTextNode("60--75"));
          // 设置样式
          div.style.border = "1px solid gray";
          div.style.width = "70px";
          div.style.textAlign = "center";
          div.style.backgroundColor = "#e5b447";
          // 添加DOM元素到地图中
          map.getContainer().appendChild(div);
          // 将DOM元素返回
          return div;
        };
        // 创建控件
        var myZoomCtrl = new ZoomControl();
        // 添加到地图当中
        this.map.addControl(myZoomCtrl);
      },
      initPressLegend6(){
        var div;
        // 定义一个控件类,即function
        function ZoomControl(){
          // 默认停靠位置和偏移量
          this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
          this.defaultOffset = new BMap.Size(10, 210);
        }

        // 通过JavaScript的prototype属性继承于BMap.Control
        ZoomControl.prototype = new BMap.Control();

        // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
        // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
        ZoomControl.prototype.initialize = function(map){
          // 创建一个DOM元素
          div = document.createElement("div");
          // 添加文字说明
          div.appendChild(document.createTextNode("75--90"));
          // 设置样式
          div.style.border = "1px solid gray";
          div.style.width = "70px";
          div.style.textAlign = "center";
          div.style.backgroundColor = "#e55e31";
          // 添加DOM元素到地图中
          map.getContainer().appendChild(div);
          // 将DOM元素返回
          return div;
        };
        // 创建控件
        var myZoomCtrl = new ZoomControl();
        // 添加到地图当中
        this.map.addControl(myZoomCtrl);
      },
      initPressLegend7(){
        var div;
        // 定义一个控件类,即function
        function ZoomControl(){
          // 默认停靠位置和偏移量
          this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
          this.defaultOffset = new BMap.Size(10, 210);
        }

        // 通过JavaScript的prototype属性继承于BMap.Control
        ZoomControl.prototype = new BMap.Control();

        // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
        // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
        ZoomControl.prototype.initialize = function(map){
          // 创建一个DOM元素
          div = document.createElement("div");
          // 添加文字说明
          div.appendChild(document.createTextNode("90--100"));
          // 设置样式
          div.style.border = "1px solid gray";
          div.style.width = "70px";
          div.style.textAlign = "center";
          div.style.backgroundColor = "#e5242d";
          // 添加DOM元素到地图中
          map.getContainer().appendChild(div);
          // 将DOM元素返回
          return div;
        };
        // 创建控件
        var myZoomCtrl = new ZoomControl();
        // 添加到地图当中
        this.map.addControl(myZoomCtrl);
      },
      initPressLegend8(){
        var div;
        // 定义一个控件类,即function
        function ZoomControl(){
          // 默认停靠位置和偏移量
          this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
          this.defaultOffset = new BMap.Size(10, 240);
        }

        // 通过JavaScript的prototype属性继承于BMap.Control
        ZoomControl.prototype = new BMap.Control();

        // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
        // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
        ZoomControl.prototype.initialize = function(map){
          // 创建一个DOM元素
          div = document.createElement("div");
          // 添加文字说明
          div.appendChild(document.createTextNode("压力图例"));
          // 设置样式
          div.style.border = "1px solid gray";
          div.style.width = "70px";
          div.style.textAlign = "center";
          div.style.backgroundColor = "white";
          // 添加DOM元素到地图中
          map.getContainer().appendChild(div);
          // 将DOM元素返回
          return div;
        };
        // 创建控件
        var myZoomCtrl = new ZoomControl();
        // 添加到地图当中
        this.map.addControl(myZoomCtrl);
      },
      //添加校区切换控件
      campusChange(){
        var div,div1;
        // 定义一个控件类,即function
        function ZoomControl(){
          // 默认停靠位置和偏移量
          this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
          this.defaultOffset = new BMap.Size(10, 10);
        }

        // 通过JavaScript的prototype属性继承于BMap.Control
        ZoomControl.prototype = new BMap.Control();

        // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
        // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
        ZoomControl.prototype.initialize = function(map){
          // 创建一个DOM元素
           div = document.createElement("div");
          // 添加文字说明
          div.appendChild(document.createTextNode("武昌校区"));
          // 设置样式
          div.style.width = "70px";
          div.style.textAlign = "center";
          div.style.cursor = "pointer";
          div.style.border = "1px solid gray";
          div.style.backgroundColor = "white";
          // 绑定切换校区事件
          div.onclick = function(e){
            let point = new BMap.Point(114.397052, 30.508348);
            map.centerAndZoom(point, 18);
            div.style.backgroundColor = "#60c6ff";
            div1.style.backgroundColor = "white";
          };
          // 添加DOM元素到地图中
          map.getContainer().appendChild(div);
          // 将DOM元素返回
          return div;
        };
        // 创建控件
        var myZoomCtrl = new ZoomControl();
        // 添加到地图当中
        this.map.addControl(myZoomCtrl);

        // 定义一个控件类,即function
        function ZoomControl1(){
          // 默认停靠位置和偏移量
          this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
          this.defaultOffset = new BMap.Size(85, 10);
        }

        // 通过JavaScript的prototype属性继承于BMap.Control
        ZoomControl1.prototype = new BMap.Control();

        // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
        // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
        ZoomControl1.prototype.initialize = function(map){
          // 创建一个DOM元素
           div1 = document.createElement("div");
          // 添加文字说明
          div1.appendChild(document.createTextNode("流芳校区"));
          // 设置样式
          div1.style.width = "70px";
          div1.style.textAlign = "center";
          div1.style.cursor = "pointer";
          div1.style.border = "1px solid gray";
          div1.style.backgroundColor = "white";
          // 绑定校区切换事件
          div1.onclick = function(e){
            let point = new BMap.Point(114.438681, 30.467938);
            map.centerAndZoom(point, 18);
            div.style.backgroundColor = "white";
            div1.style.backgroundColor = "#60c6ff";
          };
          // 添加DOM元素到地图中
          map.getContainer().appendChild(div1);
          // 将DOM元素返回
          return div1;
        };
        // 创建控件
        var myZoomCtrl1 = new ZoomControl1();
        // 添加到地图当中
        this.map.addControl(myZoomCtrl1);
      },
      //添加瓦片图层
      initTileLayer(){
        let tileLayer = new BMap.TileLayer({isTransparentPng: true});
        tileLayer.getTilesUrl = function(tileCoord, zoom) {
          var x = tileCoord.x;
          var y = tileCoord.y;
          return 'static/images/' + zoom + '/tile-' + x + '_' + y +'.png';
        };
        this.map.addTileLayer(tileLayer);
      },
      //生成一个测量点图标
      initMeasuringPoint(point){
        var myIcon = new BMap.Icon('static/images/meter3.png', new BMap.Size(20,20));
        var marker = new BMap.Marker(new BMap.Point(point.lng, point.lat),{icon:myIcon});// 创建标注
        this.map.addOverlay(marker);// 将标注添加到地图中
        var content =point.name;
        var opts ={
          width :0,
          height:0,
          title :"<span style='font-size:18px;color:#0029ff;background-color:#FFFFFF'>测量点信息:</span>"
        };
        var infoWindow =new BMap.InfoWindow(content, opts);// 创建信息窗口对象
        var point1 = new BMap.Point(point.lng, point.lat);
        marker.addEventListener("click",function(){
          this.map.openInfoWindow(infoWindow,point1);
        });
        var markerMenu = new BMap.ContextMenu();//创建右键菜单
        let _this = this ;
        var txtMenuItem = [
          {
            text:'监测点水压监控',
            callback: function (e) {
              for(var i=0; i<_this.measuringPoints.length; i++){
                if(e.lng < (_this.measuringPoints[i].lng + 0.0001) && e.lng > (_this.measuringPoints[i].lng - 0.0001)){
                  if(e.lat < (_this.measuringPoints[i].lat + 0.0001) && e.lat > (_this.measuringPoints[i].lat - 0.0001)){
                    _this.$router.push({
                      path:'/WaterMeterControl/WaterUseSupervision',
                      query:{
                        waterMeterId : _this.measuringPoints[i].id,
                      }
                    })
                  }
                }
              }
            },
            menuItemOptions:{width: 135 ,iconUrl: "static/images/title_icon.png"}
          },
          {
            text:'最小水压监测',
            callback: function (e) {
              for(let i=0;i<_this.measuringPoints.length;i++){
                if(e.lng < (_this.measuringPoints[i].lng + 0.0001) && e.lng > (_this.measuringPoints[i].lng - 0.0001)){
                  if(e.lat < (_this.measuringPoints[i].lat + 0.0001) && e.lat > (_this.measuringPoints[i].lat - 0.0001)){
                    _this.$router.push({
                      path:'/WaterMeterControl/MinimumFlowMonitoring',
                      query:{
                        waterMeterId : _this.measuringPoints[i].id,
                      }
                    })
                  }
                }
              }
            },
            menuItemOptions:{width: 135 ,iconUrl: "static/images/title_icon.png"}
          }
        ];
        for(var i = 0; i < txtMenuItem.length; i++){
          markerMenu.addItem(new BMap.MenuItem(
            txtMenuItem[i].text,
            txtMenuItem[i].callback,
            txtMenuItem[i].menuItemOptions
          ));
        }
        marker.addContextMenu(markerMenu);
      },
      //生成一个泵房点图标
      initPumpHousePoint(point){
        var myIcon = new BMap.Icon('static/images/building1.png', new BMap.Size(30,30));
        var marker = new BMap.Marker(new BMap.Point(point.lng, point.lat),{icon:myIcon});// 创建标注
        this.map.addOverlay(marker);// 将标注添加到地图中
        var content =point.name;
        var opts ={
          width :0,
          height:0,
          title :"<span style='font-size:18px;color:#0029ff;background-color:#FFFFFF'>泵房信息:</span>"
        };
        var infoWindow =new BMap.InfoWindow(content, opts);// 创建信息窗口对象
        var point1 = new BMap.Point(point.lng, point.lat);
        marker.addEventListener("click",function(){
          this.map.openInfoWindow(infoWindow,point1);
        });
        var markerMenu = new BMap.ContextMenu();//创建右键菜单
        let _this = this ;
        var txtMenuItem = [
          {
            text:'泵房水压概况',
            callback: function (e) {
              for(var i=0; i<_this.pumpHousePoints.length; i++){
                if(e.lng < (_this.pumpHousePoints[i].lng + 0.0001) && e.lng > (_this.pumpHousePoints[i].lng - 0.0001)){
                  if(e.lat < (_this.pumpHousePoints[i].lat + 0.0001) && e.lat > (_this.pumpHousePoints[i].lat - 0.0001)){
                    _this.$router.push({
                      path:'/WaterOfBuilding/BuildingWaterUseOverview',
                      query:{
                        buildingId : _this.pumpHousePoints[i].id,
                      }
                    })
                  }
                }
              }
            },
            menuItemOptions:{width: 120 ,iconUrl: "static/images/title_icon.png"}
          },
          {
            text:'泵房水压监控',
            callback: function (e) {
              for(var i=0; i<_this.pumpHousePoints.length; i++){
                if(e.lng < (_this.pumpHousePoints[i].lng + 0.0001) && e.lng > (_this.pumpHousePoints[i].lng - 0.0001)){
                  if(e.lat < (_this.pumpHousePoints[i].lat + 0.0001) && e.lat > (_this.pumpHousePoints[i].lat - 0.0001)){
                    _this.$router.push({
                      path:'/WaterOfBuilding/BuildingWaterSupervision',
                      query:{
                        buildingId : _this.pumpHousePoints[i].id,
                      }
                    })
                  }
                }
              }
            },
            menuItemOptions:{width: 120 ,iconUrl: "static/images/title_icon.png"}
          },
          {
            text:'最小水压监测',
            callback: function (e) {
              for(let i=0;i<_this.pumpHousePoints.length;i++){
                if(e.lng < (_this.pumpHousePoints[i].lng + 0.0001) && e.lng > (_this.pumpHousePoints[i].lng - 0.0001)){
                  if(e.lat < (_this.pumpHousePoints[i].lat + 0.0001) && e.lat > (_this.pumpHousePoints[i].lat - 0.0001)){
                    _this.$router.push({
                      path:'/WaterOfBuilding/MinimumFlowMonitoring',
                      query:{
                        buildingId : _this.pumpHousePoints[i].id,
                      }
                    })
                  }
                }
              }
            },
            menuItemOptions:{width: 120 ,iconUrl: "static/images/title_icon.png"}
          }
        ];
        for(var i = 0; i < txtMenuItem.length; i++){
          markerMenu.addItem(new BMap.MenuItem(
            txtMenuItem[i].text,
            txtMenuItem[i].callback,
            txtMenuItem[i].menuItemOptions
          ));
        }
        marker.addContextMenu(markerMenu);
      },
      //生成一个网格图层
      initGridLayer(point){
        var pStart = new BMap.Point(point.lng + 0.00025,point.lat + 0.00015);
        var pEnd = new BMap.Point(point.lng - 0.00025,point.lat - 0.00015);
        let color;
        if(point.count <= 15){
          color = '#19e53b';
        }else if(15 < point.count && point.count <= 30){
          color = '#9ae53a';
        }else if(30 < point.count && point.count <= 45){
          color = '#ffffff';
        }else if(45 < point.count && point.count <= 60){
          color = '#fff961';
        }else if(60 < point.count && point.count <= 75){
          color = '#ffbd2b';
        }else if(75 < point.count && point.count <= 90){
          color = '#ff6835';
        }else if(90 < point.count && point.count <= 100){
          color = '#e5242d';
        }
        var rectangle = new BMap.Polygon([
          new BMap.Point(pStart.lng,pStart.lat),
          new BMap.Point(pEnd.lng,pStart.lat),
          new BMap.Point(pEnd.lng,pEnd.lat),
          new BMap.Point(pStart.lng,pEnd.lat)
        ], {strokeColor:"#4e4e4e", strokeWeight:0.1, strokeOpacity:0,fillColor:color,fillOpacity:0.6});  //创建矩形
        this.map.addOverlay(rectangle);         //增加矩形
      },
      //遍历数组添加所有网格图层和图标点
      addGridLayer(){
        this.points.forEach((item) => {
          this.initGridLayer(item)
        });
        this.measuringPoints.forEach((item) => {
          this.initMeasuringPoint(item)
        });
        this.pumpHousePoints.forEach((item) => {
          this.initPumpHousePoint(item)
        })
      },
      //添加热力图覆盖物
      initHeatMap () {
        this.heatmapOverlay = new BMapLib.HeatmapOverlay({
          // 热力图的每个点的半径大小
          'radius': BMAP_POINT_SIZE_SMALL * 20,
          // 热力的透明度0~1
          'opacity': 0.5,
          // 其中 key 表示插值的位置0~1，value 为颜色值
          'gradient': {
            0:'rgb(255,255,0)',
            .5:'rgb(255,127,80)',
            1:'rgb(255, 0, 0)'
          }
        });
        // 清除图层(每次重新调用需要清除上一个覆盖物图层)
        this.map.clearOverlays();
        // 添加热力覆盖物
        this.map.addOverlay(this.heatmapOverlay);
        this.heatmapOverlay.setDataSet({data: this.points, max: 100});
        // 显示热力图，隐藏为this.heatmapOverlay.hide();
        this.heatmapOverlay.show();
      }
    },
    mounted() {
      // 创建和初始化地图函数
      this.initMap();
    }
  }
</script>

<style>
  #container {
    width: 100%;
    height: 100%;
    border: #ccc solid 1px;
  }
</style>
