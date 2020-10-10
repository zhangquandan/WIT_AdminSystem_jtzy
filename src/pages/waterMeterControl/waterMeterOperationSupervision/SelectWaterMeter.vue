<template>
  <div style="margin-bottom: 5px;">
    <el-dialog
      :append-to-body = true
      :visible.sync="showInformation"
      title="请选择水表"
      width="1200px"
      top="100px">
      <div style="margin-bottom: 10px;margin-top: -20px;">
        <tr>
          <td>
            <el-input placeholder="请输入内容" autofocus="true" v-model="input" style="width: 400px;">
              <el-select v-model="select" slot="prepend" placeholder="查询水表">
                <el-option label="名称" value="name"></el-option>
                <el-option label="编号" value="snumber"></el-option>
                <el-option label="计量等级" value="level"></el-option>
                <el-option label="通讯编号" value="comno"></el-option>
                <el-option label="类型" value="category"></el-option>
                <el-option label="规格" value="dimension"></el-option>
                <el-option label="用途类型" value="usage"></el-option>
                <el-option label="备注" value="remark"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click.stop="search"></el-button>
            </el-input>
          </td>
          <td>&emsp;</td>
          <td>
            <el-button type="primary" icon="el-icon-menu" @click.stop="refresh">显示所有水表</el-button>
          </td>
        </tr>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        height="400px"
        size="mini"
        highlight-current-row
        @row-click="rowClick"
        stripe
        id="out-table"
        :default-sort = "{prop: 'date', order: 'descending'}"
        border>
        <el-table-column
          type="index"
          fixed
          width="50"
          label="序号">
          <template slot-scope="scope">
            <span>{{(currentPage - 1) * size + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          width="180px"
          fixed
          label="名称">
        </el-table-column>
        <!--<el-table-column
          width="70px"
          fixed
          label="是否在线">
          <template slot-scope="scope" >
            <p style="color: red;font-size:13px;" v-if="!scope.row.isonline" >{{scope.row.states}}</p>
            <p style="color: green;font-size:13px;" v-else>{{scope.row.states}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="水表读数">
        </el-table-column>
        <el-table-column
          prop=""
          label="读表时间">
        </el-table-column>-->
        <el-table-column
          prop="snumber"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="level"
          label="计量等级">
        </el-table-column>
        <el-table-column
          prop="comno"
          width="120px"
          label="通讯编号">
        </el-table-column>
        <el-table-column
          prop="category"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="dimension"
          label="规格">
        </el-table-column>
        <el-table-column
          prop="material"
          label="材质">
        </el-table-column>
        <el-table-column
          prop="caliber"
          label="口径">
        </el-table-column>
        <el-table-column
          prop="usage"
          label="用途">
        </el-table-column>
        <el-table-column
          prop="sourcetype"
          label="水源类型">
        </el-table-column>
        <!--<el-table-column
          width="60px"
          prop="status"
          label="状态">
        </el-table-column>-->
        <el-table-column
          prop="dimension"
          label="尺寸">
        </el-table-column>
        <el-table-column
          prop="setdepth"
          label="埋深">
        </el-table-column>
        <el-table-column
          prop="setlandelevation"
          label="地面高程">
        </el-table-column>
        <el-table-column
          width="150px"
          prop="setaddress"
          label="安装地址">
        </el-table-column>
        <el-table-column
          prop="setdepartement"
          label="安装单位">
        </el-table-column>
        <el-table-column
          prop="setdatetime"
          width="130px"
          label="安装时间">
        </el-table-column>
        <el-table-column
          prop="producter"
          label="生产厂家">
        </el-table-column>
        <el-table-column
          width="120px"
          prop="productsn"
          label="出场编号">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
      </el-table>
      <page :total="total" @changePage="changePage"></page>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showInformation = false">取 消</el-button>
        <el-button type="primary" @click="selectWaterMeter">确 定</el-button>
      </span>
    </el-dialog>
    <div class="block">
      <el-button size="medium" type="primary" icon="el-icon-menu" @click.stop="showInformation=true">选择水表</el-button>
      <!--<label style="margin-left: 5px;" @click="showInformation=true">
        <i class="fa fa-angle-double-down">&nbsp;<b>水表列表</b></i>
      </label>-->
    </div>
  </div>
</template>

<script>
    export default {
        name: "select-water-meter",
      data(){
          return {
            flag:0,
            select:'',
            input:'',
            total:0,
            currentPage:1,
            size:5,
            changeSelectStyle:1,
            waterMeterId:1,
            value:'',
            waterMeterName:'',
            showInformation:false,
            tableData:[],
            tag:'',
          }
      },
      created(){
        this.refresh();
      },
      methods:{
        /*查询水表*/
        search(){
          this.currentPage = 1 ;
          var params = {
            pageNum : this.currentPage,
            pageSize : this.size,
            name : this.select,
            value : this.input
          }
          this.$api.waterMeterInf.searchWaterMeter(params).then(res => {
            this.tableData = res.data.list ;
            this.flag = 1 ;
            this.total = res.data.total ;
          })
        },
        //分页操作
        changePage(params){
          if(this.flag == 0){
            this.currentPage = params.currentPage ;
            this.size = params.size ;
            this.refresh();
          }else{
            this.currentPage = params.currentPage ;
            this.size = params.size ;
            this.search();
          }
        },
        /*获取分页水表信息*/
        refresh(){
          var params = {
            pageNum:this.currentPage,
            pageSize:this.size
          }
          this.$api.waterMeterInf.findPage(params).then(res => {
            res.list.forEach((item) => {
              if(item.isonline == true){
                item.states = '在线';
              }else{
                item.states = '离线'
              }
            })
            this.tableData = res.list ;
            this.total = res.total ;
            this.flag = 0 ;
          })
        },
        selectWaterMeter(){
          var params = {
            waterMeterName : this.waterMeterName,
            waterMeterId : this.waterMeterId,
            featureId : this.tag
          };
          this.showInformation = false ;
          this.$emit('selectWaterMeter',params)
        },
        rowClick(row,column,event){
          this.waterMeterId = row.id ;
          this.waterMeterName = row.name ;
          this.value = row.name ;
          this.tag = row.tag;
        }
      }
    }
</script>

<style scoped>
  p {
    font-size: 12px;
    margin: 10px auto;
  }
  i {
    margin: 15px auto;
  }
  .el-table__body tr.current-row>td {
    background: #f57878 !important;
  }

</style>
