<template>
  <div class="image">
    <div class="row" style="margin-top: 150px">
      <div class="col-xs-3">
        <div class="login-box">
          <div class="login-logo">
            <b style="color:#ffffff">智慧管网运行管控平台</b>
          </div>
          <div class="login-box-body" style="background-color: #dddddd">
            <div class="row">
              <div class="col-xs-4">
              </div>
              <div class="col-xs-4">
                <button @click="login1" class="btn btn-primary btn-block btn-flat">进入平台</button>
              </div>
              <div class="col-xs-4">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-3">
        <div class="login-box">
          <div class="login-logo">
          <b style="color:#ffffff">智慧节水管控平台</b>
        </div>
          <div class="login-box-body" style="background-color: #dddddd">
            <div class="row">
              <div class="col-xs-4">
              </div>
              <div class="col-xs-4">
                <button @click="login2" class="btn btn-primary btn-block btn-flat">进入平台</button>
              </div>
              <div class="col-xs-4">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-3">
        <div class="login-box">
          <div class="login-logo">
            <b style="color:#ffffff">智慧供水管网信息平台</b>
          </div>
          <div class="login-box-body" style="background-color: #dddddd">
            <div class="row">
              <div class="col-xs-4">
              </div>
              <div class="col-xs-4">
                <button @click="login3" class="btn btn-primary btn-block btn-flat">进入平台</button>
              </div>
              <div class="col-xs-4">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-3">
        <div class="login-box">
          <div class="login-logo">
            <b style="color:#ffffff">智慧水表集抄管控平台</b>
          </div>
          <div class="login-box-body" style="background-color: #dddddd">
            <div class="row">
              <div class="col-xs-4">
              </div>
              <div class="col-xs-4">
                <button @click="login4" class="btn btn-primary btn-block btn-flat">进入平台</button>
              </div>
              <div class="col-xs-4">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '../../http/config'
  export default {
    data() {
      return {}
    },
    created() {

    },

    methods: {
      login1() {
        window.location.href = "http://47.110.33.227:8180/project"
      },
      login2() {
        //window.location.href = "http://47.110.33.227:8180/project"
        this.router.push('/WaterPublicity/WaterSurvey');
      },
      login3() {
        window.location.href = "http://47.110.33.227:8180/lightmap"
      },
      login4() {
        window.location.href = "http://localhost:8889/#/Index"
      },
    },
  }
</script>

<style scoped>
  .image{
    background: url(../../../static/images/daping.png);
    background-size: 100% 100%;
    height:100%;
    width:100%;
  }
</style>
