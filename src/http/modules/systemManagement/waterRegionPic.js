import axios from '../../axios'

/*区域图片接口*/
const route = 'wsis/api/';
//1、区域图片基本信息（可根据区域ID查询） params: waterregionid
export const findRegionPics = (params) => {

  return axios({ url:route+'waterregionPicList',method: 'get',params })

}

//2、添加区域图片信息 params: WaterregionPic,picFile
export const addRegionPic = (data) => {

  return axios({ url:route+'waterregionPic',method: 'post',data })

}

//3、删除区域图片信息 params: WaterregionPic,picFile
export const deleteRegionPic = (id) => {

  return axios({ url:route+'waterregionPic/'+id,method: 'delete'})

}
