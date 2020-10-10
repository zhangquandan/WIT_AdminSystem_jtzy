import axios from '../../axios'

/*区域新增接口*/
const route = 'wsis/api/';
//1、区域自定义时段每时原始数据(分页) params: pageNum,pageSize,waterregionid,starttime,endtime<yyyy-MM-dd HH>
export const findTimesHourData = (params) => {

  return axios({ url:route+'waterregion/CustomDayByHour',method: 'get',params })

}

//2、区域自定义时段每天原始数据(分页) params: pageNum,pageSize,waterregionid,starttime,endtime<yyyy-MM-dd>
export const findTimesDayData = (params) => {

  return axios({ url:route+'waterregion/CustomMonthByDay',method: 'get',params })

}

//3、区域自定义时段每月原始数据(分页) params: pageNum,pageSize,waterregionid,starttime,endtime<yyyy-MM>
export const findTimesMonthData = (params) => {

  return axios({ url:route+'waterregion/CustomYearByMonth',method: 'get',params })

}

//4、区域自定义时段每年原始数据(分页) params: pageNum,pageSize,waterregionid,stratyy,endyy<yyyy>
export const findTimesYearData = (params) => {

  return axios({ url:route+'waterregion/Years',method: 'get',params })

}

//5、区域自定义时段每时用水量(分页) params: pageNum,pageSize,waterregionid,starttime,endtime<yyyy-MM-dd HH>
export const findTimesHourFlow = (params) => {

  return axios({ url:route+'waterregion/Quantity/CustomTimeHour',method: 'get',params })

}

//6、区域自定义时段每天用水量(分页) params: pageNum,pageSize,waterregionid,starttime,endtime<yyyy-MM-dd>
export const findTimesDayFlow = (params) => {

  return axios({ url:route+'waterregion/Quantity/CustomTimeDay',method: 'get',params })

}

//7、区域自定义时段每月用水量(分页)params: pageNum,pageSize,waterregionid,starttime,endtime<yyyy-MM>
export const findTimesMonthFlow = (params) => {

  return axios({ url:route+'waterregion/Quantity/CustomTimeMonth',method: 'get',params })

}

//8、区域自定义时段每年用水量(分页)params: pageNum,pageSize,waterregionid,startyy,endyy<yyyy>
export const findTimesYearFlow = (params) => {

  return axios({ url:route+'waterregion/Quantity/Years',method: 'get',params })

}

//9、区域自定义时段总用水量 params: waterregionid,statisticsType区域类型（非必须）,starttime,endtime<yyyy-MM-dd HH>
export const findTimesTotalFlow = (params) => {

  return axios({ url:route+'waterregion/Totle/Quantity/CustomTime',method: 'get',params })

}

//10、区域自定义时间段内小时用水量及最小值 params: waterregionid,starttime,endtime<yyyy-MM-dd>
export const findTimesMinFlow = (params) => {

  return axios({ url:route+'waterregion/Quantity/MinHourList',method: 'get',params })

}

//11、区域综合漏损指数 params: waterregionid,time<yyyy-MM-dd>
export const findLeakageIndex = (params) => {

  return axios({ url:route+'waterregion/LeakageIndex',method: 'get',params })

}
