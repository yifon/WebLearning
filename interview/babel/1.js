var es6Code =  console.log( Array.from({0: 'a',1: 'b',length:2}));
//transform的第一个参数是一个字符串，表示需要转换的ES6代码，第二个参数是转换的配置对象
var es5Code = require("babel-core").transform(es6Code, {
    presets: ['es2015']
}).code;
console.log(es5Code);