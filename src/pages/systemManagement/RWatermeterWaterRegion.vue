<template>
  <div class="flex">
    <!--添加区域计量水表信息-->
    <el-dialog
      title="添加DMA计量水表"
      :visible.sync="addDialog"
      width="1200px"
      top="5%"
      :modal-append-to-body='false'>
      <r-water-meter @rowClick="rowClick"></r-water-meter>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
    <div class="content">
      <div class="box">
        <div class="box-header bg-aqua">校区及DMA计量水表管理</div>
        <div class="box-body">
          <div style="display: inline-flex;flex-flow:row;margin-bottom:10px;">
            <select-region :titleName="titleName" :regionValue="regionValue" @change="change"></select-region>&emsp;
            <el-button size="mini" type="primary" icon="el-icon-plus" @click.stop="addMessage">添加水表</el-button>
            <el-button size="mini" type="primary" icon="el-icon-download" @click.stop="exportExcel">报表导出</el-button>
          </div>
          <el-table
            :data="tableData"
            size="mini"
            stripe
            id="out-table"
            :default-sort = "{prop: 'date', order: 'descending'}"
            border>
            <el-table-column
              width="50"
              type="index"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="waterregionid"
              v-if="show"
              sortable>
            </el-table-column>
            <el-table-column
              prop="watermeterid"
              v-if="show"
              sortable>
            </el-table-column>
            <el-table-column
              prop="watermetername"
              label="水表名称">
            </el-table-column>
            <el-table-column
              prop="waterregionname"
              label="区域名称">
            </el-table-column>
            <el-table-column
              prop=""
              label="流进/流出">
              <template slot-scope="scope">
                <h6 v-if="scope.row.isin">流进</h6>
                <h6 v-else style="color: deepskyblue;">流出</h6>
              </template>
            </el-table-column>
            <el-table-column label="操作" width=300px>
              <template slot-scope="scope">
                <el-switch
                  @change="changeIsIn(scope.row)"
                  style="margin-right: 30px;"
                  v-model = "scope.row.isin"
                  active-text=""
                  inactive-text="">
                </el-switch>
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import SelectRegion from "../../commons/SelectRegion";
  import RWaterMeter from "../../commons/RWaterMeter";
  export default {
    components: {
      RWaterMeter,
      SelectRegion},
    name: "r-watermeter-waterregion",
    data(){
      return {
        titleName:'校区及DMA：',
        regionValue:[1,1],
        regionId : 1,
        tableData : [] ,
        show : false ,
        value:true,
        addDialog:false,
        ruleForm:{
          watermeterid:'',
          isin:'',
          waterregionid:'',
        },
        rule:{
          watermeterid:[
            {required:true,message:'请选择区域计量水表',trigger:'blur'}
          ]
        },
      }
    },
    created(){
      var params = this.$route.query ;
      if(params.regionValue != undefined){
        this.regionValue = params.regionValue ;
        this.regionId = params.regionId ;
      }
      this.refresh();
    },
    methods:{
      exportExcel () {
        /* generate workbook object from table */
        var wb = this.xlsx.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        var wbout = this.xlsx.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          this.fileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'DMA计量水表信息.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      },
      /*点击表格行获取水表信息*/
      rowClick(params){
        this.ruleForm.watermeterid = params.waterMeterId ;
      },
      change(params){
        this.name = params.name;
        this.regionId = params.value ;
        this.refresh() ;
      },
      /*根据水用途id查询计量关系水表列表*/
      refresh(){
        var params = {
          waterregionid : this.regionId
        };
        this.$api.regionInf.findAllRelation(params).then(res => {
          this.tableData = res;
        })
      },
      /*修改水表计量关系*/
      changeIsIn(row){
        this.$confirm('确定要修改水表计量关系？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          var rWatermeterWaterregion = {
            isin : row.isin ? 1:0,
            id : row.id,
            watermeterid : '',
            regionId : row.waterregionid
          };
          rWatermeterWaterregion = this.qs.stringify(rWatermeterWaterregion);
          this.$api.regionInf.updateRelation(rWatermeterWaterregion).then(res => {
            if(res.msg == 'ok'){
              this.$message({
                type: 'success',
                message: '修改成功！'
              });
              this.refresh();
            }else{
              this.$message({
                type: 'error',
                message: '您的账号权限不足！'
              });
            }
            this.refresh();
          }).catch(()=>{
            this.$message({
              type: 'info',
              message: '修改失败！'
            });
          })
        }).catch(() => {
          row.isin = row.isin ? false : true ;
          this.$message({
            type: 'info',
            message: '已取消修改'
          });
        })
      },
      /*点击添加水表按钮清空ruleForm数据*/
      addMessage(){
        this.addDialog = true ;
        this.ruleForm.watermeterid = '';
      },
      /*添加计量水表*/
      submitForm() {
        this.ruleForm.waterregionid = this.regionId ;
        this.ruleForm.isin = '1';
        var rWatermeterWaterregion  = this.qs.stringify(this.ruleForm);
        if(this.ruleForm.watermeterid == null || this.ruleForm.watermeterid == ''){
          this.$alert('请从列表中选择水表','提示');
        }else{
          this.$api.regionInf.addRelation(rWatermeterWaterregion ).then(res => {
            if(res.msg === 'ok'){
              this.addDialog = false;
              this.$message({
                type:'success',
                message:'添加成功！'
              });
              this.refresh();
            }else{
              this.$message({
                type:'error',
                message:'您的账号权限不足！'
              })
            }
          })
        }
      },

      /*删除计量水表*/
      handleDelete(index,row){
        this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.$api.regionInf.deleteRelation(row.id)
            .then(res => {
              if(res.msg == 'ok'){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.refresh();
              }else{
                this.$message({
                  type: 'error',
                  message: '您的账号权限不足!'
                });
              }
            }).catch(()=>{
            this.$message({
              type: 'info',
              message: '删除失败！'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../../static/css/noRow.css";
</style>
