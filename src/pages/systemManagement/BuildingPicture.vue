<!--基本信息-->
<template>
  <div class="flex">
    <div class="content">
      <div class="box">
        <div class="box-header bg-aqua">建筑照片管理</div>
        <div class="box-body">
          <div style="display: inline-flex;flex-flow:row;margin-bottom:10px;">
            <select-building @change="change" :buildingId="buildingId"></select-building>
            &emsp;
            <el-upload
              :on-change="handleChange"
              :auto-upload='true'
              :http-request="uploadFiles"
              accept="image/jpg,image/jpeg,image/png"
              action=''>
              <el-button size="mini" type="primary">图片上传</el-button>
            </el-upload>
          </div>
          <!--数据表格展示-->
          <el-table
            :data="imageData"
            size="mini"
            border
            stripe>
            <el-table-column
              type="index"
              label="序号">
            </el-table-column>
            <el-table-column
              width="200px"
              prop="buildingname"
              label="建筑名称">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
            <el-table-column
              width="600px"
              label="照片">
              <template slot-scope="scope">
                <img :src="scope.row.image" class="image_type"/>
              </template>
            </el-table-column>
            <el-table-column label="操作" width=200px fixed="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除照片</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SelectBuilding from "../../commons/SelectBuilding";

  export default {
    components: {
      SelectBuilding
    },
    name: "building-picture",
    data(){
      return {
        imageData:[],
        buildingId:138,
        tableData:[],
      }
    },
    mounted(){
      this.getBuildingPic();
    },
    methods:{
      handleChange(file){
        this.fileData = file.raw ;
      },
      /*点击上传图片*/
      uploadFiles(){
        let _this = this;
        let a = new FormData();
        a.append("picFile", _this.fileData); //传文件
        a.append("buildingid",_this.buildingId);
        _this.$api.buildingPic.addOne(a).then(res=>{
          if(res.status== 200){
            this.$message({
              type: 'success',
              message: '图片上传成功！'
            });
            _this.getBuildingPic();
          }else{
            this.$message({
              type: 'error',
              message: '您的账号权限不足！'
            });
          }
        })
      },
      /*获取建筑图片*/
      getBuildingPic(){
        let params = {
          buildingid:this.buildingId
        };
        this.$api.buildingPic.findById(params).then(res => {
          if(res == null || res == ''){
            this.imageData = [];
          }else{
            res.forEach((item)=>{
              item.image = "data:image/jpg;base64,"+item.image;
            })
            this.imageData = res ;
          }
        })
      },
      change(params){
        this.buildingId = params.id ;
        this.getBuildingPic();
      },
      //删除单行信息
      handleDelete:function(index,row){
        this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.$api.buildingPic.deleteOne(row.id).then(res => {
            if(res.msg == 'ok'){
              this.$message({
                type: 'success',
                message: '删除成功！'
              });
              this.getBuildingPic();
            }else{
              this.$message({
                type: 'error',
                message: '您的账号权限不足！'
              });
            }
          }).catch(()=>{
            this.$message({
              type: 'info',
              message: '删除失败！'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },

    }
  }
</script>

<style scoped>
  @import "../../../static/css/noRow.css";

  .image_type{
    width: 60%;
  }
</style>
