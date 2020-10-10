import Vue from 'vue'
import Router from 'vue-router'
/*import config from '../http/config'*/
Vue.use(Router)

const router =  new Router({
 /* mode:'history',//默认是'hash'*/
  mode:'hash',
  linkActiveClass:"active",
  linkExactActiveClass:"exactActive",
  routes: [
    {
      path: '/',
      name: '',
      component: resolve => require(['@/pages/login/Login'], resolve)
    },
    {
      path: '/Login',
      name: 'Login',
      component: resolve => require(['@/pages/login/Login'], resolve)
    },
    {
      path: '/SystemNavigation',
      name: 'SystemNavigation',
      component: resolve => require(['@/pages/login/SystemNavigation'], resolve)
    },
    /*节水监管平台*/
    {
      path: '/Index',
      name: 'Index',
      component: resolve => require(['@/pages/Index'], resolve),
      children:[
        /*百度地图*/
        {
          path:'/BmapGL',
          name:'BmapGL',
          component:resolve=>require(['@/pages/BmapGL'],resolve)
        },
        /*测试地图*/
        {
          path:'/TestGL',
          name:'TestGL',
          component:resolve=>require(['@/pages/TestGL'],resolve)
        },
        /*管控概况模块*/
        {
          /*全校用水概况*/
        path: '/WaterPublicity/WaterSurvey',
        name: 'WaterSurvey',
        component: resolve => require(['@/pages/waterPublicity/WaterSurvey'], resolve)
        },
        {
          /*定额节水概况*/
          path: '/WaterPublicity/QuotaWaterSaving',
          name: 'QuotaWaterSaving',
          component: resolve => require(['@/pages/waterPublicity/QuotaWaterSaving'], resolve)
        },
        {
          /*漏损指数概况*/
          path: '/WaterPublicity/LeakageIndex',
          name: 'LeakageIndex',
          component: resolve => require(['@/pages/waterPublicity/LeakageIndex'], resolve)
        },
        {
          /*报警信息概况*/
          path: '/WaterPublicity/AlarmMessage',
          name: 'AlarmMessage',
          component: resolve => require(['@/pages/waterPublicity/AlarmMessage'], resolve)
        },
        /*总量管控模块*/
        {
          /*校区用水概况*/
          path: '/aggregateControl/CampusWaterUseOverview',
          name: 'CampusWaterUseOverview',
          component: resolve => require(['@/pages/aggregateControl/CampusWaterUseOverview'], resolve)
        },
        {
          /*校区用水监管*/
          path: '/aggregateControl/CampusWaterSupervision',
          name: 'CampusWaterSupervision',
          component: resolve => require(['@/pages/aggregateControl/CampusWaterSupervision'], resolve)
        },
        {
          /*最小流量监管*/
          path: '/aggregateControl/MinimumFlowMonitoring',
          name: 'CampusMinimumFlowMonitoring',
          component: resolve => require(['@/pages/aggregateControl/MinimumFlowMonitoring'], resolve)
        },
        {
          /*一级水表监管*/
          path: '/aggregateControl/PrimaryMeterSupervision',
          name: 'PrimaryMeterSupervision',
          component: resolve => require(['@/pages/aggregateControl/PrimaryMeterSupervision'], resolve)
        },
        {
          /*用水趋势分析*/
          path: '/aggregateControl/WaterUseTrendAnalysis',
          name: 'WaterUseTrendAnalysis',
          component: resolve => require(['@/pages/aggregateControl/WaterUseTrendAnalysis'], resolve)
        },
        /*DMA管控模块*/
        {
          /*DMA导航*/
          path: '/DMASupervision/DMANavigation',
          name: 'DMANavigation',
          component: resolve => require(['@/pages/DMASupervision/DMANavigation'], resolve)
        },
        {
          /*DMA用水概况*/
          path: '/DMASupervision/DMAWaterUseOverview',
          name: 'DMAWaterUseOverview',
          component: resolve => require(['@/pages/DMASupervision/DMAWaterUseOverview'], resolve)
        },
        {
          /*DMA水量监管*/
          path: '/DMASupervision/DMAWaterSupervision',
          name: 'DMAWaterSupervision',
          component: resolve => require(['@/pages/DMASupervision/DMAWaterSupervision'], resolve)
        },
        {
          /*DMA最小流量监管*/
          path: '/DMASupervision/MinimumFlowMonitoring',
          name: 'DMAMinimumFlowMonitoring',
          component: resolve => require(['@/pages/DMASupervision/MinimumFlowMonitoring'], resolve)
        },
        /*建筑管控模块*/
        {
          /*建筑漏损导图*/
          path: '/WaterOfBuilding/BuildingNavigation',
          name: 'BuildingNavigation',
          component: resolve => require(['@/pages/waterOfBuilding/BuildingNavigation'], resolve)
        },
        {
          /*建筑用水概况*/
          path: '/WaterOfBuilding/BuildingWaterUseOverview',
          name: 'BuildingWaterUseOverview',
          component: resolve => require(['@/pages/waterOfBuilding/BuildingWaterUseOverview'], resolve)
        },
        {
          /*建筑水量监控*/
          path: '/WaterOfBuilding/BuildingWaterSupervision',
          name: 'BuildingWaterSupervision',
          component: resolve => require(['@/pages/waterOfBuilding/BuildingWaterSupervision'], resolve)
        },
        {
          /*建筑最小流量监管*/
          path: '/WaterOfBuilding/MinimumFlowMonitoring',
          name: 'BuildingMinimumFlowMonitoring',
          component: resolve => require(['@/pages/waterOfBuilding/MinimumFlowMonitoring'], resolve)
        },
        {
          /*用水综合分类*/
          path: '/WaterOfBuilding/WaterUseClassify',
          name: 'WaterUseClassify',
          component: resolve => require(['@/pages/waterOfBuilding/WaterUseClassify'], resolve)
        },
        /*水表管控模块*/
        {
          /*水表运行监管*/
          path: '/WaterMeterControl/WaterMeterOperationSupervision',
          name: 'WaterMeterOperationSupervision',
          component: resolve => require(['@/pages/waterMeterControl/WaterMeterOperationSupervision'], resolve)
        },
        {
          /*水表水量监管*/
          path: '/WaterMeterControl/WaterUseSupervision',
          name: 'WaterUseSupervision',
          component: resolve => require(['@/pages/waterMeterControl/WaterUseSupervision'], resolve)
        },
        {
          /*水表最小流量监管*/
          path: '/WaterMeterControl/MinimumFlowMonitoring',
          name: 'MeterMinimumFlowMonitoring',
          component: resolve => require(['@/pages/waterMeterControl/MinimumFlowMonitoring'], resolve)
        },
        /*平衡管控模块*/
        {
          /*校区平衡分析*/
          path: '/BalanceControl/CampusBalanceAnalysis',
          name: 'CampusBalanceAnalysis',
          component: resolve => require(['@/pages/balanceControl/CampusBalanceAnalysis'], resolve)
        },
        {
          /*自定义平衡*/
          path: '/BalanceControl/CustomBalance',
          name: 'CustomBalance',
          component: resolve => require(['@/pages/balanceControl/CustomBalance'], resolve)
        },
        /*报警管控模块*/
        {
          /*报警OA管理*/
          path: '/AlarmManagement/AlarmOAManagement',
          name: 'AlarmOAManagement',
          component: resolve => require(['@/pages/AlarmManagement/AlarmOAManagement'], resolve)
        },
        {
          /*报警OA管理*/
          path: '/AlarmManagement/RepairFormOverview',
          name: 'RepairFormOverview',
          component: resolve => require(['@/pages/AlarmManagement/RepairFormOverview'], resolve)
        },
        /*定额管理模块*/
        {
          /*校区定额设置*/
          path: '/QuotaManagement/SetCampusQuota',
          name: 'SetCampusQuota',
          component: resolve => require(['@/pages/quotaManagement/SetCampusQuota'], resolve)
        },
        {
          /*DMA定额设置*/
          path: '/QuotaManagement/SetDMAQuota',
          name: 'SetDMAQuota',
          component: resolve => require(['@/pages/quotaManagement/SetDMAQuota'], resolve)
        },
        {
          /*建筑定额设置*/
          path: '/QuotaManagement/SetBuildingQuota',
          name: 'SetBuildingQuota',
          component: resolve => require(['@/pages/quotaManagement/SetBuildingQuota'], resolve)
        },
      ]
    },
    /*后台管理系统*/
    {
      path:'/Admin',
      name:'Admin',
      component:resolve =>require(['@/pages/Admin'],resolve),
      children:[
        {
          /*用户信息管理*/
          path:'/SystemManagement/UsersManagement',
          name:'UsersManagement',
          component:resolve => require(['@/pages/systemManagement/UsersManagement'], resolve)
        },
        {
          /*水表信息管理*/
          path:'/SystemManagement/WaterMeterInformationManagement',
          name:'WaterMeterInformation',
          component:resolve => require(['@/pages/systemManagement/WaterMeterInformationManagement'], resolve)
        },
        {
          /*图例标准信息管理*/
          path:'/SystemManagement/LegendStatisticsStandard',
          name:'LegendStatisticsStandard',
          component:resolve => require(['@/pages/systemManagement/LegendStatisticsStandard'], resolve)
        },
        {
          /*漏损指标信息管理*/
          path:'/SystemManagement/rtaIndexStandard',
          name:'rtaIndexStandard',
          component:resolve => require(['@/pages/systemManagement/rtaIndexStandard'], resolve)
        },
        {
          /*统计参数信息管理*/
          path:'/SystemManagement/StatsVariableManagement',
          name:'StatsVariableManagement',
          component:resolve => require(['@/pages/systemManagement/StatsVariableManagement'], resolve)
        },
        /*日志管理*/
        {
          path:'/SystemManagement/Journal',
          name:'Journal',
          component:resolve => require(['@/pages/systemManagement/JournalManagement'], resolve)
        },
        /*校区及DMA管理*/
        {
          /*校区及DMA信息管理*/
          path:'/SystemManagement/Region',
          name:'Region',
          component:resolve => require(['@/pages/systemManagement/RegionInformationManagement'], resolve)
        },
        {
          /*校区及DMA照片管理*/
          path:'/SystemManagement/RegionPicture',
          name:'RegionPicture',
          component:resolve => require(['@/pages/systemManagement/RegionPicture'], resolve)
        },
        {
          /*区域计量水表管理*/
          path:'/SystemManagement/RWaterMeterWaterRegion',
          name:'RWaterMeterWaterRegion',
          component:resolve => require(['@/pages/systemManagement/RWaterMeterWaterRegion'], resolve)
        },
        /*建筑管理*/
        {
          /*建筑信息管理*/
          path:'/SystemManagement/Building',
          name:'Building',
          component:resolve => require(['@/pages/systemManagement/BuildingInformationManagement'], resolve)
        },
        {
          /*建筑照片管理*/
          path:'/SystemManagement/BuildingPicture',
          name:'BuildingPicture',
          component:resolve => require(['@/pages/systemManagement/BuildingPicture'], resolve)
        },
        {
          /*建筑类型管理*/
          path:'/SystemManagement/CategoryManagement',
          name:'CategoryManagement',
          component:resolve => require(['@/pages/systemManagement/BuildingCategoryManagement'], resolve)
        },
        {
          /*建筑计量水表管理*/
          path:'/SystemManagement/RWaterMeterBuilding',
          name:'RWaterMeterBuilding',
          component:resolve => require(['@/pages/systemManagement/RWaterMeterBuilding'], resolve)
        },
      ]
    },
  ]
});
/*导航守卫
使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆*/
router.beforeEach((to, from, next) => {
  if (to.path === '/Login'||to.path === '/') {
    next();
  } else {
    let token = localStorage.getItem('access_token');
    /*config.headers.access_token = token ;*/
    if (token === 'null' || token === '') {
      next('/Login');
    } else {
      next();
    }
  }
});
export default router;
