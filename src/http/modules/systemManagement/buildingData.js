import axios from '../../axios'

/*建筑新增接口*/
const route = 'wsis/api/';
//1、建筑自定义时段每时原始数据(分页) params: pageNum,pageSize,buildingid,starttime,endtime<yyyy-MM-dd HH>
export const findTimesHourData = (params) => {

  return axios({ url:route+'building/CustomDayByHour',method: 'get',params })

}

//2、建筑自定义时段每天原始数据(分页) params: pageNum,pageSize,buildingid,starttime,endtime<yyyy-MM-dd>
export const findTimesDayData = (params) => {

  return axios({ url:route+'building/CustomMonthByDay',method: 'get',params })

}

//3、建筑自定义时段每月原始数据(分页) params: pageNum,pageSize,buildingid,starttime,endtime<yyyy-MM>
export const findTimesMonthData = (params) => {

  return axios({ url:route+'building/CustomYearByMonth',method: 'get',params })

}

//4、建筑自定义时段每年原始数据(分页) params: pageNum,pageSize,buildingid,stratyy,endyy<yyyy>
export const findTimesYearData = (params) => {

  return axios({ url:route+'building/Years',method: 'get',params })

}

//5、建筑自定义时段每时用水量(分页) params: pageNum,pageSize,buildingid,starttime,endtime<yyyy-MM-dd HH>
export const findTimesHourFlow = (params) => {

  return axios({ url:route+'building/Quantity/CustomTimeHour',method: 'get',params })

}

//6、建筑自定义时段每天用水量(分页) params: pageNum,pageSize,buildingid,starttime,endtime<yyyy-MM-dd>
export const findTimesDayFlow = (params) => {

  return axios({ url:route+'building/Quantity/CustomTimeDay',method: 'get',params })

}

//7、建筑自定义时段每月用水量(分页)params: pageNum,pageSize,buildingid,starttime,endtime<yyyy-MM>
export const findTimesMonthFlow = (params) => {

  return axios({ url:route+'building/Quantity/CustomTimeMonth',method: 'get',params })

}

//8、建筑自定义时段每年用水量(分页)params: pageNum,pageSize,buildingid,startyy,endyy<yyyy>
export const findTimesYearFlow = (params) => {

  return axios({ url:route+'building/Quantity/Years',method: 'get',params })

}

//9、建筑自定义时段总用水量 params: buildingid,statisticsType建筑类型（非必须）,starttime,endtime<yyyy-MM-dd HH>
export const findTimesTotalFlow = (params) => {

  return axios({ url:route+'building/Totle/Quantity/CustomTime',method: 'get',params })

}

//10、建筑自定义时间段内小时用水量及最小值 params: buildingid,starttime,endtime<yyyy-MM-dd>
export const findTimesMinFlow = (params) => {

  return axios({ url:route+'building/Quantity/MinHourList',method: 'get',params })

}

//11、建筑综合漏损指数 params: buildingid,time<yyyy-MM-dd>
export const findLeakageIndex = (params) => {

  return axios({ url:route+'building/LeakageIndex',method: 'get',params })

}
