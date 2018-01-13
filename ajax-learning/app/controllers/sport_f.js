//加载http://www.imooc.com/data/sport_f.js文件内容
exports.index = function (req, res) {
    res.render('sport_f', {
        title: "代理-跨域获取js文件"
    })
}