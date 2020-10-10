<!--水表信息管理页面-->
<template>
  <div class="flex">
    <!--批量导入数据-->
    <el-dialog
      title="批量导入水表信息"
      :visible.sync="importDialog"
      width="1200px"
      top="5%"
      :modal-append-to-body='false'>
      <upload-excel @getResult="getResult" style="margin-top: -30px;"></upload-excel>
      <el-table
        fit
        size="mini"
        :data="excelData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        height="320px"
        stripe
        id="out-table"
        :default-sort = "{prop: 'date', order: 'descending'}"
        border
        class="addArr">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号">
          <template slot-scope="scope">
            <h6 :class="{addFail:addFailNum.indexOf(scope.$index)>=0}">{{scope.$index+1}}</h6>
          </template>
        </el-table-column>
        <el-table-column
          width="220px"
          label="名称">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" style="width: 190px;"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          width="180px"
          label="编号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.snumber"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          width="180px"
          label="计量等级">
          <template slot-scope="scope">
            <el-input v-model="scope.row.level"></el-input>
          </template>
        </el-table-column>
        <!--<el-table-column
          width="180px"
          label="在线状态">
          <template slot-scope="scope">
            <el-input v-model="scope.row.isonline"></el-input>
          </template>
        </el-table-column>-->
        <el-table-column
          width="180px"
          label="通讯编号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.comno"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          width="180px"
          label="出厂编号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productsn"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          width="180px"
          label="类型">
          <template slot-scope="scope">
            <el-input v-model="scope.row.category"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          width="180px"
          label="材质">
          <template slot-scope="scope">
            <el-input v-model="scope.row.material"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          width="180px"
          label="规格">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dimension"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          width="180px"
          label="口径"
          sortable>
          <template slot-scope="scope">
            <el-input v-model="scope.row.caliber"></el-input>
          </template>
        </el-table-column>
        <!--<el-table-column
          width="180px"
          label="用途类型">
          <template slot-scope="scope">
            <el-input v-model="scope.row.usage"></el-input>
          </template>
        </el-table-column>-->
        <el-table-column
          width="180px"
          label="地图标记">
          <template slot-scope="scope">
            <el-input v-model="scope.row.tag"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          width="180px"
          label="安装单位">
          <template slot-scope="scope">
            <el-input v-model="scope.row.setdepartement"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          width="180px"
          label="安装时间">
          <template slot-scope="scope">
            <el-input v-model="scope.row.setdatetime"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="生产厂家">
          <template slot-scope="scope">
            <el-input v-model="scope.row.producter"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          width="180px"
          label="备注">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-progress :percentage="progressData" color="#409eff" v-show="isShow"></el-progress>
      <span slot="footer" class="dialog-footer">
        <el-button @click="importDialog = false">取 消</el-button>
        <el-button type="primary" @click="importDataArr">确 定</el-button>
      </span>
    </el-dialog>
    <!--添加水表信息-->
    <el-dialog
      title="添加水表信息"
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
            <!--<el-form-item label="是否开启" prop="isopen">
              <el-switch
                v-model="value1"
                active-text="开启"
                inactive-text="关闭">
              </el-switch>
            </el-form-item>-->
            <!--<el-form-item label="是否在线" prop="isonline">
              <el-switch
                v-model="value"
                active-text="在线"
                inactive-text="掉线">
              </el-switch>
            </el-form-item>-->
            <el-form-item label="通讯编号" prop="comno">
              <el-input v-model="ruleForm.comno"></el-input>
            </el-form-item>
            <el-form-item label="出厂编号" prop="productsn">
              <el-input v-model="ruleForm.productsn"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="category">
              <el-input v-model="ruleForm.category"></el-input>
            </el-form-item>
            <el-form-item label="材质" prop="material">
              <el-input v-model="ruleForm.material"></el-input>
            </el-form-item>
            <el-form-item label="规格" prop="dimension">
              <el-input v-model="ruleForm.dimension"></el-input>
            </el-form-item>
          </div>
          <div class="col-xs-5">
            <el-form-item label="口径" prop="caliber">
              <el-input v-model="ruleForm.caliber"></el-input>
            </el-form-item>
           <!-- <el-form-item label="用途类型" prop="usage">
              <select-water-usage :titleName="titleName" :typeId="typeId" @change="changeUsage"></select-water-usage>
            </el-form-item>-->
            <el-form-item label="等级标记" prop="snumber">
              <el-input v-model="ruleForm.level"></el-input>
            </el-form-item>
            <el-form-item label="地图标记" prop="tag">
              <el-input v-model="ruleForm.tag"></el-input>
            </el-form-item>
            <el-form-item label="安装单位" prop="setdepartement">
              <el-input v-model="ruleForm.setdepartement"></el-input>
            </el-form-item>
            <el-form-item label="安装时间" prop="setdatetime">
              <el-input v-model="ruleForm.setdatetime"
                placeholder="请输入日期 如2019-01-01"></el-input>
            </el-form-item>
            <el-form-item label="生产厂家" prop="producter">
              <el-input v-model="ruleForm.producter"></el-input>
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
    <!--修改水表信息-->
    <el-dialog
      title="修改水表信息"
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
            <!--<el-form-item label="是否开启" prop="isopen">
              <el-switch
                v-model="value1"
                active-text="开启"
                inactive-text="关闭">
              </el-switch>
            </el-form-item>-->
            <!--<el-form-item label="是否在线" prop="isonline">
              <el-switch
                v-model="value"
                active-text="在线"
                inactive-text="掉线">
              </el-switch>
            </el-form-item>-->
            <el-form-item label="通讯编号" prop="comno">
              <el-input v-model="ruleForm.comno"></el-input>
            </el-form-item>
            <el-form-item label="出厂编号" prop="productsn">
              <el-input v-model="ruleForm.productsn"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="category">
              <el-input v-model="ruleForm.category"></el-input>
            </el-form-item>
            <el-form-item label="材质" prop="material">
              <el-input v-model="ruleForm.material"></el-input>
            </el-form-item>
            <el-form-item label="规格" prop="dimension">
              <el-input v-model="ruleForm.dimension"></el-input>
            </el-form-item>
          </div>
          <div class="col-xs-5">
            <el-form-item label="口径" prop="caliber">
              <el-input v-model="ruleForm.caliber"></el-input>
            </el-form-item>
            <!--<el-form-item label="用途类型" prop="usage">
              <select-water-usage :titleName="titleName" :typeId="typeId" @change="changeUsage"></select-water-usage>
            </el-form-item>-->
            <el-form-item label="等级标记" prop="snumber">
              <el-input v-model="ruleForm.level"></el-input>
            </el-form-item>
            <el-form-item label="地图标记" prop="tag">
              <el-input v-model="ruleForm.tag"></el-input>
            </el-form-item>
            <el-form-item label="安装单位" prop="setdepartement">
              <el-input v-model="ruleForm.setdepartement"></el-input>
            </el-form-item>
            <el-form-item label="安装时间" prop="setdatetime">
              <el-input v-model="ruleForm.setdatetime"
                        placeholder="请输入日期 如2019-01-01"></el-input>
            </el-form-item>
            <el-form-item label="生产厂家" prop="producter">
              <el-input v-model="ruleForm.producter"></el-input>
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
    <!--表格数据展示-->
    <div class="content">
      <div class="box">
        <div class="box-header bg-aqua">水表信息管理</div>
        <div class="box-body">
          <div class="row" style="margin-bottom:10px;">
            <div class="col-xs-5">
              <el-input placeholder="请输入内容" class="input-with-select" v-model="input" clearable>
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
            </div>
            <div class="col-xs-7" style="text-align: right;">
              <el-button-group style="margin-top:5px">
                <el-button size="medium" type="primary" icon="el-icon-plus" @click.stop="addMessage">添加水表</el-button>
                <el-button size="medium" type="primary" icon="el-icon-download" @click.stop="exportExcel">报表导出</el-button>
                <el-button size="medium" type="primary"  @click.stop="importDialog = true">批量导入</el-button>
                <el-button size="medium" type="primary" @click="showAll">全部水表</el-button>
              </el-button-group>
            </div>
          </div>
          <el-table
            size="mini"
            :data="tableData"
            stripe
            id="out-table"
            border>
            <el-table-column
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
              prop="name"
              width="150px"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="snumber"
              width="90px"
              label="编号">
            </el-table-column>
            <!--<el-table-column
              prop="isopen"
              label="是否开启">
              <template slot-scope="scope">
                <h6 style="color: green" v-if="scope.row.isopen">开启</h6>
                <h6 style="color: red" v-else>关闭</h6>
              </template>
            </el-table-column>-->
            <!--<el-table-column
              prop="isonline"
              label="是否在线">
              <template slot-scope="scope">
                <h6 style="color: green" v-if="scope.row.isonline">在线</h6>
                <h6 style="color: red" v-else>掉线</h6>
              </template>
            </el-table-column>-->
            <!--<el-table-column
              prop="status"
              label="状态">
            </el-table-column>-->
            <el-table-column
              prop="comno"
              width="85px"
              label="通讯编号">
            </el-table-column>
            <el-table-column
              prop="productsn"
              width="85px"
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
            <!--<el-table-column
              prop="usage"
              label="用途类型">
              <template slot-scope="scope">
                <h6 v-for="item in waterUsage" v-if="item.id == scope.row.usage">{{item.name}}</h6>
              </template>
            </el-table-column>-->
            <el-table-column
              prop="tag"
              width="100px"
              label="地图标记">
            </el-table-column>
            <el-table-column
              prop="setdepartement"
              label="安装单位">
            </el-table-column>
            <el-table-column
              prop="setdatetime"
              width="80px"
              label="安装时间">
            </el-table-column>
            <el-table-column
              prop="producter"
              label="生产厂家">
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
  import SelectWaterUsage from "../../commons/SelectWaterUsage";
  import UploadExcel from "../../commons/UploadExcel";

  export default {
    components: {
      UploadExcel,
      SelectWaterUsage
    },
    data(){
      return{
        flag:0,
        addFailNum:[],
        /*value:'',
        value1:'',*/
        waterUsage:[],
        typeId:'',
        titleName:'',
        importDialog:false,
        addDialog:false,
        editDialog:false,
        tableData:[],
        excelData:[],
        importData:[],
        progressData:0,
        isShow:false,
        show:false,
        input:'',
        select:'',
        currentPage:1,
        total:0,
        size:10,
        pages:0,
        ruleForm:{
          id:'',
          name:'',
          comno:'',
          level:'',
          snumber:'',
          productsn:'',
          category:'',
          material:'',
          caliber:'',
          /*isopen:'',
          isonline:'',
          usage:'',*/
          tag:'',
          dimension:'',
          setdepartement:'',
          setdatetime:'',
          producter:'',
          remark:''
        },
        //input校验
        rules:{
          name:[
            {required:true,message:'请输入水表名称',trigger:'blur'}
          ],
          /*snumber:[
            {required:true,message:'请输入水表编号',trigger:'blur'}
          ],*/
        }
      }
    },
    created(){
      this.refresh();
      //this.getAll();
    },
    methods:{
      showAll(){
        this.refresh();
        this.input = '';
      },

      /*选择水表用水类型*/
      changeUsage(params){
        this.ruleForm.usage = params.name ;
      },

      /*批量导入*/
      dateFormat(num,format,format1){
        const time = new Date((num-1)*24*3600*1000+1);
        time.setFullYear(time.getFullYear()-70);
        const year = time.getFullYear();
        const month = time.getMonth()+1;
        const date = time.getDate();
        const hour = time.getHours()-8;
        const minute = time.getMinutes() ;
        const second = time.getSeconds() ;
        return year+format+month+format+date+' '+(hour < 10 ? '0'+hour:hour)+format1+(minute < 10 ? '0'+minute : minute)+format1+(second <10 ? '0'+second:second);
      },
      handleSelectionChange(val){
        this.importData = val ;
      },
      getResult(data){
        let arr = [];
        data.map(v =>{
          let obj = {};
          obj.name = v['名称']
          obj.snumber = v['编号']
          obj.category = v['类型']
          obj.material = v['材质']
          obj.caliber = v['口径']
          obj.isonline = v['在线状态'] == '在线' ? '1': '0'
          obj.isopen = v['开启状态'] == '开' ? '1': '0'
          obj.status = 1 ;
          obj.usage = v['用途类型']
          obj.tag = v['地图标记']
          obj.maxquantity = v['日最大流量']
          obj.dimension = v['规格']
          obj.setdepartement = v['安装单位']
          obj.setdatetime = this.dateFormat(v['安装时间'],'-',':');
          obj.producter = v['生产厂家']
          arr.push(obj);
          this.excelData = arr ;
        })

      },
      importDataArr(){
        this.isShow = true ;
        this.addFailNum = [];
        let successNum = 0 ;
        let errorNum = 0 ;
        let length = this.importData.length ;
        if(length < 1){
          this.$alert('请在表格中勾选您要添加的行数据','提示');
          return ;
        }else{
          this.importData.forEach((item,index) => {
            let watermeter = this.qs.stringify(item);
            this.$api.waterMeterInf.addWaterMeter(watermeter).then(res => {
              let temp = this.progressData+Math.ceil(100/this.importData.length);
              this.progressData= temp > 100 ? 100 : temp;
              if(res.msg == 'ok'){
                successNum++
              }else{
                this.addFailNum.push(index);
              }
              if(this.progressData == 100){
                errorNum = length - successNum ;
                this.total = this.total+successNum ;
                this.currentPage = Math.ceil((this.total+successNum)/this.size);
                this.$confirm("添加完成，总共"+length+"条数据,添加成功"+successNum+"条,"+"添加失败"+errorNum+"条,是否继续添加？", '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(()=>{
                  this.refresh();
                  this.isShow = false ;
                  this.progressData = 0 ;
                }).catch(()=>{
                  this.refresh();
                  this.isShow = false ;
                  this.progressData = 0 ;
                  this.importDialog = false ;
                })
              }
            })
          })
        }
      },

      /*导出表格*/
      exportExcel () {
        /* generate workbook object from table */
        var wb = this.xlsx.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        var wbout = this.xlsx.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          this.fileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '水表信息.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      },

      //获取所有用水类型
      getAll(){
        this.$api.waterUsage.findAll().then(res => {
          this.waterUsage = res ;
        })
      },

      //刷新表格
      refresh(){
        var params = {
          pageNum : this.currentPage,
          pageSize : this.size
        };
        this.$api.waterMeterInf.findPage(params).then(res => {
          this.tableData = res.list ;
          this.total = res.total ;
          this.pages = res.pages ;
          this.flag = 0 ;
        })
      },

      /*点击添加水表按钮触发事件*/
      addMessage(){
        this.addDialog = true;
        this.ruleForm.name = '';
        this.ruleForm.snumber = '';
        this.ruleForm.comno = '';
        this.ruleForm.level = '';
        this.ruleForm.category = '';
        this.ruleForm.material = '';
        this.ruleForm.caliber = '';
        this.ruleForm.productsn = '';
        /*this.ruleForm.isonline = '';
        this.ruleForm.usage = '';*/
        this.ruleForm.tag = '';
        /*this.ruleForm.maxquantity = '';*/
        this.ruleForm.dimension = '';
        this.ruleForm.setdepartement = '';
        this.ruleForm.setdatetime  = '';
        this.ruleForm.producter = '';
        /*this.ruleForm.status = '';*/
        this.ruleForm.remark = '';
        this.typeId='';
        //this.value = true ;
        //this.value1 = true ;
      },

      //添加信息
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.id = '';
            //this.ruleForm.isonline = this.value1 ? 1:0 ;
            //this.ruleForm.isopen = this.value ? 1:0 ;
            if(this.ruleForm.setdatetime !== ''){
              this.ruleForm.setdatetime = this.ruleForm.setdatetime + ' 00:00:00';
            }
            var watermeter = this.qs.stringify(this.ruleForm);
            this.$api.waterMeterInf.addWaterMeter(watermeter).then(res => {
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

      //点击修改按钮触发事件
      handleEdit:function (index,row) {
        this.$api.waterMeterInf.findOne(row.id).then(res => {
          /*this.waterUsage.forEach((item ) =>{
            if(res.usage == item.name){
              this.typeId = res.usage ;
            }
          });
          this.value = res.isonline ;
          this.value1 = res.isopen ;*/
          this.ruleForm = res;
        })
      },

      //修改信息
      editForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //this.ruleForm.isonline = this.value ? 1:0 ;
            //this.ruleForm.isopen = this.value1 ? 1:0 ;
            let watermeter = this.qs.stringify(this.ruleForm);
            this.$api.waterMeterInf.updateWaterMeter(watermeter).then(res => {
                if(res.msg === 'ok'){
                  this.editDialog = false;
                  this.$message({
                    type:'success',
                    message:'修改成功！'
                  });
                  if(this.flag == 0){
                    this.refresh();
                  }else{
                    this.search();
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

      //查询
      search(){
        let params = {
          pageNum : this.currentPage,
          pageSize : this.size,
          name : this.select,
          value : this.input
        };
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

      //删除单行信息
      handleDelete:function(index,row){
        this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.$api.waterMeterInf.deleteOne(row.id).then(res => {
              if(res.msg == 'ok'){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                if(this.total%this.size == 1 && this.currentPage == this.pages){
                  this.currentPage = this.pages - 1 ;
                }
                if(this.flag == 0){
                  this.refresh();
                }else{
                  this.search();
                }
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
  .input-with-select {
    width:400px;
    margin-bottom: 5px;
  }
  .el-select {
    width:110px;
  }
  input[type=file] {
    display:none ;
  }
</style>
