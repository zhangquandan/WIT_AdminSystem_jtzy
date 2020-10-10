<!--校区及DMA照片管理-->
<template>
  <div class="flex">
    <div class="content">
      <div class="box">
        <div class="box-header bg-aqua">校区及DMA照片管理</div>
        <div class="box-body">
          <div style="display: inline-flex;flex-flow:row;margin-bottom:10px;">
            <select-region :titleName="titleName" :regionValue="regionValue" @change="change"></select-region>
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
              prop="waterregionname"
              label="建筑名称">
            </el-table-column>
            <el-table-column
              width="600px"
              label="照片">
              <template slot-scope="scope">
                <img :src="scope.row.image" class="image_type"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
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
  import SelectRegion from "../../commons/SelectRegion";
  export default {
    components: {
      SelectRegion
    },
    name: "region-picture",
    data(){
      return {
        titleName:'校区及DMA：',
        regionValue:[1,1],
        regionId : 1,
        imageData:[],
        tableData:[],
      }
    },
    mounted(){
      this.getRegionPic();
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
        a.append("waterregionid",_this.regionId);
        _this.$api.waterRegionPic.addRegionPic(a).then(res=>{
          if(res.status== 200){
            this.$message({
              type: 'success',
              message: '图片上传成功！'
            });
            _this.getRegionPic();
          }else{
            this.$message({
              type: 'error',
              message: '您的账号权限不足！'
            });
          }
        })
      },
      /*获取区域图片*/
      getRegionPic(){
        let params = {
          waterregionid:this.regionId
        };
        this.$api.waterRegionPic.findRegionPics(params).then(res => {
          if(res == null || res == ''){
            this.imageData = [];
          }else{
            res.forEach((item)=>{
              item.image = "data:image/jpg;base64,"+item.image;
            });
            this.imageData = res ;
          }
        })
      },
      change(params){
        this.regionId = params.value ;
        this.getRegionPic();
      },
      //删除单行信息
      handleDelete:function(index,row){
        this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          console.log(row.id)
          this.$api.waterRegionPic.deleteRegionPic(row.id).then(res => {
            if(res.msg == 'ok'){
              this.$message({
                type: 'success',
                message: '删除成功！'
              });
              this.getRegionPic();
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

