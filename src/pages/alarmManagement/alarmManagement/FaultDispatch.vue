<!--故障处理派单-->
<template>
  <div>
    <el-dialog
      class="survey-dialog"
      top="15vh"
      :visible.sync="faultDispatchVisible"
      :modal-append-to-body="false"
      width="580px"
      :before-close="handleClose">
      <div class="fault-dispatch">
        <div class="top-header">故障处理派单</div>
        <div class="top-body">
          <table class="fault-top" border="1" width="100%">
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
              <td colspan="3">{{tableData.category}}</td>
            </tr>
            <!--<tr>
              <td>故障简述</td>
              <td colspan="3">{{tableData.explain}}</td>
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
            </tr>-->
          </table>
        </div>
        <div class="bottom-header">填写信息</div>
        <div class="bottom-body">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
            <div>
              <el-form-item label="派单单位" prop="dispatchDepartment">
                <el-input size="mini" v-model="ruleForm.dispatchDepartment" placeholder="" clearable></el-input>
              </el-form-item>
              <el-form-item label="派单人" prop="dispatcher">
                <el-input size="mini" v-model="ruleForm.dispatcher" placeholder="" disabled></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="派单时间" prop="dispatchTime">
                <el-input size="mini" v-model="ruleForm.dispatchTime">
                  <i slot="suffix" title="点击获取当前时间" @click="link" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="指定执行人" prop="implementer">
                <el-input size="mini" v-model="ruleForm.implementer" placeholder="" clearable></el-input>
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
      name: "fault-dispatch",
      data() {
        return {
          faultDispatchVisible: false,
          value: '',
          id: '',
          tableData: {},
          ruleForm: {
            dispatchDepartment: '',
            dispatcher: '',
            dispatchTime: '',
            implementer: '',
          },
          rules: {
            dispatchDepartment: [
              {required: true, message: '请输入派单单位', trigger: 'blur'},
            ],
            dispatcher: [
              {required: true, message: '请输入派单人', trigger: 'blur'},
            ],
            implementer: [
              {required: true, message: '请输入指定执行人', trigger: 'blur'},
            ],
            dispatchTime: [///^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
              {required: true, message: '请输入派单时间', trigger: 'blur'},
              {pattern:'^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$',message:'请按正确的时间格式填写',trigger:['blur']},
            ],
          }
        }
      },
      created() {
        this.ruleForm.dispatcher = this.userName;
      },
      props: {
        faultDispatchFlag: {
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
        faultDispatchFlag: {
          handler(newValue,oldValue) {
            this.faultDispatchVisible = newValue;
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
            dispatchDepartment: '',
            dispatcher: this.ruleForm.dispatcher,
            dispatchTime: '',
            implementer: '',
          }
        },
        getAlarmInf() {
          this.$api.alarm.findDispath({id: this.id}).then(res => {
            let data = res.data;
            data.category = '设备故障';
            this.tableData = data;
          })
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              this.$emit('changeFaultDispatch',{faultDispatchFlag: false})
              done();
            })
            .catch(_ => {});
        },
        /*取消*/
        cancelClick() {
          this.$emit('changeFaultDispatch',{faultDispatchFlag: false})
        },
        /*确定*/
        defineClick(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.ruleForm.id = this.id;
              let data = this.qs.stringify(this.ruleForm);
              this.$api.alarm.addDispatch(data).then(res => {
                if(res.status == 200) {
                  this.$message({
                    type: 'success',
                    message: '处理成功！'
                  })
                  this.$emit('changeFaultDispatch',{faultDispatchFlag: false,type: 1})
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
          this.ruleForm.dispatchTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mu + ':' + ss;
        }
      },
    }
</script>

<style scoped>
  .fault-dispatch {height: 400px;width: 580px;display: flex;flex-flow: column;}
  .top-header,.bottom-header {padding: 10px 0px 10px 10px;width: 100%;background: deepskyblue;}
  .top-body{flex: 2;border: 1px solid deepskyblue;padding: 10px;display: flex;align-items: center;}
  .bottom-body {flex: 2;border: 1px solid deepskyblue;padding: 10px;}
  .el-form {height: 100%;display: flex;flex-flow: column;align-items: center;justify-content: space-evenly;}
  .el-form > div {width:100%;display: inline-flex;justify-content: space-evenly;align-items: center;}
  .fault-top {height: 100%;}
  .fault-top tr {text-align: center;}
  .fault-top td {width: 140px;}
  .fault-top td[colspan="3"] {width: 420px;}
  .el-form-item {margin-bottom: 0px;}
  .el-input {width: 180px;}
</style>
