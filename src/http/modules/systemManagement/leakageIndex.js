import axios from '../../axios'

/*综合漏损指数*/
const route = 'wsis/api/';
//1、查询所有漏损综合指标设置数据(可根据类型category<10:水表,20:建筑,30:DMA,40:区域>查询)  params: category
export const findAllLeakageIndex = (params) => {

  return axios({ url:route+'rtaIndexStandard',method: 'get',params })

}

//2、添加漏损综合指标信息 data: rta_index_standard
export const addLeakageIndex = (data) => {

  return axios({ url:route+'rtaIndexStandard',method: 'post',data })

}

//3、修改漏损综合指标信息data: rta_index_standard
export const updateLeakageIndex = (data) => {

  return axios({ url:route+'rtaIndexStandard',method: 'put',data })

}
