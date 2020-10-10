<!--平台框架页面-->
<template>
    <div class="index-page">
      <header class="main-header">
        <a class="logo">
          <span class="logo-mini">
            WIT
          </span>
          <span class="logo-lg">
            <img src="../../static/images/titleimage02.png" height="40" width="160">
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
              <!-- 通知 -->
              <li class="dropdown notifications-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="fa fa-bell-o"></i>
                  <span class="label label-warning">{{totalAmount}}</span>
                </a>
                <ul class="dropdown-menu" style="background-color: #ffffff">
                  <li class="header" style="background-color: #49b1ff"><b>近三天总共有{{totalAmount}}条报警信息</b></li>
                  <li class="body">
                    <ul class="menu">
                      <li>
                        <a href="#" @click="toAlarm('2','40')">
                          <i class="fa fa-warning text-red"></i> {{regionAmount}} 条校区漏损报警信息
                        </a>
                      </li>
                      <li>
                        <a href="#" @click="toAlarm('3','30')">
                          <i class="fa fa-warning text-yellow"></i> {{dmaAmount}} 条DMA漏损报警信息
                        </a>
                      </li>
                      <li>
                        <a href="#" @click="toAlarm('4','20')">
                          <i class="fa fa-warning text-green"></i> {{buildingAmount}} 条建筑漏损报警信息
                        </a>
                      </li>
                      <li>
                        <a href="#" @click="toAlarm('5','10')">
                          <i class="fa fa-warning text-aqua"></i> {{meterAmount}} 条表具漏损报警信息
                        </a>
                      </li>
                      <li>
                        <a href="#" @click="toAlarm('6','50')">
                          <i class="fa fa-warning text-black"></i> {{equipmentAmount}} 条设备故障报警信息
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li class="footer">
                    <a href="javascript:" @click="toAlarmOperate" style="background-color: #49b1ff"><b>报警信息处理</b></a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="javascript:" @click="toMap">管网地图</a>
              </li>
              <!--<li>
                <a href="javascript:" @click="toTestMap">测试地图</a>
              </li>-->
              <li>
                <a href="javascript:" @click="toAdmin">后台管理系统</a>
              </li>
              <li>
                <a href="javascript:" @click="toIndex">监控大厅</a>
              </li>
              <li class="dropdown user user-menu">
                <a class="dropdown-toggle" data-toggle="dropdown">
                  <img src="../../static/images/noavatar.png" class="user-image" alt="User Image">
                  <span class="hidden-xs">{{userName}}</span>
                </a>
                <ul class="dropdown-menu">
                  <li class="user-header">
                    <img src="../../static/images/noavatar.png" class="img-circle" alt="User Image">
                    <p>{{userName + '(' + role + ')'}}</p>
                  </li>
                  <li class="user-footer" style="background-color: #37aee1">
                    <div class="pull-right">
                      <a class="btn btn-default btn-flat" @click="link">退出</a>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <Left class="left-bar"></Left>
      <!--<footer class="main-footer">
        <div class="pull-right hidden-xs">
          <b>Version</b> 2.0.0
        </div>
        <strong>
          Copyright &copy; 2010-2020
          <a href="https://www.whboshui.com">武汉博水信息科技有限公司</a>.
        </strong> All rights
        reserved.
      </footer>-->
    </div>
</template>

<script>
  import Left from "./LeftNavs";
  import config from "../http/config"
  import dateFormat from "../js/dateFormat"
  export default {
    components: {Left},
    name: 'Index',
    data(){
      return {
        boo:true,
        userName:'',
        meterAmount:'--',
        dmaAmount:'--',
        buildingAmount:'--',
        regionAmount:'--',
        equipmentAmount:'--',
        totalAmount:'--',
        startTime:'',
        endTime:'',
        currentPage:'',
        size:'',
        role: '',
      }
    },
    created(){
      this.count();
    },
    mounted(){
      let token = localStorage.getItem('access_token');
      delete config.headers.access_token ;
      let params = {
        token : token
      };
      this.$api.sso.findUserByToken(params).then(res => {
        this.userName = res.data.username;
        this.role = res.data.name;
        localStorage.setItem('userName',res.data.username);
      });
      $(window).resize();
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
          };
          this.$api.sso.loginOut(params).then(res => {
            if(res.msg == 'ok'){
              this.$message({
                type:'success',
                message:'退出成功！'
              });
              localStorage.removeItem("access_token");
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
      /*跳转至监控大厅*/
      toIndex(){
        window.location.href = "http://47.110.33.227:8280/project"
      },
      /*跳转至后台管理系统*/
      async toAdmin(){
        let token = localStorage.getItem("access_token");
        let user = await this.$api.sso.findUserByToken({token: token});
        if(user.data.systemrole[0].id != 7 && user.data.systemrole[0].id != 1) {
          this.$alert('用户权限不足！','提示')
          return ;
        }
        //this.$router.push('/Admin');
        this.$router.push('/SystemManagement/UsersManagement');
      },
      /*跳转至报警信息概况*/
      toAlarm(radio,type){
        /*this.$router.push('/WaterPublicity/AlarmMessage');*/
        this.$router.push({
          name: 'AlarmMessage',
          params: {
            type: type,
            radio: radio
          }
        })
      },
      /*跳转至报警OA处理*/
      toAlarmOperate(){
        this.$router.push('/AlarmManagement/AlarmOAManagement');
      },
      async count(){
        let date = new Date();
        this.endTime = dateFormat.dateFormat(date,'-');
        let startTime = new Date().setTime(date.getTime()-2*3600*1000*24);
        this.startTime = dateFormat.dateFormat(startTime,'-');
        let a = new Date().setTime(date.getTime() + 3600*1000*24);
        let endTime1 = dateFormat.dateFormat(a,'-');
        this.currentPage = 1 ;
        this.size = 1000 ;
        let params1 = {
          startTime : this.startTime + " 00:00:00",
          endTime : this.endTime+ " 00:00:00",
          pageNum : this.currentPage,
          pageSize : this.size,
          category : 10,
          name : 'status',
          value : '2'
        };
        let params2 = {
          startTime : this.startTime + " 00:00:00",
          endTime : this.endTime+ " 00:00:00",
          pageNum : this.currentPage,
          pageSize : this.size,
          category : 20,
          name : 'status',
          value : '2'
        };
        let params3 = {
          startTime : this.startTime + " 00:00:00",
          endTime : this.endTime+ " 00:00:00",
          pageNum : this.currentPage,
          pageSize : this.size,
          category : 30,
          name : 'status',
          value : '2'
        };
        let params4 = {
          startTime : this.startTime + " 00:00:00",
          endTime : this.endTime+ " 00:00:00",
          pageNum : this.currentPage,
          pageSize : this.size,
          category : 40,
          name : 'status',
          value : '2'
        };
        let params5 = {
          startTime : this.startTime + " 00:00:00",
          endTime : endTime1 + " 00:00:00",
          pageNum : this.currentPage,
          pageSize : this.size,
          category : 50,
          name : 'status',
          value : '2'
        };
        let waterMeter = await this.getAlarmNum(params1);
        let dma = await this.getAlarmNum(params3);
        let building = await this.getAlarmNum(params2);
        let region = await this.getAlarmNum(params4);
        let equipment = await this.getAlarmNum(params5);
        this.meterAmount = waterMeter.data.list.length;
        this.dmaAmount = dma.data.list.length;
        this.buildingAmount = building.data.list.length;
        this.regionAmount = region.data.list.length;
        this.equipmentAmount = equipment.data.list.length;
        this.totalAmount = this.meterAmount + this.dmaAmount + this.buildingAmount + this.regionAmount + this.equipmentAmount;
      },
      getAlarmNum(params){
        return new Promise((resolve,reject) => {
          this.$api.alarm.findAll(params).then(res=>{
            resolve(res);
          }).catch(err =>{
            reject(err);
          })
        })
      },
      /*跳转至管网地图页面*/
      toMap(){
        this.$router.push('/BmapGL');
      },
      /*跳转至测试地图页面*/
      toTestMap(){
        this.$router.push('/TestGL');
      }
    }
  }
</script>

<style scoped>
/* .main-footer{
    height:40px;
  }*/
  .index-page {height: 100%;display: flex;flex-flow: column;}
  .left-bar {flex: 1;display: flex;flex-flow: column;}
</style>

