<template>
    <div class="meter">
      <el-table border :data="tableData" size="mini" height="100%">
        <el-table-column
          label="序号"
          type="index"
          align="center">
        </el-table-column>
        <el-table-column v-for="(item,index) in tableColumn" :label="item.name"
                         :prop="item.prop" :key="index" align="center">
        </el-table-column>
        <el-table-column
          label="地图定位"
          align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-location" @click="locateMeter(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
      name: "meter-inf",
      data() {
        return {
          tableData: [],
          tableColumn: [
            {name: '水表名称',prop: 'name'},
            {name: '水表编号',prop: 'snumber'},
            {name: '通讯编号',prop: 'comno'},
            {name: '出厂编号',prop: 'productsn'},
            {name: '水表类型',prop: 'category'},
            {name: '材质',prop: 'material'},
            {name: '规格',prop: 'dimension'},
          ],
        }
      },
      methods:{
        /*获取水表信息*/
        refreshWaterMeter(id){
          this.$api.waterMeterInf.findByBuildingId(id).then(res => {
            this.tableData = res;
          })
        },
        /*水表百度地图定位*/
        locateMeter(row){
          let info,lng,lat;
          this.$api.waterMeterInf.findOne(row.id).then(res => {
            info = res.name ;
            lng = res.tag.substring(1,res.tag.length-1).split(',')[0];
            lat = res.tag.substring(1,res.tag.length-1).split(',')[1];
            this.$router.push({
              path:'/BmapGL',
              query:{
                marker : {lng:lng,lat:lat} ,
                info : info ,
              }
            })
          });
        }
      }
    }
</script>

<style scoped>
  .meter {height: 100%;}
</style>
