export default {

  /*获取近两天的开始时间和结束时间*/
  getTwoDays:function(){
    let date = new Date();
    let end = this.dateFormat(date,'-');
    let startTime = new Date().setTime(date.getTime()-24*3600*1000);
    let start = this.dateFormat(startTime,'-');
    let params = {
      start : start,
      end: end
    }
    return params ;
  },
  /*获取近一个月的开始时间和结束时间*/
  getOneMonth:function(){
    let date = new Date();
    let end = this.dateFormat(date,'-');
    let startTime = new Date().setTime(date.getTime()-30*24*3600*1000);
    let start = this.dateFormat(startTime,'-');
    let params = {
      start: start,
      end:end
    }
    return params;
  },
  /*日期格式化*/
  dateFormat:function(date,format){
    let dateTime = new Date(date);
    return dateTime.getFullYear()+format+(dateTime.getMonth()+1)+format+dateTime.getDate();
  },
  /*yyyy-MM-dd格式转换为年月日时间格式*/
  getStandardFormat:function(date){
    let arr = date.split('-') ;
    return arr[0]+'年'+arr[1]+'月'+arr[2]+'日'
  },
  /*日期转换为yyyy-MM-dd HH:mm:ss*/
  getEditTime(){
    let date = new Date();
    let format = '-';
    let format1 = ':';
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate() ;
    let hour = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let ms = date.getMilliseconds();
    return year+format+month+format+day+' '+hour+format1+mm+format1+ss+'.'+ms;
  },
  /*获取年份范围初始值*/
  getYears:function(){
    let date = new Date() ;
    let startYear = date.getFullYear()-1+'';
    let endYear = date.getFullYear()+'';
    let params = {
      startYear : startYear ,
      endYear : endYear
    }
    return params ;
  },
  /*获取今天时间*/
  getToday(){
    let date = new Date();
    return this.dateFormat(date,'-')
  },

  /*获取昨天时间*/
  getYesterday(){
    let date = new Date();
    let yesterday = new Date(date.getTime()-24*3600*1000)
    return this.dateFormat(yesterday,'-');
  },

  /*获取今年年份*/
  getCurrentYear:function(){
    return (new Date()).getFullYear()+'';
  },

  /*获取去年年份*/
  getLastYear(){
    return (new Date()).getFullYear()-1;
  },

  /*获取当前月份*/
  getCurrentMonth:function(){
    let date = new Date() ;
    let year = date.getFullYear() ;
    let month = date.getMonth()+1 ;
    return year+'-'+month ;
  },

  /*获取上月月份*/
  getLastMonth(){
    let date = new Date;
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    if(month == 1){
      month = 12 ;
      year = year -1;
    }else{
      month = month-1;
    }
    let params = {
      year : year,
      month : month
    }
    return params ;
  },

  /*自定义时间段初始值*/
  customSpecification:function(){
    let date = new Date();
    let endDate = this.dateFormat(date,'-');
    let startDate = this.dateFormat(new Date(date.getTime()-24*3600*1000),'-');
    let params = {
      startDate : startDate,
      endDate : endDate
    }
    return params ;
  },
  /*获取两个时间段时间的天数*/
  getDays(startTime,endTime){
    let startTimes = new Date(startTime).getTime();
    let endTimes = new Date(endTime).getTime();
    return Math.floor((endTimes-startTimes)/(24*3600*1000)+1);
  },
  /*通过开始时间和天数获取结束时间*/
  getEndTime(start,days){
    let startTimes = new Date(start).getTime();
    let endTime = new Date(startTimes+(days-1)*24*3600*1000)
    return endTime ;
  },
  /*通过开始时间和结束时间获取上年同比，上月环比的开始时间和结束时间*/
  getDateRangeOfEnd(start,end,value){
    var firstStartTimes = new Date(start);
    var firstStartYear = firstStartTimes.getFullYear();
    var firstStartMonth = firstStartTimes.getMonth()+1;
    var firstStartDay = firstStartTimes.getDate();
    var secondStartTime;
    var secondEndTime;
    var startDays;
    var endDays;
    var dateArr = [5,7,10,12]
    startDays = this.getDays(start,end);

    if(value == 1){

      if(firstStartYear%4 == 0 && firstStartMonth == 2 && firstStartDay == 29){
        secondStartTime = new Date((firstStartYear-1)+'-'+firstStartMonth+'-'+(firstStartDay-1));
      }else{
        secondStartTime = new Date((firstStartYear-1)+'-'+firstStartMonth+'-'+firstStartDay);
      }

    }else if(value == 2){

      if(firstStartMonth == 1){
        secondStartTime = new Date((firstStartYear-1)+'-'+'12'+'-'+firstStartDay);
      }else if(dateArr.indexOf(firstStartMonth) > -1 && firstStartDay == 31){
        secondStartTime = new Date(firstStartYear+'-'+(firstStartMonth-1)+'-'+(firstStartDay-1));
      }else if(firstStartMonth == 3 && firstStartYear%4 == 0 && firstStartDay > 29){
        secondStartTime = new Date(firstStartYear+'-'+(firstStartMonth-1)+'-'+'29');
      }else if(firstStartMonth == 3 && firstStartDay > 28){
        secondStartTime = new Date(firstStartYear+'-'+(firstStartMonth-1)+'-'+'28');
      }else{
        secondStartTime = new Date(firstStartYear+'-'+(firstStartMonth-1)+'-'+firstStartDay);
      }


    }

    secondEndTime = this.getEndTime(secondStartTime,startDays);

    endDays = this.getDays(secondStartTime,secondEndTime);

    let params = {
      secondStartTime : secondStartTime,
      secondEndTime : secondEndTime,
      startDays : startDays,
      endDays : endDays
    }

    return params ;

  },

  /*获取纵比上一年同比初始化时间*/
  getInitDateOfYear(){
    let firstStartTime = new Date(new Date().getFullYear(),0,1);
    let firstEndTime = new Date();
    let value = '1' ;
    let params = this.getDateRangeOfEnd(firstStartTime,firstEndTime,value);
    params.firstStartTime = firstStartTime ;
    params.firstEndTime = firstEndTime ;
    return params ;
  },

  /*获取纵比上月环比初始化时间*/
  getInitDateOfMonth(){
    let firstStartTime = new Date(new Date().getFullYear(),new Date().getMonth(),1);
    let firstEndTime = new Date();
    let value = '2';
    let params = this.getDateRangeOfEnd(firstStartTime,firstEndTime,value);
    params.firstStartTime = firstStartTime ;
    params.firstEndTime = firstEndTime ;
    return params ;
  },
  getInitDateOfCustom(){
    let firstStartTime = new Date(new Date().getTime()-48*3600*1000);
    let firstEndTime = new Date();
    let secondStartTime = new Date(new Date().getTime()-96*3600*1000);
    let secondEndTime = firstStartTime ;
    let params ={
      firstStartTime : firstStartTime,
      firstEndTime : firstEndTime,
      secondStartTime : secondStartTime,
      secondEndTime : secondEndTime
    }
    return params ;
  }

}
