/*
* 全局常量、方法封装模块
* 通过原型挂载到Vue属性
* 通过this.global调用
* */

//api请求的IP和端口号
// export const baseUrl = "/api"
export const baseUrl = 'http://47.110.33.227:8280/'
export default {
  baseUrl
}
/*window.g = {
  baseUrl:'http://192.168.2.18:8180/',
}*/
