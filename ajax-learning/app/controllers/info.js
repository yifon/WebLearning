//使用$.get()方法，请求服务器中http://www.imooc.com/data/info_f.php文件中的数据，并将返回的内容显示在页面中
exports.crosGet = function (req, res) {
    res.render('info_f', {
        title: "代理-跨域获取服务器文件数据"
    })
}

//使用serialize()方法序列化表单元素值
exports.serialize = function (req, res) {
    res.render('info_s', {
        title: "使用serialize()方法序列化表单元素值"
    })
}