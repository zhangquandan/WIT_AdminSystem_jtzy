import axios from '../../axios'

/*水表信息管理模块*/
const route = 'wsis/api/';
//1、水表数据信息单条查询 params[id]
export const findOne = (params) => {

  return axios({ url:route+'logWatermeter/'+params,method: 'get'})

};

//2、删除水表数据信息 data[id]
export const deleteLog = (data) => {

  return axios({ url:route+'logWatermeter/'+data,method: 'delete'})

};

//3、添加水表数据信息 data[logWatermeter]
export const addLog = (data) => {

  return axios({ url:route+'logWatermeter',method: 'post',data})

};

//4、修改水表数据信息 data[logWatermeter]
export const updateLog = (data) => {

  return axios({ url:route+'logWatermeter',method: 'put',data})

};

//5、根据区域ID查水表数据分页 params[id , pageNum , pageSize]
export const findPageByRegionId = (params) => {

  return axios({ url:route+'logWatermeter/region/'+params.id,method: 'get',params})

};

//6、根据建筑ID查水表数据分页 params[id , pageNum , pageSize]
export const findPageByBuildingId = (params) => {

  return axios({ url:route+'logWatermeter/building/'+params.id,method: 'get',params})

};

//7、根据部门ID查水表数据分页 params[id , pageNum , pageSize]
export const findPageByDepartmentId = (params) => {

  return axios({ url:route+'logWatermeter/department/'+params.id,method: 'get',params})

};

//8、自定义时段天每时原始数据(分页) params[pageNum , pageSize , watermeterid , starttime , endtime ] yyyy-MM-dd
export const findReadNumPageInTwoTimes = (params) => {

  return axios({ url:route+'logWatermeter/CustomDayByHour',method: 'get',params})

};

//9、水表天每时原始数据(分页) params[pageNum , pageSize , watermeterid , yy , mm ,dd]
export const findPageDayHour = (params) => {

  return axios({ url:route+'logWatermeter/DayHour',method: 'get',params})

};

//10、水表月每日原始数据(分页) params[pageNum , pageSize , watermeterid , yy , mm]
export const findPageMonthDay = (params) => {

  return axios({ url:route+'logWatermeter/MonthDay',method: 'get',params})

};

//11、水表年每月原始数据(分页) params[pageNum , pageSize , watermeterid , yy]
export const findPageYearMonth = (params) => {

  return axios({ url:route+'logWatermeter/YearMonth',method: 'get',params})

};

//12、水表年每年原始数据(N年/月分页) [pageNum , pageSize , watermeterid , startyy , endyy]
export const findPageYears = (params) => {

  return axios({ url:route+'logWatermeter/Years',method: 'get',params})

};

//13、自定义时段天每时用水量(分页) params[pageNum , pageSize , watermeterid , starttime , endtime]
export const findFlowPageInTwoTimes = (params) => {

  return axios({ url:route+'logWatermeter/Quantity/CustomTimeHour',method: 'get',params})

};

//14、水表天每时用水量(分页) params [pageNum , pageSize , watermeterid , yy , mm , dd]
export const findFlowPageDayHour = (params) => {

  return axios({ url:route+'logWatermeter/Quantity/DayHour',method: 'get',params})

};

//15、水表月每日用水量(分页) params[pageNum , pageSize , watermeterid , yy , mm]
export const findFlowPageMonthDay = (params) => {

  return axios({ url:route+'logWatermeter/Quantity/MonthDay',method: 'get',params})

};

//16、水表年每月用水量(分页) params[pageNum , pageSize , watermeterid , yy]
export const findFlowPageYearMonth = (params) => {

  return axios({ url:route+'logWatermeter/Quantity/YearMonth',method: 'get',params})

};

//17、水表年度用水量(分页) params[pageNum , pageSize , watermeterid , startyy , endyy]
export const findFlowPageYears = (params) => {

  return axios({ url:route+'logWatermeter/Quantity/Years',method: 'get',params})

};

//18、水表自定义时段总用水量 params[watermeterid , starttime , endtime]
export const findTotalFlowInTwoTimes = (params) => {

  return axios({ url:route+'logWatermeter/Totle/Quantity/CustomTime',method: 'get',params})

};

//19、水表某时总用水量 params [watermeterid , yy , mm , dd , hh]
export const findTotalFlowAnyHour = (params) => {

  return axios({ url:route+'logWatermeter/Totle/Quantity/OneHour',method: 'get',params})

};

//20、水表某日总用水量 params[watermeterid , yy , mm , dd]
export const findTotalFlowAnyDay = (params) => {

  return axios({ url:route+'logWatermeter/Totle/Quantity/OneDay',method: 'get',params})

};

//21、水表某月总用水量 params[watermeterid , yy , mm ]
export const findTotalFlowAnyMonth = (params) => {

  return axios({ url:route+'logWatermeter/Totle/Quantity/OneMonth',method: 'get',params})

};

//22、水表某年总用水量  params [watermeterid , yy ]
export const findTotalFlowAnyYear = (params) => {

  return axios({ url:route+'logWatermeter/Totle/Quantity/OneYear',method: 'get',params})

};

//23、查询时间范围水表读数异常数据警示信息params[watermeterid begintime endtime yyyy-MM-dd]
export const findErrorInfo = (params) => {

  return axios({ url:route+'logWatermeter/ErrorPrompt',method: 'get',params})

};
