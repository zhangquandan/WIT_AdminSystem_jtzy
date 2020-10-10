<!--建筑信息管理页面-->
<template>
  <div class="flex">
    <!--添加建筑信息-->
    <el-dialog
      title="添加建筑信息"
      :visible.sync="addDialog"
      width="800px"
      top="5%"
      :modal-append-to-body='false'>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
          <div class="row">
            <div class="col-xs-5">
              <el-form-item label="名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="编号" prop="snumber">
                <el-input v-model="ruleForm.snumber"></el-input>
              </el-form-item>
              <el-form-item label="类型" prop="category">
                <el-select v-model="ruleForm.category" placeholder="请选择" style="width: 200px;">
                  <el-option
                    v-for="item in options"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="地址" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
              </el-form-item>
              <el-form-item label="楼层" prop="storeys">
                <el-input v-model="ruleForm.storeys"></el-input>
              </el-form-item>
              <el-form-item label="建筑面积" prop="buildingarea">
                <el-input v-model="ruleForm.buildingarea"></el-input>
              </el-form-item>
            </div>
            <div class="col-xs-5">
              <el-form-item label="建筑功能" prop="buildingfunction">
                <el-input v-model="ruleForm.buildingfunction"></el-input>
              </el-form-item>
              <el-form-item label="人口" prop="population">
                <el-input v-model="ruleForm.population"></el-input>
              </el-form-item>
              <el-form-item label="地图标记" prop="tag">
                <el-input v-model="ruleForm.tag"></el-input>
              </el-form-item>
              <el-form-item label="所属部门" prop="owner">
                <el-input v-model="ruleForm.owner"></el-input>
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
    <!--修改建筑信息-->
    <el-dialog
      title="修改建筑信息"
      :visible.sync="editDialog"
      width="800px"
      top="5%"
      :modal-append-to-body='false'>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
        <div class="row">
          <div class="col-xs-5">
            <el-form-item label="名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="编号" prop="snumber">
              <el-input v-model="ruleForm.snumber"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="category">
              <el-select v-model="ruleForm.category" placeholder="请选择建筑类型" style="width: 200px;">
                <el-option
                  v-for="item in options"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
            <el-form-item label="楼层" prop="storeys">
              <el-input v-model="ruleForm.storeys"></el-input>
            </el-form-item>
            <el-form-item label="建筑面积" prop="buildingarea">
              <el-input v-model="ruleForm.buildingarea"></el-input>
            </el-form-item>
          </div>
          <div class="col-xs-5">
            <el-form-item label="建筑功能" prop="buildingfunction">
              <el-input v-model="ruleForm.buildingfunction"></el-input>
            </el-form-item>
            <el-form-item label="人口" prop="population">
              <el-input v-model="ruleForm.population"></el-input>
            </el-form-item>
            <el-form-item label="地图标记" prop="tag">
              <el-input v-model="ruleForm.tag"></el-input>
            </el-form-item>
            <el-form-item label="所属部门" prop="owner">
              <el-input v-model="ruleForm.owner"></el-input>
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
        <div class="box-header bg-aqua">建筑信息管理</div>
        <div class="box-body">
          <div style="margin-bottom:10px;">
            <el-button size="small" type="primary" icon="el-icon-plus" @click.stop="addMessage">添加建筑</el-button>
            <el-button size="small" type="primary" icon="el-icon-download" @click.stop="exportExcel">报表导出</el-button>
          </div>
          <el-table
            size="mini"
            :data="tableData"
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
              v-if="show">
            </el-table-column>
            <el-table-column
              width="200px"
              label="名称">
              <template slot-scope="scope">
                <el-link type="primary" @click="toWaterMeter(scope.$index,scope.row)"><h6>{{scope.row.name}}</h6></el-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="snumber"
              label="编号">
            </el-table-column>
            <el-table-column
              prop="category"
              label="类型">
            </el-table-column>
            <el-table-column
              width="150px"
              prop="address"
              label="地址">
            </el-table-column>
            <el-table-column
              prop="storeys"
              label="楼层">
            </el-table-column>
            <el-table-column
              prop="buildingarea"
              label="建筑面积">
            </el-table-column>
            <el-table-column
              prop="buildingfunction"
              label="建筑功能">
            </el-table-column>
            <el-table-column
              prop="population"
              label="人口">
            </el-table-column>
            <el-table-column
              prop="tag"
              label="地图标记">
            </el-table-column>
            <el-table-column
              prop="owner"
              width="150px"
              label="所属部门">
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
                  @click="handleEdit(scope.$index, scope.row)
                  editDialog = true">编辑</el-button>
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
      name: "building-management",
      data(){
        return{
          options:[],
          addDialog:false,
          editDialog:false,
          tableData:[],
          show:false,
          input1:'',
          select1:'',
          currentPage:1,
          total:0,
          size:10,
          pages:0,
          ruleForm:{
            id:'',
            name:'',
            snumber:'',
            category:'',
            address:'',
            storeys:'',
            buildingarea:'',
            buildingfunction:'',
            population:'',
            tag:'',
            owner:'',
            remark:'',
          },
          //input校验
          rules:{
            name:[
              {required:true,message:'请输入建筑名称',trigger:'blur'}
            ],
            snumber:[
              {required:true,message:'请输入建筑编号',trigger:'blur'}
            ],
            category:[
              {required:true,message:'请选择建筑类型',trigger:'blur'}
            ],
            address:[
              {required:true,message:'请输入建筑地址',trigger:'blur'}
            ],
            storeys:[
              {required:true,message:'请输入建筑楼层',trigger:'blur'}
            ],
            buildingarea:[
              {required:true,message:'请输入建筑面积',trigger:'blur'}
            ],
            buildingfunction:[
              {required:true,message:'请输入建筑功能',trigger:'blur'}
            ],
            population:[
              {required:true,message:'请输入建筑人口',trigger:'blur'}
              /*{pattern:'^[1-9]\\d*$',message:'人口数量只能为正整数',trigger:['blur','change']},*/
              /*{type:'number',message:'面积只能为正数',trigger:['blur','change']}*/
            ],
            owner:[
              {required:true,message:'请选择所属部门',trigger:'blur'}
            ],
          },
        }
      },
      created(){
       this.refresh();
       this.getAllCategory();
      },
      methods:{
        /*点击建筑名称跳转到计量水表页面*/
        toWaterMeter(index,row){
          this.$router.push({
            path:'/SystemManagement/RWaterMeterBuilding',
            query:{
              buildingId : row.id,
            }
          })
        },
        exportExcel () {
          /* generate workbook object from table */
          var wb = this.xlsx.utils.table_to_book(document.querySelector('#out-table'))
          /* get binary string as output */
          var wbout = this.xlsx.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
          try {
            this.fileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '建筑信息.xlsx')
          } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
          return wbout
        },
        addMessage(){
          this.addDialog = true;
          this.ruleForm.name = '';
          this.ruleForm.snumber = '';
          this.ruleForm.parentid = '';
          this.ruleForm.category = '';
          this.ruleForm.address = '';
          this.ruleForm.buildingarea = '';
          this.ruleForm.population = '';
          this.ruleForm.buildingfunction = '';
          this.ruleForm.tag = '';
          this.ruleForm.owner = '';
          this.ruleForm.storeys = '';
        },
        //获取所有建筑类型
        getAllCategory(){
          var arr = [];
          this.$api.buildingInf.findALLCategory().then(res => {
            res.forEach((item) => {
              if(arr.indexOf(item.name)< 0){
                arr.push(item.name);
              }
            })
          })
          this.options = arr ;
        },
        //刷新表格
        refresh(){
          let params = {
            pageNum : this.currentPage,
            pageSize : this.size
          };
          this.$api.buildingInf.findPage(params).then(res => {
            this.tableData = res.list ;
            this.total = res.total ;
            this.pages = res.pages ;
          })
        },
        //添加信息
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.ruleForm.id = '';
              var building = this.qs.stringify(this.ruleForm);
              this.$api.buildingInf.addBuilding(building).then(res => {
                if(res.msg === 'ok'){
                  this.addDialog = false;
                  this.$message({
                    type:'success',
                    message:'添加成功！'
                  })
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
              var building = this.qs.stringify(this.ruleForm);
              this.$api.buildingInf.updateBuilding(building)
                .then(res => {
                  if(res.msg === 'ok'){
                    this.editDialog = false
                    this.$message({
                      type:'success',
                      message:'修改成功！'
                    })
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
          this.$api.buildingInf.findOne(row.id)
            .then(res => {
              this.ruleForm = res;
            })
        },
        //查询
        /*search(){
          this.axios.get('building',{
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
            this.$api.buildingInf.deleteOne(row.id).then(res => {
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
        }
      }
    }
</script>

<style scoped>
  @import "../../../static/css/noRow.css";
</style>
