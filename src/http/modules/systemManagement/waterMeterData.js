import axios from '../../axios'

/*水表新增接口*/
const route = 'wsis/api/';
//1、水表自定义时段每时原始数据(分页) params: pageNum,pageSize,watermeterid,starttime,endtime<yyyy-MM-dd HH>
export const findTimesHourData = (params) => {

  return axios({ url:route+'logWatermeter/CustomDayByHour',method: 'get',params })

}

//2、水表自定义时段每天原始数据(分页) params: pageNum,pageSize,watermeterid,starttime,endtime<yyyy-MM-dd>
export const findTimesDayData = (params) => {

  return axios({ url:route+'logWatermeter/CustomMonthByDay',method: 'get',params })

}

//3、水表自定义时段每月原始数据(分页) params: pageNum,pageSize,watermeterid,starttime,endtime<yyyy-MM>
export const findTimesMonthData = (params) => {

  return axios({ url:route+'logWatermeter/CustomYearByMonth',method: 'get',params })

}

//4、水表自定义时段每年原始数据(分页) params: pageNum,pageSize,watermeterid,stratyy,endyy<yyyy>
export const findTimesYearData = (params) => {

  return axios({ url:route+'logWatermeter/Years',method: 'get',params })

}

//5、水表自定义时段每时用水量(分页) params: pageNum,pageSize,watermeterid,starttime,endtime<yyyy-MM-dd HH>
export const findTimesHourFlow = (params) => {

  return axios({ url:route+'logWatermeter/Quantity/CustomTimeHour',method: 'get',params })

}

//6、水表自定义时段每天用水量(分页) params: pageNum,pageSize,watermeterid,starttime,endtime<yyyy-MM-dd>
export const findTimesDayFlow = (params) => {

  return axios({ url:route+'logWatermeter/Quantity/CustomTimeDay',method: 'get',params })

}

//7、水表自定义时段每月用水量(分页)params: pageNum,pageSize,watermeterid,starttime,endtime<yyyy-MM>
export const findTimesMonthFlow = (params) => {

  return axios({ url:route+'logWatermeter/Quantity/CustomTimeMonth',method: 'get',params })

}

//8、水表自定义时段每年用水量(分页)params: pageNum,pageSize,watermeterid,startyy,endyy<yyyy>
export const findTimesYearFlow = (params) => {

  return axios({ url:route+'logWatermeter/Quantity/Years',method: 'get',params })

}

//9、水表自定义时段总用水量 params: watermeterid,statisticsType水表类型（非必须）,starttime,endtime<yyyy-MM-dd HH>
export const findTimesTotalFlow = (params) => {

  return axios({ url:route+'logWatermeter/Totle/Quantity/CustomTime',method: 'get',params })

}

//10、水表自定义时间段内小时用水量及最小值 params: watermeterid,starttime,endtime<yyyy-MM-dd>
export const findTimesMinFlow = (params) => {

  return axios({ url:route+'logWatermeter/Quantity/MinHourList',method: 'get',params })

}

//11、水表综合漏损指数 params: watermeterid,time<yyyy-MM-dd>
export const findLeakageIndex = (params) => {

  return axios({ url:route+'logWatermeter/LeakageIndex',method: 'get',params })

}
