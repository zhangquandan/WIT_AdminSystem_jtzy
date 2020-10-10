<template>
  <div class="info">

    <div class="firstSub">
      <h3 style="margin-left: 10px;">{{title}}</h3>
      <h6 style="margin-left: 10px;">{{subTitle}}</h6>
      <h3 style="text-align: center;margin-top: 80px;">{{usageTotal}}</h3>
    </div>

    <div class="secondSub">

      <div class="middle">
        <p>本月用水定额</p>
        <div class="left"></div>
      </div>

      <div class="middle">
        <p>本月用水量余额</p>
        <div class="right"></div>
      </div>

    </div>

  </div>
</template>

<script>
    export default {
        name: "current-month",
      data(){
        return {
          title:'本月总用水量',
          subTitle:'(截止至上一小时单位：吨)',
          usageTotal:'---'
        }
      },
    }
</script>

<style scoped>
  .info {
    height:300px;
    margin-top: -30px;
    width: 100%;
    white-space: nowrap;
  }
  .firstSub{
    display:inline-block;
    box-sizing: border-box;
    background-color: beige;
    height:100%;
    width: 40%;
  }
  .secondSub{
    display:inline-block;
    box-sizing: border-box;
    background-color: beige;
    height:100%;
    width:59%;
    float: right;
  }
  .middle {
    display: inline-block;
    width:50%;
    padding-top: 90px;
    text-align: center;
  }
  .left {
    display: inline-block;
    width:150px;
    height:75px;
    background-color: #279fcf;
    border-radius: 50%/50%;
  }
  .right {
    display: inline-block;
    width:150px;
    height:75px;
    background-color: green;
    border-radius: 50%/50%;
  }
</style>
