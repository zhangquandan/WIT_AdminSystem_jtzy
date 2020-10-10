<template>
  <div style="margin-bottom: 5px;">
    <el-dialog
      :modal-append-to-body="false"
      :visible.sync="showInformation"
      title="请选择水表"
      width="1200px"
      top="100px">
      <div style="margin-bottom: 10px;margin-top: -20px;">
        <el-input placeholder="请输入内容" autofocus="true" v-model="input" style="width: 400px;">
          <el-select v-model="select" slot="prepend" placeholder="查询水表">
            <el-option label="名称" value="name"></el-option>
            <el-option label="编号" value="snumber"></el-option>
            <el-option label="通讯编号" value="comno"></el-option>
            <el-option label="出厂编号" value="productSN"></el-option>
            <el-option label="材质" value="material"></el-option>
            <el-option label="规格" value="dimension"></el-option>
            <el-option label="口径" value="caliber"></el-option>
            <el-option label="等级标记" value="level"></el-option>
            <el-option label="备注" value="remark"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click.stop="search"></el-button>
        </el-input>
        <el-button style="margin-left: 10px" type="primary" icon="el-icon-menu" @click.stop="refresh">显示所有水表</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        size="mini"
        highlight-current-row
        @selection-change="handleSelectionChange"
        stripe
        id="out-table"
        :default-sort = "{prop: 'date', order: 'descending'}"
        border>
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号">
          <template slot-scope="scope">
            <span>{{(currentPage - 1) * size + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          width="150px"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="snumber"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="comno"
          width="85px"
          label="通讯编号">
        </el-table-column>
        <el-table-column
          width="85px"
          prop="productsn"
          label="出厂编号">
        </el-table-column>
        <el-table-column
          prop="category"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="material"
          label="材质">
        </el-table-column>
        <el-table-column
          prop="dimension"
          label="规格">
        </el-table-column>
        <el-table-column
          prop="caliber"
          label="口径">
        </el-table-column>
        <el-table-column
          prop="level"
          label="等级标记">
        </el-table-column>
        <el-table-column
          prop="remark"
          width="150px"
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
      <el-button size="mini" type="primary" icon="el-icon-menu" @click.stop="showInf">{{buttonName}}</el-button>
      <!--<label style="margin-left: 5px;" @click="showInformation=true">
        <i class="fa fa-angle-double-down">&nbsp;<b>水表列表</b></i>
      </label>-->
    </div>
  </div>
</template>

<script>
    export default {
        name: "select-custom-water-meter",
      data(){
          return {
            flag:0,
            select:'name',
            input:'',
            total:0,
            currentPage:1,
            size:10,
            value:'',
            selectData:[],
            showInformation:false,
            tableData:[],
          }
      },
      props:{
        buttonName:{
          type:String
        },
        type: {
          type: Number,//选择校区 1.武汉工程大学，2.武昌校区，3.流芳校区
          defaut: 1,
        }
      },
      watch: {
        type: {
          handler(newValue,oldValue) {
            switch(this.type) {
              case 1: this.refresh();
              break;
              case 2: this.select = 'name';
                      this.input = '武昌';
                      this.search();
              break;
              case 3: this.select = 'name';
                      this.input = '流芳';
                      this.search();
              break;
            }
          }
        }
      },
      mounted(){
        this.refresh();
      },
      methods:{
        showInf() {
          this.showInformation=true;
          this.$emit('showInf',{})
        },
        /*查询水表*/
        search(){
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
              if(item.isonline){
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
            tableData : this.selectData,
          }
          this.showInformation = false ;
          this.$emit('selectWaterMeter',params);
          this.selectData = [];
        },
        handleSelectionChange(selection){
          this.selectData = selection ;
        }
      }
    }
</script>

<style scoped>
  .el-select {
    width:110px;
  }
</style>
