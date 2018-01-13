//使用$.post()方法，向服务器http://www.imooc.com/data/check_f.php发送数据
exports.index = function (req, res) {
    res.header("Content-Type", "text/html;charset=utf-8");
    res.render('check_f', {
        title: "代理-跨域post数据到服务器"
    });
}