import axios from '../../axios'

/*建筑定额设置模块*/
const route = 'wsis/api/';
//1、接口名称：所有建筑定额设置信息（可根据可根据建筑ID，年度查询(联表)）
export const findAll = (params) => {

  return axios({ url:route+'buildingWaterquotaList',method: 'get',params })

}

//2、删除建筑定额设置信息[id]
export const deleteOne = (data) => {
  return axios({url:route+'buildingWaterquota/'+data,method:'delete'})
}

//3、添加建筑定额设置信息[buildingWaterquota对象]
export const addQuota = (data) => {
  return axios({url:route+'buildingWaterquota',method:'post',data})
}

//4、修改建筑定额设置信息[buildingWaterquota对象]
export const updateQuota = (data) => {
  return axios({url:route+'buildingWaterquota',method:'put',data})
}
