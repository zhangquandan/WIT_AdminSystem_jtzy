import axios from '../../axios'

/*用户信息管理模块*/
const route = 'wsis/api/';
//1、所有用户角色信息 params[userid , roleid](非必须)
export const findAllUsersRole = (params) => {

  return axios({ url:route+'systemuserList',method: 'get',params})

}

//2、所有用户信息 params[]
export const findAllUsers = (params) => {

  return axios({ url:route+'systemuser',method: 'get',params})

}

//3、添加用户信息 data[systemuser roleid]
export const addUser = (data) => {

  return axios({ url:route+'systemuserOrRole',method: 'post',data})

}

//4、修改用户信息 data[systemuser]
export const updateUser = (data) => {

  return axios({ url:route+'systemuser',method: 'put',data})

}

//5、删除用户信息 data[id]
export const deleteUser = (data) => {

  return axios({ url:route+'systemuser/'+data,method: 'delete'})

}

//6、添加用户同时添加角色关系 data[systemuserDTO]
export const addUserAndRoles = (data) => {

  return axios({ url:route+'systemuserOrRole',method: 'post',data})

}

//7、所有角色信息 params[]
export const findAllRoles = (params) => {

  return axios({ url:route+'systemrole',method: 'get',params})

}

//8、添加角色信息 data[systemrole]
export const addRole = (data) => {

  return axios({ url:route+'systemrole',method: 'post',data})

}

//9、修改角色信息 data[systemrole]
export const updateRole = (data) => {

  return axios({ url:route+'systemrole',method: 'put',data})

}

//10、删除角色信息 data[id]
export const deleteRole = (data) => {

  return axios({ url:route+'systemrole/'+data,method: 'delete'})

}

//11、所有用户角色关联信息 params[]
export const findAllRelations = (params) => {

  return axios({ url:route+'systemuserRole',method: 'get',params})

}

//12、添加用户角色关联信息 data[systemuserRole]
export const addRelation = (data) => {

  return axios({ url:route+'systemuserRole',method: 'post',data})

}

//13、修改用户角色关联信息 data[systemuserRole]
export const updateRelation = (data) => {

  return axios({ url:route+'systemuserRole',method: 'put',data})

}

//14、删除用户角色关联信息 data[id]
export const deleteRelation = (data) => {

  return axios({ url:route+'systemuserRole/'+data,method: 'put'})

}
