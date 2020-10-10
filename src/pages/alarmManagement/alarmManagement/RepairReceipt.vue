<!--漏损维修回单-->
<template>
  <div>
    <el-dialog
      class="survey-dialog"
      top="5vh"
      :visible.sync="repairReceiptVisible"
      :modal-append-to-body="false"
      width="660px"
      :before-close="handleClose">
      <div class="receipt-table">
        <div class="top-header">漏损维修回单</div>
        <div class="top-body">
          <table class="receipt-top" border="1" width="100%">
            <tr>
              <td colspan="2">编号</td>
              <td colspan="2">{{tableData.alarmCode}}</td>
              <td colspan="2">转派时间</td>
              <td colspan="2">{{tableData.transferTime}}</td>
            </tr>
            <tr>
              <td colspan="2">维修地址</td>
              <td colspan="6">{{tableData.address}}</td>
            </tr>
            <tr>
              <td>派单单位</td>
              <td colspan="2">{{tableData.dispatchDepartment}}</td>
              <td>派单人</td>
              <td>{{tableData.dispatcher}}</td>
              <td>派单时间</td>
              <td colspan="2">{{tableData.dispatchTime}}</td>
            </tr>
            <tr>
              <td>指定执行人</td>
              <td>{{tableData.implementer}}</td>
              <td>处理单位</td>
              <td colspan="2">{{tableData.disposalDepartment}}</td>
              <td>联系电话</td>
              <td colspan="2">{{tableData.telephone}}</td>
            </tr>
            <tr>
              <td colspan="2">维修简况说明</td>
              <td colspan="6">{{tableData.explain}}</td>
            </tr>
            <tr>
              <td colspan="4">维修前照片</td>
              <td colspan="4">维修后照片</td>
            </tr>
            <tr class="pic">
              <td colspan="4"><img :src="tableData.oldImage" class="image_type"/></td>
              <td colspan="4"><img :src="tableData.newImage" class="image_type"/></td>
            </tr>
            <tr>
              <td>管道材质</td>
              <td>{{tableData.material}}</td>
              <td colspan="2">管径(mm)</td>
              <td>{{tableData.caliber}}</td>
              <td colspan="2">漏水部位</td>
              <td>{{tableData.position}}</td>
            </tr>
            <tr>
              <td>路面结构</td>
              <td>{{tableData.structure}}</td>
              <td colspan="2">管顶埋深(m)</td>
              <td>{{tableData.setDepth}}</td>
              <td colspan="2">漏水估量(吨/天)</td>
              <td>{{tableData.estimate}}</td>
            </tr>
            <tr>
              <td colspan="2">漏损简析</td>
              <td colspan="6">{{tableData.leakExplain}}</td>
            </tr>
            <tr>
              <td>处理结果</td>
              <td>{{tableData.disposalOpinion ? '已修复' : '未修复'}}</td>
              <td colspan="2">出单人</td>
              <td>{{tableData.disposaler}}</td>
              <td>回单时间</td>
              <td colspan="2">{{tableData.disposalTime}}</td>
            </tr>
            <tr>
              <td colspan="2">备注</td>
              <td colspan="6">{{tableData.remark}}</td>
            </tr>
          </table>
        </div>
        <div class="bottom-header">填写信息</div>
        <div class="bottom-body">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
            <div>
              <el-form-item label="验收意见" prop="checkOpinion">
                <el-select size="mini" v-model="ruleForm.checkOpinion" placeholder="" clearable>
                  <el-option label="同意" value="1"></el-option>
                  <el-option label="不同意" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="验收人" prop="checker">
                <el-input size="mini" v-model="ruleForm.checker" placeholder="" disabled></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="验收时间" prop="checkTime">
                <el-input size="mini" v-model="ruleForm.checkTime">
                  <i slot="suffix" title="点击获取当前时间" @click="link" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input size="mini" v-model="ruleForm.remark" placeholder="请输入内容" clearable></el-input>
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
      name: "repair-receipt",
      data() {
        return {
          repairReceiptVisible: false,
          value: '',
          id: '',
          tableData: {},
          ruleForm: {
            checkOpinion: '', // 验收意见
            checker: '',  // 验收人
            checkTime: '',  // 验收时间
            remark: '', // 备注
          },
          rules: {
            checkOpinion: [
              {required: true, message: '请选择验收意见', trigger: 'blur'},
            ],
            checker: [
              {required: true, message: '请输入验收人姓名', trigger: 'blur'},
            ],
            checkTime: [///^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
              {required: true, message: '请输入验收时间', trigger: 'blur'},
              {pattern:'^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$',message:'请按正确的时间格式填写',trigger:['blur']},
            ],
          }
        }
      },
      created() {
        this.ruleForm.checker = this.userName;
      },
      props: {
        repairReceiptFlag: {
          type: Boolean,
          default: false
        },
        alarmId: {
          type: String,
        },
        userName: {
          type: String,
        }
      },
      watch: {
        repairReceiptFlag: {
          handler(newValue,oldValue) {
            this.repairReceiptVisible = newValue;
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
            checkOpinion: '', // 验收意见
              checker: this.ruleForm.checker,  // 验收人
              checkTime: '',  // 验收时间
              remark: '', // 备注
          }
        },
        getAlarmInf() {
          this.$api.alarm.transferDispatch({alarmCode: this.id}).then(res => {
            let data = res.data;
            data.oldImage = "data:image/jpg;base64,"+data.oldImage;
            data.newImage = "data:image/jpg;base64,"+data.newImage;
            this.ruleForm.id = res.data.id;
            this.tableData = data;
          })
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              this.$emit('changeRepairReceipt',{repairReceiptFlag: false})
              done();
            })
            .catch(_ => {});
        },
        /*取消*/
        cancelClick() {
          this.$emit('changeRepairReceipt',{repairReceiptFlag: false})
        },
        /*确定*/
        defineClick(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let data = this.qs.stringify(this.ruleForm);
              this.$api.alarm.updateAlarmTransferDispatch(data).then(res => {
                if(res.status == 200) {
                  this.$message({
                    type: 'success',
                    message: '处理成功！'
                  })
                  this.$emit('changeRepairReceipt',{repairReceiptFlag: false,type: 1})
                }else {
                  this.$message({
                    type: 'error',
                    message: '你还没有开通此操作权限或是时间格式不对！'
                  })
                }
              })
            }else {
              return false;
            }
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
          this.ruleForm.checkTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mu + ':' + ss;
        }
      },
    }
</script>

<style scoped>
  .receipt-table {height: 800px;width: 660px;display: flex;flex-flow: column;}
  .top-header,.bottom-header {padding: 10px 0px 10px 10px;width: 100%;background: deepskyblue;}
  .top-body{flex: 5;border: 1px solid deepskyblue;padding: 10px;display: flex;align-items: center;}
  .bottom-body {flex: 1;border: 1px solid deepskyblue;padding: 10px;}
  .el-form {height: 100%;display: flex;flex-flow: column;align-items: center;justify-content: space-evenly;}
  .el-form > div {width:100%;display: inline-flex;justify-content: space-evenly;align-items: center;}
  .receipt-top {height: 100%;}
  .receipt-top tr {text-align: center;}
  .receipt-top td {width: 80px;}
  .receipt-top td[colspan="2"] {width: 160px;}
  .receipt-top td[colspan="3"] {width: 240px;}
  .receipt-top td[colspan="6"] {width: 480px;}
  .pic td {height: 150px;}
  img {height: 90%;width:90%;}
  .el-form-item {margin-bottom: 0px;}
  .el-input {width: 180px;}
</style>
