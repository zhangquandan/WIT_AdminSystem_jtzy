export const dateFormat =(value)=> {
  let date = new Date(value);
  let yy = date.getFullYear();
  let mm = date.getMonth()+1;
  let dd = date.getDate();
  return yy+'-'+mm+'-'+dd ;
}
export const getTimes =()=>{
  let nowDate = new Date();
  let startTime24 = dateFormat(nowDate,'-');
  let endTime = dateFormat(nowDate,'-');
  let startTime48 = dateFormat(new Date(nowDate-24*3600*1000),'-');
  let startTime72 = dateFormat(new Date(nowDate-2*24*3600*1000),'-');
  let params = {
    startTime24 : startTime24,
    startTime48 : startTime48,
    startTime72 : startTime72,
    endTime : endTime
  }
  return params;
}
