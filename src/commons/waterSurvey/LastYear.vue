<template>
  <div class="info">

    <div class="firstSub">
      <h3 style="margin-left: 10px;">{{title}}</h3>
      <h6 style="margin-left: 10px;">{{subTitle}}</h6>
      <h3 style="text-align: center;margin-top: 80px;">{{usageTotal}}</h3>
    </div>

    <div class="secondSub">

      <div class="top">

        <p>去年总用水定额</p>
        <div class="first"></div>

      </div>

      <div class="top">

        <p>去年节水量</p>
        <div class="second"></div>

      </div>

      <div class="top">

        <p>去年节水率</p>
        <div class="second"></div>

      </div>

      <br/>

      <div class="bottom">

        <p>相对前年用水增量</p>
        <div class="third"></div>

      </div>

      <div class="bottom">

        <p>相对前年用水增长率</p>
        <div class="third"></div>

      </div>

    </div>

  </div>
</template>

<script>
    export default {
        name: "last-year",
      data(){
        return {
          title:'去年总用水量',
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
    background: beige;
    height:100%;
    width: 40%;
  }
  .secondSub{
    display:inline-block;
    box-sizing: border-box;
    background: beige;
    height:100%;
    width:59%;
    float: right;
    text-align: center;
  }
  .firstData {
    border-radius: 50%/50%;
    background-color: dodgerblue;
    border: 1px solid #ccc;
    width: 150px;
    height:75px;
  }
  p {
    margin-top: 25px;
  }
  .top {
    display: inline-block;
    text-align: center;
    width : 33%;
  }
  .bottom {
    text-align: center;
    display: inline-block;
    width : 50%;
  }
  .first {
    display: inline-block;
    border-radius: 50%/50%;
    background-color: lightskyblue;
    width:140px;
    height:70px;
  }
  .second {
    display: inline-block;
    border-radius: 50%/50%;
    background-color: green;
    width:140px;
    height:70px;
  }
  .third {
    display: inline-block;
    border-radius: 50%/50%;
    background-color: green;
    width:150px;
    height:75px;
  }
</style>
