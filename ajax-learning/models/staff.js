//引入mongoose的建模工具模块
var mongoose=require('mongoose');
//引入staff文件导出的StaffSchema模块
var StaffSchema=require('../schemas/staff');
//将构造函数导出
module.exports=Staff;