<template>
  <div>
    <!--<el-dialog
      :visible.sync="showInformation"
      width="300px"
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
    </el-dialog>
-->
    <div class="block">
      <span class="demonstration"><b>{{titleName}}</b></span>
      <el-cascader
        size="mini"
        :show-all-levels="false"
        @change="change"
        v-model="value"
        :options="options"
        :props="{ checkStrictly: true,expandTrigger: 'hover',value:'id',label:'name' }">
      </el-cascader>
      <!--<label style="margin-left: 5px;" @click="showInformation=true">
        <i class="fa fa-angle-double-down">&nbsp;区域列表</i>
      </label>-->
    </div>

  </div>
</template>

<script>
  export default {
    name: "select-region",
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
      regionValue:{
        type:Array
      }
    },
    watch:{
      regionValue : {
        handler(newValue,oldValue) {
          this.value = newValue ;
        }
      }
    },
    created(){
      this.value = this.regionValue ;
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

        for(var i = 0 ; i < dataArr.length ; i++){

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

        this.$api.regionInf.findAll().then(res =>{

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

/*/!*
        var a = [] ;
        var b = [1,2,3,4];
        a = b  ;
        b.push(1,2,3);
        console.log(a)
*!/

        /!*document.cookie="userName=admin;password=123456;"

        console.log(document.cookie);*!/
        /!*var arr = document.cookie.split(";")

        arr.forEach((item)=>{
          let obj = item;
          console.log(obj);
        })*!/

        var str = "abbbaabbbaaabbb1234";
        var re1 = /a*bbb/g;   //贪婪匹配
        var re2 = /a*?bbb/g;  //惰性匹配
        alert(str.match(re1));
        alert(str.match(re2));*/

        var params = this.getName(this.value)

        this.$emit('change',params)

      },

      selectRegion(){

      },

      /*handleClose(done) {

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
