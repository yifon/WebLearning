var http = require('http'); //引入http库
var url = require('url'); //引入url模块解析url字符串
var server = http.createServer(); //创建新的http服务器
var querystring = require('querystring'); //引入querystring模块处理query字符串

//通过request事件来响应request请求
server.on('request', (req, res) => {
    var urlPath = url.parse(req.url).pathname; //返回URL的路径部分
    var qs = querystring.parse(req.url.split('?')[1]); //获取参数部分
    console.log("urlPath:" + urlPath);
    console.log(qs);
    //[Question]
    //约定’/jsonp?callback’，就将其认定为JSONP请求，且callback后带入一个js中已有的全局方法
    if (urlPath === '/jsonp' && qs.callback) {
        res.writeHead(200, {
            'Content-Type': 'application/json;charset=utf-8'
        }); //响应头
        var data = {
            'name': 'Monkey'
        };
        data = JSON.stringify(data); //将对象转换成JSON字符串
        //qs.callback为前台发送的回调函数名字
        var callback = qs.callback + '(' + data + ')';
        res.end(callback);
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        });
        res.end('Hello World\n');
    }
});
//监听8080端口
server.listen('8080');
console.log('Server is running successfully on 8080 port');
