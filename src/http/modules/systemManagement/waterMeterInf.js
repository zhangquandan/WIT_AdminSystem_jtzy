import axios from '../../axios'

/*水表信息管理模块*/
const route = 'wsis/api/';
//1、添加水表信息 data[watermeter] 注：name,snumber,isopen,status,usage不为空
export const addWaterMeter = (data) => {

  return axios({ url:route+'watermeter',method: 'post',data })

}

//2、删除水表信息 data[id]
export const deleteOne = (data) => {

  return axios({ url:route+ 'watermeter/'+data,method: 'delete' })

}

//3、修改水表信息 data[watermeter]
export const updateWaterMeter = (data) => {

  return axios({ url:route+ 'watermeter ',method: 'put',data })

}

//4、分页查询水表信息 params[pageNum,pageSize]
export const findPage = (params) => {

  return axios({ url:route+ 'watermeterPage ',method: 'get',params })

}

//4、分页查询区域计量水表信息 params[pageNum,pageSize]
export const findByRegionIdRtaPage = (params) => {

  return axios({ url:route+ 'rWatermeterWaterregionPage',method: 'get',params })

}

//5、查询水表单条信息 params[id]

export const findOne = (params) => {

  return axios({ url:route+ 'watermeter/'+params,method: 'get'})

}

//6、全部水表信息查询 params[]
export const findALL = (params) => {

  return axios({ url:route+ 'watermeter',method: 'get',params })

}

//7、根据区域查询水表 params[id]（区域id）
export const findByRegionId = (params) => {

  return axios({ url:route+ 'watermeter/waterregion/'+params,method: 'get'})

}

//8、根据建筑查询水表 params[id]（建筑id）
export const findByBuildingId = (params) => {

  return axios({ url:route+ 'watermeter/building/'+params,method: 'get'})

}

//9、根据部门查水表 params[id](部门id)
export const findByDeptId = (params) => {

  return axios({ url:route+ 'watermeter/department/'+params,method: 'get'})

}

//10、水表字段模糊查询及自定义字段排序(分页)   params[pageNum , pageSize , name , value ,sortname , sortType]
export const searchWaterMeter = (params) => {

  return axios({ url:route+ 'watermeter/search/',method: 'get',params})

}
