import { leakagelndex } from './interface/leakageIndex/requset.js'

/**
 * 所有api请求都用该方法
 * @param {Object} type //调用指定api的请求方法
 * @param {Object} url  //调用指定api中的指定方法
 * @param {Object} params //传入参数
 * @param {Object} callback //回调函数，返回数据会储存在回调函数的参数中
 */
export function request (type, url, params, callback) {
  switch (type) {
    case 'leakagelndex' :
      leakagelndex(url, params, callback)
      break;
  }
}
