import axios from '../../axios'

/*登陆用户权限模块*/
var route = 'wsis-sso/'
//1、用户登录 data[username , password] 登陆成功返回token
export const login = (data) => {

  return axios({ url:route+'user/login',method: 'post',data})

}

//2、根据token查询用户对象 params [ token]
export const findUserByToken = (params) => {

  return axios({ url:route+'user/token',method: 'post',params})

}

//3、退出登录  data [token]
export const loginOut = (data) => {

  return axios({ url:route+'user/logout',method: 'post',data})

}
