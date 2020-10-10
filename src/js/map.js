export default {
  getMapOptions:function(dt){
    var option = {
      title : {
        x:'center',
      },
      geo: {
        /*center:[115.97, 29.71],//当前视角的中心点*/
        zoom:2,//当前视角的缩放比例1.8
        show: true,//是否显示
        map: '',  //地图范围数据，通过echarts.registerMap引入(在node_modules里)
        layoutCenter:['50%', '50%'], //地图中心在屏幕中的位置
        layoutSize:200,//地图的大小,支持相对于屏幕宽高的百分比或者绝对的像素大小。
        label: {
          normal: {
            show: true //是否在普通状态下显示标签
          },
          emphasis: {
            show: true,//是否在高亮状态下显示标签
          }
        },
        roam: false,  //鼠标平移或者缩放
      },
      tooltip : {
        trigger: 'item',
        type:'cross',
        /*   backgroundColor:"#ff7f50",//提示标签背景颜色
         textStyle:{color:"#fff"}, //提示标签字体颜色
         formatter:function(param){
         return dt[param.dataIndex].name + "<br />" +dt[param.dataIndex].text;
         } */
        alwaysShowContent: false,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 0,
        // position: "top",
        textStyle: {
          fontSize: 12,
          color: '#333'
        },
        formatter: function(params) {
          var color = "#444"
          var a = "<div style='background-color:"+params.color+";padding: 5px 10px;text-align:center;color:blue;font-size: 16px;'>" + dt[params.dataIndex].name + "</div>";
            a += "<div style='padding:10px;'>";
            a += "<p style='margin-botttom: 10px;'>当日水量："+dt[params.dataIndex].total+"吨</p>"
            a += "<p style='margin-botttom: 10px;'>日量隔周增量："+dt[params.dataIndex].addTotal+"吨</p>"
            a += "<p style='margin-botttom: 10px;'>日量隔周增幅："+dt[params.dataIndex].addRangeTotal+"%</p>"
            a += "<p style='margin-botttom: 10px;'>最小流量隔周增量："+dt[params.dataIndex].addMin+"吨</p>"
            a += "<p style='margin-botttom: 10px;'>最小流量隔周增幅："+dt[params.dataIndex].addRangeMin+"%</p>"
            a += "<p>综合漏损指数："+dt[params.dataIndex].leakageIndex+"</p>"
            a += "</div><br>";
          return a;
        }
      },
      visualMap: {
        /*type: "piecewise",*/
        type: "piecewise",
        /*left: 'left',*/
        /*bottom: 'bottom',*/
        /*top: 'top',*/
        y:'center',
        x: 'left',
        show: true,
        min: 0,
        max: 300,
        pieces: [
          {min: 0, max: 99,label: '0 - 99',color: 'green'},
          {min: 100, max: 199, label: '100 - 199',color: 'yellow'},
          {min: 200, max: 299, label: '200 - 299',color: 'blue'},
          {min: 300, label: '300 - 399',color: 'red'},
        ],
        orient:"vertical",//①vertical:垂直的；②horizontal:水平的；
      },
     /* visualMap: {
        left: 'left',
        y:'center',
        min: 1,
        max: 20,
        inRange: {
          color: ['lightskyblue', 'yellow', 'orangered']
        },
        text:['High','Low'],           // 文本，默认为数值文本
        calculable: true,
        show:true,
      },*/
      /*  visualMap: {
          min: 1,
          max: 10,
          text:['High','Low'],
          x:'left',
          y:'center',
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue','yellow', 'orangered']
          }
        },*/
      toolbox:{
        show : true,
        orient : 'vertical',
        x: 'right',
        y: 'center',
        borderColor: '#FFF',       // 工具箱边框颜色
        borderWidth: 0,            // 工具箱边框线宽，单位px，默认为0（无边框）
        padding: 5,                // 工具箱内边距，单位px，默认各方向内边距为5，
        showTitle: false,
        feature : {
          saveAsImage: { show : true,
            title : '保存为图片',
            type : 'jpeg'
          },
          restore: {show: false},//还原工具
        }
      },
      series: [{
        name: '武汉工程大学',
        type: 'map',
        map:'wc',
        // symbol:'../images/shine.jpg',
        //  symbolSize: 41,
        roam:false,//鼠标平移或缩放，可以设置为'scale'或者'move'或是'true'都为开启。
        label: {
          normal: {
            formatter: function(a,b,c) {
              return a.name.substring(0,4) + '\n' + a.name.substring(4);
            },
            textStyle: {
              fontSize: 12,
              color: 'black'
            },
            show: false // 是否显示地图上面块名称
          },
          emphasis: {
            show: true
          }
        },
        layoutCenter: ['50%', '50%'],   //属性定义地图中心在屏幕中的位置，一般结合layoutSize 定义地图的大小
//            layoutSize: 11200,
        /*itemStyle:{
          normal:{label:{show:true}},
          emphasis:{label:{show:true}}
        },*/
        itemStyle:{
          normal: {
            label: {
              show: true
            },
            areaColor: '#767fa6',
            borderType: 'solid',
            borderColor: '#616e7e',
            shadowColor: 'rgba(0,0,0,0.5)',
            shadowOffsetX: 0,
            shadowOffsetY: 3,
            shadowBlur: 16,//16
          },
          emphasis: {
            borderWidth: 1,
            borderColor: '#616e7e',
            areaColor: '#0084ff',
            label: {
              show: true,
              textStyle: {
                color: '#41576c'
              }
            }
          }
        },
        data:dt
      }]
    };
    return option
  },
  getMapOptions1:function(dt){
    var option = {
      title : {
        x:'center'
      },
      geo: {
        /*center:[115.97, 29.71],//当前视角的中心点*/
        zoom:2,//当前视角的缩放比例1.8
        show: true,//是否显示
        map: '',  //地图范围数据，通过echarts.registerMap引入(在node_modules里)
        layoutCenter:['50%', '50%'], //地图中心在屏幕中的位置
        layoutSize:200,//地图的大小,支持相对于屏幕宽高的百分比或者绝对的像素大小。
        label: {
          normal: {
            show: true //是否在普通状态下显示标签
          },
          emphasis: {
            show: true,//是否在高亮状态下显示标签
          }
        },
        roam: false,  //鼠标平移或者缩放
      },
      tooltip : {
        trigger: 'item',
        type:'cross',
        /*   backgroundColor:"#ff7f50",//提示标签背景颜色
         textStyle:{color:"#fff"}, //提示标签字体颜色
         formatter:function(param){
         return dt[param.dataIndex].name + "<br />" +dt[param.dataIndex].text;
         } */
        alwaysShowContent: false,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 0,
        // position: "top",
        textStyle: {
          fontSize: 12,
          color: '#333'
        },
        formatter: function(params) {
          var color = "#444"
          var a = "<div style='background-color:"+params.color+";padding: 5px 10px;text-align:center;color:blue;font-size: 16px;'>" + dt[params.dataIndex].name + "</div>";
            a += "<div style='padding:10px;'>";
            a += "<p style='margin-botttom: 10px;'>当日水量："+dt[params.dataIndex].total+"吨</p>"
            a += "<p style='margin-botttom: 10px;'>日量隔周增量："+dt[params.dataIndex].addTotal+"吨</p>"
            a += "<p style='margin-botttom: 10px;'>日量隔周增幅："+dt[params.dataIndex].addRangeTotal+"%</p>"
            a += "<p style='margin-botttom: 10px;'>最小流量隔周增量："+dt[params.dataIndex].addMin+"吨</p>"
            a += "<p style='margin-botttom: 10px;'>最小流量隔周增幅："+dt[params.dataIndex].addRangeMin+"%</p>"
            a += "<p>综合漏损指数："+dt[params.dataIndex].leakageIndex+"</p>"
            a += "</div><br>";
          return a;
        }
      },
      /*visualMap: {
        left: 'left',
        y:'center',
        min: 1,
        max: 20,
        inRange: {
          color: ['lightskyblue', 'yellow', 'orangered']
        },
        text:['High','Low'],           // 文本，默认为数值文本
        calculable: true,
        show:true,
      },*/
      /*  visualMap: {
          min: 1,
          max: 10,
          text:['High','Low'],
          x:'left',
          y:'center',
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue','yellow', 'orangered']
          }
        },*/
      visualMap: {
        /*type: "piecewise",*/
        type: "piecewise",
        /*left: 'left',*/
        /*bottom: 'bottom',*/
        /*top: 'top',*/
        y:'center',
        x: 'left',
        show: true,
        min: 0,
        max: 300,
        pieces: [
          {min: 0, max: 99,label: '0 - 99',color: 'green'},
          {min: 100, max: 199, label: '100 - 199',color: 'yellow'},
          {min: 200, max: 299, label: '200 - 299',color: 'blue'},
          {min: 300, label: '300 - 399',color: 'red'},
        ],
        orient:"vertical",//①vertical:垂直的；②horizontal:水平的；
      },
      toolbox:{
        show : true,
        orient : 'vertical',
        x: 'right',
        y: 'center',
        borderColor: '#FFF',       // 工具箱边框颜色
        borderWidth: 0,            // 工具箱边框线宽，单位px，默认为0（无边框）
        padding: 5,                // 工具箱内边距，单位px，默认各方向内边距为5，
        showTitle: false,
        feature : {
          saveAsImage: { show : true,
            title : '保存为图片',
            type : 'jpeg'
          },
          restore: {show: false},//还原工具
        }
      },
      series: [{
        name: '武汉工程大学',
        type: 'map',
        map:'lf',
        // symbol:'../images/shine.jpg',
        //  symbolSize: 41,
        roam:false,//鼠标平移或缩放，可以设置为'scale'或者'move'或是'true'都为开启。
        label: {
          normal: {
            formatter: function(a,b,c) {
              return a.name.substring(0,4) + '\n' + a.name.substring(4);
            },
            textStyle: {
              fontSize: 12,
              color: 'black'
            },
            show: false // 是否显示地图上面块名称
          },
          emphasis: {
            show: true
          }
        },
        layoutCenter: ['50%', '50%'],   //属性定义地图中心在屏幕中的位置，一般结合layoutSize 定义地图的大小
//            layoutSize: 11200,
        /*itemStyle:{
          normal:{label:{show:true}},
          emphasis:{label:{show:true}}
        },*/
        itemStyle:{
          normal: {
            label: {
              show: true
            },
            areaColor: '#767fa6',
            borderType: 'solid',
            borderColor: '#616e7e',
            shadowColor: 'rgba(0,0,0,0.5)',
            shadowOffsetX: 0,
            shadowOffsetY: 3,
            shadowBlur: 16,//16
          },
          emphasis: {
            borderWidth: 1,
            borderColor: '#616e7e',
            areaColor: '#0084ff',
            label: {
              show: true,
              textStyle: {
                color: '#41576c'
              }
            }
          }
        },
        data:dt
      }]
    };
    return option
  },
}
