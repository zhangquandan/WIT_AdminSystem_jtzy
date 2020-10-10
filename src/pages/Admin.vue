<!--后台管理框架页面-->
<template>
  <div class="index-page">
      <header class="main-header">
        <a class="logo">
          <span class="logo-mini">
            WIT
          </span>
          <span class="logo-lg">
            <img src="../../static/images/admin.png" height="40" width="160" alt="后台管理系统">
          </span>
        </a>
        <nav class="navbar navbar-static-top" role="navigation">
          <a href="javascript:" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">切换</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
              <li>
                <a href="javascript:" @click="toIndex">智慧节水管控平台</a>
              </li>
              <li class="dropdown user user-menu">
                <a href="javascript:" class="dropdown-toggle" data-toggle="dropdown">
                  <img src="../../static/images/noavatar.png" class="user-image" alt="User Image">
                  <span class="hidden-xs">{{userName}}</span>
                </a>
                <ul class="dropdown-menu">
                  <li class="user-header">
                    <img src="../../static/images/noavatar.png" class="img-circle" alt="User Image">
                    <p>系统管理员</p>
                  </li>
                  <li class="user-footer" style="background-color: #37aee1">
                    <div class="pull-right">
                      <a class="btn btn-default btn-flat" @click="link">退出</a>
                    </div>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" data-toggle="control-sidebar">
                  <i class="fa fa-gears"></i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <left-nav-of-admin class="left-bar"></left-nav-of-admin>
      <!--<footer class="main-footer">
        <div class="pull-right hidden-xs">
          <b>Version</b> 2.0.0
        </div>
        <strong>
          Copyright &copy; 2010-2019
          <a href="https://www.whboshui.com">武汉博水信息科技有限公司</a>.
        </strong> All rights
        reserved.
      </footer>-->
    </div>
</template>

<script>
  import config from "../http/config"
  import LeftNavOfAdmin from "./LeftNavOfAdmin";
  export default {
    components: {
      LeftNavOfAdmin},
    name: 'Index',
    data(){
      return {
        boo:true,
        userName:'',
      }
    },
    mounted(){
      let token = localStorage.getItem('access_token')
      delete config.headers.access_token ;
      let params = {
        token : token
      }
      this.$api.sso.findUserByToken(params).then(res => {
        this.userName = res.data.username;
        localStorage.setItem('userName',res.data.username);
      })
      $(window).resize()
    },
    methods:{
      link(){
        this.$confirm('点击确定按钮将退出系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          let token = localStorage.getItem("access_token");
          let params = {
            token : token
          }
          this.$api.sso.loginOut(params).then(res => {
            if(res.msg == 'ok'){
              this.$message({
                type:'success',
                message:'退出成功！'
              })
              this.$router.push('/Login')
            }
          })
         /* */
        }).catch(()=>{
          this.$message({
            type:'info',
            message:'取消退出'
          })
        })
      },
      toIndex(){
        this.$router.push('/WaterPublicity/WaterSurvey')
      }
    }
  }
</script>

<style scoped>
  .main-footer{
    height:40px;
  }
  .index-page {height: 100%;display: flex;flex-flow: column;}
  .left-bar {flex: 1;display: flex;flex-flow: column;}
</style>

