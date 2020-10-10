<template>
  <div style="text-align:center;display:inline-flex;justify-content: center;margin-bottom:20px;">
    <div><b>点击地图跳转至：</b></div>&emsp;
    <el-radio-group size="medium" v-model="radio" style="margin-top: -9px;" @change="radioChange">
      <el-radio :label="1" border><b>DMA监控分析</b></el-radio>
      <el-radio :label="2" border><b>DMA节水统计</b></el-radio>
      <el-radio :label="3" border><b>DMA计量水表查询</b></el-radio>
    </el-radio-group>
  </div>
</template>

<script>
    export default {
      name: "radio-group-of-d-m-a",
      data(){
        return {
          radio:1,
        }
      },
      props:{
        typeData:{
          type:Number,
        }
      },
      created(){

      },
      methods:{
        radioChange(){
          let url = "";
          switch(this.radio){
            case 1 : url="/DMAsupervision/DMAmonitor";
              break;
            case 2 : url = "/DMAsupervision/DMAwaterSaving";
              break;
            case 3: url = "/DMAsupervision/DMAwaterMeter"
          }
          let params = {
            url:url
          }
          this.$emit('radioChange',params)
        },
      }
    }
</script>

<style scoped>

</style>
