<template>
  <div class="region-body" v-loading="show">
    <div class="region-radio">
      <el-radio-group v-model="radio" size="small" @change="change">
        <el-radio-button label="1">今年</el-radio-button>
        <el-radio-button label="2">去年</el-radio-button>
      </el-radio-group>
      <el-button type="primary" size="small" icon="el-icon-download" class="upload" @click="exportData">导出</el-button>
    </div>
    <div class="region-table">
      <table-data :show="!show" :tableColumn="tableColumn" :tableData="tableData"></table-data>
    </div>
  </div>
</template>

<script>
  import TableData from "./TableData";
  import { export2Excel } from '../../../js/utils'
  export default {
    components: {TableData},
    name: "region",
    data() {
      return {
        show: true,
        radio: '1',
        tableData: [],
        max: new Date().getMonth(),
        tableColumn: [
          {name: 'DMA名称',prop: 'name'},
          {name: '当年计划定额',prop: 'planQuota'},
          {name: '当年已用定额',prop: 'usedQuota'},
          {name: '当年已用水',prop: 'usedWater'},
          {name: '当年已节水',prop: 'saving'},
          {name: '当年节水率',prop: 'ratio'},
          {name: '定额下达部门',prop: 'quotaDepartment'},
          {name: '定额责任人',prop: 'quotaPersonLiable'}
        ],
        tableData: [
          {name: '武昌校区',currentYearQuota: 1000,currentYearUseQuota: 100},
          {name: '武昌校区',currentYearQuota: 1000,currentYearUseQuota: 100},
        ],
        year: new Date().getFullYear(),
        title: 'DMA定额与节水概况'
      }
    },
    mounted() {
      this.refresh();
    },
    methods: {
      labelHead(h,{column,index}) {
        /*let l = column.label.length;
        let f = 12;
        column.minWidth = f*l;
        return h('div',{class:'table-head',style:{width:'100%'}},[column.label])*/
      },
      /*切换单选按钮*/
      change() {
        this.show = true;
        this.refresh();
      },
      async refresh() {
        this.year = this.radio == '1' ? new Date().getFullYear() : new Date().getFullYear() -1;
        this.max = this.year == new Date().getFullYear() ? new Date().getMonth() : 12;
        this.tableData = [];
        var quota = await this.$api.regionInf.findAll();
        if(quota) {
          quota = quota.filter(item => item.statisticstype == 'DMA')
          quota.forEach((item) => {
            this.getTableData(item,quota.length);
          })
        }else {
          this.show = false;
        }
      },
      /*获取表格数据*/
      async getTableData(item,length) {
        var params = {pageNum: 1,pageSize: 1000,waterregionid: item.id,yy: this.year};
        var flow = await this.$api.regionInf.findFlowPageYearMonth(params);
        params = {quotayear: this.year,waterregionid: item.id};
        var quota = await this.$api.waterRegionQuota.findAll(params);
        quota = quota.data ? quota.data[0] : false;
        var planQuota = 0,usedQuota = 0,usedWater = 0,saving = 0 ,ratio = 0;
        var name,quotaDepartment,quotaPersonLiable;
        if(typeof item == 'object') {
          for(var i = 1; i <= 12;i++) {
            name = 'm' + i;
            if(i <= this.max){
              usedQuota += quota ? quota[name] : 0;
              usedWater += flow.data ? flow.data.list[i-1].data : 0;
            }
            planQuota += quota ? quota[name] : 0;
          }
          saving = usedQuota > 0&&usedWater > 0 ? (usedQuota - usedWater).toFixed(1) : '--';
          ratio = usedQuota > 0 ? ((saving/usedQuota)*100).toFixed(1) + '%' : '--';
          usedQuota = Number(usedQuota.toFixed(1));
          usedWater = Number(usedWater.toFixed(1));
          planQuota = Number(planQuota.toFixed(1));
        }
        quotaDepartment = quota ? quota.editordepartment : '--';
        quotaPersonLiable = quota ? quota.editor : '--';
        this.tableData.push({name: item.name,planQuota: planQuota,usedQuota: usedQuota,usedWater: usedWater,
          saving: saving,ratio: ratio,quotaDepartment: quotaDepartment,quotaPersonLiable: quotaPersonLiable
        })
        this.show = !(this.tableData.length == length);
      },
      /*报表导出*/
      exportData() {
        export2Excel(this.tableColumn,this.tableData,this.title);
      }
    }
  }
</script>

<style scoped>
  @import "../../../../static/css/quotaWaterSaving.css";
</style>
