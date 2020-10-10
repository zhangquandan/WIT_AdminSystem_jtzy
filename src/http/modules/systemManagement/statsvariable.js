import axios from '../../axios'

/*统计参数信息管理模块*/
const route = 'wsis/api/';
//1、所有统计参数信息分页 params[pageNum,pageSize]
export const findAllPage = (params) => {

  return axios({ url:route+'statsvariablePage',method: 'get',params})

}

//2、所有统计参数信息 params[]
export const findAll = (params) => {

  return axios({ url:route+'statsvariable',method: 'get',params})

}

//3、添加统计参数信息 data[name,value,unit,remark]
export const addStats= (data) => {

  return axios({ url:route+'statsvariable',method: 'post',data})

}

//4、修改统计参数信息 data[name,value,unit,remark]
export const updateStats = (data) => {

  return axios({ url:route+'statsvariable',method: 'put',data})

}

//5、删除用户信息 data[id]
export const deleteStats = (data) => {

  return axios({ url:route+'statsvariable/'+data,method: 'delete'})

}
