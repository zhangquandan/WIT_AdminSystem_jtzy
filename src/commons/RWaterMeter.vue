<template>
  <div style="margin-bottom: 5px;">
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
  </div>
</template>

<script>
  export default {
    name: "r-water-meter",
    data(){
      return {
        flag:0,
        select:'',
        input:'',
        total:0,
        currentPage:1,
        size:10,
        tableData:[]
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
        };
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
      /*点击行获取水表信息*/
      rowClick(row){
        this.waterMeterId = row.id ;
        this.waterMeterName = row.name ;
        this.value = row.name ;
        let params = {
          waterMeterId : row.id,
        };
        this.$emit('rowClick',params);
      }
    }
  }
</script>

<style scoped>
  .el-select {
    width:110px;
  }
</style>
