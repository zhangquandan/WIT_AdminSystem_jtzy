<!--操作日志信息管理页面-->
<template>
  <div class="flex">
    <!--添加日志信息-->
    <el-dialog
      title="添加日志信息"
      :visible.sync="addDialog"
      width="800px"
      top="5%"
      :modal-append-to-body='false'>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" size="medium">
        <div class="row">
          <div class="col-xs-5">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="登陆地址" prop="loginaddress">
              <el-input v-model="ruleForm.loginaddress"></el-input>
            </el-form-item>
            <el-form-item label="操作时间" prop="operatetime">
              <el-date-picker
                v-model="ruleForm.operatetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="ruleForm.remark"></el-input>
            </el-form-item>
          </div>

          <div class="col-xs-6">
            <el-form-item label="操作类型" prop="operatetype">
              <el-input v-model="ruleForm.operatetype"></el-input>
            </el-form-item>
            <el-form-item label="操作完成情况" prop="operatecomplete">
              <el-switch
                @change="change"
                v-model="operateValue"
                active-text="完成"
                inactive-text="未完成">
              </el-switch>
            </el-form-item>
            <el-form-item label="操作内容" prop="operatecontent">
              <el-input
                type="textarea"
                :rows="4"
                maxlength="50"
                show-word-limit
                placeholder="请输入内容"
                v-model="ruleForm.operatecontent">
              </el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改日志信息-->
    <el-dialog
      title="修改日志信息"
      :visible.sync="editDialog"
      width="800px"
      top="5%"
      :modal-append-to-body='false'>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" size="medium">
        <div class="row">
          <div class="col-xs-5">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="登陆地址" prop="loginaddress">
              <el-input v-model="ruleForm.loginaddress"></el-input>
            </el-form-item>
            <el-form-item label="操作时间" prop="operatetime">
              <el-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="ruleForm.operatetime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="ruleForm.remark"></el-input>
            </el-form-item>
          </div>

          <div class="col-xs-6">
            <el-form-item label="操作类型" prop="operatetype">
              <el-input v-model="ruleForm.operatetype"></el-input>
            </el-form-item>
            <el-form-item label="操作完成情况" prop="operatecomplete">
              <el-switch
                @change = "change"
                v-model="operateValue"
                active-text="完成"
                inactive-text="未完成">
              </el-switch>
            </el-form-item>
            <el-form-item label="操作内容" prop="operatecontent">
              <el-input
                type="textarea"
                :rows="4"
                maxlength="50"
                show-word-limit
                placeholder="请输入内容"
                v-model="ruleForm.operatecontent">
              </el-input>
            </el-form-item>
          </div>

        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <div class="content body">
      <div class="box">
        <div class="box-header bg-aqua">操作日志信息管理</div>
        <div class="box-body">
          <div style="margin-bottom:10px;">
            <el-button size="small" type="primary" icon="el-icon-plus" @click.stop="addMessage">添加日志</el-button>
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
              prop="id"
              v-if="show"
              sortable>
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名">
            </el-table-column>
            <el-table-column
              prop="loginaddress"
              label="登陆地址">
            </el-table-column>
            <el-table-column
              prop="operatetime"
              label="操作时间">
            </el-table-column>
            <el-table-column
              prop="operatetype"
              label="操作类型">
            </el-table-column>
            <el-table-column
              prop="operatecontent"
              label="操作内容">
            </el-table-column>
            <el-table-column
              prop="operatecomplete"
              label="操作完成情况">
              <template slot-scope="scope">
                <h6 v-if="scope.row.operatecomplete" style="color: green">完成</h6>
                <h6 v-else style="color: red">未完成</h6>
              </template>
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
    data() {
      return {
        operateValue:false,
        editDialog:false,
        addDialog:false,
        tableData:[],
        show:false,
        currentPage:1,
        size:10,
        total:0,
        pages:0,
        ruleForm:{
          id:'',
          username:'',
          loginaddress:'',
          operatetime:'',
          operatetype:'',
          operatecontent:'',
          operatecomplete:'',
          remark:''
        },
        //input校验
        rules:{
          username:[
            {required:true,message:'请输入用户名',trigger:'blur'}
          ],
          loginaddress:[
            {required:true,message:'请输入登陆地址',trigger:'blur'}
          ],
          operatetime:[
            {required:true,message:'请输入登陆时间',trigger:'blur'}
          ],
          operatetype:[
            {required:true,message:'请输入操作类型',trigger:'blur'}
          ],
          operatecontent:[
            {required:true,message:'请输入操作内容',trigger:'blur'}
          ],
          operatecomplete:[
            {required:true,message:'请输入操作完成情况',trigger:'blur'}
          ],
        },
      }
    },
    created() {
      this.refresh();
    },
    methods: {
      //分页操作
      changePage(params){
        this.currentPage = params.currentPage ;
        this.size = params.size ;
        this.refresh();
      },
      /*改变操作完成情况*/
      change(){
        this.ruleForm.operatecomplete = this.operateValue ? 1 : 0 ;
      },
      /*获取所有日志信息*/
      refresh(){
        var params = {
          pageNum : this.currentPage ,
          pageSize : this.size
        }
        this.$api.logOperation.findPage(params).then(res => {
          this.tableData = res.list ;
          this.total = res.total ;
        })
      },
      /*报表导出*/
      exportExcel () {
        /* generate workbook object from table */
        var wb = this.xlsx.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        var wbout = this.xlsx.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          this.fileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '日志信息.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      },
      /*点击添加日志清空表单内容*/
      addMessage(){
        this.addDialog = true;
        this.ruleForm.username = '';
        this.ruleForm.loginaddress = '';
        this.ruleForm.operatetype = '';
        this.ruleForm.operatetime = '';
        this.ruleForm.operatecontent = '';
        this.ruleForm.operatecomplete = '';
        this.ruleForm.remark='';
      },
      //添加信息
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.id = '';
            this.ruleForm.operatecomplete = this.operateValue ? 1 : 0 ;
            var logOperation = this.qs.stringify(this.ruleForm);
            this.$api.logOperation.addLog(logOperation).then(res => {
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
            var logOperation = this.qs.stringify(this.ruleForm);
            this.$api.logOperation.updateLog(logOperation).then(res => {
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
        this.$api.logOperation.findAll().then(res => {
          res.forEach((item) => {
            if(item.id == row.id){
              this.ruleForm = item ;
            }
          })
        })
      },
      //查询
      /*search(){
        this.axios.get('dicWaterusage',{
          params:{
            fieldName : this.select1,
            value : this.input1
          }
        }).then(res => {
          if(res.data.msg !== 'ok'){
            this.$message({
              type:'error',
              message:'您要查询的数据不存在！'
            })
          }
        }).catch(()=>{
          this.$message({
            type:'success',
            message:'您要查询的数据不存在！'
          })
        })
      },*/
      //删除单行信息
      handleDelete:function(index,row){
        this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.$api.logOperation.deleteLog(row.id).then(res => {
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
</style>
