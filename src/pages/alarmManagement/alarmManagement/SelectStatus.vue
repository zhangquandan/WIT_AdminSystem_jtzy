<template>
  <el-radio-group size="mini" fill="#67C23A" v-model="radio" @change="change">
    <el-radio-button label="2">待处理</el-radio-button>
    <el-radio-button label="0">处理中</el-radio-button>
    <el-radio-button label="1">处理完成</el-radio-button>
    <el-radio-button label="3">无需处理</el-radio-button>
  </el-radio-group>
</template>

<script>
    export default {
      name: "select-status",
      data() {
        return {
          radio: '2',
        }
      },
      methods: {
        change() {
          this.$emit('changeStatus',{status: this.radio})
        }
      },
    }
</script>

<style scoped>

</style>
