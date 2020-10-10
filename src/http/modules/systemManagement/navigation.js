import axios from '../../axios'

const route = 'wsis/api/';
//1、查询所有图例统计标准信息(可根据图例类型category<10：日用水量标准，20：日量周同比增量，30：日量周同比增幅，40：日最小量，50：最小量周同比增量，60：最小量周同比增幅>查询)
export const findAllStandard = (params) => {

  return axios({ url:route+'legendStatisticsStandard',method: 'get',params })

}

//2、添加图例统计标准信息
export const addStandard = (data) => {

  return axios({ url:route+'legendStatisticsStandard',method: 'post',data })

}

//3、修改图例统计标准信息
export const updateStandard = (data) => {

  return axios({ url:route+'legendStatisticsStandard',method: 'put',data })

}
/*category   图例类型（非空）  （10：日用水量标准，20：日量周同比增量，30：日量周同比增幅，40：日最小量，50：最小量周同比增量，60：最小量周同比增幅）
standard   标准值（非空）
leaststandard   标准值下限
limitstandard   标准值上限（非空）*/
