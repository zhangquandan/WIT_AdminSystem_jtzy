<!--DMA信息管理-->
<template>
  <div class="flex">
    <!--添加校区或DMA信息-->
    <el-dialog
      title="添加校区或DMA信息"
      :visible.sync="addDialog"
      width="900px"
      top="5%"
      :before-close="handleClose"
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
            <el-form-item label="上级区域" prop="parentid">
              <select-region :regionValue="regionValue" @change="changeRegion"></select-region>
            </el-form-item>
            <el-form-item label="类型" prop="category">
            <el-input v-model="ruleForm.category"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="ruleForm.remark"></el-input>
            </el-form-item>
          </div>
          <div class="col-xs-5">
            <el-form-item label="DMA标识" prop="statisticstype">
              <el-input v-model="ruleForm.statisticstype" placeholder="如需设置为DMA，输入'DMA'即可"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
            <el-form-item label="面积" prop="area">
              <el-input v-model="ruleForm.area"></el-input>
            </el-form-item>
            <el-form-item label="人口" prop="population">
              <el-input v-model="ruleForm.population"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--添加校区或DMA信息-->
    <el-dialog
      title="修改校区或DMA信息"
      :visible.sync="editDialog"
      width="900px"
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
            <el-form-item label="上级区域" prop="parentid">
              <select-region :regionValue="regionValue" @change="changeRegion"></select-region>
            </el-form-item>
            <el-form-item label="类型" prop="category">
              <el-input v-model="ruleForm.category"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="ruleForm.remark"></el-input>
            </el-form-item>
          </div>
          <div class="col-xs-5">
            <el-form-item label="DMA标识" prop="statisticstype">
              <el-input v-model="ruleForm.statisticstype" placeholder="如需设置为DMA，输入'DMA'即可"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
            <el-form-item label="面积" prop="area">
              <el-input v-model="ruleForm.area"></el-input>
            </el-form-item>
            <el-form-item label="人口" prop="population">
              <el-input v-model="ruleForm.population"></el-input>
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
        <div class="box-header bg-aqua">校区及DMA信息管理</div>
        <div class="box-body">
          <div style="margin-bottom:10px;">
            <el-button size="small" type="primary" icon="el-icon-plus" @click.stop="addMessage">添加DMA</el-button>
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
              prop="parentid"
              v-if="show"
              sortable>
            </el-table-column>
            <el-table-column
              prop="name"
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
              prop="statisticstype"
              label="DMA标识">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
            <el-table-column
              prop="area"
              label="面积">
            </el-table-column>
            <el-table-column
              prop="population"
              label="人口">
            </el-table-column>
            <el-table-column
              prop="remark"
              width=220px
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
    import SelectRegion from "../../commons/SelectRegion";

    export default {
      components: {SelectRegion},
      data(){
        let valiParentId = (rule, value, callback) => {//正整数
          if (value === this.ruleForm.id) {
            callback(new Error('请选择正确的上级区域'));
          } else {
            callback();
          }
        };
        return{
          regionData:[],
          regionValue:[],
          regionId:2,
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
            snumber:'',
            parentid:'',
            category:'',
            address:'',
            area:'',
            population:'',
            statisticstype:'',
            remark:''
          },
          //input校验
          rules:{
            name:[
              {required:true,message:'请输入区域名称',trigger:'blur'}
            ],
            /*snumber:[
              {required:true,message:'请输入区域编号',trigger:'blur'}
            ],*/
            parentid:[
              {required:true,message:'请选择上级区域',trigger:'blur'},
              { required: true, validator:valiParentId, trigger: "change" }
            ],
            /*category:[
              {required:true,message:'请选择区域类型',trigger:'blur'}
            ],
            address:[
              {required:true,message:'请输入区域地址',trigger:'blur'}
            ],
            area:[
              {required:true,message:'请输入区域面积',trigger:'blur'}
              /!*{pattern:'^[1-9]\\d*|0$',message:'面积只能为正数',trigger:['blur','change']},*!/
              /!*{type:'number',message:'面积只能为正数',trigger:['blur','change']}*!/
            ],
            population:[
              {required:true,message:'请输入区域人口数量',trigger:'blur'}
              /!*{pattern:'^[1-9]\\d*$',message:'人口数量只能为正整数',trigger:['blur','change']},*!/
              /!*{type:'number',message:'面积只能为正数',trigger:['blur','change']}*!/
            ]*/
          },

        }
        },
        created(){
          this.refresh();
          this.refreshAll();
        },
      methods:{
        /*点击表格区域名称跳转到计量水表页面*/
        toWaterMeter(index,row){
          this.regionValue = this.display.getAll(this.regionData,row.id);
          this.$router.push({
            path:'/SystemManagement/RWaterMeterWaterRegion',
            query:{
              regionValue:this.regionValue,
              regionId : row.id
            }
          })
        },
        /*添加区域对话框中选择上级区域*/
        changeRegion(params){
          this.ruleForm.parentid = params.value ;
          this.regionValue = this.display.getAll(this.regionData,params.value)
        },

        exportExcel () {
          /* generate workbook object from table */
          var wb = this.xlsx.utils.table_to_book(document.querySelector('#out-table'))
          console.log(wb)
          /* get binary string as output */
          var wbout = this.xlsx.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
          try {
            this.fileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '区域及DMA信息.xlsx')
          } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
          return wbout
        },

        addMessage(){
          this.addDialog = true;
          this.ruleForm.name = '';
          this.ruleForm.snumber = '';
          this.ruleForm.parentid = 2;
          this.ruleForm.category = '';
          this.ruleForm.address = '';
          this.ruleForm.area = '';
          this.ruleForm.population = '';
          this.ruleForm.regionValue = '';
        },
        //获取所有区域信息
        refreshAll(){
          this.$api.regionInf.findAll().then(res =>{
            this.regionData = res ;
          })
        },
        //获取区域信息
        refresh(){
          let params = {
            pageNum : this.currentPage,
            pageSize : this.size
          };
          this.$api.regionInf.findPage(params).then(res =>{
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
        //添加区域信息
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.ruleForm.id = '';
              var waterregion = this.qs.stringify(this.ruleForm);
              this.$api.regionInf.addRegion(waterregion).then(res => {
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
              var waterregion = this.qs.stringify(this.ruleForm);
              this.$api.regionInf.updateRegion(waterregion).then(res => {
                if(res.msg === 'ok'){
                  this.editDialog = false;
                  this.$message({
                    type:'success',
                    message:'修改成功！'
                  });
                  this.refresh();
                  this.refreshAll();
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
          this.regionValue = this.display.getParent(this.regionData,row.id);
          this.ruleForm.parentid = this.display.getParentId(this.regionData,row.id);
          this.$api.regionInf.findOne(row.id).then(res => {
            this.ruleForm = res ;
          })
        },
        //区域分页操作
        changePage(params){
          this.currentPage = params.currentPage ;
          this.Size = params.size ;
          this.refresh();

        },
        //删除单行信息
        handleDelete:function(index,row){
          this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            this.$api.regionInf.deleteOne(row.id)
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
                  this.refreshAll();
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
