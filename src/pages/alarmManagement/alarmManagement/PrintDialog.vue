<template>
  <div>
    <el-dialog
      class="print-dialog"
      top="5vh"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="680px"
      height="900px"
      :before-close="handleClose">
      <div id="table-content">
        <leakage-survey :alarmId="id" v-if="status == 1"></leakage-survey>
        <maintenance-transfer :alarmId="id" v-if="status == 2"></maintenance-transfer>
        <troubleshooting :alarmId="id" v-if="status == 3"></troubleshooting>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelClick">取 消</el-button>
        <el-button type="primary" @click="printClick">打印</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import MaintenanceTransfer from "./MaintenanceTransfer";
  import Troubleshooting from "./Troubleshooting";
  import LeakageSurvey from "./LeakageSurvey";

  export default {
    components: {
      LeakageSurvey,
      Troubleshooting,
      MaintenanceTransfer},
    name: "print-dialog",
    data() {
      return {
        dialogVisible: false,
        id: '',
      }
    },
    props: {
      isOpen: {
        type: Boolean,
        default: false,
      },
      status: {
        type: Number,
      },
      alarmId: {
        type: String,
      }
    },
    watch: {
      isOpen: {
        handler(newValue,oldValue) {
          this.dialogVisible = newValue;
        }
      },
      alarmId: {
        handler(newValue,oldValue) {
          this.id = newValue;
        }
      },
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$emit('changePrint',{isOpen: false});
            done();
          })
          .catch(_ => {});
      },
        /*取消*/
        cancelClick() {
          this.$emit('changePrint',{isOpen: false})
        },
      /*打印*/
      printClick() {
        let wpt = document.getElementById('table-content');
        let newContent = wpt.innerHTML;
        let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        document.body.style.textAlign = "center";
        /*设置*/
        /*设置*/
        window.print(); //打印方法
        window.location.reload();
        document.body.innerHTML = oldContent;
      },
    },
  }
</script>

<style scoped>
  #table-content {width: 100%;height: 900px;text-align: center;}
</style>
