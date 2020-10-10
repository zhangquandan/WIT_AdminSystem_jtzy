import axios from '../../axios'

/*建筑图片信息*/
const route = 'wsis/api/';
//1、建筑信息图片（可根据建筑ID查询，分页)  params[id,pageNum,pageSize]
export const findPage = (params) => {

  return axios({ url:route+'building/pic/Page',method: 'get',params })

};

//2、建筑图片基本信息（可根据建筑ID查询）  params[buildingid]
export const findById = (params) => {

  return axios({ url:route+'buildingPicList',method: 'get',params })

};

//3、添加建筑图片信息  BuildingPic picFile
export const addOne = (data) => {

  return axios({ url:route+'buildingPic',method: 'post',data})

};

//4、删除建筑图片信息  id   图片信息ID
export const deleteOne = (id) => {

  return axios({ url:route+'buildingPic/'+id,method: 'delete'})

};
