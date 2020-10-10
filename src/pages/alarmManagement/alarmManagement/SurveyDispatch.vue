<!--勘察派单-->
<template>
  <div>
    <el-dialog
      class="survey-dialog"
      top="15vh"
      :visible.sync="dispatchVisible"
      :modal-append-to-body="false"
      width="580px"
      :before-close="handleClose">
      <div class="dispatch-table">
        <div class="top-header">漏损勘察派单</div>
        <div class="top-body">
          <table v-if="show" class="dispatch-top" border="1" width="100%">
            <tr>
              <td>报警编号</td>
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
              <td>{{tableData.addRangeTotal}}</td>
            </tr>
            <tr>
              <td>隔周日用水量增幅</td>
              <td>{{tableData.addMin}}</td>
              <td>隔周最小流量增幅</td>
              <td>{{tableData.addRangeMin}}</td>
            </tr>
          </table>
        </div>
        <div class="bottom-header">填写信息</div>
        <div class="bottom-body">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
          <!--<div>派单单位: &emsp;<el-input size="mini" v-model="dispatchDepartment" placeholder="请输入派单单位" clearable></el-input></div>
          <div>派单人:&emsp;&emsp; <el-input size="mini" v-model="dispatcher" placeholder="请输入派单人" clearable></el-input></div>
          <div>指定执行人: <el-input size="mini" v-model="implementer" placeholder="请输入指定执行人" clearable></el-input></div>
          <div>派单时间: &emsp;<el-input size="mini" v-model="dispatchTime" clearable>
            <i slot="suffix" title="点击获取当前时间" @click="link" class="el-input__icon el-icon-search"></i>
          </el-input></div>-->
            <el-form-item label="派单单位" prop="dispatchDepartment">
              <el-input v-model="ruleForm.dispatchDepartment" clearable></el-input>
            </el-form-item>
            <el-form-item label="派单人" prop="dispatcher">
              <el-input v-model="ruleForm.dispatcher" disabled></el-input>
            </el-form-item>
            <el-form-item label="指定执行人" prop="implementer">
              <el-input v-model="ruleForm.implementer" clearable></el-input>
            </el-form-item>
            <el-form-item label="派单时间" prop="dispatchTime">
              <el-input v-model="ruleForm.dispatchTime" placeholder="时间格式(例：2020-05-28 17:54:23)">
                <i slot="suffix" title="点击获取当前时间" @click="link" class="el-input__icon el-icon-search"></i>
              </el-input>
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
      name: "survey-dispatch",
      data() {
        return {
          ruleForm: {
            dispatchDepartment: '',
            dispatcher: '',
            implementer: '',
            dispatchTime: '',
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
          },
          dispatchVisible: false,
          tableData: {},
          id: '',
          show: false,
        }
      },
      created() {
        this.ruleForm.dispatcher = this.userName;
      },
      props: {
        dispatchFlag: {
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
        dispatchFlag: {
          handler(newValue,oldValue) {
            this.dispatchVisible = newValue;
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
        },
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
            this.show = true;
          })
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              this.$emit('changeSurveyDispatch',{dispatchFlag: false})
              done();
            })
            .catch(_ => {});
        },
        /*清空ruleForm*/
        clearForm() {
          this.ruleForm = {
            dispatchDepartment: '',
            dispatcher: this.ruleForm.dispatcher,
            implementer: '',
            dispatchTime: '',
          }
        },
        /*取消*/
        cancelClick() {
          this.$emit('changeSurveyDispatch',{dispatchFlag: false})
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
                  this.$emit('changeSurveyDispatch',{dispatchFlag: false,type: 1})
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
  .dispatch-table {height: 600px;width: 580px;display: flex;flex-flow: column;}
  .top-header,.bottom-header {padding: 10px 0px 10px 10px;width: 100%;background: deepskyblue;}
  .top-body{flex: 1;border: 1px solid deepskyblue;padding: 10px;display: flex;align-items: center;}
  .bottom-body {flex: 1;border: 1px solid deepskyblue;padding: 10px;}
  .demo-ruleForm {height: 100%;display: flex;flex-flow: column;align-items: center;justify-content: space-evenly;}
  .el-form-item {margin-bottom: 0px;}
  .dispatch-top {height: 100%;}
  .dispatch-top tr {text-align: center;}
  .dispatch-top td {width: 140px;}
  .dispatch-top td[colspan="3"] {width: 420px;}
  .el-input {width: 260px;}
</style>
