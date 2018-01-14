//拿到控制层的入口文件
var Staff=require('../app/controllers/staff');
var Fruit=require('../app/controllers/fruit');
var Sport=require('../app/controllers/sport');
var Sport_f=require('../app/controllers/sport_f');
var Info_f=require('../app/controllers/info_f');
var Check_f=require('../app/controllers/check_f');
var Post_l=require('../app/controllers/post_l');

module.exports=function(app){
    
    //编写路由

    //Staff
    app.get('/staff',Staff.information);
    app.get('/search',Staff.search);//员工信息查询
    app.post('/create',Staff.create);//员工信息创建
    app.post('/update',Staff.update);//员工信息修改

    //跨域代理
   app.get('/fruit',Fruit.index);
   app.get('/sport',Sport.index);
   app.get('/sport_f',Sport_f.index);
   app.get('/info_f',Info_f.index);
   app.get('/check_f',Check_f.index);

   //测试本地post是否有请求体导致504的问题
   app.get('/post_l',Post_l.index);
   app.post('/check_l',Post_l.check);
}