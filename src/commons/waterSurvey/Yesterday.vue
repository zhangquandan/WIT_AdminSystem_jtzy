<template>
  <div class="info">

    <div class="firstSub">
      <h3 style="margin-left: 10px;">{{title}}</h3>
      <h6 style="margin-left: 10px;">{{subTitle}}</h6>
      <h3 style="text-align: center;margin-top: 80px;">{{usageTotal}}</h3>
    </div>

    <div class="secondSub">

      <div class="top">
        <p>前日总用水量</p>
        <div class="firstData box"></div>
      </div>

      <div class="bottom">
        <p>相对前日用水量增量</p>
        <div class="secondData box">
        </div>
      </div>
      <div class="bottom">
        <p>相对前日用水量增长率</p>
        <div class="thirdData box">

        </div>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "yesterday",
      data(){
          return {
            title:'昨日总用水量',
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
.firstData {
  border-radius: 50%/50%;
  background-color: dodgerblue;
  border: 1px solid #ccc;
  width: 150px;
  height:75px;
  margin: 0 auto;
}
p {
  margin-top: 20px;
}
.bottom {
  display: inline-block;
  width:50%;
  text-align: center;
}
.secondData {
  display: inline-block;
  border-radius: 50%/50%;
  background-color: green;
  border: 1px solid #ccc;
  width: 150px;
  height:75px;
}
.thirdData {
  display: inline-block;
  border-radius: 50%/50%;
  background-color: green;
  border: 1px solid #ccc;
  width: 150px;
  height:75px;
}
.top {
  width:100%;
  text-align: center;
}
</style>
