<template>
  <div class="box box-solid second-first">
    <div class="box-header bg-aqua">学校基本信息</div>
    <div class="box-body">
      <div class="basic-box">
        <div class="basic-inf-name">占地面积</div>
        <div class="basic-inf">{{area}}㎡</div>
        <div class="basic-inf-name">住校学生</div>
        <div class="basic-inf">{{student}}人</div>
      </div>
      <div class="basic-box">
        <div class="basic-inf-name">建筑面积</div>
        <div class="basic-inf">{{buildingsArea}}㎡</div>
        <div class="basic-inf-name">本(专)科生</div>
        <div class="basic-inf">{{undergraduate}}人</div>
      </div>
      <div class="basic-box">
        <div class="basic-inf-name">教职工</div>
        <div class="basic-inf">{{teacher}}人</div>
        <div class="basic-inf-name">硕士生</div>
        <div class="basic-inf">{{master}}人</div>
      </div>
      <div class="basic-box">
        <div class="basic-inf-name">住校职工</div>
        <div class="basic-inf">{{workers}}人</div>
        <div class="basic-inf-name">博士生</div>
        <div class="basic-inf">{{doctor}}人</div>
      </div>
      <div class="basic-box">
        <div class="basic-inf-name">住校户数</div>
        <div class="basic-inf">{{household}}户</div>
        <div class="basic-inf-name">留学生</div>
        <div class="basic-inf">{{overseas}}人</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "center-left",
      data(){
        return {
          basicInf: [],
          area:'',
          student:'',
          buildingsArea:'',
          undergraduate:'',
          teacher:'',
          master:'',
          workers:'',
          doctor:'',
          household:'',
          overseas:'',
        }
      },
      mounted(){
        this.refresh();
      },
      methods:{
        /*获取基本信息数据*/
        refresh(){
          let params = {
            pageNum : 1,
            pageSize : 100,
          };
          this.$api.stats.findAllPage(params).then(res =>{
            this.area = res.list[0].value ;
            this.student = res.list[9].value ;
            this.buildingsArea = res.list[2].value ;
            this.undergraduate = res.list[3].value + res.list[7].value ;
            this.teacher = res.list[10].value ;
            this.master = res.list[4].value ;
            this.workers = res.list[11].value ;
            this.doctor = res.list[5].value ;
            this.household = res.list[12].value ;
            this.overseas = res.list[6].value ;
          })
        },
      },
    }
</script>

<style scoped>
  @import "../../../../static/css/waterSurey.css";
  .box {margin-bottom: 7px;}
</style>
