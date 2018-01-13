//获取http://www.imooc.com/data/fruit_part.html的水果列表
exports.index = function (req, res) {
    res.render('fruit', {
        title: "代理-跨域获取html"
    })
}