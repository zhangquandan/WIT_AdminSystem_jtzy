// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Qs from "qs"
import router from './router'
import api from './http/index'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
/*import 'jquery'
import 'jquery/dist/jquery.js'*/
/*import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';*/
/*import VueResource from 'vue-resource';
Vue.use(VueResource);*/
/*import eCharts from 'vue-echarts'
import 'echarts'*/
/*import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap,{
  ak:'cGMT45K7PWj21dGVIu74UxS4FaVd43A1&s=1'		//使用申请的百度地图秘钥
});*/
/*引入自定义js文件*/
import Display from "./js/echoDisplay";
/*import DateFormat from "./js/dateFormat" ;*/
import WaterSurvey from "./js/waterSurvey"
/*引入自定义组件*/
import page from '@/commons/Page'
import searchByYear from '@/commons/SearchByYear'
import searchByMonth from '@/commons/SearchByMonth'
import searchInTwoTimes from '@/commons/SearchInTwoTimes'
import pieChart from '@/commons/PieChart'
import barChart from '@/commons/BarChart'
/*引入Element-ui组件*/
import { Button,Select,Input,DatePicker,Table,TableColumn,Message,MessageBox,Icon,Option,
  OptionGroup,ButtonGroup,Dialog,Form,FormItem,Cascader,Pagination,Tabs,TabPane,TimeSelect,
  TimePicker,Divider,Radio,RadioGroup,RadioButton,Transfer,Link,Tree,Switch,Upload,Col,Progress,Tooltip,
  Card,InputNumber,Badge,Carousel,CarouselItem,Loading,Popover,Menu,Submenu,MenuItem,MenuItemGroup,
  Dropdown,DropdownMenu,DropdownItem,Breadcrumb,BreadcrumbItem,} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../static/css/style.css';
Vue.prototype.jsonUrl="http://192.168.2.2:8180/wit";
Vue.config.productionTip = false;
Vue.prototype.display = Display ;
/*Vue.prototype.dateFormat = DateFormat ;*/
Vue.prototype.waterSurvey = WaterSurvey ;
Vue.prototype.qs = Qs;
Vue.prototype.xlsx = XLSX;
Vue.prototype.fileSaver = FileSaver;
Vue.prototype.router = router;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;
/*Axios.defaults.baseURL = "http://127.0.0.1:8080/wsis/api/"*/
/*Vue.component('v-chart', eCharts)*/
/*自定义组件*/
Vue.component('page',page);
Vue.component('searchByYear',searchByYear);
Vue.component('searchByMonth',searchByMonth);
Vue.component('searchInTwoTimes',searchInTwoTimes);
Vue.component('pieChart',pieChart);
Vue.component('barChart',barChart);
/*Element-ui组件*/
Vue.use(Button,DatePicker,Message,MessageBox,Icon);
Vue.use(api);
Vue.component(Upload.name,Upload);
Vue.component(Switch.name,Switch);
Vue.component(Tree.name, Tree);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Input.name, Input);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(OptionGroup.name, OptionGroup);
Vue.component(Dialog.name,Dialog);
Vue.component(Form.name,Form);
Vue.component(FormItem.name,FormItem);
Vue.component(Cascader.name,Cascader);
Vue.component(Pagination.name,Pagination);
Vue.component(Tabs.name,Tabs);
Vue.component(TabPane.name,TabPane);
Vue.component(DatePicker.name,DatePicker);
Vue.component(TimeSelect.name,TimeSelect);
Vue.component(TimePicker.name,TimePicker);;
Vue.component(ButtonGroup.name,ButtonGroup);
Vue.component(Divider.name,Divider)
Vue.component(Radio.name,Radio);
Vue.component(RadioGroup.name,RadioGroup)
Vue.component(Transfer.name,Transfer)
Vue.component(Link.name,Link)
Vue.component(Col.name,Col)
Vue.component(Progress.name,Progress)
Vue.component(Tooltip.name,Tooltip)
Vue.component(Card.name,Card)
Vue.component(InputNumber.name,InputNumber)
Vue.component(Badge.name,Badge) ;
Vue.component(Carousel.name,Carousel);
Vue.component(CarouselItem.name,CarouselItem) ;
Vue.component(Popover.name,Popover);
Vue.component(Menu.name,Menu);
Vue.component(Submenu.name,Submenu);
Vue.component(MenuItem.name,MenuItem);
Vue.component(MenuItemGroup.name,MenuItemGroup);
Vue.component(RadioButton.name,RadioButton);
Vue.component(Dropdown.name,Dropdown);
Vue.component(DropdownMenu.name,DropdownMenu);
Vue.component(DropdownItem.name,DropdownItem);
Vue.component(Breadcrumb.name,Breadcrumb);
Vue.component(BreadcrumbItem.name,BreadcrumbItem);
Vue.use(Loading.directive);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  /*created(){
    if(localStorage.getItem("changeLogin") === null){
      localStorage.setItem("changeLogin",'')
    }
    this.$store.state.changeLogin = localStorage.getItem("changeLogin")
  },*/
  template: '<App/>'
})
