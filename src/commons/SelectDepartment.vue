<template>

  <div>
    <!--<el-dialog
      :visible.sync="showInformation"
      width="400px"
      top="15px"
      :before-close="handleClose">
      <div class="row">
        <div class="col-xs-2"></div>
        <div class="col-xs-8">
          <el-tree
            icon-class="el-icon-discover"
            :data="options"

            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="{label:'name'}">
          </el-tree>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showInformation = false">取 消</el-button>
        <el-button type="primary" @click="selectRegion">确 定</el-button>
      </span>
    </el-dialog>-->
    <div class="block">
      <span class="demonstration"><b>{{titleName}}</b></span>
      <el-cascader
        @change="change"
        v-model="value"
        :options="options"
        :props="{ checkStrictly: true,expandTrigger: 'hover',value:'id',label:'name' }"></el-cascader>
      <!--<label style="margin-left: 5px;" @click="showInformation=true">
        <i class="fa fa-angle-double-down">&nbsp;部门列表</i>
      </label>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "select-department",
    data(){
      return {
        value:[1,2],
        showInformation:false,
        options:[],
        labels:[]
      }
    },
    props:{
      titleName:{
        type:String
      },
      deptValue:{
        type : Array,
      }
    },
    watch:{
      deptValue : {
        handler(newValue,oldValue) {
          this.value = newValue ;
        }
      }
    },
    created(){
      this.value = this.deptValue ;
      this.refresh();
    },
    methods:{
      compare(property){

        return function (a,b) {

          var value1 = a[property];

          var value2 = b[property];

          return value1 - value2 ;

        }

      },

      fatherDataTree(options){

        var dataArr = [];

        options = options.sort(this.compare('parentid'));

        options.forEach((jsonItem) => {

          var parentId = jsonItem.parentid ;

          if(parentId == options[0].parentid){

            dataArr.push(jsonItem);

          }

        })

        return this.childrenDateTree(options,dataArr)

      },

      childrenDateTree(options,dataArr){

        for(var i = 0 ; i < dataArr.length;i++){

          var  dataArrItem = dataArr[i];

          var childrenArr = [];

          var id = dataArrItem.id;

          for(var j = 0 ; j< options.length ; j++){

            var optionsItem = options[j];

            var parentId = optionsItem.parentid ;

            if(parentId == id){

              childrenArr.push(optionsItem)

            }

          }

          dataArrItem.children = childrenArr ;

          if(childrenArr.length > 0){

            this.childrenDateTree(options,childrenArr) ;

          }

        }

        return dataArr ;

      },

      refresh(){

        this.$api.deptInf.findALL().then(res =>{

          this.options = res ;

          this.labels = res ;

          this.options = this.fatherDataTree(this.options)

        })

      },

      getName(value){

        //获取value数组最后一个值
        var params = [] ;

        params.value = value[value.length -  1];

        this.labels.forEach((jsonItem) => {

          if(jsonItem.id == params.value){

            params.name = jsonItem.name ;

          }

        })
        return params;
      },

      change(){

        var params = this.getName(this.value)

        this.$emit('change',params)

      },

      selectRegion(){



      },

/*      handleClose(done) {

        this.$confirm('确认关闭？')

          .then(_ => {

            done();

          })

          .catch(_ => {});

      },*/

    }

  }
</script>

<style scoped>

</style>
