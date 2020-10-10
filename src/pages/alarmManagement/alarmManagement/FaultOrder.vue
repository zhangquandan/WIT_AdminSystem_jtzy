<!--故障处理出单-->
<template>
  <div>
    <el-dialog
      class="survey-dialog"
      top="15vh"
      :visible.sync="faultOrderVisible"
      :modal-append-to-body="false"
      width="700px"
      :before-close="handleClose">
      <div class="fault-order">
        <div class="top-header">故障处理出单</div>
        <div class="top-body">
          <table class="fault-top" border="1" width="100%">
            <tr>
              <td>编号</td>
              <td>{{tableData.id}}</td>
              <td>报警时间</td>
              <td>{{tableData.alarmTime}}</td>
            </tr>
            <tr>
              <td>维修地址</td>
              <td colspan="3">{{tableData.address}}</td>
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
            <div class="bottom-third">
              <el-form-item label="故障简况说明" prop="explain">
                <el-input v-model="ruleForm.explain" :rows="3" class="long" type="textarea"></el-input>
              </el-form-item>
            </div>
            <div class="bottom-fourth">
              <el-form-item label="维修前照片" prop="oldImage">
                <el-upload
                  class="avatar-uploader"
                  action=""
                  :show-file-list="false"
                  :on-change="oldHandleChange"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="oldImageUrl" :src="oldImageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="维修后照片" prop="newImage">
                <el-upload
                  class="avatar-uploader"
                  action=""
                  :show-file-list="false"
                  :on-change="newHandleChange"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="newImageUrl" :src="newImageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </div>
            <div class="bottom-first">
              <el-form-item label="出单人" prop="disposaler">
                <el-input v-model="ruleForm.disposaler" class="short" disabled></el-input>
              </el-form-item>
              <el-form-item label="回单时间" prop="disposalTime">
                <el-input v-model="ruleForm.disposalTime" class="short">
                  <i slot="suffix" title="点击获取当前时间" @click="link" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-form-item>
            </div>
            <div class="bottom-first">
              <el-form-item label="处理结果" prop="disposalOpinion">
                <el-select v-model="ruleForm.disposalOpinion" class="short">
                  <el-option label="正常" value="1"></el-option>
                  <el-option label="异常" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注" prop="dispatchDepartment">
                <el-input v-model="ruleForm.remark" class="short" clearable></el-input>
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
      name: "fault-order",
      data() {
        return {
          faultOrderVisible: false,
          oldImageUrl: '',
          newImageUrl: '',
          value: '',
          id: '',
          tableData: {},
          ruleForm: {
            disposalDepartment: '',
            telephone: '',
            explain: '',
            oldImage: '',
            newImage: '',
            disposalOpinion: '',
            disposaler: '',
            disposalTime: '',
            remark: '',
          },
          rules: {
            disposalDepartment: [
              {required: true, message: '请输入处理单位', trigger: 'blur'},
            ],
            telephone: [
              {required: true, message: '请输入处理单位联系电话', trigger: 'blur'},
            ],
            explain: [
              {required: true, message: '请输入维修简况说明', trigger: 'blur'},
            ],
            oldImage: [
              {required: true, message: '请上传维修前照片', trigger: 'blur'},
            ],
            newImage: [
              {required: true, message: '请上传维修后照片', trigger: 'blur'},
            ],
            disposalOpinion: [
              {required: true, message: '请选择处理意见', trigger: 'blur'},
            ],
            disposaler: [
              {required: true, message: '请输入出单人姓名', trigger: 'blur'},
            ],
            disposalTime: [
              {required: true, message: '请输入处理时间', trigger: 'blur'},
            ],
          }
        }
      },
      created() {
        this.ruleForm.disposaler = this.userName;
      },
      props: {
        faultOrderFlag: {
          type: Boolean,
          default: false,
        },
        alarmId: {
          type: String
        },
        userName: {
          type: String,
        }
      },
      watch: {
        faultOrderFlag: {
          handler(newValue,oldValue) {
            this.faultOrderVisible = newValue;
          }
        },
        alarmId: {
          handler(newValue,oldValue) {
            if(newValue != '' && newValue != null) {
              this.clearForm();
              this.id = newValue;
              this.getAlarmInf();
            }
          }
        }
      },
      methods: {
        clearForm() {
          this.ruleForm = {
            disposalDepartment: '',
              telephone: '',
              explain: '',
              oldImage: '',
              newImage: '',
              disposalOpinion: '',
              disposaler: this.ruleForm.disposaler,
              disposalTime: '',
              remark: '',
          }
        },
        getAlarmInf() {
          this.$api.alarm.findDispath({id: this.id}).then(res => {
            let data = res.data;
            data.category = '设备故障';
            this.tableData = data;
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
              this.$emit('changeFaultOrder',{faultOrderFlag: false})
              done();
            })
            .catch(_ => {});
        },
        /*取消*/
        cancelClick() {
          this.$emit('changeFaultOrder',{faultOrderFlag: false})
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
              fd.append('explain', fm.explain);
              fd.append('oldImage', fm.oldImage);
              fd.append('newImage', fm.newImage);
              fd.append('disposalOpinion', fm.disposalOpinion);
              fd.append('disposaler', fm.disposaler);
              fd.append('disposalTime', fm.disposalTime);
              fd.append('remark', fm.remark);
              this.$api.alarm.addDeviceDisposal(fd).then(res => {
                if(res.status == 200) {
                  this.$message({
                    type: 'success',
                    message: '处理成功！'
                  })
                  this.$emit('changeFaultOrder',{faultOrderFlag: false,type: 1})
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
        /*维修前照片*/
        oldHandleChange(file, fileList) {
          this.oldImageUrl = URL.createObjectURL(file.raw);
          this.ruleForm.oldImage = file.raw;
        },
        /*维修后照片*/
        newHandleChange(file, fileList) {
          this.newImageUrl = URL.createObjectURL(file.raw);
          this.ruleForm.newImage = file.raw;
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
  .fault-order {height: 800px;width: 700px;display: flex;flex-flow: column;}
  .top-header,.bottom-header {padding: 10px 0px 10px 10px;width: 100%;background: deepskyblue;}
  .top-body{flex: 1;border: 1px solid deepskyblue;padding: 10px;display: flex;align-items: center;}
  .bottom-body {flex: 3;border: 1px solid deepskyblue;padding: 10px;}
  .el-form {height: 100%;display: flex;flex-flow: column;align-items: center;justify-content: space-evenly;}
  .fault-top {height: 100%;}
  .fault-top tr {text-align: center;}
  .fault-top td {width: 170px;}
  .fault-top td[colspan="3"] {width: 510px;}
  .bottom-first {width: 100%;display: inline-flex;}
  .bottom-second {width: 100%;display: inline-flex;}
  .bottom-third {width: 100%;display: inline-flex;}
  .bottom-third .el-form-item {width: 100%;text-align: center;}
  .bottom-fourth {width: 100%;display: inline-flex;}
  .bottom-fourth .el-form-item {width: 50%;text-align: center;}
  .bottom-first div {width: 50%; text-align: center;}
  .bottom-second div {width: 50%;display: inline-flex;justify-content: center;align-items: center;}
  /*.bottom-third .el-form-item {width: 100%;display: inline-flex;justify-content: center;align-items: center;}*/
  .bottom-first .short {width: 180px;}
  .bottom-second .long {width: 180px;height: 50px;}
  .bottom-third .long {width: 520px;height: 80px;}
  img {height: 110px;width: 180px;}
</style>
