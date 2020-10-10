<template>
    <div class="basic-box">
      <div class="basic-row">
        <div class="basic-name"><b>占地面积</b></div>
        <div class="basic-value">{{basicInf.area}}㎡</div>
        <div class="basic-name"><b>建筑面积</b></div>
        <div class="basic-value">{{buildingsArea}}㎡</div>
      </div>
      <div class="basic-row">
        <div class="basic-name"><b>住校学生</b></div>
        <div class="basic-value">{{basicInf.population}}人</div>
        <div class="basic-name"><b>折合本科</b></div>
        <div class="basic-value">{{undergraduate}}人</div>
      </div>
      <div class="basic-row">
        <div class="basic-name"><b>住校职工</b></div>
        <div class="basic-value">{{Workers}}人</div>
        <div class="basic-name"><b>住校户数</b></div>
        <div class="basic-value">{{household}}户</div>
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
          buildingsArea:'',
          undergraduate:'',
          Workers:'',
          household:'',
        }
      },
      methods:{
        /*获取基本信息数据*/
        refreshBasic(id){
          this.$api.regionInf.findOne(id).then(res => {
            this.basicInf = res ;
          });
        },
        refresh(){
          let params = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.stats.findAllPage(params).then(res =>{
            this.buildingsArea = res.list[2].value ;
            this.undergraduate = res.list[14].value ;
            this.Workers = res.list[11].value ;
            this.household = res.list[12].value ;
          })
        },
        refresh1(){
          let params = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.stats.findAllPage(params).then(res =>{
            this.buildingsArea = res.list[16].value ;
            this.undergraduate = res.list[17].value ;
            this.Workers = res.list[18].value ;
            this.household = res.list[19].value ;
          })
        },
        refresh2(){
          let params = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.stats.findAllPage(params).then(res =>{
            this.buildingsArea = res.list[20].value ;
            this.undergraduate = res.list[21].value ;
            this.Workers = res.list[22].value ;
            this.household = res.list[23].value ;
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
