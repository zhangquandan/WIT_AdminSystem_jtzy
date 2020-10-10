<template>
    <div class="basic-box">
      <div class="basic-row">
        <div class="basic-name"><b>建筑名称</b></div>
        <div class="basic-value">{{basicInf.name}}</div>
        <div class="basic-name"><b>建筑编号</b></div>
        <div class="basic-value">{{basicInf.snumber}}</div>
      </div>
      <div class="basic-row">
        <div class="basic-name"><b>建筑类别</b></div>
        <div class="basic-value">{{basicInf.category}}</div>
        <div class="basic-name"><b>建筑楼层</b></div>
        <div class="basic-value">{{basicInf.storeys}}层</div>
      </div>
      <div class="basic-row">
        <div class="basic-name"><b>建筑面积</b></div>
        <div class="basic-value">{{basicInf.buildingarea}}㎡</div>
        <div class="basic-name"><b>入驻人数</b></div>
        <div class="basic-value">{{basicInf.population}}人</div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "basic-inf",
      props: {
        buildingId : {
          type: Number,
        }
      },
      data(){
        return {
          basicInf: [],
        }
      },
      methods:{
        /*获取基本信息数据*/
        refreshBasic(id){
          this.$api.buildingInf.findOne(id).then(res => {
            this.basicInf = res ;
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
