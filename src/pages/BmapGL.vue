<template>
  <!--初始化加载百度地图-->
  <baidu-map
    class="map"
    style="height: 100%"
    ak="cGMT45K7PWj21dGVIu74UxS4FaVd43A1&s=1"
    :center="center"
    :zoom="18"
    :min-zoom="1"
    @ready="location"
    :scroll-wheel-zoom="true">
    <!--地图瓦片图层-->
<!--    <bm-tile-->
<!--      :isTransparentPng="true"-->
<!--      tileUrlTemplate="static/images/{Z}/tile-{X}_{Y}.png">-->
<!--    </bm-tile>-->
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
      <button  @click="changeCenter1()" :class="{handleColor: index === button1}">默认位置</button>
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
        markers:[{"id":1,"name":"自来水总表","lng":114.26909204719033,"lat":30.43448338681298,"show":false},{"id":2,"name":"自来水常压北供水表","lng":114.27020747020933,"lat":30.434460686644773,"show":false},{"id":3,"name":"西区教学加压水表","lng":114.27015620611391,"lat":30.43404319945985,"show":false},{"id":4,"name":"北区宿舍常压水表","lng":114.27200721520151,"lat":30.435864472101915,"show":false},{"id":5,"name":"北区宿舍加压水表","lng":114.27227563347165,"lat":30.435850427058707,"show":false},{"id":6,"name":"公租房常压水表","lng":114.27419006634261,"lat":30.432129875826778,"show":false},{"id":7,"name":"公租房加压水表","lng":114.27405070911624,"lat":30.432056697244644,"show":false},{"id":8,"name":"南区宿舍加压水表","lng":114.27210230582492,"lat":30.43181616713913,"show":false}],
        buildingMarkers:[{"id":1,"name":"公租房8栋","lng":114.27372925124683,"lat":30.43058903076171,"show":false},{"id":2,"name":"公租房7栋","lng":114.27288465492153,"lat":30.43064690524789,"show":false},{"id":3,"name":"南苑三舍","lng":114.27065553275693,"lat":30.43087282192903,"show":false},{"id":4,"name":"公租房6栋","lng":114.27375313358748,"lat":30.430936314321897,"show":false},{"id":5,"name":"临湖六舍","lng":114.27466571717025,"lat":30.435573279718902,"show":false},{"id":6,"name":"公租房5栋","lng":114.27290833428377,"lat":30.430994041433188,"show":false},{"id":7,"name":"南苑4舍","lng":114.27097269349777,"lat":30.430523314927452,"show":false},{"id":8,"name":"南苑二舍","lng":114.27067964518208,"lat":30.431215930009927,"show":false},{"id":9,"name":"公租房4栋","lng":114.27377762899039,"lat":30.431282997537863,"show":false},{"id":10,"name":"公租房3栋","lng":114.27293240216866,"lat":30.4313413069533,"show":false},{"id":11,"name":"南苑一舍","lng":114.27071219142468,"lat":30.431563644014016,"show":false},{"id":12,"name":"公租房2栋","lng":114.27380127060587,"lat":30.43163044379089,"show":false},{"id":13,"name":"公租房1栋","lng":114.27295534677712,"lat":30.431688111341575,"show":false},{"id":14,"name":"体育馆","lng":114.26902693951351,"lat":30.431268985266914,"show":false},{"id":15,"name":"临湖三舍","lng":114.27362442142847,"lat":30.435644361740014,"show":false},{"id":16,"name":"公租房泵房","lng":114.27400066489224,"lat":30.431847556709176,"show":false},{"id":17,"name":"临湖二舍","lng":114.27365098649588,"lat":30.43603619391535,"show":false},{"id":18,"name":"实训楼","lng":114.26979618459995,"lat":30.435731247988016,"show":false},{"id":19,"name":"焊接中心","lng":114.2705755192538,"lat":30.436197956826874,"show":false},{"id":20,"name":"转运站","lng":114.27491613442957,"lat":30.4331005666043,"show":false},{"id":21,"name":"后勤服务中心","lng":114.27466450568545,"lat":30.433194904566435,"show":false},{"id":22,"name":"花房","lng":114.27514702358738,"lat":30.433299680723238,"show":false},{"id":23,"name":"临湖轩","lng":114.27267713347197,"lat":30.435930579821157,"show":false},{"id":24,"name":"信息楼","lng":114.27096902279042,"lat":30.433375921195786,"show":false},{"id":25,"name":"校医院","lng":114.27469237963614,"lat":30.43352733260156,"show":false},{"id":26,"name":"行政楼","lng":114.26961615139585,"lat":30.433564366820075,"show":false},{"id":27,"name":"商铺","lng":114.27483241223028,"lat":30.43420579775884,"show":false},{"id":28,"name":"临湖九舍","lng":114.27477280026773,"lat":30.434385429295236,"show":false},{"id":29,"name":"污水处理厂","lng":114.27574636507414,"lat":30.434650089924375,"show":false},{"id":30,"name":"临湖8舍","lng":114.27461062492111,"lat":30.434788083201425,"show":false},{"id":31,"name":"教师楼","lng":114.26969244646058,"lat":30.434729230935115,"show":false},{"id":32,"name":"临湖七舍","lng":114.27463722123602,"lat":30.43517990789726,"show":false},{"id":33,"name":"临湖四舍","lng":114.274718485916,"lat":30.436357629758632,"show":false},{"id":34,"name":"活动中心","lng":114.27375525820065,"lat":30.43530090845736,"show":false},{"id":35,"name":"临湖一舍","lng":114.27367809157661,"lat":30.4364286547357,"show":false},{"id":36,"name":"学生澡堂","lng":114.2725637175159,"lat":30.436481818535466,"show":false},{"id":37,"name":"临湖五舍","lng":114.27469232178835,"lat":30.435965106823822,"show":false},{"id":38,"name":"南苑轩","lng":114.27146558123457,"lat":30.430912850930373,"show":false},{"id":39,"name":"致远号","lng":114.27299228785414,"lat":30.432254151958748,"show":false},{"id":40,"name":"泵房","lng":114.27021576908754,"lat":30.432764281456397,"show":false},{"id":41,"name":"教学楼南楼","lng":114.2735728242369,"lat":30.433574576046276,"show":false},{"id":42,"name":"教学楼北楼","lng":114.2736142796727,"lat":30.43418607403028,"show":false},{"id":43,"name":"教学楼大厅","lng":114.27300192350538,"lat":30.433920668331602,"show":false},{"id":44,"name":"图书馆","lng":114.27206960953933,"lat":30.43490829687197,"show":false},{"id":45,"name":"BIM创新中心","lng":114.27296637725067,"lat":30.436454879727847,"show":false}],
        marker:{},
        info:'',
        size: new BMap.Size(10, 10),
        buildingMarkerSize: new BMap.Size(0,-10),
        markerSize: new BMap.Size(0,-10),
        center:{lng:114.27300192350538,lat:30.433920668331602},
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
        this.center = {lng:114.27300192350538,lat:30.433920668331602};
        this.index = this.button1;
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
</style>
