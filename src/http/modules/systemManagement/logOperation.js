import axios from '../../axios'

/*系统操作日志信息管理模块*/
const route = 'wsis/api/';
//1、所有系统操作日志信息(分页) params[pageNum , pageSize]
export const findPage = (params) => {

  return axios({ url:route+'logOperationPage',method: 'get',params })

}

//2、所有系统操作日志信息（可根据用户名，操作类型，操作时间范围查询，倒序，分页）
export const findAll= (params) => {

  return axios({ url:route+'logOperation',method: 'get',params })

}

//3、删除系统操作日志 data[id]
export const deleteLog = (data) => {

  return axios({ url:route+'logOperation/'+data,method: 'delete'})

}

//4、添加系统操作日志 data[logOperation]
export const addLog = (data) => {

  return axios({ url:route+'logOperation',method: 'post',data})

}

//5、修改系统操作日志 data[logOperation]
export const updateLog = (data) => {

  return axios({ url:route+'logOperation',method: 'put',data})

}

//6、查询最近一条登录记录NEW
export const findNewInfo = () => {

  return axios({ url:route+'logOperation/New',method: 'get'})

}
