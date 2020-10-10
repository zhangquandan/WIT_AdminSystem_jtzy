export default {
  /*获取今天/昨天/本月/上月/今年/去年的展示信息*/
  getUsageInfo:function(){
    let initialValue = '---' ;
    let usageTotal = [{
      title : '今天总用水量',
      usage:initialValue,
      class:'small-box bg-aqua',
      type:'1'
    },{
      title : '昨天总用水量',
      usage:initialValue,
      class:'small-box bg-aqua',
      type:'2'
    },{
      title : '本月总用水量',
      usage:initialValue,
      class:'small-box bg-green',
      type:'3'
    },{
      title : '上月总用水量',
      usage:initialValue,
      class:'small-box bg-green',
      type:'4'
    },{
      title : '今年总用水量',
      usage:initialValue,
      class:'small-box bg-yellow',
      type:'5'
    },{
      title : '去年总用水量',
      usage:initialValue,
      class:'small-box bg-yellow',
      type:'6'
    }]
    return usageTotal ;
  },
  getTitleInfo:function(){
    let usageName = '日均用水量';
    let titleInfo = [{
      id :1,
      title:'占地面积',
      value:'1300000',
      usageName:usageName,
      unit:'平方米'
    },{
      id :2,
      title:'建筑栋数',
      usageName:usageName,
      value:'45',
      unit:'栋'
    },{
      id :3,
      title:'建筑面积',
      usageName:usageName,
      value:'500000',
      unit:'平方米'
    },{
      id :4,
      title:'注册本科生人数',
      usageName:usageName,
      value:'50000',
      unit:'人'
    },{
      id :5,
      title:'研究生人数',
      usageName:usageName,
      value:'1000',
      unit:'人'
    },{
      id :6,
      title:'博士生人数',
      usageName:usageName,
      value:'1000',
      unit:'人'
    },{
      id :7,
      title:'留学生人数',
      usageName:usageName,
      value:'1000',
      unit:'人'
    },{
      id :8,
      title:'专科生人数',
      usageName:usageName,
      value:'1000',
      unit:'人'
    },{
      id :9,
      title:'其他学生人数',
      usageName:usageName,
      value:'1000',
      unit:'人'
    },{
      id :10,
      title:'学生总人数',
      usageName:usageName,
      value:'50000',
      unit:'人'
    },{
      id :11,
      title:'教师总人数',
      usageName:usageName,
      value:'5000',
      unit:'人'
    },{
      id :12,
      title:'职工总人数',
      usageName:usageName,
      value:'5000',
      unit:'人'
    },{
      id :13,
      title:'教职工总人数',
      usageName:usageName,
      value:'10000',
      unit:'人'
    },{
      id :14,
      title:'总人数',
      usageName:usageName,
      value:'60000',
      unit:'人'
    },]
    return titleInfo ;
  },
  /*获取学生计量人数*/
  getCount(){
    let count = 50000 ;
    return count ;
  },
}
