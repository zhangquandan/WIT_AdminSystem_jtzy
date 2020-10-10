<template>
  <div class="" style="flex: 1;display: flex;flex-flow: column;background: #d0ecf9; ">
    <aside class="main-sidebar" style="flex: 1; ">
      <section class="sidebar">
        <ul class="sidebar-menu" data-widget="tree">
          <li class="header">主导航</li>
          <li class="active treeview">
            <a href="#">
              <i class="fa fa-dashboard"></i>
              <span>管控概况</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li exact>
                <router-link to="/WaterPublicity/WaterSurvey">
                  <i class="fa fa-circle-o"></i>全校用水概况
                </router-link>
              </li>
              <li exact>
                <router-link to="/WaterPublicity/QuotaWaterSaving">
                  <i class="fa fa-circle-o"></i>定额节水概况
                </router-link>
              </li>
              <li exact>
                <router-link to="/WaterPublicity/LeakageIndex">
                  <i class="fa fa-circle-o"></i>漏损指数概况
                </router-link>
              </li>
              <li exact>
                <router-link to="/WaterPublicity/AlarmMessage">
                  <i class="fa fa-circle-o"></i>报警信息概况
                </router-link>
              </li>
            </ul>
          </li>
          <li class="treeview">
          <a href="#">
            <i class="fa fa-laptop"></i>
            <span>总量管控</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li>
              <router-link to="/aggregateControl/CampusWaterUseOverview" exact>
                <i class="fa fa-circle-o"></i>校区用水概况
              </router-link>
            </li>
            <li>
              <router-link to="/aggregateControl/CampusWaterSupervision" exact>
                <i class="fa fa-circle-o"></i>校区水量监管
              </router-link>
            </li>
            <li>
              <router-link to="/aggregateControl/MinimumFlowMonitoring" exact>
                <i class="fa fa-circle-o"></i>最小流量监管
              </router-link>
            </li>
            <li>
              <router-link to="/aggregateControl/PrimaryMeterSupervision" exact>
                <i class="fa fa-circle-o"></i>一级水表监管
              </router-link>
            </li>
            <li>
              <router-link to="/aggregateControl/WaterUseTrendAnalysis" exact>
                <i class="fa fa-circle-o"></i>用水趋势分析
              </router-link>
            </li>
          </ul>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-book"></i>
            <span>DMA管控</span>
            <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
          </a>
          <ul class="treeview-menu">
            <li>
              <router-link to="/DMASupervision/DMANavigation" exact>
                <i class="fa fa-circle-o"></i>DMA漏损导图
              </router-link>
            </li>
            <li>
              <router-link to="/DMAsupervision/DMAWaterUseOverview" exact>
                <i class="fa fa-circle-o"></i>DMA用水概况
              </router-link>
            </li>
            <li>
              <router-link to="/DMASupervision/DMAWaterSupervision" exact>
                <i class="fa fa-circle-o"></i>DMA水量监管
              </router-link>
            </li>
            <li>
              <router-link to="/DMASupervision/MinimumFlowMonitoring" exact>
                <i class="fa fa-circle-o"></i>最小流量监管
              </router-link>
            </li>
          </ul>
          </li>
          <li class="treeview">
            <a href="#">
              <i class="fa fa-calendar"></i>
              <span>建筑管控</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link to="/WaterOfBuilding/BuildingNavigation" exact>
                  <i class="fa fa-circle-o"></i>建筑漏损导图
                </router-link>
              </li>
              <li>
                <router-link to="/WaterOfBuilding/BuildingWaterUseOverview" exact>
                  <i class="fa fa-circle-o"></i>建筑用水概况
                </router-link>
              </li>
              <li>
                <router-link to="/WaterOfBuilding/BuildingWaterSupervision" exact>
                  <i class="fa fa-circle-o"></i>建筑水量监管
                </router-link>
              </li>
              <li>
                <router-link to="/WaterOfBuilding/MinimumFlowMonitoring" exact>
                  <i class="fa fa-circle-o"></i>最小流量监管
                </router-link>
              </li>
              <li>
                <router-link to="/WaterOfBuilding/WaterUseClassify" exact>
                  <i class="fa fa-circle-o"></i>用水综合分类
                </router-link>
              </li>
            </ul>
          </li>
          <li class="treeview">
            <a href="#">
              <i class="fa fa-pie-chart"></i>
              <span>水表管控</span>
              <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link to="/WaterMeterControl/WaterMeterOperationSupervision" exact>
                  <i class="fa fa-circle-o"></i>水表运行监管
                </router-link>
              </li>
              <li>
                <router-link to="/WaterMeterControl/WaterUseSupervision" exact>
                  <i class="fa fa-circle-o"></i>水表水量监管
                </router-link>
              </li>
              <li>
                <router-link to="/WaterMeterControl/MinimumFlowMonitoring" exact>
                  <i class="fa fa-circle-o"></i>最小流量监管
                </router-link>
              </li>
            </ul>
          </li>
          <li class="treeview">
            <a href="#">
              <i class="fa fa-edit"></i>
              <span>平衡管控</span>
              <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link to="/BalanceControl/CampusBalanceAnalysis" exact>
                  <i class="fa fa-circle-o"></i>校区平衡分析
                </router-link>
              </li>
              <li>
                <router-link to="/BalanceControl/CustomBalance" exact>
                  <i class="fa fa-circle-o"></i>自定义平衡
                </router-link>
              </li>
            </ul>
          </li>
          <li class="treeview">
            <a href="#">
            <i class="fa fa-warning"></i>
            <span>报警管控</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link to="/AlarmManagement/RepairFormOverview" exact>
                  <i class="fa fa-circle-o"></i>维修报表总览
                </router-link>
              </li>
              <li>
                <router-link to="/AlarmManagement/AlarmOAManagement" exact>
                  <i class="fa fa-circle-o"></i>报警OA管理
                </router-link>
              </li>
            </ul>
          </li>
          <li class="treeview">
            <a href="#">
              <i class="fa fa-edit"></i>
              <span>定额设置</span>
              <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link to="/QuotaManagement/SetCampusQuota" exact>
                  <i class="fa fa-circle-o"></i>校区定额设置
                </router-link>
              </li>
              <li>
                <router-link to="/QuotaManagement/SetDMAQuota" exact>
                  <i class="fa fa-circle-o"></i>DMA定额设置
                </router-link>
              </li>
              <li>
                <router-link to="/QuotaManagement/SetBuildingQuota" exact>
                  <i class="fa fa-circle-o"></i>建筑定额设置
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </aside>
    <div class="content-wrapper" style="flex: 1;background: rgb(208,236,249);" :style="{maxHeight: mapHeight}"> <!-- :style="{height:mapHeight}"-->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  /*$(function(){
    $('.sidebar-menu li:not(.treeview) > a').on('click', function(){
      var $parent = $(this).parent().addClass('active');
      $parent.siblings('.treeview.active').find('> a').trigger('click');
      $parent.siblings().removeClass('active').find('li').removeClass('active');
    });

    $(window).on('load', function(){
      $('.sidebar-menu a').each(function(){
        if(this.href === window.location.href){
          $(this).parent().addClass('active')
            .closest('.treeview-menu').addClass('.menu-open')
            .closest('.treeview').addClass('active');
        }
      });
    });
    $('.sidebar-menu li:not(.treeview) > a').on('click', function(){
      console.log(this.href);
      var $parent = $(this).parent().addClass('active');
      $parent.siblings('.treeview.active').find('> a').trigger('click');
      $parent.siblings().removeClass('active').find('li').removeClass('active');
    });
    $('.sidebar-menu a').each(function(){
      if(this.href === window.location.href){
        $(this).parent().addClass('active')
          .closest('.treeview-menu').addClass('.menu-open')
          .closest('.treeview').addClass('active');
      }
    });
  });*/
  export default {
    name:'left-nav-s',
    data(){
      return {

      }
    },
    created(){

    },
    computed:{
      mapHeight(){
        return $(document).height()-100+'px';
      }
    }
  }
</script>

<style>
  .active {
    background-color: white;
  }
  li{
    padding-left: 10px;
  }
/*.sidebar {
  height:665px;
}*/
/*  a:link {color: #FF0000}
  a:visited {color: #00FF00}
  a:hover {color: #FF00FF}
  a:active {color: #0000FF}*/
</style>
