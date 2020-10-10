import axios from 'axios';
import qs from "qs"
import config from './config';
import {Loading} from 'element-ui'
/*import Cookies from 'js-cookie';*/
import router from '../router';

export default function $axios(options) {

  return new Promise((resolve,reject)=>{

    const instance = axios.create({

      baseURL: config.baseUrl,
      headers: config.headers,
      timeout: config.timeout,
      withCredentials: config.withCredentials

    })
    //声明一个对象用于存储请求个数
    let needLoadingRequestCount = 0;
    let loadingInstance;
    function showFullScreenLoading() {
      if (needLoadingRequestCount === 0) {
        startLoading();
      }
      needLoadingRequestCount++;
    };
    function tryHideFullScreenLoading() {
      if (needLoadingRequestCount <= 0) return;
      needLoadingRequestCount--;
      if (needLoadingRequestCount === 0) {
        endLoading();
      }
    };
    function startLoading(){
      loadingInstance = Loading.service({
        text:'拼了命的加载。。。。。'
      });
    }
    function endLoading(){
      loadingInstance.close();
    }
    //request请求拦截器

    instance.interceptors.request.use(
      config => {
        /*showFullScreenLoading()*/
        let token = localStorage.getItem("access_token")
        if(token) {//发送请求时携带token
          if(config.url.indexOf("logout")>-1 || config.url.indexOf('token')>-1){
            delete config.headers.access_token;
          }else{
            config.headers['access_token'] = token
          }
        }else{//重定向到登陆页面
          if(config.url.indexOf("login")<0){
            router.push('/Login')
          }
        }
        /*let url = config.url;
        if(url.indexOf("login")>-1){
          localStorage.setItem('access_token',"");
          delete config.headers.access_token;
        }
        if(url.indexOf("login")<0){
          config.headers.access_token =localStorage.getItem("access_token");
        }*/
       return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    //response响应拦截器

    instance.interceptors.response.use(
      response => {
        /*tryHideFullScreenLoading();*/
        return response.data
      },
      error => {
        return Promise.reject(error)
      }
    )

    //请求处理

    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}
