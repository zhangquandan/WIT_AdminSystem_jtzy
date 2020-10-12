<!--定额节水概况-->
<template>
  <div class="flex">
    <div class="content body">
      <div class="row">
        <div class="quota-left col-xs-6">
          <div class="total box box-solid">
            <div class="box-header bg-aqua">
              校区定额与节水概况
            </div>
            <div class="box-body">
              <total-region></total-region>
            </div>
          </div>
          <div class="region box box-solid">
            <div class="box-header bg-aqua">
              DMA定额与节水概况
            </div>
            <div class="box-body">
              <region></region>
            </div>
          </div>
        </div>
        <div class="quota-right col-xs-6">
          <div class="build box box-solid">
            <div class="box-header bg-aqua">
              建筑定额与节水概况
            </div>
            <div class="box-body">
              <building></building>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Building from "./quotaWaterSaving/Building";
    import Region from "./quotaWaterSaving/Region";
    import TotalRegion from "./quotaWaterSaving/TotalRegion";

    export default {
      components: {
        TotalRegion,
        Region,
        Building},
      name: "quota-water-saving",
      data() {
        return {

        }
      },
      mounted() {
        /*let params = {waterregionid: 2,time: '2020-05-11'};
        let token = localStorage.getItem('access_token');
        axios({
          url: "http://47.110.33.227:8180/wsis/api/waterregion/LeakageIndex",
          method: "get",
          params: params,
          headers: {
            'access_token': token,
          },
          withCredentials: true,
          timeout: 1500,
          responseType: 'json'
        }).then(res => {
          console.log(res);
        })*/
      },
    }
</script>

<style scoped>
  @import "../../../static/css/quotaWaterSaving.css";
</style>
