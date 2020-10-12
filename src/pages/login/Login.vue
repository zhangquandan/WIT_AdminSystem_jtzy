<template>
  <!--<div class="image">
    <div class="login-box">
      <div class="login-logo">
        <b style="color:#ffffff">武汉工程大学</b>
        <br>
        <b style="color:#ffffff">智慧节水管控平台</b>
      </div>
      <div class="login-box-body">
        <p class="login-box-msg"><b>用户登录</b></p>
        <div class="form-group has-feedback">
          <input type="text" v-model="loginForm.username" class="form-control" placeholder="账号">
          <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" v-model="loginForm.password" class="form-control" placeholder="密码">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="row">
          <div class="col-xs-8">
          </div>
          <div class="col-xs-4">
            <button @click="login" class="btn btn-primary btn-block btn-flat">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>-->
  <div class="login-container">

    <el-form label-width="80px" class="login-form">
      <div class="row">
        <div class="col-xs-5">
          <img class="img" src="../../../static/images/logo.png">
        </div>
        <div class="col-xs-7">
          <h3 class="login-title">用户登录</h3>
          <el-form-item label="用户端：">
            <el-select v-model="value" style="width: 375px" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名：">
            <el-input type="text" v-model="loginForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 375px" @click="login">登录</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  import config from '../../http/config'

  export default {
    data() {
      return {
        options: [{
          value: 1,
          label: '武汉交通职业学院智慧节水管控平台'
        }
        // , {
        //   value: 2,
        //   label: '武汉博水水表集抄平台'
        // }, {
        //   value: 3,
        //   label: '武汉工程大学智慧供水管网信息平台'
        // }
        ],
        value: 1,
        loginForm: {
          username: '',
          password: ''
        },
      }
    },
    compute: {
      mapHeight() {
        return $(document).height() + 'px';
      }
    },
    methods: {
      login() {
        //alert(this.value)
        let data = {
          username: this.loginForm.username,
          password: this.loginForm.password
        };
        data = this.qs.stringify(data);
        if (this.loginForm.username === '' || this.loginForm.password === '') {
          alert('账号或密码不能为空！');
        } else if (this.value === 1) {
          localStorage.removeItem("access_token");
          this.$api.sso.login(data).then(res => {
            if (res.status == 200) {
              localStorage.setItem("access_token", res.data);
              //this.router.push('/SystemNavigation');
              this.router.push('/WaterPublicity/WaterSurvey');
              // window.location.href = "http://47.110.33.227:8280/project"
            } else {
              this.$message({
                type: 'error',
                message: '用户名或密码错误！'
              })
            }
          }).catch(error => {
            console.log(error);
            alert(error);
          })
        } else if (this.value === 2) {
          localStorage.removeItem("access_token");
          this.$api.sso.login(data).then(res => {
            if (res.status == 200) {
              localStorage.setItem("access_token", res.data);
              window.location.href = "http://47.110.33.227:8180/witCb/#/ShowWaterMeter"
            } else {
              this.$message({
                type: 'error',
                message: '用户名或密码错误！'
              })
            }
          }).catch(error => {
            console.log(error);
            alert(error);
          })
        } else {
          localStorage.removeItem("access_token");
          this.$api.sso.login(data).then(res => {
            if (res.status == 200) {
              localStorage.setItem("access_token", res.data);
              document.cookie = "username=1;path=/";
              window.location.href = "http://47.110.33.227:8180/lightmap/index.html"
            } else {
              this.$message({
                type: 'error',
                message: '用户名或密码错误！'
              })
            }
          }).catch(error => {
            console.log(error);
            alert(error);
          })
        }
      },
    }
  }
</script>

<style scoped>
  .img {
    margin-top: 60px;
    margin-left: 70px;
    width: 195px;
    height: 245px;
  }

  /* 背景 */
  .login-container {
    width: 100%;
    height: 100%;
    background: url("../../../static/images/background.jpg");
  }

  .login-form {
    width: 900px;
    background-color: rgb(255, 255, 255);
    padding-right: 100px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 20px; /* 圆角 */
    margin: 0 auto; /*水平居中*/
    position: relative;
    top: 27%; /*偏移*/
  }

  /* 标题 */
  .login-title {
    color: #4a9aff;
    text-align: center;
    margin-bottom: 30px;
    margin-left: 70px;
  }

  /*.image {*/
  /*  background: url(../../../static/images/background.jpg);*/
  /*  background-size: 100% 100%;*/
  /*  height: 100%;*/
  /*  width: 100%;*/
  /*}*/
</style>
