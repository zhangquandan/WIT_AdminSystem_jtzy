<template>
  <div class="info">

    <div class="firstSub">
      <h3 style="margin-left: 10px;">{{title}}</h3>
      <h6 style="margin-left: 10px;">{{subTitle}}</h6>
      <h3 style="text-align: center;margin-top: 80px;">{{usageTotal}}</h3>
    </div>

    <div class="secondSub">

      <div class="top">
        <p>上月用水量定额</p>
        <div class="first"></div>
      </div>
      <div class="top">
        <p>上月节水率</p>
        <div class="second"></div>
      </div>
      <br/>
      <div class="bottom">
        <h6>相对去年同期用水增量</h6>
        <div class="third"></div>
      </div>

      <div class="bottom">
        <h6>相对前月用水增量</h6>
        <div class="third"></div>
      </div>

      <div class="bottom">
        <h6>相对前月用水增长率</h6>
        <div class="third"></div>
      </div>

    </div>

  </div>
</template>

<script>
    export default {
        name: "last-month",
      data(){
        return {
          title:'上月总用水量',
          subTitle:'(单位：吨)',
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
  .top {
    display: inline-block;
    width:50%;
    text-align: center;
  }
  .bottom {
    display: inline-block;
    width:33%;
    text-align: center;
  }
  .first {
    display: inline-block;
    border-radius: 50%/50%;
    background-color: deepskyblue;
    width:150px;
    height:75px;
  }
  .second {
    display: inline-block;
    border-radius: 50%/50%;
    background-color: green;
    width:150px;
    height:75px;
  }
  p {
    margin-top: 30px;
  }
  .third {
    display: inline-block;
    border-radius: 50%/50%;
    background-color: deepskyblue;
    width:140px;
    height:70px;
  }
  .secondSub h6 {
    margin-top: 30px;
  }
</style>
