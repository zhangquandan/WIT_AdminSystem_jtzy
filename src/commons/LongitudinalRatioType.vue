<template>

  <div>
    <b>选择对比时间</b>：
    <el-select v-model="value" @change="changeType">
      <el-option v-for="tp in types" :label="tp.label" :key="tp.value" :value="tp.value">

      </el-option>
    </el-select>

    <label style="margin-left: 5px;" @click="link">
      <i class="fa fa-angle-double-down">&nbsp;<b>时间区段选择</b></i>
    </label>

    <el-dialog
      :visible.sync="showInformation"
      width="400px"
      top="15px"
      :before-close="handleClose">

      <div class="block">
        <span class="demonstration">查询的时间范围：</span>
        <el-date-picker
          v-model="dateRangeOfStart"
          value-format="yyyy-MM-dd"
          @change = "change"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>

      <div class="block" style="margin-top: 20px;">
        <span class="demonstration">对比的时间范围：</span>
        <el-date-picker
          v-model="dateRangeOfEnd"
          value-format="yyyy-MM-dd"
          :readonly="flag"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showInformation = false">取 消</el-button>
        <el-button type="primary" @click="getTimes">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
    export default {
      name: "longitudinal-ratio-type",
      data(){
        return {
          dateRangeOfStart:[],
          dateRangeOfEnd:[],
          startDays:'',
          endDays:'',
          flag:false,
          showInformation:false,
          value:'2',
          types:[{
            label:'和上年同比',
            value:'1'
          },{
            label:'和上月环比',
            value:'2'
          },{
            label:'自定义比较',
            value:'3'
          }]
        }
      },
      props:{
        rangeOfStart:{
          type:Array
        },
        rangeOfEnd:{
          type:Array
        }
      },
      watch:{
        rangeOfStart:{
          handler(newValue,oldValue){
            this.dateRangeOfStart = newValue ;
          }
        },
        rangeOfEnd:{
          handler(newValue,oldValue){
            this.dateRangeOfEnd = newValue ;
          }
        }
      },
      created(){
        this.dateRangeOfStart = this.rangeOfStart ;
        this.dateRangeOfEnd = this.rangeOfEnd ;
      },
      methods:{
        /*选择对比时间方式 ，两个时间段开始时间之间的关联*/
        confirmTime(){
          var start = this.dateRangeOfStart[0];
          var end = this.dateRangeOfStart[1];
          var value = this.value;
          if(value == '1' || value == '2'){
            var params = this.dateFormat.getDateRangeOfEnd(start,end,value);
            this.$set(this.dateRangeOfEnd,0,params.secondStartTime);
            this.$set(this.dateRangeOfEnd,1,params.secondEndTime);
            this.startDays = params.startDays ;
            this.endDays = params.endDays ;
          }
        },
        /*选择对比方式改变flag赋值*/
        confirmType(){
          let params ;
          if(this.value == '1'){
            this.flag = true;
            params = this.dateFormat.getInitDateOfYear()
          }else if(this.value == '2') {
            this.flag = true;
            params = this.dateFormat.getInitDateOfMonth();
          }else{
            this.flag = false;
            params = this.dateFormat.getInitDateOfCustom() ;
          }
          this.$set(this.dateRangeOfStart,0,params.firstStartTime);
          this.$set(this.dateRangeOfStart,1,params.firstEndTime);
          this.$set(this.dateRangeOfEnd,0,params.secondStartTime);
          this.$set(this.dateRangeOfEnd,1,params.secondEndTime);
        },
        /*查询日期变化时候触发*/
        change(){
          this.confirmTime();
        },
        /*选择对比方式触发*/
        changeType(){
          this.showInformation = true ;
          this.confirmType();
        },
        /*点击时间区段选择触发*/
        link(){
          this.showInformation = true ;
          this.confirmType();
        },
        /*点击确认按钮获取时间段*/
        getTimes(){
          this.showInformation = false;
          var start1 = this.dateFormat.dateFormat(new Date(this.dateRangeOfStart[0]),'-');
          var end1 = this.dateFormat.dateFormat(new Date(this.dateRangeOfStart[1]),'-');
          var start2 = this.dateFormat.dateFormat(new Date(this.dateRangeOfEnd[0]),'-');
          var end2 = this.dateFormat.dateFormat(new Date(this.dateRangeOfEnd[1]),'-');
          var start = this.dateFormat.getStandardFormat(start1)+"~"+this.dateFormat.getStandardFormat(end1)
          var end = this.dateFormat.getStandardFormat(start2)+"~"+this.dateFormat.getStandardFormat(end2)
          this.startDays = this.dateFormat.getDays(start1,end1);
          this.endDays = this.dateFormat.getDays(start2,end2);
          var params = {
            start1:start1,
            end1:end1,
            start2:start2,
            end2:end2,
            dateRangeOfStart:start,
            dateRangeOfEnd:end,
            startDays : this.startDays,
            endDays: this.endDays
          }
          this.$emit('getTimes',params)
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
      }
    }
</script>

<style scoped>

</style>
