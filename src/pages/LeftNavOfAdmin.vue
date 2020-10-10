<template>
  <div class="" style="flex: 1;display: flex;flex-flow: column;background: #d0ecf9; ">
    <aside class="main-sidebar" style="flex: 1; ">
      <section class="sidebar">
        <ul class="sidebar-menu" data-widget="tree">
          <li class="header">主导航</li>
          <li class="active treeview">
            <a href="#">
              <i class="fa fa-gears"></i>
              <span>基本信息管理</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link to="/SystemManagement/UsersManagement" exact>
                  <i class="fa fa-circle-o"></i>用户管理
                </router-link>
              </li>
              <li>
                <router-link to="/SystemManagement/WaterMeterInformationManagement" exact>
                  <i class="fa fa-circle-o"></i>水表信息管理
                </router-link>
              </li>
              <li>
                <router-link to="/SystemManagement/rtaIndexStandard" exact>
                  <i class="fa fa-circle-o"></i>漏损指标信息管理
                </router-link>
              </li>
              <li>
                <router-link to="/SystemManagement/LegendStatisticsStandard" exact>
                  <i class="fa fa-circle-o"></i>漏损指数色卡信息管理
                </router-link>
              </li>
              <li>
                <router-link to="/SystemManagement/StatsVariableManagement" exact>
                  <i class="fa fa-circle-o"></i>统计参数信息管理
                </router-link>
              </li>
              <li>
                <router-link to="/SystemManagement/Journal" exact>
                  <i class="fa fa-circle-o"></i>用户操作日志管理
                </router-link>
              </li>
            </ul>
          </li>
          <li class="treeview">
            <a href="#">
              <i class="fa fa-gears"></i>
              <span>校区及DMA管理</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link to="/SystemManagement/Region" exact>
                  <i class="fa fa-circle-o"></i>校区及DMA信息管理
                </router-link>
              </li>
              <li>
                <router-link to="/SystemManagement/RegionPicture" exact>
                  <i class="fa fa-circle-o"></i>校区及DMA照片管理
                </router-link>
              </li>
              <li>
                <router-link to="/SystemManagement/RWaterMeterWaterRegion" exact>
                  <i class="fa fa-circle-o"></i>校区及DMA计量水表管理
                </router-link>
              </li>
            </ul>
          </li>
          <li class="treeview">
            <a href="#">
              <i class="fa fa-gears"></i>
              <span>建筑管理</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link to="/SystemManagement/Building" exact>
                  <i class="fa fa-circle-o"></i>建筑信息管理
                </router-link>
              </li>
              <li>
                <router-link to="/SystemManagement/BuildingPicture" exact>
                  <i class="fa fa-circle-o"></i>建筑照片管理
                </router-link>
              </li>
              <li>
                <router-link to="/SystemManagement/CategoryManagement" exact>
                  <i class="fa fa-circle-o"></i>建筑类别管理
                </router-link>
              </li>
              <li>
                <router-link to="/SystemManagement/RWaterMeterBuilding" exact>
                  <i class="fa fa-circle-o"></i>建筑计量水表管理
                </router-link>
              </li>

            </ul>
          </li>
          <!--<li class="treeview">
            <a href="#">
              <i class="fa fa-gears"></i>
              <span>监控设置管理</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              &lt;!&ndash;<li>
                <router-link to="/SystemManagement/WaterMeterLogError" exact>
                  <i class="fa fa-circle-o"></i>水表异常原始读数管理
                </router-link>
              </li>&ndash;&gt;
              &lt;!&ndash;<li>
                <router-link to="/SystemManagement/Department" exact>
                  <i class="fa fa-circle-o"></i>部门信息管理
                </router-link>
              </li>&ndash;&gt;
              &lt;!&ndash; <li>
                 <router-link to="/SystemManagement/WaterTypes" exact>
                   <i class="fa fa-circle-o"></i>用水类型管理
                 </router-link>
               </li>&ndash;&gt;
              &lt;!&ndash;<li>
                <router-link to="/SystemManagement/WaterMeterLog" exact>
                  <i class="fa fa-circle-o"></i>水表原始读数管理
                </router-link>
              </li>&ndash;&gt;
              &lt;!&ndash;<li>
                <router-link to="/SystemManagement/RWaterMeterDepartment" exact>
                  <i class="fa fa-circle-o"></i>部门计量水表管理
                </router-link>
              </li>&ndash;&gt;
              &lt;!&ndash;<li>
                <router-link to="/SystemManagement/RWaterMeterWaterUsage" exact>
                  <i class="fa fa-circle-o"></i>用水类型计量水表管理
                </router-link>
              </li>&ndash;&gt;
              &lt;!&ndash;<li>
                <router-link to="/SystemManagement/RegionlostManagement" exact>
                  <i class="fa fa-circle-o"></i>区域漏损报警设置
                </router-link>
              </li>&ndash;&gt;
              &lt;!&ndash;<li>
                <router-link to="/DMAsupervision/DMAlostManagement" exact>
                  <i class="fa fa-circle-o"></i>DMA漏损报警设置
                </router-link>
              </li>
              <li>
                <router-link to="/SystemManagement/WaterMeterFlow" exact>
                  <i class="fa fa-circle-o"></i>水表夜间最小流量报警设置
                </router-link>
              </li>
              <li>
                <router-link to="/WaterMonitoring/waterMeterAlarmSetting" exact>
                  <i class="fa fa-circle-o"></i>水表异常用水报警设置
                </router-link>
              </li>
              <li>
                <router-link to="/WaterOfBuilding/BuildingFlowSetting" exact>
                  <i class="fa fa-circle-o"></i>建筑异常用水报警设置
                </router-link>
              </li>&ndash;&gt;
            </ul>
          </li>-->
        </ul>
      </section>
    </aside>
    <div class="content-wrapper" style="flex: 1;background: rgb(208,236,249);" :style="{height:mapHeight}">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
    export default {
      name: "left-nav-of-admin",
      data(){
        return {

        }
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
  li {
    padding-left: 10px;
  }
 /* .sidebar {
    height:665px;
    overflow-y: auto;
  }*/
</style>
