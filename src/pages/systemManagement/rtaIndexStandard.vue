<!--漏损指标信息管理页面-->
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
    <!--修改漏损指标信息-->
    <el-dialog
      title="修改漏损指标信息"
      :visible.sync="editDialog"
      width="800px"
      top="5%"
      :modal-append-to-body='false'>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
        <div class="row">
          <div class="col-xs-5">
            <el-form-item label="总量增量基准量" prop="totalstandard">
              <el-input v-model="ruleForm.totalstandard"></el-input>
            </el-form-item>
            <el-form-item label="最小流量增量基准量" prop="leaststandard">
              <el-input v-model="ruleForm.leaststandard"></el-input>
            </el-form-item>
            <el-form-item label="日量隔周增量指数系数" prop="addtotalindex">
              <el-input v-model="ruleForm.addtotalindex"></el-input>
            </el-form-item>
            <el-form-item label="日量隔周增幅指数系数" prop="addrangetotalindex">
              <el-input v-model="ruleForm.addrangetotalindex"></el-input>
            </el-form-item>
          </div>
          <div class="col-xs-5">
            <el-form-item label="最小量隔周增量指数系数" prop="addminindex">
              <el-input v-model="ruleForm.addminindex"></el-input>
            </el-form-item>
            <el-form-item label="最小量隔周增幅指数系数" prop="addrangeminindex">
              <el-input v-model="ruleForm.addrangeminindex"></el-input>
            </el-form-item>
            <el-form-item label="综合指数报警限值" prop="leakagindexalarm">
              <el-input v-model="ruleForm.leakagindexalarm"></el-input>
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
        <div class="box-header bg-aqua">漏损信息管理</div>
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
              fixed
              label="类别">
              <template slot-scope="scope">
                <h6 v-if="scope.row.category == 10">水表</h6>
                <h6 v-if="scope.row.category == 20">建筑</h6>
                <h6 v-if="scope.row.category == 30">DMA</h6>
                <h6 v-if="scope.row.category == 40">校区</h6>
              </template>
            </el-table-column>
            <el-table-column
              prop="totalstandard"
              label="总量增量基准量">
            </el-table-column>
            <el-table-column
              prop="leaststandard"
              label="最小流量增量基准量">
            </el-table-column>
            <el-table-column
              prop="addtotalindex"
              label="日量隔周增量指数系数">
            </el-table-column>
            <el-table-column
              prop="addrangetotalindex"
              label="日量隔周增幅指数系数">
            </el-table-column>
            <el-table-column
              prop="addminindex"
              label="最小量隔周增量指数系数">
            </el-table-column>
            <el-table-column
              prop="addrangeminindex"
              label="最小量隔周增幅指数系数">
            </el-table-column>
            <el-table-column
              prop="leakagindexalarm"
              label="综合指数报警限值">
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
          totalstandard:'',
          leaststandard:'',
          addtotalindex:'',
          addrangetotalindex:'',
          addminindex:'',
          addrangeminindex:'',
          leakagindexalarm:'',
        },
        //input校验
        rules:{
          totalstandard:[
            {required:true,message:'总量增量基准量',trigger:'blur'},
          ],
          leaststandard:[
            {required:true,message:'最小流量增量基准量',trigger:'blur'},
          ],
          addtotalindex:[
            {required:true,message:'日量隔周增量指数系数',trigger:'blur'},
          ],
          addrangetotalindex:[
            {required:true,message:'日量隔周增幅指数系数',trigger:'blur'},
          ],
          addminindex:[
            {required:true,message:'最小量隔周增量指数系数',trigger:'blur'},
          ],
          addrangeminindex:[
            {required:true,message:'最小量隔周增幅指数系数',trigger:'blur'},
          ],
          leakagindexalarm:[
            {required:true,message:'综合指数报警限值',trigger:'blur'},
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
          this.fileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '漏损指数信息.xlsx')
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
        this.$api.leakageIndex.findAllLeakageIndex().then(res => {
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
            this.$api.leakageIndex.updateLeakageIndex(list).then(res => {
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

