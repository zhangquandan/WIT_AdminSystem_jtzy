<template>
  <!--<el-upload
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-change="handleChange"
    :auto-upload="isUpload"
    :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>-->
  <el-upload
    style="margin-left: 130px;"
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
    :on-change="handleChange"
    :auto-upload="isUpload"
    :file-list="fileList"
    multiple>
    <el-button size="small" type="primary" style="margin-left: -390px;">上传Excel文件</el-button>
    <div class="el-upload__tip" slot="tip">只能上传excel文件，且不超过500kb</div>
  </el-upload>
<!--  <el-upload
    class="upload-demo"
    action=""
    :on-change="handleChange"
    :on-exceed="handleExceed"
    :on-remove="handleRemove"
    :file-list="fileList"
    :limit="limitUpload"
    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
    :auto-upload="false">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只 能 上 传 xlsx / xls 文 件</div>
  </el-upload>-->
</template>

<script>
    export default {
        name: "upload-excel",
      data(){
          return {
            isUpload:false,
            fileList:[],
            limitUpload:500,
            fileTemp:'',
          }
      },
      methods:{
        handleChange(file, fileList){
          this.fileTemp = file.raw ;
          if(this.fileTemp){
            if((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || (this.fileTemp.type == 'application/vnd.ms-excel')){
              this.importfxx(this.fileTemp);
            } else {
              this.$message({
                type:'warning',
                message:'附件格式错误，请删除后重新上传！'
              })
            }
          } else {
            this.$message({
              type:'warning',
              message:'请上传附件！'
            })
          }
        },
        handleExceed(){

        },
        handleRemove(file, fileList){

        },
        importfxx(obj) {
          let _this = this;
          // 通过DOM取文件数据
          this.file = obj
          var rABS = false; //是否将文件读取为二进制字符串
          var f = this.file;
          var reader = new FileReader();
          //if (!FileReader.prototype.readAsBinaryString) {
          FileReader.prototype.readAsBinaryString = function(f) {
            alert(2)
            var binary = "";
            var rABS = false; //是否将文件读取为二进制字符串
            var pt = this;
            var wb; //读取完成的数据
            var outdata;
            var reader = new FileReader();
            reader.onload = function(e) {
              alert(4)
              var bytes = new Uint8Array(reader.result);
              var length = bytes.byteLength;
              for(var i = 0; i < length; i++) {
                binary += String.fromCharCode(bytes[i]);
              }
              var XLSX = require('xlsx');
              if(rABS) {
                wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                  type: 'base64'
                });
              } else {
                wb = XLSX.read(binary, {
                  type: 'binary'
                });
              }
              outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
             /* this.da = [...outdata]
              let arr = []
              this.da.map(v => {
                let obj = {}
                obj.name = v['名称']
                obj.snumber = v['编号']
                obj.category = v['类型']
                obj.address = v['地址']
                obj.area = v['面积']
                obj.population = v['人口']
                arr.push(obj)
              })*/
              _this.$emit('getResult',outdata)
            }
            reader.readAsArrayBuffer(f);
          }

          if(rABS) {
            reader.readAsArrayBuffer(f);
          } else {
            reader.readAsBinaryString(f);
          }
        },
        importAll(obj){

        }
      }
    }
</script>

<style scoped>
input[type=file]{
  display: none;
}
.el-upload__tip {
  margin-left: -130px;
}
</style>
