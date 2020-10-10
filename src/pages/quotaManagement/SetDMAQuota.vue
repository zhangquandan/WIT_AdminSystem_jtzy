 <template>
  <div class="flex">
    <div class="content body">
      <!--定额设置-->
      <div class="quota box box-solid">
        <div class="box-header bg-aqua">定额及历史数据</div>
        <div class="box-body">
          <!--选择校区，时间-->
          <div class="select-quota">
            <!--选择DMA-->
            <select-d-m-a :regionId="regionId" @change="selectCampus"></select-d-m-a>
            <!--选择年份-->
            <search-by-year :currentYear="current" :titleName="currentName" class="search-year" @searchByYear="searchCurrent"></search-by-year>
            <!--当前定额总量-->
            <!--<div>定额总量：
              <el-input-number v-model="totalQuota" size="mini" :step="10" controls-position="right"></el-input-number>
              吨
            </div>-->
            <!--历史年份-->
            <search-by-year :currentYear="history" :titleName="historyName" class="search-year" @searchByYear="searchHistory"></search-by-year>
            <!--历史数据总量-->
            <!--<div>历史数据总量：
              <el-input-number v-model="historyTotal" size="mini" :step="10" controls-position="right"></el-input-number>
              吨
            </div>-->
            <!--月定额设置-->
            <!--<el-popover
              placement="right"
              title="定额设置"
              :visible-arrow="1===2"
              width="400"
              v-model="ariaHidden"
              trigger="click">
              <set-month-quota></set-month-quota>
              <el-button type="primary" slot="reference" size="mini" class="set-quota" icon="el-icon-s-tools">定额设置</el-button>
            </el-popover>-->
            <el-button type="primary" size="mini" icon="el-icon-s-tools" @click="dialogVisible = true">定额设置</el-button>
            <el-dialog
              title="定额设置"
              :visible.sync="dialogVisible"
              :modal-append-to-body='false'
              width="350px"
              top="10vh"
              modal
              :before-close="handleClose">
              <set-month-quota @setData="setData"></set-month-quota>
              <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="link">确 定</el-button>
              </span>
            </el-dialog>
            <!--选择历史数据-->
            <el-radio-group v-model="radio" size="mini" type="success" class="radio-group" @change="changeRadio">
              <el-radio-button label="1">历史用量</el-radio-button>
              <el-radio-button label="2">历史定额</el-radio-button>
            </el-radio-group>
          </div>
          <div class="quota-table" v-loading="!show">
            <set-quota-table v-if="show" :tableData="tableData"></set-quota-table>
          </div>
          <div class="quota-radio">
            <el-radio v-model="quotaRadio" label="1">依参考数据按比例调整:
              <el-input-number size="mini" v-model="proportion"
                               controls-position="right" :min="10"
                               :step="1" :disabled="quotaRadio != 1">
              </el-input-number>(%)&nbsp;
              <el-button type="primary" plain size="mini" :disabled="quotaRadio != 1" @click="setUpQuota">
                设为当前校区定额
              </el-button>
            </el-radio>
            <el-radio v-model="quotaRadio" label="2">依参考月比例按总额调整:
              <el-input-number size="mini" v-model="totalOfSearchYear"
                               controls-position="right" :min="0"
                               :step="100" :disabled="quotaRadio != 2">
              </el-input-number>(吨)
              <el-button type="primary" plain size="mini" :disabled="quotaRadio != 2" @click="setUpQuota">
                设为当前校区定额
              </el-button>
            </el-radio>
            <div>定额责任人:<el-input size="mini" placeholder="请输入内容" v-model="editor" clearable></el-input></div>
            <div>定额下达部门:<el-input size="mini" placeholder="请输入内容" v-model="editorDepartment" clearable></el-input></div>
            <el-button class="keep" type="primary" size="mini" icon="el-icon-s-tools" @click="keep">保存</el-button>
          </div>
        </div>
      </div>
      <!--数据图形-->
      <div class="quota-charts box box-solid">
        <div class="box-header bg-aqua">定额及历史数据图表</div>
        <div class="box-body">
          <div class="quota-history" v-loading="!show">
            <bar-chart-for-quota v-if="show" :quota="quotaData" :history="historyData"></bar-chart-for-quota>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchByYear from "../../commons/SearchByYear";
  import SetQuotaTable from "./setCampusQuota/SetQuotaTable";
  import SetMonthQuota from "./SetMonthQuota";
  import BarChartForQuota from "../../commons/BarChartForQuota";
  import SelectDMA from "../../commons/SelectDMA";

  export default {
    components: {
      SelectDMA,
      BarChartForQuota,
      SetMonthQuota,
      SetQuotaTable,
      SearchByYear},
    name: "set-d-m-a-quota",
    data() {
      return {
        totalOfSearchYear: 0,
        proportion: 100,
        quotaRadio: '1',
        radio: '1',
        totalQuota: 0,
        historyTotal: 0,
        ariaHidden: false,
        currentName: '定额年份：',
        historyName: '参考年份：',
        regionId: 53,
        current: '',
        history: '',
        quota: {},
        historyQuota: {},
        historyFlow: [],
        tableData: [],
        show: false,
        quotaData: [],
        historyData: [],
        dialogVisible: false,
        monthData: [],
        status: -1,
        id: 0,
        regionName: '',
        editor: '',
        editorDepartment: '',
      }
    },
    created() {
      this.editor = localStorage.getItem('userName');
      let time = new Date();
      this.current = String(time.getFullYear());
      this.history = String(this.current - 1);
      this.init();
    },
    methods: {
      /*获取定额设定数据*/
      getQuotaData(){
        let time = new Date();
        let userName = localStorage.getItem('userName');
        let editTime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
        let waterQuota = {};
        this.tableData.forEach((item,index) => {
          if(index < 12) {
            let name = 'm' + (index + 1);
            waterQuota[name] = item.value;
          }else {
            this.totalQuota = item.value;
          }
        })
        waterQuota.id = this.id
        waterQuota.waterregionid = this.regionId ;
        waterQuota.quotayear = this.current ;
        waterQuota.editor = this.editor ;
        waterQuota.editordepartment = this.editorDepartment;
        waterQuota.edittime = editTime;
        waterQuota.totalquota = this.totalQuota ;
        if(this.status == 0){
          delete waterQuota.id ;
        }
        return waterQuota ;
      },
      /*保存定额*/
      keep() {
        this.$confirm('请确认是否保存当前DMA年度定额?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          let waterregionWaterquota = this.qs.stringify(this.getQuotaData());
          if(this.status == 0){
            this.$api.waterRegionQuota.addQuota(waterregionWaterquota).then(res => {
              if(res.msg == 'ok'){
                this.$alert('定额设置成功','提示');
              }else{
                this.$alert('定额设置失败，你的权限不够！','提示');
              }
              this.init;
            })
          }else{
            this.$api.waterRegionQuota.updateQuota(waterregionWaterquota).then(res => {
              if(res.msg == 'ok'){
                this.$alert('定额修改成功','提示');
              }else{
                this.$alert('定额修改失败，你的权限不够！','提示');
              }
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消保存'
          });
        })
      },
      /*自定义设置定额*/
      setData(params) {
        this.monthData = params.current;
      },
      /*点击确定设置当前定额值*/
      link() {
        let quotaData = [];
        this.tableData.forEach((item,index) => {
          let data = this.monthData[index].number;
          item.value = data;
          quotaData.push(data);
        })
        this.quotaData = quotaData;
        this.dialogVisible = false;
      },
      /*参考历史数据设置定额*/
      setUpQuota() {
        let ratio = 0,tableData,total;
        tableData = this.tableData;
        if(this.quotaRadio == '1') {
          ratio = this.proportion/100;
          this.tableData = tableData.map(item => {
            let history = item.history;
            if(history == '--') {
              this.$alert('参考年份暂无数据！','提示')
              return;
            }
            return {name: item.name,value: Number((Number(item.history) * ratio)).toFixed(0),history: item.history}
          })
        }else {
          total = this.totalOfSearchYear;
          this.tableData = tableData.map(item => {
            let history = item.history;
            if(history == '--') {
              this.$alert('参考年份暂无数据！','提示');
              return;
            }
            let proportion = Number(history)/Number(tableData[tableData.length - 1].history)
            return {name: item.name,value: Number(total * proportion).toFixed(0),history: item.history}
          })
        }
        let quota = this.tableData.map(item => item.value);
        quota.pop();
        this.quotaData = quota;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      /*选择历史用量/历史定额*/
      changeRadio() {
        if(this.radio == '1') {
          this.getHistoryFlow();
        }else {
          this.getHistoryQuota();
        }
      },
      /*获取当前定额，历史数据*/
      async init() {
        let params = {
          waterregionid: this.regionId,
          quotayear: this.current
        }
        let quota = await this.$api.waterRegionQuota.findAll(params);
        quota = quota.data && typeof quota.data == 'object' && quota.data.length > 0 ? quota.data[0] : {};
        if(quota.id) {
          this.status = 1;
          this.id = quota.id;
          this.regionName = quota.waterregionname;
        }else {
          this.status = 0;
        }
        params.quotayear = this.history;
        let historyQuota = await this.$api.waterRegionQuota.findAll(params);
        historyQuota = historyQuota.data && typeof historyQuota.data == 'object' && historyQuota.data.length > 0 ? historyQuota.data[0] : {};
        let params1 = {
          pageNum: 1,
          pageSize: 12,
          waterregionid: this.regionId,
          yy: this.history
        }
        let flow = await this.$api.regionInf.findFlowPageYearMonth(params1);
        flow = flow.data && flow.data.list ? flow.data.list : null;
        this.quota = quota;
        this.historyQuota = historyQuota;
        this.historyFlow = flow;
        this.getTableData();
      },
      /*获取表格数据*/
      getTableData() {
        let quota = this.quota;
        let historyQuota = this.historyQuota;
        let flow = this.historyFlow;
        let table = [],quotaData = [],historyData = [];
        let name,tableName,value,history,totalQuota = 0,historyTotal = 0;
        totalQuota = quota.totalquota ? Number(quota.totalquota) : 0;
        if(this.radio != '1') {
          historyTotal = historyQuota.totalquota ? historyQuota.totalquota : '--';
        }
        for(var i = 1;i <= 12;i ++) {
          name = 'm' + i;
          tableName = i;
          value = quota[name] ? quota[name] : '--';
          if(this.radio == '1') {
            history = flow ? Number(flow[i-1].data).toFixed(0) : '--';
            historyTotal += history == '--' ? 0 : Number(history);
          }else {
            history = historyQuota[name] ? Number(historyQuota[name]).toFixed(0) : '--';
          }
          table.push({name: tableName,value: value,history: history});
          quotaData.push(value);
          historyData.push(history == '--' ? 0 : history);
        }
        this.historyTotal = historyTotal == 0 ? '--' : historyTotal;
        this.totalQuota = totalQuota;
        this.totalOfSearchYear = historyTotal;
        table.push({name: '合计',value: totalQuota,history: historyTotal});
        this.tableData = table;
        this.historyData = historyData;
        this.quotaData = quotaData;
        this.show = true;
      },
      /*获取当前定额*/
      getCurrentQuota() {
        let params = {
          waterregionid: this.regionId,
          quotayear: this.current
        }
        this.$api.waterRegionQuota.findAll(params).then(res => {
          let quota = res.data && typeof res.data == 'object' && res.data.length > 0 ? res.data[0] : {};
          if(quota.id) {
            this.status = 1;
            this.id = quota.id;
            this.regionName = quota.waterregionname;
          }else {
            this.status = 0;
          }
          this.quota = quota;
          this.getTableData();
        })
      },
      /*获取历史定额*/
      getHistoryQuota() {
        let params = {
          waterregionid: this.regionId,
          quotayear: this.history
        }
        this.$api.waterRegionQuota.findAll(params).then(res => {
          let quota = res.data && typeof res.data == 'object' && res.data.length > 0 ? res.data[0] : {};
          this.historyQuota = quota;
          this.getTableData();
        })
      },
      /*获取历史用量*/
      getHistoryFlow() {
        let params = {
          pageNum: 1,
          pageSize: 12,
          waterregionid: this.regionId,
          yy: this.history
        }
        this.$api.regionInf.findFlowPageYearMonth(params).then(res => {
          let flow = res.data && res.data.list ? res.data.list : null;
          this.historyFlow = flow;
          this.getTableData();
        })
      },
      /*定额年份*/
      searchCurrent(params) {
        this.current = params.valueOfYear;
        this.getCurrentQuota();
      },
      /*参考年份*/
      searchHistory(params) {
        this.history = params.valueOfYear;
        this.changeRadio();
      },
      /*选择校区*/
      selectCampus(params) {
        this.regionId = params.id;
        this.changeRadio();
        this.getCurrentQuota();
      },
    },
  }
</script>

<style scoped>
  @import "../../../static/css/setQuota.css";
  .el-input {width: 150px;margin-left: 2px;}
  .keep {padding-bottom: 5px;height: 27px;}
</style>
