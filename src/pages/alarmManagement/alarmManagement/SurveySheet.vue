<!--漏损勘察出单-->
<template>
  <div>
    <el-dialog
      class="survey-dialog"
      top="15vh"
      :visible.sync="sheetVisible"
      :modal-append-to-body="false"
      width="700px"
      :before-close="handleClose">
      <div class="sheet-table">
        <div class="top-header">漏损勘察出单</div>
        <div class="top-body">
          <table class="sheet-top" border="1" width="100%">
            <tr>
              <td>编号</td>
              <td>{{tableData.id}}</td>
              <td>报警时间</td>
              <td>{{tableData.alarmTime}}</td>
            </tr>
            <tr>
              <td>报警地址</td>
              <td colspan="3">{{tableData.address}}</td>
            </tr>
            <tr>
              <td>报警类型</td>
              <td>{{tableData.category}}</td>
              <td>综合漏损指数</td>
              <td>{{tableData.leakageIndex}}</td>
            </tr>
            <tr>
              <td>隔周日用水量增量</td>
              <td>{{tableData.addTotal}}</td>
              <td>隔周最小流量增量</td>
              <td>{{tableData.addMin}}</td>
            </tr>
            <tr>
              <td>隔周日用水量增幅</td>
              <td>{{tableData.addRangeTotal}}</td>
              <td>隔周最小流量增幅</td>
              <td>{{tableData.addRangeMin}}</td>
            </tr>
            <tr>
              <td>派单单位</td>
              <td>{{tableData.dispatchDepartment}}</td>
              <td>派单人</td>
              <td>{{tableData.dispatcher}}</td>
            </tr>
            <tr>
              <td>指定执行人</td>
              <td>{{tableData.implementer}}</td>
              <td>派单时间</td>
              <td>{{tableData.dispatchTime}}</td>
            </tr>
          </table>
        </div>
        <div class="bottom-header">填写信息</div>
        <div class="bottom-body">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
            <div class="bottom-first">
              <el-form-item label="处理单位" prop="disposalDepartment">
                <el-input v-model="ruleForm.disposalDepartment" class="short" clearable></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="telephone">
                <el-input class="short" v-model="ruleForm.telephone" clearable></el-input>
              </el-form-item>
            </div>
            <div class="bottom-first">
              <el-form-item label="勘察类型" prop="leakageCategory">
                <el-select v-model="ruleForm.leakageCategory" class="short">
                  <el-option label="需勘察漏损" value="需勘察漏损"></el-option>
                  <el-option label="无需勘察" value="无需勘察"></el-option>
                  <el-option label="突发性增量用水或可处理长流水" value="突发性增量用水或可处理长流水"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="处理结果" prop="disposalOpinion">
                <el-select v-model="ruleForm.disposalOpinion" class="short">
                  <el-option label="无需转派" value="0"></el-option>
                  <el-option label="需转派" value="1"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="bottom-second">
              <el-form-item label="勘察简况" prop="explain">
                <el-input v-model="ruleForm.explain" :rows="5" class="long" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="简况照片" prop="image">
                <el-upload
                  class="avatar-uploader"
                  action=""
                  :show-file-list="false"
                  :on-change="handleChange"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </div>
            <div class="bottom-first">
              <el-form-item label="出单人" prop="disposaler">
                <el-input v-model="ruleForm.disposaler" class="short" disabled clearable></el-input>
              </el-form-item>
              <el-form-item label="回单时间" prop="disposalTime">
                  <el-input v-model="ruleForm.disposalTime" class="short">
                    <i slot="suffix" title="点击获取当前时间" @click="link" class="el-input__icon el-icon-search"></i>
                  </el-input>
              </el-form-item>
            </div>
            <div class="bottom-first">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="ruleForm.remark" class="remark" clearable></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelClick">取 消</el-button>
        <el-button type="primary" @click="defineClick('ruleForm')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      name: "survey-sheet",
      data() {
        return {
          tableData: {},
          sheetVisible: false,
          imageUrl: '',
          value: '',
          id: '',
          ruleForm: {
            disposalDepartment: '', //处理单位
            telephone: '',  //联系电话
            leakageCategory: '',  //勘探简况类型
            disposalOpinion: '',  //处理意见
            explain: '',  //故障简况说明
            disposaler: '', //出单人
            disposalTime: '', //处理时间
            remark: '', //备注
            image: null,
          },
          rules: {
            disposalDepartment: [
              {required: true, message: '请输入处理单位', trigger: 'blur'},
            ],
            telephone: [
              {required: true, message: '请输入联系电话', trigger: 'blur'},
            ],
            leakageCategory: [
              {required: true, message: '请选择勘探简况类型', trigger: 'blur'},
            ],
            disposalOpinion: [
              {required: true, message: '请选择处理意见', trigger: 'blur'},
            ],
            explain: [
              {required: true, message: '请输入勘探简况说明', trigger: 'blur'},
            ],
            disposaler: [
              {required: true, message: '请输入出单人姓名', trigger: 'blur'},
            ],
            disposalTime: [
              {required: true, message: '请输入处理时间', trigger: 'blur'},
            ],
            image: [
              {required: true, message: '请上传照片', trigger: 'blur'},
            ],
          }
        }
      },
      created() {
        this.ruleForm.disposaler = this.userName;
      },
      props: {
        sheetFlag: {
          type: Boolean,
          default: false,
        },
        alarmId: {
          type: String,
        },
        userName: {
          type: String,
        }
      },
      watch: {
        sheetFlag: {
          handler(newValue,oldValue) {
            this.sheetVisible = newValue;
          }
        },
        alarmId: {
          handler(newValue,oldValue) {
            console.log(newValue)
            if(newValue != '' && newValue != null) {
              this.clearForm();
              this.id = newValue;
              this.getAlarmInf();
            }
          }
        }
      },
      methods: {
        /*获取报警处理信息*/
        getAlarmInf() {
          this.$api.alarm.findDispath({id: this.id}).then(res => {
            let data = res.data;
            switch(data.category) {
              case '10': data.category = '水表漏损';
                break;
              case '20': data.category = '建筑漏损';
                break;
              case '30': data.category = 'DMA漏损';
                break;
              case '40': data.category = '校区漏损';
                break;
            }
            this.tableData = data;
            /*this.show = true;*/
          })
        },
        /*点击获取当前时间*/
        link() {
          let time = new Date();
          let yy = time.getFullYear();
          let mm = time.getMonth() + 1;
          mm = mm < 10 ? '0' + mm : mm;
          let dd = time.getDate();
          dd = dd < 10 ? '0' + dd : dd;
          let hh = time.getHours();
          hh = hh < 10 ? '0' + hh : hh;
          let mu = time.getMinutes();
          mu = mu < 10 ? '0' + mu : mu;
          let ss = time.getSeconds();
          ss = ss < 10 ? '0' + ss : ss;
          this.ruleForm.disposalTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mu + ':' + ss;
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              this.$emit('changeSheetDispatch',{sheetFlag: false})
              done();
            })
            .catch(_ => {});
        },
        /*清空fuleForm字段*/
        clearForm() {
          this.ruleForm =  {
              disposalDepartment: '', //处理单位
              telephone: '',  //联系电话
              leakageCategory: '',  //勘探简况类型
              disposalOpinion: '',  //处理意见
              explain: '',  //故障简况说明
              disposaler: this.ruleForm.disposaler, //出单人
              disposalTime: '', //处理时间
              remark: '', //备注
              image: null,
          }
        },
        /*取消*/
        cancelClick() {
          this.$emit('changeSheetDispatch',{sheetFlag: false})
        },
        /*确定*/
        defineClick(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.ruleForm.id = this.id;
              let fm = this.ruleForm;
              let fd = new FormData();
              fd.append('id', fm.id);
              fd.append('disposalDepartment', fm.disposalDepartment);
              fd.append('telephone', fm.telephone);
              fd.append('leakageCategory', fm.leakageCategory);
              fd.append('disposalOpinion', fm.disposalOpinion);
              fd.append('explain', fm.explain);
              fd.append('disposaler', fm.disposaler);
              fd.append('disposalTime', fm.disposalTime);
              fd.append('image', fm.image);
              fd.append('remark', fm.remark);
              /*let data = this.qs.stringify(this.ruleForm);*/
              this.$api.alarm.addLeakageDisposal(fd).then(res => {
                if(res.status == 200) {
                  this.$message({
                    type: 'success',
                    message: '处理成功！'
                  })
                  this.$emit('changeSheetDispatch',{sheetFlag: false,type: 1})
                }else {
                  this.$message({
                    type: 'error',
                    message: '你还没有开通此操作权限！'
                  })
                }
              })
            }else {
              return false;
            }
          })
        },
        /*上传图片*/
        handleChange(file, fileList) {
          this.imageUrl = URL.createObjectURL(file.raw);
          this.ruleForm.image = file.raw;
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        }
      },
    }
</script>

<style scoped>
  .sheet-table {height: 800px;width: 700px;display: flex;flex-flow: column;}
  .top-header,.bottom-header {padding: 10px 0px 10px 10px;width: 100%;background: deepskyblue;}
  .top-body{flex: 2;border: 1px solid deepskyblue;padding: 10px;display: flex;align-items: center;}
  .bottom-body {flex: 3;border: 1px solid deepskyblue;padding: 10px;}
  .el-form {height: 100%;display: flex;flex-flow: column;align-items: center;justify-content: space-evenly;}
  .el-form-item {margin-bottom: 0px;}
  .sheet-top {height: 100%;}
  .sheet-top tr {text-align: center;}
  .sheet-top td {width: 170px;}
  .sheet-top td[colspan="3"] {width: 510px;}
  .bottom-first {width: 100%;display: inline-flex;}
  .bottom-second {width: 100%;display: inline-flex;}
  .bottom-first el-form-item:last-child {margin-left: 100px;}
  .bottom-second el-form-item:last-child {margin-left: 100px;}
  .bottom-first .short {width: 220px;}
  .bottom-second .long {width: 220px;}
  img {height: 110px;width: 180px;}
  .el-form-item__label {width: 140px;}

</style>
