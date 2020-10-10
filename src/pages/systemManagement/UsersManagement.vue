<!--用户管理页面-->
<template>
    <div class="flex">
      <!--添加用户信息-->
      <el-dialog
        title="添加用户信息"
        :visible.sync="addDialog"
        width="800px"
        top="8%"
        :modal-append-to-body='false'>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
          <div class="row">
            <div class="col-xs-5">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="用户角色" prop="roleid">
                <el-select v-model="ruleForm.roleid" placeholder="请选择" style="width: 200px;">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.remark"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="电话号码" prop="tel">
                <el-input v-model="ruleForm.tel"></el-input>
              </el-form-item>
            </div>
            <div class="col-xs-5">
              <el-form-item label="单位" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item label="注册用途" prop="explain">
                <el-input v-model="ruleForm.explain"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input v-model="ruleForm.remark"></el-input>
              </el-form-item>
              <el-form-item label="审核状态" prop="status">
              <el-switch
                v-model="ruleForm.status"
                active-text="开通"
                inactive-text="未开通">
              </el-switch>
            </el-form-item>
            </div>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改用户信息-->
      <el-dialog
        title="修改用户信息"
        :visible.sync="editDialog"
        width="800px"
        top="8%"
        :modal-append-to-body='false'>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
          <div class="row">
            <div class="col-xs-5">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="电话号码" prop="tel">
                <el-input v-model="ruleForm.tel"></el-input>
              </el-form-item>
              <el-form-item label="单位" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
              </el-form-item>
            </div>
            <div class="col-xs-5">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item label="注册用途" prop="explain">
                <el-input v-model="ruleForm.explain"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input v-model="ruleForm.remark"></el-input>
              </el-form-item>
              <el-form-item label="审核状态" prop="status">
                <el-switch
                  v-model="ruleForm.status"
                  active-text="开通"
                  inactive-text="未开通">
                </el-switch>
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
          <div class="box-header bg-aqua">用户信息管理</div>
          <div class="box-body">
            <div style="margin-bottom:10px;">
              <el-button size="small" type="primary" icon="el-icon-plus" @click.stop="addMessage">添加用户</el-button>
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
                prop="password"
                label="密码">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="role"
                label="账号权限">
              </el-table-column>
              <el-table-column
                prop="tel"
                label="电话号码">
              </el-table-column>
              <el-table-column
                prop="address"
                label="单位">
              </el-table-column>
              <el-table-column
                prop="email"
                label="邮箱">
              </el-table-column>
              <el-table-column
                prop="explain"
                label="注册用途">
              </el-table-column>
              <el-table-column
              prop="status"
              label="审核状态">
              <template slot-scope="scope">
                <h6 style="color: green" v-if="scope.row.status">通过</h6>
                <h6 style="color: red" v-else>未通过</h6>
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
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          editDialog:false,
          addDialog:false,
          tableData:[],
          options:[],
          show:false,
          temp:'',
          ruleForm:{
            id:'',
            username:'',
            password:'',
            name:'',
            tel:'',
            address: '',
            email:'',
            explain:'',
            status:'',
            remark:'',
            roleid:''
          },
          //input校验
          rules:{
            username:[
              {required:true,message:'请输入用户名',trigger:'blur'}
            ],
            password:[
              {required:true,message:'请输入密码',trigger:'blur'}
            ],
            name:[
              {required:true,message:'请输入姓名',trigger:'blur'}
            ],
            tel:[
              {required:true,message:'请输入联系人手机号码',trigger:'blur'},
              {pattern:'^(1)[0-9]{10}$',message:'号码格式错误',trigger:['blur','change']}
            ],
            /*email:[
              {required:true,message:'请输入邮箱',trigger:'blur'},
              //{type:'email',message:'邮箱格式错误',trigger:['blur','change']}
            ],*/
            roleid:[
              {required:true,message:'请选择用户角色',trigger:'blur'}
            ],
          },
        }
      },
      created() {
        this.refresh();
        this.getAllRoles();
      },
      methods: {
        /*获取所有角色信息*/
        getAllRoles(){
          this.$api.userInf.findAllRoles().then(res => {
            this.options = res ;
          })
        },
        /*获取所有用户信息*/
        refresh(){
          this.$api.userInf.findAllUsersRole().then(res => {
            res.forEach((item ) =>{
              let temp = '' ;
              item.systemrole.forEach((one) =>{
                temp = temp.concat(one.remark,'  ')
              });
              item.role = temp ;
            });
            this.tableData = res ;
          })
        },
        /*点击添加用户清空表单内容*/
        addMessage(){
          this.addDialog = true;
          this.ruleForm.id = '';
          this.ruleForm.username = '';
          this.ruleForm.password = '';
          this.ruleForm.roleid = '';
          this.ruleForm.name = '';
          this.ruleForm.tel = '';
          this.ruleForm.address = '';
          this.ruleForm.email = '';
          this.ruleForm.explain = '';
          this.ruleForm.remark = '';
          this.ruleForm.status = false ;
        },
        //添加信息
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var systemuser = this.qs.stringify(this.ruleForm);
              this.$api.userInf.addUser(systemuser).then(res => {
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
            } else {
              return false;
            }
          });
        },
        //点击修改按钮获取该条信息
        handleEdit:function (index,row) {
          let params = {
            id: row.id
          };
          this.$api.userInf.findAllUsers(params).then(res => {
            delete res[0].systemrole ;
            this.ruleForm = res[0];
          })
        },
        //修改信息
        editForm(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var systemuser = this.qs.stringify(this.ruleForm);
              this.$api.userInf.updateUser(systemuser).then(res => {
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
        //删除单行信息
        handleDelete:function(index,row){
          this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            this.$api.userInf.deleteUser(row.id).then(res => {
              if(res.msg == 'ok'){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
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
        /*报表导出*/
        exportExcel () {
          /* generate workbook object from table */
          var wb = this.xlsx.utils.table_to_book(document.querySelector('#out-table'))
          /* get binary string as output */
          var wbout = this.xlsx.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
          try {
            this.fileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '用户信息.xlsx')
          } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
          return wbout
        },
      }
    }
</script>

<style scoped>
  @import "../../../static/css/noRow.css";
</style>
