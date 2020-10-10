<template>
    <div class="flex">
      <!--添加建筑类别-->
      <el-dialog
        title="添加建筑类别"
        :visible.sync="addDialog"
        width="400px"
        top="5%"
        :modal-append-to-body='false'>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
          <div class="row">
            <div class="col-xs-10">
              <el-form-item label="建筑类别" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="类别编号" prop="id">
                <el-input v-model="ruleForm.id"></el-input>
              </el-form-item>
              <el-form-item label="代码" prop="code">
                <el-input v-model="ruleForm.code"></el-input>
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
      <!--修改建筑类别-->
      <el-dialog
        title="修改建筑类别"
        :visible.sync="editDialog"
        width="400px"
        top="5%"
        :modal-append-to-body='false'>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
          <div class="row">
            <div class="col-xs-10">
              <el-form-item label="建筑类别" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="代码" prop="code">
                <el-input v-model="ruleForm.code"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input v-model="ruleForm.remark"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editForm('ruleForm')">确 定</el-button>
      </span>
      </el-dialog>
      <div class="content">
        <div class="box">
          <div class="box-header bg-aqua">建筑类别信息管理</div>
          <div class="box-body">
            <div style="margin-bottom:10px;">
              <el-button size="small" type="primary" icon="el-icon-plus" @click.stop="addMessage">添加建筑类别</el-button>
              <el-button size="small" type="primary" icon="el-icon-download" @click.stop="exportExcel">报表导出</el-button>
            </div>
            <el-table
              :data="tableData"
              size="mini"
              stripe
              id="out-table"
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
                prop="name"
                label="建筑类别">
              </el-table-column>
              <el-table-column
                prop="id"
                label="类别编号">
              </el-table-column>
              <el-table-column
                prop="code"
                label="代码">
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
                  <el-button
                    size="mini"
                    icon="el-icon-delete"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    export default {
        name: "building-category-management",
      data(){
        return {
          editDialog:false,
          addDialog:false,
          tableData:[],
          currentPage:1,
          size:10,
          total:0,
          ruleForm:{
            id:'',
            name:'',
            code:'',
            remark:'',
          },
          //input校验
          rules:{
            id:[
              {required:true,message:'请输入类别编号',trigger:'blur'}
            ],
            name:[
              {required:true,message:'请输入建筑类别',trigger:'blur'}
            ],
            /*code:[
              {required:true,message:'请输入代码',trigger:'blur'}
            ],*/
          },
        }
      },
      created(){
        this.refresh();
      },
      methods:{
        /*获取所有信息*/
        refresh(){
          let params = {
            pageNum : this.currentPage,
            pageSize : this.size
          }
          this.$api.buildingInf.findPageCategory(params).then(res => {
            this.tableData = res.list ;
            this.total = res.total ;
          })
        },
        /*分页*/
        changePage(params){
          this.currentPage = params.currentPage ;
          this.size = params.size ;
          this.refresh();
        },
        /*点击添加按钮清空数据*/
        addMessage(){
          this.addDialog = true;
          this.ruleForm.id = '';
          this.ruleForm.name = '';
          this.ruleForm.code = '';
          this.ruleForm.remark = '';
        },
        //添加信息
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var dicBuildingcategory = this.qs.stringify(this.ruleForm);
              this.$api.buildingInf.addBuildingCategory(dicBuildingcategory).then(res => {
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
        //修改信息
        editForm(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var dicBuildingcategory = this.qs.stringify(this.ruleForm);
              this.$api.buildingInf.updateBuildingCategory(dicBuildingcategory).then(res => {
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
                  })
                }
              })
            } else {
              return false;
            }
          });
        },
        //点击修改按钮触发事件
        handleEdit:function (index,row) {
          this.ruleForm = row ;
          this.refresh();
        },
        //删除单行信息
        handleDelete:function(index,row){
          this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            this.$api.buildingInf.deleteCategory(row.id).then(res => {
              if(res.msg == 'ok'){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
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
        },
        exportExcel () {
          /* generate workbook object from table */
          var wb = this.xlsx.utils.table_to_book(document.querySelector('#out-table'))
          /* get binary string as output */
          var wbout = this.xlsx.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
          try {
            this.fileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '建筑类别信息.xlsx')
          } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
          return wbout
        },
      }
    }
</script>

<style scoped>
  @import "../../../static/css/noRow.css";
</style>
