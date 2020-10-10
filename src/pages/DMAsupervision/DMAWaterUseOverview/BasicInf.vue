<template>
    <div class="basic-box">
      <div class="basic-row">
        <div class="basic-name"><b>DMA名称</b></div>
        <div class="basic-value">{{basicInf.name}}</div>
        <div class="basic-name"><b>占地面积</b></div>
        <div class="basic-value">{{basicInf.area}}㎡</div>
      </div>
      <div class="basic-row">
        <div class="basic-name"><b>建筑数量</b></div>
        <div class="basic-value">{{buildingAmount}}栋</div>
        <div class="basic-name"><b>建筑面积</b></div>
        <div class="basic-value">{{buildingArea}}㎡</div>
      </div>
      <div class="basic-row">
        <div class="basic-name"><b>入驻人数</b></div>
        <div class="basic-value">{{basicInf.population}}人</div>
        <div class="basic-name"><b>DMA地址</b></div>
        <div class="basic-value">{{basicInf.address}}</div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "basic-inf",
      props: {
        regionId : {
          type: Number,
        }
      },
      data(){
        return {
          basicInf: [],
          buildingArea: 0,
          buildingAmount: 0,
        }
      },
      methods:{
        /*获取基本信息数据*/
        refreshBasic(id){
          this.$api.regionInf.findOne(id).then(res => {
            this.basicInf = res ;
          })
        },
        refresh1(){
          let params = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.stats.findAllPage(params).then(res =>{
            this.buildingAmount = res.list[24].value ;
            this.buildingArea = res.list[25].value ;
          })
        },
        refresh2(){
          let params = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.stats.findAllPage(params).then(res =>{
            this.buildingAmount = res.list[26].value ;
            this.buildingArea = res.list[27].value ;
          })
        },
        refresh3(){
          let params = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.stats.findAllPage(params).then(res =>{
            this.buildingAmount = res.list[28].value ;
            this.buildingArea = res.list[29].value ;
          })
        },
        refresh4(){
          let params = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.stats.findAllPage(params).then(res =>{
            this.buildingAmount = res.list[30].value ;
            this.buildingArea = res.list[31].value ;
          })
        },
        refresh5(){
          let params = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.stats.findAllPage(params).then(res =>{
            this.buildingAmount = res.list[32].value ;
            this.buildingArea = res.list[33].value ;
          })
        },
        refresh6(){
          let params = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.stats.findAllPage(params).then(res =>{
            this.buildingAmount = res.list[34].value ;
            this.buildingArea = res.list[35].value ;
          })
        },
        refresh7(){
          let params = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.stats.findAllPage(params).then(res =>{
            this.buildingAmount = res.list[36].value ;
            this.buildingArea = res.list[37].value ;
          })
        },
        refresh8(){
          let params = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.stats.findAllPage(params).then(res =>{
            this.buildingAmount = res.list[38].value ;
            this.buildingArea = res.list[39].value ;
          })
        },
        refresh9(){
          let params = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.stats.findAllPage(params).then(res =>{
            this.buildingAmount = res.list[40].value ;
            this.buildingArea = res.list[41].value ;
          })
        },
        refresh10(){
          let params = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.stats.findAllPage(params).then(res =>{
            this.buildingAmount = res.list[42].value ;
            this.buildingArea = res.list[43].value ;
          })
        },
        refresh11(){
          let params = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.stats.findAllPage(params).then(res =>{
            this.buildingAmount = res.list[44].value ;
            this.buildingArea = res.list[45].value ;
          })
        },
        refresh12(){
          let params = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.stats.findAllPage(params).then(res =>{
            this.buildingAmount = res.list[46].value ;
            this.buildingArea = res.list[47].value ;
          })
        },
        refresh13(){
          let params = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.stats.findAllPage(params).then(res =>{
            this.buildingAmount = res.list[48].value ;
            this.buildingArea = res.list[49].value ;
          })
        },
        refresh14(){
          let params = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.stats.findAllPage(params).then(res =>{
            this.buildingAmount = res.list[50].value ;
            this.buildingArea = res.list[51].value ;
          })
        },
        refresh15(){
          let params = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.stats.findAllPage(params).then(res =>{
            this.buildingAmount = res.list[52].value ;
            this.buildingArea = res.list[53].value ;
          })
        },
        refresh16(){
          let params = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.stats.findAllPage(params).then(res =>{
            this.buildingAmount = res.list[54].value ;
            this.buildingArea = res.list[55].value ;
          })
        },
      },
    }
</script>

<style scoped>
  .basic-box {height: 100%;display: flex;flex-flow: column;justify-content: space-evenly;}
  .basic-row {height: 28%;display: inline-flex;justify-content: space-between}
  .basic-name {height: 100%;width: 18%;display: flex;justify-content: center;align-items: center;background: #DEEBF7;}
  .basic-value {height: 100%;width: 30%;display: flex;justify-content: center;align-items: center;background: #DEEBF7;}
</style>
