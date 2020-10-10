<!--全校用水概况-->
<template>
  <div class="flex">
    <div class="content body">
      <top></top>
      <!--中间和底部总体高度自适应-->
      <div class="surplus">
        <div class="surplus-top">
          <div class="row">
            <div class="col-xs-5">
              <center-left></center-left>
            </div>
            <div class="col-xs-7">
              <center-right></center-right>
            </div>
          </div>
        </div>
        <div class="surplus-bottom">
          <div class="row">
            <div class="col-xs-5">
              <bottom-left></bottom-left>
            </div>
            <div class="col-xs-7">
              <bottom-right></bottom-right>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Top from "./waterSurvey/Top";
  import CenterLeft from "./waterSurvey/CenterLeft";
  import CenterRight from "./waterSurvey/CenterRight";
  import BottomLeft from "./waterSurvey/BottomLeft";
  import BottomRight from "./waterSurvey/BottomRight";

  export default {
    components: {
      BottomRight,
      BottomLeft,
      CenterRight,
      CenterLeft,
      Top,
    },
    name: "water-survey",
    data(){
      return {

      }
    },
    mounted() {

    },
    /*mounted(){

    },*/
    methods:{}
  }
</script>

<style scoped>
  @import "../../../static/css/waterSurey.css";
</style>
