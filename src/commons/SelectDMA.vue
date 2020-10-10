<template>
  <div>
    <b>{{titleName}}</b>
    <el-select v-model="value" placeholder="请选择DMA" @change="change" size="mini">
      <!--<el-option-group
        v-for="group in options"
        :key="group.label"
        :label="group.label">-->
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      <!--</el-option-group>-->
    </el-select>
  </div>

</template>

<script>
    export default {
      name: "select-d-m-a",
      data(){
        return {
          value:53,
          options:[],
          result:[]
        }
      },
      props:{
        regionId: {
          type: Number,
        },
        titleName:{
          type:String,
          default:'DMA:'
        }
      },
      mounted(){
        this.value = this.regionId;
        this.refresh();
      },
      methods:{
        /*选择DMA获取DMA id和name*/
        change(){
          let name = this.getName(this.value);
          let params = {
            id : this.value,
            name : name
          }
          this.$emit('change',params);
        },
        /*通过DMA id获取DMA name*/
        getName(id){
          let name = "";
          this.result.forEach((item) => {
            if(id == item.id){
              name = item.name ;
            }
          })
          return name ;
        },
        /*初始化页面获取DMA选择框列表数据*/
        refresh(){
          this.$api.regionInf.findAll().then(res => {
            this.result = res ;
            let option = [] ;
            //let option2 = [] ;
            //let option = [] ;
            res.forEach((item) => {
              if(item.statisticstype == "DMA"){
                  option.push({
                    label:item.name,
                    value:item.id
                  })
                }
            })
           /* option.push({
              label:"武昌校区",
              options:option1
            },{
              label:"流芳校区",
              options:option2
            })*/
            this.options = option;
          })
        }
      }
    }
</script>

<style scoped>
  .el-select {width: 150px;}
</style>
