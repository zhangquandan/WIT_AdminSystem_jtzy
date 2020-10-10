<template>
  <div class="row" style="margin-top: 5px">
    <div class="col-xs-3">
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        prev-text="上一页"
        next-text = "下一页"
        :pager-count="5"
        :current-page="currentPage"
        :page-sizes="[5, 10,12,24,48]"
        :page-size="size"
        layout="total, sizes"
        :total="total">
      </el-pagination>
    </div>
    <div class="col-xs-9" align="right">
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        prev-text="上一页"
        next-text = "下一页"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :pager-count="5"
        :page-size="size"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        return {
          currentPage:1,
          size:10,
        }
      },
      props:{
        total:{
          type:Number,
          default:0
        },
        pageNum : {
          type:Number,
        },
        pageSize:{
          type:Number,
          default:10
        }
      },
      watch:{
        pageNum : {
          handler(newValue,oldValue){
            this.currentPage = newValue ;
          }
        }
      },
      created(){
        this.size = this.pageSize ;
      },
      methods:{
        //表格size改变时触发
        handleSizeChange(val){
          this.size = val;
          this.changePage() ;
        },
        //当前页面改变时触发
        handleCurrentChange(val){
         this.currentPage = val;
         this.changePage();
        },
        changePage(){
          var params = {
            size:this.size,
            currentPage:this.currentPage
          }
          this.$emit('changePage', params)
        }
      }
    }
</script>

<style scoped>

</style>
