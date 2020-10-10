import axios from '../../axios'

/*建筑信息管理模块*/
const route = 'wsis/api/';
//1、添加建筑信息 data[building]
export const addBuilding = (data) => {

  return axios({ url:route+'building',method: 'post',data })

}

//2、删除建筑信息 data[id]
export const deleteOne = (data) => {

  return axios({ url: route+'building/'+data,method: 'delete' })

}

//3、修改建筑信息 data[building]
export const updateBuilding = (data) => {

  return axios({ url: route+'building ',method: 'put',data })

}

//4、分页查询建筑信息 params[pageNum,pageSize]
export const findPage = (params) => {

  return axios({ url: route+'buildingPage ',method: 'get',params })

}

//5、查询建筑单条信息params[id]

export const findOne = (params) => {

  return axios({ url: route+'building/'+params,method: 'get'})

}

//6、列表查询params[]
export const findALL = (params) => {

  return axios({ url: route+'building',method: 'get',params })

}

//7、全部建筑水表关系 params[buildingid]（非必须）  分页
export const findRelationPage = (params) => {

  return axios({ url:route+'rWatermeterBuildingPage',method:'get',params})

}

//8、全部建筑水表关系 params[buildingid](非必需)
export const findAllRelation = (params) => {

  return axios({ url:route+'rWatermeterBuilding',method:'get',params})

}

//9、根据建筑ID查询获得关联水表列表 params[buildingid]
export const findAllWaterMeterById = (params) => {

return axios({ url:route+'rWatermeterBuilding/'+params,method:'get'})

}

//10、添加建筑水表关系 params[buildingid,watermeterid,isin]
export const addRelation = (params) => {

  return axios({ url:route+'rWatermeterBuilding',method:'post',params})

}

//11、修改建筑水表关系 params[buildingid,watermeterid,isin]
export const updateRelation = (params) => {

  return axios({ url:route+'rWatermeterBuilding',method:'put',params})

}

//12、删除建筑水表关系 params[id]
export const deleteRelation = (params) => {

  return axios({ url:route+'rWatermeterBuilding/'+params,method:'delete'})

}

//13、建筑自定义时段每日用水量 params[buildingid ,pageNum ,pageSize,starttime ,endtime(yyyy-MM-dd) ]
export const findTotalFlowAnyDay = (params) => {

  return axios({ url:route+'building/Quantity/CustomTimeDay',method: 'get',params})

}

//14、建筑某自定义时段每月用水量 params[buildingid ,pageNum ,pageSize,starttime ,endtime(yyyy-MM) ]
export const findTotalFlowAnyMonth = (params) => {

  return axios({ url:route+'building/Quantity/CustomTimeMonth',method: 'get',params})

}

//15、建筑自定义时段每年用水量  params [buildingid ,pageNum ,pageSize,starttime ,endtime(yyyy) ]
export const findTotalFlowAnyYear = (params) => {

  return axios({ url:route+'building/Quantity/Years',method: 'get',params})

}

//16、自定义时段天每时原始数据(分页) params[pageNum , pageSize , buildingid , starttime , endtime ] yyyy-MM-dd
export const findReadNumPageInTwoTimes = (params) => {

  return axios({ url:route+'building/CustomDayByHour',method: 'get',params})

}

//17、天每时原始数据(分页) params[pageNum , pageSize , buildingid , yy , mm ,dd]
export const findPageDayHour = (params) => {

  return axios({ url:route+'building/DayHour',method: 'get',params})

}

//18、月每日原始数据(分页) params[pageNum , pageSize , buildingid , yy , mm]
export const findPageMonthDay = (params) => {

  return axios({ url:route+'building/MonthDay',method: 'get',params})

}

//19、年每月原始数据(分页) params[pageNum , pageSize , buildingid , yy]
export const findPageYearMonth = (params) => {

  return axios({ url:route+'building/YearMonth',method: 'get',params})

}

//20、年每年原始数据(N年/月分页) [pageNum , pageSize , buildingid , startyy , endyy]
export const findPageYears = (params) => {

  return axios({ url:route+'building/Years',method: 'get',params})

}

//21、自定义时段天每时用水量(分页) params[pageNum , pageSize , buildingid , starttime , endtime]
export const findFlowPageInTwoTimes = (params) => {

  return axios({ url:route+'building/Quantity/CustomTimeHour',method: 'get',params})

}

//22、建筑天每时用水量(分页) params [pageNum , pageSize , buildingid , yy , mm , dd]
export const findFlowPageDayHour = (params) => {

  return axios({ url:route+'building/Quantity/DayHour',method: 'get',params})

}

//23、建筑月每日用水量(分页) params[pageNum , pageSize , buildingid , yy , mm]
export const findFlowPageMonthDay = (params) => {

  return axios({ url:route+'building/Quantity/MonthDay',method: 'get',params})

}

//24、建筑年每月用水量(分页) params[pageNum , pageSize ,buildingid , yy]
export const findFlowPageYearMonth = (params) => {

  return axios({ url:route+'building/Quantity/YearMonth',method: 'get',params})

}

//25、建筑年度用水量(分页) params[pageNum , pageSize , buildingid , startyy , endyy]
export const findFlowPageYears = (params) => {

  return axios({ url:route+'building/Quantity/Years',method: 'get',params})

}

//26、建筑自定义时段总用水量  params [buildingid , starttime endtime ]
export const findTotalFlowTwoTimes = (params) => {

  return axios({ url:route+'building/Totle/Quantity/CustomTime',method: 'get',params})

}

//27、建筑类型自定义时段总用水量  params [starttime endtime ]
export const findCategoryFlowTwoTimes = (params) => {

  return axios({ url:route+'buildingcategory/Totle/Quantity/CustomTime',method: 'get',params})

}

//28、建筑类型某月总用水量  params [yy mm ]
export const findCategoryFlowAnyMonth = (params) => {

  return axios({ url:route+'buildingcategory/Totle/Quantity/OneMonth',method: 'get',params})

}

//29、建筑类型某年总用水量  params [yy]
export const findCategoryFlowAnyYear = (params) => {

  return axios({ url:route+'buildingcategory/Totle/Quantity/OneYear',method: 'get',params})

}

//30、添加建筑类型信息 data[buildingCategory]
export const addBuildingCategory = (data) => {

  return axios({ url:route+'dicBuildingcategory',method: 'post',data })

}

//31、删除建筑类型信息 data[id]
export const deleteCategory = (data) => {

  return axios({ url: route+'dicBuildingcategory/'+data,method: 'delete' })

}

//32、修改建筑类型信息 data[buildingCategory]
export const updateBuildingCategory = (data) => {

  return axios({ url: route+'dicBuildingcategory',method: 'put',data })

}

//33、分页查询建筑类型信息 params[pageNum,pageSize]
export const findPageCategory = (params) => {

  return axios({ url: route+'dicBuildingcategoryPage',method: 'get',params })

}


//34、列表查询建筑类型信息params[]
export const findALLCategory = (params) => {

  return axios({ url: route+'dicBuildingcategory',method: 'get',params })

}
