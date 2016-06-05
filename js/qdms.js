//《前端面试江湖》，2016年买给自己的生日礼物

//8.如何获取浏览器URL中查询字符串的参数
function getQuery(name){
    var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    var r=window.location.search.substr(1).match(reg);
    if(r!=null)
        return unescape(r[2]);
    return null;
}
//9.如何实现一个删除字符串左边空白字符的方法？
//^表示开始，'\s'表示空白字符，'/g'表示全局匹配
function leftTrim(str){
    return str.replace(/^\s*/g,"");
}

//10.What is the data type that JavaScript's typeof returns?
//undefined,boolean,string,number,object,function

//13.实现字符串反转主要是把字符串从末尾开始的每一个元素截取后，再重新组成一个新的字符串
function revert(str){
    var temp="";//remember to initialize
    for(i=str.length-1;i>0;i--){
        temp+=str[i];
    }
    return temp;
}
//18.如何检测一个变量是一个string类型？请写出函数实现
function testStr(str){
    //if((typeof str)=="string")
    if((typeof str)=="string"||str.constructor==String)
        return true;
    else
        return false;
}
