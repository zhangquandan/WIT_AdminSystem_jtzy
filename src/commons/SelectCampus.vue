<template>
  <div class="line">
    <b>{{titleName}}</b>
    <el-select v-model="value" placeholder="请选择" @change="change" size="mini">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
    export default {
      name: "select-campus",
      data(){
        return {
          options:[],
          value:1,
          result:[]
        }
      },
      props:{
        regionId: {
          type: Number,
        },
        titleName:{
          type:String,
          default: '校区：'
        },
      },
      mounted(){
        this.value = this.regionId;
        this.refresh();
      },
      methods:{
        /*获取所有区域列表*/
        refresh(){
          this.$api.regionInf.findAll().then(res => {
            this.result = res;
            let options = [];
            res.forEach((item) => {
              if(item.parentid == 1 ||item.parentid == 0){
                options.push({
                  label:item.name,
                  value:item.id
                })
              }
            })
            this.options = options;
          })
        },
        /*选择校区触发*/
        change(){
          let name = this.getName(this.value);
          let params = {
            id : this.value,
            name : name
          };
          this.$emit('change',params);
        },
        /*通过校区 id获取校区 name*/
        getName(id){
          let name = "";
          this.result.forEach((item) => {
            if(id == item.id){
              name = item.name ;
            }
          });
          return name ;
        },
      },
    }
</script>

<style scoped>
  .el-select {width: 120px;}
  .line {}
</style>
