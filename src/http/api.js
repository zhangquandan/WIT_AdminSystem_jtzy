import * as regionInf from './modules/systemManagement/regionInf' //区域信息
import * as buildingInf from './modules/systemManagement/buildingInf' //建筑信息
import * as logOperation from './modules/systemManagement/logOperation'  //系统操作日志信息
import * as logWaterMeter from './modules/systemManagement/logWaterMeter' //水表读数信息
import * as userInf from './modules/systemManagement/user' //用户信息
import * as waterMeterInf from './modules/systemManagement/waterMeterInf' //水表信息
import * as sso from './modules/login/sso' //登陆
import * as stats from './modules/systemManagement/statsvariable'//统计参数设置
import * as buildingQuota from './modules/systemManagement/buildingWaterQuota'//建筑定额设置
import * as waterRegionQuota from './modules/systemManagement/waterRegionQuota'//区域定额设置
import * as buildingPic from './modules/systemManagement/buildingPic'//建筑图片
import * as regionData from './modules/systemManagement/regionData'//区域最小流量及综合指数
import * as waterMeterData from './modules/systemManagement/waterMeterData'//水表最小流量及综合指数
import * as buildingData from './modules/systemManagement/buildingData'//建筑最小流量及综合指数
import * as waterRegionPic from './modules/systemManagement/waterRegionPic'//区域图片处理接口
import * as leakageIndex from './modules/systemManagement/leakageIndex'//综合漏损指数设置
import * as navigation from './modules/systemManagement/navigation'//导航图图例样式参数
import * as alarm from './modules/systemManagement/alarm'//报警OA管理流程
export default {

  regionInf,buildingInf,logOperation,logWaterMeter,userInf,waterMeterInf,

  sso,stats,buildingQuota,waterRegionQuota,buildingPic,

  regionData,waterMeterData,buildingData,waterRegionPic,leakageIndex,navigation,alarm

}
