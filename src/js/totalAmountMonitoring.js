export const getTimes =()=>{
  let nowDate = new Date()
  /*本日*/
  let yesterday = new Date(nowDate.getTime()-24*3600*1000);
  /*本周*/
  let weekFirstDay = new Date(nowDate.getTime()-(nowDate.getDay()== 0 ? 7 : nowDate.getDay()-1));
  let weekLastDay = nowDate;
  /*本月/本年*/
  let currentYear = nowDate.getFullYear();
  let currentMonth = nowDate.getMonth()+1;
  let params = {
    yesterday : yesterday,
    weekFirstDay : weekFirstDay,
    weekLastDay : weekLastDay,
    currentYear : currentYear,
    currentMont : currentMonth
  }
  return params;
}
