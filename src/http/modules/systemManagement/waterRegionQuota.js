import axios from '../../axios'

/*区域定额设置模块*/
const route = 'wsis/api/';
//1、所有区域定额设置信息（可根据可根据区域ID，年度查询(联表)）[waterregionid:用水区域id，quotayear;年份]
export const findAll = (params) => {

  return axios({ url:route+'waterregionWaterquotaList',method: 'get',params })

}

//2、某区域所有下级定额设置信息（可根据区域ID，年度查询(联表)）[waterregionid:用水区域id，quotayear:年份]
export const findAllSonQuota = (params) => {
  return axios({url:route+'waterregionWaterquota/ChildList',method:'get',params})
}

//3、删除区域定额设置信息[id:用水区域id]
export const deleteQuota = (data)=> {
  return axios({url:route+'waterregionWaterquota/'+data,method:'delete'})
}

//4、添加区域定额设置信息[waterregionWaterquota对象]
export const addQuota = (data) => {
  return axios({url:route+'waterregionWaterquota',method:'post',data})
}

//5、修改区域定额设置信息[waterregionWaterquota对象]
export const updateQuota = (data) => {
  return axios({url:route+'waterregionWaterquota',method:'put',data})
}
