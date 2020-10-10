import axios from '../../axios'

/*区域信息管理模块*/
const route = 'wsis/api/';
//1、添加区域信息 data[waterregion]
export const addRegion = (data) => {

  return axios({ url:route+'waterregion',method: 'post',data })

}

//2、删除区域信息 data[id]
export const deleteOne = (data) => {

  return axios({ url:route+ 'waterregion/'+data,method: 'delete' })

}

//3、修改区域信息 data[waterregion]
export const updateRegion = (data) => {

  return axios({ url:route+ 'waterregion ',method: 'put',data })

}

//4、全部区域信息(分页,可根据statisticstype：DMA类型查询)  params[pageNum,pageSize]
export const findPage = (params) => {

  return axios({ url:route+ 'waterregionPage ',method: 'get',params })

}

//5、查询区域单条信息 params[id]

export const findOne = (params) => {

  return axios({ url:route+ 'waterregion/'+params,method: 'get'})

}

//6、列表查询 （可根据statisticstype：DMA类型查询）params[statisticstype]
export const findAll = (params) => {

  return axios({ url:route+ 'waterregion',method: 'get',params })

}

//7、全部区域水表关系(分页),可根据区域ID查询  params[pageNum , pageSize , waterregionid]
export const findPageRelation = (params) => {

  return axios({ url:route+'rWatermeterWaterregionPage',method: 'get',params })

}

//8、全部区域水表关系,可根据区域ID查询 params[waterregionid]
export const findAllRelation = (params) => {

  return axios({ url:route+'rWatermeterWaterregion',method: 'get',params })

}

//9、根据区域ID查询获得关联区域列表 params[watermeterid]

export const findAllWaterMeterById = (watermeterid) => {

  return axios({ url:route+'rWatermeterWaterregion/'+watermeterid,method: 'get'})

}

//10、添加区域区域关系 data[rWatermeterWaterregion对象]（waterregionid , watermeterid , isin ,id 关系表）
export const addRelation = (data) => {

  return axios({ url:route+'rWatermeterWaterregion',method: 'post',data})

}

//11、修改区域区域关系 data[rWatermeterWaterregion对象]（waterregionid , watermeterid , isin）
export const updateRelation = (data) => {

  return axios({ url:route+'rWatermeterWaterregion',method: 'put',data})

}

//12、删除区域区域关系
export const deleteRelation = (id) => {

  return axios({ url:route+'rWatermeterWaterregion/'+id,method: 'delete'})

}

//13、区域某日总用水量 params[pageNum, pageSize, waterregionid, starttime, endtime（yyyy-MM-dd）]
export const findTotalFlowAnyDay = (params) => {

  return axios({ url:route+'waterregion/Quantity/CustomTimeDay',method: 'get',params})

}

//14、区域某月总用水量 params[pageNum, pageSize, waterregionid, starttime, endtime（yyyy-MM）]
export const findTotalFlowAnyMonth = (params) => {

  return axios({ url:route+'waterregion/Quantity/CustomTimeMonth',method: 'get',params})

}

//15、区域某年总用水量  params [pageNum, pageSize, waterregionid, startyy, endyy（yyyy）]
export const findTotalFlowAnyYear = (params) => {

  return axios({ url:route+'waterregion/Quantity/Years',method: 'get',params})

}

//16、自定义时段天每时原始数据(分页) params[pageNum , pageSize , waterregionid , starttime , endtime ] yyyy-MM-dd
export const findReadNumPageInTwoTimes = (params) => {

  return axios({ url:route+'waterregion/CustomDayByHour',method: 'get',params})

}

//17、天每时原始数据(分页) params[pageNum , pageSize , waterregionid , yy , mm ,dd]
export const findPageDayHour = (params) => {

  return axios({ url:route+'waterregion/DayHour',method: 'get',params})

}

//18、月每日原始数据(分页) params[pageNum , pageSize , waterregionid , yy , mm]
export const findPageMonthDay = (params) => {

  return axios({ url:route+'waterregion/MonthDay',method: 'get',params})

}

//19、年每月原始数据(分页) params[pageNum , pageSize , waterregionid , yy]
export const findPageYearMonth = (params) => {

  return axios({ url:route+'waterregion/YearMonth',method: 'get',params})

}

//20、年每年原始数据(N年/月分页) [pageNum , pageSize , waterregionid , startyy , endyy]
export const findPageYears = (params) => {

  return axios({ url:route+'waterregion/Years',method: 'get',params})

}

//21、自定义时段天每时用水量(分页) params[pageNum , pageSize , waterregionid , starttime , endtime]
export const findFlowPageInTwoTimes = (params) => {

  return axios({ url:route+'waterregion/Quantity/CustomTimeHour',method: 'get',params})

}

//22、区域天每时用水量(分页) params [pageNum , pageSize , waterregionid , yy , mm , dd]
export const findFlowPageDayHour = (params) => {

  return axios({ url:route+'waterregion/Quantity/DayHour',method: 'get',params})

}

//23、区域月每日用水量(分页) params[pageNum , pageSize , waterregionid , yy , mm]
export const findFlowPageMonthDay = (params) => {

  return axios({ url:route+'waterregion/Quantity/MonthDay',method: 'get',params})

}

//24、区域年每月用水量(分页) params[pageNum , pageSize ,waterregionid , yy]
export const findFlowPageYearMonth = (params) => {

  return axios({ url:route+'waterregion/Quantity/YearMonth',method: 'get',params})

}

//25、区域年度用水量(分页) params[pageNum , pageSize , waterregionid , startyy , endyy]
export const findFlowPageYears = (params) => {

  return axios({ url:route+'waterregion/Quantity/Years',method: 'get',params})

}

//26、子区域某月总用水量 params[waterregionid , yy , mm ]
export const findSonTotalFlowAnyMonth = (params) => {

  return axios({ url:route+'waterregion/Parent/Totle/Quantity/OneMonth',method: 'get',params})

}

//27、子区域某年总用水量  params [waterregionid , yy ]
export const findSonTotalFlowAnyYear = (params) => {

  return axios({ url:route+'waterregion/Parent/Totle/Quantity/OneYear',method: 'get',params})

}

//28、子区域自定义时段总用水量  params [waterregionid , startime endtime ]
export const findSonTotalFlowInTwoTimes = (params) => {

  return axios({ url:route+'waterregion/Parent/Totle/Quantity/CustomTime',method: 'get',params})

}

//29、区域自定义时段总用水量  params [waterregionid（非必须）statisticsType（非必须）（DMA/REGION）starttime（yyyy-MM-dd HH）endtime（yyyy-MM-dd HH） ]
export const findTotalFlowTwoTimes = (params) => {

  return axios({ url:route+'waterregion/Totle/Quantity/CustomTime',method: 'get',params})

}

//30、区域ID查询下级区域的计量水表[id:区域id]
export const findSonWaterMeter = (data) => {

  return axios({url:route+'waterregionSon/'+data,method:'get'})

}

//31、查询所有终端区域
export const findEndRegion=() => {

  return axios({ url:route+ 'endWaterregion',method: 'get'})

}

//32、查询某区域的终端水表(根据区域id查询)pageNum,pageSize
export const findEndWaterMeter = (id,params) => {

  return axios({url:route+'endWaterregion/'+id,method:'get',params:params})

}

