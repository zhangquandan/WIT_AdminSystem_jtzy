<template>
    <div style="height:300px;background-color: beige;margin-top: -30px;border: 1px solid #ccc;">
      <h3 style="margin-left: 10px;">{{title}}</h3>
      <h6 style="margin-left: 10px;">{{subTitle}}</h6>
      <h3 style="text-align: center;margin-top: 80px;">{{usageTotal}}</h3>
    </div>
</template>

<script>
    export default {
        name: "today",
      data(){
        return {
          title:'今日总用水量',
          subTitle:'(截至到上一小时  单位：吨)',
          usageTotal:'--'
        }
      },
    }
</script>

<style scoped>

</style>
