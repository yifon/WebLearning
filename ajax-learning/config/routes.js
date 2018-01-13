//拿到控制层的入口文件
var Staff=require('../app/controllers/staff');
var Fruit=require('../app/controllers/fruit');

module.exports=function(app){
    
    //编写路由

    //Staff
    app.get('/staff',Staff.information);
    app.get('/search',Staff.search);//员工信息查询
    app.post('/create',Staff.create);//员工信息创建
    app.post('/update',Staff.update);//员工信息修改

    //跨域代理
   app.get('/fruit',Fruit.index);
}