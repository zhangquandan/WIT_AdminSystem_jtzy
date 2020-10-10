export default {
  getParent : function (res,id) {
    var num = [];
    var count = 0 ;
    /*res.forEach((item) => {
      if(item.id == id){
        if(count!=0)
        num.unshift(id)
        count++ ;
        this.getParent(num,res,item.parentid)
      }else{
        return num ;
      }
    })*/
    this.getItem(num,res,id,count);
    return num ;
  },
  getItem(num,res,id,count){
    var flag = false ;
    var parentid ;

    res.forEach((item) => {
      if(item.id == id){
        if(count != 0){
          num.unshift(id)
        }
        count++;
        flag = true ;
        parentid = item.parentid ;
      }
    })
    if(flag){
      this.getItem(num,res,parentid,count);
    }
  },
  getAll(res,id){
    var num = [];
    var count = 1 ;
    this.getItem(num,res,id,count);
    return num ;
  },
  getParentId(res,id){
    var parentid ;
    res.forEach((item) => {
      if(item.id == id){
        parentid = item.parentid
      }
    })
    return parentid ;
  },
}
