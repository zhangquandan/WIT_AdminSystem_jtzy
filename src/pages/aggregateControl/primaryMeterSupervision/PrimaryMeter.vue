<template>
    <div class="meters">
      <div class="left">
        <el-button type="success" size="small" :disabled="start == 0" circle @click="toLeft"> << </el-button>
      </div>
      <div :class="end >= meterData.length ? 'middle-left' : 'middle'">
        <div class="meter"  v-for="(item,index) in meters" :key="index" @click="link(item,index)" :class="{changeStyle: changeSelectStyle == item.snumber}">
          <img class="img" src="../../../../static/images/timg.jpg" alt="">
          <div class="title">{{item.name}}</div>
          <div class="number">{{item.snumber}}</div>
          <div class="is-online">
            <div :class="item.isonline ? 'green' : 'red'"></div>
            {{item.isonline ? '在线' : '不在线'}}
          </div>
        </div>
      </div>
      <div class="right">
        <el-button type="success" size="small" :disabled="end >= meterData.length" circle @click="toRight"> >> </el-button>
      </div>
    </div>
</template>

<script>
    export default {
      name: "primary-meter",
      data() {
        return {
          meterData: [],
          changeSelectStyle: 0,
          start: 0,
          end: 7,
          meters: [],
        }
      },
      mounted() {
        this.getAllMeters();
      },
      methods: {
        /*获取所有一级水表信息*/
        async getAllMeters() {
          var meters = await this.$api.waterMeterInf.findALL();
          var primary;
          if(meters && typeof meters == 'object' && meters.length > 0){
            primary = meters.filter(item => item.remark == '一级表');
          }
          this.meterData = primary;
          this.meters = this.meterData.slice(this.start,this.end);
          this.init();
        },
        init() {
          var data = this.meterData[0];
          this.changeSelectStyle = data.snumber;
          var params = {name: data.name,id: data.id}
          this.$emit('init',params);
        },
        link(item,index) {
          this.changeSelectStyle = item.snumber;
          var params = {name: item.name,id: item.id}
          this.$emit('link',params)
        },
        toLeft() {
          this.start -= 7;
          this.end -= 7;
          this.meters = this.meterData.slice(this.start,this.end)
        },
        toRight() {
          this.start += 7;
          this.end += 7;
          this.meters = this.meterData.slice(this.start,this.end)
        }
      }
    }
</script>

<style scoped>
  .meters {height: 100%;width: 100%;display: inline-flex;}
  .left {height: 100%;width: 5%;display: flex;justify-content: center;align-items: center;}
  .middle {height: 100%;width: 90%;display: inline-flex;justify-content: space-evenly;align-items: center;overflow-x: auto;}
  .middle-left {height: 100%;width: 90%;display: inline-flex;justify-content: right;align-items: center;overflow-x: auto;}
  .middle-left > div {margin-left: 25px;}
  .right {height: 100%;width: 5%;display: flex;justify-content: center;align-items: center;}
  .meter {border:3px solid #aed4fa;height: 95%;width: 12%;min-width: 150px;border-radius: 12px;box-shadow: 0 2px 12px 0 rgba(204,204,204,.9);display: flex;flex-flow: column;justify-content: space-evenly;align-items: center;}
  .img {width: 30px;height: 30px;}
  .title {font-size: 12px;height: 20px;width: 80%;display: flex;justify-content: center;align-items: center;}
  .title::-webkit-scrollbar {display: none;}
  .number {height: 20px;width: 50%;display: flex;justify-content: center;align-items: center;}
  .is-online {display: flex;width: 100%;justify-content: center;align-items: center;height: 20px;}
  .green {border-radius: 50%;background: green;height: 15px;width: 15px;margin-right: 3px;}
  .red {border-radius: 50%;background: red;height: 15px;width: 15px;margin-right: 3px;}
  .changeStyle {background: #aed4fa;}
</style>
