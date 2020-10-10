import axios from '../../axios'
/*报警信息处理流程*/
const route = 'wsis/api/';
//1、所有报警记录及流程信息（可根据编号ID，报警类型category，预处理状态disposalStatus，报警时间查询）
export const findAll = (params) => {
  return axios({ url:route+'alarm/list',method: 'get',params })
}

//2、报警及处理内容总信息，根据编号ID查询 params: id 报警id（必须）
export const findDispath = (params) => {
  return axios({ url:route+'alarm/dispatch',method: 'get',params })
}

//3、转派总信息 params: id(转派单id)，alarmCode(报警信息id)（二选一）
export const transferDispatch = (params) => {
  return axios({ url:route+'alarm/transferDispatch',method: 'get',params })
}

//4、修改预处理状态 (id:报警信息id，disposalStatus: 报警处置状态)
export const updateStatus = (data) => {
  return axios({ url:route+'alarm',method: 'put',data })
}

//5、报警派单填写 AlarmDispatch对象 【id：报警id，dispatchDepartment：派单单位，dispatcher：派单人，dispatchTime：派单时间（非必须），implementer：指定执行人】
export const addDispatch = (data) => {
  return axios({ url:route+'alarm/dispatch',method: 'post',data })
}

//6、漏损勘察单出单填写 AlarmLeakageDisposal对象
export const addLeakageDisposal = (data) => {
  return axios({ url:route+'alarm/leakageDisposal',method: 'post',data })
}

//7、设备故障出单填写 AlarmDeviceDisposal对象
export const addDeviceDisposal = (data) => {
  return axios({ url:route+'alarm/deviceDisposal',method: 'post',data })
}

//8、报警回单验收填写 AlarmDispatch对象
export const updateAlarmDispatch = (data) => {
  return axios({ url:route+'alarm/dispatch',method: 'put',data })
}

//9、转派单派单填写 AlarmTransferDispatch对象
export const addAlarmTransferDispatch = (data) => {
  return axios({ url:route+'alarm/transferDispatch',method: 'post',data })
}

//10、转派单出单填写 AlarmTransferDisposal对象
export const addAlarmTransferDisposal = (data) => {
  return axios({ url:route+'alarm/transferDisposal',method: 'post',data })
}

//11、转派单回单验收填写 AlarmTransferDispatch对象
export const updateAlarmTransferDispatch = (data) => {
  return axios({ url:route+'alarm/transferDispatch',method: 'put',data })
}
