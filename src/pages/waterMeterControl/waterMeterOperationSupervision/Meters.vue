<template>
    <div class="meters">
      <div class="meter" :id="'meters_' + index" :ref="changeSelectStyle == index ? 'meters' : ''"  v-for="(item,index) in meters" :key="index" @click="link(item,index)" :class="{changeStyle: changeSelectStyle == index}">
        <img class="img" src="../../../../static/images/timg.jpg" alt="">
        <div class="title">{{item.name}}</div>
        <div class="number">{{item.snumber}}</div>
        <div class="is-online">
          <div :class="item.isonline ? 'green' : 'red'"></div>
          {{item.isonline ? '在线' : '不在线'}}
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "meters",
      data() {
        return {
          meters: [
            {name: '家属区水表',number: 1000,isOnline: true},
            {name: '家属区水表',number: 1000,isOnline: true},
          ],
          changeSelectStyle: 0,
          count: 0,
        }
      },
      mounted() {
        this.meters = this.metersData;
      },
      props: {
        metersData: {
          type: Array,
        },
        meterData: {
          type: Object,
        }
      },
      watch: {
        metersData: {
          handler(newValue,oldValue) {
            this.changeSelectStyle = 0;
            this.meters = this.metersData;
            if(this.count != 0) {
              this.scrollTo(0);
            }
            this.count ++;
          }
        },
        meterData: {
          handler(newValue,oldValue) {
            let toIndex;
            this.meters.forEach((item,index) => {
              if(item.id == newValue.row.id) {
                toIndex = index;
                this.changeSelectStyle = index;
              }
            })
            this.scrollTo(toIndex);
          }
        },
      },
      methods: {
        /*点击水表*/
        link(item,index) {
          this.changeSelectStyle = index;
          let params = {
            row: item
          }
          this.$emit('link',params);
        },
        /*根据查询定位到某块div*/
        scrollTo(index) {
          /*this.$refs.meters.scrollIntoView();*/
          if(index > -1) {
            document.getElementById("meters_"+index).scrollIntoView();
          }else {
           this.$alert("水表不存在","提示");
          }
        },
      },
    }
</script>

<style scoped>
  .meters {height: 100%;max-height: 100%; width: 100%;display: flex;flex-flow: row wrap;align-content: flex-start;padding-top: 10px;}
  .meter {border:3px solid skyblue;height: 120px;width: 12%;margin-left: 2%;margin-bottom:10px;min-width: 150px;border-radius: 12px;box-shadow: 0 2px 12px 0 rgba(204,204,204,.9);display: flex;flex-flow: column;justify-content: space-evenly;align-items: center;}
  .img {width: 30px;height: 30px;}
  .title {font-size: 12px;height: 20px;width: 100%;display: flex;justify-content: center;align-items: center;}
  .title::-webkit-scrollbar {display: none;}
  .number {height: 20px;width: 50%;display: flex;justify-content: center;align-items: center;}
  .is-online {display: flex;width: 100%;justify-content: center;align-items: center;height: 20px;}
  .green {border-radius: 50%;background: green;height: 15px;width: 15px;margin-right: 3px;}
  .red {border-radius: 50%;background: red;height: 15px;width: 15px;margin-right: 3px;}
  .changeStyle {background: rgb(193, 210, 240);}
</style>
