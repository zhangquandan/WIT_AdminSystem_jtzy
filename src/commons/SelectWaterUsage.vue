<template>
    <div>
      <b>{{titleName}}</b>
      <el-select v-model="value" placeholder="请选择用水类型" @change="change">
        <el-option
          v-for="item in options"
          :key = "item.id"
          :label="item.name"
          :value = "item.id"
        >

        </el-option>
      </el-select>
    </div>
</template>

<script>
    export default {
        name: "select-water-usage",
      data(){
          return {
            options:[],
            value: '',
          }
      },
      props:{
        typeId:{
          //type:Number,
        },
        titleName:{
          type:String
        }
      },
      watch:{
        typeId :{
          handler(newValue,oldValue){
            this.value = newValue ;
          }
        }
      },
      created(){
          this.value = this.typeId ;
          this.$api.waterUsage.findAll().then(res => {
            this.options = res ;
          })
      },
      methods:{
        change(){
          var name = this.getName(this.value);
          var params = {
            name : name ,
            id : this.value
          }
          this.$emit('change',params)
        },
        getName(id){
          var name = '';
          this.options.forEach((item) => {
            if(item.id == id){
              name = item.name ;
            }
          })
          return name ;
        }
      }
    }
</script>

<style scoped>

</style>
