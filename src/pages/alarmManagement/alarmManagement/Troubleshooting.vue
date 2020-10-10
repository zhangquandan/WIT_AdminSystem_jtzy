<!--故障处理-->
<template>
  <table class="print-table">
    <tr class="first-row">
      <td colspan="8">故障处理单</td>
    </tr>
    <tr>
      <td colspan="2">编号</td>
      <td colspan="2">{{tableData.id}}</td>
      <td colspan="2">报警时间</td>
      <td colspan="2">{{tableData.alarmTime}}</td>
    </tr>
    <tr>
      <td colspan="2">报警地址</td>
      <td colspan="6">{{tableData.address}}</td>
    </tr>
    <tr>
      <td colspan="2">报警类型</td>
      <td colspan="6">{{tableData.category}}</td>
    </tr>
    <tr class="explain">
      <td colspan="2">故障简述</td>
      <td colspan="6">{{tableData.reportContent}}</td>
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
    <tr class="pic-title">
      <td colspan="4" class="top-left">维修前照片</td>
      <td colspan="4" class="top-right">维修后照片</td>
    </tr>
    <tr class="pic">
      <td colspan="4" class="bottom-left"><img :src="tableData.oldImage" class="image_type"/></td>
      <td colspan="4" class="bottom-right"><img :src="tableData.newImage" class="image_type"/></td>
    </tr>
    <tr>
      <td>处理结果</td>
      <td>{{tableData.disposalOpinion ? '正常' : '异常'}}</td>
      <td>出单人</td>
      <td>{{tableData.disposaler}}</td>
      <td>回单时间</td>
      <td colspan="3">{{tableData.disposalTime}}</td>
    </tr>
    <tr>
      <td>验收意见</td>
      <td>{{tableData.checkOpinion ? '同意' : '不同意'}}</td>
      <td>验收人</td>
      <td>{{tableData.checker}}</td>
      <td>验收时间</td>
      <td colspan="3">{{tableData.checkTime}}</td>
    </tr>
    <tr>
      <td colspan="2">处理状态</td>
      <td colspan="6">{{tableData.status}}</td>
    </tr>
    <tr>
      <td colspan="2">备注</td>
      <td colspan="6">{{tableData.remark}}</td>
    </tr>
  </table>
</template>

<script>
    export default {
      name: "troubleshooting",
      data() {
        return {
          tableData: {},
          id: {}
        }
      },
      mounted() {
        this.id = this.alarmId;
        this.getTableData();
      },
      props: {
        alarmId: {
          type: String,
        }
      },
      methods: {
        getTableData() {
          this.$api.alarm.findDispath({id: this.id}).then(res => {
            let data = res.data;
            data.newImage = "data:image/jpg;base64,"+data.newImage;
            data.oldImage = "data:image/jpg;base64,"+data.oldImage;
            data.category = '设备故障';
            this.tableData = data;
          })
        },
      },
    }
</script>

<style scoped>
  .print-table {width: 100%;width: 640px;height: 900px;align-self: center;margin-top: 20px;}
  tr {text-align: center;border: 1px solid;}
  td {border: 1px solid;font-family: '宋体'}
  .first-row {height: 60px;border: 0px;font-size: 18px;font-weight: bolder;}
  .first-row td {border: 0px;}
  td[colspan="2"] {width: 160px;}
  td[colspan="3"] {width: 240px;}
  td[colspan="4"] {width: 320px;}
  td[colspan="6"] {width: 480px;}
  tr td:nth-child(odd) {
    font-weight: bolder;
  }
  .top-left {border-right: 0px;border-bottom: 0px;}
  .top-right {border-left: 0px;border-bottom: 0px;}
  .bottom-left {border-top: 0px;border-right: 0px;}
  .bottom-right {border-left: 0px;border-top: 0px;}
  .pic-title {border-bottom: 0px;font-weight: bolder;}
  .pic {border-top: 0px;}
  .explain {height: 120px;}
  .pic td{height: 200px;}
  img {height: 90%;width: 90%;}
</style>
