<!--漏损勘察-->
<template>
  <table class="print-table">
    <tr class="first-row">
      <td colspan="8">漏损勘察单</td>
    </tr>
    <tr>
      <td colspan="2" class="fs">编号</td>
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
      <td colspan="2">{{tableData.category}}</td>
      <td colspan="2">综合漏损指数</td>
      <td colspan="2">{{tableData.leakageIndex}}</td>
    </tr>
    <tr>
      <td colspan="2">隔周日用水量增量</td>
      <td colspan="2">{{tableData.addTotal}}</td>
      <td colspan="2">隔周最小流量增量</td>
      <td colspan="2">{{tableData.addMin}}</td>
    </tr>
    <tr>
      <td colspan="2">隔周日用水量增幅</td>
      <td colspan="2">{{tableData.addRangeTotal}}</td>
      <td colspan="2">隔周最小流量增幅</td>
      <td colspan="2">{{tableData.addRangeMin}}</td>
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
      <td colspan="2">勘察简况类型</td>
      <td colspan="6">{{tableData.leakageCategory}}</td>
    </tr>
    <tr class="explain">
      <td colspan="2">勘察简况说明</td>
      <td colspan="6">{{tableData.explain}}</td>
    </tr>
    <tr class="pic">
      <td colspan="2">勘察简况照片</td>
      <td colspan="6"><img :src="tableData.image" class="image_type"/></td>
    </tr>
    <tr>
      <td>处理结果</td>
      <td>{{tableData.disposalOpinion ? '需转派' : '无需转派'}}</td>
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
      name: "leakage-survey",
      data() {
        return {
          tableData: {},
          id: '',
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
            data.image = "data:image/jpg;base64,"+data.image;
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
  td[colspan="6"] {width: 480px;}
  tr td:nth-child(odd) {
    font-weight: bolder;
  }
  .explain {height: 120px;}
  .pic td{height: 200px;}
  img {height: 90%;width: 90%;}
</style>
