<template>
  <el-radio-group size="small" fill="#67C23A" v-model="radio" @change="change">
    <el-radio-button label="1">全部</el-radio-button>
    <el-radio-button label="2">校区漏损</el-radio-button>
    <el-radio-button label="3">DMA漏损</el-radio-button>
    <el-radio-button label="4">建筑漏损</el-radio-button>
    <el-radio-button label="5">表具漏损</el-radio-button>
    <el-radio-button label="6">设备故障</el-radio-button>
  </el-radio-group>
</template>

<script>
    export default {
      name: "select-alarm-type",
      data() {
        return {
          radio: '1',
        }
      },
      props: {
        type: {
          type: String,
          default: '',
        }
      },
      watch: {
        type: {
          handler(newValue,oldValue) {
            this.radio = newValue;
          }
        }
      },
      methods: {
        /*选择报警类型*/
        change() {
          let params = {type: '',};
          switch(this.radio) {
            case '1': params.type = '';
            break;
            case '2': params.type = '40';
            break;
            case '3': params.type = '30';
            break;
            case '4': params.type = '20';
            break;
            case '5': params.type = '10';
            break;
            default: params.type = '50';
          }
          this.$emit('changeType',params);
        },
      },
    }
</script>

<style scoped>

</style>
