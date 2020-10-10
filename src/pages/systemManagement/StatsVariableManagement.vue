<!--统计参数信息管理页面-->
<template>
  <div class="flex">
    <!--添加统计参数信息-->
    <el-dialog
      title="添加统计参数信息"
      :visible.sync="addDialog"
      width="400px"
      top="5%"
      :before-close="handleClose"
      :modal-append-to-body='false'>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
        <div class="row">
          <div class="col-xs-10">
            <el-form-item label="名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="数值" prop="value">
              <el-input v-model="ruleForm.value"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="unit">
              <el-input v-model="ruleForm.unit"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="ruleForm.remark"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改统计参数信息-->
    <el-dialog
      title="修改统计参数信息"
      :visible.sync="editDialog"
      width="400px"
      top="5%"
      :before-close="handleClose"
      :modal-append-to-body='false'>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
        <div class="row">
          <div class="col-xs-10">
            <el-form-item label="名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="数值" prop="value">
              <el-input v-model="ruleForm.value"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="unit">
              <el-input v-model="ruleForm.unit"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="ruleForm.remark"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="editForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <div class="content">
      <div class="box">
        <div class="box-header bg-aqua">统计参数信息管理</div>
        <div class="box-body">
          <div style="margin-bottom:10px;">
            <el-button size="small" type="primary" icon="el-icon-plus" @click.stop="addMessage">添加统计参数</el-button>
            <el-button size="small" type="primary" icon="el-icon-download" @click.stop="exportExcel">报表导出</el-button>
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
              <template slot-scope="scope">
                <span>{{(currentPage - 1) * size + scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              v-if="show"
              sortable>
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="value"
              label="数值">
            </el-table-column>
            <el-table-column
              prop="unit"
              label="单位">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
            <el-table-column label="操作" width=200px>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.$index, scope.row),editDialog = true">编辑</el-button>
   <!--             <el-button
                  size="mini"
                  icon="el-icon-delete"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="box-footer">
          <page :total="total" @changePage="changePage"></page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SelectRegion from "../../commons/SelectRegion";

  export default {
    components: {SelectRegion},
    data(){
      return{
        addDialog:false,
        editDialog:false,
        tableData:[],
        show:false,
        input1:'',
        select1:'',
        currentPage:1,
        size:10,
        total:0,
        pages:0,
        ruleForm:{
          id:'',
          name:'',
          value:'',
          unit:'',
          remark:'',
        },
        //input校验
        rules:{
          name:[
            {required:true,message:'请输入统计参数名称',trigger:'blur'}
          ],
          value:[
            {required:true,message:'请输入统计参数数值',trigger:'blur'}
          ],
          unit:[
            {required:true,message:'请输入数值单位',trigger:'blur'}
          ],
        },

      }
    },
    created(){
      this.refresh();
    },
    methods:{

      exportExcel () {
        /* generate workbook object from table */
        var wb = this.xlsx.utils.table_to_book(document.querySelector('#out-table'))
        console.log(wb)
        /* get binary string as output */
        var wbout = this.xlsx.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          this.fileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '统计参数信息.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      },
      addMessage(){
        this.addDialog = true;
        this.ruleForm.name = '';
        this.ruleForm.value = '';
        this.ruleForm.unit = '';
        this.ruleForm.remark = '';
      },
      //获取统计参数信息
      refresh(){
        let params = {
          pageNum : this.currentPage,
          pageSize : this.size
        }
        this.$api.stats.findAllPage(params).then(res =>{
          this.tableData = res.list;
          this.total = res.total;
          this.pages = res.pages
        })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //添加统计参数信息
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.id = '';
            var stats = this.qs.stringify(this.ruleForm);
            this.$api.stats.addStats(stats).then(res => {
              if(res.msg === 'ok'){
                this.addDialog = false;
                this.$message({
                  type:'success',
                  message:'添加成功！'
                });
                if((this.total)%(this.size) == 0){
                  this.currentPage = this.pages+1;
                  this.refresh();
                }else{
                  this.currentPage = this.pages;
                  this.refresh();
                }
              }else{
                this.$message({
                  type:'error',
                  message:'您的账号权限不足！'
                })
              }
            })
          } else {
            return false;
          }
        });
      },
      cancelForm(){
        this.editDialog = false;
        this.refresh() ;
      },
      //修改信息
      editForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var stats = this.qs.stringify(this.ruleForm);
            this.$api.stats.updateStats(stats).then(res => {
              if(res.msg === 'ok'){
                this.editDialog = false;
                this.$message({
                  type:'success',
                  message:'修改成功！'
                });
                this.refresh();
              }else{
                this.$message({
                  type:'error',
                  message:'您的账号权限不足！'
                });
                this.refresh();
              }
            })
          } else {
            this.refresh();
            return false;
          }
        });
      },
      //点击修改按钮触发事件
      handleEdit:function (index,row) {
          this.ruleForm = row ;
      },
      //分页操作
      changePage(params){
        this.currentPage = params.currentPage ;
        this.size = params.size ;
        this.refresh();

      },
      //删除单行信息
      handleDelete:function(index,row){
        this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.$api.stats.deleteStats(row.id)
            .then(res => {
              if(res.msg == 'ok'){
                this.$message({
                  type: 'success',
                  message: '删除成功！'
                });
                if(this.total%this.size == 1 && this.currentPage == this.pages){
                  this.currentPage = this.pages - 1 ;
                }
                this.refresh();
              }else{
                this.$message({
                  type: 'error',
                  message: '您的账号权限不足！'
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
  .input-with-select {
    width:400px;
    margin-bottom: 5px;
    float: right;
  }
  .el-select {
    width:110px;
  }
</style>
