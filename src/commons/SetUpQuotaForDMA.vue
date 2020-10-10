<template>
  <div class="setUp" style="height:100%;width:100%;">
    <!--设置月用水定额-->
    <el-dialog
      title="设置月用水定额"
      :visible.sync="setUpDialog"
      @close="close"
      width="500px"
      top="0%">
      <table width="450px" align="center" style="margin-right: 20px;">
        <tr align="center" style="height:30px;">
          <td align="right"></td>
          <td>用水定额(吨)</td>
          <td>占总额比例(%)</td>
        </tr>
        <tr v-for="item in setUpData" align="center">
          <td>{{item.title}}</td>
          <td align="center">
            <el-input-number size="mini" v-model="item.data" controls-position="right" @change="dataChange(item)"
                             :min="0" :step="100" :precision="1">
            </el-input-number>
          </td>
          <td align="center">
            <el-input-number size="mini" v-model="item.proportion" controls-position="right"
                             @change="proportionChange(item)" :min="0" :max="100" :step="0.01" :precision="2">
            </el-input-number>
          </td>
        </tr>
        <tr align="center">
          <td>合计</td>
          <td align="center">
            <el-input-number
              v-model="totalOfMonth" disabled size="mini" controls-position="right" :precision="1">
            </el-input-number>
          </td>
          <td align="center">
            <el-input-number
              v-model="totalOfProportion" disabled size="mini" controls-position="right" :precision="2">
            </el-input-number>
          </td>
        </tr>
        <tr align="center">
          <td align="center">总定额:</td>
          <td>
            <el-input-number
              v-model="totalQuota" disabled size="mini" :precision="1" controls-position="right">
            </el-input-number>
          </td>
          <td></td>
        </tr>
        <tr align="center">
          <td align="center">未分配的定额:</td>
          <td>
            <el-input-number
              v-model="balance" disabled size="mini" :precision="1" controls-position="right">
            </el-input-number>
          </td>
          <td>
            <el-button type="primary" size="mini" v-show="showInf" @click="toAnyMonth">一键分配</el-button>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
          <el-button @click="setUpDialog = false">取 消</el-button>
          <el-button type="primary" @click="link">确 定</el-button>
        </span>
    </el-dialog>
    <!--<div class="row">
      <div class="col-xs-4">
        <search-by-year :setWidth="width" @searchByYear="searchByYear" :currentYear="anyYear"
                        :titleName="titleValue" :searchName="searchName"></search-by-year>
      </div>
      <div class="col-xs-4">
        <div class="demo-input-suffix">
          当前DMA年总用水定额：
          <el-input-number
            v-model="totalQuota" :precision="1" controls-position="right"  @change="changeTotal" :min="0">
          </el-input-number>
          (吨)
        </div>
      </div>
      <div class="col-xs-4">
        <el-button-group>
          <el-button size="small" type="primary" @click.stop="setUpMonth">月定额分配</el-button>
          <el-button size="small" type="primary" @click.stop="average">平均分配</el-button>
          <el-button size="small" type="primary" @click.stop="setUpByProportion">比例分配</el-button>
          <el-button size="small" type="primary" @click.stop="recovery">恢复初值</el-button>
        </el-button-group>
      </div>
    </div>-->
    <tr>
      <td>
        <search-by-year :setWidth="width" @searchByYear="searchByYear" :currentYear="anyYear"
                        :titleName="titleValue" :searchName="searchName"></search-by-year>
      </td>
      <td>&emsp;&emsp;&emsp;</td>
      <td>
        <div class="demo-input-suffix">
          <b>当前DMA年总用水定额：</b>
          <el-input-number
            v-model="totalQuota" :precision="1" controls-position="right"  @change="changeTotal" :min="0">
          </el-input-number>
          <b>（吨）</b>
        </div>
      </td>
      <td>&emsp;&emsp;&emsp;</td>
      <td>
        <el-button-group>
          <el-button size="small" type="primary" @click.stop="setUpMonth">月定额分配</el-button>
          <el-button size="small" type="primary" @click.stop="average">平均分配</el-button>
          <el-button size="small" type="primary" @click.stop="setUpByProportion">比例分配</el-button>
          <el-button size="small" type="primary" @click.stop="recovery">恢复初值</el-button>
        </el-button-group>
      </td>
    </tr>
    <div class="row rw" style="margin-top: 15px;">

      <div class="col-xs-6" style="height:100%;display:flex;flex-flow:column;">
        <div class="box box-primary" style="flex:1;display: flex;flex-flow:column;">
          <div class="box-header"></div>
          <div class="box-body" align="center" style="flex:1;">
            <bar-chart :xData="xData" :yData="yData" :typeName="typeName" :color="itemColor" v-if="flag"></bar-chart>
          </div>
        </div>
      </div>

      <div class="col-xs-6" style="height:100%;display: flex;flex-flow:column;">
        <div class="box box-primary" style="flex:1;display: flex;flex-flow:column;">
          <div class="box-body" style="flex:1;">
            <el-table
              :data="tableData"
              style="width: 100%;height:45%;"
              size="mini"
              :default-sort="{prop: 'date', order: 'descending'}"
              border>
              <el-table-column
                fixed
                prop="m1"
                label="一月(t)">
              </el-table-column>
              <el-table-column
                fixed
                prop="m2"
                label="二月(t)">
              </el-table-column>
              <el-table-column
                fixed
                prop="m3"
                label="三月(t)">
              </el-table-column>
              <el-table-column
                fixed
                prop="m4"
                label="四月(t)">
              </el-table-column>
              <el-table-column
                fixed
                prop="m5"
                label="五月(t)">
              </el-table-column>
              <el-table-column
                fixed
                prop="m6"
                label="六月(t)">
              </el-table-column>
            </el-table>
            <div class="10%;"></div>
            <el-table
              :data="tableData"
              style="width: 100%;margin-top: 10px;height:45%;"
              size="mini"
              stripe
              id="out-table"
              :default-sort="{prop: 'date', order: 'descending'}"
              border>
              <el-table-column
                fixed
                prop="m7"
                label="七月">
              </el-table-column>
              <el-table-column
                fixed
                prop="m8"
                label="八月">
              </el-table-column>
              <el-table-column
                fixed
                prop="m9"
                label="九月">
              </el-table-column>
              <el-table-column
                fixed
                prop="m10"
                label="十月">
              </el-table-column>
              <el-table-column
                fixed
                prop="m11"
                label="十一月">
              </el-table-column>
              <el-table-column
                fixed
                prop="m12"
                label="十二月">
              </el-table-column>
            </el-table>
          </div>
          <div class="box-footer" align="right">
            <el-button type="primary" size="mini" @click="keep">保存</el-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import BarChart from "./BarChart";

  export default {
    components: {BarChart},
    name: "set-up-quota-for-d-m-a",
    data() {
      return {
        setUpDialog: false,
        width: '150px',
        xData: [],
        yData: [],
        showInf:false,
        typeName: '',
        anyYear: '',
        titleValue: '选择年份：',
        searchName: '查询定额',
        regionId: 53,
        tableData: [],
        totalOfMonth: 0,
        totalQuota: 0,
        proportion: {},
        balance: 0,
        setUpData: [],
        proportionOfSurplus: 0,//未分配的定额比例
        totalOfProportion: 0,//所有已分配的定额所占的比例和
        flag: false,
        id:0,
        status:0, //0为没有设置定额，1为已经设置定额
        itemColor:'#DD1C2C',
        flag:false,
      }
    },
    created() {
      this.anyYear = this.dateFormat.getCurrentYear();
      this.refresh();
    },
    props: {
      quotaData: {
        type: Number,
      },
      tableValue: {
        type: Array,
      },
      yValue: {
        type: Array,
      },
      regionId:{
        type:Number
      }
    },
    watch: {
      quotaData: {
        handler(newValue, oldValue) {
          this.totalQuota = newValue;
          this.tableData[0].totalquota = newValue;
          this.getDataByProportion();
          this.getProportion(this.tableData[0]);
        }
      },
      tableValue: {
        handler(newValue, oldValue) {
          this.tableData = newValue;
          this.totalQuota = newValue[0].totalquota;
          this.getProportion(newValue[0]);
        }
      },
      yValue: {
        handler(newValue, oldValue) {
          this.yData = newValue;
        }
      },
      regionId:{
        handler(newValue,oldValue){
          this.regionId = newValue ;
          /*this.id = newValue ;*/
          this.refresh();
        }
      }
    },
    methods: {
      getTableData() {
        let data = this.setUpData;
        let table = this.tableData[0];
        let x = [];
        let y = [];
        data.forEach((item) => {
          let name = item.name;
          table[name] = item.data;
          x.push(item.title);
          y.push(table[name]);
        })
        this.xData = x;
        this.yData = y;
      },
      /*通过月定额设定获取图表数据*/
      getDataBySetUp() {

      },
      /*通过比例获取图表数据*/
      getDataByProportion() {
        let data = this.setUpData;
        let total = this.totalQuota;
        let x = [];
        let y = [];
        data.forEach((item) => {
          let name = item.name;
          this.tableData[0][name] = Number(total * item.proportion / 100).toFixed(1);
          x.push(item.title);
          y.push(this.tableData[0][name]);
        })
        this.xData = x;
        this.yData = y;
      },
      /*获取每月定额占年总定额的比例*/
      getProportion(data) {
        let proportion = {};
        let dataOfMonth = 0;
        let setData = [];
        for (var i = 1; i <= 12; i++) {
          if(data.totalquota == 0){
            proportion['m'+i] = 0 ;
            dataOfMonth +=0 ;
            setData.push({
              title: i + '月',
              name: 'm' + i,
              data: 0,
              proportion: proportion['m' + i],
            })
          }else{
            proportion['m' + i] = Number((data['m' + i] / data.totalquota) * 100).toFixed(3);
            dataOfMonth += Number(data['m' + i]);
            setData.push({
              title: i + '月',
              name: 'm' + i,
              data: Number(data['m' + i]).toFixed(1),
              proportion: proportion['m' + i]
            })
          }
        }
        this.totalOfMonth = dataOfMonth;
        this.setUpData = setData;
        this.balance = Number(this.totalQuota - this.totalOfMonth).toFixed(1);
        this.totalOfProportion = this.totalQuota != 0 ? Number((this.totalOfMonth / this.totalQuota) * 100).toFixed(3) : 0;
        this.proportionOfSurplus = 100 - this.totalOfProportion
      },
      /*平均分配*/
      average() {
        let y = [];
        for (var i = 1; i <= 12; i++) {
          let name = 'm' + i;
          let data = (this.totalQuota / 12).toFixed(1);
          y.push(data);
          this.tableData.map(v => {
            v[name] = data;
          })
        }
        this.yData = y;
      },
      /*比例分配*/
      setUpByProportion() {
        this.getDataByProportion();
      },
      /*恢复初值*/
      recovery() {
        this.refresh();
      },
      /*获取柱状图数据*/
      getChartData(data) {
        let x = [];
        let y = [];
        let dataOfMonth = 0;
        let proportion = [];
        let totalData = 0;
        let obj = data[0];
        for (var i = 1; i <= 12; i++) {
          let name = 'm' + i;
          x.push(i + '月');
          if(obj == undefined || obj == null){
            y.push(0);
          }else{
            y.push(obj[name])
          }
        }
        this.xData = x;
        this.yData = y;
        if(obj == undefined || obj == null){
          this.totalQuota = 0 ;
        }else{
          this.totalQuota = obj.totalquota;
        }
        this.flag = true;
      },
      /*选择年份获取当前年份的定额*/
      refresh() {
        let x = [];
        let y = [];
        let totalOfMonth = 0;
        let proportion = [];
        let params = {
          waterregionid: this.regionId,
          quotayear: this.anyYear
        }
        this.$api.waterRegionQuota.findAll(params).then(res => {
          this.tableData = [];
          if(res == null || res == ''){
            this.status = 0 ;
            let obj = {};
            obj['totalquota'] = 0 ;
            for(var i = 1; i <= 12 ; i++){
              obj['m'+i] = 0 ;
            }
            this.tableData.push(obj)
          }else{
            this.status = 1 ;
            this.tableData = res;
            this.id = res[0].id ;
          }
          this.getChartData(this.tableData);
          this.getProportion(this.tableData[0]);
        })
      },
      /*年份查询*/
      searchByYear(params) {
        this.flag = false;
        this.anyYear = params.valueOfYear;
        this.quotaYear = params.valueOfYear;
        this.refresh();
        let param = {
          anyYear: this.anyYear
        }
        this.$emit('searchByYear', param);
      },
      /*分配的月定额合计量与总定额比较*/
      compare() {
        let compareData = this.setUpData;
        let dataOfMonth = 0;
        let proportions = 0;
        compareData.forEach((item) => {
          dataOfMonth += Number(item.data);
          proportions += Number(item.proportion);
        })
        this.totalOfMonth = Number(dataOfMonth - 0).toFixed(1);
        this.balance = Number(this.totalQuota - this.totalOfMonth).toFixed(1);
        this.totalOfProportion = Number(proportions).toFixed(3)
        this.proportionOfSurplus = 100 - this.totalOfProportion
      },
      /*判定是否一键分配剩余定额*/
      show(){
        if(this.balance != 0 && this.totalOfProportion == 100){
          this.showInf = true ;
        }else{
          this.showInf = false ;
        }
      },
      /*月用量/比例调整*/
      dataChange(value) {
        value.proportion = Number((value.data / this.totalQuota) * 100).toFixed(3);
        this.compare();
        this.show();
      },
      proportionChange(value) {
        value.data = Number((this.totalQuota) * (value.proportion / 100)).toFixed(1);
        this.compare();
        this.show();
      },
      /*关闭对话框的回调函数*/
      close() {
        if (this.flag) {
          this.getProportion(this.tableData[0]);
        }
      },
      /*提交调整后的月用水定额*/
      link() {
        if (this.balance == 0) {
          this.flag = false;
          this.setUpDialog = false;
          this.getTableData();
        } else {
          this.flag = true;
          this.$alert('年总定额未分配完,请继续分配！','提示');
        }
      },
      /*获取定额设定数据*/
      getQuotaData(){
        let userName = localStorage.getItem('userName');
        let editTime = this.dateFormat.getEditTime();
        let waterQuota = this.tableData[0] ;
        waterQuota.id = this.id
        waterQuota.waterregionid = this.regionId ;
        waterQuota.quotayear = this.quotaYear ;
        waterQuota.editor = userName ;
        waterQuota.edittime = editTime;
        waterQuota.totalquota = this.totalQuota ;
        if(this.status == 0){
          delete waterQuota.id ;
        }
        return waterQuota ;
      },
      /*月定额分配 如果分配比例达到100%而未分配定额大于0，采用一键分配至8月份*/
      toAnyMonth(){
        let balance = this.balance ;
        let data = this.setUpData ;
        data.forEach((item)=>{
          if(item.name == 'm8'){
            item.data += balance ;
          }
        })
        this.compare();
      },
      /*总定额改变*/
      changeTotal(){
        this.getDataByProportion();
        this.compare();
      },
      /*点击月定额分配弹出窗口*/
      setUpMonth(){
        this.setUpDialog = true ;
        this.compare();
      },
      /*保存定额*/
      keep(){
        this.$confirm('请确认是否保存当前部门年度定额?', '提示', {
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
                this.$alert('定额设置失败','提示');
              }
              this.refresh();
            })
          }else{
            this.$api.waterRegionQuota.updateQuota(waterregionWaterquota).then(res => {
              if(res.msg == 'ok'){
                this.$alert('定额修改成功','提示');
              }else{
                this.$alert('定额修改失败','提示');
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
    }
  }
</script>

<style scoped>
  .setUp{
    display:flex;
    flex-flow:column;
  }
  .rw {
    flex:1;
  }
</style>
