export function export2Excel(columns,list,title){
  if(!title) {
    title = '数据列表';
  }
  require.ensure([], () => {
    const { export_json_to_excel } = require('../excel/Export2Excel');
    let tHeader = []
    let filterVal = []
    console.log(columns)
    if(!columns){
      return;
    }
    columns.forEach(item =>{
      tHeader.push(item.name)
      filterVal.push(item.prop)
    })
    const data = list.map(v => filterVal.map(j => v[j]))
    export_json_to_excel(tHeader, data, title);
  })
}
