<!--图例标准信息管理页面-->
<template>
  <div class="flex">
    <!--添加区域漏失率信息-->
    <!--<el-dialog
      title="添加区域漏失率信息"
      :visible.sync="addDialog"
      width="400px"
      top="5%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
        <div class="row">
          <div class="col-xs-10">
            <el-form-item label="区域" prop="waterregionid">
              <select-region @change="change" readOnly></select-region>
            </el-form-item>
            <el-form-item label="漏失率" prop="lostscale">
              <el-input v-model="ruleForm.lostscale"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>-->
    <!--修改图例标准信息-->
    <el-dialog
      title="修改图例标准信息"
      :visible.sync="editDialog"
      width="800px"
      top="5%"
      :modal-append-to-body='false'>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
        <div class="row">
          <div class="col-xs-5">
            <el-form-item label="标准值1" prop="range1">
              <el-input v-model="ruleForm.range1"></el-input>
            </el-form-item>
            <el-form-item label="标准值2" prop="range2">
              <el-input v-model="ruleForm.range2"></el-input>
            </el-form-item>
            <el-form-item label="标准值3" prop="range3">
              <el-input v-model="ruleForm.range3"></el-input>
            </el-form-item>
            <el-form-item label="标准值4" prop="range4">
              <el-input v-model="ruleForm.range4"></el-input>
            </el-form-item>
            <el-form-item label="标准值5" prop="range5">
              <el-input v-model="ruleForm.range5"></el-input>
            </el-form-item>
            <el-form-item label="标准值6" prop="range6">
              <el-input v-model="ruleForm.range6"></el-input>
            </el-form-item>
            <el-form-item label="标准值7" prop="range7">
              <el-input v-model="ruleForm.range7"></el-input>
            </el-form-item>
          </div>
          <div class="col-xs-5">
            <el-form-item label="标准值8" prop="range8">
              <el-input v-model="ruleForm.range8"></el-input>
            </el-form-item>
            <el-form-item label="标准值9" prop="range9">
              <el-input v-model="ruleForm.range9"></el-input>
            </el-form-item>
            <el-form-item label="标准值10" prop="range10">
              <el-input v-model="ruleForm.range10"></el-input>
            </el-form-item>
            <el-form-item label="标准值11" prop="range11">
              <el-input v-model="ruleForm.range11"></el-input>
            </el-form-item>
            <el-form-item label="标准值12" prop="range12">
              <el-input v-model="ruleForm.range12"></el-input>
            </el-form-item>
            <el-form-item label="标准值13" prop="range13">
              <el-input v-model="ruleForm.range13"></el-input>
            </el-form-item>
            <el-form-item label="标准值14" prop="range14">
              <el-input v-model="ruleForm.range14"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false"> 取 消</el-button>
        <el-button type="primary" @click="editForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <div class="content">
      <div class="box">
        <div class="box-header bg-aqua">图例标准信息管理</div>
        <div class="box-body">
          <div style="margin-bottom:10px;">
            <!--<el-button size="small" type="primary" icon="el-icon-plus" @click.stop="addMessage">添加DMA漏失率</el-button>-->
            <el-button size="small" type="primary" icon="el-icon-download" @click.stop="exportExcel">报表导出</el-button>
          </div>
          <el-table
            size="mini"
            :data="tableData"
            stripe
            id="out-table"
            border
            :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column
              type="index"
              fixed
              label="序号"  >
            </el-table-column>
            <el-table-column
              prop="id"
              v-if="show">
            </el-table-column>
            <el-table-column
              prop="category"
              width="120px"
              fixed
              label="类别">
              <template slot-scope="scope">
                <h6 v-if="scope.row.category == 10">日用水量标准</h6>
                <h6 v-if="scope.row.category == 20">日量周同比增量</h6>
                <h6 v-if="scope.row.category == 30">日量周同比增幅</h6>
                <h6 v-if="scope.row.category == 40">日最小用量</h6>
                <h6 v-if="scope.row.category == 50">最小量周同比增量</h6>
                <h6 v-if="scope.row.category == 60">最小量周同比增幅</h6>
                <h6 v-if="scope.row.category == 70">综合漏损指数</h6>
              </template>
            </el-table-column>
            <el-table-column
              prop="range1"
              label="标准值1">
            </el-table-column>
            <el-table-column
              prop="range2"
              label="标准值2">
            </el-table-column>
            <el-table-column
              prop="range3"
              label="标准值3">
            </el-table-column>
            <el-table-column
              prop="range4"
              label="标准值4">
            </el-table-column>
            <el-table-column
              prop="range5"
              label="标准值5">
            </el-table-column>
            <el-table-column
              prop="range6"
              label="标准值6">
            </el-table-column>
            <el-table-column
              prop="range7"
              label="标准值7">
            </el-table-column>
            <el-table-column
              prop="range8"
              label="标准值8">
            </el-table-column>
            <el-table-column
              prop="range9"
              label="标准值9">
            </el-table-column>
            <el-table-column
              prop="range10"
              label="标准值10">
            </el-table-column>
            <el-table-column
              prop="range11"
              label="标准值11">
            </el-table-column>
            <el-table-column
              prop="range12"
              label="标准值12">
            </el-table-column>
            <el-table-column
              prop="range13"
              label="标准值13">
            </el-table-column>
            <el-table-column
              prop="range14"
              label="标准值14">
            </el-table-column>
            <el-table-column label="操作" width=200px fixed="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.$index, scope.row),editDialog = true">编辑</el-button>
                <!--<el-button
                  size="mini"
                  icon="el-icon-delete"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
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
    data(){
      return{
        addDialog:false,
        editDialog:false,
        tableData:[],
        show:false,
        ruleForm:{
          id:'',
          category:'',
          range1:'',
          range2:'',
          range3:'',
          range4:'',
          range5:'',
          range6:'',
          range7:'',
          range8:'',
          range9:'',
          range10:'',
          range11:'',
          range12:'',
          range13:'',
          range14:'',
        },
        //input校验
        rules:{
          range1:[
            {required:true,message:'请输入标准值1',trigger:'blur'},
          ],
          range2:[
            {required:true,message:'请输入标准值2',trigger:'blur'},
          ],
          range3:[
            {required:true,message:'请输入标准值3',trigger:'blur'},
          ],
          range4:[
            {required:true,message:'请输入标准值4',trigger:'blur'},
          ],
          range5:[
            {required:true,message:'请输入标准值5',trigger:'blur'},
          ],
          range6:[
            {required:true,message:'请输入标准值6',trigger:'blur'},
          ],
          range7:[
            {required:true,message:'请输入标准值7',trigger:'blur'},
          ],
          range8:[
            {required:true,message:'请输入标准值8',trigger:'blur'},
          ],
          range9:[
            {required:true,message:'请输入标准值9',trigger:'blur'},
          ],
          range10:[
            {required:true,message:'请输入标准值10',trigger:'blur'},
          ],
          range11:[
            {required:true,message:'请输入标准值11',trigger:'blur'},
          ],
          range12:[
            {required:true,message:'请输入标准值12',trigger:'blur'},
          ],
          range13:[
            {required:true,message:'请输入标准值13',trigger:'blur'},
          ],
          range14:[
            {required:true,message:'请输入标准值14',trigger:'blur'},
          ],
        }
      }
    },
    created(){
      this.refresh();
    },
    methods:{
      exportExcel () {
        /* generate workbook object from table */
        var wb = this.xlsx.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        var wbout = this.xlsx.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          this.fileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '图例标准信息.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      },
      /*addMessage(){
        this.addDialog = true;
        this.ruleForm.waterregionid = '';
        this.ruleForm.waterregionname = '';
        this.ruleForm.lostscale = '';
      },*/
      //刷新表格
      refresh(){
        this.$api.navigation.findAllStandard().then(res => {
          this.tableData = res.data ;
        })
      },
      //添加信息
      /*submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.id = '';
            var rtaWaterregionLost = this.qs.stringify(this.ruleForm);
            this.$api.rtaWaterRegionLost.addLost(rtaWaterregionLost).then(res => {
              if(res.msg === 'ok'){
                this.addDialog = false
                this.$message({
                  type:'success',
                  message:'添加成功！'
                })
                this.refresh();
              }else{
                this.$message({
                  type:'error',
                  message:'您要添加的数据已存在！'
                })
              }
            })
          } else {
            return false;
          }
        });
      },*/
      //修改信息
      editForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var list = this.qs.stringify(this.ruleForm);
            this.$api.navigation.updateStandard(list).then(res => {
              if(res.msg === 'ok'){
                this.editDialog = false;
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
        this.tableData.forEach((item) => {
          if(item.id == row.id){
            this.ruleForm = item ;
          }
        });
        this.refresh();
      },
    }
  }
</script>

<style scoped>
  @import "../../../static/css/noRow.css";
</style>

