import { baseUrl } from '@/utils/global'
export default {
  method: '',
  //基础url前缀
  baseUrl: baseUrl,//window.g.baseUrl,
  //请求头信息
  headers: {
   /* 'Content-Type': 'application/json;charset=UTF-8'*/
    /*'X-Requested-With': 'XMLHttpRequest'*/
    'Content-Type': 'application/x-www-form-urlencoded',
    /*'Content-Type': "application/json;charset=utf-8",*/
    'Access-Control-Allow-Origin':'*'
  },
  isLoading:true,
  //参数
  data: {},
  //设置超时时间
  timeout: 15000,
  //携带凭证
  withCredentials: true,
  //返回数据类型
  responseType: 'json'
}
