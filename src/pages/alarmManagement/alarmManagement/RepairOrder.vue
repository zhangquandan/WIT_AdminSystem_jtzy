<!--漏损维修出单-->
<template>
  <div>
    <el-dialog
      class="survey-dialog"
      top="15vh"
      :visible.sync="repairOrderVisible"
      :modal-append-to-body="false"
      width="700px"
      :before-close="handleClose">
      <div class="repair-order">
        <div class="top-header">漏损勘察出单</div>
        <div class="top-body">
          <table class="order-top" border="1" width="100%">
            <tr>
              <td>编号</td>
              <td>{{tableData.id}}</td>
              <td>转派时间</td>
              <td>{{tableData.transferTime}}</td>
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
              <el-form-item label="故障简况" style="width: 100%;" prop="explain">
                <el-input v-model="ruleForm.explain" :rows="5" class="long" type="textarea"></el-input>
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
              <el-form-item label="管道材质" prop="material">
                <el-input v-model="ruleForm.material" class="short" clearable></el-input>
              </el-form-item>
              <el-form-item label="管径(mm)" prop="caliber">
                <el-input v-model="ruleForm.caliber" class="short" clearable></el-input>
              </el-form-item>
            </div>
            <div class="bottom-first">
              <el-form-item label="路面结构" prop="structure">
                <el-input v-model="ruleForm.structure" class="short" clearable></el-input>
              </el-form-item>
              <el-form-item label="管顶埋深(m)" prop="setDepth">
                <el-input v-model="ruleForm.setDepth" class="short" clearable></el-input>
              </el-form-item>
            </div>
            <div class="bottom-first">
              <el-form-item label="漏水部位" prop="position">
                <el-input v-model="ruleForm.position" class="short" clearable></el-input>
              </el-form-item>
              <el-form-item label="漏水估量(吨/天)" prop="estimate">
                <el-input v-model="ruleForm.estimate" class="short" clearable></el-input>
              </el-form-item>
            </div>
            <div class="bottom-first">
              <el-form-item label="漏损简析" prop="leakExplain">
                <el-input v-model="ruleForm.leakExplain" class="short" clearable></el-input>
              </el-form-item>
              <el-form-item label="处理结果" prop="disposalOpinion">
                <el-select v-model="ruleForm.disposalOpinion" class="short">
                  <el-option label="已修复" value="1"></el-option>
                  <el-option label="未修复" value="0"></el-option>
                </el-select>
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
            <!--div class="bottom-first">
              <div>备注：&emsp;&emsp;&nbsp;<el-input v-model="value" class="short"></el-input></div>
            </div>-->
            <el-form-item label="备注" prop="remark">
              <el-input v-model="ruleForm.remark" class="remark" clearable></el-input>
            </el-form-item>
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
      name: "repair-order",
      data() {
        return {
          repairOrderVisible: false,
          oldImageUrl: '',
          newImageUrl: '',
          tableData: {},
          value: '',
          id: '',
          ruleForm: {
            disposalDepartment: '', // 转派处理单位
            telephone: '',  // 转派联系电话
            explain: '',  // 维修简况说明
            oldImage: '', // 维修前照片
            newImage: '',  // 维修后照片
            material: '', // 管道材质
            caliber: '',  // 管径
            position: '', // 漏水部位
            structure: '',  //路面结构
            setDepth: '', //管顶埋深
            estimate: '', //漏水估量
            leakExplain: '',  //漏损简析说明
            disposalOpinion: '',  //处理意见
            disposaler: '', // 出单人
            disposalTime: '', //回单时间
            remark: '', // 备注
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
            material: [
              {required: true, message: '请输入管道材质', trigger: 'blur'},
            ],
            caliber: [
              {required: true, message: '请输入管径', trigger: 'blur'},
            ],
            position: [
              {required: true, message: '请输入漏水部位', trigger: 'blur'},
            ],
            structure: [
              {required: true, message: '请输入路面结构', trigger: 'blur'},
            ],
            setDepth: [
              {required: true, message: '请输入管顶埋深', trigger: 'blur'},
            ],
            estimate: [
              {required: true, message: '请输入漏水估量', trigger: 'blur'},
            ],
            leakExplain: [
              {required: true, message: '请输入漏损简析说明', trigger: 'blur'},
            ],
            disposalOpinion: [
              {required: true, message: '请选择处理意见', trigger: 'blur'},
            ],
            disposaler: [
              {required: true, message: '请输入出单人姓名', trigger: 'blur'},
            ],
            disposalTime: [///^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
              {required: true, message: '请输入回单时间', trigger: 'blur'},
              {pattern:'^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$',message:'请按正确的时间格式填写',trigger:['blur']},
            ],
          }
        }
      },
      created() {
        this.ruleForm.disposaler = this.userName;
      },
      props: {
        repairOrderFlag: {
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
        repairOrderFlag: {
          handler(newValue,oldValue) {
            this.repairOrderVisible = newValue;
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
            disposalDepartment: '', // 转派处理单位
            telephone: '',  // 转派联系电话
            explain: '',  // 维修简况说明
            oldImage: '', // 维修前照片
            newImage: '',  // 维修后照片
            material: '', // 管道材质
            caliber: '',  // 管径
            position: '', // 漏水部位
            structure: '',  //路面结构
            setDepth: '', //管顶埋深
            estimate: '', //漏水估量
            leakExplain: '',  //漏损简析说明
            disposalOpinion: '',  //处理意见
            disposaler: this.ruleForm.disposaler, // 出单人
            disposalTime: '', //回单时间
            remark: '', // 备注
          }
        },
        getAlarmInf() {
          this.$api.alarm.transferDispatch({alarmCode: this.id}).then(res => {
            this.ruleForm.id = res.data.id;
            this.tableData = res.data;
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
              this.$emit('changeRepairOrder',{repairOrderFlag: false})
              done();
            })
            .catch(_ => {});
        },
        /*取消*/
        cancelClick() {
          this.$emit('changeRepairOrder',{repairOrderFlag: false})
        },
        /*确定*/
        defineClick(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let fm = this.ruleForm;
              let fd = new FormData();
              fd.append('id', fm.id);
              fd.append('disposalDepartment', fm.disposalDepartment);
              fd.append('telephone', fm.telephone);
              fd.append('explain', fm.explain);
              fd.append('oldImage', fm.oldImage);
              fd.append('newImage', fm.newImage);
              fd.append('material', fm.material);
              fd.append('caliber', fm.caliber);
              fd.append('position', fm.position);
              fd.append('structure', fm.structure);
              fd.append('setDepth', fm.setDepth);
              fd.append('estimate', fm.estimate);
              fd.append('leakExplain', fm.leakExplain);
              fd.append('disposalOpinion', fm.disposalOpinion);
              fd.append('disposaler', fm.disposaler);
              fd.append('disposalTime', fm.disposalTime);
              fd.append('remark', fm.remark);
              this.$api.alarm.addAlarmTransferDisposal(fd).then(res => {
                if(res.status == 200) {
                  this.$message({
                    type: 'success',
                    message: '处理成功！'
                  })
                  this.$emit('changeRepairOrder',{repairOrderFlag: false,type: 1})
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
        /*维修前*/
        oldHandleChange(file, fileList) {
          this.oldImageUrl = URL.createObjectURL(file.raw);
          this.ruleForm.oldImage = file.raw;
        },
        /*维修后*/
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
  .repair-order {height: 1000px;width: 700px;display: flex;flex-flow: column;}
  .top-header,.bottom-header {padding: 10px 0px 10px 10px;width: 100%;background: deepskyblue;}
  .top-body{flex: 1;border: 1px solid deepskyblue;padding: 10px;display: flex;align-items: center;}
  .bottom-body {flex: 4;border: 1px solid deepskyblue;padding: 10px;}
  .el-form {height: 100%;display: flex;flex-flow: column;align-items: center;justify-content: space-evenly;}
  .order-top {height: 100%;}
  .order-top tr {text-align: center;}
  .order-top td {width: 170px;}
  .order-top td[colspan="3"] {width: 510px;}
  .bottom-first {width: 100%;display: inline-flex;}
  .bottom-third {width: 100%;display: inline-flex;}
  .bottom-first .el-form-item {width: 50%; text-align: center;}
  .bottom-third {width: 100%;display: inline-flex;justify-content: center;align-items: center;}
  .bottom-third .el-form-item {width: 100%;text-align: center;}
  .bottom-fourth {width: 100%;display: inline-flex;}
  .bottom-fourth .el-form-item {width: 50%;text-align: center;}
  .bottom-first .short {width: 180px;}
  .bottom-second .long {width: 180px;height: 50px;}
  .bottom-third .long {width: 520px;}
  img {height: 110px;width: 180px;}
  .remark {width: 520px;}
  .el-form-item {margin-bottom: 0px;}
</style>
