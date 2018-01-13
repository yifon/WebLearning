//获取http://www.imooc.com/data/sport.json的运动json数据
exports.index = function (req, res) {
    res.render('sport', {
        title: "代理-跨域获取json"
    })
}