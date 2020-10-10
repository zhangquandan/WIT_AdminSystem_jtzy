<template>
  <div class="block">
    <b>水表选择：</b>
    <el-select v-model="value" filterable placeholder="请选择水表" size="mini" type="primary" @change="change">
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
      name: "select-meter",
      data() {
        return {
          options: [],
          value: 9,
        }
      },
      created() {
        this.value = this.meterId;
        this.init();
      },
      props: {
        meterId: {
          type: Number,
        }
      },
      methods: {
        init() {
          this.$api.waterMeterInf.findALL().then(res => {
            var option = res.map((item) => {
              return {value: item.id,label: item.name}
            })
            this.options = option;
          })
        },
        change() {
          let params = {
            id: this.value
          }
          this.$emit('change',params);
        },
      },
    }
</script>

<style scoped>
  .el-select {width: 200px;}
</style>
