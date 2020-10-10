<template>
  <div>
    <!--<el-dialog
      :visible.sync="showInformation"
      width="400px"
      top="15px"
      :before-close="handleClose">
      <span slot="footer" class="dialog-footer">
        <el-button @click="showInformation = false">取 消</el-button>
        <el-button type="primary" @click="selectBuilding">确 定</el-button>
      </span>
    </el-dialog>-->
    <b>{{buildingTitle}}</b>
    <!--<el-select v-model="value" filterable placeholder="请选择建筑" @change="change">
      <el-option-group
        v-for="group in options"
        :key="group.label"
        :label="group.label">
        <el-option
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-option-group>
    </el-select>-->
    <el-cascader
      size="mini"
      :show-all-levels="false"
      @change="change"
      v-model="value"
      :options="options"
      :props="{expandTrigger: 'hover'}"></el-cascader>
   <!-- <label style="margin-left: 5px;" @click="showInformation=true">
      <i class="fa fa-angle-double-down">&nbsp;建筑列表</i>
    </label>-->&nbsp;
    <!--<el-button icon="el-icon-location" type="primary" @click="selectBuildingInMap" v-if="flag">地图定位</el-button>-->
  </div>
</template>

<script>
    export default {
        name: "select-building",
      data(){
          return {
            value:[137],
            showInformation:false,
            options:[],
            labels:[],
            basicInf:[],
            featureId:'',
          }
      },
      props:{
        buildingId:{
          type:Number,
          default:138,
        },
        buildingTitle:{
          type:'',
          default:'建筑：'
        },
        flag:{
          type:Boolean,
          default:true
        },
        featureValue:{
          type:String,
        }
      },
      mounted(){

        this.featureId = this.featureValue;

        this.value = this.buildingId ;

        this.$api.buildingInf.findALL().then(res => {

          this.options = this.typeDataTree(res)

          this.labels = res ;

        })
      },
      methods:{
        typeDataTree(options){
          var dataArr = [] ;
          var arr = [];
          options.forEach((jsonItem) => {
            if(arr.indexOf(jsonItem.category) < 0){
              dataArr.push({
                label:jsonItem.category
              })
              arr.push(jsonItem.category)
            }
          })

            dataArr.forEach((item) => {

              var childArr = [];

              for(var i = 0 ; i < options.length ; i++) {

                var option = options[i];

                if(item.label == option.category){

                  childArr.push({
                    label:option.name,
                    value:option.id
                  })

                }

              }
              item.children = childArr ;

            })

          return dataArr ;

        },

        change(){

          var value = this.value;

          var id;

          if(value && typeof value == 'object' && value.length > 0) {

            id = value[value.length-1];

            var params = {

              id:id,

              name:this.getName(id)

            }
          }
          this.getBasicInf(value);
          this.$emit('change',params)

        },

        getName(id){

          var name = '' ;

          this.labels.forEach((item) => {

            if(item.id == id){

              name = item.name ;

            }

          })

          return name ;

        },

        selectBuilding(){

        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        getBasicInf(id){
          this.$api.buildingInf.findOne(id).then(res => {
            this.basicInf = res ;
            this.featureId = res.tag;
          })
        },
        /*建筑地图定位*/
        selectBuildingInMap(){
          this.$router.push({
            name:'LightMap',
            params:{
              featureid:this.featureId
            }
          })
        },
      }
    }
</script>

<style scoped>
  .el-select {width: 150px;}
</style>
